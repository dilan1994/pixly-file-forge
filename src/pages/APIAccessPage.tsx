import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { 
  Calendar,
  Code,
  Globe,
  Zap,
  Shield,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Mail,
  ExternalLink,
  Copy,
  Download,
  Link,
  Monitor,
  Smartphone,
  Server,
  Database,
  Lock,
  Eye,
  Settings,
  FileText,
  Building,
  Rocket,
  Star,
  ArrowRight,
  Heart,
  Coffee,
  Layers,
  Terminal,
  Package,
  Cpu,
  Cloud,
  Key,
  Unlock,
  DollarSign,
  Clock,
  TrendingUp,
  Target,
  Gauge,
  Sparkles,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Info,
  Lightbulb,
  Wrench,
  Palette,
  Image,
  Video,
  ShoppingCart,
  GraduationCap,
  Briefcase
} from 'lucide-react';

export const APIAccessPage: React.FC = () => {
  const { t } = useTranslation();
  const [lastUpdated, setLastUpdated] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const integrationMethods = [
    {
      title: t('api.integration.iframe.title'),
      description: t('api.integration.iframe.description'),
      icon: <Monitor className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-500/5 border-blue-500/20",
      code: `<iframe 
  src="https://zealoustech.com/converter" 
  width="100%" 
  height="600px"
  frameborder="0">
</iframe>`,
      benefits: [
        t('api.integration.iframe.benefit1'),
        t('api.integration.iframe.benefit2'),
        t('api.integration.iframe.benefit3')
      ]
    },
    {
      title: t('api.integration.link.title'),
      description: t('api.integration.link.description'),
      icon: <Link className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-500/5 border-green-500/20",
      code: `<a href="https://zealoustech.com" target="_blank">
  Convert Images with Zealous Tech
</a>`,
      benefits: [
        t('api.integration.link.benefit1'),
        t('api.integration.link.benefit2'),
        t('api.integration.link.benefit3')
      ]
    },
    {
      title: t('api.integration.popup.title'),
      description: t('api.integration.popup.description'),
      icon: <ExternalLink className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-500/5 border-purple-500/20",
      code: `function openImageConverter() {
  window.open(
    'https://zealoustech.com', 
    'imageConverter',
    'width=1200,height=800,scrollbars=yes'
  );
}`,
      benefits: [
        t('api.integration.popup.benefit1'),
        t('api.integration.popup.benefit2'),
        t('api.integration.popup.benefit3')
      ]
    }
  ];

  const useCases = [
    {
      category: t('api.usecases.cms.category'),
      icon: <FileText className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      platforms: [
        t('api.usecases.cms.wordpress'),
        t('api.usecases.cms.drupal'),
        t('api.usecases.cms.joomla')
      ],
      implementations: [
        t('api.usecases.cms.impl1'),
        t('api.usecases.cms.impl2'),
        t('api.usecases.cms.impl3')
      ]
    },
    {
      category: t('api.usecases.webapp.category'),
      icon: <Code className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      platforms: [
        t('api.usecases.webapp.saas'),
        t('api.usecases.webapp.business'),
        t('api.usecases.webapp.enterprise')
      ],
      implementations: [
        t('api.usecases.webapp.impl1'),
        t('api.usecases.webapp.impl2'),
        t('api.usecases.webapp.impl3')
      ]
    },
    {
      category: t('api.usecases.ecommerce.category'),
      icon: <ShoppingCart className="w-8 h-8" />,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      platforms: [
        t('api.usecases.ecommerce.shopify'),
        t('api.usecases.ecommerce.woocommerce'),
        t('api.usecases.ecommerce.magento')
      ],
      implementations: [
        t('api.usecases.ecommerce.impl1'),
        t('api.usecases.ecommerce.impl2'),
        t('api.usecases.ecommerce.impl3')
      ]
    },
    {
      category: t('api.usecases.education.category'),
      icon: <GraduationCap className="w-8 h-8" />,
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
      platforms: [
        t('api.usecases.education.lms'),
        t('api.usecases.education.educational'),
        t('api.usecases.education.institutional')
      ],
      implementations: [
        t('api.usecases.education.impl1'),
        t('api.usecases.education.impl2'),
        t('api.usecases.education.impl3')
      ]
    }
  ];

  const enterpriseFeatures = [
    {
      feature: t('api.enterprise.security.title'),
      description: t('api.enterprise.security.description'),
      icon: <Shield className="w-6 h-6" />,
      benefits: [
        t('api.enterprise.security.benefit1'),
        t('api.enterprise.security.benefit2'),
        t('api.enterprise.security.benefit3'),
        t('api.enterprise.security.benefit4')
      ]
    },
    {
      feature: t('api.enterprise.scalability.title'),
      description: t('api.enterprise.scalability.description'),
      icon: <TrendingUp className="w-6 h-6" />,
      benefits: [
        t('api.enterprise.scalability.benefit1'),
        t('api.enterprise.scalability.benefit2'),
        t('api.enterprise.scalability.benefit3'),
        t('api.enterprise.scalability.benefit4')
      ]
    },
    {
      feature: t('api.enterprise.compliance.title'),
      description: t('api.enterprise.compliance.description'),
      icon: <FileText className="w-6 h-6" />,
      benefits: [
        t('api.enterprise.compliance.benefit1'),
        t('api.enterprise.compliance.benefit2'),
        t('api.enterprise.compliance.benefit3'),
        t('api.enterprise.compliance.benefit4')
      ]
    }
  ];

  return (
    <div className="api-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="api-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.section 
          className="api-hero text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="api-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('api.title')}
            </h1>
            <p className="subtitle text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('api.subtitle')}
            </p>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30 mb-8">
              <Calendar className="w-4 h-4" />
              <span>{t('api.lastUpdated')}: {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* No API Keys Required */}
        <motion.section 
          className="no-api-keys mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('api.noKeys.title')}
          </motion.h2>
          
          <motion.div className="no-keys-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="philosophy-card bg-gradient-to-r from-green-500/10 to-blue-500/10 border-2 border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
                <Unlock className="w-6 h-6" />
                {t('api.noKeys.philosophy.title')}
              </h3>
              <ul className="space-y-4">
                {[
                  'api.noKeys.philosophy.item1',
                  'api.noKeys.philosophy.item2',
                  'api.noKeys.philosophy.item3',
                  'api.noKeys.philosophy.item4'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="accessibility-card bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Users className="w-6 h-6" />
                {t('api.noKeys.accessibility.title')}
              </h3>
              <ul className="space-y-4">
                {[
                  'api.noKeys.accessibility.item1',
                  'api.noKeys.accessibility.item2',
                  'api.noKeys.accessibility.item3',
                  'api.noKeys.accessibility.item4'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Why No Traditional API */}
        <motion.section 
          className="why-no-api mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('api.whyNo.title')}
          </motion.h2>
          
          <motion.div className="benefits-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="client-side-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Cpu className="w-6 h-6 text-primary" />
                {t('api.whyNo.clientSide.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  'api.whyNo.clientSide.item1',
                  'api.whyNo.clientSide.item2',
                  'api.whyNo.clientSide.item3',
                  'api.whyNo.clientSide.item4'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="benefits-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-secondary" />
                {t('api.whyNo.benefits.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  'api.whyNo.benefits.item1',
                  'api.whyNo.benefits.item2',
                  'api.whyNo.benefits.item3',
                  'api.whyNo.benefits.item4'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Integration Methods */}
        <motion.section 
          className="integration-methods mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('api.integration.title')}
          </motion.h2>
          
          <motion.div className="methods-grid space-y-8" variants={itemVariants}>
            {integrationMethods.map((method, index) => (
              <div key={index} className={`method-card border-2 rounded-xl p-8 ${method.bgColor}`}>
                <div className="method-header mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={method.color}>{method.icon}</div>
                    <h3 className={`text-xl font-semibold ${method.color}`}>
                      {method.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{method.description}</p>
                </div>
                
                <div className="code-section mb-6">
                  <div className="code-header flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{t('api.integration.codeExample')}:</h4>
                    <button
                      onClick={() => copyToClipboard(method.code, `method-${index}`)}
                      className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      {copiedCode === `method-${index}` ? t('api.integration.copied') : t('api.integration.copy')}
                    </button>
                  </div>
                  <pre className="bg-background border border-border rounded-lg p-4 overflow-x-auto text-sm">
                    <code>{method.code}</code>
                  </pre>
                </div>

                <div className="benefits-section">
                  <h4 className="font-semibold text-foreground mb-3">{t('api.integration.benefits')}:</h4>
                  <ul className="space-y-2">
                    {method.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-3">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${method.color.replace('text-', 'text-').replace('-600', '-500')}`} />
                        <span className="text-muted-foreground text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Use Cases */}
        <motion.section 
          className="use-cases mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('api.usecases.title')}
          </motion.h2>
          
          <motion.div className="usecases-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {useCases.map((usecase, index) => (
              <div key={index} className={`usecase-card border border-border rounded-xl p-8 ${usecase.bgColor}`}>
                <h3 className={`text-xl font-semibold mb-6 flex items-center gap-3 ${usecase.color}`}>
                  {usecase.icon}
                  {usecase.category}
                </h3>
                
                <div className="platforms mb-6">
                  <h4 className="font-semibold text-foreground mb-3">{t('api.usecases.platforms')}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {usecase.platforms.map((platform, platformIndex) => (
                      <span key={platformIndex} className="px-3 py-1 bg-background border border-border rounded-full text-sm">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="implementations">
                  <h4 className="font-semibold text-foreground mb-3">{t('api.usecases.implementations')}:</h4>
                  <ul className="space-y-2">
                    {usecase.implementations.map((impl, implIndex) => (
                      <li key={implIndex} className="flex items-start gap-3">
                        <ArrowRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${usecase.color}`} />
                        <span className="text-muted-foreground text-sm">{impl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Enterprise Features */}
        <motion.section 
          className="enterprise-features mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('api.enterprise.title')}
          </motion.h2>
          
          <motion.div className="enterprise-grid space-y-8" variants={itemVariants}>
            {enterpriseFeatures.map((feature, index) => (
              <div key={index} className="enterprise-card bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  {feature.icon}
                  {feature.feature}
                </h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                
                <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="benefit-item flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* White Label Solutions */}
        <motion.section 
          className="white-label mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('api.whiteLabel.title')}
          </motion.h2>
          
          <motion.div className="white-label-content bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-xl p-8" variants={itemVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="features-list">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <Palette className="w-6 h-6 text-primary" />
                  {t('api.whiteLabel.features.title')}
                </h3>
                <ul className="space-y-3">
                  {[
                    'api.whiteLabel.features.item1',
                    'api.whiteLabel.features.item2',
                    'api.whiteLabel.features.item3',
                    'api.whiteLabel.features.item4'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{t(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-info">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-secondary" />
                  {t('api.whiteLabel.contact.title')}
                </h3>
                <p className="text-muted-foreground mb-4">{t('api.whiteLabel.contact.description')}</p>
                <div className="contact-details space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-secondary" />
                    <a href="mailto:business@zealoustech.com" className="text-secondary hover:underline">
                      business@zealoustech.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">{t('api.whiteLabel.contact.response')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Developer Resources */}
        <motion.section 
          className="developer-resources mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('api.developer.title')}
          </motion.h2>
          
          <motion.div className="resources-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="no-sdk-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Package className="w-6 h-6 text-primary" />
                {t('api.developer.noSDK.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('api.developer.noSDK.description')}</p>
              <ul className="space-y-3">
                {[
                  'api.developer.noSDK.item1',
                  'api.developer.noSDK.item2',
                  'api.developer.noSDK.item3',
                  'api.developer.noSDK.item4'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="support-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-secondary" />
                {t('api.developer.support.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('api.developer.support.description')}</p>
              <div className="support-details space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary" />
                  <a href="mailto:developers@zealoustech.com" className="text-secondary hover:underline">
                    developers@zealoustech.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span className="text-muted-foreground">{t('api.developer.support.response')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-secondary" />
                  <span className="text-muted-foreground">{t('api.developer.support.samples')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          className="api-faq mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('api.faq.title')}
          </motion.h2>
          
          <motion.div className="faq-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="developers-faq">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-primary" />
                {t('api.faq.developers.title')}
              </h3>
              <div className="space-y-4">
                {[
                  { q: 'api.faq.developers.q1', a: 'api.faq.developers.a1' },
                  { q: 'api.faq.developers.q2', a: 'api.faq.developers.a2' },
                  { q: 'api.faq.developers.q3', a: 'api.faq.developers.a3' },
                  { q: 'api.faq.developers.q4', a: 'api.faq.developers.a4' }
                ].map((faq, index) => (
                  <div key={index} className="faq-item bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">{t(faq.q)}</h4>
                    <p className="text-muted-foreground text-sm">{t(faq.a)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="business-faq">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-secondary" />
                {t('api.faq.business.title')}
              </h3>
              <div className="space-y-4">
                {[
                  { q: 'api.faq.business.q1', a: 'api.faq.business.a1' },
                  { q: 'api.faq.business.q2', a: 'api.faq.business.a2' },
                  { q: 'api.faq.business.q3', a: 'api.faq.business.a3' },
                  { q: 'api.faq.business.q4', a: 'api.faq.business.a4' }
                ].map((faq, index) => (
                  <div key={index} className="faq-item bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">{t(faq.q)}</h4>
                    <p className="text-muted-foreground text-sm">{t(faq.a)}</p>
                  </div>
                ))}
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
            <Rocket className="w-20 h-20 mx-auto text-primary mb-8" />
            <h2 className="text-3xl font-bold mb-6">{t('api.cta.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('api.cta.description')}
            </p>
            <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Image className="w-5 h-5" />
                {t('api.cta.tryConverter')}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="mailto:business@zealoustech.com" 
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {t('api.cta.contactBusiness')}
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
            {t('api.pageUpdated')}: {lastUpdated}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default APIAccessPage; 