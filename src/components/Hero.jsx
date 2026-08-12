import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Eye, Scissors } from 'lucide-react';

export default function Hero({ onStartScan, onOpenBooking }) {
  const cardRef = useRef(null);
  const canvasRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse Move handler for 3D card effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    // Rotate values (max 15 degrees)
    setRotate({
      x: -mouseY * 25,
      y: mouseX * 25
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  // Canvas floating background particles & interactive 3D perspective grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 45;

    // Track mouse coordinates for interactive connection lines
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * -0.3 - 0.05; // rise up slowly
        this.alpha = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset if float off bounds
        if (this.y < 0 || this.x < 0 || this.x > width) {
          this.reset();
          this.y = height;
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw premium 3D perspective floor grid
      const horizonY = height * 0.55;
      const vX = width / 2;
      
      // 1. Perspective longitudinal lines (fan out from vanishing point)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.065)';
      ctx.lineWidth = 1;
      const gridLines = 28;
      for (let i = 0; i <= gridLines; i++) {
        const xPercent = i / gridLines;
        const targetX = width * xPercent;
        
        ctx.beginPath();
        ctx.moveTo(vX, horizonY);
        ctx.lineTo(targetX, height);
        ctx.stroke();
      }

      // 2. Perspective lateral lines (get closer together towards horizon)
      const horizontalGridLines = 12;
      for (let i = 0; i < horizontalGridLines; i++) {
        const progress = Math.pow(i / (horizontalGridLines - 1), 2.5); // exponential spacing
        const currY = horizonY + (height - horizonY) * progress;
        
        ctx.beginPath();
        ctx.moveTo(0, currY);
        ctx.lineTo(width, currY);
        ctx.stroke();
      }

      // 3. Draw inter-particle constellation lines (3D network)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        // Connect close particles together
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.28;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect particles close to mouse cursor
        if (mouseX > 0) {
          const mouseDist = Math.hypot(p1.x - mouseX, p1.y - mouseY);
          if (mouseDist < 160) {
            const alpha = (1 - mouseDist / 160) * 0.45;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Canvas Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Radial Gradient Backdrop */}
      <div className="absolute inset-0 bg-radial-gradient z-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 75% 40%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)'
      }} />

      <div className="container relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center py-12">
        {/* Text Area */}
        <div className="md:col-span-7 lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-[#a0a0a0]" />
            <span className="text-xs uppercase tracking-widest text-[#a0a0a0] font-semibold">
              The Ultimate Salon Experience
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-[1.1] tracking-tight">
            <span className="subgradient-text block">Sculpting Your</span>
            <span className="gradient-text block mt-1">Signature Identity</span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-[#a0a0a0] max-w-lg mb-8 leading-relaxed">
            Welcome to <span className="text-white font-medium">He & She Hair Fix Unisex Salon</span>. 
            Where luxury meets master craftsmanship. Analyze your features with our interactive scanner or book customized services today.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={onOpenBooking}
              className="btn-primary"
            >
              Book Premium Session
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={onStartScan}
              className="btn-secondary"
            >
              <Eye className="w-4 h-4 text-white/60" />
              AI Face Analysis
            </button>
          </div>
        </div>

        {/* 3D Graphic Card Area */}
        <div className="md:col-span-5 lg:col-span-5 flex justify-center items-center perspective-card-container">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            className="w-full max-w-[360px] aspect-[4/5] glass-panel p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden group"
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.03 : 1})`,
              transition: isHovered ? 'transform 0.05s ease-out' : 'transform 0.5s ease',
            }}
          >
            {/* Holographic Glowing Lines */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Corner Decorative Borders */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/10" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/10" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/10" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/10" />

            <div className="flex justify-between items-start pt-4">
              <div>
                <span className="text-[0.6rem] tracking-[0.25em] text-[#a0a0a0] font-bold block mb-1">SIGNATURE CUT</span>
                <h3 className="font-serif text-2xl text-white font-medium group-hover:text-zinc-400 transition-colors duration-300">The Monarch</h3>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs text-white font-semibold bg-white/5">
                01
              </div>
            </div>

            {/* Simulated 3D Hair Model Image inside Glassmorphism frame */}
            <div className="w-full h-48 my-4 rounded-lg overflow-hidden border border-white/5 relative group-hover:border-white/10 transition-all duration-300">
              <img 
                src="/interior.png" 
                alt="He & She Salon Interior" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-all duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/90 via-[#121214]/30 to-transparent flex flex-col justify-end p-4 text-left">
                <span className="text-[0.55rem] text-white/40 tracking-widest uppercase font-semibold">PREMIUM BOUTIQUE</span>
                <span className="text-xs text-white font-semibold mt-0.5">Gurugram Styling Lounge</span>
              </div>
            </div>

            <div className="pb-4 flex justify-between items-center">
              <div>
                <span className="text-[0.55rem] text-[#666666] tracking-widest block">ESTIMATED TIME</span>
                <span className="text-sm font-semibold text-[#f5f5f5]">45 MINS</span>
              </div>
              <div className="text-right">
                <span className="text-[0.55rem] text-[#666666] tracking-widest block">STARTING FROM</span>
                <span className="text-sm font-semibold text-white">₹499</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
