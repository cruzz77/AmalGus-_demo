import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Shield, Users } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-surface">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/DzHfxuUeojZg3plU/scene.splinecode" />
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 z-10 bg-surface/50 backdrop-blur-[2px]"></div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#F0F0FF 1px, transparent 1px), linear-gradient(90deg, #F0F0FF 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-accent text-sm font-semibold mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          AI-Powered Glass Marketplace
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
        >
          Find the Perfect Glass. <br />
          <span className="text-gradient">Instantly.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-xl text-text-muted mb-12 leading-relaxed"
        >
          Describe what you need in plain English. AmalGus matches you to the right glass products and verified suppliers — in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/discover"
            className="group flex items-center gap-3 bg-accent text-primary px-8 py-4 rounded-full text-lg font-bold hover:bg-[#00e6c0] transition-all hover:shadow-[0_0_30px_rgba(0,201,167,0.4)] hover:scale-105"
          >
            Start Discovering
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex flex-col items-start gap-1">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-highlight flex items-center justify-center text-[10px] font-bold">
                  U{i}
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted">Trusted by 500+ Top Suppliers</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl font-bold text-accent">10,000+</span>
            <span className="text-sm text-text-muted uppercase tracking-wider">Products</span>
          </div>
          <div className="flex flex-col items-center gap-2 border-x border-white/10">
            <span className="text-3xl font-bold text-accent">500+</span>
            <span className="text-sm text-text-muted uppercase tracking-wider">Verified Suppliers</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl font-bold text-accent">&lt; 2s</span>
            <span className="text-sm text-text-muted uppercase tracking-wider">AI-Matched</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
