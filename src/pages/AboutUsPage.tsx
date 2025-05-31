import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { 
  Heart, 
  Zap, 
  Shield, 
  Star, 
  Rocket, 
  Users, 
  Target, 
  Award,
  Mail,
  ArrowRight
} from 'lucide-react';

export const AboutUsPage: React.FC = () => {
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
    <div className="about-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="about-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.section 
          className="about-hero text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="about-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              About Zealous Tech
            </h1>
            <p className="about-subtitle text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              Where Innovation Meets Privacy
            </p>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
              <Star className="w-4 h-4" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="about-mission mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-8" variants={itemVariants}>
              Our Mission
            </motion.h2>
            <motion.div 
              className="mission-content bg-card border border-border rounded-2xl p-8 shadow-lg"
              variants={itemVariants}
            >
              <p className="mission-text text-lg leading-relaxed text-muted-foreground">
                At <strong className="text-foreground">Zealous Tech</strong>, we don't just build tools - we craft digital experiences that put users first. 
                Our mission is simple yet powerful: create technology solutions that are genuinely free, completely private, 
                and incredibly useful. We believe the best software should feel invisible while making your life dramatically easier.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section 
          className="about-vision mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-8" variants={itemVariants}>
              Our Vision: Technology That Serves You
            </motion.h2>
            <motion.div className="vision-content space-y-6" variants={itemVariants}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                In a world where digital tools often come with hidden costs, privacy compromises, and unnecessary complexity, 
                <strong className="text-foreground"> Zealous Tech</strong> stands apart. We're passionate about developing web-based solutions that actually 
                solve real problems without creating new ones.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Every product we build starts with a fundamental question: <em className="text-foreground">"How can we make this work better for the person using it?"</em>
              </p>
              
              <motion.div 
                className="highlight-box flex flex-col md:flex-row gap-6 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 mt-8"
                variants={itemVariants}
              >
                <div className="highlight-icon text-6xl">🚀</div>
                <div className="highlight-content flex-1">
                  <h3 className="text-xl font-semibold mb-4 text-primary">Our Flagship Innovation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our image converter represents everything we stand for - cutting-edge browser technology that processes 
                    your files locally, ensuring your privacy while delivering professional-grade results. No servers touching 
                    your data, no accounts required, no hidden fees. Just pure functionality that works exactly when and how you need it.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Partner Section */}
        <motion.section 
          className="about-partner mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              Why Partner With Zealous Tech?
            </motion.h2>
            <motion.div className="partner-grid grid grid-cols-1 md:grid-cols-3 gap-8" variants={itemVariants}>
              
              <motion.div 
                className="partner-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
                whileHover={{ scale: 1.02 }}
              >
                <div className="partner-icon text-4xl mb-4">
                  <Shield className="w-12 h-12 mx-auto text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Privacy-First Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're pioneers in client-side processing technology, developing tools that run entirely in users' browsers. 
                  This isn't just a technical choice - it's a business advantage. Companies partnering with us gain access 
                  to solutions that eliminate data liability risks while providing superior user experiences.
                </p>
              </motion.div>
              
              <motion.div 
                className="partner-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
                whileHover={{ scale: 1.02 }}
              >
                <div className="partner-icon text-4xl mb-4">
                  <Users className="w-12 h-12 mx-auto text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">User-Centric Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our products consistently achieve high user satisfaction because we design from the ground up with real 
                  user needs in mind. We understand that the best marketing comes from building tools people actually love 
                  to use and recommend to others.
                </p>
              </motion.div>
              
              <motion.div 
                className="partner-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
                whileHover={{ scale: 1.02 }}
              >
                <div className="partner-icon text-4xl mb-4">
                  <Zap className="w-12 h-12 mx-auto text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Cutting-Edge Technology</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Zealous Tech</strong> stays ahead of the curve by leveraging advanced web technologies like WebAssembly, 
                  Progressive Web Apps, and modern JavaScript frameworks. We turn complex technical capabilities into simple, 
                  elegant user experiences that work seamlessly across all devices and platforms.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section 
          className="about-services mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              Services We Offer
            </motion.h2>
            <motion.div className="services-list space-y-8" variants={itemVariants}>
              
              <div className="service-item bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Target className="w-6 h-6 text-primary" />
                  Custom Tool Development
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Want a privacy-first solution for your specific industry? We specialize in building browser-based tools 
                  that eliminate server-side data handling while maintaining professional functionality. From document 
                  processors to media converters, we can create solutions that protect your users' privacy by design.
                </p>
              </div>
              
              <div className="service-item bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Award className="w-6 h-6 text-secondary" />
                  White-Label Solutions
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  License our privacy-first technology for your own brand. Our modular architecture allows you to offer 
                  powerful conversion tools under your own name while benefiting from our advanced client-side processing engine.
                </p>
              </div>
              
              <div className="service-item bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-accent" />
                  Consulting & Strategy
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Leverage our expertise in privacy-focused development. We help businesses transition from server-dependent 
                  tools to client-side solutions, reducing liability while improving performance and user trust.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Innovation Pipeline */}
        <motion.section 
          className="about-innovation mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="content-wrapper">
            <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
              Innovation Pipeline: What's Next
            </motion.h2>
            <motion.div className="innovation-grid grid grid-cols-1 md:grid-cols-3 gap-8" variants={itemVariants}>
              
              <motion.div 
                className="innovation-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="innovation-icon text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-4">AI-Powered Design Tools</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're developing browser-based AI tools that process everything locally - imagine powerful design assistance 
                  without your creative work ever leaving your device. Perfect for agencies and freelancers who need cutting-edge 
                  capabilities with complete confidentiality.
                </p>
              </motion.div>
              
              <motion.div 
                className="innovation-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="innovation-icon text-4xl mb-4">📄</div>
                <h3 className="text-xl font-semibold mb-4">Document Processing Suite</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building on our image converter success, we're expanding into comprehensive document tools - PDF manipulation, 
                  format conversion, and editing capabilities that work entirely in your browser.
                </p>
              </motion.div>
              
              <motion.div 
                className="innovation-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="innovation-icon text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-4">Creative Media Platform</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A complete suite of media tools for content creators - video editing, audio processing, and graphic design 
                  capabilities that prioritize speed, privacy, and professional results.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section 
          className="about-cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="content-wrapper bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <div className="cta-content">
              <h2 className="text-3xl font-bold mb-6">Ready to Build Something Amazing?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Whether you're looking to integrate our existing tools, develop custom solutions, or explore strategic partnerships, 
                <strong className="text-foreground"> Zealous Tech</strong> brings the technical expertise and user-first philosophy to make your vision reality.
              </p>
              <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  className="cta-primary bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold flex items-center gap-2 justify-center transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                  Contact Us Today
                </motion.button>
                <motion.button 
                  className="cta-secondary bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-lg font-semibold flex items-center gap-2 justify-center transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-5 h-5" />
                  View Our Tools
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUsPage; 