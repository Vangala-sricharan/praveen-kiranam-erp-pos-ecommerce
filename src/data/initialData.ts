/**
 * Praveen Kiranam and General Stores - Authentic Initial Store Data
 */
import { Product, Category, Brand, Supplier, Coupon, Customer, Expense } from '../types/store';
import { FULL_CATEGORIES, generate500Products } from './fullProductCatalog';

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

export const INITIAL_CATEGORIES: Category[] = FULL_CATEGORIES;

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

export const INITIAL_PRODUCTS: Product[] = generate500Products();

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
    storeCreditBalance: 1200,
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
    productId: "prod_cat_1",
    customerName: "Kavitha Sharma",
    rating: 5,
    comment: "Super fresh flour! Rotis turn out extremely soft every single time. Quick delivery in 20 mins.",
    date: "2026-07-20"
  },
  {
    id: "rev_2",
    productId: "prod_cat_2",
    customerName: "Raja Sekhar Reddy",
    rating: 5,
    comment: "Old aged Sonamasuri rice. Each grain separates beautifully when cooked. Best wholesale price in Manakondur area.",
    date: "2026-07-18"
  },
  {
    id: "rev_3",
    productId: "prod_cat_3",
    customerName: "Madhavi Latha",
    rating: 5,
    comment: "Original genuine oil pouch at MRP discount. Praveen Kiranam service is wonderful.",
    date: "2026-07-22"
  }
];
