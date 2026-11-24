import React, { useState } from 'react';
import { Moon, Scissors, Flower2, Crown, CalendarHeart, Check, MessageCircle, Star } from 'lucide-react';
import {
  servicesData,
  bodySpaData,
  packagesData,
  packagesMeta,
  monthlyMeta,
  waEnquiryLink,
} from '../data/menuData';

// Re-export so existing imports (e.g. BookingPage) keep working.
export { servicesData, bodySpaData } from '../data/menuData';

const TABS = [
  { id: 'services', label: 'Services', icon: Scissors },
  { id: 'bodyspa', label: 'Body Spa', icon: Flower2 },
  { id: 'packages', label: 'Groom / Bride Packages', icon: Crown },
  { id: 'monthly', label: 'Monthly Package', icon: CalendarHeart },
];

// ---- A single service card --------------------------------------------------
function ServiceCard({ service, priceOf, showNightTag, onBookService }) {
  const isOnRequest = service.onRequest || typeof service.price !== 'number';

  return (
    <div className="group relative glass-panel p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="flex justify-between items-start gap-4 mb-2">
        <h4 className="font-semibold text-base md:text-lg text-white group-hover:text-zinc-300 transition-colors">
          {service.name}
        </h4>
        <div className="flex flex-col items-end shrink-0">
          {isOnRequest ? (
            <span className="font-bold text-sm text-amber-300/90 whitespace-nowrap">On Request</span>
          ) : (
            <>
              <span className="font-bold text-lg text-white flex items-center">₹{priceOf(service.price)}</span>
              {showNightTag && (
                <span className="text-[0.6rem] text-indigo-400 font-semibold tracking-wider uppercase">
                  Night Price
                </span>
              )}
            </>
          )}
          {service.note && (
            <span className="text-[0.6rem] text-zinc-400 mt-0.5 whitespace-nowrap">{service.note}</span>
          )}
        </div>
      </div>

      <p className="text-xs text-[#a0a0a0] mb-4 leading-relaxed">{service.desc}</p>

      <div className="flex justify-between items-center pt-2 border-t border-white/5">
        <span className="text-[0.65rem] text-[#666666] tracking-wider uppercase">
          Duration: {service.duration}
        </span>
        {isOnRequest ? (
          <a
            href={waEnquiryLink(`Hi, I'd like to enquire about "${service.name}" at He & She HairFix.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold tracking-wider uppercase flex items-center gap-1"
          >
            Enquire <MessageCircle className="w-3 h-3" />
          </a>
        ) : (
          <button
            onClick={() => onBookService(service.id)}
            className="text-xs text-white hover:text-zinc-300 font-semibold tracking-wider uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            Quick Book <span>&rarr;</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ---- A category column (heading + its items) --------------------------------
function CategoryColumn({ group, priceOf, showNightTag, onBookService }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-white/5 pb-2">
        <h3 className="text-xl font-bold font-serif text-white tracking-wide">{group.category}</h3>
        {group.note && <p className="text-[0.7rem] text-[#777] mt-1 italic">{group.note}</p>}
      </div>
      <div className="flex flex-col gap-6">
        {group.items.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            priceOf={priceOf}
            showNightTag={showNightTag}
            onBookService={onBookService}
          />
        ))}
      </div>
    </div>
  );
}

// ---- Package card -----------------------------------------------------------
function PackageCard({ pkg }) {
  return (
    <div
      className={`relative glass-panel p-7 flex flex-col text-left transition-all duration-300 hover:-translate-y-1 ${
        pkg.popular ? 'border-amber-400/40 hover:border-amber-400/60' : 'hover:border-white/20'
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-6 bg-amber-400 text-black text-[0.6rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-black" /> Most Popular
        </span>
      )}

      <div className="flex justify-between items-start gap-4 mb-5 pb-5 border-b border-white/5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-white">{pkg.name}</h3>
          <span className="text-[0.65rem] tracking-widest text-[#a0a0a0] uppercase font-semibold">
            {pkg.tagline}
          </span>
        </div>
        <div className="text-right shrink-0">
          <div className="font-serif text-2xl font-bold text-amber-300">₹{pkg.price}</div>
          <div className="text-xs text-zinc-500 line-through">Worth ₹{pkg.worth}</div>
        </div>
      </div>

      <ul className="flex flex-col gap-2.5 mb-5 flex-grow">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-[#d4d4d4]">
            <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2 mb-5 flex items-center gap-2">
        <CalendarHeart className="w-4 h-4 text-amber-300 shrink-0" />
        <span className="text-[0.7rem] text-amber-200 font-medium">{pkg.freebie}</span>
      </div>

      <a
        href={waEnquiryLink(`Hi, I'm interested in the ${pkg.name} (₹${pkg.price}) at He & She HairFix. Please share the details.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary py-2.5 text-xs text-center flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-3.5 h-3.5" /> Book via WhatsApp
      </a>
    </div>
  );
}

export default function Services({ onBookService }) {
  const [activeTab, setActiveTab] = useState('services');
  const [previewNightCharge, setPreviewNightCharge] = useState(false);

  const priceOf = (basePrice) =>
    previewNightCharge ? Math.round(basePrice * 1.25) : basePrice;

  const showToggle = activeTab === 'services' || activeTab === 'bodyspa';
  const activeGroups = activeTab === 'services' ? servicesData : bodySpaData;

  return (
    <section id="services" className="py-24 bg-[#141416] border-t border-white/5 relative">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="text-left mb-6 md:mb-0">
            <span className="text-xs uppercase tracking-widest text-[#a0a0a0] font-semibold block mb-2">
              MENU &amp; RATE LIST · 2026
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif">Our Premium Services</h2>
          </div>

          {/* Night surcharge preview toggle (services / body spa only) */}
          {showToggle && (
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-lg backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Moon className={`w-4 h-4 transition-colors ${previewNightCharge ? 'text-indigo-400' : 'text-[#a0a0a0]'}`} />
                <span className="text-xs text-[#a0a0a0] font-medium tracking-wide">
                  Late-Night Rates (After 8:00 PM)
                </span>
              </div>
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
          )}
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 border-b border-white/5 pb-4">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-[#c0c0c0] border border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* SERVICES / BODY SPA */}
        {(activeTab === 'services' || activeTab === 'bodyspa') && (
          <>
            {/* Combo promo (only on the main services tab) */}
            {activeTab === 'services' && (
              <div className="glass-panel p-5 mb-8 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent border-l-2 border-emerald-500 rounded-r-xl flex items-center justify-between flex-wrap gap-4 text-left">
                <div>
                  <span className="text-[0.6rem] font-bold tracking-widest text-emerald-400 uppercase block mb-1">
                    EXCLUSIVE COMBO SAVINGS
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mb-0.5">
                    Hair Cut + Beard Trimming &amp; Set Combo
                  </h3>
                  <p className="text-xs text-[#a0a0a0] max-w-xl leading-relaxed">
                    Book a Hair Cut and Beard Trimming &amp; Set together and pay only ₹200 (instead of ₹250).
                    The ₹50 discount is applied automatically at checkout.
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-[#1a1a1f] border border-white/5 px-4 py-2 rounded-lg">
                  <span className="text-xs text-zinc-600 line-through font-sans">₹250</span>
                  <span className="text-base font-bold font-serif text-emerald-400">₹200</span>
                </div>
              </div>
            )}

            {/* Night advisory */}
            <div className="glass-panel p-4 mb-12 flex items-center gap-3 border-white/10 bg-white/2">
              <Moon className="w-5 h-5 text-white/60 shrink-0" />
              <p className="text-xs md:text-sm text-[#a0a0a0] text-left">
                <span className="text-white font-semibold">Important Notice:</span> Bookings scheduled for late
                evening hours (<span className="text-white">8:00 PM to 11:00 PM</span>) carry a{' '}
                <span className="text-white font-bold">25% Night Charge</span>. Toggle the switch above to preview
                exact pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
              {activeGroups.map((group) => (
                <CategoryColumn
                  key={group.category}
                  group={group}
                  priceOf={priceOf}
                  showNightTag={previewNightCharge}
                  onBookService={onBookService}
                />
              ))}
            </div>
          </>
        )}

        {/* PACKAGES */}
        {activeTab === 'packages' && (
          <div className="text-left">
            <div className="mb-8">
              <span className="text-[0.65rem] font-bold tracking-widest text-amber-300 uppercase block mb-1">
                {packagesMeta.kicker}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Grooming Packages</h3>
              <p className="text-xs text-[#a0a0a0] mt-1 max-w-2xl">{packagesMeta.note}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {packagesData.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        )}

        {/* MONTHLY */}
        {activeTab === 'monthly' && (
          <div className="text-left max-w-2xl">
            <div className="glass-panel p-8 md:p-10 border-white/10">
              <span className="text-[0.65rem] font-bold tracking-widest text-indigo-300 uppercase block mb-2">
                {monthlyMeta.kicker}
              </span>
              <h3 className="font-serif text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <CalendarHeart className="w-7 h-7 text-indigo-300" />
                {monthlyMeta.title}
              </h3>
              <p className="text-sm text-[#a0a0a0] leading-relaxed mb-8">{monthlyMeta.desc}</p>
              <a
                href={waEnquiryLink('Hi, I’d like to know about the Monthly Grooming Plans at He & She HairFix.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2.5 px-6 text-xs inline-flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Enquire on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
