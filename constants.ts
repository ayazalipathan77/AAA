import { Product, SlideData, IntelArticle } from './types';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "AAA CUSTOM AR-15",
    subtitle: "NEXT-GEN BALLISTICS FOR THE MODERN OPERATOR",
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2070&auto=format&fit=crop", 
    cta: "INSPECT WEAPON"
  },
  {
    id: 2,
    title: "EXO-SKELETON PLATE CARRIERS",
    subtitle: "LIGHTWEIGHT PROTECTION. MAXIMUM MOBILITY.",
    image: "https://images.unsplash.com/photo-1590001053702-54aa7a80b065?q=80&w=1974&auto=format&fit=crop",
    cta: "EQUIP GEAR"
  },
  {
    id: 3,
    title: "PRECISION OPTICS",
    subtitle: "DOMINATE THE NIGHT WITH THERMAL ACQUISITION",
    image: "https://images.unsplash.com/photo-1549488346-635c026027f6?q=80&w=2070&auto=format&fit=crop", 
    cta: "VIEW OPTICS"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "M4A1 Carbine [Civilian]",
    category: "Firearms",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1585562103175-90a61849a639?q=80&w=600&auto=format&fit=crop",
    specs: { Caliber: "5.56mm", Barrel: "14.5 inch", Weight: "6.4 lbs", Action: "Semi-Auto" },
    description: "Standard issue reliability refined for precision sport shooting.",
    stock: 12
  },
  {
    id: 2,
    name: "Specter Plate Carrier",
    category: "Tactical Gear",
    price: 249.50,
    image: "https://images.unsplash.com/photo-1598556801314-878775a06556?q=80&w=600&auto=format&fit=crop",
    specs: { Material: "500D Cordura", Rating: "Level III", Weight: "2.1 lbs", Size: "Adjustable" },
    description: "Modular attachment points with quick-release systems.",
    stock: 45
  },
  {
    id: 3,
    name: ".308 Win Match Grade",
    category: "Ammunition",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1626262492723-95f7c3279144?q=80&w=600&auto=format&fit=crop",
    specs: { Caliber: ".308 Win", Grain: "168gr", Velocity: "2650 fps", Box: "20 rounds" },
    description: "Aerodynamic secant ogive profile for flat trajectories.",
    stock: 200
  },
  {
    id: 4,
    name: "NightHawk NVG-14",
    category: "Tactical Gear",
    price: 3200.00,
    image: "https://images.unsplash.com/photo-1510493397941-86641e71239e?q=80&w=600&auto=format&fit=crop",
    specs: { Gen: "3+", Phosphor: "White", FOV: "40 deg", Material: "Composite" },
    description: "Battle-proven night vision monocular system.",
    stock: 3
  },
  {
    id: 5,
    name: "G19 Gen 5",
    category: "Firearms",
    price: 599.00,
    image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=600&auto=format&fit=crop",
    specs: { Caliber: "9mm", Capacity: "15+1", Barrel: "4.02 inch", Action: "Striker Fired" },
    description: "Compact polymer frame pistol with enhanced texture.",
    stock: 28
  },
  {
    id: 6,
    name: "5.56 NATO Green Tip",
    category: "Ammunition",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1554188248-986adbb73be0?q=80&w=600&auto=format&fit=crop",
    specs: { Caliber: "5.56mm", Grain: "62gr", Core: "Steel Pen", Box: "20 rounds" },
    description: "M855 Ball ammunition for training and duty use.",
    stock: 1500
  }
];

export const INTEL_ARTICLES: IntelArticle[] = [
  {
    id: 1,
    title: "ADVANCED BALLISTICS: THE 6.8MM REVOLUTION",
    excerpt: "Analyzing the shift to intermediate calibers in modern combat scenarios. Stopping power vs effective range.",
    date: "2024-03-15",
    author: "MAJ. KUSANAGI",
    image: "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=2070&auto=format&fit=crop",
    tags: ["BALLISTICS", "TECH", "ANALYSIS"]
  },
  {
    id: 2,
    title: "NIGHT VISION: BEYOND PHOSPHOR",
    excerpt: "Digital thermal fusion is changing how operators own the night. A look at the latest sensor tech.",
    date: "2024-03-10",
    author: "SPEC. RAYNOR",
    image: "https://images.unsplash.com/photo-1510493397941-86641e71239e?q=80&w=600&auto=format&fit=crop",
    tags: ["OPTICS", "GEAR", "REVIEW"]
  },
  {
    id: 3,
    title: "URBAN CAMOUFLAGE PATTERNS 2024",
    excerpt: "Why traditional digital patterns are being phased out for AI-generated micro-disruption patterns.",
    date: "2024-02-28",
    author: "LT. VANCE",
    image: "https://images.unsplash.com/photo-1590001053702-54aa7a80b065?q=80&w=1974&auto=format&fit=crop",
    tags: ["TACTICS", "CAMO"]
  }
];