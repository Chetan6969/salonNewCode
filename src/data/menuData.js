// =============================================================================
//  He & She HairFix — Menu & Rate List 2026
//  Prices taken exactly from the official Salon Menu Card PDF.
//  Call / WhatsApp: 6266979583 · 7748071845
// =============================================================================

// ---- SERVICES TAB -----------------------------------------------------------
// Regular salon menu, grouped by category. `price` is a number in ₹.
// Items with `onRequest: true` have no fixed price (price: null).
export const servicesData = [
  {
    category: 'Cuts & Grooming',
    items: [
      { id: 'haircut', name: 'Hair Cut', price: 150, duration: '20 mins', desc: 'Standard precision cut tailored to your look.' },
      { id: 'haircut-advance', name: 'Hair Cut Advance', price: 200, duration: '30 mins', desc: 'Advanced custom styling by senior stylists.' },
      { id: 'trim-set', name: 'Beard Trimming & Set', price: 100, duration: '20 mins', desc: 'Clean beard trim and sharp shape-up.' },
      { id: 'beard-advance', name: 'Beard Advance Styling', price: 150, duration: '25 mins', desc: 'Detailed beard design and styling.' },
      { id: 'clean-shave', name: 'Clean Shave', price: 100, duration: '20 mins', desc: 'Smooth traditional shave with aftershave.' },
      { id: 'shampoo-cond', name: 'Shampoo & Conditioner', price: 100, duration: '15 mins', desc: 'Refreshing wash with nourishing conditioner.' },
    ],
  },
  {
    category: 'Styling & Finish',
    items: [
      { id: 'hair-set', name: 'Hair Set', price: 100, duration: '15 mins', desc: 'Quick blow-dry setting for any occasion.' },
      { id: 'hair-set-shampoo', name: 'Hair Set & Shampoo', price: 150, duration: '25 mins', desc: 'Shampoo followed by professional blow-dry set.' },
      { id: 'hair-colouring', name: 'Hair Colouring', price: 550, duration: '45 mins', desc: 'Even, long-lasting colour application.' },
      { id: 'hair-shiner', name: 'Hair Shiner', price: 450, duration: '30 mins', desc: 'Instant gloss treatment for vibrant shine.' },
    ],
  },
  {
    category: 'Texture & Smoothening',
    note: 'Prices for normal hair length. Longer hair is charged as per length.',
    items: [
      { id: 'hair-smoothening', name: 'Hair Smoothening', price: 1299, duration: '120 mins', desc: 'Anti-frizz smoothening for sleek, manageable hair.' },
      { id: 'hair-straightening', name: 'Hair Straightening', price: 1200, duration: '120 mins', desc: 'Straightening for a smooth, glossy texture.' },
      { id: 'hair-rebonding', name: 'Hair Rebonding', price: 2000, duration: '150 mins', desc: 'Structural rebonding for pin-straight hair.' },
      { id: 'keratin', name: 'Keratin', price: 1999, duration: '120 mins', desc: 'Protein infusion that repairs and softens.' },
      { id: 'hair-botox', name: 'Hair Botox', price: 2500, duration: '120 mins', desc: 'Deep repair treatment that rebuilds damaged hair.' },
      { id: 'nanoplastia', name: 'Nanoplastia', price: 3000, duration: '150 mins', desc: 'Formaldehyde-free smoothening with lasting shine.' },
      { id: 'kera-smooth', name: 'Kera Smooth', price: 2500, duration: '120 mins', desc: 'Keratin-based smoothening for frizz-free hair.' },
      { id: 'olaplex', name: 'Olaplex', price: 3000, duration: '90 mins', desc: 'Bond-building treatment that restores strength.' },
    ],
  },
  {
    category: 'Hair Spa & Scalp Therapy',
    items: [
      { id: 'oiling-massage', name: 'Oiling & Head Massage', price: 200, duration: '20 mins', desc: 'Relaxing scalp oiling with pressure-point massage.' },
      { id: 'spa-normal', name: 'Hair Spa Normal', price: 550, duration: '40 mins', desc: 'Nourishing steam and deep root mask.' },
      { id: 'spa-antidandruff', name: 'Hair Spa Anti-Dandruff', price: 800, duration: '45 mins', desc: 'Clarifying scalp therapy that clears dandruff.' },
      { id: 'spa-antihairfall', name: 'Anti Hairfall Hair Spa', price: 1000, duration: '50 mins', desc: 'Strengthening spa that reduces hair fall.' },
      { id: 'scalp-treatment', name: 'Scalp Treatment', price: 1300, duration: '50 mins', desc: 'Advanced therapy for a healthy, balanced scalp.' },
    ],
  },
  {
    category: 'Curly Hair Therapy',
    items: [
      { id: 'curly-basic', name: 'Basic Curly Texture', price: 3000, duration: '120 mins', desc: 'Define soft, natural-looking curls.' },
      { id: 'curly-permanent', name: 'Permanent Curly Therapy', price: 4500, duration: '180 mins', desc: 'Long-lasting permanent curl shaping.' },
      { id: 'loose-perm', name: 'Loose Perm', price: 3500, duration: '150 mins', desc: 'Relaxed, bouncy loose waves.' },
      { id: 'messy-texture', name: 'Messy Texture', price: 2500, duration: '120 mins', desc: 'Effortless tousled, textured finish.' },
    ],
  },
  {
    category: 'Hair Colour',
    note: 'All colours are ammonia-free.',
    items: [
      { id: 'color-root', name: 'Root Touch-up', price: 300, duration: '30 mins', desc: 'Quick grey coverage for roots.' },
      { id: 'color-herbal', name: 'Herbal Colour', price: 550, duration: '45 mins', desc: 'Gentle herbal colour for natural tones.' },
      { id: 'color-loreal', name: "L'Oréal & Matrix", price: 550, duration: '50 mins', desc: 'Premium L’Oréal / Matrix colour.' },
      { id: 'color-wella-pro', name: 'Wella Professional', price: 500, duration: '50 mins', desc: 'Rich, professional Wella colour.' },
      { id: 'color-inoa', name: 'INOA Colour', price: 600, duration: '60 mins', desc: 'L’Oréal INOA oil-delivery, ammonia-free colour.' },
      { id: 'color-schwarzkopf', name: 'Schwarzkopf Colour', price: 700, duration: '60 mins', desc: 'High-performance Schwarzkopf colour.' },
      { id: 'color-wella-premium', name: 'Wella Premium', price: 800, duration: '60 mins', desc: 'Top-tier Wella premium colour.' },
    ],
  },
  {
    category: 'Skin Care',
    items: [
      { id: 'cleansing', name: 'Cleansing', price: 100, duration: '15 mins', desc: 'Deep cleanse to wash away dirt and oil.' },
      { id: 'face-scrub-normal', name: 'Face Scrub Normal', price: 200, duration: '15 mins', desc: 'Exfoliating scrub for fresh, clear skin.' },
      { id: 'face-massage', name: 'Face Massage', price: 300, duration: '25 mins', desc: 'Relaxing massage to boost circulation.' },
      { id: 'face-scrub-steam', name: 'Face Scrub with Steam & Massage', price: 400, duration: '30 mins', desc: 'Scrub, steam and massage combo.' },
      { id: 'face-massage-advance', name: 'Advance Face Massage with Steam', price: 500, duration: '35 mins', desc: 'Advanced massage with steam for deep glow.' },
    ],
  },
  {
    category: 'Bleach & D-Tan',
    items: [
      { id: 'bleach', name: 'Bleach', price: 300, duration: '25 mins', desc: 'Mild bleach to reveal an even glow.' },
      { id: 'bleach-neck', name: 'Bleach Neck & Face', price: 500, duration: '30 mins', desc: 'Bleach covering face and neck.' },
      { id: 'dtan-basic', name: 'D-Tan Basic', price: 400, duration: '30 mins', desc: 'Basic de-tan to remove sun tan.' },
      { id: 'dtan-advance', name: 'D-Tan Advance', price: 500, duration: '35 mins', desc: 'Advanced de-tan for brighter skin.' },
      { id: 'beardo-dtan', name: 'Beardo D-Tan', price: 550, duration: '30 mins', desc: 'Charcoal Beardo de-tan that refreshes pores.' },
      { id: 'hand-dtan', name: 'Full Hand D-Tan', price: 600, duration: '45 mins', desc: 'Removes tanning from shoulder to fingertips.' },
      { id: 'raaga-dtan-neck', name: 'Raaga D-Tan Face & Neck', price: 700, duration: '40 mins', desc: 'Raaga de-tan for face and neck.' },
      { id: 'beardo-dtan-neck', name: 'Beardo D-Tan Neck & Face', price: 700, duration: '40 mins', desc: 'Beardo de-tan for face and neck.' },
      { id: 'o3-dtan', name: 'O3+ Face D-Tan', price: 700, duration: '35 mins', desc: 'Premium O3+ de-tan for instant brightening.' },
      { id: 'o3-dtan-neck', name: 'O3+ Face & Neck D-Tan', price: 900, duration: '45 mins', desc: 'O3+ de-tan covering face and neck.' },
      { id: 'leg-dtan', name: 'Leg D-Tan', price: 800, duration: '45 mins', desc: 'De-tan treatment for legs.' },
    ],
  },
  {
    category: 'Professional Cleanup',
    items: [
      { id: 'cleanup-dry', name: 'Dead Cell Cleanup — Normal to Dry Skin', price: 999, duration: '30 mins', desc: 'Hydrating cleanup that removes dry flakes.' },
      { id: 'cleanup-oily', name: 'Dead Cell Cleanup — Normal to Oily Skin', price: 999, duration: '30 mins', desc: 'Oil-balancing cleanup for clear skin.' },
      { id: 'cleanup-organic-dry', name: 'Organic Cleanup — Normal & Dry', price: 1200, duration: '35 mins', desc: 'Natural organic cleanup for dry skin.' },
      { id: 'cleanup-organic-oily', name: 'Organic Herbal — Normal & Oily', price: 1200, duration: '35 mins', desc: 'Herbal cleanup that clarifies oily skin.' },
      { id: 'cleanup-dtan', name: 'D-Tan Cleanup', price: 1200, duration: '40 mins', desc: 'De-tan massage with deep pore cleansing.' },
      { id: 'cleanup-lotus', name: 'Lotus Cleanup', price: 1300, duration: '40 mins', desc: 'Lotus Herbals cleanup for a healthy glow.' },
      { id: 'cleanup-o3', name: 'O3+ Cleanup — Oily to Dry Skin', price: 1400, duration: '40 mins', desc: 'Premium O3+ cleanup for all skin types.' },
    ],
  },
  {
    category: 'Professional Facials',
    items: [
      { id: 'facial-basic', name: 'Basic Facial', price: 1000, duration: '45 mins', desc: 'Refreshing facial for healthy, glowing skin.' },
      { id: 'facial-acne-tan', name: 'Acne & Tan Clear', price: 1500, duration: '50 mins', desc: 'Targets acne and clears stubborn tan.' },
      { id: 'facial-herbal', name: 'Herbal Facial', price: 2000, duration: '60 mins', desc: 'Herbal extracts that nourish and soothe.' },
      { id: 'facial-deadcell', name: 'Dead Cell Facial', price: 2000, duration: '60 mins', desc: 'Deep peeling and cell regeneration therapy.' },
      { id: 'facial-lotus-herbal', name: 'Lotus Herbal Facial', price: 2000, duration: '60 mins', desc: 'Lotus Herbals facial for radiant skin.' },
      { id: 'facial-o3-dtan', name: 'O3+ D-Tan Facial', price: 2300, duration: '60 mins', desc: 'O3+ facial with de-tan for bright skin.' },
      { id: 'facial-o3', name: 'O3+ Facial', price: 2500, duration: '60 mins', desc: 'Premium O3+ facial for a luminous glow.' },
      { id: 'facial-hydra', name: 'Hydra Facial', price: 2500, duration: '70 mins', desc: 'Deep hydration and skin resurfacing.', note: '+ Advance ₹3500' },
      { id: 'facial-bridal', name: 'O3+ Bridal Facial', price: 3000, duration: '75 mins', desc: 'O3+ bridal glow ritual for your big day.' },
      { id: 'facial-korean', name: 'Korean Glass Facial', price: 3000, duration: '75 mins', desc: 'Korean ritual for dewy, glass-like skin.' },
    ],
  },
  {
    category: 'Hands & Feet Care',
    items: [
      { id: 'manicure', name: 'Manicure', price: 999, duration: '40 mins', desc: 'Grooming and care for hands and nails.' },
      { id: 'pedicure', name: 'Pedicure', price: 1499, duration: '50 mins', desc: 'Relaxing care for feet and nails.' },
      { id: 'spa-manicure', name: 'Spa Manicure', price: null, onRequest: true, duration: '45 mins', desc: 'Luxury spa manicure. Price on request.' },
      { id: 'spa-pedicure', name: 'Spa Pedicure', price: null, onRequest: true, duration: '55 mins', desc: 'Luxury spa pedicure. Price on request.' },
      { id: 'gel-polish', name: 'Gel Polish', price: null, onRequest: true, duration: '40 mins', desc: 'Long-lasting gel nail polish. Price on request.' },
      { id: 'nail-art', name: 'Nail Art', price: null, onRequest: true, duration: '45 mins', desc: 'Custom nail art designs. Price on request.' },
    ],
  },
  {
    category: 'Body Care',
    items: [
      { id: 'full-body-trim', name: 'Full Body Trim', price: 500, duration: '30 mins', desc: 'Full body hair trimming.' },
      { id: 'hand-chest', name: 'Hand / Chest', price: 400, duration: '25 mins', desc: 'Hand or chest grooming.' },
    ],
  },
  {
    category: 'Threading',
    items: [
      { id: 'thread-eyebrow', name: 'Eyebrow', price: 50, duration: '10 mins', desc: 'Precise eyebrow shaping.' },
      { id: 'thread-upperlip', name: 'Upper Lip', price: 50, duration: '5 mins', desc: 'Clean upper-lip threading.' },
      { id: 'thread-forehead', name: 'Forehead', price: 50, duration: '5 mins', desc: 'Forehead threading.' },
      { id: 'thread-fullface', name: 'Full Face Threading', price: 200, duration: '20 mins', desc: 'Complete facial threading.' },
    ],
  },
];

// ---- BODY SPA TAB -----------------------------------------------------------
// Section Four — Spa & Wellness (massage therapies).
export const bodySpaData = [
  {
    category: 'Massage Therapies',
    note: 'Exclusively for gentlemen.',
    items: [
      { id: 'massage-regular-40', name: 'Regular Massage (40 min)', price: 1200, duration: '40 mins', desc: 'Classic relaxation massage.' },
      { id: 'massage-regular-60', name: 'Regular Massage (60 min)', price: 1299, duration: '60 mins', desc: 'Extended full relaxation massage.' },
      { id: 'massage-foot', name: 'Foot Massage (30 min)', price: 400, duration: '30 mins', desc: 'Soothing foot and sole massage.' },
      { id: 'massage-back', name: 'Back Massage (30 min)', price: 500, duration: '30 mins', desc: 'Tension-releasing back massage.' },
      { id: 'massage-cream-foam', name: 'Cream & Foam Body Massage', price: 2000, duration: '60 mins', desc: 'Rich cream and foam full-body massage.' },
      { id: 'massage-aroma', name: 'Aroma Oil Massage (60 min)', price: 1500, duration: '60 mins', desc: 'Calming aromatic oil massage.' },
      { id: 'massage-deep-tissue', name: 'Deep Tissue Massage', price: 1700, duration: '60 mins', desc: 'Firm massage for deep muscle relief.' },
      { id: 'massage-hot-stone', name: 'Hot Stone Massage', price: 2000, duration: '70 mins', desc: 'Warm stone therapy for deep relaxation.' },
      { id: 'massage-full-relax', name: 'Full Body Relaxation Massage (90 min)', price: 2000, duration: '90 mins', desc: 'Complete head-to-toe relaxation.' },
      { id: 'massage-luxury', name: 'He & She Luxury Full Body Massage (90 min)', price: 2500, duration: '90 mins', desc: 'Our signature luxury full-body ritual.' },
    ],
  },
];

// ---- GROOM / BRIDE PACKAGES TAB ---------------------------------------------
export const packagesData = [
  {
    id: 'pkg-basic',
    name: 'Basic Package',
    tagline: 'The Essentials',
    price: 4999,
    worth: 6500,
    popular: false,
    includes: [
      'Face Cleanup (as per skin) ×2',
      'Facial ×1',
      'D-Tan ×2',
      'Hair Cut ×2',
      'Beard ×3',
      'Hair Spa ×1',
      'Eye & Full Face Threading ×1',
      'Hand D-Tan ×1',
    ],
    freebie: 'Wedding Day Styling ×1 — Free of cost',
  },
  {
    id: 'pkg-premium',
    name: 'Premium Package',
    tagline: 'Most Popular',
    price: 9999,
    worth: 13000,
    popular: true,
    includes: [
      'Premium Facial ×2',
      'Face D-Tan ×2',
      'Cleanup ×1',
      'Hair Cut (Unlimited)',
      'Beard & Styling (Unlimited)',
      'Protein Hair Spa ×1',
      'Manicure ×1',
      'Pedicure ×1',
      'Full Face Waxing ×2',
      'Full Face Threading ×2',
      'Head Massage ×2',
      'Hair Colour ×1',
    ],
    freebie: 'Wedding Day Styling ×1 — Free of cost',
  },
  {
    id: 'pkg-luxury',
    name: 'Luxury Package',
    tagline: 'The Complete Groom Experience',
    price: 14999,
    worth: 18000,
    popular: false,
    includes: [
      'Premium Korean Glass Facial ×1',
      'Hydra Facial ×1',
      'Facial D-Tan ×3',
      'Protein Packing Hair Spa ×2',
      'Hair Cut (Unlimited)',
      'Beard Styling (Unlimited)',
      'Premium Pedicure ×2',
      'Manicure ×2',
      'Full Face Waxing ×2',
      'Full Face Threading ×2',
      'Chest Cleanup ×1',
      'Body Threading ×1',
      'Hair Colour ×1',
    ],
    freebie: 'Wedding Day Styling ×1 — Free of cost',
  },
];

export const packagesMeta = {
  kicker: 'Groom-to-be · Valid 30 Days',
  note: 'Packages are valid for 30 days from purchase. Prices inclusive of service; taxes extra where applicable.',
};

// ---- MONTHLY PACKAGE TAB ----------------------------------------------------
// Not listed in the printed menu card — shown as an enquiry/coming-soon tab.
export const monthlyMeta = {
  kicker: 'Members Only',
  title: 'Monthly Grooming Plans',
  desc: 'Unlimited grooming essentials on a simple monthly plan — perfect for regular cuts, beard shape-ups and upkeep. Plans are being finalised; contact us for current monthly rates and inclusions.',
};

// ---- Helpers ----------------------------------------------------------------
// Everything that can be added to the booking cart (numeric prices only).
export const bookableCategories = [...servicesData, ...bodySpaData];
export const flatBookableServices = bookableCategories
  .reduce((acc, cat) => [...acc, ...cat.items], [])
  .filter((s) => typeof s.price === 'number');

// Salon contact used for WhatsApp enquiries (packages / on-request items).
export const SALON_WHATSAPP = '916266979583';
export function waEnquiryLink(message) {
  return `https://wa.me/${SALON_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
