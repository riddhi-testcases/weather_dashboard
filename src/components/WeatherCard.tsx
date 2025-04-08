import React from 'react';
import { Droplets, Wind, RefreshCw, Thermometer } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
  onRefresh: () => void;
  isRefreshing: boolean;
  isDarkMode: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onRefresh, isRefreshing, isDarkMode }) => {
  return (
    <div className={`rounded-3xl p-8 h-full backdrop-blur-md ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
    } shadow-xl`}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">{weather.name}</h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
          </p>
        </div>
        <button
          onClick={onRefresh}
          className={`p-3 rounded-xl ${
            isDarkMode 
              ? 'bg-gray-700/50 hover:bg-gray-600/50' 
              : 'bg-gray-100/50 hover:bg-gray-200/50'
          } transition-all duration-300`}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-48 h-48"
            />
            <div className="absolute bottom-0 right-0 text-6xl font-bold">
              {Math.round(weather.main.temp)}°
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-4 rounded-2xl ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Thermometer className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mostly Feels Like</p>
                <p className="text-xl font-semibold">{Math.round(weather.main.feels_like)}°C</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                isDarkMode ? 'bg-teal-500/20' : 'bg-teal-100'
              }`}>
                <Droplets className="h-6 w-6 text-teal-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                <p className="text-xl font-semibold">{weather.main.humidity}%</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <Wind className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                <p className="text-xl font-semibold">{Math.round(weather.wind.speed)} km/h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;