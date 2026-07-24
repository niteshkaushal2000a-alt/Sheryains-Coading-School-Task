import React, { useContext, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { MyProducts } from '../context/ProductsProvider';
import { useSearchParams } from 'react-router';

const CategoryFilter = () => {
  const { productsData, filters, setCategoriesFilter } = useContext(MyProducts);
  const categories = ['All Categories', ...new Set(productsData.map(p => p.category))];

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const category = searchParams.get("category");

    if (category) {
      setCategoriesFilter(category);
    } else {
      setCategoriesFilter("all");
    }
  }, [searchParams]);

  return (
    <div className="relative">
      <select
        value={filters.category}
        onChange={(e) => setCategoriesFilter(e.target.value)}
        className="bg-[#1d1d1d] border border-white/10 rounded-xl px-4 py-2 pr-10 text-white appearance-none cursor-pointer hover:border-lime-400 transition outline-none focus:border-lime-400 min-w-[160px]"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === 'All Categories' ? '📦 All Categories' : cat}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
};

export default CategoryFilter;