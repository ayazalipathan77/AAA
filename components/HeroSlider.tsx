import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Target, AlertCircle } from 'lucide-react';
import { SLIDES } from '../constants';
import TacticalButton from './TacticalButton';

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-military-950">
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image Background with Overlay */}
          <div className="absolute inset-0">
             <img 
               src={slide.image} 
               alt={slide.title} 
               className="w-full h-full object-cover"
               style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.7)' }}
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIC8+Cjwvc3ZnPg==')] opacity-50" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center container mx-auto px-4">
            <div className="max-w-4xl space-y-8 pl-6 md:pl-12 border-l-2 border-military-accent relative">
              {/* Decorative line */}
              <div className="absolute -left-[2px] top-0 h-1/3 w-[2px] bg-white"></div>

              <div className="flex items-center gap-3 text-military-accent font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
                <AlertCircle className="w-4 h-4" />
                <span>Restricted Access // Level 5</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-white uppercase tracking-tighter leading-[0.85] font-heading drop-shadow-lg">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? "text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400" : "text-white"}>
                    {word}<br/>
                  </span>
                ))}
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 font-mono tracking-widest max-w-xl border-t border-gray-700 pt-6 mt-6">
                {slide.subtitle}
              </p>
              
              <div className="pt-8">
                <TacticalButton>
                  {slide.cta}
                </TacticalButton>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-12 right-12 z-20 flex flex-col items-end gap-6">
         {/* Slide Indicators */}
        <div className="flex flex-col gap-3">
          {SLIDES.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-1 h-12 transition-all duration-300 cursor-pointer border border-white/20 ${
                idx === current ? 'bg-military-accent border-military-accent' : 'bg-transparent hover:bg-white/10'
              }`}
            />
          ))}
        </div>
        
        {/* Arrows */}
        <div className="flex items-center gap-0 border border-military-700 bg-military-900/80 backdrop-blur">
          <button 
            onClick={prevSlide}
            className="p-4 hover:bg-military-accent text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="w-[1px] h-6 bg-military-700"></div>
          <button 
            onClick={nextSlide}
            className="p-4 hover:bg-military-accent text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute top-32 right-12 z-10 hidden lg:block pointer-events-none">
         <div className="border border-military-700 bg-black/40 backdrop-blur p-6 font-mono text-[10px] text-military-muted w-64 clip-angled-sm">
            <div className="flex justify-between items-center mb-4 border-b border-military-700 pb-2">
               <span className="text-military-accent">SYS.DIAGNOSTIC</span>
               <span className="animate-pulse">● REC</span>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between"><span>ATMOSPHERE</span><span>NORMAL</span></div>
               <div className="flex justify-between"><span>THREAT.LVL</span><span className="text-military-accent">ELEVATED</span></div>
               <div className="flex justify-between"><span>CONN.SECURE</span><span>TRUE</span></div>
            </div>
            <div className="mt-4 h-1 w-full bg-military-800 overflow-hidden">
               <div className="h-full w-2/3 bg-military-accent animate-[slide_2s_infinite_linear]"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HeroSlider;