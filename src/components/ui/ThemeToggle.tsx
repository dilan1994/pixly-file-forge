
import { Sun, Moon, Zap } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export const ThemeToggle = () => {
  const { theme, setTheme } = useAppStore();

  const themes = [
    { key: 'light', icon: Sun, label: 'Light' },
    { key: 'dark', icon: Moon, label: 'Dark' },
    { key: 'cyberpunk', icon: Zap, label: 'Cyber' },
  ] as const;

  return (
    <div className="flex items-center bg-surface backdrop-blur-md rounded-lg p-1 border border-primary/20">
      {themes.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`
            flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all
            ${theme === key 
              ? 'bg-primary text-white shadow-lg' 
              : 'text-text/70 hover:text-text hover:bg-primary/10'
            }
          `}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:block">{label}</span>
        </button>
      ))}
    </div>
  );
};
