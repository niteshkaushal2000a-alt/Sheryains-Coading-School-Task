// src/components/filters/SortFilter.jsx
import React, { useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { MyProducts } from '../context/ProductsProvider';

const SortFilter = () => {
  const { filters, setSortBy } = useContext(MyProducts);

  // ✅ Sort options
  const sortOptions = [
    { value: 'featured', label: '✨ Featured' },
    { value: 'price-low', label: '💰 Price: Low to High' },
    { value: 'price-high', label: '💰 Price: High to Low' },
    { value: 'rating', label: '⭐ Top Rated' }
  ];

  return (
    <div className="relative">
      <select 
        value={filters.sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-[#1d1d1d] border border-white/10 rounded-xl px-4 py-2 pr-10 text-white appearance-none cursor-pointer hover:border-lime-400 transition outline-none focus:border-lime-400 min-w-[140px]"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
};

export default SortFilter;