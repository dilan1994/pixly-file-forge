import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePWA } from '@/hooks/usePWA';
import { 
  Download, 
  X, 
  Smartphone, 
  Monitor, 
  Tablet,
  Star,
  Zap,
  Shield,
  Wifi
} from 'lucide-react';

interface PWAInstallPromptProps {
  onClose?: () => void;
  variant?: 'banner' | 'modal' | 'inline';
  showFeatures?: boolean;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  onClose,
  variant = 'banner',
  showFeatures = true
}) => {
  const { t } = useTranslation();
  const { 
    isInstallable, 
    isInstalled, 
    installApp, 
    dismissInstallPrompt
  } = usePWA();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Show prompt after a delay if installable and not dismissed
    const timer = setTimeout(() => {
      if (isInstallable && !isInstalled) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isInstallable, isInstalled]);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await installApp();
      setIsVisible(false);
      onClose?.();
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    dismissInstallPrompt();
    setIsVisible(false);
    onClose?.();
  };

  if (!isInstallable || isInstalled || !isVisible) {
    return null;
  }

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: t('pwa.features.offline.title'),
      description: t('pwa.features.offline.description')
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: t('pwa.features.privacy.title'),
      description: t('pwa.features.privacy.description')
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      title: t('pwa.features.updates.title'),
      description: t('pwa.features.updates.description')
    }
  ];

  const BannerPrompt = () => (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{t('pwa.install.title')}</h3>
              <p className="text-xs text-white/80">{t('pwa.install.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {isInstalling ? t('pwa.install.installing') : t('pwa.install.install')}
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ModalPrompt = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-background border border-border rounded-xl max-w-md w-full p-6"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold mb-2">{t('pwa.install.modal.title')}</h2>
          <p className="text-muted-foreground">{t('pwa.install.modal.description')}</p>
        </div>

        {showFeatures && (
          <div className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-primary mt-0.5">{feature.icon}</div>
                <div>
                  <h4 className="font-medium text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
          >
            {t('pwa.install.later')}
          </button>
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isInstalling ? t('pwa.install.installing') : t('pwa.install.install')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const InlinePrompt = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2">{t('pwa.install.inline.title')}</h3>
          <p className="text-muted-foreground text-sm mb-4">{t('pwa.install.inline.description')}</p>
          
          {showFeatures && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-primary">{feature.icon}</div>
                  <span className="text-xs font-medium">{feature.title}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleInstall}
              disabled={isInstalling}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isInstalling ? t('pwa.install.installing') : t('pwa.install.install')}
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
            >
              {t('pwa.install.dismiss')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {variant === 'banner' && <BannerPrompt />}
      {variant === 'modal' && <ModalPrompt />}
      {variant === 'inline' && <InlinePrompt />}
    </AnimatePresence>
  );
}; 