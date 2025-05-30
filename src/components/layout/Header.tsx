import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  HelpCircle, 
  Moon, 
  Sun, 
  Monitor,
  Clock,
  Zap
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useAppStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userCountry, setUserCountry] = useState('US');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Detect user's country/timezone
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const country = timezone.split('/')[0] === 'America' ? 'US' : 
                     timezone.split('/')[0] === 'Europe' ? 'EU' : 'US';
      setUserCountry(country);
    } catch (error) {
      console.log('Could not detect timezone');
    }

    return () => clearInterval(timer);
  }, []);

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

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/guide', label: 'Guide', icon: BookOpen },
    { path: '/faq', label: 'FAQ', icon: HelpCircle }
  ];

  const themeIcons = {
    light: Sun,
    dark: Moon,
    cyberpunk: Monitor
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'cyberpunk'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const ThemeIcon = themeIcons[theme];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <Zap className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 h-8 w-8 text-primary animate-pulse opacity-50" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pixly Forge
            </span>
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Real-time Clock */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-accent/50 rounded-lg border"
          >
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              <div className="font-mono font-semibold text-foreground">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(currentTime)}
              </div>
            </div>
            <div className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">
              {userCountry}
            </div>
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={cycleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
            title={`Current theme: ${theme}`}
          >
            <ThemeIcon className="h-4 w-4" />
          </motion.button>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
            >
              <div className="space-y-1">
                <div className="w-4 h-0.5 bg-foreground"></div>
                <div className="w-4 h-0.5 bg-foreground"></div>
                <div className="w-4 h-0.5 bg-foreground"></div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur"
      >
        <div className="container px-4 py-4">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
};
