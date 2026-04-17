import React from 'react';
import { motion } from 'framer-motion';
import { Home, Ruler, Building, Store, ArrowRight } from 'lucide-react';

const ROLES = [
  {
    id: 'homeowner',
    title: 'Homeowner',
    desc: 'Finding glass for my home',
    icon: Home,
    color: 'bg-blue-500/20 text-blue-400',
    borderColor: 'hover:border-blue-500/50'
  },
  {
    id: 'architect',
    title: 'Architect / Designer',
    desc: 'Specifying glass for projects',
    icon: Ruler,
    color: 'bg-purple-500/20 text-purple-400',
    borderColor: 'hover:border-purple-500/50'
  },
  {
    id: 'builder',
    title: 'Builder / Developer',
    desc: 'Bulk orders for construction',
    icon: Building,
    color: 'bg-orange-500/20 text-orange-400',
    borderColor: 'hover:border-orange-500/50'
  },
  {
    id: 'dealer',
    title: 'Dealer / Trader',
    desc: 'Trade & wholesale buying',
    icon: Store,
    color: 'bg-green-500/20 text-green-400',
    borderColor: 'hover:border-green-500/50'
  }
];

const RoleSelector = ({ onSelect }) => {
  const handleSelect = (roleId) => {
    localStorage.setItem('userRole', roleId);
    if (onSelect) onSelect(roleId);
  };

  return (
    <div className="py-12 w-full">
      <div className="mb-10 text-center">
        <h3 className="text-2xl font-bold mb-2">How do you use <span className="text-accent">AmalGus?</span></h3>
        <p className="text-text-muted">Personalize your experience based on your industry needs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ROLES.map((role, idx) => (
          <motion.button
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleSelect(role.id)}
            className={`glass-card p-8 flex flex-col items-center text-center group transition-all duration-300 border-white/5 ${role.borderColor}`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${role.color}`}>
              <role.icon size={32} />
            </div>
            <h4 className="text-xl font-bold mb-2 text-text-primary group-hover:text-accent transition-colors">{role.title}</h4>
            <p className="text-sm text-text-muted mb-6">{role.desc}</p>
            <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              Select <ArrowRight size={14} />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
