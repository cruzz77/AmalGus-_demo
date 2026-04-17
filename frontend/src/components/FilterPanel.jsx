import React from 'react';
import { Filter, X } from 'lucide-react';

const FilterPanel = ({ filters, setFilters, onClear, isMobile = false }) => {
  const categories = [
    'All', 'Tempered Glass', 'Laminated Glass', 'Insulated Glass Unit', 
    'Float Glass', 'Mirror', 'Decorative Glass', 'Aluminium Hardware', 'Glass Hardware'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'w-[280px] sticky top-28'} space-y-8 h-fit`}>
      {!isMobile && (
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
      )}

      <div className="space-y-6">
        {/* Category */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-text-muted uppercase tracking-widest text-[10px]">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:border-accent focus:ring-1 focus:ring-accent outline-none appearance-none cursor-pointer"
          >
            {categories.map(c => <option key={c} value={c} className="bg-surface">{c}</option>)}
          </select>
        </div>

        {/* Thickness */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-sm font-semibold text-text-muted uppercase tracking-widest text-[10px]">Max Thickness</label>
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
            <label className="text-sm font-semibold text-text-muted uppercase tracking-widest text-[10px]">Max Price (₹)</label>
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
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
             <p className="text-[10px] text-text-muted leading-relaxed italic">
               * AI matching will prioritize products within these ranges but may suggest close alternatives if they better fit your description.
             </p>
          </div>
          {isMobile && (
             <button 
                onClick={onClear}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-xs font-bold text-text-muted hover:text-white transition-all uppercase tracking-widest"
             >
                <X size={14} /> Reset all filters
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Expose icons for parent components
FilterPanel.Icon = Filter;
FilterPanel.CloseIcon = X;

export default FilterPanel;
