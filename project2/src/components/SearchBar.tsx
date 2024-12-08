import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { useBusinessStore } from '../store/businessStore';

const SearchBar: React.FC = () => {
  const setSelectedCity = useBusinessStore(state => state.setSelectedCity);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-md">
        <div className="flex-1 relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Dans quelle ville ?"
            className="w-full pl-12 pr-4 py-3 rounded-l-full border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setSelectedCity(e.target.value)}
          />
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors flex items-center">
          <Search className="h-5 w-5" />
          <span className="ml-2">Rechercher</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;