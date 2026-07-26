import { Product, Category, Brand, WeightUnit, GSTPercentage } from '../types/store';
import { INITIAL_CATEGORIES, INITIAL_BRANDS } from './initialData';

// Image pools for realistic grocery categories
const CATEGORY_IMAGES: Record<string, string[]> = {
  "Atta, Rice & Grains": [
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1536304993881-ff6e90fc0b65?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1627485937980-221c88ab04f9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80"
  ],
  "Pulses, Dals & Spices": [
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80"
  ],
  "Edible Oils & Ghee": [
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1608248597262-8133e0789242?auto=format&fit=crop&w=600&q=80"
  ],
  "Dairy, Milk & Fresh": [
    "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80"
  ],
  "Beverages, Tea & Coffee": [
    "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  ],
  "Snacks, Biscuits & Sweets": [
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80"
  ],
  "Soaps & Personal Care": [
    "https://images.unsplash.com/photo-1608248597262-8133e0789242?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
  ],
  "Household & Cleaning": [
    "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80"
  ],
  "Fresh Fruits & Vegetables": [
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=600&q=80"
  ],
  "Baby & Pet Care": [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80"
  ]
};

// Seed blueprint templates to generate 500+ items across all categories
const CATEGORY_TEMPLATES = [
  {
    category: "Atta, Rice & Grains",
    subCategories: ["Wheat Atta", "Sonamasuri Rice", "Basmati Rice", "Maida & Rava", "Poha & Millets", "Grains"],
    brands: ["Aashirvaad", "Fortune", "India Gate", "Tata Sampann", "Praveen Select", "Nature Fresh", "Patanjali"],
    items: [
      { name: "Whole Wheat Shuddh Atta", basePrice: 260, unit: "kg", weights: [1, 5, 10], telugu: "గోధుమ పిండి" },
      { name: "HMT Sonamasuri Raw Rice 12 Months Aged", basePrice: 320, unit: "kg", weights: [5, 10, 25], telugu: "సోనామసూరి బియ్యం" },
      { name: "Rozana Super Basmati Long Grain Rice", basePrice: 140, unit: "kg", weights: [1, 5], telugu: "బాస్మతి బియ్యం" },
      { name: "Fine Maida All Purpose Flour", basePrice: 45, unit: "kg", weights: [0.5, 1], telugu: "మైదా పిండి" },
      { name: "Bombay Rava Sooji Premium", basePrice: 50, unit: "kg", weights: [0.5, 1], telugu: "బొంబాయి రవ్వ" },
      { name: "Wheat Bansi Rava", basePrice: 55, unit: "kg", weights: [0.5, 1], telugu: "గోధుమ రవ్వ" },
      { name: "Thick Flattened Rice Poha (Atukulu)", basePrice: 48, unit: "kg", weights: [0.5, 1], telugu: "అటుకులు" },
      { name: "Organic Foxtail Millet (Korralu)", basePrice: 85, unit: "kg", weights: [0.5, 1], telugu: "కొర్రలు" },
      { name: "Finger Millet Ragi Whole", basePrice: 60, unit: "kg", weights: [0.5, 1], telugu: "రాగులు" },
      { name: "Pearl Millet Bajra Grains", basePrice: 52, unit: "kg", weights: [1, 2], telugu: "సజ్జలు" },
      { name: "Multi Grain Atta 7 Grain Mix", basePrice: 310, unit: "kg", weights: [1, 5], telugu: "మల్టీగ్రెయిన్ ఆటా" },
      { name: "Chakki Fresh Shuddh Atta", basePrice: 250, unit: "kg", weights: [5, 10], telugu: "చక్కీ ఆటా" }
    ]
  },
  {
    category: "Pulses, Dals & Spices",
    subCategories: ["Toor Dal", "Moong Dal", "Chana Dal", "Urad Dal", "Whole Spices", "Powder Spices", "Pickles & Sauces"],
    brands: ["Tata Sampann", "Everest", "MDH", "Catch", "Priya", "MTR", "Aachi", "Praveen Select"],
    items: [
      { name: "Desi Unpolished Premium Toor Dal", basePrice: 165, unit: "kg", weights: [0.5, 1, 2], telugu: "కందిపప్పు" },
      { name: "Yellow Moong Dal Split", basePrice: 120, unit: "kg", weights: [0.5, 1], telugu: "పెసరపప్పు" },
      { name: "Bengal Gram Chana Dal", basePrice: 95, unit: "kg", weights: [0.5, 1], telugu: "శనగపప్పు" },
      { name: "Whole White Urad Dal Gotu", basePrice: 145, unit: "kg", weights: [0.5, 1], telugu: "మినపప్పు" },
      { name: "Green Gram Whole Moong", basePrice: 110, unit: "kg", weights: [0.5, 1], telugu: "పెసలు" },
      { name: "Kashmiri Red Chilli Powder", basePrice: 90, unit: "g", weights: [100, 250, 500], telugu: "కారం పొడి" },
      { name: "Pure Turmeric Haldi Powder", basePrice: 65, unit: "g", weights: [100, 250, 500], telugu: "పసుపు పొడి" },
      { name: "Aromatic Coriander Dhaniya Powder", basePrice: 55, unit: "g", weights: [100, 250], telugu: "ధనియాల పొడి" },
      { name: "Special Garam Masala Powder", basePrice: 75, unit: "g", weights: [50, 100], telugu: "గరం మసాలా" },
      { name: "Whole Cumin Seeds Jeera", basePrice: 120, unit: "g", weights: [100, 250], telugu: "జీలకర్ర" },
      { name: "Small Mustard Seeds Rai (Avalu)", basePrice: 45, unit: "g", weights: [100, 250], telugu: "ఆవాలు" },
      { name: "Andhra Avakaya Mango Pickle", basePrice: 140, unit: "g", weights: [300, 500], telugu: "ఆవకాయ పచ్చడి" },
      { name: "Gongura Red Chilli Pickle", basePrice: 130, unit: "g", weights: [300, 500], telugu: "గోంగూర పచ్చడి" }
    ]
  },
  {
    category: "Edible Oils & Ghee",
    subCategories: ["Sunflower Oil", "Groundnut Oil", "Rice Bran Oil", "Mustard Oil", "Pure Cow Ghee", "Ghee Packs"],
    brands: ["Freedom", "Fortune", "Gold Winner", "Priya", "Amul", "Heritage", "GRB", "Ananda"],
    items: [
      { name: "Refined Sunflower Oil Pouch", basePrice: 135, unit: "L", weights: [1, 5], telugu: "సన్ ఫ్లవర్ ఆయిల్" },
      { name: "Filter Groundnut Peanut Oil", basePrice: 185, unit: "L", weights: [1, 5], telugu: "వేరుశెనగ నూనె" },
      { name: "Physically Refined Rice Bran Oil", basePrice: 140, unit: "L", weights: [1, 5], telugu: "రైస్ బ్రాన్ ఆయిల్" },
      { name: "Kachi Ghani Mustard Oil", basePrice: 160, unit: "L", weights: [1], telugu: "ఆవనూనె" },
      { name: "Pure Cow Ghee Tin", basePrice: 320, unit: "ml", weights: [200, 500, 1000], telugu: "ఆవు నెయ్యి" },
      { name: "Special Aromatic Desi Ghee", basePrice: 340, unit: "ml", weights: [200, 500], telugu: "నెయ్యి" },
      { name: "Blended Sesame Til Oil", basePrice: 220, unit: "L", weights: [0.5, 1], telugu: "నువ్వుల నూనె" }
    ]
  },
  {
    category: "Dairy, Milk & Fresh",
    subCategories: ["Milk", "Curd & Butter Milk", "Paneer & Butter", "Cheese", "Eggs & Bread"],
    brands: ["Amul", "Heritage", "Jersey", "Dodla", "Mother Dairy", "Britannia", "Milky Mist"],
    items: [
      { name: "Standardized Toned Milk Pouch", basePrice: 30, unit: "ml", weights: [500, 1000], telugu: "పాలు" },
      { name: "Thick Pouch Curd (Perugu)", basePrice: 35, unit: "g", weights: [400, 1000], telugu: "పెరుగు" },
      { name: "Fresh Malai Paneer Cubes", basePrice: 110, unit: "g", weights: [200, 500], telugu: "పనీర్" },
      { name: "Salted Butter Block", basePrice: 58, unit: "g", weights: [100, 500], telugu: "వెన్న" },
      { name: "Processed Cheese Slices Pack", basePrice: 140, unit: "g", weights: [200], telugu: "చీజ్ సైజెస్" },
      { name: "Farm Fresh White Eggs", basePrice: 42, unit: "pcs", weights: [6, 12, 30], telugu: "కోడి గుడ్లు" },
      { name: "Brown Whole Wheat Bread", basePrice: 45, unit: "g", weights: [400], telugu: "గోధుమ బ్రెడ్" }
    ]
  },
  {
    category: "Beverages, Tea & Coffee",
    subCategories: ["Tea Powder", "Instant Coffee", "Health Drinks", "Soft Drinks", "Fruit Juices", "Bottled Water"],
    brands: ["Tata Tea", "Red Label", "Bru", "Nescafé", "Horlicks", "Bournvita", "Boost", "Coca-Cola", "Pepsi", "Sprite", "Thums Up", "Real", "Paper Boat"],
    items: [
      { name: "Gold Premium Assam Tea", basePrice: 150, unit: "g", weights: [250, 500], telugu: "టీ పొడి" },
      { name: "Natural Care 5 Ayur Tea", basePrice: 170, unit: "g", weights: [250, 500], telugu: "టీ పొడి" },
      { name: "Instant Chicory Coffee Blend", basePrice: 95, unit: "g", weights: [100, 200], telugu: "కాఫీ పొడి" },
      { name: "Classic 100% Pure Instant Coffee", basePrice: 180, unit: "g", weights: [100, 200], telugu: "ఇన్‌స్టంట్ కాఫీ" },
      { name: "Classic Malt Health Drink", basePrice: 240, unit: "g", weights: [500, 1000], telugu: "హార్లిక్స్" },
      { name: "Chocolate Health Food Drink", basePrice: 250, unit: "g", weights: [500], telugu: "బోర్న్‌విటా" },
      { name: "Thums Up Charged Carbonated Drink", basePrice: 40, unit: "ml", weights: [600, 1250, 2000], telugu: "థమ్స్ అప్" },
      { name: "Coca-Cola Soft Drink Bottle", basePrice: 40, unit: "ml", weights: [600, 1250], telugu: "కోకా కోలా" },
      { name: "Sprite Lemon Drink", basePrice: 40, unit: "ml", weights: [600, 1250], telugu: "స్ప్రైట్" },
      { name: "Real Fruit Power Alphonso Mango Juice", basePrice: 110, unit: "L", weights: [1], telugu: "మామిడి జ్యూస్" },
      { name: "Paper Boat Aamras Alphonso Juice", basePrice: 35, unit: "ml", weights: [200, 1000], telugu: "పేపర్ బోట్ జ్యూస్" }
    ]
  },
  {
    category: "Snacks, Biscuits & Sweets",
    subCategories: ["Biscuits & Cookies", "Chocolates", "Namkeen & Bhujia", "Chips & Wafers", "Noodles & Pasta", "Dry Fruits"],
    brands: ["Parle", "Britannia", "Sunfeast", "Cadbury", "Haldiram's", "Lays", "Kurkure", "Maggi", "Yippee", "Nutraj"],
    items: [
      { name: "Parle-G Gold Glucose Biscuits", basePrice: 20, unit: "g", weights: [100, 250, 800], telugu: "పార్లే-జి బిస్కెట్లు" },
      { name: "Good Day Butter Cookies", basePrice: 35, unit: "g", weights: [120, 300], telugu: "గుడ్ డే బిస్కెట్లు" },
      { name: "Dark Fantasy Choco Fills", basePrice: 85, unit: "g", weights: [150, 300], telugu: "డార్క్ ఫాంటసీ" },
      { name: "Dairy Milk Silk Chocolate", basePrice: 80, unit: "g", weights: [60, 150], telugu: "డెయిరీ మిల్క్" },
      { name: "5 Star Chocolate Bar", basePrice: 20, unit: "g", weights: [20, 50], telugu: "ఫైవ్ స్టార్" },
      { name: "Aloo Bhujia Namkeen", basePrice: 55, unit: "g", weights: [150, 400], telugu: "ఆలూ భుజియా" },
      { name: "Classic Salted Potato Chips", basePrice: 20, unit: "g", weights: [50, 115], telugu: "చిప్స్" },
      { name: "Masala Magic Kurkure Wafers", basePrice: 20, unit: "g", weights: [80, 180], telugu: "కుర్‌కురే" },
      { name: "2-Minute Masala Instant Noodles", basePrice: 14, unit: "g", weights: [70, 280, 560], telugu: "మ్యాగీ నూడుల్స్" },
      { name: "Magic Masala Noodles", basePrice: 15, unit: "g", weights: [70, 280], telugu: "ఇప్పి నూడుల్స్" },
      { name: "Premium Jumbo Cashews (Kaju)", basePrice: 240, unit: "g", weights: [250, 500], telugu: "జీడిపప్పు" },
      { name: "California Almonds (Badam)", basePrice: 220, unit: "g", weights: [250, 500], telugu: "బాదం పప్పు" },
      { name: "Raisins Kishmish Seedless", basePrice: 110, unit: "g", weights: [250, 500], telugu: "కిస్‌మిస్" }
    ]
  },
  {
    category: "Soaps & Personal Care",
    subCategories: ["Bathing Soap", "Shampoo & Conditioner", "Toothpaste & Oral", "Face Wash & Skincare", "Baby Care"],
    brands: ["Dettol", "Dove", "Lux", "Pears", "Clinic Plus", "Head & Shoulders", "Colgate", "Closeup", "Sensodyne", "Himalaya", "Patanjali", "Johnson's Baby"],
    items: [
      { name: "Original Germ Protection Soap Bar", basePrice: 42, unit: "g", weights: [75, 125, 375], telugu: "డెట్టాల్ సబ్బు" },
      { name: "Cream Beauty Bathing Bar Soap", basePrice: 52, unit: "g", weights: [75, 125], telugu: "డౌవ్ సబ్బు" },
      { name: "Mysore Sandal Original Soap", basePrice: 48, unit: "g", weights: [75, 150], telugu: "మైసూర్ శాండల్" },
      { name: "Strong Health Shampoo", basePrice: 85, unit: "ml", weights: [180, 340, 650], telugu: "షాంపూ" },
      { name: "Smooth & Silky Anti-Dandruff Shampoo", basePrice: 140, unit: "ml", weights: [180, 360], telugu: "యాంటీ డ్యాండ్రఫ్ షాంపూ" },
      { name: "Strong Teeth Dental Cream Toothpaste", basePrice: 65, unit: "g", weights: [100, 200, 500], telugu: "కోల్గేట్ పేస్ట్" },
      { name: "Red Toothpaste Ayurvedic Gel", basePrice: 70, unit: "g", weights: [100, 200], telugu: "రెడ్ పేస్ట్" },
      { name: "Purifying Neem Face Wash", basePrice: 120, unit: "ml", weights: [100, 200], telugu: "ఫేస్ వాష్" },
      { name: "Baby Powder Gentle Care", basePrice: 110, unit: "g", weights: [100, 200], telugu: "బేబీ పౌడర్" }
    ]
  },
  {
    category: "Household & Cleaning",
    subCategories: ["Detergent Powder", "Liquid Detergent", "Dishwash Gel & Bars", "Floor & Toilet Cleaners", "Kitchen & Stationery"],
    brands: ["Surf Excel", "Ariel", "Wheel", "Tide", "Vim", "Pril", "Lizol", "Harpic", "Dettol", "Classmate"],
    items: [
      { name: "Easy Wash Detergent Powder", basePrice: 140, unit: "kg", weights: [1, 3, 5], telugu: "సర్ఫ్ ఎక్సెల్ పొడి" },
      { name: "Matic Liquid Detergent Bottle", basePrice: 220, unit: "L", weights: [1, 2], telugu: "లిక్విడ్ డిటర్జెంట్" },
      { name: "Lemon Dishwash Gel Bottle", basePrice: 110, unit: "ml", weights: [250, 500, 750], telugu: "విమ్ లిక్విడ్" },
      { name: "Dishwash Bar Soap", basePrice: 15, unit: "g", weights: [150, 300, 600], telugu: "విమ్ బార్" },
      { name: "Citrus Floor Cleaner Solution", basePrice: 115, unit: "ml", weights: [500, 1000], telugu: "ఫ్లోర్ క్లీనర్" },
      { name: "Powerplus Blue Toilet Cleaner", basePrice: 92, unit: "ml", weights: [500, 1000], telugu: "టాయిలెట్ క్లీనర్" },
      { name: "Single Line Long Notebook", basePrice: 65, unit: "pcs", weights: [1, 6], telugu: "నోట్ బుక్" }
    ]
  },
  {
    category: "Fresh Fruits & Vegetables",
    subCategories: ["Fresh Vegetables", "Fresh Fruits", "Exotic & Organic"],
    brands: ["Farm Fresh", "Praveen Fresh", "Organic India"],
    items: [
      { name: "Fresh Local Potatoes (Aloo)", basePrice: 32, unit: "kg", weights: [1, 2, 5], telugu: "బంగాళదుంపలు" },
      { name: "Fresh Hybrid Red Tomatoes", basePrice: 38, unit: "kg", weights: [1, 2], telugu: "టమాటాలు" },
      { name: "Nasik Quality Onions (Ullipayalu)", basePrice: 35, unit: "kg", weights: [1, 3, 5], telugu: "ఉల్లిపాయలు" },
      { name: "Fresh Green Chillies (Pachi Mirchi)", basePrice: 25, unit: "g", weights: [250, 500], telugu: "పచ్చి మిరపకాయలు" },
      { name: "Fresh Ginger Adrak", basePrice: 40, unit: "g", weights: [250, 500], telugu: "అల్లం" },
      { name: "Fresh Garlic Ellipaya", basePrice: 60, unit: "g", weights: [250, 500], telugu: "వెల్లుల్లి" },
      { name: "Shimla Crisp Red Apples", basePrice: 180, unit: "kg", weights: [0.5, 1], telugu: "యాపిల్స్" },
      { name: "Robusta Yellow Bananas", basePrice: 45, unit: "kg", weights: [1, 2], telugu: "అరటిపళ్ళు" }
    ]
  }
];

// Helper generator to produce 500+ realistic products
export function generate500ProductCatalog(): Product[] {
  const products: Product[] = [];
  let counter = 1000;

  for (const template of CATEGORY_TEMPLATES) {
    const categoryImagePool = CATEGORY_IMAGES[template.category] || CATEGORY_IMAGES["Atta, Rice & Grains"];

    for (const item of template.items) {
      for (let i = 0; i < template.brands.length; i++) {
        const brand = template.brands[i];
        const subCategory = template.subCategories[i % template.subCategories.length];
        counter++;

        const prodId = `prod_gen_${counter}`;
        const skuPrefix = brand.substring(0, 3).toUpperCase() + "-" + item.name.substring(0, 3).toUpperCase();
        const barcodeBase = 8901000000000 + counter;

        // Generate realistic weight variants
        const variants = item.weights.map((w, vIdx) => {
          const multiplier = w;
          const mrp = Math.round(item.basePrice * multiplier * (1 + (vIdx * 0.05)));
          const discount = 5 + ((counter + vIdx) % 20); // 5% to 25% discount
          const sellingPrice = Math.round(mrp * (1 - discount / 100));
          const stock = 15 + ((counter * 7 + vIdx * 13) % 80);

          return {
            variantId: `var_${prodId}_${w}${item.unit}`,
            weight: w,
            unit: item.unit as WeightUnit,
            mrp: mrp,
            sellingPrice: sellingPrice,
            stock: stock,
            sku: `PK-${skuPrefix}-${w}${item.unit}-${counter}`,
            barcode: `${barcodeBase}${vIdx}`
          };
        });

        const imgIdx = (counter) % categoryImagePool.length;
        const mainImage = categoryImagePool[imgIdx];
        const secondImage = categoryImagePool[(imgIdx + 1) % categoryImagePool.length];

        const isFeatured = counter % 7 === 0;
        const isBestSeller = counter % 5 === 0;
        const isTodayDeal = counter % 9 === 0;

        products.push({
          id: prodId,
          name: `${brand} ${item.name}`,
          teluguName: item.telugu ? `${item.telugu}` : undefined,
          category: template.category,
          subCategory: subCategory,
          brand: brand,
          description: `Premium quality ${item.name} from ${brand}. Freshly packed and guaranteed authentic for your daily household cooking and Kiranam needs.`,
          hsnCode: `${1000 + (counter % 9000)}`,
          gstRate: ([0, 5, 12, 18][counter % 4]) as GSTPercentage,
          selectedVariantId: variants[0].variantId,
          weightVariants: variants,
          images: [mainImage, secondImage],
          isFeatured: isFeatured,
          isBestSeller: isBestSeller,
          isTodayDeal: isTodayDeal,
          dealDiscountPercent: isTodayDeal ? 15 : undefined,
          manufacturingDate: "2026-06-15",
          expiryDate: "2027-06-15",
          supplierId: counter % 2 === 0 ? "sup_101" : "sup_102",
          supplierName: counter % 2 === 0 ? "Sri Laxmi Wholesale Grain Depot" : "Telangana Edible Oils Agency",
          status: "active",
          rating: Number((4.0 + ((counter % 10) / 10)).toFixed(1)),
          reviewsCount: 15 + (counter % 150)
        });

        // Cap or break if we exceed 520 products
        if (products.length >= 520) break;
      }
      if (products.length >= 520) break;
    }
    if (products.length >= 520) break;
  }

  return products;
}

export const ALL_500_PRODUCTS: Product[] = generate500ProductCatalog();
