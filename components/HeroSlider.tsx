import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Crosshair, Radio } from 'lucide-react';
import { SLIDES } from '../constants';
import TacticalButton from './TacticalButton';

const SLIDE_DURATION = 6000;

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
    setAnimKey(prev => prev + 1);
    setTimeout(() => setIsTransitioning(false), 900);
  }, [isTransitioning, current]);

  const nextSlide = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prevSlide = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-[60vh] md:h-[55vh] lg:h-[50vh] overflow-hidden bg-military-950 select-none">

      {/* === BACKGROUND SLIDES === */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0"
          style={{
            zIndex: index === current ? 2 : 1,
            opacity: index === current ? 1 : 0,
            transition: 'opacity 0.9s ease-in-out',
          }}
        >
          {/* Image with slow zoom */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              style={{
                filter: 'grayscale(80%) contrast(1.15) brightness(0.55)',
                animation: index === current ? 'heroZoomSlow 8s ease-out forwards' : 'none',
              }}
            />
          </div>

          {/* Multi-layer overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-military-950 via-transparent to-military-950/40" />

          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Scan line sweep */}
          {index === current && (
            <div
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-military-accent/40 to-transparent pointer-events-none"
              style={{
                zIndex: 5,
                animation: 'heroScanline 3.5s linear infinite',
              }}
            />
          )}
        </div>
      ))}

      {/* === CONTENT LAYER === */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl flex items-stretch gap-0" key={animKey}>

            {/* Animated accent bar */}
            <div className="hidden md:flex flex-col items-center mr-8 pt-1">
              <div className="w-[2px] h-full bg-military-accent/20 relative hero-line-grow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-military-accent rotate-45" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2">
                  <div
                    className="w-6 h-6 border border-military-accent/30 rounded-full"
                    style={{ animation: 'heroPulseRing 2s ease-out infinite' }}
                  />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-military-accent" />
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-5">
              {/* Tag line */}
              <div className="hero-reveal-up flex items-center gap-3">
                <Crosshair className="w-4 h-4 text-military-accent" style={{ animation: 'heroFlicker 3s infinite' }} />
                <div className="h-[1px] w-8 bg-military-accent hero-line-grow-x" />
                <span className="text-military-accent font-mono text-xs tracking-[0.4em] uppercase">
                  {`// ASSET ${String(current + 1).padStart(2, '0')} OF ${String(SLIDES.length).padStart(2, '0')}`}
                </span>
              </div>

              {/* Title with staggered word reveal */}
              <h1 className="leading-[0.9] tracking-tighter font-heading font-bold uppercase">
                {SLIDES[current].title.split(' ').map((word, i) => (
                  <span
                    key={`${animKey}-${i}`}
                    className={`inline-block mr-[0.3em] text-5xl md:text-7xl lg:text-8xl ${
                      i === 0
                        ? 'text-transparent bg-clip-text bg-gradient-to-br from-military-accent via-green-300 to-military-accent'
                        : 'text-white'
                    }`}
                    style={{
                      animation: `heroRevealUp 0.6s ${0.1 + i * 0.12}s ease-out both`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* Divider */}
              <div className="hero-reveal-up-d2 flex items-center gap-3">
                <div className="h-[1px] w-16 bg-gradient-to-r from-military-accent to-transparent" />
                <div className="w-1.5 h-1.5 bg-military-accent rotate-45" />
                <div className="h-[1px] flex-1 bg-gradient-to-r from-military-700/50 to-transparent max-w-48" />
              </div>

              {/* Subtitle */}
              <p className="hero-reveal-up-d3 text-sm md:text-base text-gray-400 font-mono tracking-[0.15em] max-w-xl leading-relaxed">
                {SLIDES[current].subtitle}
              </p>

              {/* CTA */}
              <div className="hero-reveal-up-d4 pt-2">
                <TacticalButton>
                  {SLIDES[current].cta}
                </TacticalButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === RIGHT SIDE CONTROLS === */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-5">
        {/* Slide indicators with timer fill */}
        <div className="flex flex-col gap-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className="relative w-[3px] h-10 bg-white/10 overflow-hidden group cursor-pointer"
            >
              {/* Active fill animation */}
              {idx === current && (
                <div
                  className="absolute bottom-0 left-0 w-full bg-military-accent"
                  style={{
                    animation: `heroTimerFill ${SLIDE_DURATION}ms linear forwards`,
                    height: '100%',
                    transformOrigin: 'bottom',
                  }}
                />
              )}
              {idx < current && (
                <div className="absolute inset-0 bg-military-accent/50" />
              )}
              {/* Hover glow */}
              <div className="absolute inset-0 bg-military-accent/0 group-hover:bg-military-accent/30 transition-colors" />
            </button>
          ))}
        </div>

        {/* Slide counter */}
        <div className="font-mono text-[10px] text-military-accent tracking-widest">
          {String(current + 1).padStart(2, '0')}
        </div>

        {/* Arrow controls */}
        <div className="flex flex-col border border-white/10 bg-black/30 backdrop-blur-sm">
          <button
            onClick={prevSlide}
            className="p-2.5 text-white/50 hover:text-white hover:bg-military-accent/20 transition-all"
          >
            <ChevronLeft className="w-4 h-4 rotate-90" />
          </button>
          <div className="h-[1px] bg-white/10" />
          <button
            onClick={nextSlide}
            className="p-2.5 text-white/50 hover:text-white hover:bg-military-accent/20 transition-all"
          >
            <ChevronRight className="w-4 h-4 rotate-90" />
          </button>
        </div>
      </div>

      {/* === HUD DECORATIONS === */}

      {/* Top-right data block */}
      <div className="absolute top-6 right-16 md:right-24 z-10 hidden lg:block pointer-events-none">
        <div className="font-mono text-[9px] text-military-accent/40 tracking-wider text-right space-y-1" style={{ animation: 'heroFlicker 4s infinite' }}>
          <div>SYS.STATUS <span className="text-military-accent/70">ONLINE</span></div>
          <div>THREAT.LEVEL <span className="text-red-400/60">ELEVATED</span></div>
          <div className="flex items-center justify-end gap-2">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>LIVE FEED</span>
          </div>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-20">
        <div
          key={`progress-${current}`}
          className="h-full bg-gradient-to-r from-military-accent/80 to-military-accent"
          style={{ animation: `heroTimerFill ${SLIDE_DURATION}ms linear forwards` }}
        />
      </div>

      {/* Bottom-left coordinates */}
      <div className="absolute bottom-4 left-6 md:left-12 z-10 font-mono text-[9px] text-white/15 tracking-widest pointer-events-none">
        33.6844N / 73.0479E &mdash; SECTOR ALPHA
      </div>

      {/* Corner brackets (top-left) */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-military-accent/20 pointer-events-none z-10" />
      <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-military-accent/50 pointer-events-none z-10" />

      {/* Corner brackets (bottom-right) */}
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-military-accent/20 pointer-events-none z-10" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-military-accent/50 pointer-events-none z-10" />
    </div>
  );
};

export default HeroSlider;
