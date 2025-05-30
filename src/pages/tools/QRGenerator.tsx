import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Download, 
  Copy, 
  Wifi, 
  Mail, 
  Phone, 
  Globe, 
  QrCode,
  Palette,
  Settings,
  Share2
} from 'lucide-react';
import toast from 'react-hot-toast';

// QR Code generation function (placeholder - would use qrcode.js in real implementation)
const generateQRCode = (text: string, options: any) => {
  // This is a placeholder. In real implementation, you would use:
  // import QRCode from 'qrcode';
  // return QRCode.toDataURL(text, options);
  
  // For demo purposes, return a placeholder SVG
  const size = options.width || 256;
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${options.color?.light || '#FFFFFF'}"/>
      <rect x="20" y="20" width="40" height="40" fill="${options.color?.dark || '#000000'}"/>
      <rect x="80" y="20" width="40" height="40" fill="${options.color?.dark || '#000000'}"/>
      <rect x="140" y="20" width="40" height="40" fill="${options.color?.dark || '#000000'}"/>
      <rect x="200" y="20" width="40" height="40" fill="${options.color?.dark || '#000000'}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="monospace" font-size="12" fill="${options.color?.dark || '#000000'}">QR: ${text.substring(0, 10)}...</text>
    </svg>
  `)}`;
};

interface QROptions {
  width: number;
  margin: number;
  color: {
    dark: string;
    light: string;
  };
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
}

const QRGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [qrDataURL, setQrDataURL] = useState('');
  const [activeTab, setActiveTab] = useState('text');
  const [options, setOptions] = useState<QROptions>({
    width: 256,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    },
    errorCorrectionLevel: 'M'
  });

  // WiFi form state
  const [wifiData, setWifiData] = useState({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false
  });

  // Contact form state
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    organization: ''
  });

  useEffect(() => {
    if (text.trim()) {
      try {
        const dataURL = generateQRCode(text, options);
        setQrDataURL(dataURL);
      } catch (error) {
        console.error('QR Generation Error:', error);
        toast.error('Failed to generate QR code');
      }
    } else {
      setQrDataURL('');
    }
  }, [text, options]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'wifi':
        setText(`WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden};;`);
        break;
      case 'contact':
        setText(`BEGIN:VCARD\nVERSION:3.0\nFN:${contactData.name}\nTEL:${contactData.phone}\nEMAIL:${contactData.email}\nORG:${contactData.organization}\nEND:VCARD`);
        break;
      case 'text':
      default:
        setText('');
        break;
    }
  };

  const downloadQR = () => {
    if (!qrDataURL) return;
    
    const link = document.createElement('a');
    link.download = `qrcode-${Date.now()}.png`;
    link.href = qrDataURL;
    link.click();
    toast.success('QR code downloaded!');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  const shareQR = async () => {
    if (navigator.share && qrDataURL) {
      try {
        // Convert data URL to blob for sharing
        const response = await fetch(qrDataURL);
        const blob = await response.blob();
        const file = new File([blob], 'qrcode.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'QR Code',
          text: 'Check out this QR code!',
          files: [file]
        });
      } catch (error) {
        toast.error('Sharing not supported');
      }
    } else {
      toast.error('Sharing not available');
    }
  };

  const presetTemplates = [
    { label: 'Website URL', value: 'https://example.com', icon: Globe },
    { label: 'Email', value: 'mailto:contact@example.com', icon: Mail },
    { label: 'Phone', value: 'tel:+1234567890', icon: Phone },
    { label: 'WiFi', value: 'WIFI:T:WPA;S:MyNetwork;P:password123;;', icon: Wifi }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QR Code Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create custom QR codes for text, URLs, WiFi, contacts, and more. All processing happens in your browser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 p-1 bg-accent rounded-lg">
              {[
                { id: 'text', label: 'Text/URL', icon: Globe },
                { id: 'wifi', label: 'WiFi', icon: Wifi },
                { id: 'contact', label: 'Contact', icon: Mail }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content Input */}
            <div className="bg-background rounded-xl border p-6 space-y-4">
              {activeTab === 'text' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Text or URL</label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter text, URL, or any data..."
                      className="w-full h-32 px-3 py-2 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  {/* Quick Templates */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Quick Templates</label>
                    <div className="grid grid-cols-2 gap-2">
                      {presetTemplates.map((template) => {
                        const Icon = template.icon;
                        return (
                          <button
                            key={template.label}
                            onClick={() => setText(template.value)}
                            className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-accent transition-colors text-left"
                          >
                            <Icon className="w-4 h-4 text-primary" />
                            <span className="text-sm">{template.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wifi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Network Name (SSID)</label>
                    <input
                      type="text"
                      value={wifiData.ssid}
                      onChange={(e) => {
                        const newData = { ...wifiData, ssid: e.target.value };
                        setWifiData(newData);
                        setText(`WIFI:T:${newData.security};S:${newData.ssid};P:${newData.password};H:${newData.hidden};;`);
                      }}
                      placeholder="MyWiFiNetwork"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={wifiData.password}
                      onChange={(e) => {
                        const newData = { ...wifiData, password: e.target.value };
                        setWifiData(newData);
                        setText(`WIFI:T:${newData.security};S:${newData.ssid};P:${newData.password};H:${newData.hidden};;`);
                      }}
                      placeholder="WiFi password"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Security Type</label>
                    <select
                      value={wifiData.security}
                      onChange={(e) => {
                        const newData = { ...wifiData, security: e.target.value };
                        setWifiData(newData);
                        setText(`WIFI:T:${newData.security};S:${newData.ssid};P:${newData.password};H:${newData.hidden};;`);
                      }}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">Open Network</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={contactData.name}
                      onChange={(e) => {
                        const newData = { ...contactData, name: e.target.value };
                        setContactData(newData);
                        setText(`BEGIN:VCARD\nVERSION:3.0\nFN:${newData.name}\nTEL:${newData.phone}\nEMAIL:${newData.email}\nORG:${newData.organization}\nEND:VCARD`);
                      }}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={contactData.phone}
                      onChange={(e) => {
                        const newData = { ...contactData, phone: e.target.value };
                        setContactData(newData);
                        setText(`BEGIN:VCARD\nVERSION:3.0\nFN:${newData.name}\nTEL:${newData.phone}\nEMAIL:${newData.email}\nORG:${newData.organization}\nEND:VCARD`);
                      }}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => {
                        const newData = { ...contactData, email: e.target.value };
                        setContactData(newData);
                        setText(`BEGIN:VCARD\nVERSION:3.0\nFN:${newData.name}\nTEL:${newData.phone}\nEMAIL:${newData.email}\nORG:${newData.organization}\nEND:VCARD`);
                      }}
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Organization</label>
                    <input
                      type="text"
                      value={contactData.organization}
                      onChange={(e) => {
                        const newData = { ...contactData, organization: e.target.value };
                        setContactData(newData);
                        setText(`BEGIN:VCARD\nVERSION:3.0\nFN:${newData.name}\nTEL:${newData.phone}\nEMAIL:${newData.email}\nORG:${newData.organization}\nEND:VCARD`);
                      }}
                      placeholder="Company Name"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Customization Options */}
            <div className="bg-background rounded-xl border p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Customization</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    value={options.width}
                    onChange={(e) => setOptions({
                      ...options,
                      width: Number(e.target.value)
                    })}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">{options.width}px</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Margin</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={options.margin}
                    onChange={(e) => setOptions({
                      ...options,
                      margin: Number(e.target.value)
                    })}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">{options.margin}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Foreground Color</label>
                  <input
                    type="color"
                    value={options.color.dark}
                    onChange={(e) => setOptions({
                      ...options,
                      color: { ...options.color, dark: e.target.value }
                    })}
                    className="w-full h-10 rounded-lg border border-border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Background Color</label>
                  <input
                    type="color"
                    value={options.color.light}
                    onChange={(e) => setOptions({
                      ...options,
                      color: { ...options.color, light: e.target.value }
                    })}
                    className="w-full h-10 rounded-lg border border-border"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-background rounded-xl border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                QR Code Preview
              </h3>
              
              {qrDataURL ? (
                <div className="text-center space-y-4">
                  <div className="inline-block p-4 bg-white rounded-lg border">
                    <img 
                      src={qrDataURL} 
                      alt="QR Code" 
                      className="max-w-full h-auto"
                      style={{ width: options.width, height: options.width }}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={downloadQR}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Text
                    </button>
                    
                    <button
                      onClick={shareQR}
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Enter some text to generate a QR code</p>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-background rounded-xl border p-6">
              <h3 className="font-semibold mb-4">Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Custom colors and sizes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">WiFi network sharing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Contact card generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">High-quality PNG export</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Privacy-focused (client-side only)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator; 