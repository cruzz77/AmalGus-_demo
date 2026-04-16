import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="py-24 px-6 relative z-30 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<TrendingUp className="text-accent" size={32} />}
              title="Natural Language Search"
              description="No more complex SKU filters. Just describe what you need as if you were talking to an expert."
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-accent" size={32} />}
              title="Verified Suppliers"
              description="Every supplier on our platform is vetted and certified to industry standards like IS 2553 and CE."
            />
             <FeatureCard 
              icon={<Users className="text-accent" size={32} />}
              title="Intelligent Matching"
              description="Our LLM-powered engine analyzes technical specs to find the most relevant materials for your project."
            />
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-text-muted">
        <p>© 2026 AmalGus Glass Marketplace. Powered by Llama 3 & Groq.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="glass-card p-10 space-y-4 border-white/5 hover:border-accent/30 transition-colors"
  >
    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-text-primary">{title}</h3>
    <p className="text-text-muted leading-relaxed">
      {description}
    </p>
  </motion.div>
);

export default LandingPage;
