
import { useState } from 'react';
import { Play, Upload, Settings, Download, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 1,
    title: 'Choose Conversion Type',
    description: 'Select the format you want to convert from and to using the tabs at the top.',
    icon: Settings,
  },
  {
    id: 2,
    title: 'Upload Your Files',
    description: 'Drag and drop your images or click to browse. You can upload multiple files at once.',
    icon: Upload,
  },
  {
    id: 3,
    title: 'Adjust Settings',
    description: 'Click the Settings button to adjust quality, output format, and other preferences.',
    icon: Settings,
  },
  {
    id: 4,
    title: 'Convert & Download',
    description: 'Click Convert Files to start the process, then download individual files or as a ZIP.',
    icon: Download,
  },
];

export default function GuidePage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            How to Use ImageConverter
          </h1>
          <p className="text-xl text-text/70 max-w-2xl mx-auto">
            Follow these simple steps to convert your images between different formats quickly and easily.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Steps List */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveStep(step.id)}
                className={`
                  p-6 rounded-xl cursor-pointer transition-all duration-300
                  ${activeStep === step.id
                    ? 'bg-primary/10 border-2 border-primary shadow-lg'
                    : 'bg-surface/50 border border-primary/20 hover:bg-surface/70'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    p-3 rounded-lg shrink-0
                    ${activeStep === step.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}
                  `}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-primary">Step {step.id}</span>
                      <ChevronRight className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-text/70">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Area */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-surface/50 rounded-xl p-8 border border-primary/20"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                {React.createElement(steps[activeStep - 1].icon, {
                  className: "w-10 h-10 text-white"
                })}
              </div>
              <h3 className="text-2xl font-bold mb-4">
                {steps[activeStep - 1].title}
              </h3>
              <p className="text-text/70 text-lg mb-8">
                {steps[activeStep - 1].description}
              </p>
              
              {/* Interactive Demo */}
              <div className="bg-background/50 rounded-lg p-6 border-2 border-dashed border-primary/30">
                <Play className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-sm text-text/60">
                  Interactive demo for step {activeStep} would appear here
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-surface/30 rounded-xl p-8 border border-primary/20"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Pro Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Batch Upload</h3>
              <p className="text-sm text-text/70">Select multiple files at once or drag entire folders</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Quality Control</h3>
              <p className="text-sm text-text/70">Adjust quality settings for optimal file size vs quality</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Bulk Download</h3>
              <p className="text-sm text-text/70">Download all converted files as a single ZIP archive</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
