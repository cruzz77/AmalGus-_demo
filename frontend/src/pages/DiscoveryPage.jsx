import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import MatchResults from '../components/MatchResults';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { motion } from 'framer-motion';

function clientSideMatch(query, products) {
  const q = query.toLowerCase();
  const keywords = q.split(/\s+/);
  
  return products.map(product => {
    let score = 0;
    const matchedAttributes = [];
    const productText = [
      product.name, product.category, product.description,
      product.color, product.coating, product.edgeFinish,
      product.certification, ...(product.tags || [])
    ].join(' ').toLowerCase();

    const thicknessMatch = q.match(/(\d+)\s*mm/);
    if (thicknessMatch && product.thickness) {
      const queryThickness = parseInt(thicknessMatch[1]);
      if (product.thickness === queryThickness) { score += 30; matchedAttributes.push(`${product.thickness}mm thickness`); }
      else if (Math.abs(product.thickness - queryThickness) <= 1) { score += 15; }
    }

    const categoryMap = {
      'tempered': 'Tempered Glass', 'toughened': 'Tempered Glass',
      'laminated': 'Laminated Glass', 'safety glass': 'Laminated Glass',
      'insulated': 'Insulated Glass Unit', 'igd': 'Insulated Glass Unit', 'double glazed': 'Insulated Glass Unit',
      'float': 'Float Glass', 'mirror': 'Mirror',
      'frosted': 'Decorative Glass', 'decorative': 'Decorative Glass',
      'hardware': 'Aluminium Hardware', 'aluminium': 'Aluminium Hardware',
      'spider': 'Glass Hardware', 'fitting': 'Glass Hardware'
    };
    for (const [kw, cat] of Object.entries(categoryMap)) {
      if (q.includes(kw) && product.category === cat) { score += 25; matchedAttributes.push(product.category); break; }
    }

    keywords.forEach(kw => {
      if (kw.length < 3) return;
      if (productText.includes(kw)) { score += 5; }
    });

    const useCases = ['partition', 'balcony', 'railing', 'window', 'facade', 'skylight', 'floor', 'roof', 'bathroom', 'office', 'residential', 'commercial', 'structural', 'canopy'];
    useCases.forEach(uc => {
      if (q.includes(uc) && productText.includes(uc)) { score += 10; matchedAttributes.push(uc); }
    });

    if (q.includes('polished') && product.edgeFinish?.toLowerCase().includes('polished')) { score += 10; matchedAttributes.push('Polished edge'); }
    if ((q.includes('uv') || q.includes('uv protect')) && product.coating?.toLowerCase().includes('uv')) { score += 15; matchedAttributes.push('UV protection'); }
    if ((q.includes('low-e') || q.includes('energy efficient') || q.includes('leed')) && product.coating?.toLowerCase().includes('low-e')) { score += 20; matchedAttributes.push('Low-E coating'); }
    if ((q.includes('budget') || q.includes('affordable') || q.includes('cheap')) && product.pricePerSqm < 500) { score += 20; matchedAttributes.push('Budget-friendly'); }
    if ((q.includes('clear') || q.includes('transparent')) && product.color?.toLowerCase() === 'clear') { score += 8; matchedAttributes.push('Clear glass'); }
    if (q.includes('5+12+5') && product.name.includes('5+12+5')) { score += 40; matchedAttributes.push('5+12+5 configuration'); }
    if (q.includes('frosted') && product.color?.toLowerCase().includes('frosted')) { score += 20; matchedAttributes.push('Frosted finish'); }

    const explanation = score > 30
      ? `Matches your requirement for ${matchedAttributes.slice(0,3).join(', ')}. ${product.description.slice(0, 80)}...`
      : `Partial match — ${product.category} available from ${product.supplier}.`;

    return {
      product,
      matchScore: Math.min(score, 98),
      explanation,
      matchedAttributes: [...new Set(matchedAttributes)]
    };
  })
  .filter(r => r.matchScore > 5)
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 5);
}

const DiscoveryPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState(PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    thickness: 25,
    maxPrice: 5000
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
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

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${baseUrl}/api/match`, {
        query,
        filters
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('AI Search failed, falling back to client-side matching:', error);
      const clientResults = clientSideMatch(query, allProducts);
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

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <FilterPanel 
              filters={filters} 
              setFilters={setFilters} 
              onClear={handleClearFilters}
            />

            <div className="flex-1 space-y-16">
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
                  />
                </div>
              )}

              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-text-primary">
                    All Products <span className="text-text-muted font-normal text-lg ml-2">({allProducts.length})</span>
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProducts.map((product) => (
                    <ProductCard 
                      key={product._id} 
                      result={{ 
                        product, 
                        matchScore: 0, 
                        explanation: '', 
                        matchedAttributes: [] 
                      }} 
                      isSimple={true} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiscoveryPage;

