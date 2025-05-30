import { useState } from 'react';
import { Settings, Download, Palette, Globe } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart, 
  FileText,
  HelpCircle,
  BookOpen,
  Zap,
  Shield
} from 'lucide-react';

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
    theme
  } = useAppStore();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Image Converter', href: '/', icon: Zap },
        { label: 'Batch Processing', href: '/#batch', icon: Download },
        { label: 'API Access', href: '/api', icon: Settings },
        { label: 'Mobile App', href: '/mobile', icon: Globe }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'User Guide', href: '/guide', icon: BookOpen },
        { label: 'FAQ', href: '/faq', icon: HelpCircle },
        { label: 'Blog', href: '/blog', icon: FileText },
        { label: 'Changelog', href: '/changelog', icon: FileText }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about', icon: Heart },
        { label: 'Contact', href: '/contact', icon: Mail },
        { label: 'Support', href: '/support', icon: HelpCircle },
        { label: 'Careers', href: '/careers', icon: Globe }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy', icon: Shield },
        { label: 'Terms of Service', href: '/terms', icon: FileText },
        { label: 'Cookie Policy', href: '/cookies', icon: Settings },
        { label: 'GDPR', href: '/gdpr', icon: Shield }
      ]
    }
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'Email', href: 'mailto:support@pixlyforge.com', icon: Mail }
  ];

  const qualityPresets = [
    { label: 'High', value: 0.9 },
    { label: 'Medium', value: 0.7 },
    { label: 'Low', value: 0.5 }
  ];

  return (
    <footer className="bg-background border-t border-border/40">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        <Icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                        <span className="text-sm">{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border/40"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pixly Forge
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-colors"
                    title={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Preferences Bar */}
      <div className="border-t border-border/40 bg-accent/30">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0"
          >
            {/* Preferences Controls */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Clock Format Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Time:</span>
                <button
                  onClick={() => setClockFormat(clockFormat === '12h' ? '24h' : '12h')}
                  className={`
                    px-3 py-1 rounded-md text-xs font-medium transition-colors
                    ${clockFormat === '12h' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground hover:bg-accent/80'
                    }
                  `}
                >
                  12H
                </button>
                <button
                  onClick={() => setClockFormat(clockFormat === '24h' ? '12h' : '24h')}
                  className={`
                    px-3 py-1 rounded-md text-xs font-medium transition-colors
                    ${clockFormat === '24h' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground hover:bg-accent/80'
                    }
                  `}
                >
                  24H
                </button>
              </div>

              {/* Auto Download Toggle */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Auto Download:</span>
                <button
                  onClick={() => setAutoDownload(!autoDownload)}
                  className={`
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${autoDownload ? 'bg-primary' : 'bg-accent'}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${autoDownload ? 'translate-x-6' : 'translate-x-1'}
                    `}
                  />
                </button>
              </div>

              {/* Quality Presets */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Quality:</span>
                <div className="flex space-x-1">
                  {qualityPresets.map((preset) => (
                    <button
                      key={preset.label}
                      className="px-2 py-1 rounded text-xs font-medium bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <select className="bg-accent text-accent-foreground text-xs rounded px-2 py-1 border-0">
                  <option value="en">🇺🇸 English</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="fr">🇫🇷 Français</option>
                  <option value="de">🇩🇪 Deutsch</option>
                  <option value="zh">🇨🇳 中文</option>
                </select>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-xs text-muted-foreground">
              © 2024 Pixly Forge. Made with{' '}
              <Heart className="inline h-3 w-3 text-red-500" />{' '}
              for creators worldwide.
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
