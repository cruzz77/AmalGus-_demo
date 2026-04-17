import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Mail, Lock, User as UserIcon, Phone, Briefcase } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatErrorMessage = (msg) => {
    if (!msg) return 'An unexpected error occurred.';
    
    // Technical Mongoose validation messages
    if (msg.includes('User validation failed')) {
      if (msg.includes('password') && msg.includes('shorter than the minimum allowed length')) {
        return 'Password must be at least 6 characters long.';
      }
      if (msg.includes('email') && msg.includes('valid email')) {
        return 'Please provide a valid email address.';
      }
      if (msg.includes('name') && msg.includes('provide a name')) {
        return 'Full name is required.';
      }
    }

    // Common backend failures
    if (msg.includes('User with this email already exists')) {
      return 'Account already exists for this email.';
    }
    if (msg.includes('Incorrect email or password')) {
      return 'Invalid credentials. Please try again.';
    }

    return msg;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = {
        email: e.target.email.value,
        password: e.target.password.value,
        ...(activeTab === 'register' && { 
          name: e.target.name.value,
          role: e.target.role.value 
        })
      };

      const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';
      const endpoint = activeTab === 'signin' ? '/api/auth/login' : '/api/auth/register';
      
      const response = await axios.post(`${baseUrl}${endpoint}`, formData);
      
      if (response.data.status === 'success') {
        const { token, data: { user } } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        setIsLoading(false);
        window.location.reload(); 
      }
    } catch (err) {
      console.error('Auth error detail:', err);
      if (err.response) {
        // Server responded with an error (e.g., 400, 401)
        let serverMessage = err.response.data?.message || err.response.data?.error;
        
        // If the server returns HTML (like a 404 from Express), extract the text or show a cleaner message
        if (!serverMessage && typeof err.response.data === 'string') {
          if (err.response.data.includes('<!DOCTYPE html>')) {
            const match = err.response.data.match(/<pre>(.*?)<\/pre>/);
            serverMessage = match ? match[1] : `Server Error: ${err.response.status} ${err.response.statusText}`;
          } else {
            serverMessage = err.response.data;
          }
        }
        
        setError(formatErrorMessage(serverMessage || 'Server error occurred. Please check if the backend is running.'));
      } else if (err.request) {
        // Request was made but no response (Network Error)
        setError('Connection Error: Could not reach the authentication server. Please ensure the backend is running at http://localhost:5001.');
      } else {
        setError(formatErrorMessage('An unexpected error occurred. Please try again.'));
      }
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
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
          className="relative w-full max-w-md bg-surface p-10 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-text-muted hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <Zap className="text-primary fill-current" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Amal<span className="text-accent">Gus</span></span>
          </div>

          {/* Tabs */}
          <div className="flex p-1 bg-white/5 rounded-2xl mb-8 border border-white/5">
            <button 
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'signin' ? 'bg-accent text-primary' : 'text-text-muted hover:text-white'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'register' ? 'bg-accent text-primary' : 'text-text-muted hover:text-white'}`}
            >
              Register
            </button>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-bold mb-6 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            {activeTab === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase ml-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input 
                    name="name"
                    required
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-accent outline-none transition-all placeholder:text-white/20"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  name="email"
                  required
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-accent outline-none transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input 
                  name="password"
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-accent outline-none transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            {activeTab === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase ml-1">Professional Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <select 
                    name="role"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:border-accent outline-none transition-all appearance-none"
                  >
                    <option value="Homeowner" className="bg-surface">Homeowner</option>
                    <option value="Architect" className="bg-surface">Architect / Designer</option>
                    <option value="Builder" className="bg-surface">Builder / Developer</option>
                    <option value="Dealer" className="bg-surface">Dealer / Trader</option>
                  </select>
                </div>
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full bg-accent text-primary font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,201,167,0.2)]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                activeTab === 'signin' ? 'Sign In Now' : 'Create Account'
              )}
            </button>

            <button 
              type="button"
              onClick={onClose}
              className="w-full text-text-muted hover:text-white transition-colors text-sm font-medium"
            >
              Continue as Guest
            </button>
          </form>

          {/* Decorative element */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 blur-[80px] -z-10" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
