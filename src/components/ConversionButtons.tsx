import { motion } from 'framer-motion';
import { ArrowRight, FileImage, Zap, FileText, Image, FileType, Camera, Palette, Star, RotateCcw, Sparkles } from 'lucide-react';
import { ConversionTab } from '@/types';

const CONVERSION_OPTIONS: ConversionTab[] = [
  { 
    id: 'jpg-to-png', 
    label: 'JPG → PNG', 
    fromFormat: 'jpg', 
    toFormat: 'png', 
    description: 'Convert JPEG to PNG',
    icon: 'ArrowRight',
    gradient: 'from-blue-500 to-purple-600'
  },
  { 
    id: 'png-to-jpg', 
    label: 'PNG → JPG', 
    fromFormat: 'png', 
    toFormat: 'jpg', 
    description: 'Convert PNG to JPEG',
    icon: 'ArrowRight',
    gradient: 'from-green-500 to-teal-600'
  },
  { 
    id: 'heic-to-jpg', 
    label: 'HEIC → JPG', 
    fromFormat: 'heic', 
    toFormat: 'jpg', 
    description: 'Convert HEIC to JPEG',
    icon: 'FileImage',
    gradient: 'from-pink-500 to-rose-600'
  },
  { 
    id: 'webp-to-png', 
    label: 'WebP → PNG', 
    fromFormat: 'webp', 
    toFormat: 'png', 
    description: 'Convert WebP to PNG',
    icon: 'Zap',
    gradient: 'from-yellow-500 to-orange-600'
  },
  { 
    id: 'webp-to-jpg', 
    label: 'WebP → JPG', 
    fromFormat: 'webp', 
    toFormat: 'jpg', 
    description: 'Convert WebP to JPEG',
    icon: 'Zap',
    gradient: 'from-indigo-500 to-blue-600'
  },
  { 
    id: 'pdf-to-jpg', 
    label: 'PDF → JPG', 
    fromFormat: 'pdf', 
    toFormat: 'jpg', 
    description: 'Convert PDF to JPEG',
    icon: 'FileText',
    gradient: 'from-red-500 to-pink-600'
  },
  { 
    id: 'jpg-to-pdf', 
    label: 'JPG → PDF', 
    fromFormat: 'jpg', 
    toFormat: 'pdf', 
    description: 'Convert JPEG to PDF',
    icon: 'FileText',
    gradient: 'from-purple-500 to-indigo-600'
  },
  { 
    id: 'any-to-webp', 
    label: 'Any → WebP', 
    fromFormat: 'jpg', 
    toFormat: 'webp', 
    description: 'Convert to WebP',
    icon: 'Image',
    gradient: 'from-emerald-500 to-green-600'
  },
  { 
    id: 'bmp-to-png', 
    label: 'BMP → PNG', 
    fromFormat: 'bmp', 
    toFormat: 'png', 
    description: 'Convert BMP to PNG',
    icon: 'FileType',
    gradient: 'from-cyan-500 to-blue-600'
  },
  { 
    id: 'tiff-to-jpg', 
    label: 'TIFF → JPG', 
    fromFormat: 'tiff', 
    toFormat: 'jpg', 
    description: 'Convert TIFF to JPEG',
    icon: 'Camera',
    gradient: 'from-violet-500 to-purple-600'
  },
  { 
    id: 'gif-to-png', 
    label: 'GIF → PNG', 
    fromFormat: 'gif', 
    toFormat: 'png', 
    description: 'Convert GIF to PNG',
    icon: 'Palette',
    gradient: 'from-amber-500 to-yellow-600'
  },
  { 
    id: 'ico-to-png', 
    label: 'ICO → PNG', 
    fromFormat: 'ico', 
    toFormat: 'png', 
    description: 'Convert ICO to PNG',
    icon: 'Star',
    gradient: 'from-slate-500 to-gray-600'
  },
];

const iconMap = {
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
  Sparkles
};

interface ConversionButtonsProps {
  activeTab: string;
  onTabChange: (tab: ConversionTab) => void;
}

export const ConversionButtons = ({ activeTab, onTabChange }: ConversionButtonsProps) => {
  return (
    <div className="main-upload-container w-full max-w-7xl mx-auto mb-8">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Quick Conversion Options
        </h2>
        <p className="text-gray-600 text-sm">
          Choose your conversion format and start transforming your images instantly
        </p>
      </motion.div>

      {/* Enhanced Inline Conversion Tab Menu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="conversion-tab-menu-enhanced flex flex-wrap gap-3 justify-center p-6 mb-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg"
      >
        {CONVERSION_OPTIONS.map((option, index) => {
          const IconComponent = iconMap[option.icon as keyof typeof iconMap] || ArrowRight;
          const isActive = activeTab === option.id;
          
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.08,
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              whileHover={{ 
                y: -4,
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(option)}
              className={`
                conversion-tab-enhanced group relative inline-flex items-center justify-center gap-2 
                px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                border-2 backdrop-blur-md overflow-hidden
                min-w-[140px] h-14 whitespace-nowrap shadow-lg
                lg:px-5 lg:py-4 lg:min-w-[160px] lg:h-16 lg:text-base
                ${isActive 
                  ? `bg-gradient-to-r ${option.gradient} border-white/30 text-white shadow-xl shadow-black/20 transform scale-105` 
                  : 'bg-white/80 border-gray-300/50 text-gray-700 hover:border-gray-400/70 hover:bg-white/90 hover:shadow-xl'
                }
              `}
            >
              {/* Animated background for active state */}
              {isActive && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ 
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
              
              {/* Hover glow effect */}
              <div className={`
                absolute inset-0 rounded-xl transition-opacity duration-300
                ${isActive 
                  ? 'opacity-100' 
                  : 'opacity-0 group-hover:opacity-100'
                }
                bg-gradient-to-r ${option.gradient} blur-xl -z-10 scale-110
              `} />
              
              {/* Content */}
              <div className="relative z-10 flex items-center gap-2 lg:gap-3">
                <IconComponent className={`w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-gray-600'
                }`} />
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs lg:text-sm">
                    {option.fromFormat.toUpperCase()}
                  </span>
                  <motion.span 
                    className="text-sm lg:text-base opacity-80"
                    animate={{ x: isActive ? [0, 3, 0] : 0 }}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                  >
                    →
                  </motion.span>
                  <span className="font-bold text-xs lg:text-sm">
                    {option.toFormat.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Enhanced Conversion Status Info */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="conversion-info-enhanced text-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50"
      >
        {CONVERSION_OPTIONS.map((option) => (
          activeTab === option.id && (
            <div key={option.id} className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500 sparkle-icon" />
              <span className="text-gray-700 font-medium">
                Ready to convert <span className={`font-bold bg-gradient-to-r ${option.gradient} bg-clip-text text-transparent`}>
                  {option.description}
                </span>
              </span>
              <Sparkles className="w-4 h-4 text-purple-500 sparkle-icon" />
            </div>
          )
        ))}
      </motion.div>
    </div>
  );
}; 