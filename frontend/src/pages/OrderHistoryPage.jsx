import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import OrderDetailsModal from '../components/OrderDetailsModal';
import { Package, Clock, CheckCircle2, Truck, ExternalLink, AlertCircle, Trash2 } from 'lucide-react';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Details Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Guest User"}');

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please sign in to view your order history.');
        setIsLoading(false);
        return;
      }

      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await axios.get(`${baseUrl}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setOrders(response.data.data.orders);
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
      setError('Failed to load order history. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('token');
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      
      await axios.delete(`${baseUrl}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Refresh orders
      fetchOrders();
    } catch (err) {
      console.error('Cancel order error:', err);
      alert(err.response?.data?.message || 'Failed to cancel order. Please try again.');
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="bg-surface min-h-screen">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-text-primary tracking-tight">Order <span className="text-accent">History</span></h1>
              <p className="text-text-muted">Tracking your recent procurement and estimates.</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-text-muted uppercase font-bold tracking-widest mb-1">Signed in as</div>
              <div className="font-bold text-text-primary">{user.name}</div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-[32px] flex items-center gap-4">
              <AlertCircle size={24} />
              <p className="font-bold">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                 <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                 <p className="text-text-muted font-bold animate-pulse">Fetching your orders...</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-white/5 bg-white/5 hover:border-accent/30 transition-all group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                      <Package size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-mono text-text-muted">#{order._id.slice(-6).toUpperCase()}</span>
                        <span className={`text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded ${
                          order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 
                          order.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500' : 
                          order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' : 'bg-white/10 text-text-muted'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors">{order.productName}</h3>
                      <div className="text-sm text-text-muted flex items-center gap-4 mt-1">
                        <span>{order.dimensions?.width}x{order.dimensions?.height} mm</span>
                        <span>{order.dimensions?.quantity} units</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> {new Date(order.createdAt).toLocaleDateString()}</span>
                        <span className="text-accent font-bold">₹{order.totalCost?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleViewDetails(order)}
                      className="flex-1 md:flex-none border border-white/10 hover:border-accent/40 px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} /> Details
                    </button>
                    {order.status === 'Pending' && (
                      <button 
                        onClick={() => handleCancelOrder(order._id)}
                        className="flex-1 md:flex-none border border-red-500/20 hover:border-red-500/50 text-red-500/80 hover:text-red-500 px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} /> Cancel
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <button className="flex-1 md:flex-none bg-accent text-primary px-6 py-2.5 rounded-xl text-sm font-bold hover:scale-105 transition-all">
                        Re-order
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}

            {!isLoading && orders.length === 0 && !error && (
              <div className="text-center py-20 bg-white/5 rounded-[32px] border border-dashed border-white/10">
                <div className="text-text-muted mb-4 uppercase tracking-widest font-bold">No orders found</div>
                <p className="text-text-muted max-w-xs mx-auto text-sm">You haven't placed any orders yet. Start by discovering products or getting a quote.</p>
              </div>
            )}
          </div>

          <div className="bg-accent/5 border border-accent/20 p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center shadow-[0_0_20px_rgba(0,201,167,0.4)]">
              <Truck size={40} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-2">Need Bulk Shipping Assistance?</h4>
              <p className="text-text-muted text-sm">Our logistics partners can help with interstate glass transport and crane loading for large projects.</p>
            </div>
            <button className="bg-white text-black font-bold px-8 py-3 rounded-2xl hover:scale-105 transition-all">
              Contact Logistics
            </button>
          </div>
        </div>
      </main>

      {/* Details Modal */}
      <OrderDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderHistoryPage;
