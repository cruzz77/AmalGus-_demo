import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RoleSelector from '../components/RoleSelector';
import AuthModal from '../components/AuthModal';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleRoleSelect = (role) => {
    setUserRole(role);
  };

  const handleProtectedAction = (path) => {
    if (user) {
      navigate(path);
    } else {
      setIsAuthOpen(true);
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      <Hero />
      
      <section className="py-24 px-6 relative z-30 bg-surface">
        <div className="max-w-7xl mx-auto space-y-32">
          
          <AnimatePresence>
            {!userRole ? (
              <RoleSelector onSelect={handleRoleSelect} />
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent/10 border border-accent/20 p-12 rounded-[40px] text-center space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  Personalized for {userRole}
                </div>
                <h2 className="text-4xl font-bold">Ready to <span className="text-accent">Innovate?</span></h2>
                <p className="text-text-muted max-w-xl mx-auto">We've customized the marketplace for your role as a {userRole === 'dealer' ? 'Trade Partner' : userRole}. Explore bulk pricing and technical datasheets.</p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button 
                    onClick={() => handleProtectedAction('/quote')}
                    className="bg-accent text-primary px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all"
                  >
                    Get an Estimate
                  </button>
                  <button 
                    onClick={() => handleProtectedAction('/suppliers')}
                    className="bg-white/5 border border-white/10 px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all"
                  >
                    Browse Suppliers
                  </button>
                  <button onClick={() => { localStorage.removeItem('userRole'); setUserRole(null); }} className="w-full text-xs text-text-muted hover:text-white mt-4">Change my role</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
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
