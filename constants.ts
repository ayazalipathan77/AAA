import { Product, SlideData, IntelArticle } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "POF G3A3 BATTLE RIFLE",
    subtitle: "7.62x51mm NATO POWERHOUSE. STANDARD ISSUE DOMINANCE.",
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2070&auto=format&fit=crop", 
    cta: "INSPECT WEAPON"
  },
  {
    id: 2,
    title: "GLOCK GEN 5 SERIES",
    subtitle: "THE GLOBAL STANDARD IN RELIABILITY. NOW IN STOCK.",
    image: "https://images.unsplash.com/photo-1585562103175-90a61849a639?q=80&w=2070&auto=format&fit=crop",
    cta: "VIEW HANDGUNS"
  },
  {
    id: 3,
    title: "NIGHT OPERATIONS",
    subtitle: "OWN THE DARKNESS WITH GEN-3+ THERMAL OPTICS",
    image: "https://images.unsplash.com/photo-1542281286-9e0a56e2e1a1?q=80&w=2070&auto=format&fit=crop", 
    cta: "VIEW OPTICS"
  }
];

export const PRODUCTS: Product[] = [
  // --- RIFLES ---
  {
    id: 1,
    name: "AK-47 Type 56 [Folder]",
    category: "Firearms",
    price: 2800.00,
    image: "https://images.unsplash.com/photo-1590259838032-4043b2f8a455?q=80&w=800&auto=format&fit=crop", 
    specs: { Caliber: "7.62x39mm", Origin: "China/Local", Action: "Select Fire", License: "PB Required", Weight: "3.4kg" },
    description: "The legendary Type 56 under-folder. Rugged reliability for harsh environments. Requires Prohibited Bore license.",
    stock: 8
  },
  {
    id: 2,
    name: "POF G3A3",
    category: "Firearms",
    price: 3500.00,
    image: "https://images.unsplash.com/photo-1550106403-162799986326?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "7.62x51mm", Barrel: "18 inch", Weight: "4.4 kg", License: "PB Required", Range: "800m" },
    description: "Pakistan Ordnance Factories G3A3. A heavy-hitting battle rifle designed for long-range engagement.",
    stock: 5
  },
  {
    id: 3,
    name: "M4A1 Commando",
    category: "Firearms",
    price: 4200.00,
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "5.56 NATO", Barrel: "11.5 inch", Action: "Auto/Semi", License: "PB Required", Rail: "Quad" },
    description: "Compact carbine platform for CQB operations. Quad-rail system for tactical accessories.",
    stock: 12
  },
  {
    id: 13,
    name: "Steyr AUG A3",
    category: "Firearms",
    price: 5100.00,
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800&auto=format&fit=crop", 
    specs: { Caliber: "5.56 NATO", Design: "Bullpup", Optics: "Integrated", License: "PB Required" },
    description: "Futuristic bullpup design offering full barrel length in a compact package.",
    stock: 2
  },

  // --- PISTOLS ---
  {
    id: 4,
    name: "Glock 19 Gen 5",
    category: "Firearms",
    price: 4500.00, 
    image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "9mm", Capacity: "15+1", Finish: "nDLC", Origin: "Austria", Sights: "GNS" },
    description: "The gold standard for concealed carry. Features the Marksman Barrel and flared magwell.",
    stock: 25
  },
  {
    id: 5,
    name: "Zigana F [Auto]",
    category: "Firearms",
    price: 1200.00,
    image: "https://images.unsplash.com/photo-1584033620959-197aa56c5473?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "9mm", Mode: "Full Auto", Capacity: "18+1", Origin: "Turkey", Frame: "Alloy" },
    description: "High-capacity machine pistol popular in local security sectors. Extremely high rate of fire.",
    stock: 15
  },
  {
    id: 6,
    name: "Beretta 92FS Inox",
    category: "Firearms",
    price: 2800.00,
    image: "https://images.unsplash.com/photo-1585562103175-90a61849a639?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "9mm", Action: "DA/SA", Barrel: "4.9 inch", Material: "Stainless", Safety: "Slide" },
    description: "The classic sidearm. Open slide design ensures smooth feeding and ejection.",
    stock: 10
  },
  {
    id: 7,
    name: "TT-33 '30 Bore' Special",
    category: "Firearms",
    price: 450.00,
    image: "https://images.unsplash.com/photo-1563810842211-14c622501a5e?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "7.62x25mm", Capacity: "8+1", Origin: "Darra Custom", Penetration: "High", Frame: "Steel" },
    description: "Local craftsmanship meets Soviet design. High velocity round capable of penetrating soft armor.",
    stock: 50
  },
  {
    id: 8,
    name: "Heckler & Koch MP5 A3",
    category: "Firearms",
    price: 5500.00,
    image: "https://images.unsplash.com/photo-1583096181966-8360d26732dc?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "9mm", Action: "Roller Delay", License: "PB Required", Origin: "POF/German", Stock: "Collapsible" },
    description: "The ultimate submachine gun. Collapsible stock. Choice of elite special forces.",
    stock: 3
  },
  {
    id: 14,
    name: "SIG Sauer P226 Legion",
    category: "Firearms",
    price: 3200.00,
    image: "https://images.unsplash.com/photo-1585562103175-90a61849a639?q=80&w=800&auto=format&fit=crop", 
    specs: { Caliber: "9mm", Action: "DA/SA", Finish: "Legion Gray", Sights: "X-RAY3", Frame: "Alloy" },
    description: "Enhanced features for professional users. G10 grips and reduced profile controls.",
    stock: 7
  },

  // --- AMMUNITION ---
  {
    id: 9,
    name: "7.62x39mm Soviet Surplus",
    category: "Ammunition",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1554188248-986adbb73be0?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "7.62x39", Casing: "Steel", Box: "50 rounds", Origin: "China", Core: "Steel" },
    description: "Steel core ammunition for AK platforms. Corrosive primers (cleaning required).",
    stock: 5000
  },
  {
    id: 10,
    name: "9mm Luger Ball (POF)",
    category: "Ammunition",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1626262492723-95f7c3279144?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "9mm", Grain: "124gr", Type: "FMJ", Box: "50 rounds", Velocity: "1150 fps" },
    description: "Standard factory load. Reliable feeding for all 9mm platforms.",
    stock: 2000
  },
  {
    id: 15,
    name: "7.62x51mm NATO Match",
    category: "Ammunition",
    price: 80.00,
    image: "https://images.unsplash.com/photo-1554188248-986adbb73be0?q=80&w=800&auto=format&fit=crop",
    specs: { Caliber: "7.62x51", Grain: "168gr", Type: "BTHP", Box: "20 rounds", Use: "Precision" },
    description: "Match grade ammunition for G3 and sniper platforms.",
    stock: 500
  },

  // --- GEAR ---
  {
    id: 11,
    name: "Level IV Ceramic Plates",
    category: "Tactical Gear",
    price: 400.00,
    image: "https://images.unsplash.com/photo-1590001053702-54aa7a80b065?q=80&w=800&auto=format&fit=crop",
    specs: { Rating: "NIJ IV", Material: "Alumina", Weight: "2.7 kg", Cut: "Shooters", Hits: "Multi" },
    description: "Stops AP rounds. Multi-hit capability. Essential for high-threat zones.",
    stock: 30
  },
  {
    id: 12,
    name: "BlackHawk Drop Leg Holster",
    category: "Tactical Gear",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1510493397941-86641e71239e?q=80&w=800&auto=format&fit=crop",
    specs: { Fit: "Universal", Material: "Nylon", Color: "Black", Retention: "Level 2", Hand: "Right" },
    description: "Tactical thigh rig for quick secondary weapon access.",
    stock: 100
  },
  {
    id: 16,
    name: "Ops-Core Fast Helmet",
    category: "Tactical Gear",
    price: 1200.00,
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800&auto=format&fit=crop",
    specs: { Rating: "IIIA", Material: "Kevlar", Color: "OD Green", Size: "L/XL", Mount: "NVG" },
    description: "High-cut ballistic helmet compatible with communication headsets.",
    stock: 8
  }
];

export const INTEL_ARTICLES: IntelArticle[] = [
  {
    id: 1,
    title: "SINDH ARMS ACT AMENDMENTS 2024",
    excerpt: "New regulatory framework for Prohibited Bore licenses in the province. What every owner needs to know.",
    date: "2024-03-15",
    author: "LEGAL DEPT.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop",
    tags: ["LEGAL", "SINDH", "REGULATION"]
  },
  {
    id: 2,
    title: "AK-47 VS G3: THE LOCAL DEBATE",
    excerpt: "Comparing the stopping power of the 7.62x51mm against the versatility of the 7.62x39mm in urban defense.",
    date: "2024-03-10",
    author: "INST. KHAN",
    image: "https://images.unsplash.com/photo-1620508588665-27670783933c?q=80&w=800&auto=format&fit=crop",
    tags: ["BALLISTICS", "COMPARISON", "RIFLES"]
  },
  {
    id: 3,
    title: "MAINTAINING THE 30 BORE",
    excerpt: "Why the TT-33 remains the king of the streets and how to keep it running with local ammo.",
    date: "2024-02-28",
    author: "ARMORER ALI",
    image: "https://images.unsplash.com/photo-1563810842211-14c622501a5e?q=80&w=800&auto=format&fit=crop",
    tags: ["MAINTENANCE", "PISTOLS", "VINTAGE"]
  }
];