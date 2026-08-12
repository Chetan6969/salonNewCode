import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import { Scissors, Sparkles, Star } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <Hero 
        onStartScan={() => navigate('/scanner')}
        onOpenBooking={() => navigate('/book')}
      />

      {/* Mini Brand Highlights Section */}
      <section className="py-20 bg-[#121214] border-t border-white/5 relative z-10">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          <div className="glass-panel p-8 hover:border-white/10 transition-all">
            <Scissors className="w-8 h-8 text-zinc-400 mb-6" />
            <h3 className="font-serif text-lg font-bold text-white mb-2">Master Stylists</h3>
            <p className="text-xs text-[#a0a0a0] leading-relaxed">
              Our experts hold certifications in advanced hair systems, precision fades, and bespoke coloring techniques.
            </p>
          </div>

          <div className="glass-panel p-8 hover:border-white/10 transition-all">
            <Sparkles className="w-8 h-8 text-zinc-400 mb-6" />
            <h3 className="font-serif text-lg font-bold text-white mb-2">AI Consultant</h3>
            <p className="text-xs text-[#a0a0a0] leading-relaxed">
              Use our high-tech facial scanner to identify your bone structure angles and lock matching haircut recommendations.
            </p>
          </div>

          <div className="glass-panel p-8 hover:border-white/10 transition-all">
            <Star className="w-8 h-8 text-zinc-400 mb-6" />
            <h3 className="font-serif text-lg font-bold text-white mb-2">Premium Vibe</h3>
            <p className="text-xs text-[#a0a0a0] leading-relaxed">
              Enjoy custom refreshments in a strictly matte-black boutique lounge designed for absolute style relaxation.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
