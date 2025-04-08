import React, { useState, useEffect } from 'react';
import { Search, Cloud, RefreshCw, Sun, Moon, MapPin, Compass } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import SearchHistory from './components/SearchHistory';
import ForecastSection from './components/ForecastSection';
import { WeatherData } from './types';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    // Try to fetch weather for a default city on load
    if (API_KEY) {
      fetchWeather('London');
    }
  }, []);

  const fetchWeather = async (searchCity: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(searchCity)}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Oops! City not found. Please recheck and try again.');
        }
        throw new Error('Oh! My bad... Failed to fetch weather data. Please try again later.');
      }

      const data = await response.json();
      setWeather(data);
      
      // Update search history
      setSearchHistory(prev => {
        const newHistory = [searchCity, ...prev.filter(c => c !== searchCity)].slice(0, 5);
        return newHistory;
      });
      
      setCity('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sorry! Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const handleRefresh = () => {
    if (weather) {
      setIsRefreshing(true);
      fetchWeather(weather.name);
    }
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 bg-cover bg-center bg-fixed ${
        isDarkMode ? 'bg-[#1a1a2e]' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
      }`}
      style={{
        backgroundImage: isDarkMode 
          ? 'url("https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&w=2000&q=80")'
          : 'url("https://images.unsplash.com/photo-1536152470836-b943b246224c?auto=format&fit=crop&w=2000&q=80")'
      }}
    >
      <div className="min-h-screen backdrop-blur-xl bg-white/30 dark:bg-black/30">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-2xl">
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-950 to-indigo-950 bg-clip-text text-transparent">
  Weathlytics
                </h1>


                <p className="text-sm text-gray-600 dark:text-gray-300">Know the Weather Before It Knows You.</p>
              </div>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isDarkMode ? 
                <Sun className="h-6 w-6 text-amber-400" /> : 
                <Moon className="h-6 w-6 text-gray-700" />
              }
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Curious about the forecast? Search for the city of your choice..."
                  className={`w-full pl-14 pr-4 py-5 rounded-2xl border-0 ${
                    isDarkMode 
                      ? 'bg-gray-800/50 text-white placeholder-gray-400' 
                      : 'bg-white/50 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg backdrop-blur-md`}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !city.trim()}
                className={`px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold 
                  hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed 
                  transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2`}
              >
                {loading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mb-8 p-6 rounded-2xl bg-red-50 border border-red-100 text-red-700 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-full">
                  <Compass className="h-5 w-5 text-red-500" />
                </div>
                {error}
              </div>
            </div>
          )}

          {weather && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <WeatherCard 
                  weather={weather} 
                  onRefresh={handleRefresh} 
                  isRefreshing={isRefreshing} 
                  isDarkMode={isDarkMode} 
                />
              </div>
              <div>
                <ForecastSection 
                  city={weather.name} 
                  isDarkMode={isDarkMode} 
                />
              </div>
            </div>
          )}

          {searchHistory.length > 0 && (
            <SearchHistory 
              history={searchHistory} 
              onSelect={fetchWeather} 
              isDarkMode={isDarkMode} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;