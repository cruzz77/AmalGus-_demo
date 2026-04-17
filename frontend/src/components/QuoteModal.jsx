import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calculator, Ruler, Factory, CheckCircle2, AlertCircle, Download, ShoppingCart, ArrowRight, RefreshCcw } from 'lucide-react';
import { ALLIED_CATEGORIES } from '../data/mockData';

const QuoteModal = ({ isOpen, onClose, product }) => {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000, quantity: 1 });
  const [estimate, setEstimate] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    if (!product || !dimensions.width || !dimensions.height) return;

    const areaSqM = (dimensions.width * dimensions.height) / 1000000;
    const areaSqFt = areaSqM * 10.7639;
    const rate = product.pricePerSqm || 1200; // Fallback rate if not provided
    
    const basePrice = areaSqFt * rate * dimensions.quantity;
    const gst = basePrice * 0.18;
    const total = basePrice + gst;

    setEstimate({
      areaSqFt: areaSqFt.toFixed(2),
      basePrice: Math.round(basePrice),
      gst: Math.round(gst),
      total: Math.round(total),
      ratePerSqFt: Math.round(rate)
    });
  }, [product, dimensions]);

  // Reset success/error states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setOrderSuccess(false);
      setOrderError(null);
      setIsOrdering(false);
    }
  }, [isOpen]);

  const handleConfirmOrder = async () => {
    setIsOrdering(true);
    setOrderError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setOrderError('You must be signed in to place an order.');
        setIsOrdering(false);
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const orderData = {
        productName: product.name,
        supplierName: product.supplier,
        dimensions: {
          width: dimensions.width,
          height: dimensions.height,
          quantity: dimensions.quantity
        },
        totalCost: estimate.total
      };

      const response = await axios.post(`${baseUrl}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setOrderSuccess(true);
      }
    } catch (err) {
      console.error('Order error:', err);
      setOrderError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsOrdering(false);
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
            className="relative w-full max-w-4xl bg-surface rounded-[32px] border border-white/10 shadow-2xl overflow-hidden"
          >
            {!orderSuccess ? (
              <div className="flex flex-col md:flex-row">
                {/* Left Column: Product Info & Form */}
                <div className="flex-1 p-8 md:p-10 space-y-8 border-b md:border-b-0 md:border-r border-white/5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest">
                      <Calculator size={14} /> Official Quotation
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-text-primary capitalize">{product.name}</h2>
                    <div className="flex items-center gap-2 text-text-muted text-sm italic">
                      <Factory size={14} className="text-accent" />
                      Supplier: {product.supplier}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3 font-bold">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted flex items-center gap-2">
                        <Ruler size={12} /> Width (mm)
                      </label>
                      <input 
                        type="number"
                        value={dimensions.width}
                        onChange={(e) => setDimensions({...dimensions, width: Number(e.target.value)})}
                        className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl px-5 py-3.5 outline-none transition-all text-lg"
                      />
                    </div>
                    <div className="space-y-3 font-bold">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted flex items-center gap-2">
                        <Ruler size={12} className="rotate-90" /> Height (mm)
                      </label>
                      <input 
                        type="number"
                        value={dimensions.height}
                        onChange={(e) => setDimensions({...dimensions, height: Number(e.target.value)})}
                        className="w-full bg-white/5 border border-white/5 focus:border-accent/40 rounded-2xl px-5 py-3.5 outline-none transition-all text-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 font-bold">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted">Quantity (Panels)</label>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setDimensions({...dimensions, quantity: Math.max(1, dimensions.quantity - 1)})}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                      >-</button>
                      <input 
                        type="number"
                        value={dimensions.quantity}
                        onChange={(e) => setDimensions({...dimensions, quantity: Math.max(1, Number(e.target.value))})}
                        className="flex-1 bg-transparent text-center text-xl font-bold border-b-2 border-accent/20 focus:border-accent outline-none"
                      />
                      <button 
                        onClick={() => setDimensions({...dimensions, quantity: dimensions.quantity + 1})}
                        className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                      >+</button>
                    </div>
                  </div>

                  {orderError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-bold flex items-center gap-3">
                      <AlertCircle size={18} />
                      {orderError}
                    </div>
                  )}

                  <div className="bg-accent/5 border border-accent/10 p-4 rounded-2xl flex items-start gap-3">
                    <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-[10px] text-text-muted leading-relaxed font-medium">
                      <strong>Commercial Note:</strong> This estimate is specific to the technical configuration of {product.name}. A processing fee for {product.edgeFinish || 'standard'} edges is included in the rate.
                    </p>
                  </div>
                </div>

                {/* Right Column: Calculations Summary */}
                <div className="w-full md:w-[380px] bg-white/5 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                  
                  <div className="space-y-8 relative z-10">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">Estimate Breakdown</h4>
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Total Net Area</div>
                          <div className="text-3xl font-black tracking-tighter text-text-primary">{estimate?.areaSqFt} <span className="text-sm">SQ.FT</span></div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Unit Rate</div>
                          <div className="text-xl font-bold text-text-primary">₹{product.pricePerSqm || 'N/A'}<span className="text-[10px] ml-1 font-normal">/sqm</span></div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-6 border-t border-white/10">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-text-muted">Base Amount</span>
                          <span>₹{estimate?.basePrice?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-text-muted">GST (18%)</span>
                          <span className="text-red-400">+ ₹{estimate?.gst?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-white/10">
                          <span className="text-lg font-black uppercase tracking-widest">Total cost</span>
                          <span className="text-3xl font-black text-accent tracking-tighter">₹{estimate?.total?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-8 relative z-10">
                    <button 
                      disabled={isOrdering}
                      className="w-full bg-accent text-primary font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,201,167,0.3)] transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                    >
                      <Download size={18} /> Download Quote
                    </button>
                    <button 
                      onClick={handleConfirmOrder}
                      disabled={isOrdering}
                      className="w-full bg-white/5 hover:bg-white/10 text-text-primary font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all uppercase tracking-widest text-xs border border-white/10 disabled:opacity-50"
                    >
                      {isOrdering ? (
                         <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart size={18} /> Confirm Order
                        </>
                      )}
                    </button>
                    <button onClick={onClose} className="w-full text-xs text-text-muted hover:text-white transition-colors pt-2">Cancel and return</button>
                  </div>
                </div>
              </div>
            ) : (
              /* Success View - Allied Products Cross-sell */
              <div className="p-8 md:p-16 text-center space-y-12">
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.3)] border-4 border-white/20">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-text-primary tracking-tight">Order Placed Successfully!</h2>
                  <p className="text-text-muted text-lg max-w-xl mx-auto">
                    Your procurement request has been sent to <span className="text-accent font-bold">{product.supplier}</span>. You can track this in your Orders page.
                  </p>
                </div>

                <div className="space-y-8 pt-6 border-t border-white/5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-widest text-accent">Allied Products & Materials</h3>
                    <p className="text-sm text-text-muted">Complete your project with these essential architectural glass accessories.</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ALLIED_CATEGORIES.slice(0, 4).map((cat) => (
                      <div key={cat.id} className="bg-white/5 border border-white/5 p-6 rounded-2xl hover:border-accent/40 transition-all group">
                         <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                            <ShoppingCart size={24} />
                         </div>
                         <div className="text-sm font-bold text-text-primary mb-1">{cat.name}</div>
                         <div className="text-[10px] text-text-muted leading-tight line-clamp-2">{cat.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button 
                    onClick={() => window.location.href = '/orders'}
                    className="w-full sm:w-auto bg-accent text-primary px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:scale-105 transition-all"
                  >
                    View My Orders <ArrowRight size={16} />
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full sm:w-auto border border-white/10 hover:border-white/20 text-text-muted hover:text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest"
                  >
                    Back to Discovery
                  </button>
                </div>
              </div>
            )}

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-text-muted hover:text-white transition-colors z-20 md:hidden"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
