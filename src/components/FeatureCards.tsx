import { motion } from 'framer-motion';
import { FileImage, Upload, Download, Zap, Shield, Star } from 'lucide-react';

export const FeatureCards = () => {
  const features = [
    {
      id: 'formats',
      icon: FileImage,
      title: '12 Format Support',
      description: 'Support for JPG, PNG, WebP, HEIC, BMP, TIFF, GIF, SVG, ICO, and PDF formats with high-quality conversion and transparency preservation.',
      action: 'Learn more',
      variant: 'multiple',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 'batch',
      icon: Upload,
      title: 'Batch Processing',
      description: 'Convert multiple images at once with drag & drop support, progress tracking, and queue management for efficient bulk processing.',
      action: 'Start batch conversion',
      variant: 'batch',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'download',
      icon: Download,
      title: 'Easy Download',
      description: 'Download converted files individually or as a ZIP archive for bulk downloads. Auto-download option available for seamless workflow.',
      action: 'Download options',
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
        Powerful Image Conversion Features
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="features-subtitle"
      >
        Convert your images between multiple formats with high quality and speed. All processing 
        happens in your browser for maximum privacy.
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
                
                <h3 className="feature-title">{feature.title}</h3>
                
                <p className="feature-description">
                  {feature.description}
                </p>
                
                <motion.div 
                  className="feature-action"
                  whileHover={{ 
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span>{feature.action}</span>
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
            <h4 className="font-semibold text-sm">Privacy First</h4>
            <p className="text-xs text-muted-foreground">All processing in browser</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/20 border border-border/50">
          <Zap className="w-6 h-6 text-yellow-500" />
          <div>
            <h4 className="font-semibold text-sm">Lightning Fast</h4>
            <p className="text-xs text-muted-foreground">Instant conversions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/20 border border-border/50">
          <Star className="w-6 h-6 text-purple-500" />
          <div>
            <h4 className="font-semibold text-sm">High Quality</h4>
            <p className="text-xs text-muted-foreground">Lossless conversion</p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}; 