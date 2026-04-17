import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Ruler, CreditCard, Clock, Calendar, Hash, Factory, CheckCircle2, Truck, Printer, Info } from 'lucide-react';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  const steps = [
    { id: 'Pending', icon: Clock, label: 'Order Placed' },
    { id: 'Processing', icon: Info, label: 'Processing' },
    { id: 'Shipped', icon: Truck, label: 'Shipped' },
    { id: 'Delivered', icon: CheckCircle2, label: 'Delivered' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === order.status);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
            className="relative w-full max-w-2xl bg-surface rounded-[32px] border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 relative bg-white/5">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-accent text-xs font-black uppercase tracking-widest">
                    <Hash size={14} /> ID: {order._id.toUpperCase()}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary capitalize">{order.productName}</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-white/5 text-text-muted hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status Stepper */}
              <div className="relative pt-4">
                <div className="absolute top-[34px] left-0 w-full h-0.5 bg-white/5" />
                <div 
                  className="absolute top-[34px] left-0 h-0.5 bg-accent transition-all duration-1000" 
                  style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />
                
                <div className="relative flex justify-between">
                  {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;
                    
                    return (
                      <div key={step.id} className="flex flex-col items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                          isCurrent ? 'bg-accent border-accent text-primary shadow-[0_0_15px_rgba(0,201,167,0.5)]' :
                          isActive ? 'bg-accent/20 border-accent text-accent' :
                          'bg-surface border-white/10 text-text-muted'
                        }`}>
                          <Icon size={18} />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-text-primary' : 'text-text-muted'}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Procurement Details</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-text-primary">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                          <Factory size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Supplier</p>
                          <p className="font-bold">{order.supplierName || 'AmalGus Verified'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-text-primary">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                          <Ruler size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Dimensions</p>
                          <p className="font-bold">{order.dimensions?.width} × {order.dimensions?.height} mm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Logistics & Timing</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-text-primary">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Order Date</p>
                          <p className="font-bold">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-text-primary">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Quantity</p>
                          <p className="font-bold">{order.dimensions?.quantity} Units (Panels)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-white/5 rounded-[24px] p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-accent" size={20} />
                  <h4 className="text-[11px] font-black uppercase tracking-widest">Financial Summary</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Base Procurement Cost</span>
                    <span className="text-text-primary font-bold">₹{(order.totalCost / 1.18).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-white/5 pb-4">
                    <span className="text-text-muted">GST (18%)</span>
                    <span className="text-text-primary font-bold">₹{(order.totalCost - (order.totalCost / 1.18)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-lg font-black uppercase tracking-widest text-text-primary">Total Paid</span>
                    <span className="text-3xl font-black text-accent tracking-tighter">₹{order.totalCost?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 bg-white/5 border-t border-white/5 flex gap-4">
              <button 
                className="flex-1 bg-white/5 hover:bg-white/10 text-text-primary font-bold py-3 rounded-2xl flex items-center justify-center gap-2 border border-white/10 transition-all text-sm"
              >
                <Printer size={18} /> Print Invoice
              </button>
              <button 
                onClick={onClose}
                className="flex-1 bg-accent text-primary font-black py-3 rounded-2xl hover:shadow-[0_0_20px_rgba(0,201,167,0.3)] transition-all uppercase tracking-widest text-xs"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailsModal;
