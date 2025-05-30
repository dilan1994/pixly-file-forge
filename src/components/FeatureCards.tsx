import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileImage, Upload, Download, Zap, Shield, Star, ArrowRight } from 'lucide-react';

export const FeatureCards = () => {
  const { t } = useTranslation();
  
  const mainFeatures = [
    {
      id: 'formats',
      icon: FileImage,
      titleKey: 'features.multiple.title',
      descriptionKey: 'features.multiple.description',
      actionKey: 'features.multiple.action',
      variant: 'multiple',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      id: 'batch',
      icon: Upload,
      titleKey: 'features.batch.title',
      descriptionKey: 'features.batch.description',
      actionKey: 'features.batch.action',
      variant: 'batch',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20'
    },
    {
      id: 'download',
      icon: Download,
      titleKey: 'features.download.title',
      descriptionKey: 'features.download.description',
      actionKey: 'features.download.action',
      variant: 'download',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20'
    }
  ];

  const additionalFeatures = [
    {
      id: 'privacy',
      icon: Shield,
      titleKey: 'features.privacy.title',
      descriptionKey: 'features.privacy.description',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      variant: 'privacy'
    },
    {
      id: 'speed',
      icon: Zap,
      titleKey: 'features.fast.title',
      descriptionKey: 'features.fast.description',
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      variant: 'speed'
    },
    {
      id: 'quality',
      icon: Star,
      titleKey: 'features.quality.title',
      descriptionKey: 'features.quality.description',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
      variant: 'quality'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="features-section-enhanced"
    >
      {/* Section Header */}
      <div className="features-header-enhanced">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="features-title-enhanced"
        >
          {t('features.title')}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="features-subtitle-enhanced"
        >
          {t('features.subtitle')}
        </motion.p>
      </div>
      
      {/* Main Features Grid - Centered Layout */}
      <div className="main-features-grid">
        {mainFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.9 + index * 0.15, 
                duration: 0.7,
                type: "spring",
                stiffness: 120,
                damping: 15
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.97 }}
              className={`main-feature-card feature-card-${feature.variant}`}
            >
              {/* Card Content */}
              <div className="feature-card-content-enhanced">
                {/* Icon Section */}
                <motion.div 
                  className={`feature-icon-enhanced ${feature.bgColor}`}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                </motion.div>
                
                {/* Text Content */}
                <div className="feature-text-content">
                  <h3 className="feature-title-enhanced">{t(feature.titleKey)}</h3>
                  
                  <p className="feature-description-enhanced">
                    {t(feature.descriptionKey)}
                  </p>
                </div>
                
                {/* Action Link */}
                <motion.a 
                  href="#"
                  className="feature-action-enhanced"
                  whileHover={{ 
                    x: 4,
                    transition: { duration: 0.3 }
                  }}
                >
                  <span className="action-text">{t(feature.actionKey)}</span>
                  <ArrowRight className="action-arrow" />
                </motion.a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Features Row - Horizontal Pills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="additional-features-grid"
      >
        {additionalFeatures.map((feature, index) => {
          const IconComponent = feature.icon;
          
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 1.6 + index * 0.1, 
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                transition: { duration: 0.3 }
              }}
              className={`additional-feature-card feature-pill-${feature.variant}`}
            >
              <motion.div 
                className={`additional-feature-icon ${feature.bgColor}`}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              >
                <IconComponent className={`w-5 h-5 ${feature.iconColor}`} />
              </motion.div>
              
              <div className="additional-feature-content">
                <h4 className="additional-feature-title">{t(feature.titleKey)}</h4>
                <p className="additional-feature-description">{t(feature.descriptionKey)}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}; 