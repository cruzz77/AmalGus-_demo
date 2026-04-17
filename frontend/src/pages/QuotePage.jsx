import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ruler, CheckCircle2, Download, Info, AlertCircle, 
  Maximize2, Box, Layers, Calculator, Zap
} from 'lucide-react';

const PRICING = {
  'Clear Float 5mm': 55,
  'Toughened 6mm': 95,
  'Toughened 10mm': 165,
  'Laminated 8.8mm': 210,
  'DGU (Insulated) 22mm': 420,
  'Frosted 5mm': 85,
  'Mirror 6mm': 75,
  'Extra Clear 10mm': 280
};

const EDGE_COSTS = {
  'Raw Cut': 0,
  'Polished': 25,
  'Beveled': 45
};

const QuotePage = () => {
  const [formData, setFormData] = useState({
    glassType: 'Clear Float 5mm',
    width: 1000,
    height: 1000,
    quantity: 1,
    edge: 'Polished'
  });

  const [estimate, setEstimate] = useState({
    areaSqFt: 0,
    basePrice: 0,
    edgePrice: 0,
    gst: 0,
    total: 0
  });

  useEffect(() => {
    const { width, height, quantity, glassType, edge } = formData;
    if (!width || !height) return;

    const areaSqM = (width * height) / 1000000;
    const areaSqFt = areaSqM * 10.7639;
    const baseRate = PRICING[glassType];
    const edgeRate = EDGE_COSTS[edge];

    const basePrice = areaSqFt * baseRate * quantity;
    const edgePrice = ((width + height) * 2 / 1000) * edgeRate * quantity; // per running meter
    const subtotal = basePrice + edgePrice;
    const gst = subtotal * 0.18;
    
    setEstimate({
      areaSqFt: areaSqFt.toFixed(2),
      basePrice: Math.round(basePrice),
      edgePrice: Math.round(edgePrice),
      gst: Math.round(gst),
      total: Math.round(subtotal + gst)
    });
  }, [formData]);

  const paneRatio = useMemo(() => {
    const max = Math.max(formData.width, formData.height);
    return {
      w: (formData.width / max) * 100,
      h: (formData.height / max) * 100
    };
  }, [formData.width, formData.height]);

  return (
    <div className="bg-surface min-h-screen text-text-primary">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Instant <span className="text-accent underline decoration-accent/20 underline-offset-8">Quote</span> Generator</h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl">Configure your glass specifications below for a real-time commercial estimate based on daily market rates.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-4 space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="glass-card p-8 border-white/5 space-y-8">
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                  <Layers size={14} className="text-accent" /> Glass Type
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.keys(PRICING).map(type => (
                    <button 
                      key={type}
                      onClick={() => setFormData({...formData, glassType: type})}
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${formData.glassType === type ? 'bg-accent/10 border-accent text-accent' : 'bg-white/5 border-white/5 text-text-muted hover:border-white/20'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                  <Maximize2 size={14} className="text-accent" /> Dimensions (mm)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-text-muted font-bold ml-1">Width</span>
                    <input 
                      type="number"
                      value={formData.width}
                      onChange={(e) => setFormData({...formData, width: Number(e.target.value)})}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-lg font-bold outline-none focus:border-accent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-text-muted font-bold ml-1">Height</span>
                    <input 
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({...formData, height: Number(e.target.value)})}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-lg font-bold outline-none focus:border-accent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">Quantity</label>
                   <input 
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: Math.max(1, Number(e.target.value))})}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-lg font-bold outline-none focus:border-accent"
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">Edge finish</label>
                    <select 
                      value={formData.edge}
                      onChange={(e) => setFormData({...formData, edge: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-accent"
                    >
                      {Object.keys(EDGE_COSTS).map(e => <option key={e} value={e} className="bg-surface">{e}</option>)}
                    </select>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 p-6 rounded-3xl flex items-start gap-4">
              <Zap size={24} className="text-accent shrink-0 mt-1" />
              <div className="space-y-1">
                <h4 className="font-bold text-accent">Pro Tip</h4>
                <p className="text-xs text-text-muted leading-relaxed">Ordering in standard sizes (e.g. 2440 x 1830mm) can reduce wastage costs by up to 15%.</p>
              </div>
            </div>
          </div>

          {/* Right: Visualization and Summary */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-12 order-1 lg:order-2">
            
            {/* Pane Visualizer */}
            <div className="glass-card p-6 md:p-12 border-white/5 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,201,167,0.05)_0%,transparent_70%)]" />
               
               <div className="text-center mb-8 space-y-1">
                 <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest">Pane Visualization</h4>
                 <p className="text-xs text-text-muted italic">Scale representation (not actual size)</p>
               </div>

               <motion.div 
                 layout
                 style={{ 
                   width: `${paneRatio.w * 0.8}%`, 
                   height: `${paneRatio.h * 0.8}%`,
                   maxHeight: '300px'
                 }}
                 className="relative bg-accent/20 border-2 border-accent/40 rounded-sm backdrop-blur-sm shadow-[0_0_50px_rgba(0,201,167,0.15)] flex items-center justify-center group"
               >
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                 <span className="text-accent font-black text-xl opacity-20 group-hover:opacity-100 transition-opacity">
                   {formData.width} x {formData.height}
                 </span>
                 
                 {/* Dimension lines */}
                 <div className="absolute -bottom-8 left-0 w-full h-px bg-white/20">
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
                   <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-text-muted">{formData.width}mm</span>
                 </div>
                 <div className="absolute -right-12 top-0 h-full w-px bg-white/20">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-text-muted rotate-90">{formData.height}mm</span>
                 </div>
               </motion.div>
            </div>

            {/* Price Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Calculator className="text-accent" size={24} />
                  <h3 className="text-2xl font-bold">Estimate <span className="text-accent">Summary</span></h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end pb-4 border-b border-white/5">
                    <span className="text-text-muted text-sm uppercase tracking-wider font-bold">Base Price</span>
                    <span className="text-2xl font-bold tracking-tight">₹{estimate.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end pb-4 border-b border-white/5">
                    <span className="text-text-muted text-sm uppercase tracking-wider font-bold">Edge Finish ({formData.edge})</span>
                    <span className="text-lg font-bold">₹{estimate.edgePrice.toLocaleString()}</span>
                  </div>
                   <div className="flex justify-between items-end pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted text-sm uppercase tracking-wider font-bold">GST (18%)</span>
                      <Info size={12} className="text-text-muted cursor-help" />
                    </div>
                    <span className="text-lg font-bold text-red-400">+ ₹{estimate.gst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-text-primary text-xl font-black uppercase tracking-widest">Total cost</span>
                    <span className="text-4xl font-black text-accent tracking-tighter">₹{estimate.total.toLocaleString()}*</span>
                  </div>
                </div>
              </div>

              <div className="glass-card bg-accent p-6 md:p-8 flex flex-col items-center justify-center text-primary text-center space-y-6">
                 <div className="space-y-1">
                   <h4 className="text-sm font-black uppercase tracking-[0.2em] opacity-70">Total Area</h4>
                   <div className="text-5xl font-black tracking-tighter">{estimate.areaSqFt} <span className="text-xl">SQ.FT</span></div>
                 </div>
                 <p className="text-sm font-bold leading-relaxed opacity-80">Download this estimate as an official quote request to our verified suppliers.</p>
                 <button className="w-full bg-primary text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl uppercase tracking-widest text-xs">
                    <Download size={18} /> Download official quote
                 </button>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-text-muted">
              <AlertCircle className="shrink-0 mt-0.5" size={16} />
              <p className="text-[10px] leading-relaxed italic">
                *Excludes transportation and handling. Rates are based on current market averages on {new Date().toLocaleDateString()}. Final billing subject to measurement verification by supplier.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuotePage;
