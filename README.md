# 🚀 Pixly Forge - Advanced Image Converter

A modern, feature-rich image converter web application built with React, TypeScript, and Vite. Convert images between multiple formats with high quality, batch processing, and a beautiful user interface.

![Pixly Forge](https://img.shields.io/badge/Pixly-Forge-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-2.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

## ✨ Features

### 🎯 Core Functionality
- **Multi-format Support**: Convert between JPG, PNG, WebP, HEIC, BMP, GIF, and PDF
- **Batch Processing**: Convert multiple files simultaneously with progress tracking
- **High-Quality Conversion**: Adjustable quality settings and format optimization
- **Client-Side Processing**: All conversions happen in your browser for maximum privacy
- **Drag & Drop Interface**: Intuitive file upload with visual feedback

### 🎨 Modern UI/UX
- **Quick Conversion Buttons**: 8 one-click conversion options above the main interface
- **Glassmorphism Design**: Beautiful translucent cards with backdrop blur effects
- **Multi-Theme Support**: Light, Dark, and Cyberpunk themes with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered micro-interactions

### 🔧 Advanced Features
- **Real-Time Clock**: Display current time with country detection
- **Theme Cycling**: Easy theme switching with visual indicators
- **Progress Tracking**: Individual file conversion progress with status indicators
- **Download Options**: Single file or bulk ZIP download
- **Settings Panel**: Quality adjustment, format preferences, and aspect ratio control
- **Keyboard Navigation**: Full accessibility support with screen readers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with ES2020+ support

### Installation

```bash
# Clone the repository
git clone https://github.com/dilan1994/pixly-file-forge.git
cd pixly-file-forge

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080` (or `http://localhost:8081` if 8080 is in use).

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage

### Quick Conversion
1. **Select Format**: Click one of the 8 quick conversion buttons at the top
2. **Upload Files**: Drag & drop files or click to browse
3. **Convert**: Click the "Convert Files" button
4. **Download**: Download individual files or as a ZIP archive

### Advanced Settings
- **Quality Control**: Adjust compression quality (10% - 100%)
- **Format Override**: Change output format in settings
- **Aspect Ratio**: Maintain or adjust image proportions
- **Batch Operations**: Process multiple files with different settings

### Supported Conversions
| From → To | Description | Use Case |
|-----------|-------------|----------|
| JPG → PNG | Add transparency support | Web graphics, logos |
| PNG → JPG | Reduce file size | Photos, web optimization |
| HEIC → JPG | iOS photo compatibility | Cross-platform sharing |
| WebP → PNG/JPG | Browser compatibility | Legacy support |
| PDF → JPG | Extract pages as images | Document processing |
| JPG → PDF | Create PDF documents | Document creation |
| Any → WebP | Modern web format | Performance optimization |

## 🎨 Theme System

### Available Themes
- **Light Theme**: Clean, professional appearance for daytime use
- **Dark Theme**: Easy on the eyes for low-light environments  
- **Cyberpunk Theme**: Neon green aesthetic with glowing effects

### Theme Features
- **CSS Custom Properties**: Modern theming with CSS variables
- **Smooth Transitions**: Animated theme switching
- **System Integration**: Respects user's OS preferences
- **Persistent Storage**: Remembers your theme choice

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Properties
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite 5.x with SWC

### Project Structure
```
src/
├── components/
│   ├── layout/           # Header, Footer, ThemeProvider
│   ├── ui/              # Reusable UI components
│   ├── converter/       # Conversion-specific components
│   └── ConversionButtons.tsx  # Quick conversion interface
├── hooks/               # Custom React hooks
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── pages/               # Route components
```

### Key Components

#### ConversionButtons
- **Location**: `src/components/ConversionButtons.tsx`
- **Purpose**: Quick access to 8 most common conversions
- **Features**: Glassmorphic design, active state tracking, responsive grid

#### Header
- **Location**: `src/components/layout/Header.tsx`
- **Purpose**: Navigation, theme switching, real-time clock
- **Features**: Mobile-responsive, country detection, smooth animations

#### Footer
- **Location**: `src/components/layout/Footer.tsx`
- **Purpose**: Links, preferences, social media
- **Features**: Multi-column layout, preference controls, language selector

## 🎯 Performance

### Optimization Features
- **Code Splitting**: Lazy loading for optimal bundle size
- **Image Processing**: Client-side Canvas API for fast conversion
- **Memory Management**: Efficient handling of large files
- **Caching**: Browser storage for user preferences
- **Progressive Enhancement**: Works without JavaScript for basic functionality

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES2020, CSS Custom Properties, Container Queries

## 🔧 Configuration

### Environment Variables
```bash
# Optional: Custom API endpoints
VITE_API_URL=https://api.example.com

# Optional: Analytics
VITE_ANALYTICS_ID=your-analytics-id
```

### Customization
- **Themes**: Modify CSS custom properties in `src/index.css`
- **Conversion Options**: Update `CONVERSION_OPTIONS` in `ConversionButtons.tsx`
- **Branding**: Change logo and colors in theme configuration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with conventional commits: `git commit -m "feat: add amazing feature"`
5. Push to your fork: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration with React hooks
- **Prettier**: Automatic code formatting
- **Testing**: Jest + React Testing Library (coming soon)

## 📱 Mobile Experience

### Touch Optimizations
- **44px minimum touch targets** for iOS compliance
- **Swipe gestures** for navigation
- **Haptic feedback** on supported devices
- **Responsive breakpoints** for all screen sizes

### PWA Features (Coming Soon)
- **Offline Support**: Convert images without internet
- **Install Prompt**: Add to home screen
- **Background Sync**: Queue conversions for later
- **Push Notifications**: Conversion completion alerts

## 🔒 Privacy & Security

### Data Protection
- **Client-Side Processing**: Files never leave your device
- **No Server Upload**: All conversions happen in your browser
- **Local Storage Only**: Preferences stored locally
- **GDPR Compliant**: No tracking without consent

### Security Features
- **Content Security Policy**: XSS protection
- **File Type Validation**: Prevent malicious uploads
- **Memory Limits**: Prevent browser crashes
- **Error Boundaries**: Graceful error handling

## 📊 Analytics & Monitoring

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS optimization
- **Bundle Analysis**: Webpack Bundle Analyzer integration
- **Error Tracking**: Sentry integration (optional)
- **User Analytics**: Privacy-focused analytics (optional)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📈 Roadmap

### Version 2.1 (Next Release)
- [ ] **Video Conversion**: Support for video format conversion
- [ ] **Cloud Storage**: Integration with Google Drive, Dropbox
- [ ] **API Access**: RESTful API for developers
- [ ] **Plugins System**: Custom conversion plugins

### Version 2.2 (Future)
- [ ] **AI Enhancement**: Image upscaling and enhancement
- [ ] **Collaboration**: Share conversion projects
- [ ] **Advanced Editing**: Basic image editing tools
- [ ] **Batch Automation**: Scheduled conversions

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Memory Issues with Large Files**
- Reduce batch size to 10 files or less
- Use lower quality settings for large images
- Close other browser tabs to free memory

**Browser Compatibility**
- Enable JavaScript in browser settings
- Update to latest browser version
- Check for ad blockers interfering with file processing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the lightning-fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons
- **Open Source Community** for inspiration and contributions

## 📞 Support

- **Documentation**: [docs.pixlyforge.com](https://docs.pixlyforge.com)
- **Issues**: [GitHub Issues](https://github.com/dilan1994/pixly-file-forge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dilan1994/pixly-file-forge/discussions)
- **Email**: support@pixlyforge.com

---

<div align="center">
  <p>Made with ❤️ by the Pixly Forge Team</p>
  <p>
    <a href="https://github.com/dilan1994/pixly-file-forge">⭐ Star us on GitHub</a> •
    <a href="https://twitter.com/pixlyforge">🐦 Follow on Twitter</a> •
    <a href="https://pixlyforge.com">🌐 Visit Website</a>
  </p>
</div>
