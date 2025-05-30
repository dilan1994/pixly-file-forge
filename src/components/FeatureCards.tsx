import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileImage, Upload, Download, Zap, Shield, Star } from 'lucide-react';

export const FeatureCards = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      id: 'formats',
      icon: FileImage,
      titleKey: 'features.multiple.title',
      descriptionKey: 'features.multiple.description',
      actionKey: 'features.multiple.action',
      variant: 'multiple',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'batch',
      icon: Upload,
      titleKey: 'features.batch.title',
      descriptionKey: 'features.batch.description',
      actionKey: 'features.batch.action',
      variant: 'batch',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'download',
      icon: Download,
      titleKey: 'features.download.title',
      descriptionKey: 'features.download.description',
      actionKey: 'features.download.action',
      variant: 'download',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="features-section"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="features-title"
      >
        {t('features.title')}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="features-subtitle"
      >
        {t('features.subtitle')}
      </motion.p>
      
      <div className="features-grid">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.9 + index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              className={`feature-card feature-card-${feature.variant}`}
            >
              <div className="feature-card-content">
                <motion.div 
                  className="feature-icon"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <IconComponent className="w-8 h-8" />
                </motion.div>
                
                <h3 className="feature-title">{t(feature.titleKey)}</h3>
                
                <p className="feature-description">
                  {t(feature.descriptionKey)}
                </p>
                
                <motion.div 
                  className="feature-action"
                  whileHover={{ 
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span>{t(feature.actionKey)}</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${feature.gradient.split(' ')[1]} 0%, ${feature.gradient.split(' ')[3]} 100%)`,
                  filter: 'blur(20px)',
                  zIndex: -1
                }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Additional Features Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/20 border border-border/50">
          <Shield className="w-6 h-6 text-green-500" />
          <div>
            <h4 className="font-semibold text-sm">{t('features.privacy.title')}</h4>
            <p className="text-xs text-muted-foreground">{t('features.privacy.description')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/20 border border-border/50">
          <Zap className="w-6 h-6 text-yellow-500" />
          <div>
            <h4 className="font-semibold text-sm">{t('features.fast.title')}</h4>
            <p className="text-xs text-muted-foreground">{t('features.fast.description')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/20 border border-border/50">
          <Star className="w-6 h-6 text-purple-500" />
          <div>
            <h4 className="font-semibold text-sm">{t('features.quality.title')}</h4>
            <p className="text-xs text-muted-foreground">{t('features.quality.description')}</p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}; 