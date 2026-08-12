import React, { useState, useRef, useEffect } from 'react';
import { Camera, Scissors, Sparkles } from 'lucide-react';

export default function Lookbook() {
  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(600);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const styles = [
    { name: 'Textured Crop', desc: 'Modern texture with a sharp skin fade.', tags: ['Men', 'Trendy'] },
    { name: 'Classic Pompadour', desc: 'High volume retro style with gold wax finish.', tags: ['Men', 'Classic'] },
    { name: 'Precision Blunt Bob', desc: 'Sharp lines, perfectly symmetrical styling.', tags: ['Women', 'Sleek'] },
    { name: 'Curtain Framing Cut', desc: 'Soft layers framing the face elegantly.', tags: ['Women', 'Modern'] },
  ];

  return (
    <section id="lookbook" className="py-24 bg-[#18181b] border-t border-white/5 relative">
      <div className="container">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#a0a0a0] font-semibold block mb-2">
            VISUAL METAMORPHOSIS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">
            Lookbook & Transformations
          </h2>
          <p className="text-sm text-[#a0a0a0] leading-relaxed">
            Drag the slider to witness our precision grooming transformations from chaotic growth to sharp elegance.
          </p>
        </div>

        {/* Before/After Split Slider */}
        <div className="max-w-3xl mx-auto mb-20">
          <div 
            ref={containerRef}
            className="slider-container"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full Background) */}
            <div className="slider-image bg-[#26262a] flex flex-col items-center justify-center text-center select-none">
              <div className="absolute inset-0 bg-radial-gradient z-0" style={{
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 60%)'
              }} />
              <div 
                className="relative z-10 flex flex-col items-center justify-center p-8"
                style={{ width: `${containerWidth}px`, minWidth: `${containerWidth}px` }}
              >
                <Sparkles className="w-16 h-16 text-white mb-4 mx-auto animate-pulse" />
                <h3 className="font-serif text-3xl md:text-4xl text-white font-semibold mb-2">
                  THE AFTER
                </h3>
                <p className="text-zinc-400 text-sm font-semibold tracking-widest uppercase">
                  Precision Defined. Symmetrical. Bold.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto text-left">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <span className="text-[0.6rem] text-[#666666] tracking-wider block">EDGES</span>
                    <span className="text-xs font-semibold text-white">Razor Sharp</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <span className="text-[0.6rem] text-[#666666] tracking-wider block">TEXTURE</span>
                    <span className="text-xs font-semibold text-white">Volumized Finish</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Before Image (Overlay clipped by percentage) */}
            <div 
              className="slider-image bg-[#141416] flex flex-col items-center justify-center text-center select-none border-r border-white/20 animate-fade-in"
              style={{ width: `${sliderPosition}%`, overflow: 'hidden' }}
            >
              <div 
                className="flex flex-col items-center justify-center p-8"
                style={{ width: `${containerWidth}px`, minWidth: `${containerWidth}px` }}
              >
                <Scissors className="w-16 h-16 text-[#666666] mb-4" />
                <h3 className="font-serif text-3xl md:text-4xl text-[#666666] font-semibold mb-2">
                  THE BEFORE
                </h3>
                <p className="text-[#666666] text-sm font-semibold tracking-widest uppercase">
                  Untrimmed. Lacks Shape. Split Ends.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto text-left opacity-30">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <span className="text-[0.6rem] tracking-wider block">EDGES</span>
                    <span className="text-xs font-semibold">Rough</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <span className="text-[0.6rem] tracking-wider block">TEXTURE</span>
                    <span className="text-xs font-semibold">Dry / Flat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drag Handle Line */}
            <div 
              className="slider-handle"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="slider-button">
                <span className="text-xs font-bold font-sans tracking-tight">&larr;&rarr;</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 px-1">
            <span className="text-[0.7rem] uppercase tracking-wider text-[#666666] font-semibold">BEFORE</span>
            <span className="text-xs text-[#a0a0a0] font-medium italic">Drag Slider Left / Right</span>
            <span className="text-[0.7rem] uppercase tracking-wider text-white font-semibold">AFTER</span>
          </div>
        </div>

        {/* Trending Styles (3D Hover Cards) */}
        <div>
          <h3 className="font-serif text-2xl text-white text-left mb-8 tracking-wide">
            Trending Inspirations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {styles.map((style, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 flex flex-col justify-between h-56 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    {style.tags.map(t => (
                      <span key={t} className="text-[0.6rem] font-bold tracking-widest uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[#a0a0a0]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-white mb-2">
                    {style.name}
                  </h4>
                  <p className="text-xs text-[#a0a0a0] leading-relaxed">
                    {style.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/80 font-bold uppercase tracking-wider mt-4">
                  <Scissors className="w-3.5 h-3.5" />
                  Request Cut
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
