import React from 'react';
import { Hexagon, Mail, Phone, MapPin, Facebook, Twitter, Instagram, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 pt-20 pb-10 relative overflow-hidden mt-12">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-military-accent to-transparent opacity-30" />
      <div className="absolute -left-10 bottom-0 w-64 h-64 bg-military-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
             <div className="flex items-center gap-3">
                <Hexagon className="text-military-accent w-10 h-10" strokeWidth={1.5} />
                <span className="text-3xl font-bold font-heading tracking-widest text-white italic">AAA</span>
             </div>
             <p className="text-opaque-med text-sm font-sans leading-relaxed">
               ELITE TACTICAL SOLUTIONS FOR THE MODERN OPERATOR. GLOBAL LOGISTICS. UNMATCHED FIREPOWER.
             </p>
             <div className="flex gap-4 pt-4">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-opaque-low hover:text-white hover:border-military-accent hover:bg-military-accent/10 transition-all clip-angled-sm">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
             </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-opaque-high font-heading font-bold uppercase tracking-widest text-lg mb-8 relative inline-block">
              Armory
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-military-accent"></span>
            </h4>
            <ul className="space-y-4 font-mono text-sm text-opaque-low">
              {['ASSAULT RIFLES', 'PRECISION OPTICS', 'BALLISTIC ARMOR', 'AMMUNITION', 'TRAINING'].map(item => (
                <li key={item} className="hover:text-military-accent transition-colors cursor-pointer flex items-center gap-2 group">
                  <ChevronRight className="w-3 h-3 text-military-700 group-hover:text-military-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
             <h4 className="text-opaque-high font-heading font-bold uppercase tracking-widest text-lg mb-8 relative inline-block">
               Secure Comms
               <span className="absolute -bottom-2 left-0 w-8 h-1 bg-military-accent"></span>
             </h4>
             <ul className="space-y-6 font-mono text-sm text-opaque-low">
               <li className="flex items-start gap-4">
                 <MapPin className="w-5 h-5 text-military-accent shrink-0 mt-1" />
                 <span>SECTOR 7, INDUSTRIAL ZONE<br/>NEVADA, USA</span>
               </li>
               <li className="flex items-center gap-4">
                 <Phone className="w-5 h-5 text-military-accent shrink-0" />
                 <span>+1 (555) 867-5309</span>
               </li>
               <li className="flex items-center gap-4">
                 <Mail className="w-5 h-5 text-military-accent shrink-0" />
                 <span>ENCRYPTED@AAA-TACTICAL.COM</span>
               </li>
             </ul>
          </div>

          {/* Newsletter */}
          <div>
             <h4 className="text-opaque-high font-heading font-bold uppercase tracking-widest text-lg mb-8 relative inline-block">
               Intel Brief
               <span className="absolute -bottom-2 left-0 w-8 h-1 bg-military-accent"></span>
             </h4>
             <div className="flex flex-col gap-4">
               <input 
                 type="email" 
                 placeholder="ENTER_EMAIL_ID"
                 className="bg-black/50 border border-white/20 px-6 py-4 text-xs font-mono text-white focus:outline-none focus:border-military-accent transition-colors"
               />
               <button className="bg-white text-black font-heading font-bold uppercase tracking-[0.2em] text-xs py-4 hover:bg-military-accent hover:text-white transition-all clip-angled-sm">
                 Subscribe
               </button>
               <span className="text-[10px] text-opaque-low font-mono">
                 // WARNING: AUTHORIZED PERSONNEL ONLY
               </span>
             </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-opaque-low text-[10px] font-mono tracking-widest uppercase">
            © 2024 AAA TACTICAL SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-opaque-low">
             <span>TERMS</span>
             <span>//</span>
             <span>PRIVACY</span>
             <span>//</span>
             <span>SECURITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;