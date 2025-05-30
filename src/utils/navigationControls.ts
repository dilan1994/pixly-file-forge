// Navigation Controls Utility
export class NavigationControls {
  private static instance: NavigationControls;
  
  constructor() {
    this.init();
  }

  static getInstance(): NavigationControls {
    if (!NavigationControls.instance) {
      NavigationControls.instance = new NavigationControls();
    }
    return NavigationControls.instance;
  }

  init() {
    // Initialize all controls when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeAllControls();
      });
    } else {
      this.initializeAllControls();
    }
  }

  private initializeAllControls() {
    this.initializeThemeControls();
    this.initializeLanguageSelector();
    this.initializeQualitySlider();
    this.initializeAutoDownload();
    this.initializeConversionTabs();
    this.loadSavedSettings();
    this.startClock();
  }

  // Theme Control Implementation
  private initializeThemeControls() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    themeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const theme = target.getAttribute('data-theme') || 'light';
        this.switchTheme(theme);
        
        // Update active button
        themeButtons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
        
        // Save to localStorage
        localStorage.setItem('selectedTheme', theme);
      });
    });
  }

  private switchTheme(theme: string) {
    document.body.className = theme;
    
    // Update CSS custom properties based on theme
    this.updateThemeColors(theme);
  }

  private updateThemeColors(theme: string) {
    const root = document.documentElement;
    
    switch(theme) {
      case 'light':
        root.style.setProperty('--tab-text-color', '#1f2937');
        root.style.setProperty('--main-bg', '#ffffff');
        break;
      case 'dark':
        root.style.setProperty('--tab-text-color', '#f8fafc');
        root.style.setProperty('--main-bg', '#0f172a');
        break;
      case 'cyberpunk':
        root.style.setProperty('--tab-text-color', '#00ff88');
        root.style.setProperty('--main-bg', '#000000');
        break;
    }
  }

  // Language Selector Implementation
  private initializeLanguageSelector() {
    const languageSelector = document.querySelector('.nav-language-selector');
    const dropdown = document.querySelector('.language-dropdown');
    const languageOptions = document.querySelectorAll('.language-option');

    if (!languageSelector) return;

    // Toggle dropdown
    languageSelector.addEventListener('click', (e) => {
      e.stopPropagation();
      languageSelector.classList.toggle('open');
    });

    // Handle language selection
    languageOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const flagElement = option.querySelector('.language-flag') as HTMLElement;
        const textElement = option.querySelector('.language-text') as HTMLElement;
        
        if (flagElement && textElement) {
          const flagText = flagElement.textContent;
          const langText = textElement.textContent;
          
          // Update selected display
          const selectedFlag = languageSelector.querySelector('.language-flag') as HTMLElement;
          const selectedText = languageSelector.querySelector('.language-text') as HTMLElement;
          
          if (selectedFlag && selectedText) {
            selectedFlag.textContent = flagText;
            selectedText.textContent = langText;
          }
          
          // Update selected state
          languageOptions.forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');
          
          // Close dropdown
          languageSelector.classList.remove('open');
          
          // Save selection
          localStorage.setItem('selectedLanguage', JSON.stringify({
            flag: flagText,
            text: langText
          }));
          
          // Trigger language change event
          this.onLanguageChange(langText || '');
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      languageSelector.classList.remove('open');
    });
  }

  private onLanguageChange(language: string) {
    console.log('Language changed to:', language);
    // Implement language change logic here
    // You can add translation logic here
  }

  // Quality Slider Implementation
  private initializeQualitySlider() {
    const qualitySlider = document.querySelector('.nav-quality-slider') as HTMLInputElement;
    const qualityValue = document.querySelector('.nav-quality-value') as HTMLElement;
    
    if (qualitySlider && qualityValue) {
      qualitySlider.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const value = parseInt(target.value);
        qualityValue.textContent = value + '%';
        
        // Update quality setting
        localStorage.setItem('imageQuality', value.toString());
        
        // Visual feedback based on quality level
        this.updateQualityVisualFeedback(value);
      });

      qualitySlider.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        console.log('Quality set to:', target.value + '%');
      });
    }
  }

  private updateQualityVisualFeedback(quality: number) {
    const qualityValue = document.querySelector('.nav-quality-value') as HTMLElement;
    
    if (qualityValue) {
      if (quality >= 80) {
        qualityValue.style.color = 'var(--quality-high)';
      } else if (quality >= 50) {
        qualityValue.style.color = 'var(--quality-medium)';
      } else {
        qualityValue.style.color = 'var(--quality-low)';
      }
    }
  }

  // Auto Download Toggle Implementation
  private initializeAutoDownload() {
    const autoDownloadToggle = document.querySelector('.nav-auto-download');
    
    if (autoDownloadToggle) {
      autoDownloadToggle.addEventListener('click', () => {
        const isActive = autoDownloadToggle.classList.toggle('active');
        
        // Update setting
        localStorage.setItem('autoDownload', isActive.toString());
        
        // Visual feedback
        console.log('Auto download:', isActive ? 'Enabled' : 'Disabled');
      });
    }
  }

  // Conversion Tabs Implementation
  private initializeConversionTabs() {
    const conversionTabs = document.querySelectorAll('.conversion-tab-inline');
    
    conversionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        conversionTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Get conversion type
        const textElements = tab.querySelectorAll('.tab-inline-text');
        const fromFormat = textElements[0]?.textContent || '';
        const toFormat = textElements[1]?.textContent || '';
        
        // Update conversion info
        this.updateConversionInfo(fromFormat, toFormat);
        
        // Save selected conversion
        localStorage.setItem('selectedConversion', JSON.stringify({
          from: fromFormat,
          to: toFormat
        }));
      });
    });
  }

  private updateConversionInfo(from: string, to: string) {
    const conversionTarget = document.querySelector('.conversion-target');
    if (conversionTarget) {
      conversionTarget.textContent = `Convert ${from} to ${to} with transparency support`;
    }
  }

  // Load Saved Settings
  private loadSavedSettings() {
    // Load theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    this.switchTheme(savedTheme);
    const themeButton = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (themeButton) {
      themeButton.classList.add('active');
    }

    // Load language
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      try {
        const langData = JSON.parse(savedLanguage);
        const selectedFlag = document.querySelector('.nav-language-selector .language-flag') as HTMLElement;
        const selectedText = document.querySelector('.nav-language-selector .language-text') as HTMLElement;
        if (selectedFlag && selectedText) {
          selectedFlag.textContent = langData.flag;
          selectedText.textContent = langData.text;
        }
      } catch (e) {
        console.log('Error loading saved language');
      }
    }

    // Load quality
    const savedQuality = localStorage.getItem('imageQuality') || '90';
    const qualitySlider = document.querySelector('.nav-quality-slider') as HTMLInputElement;
    const qualityValue = document.querySelector('.nav-quality-value') as HTMLElement;
    if (qualitySlider && qualityValue) {
      qualitySlider.value = savedQuality;
      qualityValue.textContent = savedQuality + '%';
      this.updateQualityVisualFeedback(parseInt(savedQuality));
    }

    // Load auto download
    const savedAutoDownload = localStorage.getItem('autoDownload') === 'true';
    const autoDownloadToggle = document.querySelector('.nav-auto-download');
    if (autoDownloadToggle && savedAutoDownload) {
      autoDownloadToggle.classList.add('active');
    }

    // Load conversion type
    const savedConversion = localStorage.getItem('selectedConversion');
    if (savedConversion) {
      try {
        const conversionData = JSON.parse(savedConversion);
        this.updateConversionInfo(conversionData.from, conversionData.to);
      } catch (e) {
        console.log('Error loading saved conversion');
      }
    }
  }

  // Real-time Clock
  private startClock() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  private updateClock() {
    const timeElement = document.querySelector('.current-time') as HTMLElement;
    const dateElement = document.querySelector('.current-date') as HTMLElement;
    
    if (timeElement && dateElement) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      timeElement.textContent = timeString;
      dateElement.textContent = dateString;
    }
  }
}

// Initialize the navigation controls
export const initializeNavigationControls = () => {
  NavigationControls.getInstance();
};

// Auto-initialize when module is imported
if (typeof window !== 'undefined') {
  initializeNavigationControls();
} 