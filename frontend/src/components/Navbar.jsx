import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Package, ShieldCheck, Zap, User, Clock, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';

const Navbar = () => {
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch (e) {
    console.error('Error parsing user data in Navbar:', e);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'Suppliers', path: '/suppliers' },
    { name: 'Materials', path: '/materials' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6 ${scrolled ? 'py-3 md:py-4' : 'py-5 md:py-6'}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 px-5 md:px-8 py-3 rounded-[20px] md:rounded-[24px] border ${scrolled ? 'bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl' : 'bg-transparent border-transparent'}`}>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-accent rounded-lg md:rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,201,167,0.3)] group-hover:scale-110 transition-transform">
            <Zap className="text-primary fill-current" size={18} />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tighter text-text-primary uppercase">AMAL<span className="text-accent underline decoration-accent/30 underline-offset-4">GUS</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all hover:text-accent relative group ${location.pathname === item.path ? 'text-accent' : 'text-text-muted'}`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${location.pathname === item.path ? 'scale-x-100' : ''}`} />
            </Link>
          ))}
          {user && (
            <Link to="/orders" className={`text-[11px] uppercase tracking-[0.2em] font-bold flex items-center gap-2 transition-all hover:text-accent ${location.pathname === '/orders' ? 'text-accent' : 'text-text-muted'}`}>
              <Clock size={14} /> Orders
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-text-primary px-5 py-2.5 rounded-full text-xs font-bold border border-white/5 hover:border-accent/40 transition-all backdrop-blur-md"
            >
              <User size={14} />
              {user ? user.name.split(' ')[0] : 'SIGN IN'}
            </button>
            
            {user && (
              <button 
                onClick={handleLogout}
                className="p-2.5 text-text-muted hover:text-red-400 bg-white/5 rounded-full border border-white/5 hover:border-red-400/30 transition-all"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>

          <Link 
            to="/discover" 
            className="hidden lg:flex items-center gap-2 bg-accent text-primary px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider hover:bg-white hover:text-primary transition-all shadow-[0_0_20px_rgba(0,201,167,0.2)]"
          >
            <Search size={14} />
            Find Glass
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
           <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="p-2.5 bg-white/5 rounded-xl border border-white/5 text-text-muted transition-all"
            >
            <User size={18} />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 bg-accent/10 border border-accent/20 text-accent rounded-xl transition-all active:scale-95"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-surface border-l border-white/10 z-[60] md:hidden p-8 flex flex-col pt-24"
            >
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">Navigation</span>
                {navLinks.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${location.pathname === item.path ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-white/5 border-white/5 text-text-muted hover:border-white/10'}`}
                  >
                    <span className="font-bold text-sm uppercase tracking-wider">{item.name}</span>
                    <ChevronRight size={16} />
                  </Link>
                ))}
                {user && (
                    <Link 
                      to="/orders" 
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${location.pathname === '/orders' ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-white/5 border-white/5 text-text-muted'}`}
                    >
                      <span className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                        <Clock size={16} /> Orders
                      </span>
                      <ChevronRight size={16} />
                    </Link>
                )}
              </div>

              <div className="mt-auto space-y-4">
                <Link 
                  to="/discover" 
                  className="w-full bg-accent text-primary p-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
                >
                  <Search size={16} /> Find Glass Now
                </Link>
                {user && (
                  <button 
                  onClick={handleLogout}
                  className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-red-400 flex items-center justify-center gap-2"
                >
                  <LogOut size={16} /> Sign Out
                </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;


