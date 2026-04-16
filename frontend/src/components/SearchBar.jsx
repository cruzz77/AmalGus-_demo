import React from 'react';
import { Search, Sparkles } from 'lucide-react';

const SearchBar = ({ query, setQuery, onSearch, isLoading }) => {
  const exampleQueries = [
    "6mm tempered glass for office partition, polished edges",
    "Laminated safety glass for balcony railing, UV protected",
    "Energy-efficient insulated glass 5+12+5, 2m height"
  ];

  return (
    <div className="w-full space-y-4">
      <div className="relative glass-card bg-surface/40 p-1">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe what you need in detail... e.g. 'I need 8mm clear tempered glass for sliding doors, 2400x1200mm, with CNC drilling...'"
          className="w-full min-h-[140px] bg-transparent border-none focus:ring-0 text-text-primary placeholder:text-text-muted p-6 text-lg resize-none"
        />
        <div className="absolute bottom-4 right-4 translate-y-2">
           <button
             onClick={onSearch}
             disabled={isLoading || !query.trim()}
             className="bg-accent text-primary px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#00e6c0] transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(0,201,167,0.2)]"
           >
             {isLoading ? (
               <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
             ) : (
               <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
             )}
             Find Best Matches
           </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-text-muted mr-2">Try:</span>
        {exampleQueries.map((q, i) => (
          <button
            key={i}
            onClick={() => setQuery(q)}
            className="text-xs px-4 py-2 rounded-full glass-pill hover:bg-white/10 transition-colors text-text-muted hover:text-text-primary border border-white/5"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
