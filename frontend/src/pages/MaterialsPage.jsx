import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { DAILY_RATES, ALLIED_CATEGORIES, SERVICE_PARTNERS } from '../data/mockData';
import { PRODUCTS } from '../data/products';
import { 
  TrendingUp, TrendingDown, Minus, RefreshCcw, 
  Settings, Droplet, Maximize, Layout, Bath, Grid, Square, Palette,
  UserCheck, MapPin, Star, Phone, X, Package, Ruler, Factory
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap = {
  Settings, Droplet, Maximize, Layout, Bath, Grid, Square, Palette
};

// Map Allied Categories to Product Categories
const ALLIED_TO_PRODUCT_MAP = {
  'cat1': 'Glass Hardware',
  'cat3': 'Aluminium Hardware',
  'cat7': 'Mirror',
  'cat8': 'Decorative Glass'
};

const ProductPreviewModal = ({ isOpen, onClose, category }) => {
  if (!category) return null;

  const productCategory = ALLIED_TO_PRODUCT_MAP[category.id];
  const relatedProducts = PRODUCTS.filter(p => p.category === productCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-surface rounded-[32px] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                   {React.createElement(iconMap[category.icon] || Settings, { size: 24 })}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary capitalize">{category.name}</h2>
                  <p className="text-xs text-text-muted">Viewing products for your project requirements</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/5 text-text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              {relatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedProducts.map(product => (
                    <div key={product._id} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-accent/30 transition-all flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{product._id}</span>
                          <span className="bg-accent/10 text-accent px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">In Stock</span>
                        </div>
                        <h4 className="font-bold text-text-primary">{product.name}</h4>
                        <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">{product.description}</p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                           {(product.tags || []).slice(0, 3).map(tag => (
                             <span key={tag} className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-text-muted capitalize">#{tag}</span>
                           ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="text-lg font-bold text-accent">
                          {product.pricePerUnit ? `₹${product.pricePerUnit?.toLocaleString()}` : 'Contact for Quote'}
                        </div>
                        <button className="bg-white/5 hover:bg-accent hover:text-primary px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/10 hover:border-accent">
                          View Specs
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white/5 rounded-[32px] border border-dashed border-white/10">
                  <Package size={48} className="text-text-muted mx-auto mb-4 opacity-50" />
                  <h4 className="font-bold text-text-primary mb-2">Technical Specs Loading...</h4>
                  <p className="text-sm text-text-muted max-w-xs mx-auto">Our database is currently updating for this specific hardware category. Please contact support for instant quotations.</p>
                </div>
              )}
            </div>
            
            <div className="p-8 bg-white/5 border-t border-white/5 flex gap-4">
               <button onClick={onClose} className="w-full bg-accent text-primary font-black py-4 rounded-2xl uppercase tracking-widest text-xs">Close Catalogue</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const MaterialsPage = () => {
  const [searchParams] = useSearchParams();
  const [filterCity, setFilterCity] = useState('All');
  const [lastUpdated, setLastUpdated] = useState('Today, 9:00 AM IST');
  
  // Modal State
  const [selectedAlliedCat, setSelectedAlliedCat] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const categoryId = searchParams.get('category');
    if (categoryId) {
      const category = ALLIED_CATEGORIES.find(c => c.id === categoryId);
      if (category) {
        setSelectedAlliedCat(category);
        setIsPreviewOpen(true);
      }
    }
  }, [searchParams]);

  const cities = ['All', ...new Set(SERVICE_PARTNERS.map(p => p.city))];
  
  const filteredPartners = SERVICE_PARTNERS.filter(p => {
    return filterCity === 'All' || p.city === filterCity;
  });

  const refreshRates = () => {
    const now = new Date();
    setLastUpdated(`Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'} IST`);
  };

  const handleViewProducts = (cat) => {
    setSelectedAlliedCat(cat);
    setIsPreviewOpen(true);
  };

  return (
    <div className="bg-surface min-h-screen pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 space-y-24">
        
        {/* Section 1: Daily Rates Dashboard */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary flex items-center gap-3">
                <TrendingUp className="text-accent" /> Daily Glass Rates
              </h2>
              <p className="text-text-muted">Live-style market rates for architectural glass across India.</p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/10 text-sm">
              <span className="text-text-muted">Last updated: <span className="text-accent font-mono">{lastUpdated}</span></span>
              <button 
                onClick={refreshRates}
                className="hover:rotate-180 transition-transform duration-500 text-text-muted hover:text-accent"
              >
                <RefreshCcw size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {DAILY_RATES.map((rate, idx) => (
              <motion.div 
                key={rate.item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-black/40 border border-white/5 p-4 rounded-2xl hover:border-accent/30 transition-all group"
              >
                <div className="text-[10px] text-text-muted uppercase tracking-widest font-bold mb-3">{rate.item}</div>
                <div className="text-xl font-bold text-text-primary mb-2">₹{rate.rate}</div>
                <div className={`flex items-center gap-1 text-xs font-bold ${rate.status === 'up' ? 'text-green-500' : rate.status === 'down' ? 'text-red-500' : 'text-text-muted'}`}>
                  {rate.status === 'up' && <TrendingUp size={12} />}
                  {rate.status === 'down' && <TrendingDown size={12} />}
                  {rate.status === 'neutral' && <Minus size={12} />}
                  {Math.abs(rate.change)}%
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: Allied Products */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-text-primary">Allied Products <span className="text-accent">&</span> Materials</h2>
            <p className="text-text-muted max-w-2xl mx-auto">Everything you need for a complete glass system, from structural hardware to finishing sealants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALLIED_CATEGORIES.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <div key={cat.id} className="glass-card p-8 group hover:border-accent/50 transition-all duration-300">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent text-accent group-hover:text-primary transition-all">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3">{cat.name}</h3>
                  <p className="text-sm text-text-muted mb-6 leading-relaxed">{cat.desc}</p>
                  <button 
                    onClick={() => handleViewProducts(cat)}
                    className="text-accent font-bold text-sm flex items-center gap-2 group/btn"
                  >
                    View Products <RefreshCcw className="translate-x-0 group-hover/btn:translate-x-1 transition-transform" size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Service Partners */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-text-primary">Trusted <span className="text-accent">Service Partners</span></h2>
              <p className="text-text-muted">Specialized professionals for measurements, installation, and maintenance.</p>
            </div>
            
            <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex">
              {cities.map(city => (
                <button 
                  key={city}
                  onClick={() => setFilterCity(city)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filterCity === city ? 'bg-accent text-primary' : 'text-text-muted hover:text-text-primary'}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <div key={partner.id} className="glass-card p-6 flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <UserCheck size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-text-primary">{partner.name}</h4>
                    {partner.verified && <div className="text-accent"><UserCheck size={16} /></div>}
                  </div>
                  <div className="text-accent text-xs font-bold mb-3">{partner.type}</div>
                  <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
                    <div className="flex items-center gap-1"><MapPin size={14} /> {partner.city}</div>
                    <div className="flex items-center gap-1"><Star className="text-yellow-500 fill-yellow-500" size={12} /> {partner.rating}</div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm font-bold">
                    <Phone size={14} /> Contact Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Product Preview Modal */}
      <ProductPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        category={selectedAlliedCat}
      />
    </div>
  );
};

export default MaterialsPage;
