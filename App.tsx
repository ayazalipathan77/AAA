import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import IntelGrid from './components/IntelGrid';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { Product, CartItem, Order } from './types';
import { PRODUCTS } from './constants';

export type PageView = 'HOME' | 'ARMORY' | 'MUNITIONS' | 'GEAR' | 'INTEL' | 'PRODUCT_DETAILS' | 'CART' | 'CHECKOUT' | 'ADMIN_LOGIN' | 'ADMIN_DASHBOARD';

const App: React.FC = () => {
  // Global State
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 'ORD-9821', 
      customer: { name: 'J. WICK', email: 'baba.yaga@continental.com', address: 'Unknown' },
      total: 2450.00, 
      status: 'DEPLOYED', 
      date: '2024-03-15', 
      items: [{...PRODUCTS[0], quantity: 1}, {...PRODUCTS[2], quantity: 3}],
      shipping: 50,
      tax: 200
    },
    { 
      id: 'ORD-9822', 
      customer: { name: 'S. FISHER', email: 's.fisher@third.echelon', address: 'NSA HQ' },
      total: 125.50, 
      status: 'PENDING', 
      date: '2024-03-16', 
      items: [{...PRODUCTS[5], quantity: 10}],
      shipping: 0,
      tax: 10
    }
  ]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentView, setCurrentView] = useState<PageView>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

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

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckoutComplete = (customerDetails: any) => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.0825;
    const shipping = subtotal > 1000 ? 0 : 50;
    const total = subtotal + tax + shipping;

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
      customer: {
        name: `${customerDetails.firstName} ${customerDetails.lastName}`,
        email: 'classified@user.net', // Simulating email for now
        address: `${customerDetails.address}, ${customerDetails.city}`
      },
      total: total,
      status: 'PENDING',
      date: new Date().toLocaleDateString(),
      items: [...cartItems],
      shipping,
      tax
    };

    // Update orders
    setOrders(prev => [newOrder, ...prev]);

    // Update stock levels
    const updatedProducts = products.map(p => {
      const cartItem = cartItems.find(c => c.id === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    });
    setProducts(updatedProducts);

    handleClearCart();
    handleNavigate('HOME');
    alert(`REQUISITION ${newOrder.id} CONFIRMED. ASSETS PREPARING FOR DEPLOYMENT.`);
  };

  // --- Admin Logic ---
  const handleUpdateProduct = (id: number, field: string, value: any) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts(prev => [...prev, { ...newProductData, id: newId }]);
  };

  const handleFullEditProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => 
      o.id === id ? { ...o, status } : o
    ));
  };

  // --- Navigation Logic ---
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('PRODUCT_DETAILS');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: PageView) => {
    // Auth Guard for Admin Dashboard
    if (view === 'ADMIN_DASHBOARD' && !isAdminAuthenticated) {
      setCurrentView('ADMIN_LOGIN');
    } else {
      setSelectedProduct(null);
      setCurrentView(view);
    }
    window.scrollTo(0, 0);
  };

  const getPageTitle = () => {
    switch(currentView) {
      case 'ARMORY': return 'Firearms';
      case 'MUNITIONS': return 'Ammunition';
      case 'GEAR': return 'Tactical Gear';
      case 'CART': return 'Requisition List';
      case 'CHECKOUT': return 'Deployment Auth';
      case 'ADMIN_LOGIN': return 'Secure Access';
      case 'ADMIN_DASHBOARD': return 'Command & Control';
      default: return 'Operational Hardware';
    }
  };

  const getForcedCategory = () => {
    switch(currentView) {
      case 'ARMORY': return 'Firearms';
      case 'MUNITIONS': return 'Ammunition';
      case 'GEAR': return 'Tactical Gear';
      default: return undefined;
    }
  };

  // --- Render Views ---
  const renderContent = () => {
    switch (currentView) {
      case 'PRODUCT_DETAILS':
        return selectedProduct ? (
          <div className="pt-12">
            <ProductDetails 
              product={products.find(p => p.id === selectedProduct.id) || selectedProduct} 
              onBack={() => handleNavigate('HOME')}
              onAddToCart={() => handleAddToCart(selectedProduct)}
            />
          </div>
        ) : null;
      
      case 'CART':
        return (
          <CartView 
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
            onCheckout={() => handleNavigate('CHECKOUT')}
            onContinueShopping={() => handleNavigate('HOME')}
          />
        );
      
      case 'CHECKOUT':
        return (
          <CheckoutView 
            cartTotal={cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
            onComplete={handleCheckoutComplete}
            onBack={() => handleNavigate('CART')}
          />
        );

      case 'ADMIN_LOGIN':
        return (
          <AdminLogin 
            onLogin={() => {
              setIsAdminAuthenticated(true);
              handleNavigate('ADMIN_DASHBOARD');
            }}
          />
        );

      case 'ADMIN_DASHBOARD':
        return (
          <AdminDashboard 
            products={products}
            orders={orders}
            onUpdateProduct={handleUpdateProduct} // Inline quick edit
            onAddProduct={handleAddProduct}
            onEditProduct={handleFullEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onLogout={() => {
              setIsAdminAuthenticated(false);
              handleNavigate('HOME');
            }}
          />
        );

      case 'INTEL':
        return <IntelGrid />;
      
      case 'HOME':
      case 'ARMORY':
      case 'MUNITIONS':
      case 'GEAR':
        return (
          <>
            {currentView === 'HOME' && (
              <div className="-mt-24">
                <HeroSlider />
              </div>
            )}
            
            <div className={`container mx-auto px-4 relative ${currentView === 'HOME' ? 'py-24' : 'py-12'}`}>
              <div className="mb-20 text-center relative animate-fadeIn">
                <span className="text-military-accent font-mono text-sm tracking-[0.5em] uppercase block mb-4 font-bold">Classified Assets</span>
                <h2 className="text-5xl md:text-7xl font-bold font-heading uppercase tracking-tighter text-opaque-high mb-6 drop-shadow-2xl">
                  {currentView === 'HOME' ? (
                    <>Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-military-accent to-military-600">Hardware</span></>
                  ) : (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{getPageTitle()}</span>
                  )}
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-military-700"></div>
                  <div className="h-1 w-1 bg-military-accent"></div>
                  <div className="h-px w-12 bg-military-700"></div>
                </div>
              </div>

              <ProductGrid 
                products={products}
                onAddToCart={handleAddToCart} 
                onViewProduct={handleViewProduct}
                forcedCategory={getForcedCategory()}
              />
            </div>
          </>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-military-text font-sans selection:bg-military-accent selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[size:50px_50px] bg-grid-pattern opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          currentView={currentView}
          onNavigate={handleNavigate}
        />
        
        <main className="flex-grow pt-24">
          {renderContent()}
        </main>

        {currentView !== 'ADMIN_LOGIN' && currentView !== 'ADMIN_DASHBOARD' && <Footer />}
      </div>
    </div>
  );
};

export default App;