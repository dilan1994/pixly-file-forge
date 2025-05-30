# 🛠️ Pixly Forge - Professional Tools Suite

A comprehensive, privacy-focused image converter and tools suite built with React, TypeScript, and modern web technologies. All processing happens client-side for maximum privacy and security.

## ✨ Features

### 🔄 **File Converters (6 Tools)**
- **Image Converter** - Convert between JPG, PNG, WebP, HEIC, BMP, GIF formats
- **PDF Converter** - Convert PDF to images and images to PDF
- **Archive Tool** - Create ZIP files and extract archives
- **Vector Converter** - Convert SVG to PNG, JPG and other raster formats
- **Unit Converter** - Convert between measurement units (Length, Weight, Temperature)
- **Currency Converter** - Convert between world currencies with live rates

### 🗜️ **File Compressors (3 Tools)**
- **Image Compressor** - Reduce image file sizes without quality loss
- **GIF Optimizer** - Optimize GIF animations for web
- **PDF Compressor** - Reduce PDF file sizes

### 🛠️ **Utility Tools (8 Tools)**
- **OCR Text Extractor** - Extract text from images and PDFs (100+ languages)
- **QR Code Generator** - Create QR codes for text, URLs, WiFi, contacts
- **Barcode Generator** - Generate various barcode formats
- **GIF Maker** - Create animated GIFs from images
- **Color Picker** - Pick colors from images and generate palettes
- **Hash Generator** - Generate MD5, SHA1, SHA256 hashes
- **Password Generator** - Generate secure passwords
- **Base64 Converter** - Encode and decode Base64 strings

### 🎨 **Creative Tools (4 Tools)**
- **Meme Generator** - Create memes with custom text
- **Watermark Tool** - Add watermarks to images
- **Image Editor** - Basic image editing tools
- **Collage Maker** - Create photo collages

## 🚀 **Key Highlights**

- **22+ Professional Tools** - Complete suite for daily tasks
- **Client-Side Processing** - No file uploads, maximum privacy
- **Multi-Language Support** - 8 languages with native names
- **Theme Support** - Light, Dark, and Cyber themes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Free & Open Source** - No registration or payment required
- **Modern UI/UX** - Beautiful animations and interactions

## 🏗️ **Technology Stack**

### **Core Framework**
- **React 18+** - Modern functional components with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### **UI & Animations**
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant notifications

### **Internationalization**
- **react-i18next** - React integration for i18n
- **i18next** - Core internationalization framework
- **i18next-browser-languagedetector** - Automatic language detection

### **File Processing Libraries**
```json
{
  "Image Processing": ["fabric", "konva", "react-konva"],
  "PDF Processing": ["pdf-lib", "jspdf", "pdf2pic"],
  "Archive Processing": ["jszip", "file-saver"],
  "OCR & Text": ["tesseract.js"],
  "QR & Barcodes": ["qrcode", "jsbarcode"],
  "GIF Processing": ["gif.js", "gifuct-js"],
  "Color Tools": ["color", "colorthief", "chroma-js"],
  "Crypto & Security": ["crypto-js", "bcryptjs"],
  "Utilities": ["date-fns", "lodash", "uuid", "mime-types"]
}
```

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/dilan1994/pixly-file-forge.git
cd pixly-file-forge

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Environment Setup**
```bash
# Development
npm run dev          # Start dev server on http://localhost:8080

# Production
npm run build        # Build optimized production bundle
npm run preview      # Preview production build
```

## 🎯 **Tools Implementation Guide**

### **1. Tools Dropdown Component**
```tsx
// src/components/ToolsDropdown.tsx
- Professional dropdown with categories
- Animated hover effects
- Responsive design for all screen sizes
- 22+ tools organized in 4 categories
```

### **2. Sample Tool Implementation (QR Generator)**
```tsx
// src/pages/tools/QRGenerator.tsx
- Complete QR code generation tool
- Multiple input types (Text, WiFi, Contact)
- Customization options (size, colors, margin)
- Download, copy, and share functionality
```

### **3. Tool Categories Structure**
```typescript
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'converter' | 'compressor' | 'utility' | 'creative';
  route: string;
  features: string[];
}
```

## 🌐 **Internationalization**

### **Supported Languages**
- 🇺🇸 **English** (en) - Default
- 🇪🇸 **Español** (es) - Spanish
- 🇫🇷 **Français** (fr) - French
- 🇩🇪 **Deutsch** (de) - German
- 🇯🇵 **日本語** (ja) - Japanese
- 🇨🇳 **中文** (zh) - Chinese
- 🇰🇷 **한국어** (ko) - Korean
- 🇵🇹 **Português** (pt) - Portuguese

### **Translation Keys**
```typescript
// Navigation, tools, features, controls, settings
// 100+ comprehensive translation keys
// Automatic browser language detection
// Persistent language preferences
```

## 🎨 **Theme System**

### **Available Themes**
- **Light Theme** - Clean, professional appearance
- **Dark Theme** - Easy on the eyes for low-light environments
- **Cyber Theme** - Futuristic neon green accents

### **Theme Implementation**
```css
/* CSS Variables for theme switching */
:root { /* Light theme variables */ }
[data-theme="dark"] { /* Dark theme overrides */ }
[data-theme="cyber"] { /* Cyber theme overrides */ }
```

## 📱 **Responsive Design**

### **Breakpoints**
- **Desktop** (1200px+) - Full sidebar and grid layout
- **Tablet** (768px-1199px) - Compact sidebar
- **Mobile** (480px-767px) - Horizontal category tabs
- **Small Mobile** (<480px) - Optimized for small screens

### **Mobile Optimizations**
- Touch-friendly interactions
- Swipe gestures for categories
- Optimized button sizes
- Simplified feature displays

## 🔧 **Development Guide**

### **Adding New Tools**

1. **Create Tool Component**
```tsx
// src/pages/tools/NewTool.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewTool: React.FC = () => {
  // Tool implementation
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Tool UI */}
    </div>
  );
};

export default NewTool;
```

2. **Add to Tools Array**
```tsx
// src/components/ToolsDropdown.tsx
const freeTools: Tool[] = [
  // ... existing tools
  {
    id: 'new-tool',
    name: 'New Tool',
    description: 'Tool description',
    icon: '🔧',
    category: 'utility',
    route: '/tools/new-tool',
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  }
];
```

3. **Add Route**
```tsx
// src/App.tsx
<Route path="/tools/new-tool" element={<NewTool />} />
```

### **Styling Guidelines**
```css
/* Use consistent spacing and colors */
.tool-container {
  @apply min-h-screen bg-gradient-to-br from-background via-background to-primary/5;
}

.tool-header {
  @apply text-center mb-8;
}

.tool-content {
  @apply max-w-6xl mx-auto px-4;
}
```

## 🔒 **Privacy & Security**

### **Client-Side Processing**
- All file processing happens in the browser
- No files are uploaded to servers
- No data collection or tracking
- GDPR compliant by design

### **Security Features**
- Content Security Policy (CSP) headers
- Secure hash generation
- Input validation and sanitization
- XSS protection

## 🚀 **Performance Optimizations**

### **Code Splitting**
- Lazy loading for tool components
- Dynamic imports for heavy libraries
- Route-based code splitting

### **Bundle Optimization**
- Tree shaking for unused code
- Minification and compression
- Modern ES modules

### **Caching Strategy**
- Service worker for offline functionality
- Browser caching for static assets
- Local storage for user preferences

## 📊 **Browser Support**

### **Supported Browsers**
- **Chrome** 90+ ✅
- **Firefox** 88+ ✅
- **Safari** 14+ ✅
- **Edge** 90+ ✅

### **Required Features**
- ES2020 support
- Canvas API
- File API
- Web Workers
- Local Storage

## 🤝 **Contributing**

### **Development Workflow**
1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-tool`)
3. Commit changes (`git commit -am 'Add new tool'`)
4. Push to branch (`git push origin feature/new-tool`)
5. Create Pull Request

### **Code Standards**
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Conventional commits

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **React Team** - For the amazing framework
- **Vite Team** - For the fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For beautiful animations
- **Open Source Community** - For all the free libraries

## 📞 **Support**

- **Documentation** - [GitHub Wiki](https://github.com/dilan1994/pixly-file-forge/wiki)
- **Issues** - [GitHub Issues](https://github.com/dilan1994/pixly-file-forge/issues)
- **Discussions** - [GitHub Discussions](https://github.com/dilan1994/pixly-file-forge/discussions)

---

**Made with ❤️ for creators worldwide** 🌍
