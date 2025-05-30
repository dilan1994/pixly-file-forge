
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

const themes = {
  light: {
    primary: '#3b82f6',
    secondary: '#6366f1',
    background: '#ffffff',
    surface: 'rgba(255, 255, 255, 0.8)',
    text: '#1f2937',
    accent: '#10b981',
  },
  dark: {
    primary: '#60a5fa',
    secondary: '#818cf8',
    background: '#0f172a',
    surface: 'rgba(15, 23, 42, 0.8)',
    text: '#f8fafc',
    accent: '#34d399',
  },
  cyberpunk: {
    primary: '#00ff88',
    secondary: '#ff0080',
    background: '#0a0a0a',
    surface: 'rgba(0, 255, 136, 0.1)',
    text: '#00ff88',
    accent: '#ff0080',
  },
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    const themeColors = themes[theme];

    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    root.className = theme;
  }, [theme]);

  return <div className="min-h-screen transition-colors duration-300">{children}</div>;
};
