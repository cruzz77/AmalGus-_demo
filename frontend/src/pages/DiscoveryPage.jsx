import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import MatchResults from '../components/MatchResults';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import QuoteModal from '../components/QuoteModal';
import AuthModal from '../components/AuthModal';
import ProductDetailsModal from '../components/ProductDetailsModal';

const INTENTS = {
  ACOUSTIC: {
    keywords: ['sound', 'noise', 'quiet', 'acoustic', 'partition', 'soundproof', 'office', 'conference'],
    categories: ['Insulated Glass Unit', 'Laminated Glass'],
    tags: ['acoustic', 'partition', 'PVB'],
    minThickness: 8,
    weight: 1.5,
    advice: "For high acoustic insulation, consider Laminated Glass with PVB interlayer or Insulated Glass Units (IGU)."
  },
  THERMAL: {
    keywords: ['heat', 'energy', 'insulation', 'sun', 'solar', 'uv', 'leed', 'low-e', 'cool', 'winter', 'summer'],
    categories: ['Insulated Glass Unit'],
    tags: ['low-e', 'energy efficient', 'solar control', 'IGU'],
    weight: 1.4,
    advice: "Low-E coated Insulated Glass Units significantly reduce heat transfer and UV damage."
  },
  SAFETY: {
    keywords: ['balcony', 'railing', 'stair', 'skylight', 'roof', 'safety', 'fall', 'rail', 'pool', 'fence'],
    categories: ['Laminated Glass'],
    tags: ['safety', 'SGP', 'PVB', 'railing', 'balcony'],
    minThickness: 8,
    weight: 1.6,
    advice: "Safety-critical areas like railings and skylights must use Laminated Glass to ensure the glass stays in place if broken."
  },
  STRUCTURAL: {
    keywords: ['facade', 'structural', 'heavy', 'canopy', 'structural glazing', 'spider', 'fitting'],
    categories: ['Tempered Glass', 'Laminated Glass'],
    tags: ['structural', 'heavy duty', 'facade'],
    minThickness: 10,
    weight: 1.3,
    advice: "Structural applications require thicker tempered glass (10mm+) or SGP-laminated units for maximum strength."
  },
  PRIVACY: {
    keywords: ['bathroom', 'shower', 'toilet', 'frosted', 'obscure', 'privacy', 'partition'],
    categories: ['Decorative Glass', 'Mirror', 'Tempered Glass'],
    tags: ['frosted', 'privacy', 'bathroom'],
    weight: 1.2,
    advice: "Frosted or acid-etched glass provides privacy while maintaining natural light transmission."
  }
};

function clientSideMatch(query, products, filters) {
  const q = query.toLowerCase();
  
  // 1. Intent Detection
  const detectedIntents = Object.entries(INTENTS).filter(([key, intent]) => 
    intent.keywords.some(kw => q.includes(kw))
  );

  // 1.5 Apply Hard Filters first to save processing
  const preFiltered = products.filter(p => {
    if (filters.category !== 'All' && p.category !== filters.category) return false;
    if (p.thickness && p.thickness > filters.thickness) return false;
    const price = p.pricePerSqm || p.pricePerUnit || 0;
    if (price > filters.maxPrice) return false;
    return true;
  });

  return preFiltered.map(product => {
    let score = 0;
    const matchedReasons = [];
    const productText = `${product.name} ${product.category} ${product.description} ${(product.tags || []).join(' ')}`.toLowerCase();

    // 2. Intent-based Scoring
    detectedIntents.forEach(([key, intent]) => {
      // Category Match
      if (intent.categories.includes(product.category)) {
        score += 35 * intent.weight;
        matchedReasons.push(`Optimal category for ${key.toLowerCase()}`);
      }
      
      // Tag/Description Match
      if (intent.tags.some(t => productText.includes(t.toLowerCase()))) {
        score += 15;
      }

      // Special Logic for thickness
      if (intent.minThickness && product.thickness && product.thickness < intent.minThickness) {
        score -= 20; // Penalize if too thin for safety/structural
      }
    });

    // 3. Specific Parameter Parsing
    const thicknessMatch = q.match(/(\d+)\s*mm/);
    if (thicknessMatch) {
      const targetT = parseInt(thicknessMatch[1]);
      if (product.thickness === targetT) {
        score += 30;
        matchedReasons.push(`Exact ${targetT}mm match`);
      } else if (Math.abs(product.thickness - targetT) <= 2) {
        score += 10;
      }
    }

    // 4. Keyword Fallback (TF-IDF Lite)
    const keywords = q.split(/\s+/).filter(kw => kw.length > 3);
    keywords.forEach(kw => {
      if (productText.includes(kw)) score += 5;
    });

    // 5. Normalization
    const finalScore = Math.min(Math.round(score), 99);

    // 6. Explanation Generation
    let explanation = "";
    if (detectedIntents.length > 0) {
      const primaryIntent = detectedIntents[0][1];
      explanation = `${primaryIntent.advice} ${product.name} is a strong candidate because it matches your requirement for ${detectedIntents.map(i => i[0].toLowerCase()).join(' & ')}.`;
    } else {
      explanation = `Based on technical specs, this ${product.category} is a ${finalScore > 70 ? 'high' : 'medium'} confidence match for your requirement.`;
    }

    return {
      product,
      matchScore: finalScore,
      explanation,
      matchedAttributes: matchedReasons.slice(0, 3)
    };
  })
  .filter(r => r.matchScore > 20)
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 6);
}

const DiscoveryPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState(PRODUCTS);
  const [filteredAllProducts, setFilteredAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [detectedIntents, setDetectedIntents] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    thickness: 25,
    maxPrice: 5000
  });

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (e) {
    console.error('Error parsing user data:', e);
  }

  const handleQuoteRequest = (product) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setSelectedProduct(product);
    setIsQuoteOpen(true);
  };

  const handleViewDetails = (product) => {
    setSelectedProductDetails(product);
    setIsDetailsOpen(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const response = await axios.get(`${baseUrl}/api/products`);
        if (response.data && response.data.length > 0) {
          setAllProducts(response.data);
        }
      } catch (error) {
        console.warn('Could not fetch products from API, using fallback data.', error);
      }
    };
    fetchProducts();
  }, []);

  // AUTO-UPDATE LOGIC: Hook into filters and products
  useEffect(() => {
    // 1. Update the "All Products" list based on filters
    const filtered = allProducts.filter(p => {
      if (filters.category !== 'All' && p.category !== filters.category) return false;
      if (p.thickness && p.thickness > filters.thickness) return false;
      const price = p.pricePerSqm || p.pricePerUnit || 0;
      if (price > filters.maxPrice) return false;
      return true;
    });
    setFilteredAllProducts(filtered);

    // 2. Re-run search matching if query exists
    if (query.trim()) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [filters, allProducts]);

  const handleSearch = async () => {
    if (!query.trim()) {
       setResults([]);
       return;
    }
    
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await axios.post(`${baseUrl}/api/match`, {
        query,
        filters
      });
      setResults(response.data.results);
      setDetectedIntents(Object.entries(INTENTS).filter(([k, i]) => query.toLowerCase().includes(k.toLowerCase())));
    } catch (error) {
      console.warn('AI Search failed, using client-side matching:', error);
      const q = query.toLowerCase();
      const intents = Object.entries(INTENTS).filter(([key, intent]) => 
        intent.keywords.some(kw => q.includes(kw))
      );
      setDetectedIntents(intents);
      const clientResults = clientSideMatch(query, allProducts, filters);
      setResults(clientResults);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'All',
      thickness: 25,
      maxPrice: 5000
    });
    setDetectedIntents([]);
  };

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col gap-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-text-primary tracking-tight">
              Intelligent <span className="text-accent">Discovery</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl">
              Describe your project requirements below. Our AI analyzes thousands of data points to find your perfect glass match.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters} 
                onClear={handleClearFilters}
              />
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden w-full sticky top-[72px] z-30 py-2 bg-surface/80 backdrop-blur-md -mx-6 px-6 border-b border-white/5">
               <button 
                onClick={() => setIsFilterDrawerOpen(true)}
                 className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 text-sm font-bold text-accent active:scale-95 transition-all"
               >
                 <Filter size={16} /> Filter & Sort Results
               </button>
            </div>

            <div className="flex-1 w-full space-y-12 lg:space-y-16">
              <SearchBar 
                query={query} 
                setQuery={setQuery} 
                onSearch={handleSearch} 
                isLoading={isLoading} 
              />

              {results.length > 0 && (
                <div className="space-y-8">
                  <MatchResults 
                    results={results} 
                    isLoading={isLoading} 
                    query={query}
                    detectedIntents={detectedIntents}
                    onQuote={handleQuoteRequest}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              )}

              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-text-primary">
                    {query ? 'Other' : 'All'} Products <span className="text-text-muted font-normal text-lg ml-2">({filteredAllProducts?.length || 0})</span>
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(filteredAllProducts || []).map((product) => product && (
                    <ProductCard 
                      key={product._id} 
                      result={{ 
                        product, 
                        matchScore: 0, 
                        explanation: '', 
                        matchedAttributes: [] 
                      }} 
                      isSimple={true} 
                      onQuote={handleQuoteRequest}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>

                {filteredAllProducts.length === 0 && (
                   <div className="text-center py-20 bg-white/5 rounded-[32px] border border-dashed border-white/10">
                    <div className="text-text-muted mb-4 uppercase tracking-widest font-bold">No products match filters</div>
                    <p className="text-text-muted max-w-xs mx-auto text-sm">Try broadening your specification ranges in the filter panel.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={() => setIsQuoteOpen(false)} 
        product={selectedProduct} 
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />

      <ProductDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        product={selectedProductDetails}
        onQuote={handleQuoteRequest}
      />

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 h-[70vh] bg-surface rounded-t-[40px] border-t border-white/10 z-[80] lg:hidden overflow-hidden flex flex-col"
            >
               <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Filter size={20} className="text-accent" /> Filter Products
                </h3>
                <button                   onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 bg-white/5 rounded-full text-text-muted"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <FilterPanel 
                  filters={filters} 
                  setFilters={setFilters} 
                  onClear={handleClearFilters}
                  isMobile={true}
                />
              </div>
              <div className="p-8 pt-4 border-t border-white/5">
                 <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-accent text-primary font-black py-4 rounded-2xl uppercase tracking-widest text-xs"
                 >
                   Apply Filters
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoveryPage;

