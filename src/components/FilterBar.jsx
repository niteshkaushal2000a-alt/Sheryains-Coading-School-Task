// src/components/filters/FilterBar.jsx
import React, { useContext } from 'react';
import { Filter, X, Grid3x3, LayoutList } from 'lucide-react';
import { MyProducts } from '../context/ProductsProvider';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import PriceFilter from './PriceFilter';
import SearchBar from './SearchBar';

const FilterBar = () => {
  const { clearFilters } = useContext(MyProducts);

  return (
    <section className="border-t border-white/5 bg-[#0f0f0f] sticky top-20 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <CategoryFilter />
          <SortFilter />
          <PriceFilter />
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3 ml-auto">
 
            <div className="flex bg-[#1d1d1d] border border-white/10 rounded-xl overflow-hidden">
              <button className="p-2 bg-lime-400 text-black transition">
                <Grid3x3 size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-white transition">
                <LayoutList size={18} />
              </button>
            </div>

            {/* Filter Button */}
            <button className="bg-[#1d1d1d] border border-white/10 rounded-xl px-4 py-2 text-gray-400 hover:text-white transition flex items-center gap-2">
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
            </button>

            {/* ✅ Clear Filters Button */}
            <button 
              onClick={clearFilters}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl transition flex items-center gap-2"
            >
              <X size={16} />
              <span className="hidden sm:inline">Clear</span>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;