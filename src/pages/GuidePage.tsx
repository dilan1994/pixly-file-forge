
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Upload, Settings, CheckCircle, ArrowRight } from 'lucide-react';

const GuidePage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Upload Your Images",
      description: "Drag and drop your images or click to browse. Supports JPG, PNG, WebP, HEIC, and more.",
      icon: Upload,
      details: [
        "Support for multiple file formats",
        "Drag and drop interface",
        "Batch upload capability",
        "File size validation"
      ]
    },
    {
      title: "Choose Output Format",
      description: "Select your desired output format using the conversion tabs at the top.",
      icon: Settings,
      details: [
        "Multiple conversion options",
        "Quality settings",
        "Format-specific options",
        "Preview before conversion"
      ]
    },
    {
      title: "Convert & Download",
      description: "Click convert to process your images and download individually or as a ZIP file.",
      icon: Download,
      details: [
        "Real-time progress tracking",
        "Individual file downloads",
        "Bulk ZIP downloads",
        "Error handling and recovery"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            How to Use Image Converter
          </h1>
          <p className="text-xl text-text/70 max-w-2xl mx-auto">
            Learn how to convert your images quickly and efficiently with our step-by-step guide.
          </p>
        </motion.div>

        {/* Interactive Steps */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Step Navigation */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  activeStep === index
                    ? 'bg-primary/10 border-2 border-primary/30'
                    : 'bg-surface/50 border border-primary/20 hover:bg-primary/5'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    activeStep === index ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text">
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className="text-text/60 text-sm mt-1">
                      {step.description}
                    </p>
                  </div>
                  {activeStep === index && (
                    <ArrowRight className="w-5 h-5 text-primary" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step Details */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface/50 backdrop-blur-md p-8 rounded-lg border border-primary/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                {React.createElement(steps[activeStep].icon, { className: "w-8 h-8 text-white" })}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text">
                  {steps[activeStep].title}
                </h2>
                <p className="text-text/70">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {steps[activeStep].details.map((detail, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-text/80">{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Video Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface/50 backdrop-blur-md p-8 rounded-lg border border-primary/20 mb-12"
        >
          <h2 className="text-2xl font-bold text-text mb-4">Video Tutorial</h2>
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-text/70">Video tutorial coming soon</p>
            </div>
          </div>
        </motion.div>

        {/* Tips & Tricks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="bg-surface/50 backdrop-blur-md p-6 rounded-lg border border-primary/20">
            <h3 className="text-xl font-semibold text-text mb-3">💡 Pro Tips</h3>
            <ul className="space-y-2 text-text/70">
              <li>• Use higher quality settings for print images</li>
              <li>• WebP format offers the best compression</li>
              <li>• Convert HEIC files for better compatibility</li>
              <li>• Batch convert multiple files to save time</li>
            </ul>
          </div>

          <div className="bg-surface/50 backdrop-blur-md p-6 rounded-lg border border-primary/20">
            <h3 className="text-xl font-semibold text-text mb-3">⚡ Quick Actions</h3>
            <ul className="space-y-2 text-text/70">
              <li>• Drag files directly from your desktop</li>
              <li>• Use keyboard shortcuts for faster workflow</li>
              <li>• Set default preferences in the footer</li>
              <li>• Download as ZIP for bulk conversions</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GuidePage;
