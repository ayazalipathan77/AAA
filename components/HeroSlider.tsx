import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Crosshair, Radio } from 'lucide-react';
import { SLIDES } from '../constants';
import TacticalButton from './TacticalButton';

const SLIDE_DURATION = 6000;

const HeroSlider: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [animKey, setAnimKey] = useState(0);

    const goTo = useCallback((index: number) => {
        if (index === current) return;
        setCurrent(index);
        setAnimKey((k) => k + 1);
    }, [current]);

    const nextSlide = useCallback(() => {
        goTo((current + 1) % SLIDES.length);
    }, [current, goTo]);

    const prevSlide = useCallback(() => {
        goTo((current - 1 + SLIDES.length) % SLIDES.length);
    }, [current, goTo]);

    useEffect(() => {
        const t = setInterval(nextSlide, SLIDE_DURATION);
        return () => clearInterval(t);
    }, [nextSlide]);

    return (
        <div className="relative w-full h-[75vh] md:h-[70vh] lg:h-[65vh] overflow-hidden bg-military-950/20 select-none">
            {/* Slides */}
            {SLIDES.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-900 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        style={{ filter: 'grayscale(80%) contrast(1.15) brightness(0.55)' }}
                    />

                    {/* overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-military-950/20 via-transparent to-military-950/20" />

                    {/* noise */}
                    <div
                        className="absolute inset-0 opacity-20 mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                        }}
                    />
                </div>
            ))}

            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl pl-6 md:pl-12 border-l-2 border-military-accent relative">
                        <div className="absolute -left-[2px] top-0 h-1/3 w-[2px] bg-white" />

                        <div className="flex items-center gap-3 text-military-accent font-mono text-sm tracking-[0.3em] uppercase animate-pulse">
                            <Crosshair className="w-4 h-4" />
                            <span>RESTRICTED ACCESS // LEVEL 5</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-tighter leading-[0.9] font-heading drop-shadow-lg mt-4">
                            {SLIDES[current].title.split(' ').map((word, i) => (
                                <span key={i} className={i === 0 ? 'text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 block' : 'text-white block'}>
                                    {word}
                                </span>
                            ))}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 font-mono tracking-widest max-w-xl border-t border-gray-700 pt-6 mt-6">
                            {SLIDES[current].subtitle}
                        </p>

                        <div className="pt-8">
                            <TacticalButton>{SLIDES[current].cta}</TacticalButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-12 right-12 z-30 flex flex-col items-end gap-6">
                <div className="flex flex-col gap-3">
                    {SLIDES.map((_, idx) => (
                        <div
                            key={idx}
                            onClick={() => goTo(idx)}
                            className={`w-1 h-12 transition-all duration-300 cursor-pointer border border-white/20 ${idx === current ? 'bg-military-accent border-military-accent' : 'bg-transparent hover:bg-white/10'}`}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-0 border border-military-700 bg-military-900/40 backdrop-blur">
                    <button onClick={prevSlide} className="p-4 hover:bg-military-accent text-white transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                    <div className="w-[1px] h-6 bg-military-700" />
                    <button onClick={nextSlide} className="p-4 hover:bg-military-accent text-white transition-colors"><ChevronRight className="w-6 h-6" /></button>
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
