import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings,
  Download,
  Globe,
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart, 
  FileText,
  HelpCircle,
  BookOpen,
  Image,
  Shield,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t, i18n } = useTranslation();
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
    theme,
    setTheme,
    language,
    setLanguage
  } = useAppStore();

  const productLinks = [
    { label: 'Image Converter', href: '/', icon: Image },
    { label: 'Batch Processing', href: '/#batch', icon: Download },
    { label: 'API Access', href: '/api', icon: Settings },
    { label: 'Mobile App', href: '/mobile', icon: Globe }
  ];

  const resourceLinks = [
    { label: 'User Guide', href: '/guide', icon: BookOpen },
    { label: 'FAQ', href: '/faq', icon: HelpCircle },
    { label: 'Blog', href: '/blog', icon: FileText },
    { label: 'Changelog', href: '/changelog', icon: Star }
  ];

  const companyLinks = [
    { label: 'About Us', href: '/about', icon: Heart },
    { label: 'Contact', href: '/contact', icon: Mail },
    { label: 'Support', href: '/support', icon: HelpCircle },
    { label: 'Careers', href: '/careers', icon: Globe }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy', icon: Shield },
    { label: 'Terms of Service', href: '/terms', icon: FileText },
    { label: 'Cookie Policy', href: '/cookies', icon: Settings },
    { label: 'GDPR', href: '/gdpr', icon: Shield }
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com', icon: Github },
    { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { label: 'Email', href: 'mailto:support@pixlyforge.com', icon: Mail }
  ];

  const languages = [
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'ja', flag: '🇯🇵', name: '日本語' },
    { code: 'zh', flag: '🇨🇳', name: '中文' },
    { code: 'ko', flag: '🇰🇷', name: '한국어' },
    { code: 'pt', flag: '🇵🇹', name: 'Português' }
  ];

  const formats = ['PNG', 'JPG', 'WebP', 'HEIC'];
  const qualityPresets = [
    { value: 0.3, label: t('settings.low') },
    { value: 0.6, label: t('settings.medium') },
    { value: 0.8, label: t('settings.high') },
    { value: 1.0, label: t('settings.max') }
  ];

  const themes = [
    { value: 'light', label: t('theme.light'), icon: '☀️' },
    { value: 'dark', label: t('theme.dark'), icon: '🌙' }
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
  };

  const FooterColumn = ({ title, links }: { title: string; links: typeof productLinks }) => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.label}>
              <Link
                to={link.href}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-footer mt-16 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Footer Links Grid */}
          <div className="footer-links-grid grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <FooterColumn title="Product" links={productLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>

          {/* Social Links */}
          <div className="footer-social flex justify-center space-x-6 mb-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  title={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Brand Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
              >
                <Image className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pixly Forge
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Preferences Bar */}
      <div className="footer-bottom border-t bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="preferences-bar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            {/* Language Selector */}
            <div className="preference-item">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                {t('footer.language')}
              </label>
              <select
                value={i18n.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-background border border-border rounded text-foreground"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quality Presets */}
            <div className="preference-item">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                {t('footer.quality_preset')}
              </label>
              <div className="flex gap-1">
                {qualityPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setDefaultQuality(preset.value)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      Math.abs(defaultQuality - preset.value) < 0.1
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground hover:bg-accent/80'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto-save Toggle */}
            <div className="preference-item">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                {t('settings.auto_download')}
              </label>
              <button
                onClick={() => setAutoDownload(!autoDownload)}
                className={`flex items-center gap-2 px-3 py-1 text-xs rounded transition-colors ${
                  autoDownload
                    ? 'bg-green-500 text-white'
                    : 'bg-accent text-accent-foreground hover:bg-accent/80'
                }`}
              >
                <Download className="w-3 h-3" />
                {autoDownload ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Default Format */}
            <div className="preference-item">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                {t('footer.default_format')}
              </label>
              <select
                value={preferredFormat}
                onChange={(e) => setPreferredFormat(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-background border border-border rounded text-foreground"
              >
                {formats.map((format) => (
                  <option key={format} value={format.toLowerCase()}>
                    {format}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Selector */}
            <div className="preference-item">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                {t('footer.theme')}
              </label>
              <div className="flex gap-1">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.value}
                    onClick={() => setTheme(themeOption.value as any)}
                    className={`px-2 py-1 text-xs rounded transition-colors capitalize ${
                      theme === themeOption.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground hover:bg-accent/80'
                    }`}
                  >
                    {themeOption.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t bg-background/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1 mb-2 md:mb-0">
              <span>© 2024 Pixly Forge. Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-current" />
              <span>{t('footer.made_with_for')} creators worldwide.</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{t('footer.all_processing_happens')} in your browser</span>
              <Shield className="w-3 h-3 text-green-500" />
              <span>{t('footer.privacy_first_design')}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
