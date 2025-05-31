import { useState, useEffect, useCallback } from 'react';

interface OfflineState {
  isOffline: boolean;
  isOnline: boolean;
  connectionType: string | null;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
  saveData: boolean;
}

interface OfflineActions {
  checkConnection: () => Promise<boolean>;
  retryConnection: () => Promise<boolean>;
  getConnectionInfo: () => OfflineState;
}

// Extended Navigator interface for connection API
interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType: string;
    type: string;
    downlink: number;
    rtt: number;
    saveData: boolean;
    addEventListener: (type: string, listener: () => void) => void;
    removeEventListener: (type: string, listener: () => void) => void;
  };
  mozConnection?: any;
  webkitConnection?: any;
}

export const useOffline = (): OfflineState & OfflineActions => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string | null>(null);
  const [effectiveType, setEffectiveType] = useState<string | null>(null);
  const [downlink, setDownlink] = useState<number | null>(null);
  const [rtt, setRtt] = useState<number | null>(null);
  const [saveData, setSaveData] = useState(false);

  // Get connection object from various browser implementations
  const getConnection = useCallback(() => {
    const nav = navigator as NavigatorWithConnection;
    return nav.connection || nav.mozConnection || nav.webkitConnection || null;
  }, []);

  // Update connection info
  const updateConnectionInfo = useCallback(() => {
    const connection = getConnection();
    
    if (connection) {
      setConnectionType(connection.type || null);
      setEffectiveType(connection.effectiveType || null);
      setDownlink(connection.downlink || null);
      setRtt(connection.rtt || null);
      setSaveData(connection.saveData || false);
    } else {
      // Fallback values when connection API is not available
      setConnectionType(null);
      setEffectiveType(null);
      setDownlink(null);
      setRtt(null);
      setSaveData(false);
    }
  }, [getConnection]);

  // Handle online event
  const handleOnline = useCallback(() => {
    setIsOffline(false);
    setIsOnline(true);
    updateConnectionInfo();
    console.log('Connection restored');
  }, [updateConnectionInfo]);

  // Handle offline event
  const handleOffline = useCallback(() => {
    setIsOffline(true);
    setIsOnline(false);
    console.log('Connection lost');
  }, []);

  // Handle connection change
  const handleConnectionChange = useCallback(() => {
    updateConnectionInfo();
    console.log('Connection type changed');
  }, [updateConnectionInfo]);

  // Check connection with actual network request
  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      // Try to fetch a small resource to verify actual connectivity
      const response = await fetch('/manifest.json', {
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      const isConnected = response.ok;
      
      if (isConnected !== isOnline) {
        // Update state if there's a discrepancy
        setIsOnline(isConnected);
        setIsOffline(!isConnected);
      }
      
      return isConnected;
    } catch (error) {
      console.warn('Connection check failed:', error);
      
      // If fetch fails, assume offline
      if (isOnline) {
        setIsOnline(false);
        setIsOffline(true);
      }
      
      return false;
    }
  }, [isOnline]);

  // Retry connection
  const retryConnection = useCallback(async (): Promise<boolean> => {
    console.log('Retrying connection...');
    
    // Wait a moment before checking
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return await checkConnection();
  }, [checkConnection]);

  // Get current connection info
  const getConnectionInfo = useCallback((): OfflineState => {
    return {
      isOffline,
      isOnline,
      connectionType,
      effectiveType,
      downlink,
      rtt,
      saveData
    };
  }, [isOffline, isOnline, connectionType, effectiveType, downlink, rtt, saveData]);

  // Determine if connection is slow
  const isSlowConnection = useCallback((): boolean => {
    if (!effectiveType) return false;
    
    return ['slow-2g', '2g'].includes(effectiveType);
  }, [effectiveType]);

  // Determine if user prefers reduced data usage
  const shouldReduceData = useCallback((): boolean => {
    return saveData || isSlowConnection();
  }, [saveData, isSlowConnection]);

  // Setup event listeners
  useEffect(() => {
    // Update initial connection info
    updateConnectionInfo();

    // Add online/offline listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Add connection change listener if available
    const connection = getConnection();
    if (connection && connection.addEventListener) {
      connection.addEventListener('change', handleConnectionChange);
    }

    // Periodic connection check (every 30 seconds when online)
    const connectionCheckInterval = setInterval(() => {
      if (isOnline) {
        checkConnection();
      }
    }, 30000);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (connection && connection.removeEventListener) {
        connection.removeEventListener('change', handleConnectionChange);
      }
      
      clearInterval(connectionCheckInterval);
    };
  }, [
    updateConnectionInfo,
    handleOnline,
    handleOffline,
    handleConnectionChange,
    getConnection,
    isOnline,
    checkConnection
  ]);

  // Enhanced return object with additional utility functions
  return {
    // State
    isOffline,
    isOnline,
    connectionType,
    effectiveType,
    downlink,
    rtt,
    saveData,
    
    // Actions
    checkConnection,
    retryConnection,
    getConnectionInfo,
    
    // Utility functions (additional)
    isSlowConnection: isSlowConnection(),
    shouldReduceData: shouldReduceData(),
    connectionQuality: effectiveType || 'unknown'
  } as OfflineState & OfflineActions & {
    isSlowConnection: boolean;
    shouldReduceData: boolean;
    connectionQuality: string;
  };
}; 