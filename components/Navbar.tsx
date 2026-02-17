import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Hexagon, Search, Lock } from 'lucide-react';
import { PageView } from '../App';

interface NavbarProps {
  cartCount: number;
  currentView: string;
  onNavigate: (view: PageView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: PageView[] = ['ARMORY', 'MUNITIONS', 'GEAR', 'INTEL'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      isScrolled 
        ? 'bg-military-950/90 backdrop-blur-md border-military-800 py-3 shadow-2xl' 
        : 'bg-transparent border-transparent py-6'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          
          {/* Logo Area */}
          <div 
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => onNavigate('HOME')}
          >
            <div className="relative w-12 h-12 bg-military-accent clip-angled-sm flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
              <Hexagon className="text-white w-8 h-8 group-hover:rotate-180 transition-transform duration-700" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading tracking-widest text-white leading-none italic">
                AAA
              </h1>
              <span className="text-[10px] font-mono text-military-accent tracking-[0.4em] block uppercase">
                Tactical
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center bg-military-900/50 clip-angled-sm border border-white/5 px-8">
            {menuItems.map((item) => (
              <button 
                key={item} 
                onClick={() => onNavigate(item)}
                className={`relative text-xs font-heading font-bold tracking-[0.2em] transition-colors py-4 px-6 group ${
                  currentView === item ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-military-accent transition-transform duration-300 origin-left ${
                  currentView === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
          </div>

          {/* Icons / Controls */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center border-b border-white/20 pb-1">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="SEARCH_DB..." 
                className="bg-transparent border-none text-xs font-mono text-white focus:outline-none w-24 placeholder-gray-600"
              />
            </div>
            
            <button 
              onClick={() => onNavigate('CART')}
              className={`relative flex items-center justify-center w-10 h-10 text-white hover:text-military-accent transition-colors group ${currentView === 'CART' ? 'text-military-accent' : ''}`}
            >
              <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center clip-angled-sm bg-military-accent text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Hidden Link */}
            <button 
              onClick={() => onNavigate('ADMIN_DASHBOARD')}
              className="text-white/20 hover:text-military-accent transition-colors"
              title="C2 Access"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-military-900 border-b border-military-800 p-4 flex flex-col gap-4 shadow-2xl animate-slideDown">
          {menuItems.map((item) => (
            <button 
              key={item} 
              onClick={() => {
                onNavigate(item);
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-white font-heading font-bold text-xl tracking-widest border-l-2 border-transparent hover:border-military-accent pl-4 transition-all"
            >
              {item}
            </button>
          ))}
          <button 
              onClick={() => {
                onNavigate('CART');
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-white font-heading font-bold text-xl tracking-widest border-l-2 border-transparent hover:border-military-accent pl-4 transition-all"
            >
              REQUISITION LIST
            </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;