import React from 'react';
import { Clock } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onSelect: (city: string) => void;
  isDarkMode: boolean;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect, isDarkMode }) => {
  return (
    <div className={`rounded-3xl p-8 backdrop-blur-md ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
    } shadow-xl`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl ${
          isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-100'
        }`}>
          <Clock className="h-5 w-5 text-indigo-500" />
        </div>
        <h3 className="text-xl font-bold">Your most recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {history.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className={`px-6 py-3 rounded-xl text-sm font-medium ${
              isDarkMode 
                ? 'bg-gray-700/50 hover:bg-gray-600/50 text-white' 
                : 'bg-white/50 hover:bg-gray-100/50 text-gray-800'
            } transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;