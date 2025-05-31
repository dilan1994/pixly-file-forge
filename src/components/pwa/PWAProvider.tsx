import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePWA } from '@/hooks/usePWA';
import { useOffline } from '@/hooks/useOffline';
import { PWAInstallPrompt } from './PWAInstallPrompt';
import { OfflineIndicator } from './OfflineIndicator';
import { UpdateNotification } from './UpdateNotification';

interface PWAContextType {
  showInstallPrompt: () => void;
  hideInstallPrompt: () => void;
  showUpdateNotification: () => void;
  hideUpdateNotification: () => void;
  isInstallPromptVisible: boolean;
  isUpdateNotificationVisible: boolean;
  isOfflineIndicatorVisible: boolean;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export const usePWAContext = () => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWAContext must be used within a PWAProvider');
  }
  return context;
};

interface PWAProviderProps {
  children: React.ReactNode;
  enableInstallPrompt?: boolean;
  enableUpdateNotifications?: boolean;
  enableOfflineIndicator?: boolean;
  installPromptVariant?: 'banner' | 'modal' | 'inline';
  updateNotificationVariant?: 'banner' | 'modal' | 'toast';
  offlineIndicatorVariant?: 'banner' | 'badge' | 'inline';
}

export const PWAProvider: React.FC<PWAProviderProps> = ({
  children,
  enableInstallPrompt = true,
  enableUpdateNotifications = true,
  enableOfflineIndicator = true,
  installPromptVariant = 'banner',
  updateNotificationVariant = 'toast',
  offlineIndicatorVariant = 'banner'
}) => {
  const { isInstallable, isInstalled, isUpdateAvailable, hasUpdate } = usePWA();
  const { isOnline } = useOffline();
  
  const [isInstallPromptVisible, setIsInstallPromptVisible] = useState(false);
  const [isUpdateNotificationVisible, setIsUpdateNotificationVisible] = useState(false);
  const [isOfflineIndicatorVisible, setIsOfflineIndicatorVisible] = useState(false);

  // Auto-show install prompt
  useEffect(() => {
    if (enableInstallPrompt && isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setIsInstallPromptVisible(true);
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [enableInstallPrompt, isInstallable, isInstalled]);

  // Auto-show update notification
  useEffect(() => {
    if (enableUpdateNotifications && (isUpdateAvailable || hasUpdate)) {
      setIsUpdateNotificationVisible(true);
    }
  }, [enableUpdateNotifications, isUpdateAvailable, hasUpdate]);

  // Auto-show offline indicator
  useEffect(() => {
    if (enableOfflineIndicator) {
      setIsOfflineIndicatorVisible(!isOnline);
    }
  }, [enableOfflineIndicator, isOnline]);

  const contextValue: PWAContextType = {
    showInstallPrompt: () => setIsInstallPromptVisible(true),
    hideInstallPrompt: () => setIsInstallPromptVisible(false),
    showUpdateNotification: () => setIsUpdateNotificationVisible(true),
    hideUpdateNotification: () => setIsUpdateNotificationVisible(false),
    isInstallPromptVisible,
    isUpdateNotificationVisible,
    isOfflineIndicatorVisible
  };

  return (
    <PWAContext.Provider value={contextValue}>
      {children}
      
      {/* PWA Install Prompt */}
      {enableInstallPrompt && isInstallPromptVisible && (
        <PWAInstallPrompt
          variant={installPromptVariant}
          onClose={() => setIsInstallPromptVisible(false)}
        />
      )}
      
      {/* Update Notification */}
      {enableUpdateNotifications && isUpdateNotificationVisible && (
        <UpdateNotification
          variant={updateNotificationVariant}
          onClose={() => setIsUpdateNotificationVisible(false)}
        />
      )}
      
      {/* Offline Indicator */}
      {enableOfflineIndicator && isOfflineIndicatorVisible && (
        <OfflineIndicator
          variant={offlineIndicatorVariant}
        />
      )}
    </PWAContext.Provider>
  );
}; 