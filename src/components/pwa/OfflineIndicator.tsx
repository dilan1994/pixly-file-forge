import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useOffline } from '@/hooks/useOffline';
import { 
  Wifi, 
  WifiOff, 
  Signal, 
  SignalHigh, 
  SignalMedium, 
  SignalLow,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface OfflineIndicatorProps {
  variant?: 'banner' | 'badge' | 'inline';
  showDetails?: boolean;
  className?: string;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  variant = 'badge',
  showDetails = false,
  className = ''
}) => {
  const { t } = useTranslation();
  const { 
    isOnline, 
    connectionType, 
    effectiveType, 
    downlink, 
    rtt,
    saveData 
  } = useOffline();

  const getConnectionIcon = () => {
    if (!isOnline) return <WifiOff className="w-4 h-4" />;
    
    if (effectiveType === '4g' || downlink > 10) {
      return <SignalHigh className="w-4 h-4" />;
    } else if (effectiveType === '3g' || downlink > 1.5) {
      return <SignalMedium className="w-4 h-4" />;
    } else {
      return <SignalLow className="w-4 h-4" />;
    }
  };

  const getConnectionQuality = () => {
    if (!isOnline) return 'offline';
    if (effectiveType === '4g' || downlink > 10) return 'excellent';
    if (effectiveType === '3g' || downlink > 1.5) return 'good';
    return 'slow';
  };

  const getConnectionColor = () => {
    const quality = getConnectionQuality();
    switch (quality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-yellow-500';
      case 'slow': return 'text-orange-500';
      case 'offline': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getBgColor = () => {
    const quality = getConnectionQuality();
    switch (quality) {
      case 'excellent': return 'bg-green-500/10 border-green-500/30';
      case 'good': return 'bg-yellow-500/10 border-yellow-500/30';
      case 'slow': return 'bg-orange-500/10 border-orange-500/30';
      case 'offline': return 'bg-red-500/10 border-red-500/30';
      default: return 'bg-gray-500/10 border-gray-500/30';
    }
  };

  const BadgeIndicator = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getBgColor()} ${className}`}
    >
      <div className={getConnectionColor()}>
        {getConnectionIcon()}
      </div>
      <span className={`text-xs font-medium ${getConnectionColor()}`}>
        {isOnline ? t('offline.status.online') : t('offline.status.offline')}
      </span>
      {showDetails && isOnline && effectiveType && (
        <span className="text-xs text-muted-foreground">
          {effectiveType.toUpperCase()}
        </span>
      )}
    </motion.div>
  );

  const BannerIndicator = () => (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className={`fixed top-0 left-0 right-0 z-40 bg-red-500 text-white py-2 ${className}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center gap-3">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t('offline.banner.message')}
              </span>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span className="text-xs">{t('offline.banner.worksOffline')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const InlineIndicator = () => (
    <div className={`p-4 rounded-lg border ${getBgColor()} ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${getConnectionColor()}`}>
          {getConnectionIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-sm">
              {isOnline ? t('offline.status.connected') : t('offline.status.disconnected')}
            </h4>
            {isOnline && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${getBgColor()}`}>
                {effectiveType?.toUpperCase() || connectionType}
              </span>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">
            {isOnline 
              ? t('offline.inline.onlineMessage') 
              : t('offline.inline.offlineMessage')
            }
          </p>

          {showDetails && (
            <div className="space-y-2">
              {isOnline ? (
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">{t('offline.details.speed')}:</span>
                    <span className="ml-1 font-medium">
                      {downlink ? `${downlink} Mbps` : t('offline.details.unknown')}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t('offline.details.latency')}:</span>
                    <span className="ml-1 font-medium">
                      {rtt ? `${rtt}ms` : t('offline.details.unknown')}
                    </span>
                  </div>
                  {saveData && (
                    <div className="col-span-2">
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>{t('offline.details.dataSaver')}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{t('offline.features.cacheAvailable')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{t('offline.features.localProcessing')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3 h-3 text-blue-500" />
                    <span>{t('offline.features.syncWhenOnline')}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'banner':
      return <BannerIndicator />;
    case 'inline':
      return <InlineIndicator />;
    case 'badge':
    default:
      return <BadgeIndicator />;
  }
}; 