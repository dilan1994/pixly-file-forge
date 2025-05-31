import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { 
  Scale, 
  Shield, 
  Clock, 
  FileText, 
  Users, 
  Globe, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Mail,
  Server,
  Monitor,
  Gavel,
  Lock,
  Settings
} from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
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
    <div className="terms-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="terms-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.section 
          className="terms-header text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="header-content" variants={itemVariants}>
            <h1 className="terms-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
              <Clock className="w-4 h-4" />
              <span><strong>Last Updated:</strong> {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Welcome Section */}
        <motion.section 
          className="welcome-section mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="welcome-card bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-12"
            variants={itemVariants}
          >
            <div className="welcome-icon text-center mb-6">
              <Scale className="w-16 h-16 mx-auto text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-6">Welcome to Zealous Tech</h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto">
              These Terms of Service ("Terms") govern your use of Zealous Tech's image conversion tools and services ("Service") operated by Zealous Tech ("we," "us," or "our"). By using our Service, you agree to these Terms.
            </p>
          </motion.div>
        </motion.section>

        {/* Service Model */}
        <motion.section 
          className="service-model mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Our Service Model
          </motion.h2>
          
          <motion.div className="model-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="model-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Server className="w-6 h-6 text-primary" />
                Client-Side Processing
              </h3>
              <p className="text-muted-foreground mb-4">
                Our image converter operates entirely within your web browser using advanced client-side processing technology. This means:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Your files are processed locally on your device</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>No file uploads to our servers occur during conversion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>We cannot access, view, or store your converted files</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>All processing happens using your device's resources</span>
                </li>
              </ul>
            </div>
            
            <div className="model-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Users className="w-6 h-6 text-secondary" />
                Free Service
              </h3>
              <p className="text-muted-foreground mb-4">
                Our basic image conversion service is provided free of charge. We reserve the right to introduce premium features in the future, but core conversion functionality will remain free.
              </p>
              <div className="free-features bg-accent/10 border border-accent/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Always Free:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Basic image format conversions</li>
                  <li>• Client-side processing</li>
                  <li>• Privacy-first approach</li>
                  <li>• No file size restrictions (device dependent)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Acceptable Use */}
        <motion.section 
          className="acceptable-use mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Acceptable Use
          </motion.h2>
          
          <motion.div className="use-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="use-card bg-green-500/5 border-2 border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
                <CheckCircle className="w-6 h-6" />
                What You Can Do
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Convert images for personal, educational, or commercial purposes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Use our Service on multiple devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Share links to our Service with others</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Process any images you own or have permission to convert</span>
                </li>
              </ul>
            </div>
            
            <div className="use-card bg-red-500/5 border-2 border-red-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-red-600 dark:text-red-400">
                <XCircle className="w-6 h-6" />
                What You Cannot Do
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Attempt to reverse engineer our conversion algorithms</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Use automated tools to overload our Service</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Upload malicious files or content</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Violate any applicable laws while using our Service</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Attempt to access our non-existent server-side file storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Interfere with other users' ability to use the Service</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Intellectual Property */}
        <motion.section 
          className="intellectual-property mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Intellectual Property
          </motion.h2>
          
          <motion.div className="ip-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="ip-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                Your Content
              </h3>
              <p className="text-muted-foreground mb-4">
                Since your files never reach our servers:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You retain all rights to your original images</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You retain all rights to your converted images</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>We make no claims to any intellectual property you process</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>You are responsible for ensuring you have rights to convert any images you process</span>
                </li>
              </ul>
            </div>
            
            <div className="ip-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-secondary" />
                Our Technology
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>The Service's code, algorithms, and user interface are owned by Zealous Tech</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>You may not copy, distribute, or create derivative works of our Service</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Our client-side processing technology is proprietary to Zealous Tech</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Any feedback or suggestions you provide may be used to improve our Service</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Service Availability */}
        <motion.section 
          className="service-availability mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Service Availability
          </motion.h2>
          
          <motion.div className="availability-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="availability-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-orange-500" />
                No Uptime Guarantees
              </h3>
              <p className="text-muted-foreground mb-4">
                While we strive for high availability:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>We don't guarantee uninterrupted access to our Service</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Maintenance periods may temporarily interrupt service</span>
                </li>
                <li className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Your browser's capabilities affect Service functionality</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>We're not liable for interruptions beyond our control</span>
                </li>
              </ul>
            </div>
            
            <div className="availability-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Monitor className="w-6 h-6 text-blue-500" />
                Browser Dependencies
              </h3>
              <p className="text-muted-foreground mb-4">
                Since our Service runs in your browser:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Service functionality depends on your browser's capabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>We recommend using modern, updated browsers for best results</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Some features may not work in older browsers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Browser updates may affect Service performance</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Limitations and Disclaimers */}
        <motion.section 
          className="limitations mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Limitations and Disclaimers
          </motion.h2>
          
          <motion.div className="limitations-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="limitations-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                Service Limitations
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>File size limits depend on your device's memory and browser capabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Processing speed varies based on your device's performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Some image formats may have conversion limitations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Batch processing limits depend on your system resources</span>
                </li>
              </ul>
            </div>
            
            <div className="limitations-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-500" />
                No Warranties
              </h3>
              <p className="text-muted-foreground mb-4">
                Our Service is provided "as is" without warranties of any kind:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>We don't guarantee perfect conversion quality for all images</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>We don't warrant that the Service will meet all your needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>We don't guarantee compatibility with all devices or browsers</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>We don't warrant that the Service will be error-free</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div className="liability-card bg-yellow-500/5 border-2 border-yellow-500/20 rounded-xl p-8 mt-8" variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-yellow-600 dark:text-yellow-400">
              <Gavel className="w-6 h-6" />
              Limitation of Liability
            </h3>
            <p className="text-muted-foreground mb-4">
              Since your files never reach our servers, many traditional web service risks don't apply. However:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>We're not liable for any data loss (though technically impossible in our system)</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>We're not responsible for conversion quality issues</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>We're not liable for device performance impacts during processing</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Our total liability is limited to the amount you paid (typically $0)</span>
              </li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Privacy and Data Protection */}
        <motion.section 
          className="privacy-data mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Privacy and Data Protection
          </motion.h2>
          
          <motion.div className="privacy-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="privacy-card bg-green-500/5 border-2 border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
                <Shield className="w-6 h-6" />
                No Server-Side Data Collection
              </h3>
              <p className="text-muted-foreground mb-4">
                Because of our client-side architecture:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>We cannot collect your converted files</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>We don't store conversion histories</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>We can't recover files you've processed</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Your image data never leaves your device during conversion</span>
                </li>
              </ul>
            </div>
            
            <div className="privacy-card bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Globe className="w-6 h-6" />
                Analytics Data Only
              </h3>
              <p className="text-muted-foreground mb-4">
                We only collect:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Basic website usage statistics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Browser compatibility information</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>General performance metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Anonymous visitor counts</span>
                </li>
              </ul>
              <div className="privacy-link bg-accent/10 border border-accent/20 rounded-lg p-3 mt-4">
                <p className="text-sm">
                  See our <a href="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</a> for complete details.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* User Responsibilities */}
        <motion.section 
          className="user-responsibilities mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            User Responsibilities
          </motion.h2>
          
          <motion.div className="responsibilities-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="responsibility-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Monitor className="w-6 h-6 text-primary" />
                Device and Browser Maintenance
              </h3>
              <p className="text-muted-foreground mb-4">
                You are responsible for:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Keeping your browser updated for optimal performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Ensuring your device has sufficient memory for conversions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Managing your own file backups and storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Understanding your browser's security settings</span>
                </li>
              </ul>
            </div>
            
            <div className="responsibility-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-secondary" />
                Content Responsibility
              </h3>
              <p className="text-muted-foreground mb-4">
                You agree that:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You have proper rights to any images you convert</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>You won't process illegal, harmful, or infringing content</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>You understand that image conversion may affect quality</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You're responsible for verifying conversion results meet your needs</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Changes to Service */}
        <motion.section 
          className="service-changes mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Changes to Service
          </motion.h2>
          
          <motion.div className="changes-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="changes-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-primary" />
                Service Updates
              </h3>
              <p className="text-muted-foreground mb-4">
                We may update our Service to:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Add new image formats or features</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Improve conversion quality or speed</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Enhance browser compatibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Fix bugs or security issues</span>
                </li>
              </ul>
            </div>
            
            <div className="changes-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-secondary" />
                Terms Updates
              </h3>
              <p className="text-muted-foreground mb-4">
                We may modify these Terms by:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Posting updated Terms on our website</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Indicating the new effective date</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Continuing to provide the Service under new Terms</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Notifying users of significant changes when possible</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Termination */}
        <motion.section 
          className="termination mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Termination
          </motion.h2>
          
          <motion.div className="termination-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="termination-card bg-green-500/5 border-2 border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
                <Users className="w-6 h-6" />
                Your Rights
              </h3>
              <p className="text-muted-foreground mb-4">
                You may stop using our Service at any time by simply closing your browser. Since we don't store accounts or data, there's nothing to delete or cancel.
              </p>
              <div className="termination-note bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>No Account Deletion Needed:</strong> Since everything happens locally, there are no accounts or stored data to manage.
                </p>
              </div>
            </div>
            
            <div className="termination-card bg-orange-500/5 border-2 border-orange-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-orange-600 dark:text-orange-400">
                <Gavel className="w-6 h-6" />
                Our Rights
              </h3>
              <p className="text-muted-foreground mb-4">
                We reserve the right to:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Discontinue the Service with reasonable notice</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Block access from specific IP addresses if necessary</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Modify or limit Service features</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>Refuse service for violations of these Terms</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Legal Information */}
        <motion.section 
          className="legal-info mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Legal Information
          </motion.h2>
          
          <motion.div className="legal-grid grid grid-cols-1 lg:grid-cols-3 gap-8" variants={itemVariants}>
            <div className="legal-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Gavel className="w-6 h-6 text-primary" />
                Governing Law
              </h3>
              <p className="text-muted-foreground">
                These Terms are governed by the laws of [Your Jurisdiction] without regard to conflict of law principles.
              </p>
            </div>
            
            <div className="legal-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Scale className="w-6 h-6 text-secondary" />
                Dispute Resolution
              </h3>
              <p className="text-muted-foreground mb-4">
                Any disputes will be resolved through:
              </p>
              <ul className="text-sm space-y-2">
                <li>• Good faith negotiation first</li>
                <li>• Binding arbitration if negotiation fails</li>
                <li>• Courts in [Your Jurisdiction] as a last resort</li>
              </ul>
            </div>
            
            <div className="legal-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-accent" />
                Severability
              </h3>
              <p className="text-muted-foreground">
                If any part of these Terms is found unenforceable, the remaining parts will continue to apply.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Contact Information */}
        <motion.section 
          className="contact-info mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Contact Information
          </motion.h2>
          
          <motion.div 
            className="contact-card bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <Mail className="w-16 h-16 mx-auto text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-6">Questions about these Terms?</h3>
            <p className="text-lg text-muted-foreground mb-8">Contact us through any of these channels:</p>
            
            <div className="contact-methods grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="contact-method bg-card border border-border rounded-xl p-6">
                <h4 className="font-semibold mb-2">Legal Inquiries</h4>
                <a href="mailto:legal@zealoustech.com" className="text-primary font-medium hover:underline">
                  legal@zealoustech.com
                </a>
              </div>
              <div className="contact-method bg-card border border-border rounded-xl p-6">
                <h4 className="font-semibold mb-2">Business</h4>
                <a href="mailto:business@zealoustech.com" className="text-primary font-medium hover:underline">
                  business@zealoustech.com
                </a>
              </div>
              <div className="contact-method bg-card border border-border rounded-xl p-6">
                <h4 className="font-semibold mb-2">Support</h4>
                <a href="mailto:support@zealoustech.com" className="text-primary font-medium hover:underline">
                  support@zealoustech.com
                </a>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Special Provisions */}
        <motion.section 
          className="special-provisions mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Special Provisions for Client-Side Processing
          </motion.h2>
          
          <motion.div className="provisions-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            <div className="provision-card bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Monitor className="w-6 h-6" />
                Technical Acknowledgment
              </h3>
              <p className="text-muted-foreground mb-4">
                By using our Service, you acknowledge that:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Conversion processing occurs entirely within your browser</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>We have no technical ability to access your files during conversion</span>
                </li>
                <li className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Service performance depends on your device capabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>File security depends on your browser and device security</span>
                </li>
              </ul>
            </div>
            
            <div className="provision-card bg-green-500/5 border-2 border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
                <FileText className="w-6 h-6" />
                Data Responsibility
              </h3>
              <p className="text-muted-foreground mb-4">
                Since files never reach our servers:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>You are solely responsible for backing up original files</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>We cannot recover lost or corrupted files</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>File security is managed by your browser and device</span>
                </li>
                <li className="flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Conversion history exists only in your browser's local storage</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Final Acknowledgment */}
        <motion.section 
          className="final-acknowledgment"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="acknowledgment-card bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 border-2 border-primary/40 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <Scale className="w-20 h-20 mx-auto text-primary mb-8" />
            <h2 className="text-3xl font-bold mb-6">Terms Acknowledgment</h2>
            <p className="text-xl leading-relaxed text-muted-foreground max-w-4xl mx-auto">
              <strong className="text-foreground">By using Zealous Tech's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
            </p>
            <div className="acknowledgment-note bg-card border border-border rounded-xl p-6 mt-8 max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground">
                These Terms are effective as of the "Last Updated" date shown at the top of this page. 
                Your continued use of our Service after any changes constitutes acceptance of the new Terms.
              </p>
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
            Last Updated: {lastUpdated}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 