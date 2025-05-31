import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import toast from 'react-hot-toast';
import { 
  Mail, 
  Phone, 
  Clock, 
  HelpCircle, 
  Send, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
  Globe,
  Bug,
  Lightbulb,
  Building,
  MessageSquare,
  User,
  FileText,
  Zap,
  Shield,
  Star,
  ExternalLink,
  Copy,
  Loader2
} from 'lucide-react';

// Form interfaces and types
interface ContactFormData {
  inquiryType: 'technical' | 'bug' | 'feature' | 'business' | 'general' | '';
  name: string;
  email: string;
  subject: string;
  browser: 'chrome' | 'firefox' | 'safari' | 'edge' | 'other' | '';
  device: 'desktop' | 'laptop' | 'tablet' | 'mobile' | '';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  message: string;
  updates: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: 'technical' | 'privacy' | 'features';
}

export const ContactSupportPage: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    inquiryType: '',
    name: '',
    email: '',
    subject: '',
    browser: '',
    device: '',
    priority: 'medium',
    message: '',
    updates: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setLastUpdated(getLastUpdatedDate(0));
    // Auto-detect browser and device
    detectBrowserAndDevice();
  }, []);

  const detectBrowserAndDevice = () => {
    const userAgent = navigator.userAgent;
    let browser: ContactFormData['browser'] = 'other';
    let device: ContactFormData['device'] = 'desktop';

    // Detect browser
    if (userAgent.includes('Chrome')) browser = 'chrome';
    else if (userAgent.includes('Firefox')) browser = 'firefox';
    else if (userAgent.includes('Safari')) browser = 'safari';
    else if (userAgent.includes('Edge')) browser = 'edge';

    // Detect device
    if (/Mobi|Android/i.test(userAgent)) device = 'mobile';
    else if (/Tablet|iPad/i.test(userAgent)) device = 'tablet';
    else if (/Laptop/i.test(userAgent)) device = 'laptop';

    setFormData(prev => ({ ...prev, browser, device }));
  };

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

  // Form options
  const inquiryTypes = [
    { value: 'technical', label: 'Technical Support', icon: <Monitor className="w-4 h-4" /> },
    { value: 'bug', label: 'Bug Report', icon: <Bug className="w-4 h-4" /> },
    { value: 'feature', label: 'Feature Request', icon: <Lightbulb className="w-4 h-4" /> },
    { value: 'business', label: 'Business/Partnership', icon: <Building className="w-4 h-4" /> },
    { value: 'general', label: 'General Question', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  const browsers = [
    { value: 'chrome', label: 'Chrome' },
    { value: 'firefox', label: 'Firefox' },
    { value: 'safari', label: 'Safari' },
    { value: 'edge', label: 'Microsoft Edge' },
    { value: 'other', label: 'Other' }
  ];

  const devices = [
    { value: 'desktop', label: 'Desktop Computer' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'tablet', label: 'Tablet' },
    { value: 'mobile', label: 'Mobile Phone' }
  ];

  const priorities = [
    { value: 'low', label: 'Low - General question', color: 'text-green-600' },
    { value: 'medium', label: 'Medium - Feature not working', color: 'text-yellow-600' },
    { value: 'high', label: 'High - Can\'t use the service', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent - Business critical', color: 'text-red-600' }
  ];

  // FAQ data
  const faqData: FAQItem[] = [
    {
      question: "The image converter isn't loading",
      answer: "Try these steps in order:\n1. Refresh the page (Ctrl+F5 or Cmd+Shift+R)\n2. Clear your browser cache and cookies\n3. Disable browser extensions temporarily\n4. Try an incognito/private browsing window\n5. Update your browser to the latest version",
      category: 'technical'
    },
    {
      question: "My images aren't converting properly",
      answer: "Check these common causes:\n• File size too large: Try smaller images or free up device memory\n• Unsupported format: Verify your input format is supported\n• Browser compatibility: Update to a modern browser version\n• Device memory: Close other tabs and applications",
      category: 'technical'
    },
    {
      question: "Conversions are very slow",
      answer: "Processing speed depends on:\n• Your device's processing power\n• Available RAM and system resources\n• Image size and complexity\n• Browser performance optimization",
      category: 'technical'
    },
    {
      question: "Are my images really processed locally?",
      answer: "Yes, absolutely. Our technology runs entirely in your browser - no files are ever uploaded to our servers. You can even disconnect from the internet after loading our page and conversions will still work.",
      category: 'privacy'
    },
    {
      question: "Can you recover images I've converted?",
      answer: "No, it's technically impossible. Since your files never reach our servers, we have no way to access or recover any images you've processed.",
      category: 'privacy'
    },
    {
      question: "What image formats do you support?",
      answer: "We support all major formats:\n• Input: JPG, PNG, GIF, WebP, BMP, TIFF, SVG\n• Output: JPG, PNG, GIF, WebP, BMP\n• Coming soon: AVIF, HEIC support",
      category: 'features'
    },
    {
      question: "Is there a limit to file size or number of conversions?",
      answer: "Limits depend on your device capabilities:\n• File size: Limited by your device's available memory\n• Batch processing: Process multiple files simultaneously\n• Daily use: No artificial limits imposed by us",
      category: 'features'
    }
  ];

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create email body
      const emailBody = `
Inquiry Type: ${inquiryTypes.find(t => t.value === formData.inquiryType)?.label}
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}
Browser: ${browsers.find(b => b.value === formData.browser)?.label}
Device: ${devices.find(d => d.value === formData.device)?.label}
Priority: ${priorities.find(p => p.value === formData.priority)?.label}
Updates: ${formData.updates ? 'Yes' : 'No'}

Message:
${formData.message}

---
Sent from Pixly Forge Contact Form
      `.trim();

      const mailtoUrl = `mailto:support@zealoustech.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      window.open(mailtoUrl);
      
      toast.success('Email client opened! Please send the email to complete your request.');
      
      // Reset form
      setFormData({
        inquiryType: '',
        name: '',
        email: '',
        subject: '',
        browser: formData.browser, // Keep detected browser
        device: formData.device,   // Keep detected device
        priority: 'medium',
        message: '',
        updates: false
      });
      setErrors({});
      
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof ContactFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Copy email to clipboard
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success('Email copied to clipboard!');
  };

  return (
    <div className="contact-support-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="contact-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.section 
          className="contact-hero text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="contact-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Contact Support
            </h1>
            <p className="contact-subtitle text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              Get the Help You Need
            </p>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
              <HelpCircle className="w-4 h-4" />
              <span>Updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Support Overview */}
        <motion.section 
          className="support-overview mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="overview-card bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-12"
            variants={itemVariants}
          >
            <div className="overview-icon text-center mb-6">
              <HelpCircle className="w-16 h-16 mx-auto text-primary" />
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto">
              Our support team is here to help you get the most out of <strong className="text-foreground">Zealous Tech's</strong> image conversion tools. Whether you have technical questions, need troubleshooting assistance, or want to share feedback, we're ready to assist.
            </p>
          </motion.div>
        </motion.section>

        {/* Quick Support Options */}
        <motion.section 
          className="quick-support mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Quick Support Options
          </motion.h2>
          
          <motion.div className="support-options-grid grid grid-cols-1 md:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Instant Help */}
            <div className="instant-help bg-green-500/5 border-2 border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
                <Zap className="w-6 h-6" />
                Instant Help
              </h3>
              <div className="space-y-4">
                <div className="help-item flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">FAQ Section</span>
                    <span className="text-muted-foreground"> - Check our comprehensive FAQ below for immediate answers</span>
                  </div>
                </div>
                <div className="help-item flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Browser Troubleshooting</span>
                    <span className="text-muted-foreground"> - Try our step-by-step browser compatibility guide</span>
                  </div>
                </div>
                <div className="help-item flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Video Tutorials</span>
                    <span className="text-muted-foreground"> - Watch quick how-to videos for common tasks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Support */}
            <div className="direct-support bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Mail className="w-6 h-6" />
                Direct Support
              </h3>
              <div className="space-y-4">
                <div className="support-item flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Email Response Time:</span>
                    <span className="text-muted-foreground"> 24-48 hours</span>
                  </div>
                </div>
                <div className="support-item flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Business Hours:</span>
                    <span className="text-muted-foreground"> Monday-Friday, 9 AM - 6 PM (EST)</span>
                  </div>
                </div>
                <div className="support-item flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Emergency Issues:</span>
                    <span className="text-muted-foreground"> We monitor critical problems outside business hours</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Contact Form */}
        <motion.section 
          className="contact-form mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Contact Form
          </motion.h2>
          
          <motion.div 
            className="form-container bg-card border border-border rounded-2xl p-8 shadow-lg max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <p className="text-center text-muted-foreground mb-8">
              Choose your inquiry type and we'll get back to you quickly:
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inquiry Type */}
              <div className="form-group">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Inquiry Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleInputChange('inquiryType', type.value)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                        formData.inquiryType === type.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {type.icon}
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
                {errors.inquiryType && (
                  <p className="text-red-500 text-sm mt-2">{errors.inquiryType}</p>
                )}
              </div>

              {/* Personal Information */}
              <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground transition-colors ${
                      errors.name ? 'border-red-500' : 'border-border focus:border-primary'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground transition-colors ${
                      errors.email ? 'border-red-500' : 'border-border focus:border-primary'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-border focus:border-primary'
                  }`}
                  placeholder="Brief description of your issue or question"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Technical Information */}
              <div className="form-row grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="form-group">
                  <label htmlFor="browser" className="block text-sm font-medium text-foreground mb-2">
                    Browser
                  </label>
                  <select
                    id="browser"
                    value={formData.browser}
                    onChange={(e) => handleInputChange('browser', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary bg-background text-foreground"
                  >
                    <option value="">Select browser</option>
                    {browsers.map((browser) => (
                      <option key={browser.value} value={browser.value}>
                        {browser.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="device" className="block text-sm font-medium text-foreground mb-2">
                    Device Type
                  </label>
                  <select
                    id="device"
                    value={formData.device}
                    onChange={(e) => handleInputChange('device', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary bg-background text-foreground"
                  >
                    <option value="">Select device</option>
                    {devices.map((device) => (
                      <option key={device.value} value={device.value}>
                        {device.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
                    Priority Level
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary bg-background text-foreground"
                  >
                    {priorities.map((priority) => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-background text-foreground transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-border focus:border-primary'
                  }`}
                  placeholder="Please describe your issue or question in detail..."
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                  <p className="text-sm text-muted-foreground ml-auto">
                    {formData.message.length}/1000 characters
                  </p>
                </div>
              </div>

              {/* Updates Checkbox */}
              <div className="form-group">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.updates}
                    onChange={(e) => handleInputChange('updates', e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    I would like to receive updates about new features and improvements to Zealous Tech's tools
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-submit pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-3"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Preparing Email...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          className="faq-section mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div className="faq-container max-w-4xl mx-auto" variants={itemVariants}>
            {/* Technical Issues */}
            <div className="faq-category mb-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-primary">
                <Monitor className="w-6 h-6" />
                Technical Issues
              </h3>
              <div className="space-y-4">
                {faqData.filter(item => item.category === 'technical').map((item, index) => (
                  <div key={index} className="faq-item bg-card border border-border rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
                    >
                      <span className="font-medium text-foreground">{item.question}</span>
                      {expandedFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-muted-foreground whitespace-pre-line">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="faq-category mb-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-secondary">
                <Shield className="w-6 h-6" />
                Privacy & Security
              </h3>
              <div className="space-y-4">
                {faqData.filter(item => item.category === 'privacy').map((item, index) => {
                  const faqIndex = index + 10; // Offset to avoid conflicts
                  return (
                    <div key={faqIndex} className="faq-item bg-card border border-border rounded-lg">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faqIndex ? null : faqIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
                      >
                        <span className="font-medium text-foreground">{item.question}</span>
                        {expandedFAQ === faqIndex ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFAQ === faqIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-muted-foreground whitespace-pre-line">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Service Features */}
            <div className="faq-category">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-accent">
                <Star className="w-6 h-6" />
                Service Features
              </h3>
              <div className="space-y-4">
                {faqData.filter(item => item.category === 'features').map((item, index) => {
                  const faqIndex = index + 20; // Offset to avoid conflicts
                  return (
                    <div key={faqIndex} className="faq-item bg-card border border-border rounded-lg">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faqIndex ? null : faqIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/50 transition-colors"
                      >
                        <span className="font-medium text-foreground">{item.question}</span>
                        {expandedFAQ === faqIndex ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFAQ === faqIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-muted-foreground whitespace-pre-line">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Alternative Contact Methods */}
        <motion.section 
          className="alternative-contact mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Alternative Contact Methods
          </motion.h2>
          
          <motion.div className="contact-methods-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Direct Email Support */}
            <div className="email-support bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                Direct Email Support
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'General Support', email: 'support@zealoustech.com' },
                  { label: 'Technical Issues', email: 'tech@zealoustech.com' },
                  { label: 'Bug Reports', email: 'bugs@zealoustech.com' },
                  { label: 'Feature Requests', email: 'features@zealoustech.com' },
                  { label: 'Business Inquiries', email: 'business@zealoustech.com' }
                ].map((contact, index) => (
                  <div key={index} className="contact-item flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                    <div>
                      <span className="font-medium text-foreground">{contact.label}:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {contact.email}
                      </a>
                      <button
                        onClick={() => copyEmail(contact.email)}
                        className="p-1 hover:bg-accent rounded transition-colors"
                        title="Copy email"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Times */}
            <div className="response-times bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-secondary" />
                Response Times
              </h3>
              <div className="space-y-4">
                {[
                  { type: 'General Questions', time: '24-48 hours', color: 'text-green-600' },
                  { type: 'Technical Issues', time: 'Same business day for urgent issues', color: 'text-yellow-600' },
                  { type: 'Bug Reports', time: '1-3 business days with status updates', color: 'text-orange-600' },
                  { type: 'Business Inquiries', time: 'Same day during business hours', color: 'text-blue-600' }
                ].map((response, index) => (
                  <div key={index} className="response-item flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${response.color}`} />
                    <div>
                      <span className="font-semibold text-foreground">{response.type}:</span>
                      <span className="text-muted-foreground"> {response.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Before You Contact Us */}
        <motion.section 
          className="before-contact mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Before You Contact Us
          </motion.h2>
          
          <motion.div className="before-contact-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* For Technical Issues */}
            <div className="technical-info bg-red-500/5 border-2 border-red-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-red-600 dark:text-red-400">
                <Bug className="w-6 h-6" />
                For Technical Issues, Please Include:
              </h3>
              <ul className="space-y-3">
                {[
                  'Browser type and version (Chrome 121, Firefox 122, etc.)',
                  'Operating system (Windows 11, macOS 14, etc.)',
                  'Device type (desktop, laptop, mobile)',
                  'Steps to reproduce the issue',
                  'Error messages if any appear',
                  'File types you\'re trying to convert'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Feature Requests */}
            <div className="feature-info bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Lightbulb className="w-6 h-6" />
                For Feature Requests:
              </h3>
              <ul className="space-y-3">
                {[
                  'Describe the feature you\'d like to see',
                  'Explain the use case - how would it help you?',
                  'Priority level - how important is this to your workflow?',
                  'Alternative solutions you\'ve tried'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* Final Message */}
        <motion.section 
          className="final-message"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="message-card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <HelpCircle className="w-20 h-20 mx-auto text-primary mb-8" />
            <h2 className="text-3xl font-bold mb-6">We're here to help!</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our goal is to ensure you have the best possible experience with Zealous Tech's privacy-first conversion tools.
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
            Page Updated: {lastUpdated}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSupportPage; 