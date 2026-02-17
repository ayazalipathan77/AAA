import React, { useState } from 'react';
import TacticalButton from './TacticalButton';
import { ShieldAlert, Key } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth for demo purposes
    if (code === '1234' || code === 'admin') {
      onLogin();
    } else {
      setError(true);
      setCode('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-24">
      <div className="max-w-md w-full p-8 bg-black/80 backdrop-blur-md border border-military-accent/50 clip-tech shadow-[0_0_50px_rgba(34,197,94,0.2)]">
        <div className="text-center mb-10">
          <ShieldAlert className="w-16 h-16 text-military-accent mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl font-heading font-bold text-white uppercase tracking-[0.2em]">
            Restricted Access
          </h1>
          <p className="text-military-accent font-mono text-xs mt-2 tracking-widest">
            CLEARANCE LEVEL 5 REQUIRED
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-opaque-low uppercase tracking-widest block">
              Authorization Code
            </label>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-military-accent" />
              <input 
                type="password"
                value={code}
                onChange={(e) => { setCode(e.target.value); setError(false); }}
                className="w-full bg-military-900 border border-military-700 text-white font-mono text-center text-xl tracking-[0.5em] px-4 py-4 focus:outline-none focus:border-military-accent transition-colors pl-12"
                placeholder="••••"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-500 font-mono text-xs text-center pt-2 animate-pulse">
                ACCESS DENIED. INVALID CREDENTIALS.
              </p>
            )}
          </div>

          <TacticalButton type="submit" className="w-full justify-center">
            Verify Identity
          </TacticalButton>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
           <p className="text-[10px] text-opaque-low font-mono">
             UNAUTHORIZED ACCESS ATTEMPTS ARE LOGGED AND REPORTED TO MILITARY POLICE.
           </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;