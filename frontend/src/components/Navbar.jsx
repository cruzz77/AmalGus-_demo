import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Package, ShieldCheck, Zap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-8 py-3 bg-opacity-30">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,201,167,0.4)] group-hover:scale-110 transition-transform">
            <Zap className="text-primary fill-current" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-text-primary">Amal<span className="text-accent">Gus</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-text-muted font-medium">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/discover" className="hover:text-accent transition-colors">Discover</Link>
          <a href="#" className="hover:text-accent transition-colors">Suppliers</a>
          <a href="#" className="hover:text-accent transition-colors">Materials</a>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/discover" 
            className="hidden sm:flex items-center gap-2 bg-accent text-primary px-5 py-2 rounded-full font-semibold hover:bg-[#00e6c0] transition-all hover:shadow-[0_0_20px_rgba(0,201,167,0.3)]"
          >
            <Search size={18} />
            Find Glass
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
