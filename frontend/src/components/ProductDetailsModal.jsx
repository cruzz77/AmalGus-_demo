import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Info, Ruler, Palette, ShieldCheck, Factory, 
  Tag, Download, CheckCircle2, ShoppingCart, ArrowRight 
} from 'lucide-react';

const ProductDetailsModal = ({ isOpen, onClose, product, onQuote }) => {
  if (!product) return null;

  const technicalSpecs = [
    { label: 'Thickness', value: product.thickness ? `${product.thickness}mm` : 'N/A', icon: <Ruler size={16} /> },
    { label: 'Standard Size', value: product.size || 'Custom', icon: <Ruler size={16} className="rotate-90" /> },
    { label: 'Glass Color', value: product.color || 'Clear', icon: <Palette size={16} /> },
    { label: 'Technical Coating', value: product.coating || 'None', icon: <Info size={16} /> },
    { label: 'Certification', value: product.certification || 'Global Standard', icon: <ShieldCheck size={16} /> },
    { label: 'Edge Finish', value: product.edgeFinish || 'Standard', icon: <Info size={16} /> },
  ];

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
            {/* Left Column: Visual & Categories */}
            <div className="w-full md:w-[320px] bg-white/5 p-8 border-b md:border-b-0 md:border-r border-white/5 space-y-8 flex flex-col">
              <div className="aspect-[4/5] bg-accent/10 rounded-3xl border-2 border-accent/20 flex flex-col items-center justify-center p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-accent/10 to-transparent" />
                <div className="bg-white/10 p-4 rounded-full mb-4">
                   <Info className="text-accent" size={40} />
                </div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-accent text-center">{product.category}</h4>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Supplier Details</h5>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                      {product.supplier?.[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-text-primary">{product.supplier}</div>
                      <div className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                        <CheckCircle2 size={10} /> Verified Manufacturer
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Supply Details</h5>
                   <div className="grid grid-cols-1 gap-3">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className="text-[10px] text-text-muted font-bold uppercase mb-1">Min Order Qty</div>
                        <div className="text-sm font-bold text-text-primary">{product.minOrder || '10 sqm'}</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className="text-[10px] text-text-muted font-bold uppercase mb-1">Lead Time</div>
                        <div className="text-sm font-bold text-text-primary">5-7 Business Days</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Column: Descriptions & Detailed Specs */}
            <div className="flex-1 p-8 md:p-10 space-y-10 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold tracking-tight text-text-primary capitalize leading-tight max-w-[80%]">
                    {product.name}
                  </h3>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors text-text-muted">
                    <X size={24} />
                  </button>
                </div>
                <p className="text-text-muted leading-relaxed italic">
                  "{product.description}"
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-accent/40" /> Technical Data Sheet
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {technicalSpecs.map((spec, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                      <div className="text-accent mb-2">{spec.icon}</div>
                      <div className="text-[10px] text-text-muted font-black uppercase tracking-wider mb-1">{spec.label}</div>
                      <div className="text-sm font-bold text-text-primary">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-accent/40" /> Industry Tags
                 </h4>
                 <div className="flex flex-wrap gap-2">
                    {product.tags?.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-accent/5 border border-accent/10 rounded-lg text-xs font-bold text-text-muted hover:text-accent transition-colors">
                        #{tag}
                      </span>
                    ))}
                 </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => { onClose(); onQuote(product); }}
                  className="flex-1 bg-accent text-primary font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,201,167,0.4)] transition-all uppercase tracking-widest text-xs"
                >
                  <ShoppingCart size={18} /> Request Project Quote
                </button>
                <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 font-black text-text-primary flex items-center justify-center gap-2 hover:bg-white/10 transition-all uppercase tracking-widest text-xs">
                  <Download size={18} /> Download Spec Sheet
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailsModal;
