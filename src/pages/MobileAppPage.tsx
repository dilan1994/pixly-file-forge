import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { usePWA } from '@/hooks/usePWA';
import { useCamera } from '@/hooks/useCamera';
import { useOffline } from '@/hooks/useOffline';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useImageCompression } from '@/hooks/useImageCompression';
import { 
  Smartphone, 
  Download, 
  Camera, 
  Wifi, 
  WifiOff, 
  Zap, 
  Shield, 
  Star, 
  CheckCircle, 
  Monitor, 
  Tablet, 
  Globe, 
  Battery, 
  Compass, 
  Vibrate, 
  Bell, 
  Eye, 
  Fingerprint, 
  Gauge, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  RefreshCw,
  Share2,
  Settings,
  Layers,
  Image,
  FileImage,
  Maximize,
  Minimize,
  RotateCcw,
  Crop,
  Palette,
  Sliders,
  Clock,
  Users,
  Mail,
  ExternalLink,
  ArrowRight,
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Languages,
  MapPin,
  Navigation,
  Bluetooth,
  Usb,
  HardDriveIcon,
  HelpCircle
} from 'lucide-react';

export const MobileAppPage: React.FC = () => {
  const { t } = useTranslation();
  const [lastUpdated, setLastUpdated] = useState('');
  
  // PWA and mobile hooks
  const { 
    isInstallable, 
    isInstalled, 
    isOffline, 
    installApp, 
    isUpdateAvailable,
    applyUpdate 
  } = usePWA();
  
  const { 
    capabilities: cameraCapabilities, 
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission 
  } = useCamera();
  
  const { 
    isOnline, 
    connectionType, 
    effectiveType
  } = useOffline();
  
  const { 
    isMobile, 
    isTablet, 
    deviceType, 
    capabilities, 
    isOptimalForImageProcessing 
  } = useMobileDetection();
  
  const { getSupportedFormats } = useImageCompression();

  useEffect(() => {
    setLastUpdated(getLastUpdatedDate(1));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Mobile features data
  const mobileFeatures = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: t('mobile.features.camera.title'),
      description: t('mobile.features.camera.description'),
      available: cameraCapabilities.hasCamera,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: <WifiOff className="w-8 h-8" />,
      title: t('mobile.features.offline.title'),
      description: t('mobile.features.offline.description'),
      available: true,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('mobile.features.performance.title'),
      description: t('mobile.features.performance.description'),
      available: capabilities.hasWebGL && capabilities.hasWebAssembly,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('mobile.features.privacy.title'),
      description: t('mobile.features.privacy.description'),
      available: true,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: t('mobile.features.sharing.title'),
      description: t('mobile.features.sharing.description'),
      available: 'share' in navigator,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30'
    },
    {
      icon: <Vibrate className="w-8 h-8" />,
      title: t('mobile.features.haptics.title'),
      description: t('mobile.features.haptics.description'),
      available: capabilities.hasVibration,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30'
    }
  ];

  // Device capabilities
  const deviceCapabilities = [
    { name: t('mobile.capabilities.camera'), available: capabilities.hasCamera, icon: <Camera className="w-5 h-5" /> },
    { name: t('mobile.capabilities.geolocation'), available: capabilities.hasGeolocation, icon: <MapPin className="w-5 h-5" /> },
    { name: t('mobile.capabilities.accelerometer'), available: capabilities.hasAccelerometer, icon: <Compass className="w-5 h-5" /> },
    { name: t('mobile.capabilities.gyroscope'), available: capabilities.hasGyroscope, icon: <Navigation className="w-5 h-5" /> },
    { name: t('mobile.capabilities.vibration'), available: capabilities.hasVibration, icon: <Vibrate className="w-5 h-5" /> },
    { name: t('mobile.capabilities.notifications'), available: capabilities.hasNotifications, icon: <Bell className="w-5 h-5" /> },
    { name: t('mobile.capabilities.serviceWorker'), available: capabilities.hasServiceWorker, icon: <Settings className="w-5 h-5" /> },
    { name: t('mobile.capabilities.webgl'), available: capabilities.hasWebGL, icon: <Cpu className="w-5 h-5" /> },
    { name: t('mobile.capabilities.webassembly'), available: capabilities.hasWebAssembly, icon: <MemoryStick className="w-5 h-5" /> },
    { name: t('mobile.capabilities.localStorage'), available: capabilities.hasLocalStorage, icon: <HardDrive className="w-5 h-5" /> },
    { name: t('mobile.capabilities.indexedDB'), available: capabilities.hasIndexedDB, icon: <HardDriveIcon className="w-5 h-5" /> },
    { name: t('mobile.capabilities.webrtc'), available: capabilities.hasWebRTC, icon: <Globe className="w-5 h-5" /> }
  ];

  // Installation steps
  const installationSteps = [
    {
      platform: 'iOS Safari',
      steps: [
        t('mobile.install.ios.step1'),
        t('mobile.install.ios.step2'),
        t('mobile.install.ios.step3'),
        t('mobile.install.ios.step4')
      ],
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      platform: 'Android Chrome',
      steps: [
        t('mobile.install.android.step1'),
        t('mobile.install.android.step2'),
        t('mobile.install.android.step3')
      ],
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      platform: 'Desktop',
      steps: [
        t('mobile.install.desktop.step1'),
        t('mobile.install.desktop.step2'),
        t('mobile.install.desktop.step3')
      ],
      icon: <Monitor className="w-6 h-6" />
    }
  ];

  // Performance metrics
  const performanceMetrics = isOptimalForImageProcessing();

  return (
    <div className="mobile-app-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="mobile-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.section 
          className="mobile-hero text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-content" variants={itemVariants}>
            <div className="hero-icon mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary to-secondary rounded-3xl flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="mobile-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('mobile.title')}
            </h1>
            <p className="mobile-subtitle text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              {t('mobile.subtitle')}
            </p>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
              <Star className="w-4 h-4" />
              <span>{t('mobile.lastUpdated')}: {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* PWA Status */}
        <motion.section 
          className="pwa-status mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('mobile.pwa.title')}
          </motion.h2>
          
          <motion.div className="status-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={itemVariants}>
            <div className={`status-card p-6 rounded-xl border-2 ${isInstalled ? 'bg-green-500/10 border-green-500/30' : 'bg-blue-500/10 border-blue-500/30'}`}>
              <div className="flex items-center gap-3 mb-3">
                <Download className={`w-6 h-6 ${isInstalled ? 'text-green-500' : 'text-blue-500'}`} />
                <h3 className="font-semibold">{t('mobile.pwa.installation')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {isInstalled ? t('mobile.pwa.installed') : t('mobile.pwa.notInstalled')}
              </p>
              {isInstallable && !isInstalled && (
                <button 
                  onClick={installApp}
                  className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  {t('mobile.pwa.installNow')}
                </button>
              )}
            </div>

            <div className={`status-card p-6 rounded-xl border-2 ${isOnline ? 'bg-green-500/10 border-green-500/30' : 'bg-orange-500/10 border-orange-500/30'}`}>
              <div className="flex items-center gap-3 mb-3">
                {isOnline ? <Wifi className="w-6 h-6 text-green-500" /> : <WifiOff className="w-6 h-6 text-orange-500" />}
                <h3 className="font-semibold">{t('mobile.pwa.connectivity')}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {isOnline ? `${t('mobile.pwa.online')} (${effectiveType || 'unknown'})` : t('mobile.pwa.offline')}
              </p>
            </div>

            <div className={`status-card p-6 rounded-xl border-2 ${hasCameraPermission ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
              <div className="flex items-center gap-3 mb-3">
                <Camera className={`w-6 h-6 ${hasCameraPermission ? 'text-green-500' : 'text-yellow-500'}`} />
                <h3 className="font-semibold">{t('mobile.pwa.camera')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {hasCameraPermission ? t('mobile.pwa.cameraGranted') : t('mobile.pwa.cameraNotGranted')}
              </p>
              {!hasCameraPermission && cameraCapabilities.hasCamera && (
                <button 
                  onClick={requestCameraPermission}
                  className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors"
                >
                  {t('mobile.pwa.enableCamera')}
                </button>
              )}
            </div>

            <div className={`status-card p-6 rounded-xl border-2 ${isUpdateAvailable ? 'bg-blue-500/10 border-blue-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
              <div className="flex items-center gap-3 mb-3">
                <RefreshCw className={`w-6 h-6 ${isUpdateAvailable ? 'text-blue-500' : 'text-green-500'}`} />
                <h3 className="font-semibold">{t('mobile.pwa.updates')}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {isUpdateAvailable ? t('mobile.pwa.updateAvailable') : t('mobile.pwa.upToDate')}
              </p>
              {isUpdateAvailable && (
                <button 
                  onClick={applyUpdate}
                  className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  {t('mobile.pwa.updateNow')}
                </button>
              )}
            </div>
          </motion.div>
        </motion.section>

        {/* Mobile Features */}
        <motion.section 
          className="mobile-features mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('mobile.features.title')}
          </motion.h2>
          
          <motion.div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={itemVariants}>
            {mobileFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className={`feature-card p-8 rounded-xl border-2 ${feature.bgColor} ${feature.borderColor} hover:shadow-lg transition-all duration-300`}
                whileHover={{ y: -5 }}
                variants={itemVariants}
              >
                <div className={`feature-icon mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <div className="flex items-center gap-2">
                  {feature.available ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 dark:text-green-400">{t('mobile.features.available')}</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-orange-600 dark:text-orange-400">{t('mobile.features.limited')}</span>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Device Capabilities */}
        <motion.section 
          className="device-capabilities mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('mobile.capabilities.title')}
          </motion.h2>
          
          <motion.div className="capabilities-content bg-card border border-border rounded-xl p-8" variants={itemVariants}>
            <div className="device-info mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                {deviceType === 'mobile' ? <Smartphone className="w-6 h-6 text-primary" /> : 
                 deviceType === 'tablet' ? <Tablet className="w-6 h-6 text-primary" /> : 
                 <Monitor className="w-6 h-6 text-primary" />}
                {t('mobile.capabilities.deviceInfo')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="info-item">
                  <span className="text-sm text-muted-foreground">{t('mobile.capabilities.deviceType')}</span>
                  <p className="font-medium capitalize">{deviceType}</p>
                </div>
                <div className="info-item">
                  <span className="text-sm text-muted-foreground">{t('mobile.capabilities.connection')}</span>
                  <p className="font-medium">{effectiveType || 'Unknown'}</p>
                </div>
                <div className="info-item">
                  <span className="text-sm text-muted-foreground">{t('mobile.capabilities.performance')}</span>
                  <p className="font-medium">{Math.round(performanceMetrics.score * 100)}%</p>
                </div>
                <div className="info-item">
                  <span className="text-sm text-muted-foreground">{t('mobile.capabilities.formats')}</span>
                  <p className="font-medium">{getSupportedFormats().length} formats</p>
                </div>
              </div>
            </div>

            <div className="capabilities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deviceCapabilities.map((capability, index) => (
                <div key={index} className="capability-item flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                  <div className={capability.available ? 'text-green-500' : 'text-gray-400'}>
                    {capability.icon}
                  </div>
                  <span className={`text-sm ${capability.available ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {capability.name}
                  </span>
                  {capability.available ? (
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Installation Guide */}
        <motion.section 
          className="installation-guide mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('mobile.install.title')}
          </motion.h2>
          
          <motion.div className="install-grid grid grid-cols-1 lg:grid-cols-3 gap-8" variants={itemVariants}>
            {installationSteps.map((guide, index) => (
              <div key={index} className="install-card bg-card border border-border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-primary">{guide.icon}</div>
                  <h3 className="text-xl font-semibold">{guide.platform}</h3>
                </div>
                <ol className="space-y-3">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {stepIndex + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Mobile Tools */}
        <motion.section 
          className="mobile-tools mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('mobile.tools.title')}
          </motion.h2>
          
          <motion.div className="tools-grid grid grid-cols-1 md:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="tool-category bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Image className="w-6 h-6 text-primary" />
                {t('mobile.tools.conversion.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  'mobile.tools.conversion.item1',
                  'mobile.tools.conversion.item2',
                  'mobile.tools.conversion.item3',
                  'mobile.tools.conversion.item4'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tool-category bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Sliders className="w-6 h-6 text-secondary" />
                {t('mobile.tools.editing.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  'mobile.tools.editing.item1',
                  'mobile.tools.editing.item2',
                  'mobile.tools.editing.item3',
                  'mobile.tools.editing.item4'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Performance Optimization */}
        <motion.section 
          className="performance-optimization mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('mobile.performance.title')}
          </motion.h2>
          
          <motion.div className="performance-content bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-xl p-8" variants={itemVariants}>
            <div className="performance-score mb-8 text-center">
              <div className="score-circle w-32 h-32 mx-auto mb-4 rounded-full border-8 border-primary/20 flex items-center justify-center relative">
                <div className="text-3xl font-bold text-primary">{Math.round(performanceMetrics.score * 100)}%</div>
                <div 
                  className="absolute inset-0 rounded-full border-8 border-primary border-r-transparent transform -rotate-90"
                  style={{ 
                    clipPath: `polygon(0 0, ${performanceMetrics.score * 100}% 0, ${performanceMetrics.score * 100}% 100%, 0 100%)` 
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('mobile.performance.score')}</h3>
              <p className="text-muted-foreground">
                {performanceMetrics.isOptimal ? t('mobile.performance.optimal') : t('mobile.performance.good')}
              </p>
            </div>

            <div className="optimization-tips grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="tip-category">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-primary" />
                  {t('mobile.performance.tips.title')}
                </h4>
                <ul className="space-y-2">
                  {[
                    'mobile.performance.tips.item1',
                    'mobile.performance.tips.item2',
                    'mobile.performance.tips.item3',
                    'mobile.performance.tips.item4'
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{t(tip)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="data-usage">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-secondary" />
                  {t('mobile.performance.data.title')}
                </h4>
                <ul className="space-y-2">
                  {[
                    'mobile.performance.data.item1',
                    'mobile.performance.data.item2',
                    'mobile.performance.data.item3',
                    'mobile.performance.data.item4'
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{t(tip)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Support & Contact */}
        <motion.section 
          className="mobile-support mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('mobile.support.title')}
          </motion.h2>
          
          <motion.div className="support-grid grid grid-cols-1 md:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="support-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                {t('mobile.support.contact.title')}
              </h3>
              <div className="contact-methods space-y-4">
                <div className="contact-item">
                  <h4 className="font-medium mb-2">{t('mobile.support.contact.general')}</h4>
                  <a href="mailto:support@zealoustech.com" className="text-primary hover:underline">
                    support@zealoustech.com
                  </a>
                </div>
                <div className="contact-item">
                  <h4 className="font-medium mb-2">{t('mobile.support.contact.mobile')}</h4>
                  <a href="mailto:mobile@zealoustech.com" className="text-primary hover:underline">
                    mobile@zealoustech.com
                  </a>
                </div>
                <div className="contact-item">
                  <h4 className="font-medium mb-2">{t('mobile.support.contact.bugs')}</h4>
                  <a href="mailto:bugs@zealoustech.com" className="text-primary hover:underline">
                    bugs@zealoustech.com
                  </a>
                </div>
              </div>
            </div>

            <div className="resources-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <ExternalLink className="w-6 h-6 text-secondary" />
                {t('mobile.support.resources.title')}
              </h3>
              <div className="resources-list space-y-3">
                <a href="/guide" className="resource-link flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors">
                  <FileImage className="w-5 h-5 text-primary" />
                  <span>{t('mobile.support.resources.guide')}</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </a>
                <a href="/faq" className="resource-link flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  <span>{t('mobile.support.resources.faq')}</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </a>
                <a href="/support" className="resource-link flex items-center gap-3 p-3 rounded-lg hover:bg-background transition-colors">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{t('mobile.support.resources.support')}</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}; 