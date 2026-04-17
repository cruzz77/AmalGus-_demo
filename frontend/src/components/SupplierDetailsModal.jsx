import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, Star, Building2, Phone, Mail, 
  Globe, ShieldCheck, Box, Clock, ShoppingCart, CheckCircle2
} from 'lucide-react';

const SupplierDetailsModal = ({ isOpen, onClose, supplier }) => {
  if (!supplier) return null;

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
            className="relative w-full max-w-4xl bg-surface rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left Header Highlight */}
            <div className="w-full md:w-[320px] bg-white/5 p-8 border-b md:border-b-0 md:border-r border-white/5 space-y-8 flex flex-col h-full">
              <div className="aspect-square bg-accent/10 rounded-3xl border-2 border-accent/20 flex flex-col items-center justify-center p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-accent/10 to-transparent" />
                <div className="bg-white/10 p-4 rounded-full mb-4 z-10 transition-transform group-hover:scale-110">
                   <Building2 className="text-accent" size={48} />
                </div>
                <div className="flex items-center gap-1.5 z-10">
                   {[1, 2, 3, 4, 5].map(i => (
                     <Star 
                       key={i} 
                       size={14} 
                       className={i <= Math.floor(supplier.rating) ? "text-yellow-500 fill-yellow-500" : "text-white/10"} 
                     />
                   ))}
                   <span className="text-sm font-bold ml-1">{supplier.rating}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Verification Status</h5>
                  <div className={`flex items-center gap-3 p-3 rounded-2xl border ${supplier.verified ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-white/5 border-white/5 text-text-muted'}`}>
                    <ShieldCheck size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">{supplier.verified ? 'Verified Partner' : 'Standard Vendor'}</span>
                  </div>
                </div>

                <div className="space-y-4">
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Business Stats</h5>
                   <div className="grid grid-cols-1 gap-3">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                        <span className="text-xs text-text-muted">Experience</span>
                        <span className="text-sm font-bold text-text-primary">{supplier.yearsInBusiness} Years</span>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex items-center justify-between">
                        <span className="text-xs text-text-muted">MOQ</span>
                        <span className="text-sm font-bold text-text-primary uppercase tracking-tight">{supplier.moq || 'Variable'}</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Main Content */}
            <div className="flex-1 p-8 md:p-10 space-y-10 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold tracking-tight text-text-primary leading-tight">
                      {supplier.name}
                    </h3>
                    <div className="flex items-center gap-2 text-text-muted">
                      <MapPin size={18} className="text-accent" />
                      <span className="text-lg">{supplier.location}</span>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors text-text-muted">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                   {supplier.categories?.map(cat => (
                     <span key={cat} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-text-muted uppercase tracking-wider">
                       {cat}
                     </span>
                   ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-accent/40" /> Product Highlights
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {supplier.products?.map((prod, index) => (
                    <div key={index} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-accent/20 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                          <Box size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-text-primary transition-colors group-hover:text-accent">{prod.name}</div>
                          <div className="text-xs text-text-muted flex items-center gap-2">
                            <Clock size={12} /> {prod.delivery} Days Lead Time
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-white">₹{prod.price}<span className="text-[10px] text-text-muted ml-0.5">/sq.ft</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  className="flex-1 bg-accent text-primary font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,201,167,0.4)] transition-all uppercase tracking-widest text-xs"
                >
                  <ShoppingCart size={18} /> Request Complete Catalog
                </button>
                <div className="flex gap-2">
                  <button className="p-4 rounded-2xl bg-white/5 border border-white/5 text-text-muted hover:text-white transition-all">
                    <Phone size={18} />
                  </button>
                  <button className="p-4 rounded-2xl bg-white/5 border border-white/5 text-text-muted hover:text-white transition-all">
                    <Mail size={18} />
                  </button>
                  <button className="p-4 rounded-2xl bg-white/5 border border-white/5 text-text-muted hover:text-white transition-all">
                    <Globe size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SupplierDetailsModal;
