import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

interface ForecastSectionProps {
  city: string;
  isDarkMode: boolean;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ city, isDarkMode }) => {
  const timeSlots = [
    { time: '9:00', icon: Sun, temp: '22°', label: 'Morning' },
    { time: '12:00', icon: Cloud, temp: '25°', label: 'Noon' },
    { time: '15:00', icon: CloudRain, temp: '23°', label: 'Afternoon' },
    { time: '18:00', icon: CloudSnow, temp: '20°', label: 'Evening' },
  ];

  return (
    <div className={`rounded-3xl p-8 h-full backdrop-blur-md ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
    } shadow-xl`}>
      <h3 className="text-xl font-bold mb-6">Daily Forecast</h3>
      <div className="space-y-4">
        {timeSlots.map((slot) => (
          <div
            key={slot.time}
            className={`p-4 rounded-2xl ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
            } transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                }`}>
                  <slot.icon className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{slot.label}</p>
                  <p className="text-sm font-medium">{slot.time}</p>
                </div>
              </div>
              <span className="text-xl font-semibold">{slot.temp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;