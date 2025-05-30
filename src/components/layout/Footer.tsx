
import { useState } from 'react';
import { Settings, Download, Palette, Globe } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Footer = () => {
  const [showPreferences, setShowPreferences] = useState(false);
  const {
    clockFormat,
    autoDownload,
    defaultQuality,
    preferredFormat,
    setClockFormat,
    setAutoDownload,
    setDefaultQuality,
    setPreferredFormat,
  } = useAppStore();

  return (
    <footer className="mt-auto border-t border-primary/20 bg-surface/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text/60">
            © 2024 ImageConverter. All rights reserved.
          </div>
          
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Preferences</span>
          </button>
        </div>

        <AnimatePresence>
          {showPreferences && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden"
            >
              {/* Clock Format */}
              <div className="bg-background/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Clock Format</h3>
                </div>
                <select
                  value={clockFormat}
                  onChange={(e) => setClockFormat(e.target.value as '12h' | '24h')}
                  className="w-full px-3 py-2 bg-surface border border-primary/20 rounded-md text-sm"
                >
                  <option value="12h">12 Hour</option>
                  <option value="24h">24 Hour</option>
                </select>
              </div>

              {/* Auto Download */}
              <div className="bg-background/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Download className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Auto Download</h3>
                </div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={autoDownload}
                    onChange={(e) => setAutoDownload(e.target.checked)}
                    className="rounded border-primary/20"
                  />
                  <span className="text-sm">Enable auto download</span>
                </label>
              </div>

              {/* Default Quality */}
              <div className="bg-background/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Palette className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Default Quality</h3>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={defaultQuality}
                  onChange={(e) => setDefaultQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-text/60 mt-1">
                  {Math.round(defaultQuality * 100)}%
                </div>
              </div>

              {/* Preferred Format */}
              <div className="bg-background/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Settings className="w-4 h-4 text-primary" />
                  <h3 className="font-medium">Preferred Format</h3>
                </div>
                <select
                  value={preferredFormat}
                  onChange={(e) => setPreferredFormat(e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-primary/20 rounded-md text-sm"
                >
                  <option value="jpg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};
