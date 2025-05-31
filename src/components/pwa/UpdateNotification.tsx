import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { usePWA } from '@/hooks/usePWA';
import { 
  RefreshCw, 
  Download, 
  X, 
  Clock, 
  Star, 
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface UpdateNotificationProps {
  variant?: 'banner' | 'modal' | 'toast';
  autoShow?: boolean;
  onClose?: () => void;
}

export const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  variant = 'banner',
  autoShow = true,
  onClose
}) => {
  const { t } = useTranslation();
  const { 
    isUpdateAvailable, 
    hasUpdate,
    updateScheduled,
    applyUpdate, 
    skipUpdate,
    scheduleUpdateCheck 
  } = usePWA();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);

  useEffect(() => {
    if (autoShow && (isUpdateAvailable || hasUpdate)) {
      setIsVisible(true);
    }
  }, [autoShow, isUpdateAvailable, hasUpdate]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setUpdateProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUpdateProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      await applyUpdate();
      setUpdateProgress(100);
      
      // Small delay to show completion
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 500);
    } catch (error) {
      console.error('Update failed:', error);
      setIsUpdating(false);
      setUpdateProgress(0);
      clearInterval(progressInterval);
    }
  };

  const handleSkip = () => {
    skipUpdate();
    setIsVisible(false);
    onClose?.();
  };

  const handleSchedule = (days: number = 7) => {
    scheduleUpdateCheck(days);
    setIsVisible(false);
    onClose?.();
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible || (!isUpdateAvailable && !hasUpdate)) {
    return null;
  }

  const BannerNotification = () => (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <RefreshCw className={`w-5 h-5 ${isUpdating ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">
                {isUpdating ? t('update.installing') : t('update.available')}
              </h3>
              <p className="text-xs text-white/80">
                {isUpdating 
                  ? t('update.progress', { percent: updateProgress })
                  : t('update.description')
                }
              </p>
            </div>
          </div>
          
          {!isUpdating && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpdate}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
              >
                {t('update.updateNow')}
              </button>
              <button
                onClick={() => handleSchedule(7)}
                className="px-3 py-2 hover:bg-white/10 rounded-lg text-sm transition-colors"
              >
                {t('update.later')}
              </button>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {isUpdating && (
            <div className="flex items-center gap-3">
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${updateProgress}%` }}
                />
              </div>
              <span className="text-sm font-medium">{updateProgress}%</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const ModalNotification = () => (
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
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className={`w-8 h-8 text-white ${isUpdating ? 'animate-spin' : ''}`} />
          </div>
          <h2 className="text-xl font-bold mb-2">
            {isUpdating ? t('update.modal.updating') : t('update.modal.title')}
          </h2>
          <p className="text-muted-foreground">
            {isUpdating 
              ? t('update.modal.updatingDescription')
              : t('update.modal.description')
            }
          </p>
        </div>

        {isUpdating && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{t('update.progress.label')}</span>
              <span className="text-sm font-medium">{updateProgress}%</span>
            </div>
            <div className="w-full bg-accent/20 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${updateProgress}%` }}
              />
            </div>
          </div>
        )}

        {!isUpdating && (
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">{t('update.features.title')}</h4>
                <p className="text-xs text-muted-foreground">{t('update.features.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">{t('update.performance.title')}</h4>
                <p className="text-xs text-muted-foreground">{t('update.performance.description')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">{t('update.security.title')}</h4>
                <p className="text-xs text-muted-foreground">{t('update.security.description')}</p>
              </div>
            </div>
          </div>
        )}

        {!isUpdating && (
          <div className="space-y-3">
            <button
              onClick={handleUpdate}
              className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {t('update.updateNow')}
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSchedule(1)}
                className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              >
                {t('update.schedule.tomorrow')}
              </button>
              <button
                onClick={() => handleSchedule(7)}
                className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
              >
                {t('update.schedule.week')}
              </button>
            </div>
            <button
              onClick={handleSkip}
              className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('update.skip')}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  const ToastNotification = () => (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed top-4 right-4 z-50 bg-background border border-border rounded-xl shadow-lg max-w-sm w-full p-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <RefreshCw className={`w-5 h-5 text-white ${isUpdating ? 'animate-spin' : ''}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm mb-1">
            {isUpdating ? t('update.toast.updating') : t('update.toast.title')}
          </h4>
          <p className="text-xs text-muted-foreground mb-3">
            {isUpdating 
              ? t('update.toast.progress', { percent: updateProgress })
              : t('update.toast.description')
            }
          </p>
          
          {isUpdating && (
            <div className="w-full bg-accent/20 rounded-full h-1 mb-3">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${updateProgress}%` }}
              />
            </div>
          )}
          
          {!isUpdating && (
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                {t('update.updateNow')}
              </button>
              <button
                onClick={() => handleSchedule(7)}
                className="px-3 py-1 border border-border rounded text-xs font-medium hover:bg-accent transition-colors"
              >
                {t('update.later')}
              </button>
            </div>
          )}
        </div>
        {!isUpdating && (
          <button
            onClick={handleClose}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {variant === 'banner' && <BannerNotification />}
      {variant === 'modal' && <ModalNotification />}
      {variant === 'toast' && <ToastNotification />}
    </AnimatePresence>
  );
}; 