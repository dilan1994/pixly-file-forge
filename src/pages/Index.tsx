import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Settings, Trash2, Play, FileImage, Upload, Download } from 'lucide-react';
import { ConversionTabs } from '@/components/ConversionTabs';
import { ConversionButtons } from '@/components/ConversionButtons';
import { FileUpload } from '@/components/FileUpload';
import { FileQueue } from '@/components/FileQueue';
import { FeatureCards } from '@/components/FeatureCards';
import { ConverterButton } from '@/components/ui/ConverterButton';
import { useImageConverter } from '@/hooks/useImageConverter';
import { ConversionTab, ConversionSettings } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';

const Index = () => {
  const [activeTab, setActiveTab] = useState('jpg-to-png');
  const [currentConversion, setCurrentConversion] = useState<ConversionTab>({
    id: 'jpg-to-png',
    label: 'JPG to PNG',
    fromFormat: 'jpg',
    toFormat: 'png',
    description: 'Convert JPEG images to PNG format'
  });
  const [showSettings, setShowSettings] = useState(false);
  
  const { defaultQuality, preferredFormat } = useAppStore();
  const [settings, setSettings] = useState<ConversionSettings>({
    quality: defaultQuality,
    format: 'png',
    maintainAspectRatio: true
  });

  const {
    files,
    isConverting,
    addFiles,
    convertFiles,
    removeFile,
    clearAll
  } = useImageConverter();

  const handleTabChange = (tab: ConversionTab) => {
    setActiveTab(tab.id);
    setCurrentConversion(tab);
    setSettings(prev => ({ ...prev, format: tab.toFormat }));
  };

  const handleTabChangeById = (tabId: string) => {
    // Define the conversion options to match the ones in ConversionButtons
    const conversionOptions = [
      { id: 'jpg-to-png', label: 'JPG → PNG', fromFormat: 'jpg' as const, toFormat: 'png' as const, description: 'Convert JPEG to PNG with transparency support' },
      { id: 'png-to-jpg', label: 'PNG → JPG', fromFormat: 'png' as const, toFormat: 'jpg' as const, description: 'Convert PNG to JPEG with compression' },
      { id: 'heic-to-jpg', label: 'HEIC → JPG', fromFormat: 'heic' as const, toFormat: 'jpg' as const, description: 'Convert iPhone HEIC photos to JPG' },
      { id: 'webp-to-png', label: 'WebP → PNG', fromFormat: 'webp' as const, toFormat: 'png' as const, description: 'Convert modern WebP to PNG format' },
      { id: 'webp-to-jpg', label: 'WebP → JPG', fromFormat: 'webp' as const, toFormat: 'jpg' as const, description: 'Convert WebP to JPEG format' },
      { id: 'pdf-to-jpg', label: 'PDF → JPG', fromFormat: 'pdf' as const, toFormat: 'jpg' as const, description: 'Extract images from PDF documents' },
      { id: 'bmp-to-png', label: 'BMP → PNG', fromFormat: 'bmp' as const, toFormat: 'png' as const, description: 'Convert bitmap images to PNG' },
      { id: 'tiff-to-jpg', label: 'TIFF → JPG', fromFormat: 'tiff' as const, toFormat: 'jpg' as const, description: 'Convert high-quality TIFF to JPG' },
      { id: 'gif-to-png', label: 'GIF → PNG', fromFormat: 'gif' as const, toFormat: 'png' as const, description: 'Convert animated GIF to static PNG' },
      { id: 'svg-to-png', label: 'SVG → PNG', fromFormat: 'svg' as const, toFormat: 'png' as const, description: 'Convert vector SVG to raster PNG' },
      { id: 'ico-to-png', label: 'ICO → PNG', fromFormat: 'ico' as const, toFormat: 'png' as const, description: 'Convert icon files to PNG format' },
      { id: 'any-to-webp', label: 'Any → WebP', fromFormat: 'jpg' as const, toFormat: 'webp' as const, description: 'Convert any image to modern WebP' }
    ];

    const selectedTab = conversionOptions.find(option => option.id === tabId);
    if (selectedTab) {
      setActiveTab(selectedTab.id);
      setCurrentConversion(selectedTab);
      setSettings(prev => ({ ...prev, format: selectedTab.toFormat }));
    }
  };

  const handleFilesAdded = (newFiles: File[]) => {
    addFiles(newFiles, currentConversion.toFormat);
  };

  const handleConvert = () => {
    convertFiles(settings);
  };

  const pendingFilesCount = files.filter(f => f.status === 'pending').length;
  const completedFilesCount = files.filter(f => f.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Toaster position="top-right" />
      
      {/* ENHANCED VERSION BANNER */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-2 px-4 font-bold">
        🚀 ENHANCED VERSION LOADED - Modern UI with 12 Conversion Options & Advanced Features 🚀
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Convert Images Instantly ✨
          </h1>
          <p className="text-xl text-text/70 max-w-2xl mx-auto">
            Transform your images between formats with high quality and lightning speed. 
            All processing happens securely in your browser.
          </p>
          <div className="mt-4 text-sm text-green-600 font-semibold">
            🚀 Enhanced Version - Updated with Modern UI & Features
          </div>
        </motion.div>

        {/* Conversion Buttons - Inline Rectangular Small Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ConversionButtons 
            activeTab={activeTab} 
            onTabChange={handleTabChangeById} 
          />
        </motion.div>

        {/* Conversion Tabs - Large Square Cards (Hidden) */}
        {/* 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ConversionTabs 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
        </motion.div>
        */}

        {/* Upload Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <FileUpload
            onFilesAdded={handleFilesAdded}
            targetFormat={currentConversion.toFormat}
            isConverting={isConverting}
          />
        </motion.div>

        {/* Controls */}
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <ConverterButton
                    onClick={() => setShowSettings(!showSettings)}
                    variant="outline"
                    className="inline-flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </ConverterButton>
                  
                  <div className="text-sm text-gray-600">
                    {pendingFilesCount} pending • {completedFilesCount} completed
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <ConverterButton
                    onClick={clearAll}
                    disabled={isConverting}
                    variant="outline"
                    className="inline-flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All</span>
                  </ConverterButton>
                  
                  <ConverterButton
                    onClick={handleConvert}
                    disabled={pendingFilesCount === 0 || isConverting}
                    variant="default"
                    className="inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isConverting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Converting...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Convert Files</span>
                      </>
                    )}
                  </ConverterButton>
                </div>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quality
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={settings.quality}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          quality: parseFloat(e.target.value) 
                        }))}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round(settings.quality * 100)}%
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Output Format
                      </label>
                      <select
                        value={settings.format}
                        onChange={(e) => setSettings(prev => ({ ...prev, format: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="jpg">JPEG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WebP</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="aspectRatio"
                        checked={settings.maintainAspectRatio}
                        onChange={(e) => setSettings(prev => ({ 
                          ...prev, 
                          maintainAspectRatio: e.target.checked 
                        }))}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="aspectRatio" className="ml-2 text-sm text-gray-700">
                        Maintain aspect ratio
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* File Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FileQueue files={files} onRemoveFile={removeFile} />
        </motion.div>

        {/* Features Section */}
        {files.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <FeatureCards />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
