import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCamera } from '@/hooks/useCamera';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { 
  Camera, 
  RotateCcw, 
  Zap, 
  ZapOff, 
  X, 
  Check, 
  RefreshCw,
  AlertCircle,
  Maximize,
  Minimize
} from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  onClose,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.8,
  format = 'jpeg'
}) => {
  const { t } = useTranslation();
  const { isMobile } = useMobileDetection();
  const {
    stream,
    isActive,
    hasPermission,
    capabilities,
    error,
    startCamera,
    stopCamera,
    requestPermission
  } = useCamera();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('environment');

  useEffect(() => {
    if (hasPermission && !isActive) {
      startCamera(cameraFacing);
    }
  }, [hasPermission, cameraFacing, startCamera, isActive]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleCapture = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      canvas.width = Math.min(video.videoWidth, maxWidth);
      canvas.height = Math.min(video.videoHeight, maxHeight);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const imageUrl = URL.createObjectURL(blob);
            setCapturedImage(imageUrl);
          }
        },
        `image/${format}`,
        quality
      );
    } catch (error) {
      console.error('Error capturing photo:', error);
    } finally {
      setIsCapturing(false);
    }
  }, [maxWidth, maxHeight, quality, format]);

  const handleUsePhoto = useCallback(() => {
    if (capturedImage && canvasRef.current) {
      canvasRef.current.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], `camera-capture-${Date.now()}.${format}`, {
              type: `image/${format}`
            });
            onCapture(file);
          }
        },
        `image/${format}`,
        quality
      );
    }
  }, [capturedImage, onCapture, format, quality]);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
    }
  }, [capturedImage]);

  const handleSwitchCamera = useCallback(() => {
    const newFacing = cameraFacing === 'user' ? 'environment' : 'user';
    setCameraFacing(newFacing);
    stopCamera();
    setTimeout(() => {
      startCamera(newFacing);
    }, 100);
  }, [cameraFacing, stopCamera, startCamera]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  if (!hasPermission) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      >
        <div className="bg-background border border-border rounded-xl max-w-md w-full p-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">{t('camera.permissions.title')}</h2>
          <p className="text-muted-foreground mb-6">{t('camera.permissions.message')}</p>
          
          <div className="space-y-3">
            <button
              onClick={requestPermission}
              className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {t('camera.permissions.grant')}
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              {t('camera.permissions.cancel')}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      >
        <div className="bg-background border border-border rounded-xl max-w-md w-full p-6 text-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">{t('camera.error.title')}</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          
          <div className="space-y-3">
            <button
              onClick={() => startCamera(cameraFacing)}
              className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {t('camera.error.retry')}
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              {t('camera.error.close')}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <div className="relative w-full h-full">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-auto">
                <div className="flex items-center justify-between">
                  <button
                    onClick={onClose}
                    className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {capabilities.hasMultipleCameras && (
                      <button
                        onClick={handleSwitchCamera}
                        className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    )}
                    
                    {capabilities.supportsFlash && (
                      <button
                        onClick={() => setFlashEnabled(!flashEnabled)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors ${
                          flashEnabled ? 'bg-yellow-500' : 'bg-black/30 hover:bg-black/50'
                        }`}
                      >
                        {flashEnabled ? <Zap className="w-5 h-5" /> : <ZapOff className="w-5 h-5" />}
                      </button>
                    )}
                    
                    <button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                    >
                      {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 border-2 border-white/50 rounded-lg"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent pointer-events-auto">
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleCapture}
                    disabled={isCapturing || !isActive}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCapturing ? (
                      <RefreshCw className="w-8 h-8 text-black animate-spin" />
                    ) : (
                      <Camera className="w-8 h-8 text-black" />
                    )}
                  </button>
                </div>
                
                {isMobile && (
                  <div className="text-center mt-4">
                    <p className="text-white/80 text-sm">{t('camera.instructions.mobile')}</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleRetake}
                  className="flex items-center gap-2 bg-black/30 text-white px-6 py-3 rounded-lg hover:bg-black/50 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>{t('camera.retake')}</span>
                </button>
                
                <button
                  onClick={handleUsePhoto}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Check className="w-5 h-5" />
                  <span>{t('camera.usePhoto')}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
}; 