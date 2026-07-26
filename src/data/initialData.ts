/**
 * Praveen Kiranam and General Stores - Authentic Initial Store Data
 */
import { Product, Category, Brand, Supplier, Coupon, Customer, Expense } from '../types/store';

export const STORE_DETAILS = {
  name: "PRAVEEN KIRANAM & GENERAL STORES",
  tagline: "Serving Manakondur Since 2001",
  heritageBadge: "🟢 Serving Manakondur Since 2001",
  owner: "Praveen Kumar Vangala",
  phone: "+91 98490 12345",
  altPhone: "+91 0878 2345678",
  email: "orders@praveenkiranam.com",
  gstin: "36ABCDE1234F1Z5", // Telangana GSTIN preserved
  fssaiNo: "13621011000123", // FSSAI preserved
  address: "Manakondur, Karimnagar, Telangana - 505469, India",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=18.397500,79.187528",
  latitude: 18.397500,
  longitude: 79.187528,
  openingHours: "Mon - Sun: 6:00 AM - 10:00 PM",
  deliveryAreas: ["Manakondur", "Karimnagar"],
  expressDeliveryMin: 15,
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat_testing",
    name: "Testing",
    teluguName: "టెస్టింగ్ (₹1)",
    iconName: "Zap",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    description: "₹1 Test Product for quick testing of UPI payment flow",
    itemCount: 1
  },
  {
    id: "cat_atta_rice",
    name: "Atta, Rice & Grains",
    teluguName: "ఆటా & బియ్యం",
    iconName: "Wheat",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    description: "Premium Aashirvaad Atta, Sonamasuri Rice, Basmati, Rava & Poha",
    itemCount: 14
  },
  {
    id: "cat_dal_spices",
    name: "Pulses, Dals & Spices",
    teluguName: "పప్పులు & మసాలాలు",
    iconName: "Flame",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    description: "Superior Desi Toor Dal, Moong, Chana, Turmeric, Garam Masala",
    itemCount: 18
  },
  {
    id: "cat_oils_ghee",
    name: "Edible Oils & Ghee",
    teluguName: "నూనెలు & నెయ్యి",
    iconName: "Droplet",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    description: "Freedom Sunflower Oil, Gold Winner, Fortune Groundnut & Amul Ghee",
    itemCount: 12
  },
  {
    id: "cat_dairy",
    name: "Dairy, Milk & Fresh",
    teluguName: "పాలు & డైరీ",
    iconName: "Milk",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    description: "Fresh Amul, Heritage Milk, Curd, Paneer, Butter & Cheese",
    itemCount: 10
  },
  {
    id: "cat_beverages",
    name: "Beverages, Tea & Coffee",
    teluguName: "టీ & కాఫీ",
    iconName: "Coffee",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    description: "Tata Tea Gold, Red Label, Bru Instant Coffee, Boost & Bournvita",
    itemCount: 15
  },
  {
    id: "cat_snacks",
    name: "Snacks, Biscuits & Sweets",
    teluguName: "స్నాక్స్ & బిస్కెట్లు",
    iconName: "Cookie",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80",
    description: "Parle-G, Britannia Good Day, Haldiram Bhujia, Lays & Cadbury Silk",
    itemCount: 22
  },
  {
    id: "cat_personal_care",
    name: "Soaps & Personal Care",
    teluguName: "సోప్‌లు & పర్సనల్ కేర్",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1608248597262-8133e0789242?auto=format&fit=crop&w=600&q=80",
    description: "Dettol, Mysore Sandal, Clinic Plus Shampoo, Colgate Paste",
    itemCount: 16
  },
  {
    id: "cat_household",
    name: "Household & Cleaning",
    teluguName: "హౌస్‌హోల్డ్ & క్లీనింగ్",
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
    description: "Surf Excel, Ariel, Vim Liquid, Lizol Cleaner & Harpic",
    itemCount: 14
  },
  {
    id: "cat_festival",
    name: "Festival Specials & Kits",
    teluguName: "పండుగ కిట్లు",
    iconName: "Gift",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    description: "Kiranam Monthly Family Ration Kit, Diwali Sweets & Puja Packs",
    itemCount: 6
  }
];

export const INITIAL_BRANDS: Brand[] = [
  { id: "b_aashirvaad", name: "Aashirvaad" },
  { id: "b_freedom", name: "Freedom" },
  { id: "b_tata", name: "Tata" },
  { id: "b_amul", name: "Amul" },
  { id: "b_heritage", name: "Heritage" },
  { id: "b_fortune", name: "Fortune" },
  { id: "b_surfexcel", name: "Surf Excel" },
  { id: "b_dettol", name: "Dettol" },
  { id: "b_cadbury", name: "Cadbury" },
  { id: "b_haldirams", name: "Haldiram's" },
  { id: "b_everest", name: "Everest" },
  { id: "b_parle", name: "Parle" },
  { id: "b_mTR", name: "MTR" },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: "sup_101",
    name: "Sri Laxmi Wholesale Grain Depot",
    companyName: "Sri Laxmi Traders & Grain Distributors",
    phone: "+91 98480 99887",
    email: "laxmitraders.hyd@gmail.com",
    gstin: "36AAACL1234A1Z1",
    address: "Kukatpally Grain Market, Hyderabad",
    city: "Hyderabad",
    totalPurchases: 245000,
    pendingBalance: 12500,
    rating: 4.8
  },
  {
    id: "sup_102",
    name: "Telangana Edible Oils Agency",
    companyName: "Telangana Edible Oils & Ghee Depot",
    phone: "+91 94400 33221",
    email: "sales@telanganaoils.com",
    gstin: "36BBBTO5678B1Z2",
    address: "Balanagar Industrial Area, Hyderabad",
    city: "Hyderabad",
    totalPurchases: 189000,
    pendingBalance: 0,
    rating: 4.9
  },
  {
    id: "sup_103",
    name: "Amul & Heritage Dairy Distributor",
    companyName: "Balaji Fresh Dairy Agency",
    phone: "+91 99890 11223",
    email: "balaji.dairy@gmail.com",
    gstin: "36CCCBD9012C1Z3",
    address: "Miyapur Metro Station Road, Hyderabad",
    city: "Hyderabad",
    totalPurchases: 320000,
    pendingBalance: 8400,
    rating: 5.0
  },
  {
    id: "sup_104",
    name: "Hindustan Unilever Distributor (HUL)",
    companyName: "Sri Krishna Consumer Products Agency",
    phone: "+91 98491 88776",
    email: "hul.skagency@gmail.com",
    gstin: "36DDDHU3456D1Z4",
    address: "Sanathnagar Industrial Estate, Hyderabad",
    city: "Hyderabad",
    totalPurchases: 410000,
    pendingBalance: 22000,
    rating: 4.7
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod_test_product",
    name: "Test Product",
    teluguName: "టెస్ట్ ప్రోడక్ట్ (₹1)",
    category: "Testing",
    subCategory: "UPI Test",
    brand: "Praveen Kiranam",
    description: "₹1 Test Product for quick testing of the Smart UPI payment flow.",
    hsnCode: "9999",
    gstRate: 0,
    selectedVariantId: "var_test_1",
    weightVariants: [
      {
        variantId: "var_test_1",
        weight: 1,
        unit: "pc",
        mrp: 1,
        sellingPrice: 1,
        stock: 100,
        sku: "PK-TEST-001",
        barcode: "8900000000001"
      }
    ],
    images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isBestSeller: false,
    isTodayDeal: true,
    dealDiscountPercent: 0,
    status: "active",
    rating: 5.0,
    reviewsCount: 10
  },
  {
    id: "prod_atta_aashirvaad",
    name: "Aashirvaad Whole Wheat Shuddh Atta",
    teluguName: "ఆశీర్వాద్ గోధుమ పిండి",
    category: "Atta, Rice & Grains",
    subCategory: "Wheat Atta",
    brand: "Aashirvaad",
    description: "100% pure whole wheat flour milled from selected golden grains. Soft roti guaranteed.",
    hsnCode: "1101",
    gstRate: 5,
    selectedVariantId: "var_atta_5kg",
    weightVariants: [
      {
        variantId: "var_atta_1kg",
        weight: 1,
        unit: "kg",
        mrp: 60,
        sellingPrice: 54,
        stock: 45,
        sku: "PK-ATT-AAS-1KG-101",
        barcode: "8901030800011"
      },
      {
        variantId: "var_atta_5kg",
        weight: 5,
        unit: "kg",
        mrp: 290,
        sellingPrice: 255,
        stock: 32,
        sku: "PK-ATT-AAS-5KG-102",
        barcode: "8901030800059"
      },
      {
        variantId: "var_atta_10kg",
        weight: 10,
        unit: "kg",
        mrp: 560,
        sellingPrice: 499,
        stock: 18,
        sku: "PK-ATT-AAS-10KG-103",
        barcode: "8901030800103"
      }
    ],
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    dealDiscountPercent: 12,
    manufacturingDate: "2026-07-01",
    expiryDate: "2026-10-01",
    supplierId: "sup_101",
    supplierName: "Sri Laxmi Wholesale Grain Depot",
    status: "active",
    rating: 4.9,
    reviewsCount: 128
  },
  {
    id: "prod_rice_sonamasuri",
    name: "HMT Premium Aged Sonamasuri Raw Rice",
    teluguName: "హెచ్.ఎమ్.టి హెచ్.ఎమ్.టి సోనామసూరి బియ్యం",
    category: "Atta, Rice & Grains",
    subCategory: "Rice",
    brand: "Praveen Select",
    description: "Old Telangana Sonamasuri raw rice. Super slender grains, light & non-sticky.",
    hsnCode: "1006",
    gstRate: 5,
    selectedVariantId: "var_rice_25kg",
    weightVariants: [
      {
        variantId: "var_rice_5kg",
        weight: 5,
        unit: "kg",
        mrp: 350,
        sellingPrice: 320,
        stock: 25,
        sku: "PK-RIC-HMT-5KG-201",
        barcode: "8901234560051"
      },
      {
        variantId: "var_rice_10kg",
        weight: 10,
        unit: "kg",
        mrp: 680,
        sellingPrice: 625,
        stock: 20,
        sku: "PK-RIC-HMT-10KG-202",
        barcode: "8901234560105"
      },
      {
        variantId: "var_rice_25kg",
        weight: 25,
        unit: "kg",
        mrp: 1650,
        sellingPrice: 1499,
        stock: 14,
        sku: "PK-RIC-HMT-25KG-203",
        barcode: "8901234560259"
      }
    ],
    images: ["https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isBestSeller: true,
    festivalOffer: "Free 1kg Sugar with 25kg Rice Bag!",
    manufacturingDate: "2026-06-15",
    expiryDate: "2027-06-15",
    supplierId: "sup_101",
    supplierName: "Sri Laxmi Wholesale Grain Depot",
    status: "active",
    rating: 4.8,
    reviewsCount: 94
  },
  {
    id: "prod_oil_freedom",
    name: "Freedom Refined Sunflower Oil",
    teluguName: "ఫ్రీడమ్ సన్‌ఫ్లవర్ ఆయిల్",
    category: "Edible Oils & Ghee",
    subCategory: "Sunflower Oil",
    brand: "Freedom",
    description: "Fortified with Vitamin A & D. Light, clear oil for healthy daily Indian cooking.",
    hsnCode: "1512",
    gstRate: 5,
    selectedVariantId: "var_oil_1l",
    weightVariants: [
      {
        variantId: "var_oil_1l",
        weight: 1,
        unit: "L",
        mrp: 155,
        sellingPrice: 138,
        stock: 60,
        sku: "PK-OIL-FRE-1L-301",
        barcode: "8906001230018"
      },
      {
        variantId: "var_oil_5l",
        weight: 5,
        unit: "L",
        mrp: 750,
        sellingPrice: 670,
        stock: 22,
        sku: "PK-OIL-FRE-5L-302",
        barcode: "8906001230056"
      },
      {
        variantId: "var_oil_15l",
        weight: 15,
        unit: "L",
        mrp: 2200,
        sellingPrice: 1980,
        stock: 8,
        sku: "PK-OIL-FRE-15L-303",
        barcode: "8906001230155"
      }
    ],
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isBestSeller: true,
    isTodayDeal: true,
    dealDiscountPercent: 11,
    manufacturingDate: "2026-07-10",
    expiryDate: "2027-01-10",
    supplierId: "sup_102",
    supplierName: "Telangana Edible Oils Agency",
    status: "active",
    rating: 4.9,
    reviewsCount: 210
  },
  {
    id: "prod_ghee_amul",
    name: "Amul Pure Cow Ghee",
    teluguName: "అముల్ ప్యూర్ ఆవు నెయ్యి",
    category: "Edible Oils & Ghee",
    subCategory: "Ghee",
    brand: "Amul",
    description: "Rich granular pure ghee made from fresh cow milk. Authentic aroma.",
    hsnCode: "0405",
    gstRate: 12,
    selectedVariantId: "var_ghee_500ml",
    weightVariants: [
      {
        variantId: "var_ghee_200ml",
        weight: 200,
        unit: "ml",
        mrp: 160,
        sellingPrice: 148,
        stock: 30,
        sku: "PK-GHE-AMU-200ML-401",
        barcode: "8901262010201"
      },
      {
        variantId: "var_ghee_500ml",
        weight: 500,
        unit: "ml",
        mrp: 370,
        sellingPrice: 339,
        stock: 25,
        sku: "PK-GHE-AMU-500ML-402",
        barcode: "8901262010508"
      },
      {
        variantId: "var_ghee_1l",
        weight: 1,
        unit: "L",
        mrp: 720,
        sellingPrice: 659,
        stock: 15,
        sku: "PK-GHE-AMU-1L-403",
        barcode: "8901262011000"
      }
    ],
    images: ["https://images.unsplash.com/photo-1589927986076-255256532461?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isBestSeller: true,
    supplierId: "sup_103",
    supplierName: "Amul & Heritage Dairy Distributor",
    status: "active",
    rating: 5.0,
    reviewsCount: 165
  },
  {
    id: "prod_dal_toor",
    name: "Desi Unpolished Superior Toor Dal (కందిపప్పు)",
    teluguName: "దేశీ కందిపప్పు",
    category: "Pulses, Dals & Spices",
    subCategory: "Dals",
    brand: "Praveen Select",
    description: "Protein-rich unpolished Latur Desi Toor Dal. Fast cooking and delicious taste.",
    hsnCode: "0713",
    gstRate: 5,
    selectedVariantId: "var_toor_1kg",
    weightVariants: [
      {
        variantId: "var_toor_500g",
        weight: 500,
        unit: "g",
        mrp: 95,
        sellingPrice: 82,
        stock: 50,
        sku: "PK-DAL-TOO-500G-501",
        barcode: "8908001235001"
      },
      {
        variantId: "var_toor_1kg",
        weight: 1,
        unit: "kg",
        mrp: 185,
        sellingPrice: 159,
        stock: 40,
        sku: "PK-DAL-TOO-1KG-502",
        barcode: "8908001231003"
      },
      {
        variantId: "var_toor_5kg",
        weight: 5,
        unit: "kg",
        mrp: 900,
        sellingPrice: 775,
        stock: 12,
        sku: "PK-DAL-TOO-5KG-503",
        barcode: "8908001235005"
      }
    ],
    images: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isBestSeller: true,
    supplierId: "sup_101",
    supplierName: "Sri Laxmi Wholesale Grain Depot",
    status: "active",
    rating: 4.8,
    reviewsCount: 88
  },
  {
    id: "prod_tea_tatagold",
    name: "Tata Tea Gold Long Leaf Black Tea",
    teluguName: "టాటా టీ గోల్డ్ టీ పౌడర్",
    category: "Beverages, Tea & Coffee",
    subCategory: "Tea",
    brand: "Tata",
    description: "Rich combination of fine Assam CTC tea leaves and 15% long leaves for irresistible aroma.",
    hsnCode: "0902",
    gstRate: 5,
    selectedVariantId: "var_tea_500g",
    weightVariants: [
      {
        variantId: "var_tea_250g",
        weight: 250,
        unit: "g",
        mrp: 180,
        sellingPrice: 162,
        stock: 35,
        sku: "PK-TEA-TAT-250G-601",
        barcode: "8901058002501"
      },
      {
        variantId: "var_tea_500g",
        weight: 500,
        unit: "g",
        mrp: 340,
        sellingPrice: 299,
        stock: 28,
        sku: "PK-TEA-TAT-500G-602",
        barcode: "8901058005007"
      },
      {
        variantId: "var_tea_1kg",
        weight: 1,
        unit: "kg",
        mrp: 650,
        sellingPrice: 579,
        stock: 10,
        sku: "PK-TEA-TAT-1KG-603",
        barcode: "8901058001009"
      }
    ],
    images: ["https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isBestSeller: true,
    supplierId: "sup_104",
    supplierName: "Hindustan Unilever Distributor (HUL)",
    status: "active",
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: "prod_milk_heritage",
    name: "Heritage Toned Fresh Milk Pouch",
    teluguName: "హెరిటేజ్ టోన్డ్ మిల్క్",
    category: "Dairy, Milk & Fresh",
    subCategory: "Milk",
    brand: "Heritage",
    description: "Fresh pasteurized toned milk delivered daily directly from dairy.",
    hsnCode: "0401",
    gstRate: 0,
    selectedVariantId: "var_milk_500ml",
    weightVariants: [
      {
        variantId: "var_milk_500ml",
        weight: 500,
        unit: "ml",
        mrp: 29,
        sellingPrice: 29,
        stock: 120,
        sku: "PK-DRY-HER-500ML-701",
        barcode: "8906012340501"
      },
      {
        variantId: "var_milk_1l",
        weight: 1,
        unit: "L",
        mrp: 58,
        sellingPrice: 58,
        stock: 80,
        sku: "PK-DRY-HER-1L-702",
        barcode: "8906012341003"
      }
    ],
    images: ["https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"],
    isFeatured: false,
    isBestSeller: true,
    supplierId: "sup_103",
    supplierName: "Amul & Heritage Dairy Distributor",
    status: "active",
    rating: 4.7,
    reviewsCount: 310
  },
  {
    id: "prod_det_surfexcel",
    name: "Surf Excel Easy Wash Detergent Powder",
    teluguName: "సర్ఫ్ ఎక్సెల్ సర్ఫ్ పౌడర్",
    category: "Household & Cleaning",
    subCategory: "Detergents",
    brand: "Surf Excel",
    description: "Removes tough stains easily like grease, mud, oil, chocolate, and curry.",
    hsnCode: "3402",
    gstRate: 18,
    selectedVariantId: "var_surf_1kg",
    weightVariants: [
      {
        variantId: "var_surf_500g",
        weight: 500,
        unit: "g",
        mrp: 80,
        sellingPrice: 72,
        stock: 40,
        sku: "PK-HSD-SUR-500G-801",
        barcode: "8901030010501"
      },
      {
        variantId: "var_surf_1kg",
        weight: 1,
        unit: "kg",
        mrp: 150,
        sellingPrice: 132,
        stock: 35,
        sku: "PK-HSD-SUR-1KG-802",
        barcode: "8901030011003"
      },
      {
        variantId: "var_surf_3kg",
        weight: 3,
        unit: "kg",
        mrp: 420,
        sellingPrice: 365,
        stock: 18,
        sku: "PK-HSD-SUR-3KG-803",
        barcode: "8901030013007"
      }
    ],
    images: ["https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isBestSeller: true,
    supplierId: "sup_104",
    supplierName: "Hindustan Unilever Distributor (HUL)",
    status: "active",
    rating: 4.8,
    reviewsCount: 95
  },
  {
    id: "prod_soap_dettol",
    name: "Dettol Original Germ Protection Soap",
    teluguName: "డెట్టాల్ సోప్",
    category: "Soaps & Personal Care",
    subCategory: "Bath Soap",
    brand: "Dettol",
    description: "Trusted 99.9% germ protection for daily family hygiene with pine fragrance.",
    hsnCode: "3401",
    gstRate: 18,
    selectedVariantId: "var_dettol_4pack",
    weightVariants: [
      {
        variantId: "var_dettol_125g",
        weight: 125,
        unit: "g",
        mrp: 55,
        sellingPrice: 48,
        stock: 60,
        sku: "PK-SPC-DET-125G-901",
        barcode: "8901396012501"
      },
      {
        variantId: "var_dettol_4pack",
        weight: 500,
        unit: "pack",
        mrp: 210,
        sellingPrice: 179,
        stock: 28,
        sku: "PK-SPC-DET-4PK-902",
        barcode: "8901396040003"
      }
    ],
    images: ["https://images.unsplash.com/photo-1608248597262-8133e0789242?auto=format&fit=crop&w=600&q=80"],
    isFeatured: false,
    isBestSeller: true,
    supplierId: "sup_104",
    supplierName: "Hindustan Unilever Distributor (HUL)",
    status: "active",
    rating: 4.9,
    reviewsCount: 180
  },
  {
    id: "prod_biscuit_parle",
    name: "Parle-G Gold Glucose Biscuit Family Pack",
    teluguName: "పార్లే-జి బిస్కెట్లు",
    category: "Snacks, Biscuits & Sweets",
    subCategory: "Biscuits",
    brand: "Parle",
    description: "India's favorite glucose biscuits filled with goodness of milk and wheat.",
    hsnCode: "1905",
    gstRate: 18,
    selectedVariantId: "var_parle_1kg",
    weightVariants: [
      {
        variantId: "var_parle_250g",
        weight: 250,
        unit: "g",
        mrp: 30,
        sellingPrice: 28,
        stock: 80,
        sku: "PK-SNK-PAR-250G-1001",
        barcode: "8901030002501"
      },
      {
        variantId: "var_parle_1kg",
        weight: 1,
        unit: "kg",
        mrp: 120,
        sellingPrice: 108,
        stock: 45,
        sku: "PK-SNK-PAR-1KG-1002",
        barcode: "8901030010008"
      }
    ],
    images: ["https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80"],
    isFeatured: false,
    isBestSeller: true,
    status: "active",
    rating: 4.9,
    reviewsCount: 230
  },
  {
    id: "prod_kit_family_ration",
    name: "Praveen Kiranam Monthly Super Saver Family Ration Kit (25kg)",
    teluguName: "ప్రవీణ్ కిరణం నెలవారీ కుటుంబ రేషన్ కిట్",
    category: "Festival Specials & Kits",
    subCategory: "Monthly Ration Kit",
    brand: "Praveen Kiranam Special",
    description: "Complete monthly grocery box: 10kg HMT Rice + 5kg Aashirvaad Atta + 1L Freedom Oil + 1kg Toor Dal + 1kg Sugar + 1kg Salt + 250g Tata Tea Gold + Spices.",
    hsnCode: "2106",
    gstRate: 5,
    selectedVariantId: "var_kit_25kg",
    weightVariants: [
      {
        variantId: "var_kit_25kg",
        weight: 25,
        unit: "kg",
        mrp: 2999,
        sellingPrice: 2499,
        stock: 15,
        sku: "PK-KIT-FAM-25KG-1101",
        barcode: "8909998887771"
      }
    ],
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"],
    isFeatured: true,
    isBestSeller: true,
    festivalOffer: "Save ₹500 + Free Express Home Delivery in Pragathi Nagar!",
    status: "active",
    rating: 5.0,
    reviewsCount: 74
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: "WELCOME100",
    description: "Flat ₹100 Off on your first Kiranam order above ₹999",
    discountType: "flat",
    discountValue: 100,
    minOrderAmount: 999,
    validTill: "2026-12-31",
    isActive: true,
    timesUsed: 42
  },
  {
    code: "PKKIRANAM10",
    description: "10% Instant Discount on grocery orders above ₹1,499",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 1499,
    maxDiscount: 200,
    validTill: "2026-12-31",
    isActive: true,
    timesUsed: 89
  },
  {
    code: "FESTIVE500",
    description: "Flat ₹500 Off on Monthly Family Ration Combo Packs",
    discountType: "flat",
    discountValue: 500,
    minOrderAmount: 2499,
    validTill: "2026-12-31",
    isActive: true,
    timesUsed: 19
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "cust_1",
    name: "Srinivas Rao Vangala",
    phone: "9849011223",
    email: "srinivas.v@gmail.com",
    address: "Plot 42, Green Meadows, Pragathi Nagar, Hyderabad",
    gstin: "36AAAAA1234A1Z5",
    totalOrders: 14,
    totalSpent: 18450,
    storeCreditBalance: 1200, // Khata balance
    loyaltyPoints: 340,
    lastOrderDate: "2026-07-24"
  },
  {
    id: "cust_2",
    name: "Lakshmi Prasanna",
    phone: "9885044332",
    email: "lakshmi.p@yahoo.com",
    address: "Flat 302, Sai Residency, Road No 3, Kukatpally, Hyderabad",
    totalOrders: 9,
    totalSpent: 9800,
    storeCreditBalance: 0,
    loyaltyPoints: 180,
    lastOrderDate: "2026-07-22"
  },
  {
    id: "cust_3",
    name: "Venkat Ramana Reddy",
    phone: "9440188776",
    address: "H.No 3-88, Main Bazaar, Nizampet Village, Hyderabad",
    totalOrders: 22,
    totalSpent: 31200,
    storeCreditBalance: 2450,
    loyaltyPoints: 580,
    lastOrderDate: "2026-07-25"
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: "exp_1",
    date: "2026-07-01",
    category: "Rent",
    title: "Store Premises Monthly Rent (Pragathi Nagar Main Rd)",
    amount: 35000,
    paymentMode: "bank_transfer",
    receiptNumber: "REC-2026-07-01"
  },
  {
    id: "exp_2",
    date: "2026-07-05",
    category: "Electricity",
    title: "TSSDCL Commercial Power Bill (Commercial Refrigerator + AC)",
    amount: 8450,
    paymentMode: "upi",
    receiptNumber: "TSSDCL-998811"
  },
  {
    id: "exp_3",
    date: "2026-07-10",
    category: "Staff Salary",
    title: "July Staff Salaries (2 Counter Sales + 1 Delivery Boy)",
    amount: 38000,
    paymentMode: "bank_transfer"
  },
  {
    id: "exp_4",
    date: "2026-07-18",
    category: "Transportation",
    title: "Wholesale Grain Market Auto Freight Transport",
    amount: 2200,
    paymentMode: "cash"
  }
];

export const INITIAL_EMPLOYEES: import('../types/store').Employee[] = [
  {
    id: "emp_101",
    employeeId: "PK-EMP-101",
    name: "Praveen Kumar Vangala",
    phone: "+91 98490 12345",
    email: "admin@praveenkiranam.com",
    role: "super_admin",
    joiningDate: "1998-05-15",
    salary: 120000,
    status: "active",
    permissions: ["all"]
  },
  {
    id: "emp_102",
    employeeId: "PK-EMP-102",
    name: "Ramesh Chandra",
    phone: "+91 98480 55443",
    email: "ramesh.manager@praveenkiranam.com",
    role: "manager",
    joiningDate: "2018-03-10",
    salary: 28000,
    status: "active",
    permissions: ["pos", "inventory", "orders", "suppliers", "customers"]
  },
  {
    id: "emp_103",
    employeeId: "PK-EMP-103",
    name: "Suresh Babu",
    phone: "+91 99891 22334",
    email: "suresh.pos@praveenkiranam.com",
    role: "cashier",
    joiningDate: "2021-08-01",
    salary: 18000,
    status: "active",
    permissions: ["pos", "orders"]
  },
  {
    id: "emp_104",
    employeeId: "PK-EMP-104",
    name: "Mahesh Kumar",
    phone: "+91 98851 77665",
    email: "mahesh.delivery@praveenkiranam.com",
    role: "delivery_boy",
    joiningDate: "2023-01-15",
    salary: 15000,
    status: "active",
    permissions: ["orders"]
  }
];

export const INITIAL_ADDRESSES: import('../types/store').SavedAddress[] = [
  {
    id: "addr_1",
    title: "Home",
    fullName: "Srinivas Rao Vangala",
    phone: "9849011223",
    addressLine: "Plot 42, Green Meadows, Pragathi Nagar, Hyderabad",
    landmark: "Opposite Water Tank",
    pincode: "500090",
    isDefault: true
  },
  {
    id: "addr_2",
    title: "Office",
    fullName: "Srinivas Rao Vangala",
    phone: "9849011223",
    addressLine: "Level 4, Cyber Towers, Hitec City, Hyderabad",
    landmark: "Near Mindspace",
    pincode: "500081",
    isDefault: false
  }
];

export const INITIAL_NOTIFICATIONS: import('../types/store').Notification[] = [
  {
    id: "notif_1",
    title: "New Online Order Placed",
    message: "Order #PK-ORD-202607-1001 placed by Srinivas Rao for ₹531",
    date: new Date(Date.now() - 3600000).toISOString(),
    type: "order",
    targetRole: "admin",
    read: false
  },
  {
    id: "notif_2",
    title: "Low Stock Alert: Freedom Oil 15L",
    message: "Freedom Refined Sunflower Oil 15L Tin stock is down to 8 tins",
    date: new Date(Date.now() - 7200000).toISOString(),
    type: "inventory",
    targetRole: "admin",
    read: false
  },
  {
    id: "notif_3",
    title: "Welcome to Praveen Kiranam!",
    message: "Enjoy 15-Minute Express Delivery on all orders above ₹499 in Pragathi Nagar",
    date: new Date().toISOString(),
    type: "offer",
    targetRole: "customer",
    read: false
  }
];

export const INITIAL_REVIEWS: import('../types/store').Review[] = [
  {
    id: "rev_1",
    productId: "prod_atta_aashirvaad",
    customerName: "Kavitha Sharma",
    rating: 5,
    comment: "Super fresh flour! Rotis turn out extremely soft every single time. Quick delivery in 20 mins.",
    date: "2026-07-20"
  },
  {
    id: "rev_2",
    productId: "prod_rice_sonamasuri",
    customerName: "Raja Sekhar Reddy",
    rating: 5,
    comment: "Old aged Sonamasuri rice. Each grain separates beautifully when cooked. Best wholesale price in Kukatpally area.",
    date: "2026-07-18"
  },
  {
    id: "rev_3",
    productId: "prod_oil_freedom",
    customerName: "Madhavi Latha",
    rating: 5,
    comment: "Original genuine oil pouch at MRP discount. Praveen Kiranam service is wonderful.",
    date: "2026-07-22"
  }
];

