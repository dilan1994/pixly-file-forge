
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileImage, Download, Upload, Zap, FileText, Image } from 'lucide-react';
import { ConversionTab } from '@/types';

const CONVERSION_TABS: ConversionTab[] = [
  { 
    id: 'jpg-to-png', 
    label: 'JPG → PNG', 
    fromFormat: 'jpg', 
    toFormat: 'png', 
    description: 'Convert JPEG images to PNG format',
    icon: 'ArrowRight'
  },
  { 
    id: 'png-to-jpg', 
    label: 'PNG → JPG', 
    fromFormat: 'png', 
    toFormat: 'jpg', 
    description: 'Convert PNG images to JPEG format',
    icon: 'ArrowRight'
  },
  { 
    id: 'heic-to-jpg', 
    label: 'HEIC → JPG', 
    fromFormat: 'heic', 
    toFormat: 'jpg', 
    description: 'Convert HEIC images to JPEG format',
    icon: 'FileImage'
  },
  { 
    id: 'webp-to-png', 
    label: 'WebP → PNG', 
    fromFormat: 'webp', 
    toFormat: 'png', 
    description: 'Convert WebP images to PNG format',
    icon: 'Zap'
  },
  { 
    id: 'webp-to-jpg', 
    label: 'WebP → JPG', 
    fromFormat: 'webp', 
    toFormat: 'jpg', 
    description: 'Convert WebP images to JPEG format',
    icon: 'Zap'
  },
  { 
    id: 'pdf-to-jpg', 
    label: 'PDF → JPG', 
    fromFormat: 'pdf', 
    toFormat: 'jpg', 
    description: 'Convert PDF pages to JPEG images',
    icon: 'FileText'
  },
  { 
    id: 'jpg-to-pdf', 
    label: 'JPG → PDF', 
    fromFormat: 'jpg', 
    toFormat: 'pdf', 
    description: 'Convert JPEG images to PDF format',
    icon: 'FileText'
  },
  { 
    id: 'any-to-webp', 
    label: 'Any → WebP', 
    fromFormat: 'jpg', 
    toFormat: 'webp', 
    description: 'Convert any image to WebP format',
    icon: 'Image'
  },
];

const iconMap = {
  ArrowRight,
  FileImage,
  Download,
  Upload,
  Zap,
  FileText,
  Image
};

interface ConversionTabsProps {
  activeTab: string;
  onTabChange: (tab: ConversionTab) => void;
}

export const ConversionTabs = ({ activeTab, onTabChange }: ConversionTabsProps) => {
  return (
    <div className="w-full container-type-inline-size container-name-main-content">
      {/* Modern Square Tab Layout */}
      <div className="conversion-tabs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 max-w-6xl mx-auto">
        {CONVERSION_TABS.map((tab, index) => {
          const IconComponent = iconMap[tab.icon as keyof typeof iconMap] || ArrowRight;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(tab)}
              className={`
                tab-button relative aspect-square rounded-xl transition-all duration-300 
                backdrop-blur-md border overflow-hidden group
                ${isActive 
                  ? 'bg-primary/20 border-primary/40 shadow-lg shadow-primary/20' 
                  : 'bg-surface/50 border-primary/20 hover:bg-primary/10 hover:border-primary/30'
                }
              `}
            >
              {/* Gradient overlay for active state */}
              <div className={`
                absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 
                transition-opacity duration-300
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
              `} />
              
              {/* Content */}
              <div className="tab-content relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
                <div className={`
                  tab-icon mb-3 p-3 rounded-lg transition-all duration-300
                  ${isActive 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                  }
                `}>
                  <IconComponent className="w-6 h-6" />
                </div>
                
                <div className="tab-title text-sm font-semibold text-text mb-1 leading-tight">
                  {tab.label}
                </div>
                
                <div className="tab-subtitle text-xs text-text/60 leading-tight">
                  {tab.fromFormat.toUpperCase()} to {tab.toFormat.toUpperCase()}
                </div>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Active tab description */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        {CONVERSION_TABS.map((tab) => (
          activeTab === tab.id && (
            <p key={tab.id} className="text-text/70 text-sm max-w-md mx-auto">
              {tab.description}
            </p>
          )
        ))}
      </motion.div>
    </div>
  );
};
