import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';

export const products = [
  {
    name: "ClearPro 6mm Tempered Glass",
    category: "Tempered Glass",
    thickness: 6,
    size: "2400x1200mm",
    color: "Clear",
    coating: "None",
    certification: "IS 2553, CE Marked",
    edgeFinish: "Polished",
    supplier: "Gujarat Float Glass Ltd.",
    pricePerSqm: 850,
    minOrder: "50 sqm",
    description: "High-strength thermally toughened glass ideal for office partitions, shower enclosures, and interior doors. 5x stronger than annealed glass.",
    tags: ["partition", "office", "interior", "safety", "polished edge"]
  },
  {
    name: "SafeGuard 8.8mm Laminated Safety Glass",
    category: "Laminated Glass",
    thickness: 8.8,
    size: "3000x2000mm",
    color: "Clear",
    coating: "UV Block 99%",
    certification: "IS 2553 Part 2, EN 14449",
    edgeFinish: "Seamed",
    supplier: "Asahi India Glass Ltd.",
    pricePerSqm: 1650,
    minOrder: "30 sqm",
    description: "4+4 PVB laminated glass with UV protection. Perfect for balcony railings, skylights, and high-wind facades. Holds together on breakage.",
    tags: ["balcony", "railing", "UV protection", "safety", "high wind", "facade"]
  },
  {
    name: "EcoTherm 5+12+5 IGU",
    category: "Insulated Glass Unit",
    thickness: 22,
    size: "2000x1500mm",
    color: "Clear",
    coating: "Low-E (#2 surface)",
    certification: "IS 14900, EN 1279",
    edgeFinish: "Machine Cut",
    supplier: "Saint-Gobain India",
    pricePerSqm: 3200,
    minOrder: "20 sqm",
    description: "Double-glazed insulated unit with 12mm argon-filled cavity. Reduces heat transfer by 60%. Ideal for energy-efficient buildings and LEED projects.",
    tags: ["insulated", "energy efficient", "double glazed", "IGU", "LEED", "low-e", "argon"]
  },
  {
    name: "BudgetFloat 4mm Clear Glass",
    category: "Float Glass",
    thickness: 4,
    size: "3660x2440mm",
    color: "Clear",
    coating: "None",
    certification: "IS 2835",
    edgeFinish: "Raw Cut",
    supplier: "HNGIL (Hindusthan National Glass)",
    pricePerSqm: 220,
    minOrder: "200 sqm",
    description: "Standard quality float glass for residential windows, picture frames, and furniture. Bulk pricing available for large residential projects.",
    tags: ["budget", "residential", "window", "float", "bulk", "affordable", "large quantity"]
  },
  {
    name: "MirrorLux 6mm Silver Mirror",
    category: "Mirror",
    thickness: 6,
    size: "2440x1830mm",
    color: "Silver",
    coating: "Silver + Copper backing",
    certification: "IS 3438",
    edgeFinish: "Beveled",
    supplier: "Modi Guard Glass",
    pricePerSqm: 680,
    minOrder: "25 sqm",
    description: "High-clarity silver mirror with 5-layer protective backing. Anti-moisture and anti-black-edge technology. For bathrooms, gyms, and retail.",
    tags: ["mirror", "bathroom", "gym", "retail", "beveled", "silver"]
  },
  {
    name: "SolarShield 6mm Bronze Tinted Tempered",
    category: "Tempered Glass",
    thickness: 6,
    size: "2400x1200mm",
    color: "Bronze",
    coating: "Solar Control",
    certification: "IS 2553, SHGC 0.38",
    edgeFinish: "Polished",
    supplier: "Gujarat Float Glass Ltd.",
    pricePerSqm: 1100,
    minOrder: "40 sqm",
    description: "Bronze body-tinted tempered glass with solar control coating. Reduces solar heat gain by 62%. Ideal for commercial facades in hot climates.",
    tags: ["solar control", "tinted", "bronze", "facade", "commercial", "heat reduction"]
  },
  {
    name: "SlimLam 6.4mm Clear Laminated",
    category: "Laminated Glass",
    thickness: 6.4,
    size: "2440x1830mm",
    color: "Clear",
    coating: "None",
    certification: "EN 14449, IS 2553",
    edgeFinish: "Polished",
    supplier: "Pilkington India",
    pricePerSqm: 1200,
    minOrder: "30 sqm",
    description: "3+3 PVB laminated glass with polished edges. Lightweight safety glass for interior partitions, glass floors, and stair treads.",
    tags: ["laminated", "interior", "stair", "floor", "partition", "polished", "lightweight"]
  },
  {
    name: "ThermoPane 4+9+4 IGU Economy",
    category: "Insulated Glass Unit",
    thickness: 17,
    size: "1500x1200mm",
    color: "Clear",
    coating: "None",
    certification: "IS 14900",
    edgeFinish: "Machine Cut",
    supplier: "Fenesta Building Systems",
    pricePerSqm: 2100,
    minOrder: "25 sqm",
    description: "Economy double-glazed unit with 9mm air gap. Good thermal insulation for apartments and offices without premium pricing.",
    tags: ["IGU", "economy", "double glazed", "apartment", "office", "thermal"]
  },
  {
    name: "SpiderFit 10mm Extra Clear Tempered",
    category: "Tempered Glass",
    thickness: 10,
    size: "3000x2000mm",
    color: "Extra Clear (Ultra White)",
    coating: "Anti-reflective",
    certification: "IS 2553, EN 12150",
    edgeFinish: "Polished + Drilled",
    supplier: "Viracon India",
    pricePerSqm: 2400,
    minOrder: "15 sqm",
    description: "Ultra-white extra-clear tempered glass with anti-reflective coating and pre-drilled holes for spider fitting systems. For facades and structural glazing.",
    tags: ["extra clear", "spider fitting", "structural", "facade", "anti-reflective", "drilled"]
  },
  {
    name: "DecorArt Frosted 5mm Glass",
    category: "Decorative Glass",
    thickness: 5,
    size: "2440x1220mm",
    color: "Frosted White",
    coating: "Acid Etched",
    certification: "IS 2835",
    edgeFinish: "Polished",
    supplier: "Saint-Gobain India",
    pricePerSqm: 750,
    minOrder: "20 sqm",
    description: "Acid-etched frosted glass for privacy without sacrificing light. Used in office partitions, bathroom enclosures, and decorative panels.",
    tags: ["frosted", "privacy", "decorative", "acid etched", "office", "bathroom"]
  },
  {
    name: "StructuralPro 12mm Tempered",
    category: "Tempered Glass",
    thickness: 12,
    size: "3000x2000mm",
    color: "Clear",
    coating: "None",
    certification: "IS 2553, EN 12150, ASTM C1048",
    edgeFinish: "Polished + CNC",
    supplier: "Gold Plus Glass Industry",
    pricePerSqm: 2900,
    minOrder: "10 sqm",
    description: "Heavy-duty 12mm tempered glass for structural applications — glass floors, overhead glazing, canopies, and heavy-load partitions.",
    tags: ["12mm", "structural", "heavy duty", "floor", "canopy", "overhead"]
  },
  {
    name: "AluFrame Sliding Window Hardware Set",
    category: "Aluminium Hardware",
    thickness: null,
    size: "For openings up to 2400x1500mm",
    color: "Anodized Silver",
    coating: "Powder Coated",
    certification: "IS 1948",
    edgeFinish: null,
    supplier: "Jindal Aluminium Ltd.",
    pricePerSqm: null,
    pricePerUnit: 3200,
    minOrder: "10 sets",
    description: "Complete sliding window frame and track system in anodized aluminium. Includes frame, track, rollers, handles, and seals.",
    tags: ["hardware", "aluminium", "sliding window", "frame", "track", "residential"]
  },
  {
    name: "GreenLam 10.8mm Laminated Low-E",
    category: "Laminated Glass",
    thickness: 10.8,
    size: "3000x2000mm",
    color: "Neutral",
    coating: "Low-E + PVB interlayer",
    certification: "EN 14449, EN 673",
    edgeFinish: "Polished",
    supplier: "Asahi India Glass Ltd.",
    pricePerSqm: 2800,
    minOrder: "20 sqm",
    description: "5+5 laminated glass with Low-E coating for facades requiring both safety and energy performance. U-value 1.8. Great for green building certifications.",
    tags: ["low-e", "laminated", "energy", "green building", "facade", "LEED", "safety"]
  },
  {
    name: "RoofLite SGP Laminated Skylight Glass",
    category: "Laminated Glass",
    thickness: 12.76,
    size: "Custom up to 3000x2000mm",
    color: "Clear",
    coating: "UV 99% + SGP interlayer",
    certification: "IS 2553, CWCT skylight standard",
    edgeFinish: "Polished + Heat Soaked",
    supplier: "Viracon India",
    pricePerSqm: 4100,
    minOrder: "10 sqm",
    description: "SGP (SentryGlas) laminated overhead glazing for skylights and roof glazing. Fall-safe post-breakage. UV blocking, high clarity. Custom sizes available.",
    tags: ["skylight", "roof", "overhead", "SGP", "fall safe", "custom", "laminated"]
  },
  {
    name: "WeldAll SS304 Spider Fitting Set",
    category: "Glass Hardware",
    thickness: null,
    size: "Compatible with 8–15mm glass",
    color: "Brushed Stainless Steel",
    coating: "Satin finish SS304",
    certification: "ASTM A276",
    edgeFinish: null,
    supplier: "Ozone Overseas Pvt. Ltd.",
    pricePerSqm: null,
    pricePerUnit: 1800,
    minOrder: "20 fittings",
    description: "4-arm and 2-arm spider fittings in SS304 for structural glass facades. Compatible with 8–15mm drilled tempered or laminated glass.",
    tags: ["spider fitting", "hardware", "stainless steel", "facade", "structural", "drilled glass"]
  }
];

export const seedIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Product collection is empty. Running seed...');
      await Product.insertMany(products);
      console.log('Seeded 15 products successfully.');
    } else {
      console.log(`Database already contains ${count} products. Skipping seed.`);
    }
  } catch (err) {
    console.error('Seed error:', err);
  }
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for manual seeding...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// Only run seedDB directly if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDB();
}
