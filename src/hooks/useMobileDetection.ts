import { useState, useEffect, useCallback } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isIPad: boolean;
  isIPhone: boolean;
  isSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isSamsung: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
  screenSize: 'small' | 'medium' | 'large' | 'xlarge';
  pixelRatio: number;
  touchSupport: boolean;
  standalone: boolean;
}

interface DeviceCapabilities {
  hasCamera: boolean;
  hasGeolocation: boolean;
  hasAccelerometer: boolean;
  hasGyroscope: boolean;
  hasVibration: boolean;
  hasNotifications: boolean;
  hasServiceWorker: boolean;
  hasWebGL: boolean;
  hasWebAssembly: boolean;
  hasLocalStorage: boolean;
  hasIndexedDB: boolean;
  hasWebRTC: boolean;
}

interface NetworkInfo {
  connectionType: string | null;
  effectiveType: string | null;
  downlink: number | null;
  saveData: boolean;
}

export const useMobileDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isIOS: false,
    isAndroid: false,
    isIPad: false,
    isIPhone: false,
    isSafari: false,
    isChrome: false,
    isFirefox: false,
    isEdge: false,
    isSamsung: false,
    deviceType: 'desktop',
    orientation: 'landscape',
    screenSize: 'large',
    pixelRatio: 1,
    touchSupport: false,
    standalone: false
  });

  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    hasCamera: false,
    hasGeolocation: false,
    hasAccelerometer: false,
    hasGyroscope: false,
    hasVibration: false,
    hasNotifications: false,
    hasServiceWorker: false,
    hasWebGL: false,
    hasWebAssembly: false,
    hasLocalStorage: false,
    hasIndexedDB: false,
    hasWebRTC: false
  });

  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    connectionType: null,
    effectiveType: null,
    downlink: null,
    saveData: false
  });

  // Detect device type and browser
  const detectDevice = useCallback(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                     (window.navigator as any).standalone === true;

    // Device detection
    const isIOS = /ipad|iphone|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isIPad = /ipad/.test(userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isIPhone = /iphone/.test(userAgent);
    
    // Browser detection
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
    const isChrome = /chrome/.test(userAgent) && !/edge/.test(userAgent);
    const isFirefox = /firefox/.test(userAgent);
    const isEdge = /edge/.test(userAgent) || /edg\//.test(userAgent);
    const isSamsung = /samsungbrowser/.test(userAgent);

    // Screen size detection
    const width = window.innerWidth;
    let screenSize: 'small' | 'medium' | 'large' | 'xlarge';
    if (width < 640) screenSize = 'small';
    else if (width < 768) screenSize = 'medium';
    else if (width < 1024) screenSize = 'large';
    else screenSize = 'xlarge';

    // Device type detection
    const isMobile = isIOS || isAndroid || width < 768;
    const isTablet = isIPad || (isAndroid && width >= 768 && width < 1024);
    const isDesktop = !isMobile && !isTablet;

    let deviceType: 'mobile' | 'tablet' | 'desktop';
    if (isMobile && !isTablet) deviceType = 'mobile';
    else if (isTablet) deviceType = 'tablet';
    else deviceType = 'desktop';

    // Orientation detection
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

    // Touch support
    const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Pixel ratio
    const pixelRatio = window.devicePixelRatio || 1;

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      isIOS,
      isAndroid,
      isIPad,
      isIPhone,
      isSafari,
      isChrome,
      isFirefox,
      isEdge,
      isSamsung,
      deviceType,
      orientation,
      screenSize,
      pixelRatio,
      touchSupport,
      standalone
    });
  }, []);

  // Detect device capabilities
  const detectCapabilities = useCallback(async () => {
    const caps: DeviceCapabilities = {
      hasCamera: false,
      hasGeolocation: false,
      hasAccelerometer: false,
      hasGyroscope: false,
      hasVibration: false,
      hasNotifications: false,
      hasServiceWorker: false,
      hasWebGL: false,
      hasWebAssembly: false,
      hasLocalStorage: false,
      hasIndexedDB: false,
      hasWebRTC: false
    };

    // Camera detection
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        caps.hasCamera = devices.some(device => device.kind === 'videoinput');
      }
    } catch (error) {
      console.warn('Camera detection failed:', error);
    }

    // Geolocation
    caps.hasGeolocation = 'geolocation' in navigator;

    // Motion sensors
    caps.hasAccelerometer = 'DeviceMotionEvent' in window;
    caps.hasGyroscope = 'DeviceOrientationEvent' in window;

    // Vibration
    caps.hasVibration = 'vibrate' in navigator;

    // Notifications
    caps.hasNotifications = 'Notification' in window;

    // Service Worker
    caps.hasServiceWorker = 'serviceWorker' in navigator;

    // WebGL
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      caps.hasWebGL = !!gl;
    } catch (error) {
      caps.hasWebGL = false;
    }

    // WebAssembly
    caps.hasWebAssembly = 'WebAssembly' in window;

    // Local Storage
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      caps.hasLocalStorage = true;
    } catch (error) {
      caps.hasLocalStorage = false;
    }

    // IndexedDB
    caps.hasIndexedDB = 'indexedDB' in window;

    // WebRTC
    caps.hasWebRTC = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) ||
                     !!(navigator as any).webkitGetUserMedia ||
                     !!(navigator as any).mozGetUserMedia;

    setCapabilities(caps);
  }, []);

  // Detect network information
  const detectNetworkInfo = useCallback(() => {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;

    if (connection) {
      setNetworkInfo({
        connectionType: connection.type || null,
        effectiveType: connection.effectiveType || null,
        downlink: connection.downlink || null,
        saveData: connection.saveData || false
      });
    } else {
      setNetworkInfo({
        connectionType: null,
        effectiveType: null,
        downlink: null,
        saveData: false
      });
    }
  }, []);

  // Handle orientation change
  const handleOrientationChange = useCallback(() => {
    setTimeout(() => {
      detectDevice();
    }, 100); // Small delay to ensure dimensions are updated
  }, [detectDevice]);

  // Handle resize
  const handleResize = useCallback(() => {
    detectDevice();
  }, [detectDevice]);

  // Get device-specific recommendations
  const getRecommendations = useCallback(() => {
    const recommendations = [];

    if (deviceInfo.isMobile) {
      recommendations.push('Use touch-friendly interface');
      recommendations.push('Optimize for small screens');
      
      if (networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g') {
        recommendations.push('Reduce data usage');
        recommendations.push('Compress images more aggressively');
      }
    }

    if (deviceInfo.isTablet) {
      recommendations.push('Optimize for medium screens');
      recommendations.push('Consider split-screen layouts');
    }

    if (!capabilities.hasCamera) {
      recommendations.push('Hide camera features');
    }

    if (deviceInfo.standalone) {
      recommendations.push('App is running as PWA');
      recommendations.push('Hide browser-specific UI');
    }

    return recommendations;
  }, [deviceInfo, networkInfo, capabilities]);

  // Check if device is suitable for image processing
  const isOptimalForImageProcessing = useCallback(() => {
    const factors = {
      hasWebGL: capabilities.hasWebGL,
      hasWebAssembly: capabilities.hasWebAssembly,
      goodConnection: networkInfo.effectiveType !== 'slow-2g' && networkInfo.effectiveType !== '2g',
      sufficientScreen: deviceInfo.screenSize !== 'small',
      modernBrowser: deviceInfo.isChrome || deviceInfo.isFirefox || deviceInfo.isSafari || deviceInfo.isEdge
    };

    const score = Object.values(factors).filter(Boolean).length;
    return {
      isOptimal: score >= 4,
      score: score / 5,
      factors
    };
  }, [capabilities, networkInfo, deviceInfo]);

  // Initialize detection
  useEffect(() => {
    detectDevice();
    detectCapabilities();
    detectNetworkInfo();

    // Add event listeners
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleResize);

    // Network change listener
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', detectNetworkInfo);
    }

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleResize);
      
      if (connection) {
        connection.removeEventListener('change', detectNetworkInfo);
      }
    };
  }, [detectDevice, detectCapabilities, detectNetworkInfo, handleOrientationChange, handleResize]);

  return {
    // Device information
    ...deviceInfo,
    
    // Capabilities
    capabilities,
    
    // Network information
    networkInfo,
    
    // Utility functions
    getRecommendations,
    isOptimalForImageProcessing,
    
    // Refresh functions
    refreshDeviceInfo: detectDevice,
    refreshCapabilities: detectCapabilities,
    refreshNetworkInfo: detectNetworkInfo
  };
}; 