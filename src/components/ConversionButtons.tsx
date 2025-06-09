import { motion } from 'framer-motion';
import { ArrowRight, FileImage, Zap, FileText, Image, FileType, Camera, Palette, Star, RotateCcw, Sparkles, Globe } from 'lucide-react';
import { ConversionTab } from '@/types';
import { ConverterButton } from '@/components/ui/ConverterButton';

const CONVERSION_OPTIONS: ConversionTab[] = [
  { 
    id: 'jpg-to-png', 
    label: 'JPG → PNG', 
    fromFormat: 'jpg', 
    toFormat: 'png', 
    description: 'Convert JPEG to PNG with transparency support',
    icon: 'ArrowRight',
    gradient: 'from-blue-500 to-purple-600'
  },
  { 
    id: 'png-to-jpg', 
    label: 'PNG → JPG', 
    fromFormat: 'png', 
    toFormat: 'jpg', 
    description: 'Convert PNG to JPEG with compression',
    icon: 'ArrowRight',
    gradient: 'from-green-500 to-teal-600'
  },
  { 
    id: 'heic-to-jpg', 
    label: 'HEIC → JPG', 
    fromFormat: 'heic', 
    toFormat: 'jpg', 
    description: 'Convert iPhone HEIC photos to JPG',
    icon: 'Camera',
    gradient: 'from-cyan-500 to-blue-600'
  },
  { 
    id: 'webp-to-png', 
    label: 'WebP → PNG', 
    fromFormat: 'webp', 
    toFormat: 'png', 
    description: 'Convert modern WebP to PNG format',
    icon: 'Globe',
    gradient: 'from-orange-500 to-red-600'
  },
  { 
    id: 'webp-to-jpg', 
    label: 'WebP → JPG', 
    fromFormat: 'webp', 
    toFormat: 'jpg', 
    description: 'Convert WebP to JPEG format',
    icon: 'Zap',
    gradient: 'from-pink-500 to-rose-600'
  },
  { 
    id: 'pdf-to-jpg', 
    label: 'PDF → JPG', 
    fromFormat: 'pdf', 
    toFormat: 'jpg', 
    description: 'Extract images from PDF documents',
    icon: 'FileText',
    gradient: 'from-indigo-500 to-purple-600'
  },
  { 
    id: 'bmp-to-png', 
    label: 'BMP → PNG', 
    fromFormat: 'bmp', 
    toFormat: 'png', 
    description: 'Convert bitmap images to PNG',
    icon: 'Image',
    gradient: 'from-emerald-500 to-green-600'
  },
  { 
    id: 'tiff-to-jpg', 
    label: 'TIFF → JPG', 
    fromFormat: 'tiff', 
    toFormat: 'jpg', 
    description: 'Convert high-quality TIFF to JPG',
    icon: 'FileImage',
    gradient: 'from-amber-500 to-orange-600'
  },
  { 
    id: 'gif-to-png', 
    label: 'GIF → PNG', 
    fromFormat: 'gif', 
    toFormat: 'png', 
    description: 'Convert animated GIF to static PNG',
    icon: 'Palette',
    gradient: 'from-violet-500 to-purple-600'
  },
  { 
    id: 'svg-to-png', 
    label: 'SVG → PNG', 
    fromFormat: 'svg', 
    toFormat: 'png', 
    description: 'Convert vector SVG to raster PNG',
    icon: 'Star',
    gradient: 'from-sky-500 to-cyan-600'
  },
  { 
    id: 'ico-to-png', 
    label: 'ICO → PNG', 
    fromFormat: 'ico', 
    toFormat: 'png', 
    description: 'Convert icon files to PNG format',
    icon: 'RotateCcw',
    gradient: 'from-lime-500 to-green-600'
  },
  { 
    id: 'any-to-webp', 
    label: 'Any → WebP', 
    fromFormat: 'jpg', 
    toFormat: 'webp', 
    description: 'Convert any image to modern WebP',
    icon: 'Sparkles',
    gradient: 'from-fuchsia-500 to-pink-600'
  }
];

interface ConversionButtonsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const ConversionButtons = ({ activeTab, onTabChange }: ConversionButtonsProps) => {
  const getIconComponent = (iconName: string) => {
    const icons = {
      ArrowRight,
      FileImage,
      Zap,
      FileText,
      Image,
      FileType,
      Camera,
      Palette,
      Star,
      RotateCcw,
      Sparkles,
      Globe
    };
    return icons[iconName as keyof typeof icons] || ArrowRight;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-7xl mx-auto px-4 py-6"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Quick Conversion Options 🎯
        </h2>
        <p className="text-muted-foreground">
          Choose your conversion type and start transforming your images instantly
        </p>
        <div className="mt-2 text-xs text-blue-600 font-mono">
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </motion.div>

      {/* Conversion Tabs Menu - Two-Row Grid Layout */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 justify-items-center p-6 mb-6 max-w-6xl mx-auto"
        >
          {CONVERSION_OPTIONS.map((option, index) => {
            const IconComponent = getIconComponent(option.icon || 'ArrowRight');
            const isActive = activeTab === option.id;
            
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <ConverterButton
                  onClick={() => onTabChange(option.id)}
                  gradient={option.gradient}
                  isActive={isActive}
                  icon={<IconComponent className="w-4 h-4" />}
                  className="w-full"
                >
                  {option.label}
                </ConverterButton>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Grid Indicators */}
        <div className="flex justify-center mt-4 gap-2 md:hidden">
          {[0, 1, 2, 3, 4, 5].map((dot) => (
            <motion.div
              key={dot}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                dot === 0 ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>

      {/* Active Conversion Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        {activeTab && (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/50 rounded-full border">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">
              Ready to convert{' '}
              <span className="font-bold text-primary">
                {CONVERSION_OPTIONS.find(opt => opt.id === activeTab)?.description || 'your images'}
              </span>
            </span>
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}; 