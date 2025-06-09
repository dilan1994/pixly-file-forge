import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark', 'cyberpunk');
    
    // Apply theme-specific CSS custom properties and background images
    switch (theme) {
      case 'light':
        root.classList.add('light');
        // Light theme colors
        root.style.setProperty('--background', '255 255 255');
        root.style.setProperty('--foreground', '15 23 42');
        root.style.setProperty('--primary', '59 130 246');
        root.style.setProperty('--primary-foreground', '248 250 252');
        root.style.setProperty('--secondary', '147 51 234');
        root.style.setProperty('--secondary-foreground', '248 250 252');
        root.style.setProperty('--accent', '241 245 249');
        root.style.setProperty('--accent-foreground', '15 23 42');
        root.style.setProperty('--muted', '248 250 252');
        root.style.setProperty('--muted-foreground', '100 116 139');
        root.style.setProperty('--border', '226 232 240');
        root.style.setProperty('--surface', '255 255 255');
        root.style.setProperty('--text', '15 23 42');
        
        // Light theme background with gradient
        body.style.background = `linear-gradient(135deg, #87CEEB 0%, #E6E6FA 50%, #FFC0CB 100%)`;
        body.style.minHeight = '100vh';
        body.style.backgroundAttachment = 'fixed';
        break;
        
      case 'dark':
        root.classList.add('dark');
        // Dark theme colors
        root.style.setProperty('--background', '15 23 42');
        root.style.setProperty('--foreground', '248 250 252');
        root.style.setProperty('--primary', '96 165 250');
        root.style.setProperty('--primary-foreground', '15 23 42');
        root.style.setProperty('--secondary', '168 85 247');
        root.style.setProperty('--secondary-foreground', '15 23 42');
        root.style.setProperty('--accent', '30 41 59');
        root.style.setProperty('--accent-foreground', '248 250 252');
        root.style.setProperty('--muted', '30 41 59');
        root.style.setProperty('--muted-foreground', '148 163 184');
        root.style.setProperty('--border', '51 65 85');
        root.style.setProperty('--surface', '30 41 59');
        root.style.setProperty('--text', '248 250 252');
        
        // Dark theme background with gradient and flowing lines
        body.style.background = `
          radial-gradient(ellipse at top, #1e1b4b 0%, #000000 50%, #1a1a2e 100%),
          linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%),
          linear-gradient(-45deg, transparent 30%, rgba(255, 0, 128, 0.1) 50%, transparent 70%)
        `;
        body.style.minHeight = '100vh';
        body.style.backgroundAttachment = 'fixed';
        body.style.backgroundSize = '100% 100%, 200% 200%, 200% 200%';
        body.style.animation = 'gradientShift 15s ease infinite';
        break;
    }
  }, [theme]);

  return <>{children}</>;
};
