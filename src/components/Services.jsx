import React, { useState } from 'react';
import { Sparkles, Moon, DollarSign } from 'lucide-react';

export const servicesData = [
  {
    category: 'Hair Care',
    items: [
      { id: 'haircut', name: 'Hair Cut', price: 150, duration: '20 mins', desc: 'Standard precision cut tailored to your styling preferences.' },
      { id: 'haircut-advance', name: 'Hair Cut Advance', price: 199, duration: '30 mins', desc: 'Advanced custom styling and texturizing by senior stylists.' },
      { id: 'shampoo-cond', name: 'Shampoo & Conditioning', price: 99, duration: '15 mins', desc: 'Revitalizing hair wash with premium nourishing conditioners.' },
      { id: 'clean-shave', name: 'Clean Shaving', price: 99, duration: '20 mins', desc: 'Smooth traditional shave with soothing aftershave application.' },
      { id: 'trim-set', name: 'Trimming & Set', price: 100, duration: '20 mins', desc: 'Quick trim and styling to keep your hair and beard in perfect shape.' },
      { id: 'hair-lamination', name: 'Hair Lamination', price: 499, duration: '45 mins', desc: 'Protective lamination therapy for deep shine and moisture lock.' },
      { id: 'hair-shiner', name: 'Hair Shiner', price: 349, duration: '30 mins', desc: 'Instant gloss treatment to restore vibrant luster to dry hair.' }
    ]
  },
  {
    category: 'Hair Styling',
    items: [
      { id: 'hair-set', name: 'Hair Set', price: 49, duration: '15 mins', desc: 'Quick blowdry setting to style your hair for any occasion.' },
      { id: 'hair-set-shampoo', name: 'Hair Set & Shampoo', price: 99, duration: '25 mins', desc: 'Nourishing shampoo followed by professional blowdry styling.' }
    ]
  },
  {
    category: 'Texture (N. Lngt)',
    items: [
      { id: 'hair-smoothening', name: 'Hair Smoothening', price: 1299, duration: '120 mins', desc: 'Anti-frizz smoothening therapy for sleek, manageable hair.' },
      { id: 'hair-straightening', name: 'Hair Straightening', price: 1199, duration: '120 mins', desc: 'Bespoke straightening service for a smooth, glossy texture.' },
      { id: 'hair-rebonding', name: 'Hair Rebonding', price: 1899, duration: '150 mins', desc: 'Intense structural rebonding for permanent pin-straight hair.' },
      { id: 'keratin-treatment', name: 'Keratin Treatment', price: 1999, duration: '120 mins', desc: 'Protein infusion that repairs cuticles, adding volume and softness.' }
    ]
  },
  {
    category: 'Special Therapy',
    items: [
      { id: 'oiling-massage', name: 'S. Oiling & Head Massage', price: 149, duration: '20 mins', desc: 'Deep scalp oiling with relaxing pressure-point head massage.' },
      { id: 'spa-normal', name: 'Hair Spa Normal Length', price: 499, duration: '40 mins', desc: 'Nourishing steam and deep root mask conditioning.' },
      { id: 'spa-antidandruff', name: 'Hair Spa Anti-Dandruff', price: 699, duration: '45 mins', desc: 'Targeted scalp clarifying treatment to eliminate dandruff flakes.' },
      { id: 'antidandruff-advance', name: 'Anti-Dandruff Advance', price: 999, duration: '50 mins', desc: 'Advanced multi-stage therapy to heal dry, itchy scalp conditions.' }
    ]
  },
  {
    category: 'Threading',
    items: [
      { id: 'threading-eyebrow', name: 'Eyebrow', price: 49, duration: '10 mins', desc: 'Precise eyebrow arch shaping using professional threads.' },
      { id: 'threading-upperlip', name: 'Upper Lip', price: 29, duration: '5 mins', desc: 'Quick, clean removal of fine facial hair from upper lip.' },
      { id: 'threading-forehead', name: 'Forehead', price: 29, duration: '5 mins', desc: 'Threading hair removal to clear and smoothen the forehead area.' },
      { id: 'threading-fullface', name: 'Full Face Threading', price: 99, duration: '20 mins', desc: 'Complete facial threading for a smooth, hair-free skin canvas.' }
    ]
  },
  {
    category: 'Skin Care',
    items: [
      { id: 'cleansing', name: 'Cleanzing', price: 49, duration: '15 mins', desc: 'Deep pore cleansing to wash away daily dirt, pollution, and oil.' },
      { id: 'facewash-normal', name: 'Face Wash', price: 99, duration: '15 mins', desc: 'Refreshing face wash with premium foaming scrubs.' },
      { id: 'facewash-advance', name: 'Face Wash Advance', price: 149, duration: '20 mins', desc: 'Hydrating wash with micro-exfoliation to scrub off dead skin cells.' },
      { id: 'facemassage', name: 'Face Massage', price: 299, duration: '25 mins', desc: 'Soothing massage using nourishing creams to boost facial blood circulation.' }
    ]
  },
  {
    category: 'Bleach & D-Tan',
    items: [
      { id: 'bleach-face', name: 'Face Bleach', price: 199, duration: '25 mins', desc: 'Mild skin bleaching to lighten facial hair and reveal glow.' },
      { id: 'bleach-neck', name: 'Face & Neck Bleach', price: 299, duration: '30 mins', desc: 'Bleach application covering face and neck for uniform skin tone.' },
      { id: 'raaga-detan', name: 'Raga Face D-Tan', price: 399, duration: '30 mins', desc: 'Raaga Professional cream scrub to instantly remove stubborn sun tan.' },
      { id: 'raaga-neck-detan', name: 'Raga Face & Neck D-Tan', price: 549, duration: '35 mins', desc: 'Complete Raaga de-tan pack targeting the face and neck.' },
      { id: 'beardo-detan', name: 'Beardo Face D-Tan', price: 499, duration: '30 mins', desc: 'Charcoal-infused Beardo scrub to clear tan and refresh pores.' },
      { id: 'beardo-neck-detan', name: 'Beardo Face & Neck D-Tan', price: 699, duration: '40 mins', desc: 'Premium Beardo de-tan treatment for face and neck.' },
      { id: 'o3-detan', name: 'O3+ Face D-Tan', price: 549, duration: '30 mins', desc: 'Premium O3+ de-tan formulation for instant skin brightening.' },
      { id: 'o3-neck-detan', name: 'O3+ Face & Neck D-Tan', price: 799, duration: '40 mins', desc: 'Deep actions O3+ de-tan cover for neck and face.' },
      { id: 'hand-detan', name: 'Full Hand D-Tan', price: 599, duration: '45 mins', desc: 'Instantly removes tanning from shoulders to fingertips.' }
    ]
  },
  {
    category: 'Cleanup',
    items: [
      { id: 'cleanup-dry', name: 'Dead Cell Cleanup (Normal & Dry Skin)', price: 799, duration: '30 mins', desc: 'Hydrating scrub that removes dry flakes and deep moisturizes.' },
      { id: 'cleanup-oily', name: 'Dead Cell Cleanup (Oily Skin)', price: 799, duration: '30 mins', desc: 'Sebum-regulating cleanup to control excess oils and prevent acne.' },
      { id: 'cleanup-organic-dry', name: 'Basic Organic Cleanup (Dry Skin)', price: 999, duration: '35 mins', desc: 'All-natural organic fruit extracts to nourish dry skin cells.' },
      { id: 'cleanup-organic-oily', name: 'Basic Organic Cleanup (Oily Skin)', price: 999, duration: '35 mins', desc: 'Tea tree organic formula to clarify oily skin and unclog pores.' },
      { id: 'cleanup-detan', name: 'D-Tan Cleanup', price: 999, duration: '40 mins', desc: 'Anti-tan massage combined with deep pore extraction.' }
    ]
  },
  {
    category: 'Professional Facial',
    items: [
      { id: 'facial-lotus', name: 'Basic Facial (Lotus)', price: 999, duration: '45 mins', desc: 'Lotus Herbals facial kit for healthy, glowing skin.' },
      { id: 'facial-tanclear', name: 'Tan Clear', price: 1499, duration: '50 mins', desc: 'Advanced tan removal and skin tone evening therapy.' },
      { id: 'facial-organic', name: 'Organic Facial', price: 1999, duration: '60 mins', desc: 'Luxury organic extracts that restore elasticity and smooth fine lines.' },
      { id: 'facial-deadcell', name: 'Dead Cell Facial', price: 1899, duration: '60 mins', desc: 'Deep skin peeling and cell regeneration therapy.' },
      { id: 'facial-bridal', name: '(O3+) Bridal Facial', price: 2499, duration: '75 mins', desc: 'Premium O3+ bridal glow treatment for ultimate radiance.' }
    ]
  },
  {
    category: 'Hair Color',
    items: [
      { id: 'color-root', name: 'Root Touchup', price: 199, duration: '30 mins', desc: 'Quick grey coverage touchup for roots.' },
      { id: 'color-utika', name: 'Utika', price: 299, duration: '45 mins', desc: 'Vibrant Utika budget coloring for short hair.' },
      { id: 'color-loreal', name: 'Loreal & Matrix', price: 399, duration: '50 mins', desc: 'Premium L\'Oreal/Matrix color setting for shiny textures.' },
      { id: 'color-cosmo', name: 'Cosmo Pro (Ammonia Free)', price: 499, duration: '60 mins', desc: 'Safe, ammonia-free coloring to protect scalp and hair structure.' },
      { id: 'color-inoa', name: '(Loreal Inoa)', price: 499, duration: '60 mins', desc: 'Top-tier L\'Oreal Inoa oil-delivery system coloring.' }
    ]
  }
];

export default function Services({ onBookService }) {
  const [previewNightCharge, setPreviewNightCharge] = useState(false);

  const calculatePrice = (basePrice) => {
    if (previewNightCharge) {
      return Math.round(basePrice * 1.25);
    }
    return basePrice;
  };

  return (
    <section id="services" className="py-24 bg-[#141416] border-t border-white/5 relative">
      <div className="container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="text-left mb-6 md:mb-0">
            <span className="text-xs uppercase tracking-widest text-[#a0a0a0] font-semibold block mb-2">
              MENU & EXPERTISE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif">
              Our Premium Services
            </h2>
          </div>
          
          {/* Interactive Switch to Preview Night Surcharge */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-lg backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Moon className={`w-4 h-4 transition-colors ${previewNightCharge ? 'text-indigo-400' : 'text-[#a0a0a0]'}`} />
              <span className="text-xs text-[#a0a0a0] font-medium tracking-wide">
                Late-Night Rates (After 8:00 PM)
              </span>
            </div>
            
            {/* Toggle Button */}
            <button
              onClick={() => setPreviewNightCharge(!previewNightCharge)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                previewNightCharge ? 'bg-indigo-600' : 'bg-white/10'
              }`}
            >
              <span 
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                  previewNightCharge ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
        </div>
        {/* Combo Special Promo Banner */}
        <div className="glass-panel p-5 mb-8 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent border-l-2 border-emerald-500 rounded-r-xl flex items-center justify-between flex-wrap gap-4 text-left">
          <div>
            <span className="text-[0.6rem] font-bold tracking-widest text-emerald-400 uppercase block mb-1">
              EXCLUSIVE COMBO SAVINGS
            </span>
            <h3 className="font-serif text-lg font-bold text-white mb-0.5">
              Hair Cut + Trimming & Set Combo
            </h3>
            <p className="text-xs text-[#a0a0a0] max-w-xl leading-relaxed">
              Book a standard Hair Cut and Trimming & Set together, and pay only ₹200 (instead of ₹250). The ₹50 discount will be applied automatically to your bill during checkout.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#1a1a1f] border border-white/5 px-4 py-2 rounded-lg">
            <span className="text-xs text-zinc-600 line-through font-sans">₹250</span>
            <span className="text-base font-bold font-serif text-emerald-400">₹200</span>
          </div>
        </div>

        {/* Night Charge Advisory Alert */}
        <div className="glass-panel p-4 mb-12 flex items-center gap-3 border-white/10 bg-white/2">
          <Moon className="w-5 h-5 text-white/60" />
          <p className="text-xs md:text-sm text-[#a0a0a0] text-left">
            <span className="text-white font-semibold">Important Notice:</span> Bookings scheduled for late evening hours (<span className="text-white">8:00 PM to 11:00 PM</span>) are subject to a <span className="text-white font-bold">25% Night Charge surcharge</span> due to limited staff availability. Toggle the switch above to preview exact pricing.
          </p>
        </div>

        {/* Services Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
          {servicesData.map((group) => (
            <div key={group.category} className="flex flex-col gap-6">
              <h3 className="text-xl font-bold font-serif text-white tracking-wide border-b border-white/5 pb-2">
                {group.category}
              </h3>
              
              <div className="flex flex-col gap-6">
                {group.items.map((service) => (
                  <div 
                    key={service.id} 
                    className="group relative glass-panel p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="font-semibold text-base md:text-lg text-white group-hover:text-zinc-300 transition-colors">
                        {service.name}
                      </h4>
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-lg text-white flex items-center">
                          ₹{calculatePrice(service.price)}
                        </span>
                        {previewNightCharge && (
                          <span className="text-[0.6rem] text-indigo-400 font-semibold tracking-wider uppercase">
                            Night Price
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-[#a0a0a0] mb-4 leading-relaxed">
                      {service.desc}
                    </p>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <span className="text-[0.65rem] text-[#666666] tracking-wider uppercase">
                        Duration: {service.duration}
                      </span>
                      <button 
                        onClick={() => onBookService(service.id)}
                        className="text-xs text-white hover:text-zinc-300 font-semibold tracking-wider uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                      >
                        Quick Book
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
