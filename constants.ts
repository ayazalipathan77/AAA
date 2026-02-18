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
  {
    id: 1,
    name: 'PX-9 GEN3 DUTY',
    price: 399.99,
    category: 'Handguns',
    image: 'https://tisasarms.com/uploads/655e0d3fb1b22.jpg',
    description: 'The PX-9 Gen3 Duty is a polymer frame striker fired customer favorite.',
    stock: 50,
    rating: 4.8,
    specs: {
      caliber: '9x19mm',
      capacity: '18+1',
      barrelLength: '4.11"',
      weight: '1.78 lbs',
      finish: 'Black'
    }
  },
  {
    id: 2,
    name: 'PX-9 GEN3 TACTICAL',
    price: 479.99,
    category: 'Handguns',
    image: 'https://tisasarms.com/uploads/655e0d3fb1b22.jpg',
    description: 'Threaded barrel version of the PX-9 Gen3 for suppressor use.',
    stock: 25,
    rating: 4.9,
    specs: {
      caliber: '9x19mm',
      capacity: '20+1',
      barrelLength: '5.1"',
      weight: '1.85 lbs',
      finish: 'FDE'
    }
  },
  {
    id: 3,
    name: '1911 DUTY B45',
    price: 499.99,
    category: 'Handguns',
    image: 'https://tisasarms.com/uploads/657aafff5a5fa.jpg',
    description: 'A full-size 1911 pistol with modern upgrades.',
    stock: 15,
    rating: 4.7,
    specs: {
      caliber: '.45 ACP',
      capacity: '8+1',
      barrelLength: '5"',
      weight: '2.3 lbs',
      finish: 'Black Cerakote'
    }
  },
  {
    id: 4,
    name: '1911 CARRY B45',
    price: 529.99,
    category: 'Handguns',
    image: 'https://tisasarms.com/uploads/657aafff5a5fa.jpg',
    description: 'Commander size 1911 for concealed carry.',
    stock: 10,
    rating: 4.6,
    specs: {
      caliber: '.45 ACP',
      capacity: '8+1',
      barrelLength: '4.25"',
      weight: '2.1 lbs',
      finish: 'Black'
    }
  },
  {
    id: 5,
    name: 'NIGHT STALKER 1911',
    price: 749.99,
    category: 'Handguns',
    image: 'https://tisasarms.com/uploads/657aafff5a5fa.jpg',
    description: 'Premium 1911 with gray cerakote and night sights.',
    stock: 5,
    rating: 5.0,
    specs: {
      caliber: '10mm',
      capacity: '9+1',
      barrelLength: '5"',
      weight: '2.4 lbs',
      finish: 'Platinum Grey'
    }
  },
  {
    id: 6,
    name: 'ZIGANA PX-9',
    price: 349.99,
    category: 'Handguns',
    image: 'https://tisasarms.com/uploads/655e0d3fb1b22.jpg',
    description: 'The original Zigana PX-9 model.',
    stock: 40,
    rating: 4.5,
    specs: {
      caliber: '9x19mm',
      capacity: '15+1',
      barrelLength: '4"',
      weight: '1.7 lbs',
      finish: 'Black'
    }
  },
  {
    id: 7,
    name: 'Fatih 13',
    price: 399.00,
    category: 'Handguns',
    image: 'https://tisasarms.com/uploads/657aafff5a5fa.jpg',
    description: 'Compact .380 ACP pistol, based on classic Italian designs.',
    stock: 30,
    rating: 4.6,
    specs: {
      caliber: '.380 ACP',
      capacity: '13+1',
      barrelLength: '3.8"',
      weight: '1.5 lbs',
      finish: 'Black/White'
    }
  },
  {
    id: 8,
    name: 'Zig 14',
    price: 450.00,
    category: 'Handguns',
    image: 'https://tisasarms.com/uploads/657aafff5a5fa.jpg',
    description: 'A recreation of the classic Browning Hi-Power.',
    stock: 12,
    rating: 4.8,
    specs: {
      caliber: '9x19mm',
      capacity: '13+1',
      barrelLength: '4.6"',
      weight: '2.0 lbs',
      finish: 'Black'
    }
  },
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

export const CATEGORIES = [
  'All',
  'Handguns',
  'Rifles',
  'Tactical Gear',
  'Ammunition'
];