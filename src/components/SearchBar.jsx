import React, { useContext, useState } from 'react';
import { Search, X } from 'lucide-react';
import { MyProducts } from '../context/ProductsProvider';

const SearchBar = () => {
  const { setSearchQuery } = useContext(MyProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    setSearchQuery(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 w-full md:w-auto">
      <Search size={20} className="text-gray-500" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-transparent border-none outline-none text-white placeholder:text-gray-500 w-full md:w-64"
      />
      {searchTerm && (
        <button 
          onClick={clearSearch}
          className="text-gray-500 hover:text-white"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;