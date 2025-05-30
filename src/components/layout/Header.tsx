import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  BookOpen, 
  HelpCircle, 
  Moon, 
  Sun, 
  Monitor,
  Clock,
  Zap,
  Download,
  Settings,
  Globe,
  ChevronDown,
  Sliders
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import ToolsDropdown from '@/components/ToolsDropdown';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' }
];

export const Header = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { 
    theme, 
    setTheme, 
    autoDownload, 
    setAutoDownload, 
    defaultQuality, 
    setDefaultQuality
  } = useAppStore();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState('Global');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const selectedLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Detect user's timezone/location
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const region = timezone.split('/')[0];
      setUserLocation(region);
    } catch (error) {
      console.log('Could not detect timezone');
    }

    return () => clearInterval(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowLanguageDropdown(false);
    };

    if (showLanguageDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showLanguageDropdown]);

  const handleLanguageChange = (language: Language) => {
    i18n.changeLanguage(language.code);
    setShowLanguageDropdown(false);
    
    // Save to localStorage
    localStorage.setItem('selectedLanguage', language.code);
    
    console.log(`Language changed to: ${language.name}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getQualityColor = (quality: number) => {
    if (quality <= 0.3) return 'from-red-500 to-orange-500';
    if (quality <= 0.7) return 'from-orange-500 to-yellow-500';
    return 'from-yellow-500 to-green-500';
  };

  const isActive = (path: string) => location.pathname === path;

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="main-navigation">
        {/* Left Section - Logo */}
        <div className="nav-left">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
            >
              <Zap className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pixly Forge
            </span>
          </Link>
        </div>

        {/* Center Section - Main Navigation */}
        <div className="nav-center">
          <Link
            to="/"
            className={`nav-button ${isActive('/') ? 'active' : ''}`}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">{t('nav.converter')}</span>
          </Link>
          
          {/* Tools Dropdown */}
          <ToolsDropdown />
          
          <Link
            to="/guide"
            className={`nav-button ${isActive('/guide') ? 'active' : ''}`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">{t('nav.guide')}</span>
          </Link>
          
          <Link
            to="/faq"
            className={`nav-button ${isActive('/faq') ? 'active' : ''}`}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{t('nav.faq')}</span>
          </Link>
        </div>

        {/* Right Section - Settings & Theme */}
        <div className="nav-right">
          {/* Settings Group */}
          <div className="nav-settings-group">
            {/* Auto Download Control */}
            <div className="nav-setting-item">
              <span className="nav-setting-label">{t('nav.auto')}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setAutoDownload(!autoDownload)}
                className={`nav-auto-download ${autoDownload ? 'active' : ''}`}
              >
                <motion.div
                  animate={{ x: autoDownload ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="nav-toggle-thumb"
                />
              </motion.button>
            </div>

            {/* Quality Control */}
            <div className="nav-setting-item">
              <span className="nav-setting-label">{t('nav.quality')}</span>
              <div className="nav-quality-control">
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={defaultQuality}
                  onChange={(e) => setDefaultQuality(parseFloat(e.target.value))}
                  className={`nav-quality-slider bg-gradient-to-r ${getQualityColor(defaultQuality)}`}
                />
                <span className="nav-quality-value">
                  {Math.round(defaultQuality * 100)}%
                </span>
              </div>
            </div>

            {/* Enhanced Language Selector */}
            <div className="nav-setting-item">
              <div 
                className={`nav-language-selector ${showLanguageDropdown ? 'open' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguageDropdown(!showLanguageDropdown);
                }}
              >
                <span className="language-flag">{selectedLanguage.flag}</span>
                <span className="language-text">{selectedLanguage.code.toUpperCase()}</span>
                <span className="dropdown-arrow">▼</span>
                
                <div className="language-dropdown">
                  {languages.map((language) => (
                    <div
                      key={language.code}
                      className={`language-option ${language.code === i18n.language ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageChange(language);
                      }}
                    >
                      <span className="language-flag">{language.flag}</span>
                      <span className="language-text">{language.nativeName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Clock & Location */}
          <div className="nav-clock-section">
            <div className="text-right">
              <div className="text-sm font-mono font-semibold">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(currentTime)} • 🌏 {userLocation}
              </div>
            </div>
          </div>

          {/* Theme Controls */}
          <div className="theme-controls">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'cyber' : 'light')}
              className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              title="Toggle theme"
            >
              {theme === 'light' ? (
                <Sun className="w-4 h-4" />
              ) : theme === 'dark' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              <span className="hidden lg:inline">
                {t(`theme.${theme}`)}
              </span>
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
