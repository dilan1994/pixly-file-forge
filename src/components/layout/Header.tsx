
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, HelpCircle, Settings } from 'lucide-react';
import { Clock } from '@/components/ui/Clock';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion } from 'framer-motion';

export const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Converter' },
    { path: '/guide', icon: BookOpen, label: 'Guide' },
    { path: '/faq', icon: HelpCircle, label: 'FAQ' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-primary/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IC</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ImageConverter
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${location.pathname === path
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-text/70 hover:text-text hover:bg-primary/10'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Clock />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
};
