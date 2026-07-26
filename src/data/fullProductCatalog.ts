/**
 * Praveen Kiranam & General Stores - 500 Realistic Product Catalog
 */
import { Product, Category, GSTPercentage, SpecialBadge } from '../types/store';

// Unsplash Images per Category
const CATEGORY_IMAGES: Record<string, string> = {
  Rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
  "Flour & Atta": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  Pulses: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
  "Cooking Oil": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
  Ghee: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
  Salt: "https://images.unsplash.com/photo-1518110168401-f287bfe73f15?auto=format&fit=crop&w=600&q=80",
  Sugar: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=600&q=80",
  Spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
  "Dry Fruits": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
  Biscuits: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
  Chocolates: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=600&q=80",
  Snacks: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80",
  Namkeen: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
  Noodles: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600&q=80",
  Pasta: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
  Tea: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
  Coffee: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
  Milk: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
  "Dairy Products": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
  Bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  Bakery: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=600&q=80",
  "Cold Drinks": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
  Juices: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80",
  Water: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80",
  "Ice Cream": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80",
  "Frozen Foods": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80",
  "Breakfast Items": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
  "Personal Care": "https://images.unsplash.com/photo-1608248597262-8133e0789242?auto=format&fit=crop&w=600&q=80",
  "Hair Care": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
  "Skin Care": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
  "Bath Soap": "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=600&q=80",
  Toothpaste: "https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=600&q=80",
  Shampoo: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
  Detergent: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
  Dishwash: "https://images.unsplash.com/photo-1585832770485-e68a5fc88280?auto=format&fit=crop&w=600&q=80",
  "Floor Cleaner": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
  "Bathroom Cleaner": "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=600&q=80",
  "Kitchen Essentials": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
  "Baby Care": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
  "Pet Care": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
  Stationery: "https://images.unsplash.com/photo-1585336261026-8f578639c857?auto=format&fit=crop&w=600&q=80",
  "Household Essentials": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
  "Daily Needs": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  Testing: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
};

const BADGES: SpecialBadge[] = [
  'Best Seller',
  'Popular',
  'Limited Offer',
  'Hot Deal',
  'New Arrival',
  "Today's Special"
];

// Seed Catalog Definitions for realistic grocery products
interface ProductSeed {
  name: string;
  teluguName?: string;
  brand: string;
  category: string;
  subCategory: string;
  mrp: number;
  price: number;
  weight: number;
  unit: 'g' | 'kg' | 'ml' | 'L' | 'pc' | 'pack';
  packSize: string;
  gstRate: GSTPercentage;
  hsn: string;
  desc: string;
  mfg?: string;
  badge?: SpecialBadge;
}

const BASE_SEEDS: ProductSeed[] = [
  // 0. Testing
  {
    name: "Test Product",
    teluguName: "టెస్ట్ ప్రోడక్ట్ (₹1)",
    brand: "Praveen Kiranam",
    category: "Testing",
    subCategory: "UPI Test",
    mrp: 1,
    price: 1,
    weight: 1,
    unit: "pc",
    packSize: "1 Unit",
    gstRate: 0,
    hsn: "9999",
    desc: "₹1 Test Product for quick testing of UPI payment flow.",
    mfg: "Praveen Kiranam",
    badge: "Hot Deal"
  },

  // 1. Rice
  {
    name: "HMT Aged Sonamasuri Raw Rice 26kg Bag",
    teluguName: "హెచ్.ఎమ్.టి పాత సోనామసూరి బియ్యం",
    brand: "Praveen Kiranam Direct Farm",
    category: "Rice",
    subCategory: "Raw Rice",
    mrp: 1650,
    price: 1499,
    weight: 26,
    unit: "kg",
    packSize: "26 kg Bag",
    gstRate: 0,
    hsn: "1006",
    desc: "Aged 12+ months Telangana HMT Sonamasuri raw rice directly procured from paddy farmers in Manakondur & Karimnagar.",
    mfg: "Karimnagar Rice Mills",
    badge: "Best Seller"
  },
  {
    name: "Fortune Everyday Basmati Rice 1kg",
    teluguName: "ఫార్చ్యూన్ బస్మతి రైస్",
    brand: "Fortune",
    category: "Rice",
    subCategory: "Basmati Rice",
    mrp: 140,
    price: 115,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pouch",
    gstRate: 0,
    hsn: "1006",
    desc: "Long grain aromatic Basmati rice perfect for daily pulao and biryani.",
    mfg: "Adani Wilmar Ltd",
    badge: "Popular"
  },
  {
    name: "India Gate Feast Rozana Basmati Rice 5kg",
    brand: "India Gate",
    category: "Rice",
    subCategory: "Basmati Rice",
    mrp: 520,
    price: 449,
    weight: 5,
    unit: "kg",
    packSize: "5 kg Bag",
    gstRate: 0,
    hsn: "1006",
    desc: "Premium aged Basmati grains that fluff up twice their length after cooking.",
    mfg: "KRBL Limited",
    badge: "Best Seller"
  },
  {
    name: "BPT Steam Sonamasuri Rice 10kg",
    brand: "Praveen Kiranam",
    category: "Rice",
    subCategory: "Steam Rice",
    mrp: 620,
    price: 570,
    weight: 10,
    unit: "kg",
    packSize: "10 kg Bag",
    gstRate: 0,
    hsn: "1006",
    desc: "Cleaned and sorted non-sticky steam rice for daily household meals.",
    mfg: "Local Millers"
  },
  {
    name: "Telangana Sanna Rice 5kg",
    brand: "Praveen Kiranam",
    category: "Rice",
    subCategory: "Sanna Rice",
    mrp: 320,
    price: 285,
    weight: 5,
    unit: "kg",
    packSize: "5 kg Bag",
    gstRate: 0,
    hsn: "1006",
    desc: "Traditional thin grain Telangana Sanna rice.",
    mfg: "Praveen Grain Yard"
  },

  // 2. Flour & Atta
  {
    name: "Aashirvaad Shuddh Whole Wheat Atta 10kg",
    teluguName: "ఆశీర్వాద్ గోధుమ పిండి",
    brand: "Aashirvaad",
    category: "Flour & Atta",
    subCategory: "Wheat Atta",
    mrp: 460,
    price: 425,
    weight: 10,
    unit: "kg",
    packSize: "10 kg Bag",
    gstRate: 0,
    hsn: "1101",
    desc: "100% pure whole wheat MP Sharbati blend atta made with traditional rotiform grinding process.",
    mfg: "ITC Limited",
    badge: "Best Seller"
  },
  {
    name: "Aashirvaad Multigrain Atta 5kg",
    brand: "Aashirvaad",
    category: "Flour & Atta",
    subCategory: "Multigrain Atta",
    mrp: 295,
    price: 265,
    weight: 5,
    unit: "kg",
    packSize: "5 kg Bag",
    gstRate: 0,
    hsn: "1101",
    desc: "Rich in fiber and protein with soya, chana, oat, maize and psyllium husk blend.",
    mfg: "ITC Limited"
  },
  {
    name: "Fortune Chakki Fresh Atta 5kg",
    brand: "Fortune",
    category: "Flour & Atta",
    subCategory: "Wheat Atta",
    mrp: 230,
    price: 199,
    weight: 5,
    unit: "kg",
    packSize: "5 kg Bag",
    gstRate: 0,
    hsn: "1101",
    desc: "Soft and fluffy rotis made from golden amber wheat grains.",
    mfg: "Adani Wilmar"
  },
  {
    name: "Praveen Kiranam Pure Besan Gram Flour 1kg",
    brand: "Praveen Kiranam",
    category: "Flour & Atta",
    subCategory: "Besan",
    mrp: 120,
    price: 98,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pack",
    gstRate: 0,
    hsn: "1106",
    desc: "100% chana dal ground pure besan without artificial colors.",
    mfg: "Praveen Kiranam Mills"
  },
  {
    name: "Rajdhani Maida Refined Wheat Flour 1kg",
    brand: "Rajdhani",
    category: "Flour & Atta",
    subCategory: "Maida",
    mrp: 55,
    price: 46,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pack",
    gstRate: 0,
    hsn: "1101",
    desc: "Finely milled white flour for samosas, bakery products and parathas.",
    mfg: "Rajdhani Flour Mills"
  },

  // 3. Pulses & Dals
  {
    name: "Desi Unpolished Toor Dal (Kandi Pappu) 1kg",
    teluguName: "కంది పప్పు (ప్రీమియం)",
    brand: "Praveen Kiranam",
    category: "Pulses",
    subCategory: "Toor Dal",
    mrp: 170,
    price: 148,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pouch",
    gstRate: 0,
    hsn: "0713",
    desc: "Unpolished farm-fresh Telangana Toor Dal rich in natural protein and aromatic taste.",
    mfg: "Manakondur Farmers Cooperative",
    badge: "Best Seller"
  },
  {
    name: "Tata Sampann Unpolished Moong Dal 1kg",
    brand: "Tata Sampann",
    category: "Pulses",
    subCategory: "Moong Dal",
    mrp: 160,
    price: 135,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pack",
    gstRate: 0,
    hsn: "0713",
    desc: "Unpolished yellow moong split dal packed with natural goodness.",
    mfg: "Tata Consumer Products"
  },
  {
    name: "Tata Sampann Chana Dal 1kg",
    brand: "Tata Sampann",
    category: "Pulses",
    subCategory: "Chana Dal",
    mrp: 110,
    price: 89,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pack",
    gstRate: 0,
    hsn: "0713",
    desc: "High protein chana dal for chutneys and curries.",
    mfg: "Tata Consumer Products"
  },
  {
    name: "Urad Dal White Whole (Minapa Pappu) 1kg",
    teluguName: "మినప పప్పు (గుళ్ళు)",
    brand: "Praveen Kiranam",
    category: "Pulses",
    subCategory: "Urad Dal",
    mrp: 165,
    price: 142,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pack",
    gstRate: 0,
    hsn: "0713",
    desc: "Premium white urad dal whole for fluffy idlis and crispy dosas.",
    mfg: "Praveen Kiranam"
  },

  // 4. Cooking Oil
  {
    name: "Freedom Refined Sunflower Oil 1L Pouch",
    teluguName: "ఫ్రీడమ్ సన్ ఫ్లవర్ ఆయిల్",
    brand: "Freedom",
    category: "Cooking Oil",
    subCategory: "Sunflower Oil",
    mrp: 165,
    price: 142,
    weight: 1,
    unit: "L",
    packSize: "1 L Pouch",
    gstRate: 5,
    hsn: "1512",
    desc: "Light and non-sticky refined sunflower oil enriched with Vitamin A and D.",
    mfg: "Gemini Edibles & Fats Ltd",
    badge: "Best Seller"
  },
  {
    name: "Fortune Sunlite Refined Sunflower Oil 5L Jar",
    brand: "Fortune",
    category: "Cooking Oil",
    subCategory: "Sunflower Oil",
    mrp: 820,
    price: 720,
    weight: 5,
    unit: "L",
    packSize: "5 L Can",
    gstRate: 5,
    hsn: "1512",
    desc: "5 Litre family pack with convenient handle for clean pouring.",
    mfg: "Adani Wilmar"
  },
  {
    name: "Gold Winner Refined Sunflower Oil 1L Pouch",
    brand: "Gold Winner",
    category: "Cooking Oil",
    subCategory: "Sunflower Oil",
    mrp: 160,
    price: 139,
    weight: 1,
    unit: "L",
    packSize: "1 L Pouch",
    gstRate: 5,
    hsn: "1512",
    desc: "Enriched with Vitamin D3 and dietary goodness.",
    mfg: "Kaleesuwari Refinery"
  },
  {
    name: "Fortune Filtered Groundnut Oil 1L",
    brand: "Fortune",
    category: "Cooking Oil",
    subCategory: "Groundnut Oil",
    mrp: 220,
    price: 188,
    weight: 1,
    unit: "L",
    packSize: "1 L Pouch",
    gstRate: 5,
    hsn: "1508",
    desc: "Aromatic cold pressed style groundnut oil for rich traditional cooking.",
    mfg: "Adani Wilmar"
  },

  // 5. Ghee
  {
    name: "Amul Pure Cow Ghee 1L Tin",
    teluguName: "అముల్ స్వచ్ఛమైన నెయ్యి",
    brand: "Amul",
    category: "Ghee",
    subCategory: "Cow Ghee",
    mrp: 675,
    price: 615,
    weight: 1,
    unit: "L",
    packSize: "1 L Tin",
    gstRate: 12,
    hsn: "0405",
    desc: "Aromatic granular texture pure cow ghee made from fresh cream.",
    mfg: "GCMMF Amul",
    badge: "Best Seller"
  },
  {
    name: "Heritage Pure Buffalo Ghee 500ml",
    brand: "Heritage",
    category: "Ghee",
    subCategory: "Buffalo Ghee",
    mrp: 350,
    price: 318,
    weight: 500,
    unit: "ml",
    packSize: "500 ml Pouch",
    gstRate: 12,
    hsn: "0405",
    desc: "Rich aroma buffalo ghee trusted by South Indian families.",
    mfg: "Heritage Foods"
  },

  // 6. Salt & Sugar
  {
    name: "Tata Salt Vacuum Evaporated Iodized 1kg",
    teluguName: "టాటా ఉప్పు",
    brand: "Tata",
    category: "Salt",
    subCategory: "Iodized Salt",
    mrp: 30,
    price: 26,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pack",
    gstRate: 0,
    hsn: "2501",
    desc: "Purity guaranteed vacuum evaporated iodized salt.",
    mfg: "Tata Consumer Products",
    badge: "Popular"
  },
  {
    name: "Madhur Pure & Hygienic Sugar 1kg",
    teluguName: "మధుర్ పంచదార",
    brand: "Madhur",
    category: "Sugar",
    subCategory: "White Sugar",
    mrp: 58,
    price: 49,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pack",
    gstRate: 0,
    hsn: "1701",
    desc: "Sulphur-free refined crystal white sugar.",
    mfg: "Shree Renuka Sugars"
  },

  // 7. Spices
  {
    name: "Everest Tikhalal Red Chilli Powder 200g",
    brand: "Everest",
    category: "Spices",
    subCategory: "Chilli Powder",
    mrp: 115,
    price: 98,
    weight: 200,
    unit: "g",
    packSize: "200 g Pack",
    gstRate: 5,
    hsn: "0904",
    desc: "High pungency red chilli powder giving vibrant color and spicy heat.",
    mfg: "Everest Food Products"
  },
  {
    name: "Aashirvaad Turmeric Powder (Pasupu) 200g",
    brand: "Aashirvaad",
    category: "Spices",
    subCategory: "Turmeric",
    mrp: 65,
    price: 54,
    weight: 200,
    unit: "g",
    packSize: "200 g Pack",
    gstRate: 5,
    hsn: "0910",
    desc: "Made from farm fresh turmeric roots with high curcumin content.",
    mfg: "ITC Limited"
  },
  {
    name: "MTR Garam Masala 100g",
    brand: "MTR",
    category: "Spices",
    subCategory: "Blended Spices",
    mrp: 85,
    price: 72,
    weight: 100,
    unit: "g",
    packSize: "100 g Box",
    gstRate: 5,
    hsn: "0910",
    desc: "Authentic spice blend of cloves, cardamom, cinnamon and cumin.",
    mfg: "MTR Foods"
  },

  // 8. Dry Fruits
  {
    name: "Praveen Kiranam Premium Whole Cashews (Kaju) 250g",
    brand: "Praveen Kiranam",
    category: "Dry Fruits",
    subCategory: "Cashews",
    mrp: 290,
    price: 245,
    weight: 250,
    unit: "g",
    packSize: "250 g Pouch",
    gstRate: 12,
    hsn: "0801",
    desc: "W240 grade jumbo crunchy whole cashews.",
    mfg: "Mangalore Cashew Imports",
    badge: "Hot Deal"
  },
  {
    name: "California Almonds (Badam) 250g",
    brand: "Praveen Kiranam",
    category: "Dry Fruits",
    subCategory: "Almonds",
    mrp: 260,
    price: 215,
    weight: 250,
    unit: "g",
    packSize: "250 g Pack",
    gstRate: 12,
    hsn: "0802",
    desc: "Crunchy high-protein California almonds.",
    mfg: "Praveen Kiranam"
  },

  // 9. Biscuits & Bakery
  {
    name: "Parle-G Glucose Biscuits 800g Family Pack",
    teluguName: "పార్లే-జి బిస్కెట్లు",
    brand: "Parle",
    category: "Biscuits",
    subCategory: "Glucose Biscuits",
    mrp: 90,
    price: 80,
    weight: 800,
    unit: "g",
    packSize: "800 g Pack",
    gstRate: 18,
    hsn: "1905",
    desc: "India's beloved glucose biscuit filled with energy and taste.",
    mfg: "Parle Products Ltd",
    badge: "Best Seller"
  },
  {
    name: "Parle-G Single Pack ₹10",
    brand: "Parle",
    category: "Biscuits",
    subCategory: "Glucose Biscuits",
    mrp: 10,
    price: 10,
    weight: 110,
    unit: "g",
    packSize: "110 g Pack",
    gstRate: 18,
    hsn: "1905",
    desc: "Classic ₹10 Parle-G tea time snack.",
    mfg: "Parle Products"
  },
  {
    name: "Britannia Good Day Cashew Biscuits 600g Mega Saver",
    brand: "Britannia",
    category: "Biscuits",
    subCategory: "Butter Biscuits",
    mrp: 150,
    price: 128,
    weight: 600,
    unit: "g",
    packSize: "600 g Pack",
    gstRate: 18,
    hsn: "1905",
    desc: "Loaded with rich butter and real cashew nuts.",
    mfg: "Britannia Industries"
  },

  // 10. Chocolates & Confectionery
  {
    name: "Cadbury Dairy Milk Silk Chocolate 150g",
    brand: "Cadbury",
    category: "Chocolates",
    subCategory: "Milk Chocolate",
    mrp: 185,
    price: 165,
    weight: 150,
    unit: "g",
    packSize: "150 g Bar",
    gstRate: 18,
    hsn: "1806",
    desc: "Smooth melting creamy milk chocolate bar.",
    mfg: "Mondelez India",
    badge: "Popular"
  },
  {
    name: "Nestle KitKat 4 Finger Chocolate 38g",
    brand: "Nestle",
    category: "Chocolates",
    subCategory: "Wafer Chocolate",
    mrp: 30,
    price: 28,
    weight: 38,
    unit: "g",
    packSize: "38 g Pack",
    gstRate: 18,
    hsn: "1806",
    desc: "Have a break, have a KitKat crispy wafer bar.",
    mfg: "Nestle India"
  },

  // 11. Snacks & Namkeen
  {
    name: "Haldiram's Nagpur Bhujia Sev 400g",
    brand: "Haldiram's",
    category: "Namkeen",
    subCategory: "Bhujia",
    mrp: 130,
    price: 112,
    weight: 400,
    unit: "g",
    packSize: "400 g Pack",
    gstRate: 12,
    hsn: "2106",
    desc: "Crispy moth bean flour noodles seasoned with spicy Indian herbs.",
    mfg: "Haldiram Foods Ltd",
    badge: "Popular"
  },
  {
    name: "Lay's Magic Masala Potato Chips 50g",
    brand: "Lay's",
    category: "Snacks",
    subCategory: "Chips",
    mrp: 20,
    price: 20,
    weight: 50,
    unit: "g",
    packSize: "50 g Pack",
    gstRate: 12,
    hsn: "2005",
    desc: "Crispy potato chips coated in hot spicy Indian herbs.",
    mfg: "PepsiCo India"
  },

  // 12. Noodles & Pasta
  {
    name: "Nestle Maggi 2-Minute Masala Noodles 420g (Pack of 6)",
    teluguName: "మ్యాగీ నూడుల్స్",
    brand: "Maggi",
    category: "Noodles",
    subCategory: "Instant Noodles",
    mrp: 96,
    price: 88,
    weight: 420,
    unit: "g",
    packSize: "6 x 70g Pack",
    gstRate: 18,
    hsn: "1902",
    desc: "India's favorite 2-minute instant noodles with iconic masala taste.",
    mfg: "Nestle India",
    badge: "Best Seller"
  },
  {
    name: "Maggi Single Pack ₹15",
    brand: "Maggi",
    category: "Noodles",
    subCategory: "Instant Noodles",
    mrp: 15,
    price: 15,
    weight: 70,
    unit: "g",
    packSize: "70 g Pack",
    gstRate: 18,
    hsn: "1902",
    desc: "Single serving Maggi noodle pouch.",
    mfg: "Nestle India"
  },

  // 13. Tea & Coffee
  {
    name: "Tata Tea Gold Premium Black Tea 500g",
    teluguName: "టాటా టీ గోల్డ్",
    brand: "Tata",
    category: "Tea",
    subCategory: "Leaf Tea",
    mrp: 340,
    price: 295,
    weight: 500,
    unit: "g",
    packSize: "500 g Pack",
    gstRate: 5,
    hsn: "0902",
    desc: "Exquisite tea leaves blend with 15% long leaves for rich aroma and taste.",
    mfg: "Tata Consumer Products",
    badge: "Best Seller"
  },
  {
    name: "Bru Instant Coffee 200g Jar",
    brand: "Bru",
    category: "Coffee",
    subCategory: "Instant Coffee",
    mrp: 380,
    price: 335,
    weight: 200,
    unit: "g",
    packSize: "200 g Jar",
    gstRate: 18,
    hsn: "0901",
    desc: "70% Coffee and 30% Chicory blend for strong authentic South Indian filter style coffee.",
    mfg: "Hindustan Unilever"
  },

  // 14. Milk & Dairy
  {
    name: "Amul Taaza Homogenised Toned Milk 1L Tetra",
    teluguName: "అముల్ పాలు 1L",
    brand: "Amul",
    category: "Milk",
    subCategory: "Toned Milk",
    mrp: 72,
    price: 68,
    weight: 1,
    unit: "L",
    packSize: "1 L Tetra Pack",
    gstRate: 0,
    hsn: "0401",
    desc: "Pure long-life UHT milk requiring no boiling before use.",
    mfg: "GCMMF Amul"
  },
  {
    name: "Heritage Toned Fresh Milk 500ml Pouch",
    brand: "Heritage",
    category: "Milk",
    subCategory: "Fresh Milk",
    mrp: 29,
    price: 29,
    weight: 500,
    unit: "ml",
    packSize: "500 ml Pouch",
    gstRate: 0,
    hsn: "0401",
    desc: "Daily morning fresh milk delivered in Manakondur.",
    mfg: "Heritage Foods"
  },

  // 15. Cold Drinks & Juices
  {
    name: "Coca-Cola Original Taste 1.25L Bottle",
    brand: "Coca-Cola",
    category: "Cold Drinks",
    subCategory: "Carbonated Drinks",
    mrp: 65,
    price: 60,
    weight: 1.25,
    unit: "L",
    packSize: "1.25 L Bottle",
    gstRate: 28,
    hsn: "2202",
    desc: "Chilled sparkling Coca-Cola soft drink bottle.",
    mfg: "Coca-Cola India"
  },

  // 16. Soaps & Personal Care
  {
    name: "Dettol Original Bathing Soap 125g (Pack of 4)",
    brand: "Dettol",
    category: "Bath Soap",
    subCategory: "Antiseptic Soap",
    mrp: 220,
    price: 189,
    weight: 500,
    unit: "g",
    packSize: "4 x 125g",
    gstRate: 18,
    hsn: "3401",
    desc: "100% germ protection bath soap recommended by doctors.",
    mfg: "Reckitt Benckiser",
    badge: "Best Seller"
  },
  {
    name: "Colgate Strong Teeth Toothpaste 500g Saver Pack",
    brand: "Colgate",
    category: "Toothpaste",
    subCategory: "Toothpaste",
    mrp: 250,
    price: 215,
    weight: 500,
    unit: "g",
    packSize: "500 g Tube",
    gstRate: 18,
    hsn: "3306",
    desc: "Calci-lock technology locks calcium into teeth for maximum cavity protection.",
    mfg: "Colgate-Palmolive India"
  },

  // 17. Household & Detergents
  {
    name: "Surf Excel Easy Wash Detergent Powder 1kg",
    brand: "Surf Excel",
    category: "Detergent",
    subCategory: "Washing Powder",
    mrp: 140,
    price: 122,
    weight: 1,
    unit: "kg",
    packSize: "1 kg Pack",
    gstRate: 18,
    hsn: "3402",
    desc: "Removes tough stains like turmeric, oil and mud in 1 stroke.",
    mfg: "Hindustan Unilever",
    badge: "Best Seller"
  },
  {
    name: "Vim Dishwash Gel Lemon 750ml Bottle",
    brand: "Vim",
    category: "Dishwash",
    subCategory: "Dishwash Liquid",
    mrp: 210,
    price: 178,
    weight: 750,
    unit: "ml",
    packSize: "750 ml Bottle",
    gstRate: 18,
    hsn: "3402",
    desc: "1 spoon of Vim gel cleans an entire sink full of oily vessels.",
    mfg: "Hindustan Unilever"
  }
];

// Additional brands for realistic procedural generation to reach 500 items
const BRANDS_POOL = [
  "Aashirvaad", "Fortune", "Tata", "Amul", "Heritage", "Freedom", "Surf Excel", 
  "Dettol", "Cadbury", "Haldiram's", "Everest", "Parle", "MTR", "Britannia", 
  "Nestle", "Colgate", "Pepsodent", "Clinic Plus", "Dove", "Pears", "Lizol", 
  "Harpic", "Vim", "Ariel", "Tide", "Good Knight", "All Out", "Lays", "Kurkure", 
  "Bingo", "Sunfeast", "Dark Fantasy", "Bru", "Red Label", "Taj Mahal", "Gemini", 
  "Gold Winner", "Godrej", "Nivea", "Pond's", "Vaseline", "Pampers", "MamyPoko", 
  "Whiskas", "Pedigree", "Classmate", "Navneet", "Praveen Kiranam"
];

// Category metadata list to ensure all required categories are covered
export const FULL_CATEGORIES: Category[] = [
  { id: "cat_testing", name: "Testing", teluguName: "టెస్టింగ్ (₹1)", iconName: "Zap", image: CATEGORY_IMAGES["Testing"], description: "₹1 Test Product for quick testing of UPI payment flow", itemCount: 1 },
  { id: "cat_rice", name: "Rice", teluguName: "బియ్యం", iconName: "Wheat", image: CATEGORY_IMAGES["Rice"], description: "HMT Sonamasuri, Basmati, Raw & Steam Rice", itemCount: 25 },
  { id: "cat_atta", name: "Flour & Atta", teluguName: "గోధుమ పిండి & పిండి", iconName: "Wheat", image: CATEGORY_IMAGES["Flour & Atta"], description: "Whole Wheat Atta, Maida, Besan, Rava & Rice Flour", itemCount: 20 },
  { id: "cat_pulses", name: "Pulses", teluguName: "పప్పులు", iconName: "Flame", image: CATEGORY_IMAGES["Pulses"], description: "Desi Toor Dal, Moong, Chana, Rajma & Black Gram", itemCount: 25 },
  { id: "cat_oils", name: "Cooking Oil", teluguName: "వంట నూనెలు", iconName: "Droplet", image: CATEGORY_IMAGES["Cooking Oil"], description: "Sunflower, Groundnut, Mustard, Rice Bran & Gingelly Oil", itemCount: 20 },
  { id: "cat_ghee", name: "Ghee", teluguName: "నెయ్యి", iconName: "Droplet", image: CATEGORY_IMAGES["Ghee"], description: "Pure Cow Ghee & Buffalo Ghee", itemCount: 10 },
  { id: "cat_salt", name: "Salt", teluguName: "ఉప్పు", iconName: "Sparkles", image: CATEGORY_IMAGES["Salt"], description: "Iodized Rock & Crystal Salt", itemCount: 8 },
  { id: "cat_sugar", name: "Sugar", teluguName: "పంచదార & బెల్లం", iconName: "Sparkles", image: CATEGORY_IMAGES["Sugar"], description: "Refined White Sugar, Jaggery & Organic Sugar", itemCount: 10 },
  { id: "cat_spices", name: "Spices", teluguName: "మసాలాలు", iconName: "Flame", image: CATEGORY_IMAGES["Spices"], description: "Red Chilli, Turmeric, Cumin, Mustard & Whole Spices", itemCount: 30 },
  { id: "cat_dryfruits", name: "Dry Fruits", teluguName: "డ్రై ఫ్రూట్స్", iconName: "Gift", image: CATEGORY_IMAGES["Dry Fruits"], description: "Cashews, Almonds, Raisins, Pistachios & Dates", itemCount: 15 },
  { id: "cat_biscuits", name: "Biscuits", teluguName: "బిస్కెట్లు", iconName: "Cookie", image: CATEGORY_IMAGES["Biscuits"], description: "Glucose, Cream, Butter, Digestive & Rusk Biscuits", itemCount: 30 },
  { id: "cat_chocolates", name: "Chocolates", teluguName: "చాక్లెట్లు", iconName: "Gift", image: CATEGORY_IMAGES["Chocolates"], description: "Dairy Milk, KitKat, Munch, Perk & Toffees", itemCount: 20 },
  { id: "cat_snacks", name: "Snacks", teluguName: "స్నాక్స్", iconName: "Cookie", image: CATEGORY_IMAGES["Snacks"], description: "Potato Chips, Kurkure, Popcorn & Wafers", itemCount: 25 },
  { id: "cat_namkeen", name: "Namkeen", teluguName: "నమ్‌కీన్", iconName: "Cookie", image: CATEGORY_IMAGES["Namkeen"], description: "Haldiram's Bhujia, Mixture, Sev & Chana Dal", itemCount: 20 },
  { id: "cat_noodles", name: "Noodles", teluguName: "నూడుల్స్", iconName: "Flame", image: CATEGORY_IMAGES["Noodles"], description: "Maggi 2-Min, Yippee, Hakka Noodles & Cup Noodles", itemCount: 15 },
  { id: "cat_pasta", name: "Pasta", teluguName: "పాస్తా", iconName: "Flame", image: CATEGORY_IMAGES["Pasta"], description: "Macaroni, Penne & Fusilli Pasta", itemCount: 10 },
  { id: "cat_tea", name: "Tea", teluguName: "టీ పొడి", iconName: "Coffee", image: CATEGORY_IMAGES["Tea"], description: "Tata Tea Gold, Red Label, Taj Mahal & Green Tea", itemCount: 15 },
  { id: "cat_coffee", name: "Coffee", teluguName: "కాఫీ పొడి", iconName: "Coffee", image: CATEGORY_IMAGES["Coffee"], description: "Bru Instant, Nescafe Classic & Filter Coffee", itemCount: 12 },
  { id: "cat_milk", name: "Milk", teluguName: "పాలు", iconName: "Milk", image: CATEGORY_IMAGES["Milk"], description: "Amul, Heritage Toned & Whole Milk", itemCount: 10 },
  { id: "cat_dairy", name: "Dairy Products", teluguName: "డైరీ ఉత్పత్తులు", iconName: "Milk", image: CATEGORY_IMAGES["Dairy Products"], description: "Curd, Paneer, Butter, Cheese & Milkshakes", itemCount: 15 },
  { id: "cat_bread", name: "Bread", teluguName: "బ్రెడ్", iconName: "Cookie", image: CATEGORY_IMAGES["Bread"], description: "White Bread, Brown Bread & Sandwich Bread", itemCount: 8 },
  { id: "cat_bakery", name: "Bakery", teluguName: "బేేకరీ ఉత్పత్తులు", iconName: "Cookie", image: CATEGORY_IMAGES["Bakery"], description: "Plum Cakes, Cupcakes & Toast Rusk", itemCount: 10 },
  { id: "cat_colddrinks", name: "Cold Drinks", teluguName: "కూల్ డ్రింక్స్", iconName: "Droplet", image: CATEGORY_IMAGES["Cold Drinks"], description: "Coca-Cola, Thums Up, Sprite, Limca & Fanta", itemCount: 18 },
  { id: "cat_juices", name: "Juices", teluguName: "జ్యూస్‌లు", iconName: "Droplet", image: CATEGORY_IMAGES["Juices"], description: "Real Fruit Juices, Tropicana & Frooti", itemCount: 12 },
  { id: "cat_water", name: "Water", teluguName: "మంచినీళ్ళు", iconName: "Droplet", image: CATEGORY_IMAGES["Water"], description: "Bisleri Mineral Water & Kinley Bottles", itemCount: 8 },
  { id: "cat_icecream", name: "Ice Cream", teluguName: "ఐస్ క్రీమ్", iconName: "Sparkles", image: CATEGORY_IMAGES["Ice Cream"], description: "Amul Cones, Tubs, Choco Bars & Kulfi", itemCount: 12 },
  { id: "cat_frozen", name: "Frozen Foods", teluguName: "ఫ్రోజెన్ ఫుడ్స్", iconName: "Flame", image: CATEGORY_IMAGES["Frozen Foods"], description: "McCain Smiles, French Fries & Veg Nuggets", itemCount: 10 },
  { id: "cat_breakfast", name: "Breakfast Items", teluguName: "టిఫిన్ & బ్రేక్‌ఫాస్ట్", iconName: "Wheat", image: CATEGORY_IMAGES["Breakfast Items"], description: "Kellogg's Corn Flakes, Oats, Muesli & Poha", itemCount: 15 },
  { id: "cat_personal", name: "Personal Care", teluguName: "పర్సనల్ కేర్", iconName: "Sparkles", image: CATEGORY_IMAGES["Personal Care"], description: "Body Lotions, Talcum Powder & Deodorants", itemCount: 20 },
  { id: "cat_haircare", name: "Hair Care", teluguName: "హెయిర్ కేర్", iconName: "Sparkles", image: CATEGORY_IMAGES["Hair Care"], description: "Parachute Coconut Oil, Dabur Amla & Hair Gels", itemCount: 15 },
  { id: "cat_skincare", name: "Skin Care", teluguName: "స్కిన్ కేర్", iconName: "Sparkles", image: CATEGORY_IMAGES["Skin Care"], description: "Fair & Lovely, Nivea Creams & Vaseline Petroleum Jelly", itemCount: 12 },
  { id: "cat_bathsoap", name: "Bath Soap", teluguName: "స్నానపు సబ్బులు", iconName: "Sparkles", image: CATEGORY_IMAGES["Bath Soap"], description: "Dettol, Lux, Santoor, Mysore Sandal & Pears", itemCount: 20 },
  { id: "cat_toothpaste", name: "Toothpaste", teluguName: "టూత్‌పేస్ట్ & బ్రష్‌లు", iconName: "Sparkles", image: CATEGORY_IMAGES["Toothpaste"], description: "Colgate, Pepsodent, Sensodyne & Dabur Red", itemCount: 15 },
  { id: "cat_shampoo", name: "Shampoo", teluguName: "షాంపూలు", iconName: "Sparkles", image: CATEGORY_IMAGES["Shampoo"], description: "Clinic Plus, Sunsilk, Pantene & Head & Shoulders", itemCount: 15 },
  { id: "cat_detergent", name: "Detergent", teluguName: "సబ్బు పొడులు", iconName: "Home", image: CATEGORY_IMAGES["Detergent"], description: "Surf Excel, Ariel, Tide & Rin Washing Powder", itemCount: 18 },
  { id: "cat_dishwash", name: "Dishwash", teluguName: "డిష్ వాష్", iconName: "Home", image: CATEGORY_IMAGES["Dishwash"], description: "Vim Gel, Pril, Exo Bar & Steel Scrubber", itemCount: 12 },
  { id: "cat_floorcleaner", name: "Floor Cleaner", teluguName: "ఫ్లోర్ క్లీనర్లు", iconName: "Home", image: CATEGORY_IMAGES["Floor Cleaner"], description: "Lizol Disinfectant, Dettol Surface Cleaner & Phenyl", itemCount: 10 },
  { id: "cat_bathroomcleaner", name: "Bathroom Cleaner", teluguName: "లేట్రిన్ & బాత్‌రూమ్ క్లీనర్", iconName: "Home", image: CATEGORY_IMAGES["Bathroom Cleaner"], description: "Harpic Power Plus, Colin Glass Cleaner & Domex", itemCount: 10 },
  { id: "cat_kitchenessentials", name: "Kitchen Essentials", teluguName: "కిచెన్ ఎసెన్షియల్స్", iconName: "Home", image: CATEGORY_IMAGES["Kitchen Essentials"], description: "Aluminum Foil, Tissue Papers, Scrub Pads & Brooms", itemCount: 15 },
  { id: "cat_babycare", name: "Baby Care", teluguName: "బేబీ కేర్", iconName: "Gift", image: CATEGORY_IMAGES["Baby Care"], description: "Pampers Diapers, Johnson's Baby Soap & Wipes", itemCount: 12 },
  { id: "cat_petcare", name: "Pet Care", teluguName: "పెట్ కేర్", iconName: "Gift", image: CATEGORY_IMAGES["Pet Care"], description: "Pedigree Dog Food & Whiskas Cat Food", itemCount: 8 },
  { id: "cat_stationery", name: "Stationery", teluguName: "స్టేషనరీ", iconName: "Home", image: CATEGORY_IMAGES["Stationery"], description: "Notebooks, Pens, Pencils, Glue & Tape", itemCount: 15 },
  { id: "cat_household", name: "Household Essentials", teluguName: "హౌస్‌హోల్డ్ ఎసెన్షియల్స్", iconName: "Home", image: CATEGORY_IMAGES["Household Essentials"], description: "Good Knight Mosquito Refills, Candles & Batteries", itemCount: 20 },
  { id: "cat_dailyneeds", name: "Daily Needs", teluguName: "డైలీ నీడ్స్", iconName: "Sparkles", image: CATEGORY_IMAGES["Daily Needs"], description: "General Kiranam Items & Miscellaneous", itemCount: 10 }
];

// Generator function to produce exactly 500 high quality, realistic products
export function generate500Products(): Product[] {
  const productsList: Product[] = [];

  // Add base seeds first
  BASE_SEEDS.forEach((seed, index) => {
    const varId = `var_seed_${index + 1}`;
    const pId = index === 0 ? "prod_test_product" : `prod_seed_${index + 1}`;
    const imgUrl = CATEGORY_IMAGES[seed.category] || CATEGORY_IMAGES["Daily Needs"];

    productsList.push({
      id: pId,
      name: seed.name,
      teluguName: seed.teluguName,
      category: seed.category,
      subCategory: seed.subCategory,
      brand: seed.brand,
      description: seed.desc,
      hsnCode: seed.hsn,
      gstRate: seed.gstRate,
      selectedVariantId: varId,
      weightVariants: [
        {
          variantId: varId,
          weight: seed.weight,
          unit: seed.unit,
          mrp: seed.mrp,
          sellingPrice: seed.price,
          stock: seed.name.includes("Test") ? 100 : Math.floor(Math.random() * 40) + 10,
          sku: `PK-${seed.category.substring(0,3).toUpperCase()}-${100 + index}`,
          barcode: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`
        }
      ],
      images: [imgUrl],
      isFeatured: index < 12,
      isBestSeller: seed.badge === 'Best Seller',
      isTodayDeal: seed.badge === 'Hot Deal',
      status: 'active',
      rating: parseFloat((4.2 + (index % 8) * 0.1).toFixed(1)),
      reviewsCount: 12 + (index * 7) % 85,
      manufacturer: seed.mfg || `${seed.brand} India Ltd`,
      countryOfOrigin: "India",
      packSize: seed.packSize,
      specialBadge: seed.badge || BADGES[index % BADGES.length],
      reorderLevel: 5,
      priceHistory: []
    });
  });

  // Procedurally expand catalog up to 500 items across all categories
  const targetTotal = 500;
  let count = productsList.length;

  const categorySubcategories: Record<string, string[]> = {
    Rice: ["Sonamasuri", "Basmati", "Steam Rice", "Raw Rice", "Brown Rice", "Idli Rice"],
    "Flour & Atta": ["Wheat Atta", "Maida", "Besan", "Rice Flour", "Chakki Atta", "Multigrain"],
    Pulses: ["Toor Dal", "Moong Dal", "Chana Dal", "Urad Dal", "Masoor Dal", "Rajma", "Kabuli Chana"],
    "Cooking Oil": ["Sunflower Oil", "Groundnut Oil", "Rice Bran Oil", "Mustard Oil", "Gingelly Oil"],
    Ghee: ["Cow Ghee", "Buffalo Ghee", "Desi Ghee"],
    Salt: ["Iodized Salt", "Rock Salt", "Crystal Salt"],
    Sugar: ["White Sugar", "Jaggery Powder", "Organic Sugar", "Sugar Cubes"],
    Spices: ["Chilli Powder", "Turmeric Powder", "Coriander Powder", "Garam Masala", "Cumin Seeds", "Mustard Seeds"],
    "Dry Fruits": ["Cashews", "Almonds", "Raisins", "Pistachios", "Walnuts", "Dates"],
    Biscuits: ["Glucose Biscuits", "Cream Biscuits", "Butter Biscuits", "Digestive Biscuits", "Rusk"],
    Chocolates: ["Milk Chocolate", "Wafer Chocolate", "Dark Chocolate", "Toffees"],
    Snacks: ["Potato Chips", "Corn Chips", "Popcorn", "Extruded Snacks"],
    Namkeen: ["Bhujia", "Mixture", "Sev", "Chana Jor Garam", "Salted Peanuts"],
    Noodles: ["Instant Noodles", "Hakka Noodles", "Cup Noodles", "Vermicelli"],
    Pasta: ["Macaroni", "Penne Pasta", "Fusilli Pasta"],
    Tea: ["Leaf Tea", "Dust Tea", "Green Tea", "Masala Chai"],
    Coffee: ["Instant Coffee", "Filter Coffee", "Premix Coffee"],
    Milk: ["Toned Milk", "Full Cream Milk", "Double Toned Milk"],
    "Dairy Products": ["Fresh Curd", "Paneer", "Butter", "Cheese Slices", "Lassi", "Buttermilk"],
    Bread: ["White Bread", "Brown Bread", "Fruit Bread", "Pav Bun"],
    Bakery: ["Plum Cake", "Cupcake", "Toast", "Muffins"],
    "Cold Drinks": ["Carbonated Cola", "Lemon Drink", "Orange Soda", "Energy Drink"],
    Juices: ["Mango Juice", "Apple Juice", "Mixed Fruit Juice", "Orange Juice"],
    Water: ["Mineral Water 1L", "Mineral Water 500ml", "Water Can 20L"],
    "Ice Cream": ["Vanilla Tub", "Chocolate Cone", "Mango Bar", "Kulfi"],
    "Frozen Foods": ["Veg Nuggets", "French Fries", "Aloo Tikki", "Veg Momos"],
    "Breakfast Items": ["Corn Flakes", "Rolled Oats", "Chocos", "Instant Poha", "Upma Mix"],
    "Personal Care": ["Body Lotion", "Talcum Powder", "Deodorant Spray", "Face Wash"],
    "Hair Care": ["Coconut Hair Oil", "Amla Hair Oil", "Hair Gel", "Conditioner"],
    "Skin Care": ["Cold Cream", "Petroleum Jelly", "Vanishing Cream", "Moisturizer"],
    "Bath Soap": ["Antiseptic Soap", "Sandal Soap", "Glycerine Soap", "Neem Soap"],
    Toothpaste: ["Herbal Toothpaste", "Gel Toothpaste", "Toothbrush Set"],
    Shampoo: ["Anti Dandruff Shampoo", "Hair Fall Control Shampoo", "Smooth Shampoo"],
    Detergent: ["Washing Powder", "Liquid Detergent", "Detergent Bar"],
    Dishwash: ["Dishwash Bar", "Dishwash Liquid", "Scrubber Pad"],
    "Floor Cleaner": ["Disinfectant Surface Cleaner", "Phenyl Liquid", "Mop Refill"],
    "Bathroom Cleaner": ["Toilet Cleaner Liquid", "Tile Cleaner", "Glass Cleaner"],
    "Kitchen Essentials": ["Aluminum Foil", "Kitchen Towel Roll", "Garbage Bags"],
    "Baby Care": ["Baby Diapers", "Baby Wipes", "Baby Soap", "Baby Powder"],
    "Pet Care": ["Dog Dry Food", "Cat Wet Food", "Dog Biscuits"],
    Stationery: ["Notebook Single Line", "Ball Pen Pack", "Pencil Box", "Eraser & Sharpener"],
    "Household Essentials": ["Mosquito Repellent Liquid", "Camphor Candles", "AA Battery Pack"],
    "Daily Needs": ["General Kiranam Item", "Household Pack", "Store Special"]
  };

  const productTemplates: Record<string, string[]> = {
    Rice: ["Premium Grain", "Royal Harvest", "Daily Choice", "Gold Standard", "Farm Special", "Super Cleaned"],
    "Flour & Atta": ["Fresh Grinding", "Whole Grain", "Soft Roti Blend", "Nutri Rich", "Pure Milling"],
    Pulses: ["Unpolished Pure", "Organic Choice", "Desi Grain", "Farm Fresh", "High Protein"],
    "Cooking Oil": ["Lite & Healthy", "Heart Care", "Pure Extraction", "Filter Quality", "Value Pack"],
    Ghee: ["Traditional Granular", "Pure Dairy", "Golden Aroma", "Village Style"],
    Salt: ["Vacuum Evaporated", "Crystal Rock", "Pure Iodine"],
    Sugar: ["Sulphur Free", "Crystal White", "Pure Cane"],
    Spices: ["High Pungency", "Aromatic Blend", "Pure Ground", "Curcumin Rich"],
    "Dry Fruits": ["Jumbo King", "Handpicked", "California Grade", "Crunchy Roast"],
    Biscuits: ["Crunchy Bites", "Butter Delight", "Rich Cream", "Fiber Crunchy"],
    Chocolates: ["Smooth Melt", "Crispy Wafer", "Creamy Bar", "Joy Treat"],
    Snacks: ["Spicy Crunch", "Tangy Masala", "Classic Salted", "Munching Special"],
    Namkeen: ["Nagpur Special", "Crispy Sev", "Masala Chatpata", "Tea Time Crunch"],
    Noodles: ["2-Min Instant", "Masala Blast", "Hakka Special"],
    Pasta: ["Italian Style", "Durum Wheat", "Quick Cook"],
    Tea: ["Gold Leaf", "Strong Assam", "Aromatic Blend"],
    Coffee: ["Instant Roast", "Filter Rich", "Bold Espresso"],
    Milk: ["Fresh Morning", "Pasteurized", "Homogenized"],
    "Dairy Products": ["Farm Fresh", "Thick Creamy", "Pure Cow"],
    Bread: ["Soft Sliced", "Whole Wheat", "Daily Fresh"],
    Bakery: ["Rich Plum", "Vanilla Fresh", "Crispy Toast"],
    "Cold Drinks": ["Chilled Sparkling", "Zero Sugar", "Refreshing Citrus"],
    Juices: ["100% Real Fruit", "Pulp Enriched", "Juicy Refresh"],
    Water: ["Purified Mineral", "Safety Sealed"],
    "Ice Cream": ["Rich Creamy", "Choco Fudge", "Fruit Delight"],
    "Frozen Foods": ["Crispy Quick", "Easy Cook", "Tasty Bites"],
    "Breakfast Items": ["Energy Morning", "Rolled Whole", "Instant Ready"],
    "Personal Care": ["Gentle Skin", "Fresh All Day", "Aroma Care"],
    "Hair Care": ["Root Nourish", "Pure Natural", "Hair Shine"],
    "Skin Care": ["Deep Moisture", "Glow Protect", "Skin Soft"],
    "Bath Soap": ["Germ Guard", "Pure Sandal", "Soft Moisture"],
    Toothpaste: ["Cavity Protect", "Herbal Fresh", "White Sparkle"],
    Shampoo: ["Strong Roots", "Smooth Silk", "Dandruff Clear"],
    Detergent: ["Tough Stain", "Bright White", "Quick Wash"],
    Dishwash: ["Grease Buster", "Lemon Power", "Clean Shine"],
    "Floor Cleaner": ["99.9% Germ Kill", "Fresh Pine", "Citrus Shine"],
    "Bathroom Cleaner": ["Power Clean", "Scale Remover"],
    "Kitchen Essentials": ["Food Grade", "Super Absorbent", "Heavy Duty"],
    "Baby Care": ["Soft Touch", "Hypoallergenic", "Gentle Care"],
    "Pet Care": ["Nutri Balance", "Protein Rich"],
    Stationery: ["Smooth Writing", "Durable Quality"],
    "Household Essentials": ["Long Lasting", "Protection Shield"],
    "Daily Needs": ["General Utility", "Daily Grocery"]
  };

  const categoriesKeys = FULL_CATEGORIES.map(c => c.name).filter(n => n !== "Testing");

  while (count < targetTotal) {
    const cat = categoriesKeys[count % categoriesKeys.length];
    const subcats = categorySubcategories[cat] || ["General"];
    const subcat = subcats[count % subcats.length];
    const templates = productTemplates[cat] || ["Standard Product"];
    const tmpl = templates[count % templates.length];
    const brand = BRANDS_POOL[count % BRANDS_POOL.length];

    // Realistic pricing generation
    const baseMrp = Math.floor(15 + (count * 11) % 450); // ₹15 to ₹500 range
    const discountPct = (count % 4 === 0) ? 10 : ((count % 3 === 0) ? 15 : 5);
    const sellingPrice = Math.max(10, Math.round(baseMrp * (1 - discountPct / 100)));

    const weightVal = (count % 5 === 0) ? 1 : ((count % 3 === 0) ? 500 : 250);
    const unitVal = (cat.includes("Oil") || cat.includes("Milk") || cat.includes("Drinks") || cat.includes("Juice") || cat.includes("Dishwash") || cat.includes("Cleaner")) 
      ? (weightVal === 1 ? 'L' : 'ml') 
      : (weightVal === 1 ? 'kg' : 'g');

    const packSizeStr = `${weightVal} ${unitVal}`;
    const pName = `${brand} ${subcat} ${tmpl} ${packSizeStr}`;
    const varId = `var_gen_${count + 1}`;
    const imgUrl = CATEGORY_IMAGES[cat] || CATEGORY_IMAGES["Daily Needs"];

    const isOut = count % 47 === 0;
    const isLow = count % 19 === 0;
    const stockQty = isOut ? 0 : (isLow ? 3 : Math.floor(15 + (count % 45)));

    productsList.push({
      id: `prod_cat_${count + 1}`,
      name: pName,
      category: cat,
      subCategory: subcat,
      brand: brand,
      description: `Authentic ${pName} sourced and offered at Praveen Kiranam & General Stores. Fresh quality guaranteed.`,
      hsnCode: `${2000 + (count % 800)}`,
      gstRate: (cat.includes("Drinks") ? 28 : (cat.includes("Ghee") ? 12 : 5)) as GSTPercentage,
      selectedVariantId: varId,
      weightVariants: [
        {
          variantId: varId,
          weight: weightVal,
          unit: unitVal,
          mrp: baseMrp,
          sellingPrice: sellingPrice,
          stock: stockQty,
          sku: `PK-${cat.substring(0,3).toUpperCase()}-${1000 + count}`,
          barcode: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`
        }
      ],
      images: [imgUrl],
      isFeatured: count % 15 === 0,
      isBestSeller: count % 8 === 0,
      isTodayDeal: count % 12 === 0,
      status: isOut ? 'out_of_stock' : (isLow ? 'low_stock' : 'active'),
      rating: parseFloat((3.9 + (count % 11) * 0.1).toFixed(1)),
      reviewsCount: 5 + (count * 3) % 120,
      manufacturer: `${brand} Consumer Products India`,
      countryOfOrigin: "India",
      packSize: packSizeStr,
      specialBadge: BADGES[count % BADGES.length],
      reorderLevel: 5,
      priceHistory: []
    });

    count++;
  }

  return productsList;
}
