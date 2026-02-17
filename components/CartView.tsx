import React from 'react';
import { CartItem } from '../types';
import TacticalButton from './TacticalButton';
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const CartView: React.FC<CartViewProps> = ({ items, onUpdateQuantity, onRemove, onCheckout, onContinueShopping }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.0825; // 8.25% mock tax
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + tax + shipping;

  return (
    <div className="w-full px-6 md:px-12 py-12 animate-fadeIn">
      <div className="mb-12 border-b border-white/10 pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-heading font-bold text-opaque-high uppercase tracking-widest drop-shadow-md">
            Requisition List
          </h2>
          <p className="text-military-accent font-mono text-sm mt-2">REVIEW ASSETS BEFORE DEPLOYMENT AUTHORIZATION</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-opaque-low font-mono text-xs tracking-widest">ORDER_ID: #{Math.floor(Math.random() * 90000) + 10000}</p>
          <p className="text-opaque-low font-mono text-xs tracking-widest">DATE: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-black/40 backdrop-blur-md border border-dashed border-white/10 clip-angled-sm">
          <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-6" />
          <h3 className="text-2xl font-heading text-white uppercase tracking-widest mb-4">No Assets Requisitioned</h3>
          <p className="text-opaque-med font-mono mb-8">YOUR LIST IS EMPTY. RETURN TO ARMORY TO SELECT GEAR.</p>
          <TacticalButton onClick={onContinueShopping}>
            Return to Armory
          </TacticalButton>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-black/40 backdrop-blur-md border-l-2 border-white/10 hover:border-military-accent p-4 flex flex-col md:flex-row items-center gap-6 transition-all group clip-angled-sm">
                {/* Image */}
                <div className="w-24 h-24 bg-black/50 border border-white/10 flex-shrink-0 p-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale contrast-125" />
                </div>

                {/* Info */}
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider">{item.name}</h3>
                  <p className="text-[10px] text-military-accent font-mono uppercase tracking-widest mb-2">{item.category}</p>
                  <p className="text-sm font-mono text-opaque-med">${item.price.toFixed(2)} UNIT COST</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 bg-black/50 border border-white/10 p-1">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="p-1 hover:text-military-accent transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-mono text-white">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="p-1 hover:text-military-accent transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal & Remove */}
                <div className="text-right min-w-[100px]">
                  <p className="text-lg font-mono font-bold text-white mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-[10px] font-mono text-red-500 hover:text-red-400 uppercase tracking-widest flex items-center justify-end gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 p-8 clip-angled-sm sticky top-28">
              <h3 className="text-xl font-heading font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Deployment Costs
              </h3>
              
              <div className="space-y-3 font-mono text-sm mb-8">
                <div className="flex justify-between text-opaque-med">
                  <span>SUBTOTAL</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-opaque-med">
                  <span>TAXES (EST. 8.25%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-opaque-med">
                  <span>LOGISTICS (SHIPPING)</span>
                  <span>{shipping === 0 ? 'GRATIS' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-white/10 my-4 pt-4 flex justify-between text-lg text-white font-bold">
                  <span>TOTAL AUTHORIZED</span>
                  <span className="text-military-accent">${total.toFixed(2)}</span>
                </div>
              </div>

              <TacticalButton onClick={onCheckout} className="w-full justify-center">
                Proceed to Auth <ArrowRight className="w-4 h-4" />
              </TacticalButton>

              <div className="mt-6 text-[10px] text-opaque-low font-mono text-center leading-relaxed">
                By authorizing this deployment, you agree to AAA Tactical's restricted end-user agreement. Exports regulated by ITAR.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;