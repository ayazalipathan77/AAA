import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { Plus, ArrowRight, Crosshair, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  forcedCategory?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onViewProduct, forcedCategory }) => {
  const [category, setCategory] = useState('All');
  const [activeSpecs, setActiveSpecs] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12; // Increased for full screen

  useEffect(() => {
    if (forcedCategory) {
      setCategory(forcedCategory);
      setActiveSpecs({});
    } else {
      setCategory('All');
    }
    setCurrentPage(1); // Reset page on category change
  }, [forcedCategory]);

  const categories = ['All', 'Firearms', 'Ammunition', 'Tactical Gear'];
  const FILTERABLE_KEYS = ['Caliber', 'Material', 'Rating', 'Grain', 'Gen', 'Action', 'Size', 'Capacity', 'License', 'Origin'];

  // 1. Filter by Category
  const categoryProducts = useMemo(() => {
    return category === 'All' 
      ? products 
      : products.filter(p => p.category === category);
  }, [category, products]);

  // 2. Derive available filters
  const availableFilters = useMemo(() => {
    const options: Record<string, Set<string>> = {};
    
    categoryProducts.forEach(product => {
      Object.entries(product.specs).forEach(([key, value]) => {
        if (FILTERABLE_KEYS.includes(key)) {
          if (!options[key]) options[key] = new Set();
          options[key].add(value);
        }
      });
    });

    return Object.entries(options).map(([key, values]) => ({
      key,
      values: Array.from(values).sort()
    }));
  }, [categoryProducts]);

  // 3. Filter products based on selected specs
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      return Object.entries(activeSpecs).every(([key, value]) => {
        return product.specs[key] === value;
      });
    });
  }, [categoryProducts, activeSpecs]);

  // 4. Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setActiveSpecs({}); 
    setCurrentPage(1);
  };

  const toggleSpec = (key: string, value: string) => {
    setActiveSpecs(prev => {
      const next = { ...prev };
      if (next[key] === value) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
    setCurrentPage(1);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800"; // Fallback tactical image
    e.currentTarget.onerror = null; // Prevent infinite loop
  };

  return (
    <div>
      {/* Main Category Tabs - Only show if no category is forced */}
      {!forcedCategory && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`relative px-8 py-3 font-heading font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 clip-angled-sm ${
                category === cat 
                  ? 'bg-military-accent text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]' 
                  : 'bg-black/40 backdrop-blur-sm text-opaque-med hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              {cat}
              {category === cat && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full mt-1 animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Dynamic Attribute Filters */}
      {availableFilters.length > 0 && (
        <div className="mb-12 max-w-5xl mx-auto">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 clip-angled-sm relative overflow-hidden">
            {/* Background Tech Deco */}
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <SlidersHorizontal className="w-16 h-16 text-white" />
            </div>
            
            <div className="flex items-center gap-2 mb-4 text-military-accent font-mono text-xs tracking-[0.3em] uppercase border-b border-white/10 pb-2">
              <Filter className="w-3 h-3" />
              <span>Ballistic Parameters // {category.toUpperCase()}</span>
            </div>

            <div className="flex flex-wrap gap-8">
              {availableFilters.map((filterGroup) => (
                <div key={filterGroup.key} className="flex flex-col gap-3 min-w-[100px]">
                  <span className="text-opaque-low text-[10px] font-mono font-bold uppercase tracking-wider">
                    {filterGroup.key}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {filterGroup.values.map((val) => {
                      const isActive = activeSpecs[filterGroup.key] === val;
                      return (
                        <button
                          key={val}
                          onClick={() => toggleSpec(filterGroup.key, val)}
                          className={`px-3 py-1 text-[10px] font-mono border transition-all clip-angled-sm uppercase ${
                            isActive
                              ? 'bg-military-accent border-military-accent text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                              : 'bg-transparent border-white/20 text-opaque-med hover:border-white/40 hover:text-white'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {displayedProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 bg-black/20 clip-angled-sm backdrop-blur-sm">
          <Crosshair className="w-12 h-12 text-military-700 mx-auto mb-4" />
          <h3 className="text-xl text-opaque-high font-heading uppercase tracking-widest">No Assets Found</h3>
          <p className="text-opaque-low font-mono text-sm mt-2">ADJUST FILTER PARAMETERS TO LOCATE INVENTORY.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fadeIn min-h-[600px] content-start">
            {displayedProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-black/40 backdrop-blur-md border-l border-white/10 hover:border-military-accent transition-all duration-300 flex flex-col h-full"
              >
                 {/* Tech Deco */}
                 <div className="absolute top-0 right-0 p-2 opacity-50 z-20">
                   <Crosshair className="w-4 h-4 text-military-600 group-hover:text-military-accent transition-colors" />
                 </div>

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-black/50 border-b border-white/5 group-hover:border-military-accent/50 transition-colors cursor-pointer" onClick={() => onViewProduct(product)}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 opacity-80 group-hover:opacity-60"
                    style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.9)' }}
                  />
                  
                  {/* Huge Target Sign Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 pointer-events-none">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <div className="absolute inset-0 border-[1px] border-military-accent/30 rounded-full animate-[spin_8s_linear_infinite]" />
                      <div className="absolute inset-2 border-[1px] border-dashed border-military-accent/20 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
                      <svg viewBox="0 0 100 100" className="w-40 h-40 text-military-accent drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
                        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                        <circle cx="50" cy="50" r="1" fill="currentColor" />
                        <path d="M30 30 L20 30 L20 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M70 30 L80 30 L80 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M30 70 L20 70 L20 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M70 70 L80 70 L80 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="50" y1="5" x2="50" y2="25" stroke="currentColor" strokeWidth="1" />
                        <line x1="50" y1="75" x2="50" y2="95" stroke="currentColor" strokeWidth="1" />
                        <line x1="5" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="1" />
                        <line x1="75" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 z-20">
                     <span className="inline-block px-3 py-1 bg-military-accent/90 text-white text-[10px] font-mono uppercase tracking-widest clip-angled-sm backdrop-blur-sm shadow-lg">
                       {product.category}
                     </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-opaque-high uppercase font-heading tracking-wider mb-2 group-hover:text-military-accent transition-colors">{product.name}</h3>
                  <div className="flex items-end gap-2 mb-6">
                     <p className="text-2xl text-white font-mono leading-none">${product.price.toFixed(2)}</p>
                     <span className="text-xs text-opaque-low font-mono mb-1">USD</span>
                  </div>
                  
                  {/* Detailed Specs Grid */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-6 border-t border-b border-white/5 py-4">
                     {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                       <div key={key} className="flex flex-col">
                         <span className="text-[9px] text-opaque-low uppercase tracking-widest">{key}</span>
                         <span className="text-xs text-opaque-high font-mono truncate">{value}</span>
                       </div>
                     ))}
                  </div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center text-xs font-mono mb-4">
                      <span className="text-opaque-low uppercase tracking-wider">STOCK LEVEL</span>
                      <span className={`${product.stock < 5 ? 'text-red-500 font-bold' : 'text-green-500'}`}>{product.stock} UNITS</span>
                    </div>

                    <div className="flex gap-3">
                       <button 
                         onClick={() => onViewProduct(product)}
                         className="flex-1 py-3 border border-white/20 text-xs font-bold font-heading text-opaque-med hover:text-white hover:border-military-accent hover:bg-military-accent/10 transition-all uppercase tracking-widest flex items-center justify-center gap-2 clip-angled-sm group/btn relative overflow-hidden"
                       >
                         <span className="absolute inset-0 border border-military-accent opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none"></span>
                         <span className="relative z-10 flex items-center gap-2">
                           Details <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                         </span>
                       </button>
                       <button 
                         onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                         disabled={product.stock === 0}
                         className="w-12 bg-white/5 hover:bg-military-accent text-white flex items-center justify-center clip-angled-sm transition-colors border border-white/10 hover:border-transparent disabled:opacity-50 disabled:hover:bg-transparent relative group/add"
                       >
                         <div className="absolute inset-0 border border-white opacity-0 group-hover/add:opacity-50 pointer-events-none"></div>
                         <Plus className="w-4 h-4 relative z-10" />
                       </button>
                    </div>
                  </div>
                </div>
                
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-white/20 group-hover:border-military-accent transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-white/20 group-hover:border-military-accent transition-colors" />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-3 bg-black/40 border border-white/10 text-white disabled:opacity-30 hover:border-military-accent transition-all clip-angled-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                   <button
                     key={page}
                     onClick={() => setCurrentPage(page)}
                     className={`w-10 h-10 font-mono text-sm font-bold border clip-angled-sm transition-all ${
                       currentPage === page 
                         ? 'bg-military-accent border-military-accent text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]' 
                         : 'bg-transparent border-white/20 text-opaque-low hover:border-white/50 hover:text-white'
                     }`}
                   >
                     {page}
                   </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-3 bg-black/40 border border-white/10 text-white disabled:opacity-30 hover:border-military-accent transition-all clip-angled-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;