import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { SUPPLIERS } from '../data/mockData';
import { ShieldCheck, MapPin, Star, Building2, Phone, ArrowRightLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SupplierDetailsModal from '../components/SupplierDetailsModal';

const SuppliersPage = () => {
  const [filterCity, setFilterCity] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const cities = ['All', ...new Set(SUPPLIERS.map(s => s.location.split(',')[0]))];
  const categories = ['All', 'Float', 'Tempered', 'Laminated', 'Safety', 'Decorative', 'Solar', 'IGU'];

  const filteredSuppliers = SUPPLIERS.filter(s => {
    const cityMatch = filterCity === 'All' || s.location.includes(filterCity);
    const catMatch = filterCategory === 'All' || s.categories.some(c => c.includes(filterCategory));
    return cityMatch && catMatch;
  });

  const toggleCompare = (supplier) => {
    if (compareList.find(s => s.id === supplier.id)) {
      setCompareList(compareList.filter(s => s.id !== supplier.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, supplier]);
    }
  };

  return (
    <div className="bg-surface min-h-screen pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-text-primary tracking-tight">
              Verified <span className="text-accent">Suppliers</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Connect with India's leading glass manufacturers and processors. Filter by location and specialization.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md w-full md:w-auto">
            <div className="px-4 py-2 w-full sm:w-auto">
              <label className="block text-[10px] text-text-muted mb-1 uppercase tracking-wider font-black">City</label>
              <select 
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="bg-transparent text-text-primary focus:outline-none cursor-pointer w-full"
              >
                {cities.map(city => <option key={city} value={city} className="bg-surface">{city}</option>)}
              </select>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            <div className="px-4 py-2 w-full sm:w-auto">
              <label className="block text-[10px] text-text-muted mb-1 uppercase tracking-wider font-black">Category</label>
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent text-text-primary focus:outline-none cursor-pointer w-full"
              >
                {categories.map(cat => <option key={cat} value={cat} className="bg-surface">{cat}</option>)}
              </select>
            </div>
          </div>
        </div>

        {compareList.length > 0 && (
          <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 z-40">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-card px-4 md:px-6 py-4 flex items-center justify-between gap-4 md:gap-6 shadow-2xl border-accent/20"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {compareList.map(s => (
                    <div key={s.id} className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent text-primary font-bold flex items-center justify-center border-2 border-surface text-xs md:text-sm">
                      {s.name[0]}
                    </div>
                  ))}
                </div>
                <div className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-text-muted hidden sm:block">
                  {compareList.length} Selected
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsCompareModalOpen(true)}
                  disabled={compareList.length < 2}
                  className={`flex items-center gap-2 px-5 md:px-8 py-2 rounded-full font-bold transition-all text-xs md:text-sm ${compareList.length >= 2 ? 'bg-accent text-primary shadow-[0_0_20px_rgba(0,201,167,0.3)]' : 'bg-white/10 text-text-muted cursor-not-allowed'}`}
                >
                  <ArrowRightLeft size={16} />
                  <span className="hidden xs:inline">Compare</span>
                </button>
                <button onClick={() => setCompareList([])} className="text-text-muted hover:text-white text-[10px] uppercase font-bold tracking-widest px-2">Clear</button>
              </div>
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSuppliers.map((supplier) => (
            <motion.div 
              key={supplier.id}
              layout
              className="glass-card p-6 flex flex-col gap-4 group hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <Building2 className="text-text-muted group-hover:text-accent" size={24} />
                </div>
                {supplier.verified && (
                  <div className="flex items-center gap-1 bg-accent/20 text-accent text-xs font-bold px-2 py-1 rounded-full border border-accent/10">
                    <ShieldCheck size={14} /> VERIFIED
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">{supplier.name}</h3>
                <div className="flex items-center gap-1 text-text-muted text-sm">
                  <MapPin size={14} /> {supplier.location}
                </div>
              </div>

              <div className="flex items-center gap-4 py-2 border-y border-white/5">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  <span className="font-bold">{supplier.rating}</span>
                </div>
                <div className="text-text-muted text-sm italic">{supplier.yearsInBusiness} yrs in business</div>
              </div>

              <div className="flex flex-wrap gap-2">
                {supplier.categories.map(cat => (
                  <span key={cat} className="text-[10px] uppercase tracking-wider font-black bg-white/5 px-2 py-1 rounded text-text-muted">
                    {cat}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 flex items-center gap-3">
                <button 
                  onClick={() => { setSelectedSupplier(supplier); setIsDetailsOpen(true); }}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded-xl border border-white/5 transition-all text-sm"
                >
                  View Detail
                </button>
                <button 
                  onClick={() => toggleCompare(supplier)}
                  className={`p-2 rounded-xl border transition-all ${compareList.find(s => s.id === supplier.id) ? 'bg-accent border-accent text-primary' : 'bg-white/5 border-white/5 text-white hover:border-accent/50'}`}
                >
                  <ArrowRightLeft size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCompareModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-surface p-8 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight">Vendor <span className="text-accent">Comparison</span></h2>
                <button onClick={() => setIsCompareModalOpen(false)} className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
                  <Zap className="rotate-45" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto px-1">
                {compareList.map(s => (
                  <div key={s.id} className="glass-card p-6 border-white/10 bg-white/5 space-y-6">
                    <h3 className="text-xl font-bold border-b border-white/5 pb-2 text-accent">{s.name}</h3>
                    <div className="space-y-4">
                      {s.products.map(p => (
                        <div key={p.name} className="p-4 bg-black/20 rounded-2xl border border-white/5">
                          <div className="text-[10px] text-text-muted mb-1 uppercase tracking-widest font-black">{p.name}</div>
                          <div className="flex justify-between items-end">
                            <div className="text-2xl font-bold text-text-primary">₹{p.price}<span className="text-[10px] text-text-muted ml-1">/sq.ft</span></div>
                            <div className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-full font-bold">{p.delivery}d delivery</div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                        <div className="text-[10px] text-text-muted uppercase tracking-widest font-black">Min Order</div>
                        <div className="font-bold text-text-primary">{s.moq}</div>
                      </div>
                      <button className="w-full bg-accent text-primary font-black py-3 rounded-2xl hover:scale-[1.02] transition-transform text-xs uppercase tracking-widest">
                        Request Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <SupplierDetailsModal 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        supplier={selectedSupplier}
      />
    </div>
  );
};

export default SuppliersPage;
