import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails';
import IntelGrid from './components/IntelGrid';
import { Product } from './types';

type PageView = 'HOME' | 'ARMORY' | 'MUNITIONS' | 'GEAR' | 'INTEL' | 'PRODUCT_DETAILS';

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const [currentView, setCurrentView] = useState<PageView>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('PRODUCT_DETAILS');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: PageView) => {
    setSelectedProduct(null);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const getPageTitle = () => {
    switch(currentView) {
      case 'ARMORY': return 'Firearms';
      case 'MUNITIONS': return 'Ammunition';
      case 'GEAR': return 'Tactical Gear';
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

  return (
    <div className="min-h-screen text-military-text font-sans selection:bg-military-accent selection:text-white overflow-x-hidden">
      {/* Background Grid Texture - Made more subtle */}
      <div className="fixed inset-0 bg-[size:50px_50px] bg-grid-pattern opacity-[0.05] pointer-events-none z-0 mix-blend-overlay" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar 
          cartCount={cartCount} 
          currentView={currentView}
          onNavigate={handleNavigate}
        />
        
        <main className="flex-grow pt-24">
          {currentView === 'PRODUCT_DETAILS' && selectedProduct ? (
            <div className="pt-12">
              <ProductDetails 
                product={selectedProduct} 
                onBack={() => handleNavigate('HOME')}
                onAddToCart={handleAddToCart}
              />
            </div>
          ) : currentView === 'INTEL' ? (
             <IntelGrid />
          ) : (
            <>
              {currentView === 'HOME' && (
                <div className="-mt-24">
                  <HeroSlider />
                </div>
              )}
              
              <div className={`container mx-auto px-4 relative ${currentView === 'HOME' ? 'py-24' : 'py-12'}`}>
                {/* Section Header */}
                <div className="mb-20 text-center relative animate-fadeIn">
                  <span className="text-military-accent font-mono text-sm tracking-[0.5em] uppercase block mb-4 font-bold">Classified Assets</span>
                  <h2 className="text-5xl md:text-7xl font-bold font-heading uppercase tracking-tighter text-opaque-high mb-6 drop-shadow-2xl">
                    {currentView === 'HOME' ? (
                      <>Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-military-accent to-red-900">Hardware</span></>
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
                  onAddToCart={handleAddToCart} 
                  onViewProduct={handleViewProduct}
                  forcedCategory={getForcedCategory()}
                />
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;