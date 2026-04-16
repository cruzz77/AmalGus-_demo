import React from 'react';
import { Filter, X } from 'lucide-react';

const FilterPanel = ({ filters, setFilters, onClear }) => {
  const categories = [
    'All', 'Tempered Glass', 'Laminated Glass', 'Insulated Glass Unit', 
    'Float Glass', 'Mirror', 'Decorative Glass', 'Aluminium Hardware', 'Glass Hardware'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-[280px] space-y-8 sticky top-28 h-fit">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-text-primary font-bold text-xl uppercase tracking-wider">
          <Filter size={20} className="text-accent" />
          Filters
        </div>
        <button 
          onClick={onClear}
          className="text-xs text-text-muted hover:text-accent flex items-center gap-1 transition-colors"
        >
          <X size={14} /> Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Category */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-text-muted">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none appearance-none cursor-pointer"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Thickness */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-semibold text-text-muted">Max Thickness</label>
            <span className="text-accent font-bold">{filters.thickness}mm</span>
          </div>
          <input
            type="range"
            name="thickness"
            min="2"
            max="25"
            step="0.1"
            value={filters.thickness}
            onChange={handleChange}
            className="w-full accent-accent bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer"
          />
        </div>

        {/* Price */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-semibold text-text-muted">Max Price (₹)</label>
            <span className="text-accent font-bold">₹{filters.maxPrice}</span>
          </div>
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="5000"
            step="100"
            value={filters.maxPrice}
            onChange={handleChange}
            className="w-full accent-accent bg-white/10 h-1.5 rounded-full appearance-none cursor-pointer"
          />
        </div>

        <div className="pt-4">
          <div className="p-4 rounded-2xl bg-highlight/10 border border-highlight/20">
             <p className="text-xs text-text-muted leading-relaxed italic">
               * AI matching will prioritize products within these ranges but may suggest close alternatives if they better fit your description.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
