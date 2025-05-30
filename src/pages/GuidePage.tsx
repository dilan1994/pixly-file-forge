import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  ArrowRight, 
  Upload, 
  Download, 
  Settings, 
  FileImage,
  Zap,
  Shield,
  Clock,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface GuideStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: string;
  tips: string[];
  videoUrl?: string;
}

const guideSteps: GuideStep[] = [
  {
    id: 'upload',
    title: 'Upload Your Images',
    description: 'Start by selecting or dragging your images to the upload area',
    icon: Upload,
    content: 'You can upload images by either clicking the upload area or dragging and dropping files directly. We support JPG, PNG, WebP, HEIC, BMP, GIF, TIFF, ICO, SVG, and PDF formats.',
    tips: [
      'Maximum file size: 10MB per image',
      'You can upload multiple files at once',
      'Drag and drop is the fastest method',
      'HEIC files from iPhone are fully supported'
    ]
  },
  {
    id: 'select-format',
    title: 'Choose Conversion Format',
    description: 'Select the output format using our quick conversion buttons',
    icon: FileImage,
    content: 'Use the horizontal conversion tabs to select your desired output format. Each button shows the conversion direction (e.g., JPG → PNG) and is optimized for different use cases.',
    tips: [
      'PNG for images with transparency',
      'JPG for photos and smaller file sizes',
      'WebP for modern web optimization',
      'HEIC to JPG for iPhone photo sharing'
    ]
  },
  {
    id: 'adjust-settings',
    title: 'Adjust Quality Settings',
    description: 'Fine-tune the output quality and compression settings',
    icon: Settings,
    content: 'Use the quality slider in the header or settings panel to control the output quality. Higher quality means larger file sizes but better image fidelity.',
    tips: [
      '90% quality for professional use',
      '70% quality for web optimization',
      '50% quality for maximum compression',
      'PNG quality affects compression, not visual quality'
    ]
  },
  {
    id: 'convert',
    title: 'Convert Your Images',
    description: 'Start the conversion process and monitor progress',
    icon: Zap,
    content: 'Click the "Convert Files" button to start processing. All conversion happens in your browser for maximum privacy and security.',
    tips: [
      'Conversion happens locally in your browser',
      'No files are uploaded to our servers',
      'You can convert multiple files simultaneously',
      'Progress is shown for each individual file'
    ]
  },
  {
    id: 'download',
    title: 'Download Results',
    description: 'Download individual files or get everything as a ZIP',
    icon: Download,
    content: 'Once conversion is complete, you can download files individually or use the bulk download option to get everything as a ZIP file.',
    tips: [
      'Individual downloads preserve original filenames',
      'ZIP downloads include all converted files',
      'Auto-download can be enabled in settings',
      'Files are automatically organized by format'
    ]
  }
];

const deviceGuides = [
  {
    icon: Monitor,
    title: 'Desktop Guide',
    description: 'Full-featured experience with drag & drop, keyboard shortcuts, and advanced settings.',
    features: ['Drag & drop multiple files', 'Keyboard shortcuts (Ctrl+V to paste)', 'Advanced quality controls', 'Batch processing']
  },
  {
    icon: Tablet,
    title: 'Tablet Guide',
    description: 'Touch-optimized interface with gesture support and mobile-friendly controls.',
    features: ['Touch-friendly buttons', 'Swipe navigation', 'Optimized file picker', 'Responsive design']
  },
  {
    icon: Smartphone,
    title: 'Mobile Guide',
    description: 'Streamlined mobile experience with camera integration and one-tap sharing.',
    features: ['Camera integration', 'One-tap conversion', 'Share directly to apps', 'Offline capability']
  }
];

export const GuidePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
    if (stepIndex < guideSteps.length - 1) {
      setActiveStep(stepIndex + 1);
    }
  };

  const resetTutorial = () => {
    setActiveStep(0);
    setCompletedSteps(new Set());
    setIsPlaying(false);
  };

  const startInteractiveTutorial = () => {
    setIsPlaying(true);
    setActiveStep(0);
  };

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
            User Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to convert your images like a pro with our comprehensive guide and interactive tutorials.
          </p>
        </motion.div>

        {/* Interactive Tutorial Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Interactive Tutorial</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step walkthrough with live demonstrations
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startInteractiveTutorial}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'Pause Tutorial' : 'Start Tutorial'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTutorial}
                className="flex items-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/80 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSteps.size} of {guideSteps.length} completed
              </span>
            </div>
            <div className="w-full bg-accent rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedSteps.size / guideSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Step-by-Step Guide */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Steps Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-semibold mb-6">Tutorial Steps</h3>
            <div className="space-y-3">
              {guideSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                const isCompleted = completedSteps.has(index);
                
                return (
                  <motion.button
                    key={step.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStep(index)}
                    className={`
                      w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 text-left
                      ${isActive 
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg' 
                        : isCompleted
                        ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
                        : 'bg-card border-border hover:bg-accent'
                      }
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${isActive 
                        ? 'bg-primary-foreground/20' 
                        : isCompleted
                        ? 'bg-green-100 dark:bg-green-800'
                        : 'bg-accent'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{step.title}</h4>
                      <p className={`text-sm truncate ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {step.description}
                      </p>
                    </div>
                    
                    <div className="text-sm font-medium">
                      {index + 1}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Step Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {React.createElement(guideSteps[activeStep].icon, { 
                      className: "w-6 h-6 text-primary" 
                    })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{guideSteps[activeStep].title}</h3>
                    <p className="text-muted-foreground">{guideSteps[activeStep].description}</p>
                  </div>
                </div>

                <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
                  <p className="text-lg leading-relaxed">{guideSteps[activeStep].content}</p>
                </div>

                {/* Tips Section */}
                <div className="bg-accent/50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Pro Tips
                  </h4>
                  <ul className="space-y-2">
                    {guideSteps[activeStep].tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleStepComplete(activeStep)}
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    {activeStep === guideSteps.length - 1 ? 'Complete Tutorial' : 'Next Step'}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Device-Specific Guides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Device-Specific Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {deviceGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                  <p className="text-muted-foreground mb-4">{guide.description}</p>
                  <ul className="space-y-2">
                    {guide.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-primary" />
            Quick Reference
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Upload files</span>
                  <kbd className="px-2 py-1 bg-accent rounded text-xs">Ctrl + O</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Paste from clipboard</span>
                  <kbd className="px-2 py-1 bg-accent rounded text-xs">Ctrl + V</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Start conversion</span>
                  <kbd className="px-2 py-1 bg-accent rounded text-xs">Ctrl + Enter</kbd>
                </div>
                <div className="flex justify-between">
                  <span>Clear all files</span>
                  <kbd className="px-2 py-1 bg-accent rounded text-xs">Ctrl + Delete</kbd>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Supported Formats</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  JPG/JPEG
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  PNG
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  WebP
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  HEIC
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  BMP
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  GIF
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  TIFF
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  SVG
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
