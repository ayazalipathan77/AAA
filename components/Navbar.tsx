import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Shield, Target } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full z-50 bg-neutral-900/95 backdrop-blur-md border-b border-gray-800 text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="w-10 h-10 text-red-600 fill-red-900/20" strokeWidth={1.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-4 h-4 text-red-500 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tighter text-white leading-none group-hover:text-red-500 transition-colors">
                TISAS <span className="text-red-600">USA</span>
              </h1>
              <span className="text-[0.6rem] font-mono tracking-[0.3em] text-gray-400 uppercase">
                Premium Firearms
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
            <Link to="/products" className="hover:text-red-500 transition-colors py-2 border-b-2 border-transparent hover:border-red-500">Handguns</Link>
            <Link to="/products" className="hover:text-red-500 transition-colors py-2 border-b-2 border-transparent hover:border-red-500">Rifles</Link>
            <Link to="/products" className="hover:text-red-500 transition-colors py-2 border-b-2 border-transparent hover:border-red-500">Gear</Link>
            <Link to="#" className="hover:text-red-500 transition-colors py-2 border-b-2 border-transparent hover:border-red-500">Support</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="hover:text-red-500 transition-colors">
              <Search size={20} />
            </button>
            <Link to="/admin" className="hover:text-red-500 transition-colors">
              <User size={20} />
            </Link>
            <Link to="/cart" className="relative hover:text-red-500 transition-colors group">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm group-hover:bg-red-500">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red-500 transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-t border-gray-800 absolute w-full left-0 animate-in slide-in-from-top-2 duration-200">
          <div className="px-6 py-8 space-y-6 flex flex-col items-center text-center">
            <Link to="/products" className="text-xl font-bold uppercase tracking-widest hover:text-red-500" onClick={() => setIsMenuOpen(false)}>Handguns</Link>
            <Link to="/products" className="text-xl font-bold uppercase tracking-widest hover:text-red-500" onClick={() => setIsMenuOpen(false)}>Rifles</Link>
            <Link to="/products" className="text-xl font-bold uppercase tracking-widest hover:text-red-500" onClick={() => setIsMenuOpen(false)}>Gear</Link>
            <Link to="#" className="text-xl font-bold uppercase tracking-widest hover:text-red-500" onClick={() => setIsMenuOpen(false)}>Support</Link>
            <div className="w-12 h-px bg-gray-700 my-4"></div>
            <Link to="/cart" className="flex items-center gap-2 text-lg hover:text-red-500" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart size={20} /> Cart ({cartCount})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;