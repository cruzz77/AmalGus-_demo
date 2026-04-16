import React from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, XCircle } from 'lucide-react';

const SkeletonCard = () => (
  <div className="glass-card p-6 h-[400px] animate-shimmer space-y-6">
    <div className="flex justify-between">
      <div className="w-24 h-6 bg-white/5 rounded-full"></div>
      <div className="w-12 h-12 rounded-full bg-white/5"></div>
    </div>
    <div className="space-y-2">
      <div className="w-3/4 h-8 bg-white/5 rounded-lg"></div>
      <div className="w-1/2 h-4 bg-white/5 rounded-lg"></div>
    </div>
    <div className="flex gap-2">
      <div className="w-16 h-6 bg-white/5 rounded-lg"></div>
      <div className="w-16 h-6 bg-white/5 rounded-lg"></div>
    </div>
    <div className="h-24 bg-white/5 rounded-xl"></div>
  </div>
);

const MatchResults = ({ results, isLoading, query }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <XCircle size={64} className="text-red-400/50" />
        <h3 className="text-2xl font-bold text-text-primary">No Direct Matches Found</h3>
        <p className="text-text-muted max-w-md">
          Our AI couldn't find products that perfectly match your description. Try adjusting your filters or making your requirement more general.
        </p>
      </div>
    );
  }

  if (!query && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-3xl flex items-center justify-center animate-bounce">
          <Sparkles size={40} className="text-accent" />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-text-primary tracking-tight">Ready to Discover?</h3>
          <p className="text-text-muted max-w-lg text-lg">
            Enter your requirements in the search box above to see AI-powered matches tailored to your specific needs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-accent/20 text-accent p-2 rounded-lg">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary">AI Match Results</h3>
          <p className="text-sm text-text-muted">Showing top {results.length} matches based on your requirement</p>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 xl:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {results.map((result, index) => (
            <motion.div
              key={result.product._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard result={result} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MatchResults;
