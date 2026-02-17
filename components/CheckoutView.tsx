import React, { useState } from 'react';
import TacticalButton from './TacticalButton';
import { ArrowLeft, CreditCard, ShieldCheck, Lock } from 'lucide-react';

interface CheckoutViewProps {
  cartTotal: number;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cartTotal, onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', address: '', city: '', zip: '', card: '', exp: '', cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn max-w-4xl">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-opaque-low hover:text-military-accent mb-8 font-mono text-sm tracking-widest transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        MODIFY REQUISITION
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Area */}
        <div className="md:col-span-2">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 p-8 clip-angled-sm">
            <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-widest mb-8 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-military-accent" />
              Deployment Authorization
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Logistics */}
              <div>
                <h3 className="text-sm font-mono text-military-accent uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                  // Sector 1: Logistics Data
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input name="firstName" placeholder="OPERATOR FIRST NAME" value={formData.firstName} onChange={handleChange} />
                  <Input name="lastName" placeholder="OPERATOR LAST NAME" value={formData.lastName} onChange={handleChange} />
                  <Input name="address" placeholder="SECTOR / STREET ADDRESS" className="col-span-2" value={formData.address} onChange={handleChange} />
                  <Input name="city" placeholder="ZONE / CITY" value={formData.city} onChange={handleChange} />
                  <Input name="zip" placeholder="AREA CODE" value={formData.zip} onChange={handleChange} />
                </div>
              </div>

              {/* Section 2: Funding */}
              <div className="pt-4">
                <h3 className="text-sm font-mono text-military-accent uppercase tracking-widest mb-4 border-b border-white/10 pb-2">
                  // Sector 2: Funding Source
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                     <Input name="card" placeholder="0000 0000 0000 0000" icon={<CreditCard className="w-4 h-4" />} value={formData.card} onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input name="exp" placeholder="MM/YY" value={formData.exp} onChange={handleChange} />
                    <Input name="cvv" placeholder="CVV (SECURE)" type="password" value={formData.cvv} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <TacticalButton type="submit" className="w-full justify-center">
                  Authorize Deployment
                </TacticalButton>
              </div>

            </form>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="md:col-span-1">
          <div className="bg-military-900/80 border border-military-accent/30 p-6 clip-angled-sm sticky top-28">
            <div className="flex items-center gap-2 text-military-accent font-mono text-xs tracking-widest mb-4 animate-pulse">
              <Lock className="w-3 h-3" />
              SECURE CONNECTION: ENCRYPTED
            </div>
            
            <h3 className="text-white font-heading font-bold uppercase mb-4">Summary</h3>
            <div className="flex justify-between items-center text-sm font-mono text-opaque-med mb-4">
               <span>TOTAL CHARGE</span>
               <span className="text-white font-bold text-lg">${cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="text-[10px] text-opaque-low font-mono leading-relaxed border-t border-white/10 pt-4">
              All transactions are monitored by AAA Tactical Central Command. Attempts at fraud will result in immediate blacklist and IP tracing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ className = '', icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }) => (
  <div className={`relative ${className}`}>
    <input 
      className={`w-full bg-black/50 border border-white/20 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-military-accent transition-colors placeholder-gray-600 ${icon ? 'pl-10' : ''}`}
      required
      {...props}
    />
    {icon && (
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        {icon}
      </div>
    )}
  </div>
);

export default CheckoutView;