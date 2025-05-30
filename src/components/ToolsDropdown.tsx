import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'converter' | 'compressor' | 'utility' | 'creative';
  route: string;
  features: string[];
}

const freeTools: Tool[] = [
  // File Converters
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert between JPG, PNG, WebP, HEIC, BMP, GIF formats',
    icon: '🖼️',
    category: 'converter',
    route: '/',
    features: ['12+ formats', 'Batch processing', 'Quality control']
  },
  {
    id: 'pdf-converter',
    name: 'PDF Converter',
    description: 'Convert PDF to images and images to PDF',
    icon: '📄',
    category: 'converter',
    route: '/tools/pdf-converter',
    features: ['PDF to JPG/PNG', 'Multiple pages', 'Custom DPI']
  },
  {
    id: 'archive-tool',
    name: 'Archive Tool',
    description: 'Create ZIP files and extract archives',
    icon: '📦',
    category: 'converter',
    route: '/tools/archive',
    features: ['Create ZIP', 'Extract files', 'Folder support']
  },
  {
    id: 'vector-converter',
    name: 'Vector Converter',
    description: 'Convert SVG to PNG, JPG and other raster formats',
    icon: '📐',
    category: 'converter',
    route: '/tools/vector-converter',
    features: ['SVG to raster', 'Custom sizes', 'Transparency']
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between measurement units',
    icon: '⚖️',
    category: 'converter',
    route: '/tools/unit-converter',
    features: ['Length, Weight, Temperature', '100+ units', 'Real-time']
  },
  {
    id: 'currency-converter',
    name: 'Currency Converter',
    description: 'Convert between world currencies',
    icon: '💱',
    category: 'converter',
    route: '/tools/currency-converter',
    features: ['180+ currencies', 'Live rates', 'Historical data']
  },
  
  // File Compressors
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce image file sizes without quality loss',
    icon: '🗜️',
    category: 'compressor',
    route: '/tools/image-compressor',
    features: ['Lossless compression', 'Batch processing', 'Preview']
  },
  {
    id: 'gif-compressor',
    name: 'GIF Optimizer',
    description: 'Optimize GIF animations for web',
    icon: '🎞️',
    category: 'compressor',
    route: '/tools/gif-optimizer',
    features: ['Frame optimization', 'Color reduction', 'Size preview']
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Reduce PDF file sizes',
    icon: '📑',
    category: 'compressor',
    route: '/tools/pdf-compressor',
    features: ['Image compression', 'Quality control', 'Metadata removal']
  },
  
  // Utility Tools
  {
    id: 'ocr-tool',
    name: 'OCR Text Extractor',
    description: 'Extract text from images and PDFs',
    icon: '📝',
    category: 'utility',
    route: '/tools/ocr',
    features: ['100+ languages', 'Handwriting support', 'Editable output']
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Create QR codes for text, URLs, WiFi',
    icon: '📱',
    category: 'utility',
    route: '/tools/qr-generator',
    features: ['Custom designs', 'Logo embedding', 'Multiple formats']
  },
  {
    id: 'barcode-generator',
    name: 'Barcode Generator',
    description: 'Generate various barcode formats',
    icon: '📊',
    category: 'utility',
    route: '/tools/barcode-generator',
    features: ['15+ formats', 'Custom text', 'Print ready']
  },
  {
    id: 'gif-maker',
    name: 'GIF Maker',
    description: 'Create animated GIFs from images',
    icon: '🎬',
    category: 'utility',
    route: '/tools/gif-maker',
    features: ['Frame timing', 'Loop control', 'Optimization']
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors from images and generate palettes',
    icon: '🎨',
    category: 'utility',
    route: '/tools/color-picker',
    features: ['Color extraction', 'Palette generation', 'Export formats']
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA1, SHA256 hashes',
    icon: '🔐',
    category: 'utility',
    route: '/tools/hash-generator',
    features: ['Multiple algorithms', 'File hashing', 'Verification']
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords',
    icon: '🔒',
    category: 'utility',
    route: '/tools/password-generator',
    features: ['Custom rules', 'Strength meter', 'Multiple passwords']
  },
  {
    id: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Encode and decode Base64 strings',
    icon: '🔤',
    category: 'utility',
    route: '/tools/base64-converter',
    features: ['Text/File encoding', 'Image preview', 'URL safe']
  },
  
  // Creative Tools
  {
    id: 'meme-generator',
    name: 'Meme Generator',
    description: 'Create memes with custom text',
    icon: '😂',
    category: 'creative',
    route: '/tools/meme-generator',
    features: ['Popular templates', 'Custom images', 'Text styling']
  },
  {
    id: 'watermark-tool',
    name: 'Watermark Tool',
    description: 'Add watermarks to images',
    icon: '🏷️',
    category: 'creative',
    route: '/tools/watermark',
    features: ['Text/Image watermarks', 'Positioning', 'Transparency']
  },
  {
    id: 'image-editor',
    name: 'Image Editor',
    description: 'Basic image editing tools',
    icon: '✏️',
    category: 'creative',
    route: '/tools/image-editor',
    features: ['Crop, Resize, Rotate', 'Filters', 'Brightness/Contrast']
  },
  {
    id: 'collage-maker',
    name: 'Collage Maker',
    description: 'Create photo collages',
    icon: '🖼️',
    category: 'creative',
    route: '/tools/collage-maker',
    features: ['Grid layouts', 'Custom spacing', 'Background colors']
  }
];

const ToolsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = {
    converter: {
      title: 'File Converters',
      icon: '🔄',
      description: 'Convert between different file formats',
      tools: freeTools.filter(tool => tool.category === 'converter')
    },
    compressor: {
      title: 'File Compressors',
      icon: '🗜️',
      description: 'Reduce file sizes and optimize',
      tools: freeTools.filter(tool => tool.category === 'compressor')
    },
    utility: {
      title: 'Utility Tools',
      icon: '🛠️',
      description: 'Helpful tools for daily tasks',
      tools: freeTools.filter(tool => tool.category === 'utility')
    },
    creative: {
      title: 'Creative Tools',
      icon: '🎨',
      description: 'Design and creative utilities',
      tools: freeTools.filter(tool => tool.category === 'creative')
    }
  };

  return (
    <div className="tools-dropdown-container">
      <button 
        className="tools-button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <span>Tools</span>
        <ChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="tools-dropdown"
            onMouseLeave={() => {
              setIsOpen(false);
              setActiveCategory(null);
            }}
          >
            <div className="dropdown-layout">
              {/* Categories Sidebar */}
              <div className="categories-sidebar">
                <div className="sidebar-header">
                  <h3>Tool Categories</h3>
                  <span className="total-tools">{freeTools.length} Free Tools</span>
                </div>
                
                {Object.entries(categories).map(([key, category]) => (
                  <motion.div
                    key={key}
                    className={`category-item ${activeCategory === key ? 'active' : ''}`}
                    onMouseEnter={() => setActiveCategory(key)}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="category-content">
                      <div className="category-header">
                        <span className="category-icon">{category.icon}</span>
                        <span className="category-title">{category.title}</span>
                      </div>
                      <span className="category-description">{category.description}</span>
                      <span className="tool-count">{category.tools.length} tools</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tools Grid */}
              <div className="tools-grid">
                <AnimatePresence mode="wait">
                  {activeCategory && (
                    <motion.div
                      key={activeCategory}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="tools-header">
                        <div className="header-content">
                          <h3>{categories[activeCategory as keyof typeof categories].title}</h3>
                          <p>{categories[activeCategory as keyof typeof categories].description}</p>
                        </div>
                        <span className="available-count">
                          {categories[activeCategory as keyof typeof categories].tools.length} Available
                        </span>
                      </div>
                      
                      <div className="tools-list">
                        {categories[activeCategory as keyof typeof categories].tools.map((tool, index) => (
                          <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={tool.route}
                              className="tool-item"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="tool-icon">{tool.icon}</div>
                              <div className="tool-content">
                                <div className="tool-name">{tool.name}</div>
                                <div className="tool-description">{tool.description}</div>
                                <div className="tool-features">
                                  {tool.features.map((feature, index) => (
                                    <span key={index} className="feature-badge">{feature}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="tool-arrow">→</div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {!activeCategory && (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="tools-placeholder"
                    >
                      <div className="placeholder-content">
                        <motion.div 
                          className="placeholder-icon"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🛠️
                        </motion.div>
                        <h3>Professional Tools Suite</h3>
                        <p>Hover over a category to explore our free tools</p>
                        <div className="feature-highlights">
                          <div className="highlight">✅ {freeTools.length}+ Free Tools</div>
                          <div className="highlight">✅ Client-side Processing</div>
                          <div className="highlight">✅ No File Uploads</div>
                          <div className="highlight">✅ Privacy Focused</div>
                          <div className="highlight">✅ No Registration Required</div>
                        </div>
                        <motion.button 
                          className="explore-button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveCategory('converter')}
                        >
                          Explore All Tools →
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolsDropdown; 