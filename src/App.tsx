import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderHistoryPage } from './pages/OrderHistoryPage';
import { CursorEffect } from './components/CursorEffect';
import { CartModal } from './components/CartModal';
import { AuthButtons } from './components/AuthButtons';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Footer } from './components/Footer';

const CartButton = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="cart-button fixed top-4 right-4 bg-green-600 p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
      >
        <ShoppingCart className="text-white" />
        {state.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
            {state.items.length}
          </span>
        )}
      </button>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <CartProvider>
      <Router>
        <CursorEffect />
        <CartButton />
        <AuthButtons />
        <Navigation />
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;