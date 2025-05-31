import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { 
  Cookie, 
  Shield, 
  Settings, 
  Eye, 
  Clock, 
  Globe, 
  Lock, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  Mail,
  FileText,
  Monitor,
  Smartphone,
  Tablet,
  BarChart3,
  Zap,
  Star,
  Users,
  Calendar,
  Database,
  Palette,
  Languages,
  HelpCircle
} from 'lucide-react';

export const CookiesPolicyPage: React.FC = () => {
  const { t } = useTranslation();
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(getLastUpdatedDate(7)); // 7 days before current date
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

  const cookieTypes = [
    {
      title: t('cookies.types.essential.title'),
      icon: <Shield className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-500/5 border-green-500/20",
      description: t('cookies.types.essential.description'),
      categories: [
        {
          name: t('cookies.types.essential.functionality.name'),
          items: [
            t('cookies.types.essential.functionality.item1'),
            t('cookies.types.essential.functionality.item2'),
            t('cookies.types.essential.functionality.item3'),
            t('cookies.types.essential.functionality.item4')
          ]
        },
        {
          name: t('cookies.types.essential.security.name'),
          items: [
            t('cookies.types.essential.security.item1'),
            t('cookies.types.essential.security.item2'),
            t('cookies.types.essential.security.item3')
          ]
        }
      ]
    },
    {
      title: t('cookies.types.analytics.title'),
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-500/5 border-blue-500/20",
      description: t('cookies.types.analytics.description'),
      categories: [
        {
          name: t('cookies.types.analytics.usage.name'),
          items: [
            t('cookies.types.analytics.usage.item1'),
            t('cookies.types.analytics.usage.item2'),
            t('cookies.types.analytics.usage.item3'),
            t('cookies.types.analytics.usage.item4')
          ]
        },
        {
          name: t('cookies.types.analytics.performance.name'),
          items: [
            t('cookies.types.analytics.performance.item1'),
            t('cookies.types.analytics.performance.item2'),
            t('cookies.types.analytics.performance.item3'),
            t('cookies.types.analytics.performance.item4')
          ]
        }
      ]
    },
    {
      title: t('cookies.types.preference.title'),
      icon: <Settings className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-500/5 border-purple-500/20",
      description: t('cookies.types.preference.description'),
      categories: [
        {
          name: t('cookies.types.preference.user.name'),
          items: [
            t('cookies.types.preference.user.item1'),
            t('cookies.types.preference.user.item2'),
            t('cookies.types.preference.user.item3'),
            t('cookies.types.preference.user.item4')
          ]
        }
      ]
    }
  ];

  const googleAnalyticsCookies = [
    { name: "_ga", description: t('cookies.google.ga.description'), duration: t('cookies.google.ga.duration') },
    { name: "_ga_XXXXXXXXXX", description: t('cookies.google.ga_id.description'), duration: t('cookies.google.ga_id.duration') },
    { name: "_gid", description: t('cookies.google.gid.description'), duration: t('cookies.google.gid.duration') },
    { name: "_gat", description: t('cookies.google.gat.description'), duration: t('cookies.google.gat.duration') }
  ];

  const cookieDurations = [
    {
      type: t('cookies.duration.session.title'),
      icon: <Clock className="w-5 h-5" />,
      color: "text-orange-600",
      items: [
        t('cookies.duration.session.item1'),
        t('cookies.duration.session.item2'),
        t('cookies.duration.session.item3')
      ]
    },
    {
      type: t('cookies.duration.persistent.title'),
      icon: <Database className="w-5 h-5" />,
      color: "text-blue-600",
      items: [
        t('cookies.duration.persistent.item1'),
        t('cookies.duration.persistent.item2'),
        t('cookies.duration.persistent.item3'),
        t('cookies.duration.persistent.item4')
      ]
    }
  ];

  const browserInstructions = [
    {
      name: t('cookies.browsers.chrome.name'),
      icon: <Globe className="w-5 h-5" />,
      steps: [
        t('cookies.browsers.chrome.step1'),
        t('cookies.browsers.chrome.step2'),
        t('cookies.browsers.chrome.step3')
      ]
    },
    {
      name: t('cookies.browsers.firefox.name'),
      icon: <Globe className="w-5 h-5" />,
      steps: [
        t('cookies.browsers.firefox.step1'),
        t('cookies.browsers.firefox.step2'),
        t('cookies.browsers.firefox.step3')
      ]
    },
    {
      name: t('cookies.browsers.safari.name'),
      icon: <Globe className="w-5 h-5" />,
      steps: [
        t('cookies.browsers.safari.step1'),
        t('cookies.browsers.safari.step2'),
        t('cookies.browsers.safari.step3')
      ]
    },
    {
      name: t('cookies.browsers.edge.name'),
      icon: <Globe className="w-5 h-5" />,
      steps: [
        t('cookies.browsers.edge.step1'),
        t('cookies.browsers.edge.step2'),
        t('cookies.browsers.edge.step3')
      ]
    }
  ];

  const userRights = [
    {
      right: t('cookies.rights.know.title'),
      description: t('cookies.rights.know.description'),
      icon: <Eye className="w-5 h-5" />
    },
    {
      right: t('cookies.rights.control.title'),
      description: t('cookies.rights.control.description'),
      icon: <Settings className="w-5 h-5" />
    },
    {
      right: t('cookies.rights.access.title'),
      description: t('cookies.rights.access.description'),
      icon: <FileText className="w-5 h-5" />
    },
    {
      right: t('cookies.rights.delete.title'),
      description: t('cookies.rights.delete.description'),
      icon: <AlertTriangle className="w-5 h-5" />
    }
  ];

  return (
    <div className="cookies-policy-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="cookies-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.section 
          className="cookies-hero text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="cookies-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('cookies.title')}
            </h1>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30 mb-8">
              <Calendar className="w-4 h-4" />
              <span>{t('cookies.lastUpdated')}: {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* What Are Cookies */}
        <motion.section 
          className="what-are-cookies mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.what.title')}
          </motion.h2>
          
          <motion.div 
            className="cookies-explanation bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-12"
            variants={itemVariants}
          >
            <div className="explanation-icon text-center mb-6">
              <Cookie className="w-16 h-16 mx-auto text-primary" />
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto mb-6">
              {t('cookies.what.description1')}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto">
              {t('cookies.what.description2')}
            </p>
          </motion.div>
        </motion.section>

        {/* How We Use Cookies */}
        <motion.section 
          className="how-we-use-cookies mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.how.title')}
          </motion.h2>
          
          <motion.div className="cookie-types space-y-8" variants={itemVariants}>
            {cookieTypes.map((type, index) => (
              <div key={index} className={`cookie-type-card border-2 rounded-xl p-8 ${type.bgColor}`}>
                <h3 className={`text-xl font-semibold mb-6 flex items-center gap-3 ${type.color}`}>
                  {type.icon}
                  {type.title}
                </h3>
                <p className="text-muted-foreground mb-6">{type.description}</p>
                
                <div className="categories space-y-6">
                  {type.categories.map((category, catIndex) => (
                    <div key={catIndex} className="category">
                      <h4 className="font-semibold text-foreground mb-3">{category.name}:</h4>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Third-Party Cookies */}
        <motion.section 
          className="third-party-cookies mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.thirdParty.title')}
          </motion.h2>
          
          <motion.div className="third-party-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Analytics Services */}
            <div className="analytics-services bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-primary" />
                {t('cookies.thirdParty.analytics.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('cookies.thirdParty.analytics.description')}
              </p>
              
              <div className="analytics-info mb-6">
                <h4 className="font-semibold text-foreground mb-3">{t('cookies.thirdParty.analytics.collects.title')}:</h4>
                <ul className="space-y-2">
                  {[
                    t('cookies.thirdParty.analytics.collects.item1'),
                    t('cookies.thirdParty.analytics.collects.item2'),
                    t('cookies.thirdParty.analytics.collects.item3'),
                    t('cookies.thirdParty.analytics.collects.item4')
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="google-cookies">
                <h4 className="font-semibold text-foreground mb-3">{t('cookies.thirdParty.analytics.types.title')}:</h4>
                <div className="space-y-3">
                  {googleAnalyticsCookies.map((cookie, index) => (
                    <div key={index} className="cookie-item bg-accent/10 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{cookie.name}</span>
                        <span className="text-sm text-muted-foreground">{cookie.duration}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{cookie.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CDN Services */}
            <div className="cdn-services bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-secondary" />
                {t('cookies.thirdParty.cdn.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('cookies.thirdParty.cdn.description')}
              </p>
              
              <ul className="space-y-3">
                {[
                  t('cookies.thirdParty.cdn.item1'),
                  t('cookies.thirdParty.cdn.item2'),
                  t('cookies.thirdParty.cdn.item3')
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Cookie Duration */}
        <motion.section 
          className="cookie-duration mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.duration.title')}
          </motion.h2>
          
          <motion.div className="duration-grid grid grid-cols-1 md:grid-cols-2 gap-8" variants={itemVariants}>
            {cookieDurations.map((duration, index) => (
              <div key={index} className="duration-card bg-card border border-border rounded-xl p-8">
                <h3 className={`text-xl font-semibold mb-6 flex items-center gap-3 ${duration.color}`}>
                  {duration.icon}
                  {duration.type}
                </h3>
                <ul className="space-y-3">
                  {duration.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Managing Cookie Preferences */}
        <motion.section 
          className="managing-preferences mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.managing.title')}
          </motion.h2>
          
          <motion.div className="preferences-content space-y-8" variants={itemVariants}>
            {/* Browser Controls */}
            <div className="browser-controls">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Monitor className="w-6 h-6 text-primary" />
                {t('cookies.managing.browser.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('cookies.managing.browser.description')}
              </p>
              
              <div className="browser-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                {browserInstructions.map((browser, index) => (
                  <div key={index} className="browser-card bg-card border border-border rounded-lg p-6">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-3">
                      {browser.icon}
                      {browser.name}
                    </h4>
                    <ol className="space-y-2">
                      {browser.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm text-muted-foreground">
                          {stepIndex + 1}. {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Cookie Preferences */}
            <div className="our-preferences bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Settings className="w-6 h-6" />
                {t('cookies.managing.our.title')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('cookies.managing.our.description')}
              </p>
              <ul className="space-y-3">
                {[
                  t('cookies.managing.our.option1'),
                  t('cookies.managing.our.option2'),
                  t('cookies.managing.our.option3'),
                  t('cookies.managing.our.option4')
                ].map((option, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{option}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opt-Out Options */}
            <div className="opt-out-options bg-yellow-500/5 border-2 border-yellow-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-yellow-600 dark:text-yellow-400">
                <AlertTriangle className="w-6 h-6" />
                {t('cookies.managing.optOut.title')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('cookies.managing.optOut.description')}
              </p>
              
              <div className="opt-out-sections space-y-6">
                <div className="analytics-opt-out">
                  <h4 className="font-semibold text-foreground mb-3">{t('cookies.managing.optOut.analytics.title')}:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <ExternalLink className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {t('cookies.managing.optOut.analytics.google')}{' '}
                        <a 
                          href="https://tools.google.com/dlpage/gaoptout" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          tools.google.com/dlpage/gaoptout
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Settings className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{t('cookies.managing.optOut.analytics.browser')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Eye className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{t('cookies.managing.optOut.analytics.doNotTrack')}</span>
                    </li>
                  </ul>
                </div>

                <div className="advertising-opt-out">
                  <h4 className="font-semibold text-foreground mb-3">{t('cookies.managing.optOut.advertising.title')}:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{t('cookies.managing.optOut.advertising.current')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{t('cookies.managing.optOut.advertising.future')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ExternalLink className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {t('cookies.managing.optOut.advertising.industry')}{' '}
                        <a 
                          href="https://youradchoices.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          youradchoices.com
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Impact of Disabling Cookies */}
        <motion.section 
          className="impact-disabling mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.impact.title')}
          </motion.h2>
          
          <motion.div className="impact-grid grid grid-cols-1 md:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Essential Cookies Disabled */}
            <div className="essential-disabled bg-red-500/5 border-2 border-red-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-6 h-6" />
                {t('cookies.impact.essential.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('cookies.impact.essential.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('cookies.impact.essential.item1'),
                  t('cookies.impact.essential.item2'),
                  t('cookies.impact.essential.item3'),
                  t('cookies.impact.essential.item4')
                ].map((impact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{impact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Analytics Cookies Disabled */}
            <div className="analytics-disabled bg-green-500/5 border-2 border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
                <CheckCircle className="w-6 h-6" />
                {t('cookies.impact.analytics.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('cookies.impact.analytics.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('cookies.impact.analytics.item1'),
                  t('cookies.impact.analytics.item2'),
                  t('cookies.impact.analytics.item3'),
                  t('cookies.impact.analytics.item4')
                ].map((impact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{impact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Cookie Security */}
        <motion.section 
          className="cookie-security mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.security.title')}
          </motion.h2>
          
          <motion.div className="security-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Data Protection */}
            <div className="data-protection bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                {t('cookies.security.protection.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('cookies.security.protection.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('cookies.security.protection.item1'),
                  t('cookies.security.protection.item2'),
                  t('cookies.security.protection.item3'),
                  t('cookies.security.protection.item4')
                ].map((protection, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Lock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{protection}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy Safeguards */}
            <div className="privacy-safeguards bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-secondary" />
                {t('cookies.security.safeguards.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  t('cookies.security.safeguards.item1'),
                  t('cookies.security.safeguards.item2'),
                  t('cookies.security.safeguards.item3'),
                  t('cookies.security.safeguards.item4')
                ].map((safeguard, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{safeguard}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Compliance and Rights */}
        <motion.section 
          className="compliance-rights mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.compliance.title')}
          </motion.h2>
          
          <motion.div className="compliance-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Legal Compliance */}
            <div className="legal-compliance bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                {t('cookies.compliance.legal.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('cookies.compliance.legal.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('cookies.compliance.legal.gdpr'),
                  t('cookies.compliance.legal.ccpa'),
                  t('cookies.compliance.legal.eprivacy'),
                  t('cookies.compliance.legal.other')
                ].map((law, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{law}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Your Rights */}
            <div className="your-rights bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-secondary" />
                {t('cookies.compliance.rights.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('cookies.compliance.rights.description')}:</p>
              <ul className="space-y-3">
                {userRights.map((right, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="text-secondary mt-0.5">{right.icon}</div>
                    <div>
                      <span className="font-semibold text-foreground">{right.right}</span>
                      <span className="text-muted-foreground"> ({right.description})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Updates to This Policy */}
        <motion.section 
          className="policy-updates mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.updates.title')}
          </motion.h2>
          
          <motion.div className="updates-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Change Notifications */}
            <div className="change-notifications bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-primary" />
                {t('cookies.updates.changes.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('cookies.updates.changes.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('cookies.updates.changes.item1'),
                  t('cookies.updates.changes.item2'),
                  t('cookies.updates.changes.item3'),
                  t('cookies.updates.changes.item4')
                ].map((change, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{change}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Staying Informed */}
            <div className="staying-informed bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-secondary" />
                {t('cookies.updates.informed.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  t('cookies.updates.informed.item1'),
                  t('cookies.updates.informed.item2'),
                  t('cookies.updates.informed.item3')
                ].map((method, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{method}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Contact Us */}
        <motion.section 
          className="contact-us mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('cookies.contact.title')}
          </motion.h2>
          
          <motion.div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Questions About Cookies */}
            <div className="cookie-questions bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-primary" />
                {t('cookies.contact.questions.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('cookies.contact.questions.description')}:</p>
              <div className="contact-info space-y-3">
                <div className="contact-item flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">{t('cookies.contact.questions.email')}:</span>
                    <a href="mailto:privacy@zealoustech.com" className="text-primary hover:underline ml-2">
                      privacy@zealoustech.com
                    </a>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">{t('cookies.contact.questions.subject')}:</span>
                    <span className="text-muted-foreground ml-2">"{t('cookies.contact.questions.subjectLine')}"</span>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">{t('cookies.contact.questions.response')}:</span>
                    <span className="text-muted-foreground ml-2">{t('cookies.contact.questions.responseTime')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Concerns */}
            <div className="privacy-concerns bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-secondary" />
                {t('cookies.contact.privacy.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('cookies.contact.privacy.description')}:</p>
              <div className="contact-info space-y-3">
                <div className="contact-item flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary" />
                  <div>
                    <span className="font-semibold text-foreground">{t('cookies.contact.privacy.email')}:</span>
                    <a href="mailto:support@zealoustech.com" className="text-primary hover:underline ml-2">
                      support@zealoustech.com
                    </a>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-3">
                  <Users className="w-5 h-5 text-secondary" />
                  <div>
                    <span className="font-semibold text-foreground">{t('cookies.contact.privacy.officer')}:</span>
                    <a href="mailto:privacy@zealoustech.com" className="text-primary hover:underline ml-2">
                      privacy@zealoustech.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Final Reminder */}
        <motion.section 
          className="final-reminder"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="reminder-card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <Shield className="w-20 h-20 mx-auto text-primary mb-8" />
            <h2 className="text-3xl font-bold mb-6">{t('cookies.reminder.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('cookies.reminder.description')}
            </p>
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
            {t('cookies.pageUpdated')}: {lastUpdated}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiesPolicyPage; 