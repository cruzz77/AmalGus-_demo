import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink, Factory, Info, ShoppingCart } from 'lucide-react';

const ProductCard = ({ result, isSimple = false }) => {
  const { product, matchScore, explanation, matchedAttributes } = result;
  const [offset, setOffset] = useState(100);

  useEffect(() => {
    if (isSimple) return;
    // Animate the score ring
    const timer = setTimeout(() => {
      const percentage = matchScore || 0;
      const circumference = 2 * Math.PI * 22; // radius 22
      const newOffset = circumference - (percentage / 100) * circumference;
      setOffset(newOffset);
    }, 300);
    return () => clearTimeout(timer);
  }, [matchScore, isSimple]);

  const getScoreColor = (score) => {
    if (score >= 80) return '#00C9A7'; // Green
    if (score >= 60) return '#FFB347'; // Amber
    return '#FF6B6B'; // Coral
  };

  const getCategoryColor = (cat) => {
    const map = {
      'Tempered Glass': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Laminated Glass': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Insulated Glass Unit': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Mirror': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Default': 'bg-accent/20 text-accent border-accent/30'
    };
    return map[cat] || map['Default'];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: isSimple ? '0 10px 30px rgba(0,0,0,0.2)' : `0 0 24px ${getScoreColor(matchScore)}33` }}
      className="glass-card p-6 flex flex-col gap-6 relative overflow-hidden group border-white/10 h-full"
    >
      {/* Top Header */}
      <div className="flex justify-between items-start">
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getCategoryColor(product.category)}`}>
          {product.category}
        </div>
        
        {/* Animated Score Ring (Hidden in Simple Mode) */}
        {!isSimple && (
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28" cy="28" r="22"
                fill="transparent"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="4"
              />
              <circle
                cx="28" cy="28" r="22"
                fill="transparent"
                stroke={getScoreColor(matchScore)}
                strokeWidth="4"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={2 * Math.PI * 22 - (matchScore / 100) * (2 * Math.PI * 22)}
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xs font-bold" style={{ color: getScoreColor(matchScore) }}>
              {matchScore}%
            </span>
          </div>
        )}
      </div>

      {/* Product Body */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-text-primary leading-tight group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 text-text-muted text-sm">
          <Factory size={14} className="text-accent" />
          {product.supplier}
        </div>
      </div>

      {/* Description (Visible in Simple Mode) */}
      {isSimple && (
        <p className="text-text-muted text-sm line-clamp-2 italic">
          {product.description}
        </p>
      )}

      {/* Specs Pills */}
      <div className="flex flex-wrap gap-2">
        {product.thickness && (
          <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-[11px] text-text-muted font-medium">
            {product.thickness}mm
          </span>
        )}
        {product.edgeFinish && (
          <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-[11px] text-text-muted font-medium italic">
            {product.edgeFinish}
          </span>
        )}
        <span className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-[11px] text-text-muted font-medium">
          {product.color}
        </span>
      </div>

      {/* Match Explanation Box (Hidden in Simple Mode) */}
      {!isSimple && (
        <div className="bg-primary/40 border border-white/5 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="bg-accent/20 px-2 py-0.5 rounded text-[10px] font-bold text-accent">AI INSIGHT</div>
            <div className="h-[1px] flex-1 bg-white/5"></div>
          </div>
          <p className="text-sm text-text-primary italic leading-relaxed">
            "{explanation}"
          </p>
          <div className="flex flex-wrap gap-2">
            {matchedAttributes.map((attr, idx) => (
              <span key={idx} className="flex items-center gap-1 text-[10px] text-accent font-semibold px-2 py-0.5 bg-accent/10 rounded-full">
                <CheckCircle size={10} /> {attr}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
        <div>
          <span className="text-xs text-text-muted block">Est. Price</span>
          <span className="text-xl font-bold text-text-primary uppercase tracking-tighter">
            {product.pricePerSqm ? `₹${product.pricePerSqm.toLocaleString()}` : (product.pricePerUnit ? `₹${product.pricePerUnit.toLocaleString()}` : 'N/A')}
            <span className="text-[10px] text-text-muted font-normal ml-1">
              /{product.pricePerSqm ? 'sqm' : (product.pricePerUnit ? 'unit' : '')}
            </span>
          </span>
        </div>
        
        <div className="flex gap-2">
          {isSimple ? (
            <button className="flex items-center gap-2 bg-white/5 text-text-primary px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-white/10 transition-all border border-white/10">
              <ExternalLink size={16} />
              View Details
            </button>
          ) : (
            <>
              <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-text-muted transition-colors border border-white/10">
                <Info size={18} />
              </button>
              <button className="flex items-center gap-2 bg-accent text-primary px-4 py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_15px_rgba(0,201,167,0.3)] transition-all">
                <ShoppingCart size={16} />
                Request Quote
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
