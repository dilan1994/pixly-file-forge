import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getLastUpdatedDate } from '@/utils/dateFormatters';
import { 
  Briefcase, 
  Heart, 
  Zap, 
  Shield, 
  Star, 
  Rocket, 
  Users, 
  Target, 
  Award,
  Mail,
  ArrowRight,
  Code,
  Globe,
  Monitor,
  Palette,
  TrendingUp,
  Coffee,
  Clock,
  MapPin,
  CheckCircle,
  Lightbulb,
  Building,
  GraduationCap,
  DollarSign,
  Calendar
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(getLastUpdatedDate(0)); // Current date for careers page
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

  const mindsetItems = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy advocates",
      description: "who understand why client-side processing matters"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation enthusiasts",
      description: "excited about pushing browser capabilities to their limits"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User-first thinkers",
      description: "who design from the user's perspective, not the company's"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality craftspeople",
      description: "who take pride in building tools that just work"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth-minded professionals",
      description: "ready to help shape the future of web applications"
    }
  ];

  const technologies = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Modern JavaScript",
      description: "and WebAssembly for high-performance browser applications"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Progressive Web Apps",
      description: "that work seamlessly across all devices"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Advanced browser APIs",
      description: "for file processing, offline functionality, and more"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Client-side AI/ML",
      description: "for intelligent features without privacy compromise"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Responsive design",
      description: "that delivers consistent experiences everywhere"
    }
  ];

  const cultureValues = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Flexible working arrangements",
      description: "we care about output, not office hours"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative environment",
      description: "small team where everyone's voice matters"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Continuous learning",
      description: "we invest in your professional development"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Work-life balance",
      description: "sustainable pace that prevents burnout"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Direct impact",
      description: "see your work immediately improve users' experiences"
    }
  ];

  const innovationValues = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Experimental mindset",
      description: "we try new approaches and learn from failures"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Technical freedom",
      description: "choose the best tools for the job"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "User feedback driven",
      description: "our users guide our development priorities"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Open communication",
      description: "transparent about challenges and opportunities"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Growth opportunities",
      description: "expand your skills as we expand our service offerings"
    }
  ];

  const jobCategories = [
    {
      title: "Engineering Positions",
      icon: <Code className="w-8 h-8" />,
      roles: [
        "Frontend Developer - React/JavaScript specialists with WebAssembly experience",
        "Browser Technology Engineer - Expert in advanced browser APIs and client-side processing",
        "DevOps Engineer - CI/CD and infrastructure for privacy-first applications",
        "Quality Assurance Engineer - Testing across browsers, devices, and edge cases"
      ]
    },
    {
      title: "Product & Design",
      icon: <Palette className="w-8 h-8" />,
      roles: [
        "UX/UI Designer - Creating intuitive interfaces for complex functionality",
        "Product Manager - Balancing user needs with technical possibilities",
        "Technical Writer - Explaining complex privacy concepts in user-friendly ways"
      ]
    },
    {
      title: "Business Development",
      icon: <Building className="w-8 h-8" />,
      roles: [
        "Partnership Manager - Building relationships with privacy-conscious organizations",
        "Marketing Specialist - Communicating our privacy-first value proposition",
        "Customer Success - Helping enterprise clients implement our solutions"
      ]
    }
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Competitive salary",
      description: "based on experience and impact"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Equity participation",
      description: "grow with the company"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Health benefits",
      description: "comprehensive coverage"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Professional development",
      description: "budget for courses, conferences, and tools"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Flexible PTO",
      description: "take the time you need to recharge"
    }
  ];

  return (
    <div className="careers-page min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="careers-container max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.section 
          className="careers-hero text-center py-16 mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="careers-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Careers at Zealous Tech
            </h1>
            <p className="careers-subtitle text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              Building the Future of Privacy-First Technology
            </p>
            <div className="last-updated inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium border border-accent/30">
              <Briefcase className="w-4 h-4" />
              <span>Updated: {lastUpdated}</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Mission Statement */}
        <motion.section 
          className="careers-mission mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="mission-card bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-12"
            variants={itemVariants}
          >
            <div className="mission-icon text-center mb-6">
              <Rocket className="w-16 h-16 mx-auto text-primary" />
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-4xl mx-auto">
              At <strong className="text-foreground">Zealous Tech</strong>, we're not just creating tools - we're pioneering a new approach to web applications that puts user privacy first. If you're passionate about developing innovative solutions that actually make people's digital lives better, we want to hear from you.
            </p>
          </motion.div>
        </motion.section>

        {/* Our Mission */}
        <motion.section 
          className="our-mission mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Our Mission
          </motion.h2>
          <motion.div 
            className="mission-content bg-card border border-border rounded-2xl p-8 shadow-lg"
            variants={itemVariants}
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              We believe technology should serve people, not exploit them. Our team is dedicated to building client-side processing tools that eliminate privacy concerns while delivering professional-grade functionality. When you join Zealous Tech, you're joining a mission to prove that powerful software doesn't have to compromise user privacy.
            </p>
          </motion.div>
        </motion.section>

        {/* What We're Looking For */}
        <motion.section 
          className="looking-for mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            What We're Looking For
          </motion.h2>
          
          <motion.div className="looking-for-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Zealous Tech Mindset */}
            <div className="mindset-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                The Zealous Tech Mindset
              </h3>
              <div className="space-y-4">
                {mindsetItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-primary mt-0.5">{item.icon}</div>
                    <div>
                      <span className="font-semibold text-foreground">{item.title}</span>
                      <span className="text-muted-foreground"> {item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Excellence */}
            <div className="technical-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-secondary" />
                Technical Excellence
              </h3>
              <p className="text-muted-foreground mb-4">
                We work with cutting-edge technologies including:
              </p>
              <div className="space-y-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-secondary mt-0.5">{tech.icon}</div>
                    <div>
                      <span className="font-semibold text-foreground">{tech.title}</span>
                      <span className="text-muted-foreground"> {tech.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Our Culture */}
        <motion.section 
          className="culture mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Our Culture
          </motion.h2>
          
          <motion.div className="culture-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Remote-First */}
            <div className="culture-card bg-green-500/5 border-2 border-green-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-600 dark:text-green-400">
                <MapPin className="w-6 h-6" />
                Remote-First, Results-Focused
              </h3>
              <div className="space-y-4">
                {cultureValues.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-green-500 mt-0.5">{value.icon}</div>
                    <div>
                      <span className="font-semibold text-foreground">{value.title}</span>
                      <span className="text-muted-foreground"> - {value.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Innovation Environment */}
            <div className="innovation-card bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <Lightbulb className="w-6 h-6" />
                Innovation Environment
              </h3>
              <div className="space-y-4">
                {innovationValues.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-blue-500 mt-0.5">{value.icon}</div>
                    <div>
                      <span className="font-semibold text-foreground">{value.title}</span>
                      <span className="text-muted-foreground"> - {value.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Potential Opportunities */}
        <motion.section 
          className="opportunities mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Potential Opportunities
          </motion.h2>
          
          <motion.div 
            className="opportunities-intro bg-yellow-500/5 border-2 border-yellow-500/20 rounded-xl p-8 mb-8"
            variants={itemVariants}
          >
            <p className="text-lg text-muted-foreground text-center">
              While we don't have specific openings at the moment, we're always interested in connecting with talented individuals who share our vision. The types of roles we may post in the future include:
            </p>
          </motion.div>

          <motion.div className="job-categories space-y-8" variants={itemVariants}>
            {jobCategories.map((category, index) => (
              <div key={index} className="category-card bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <div className="text-primary">{category.icon}</div>
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.roles.map((role, roleIndex) => (
                    <li key={roleIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Why Join Zealous Tech */}
        <motion.section 
          className="why-join mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Why Join Zealous Tech?
          </motion.h2>
          
          <motion.div className="why-join-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={itemVariants}>
            <div className="reason-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <Heart className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="font-semibold mb-2">Meaningful Work</h3>
              <p className="text-sm text-muted-foreground">Your code directly protects user privacy while solving real problems. Every feature you build makes the web a little bit safer and more user-friendly.</p>
            </div>
            
            <div className="reason-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <Rocket className="w-12 h-12 mx-auto text-secondary mb-4" />
              <h3 className="font-semibold mb-2">Technical Growth</h3>
              <p className="text-sm text-muted-foreground">Work with the latest browser technologies and help define best practices for client-side processing. You'll be at the forefront of a major shift in how web applications handle sensitive data.</p>
            </div>
            
            <div className="reason-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <Target className="w-12 h-12 mx-auto text-accent mb-4" />
              <h3 className="font-semibold mb-2">Career Impact</h3>
              <p className="text-sm text-muted-foreground">Join early and help shape our company culture, technical direction, and product roadmap. Your decisions today will influence how thousands of users interact with our tools.</p>
            </div>
            
            <div className="reason-card bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <Award className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="font-semibold mb-2">Competitive Benefits</h3>
              <p className="text-sm text-muted-foreground">When we do hire, we'll offer comprehensive benefits including competitive salary, equity participation, health coverage, and professional development support.</p>
            </div>
          </motion.div>

          {/* Benefits Details */}
          <motion.div 
            className="benefits-details bg-card border border-border rounded-xl p-8 mt-8"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold mb-6 text-center">When we do hire, we'll offer:</h3>
            <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item flex items-start gap-3">
                  <div className="text-primary mt-0.5">{benefit.icon}</div>
                  <div>
                    <span className="font-semibold text-foreground">{benefit.title}</span>
                    <span className="text-muted-foreground"> - {benefit.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Stay Connected */}
        <motion.section 
          className="stay-connected mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Stay Connected
          </motion.h2>
          
          <motion.div className="connected-grid grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
            {/* Get Notified */}
            <div className="notification-card bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                Get Notified About Opportunities
              </h3>
              <p className="text-muted-foreground mb-6">
                Even without current openings, we'd love to connect with talented people who are excited about privacy-first technology.
              </p>
              
              <div className="contact-info bg-card border border-border rounded-lg p-6 mb-6">
                <p className="font-semibold mb-2">Send us your information at:</p>
                <a href="mailto:careers@zealoustech.com" className="text-primary font-medium hover:underline text-lg">
                  careers@zealoustech.com
                </a>
              </div>
              
              <div className="include-info">
                <p className="font-semibold mb-3">Include:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Your resume or portfolio
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    A brief note about what excites you about our mission
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Specific areas where you'd like to contribute
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Links to any relevant projects or work
                  </li>
                </ul>
              </div>
            </div>

            {/* Follow Our Growth */}
            <div className="growth-card bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-secondary" />
                Follow Our Growth
              </h3>
              <div className="space-y-4">
                <div className="follow-item flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Check this page regularly</span>
                    <span className="text-muted-foreground"> - we'll post all opportunities here first</span>
                  </div>
                </div>
                <div className="follow-item flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Connect on LinkedIn</span>
                    <span className="text-muted-foreground"> - follow Zealous Tech for company updates</span>
                  </div>
                </div>
                <div className="follow-item flex items-start gap-3">
                  <Code className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground">Try our tools</span>
                    <span className="text-muted-foreground"> - the best way to understand our vision is to use what we build</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Current Status */}
        <motion.section 
          className="current-status mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Current Status
          </motion.h2>
          
          <motion.div 
            className="status-card bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-8"
            variants={itemVariants}
          >
            <div className="status-content text-center">
              <Calendar className="w-16 h-16 mx-auto text-blue-500 mb-6" />
              <h3 className="text-xl font-semibold mb-4">As of January 2025:</h3>
              <p className="text-lg text-muted-foreground mb-6">
                We don't have any immediate openings, but we're growing steadily. Based on user adoption and feature requests, we expect to have exciting opportunities throughout 2025.
              </p>
              
              <div className="future-posts bg-card border border-border rounded-lg p-6">
                <h4 className="font-semibold mb-3">When we do post positions, they'll appear right here on this page with full details about:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Specific role requirements and responsibilities</li>
                  <li>• Application process and timeline</li>
                  <li>• Team structure and reporting relationships</li>
                  <li>• Detailed benefits and compensation information</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Questions Section */}
        <motion.section 
          className="questions mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-3xl font-bold text-center mb-12" variants={itemVariants}>
            Questions About Working Here?
          </motion.h2>
          
          <motion.div 
            className="questions-card bg-gradient-to-r from-accent/20 via-primary/20 to-secondary/20 border-2 border-primary/40 rounded-2xl p-12 text-center"
            variants={itemVariants}
          >
            <Mail className="w-16 h-16 mx-auto text-primary mb-6" />
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Curious about our technology stack, company culture, or future plans? We're always happy to chat with people who might be a good fit for our team.
            </p>
            
            <div className="contact-cta">
              <p className="font-semibold mb-4">Reach out to:</p>
              <motion.a 
                href="mailto:careers@zealoustech.com"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                careers@zealoustech.com
              </motion.a>
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
            <Rocket className="w-20 h-20 mx-auto text-primary mb-8" />
            <h2 className="text-3xl font-bold mb-6">Join us in building technology that truly serves users.</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The future of privacy-first web applications starts here.
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

export default CareersPage; 