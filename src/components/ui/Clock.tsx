
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAppStore } from '@/store/useAppStore';
import { Clock as ClockIcon, Globe } from 'lucide-react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [country, setCountry] = useState('US');
  const clockFormat = useAppStore((state) => state.clockFormat);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Detect user's country/timezone
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const countryCode = timezone.split('/')[0];
      setCountry(countryCode);
    } catch (error) {
      console.log('Could not detect timezone');
    }

    return () => clearInterval(timer);
  }, []);

  const timeFormat = clockFormat === '12h' ? 'h:mm:ss a' : 'HH:mm:ss';
  const dateFormat = 'MMM dd, yyyy';

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex items-center space-x-1">
        <Globe className="w-4 h-4 opacity-70" />
        <span className="opacity-70">{country}</span>
      </div>
      <div className="flex items-center space-x-1">
        <ClockIcon className="w-4 h-4 opacity-70" />
        <div className="flex flex-col">
          <span className="font-mono font-medium">
            {format(time, timeFormat)}
          </span>
          <span className="text-xs opacity-70">
            {format(time, dateFormat)}
          </span>
        </div>
      </div>
    </div>
  );
};
