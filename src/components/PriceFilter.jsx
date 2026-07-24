import React, { useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { MyProducts } from '../context/ProductsProvider';

const PriceFilter = () => {
  const { filters, setPriceRange } = useContext(MyProducts);

  // ✅ Convert priceRange array to string for select
  const getPriceValue = () => {
    const [min, max] = filters.priceRange || [0, 1000];
    if (min === 0 && max === 1000) return 'all';
    if (min === 0 && max === 50) return '0-50';
    if (min === 50 && max === 100) return '50-100';
    if (min === 100 && max === 200) return '100-200';
    if (min === 200) return '200+';
    return 'all';
  };

  // ✅ Price options
  const priceOptions = [
    { value: 'all', label: '💰 All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ];

  return (
    <div className="relative">
      <select 
        value={getPriceValue()}
        onChange={(e) => setPriceRange(e.target.value)}
        className="bg-[#1d1d1d] border border-white/10 rounded-xl px-4 py-2 pr-10 text-white appearance-none cursor-pointer hover:border-lime-400 transition outline-none focus:border-lime-400 min-w-[130px]"
      >
        {priceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
};

export default PriceFilter;