import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  hasUpdate: boolean;
  isUpdateAvailable: boolean;
  updateScheduled: boolean;
}

interface PWAActions {
  installApp: () => Promise<boolean>;
  checkForUpdates: () => Promise<boolean>;
  scheduleUpdateCheck: (days?: number) => void;
  skipUpdate: () => void;
  applyUpdate: () => void;
  dismissInstallPrompt: () => void;
}

export const usePWA = (): PWAState & PWAActions => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [updateScheduled, setUpdateScheduled] = useState(false);
  const [serviceWorker, setServiceWorker] = useState<ServiceWorkerRegistration | null>(null);

  // Check if app is installed
  const checkInstallStatus = useCallback(() => {
    // Check if running in standalone mode (installed as PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    const isInstalled = isStandalone || isIOSStandalone;
    
    setIsInstalled(isInstalled);
    
    // If already installed, don't show install prompt
    if (isInstalled) {
      setIsInstallable(false);
    }
  }, []);

  // Register service worker
  const registerServiceWorker = useCallback(async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        setServiceWorker(registration);
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setIsUpdateAvailable(true);
              }
            });
          }
        });

        // Check for updates immediately
        registration.update();
        
        console.log('Service Worker registered successfully');
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
      }
    }
    return null;
  }, []);

  // Install app
  const installApp = useCallback(async (): Promise<boolean> => {
    if (!installPrompt) {
      return false;
    }

    try {
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstallable(false);
        setInstallPrompt(null);
        setIsInstalled(true);
        
        // Store installation date for analytics
        localStorage.setItem('pwa-installed-date', new Date().toISOString());
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error installing PWA:', error);
      return false;
    }
  }, [installPrompt]);

  // Check for updates
  const checkForUpdates = useCallback(async (): Promise<boolean> => {
    if (!serviceWorker) {
      return false;
    }

    try {
      await serviceWorker.update();
      
      // Send message to service worker to check for updates
      return new Promise((resolve) => {
        const messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = (event) => {
          resolve(event.data.hasUpdate || false);
        };
        
        serviceWorker.active?.postMessage(
          { type: 'CHECK_UPDATE' },
          [messageChannel.port2]
        );
      });
    } catch (error) {
      console.error('Error checking for updates:', error);
      return false;
    }
  }, [serviceWorker]);

  // Schedule update check (7-day default)
  const scheduleUpdateCheck = useCallback((days: number = 7) => {
    const scheduleTime = Date.now() + (days * 24 * 60 * 60 * 1000);
    
    // Store in localStorage
    localStorage.setItem('pwa-update-check-scheduled', scheduleTime.toString());
    setUpdateScheduled(true);
    
    // Send message to service worker
    serviceWorker?.active?.postMessage({
      type: 'SCHEDULE_UPDATE_CHECK',
      days
    });
    
    console.log(`Update check scheduled for ${days} days from now`);
  }, [serviceWorker]);

  // Skip update
  const skipUpdate = useCallback(() => {
    setIsUpdateAvailable(false);
    setHasUpdate(false);
    
    // Schedule next check for 7 days
    scheduleUpdateCheck(7);
  }, [scheduleUpdateCheck]);

  // Apply update
  const applyUpdate = useCallback(() => {
    if (serviceWorker?.waiting) {
      serviceWorker.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload page to activate new service worker
      window.location.reload();
    }
  }, [serviceWorker]);

  // Dismiss install prompt
  const dismissInstallPrompt = useCallback(() => {
    setIsInstallable(false);
    setInstallPrompt(null);
    
    // Store dismissal to avoid showing again for a while
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  }, []);

  // Check if install prompt should be shown
  const shouldShowInstallPrompt = useCallback(() => {
    const dismissedTime = localStorage.getItem('pwa-install-dismissed');
    if (dismissedTime) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
      return daysSinceDismissed > 7; // Show again after 7 days
    }
    return true;
  }, []);

  // Check scheduled updates
  const checkScheduledUpdates = useCallback(async () => {
    const scheduledTime = localStorage.getItem('pwa-update-check-scheduled');
    if (scheduledTime && Date.now() >= parseInt(scheduledTime)) {
      const hasUpdate = await checkForUpdates();
      if (hasUpdate) {
        setHasUpdate(true);
      }
      
      // Clear the scheduled check
      localStorage.removeItem('pwa-update-check-scheduled');
      setUpdateScheduled(false);
    }
  }, [checkForUpdates]);

  useEffect(() => {
    // Register service worker
    registerServiceWorker();
    
    // Check install status
    checkInstallStatus();
    
    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      
      if (shouldShowInstallPrompt() && !isInstalled) {
        setInstallPrompt(promptEvent);
        setIsInstallable(true);
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
      console.log('PWA was installed');
    };

    // Listen for online/offline events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for scheduled updates on load
    checkScheduledUpdates();

    // Set up periodic update checks (every hour when app is active)
    const updateCheckInterval = setInterval(checkScheduledUpdates, 60 * 60 * 1000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(updateCheckInterval);
    };
  }, [registerServiceWorker, checkInstallStatus, shouldShowInstallPrompt, isInstalled, checkScheduledUpdates]);

  return {
    // State
    isInstallable,
    isInstalled,
    isOffline,
    hasUpdate,
    isUpdateAvailable,
    updateScheduled,
    
    // Actions
    installApp,
    checkForUpdates,
    scheduleUpdateCheck,
    skipUpdate,
    applyUpdate,
    dismissInstallPrompt
  };
}; 