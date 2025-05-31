import { useState, useEffect, useCallback, useRef } from 'react';

interface CameraCapabilities {
  hasCamera: boolean;
  hasMultipleCameras: boolean;
  supportsFacingMode: boolean;
  supportsFlash: boolean;
  supportsZoom: boolean;
}

interface CameraState {
  isActive: boolean;
  isLoading: boolean;
  hasPermission: boolean;
  error: string | null;
  capabilities: CameraCapabilities;
  currentFacingMode: 'user' | 'environment';
  stream: MediaStream | null;
}

interface CameraActions {
  startCamera: (facingMode?: 'user' | 'environment') => Promise<boolean>;
  stopCamera: () => void;
  switchCamera: () => Promise<boolean>;
  capturePhoto: () => Promise<File | null>;
  requestPermission: () => Promise<boolean>;
  selectFromGallery: () => Promise<File[]>;
  setVideoRef: (element: HTMLVideoElement | null) => void;
}

interface CameraConstraints {
  video: {
    facingMode?: string;
    width?: { ideal: number };
    height?: { ideal: number };
    aspectRatio?: number;
  };
  audio: boolean;
}

export const useCamera = (): CameraState & CameraActions => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<CameraCapabilities>({
    hasCamera: false,
    hasMultipleCameras: false,
    supportsFacingMode: false,
    supportsFlash: false,
    supportsZoom: false
  });
  const [currentFacingMode, setCurrentFacingMode] = useState<'user' | 'environment'>('environment');
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check camera capabilities
  const checkCapabilities = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCapabilities({
          hasCamera: false,
          hasMultipleCameras: false,
          supportsFacingMode: false,
          supportsFlash: false,
          supportsZoom: false
        });
        return;
      }

      // Check for camera devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      const hasCamera = videoDevices.length > 0;
      const hasMultipleCameras = videoDevices.length > 1;
      
      // Check for facing mode support (mobile devices)
      const supportsFacingMode = hasMultipleCameras || 
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      setCapabilities({
        hasCamera,
        hasMultipleCameras,
        supportsFacingMode,
        supportsFlash: false, // Flash support is limited in web browsers
        supportsZoom: false   // Zoom support is limited in web browsers
      });
    } catch (error) {
      console.error('Error checking camera capabilities:', error);
      setCapabilities({
        hasCamera: false,
        hasMultipleCameras: false,
        supportsFacingMode: false,
        supportsFlash: false,
        supportsZoom: false
      });
    }
  }, []);

  // Request camera permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera not supported in this browser');
        return false;
      }

      // Request permission by trying to access camera
      const testStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false 
      });
      
      // Stop the test stream immediately
      testStream.getTracks().forEach(track => track.stop());
      
      setHasPermission(true);
      return true;
    } catch (error: any) {
      console.error('Camera permission denied:', error);
      
      if (error.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access and try again.');
      } else if (error.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else if (error.name === 'NotSupportedError') {
        setError('Camera not supported in this browser.');
      } else {
        setError('Failed to access camera. Please try again.');
      }
      
      setHasPermission(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Start camera
  const startCamera = useCallback(async (facingMode: 'user' | 'environment' = 'environment'): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!capabilities.hasCamera) {
        setError('No camera available on this device');
        return false;
      }

      if (!hasPermission) {
        const permissionGranted = await requestPermission();
        if (!permissionGranted) {
          return false;
        }
      }

      // Stop existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      // Camera constraints
      const constraints: CameraConstraints = {
        video: {
          facingMode: capabilities.supportsFacingMode ? facingMode : undefined,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: 16/9
        },
        audio: false
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      setCurrentFacingMode(facingMode);
      setIsActive(true);

      // Attach to video element if available
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }

      return true;
    } catch (error: any) {
      console.error('Error starting camera:', error);
      
      if (error.name === 'NotAllowedError') {
        setError('Camera permission denied');
      } else if (error.name === 'NotFoundError') {
        setError('Camera not found');
      } else if (error.name === 'OverconstrainedError') {
        setError('Camera constraints not supported');
      } else {
        setError('Failed to start camera');
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [capabilities.hasCamera, capabilities.supportsFacingMode, hasPermission, requestPermission, stream]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsActive(false);
    setError(null);
  }, [stream]);

  // Switch camera (front/back)
  const switchCamera = useCallback(async (): Promise<boolean> => {
    if (!capabilities.hasMultipleCameras) {
      setError('Multiple cameras not available');
      return false;
    }

    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    return await startCamera(newFacingMode);
  }, [capabilities.hasMultipleCameras, currentFacingMode, startCamera]);

  // Capture photo
  const capturePhoto = useCallback(async (): Promise<File | null> => {
    try {
      if (!stream || !videoRef.current) {
        setError('Camera not active');
        return null;
      }

      const video = videoRef.current;
      
      // Create canvas if not exists
      if (!canvasRef.current) {
        canvasRef.current = document.createElement('canvas');
      }
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) {
        setError('Failed to create canvas context');
        return null;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo-${Date.now()}.jpg`, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(file);
          } else {
            setError('Failed to capture photo');
            resolve(null);
          }
        }, 'image/jpeg', 0.9);
      });
    } catch (error) {
      console.error('Error capturing photo:', error);
      setError('Failed to capture photo');
      return null;
    }
  }, [stream]);

  // Select from gallery
  const selectFromGallery = useCallback(async (): Promise<File[]> => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.multiple = true;
      input.capture = 'camera'; // Prefer camera on mobile
      
      input.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        const files = Array.from(target.files || []);
        resolve(files);
      };
      
      input.oncancel = () => {
        resolve([]);
      };
      
      // Trigger file picker
      input.click();
    });
  }, []);

  // Set video ref for external use
  const setVideoRef = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
    if (element && stream) {
      element.srcObject = stream;
    }
  }, [stream]);

  // Check capabilities on mount
  useEffect(() => {
    checkCapabilities();
  }, [checkCapabilities]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return {
    // State
    isActive,
    isLoading,
    hasPermission,
    error,
    capabilities,
    currentFacingMode,
    stream,
    
    // Actions
    startCamera,
    stopCamera,
    switchCamera,
    capturePhoto,
    requestPermission,
    selectFromGallery,
    setVideoRef
  };
}; 