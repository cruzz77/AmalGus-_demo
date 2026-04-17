
export const SUPPLIERS = [
  {
    id: 's1',
    name: 'Gujarat Float Glass Ltd.',
    location: 'Bharuch, Gujarat',
    verified: true,
    categories: ['Float', 'Tempered', 'Laminated'],
    rating: 4.8,
    yearsInBusiness: 25,
    products: [
      { name: 'Clear Float 5mm', price: 48, delivery: 3 },
      { name: 'Toughened 8mm', price: 125, delivery: 4 }
    ],
    moq: '500 sq.ft'
  },
  {
    id: 's2',
    name: 'Asahi India Glass Ltd. (AIS)',
    location: 'Rewari, Haryana',
    verified: true,
    categories: ['Architectural', 'Automotive', 'Solar'],
    rating: 4.9,
    yearsInBusiness: 40,
    products: [
      { name: 'Clear Float 5mm', price: 52, delivery: 2 },
      { name: 'Low-E 6mm', price: 210, delivery: 5 }
    ],
    moq: '1000 sq.ft'
  },
  {
    id: 's3',
    name: 'Saint-Gobain India',
    location: 'Chennai, Tamil Nadu',
    verified: true,
    categories: ['Premium', 'Coated', 'Fire-rated'],
    rating: 4.9,
    yearsInBusiness: 28,
    products: [
      { name: 'Clear Float 5mm', price: 55, delivery: 5 },
      { name: 'Reflective 6mm', price: 115, delivery: 7 }
    ],
    moq: '800 sq.ft'
  },
  {
    id: 's4',
    name: 'Gold Plus Glass',
    location: 'Roorkee, Uttarakhand',
    verified: true,
    categories: ['Float', 'Patterned', 'Mirror'],
    rating: 4.5,
    yearsInBusiness: 18,
    products: [
      { name: 'Clear Float 5mm', price: 46, delivery: 4 }
    ],
    moq: '400 sq.ft'
  },
  {
    id: 's5',
    name: 'Modiguard (Shri Ram Group)',
    location: 'Shyam Nagar, UP',
    verified: true,
    categories: ['Safety', 'Tempered', 'Laminated'],
    rating: 4.6,
    yearsInBusiness: 35,
    products: [
      { name: 'Toughened 12mm', price: 185, delivery: 3 }
    ],
    moq: '600 sq.ft'
  },
  {
    id: 's6',
    name: 'Borosil Renewables',
    location: 'Bharuch, Gujarat',
    verified: true,
    categories: ['Solar', 'Textured', 'Specialty'],
    rating: 4.7,
    yearsInBusiness: 12,
    products: [
      { name: 'Solar Glass 4mm', price: 95, delivery: 10 }
    ],
    moq: '2000 sq.ft'
  },
  {
    id: 's7',
    name: 'Hindustan Specialty Glass',
    location: 'Mumbai, Maharashtra',
    verified: false,
    categories: ['Decorative', 'Mirror', 'Etched'],
    rating: 4.2,
    yearsInBusiness: 8,
    products: [
      { name: 'Back-Painted 8mm', price: 160, delivery: 6 }
    ],
    moq: '200 sq.ft'
  },
  {
    id: 's8',
    name: 'Elite Glass Processors',
    location: 'Bangalore, Karnataka',
    verified: true,
    categories: ['IGU', 'DGU', 'Acoustic'],
    rating: 4.4,
    yearsInBusiness: 15,
    products: [
      { name: 'DGU 6+12+6', price: 380, delivery: 8 }
    ],
    moq: '300 sq.ft'
  }
];

export const DAILY_RATES = [
  { item: 'Clear Float 5mm', rate: '45 – 60', change: 1.2, status: 'up' },
  { item: 'Clear Float 8mm', rate: '75 – 95', change: -0.5, status: 'down' },
  { item: 'Toughened 8mm', rate: '120 – 160', change: 2.1, status: 'up' },
  { item: 'Toughened 12mm', rate: '180 – 240', change: 0, status: 'neutral' },
  { item: 'Laminated 10mm', rate: '180 – 250', change: -1.1, status: 'down' },
  { item: 'DGU 6+12+6', rate: '350 – 500', change: 3.4, status: 'up' },
  { item: 'Frosted 6mm', rate: '85 – 110', change: 0.8, status: 'up' },
  { item: 'Reflective 6mm', rate: '100 – 140', change: -2.3, status: 'down' },
  { item: 'Low-E 6mm', rate: '200 – 300', change: 1.5, status: 'up' },
  { item: 'Back-Painted 8mm', rate: '150 – 220', change: 0.4, status: 'up' }
];

export const ALLIED_CATEGORIES = [
  { id: 'cat1', name: 'Hardware & Fittings', icon: 'Settings', desc: 'Hinges, handles, patch fittings, spider fittings' },
  { id: 'cat2', name: 'Silicones & Sealants', icon: 'Droplet', desc: 'Structural silicone, weather sealants, gaskets' },
  { id: 'cat3', name: 'Doors & Windows', icon: 'Maximize', desc: 'UPVC, Aluminium frames, sliding systems' },
  { id: 'cat4', name: 'Glass Railings', icon: 'Layout', desc: 'Balcony, staircase, pool fencing systems' },
  { id: 'cat5', name: 'Shower Enclosures', icon: 'Bath', desc: 'Frameless, semi-frameless, sliding solutions' },
  { id: 'cat6', name: 'Facades & Curtain Walls', icon: 'Grid', desc: 'Commercial exterior glazing systems' },
  { id: 'cat7', name: 'Mirrors', icon: 'Square', desc: 'Decorative, functional, and smart mirrors' },
  { id: 'cat8', name: 'Decorative Glass', icon: 'Palette', desc: 'Stained, printed, textured, and etched glass' }
];

export const SERVICE_PARTNERS = [
  { id: 'p1', name: 'Precision Glaziers', type: 'Glass Installation', city: 'Mumbai', rating: 4.8, exp: 12, verified: true },
  { id: 'p2', name: 'Elite Measure Tech', type: 'Measurement & Layout', city: 'Delhi', rating: 4.6, exp: 8, verified: true },
  { id: 'p3', name: 'SafeFix Shower Solutions', type: 'Shower Enclosure fitting', city: 'Bangalore', rating: 4.9, exp: 15, verified: true },
  { id: 'p4', name: 'Modern Facades', type: 'Facade Installation', city: 'Chennai', rating: 4.5, exp: 10, verified: false },
  { id: 'p5', name: 'Glass Masters', type: 'Glass Installation', city: 'Pune', rating: 4.7, exp: 20, verified: true },
  { id: 'p6', name: 'QuickSeal Services', type: 'Maintenance & Sealing', city: 'Hyderabad', rating: 4.3, exp: 5, verified: true }
];

export const MOCK_ORDERS = [
  { id: 'ORD-8291', type: 'Toughened 12mm', size: '2400 x 1200', qty: 4, status: 'Delivered', date: '2026-03-15' },
  { id: 'ORD-7742', type: 'Clear Float 5mm', size: '1800 x 900', qty: 12, status: 'Processing', date: '2026-04-10' },
  { id: 'ORD-6510', type: 'Laminated 10mm', size: '1200 x 1200', qty: 2, status: 'Scheduled', date: '2026-04-16' }
];
