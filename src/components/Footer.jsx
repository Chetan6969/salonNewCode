import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, Phone, MapPin, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const salonLocation = import.meta.env.VITE_SALON_LOCATION || 'HIG 16 Bharhut Nagar Satna, Madhya Pradesh, 485441';
  const salonPhone = import.meta.env.VITE_SALON_PHONE || '+91 6266979583';
  const salonEmail = import.meta.env.VITE_SALON_EMAIL || 'heandshehairfixsalon@gmail.com';

  return (
    <footer className="bg-[#0e0e10] border-t border-white/5 pt-16 pb-8 text-left text-sm text-[#a0a0a0] relative z-10">
      <div className="container grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        
        {/* Branding Info */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group no-underline">
            {/* Elegant Scissors Logo Badge */}
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              {/* Stylized outer circular rings */}
              <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 group-hover:rotate-180 transition-all duration-1000" />
              <div className="absolute inset-1 rounded-full border border-dashed border-white/5 group-hover:border-white/15" />
              
              <svg 
                className="w-6 h-6 text-white transition-all duration-700 group-hover:rotate-12" 
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
              <span className="text-[0.5rem] italic text-zinc-500 tracking-wider leading-none mb-0.5">
                welcome to
              </span>
              <span className="font-serif text-sm font-bold tracking-[0.16em] text-white uppercase leading-none">
                HE & SHE HAIRFIX
              </span>
              <span className="text-[0.45rem] tracking-[0.15em] text-[#a0a0a0] font-medium uppercase mt-0.5 leading-none">
                perfect style for every smile
              </span>
            </div>
          </Link>
          <p className="text-xs text-[#666666] leading-relaxed max-w-xs mt-2">
            Providing high-end precision haircuts, custom styling, hair treatments, and premium facial therapies in a black-and-grey boutique atmosphere.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <h4 className="font-bold text-xs tracking-wider text-white uppercase mb-2">Navigation</h4>
          <Link to="/services" className="hover:text-white transition-colors text-xs text-left no-underline">Services Menu</Link>
          <Link to="/lookbook" className="hover:text-white transition-colors text-xs text-left no-underline">Lookbook Gallery</Link>
          <Link to="/scanner" className="hover:text-white transition-colors text-xs text-left no-underline">AI Face Consultant</Link>
          <Link to="/workers" className="hover:text-white transition-colors text-xs text-left no-underline">Our Stylists</Link>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h4 className="font-bold text-xs tracking-wider text-white uppercase mb-2">Location & Connect</h4>
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>{salonLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>{salonPhone}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>{salonEmail}</span>
          </div>
        </div>

        {/* Schedule */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h4 className="font-bold text-xs tracking-wider text-white uppercase mb-2">Opening Hours</h4>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span>Monday - Sunday: 9:00 AM - 11:00 PM</span>
          </div>
          <span className="text-[0.65rem] text-[#666666] leading-relaxed mt-2 block border-l border-white/10 pl-2">
            Late shift rules: A 25% staff surcharge is appended to booking entries scheduled after 8:00 PM.
          </span>
        </div>

      </div>

      {/* Copyright */}
      <div className="container border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[0.7rem] text-[#666666] gap-4">
        <span>&copy; {new Date().getFullYear()} He & She Hair Fix Unisex Salon. All rights reserved.</span>
        <span>Premium Black & Grey Aesthetic Design</span>
      </div>
    </footer>
  );
}
