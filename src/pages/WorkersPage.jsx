import React from 'react';
import { User, Scissors, Star, Award, Shield, Sparkles } from 'lucide-react';

const TEAM = {
  directors: [
    {
      name: 'Chirag Sen',
      role: 'Co-Director & Business strategist',
      bio: 'Visionary behind the premium unisex salon concept, specializing in luxury salon operations and customer relationships.',
      exp: '10+ yrs exp',
      rating: '5.0',
      image: '', // Blank for now
      specialty: 'Salon Operations & Premium Experience'
    },
    {
      name: 'Lucky Sen',
      role: 'Co-Director & Master Stylist',
      bio: 'Co-creator of the boutique. Blends business management with high-fashion master grooming and styling expertise.',
      exp: '8+ yrs exp',
      rating: '4.9',
      image: '', // Blank for now
      specialty: 'Advanced Hair Systems & Styling'
    }
  ],
  headWorker: {
    name: 'Lucky Sen',
    role: 'Head Grooming Expert / Master Stylist',
    bio: 'Oversees service excellence, staff styling training, and leads the team in signature cuts and bespoke hair transformations.',
    exp: '8+ yrs exp',
    rating: '4.9',
    image: '', // Blank for now
    specialty: 'Signature Haircuts, Fades & Hair System Fixing'
  },
  staff: [
    {
      name: 'Chetan Sen',
      role: 'Senior Stylist & Hair Care Specialist',
      bio: 'Specialist in custom styling, luxury blowdries, and advanced hair spas. Known for modern hair care therapies.',
      exp: '6 yrs exp',
      rating: '4.9',
      image: '', // Blank for now
      specialty: 'Blowdries, Settings & Hair Spa Therapies'
    },
    {
      name: 'Kishan Sen',
      role: 'Senior Colorist & Chemical Expert',
      bio: 'Master of global hair coloring, balayage, and keratin smoothing treatments. Keeps up with the latest fashion trends.',
      exp: '5 yrs exp',
      rating: '4.8',
      image: '', // Blank for now
      specialty: 'Global Coloring, Balayage & Keratin Smooth Infusions'
    },
    {
      name: 'Chiranjeev Sen',
      role: 'Beard Design & Detailing Expert',
      bio: 'Brings precision to beard design, luxury hot towel shaves, and detail grooming with razor-sharp execution.',
      exp: '5 yrs exp',
      rating: '4.8',
      image: '', // Blank for now
      specialty: 'Beard Design, Detailing & Luxury Shaves'
    }
  ]
};

// Silhouette placeholder SVG for blank profiles
const SilhouetteAvatar = ({ name }) => (
  <div className="w-full h-full bg-[#222226] flex flex-col items-center justify-center relative group-hover:bg-[#2a2a30] transition-all duration-500 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/90 via-transparent to-transparent z-10" />
    
    {/* High-tech scanner line inside avatar box */}
    <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 shadow-[0_0_8px_#ffffff] scale-x-0 group-hover:scale-x-100 group-hover:translate-y-48 transition-all duration-1000 ease-out z-25" />
    
    <div className="w-24 h-24 rounded-full border border-white/5 bg-[#2a2a30] flex items-center justify-center shadow-inner group-hover:border-white/10 transition-colors duration-500 relative z-20">
      <User className="w-12 h-12 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500" />
    </div>
    
    <div className="mt-4 text-center px-4 relative z-20">
      <span className="text-[0.55rem] tracking-[0.2em] text-[#666666] font-bold uppercase block mb-1">STYLING TEAM</span>
      <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors">Photo Coming Soon</span>
    </div>
  </div>
);

export default function WorkersPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#121214]">
      <div className="container max-w-6xl">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#a0a0a0] font-semibold block mb-2">
            MEET THE ARTISTS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">
            Our Styling & Executive Team
          </h2>
          <p className="text-sm text-[#a0a0a0] leading-relaxed">
            The skilled professionals and visionaries driving the luxury unisex styling experience at He & She Hair Fix.
          </p>
        </div>

        {/* Section: Directors */}
        <div className="mb-20">
          <h3 className="text-xl font-bold font-serif text-white tracking-wide border-b border-white/5 pb-2 mb-8 text-left flex items-center gap-2">
            <Shield className="w-5 h-5 text-zinc-400" />
            Executive Leadership & Board
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {TEAM.directors.map((director, idx) => (
              <div 
                key={idx}
                className="group glass-panel overflow-hidden grid grid-cols-1 sm:grid-cols-12 hover:border-white/15 transition-all duration-300"
              >
                <div className="sm:col-span-5 h-56 sm:h-auto min-h-[220px] relative">
                  {director.image ? (
                    <img 
                      src={director.image} 
                      alt={director.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <SilhouetteAvatar name={director.name} />
                  )}
                </div>
                <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-white group-hover:text-zinc-300 transition-colors">
                          {director.name}
                        </h4>
                        <span className="text-[0.65rem] tracking-wider text-[#a0a0a0] font-bold uppercase">
                          {director.role}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        {director.rating}
                      </span>
                    </div>
                    <p className="text-[0.7rem] text-[#666666] leading-relaxed mb-4">
                      {director.bio}
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-3 mt-auto">
                    <span className="text-[0.55rem] text-[#666666] tracking-widest block mb-0.5">PRIMARY EXPERTISE</span>
                    <span className="text-xs font-semibold text-white/90">{director.specialty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Head Worker */}
        <div className="mb-20">
          <h3 className="text-xl font-bold font-serif text-white tracking-wide border-b border-white/5 pb-2 mb-8 text-left flex items-center gap-2">
            <Award className="w-5 h-5 text-zinc-400" />
            Head of Styling
          </h3>
          <div className="group glass-panel overflow-hidden max-w-3xl mx-auto hover:border-white/15 transition-all duration-300 text-left">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-4 h-64 md:h-auto min-h-[250px] relative">
                {TEAM.headWorker.image ? (
                  <img 
                    src={TEAM.headWorker.image} 
                    alt={TEAM.headWorker.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <SilhouetteAvatar name={TEAM.headWorker.name} />
                )}
              </div>
              <div className="md:col-span-8 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-serif text-2xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                        {TEAM.headWorker.name}
                      </h4>
                      <span className="text-[0.7rem] tracking-wider text-[#a0a0a0] font-bold uppercase">
                        {TEAM.headWorker.role}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-white flex items-center gap-0.5 justify-end">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                        {TEAM.headWorker.rating}
                      </span>
                      <span className="text-[0.6rem] text-[#666666] tracking-tight">{TEAM.headWorker.exp}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#a0a0a0] leading-relaxed mb-6">
                    {TEAM.headWorker.bio}
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4 mt-auto">
                  <span className="text-[0.6rem] text-[#666666] tracking-widest block mb-1 uppercase">Stylist Specialization</span>
                  <span className="text-sm font-semibold text-white/90">{TEAM.headWorker.specialty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Styling Staff */}
        <div>
          <h3 className="text-xl font-bold font-serif text-white tracking-wide border-b border-white/5 pb-2 mb-8 text-left flex items-center gap-2">
            <Scissors className="w-5 h-5 text-zinc-400" />
            Creative Styling & Grooming Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {TEAM.staff.map((stylist, idx) => (
              <div 
                key={idx}
                className="group glass-panel overflow-hidden flex flex-col justify-between hover:border-white/15 transition-all duration-300"
              >
                <div className="h-48 relative">
                  {stylist.image ? (
                    <img 
                      src={stylist.image} 
                      alt={stylist.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <SilhouetteAvatar name={stylist.name} />
                  )}
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-white group-hover:text-zinc-300 transition-colors">
                          {stylist.name}
                        </h4>
                        <span className="text-[0.6rem] tracking-wider text-[#a0a0a0] font-bold uppercase block">
                          {stylist.role}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-white flex items-center gap-0.5 justify-end">
                          <Star className="w-3.5 h-3.5 fill-white text-white" />
                          {stylist.rating}
                        </span>
                        <span className="text-[0.55rem] text-[#666666] block leading-none mt-0.5">{stylist.exp}</span>
                      </div>
                    </div>
                    <p className="text-[0.7rem] text-[#666666] leading-relaxed mb-4">
                      {stylist.bio}
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-3 mt-auto">
                    <span className="text-[0.55rem] text-[#666666] tracking-widest block mb-0.5">TEAM FOCUS</span>
                    <span className="text-[0.7rem] font-semibold text-white/90 leading-tight block">{stylist.specialty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
