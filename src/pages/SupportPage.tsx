import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Bug, 
  Lightbulb, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Monitor, 
  Smartphone, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  FileText, 
  Settings,
  RefreshCw,
  Trash2,
  Upload
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { t } = useTranslation();
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(getLastUpdatedDate(7));
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

  const faqSections = [
    {
      title: t('support.faq.converter.title'),
      icon: <FileText className="w-6 h-6" />,
      questions: [
        {
          q: t('support.faq.converter.q1'),
          a: t('support.faq.converter.a1')
        },
        {
          q: t('support.faq.converter.q2'),
          a: t('support.faq.converter.a2')
        },
        {
          q: t('support.faq.converter.q3'),
          a: t('support.faq.converter.a3')
        },
        {
          q: t('support.faq.converter.q4'),
          a: t('support.faq.converter.a4')
        },
        {
          q: t('support.faq.converter.q5'),
          a: t('support.faq.converter.a5')
        }
      ]
    },
    {
      title: t('support.faq.technical.title'),
      icon: <Settings className="w-6 h-6" />,
      questions: [
        {
          q: t('support.faq.technical.q1'),
          a: t('support.faq.technical.a1')
        },
        {
          q: t('support.faq.technical.q2'),
          a: t('support.faq.technical.a2')
        },
        {
          q: t('support.faq.technical.q3'),
          a: t('support.faq.technical.a3')
        }
      ]
    },
    {
      title: t('support.faq.privacy.title'),
      icon: <Shield className="w-6 h-6" />,
      questions: [
        {
          q: t('support.faq.privacy.q1'),
          a: t('support.faq.privacy.a1')
        },
        {
          q: t('support.faq.privacy.q2'),
          a: t('support.faq.privacy.a2')
        },
        {
          q: t('support.faq.privacy.q3'),
          a: t('support.faq.privacy.a3')
        }
      ]
    }
  ];

  const troubleshootingSteps = [
    { icon: <Globe className="w-5 h-5" />, text: t('support.troubleshooting.notWorking.step1') },
    { icon: <Monitor className="w-5 h-5" />, text: t('support.troubleshooting.notWorking.step2') },
    { icon: <RefreshCw className="w-5 h-5" />, text: t('support.troubleshooting.notWorking.step3') },
    { icon: <RefreshCw className="w-5 h-5" />, text: t('support.troubleshooting.notWorking.step4') },
    { icon: <Trash2 className="w-5 h-5" />, text: t('support.troubleshooting.notWorking.step5') }
  ];

  const performanceTips = [
    { icon: <Globe className="w-5 h-5" />, text: t('support.troubleshooting.performance.tip1') },
    { icon: <Monitor className="w-5 h-5" />, text: t('support.troubleshooting.performance.tip2') },
    { icon: <Upload className="w-5 h-5" />, text: t('support.troubleshooting.performance.tip3') },
    { icon: <Clock className="w-5 h-5" />, text: t('support.troubleshooting.performance.tip4') }
  ];

  const contactMethods = [
    {
      title: t('support.contact.email.title'),
      email: "support@zealoustech.com",
      description: t('support.contact.email.desc'),
      responseTime: t('support.contact.email.response'),
      icon: <Mail className="w-6 h-6" />
    },
    {
      title: t('support.contact.business.title'),
      email: "business@zealoustech.com",
      description: t('support.contact.business.desc'),
      responseTime: t('support.contact.business.response'),
      icon: <Users className="w-6 h-6" />
    },
    {
      title: t('support.contact.bugs.title'),
      email: "bugs@zealoustech.com",
      description: t('support.contact.bugs.desc'),
      responseTime: t('support.contact.bugs.response'),
      icon: <Bug className="w-6 h-6" />
    },
    {
      title: t('support.contact.features.title'),
      email: "features@zealoustech.com",
      description: t('support.contact.features.desc'),
      responseTime: t('support.contact.features.response'),
      icon: <Lightbulb className="w-6 h-6" />
    }
  ];

  const browserCompatibility = [
    { name: "Chrome 90+", status: "recommended", icon: "🟢" },
    { name: "Firefox 88+", status: "recommended", icon: "🟢" },
    { name: "Safari 14+", status: "supported", icon: "🟡" },
    { name: "Edge 90+", status: "supported", icon: "🟡" },
    { name: "Internet Explorer", status: "limited", icon: "🔴" },
    { name: "Older mobile browsers", status: "limited", icon: "🔴" }
  ];

  return (
    <div className="support-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="support-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.section 
          className="support-header text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="header-content" variants={itemVariants}>
            <h1 className="support-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('support.title')}
            </h1>
            <p className="support-subtitle text-xl md:text-2xl text-muted-foreground mb-8 font-light max-w-4xl mx-auto">
              {t('support.subtitle')}
            </p>
          </motion.div>
        </motion.section>

        {/* Quick Help Section */}
        <motion.section 
          className="quick-help mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-bold text-center mb-8" variants={itemVariants}>
            {t('support.getHelp.title')}
          </motion.h2>
          <motion.div 
            className="help-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={itemVariants}
          >
            <div className="help-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <HelpCircle className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="font-semibold mb-2">{t('support.help.faq')}</h3>
              <p className="text-sm text-muted-foreground">{t('support.help.faq.desc')}</p>
            </div>
            <div className="help-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <Settings className="w-12 h-12 mx-auto text-secondary mb-4" />
              <h3 className="font-semibold mb-2">{t('support.help.troubleshooting')}</h3>
              <p className="text-sm text-muted-foreground">{t('support.help.troubleshooting.desc')}</p>
            </div>
            <div className="help-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <Mail className="w-12 h-12 mx-auto text-accent mb-4" />
              <h3 className="font-semibold mb-2">{t('support.help.contact')}</h3>
              <p className="text-sm text-muted-foreground">{t('support.help.contact.desc')}</p>
            </div>
            <div className="help-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <Globe className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="font-semibold mb-2">{t('support.help.browser')}</h3>
              <p className="text-sm text-muted-foreground">{t('support.help.browser.desc')}</p>
            </div>
          </motion.div>
        </motion.section>

        {/* FAQ Sections */}
        <motion.section 
          className="faq-sections mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('support.faq.title')}
          </motion.h2>
          
          {faqSections.map((section, sectionIndex) => (
            <motion.div 
              key={sectionIndex}
              className="faq-section mb-12"
              variants={itemVariants}
            >
              <div className="section-header flex items-center gap-3 mb-6">
                <div className="text-primary">{section.icon}</div>
                <h3 className="text-2xl font-semibold">{section.title}</h3>
              </div>
              
              <div className="questions-grid space-y-4">
                {section.questions.map((qa, qaIndex) => (
                  <div key={qaIndex} className="question-card bg-card border border-border rounded-xl p-6">
                    <h4 className="font-semibold text-lg mb-3 text-foreground">{qa.q}</h4>
                    <p className="text-muted-foreground leading-relaxed">{qa.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Troubleshooting Guide */}
        <motion.section 
          className="troubleshooting mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('support.troubleshooting.title')}
          </motion.h2>
          
          <motion.div className="troubleshooting-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="troubleshooting-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                {t('support.troubleshooting.notWorking.title')}
              </h3>
              <ul className="space-y-4">
                {troubleshootingSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="text-primary mt-0.5">{step.icon}</div>
                    <span className="text-muted-foreground">{step.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="performance-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-green-500" />
                {t('support.troubleshooting.performance.title')}
              </h3>
              <ul className="space-y-4">
                {performanceTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="text-secondary mt-0.5">{tip.icon}</div>
                    <span className="text-muted-foreground">{tip.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Contact Support */}
        <motion.section 
          className="contact-support mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('support.contact.title')}
          </motion.h2>
          
          <motion.div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-8" variants={itemVariants}>
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-card bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <div className="contact-header flex items-center gap-3 mb-4">
                  <div className="text-primary">{method.icon}</div>
                  <h3 className="text-xl font-semibold">{method.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                <div className="contact-email bg-accent/10 border border-accent/20 rounded-lg p-3 mb-3">
                  <a href={`mailto:${method.email}`} className="text-primary font-medium hover:underline">
                    {method.email}
                  </a>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t('support.contact.responseTime')}: {method.responseTime}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Browser Compatibility */}
        <motion.section 
          className="browser-compatibility mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('support.browser.title')}
          </motion.h2>
          
          <motion.div className="compatibility-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={itemVariants}>
            {browserCompatibility.map((browser, index) => (
              <div key={index} className="browser-card bg-card border border-border rounded-xl p-6 text-center">
                <div className="browser-icon text-3xl mb-3">{browser.icon}</div>
                <h3 className="font-semibold mb-2">{browser.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  browser.status === 'recommended' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  browser.status === 'supported' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {browser.status === 'recommended' ? t('support.browser.recommended') :
                   browser.status === 'supported' ? t('support.browser.supported') : t('support.browser.limited')}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* System Requirements */}
        <motion.section 
          className="system-requirements mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('support.requirements.title')}
          </motion.h2>
          
          <motion.div className="requirements-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="requirements-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Monitor className="w-6 h-6 text-primary" />
                {t('support.requirements.minimum.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>{t('support.requirements.minimum.ram')}</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>{t('support.requirements.minimum.browser')}</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>{t('support.requirements.minimum.js')}</strong></span>
                </li>
              </ul>
            </div>
            
            <div className="requirements-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-secondary" />
                {t('support.requirements.recommended.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>{t('support.requirements.recommended.ram')}</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>{t('support.requirements.recommended.cpu')}</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>{t('support.requirements.recommended.browser')}</strong></span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Self-Service Resources */}
        <motion.section 
          className="self-service mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('support.selfService.title')}
          </motion.h2>
          
          <motion.div className="resources-grid grid grid-cols-1 md:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="resource-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                {t('support.selfService.videos.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('support.selfService.videos.desc')}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t('support.selfService.videos.item1')}</li>
                <li>• {t('support.selfService.videos.item2')}</li>
                <li>• {t('support.selfService.videos.item3')}</li>
                <li>• {t('support.selfService.videos.item4')}</li>
              </ul>
            </div>
            
            <div className="resource-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-secondary" />
                {t('support.selfService.forum.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('support.selfService.forum.desc')}</p>
              <div className="forum-link bg-accent/10 border border-accent/20 rounded-lg p-3">
                <a href="https://forum.zealoustech.com" className="text-primary font-medium hover:underline">
                  forum.zealoustech.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Response Times */}
        <motion.section 
          className="response-times mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('support.response.title')}
          </motion.h2>
          
          <motion.div className="response-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={itemVariants}>
            <div className="response-card bg-card border border-border rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 mx-auto text-primary mb-3" />
              <h3 className="font-semibold mb-2">{t('support.response.technical')}</h3>
              <p className="text-sm text-muted-foreground">{t('support.response.technical.time')}</p>
            </div>
            <div className="response-card bg-card border border-border rounded-xl p-6 text-center">
              <Bug className="w-8 h-8 mx-auto text-red-500 mb-3" />
              <h3 className="font-semibold mb-2">{t('support.response.bugs')}</h3>
              <p className="text-sm text-muted-foreground">{t('support.response.bugs.time')}</p>
            </div>
            <div className="response-card bg-card border border-border rounded-xl p-6 text-center">
              <Lightbulb className="w-8 h-8 mx-auto text-yellow-500 mb-3" />
              <h3 className="font-semibold mb-2">{t('support.response.features')}</h3>
              <p className="text-sm text-muted-foreground">{t('support.response.features.time')}</p>
            </div>
            <div className="response-card bg-card border border-border rounded-xl p-6 text-center">
              <Users className="w-8 h-8 mx-auto text-secondary mb-3" />
              <h3 className="font-semibold mb-2">{t('support.response.business')}</h3>
              <p className="text-sm text-muted-foreground">{t('support.response.business.time')}</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Final CTA */}
        <motion.section 
          className="final-cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="cta-card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-6">{t('support.cta.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('support.cta.text')}
            </p>
            <motion.button 
              className="cta-button bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold flex items-center gap-2 justify-center mx-auto transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'mailto:support@zealoustech.com'}
            >
              <Mail className="w-5 h-5" />
              {t('support.cta.button')}
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Last Updated */}
        <motion.div 
          className="last-updated text-center mt-12 pt-8 border-t border-border"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground">
            {t('support.lastUpdated')}: {lastUpdated}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage; 