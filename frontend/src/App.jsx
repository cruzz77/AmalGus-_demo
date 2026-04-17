import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import DiscoveryPage from './pages/DiscoveryPage';
import SuppliersPage from './pages/SuppliersPage';
import MaterialsPage from './pages/MaterialsPage';
import QuotePage from './pages/QuotePage';
import OrderHistoryPage from './pages/OrderHistoryPage';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/discover" 
          element={
            <PageTransition>
              <DiscoveryPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/suppliers" 
          element={
            <PageTransition>
              <SuppliersPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/materials" 
          element={
            <PageTransition>
              <MaterialsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/quote" 
          element={
            <PageTransition>
              <QuotePage />
            </PageTransition>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <PageTransition>
              <OrderHistoryPage />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

