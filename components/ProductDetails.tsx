import React from 'react';
import { Product } from '../types';
import TacticalButton from './TacticalButton';
import { ArrowLeft, ShoppingCart, Shield, Activity, Target, Zap } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-opaque-low hover:text-military-accent mb-8 font-mono text-sm tracking-widest transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        RETURN TO ARMORY
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left: Visuals */}
        <div className="relative">
          <div className="relative w-full aspect-square bg-black/40 backdrop-blur-md border border-white/10 clip-tech p-8 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            {/* HUD Rings */}
            <div className="absolute inset-0 border-[20px] border-black/50 clip-tech pointer-events-none" />
            <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-military-accent/30 rounded-tr-3xl" />
            <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-military-accent/30 rounded-bl-3xl" />

            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
              style={{ filter: 'grayscale(0.8) contrast(1.1)' }}
            />
            
            {/* Floating Stats */}
            <div className="absolute bottom-8 right-8 z-20 bg-black/90 backdrop-blur border border-white/20 p-4">
               <div className="flex items-center gap-3 text-military-accent font-mono text-xs mb-1">
                 <Activity className="w-3 h-3" />
                 <span>CONDITION: FACTORY NEW</span>
               </div>
               <div className="h-1 w-full bg-military-700">
                 <div className="h-full w-[98%] bg-military-accent animate-pulse" />
               </div>
            </div>
          </div>

          {/* Thumbnails / Extra Data */}
          <div className="mt-6 grid grid-cols-3 gap-4">
             {[Shield, Target, Zap].map((Icon, i) => (
               <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/10 p-4 flex flex-col items-center justify-center gap-2 text-opaque-low hover:text-white hover:border-military-accent transition-all cursor-pointer">
                 <Icon className="w-5 h-5" />
                 <span className="text-[10px] font-mono tracking-widest">MODULE {i+1}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Right: Intel */}
        <div className="flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-3">
             <span className="px-3 py-1 bg-military-accent text-white text-xs font-bold font-mono tracking-wider clip-angled-sm shadow-lg">
               TIER 1 ASSET
             </span>
             <span className="text-opaque-low font-mono text-xs tracking-widest uppercase">
               ID: {product.id.toString().padStart(4, '0')}-X
             </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase text-opaque-high mb-4 leading-none drop-shadow-lg">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-4xl text-military-accent font-mono font-bold">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-opaque-low line-through font-mono">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>

          <div className="prose prose-invert max-w-none mb-10">
            <p className="text-opaque-med font-sans text-lg leading-relaxed border-l-2 border-military-600 pl-4">
              {product.description}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 mb-10 clip-angled-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-20">
               <HexPattern />
             </div>
             <h3 className="text-white font-heading font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
               <span className="w-2 h-2 bg-military-accent" />
               Technical Specifications
             </h3>
             <div className="grid grid-cols-2 gap-y-4 gap-x-8">
               {Object.entries(product.specs).map(([key, value]) => (
                 <div key={key} className="flex flex-col">
                   <span className="text-opaque-low text-xs font-mono uppercase tracking-wider mb-1">{key}</span>
                   <span className="text-opaque-high font-mono text-sm border-b border-white/10 pb-1">{value}</span>
                 </div>
               ))}
               <div className="flex flex-col">
                   <span className="text-opaque-low text-xs font-mono uppercase tracking-wider mb-1">STOCK STATUS</span>
                   <span className="text-green-500 font-mono text-sm border-b border-white/10 pb-1">{product.stock} UNITS AVAILABLE</span>
               </div>
             </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <TacticalButton onClick={onAddToCart} className="flex-1 text-lg">
              <ShoppingCart className="w-5 h-5" />
              Acquire Asset
            </TacticalButton>
            <TacticalButton variant="secondary" onClick={() => {}}>
              Save Intel
            </TacticalButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const HexPattern = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" fill="white"/>
  </svg>
);

export default ProductDetails;