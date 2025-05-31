import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { 
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Rocket,
  Wrench,
  Bug,
  Smartphone,
  Star,
  Clock,
  Download,
  ExternalLink,
  Mail,
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Hash,
  BookOpen,
  Bell,
  Heart,
  Coffee,
  Users,
  MessageSquare,
  ThumbsUp,
  Eye,
  Layers,
  Settings,
  Globe,
  Palette,
  Image,
  FileText,
  Cpu,
  Database,
  Lock,
  Gauge,
  Smartphone as Mobile
} from 'lucide-react';

interface ChangelogEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  categories: {
    features?: string[];
    improvements?: string[];
    bugfixes?: string[];
    technical?: string[];
  };
}

interface FilterState {
  category: 'all' | 'features' | 'improvements' | 'bugfixes' | 'technical';
  type: 'all' | 'major' | 'minor' | 'patch';
  search: string;
}

export const ChangelogPage: React.FC = () => {
  const { t } = useTranslation();
  const [lastUpdated, setLastUpdated] = useState('');
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set(['2.1.0']));
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    type: 'all',
    search: ''
  });

  useEffect(() => {
    setLastUpdated(getLastUpdatedDate(0)); // Current date
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const changelogData: ChangelogEntry[] = [
    {
      version: '2.1.0',
      date: 'January 30, 2025',
      type: 'minor',
      categories: {
        features: [
          'changelog.v2_1_0.features.webp_enhanced',
          'changelog.v2_1_0.features.batch_upgrade',
          'changelog.v2_1_0.features.dark_mode',
          'changelog.v2_1_0.features.preview',
          'changelog.v2_1_0.features.quality_slider'
        ],
        improvements: [
          'changelog.v2_1_0.improvements.performance',
          'changelog.v2_1_0.improvements.memory',
          'changelog.v2_1_0.improvements.mobile',
          'changelog.v2_1_0.improvements.error_handling',
          'changelog.v2_1_0.improvements.browser_compat'
        ],
        bugfixes: [
          'changelog.v2_1_0.bugfixes.color_profiles',
          'changelog.v2_1_0.bugfixes.memory_leaks',
          'changelog.v2_1_0.bugfixes.aspect_ratio',
          'changelog.v2_1_0.bugfixes.drag_drop',
          'changelog.v2_1_0.bugfixes.filename_handling'
        ],
        technical: [
          'changelog.v2_1_0.technical.canvas_api',
          'changelog.v2_1_0.technical.webassembly',
          'changelog.v2_1_0.technical.security',
          'changelog.v2_1_0.technical.error_reporting'
        ]
      }
    },
    {
      version: '2.0.5',
      date: 'January 15, 2025',
      type: 'patch',
      categories: {
        improvements: [
          'changelog.v2_0_5.improvements.startup_speed',
          'changelog.v2_0_5.improvements.file_size_limits',
          'changelog.v2_0_5.improvements.format_detection',
          'changelog.v2_0_5.improvements.progress_indicators'
        ],
        bugfixes: [
          'changelog.v2_0_5.bugfixes.tiff_conversion',
          'changelog.v2_0_5.bugfixes.png_transparency',
          'changelog.v2_0_5.bugfixes.metadata_preservation',
          'changelog.v2_0_5.bugfixes.batch_filenames'
        ]
      }
    },
    {
      version: '2.0.0',
      date: 'December 20, 2024',
      type: 'major',
      categories: {
        features: [
          'changelog.v2_0_0.features.client_side',
          'changelog.v2_0_0.features.zero_uploads',
          'changelog.v2_0_0.features.offline_capability',
          'changelog.v2_0_0.features.enhanced_security',
          'changelog.v2_0_0.features.avif_support',
          'changelog.v2_0_0.features.heic_support',
          'changelog.v2_0_0.features.advanced_batch',
          'changelog.v2_0_0.features.conversion_history',
          'changelog.v2_0_0.features.custom_presets'
        ],
        improvements: [
          'changelog.v2_0_0.improvements.ui_redesign',
          'changelog.v2_0_0.improvements.drag_drop',
          'changelog.v2_0_0.improvements.quality_preservation',
          'changelog.v2_0_0.improvements.speed_optimization'
        ],
        bugfixes: [
          'changelog.v2_0_0.bugfixes.server_dependency',
          'changelog.v2_0_0.bugfixes.quality_inconsistencies',
          'changelog.v2_0_0.bugfixes.browser_compatibility',
          'changelog.v2_0_0.bugfixes.upload_timeouts'
        ]
      }
    }
  ];

  const categoryIcons = {
    features: <Rocket className="w-4 h-4" />,
    improvements: <Wrench className="w-4 h-4" />,
    bugfixes: <Bug className="w-4 h-4" />,
    technical: <Smartphone className="w-4 h-4" />
  };

  const categoryColors = {
    features: 'text-blue-600 dark:text-blue-400',
    improvements: 'text-green-600 dark:text-green-400',
    bugfixes: 'text-red-600 dark:text-red-400',
    technical: 'text-purple-600 dark:text-purple-400'
  };

  const categoryBgColors = {
    features: 'bg-blue-500/10 border-blue-500/20',
    improvements: 'bg-green-500/10 border-green-500/20',
    bugfixes: 'bg-red-500/10 border-red-500/20',
    technical: 'bg-purple-500/10 border-purple-500/20'
  };

  const versionTypeColors = {
    major: 'bg-gradient-to-r from-red-500 to-pink-500',
    minor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    patch: 'bg-gradient-to-r from-green-500 to-emerald-500'
  };

  const filteredChangelog = useMemo(() => {
    return changelogData.filter(entry => {
      // Type filter
      if (filters.type !== 'all' && entry.type !== filters.type) {
        return false;
      }

      // Category filter
      if (filters.category !== 'all') {
        if (!entry.categories[filters.category as keyof typeof entry.categories]) {
          return false;
        }
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const versionMatch = entry.version.toLowerCase().includes(searchLower);
        const dateMatch = entry.date.toLowerCase().includes(searchLower);
        
        // Search in translated content
        const contentMatch = Object.values(entry.categories).flat().some(key => {
          const translatedText = t(key).toLowerCase();
          return translatedText.includes(searchLower);
        });

        return versionMatch || dateMatch || contentMatch;
      }

      return true;
    });
  }, [changelogData, filters, t]);

  const toggleVersion = (version: string) => {
    setExpandedVersions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(version)) {
        newSet.delete(version);
      } else {
        newSet.add(version);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedVersions(new Set(filteredChangelog.map(entry => entry.version)));
  };

  const collapseAll = () => {
    setExpandedVersions(new Set());
  };

  const isRecent = (dateString: string) => {
    const entryDate = new Date(dateString);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return entryDate > thirtyDaysAgo;
  };

  const renderCategorySection = (category: keyof ChangelogEntry['categories'], items: string[]) => {
    if (!items || items.length === 0) return null;

    return (
      <div className={`category-section border rounded-lg p-4 ${categoryBgColors[category]}`}>
        <h4 className={`font-semibold mb-3 flex items-center gap-2 ${categoryColors[category]}`}>
          {categoryIcons[category]}
          {t(`changelog.categories.${category}`)}
        </h4>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${categoryColors[category]}`} />
              <span className="text-muted-foreground text-sm">{t(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="changelog-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="changelog-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.section 
          className="changelog-hero text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="changelog-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('changelog.title')}
            </h1>
            <p className="subtitle text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('changelog.subtitle')}
            </p>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30 mb-8">
              <Calendar className="w-4 h-4" />
              <span>{t('changelog.lastUpdated')}: {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Filters and Controls */}
        <motion.section 
          className="filters-section mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div className="filters-container bg-card border border-border rounded-xl p-6" variants={itemVariants}>
            <div className="filters-grid grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              {/* Search */}
              <div className="search-container relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('changelog.search.placeholder')}
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as FilterState['category'] }))}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="all">{t('changelog.filters.all_categories')}</option>
                <option value="features">{t('changelog.categories.features')}</option>
                <option value="improvements">{t('changelog.categories.improvements')}</option>
                <option value="bugfixes">{t('changelog.categories.bugfixes')}</option>
                <option value="technical">{t('changelog.categories.technical')}</option>
              </select>

              {/* Type Filter */}
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as FilterState['type'] }))}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="all">{t('changelog.filters.all_types')}</option>
                <option value="major">{t('changelog.types.major')}</option>
                <option value="minor">{t('changelog.types.minor')}</option>
                <option value="patch">{t('changelog.types.patch')}</option>
              </select>

              {/* Expand/Collapse Controls */}
              <div className="controls flex gap-2">
                <button
                  onClick={expandAll}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4 inline mr-1" />
                  {t('changelog.controls.expand_all')}
                </button>
                <button
                  onClick={collapseAll}
                  className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors text-sm font-medium"
                >
                  <Minus className="w-4 h-4 inline mr-1" />
                  {t('changelog.controls.collapse_all')}
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="results-info text-sm text-muted-foreground">
              {t('changelog.results_count', { count: filteredChangelog.length })}
            </div>
          </motion.div>
        </motion.section>

        {/* Changelog Entries */}
        <motion.section 
          className="changelog-entries"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="entries-container space-y-8">
            <AnimatePresence>
              {filteredChangelog.map((entry, index) => (
                <motion.div
                  key={entry.version}
                  className="entry-card bg-card border border-border rounded-xl overflow-hidden"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  {/* Version Header */}
                  <div 
                    className="entry-header p-6 cursor-pointer hover:bg-accent/5 transition-colors"
                    onClick={() => toggleVersion(entry.version)}
                  >
                    <div className="header-content flex items-center justify-between">
                      <div className="version-info flex items-center gap-4">
                        <div className={`version-badge px-3 py-1 rounded-full text-white text-sm font-bold ${versionTypeColors[entry.type]}`}>
                          v{entry.version}
                        </div>
                        {isRecent(entry.date) && (
                          <div className="new-badge bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            {t('changelog.badges.new')}
                          </div>
                        )}
                        <div className="version-type text-sm text-muted-foreground">
                          {t(`changelog.types.${entry.type}`)}
                        </div>
                      </div>
                      
                      <div className="header-controls flex items-center gap-4">
                        <div className="entry-date flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{entry.date}</span>
                        </div>
                        <div className="expand-icon">
                          {expandedVersions.has(entry.version) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Version Content */}
                  <AnimatePresence>
                    {expandedVersions.has(entry.version) && (
                      <motion.div
                        className="entry-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="content-inner p-6 pt-0 space-y-6">
                          {entry.categories.features && renderCategorySection('features', entry.categories.features)}
                          {entry.categories.improvements && renderCategorySection('improvements', entry.categories.improvements)}
                          {entry.categories.bugfixes && renderCategorySection('bugfixes', entry.categories.bugfixes)}
                          {entry.categories.technical && renderCategorySection('technical', entry.categories.technical)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Upcoming Features */}
        <motion.section 
          className="upcoming-features mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('changelog.upcoming.title')}
          </motion.h2>
          
          <motion.div className="upcoming-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="upcoming-card bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-primary">
                <Sparkles className="w-6 h-6" />
                {t('changelog.upcoming.v2_2_0.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  'changelog.upcoming.v2_2_0.ai_optimization',
                  'changelog.upcoming.v2_2_0.editing_tools',
                  'changelog.upcoming.v2_2_0.watermarking',
                  'changelog.upcoming.v2_2_0.pdf_conversion'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="upcoming-card bg-gradient-to-r from-secondary/10 to-accent/10 border-2 border-secondary/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-secondary">
                <Zap className="w-6 h-6" />
                {t('changelog.upcoming.v2_3_0.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  'changelog.upcoming.v2_3_0.video_frames',
                  'changelog.upcoming.v2_3_0.animated_webp',
                  'changelog.upcoming.v2_3_0.cloud_sync',
                  'changelog.upcoming.v2_3_0.advanced_batch'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Stay Updated Section */}
        <motion.section 
          className="stay-updated mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('changelog.stay_updated.title')}
          </motion.h2>
          
          <motion.div className="updated-grid grid grid-cols-1 lg:grid-cols-3 gap-8" variants={itemVariants}>
            <div className="update-method bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-green-600" />
                {t('changelog.stay_updated.automatic.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  'changelog.stay_updated.automatic.pwa',
                  'changelog.stay_updated.automatic.caching',
                  'changelog.stay_updated.automatic.no_downloads'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="update-method bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <Bell className="w-6 h-6 text-blue-600" />
                {t('changelog.stay_updated.notifications.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  'changelog.stay_updated.notifications.in_app',
                  'changelog.stay_updated.notifications.email',
                  'changelog.stay_updated.notifications.changelog_page'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="update-method bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-purple-600" />
                {t('changelog.stay_updated.feedback.title')}
              </h3>
              <div className="feedback-info space-y-3">
                <p className="text-muted-foreground text-sm">{t('changelog.stay_updated.feedback.description')}</p>
                <div className="contact-info">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-purple-500" />
                    <a href="mailto:features@zealoustech.com" className="text-purple-600 hover:underline text-sm">
                      features@zealoustech.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    <span className="text-muted-foreground text-sm">"{t('changelog.stay_updated.feedback.subject')}"</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          className="final-cta mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="cta-card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <Heart className="w-20 h-20 mx-auto text-primary mb-8" />
            <h2 className="text-3xl font-bold mb-6">{t('changelog.cta.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('changelog.cta.description')}
            </p>
            <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:features@zealoustech.com" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {t('changelog.cta.suggest_feature')}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                <Image className="w-5 h-5" />
                {t('changelog.cta.try_tools')}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </motion.section>

        {/* Last Updated Footer */}
        <motion.div 
          className="last-updated text-center mt-12 pt-8 border-t border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground">
            {t('changelog.pageUpdated')}: {lastUpdated}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ChangelogPage; 