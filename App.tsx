import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { Product, CartItem, Order } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  // Global State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Placeholder state for orders/products management if needed globally later
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);

  // --- Cart Logic ---
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // --- Render ---
  return (
    <Router>
      <div className="min-h-screen text-gray-900 font-sans selection:bg-red-700 selection:text-white overflow-x-hidden flex flex-col">
        <Navbar cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Catalog />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route
              path="/cart"
              element={
                <CartView
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveFromCart}
                  onCheckout={() => { }}
                  onContinueShopping={() => { }}
                />
              }
            />
            {/* Admin Routes could be protected here */}
            <Route path="/admin/login" element={<AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />} />
            <Route path="/admin" element={isAdminAuthenticated ? <AdminDashboard products={products} orders={orders} onUpdateProduct={() => { }} onAddProduct={() => { }} onEditProduct={() => { }} onDeleteProduct={() => { }} onUpdateOrderStatus={() => { }} onLogout={() => setIsAdminAuthenticated(false)} /> : <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;