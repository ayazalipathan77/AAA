import React from 'react';

interface TacticalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

const TacticalButton: React.FC<TacticalButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-8 py-3 font-heading font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group text-sm overflow-hidden";
  
  const variants = {
    primary: "bg-military-accent text-white hover:bg-military-accentDark clip-angled-sm shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] border border-transparent hover:border-white/20",
    secondary: "bg-transparent border border-military-600 text-military-text hover:border-military-accent hover:text-military-accent hover:bg-military-800/50 clip-angled-sm",
    danger: "bg-red-950 text-white border border-red-800 hover:bg-red-900 clip-angled-sm"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Target Overlay (Common for all variants) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/80"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/80"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/80"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/80"></div>
        
        {/* Edge Crosshairs */}
        <div className="absolute top-1/2 left-0 w-1 h-[1px] bg-white/50"></div>
        <div className="absolute top-1/2 right-0 w-1 h-[1px] bg-white/50"></div>
        <div className="absolute top-0 left-1/2 w-[1px] h-1 bg-white/50"></div>
        <div className="absolute bottom-0 left-1/2 w-[1px] h-1 bg-white/50"></div>
      </div>

      {/* Glitch effect bg for primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
      )}

      <div className="flex items-center justify-center gap-3 relative z-10">
        {icon}
        <span>{children}</span>
      </div>
      
      {/* Existing Tech corners (static) */}
      <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/30 group-hover:border-transparent transition-colors" />
      <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/30 group-hover:border-transparent transition-colors" />
    </button>
  );
};

export default TacticalButton;