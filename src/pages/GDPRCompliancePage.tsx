import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Settings, 
  Users, 
  Calendar,
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Mail,
  Clock,
  Globe,
  Database,
  Server,
  Trash2,
  Download,
  UserCheck,
  Scale,
  Gavel,
  Building,
  Phone,
  MapPin,
  ExternalLink,
  Info,
  Zap,
  HelpCircle,
  Star,
  ArrowRight
} from 'lucide-react';

export const GDPRCompliancePage: React.FC = () => {
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

  const gdprRights = [
    {
      article: t('gdpr.rights.information.article'),
      title: t('gdpr.rights.information.title'),
      description: t('gdpr.rights.information.description'),
      icon: <Info className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-500/5 border-blue-500/20",
      compliance: [
        t('gdpr.rights.information.compliance1'),
        t('gdpr.rights.information.compliance2'),
        t('gdpr.rights.information.compliance3'),
        t('gdpr.rights.information.compliance4')
      ]
    },
    {
      article: t('gdpr.rights.access.article'),
      title: t('gdpr.rights.access.title'),
      description: t('gdpr.rights.access.description'),
      icon: <Eye className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-500/5 border-green-500/20",
      compliance: [
        t('gdpr.rights.access.compliance1'),
        t('gdpr.rights.access.compliance2'),
        t('gdpr.rights.access.compliance3'),
        t('gdpr.rights.access.compliance4')
      ]
    },
    {
      article: t('gdpr.rights.rectification.article'),
      title: t('gdpr.rights.rectification.title'),
      description: t('gdpr.rights.rectification.description'),
      icon: <Settings className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-500/5 border-purple-500/20",
      compliance: [
        t('gdpr.rights.rectification.compliance1'),
        t('gdpr.rights.rectification.compliance2'),
        t('gdpr.rights.rectification.compliance3'),
        t('gdpr.rights.rectification.compliance4')
      ]
    },
    {
      article: t('gdpr.rights.erasure.article'),
      title: t('gdpr.rights.erasure.title'),
      description: t('gdpr.rights.erasure.description'),
      icon: <Trash2 className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-500/5 border-red-500/20",
      compliance: [
        t('gdpr.rights.erasure.compliance1'),
        t('gdpr.rights.erasure.compliance2'),
        t('gdpr.rights.erasure.compliance3'),
        t('gdpr.rights.erasure.compliance4')
      ]
    },
    {
      article: t('gdpr.rights.restrict.article'),
      title: t('gdpr.rights.restrict.title'),
      description: t('gdpr.rights.restrict.description'),
      icon: <Lock className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-500/5 border-orange-500/20",
      compliance: [
        t('gdpr.rights.restrict.compliance1'),
        t('gdpr.rights.restrict.compliance2'),
        t('gdpr.rights.restrict.compliance3'),
        t('gdpr.rights.restrict.compliance4')
      ]
    },
    {
      article: t('gdpr.rights.portability.article'),
      title: t('gdpr.rights.portability.title'),
      description: t('gdpr.rights.portability.description'),
      icon: <Download className="w-6 h-6" />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-500/5 border-cyan-500/20",
      compliance: [
        t('gdpr.rights.portability.compliance1'),
        t('gdpr.rights.portability.compliance2'),
        t('gdpr.rights.portability.compliance3'),
        t('gdpr.rights.portability.compliance4')
      ]
    },
    {
      article: t('gdpr.rights.object.article'),
      title: t('gdpr.rights.object.title'),
      description: t('gdpr.rights.object.description'),
      icon: <UserCheck className="w-6 h-6" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-500/5 border-indigo-500/20",
      compliance: [
        t('gdpr.rights.object.compliance1'),
        t('gdpr.rights.object.compliance2'),
        t('gdpr.rights.object.compliance3'),
        t('gdpr.rights.object.compliance4')
      ]
    },
    {
      article: t('gdpr.rights.automated.article'),
      title: t('gdpr.rights.automated.title'),
      description: t('gdpr.rights.automated.description'),
      icon: <Zap className="w-6 h-6" />,
      color: "text-pink-600",
      bgColor: "bg-pink-500/5 border-pink-500/20",
      compliance: [
        t('gdpr.rights.automated.compliance1'),
        t('gdpr.rights.automated.compliance2'),
        t('gdpr.rights.automated.compliance3'),
        t('gdpr.rights.automated.compliance4')
      ]
    }
  ];

  const legalBasis = [
    {
      type: t('gdpr.legal.legitimate.type'),
      article: t('gdpr.legal.legitimate.article'),
      icon: <Scale className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-500/5 border-blue-500/20",
      purpose: t('gdpr.legal.legitimate.purpose'),
      balancing: t('gdpr.legal.legitimate.balancing'),
      rights: t('gdpr.legal.legitimate.rights')
    },
    {
      type: t('gdpr.legal.consent.type'),
      article: t('gdpr.legal.consent.article'),
      icon: <UserCheck className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-500/5 border-green-500/20",
      purpose: t('gdpr.legal.consent.purpose'),
      balancing: t('gdpr.legal.consent.balancing'),
      rights: t('gdpr.legal.consent.rights')
    },
    {
      type: t('gdpr.legal.contractual.type'),
      article: t('gdpr.legal.contractual.article'),
      icon: <FileText className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-500/5 border-purple-500/20",
      purpose: t('gdpr.legal.contractual.purpose'),
      balancing: t('gdpr.legal.contractual.balancing'),
      rights: t('gdpr.legal.contractual.rights')
    }
  ];

  const supervisoryAuthorities = [
    {
      country: t('gdpr.authorities.germany.country'),
      name: t('gdpr.authorities.germany.name'),
      icon: <Building className="w-5 h-5" />
    },
    {
      country: t('gdpr.authorities.france.country'),
      name: t('gdpr.authorities.france.name'),
      icon: <Building className="w-5 h-5" />
    },
    {
      country: t('gdpr.authorities.ireland.country'),
      name: t('gdpr.authorities.ireland.name'),
      icon: <Building className="w-5 h-5" />
    },
    {
      country: t('gdpr.authorities.uk.country'),
      name: t('gdpr.authorities.uk.name'),
      icon: <Building className="w-5 h-5" />
    }
  ];

  return (
    <div className="gdpr-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="gdpr-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.section 
          className="gdpr-hero text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="gdpr-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('gdpr.title')}
            </h1>
            <p className="subtitle text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('gdpr.subtitle')}
            </p>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30 mb-8">
              <Calendar className="w-4 h-4" />
              <span>{t('gdpr.lastUpdated')}: {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Commitment Section */}
        <motion.section 
          className="commitment mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('gdpr.commitment.title')}
          </motion.h2>
          
          <motion.div 
            className="commitment-content bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-12"
            variants={itemVariants}
          >
            <div className="commitment-icon text-center mb-6">
              <Shield className="w-16 h-16 mx-auto text-primary" />
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto">
              {t('gdpr.commitment.description')}
            </p>
          </motion.div>
        </motion.section>

        {/* Technology Protection */}
        <motion.section 
          className="technology-protection mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('gdpr.technology.title')}
          </motion.h2>
          
          <motion.div className="protection-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Data Minimization */}
            <div className="minimization-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-primary" />
                {t('gdpr.technology.minimization.title')}
              </h3>
              
              <div className="dont-collect mb-6">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  {t('gdpr.technology.minimization.dontCollect')}:
                </h4>
                <ul className="space-y-2">
                  {[
                    t('gdpr.technology.minimization.dont1'),
                    t('gdpr.technology.minimization.dont2'),
                    t('gdpr.technology.minimization.dont3'),
                    t('gdpr.technology.minimization.dont4')
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="do-collect">
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {t('gdpr.technology.minimization.doCollect')}:
                </h4>
                <ul className="space-y-2">
                  {[
                    t('gdpr.technology.minimization.do1'),
                    t('gdpr.technology.minimization.do2'),
                    t('gdpr.technology.minimization.do3')
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technical Implementation */}
            <div className="implementation-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Server className="w-6 h-6 text-secondary" />
                {t('gdpr.technology.implementation.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  t('gdpr.technology.implementation.item1'),
                  t('gdpr.technology.implementation.item2'),
                  t('gdpr.technology.implementation.item3'),
                  t('gdpr.technology.implementation.item4')
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

        {/* GDPR Rights */}
        <motion.section 
          className="gdpr-rights mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('gdpr.rights.title')}
          </motion.h2>
          
          <motion.div className="rights-grid space-y-8" variants={itemVariants}>
            {gdprRights.map((right, index) => (
              <div key={index} className={`right-card border-2 rounded-xl p-8 ${right.bgColor}`}>
                <div className="right-header mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={right.color}>{right.icon}</div>
                    <span className="text-sm font-medium text-muted-foreground">{right.article}</span>
                  </div>
                  <h3 className={`text-xl font-semibold ${right.color}`}>
                    {right.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">{right.description}</p>
                </div>
                
                <div className="compliance-details">
                  <h4 className="font-semibold text-foreground mb-3">{t('gdpr.rights.howWeComply')}:</h4>
                  <ul className="space-y-2">
                    {right.compliance.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Legal Basis */}
        <motion.section 
          className="legal-basis mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('gdpr.legal.title')}
          </motion.h2>
          
          <motion.div className="basis-grid grid grid-cols-1 lg:grid-cols-3 gap-8" variants={itemVariants}>
            {legalBasis.map((basis, index) => (
              <div key={index} className={`basis-card border-2 rounded-xl p-8 ${basis.bgColor}`}>
                <h3 className={`text-xl font-semibold mb-4 flex items-center gap-3 ${basis.color}`}>
                  {basis.icon}
                  {basis.type}
                </h3>
                <div className="text-sm text-muted-foreground mb-4">{basis.article}</div>
                
                <div className="basis-details space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('gdpr.legal.purpose')}:</h4>
                    <p className="text-sm text-muted-foreground">{basis.purpose}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('gdpr.legal.balancing')}:</h4>
                    <p className="text-sm text-muted-foreground">{basis.balancing}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('gdpr.legal.userRights')}:</h4>
                    <p className="text-sm text-muted-foreground">{basis.rights}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Data Protection Officer */}
        <motion.section 
          className="dpo-contact mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('gdpr.dpo.title')}
          </motion.h2>
          
          <motion.div className="dpo-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Privacy Contact */}
            <div className="privacy-contact bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                {t('gdpr.dpo.privacy.title')}
              </h3>
              <div className="contact-info space-y-3">
                <div className="contact-item flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">{t('gdpr.dpo.privacy.email')}:</span>
                    <a href="mailto:privacy@zealoustech.com" className="text-primary hover:underline ml-2">
                      privacy@zealoustech.com
                    </a>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">{t('gdpr.dpo.privacy.subject')}:</span>
                    <span className="text-muted-foreground ml-2">"{t('gdpr.dpo.privacy.subjectLine')}"</span>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <span className="font-semibold text-foreground">{t('gdpr.dpo.privacy.response')}:</span>
                    <span className="text-muted-foreground ml-2">{t('gdpr.dpo.privacy.responseTime')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Request Types */}
            <div className="request-types bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-secondary" />
                {t('gdpr.dpo.requests.title')}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">{t('gdpr.dpo.requests.access.title')}:</span>
                    <p className="text-sm text-muted-foreground mt-1">{t('gdpr.dpo.requests.access.description')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Trash2 className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">{t('gdpr.dpo.requests.deletion.title')}:</span>
                    <p className="text-sm text-muted-foreground mt-1">{t('gdpr.dpo.requests.deletion.description')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">{t('gdpr.dpo.requests.correction.title')}:</span>
                    <p className="text-sm text-muted-foreground mt-1">{t('gdpr.dpo.requests.correction.description')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Data Transfers */}
        <motion.section 
          className="data-transfers mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('gdpr.transfers.title')}
          </motion.h2>
          
          <motion.div className="transfers-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* EU Data Protection */}
            <div className="eu-protection bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-primary" />
                {t('gdpr.transfers.eu.title')}
              </h3>
              <ul className="space-y-3">
                {[
                  t('gdpr.transfers.eu.item1'),
                  t('gdpr.transfers.eu.item2'),
                  t('gdpr.transfers.eu.item3')
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Adequacy Decisions */}
            <div className="adequacy-decisions bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Scale className="w-6 h-6 text-secondary" />
                {t('gdpr.transfers.adequacy.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('gdpr.transfers.adequacy.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('gdpr.transfers.adequacy.item1'),
                  t('gdpr.transfers.adequacy.item2'),
                  t('gdpr.transfers.adequacy.item3')
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

        {/* Breach Notification */}
        <motion.section 
          className="breach-notification mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('gdpr.breach.title')}
          </motion.h2>
          
          <motion.div className="breach-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Our Responsibilities */}
            <div className="responsibilities bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                {t('gdpr.breach.responsibilities.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('gdpr.breach.responsibilities.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('gdpr.breach.responsibilities.item1'),
                  t('gdpr.breach.responsibilities.item2'),
                  t('gdpr.breach.responsibilities.item3'),
                  t('gdpr.breach.responsibilities.item4')
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Low Risk Architecture */}
            <div className="low-risk bg-green-500/5 border-2 border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
                <Shield className="w-6 h-6" />
                {t('gdpr.breach.lowRisk.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('gdpr.breach.lowRisk.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('gdpr.breach.lowRisk.item1'),
                  t('gdpr.breach.lowRisk.item2'),
                  t('gdpr.breach.lowRisk.item3'),
                  t('gdpr.breach.lowRisk.item4')
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Supervisory Authority */}
        <motion.section 
          className="supervisory-authority mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('gdpr.authority.title')}
          </motion.h2>
          
          <motion.div className="authority-content" variants={itemVariants}>
            <div className="complaint-info bg-yellow-500/5 border-2 border-yellow-500/20 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-yellow-600 dark:text-yellow-400">
                <Gavel className="w-6 h-6" />
                {t('gdpr.authority.complaint.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('gdpr.authority.complaint.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('gdpr.authority.complaint.item1'),
                  t('gdpr.authority.complaint.item2'),
                  t('gdpr.authority.complaint.item3')
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="authorities-list">
              <h3 className="text-xl font-semibold mb-6 text-center">{t('gdpr.authority.common.title')}:</h3>
              <div className="authorities-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                {supervisoryAuthorities.map((authority, index) => (
                  <div key={index} className="authority-card bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      {authority.icon}
                      <div>
                        <span className="font-semibold text-foreground">{authority.country}:</span>
                        <p className="text-sm text-muted-foreground">{authority.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Compliance Reviews */}
        <motion.section 
          className="compliance-reviews mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            {t('gdpr.reviews.title')}
          </motion.h2>
          
          <motion.div className="reviews-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Ongoing Compliance */}
            <div className="ongoing-compliance bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-primary" />
                {t('gdpr.reviews.ongoing.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('gdpr.reviews.ongoing.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('gdpr.reviews.ongoing.item1'),
                  t('gdpr.reviews.ongoing.item2'),
                  t('gdpr.reviews.ongoing.item3'),
                  t('gdpr.reviews.ongoing.item4')
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documentation Maintenance */}
            <div className="documentation bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-secondary" />
                {t('gdpr.reviews.documentation.title')}
              </h3>
              <p className="text-muted-foreground mb-4">{t('gdpr.reviews.documentation.description')}:</p>
              <ul className="space-y-3">
                {[
                  t('gdpr.reviews.documentation.item1'),
                  t('gdpr.reviews.documentation.item2'),
                  t('gdpr.reviews.documentation.item3'),
                  t('gdpr.reviews.documentation.item4')
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

        {/* Final CTA */}
        <motion.section 
          className="final-cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="cta-card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <Shield className="w-20 h-20 mx-auto text-primary mb-8" />
            <h2 className="text-3xl font-bold mb-6">{t('gdpr.cta.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('gdpr.cta.description')}
            </p>
            <a 
              href="mailto:privacy@zealoustech.com" 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-5 h-5" />
              {t('gdpr.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </a>
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
            {t('gdpr.pageUpdated')}: {lastUpdated}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GDPRCompliancePage; 