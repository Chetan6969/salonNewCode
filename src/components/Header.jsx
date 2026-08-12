import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Scissors, Menu, X, Calendar } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', target: '/services' },
    { label: 'Lookbook', target: '/lookbook' },
    { label: 'AI Face Scan', target: '/scanner' },
    { label: 'Our Team', target: '/workers' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'py-4 bg-[#121214]/90 backdrop-blur-md border-b border-white/5'
          : 'py-6 bg-transparent'
        }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 cursor-pointer group no-underline"
        >
          {/* Elegant Scissors Logo Badge */}
          <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
            {/* Stylized outer circular rings */}
            <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 group-hover:rotate-180 transition-all duration-1000" />
            <div className="absolute inset-1 rounded-full border border-dashed border-white/5 group-hover:border-white/15" />
            
            <svg 
              className="w-7 h-7 text-white transition-all duration-700 group-hover:rotate-12" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3.5"
            >
              <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-30" />
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="2" className="opacity-70" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              <path d="M50 50 L72 28" strokeLinecap="round" />
              <path d="M50 50 L28 72" strokeLinecap="round" />
              <circle cx="23" cy="77" r="7" />
              <path d="M50 50 L72 72" strokeLinecap="round" />
              <path d="M50 50 L28 28" strokeLinecap="round" />
              <circle cx="23" cy="23" r="7" />
              <path d="M35 50 C 45 42, 55 58, 65 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-50" />
              <path d="M52 48 V 52" stroke="currentColor" strokeWidth="1" />
              <path d="M56 48 V 52" stroke="currentColor" strokeWidth="1" />
              <path d="M60 48 V 52" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          
          <div className="flex flex-col text-left">
            <span className="text-[0.55rem] italic text-zinc-500 tracking-wider leading-none mb-0.5">
              welcome to
            </span>
            <span className="font-serif text-base font-bold tracking-[0.16em] text-white uppercase leading-none">
              HE & SHE HAIRFIX
            </span>
            <span className="text-[0.48rem] tracking-[0.15em] text-[#a0a0a0] font-medium uppercase mt-1 leading-none">
              perfect style for every smile
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.target}
              to={link.target}
              className={({ isActive }) =>
                `text-xs tracking-widest uppercase transition-colors duration-300 relative py-1 ${isActive
                  ? 'text-white font-semibold'
                  : 'text-[#a0a0a0] hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => navigate('/book')}
            className="btn-primary flex items-center gap-2 text-xs py-2 px-5"
          >
            <Calendar className="w-3.5 h-3.5" />
            BOOK APPOINTMENT
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-1.5 text-white/80 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-[#121214] border-b border-white/5 py-6 px-8 flex flex-col gap-6 animate-fade-in shadow-2xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.target}
              to={link.target}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-left text-xs tracking-widest uppercase transition-colors py-2 border-b border-white/5 ${isActive ? 'text-white font-semibold' : 'text-[#a0a0a0]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/book');
            }}
            className="btn-primary w-full justify-center text-xs py-3"
          >
            <Calendar className="w-4 h-4" />
            BOOK APPOINTMENT
          </button>
        </div>
      )}
    </header>
  );
}
