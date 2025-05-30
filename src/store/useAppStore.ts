
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'cyberpunk';

interface AppState {
  theme: Theme;
  clockFormat: '12h' | '24h';
  autoDownload: boolean;
  defaultQuality: number;
  preferredFormat: string;
  setTheme: (theme: Theme) => void;
  setClockFormat: (format: '12h' | '24h') => void;
  setAutoDownload: (enabled: boolean) => void;
  setDefaultQuality: (quality: number) => void;
  setPreferredFormat: (format: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      clockFormat: '12h',
      autoDownload: false,
      defaultQuality: 0.9,
      preferredFormat: 'png',
      setTheme: (theme) => set({ theme }),
      setClockFormat: (clockFormat) => set({ clockFormat }),
      setAutoDownload: (autoDownload) => set({ autoDownload }),
      setDefaultQuality: (defaultQuality) => set({ defaultQuality }),
      setPreferredFormat: (preferredFormat) => set({ preferredFormat }),
    }),
    {
      name: 'app-preferences',
    }
  )
);
