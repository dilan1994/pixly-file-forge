import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark', 'cyberpunk');
    
    // Apply theme-specific CSS custom properties
    switch (theme) {
      case 'light':
        root.classList.add('light');
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
        break;
        
      case 'dark':
        root.classList.add('dark');
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
        break;
        
      case 'cyberpunk':
        root.classList.add('cyberpunk');
        root.style.setProperty('--background', '10 10 10');
        root.style.setProperty('--foreground', '0 255 136');
        root.style.setProperty('--primary', '0 255 136');
        root.style.setProperty('--primary-foreground', '10 10 10');
        root.style.setProperty('--secondary', '255 0 128');
        root.style.setProperty('--secondary-foreground', '10 10 10');
        root.style.setProperty('--accent', '20 20 20');
        root.style.setProperty('--accent-foreground', '0 255 136');
        root.style.setProperty('--muted', '20 20 20');
        root.style.setProperty('--muted-foreground', '100 100 100');
        root.style.setProperty('--border', '0 255 136');
        root.style.setProperty('--surface', '15 15 15');
        root.style.setProperty('--text', '0 255 136');
        break;
    }
  }, [theme]);

  return <>{children}</>;
};
