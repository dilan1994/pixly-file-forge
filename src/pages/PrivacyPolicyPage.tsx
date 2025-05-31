import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { 
  Shield, 
  Lock, 
  Eye, 
  Server, 
  Globe, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Settings,
  Users,
  Clock
} from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
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

  return (
    <div className="privacy-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="privacy-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.section 
          className="privacy-header text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="header-content" variants={itemVariants}>
            <h1 className="privacy-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
              <Clock className="w-4 h-4" />
              <span><strong>Last Updated:</strong> {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Main Promise */}
        <motion.section 
          className="privacy-promise mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="promise-card bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <div className="promise-icon text-6xl mb-6">
              <Lock className="w-16 h-16 mx-auto text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Your Files Never Leave Your Device</h2>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto">
              At Zealous Tech, we've built our image conversion service with the strongest privacy protection possible: 
              <strong className="text-foreground"> your files are processed entirely in your browser and never uploaded to our servers</strong>. 
              This means we literally cannot see, access, or store your images.
            </p>
          </motion.div>
        </motion.section>

        {/* How It Works */}
        <motion.section 
          className="privacy-technology mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              How Our Privacy-First Technology Works
            </motion.h2>
            
            <motion.div className="tech-section bg-card border border-border rounded-xl p-8 mb-8" variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Server className="w-6 h-6 text-primary" />
                Complete Client-Side Processing
              </h3>
              <ul className="tech-list space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>All conversions happen in your browser</strong> using advanced web technologies</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Zero file uploads</strong> - your images stay on your device at all times</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No server storage</strong> - we have nothing to store because files never reach us</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Instant processing</strong> - no waiting for uploads or downloads</span>
                </li>
              </ul>
            </motion.div>

            <motion.div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={itemVariants}>
              <div className="benefit-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
                <h4 className="font-semibold mb-2">Maximum Privacy</h4>
                <p className="text-sm text-muted-foreground">We cannot see your files because they never leave your computer</p>
              </div>
              
              <div className="benefit-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <XCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                <h4 className="font-semibold mb-2">No Data Breaches</h4>
                <p className="text-sm text-muted-foreground">Since we don't store files, there's nothing to breach</p>
              </div>
              
              <div className="benefit-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <Globe className="w-12 h-12 mx-auto text-secondary mb-4" />
                <h4 className="font-semibold mb-2">Works Offline</h4>
                <p className="text-sm text-muted-foreground">Once our page loads, you can convert images without internet</p>
              </div>
              
              <div className="benefit-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
                <h4 className="font-semibold mb-2">Faster Conversions</h4>
                <p className="text-sm text-muted-foreground">No upload/download time - everything happens locally</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* What We Collect */}
        <motion.section 
          className="privacy-collection mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              What We Actually Collect
            </motion.h2>
            
            <motion.div className="collection-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
              <div className="collection-card bg-red-500/5 border-2 border-red-500/20 rounded-xl p-8">
                <div className="collection-icon mb-4">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">Absolutely No File Data</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Zero access</strong> to your uploaded images</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No file names</strong> stored or recorded</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No conversion history</strong> - we don't even know what you converted</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No file content</strong> ever reaches our servers</span>
                  </li>
                </ul>
              </div>
              
              <div className="collection-card bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-8">
                <div className="collection-icon mb-4">
                  <Eye className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Minimal Website Analytics Only</h3>
                <p className="mb-4 text-muted-foreground">We collect basic, anonymous website usage data to improve our service:</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Page visits</strong> (not linked to individuals)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Browser compatibility</strong> information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span><strong>General performance</strong> metrics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Country-level</strong> visitor statistics</span>
                  </li>
                </ul>
                
                <div className="dont-collect border-t border-border pt-4">
                  <h4 className="font-semibold mb-3">What we DON'T collect:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Personal information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Email addresses or contact details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>Individual user behavior</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>File types or conversion patterns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Technology Promise */}
        <motion.section 
          className="privacy-tech-promise mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              Our Technology Promise
            </motion.h2>
            
            <motion.div className="tech-promise-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
              <div className="tech-promise-card bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-primary" />
                  Browser-Based Security
                </h3>
                <p className="mb-4 text-muted-foreground">Our conversion technology uses:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>HTML5 Canvas API</strong> for image processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>WebAssembly (WASM)</strong> for advanced conversions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Client-side JavaScript</strong> libraries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No server communication</strong> during file processing</span>
                  </li>
                </ul>
              </div>
              
              <div className="tech-promise-card bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-secondary" />
                  Your Device, Your Control
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Processing power:</strong> Uses your computer's resources</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Storage:</strong> Temporary files only in your browser's memory</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Deletion:</strong> Files cleared when you close the tab</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Privacy:</strong> Your browser is the only thing that sees your files</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* What We Can't Do */}
        <motion.section 
          className="privacy-limitations mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              What We Can't Do (By Design)
            </motion.h2>
            <motion.div 
              className="limitations-card bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8"
              variants={itemVariants}
            >
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-4">Because of our privacy-first architecture:</h3>
                  <ul className="limitations-list space-y-3">
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Can't recover your files</strong> - we never had them</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Can't see conversion history</strong> - it doesn't exist on our end</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Can't access file contents</strong> - they never leave your browser</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Can't share your data</strong> - we don't have any file data to share</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Cookies & Storage */}
        <motion.section 
          className="privacy-cookies mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              Cookies & Local Storage
            </motion.h2>
            
            <motion.div className="cookies-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
              <div className="cookies-card bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-primary" />
                  Essential Functionality Only
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Conversion preferences:</strong> Saved locally in your browser</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Interface settings:</strong> Remember your preferred options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No tracking cookies:</strong> We don't track individual users</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No third-party advertising:</strong> Clean, ad-free experience</span>
                  </li>
                </ul>
              </div>
              
              <div className="cookies-card bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-secondary" />
                  Your Control
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Clear browser data anytime to remove all traces</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Disable cookies - our core features still work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Use private/incognito mode for zero local storage</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Rights Section */}
        <motion.section 
          className="privacy-rights mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              Your Digital Rights
            </motion.h2>
            
            <motion.div className="rights-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
              <div className="rights-card bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  Complete Privacy Protection
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No data to delete</strong> - your files were never stored</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No accounts to close</strong> - no registration required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No profiles built</strong> - we don't track individuals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>No consent needed</strong> for file processing - it's all local</span>
                  </li>
                </ul>
              </div>
              
              <div className="transparency-card bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-blue-500" />
                  Transparency Guarantee
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Open about our technology:</strong> All processing happens in your browser</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Clear about limitations:</strong> We literally cannot access your files</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Honest about data:</strong> We only collect basic website statistics</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact & Updates */}
        <motion.section 
          className="privacy-contact mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              Questions About Our Privacy Approach?
            </motion.h2>
            <motion.div className="contact-content bg-card border border-border rounded-xl p-8 mb-8" variants={itemVariants}>
              <p className="text-lg mb-4">
                We're proud of our privacy-first design and happy to explain:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>How client-side processing works</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Why your files are completely private</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Technical details about our browser-based conversion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Any other privacy concerns</span>
                </li>
              </ul>
              <p className="text-lg font-semibold text-primary">
                Contact us through our website - we love talking about privacy protection!
              </p>
            </motion.div>
            
            <motion.div className="updates-info bg-card border border-border rounded-xl p-8" variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-secondary" />
                Policy Updates
              </h3>
              <p className="mb-4">If we ever update this policy:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>No changes to file privacy</strong> - your files will always stay on your device</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Clear notifications</strong> about any website analytics changes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Same privacy-first</strong> commitment maintained</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>User-friendly explanations</strong> of any updates</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Core Promise */}
        <motion.section 
          className="privacy-footer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="core-promise bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-6">Zealous Tech's Core Promise</h2>
            <p className="text-lg leading-relaxed text-muted-foreground max-w-4xl mx-auto">
              Your files are processed entirely in your browser. We built it this way specifically to ensure your complete privacy - 
              because the best way to protect your data is to never have access to it in the first place.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 