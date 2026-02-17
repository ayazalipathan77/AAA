import React from 'react';
import { INTEL_ARTICLES } from '../constants';
import { Calendar, User, ArrowRight } from 'lucide-react';

const IntelGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="mb-12 border-b border-white/10 pb-4">
        <h2 className="text-4xl font-heading font-bold text-opaque-high uppercase tracking-widest drop-shadow-md">
          Field Intelligence
        </h2>
        <p className="text-military-accent font-mono text-sm mt-2">SITREPS // TACTICAL ANALYSIS // GEAR REVIEWS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INTEL_ARTICLES.map((article) => (
          <div key={article.id} className="group bg-black/40 backdrop-blur-md border border-white/10 hover:border-military-accent transition-all duration-300 flex flex-col h-full clip-angled-sm">
            <div className="relative h-48 overflow-hidden border-b border-white/10">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                style={{ filter: 'grayscale(100%) contrast(1.2)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono bg-military-accent text-white px-2 py-1 clip-angled-sm shadow-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-4 text-opaque-low text-[10px] font-mono mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{article.author}</span>
                </div>
              </div>

              <h3 className="text-xl font-heading font-bold text-opaque-high mb-3 group-hover:text-military-accent transition-colors">
                {article.title}
              </h3>
              
              <p className="text-opaque-med text-sm font-sans mb-6 flex-grow leading-relaxed">
                {article.excerpt}
              </p>

              <button className="text-military-accent font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/btn">
                Read Full Report
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntelGrid;