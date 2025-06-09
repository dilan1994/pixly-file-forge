import { Sun, Moon, Image as ImageIcon } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useAppStore();
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  const themes = [
    { 
      key: 'light', 
      icon: Sun, 
      label: 'Light',
      image: '/White.jpg',
      fallbackColor: '#f8fafc'
    },
    { 
      key: 'dark', 
      icon: Moon, 
      label: 'Dark',
      image: '/Dark.jpg',
      fallbackColor: '#020617'
    },
  ] as const;

  // Function to preload images and check if they exist
  const preloadImage = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  };

  // Function to apply background image with fallback
  const applyThemeBackground = async (selectedTheme: 'light' | 'dark') => {
    const currentTheme = themes.find(t => t.key === selectedTheme);
    if (!currentTheme) return;

    try {
      // Check if image exists
      const imageExists = await preloadImage(currentTheme.image);
      
      // Apply background with smooth transition
      const body = document.body;
      body.style.transition = 'all 0.5s ease-in-out';
      
      if (imageExists) {
        body.style.backgroundImage = `url('${currentTheme.image}')`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundAttachment = 'fixed';
      } else {
        // Fallback to solid color
        body.style.backgroundImage = 'none';
        body.style.backgroundColor = currentTheme.fallbackColor;
      }

      // Add overlay for better text readability
      let overlay = document.querySelector('.theme-overlay') as HTMLElement;
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'theme-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          transition: background 0.5s ease-in-out;
        `;
        document.body.appendChild(overlay);
      }
      
      overlay.style.background = selectedTheme === 'light' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 0, 0, 0.3)';

      setImageError(prev => ({ ...prev, [selectedTheme]: !imageExists }));
      
      // Also update the HTML data-theme attribute for CSS
      document.documentElement.setAttribute('data-theme', selectedTheme);
      
    } catch (error) {
      console.warn(`Failed to load theme image for ${selectedTheme}:`, error);
      setImageError(prev => ({ ...prev, [selectedTheme]: true }));
      
      // Fallback to solid color
      const body = document.body;
      body.style.backgroundImage = 'none';
      body.style.backgroundColor = currentTheme.fallbackColor;
    }
  };

  // Apply theme background when component mounts or theme changes
  useEffect(() => {
    applyThemeBackground(theme);
  }, [theme]);

  // Initialize theme on mount
  useEffect(() => {
    applyThemeBackground(theme);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    console.log(`🎨 Changing theme from ${theme} to ${newTheme}`);
    setTheme(newTheme);
  };

  return (
    <div className="relative">
      {/* Theme Toggle Container */}
      <div className="flex items-center bg-surface/90 backdrop-blur-md rounded-lg p-1 border border-primary/20 shadow-lg">
        {themes.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => handleThemeChange(key)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
              ${theme === key 
                ? 'bg-primary text-white shadow-lg scale-105 ring-2 ring-primary/30' 
                : 'text-text/70 hover:text-text hover:bg-primary/10 hover:scale-102'
              }
            `}
            title={`Switch to ${label} theme`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:block">{label}</span>
            
            {/* Error indicator for failed image loads */}
            {imageError[key] && (
              <div title="Image not found, using fallback">
                <ImageIcon className="w-3 h-3 text-yellow-500 opacity-60" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Current Theme Indicator */}
      <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-primary shadow-md animate-pulse" />
    </div>
  );
}; 