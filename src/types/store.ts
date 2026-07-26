/**
 * Praveen Kiranam and General Stores - Domain Types
 */

export type WeightUnit = 'g' | 'kg' | 'ml' | 'L' | 'pc' | 'pack';

export interface WeightVariant {
  variantId: string;
  weight: number;
  unit: WeightUnit;
  mrp: number;
  sellingPrice: number;
  stock: number;
  sku: string;
  barcode: string;
}

export type GSTPercentage = 0 | 5 | 12 | 18 | 28;

export interface Product {
  id: string;
  name: string;
  teluguName?: string;
  category: string;
  subCategory?: string;
  brand: string;
  description: string;
  hsnCode: string;
  gstRate: GSTPercentage;
  weightVariants: WeightVariant[];
  selectedVariantId: string; // Default variant
  images: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isTodayDeal?: boolean;
  dealDiscountPercent?: number;
  festivalOffer?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  supplierId?: string;
  supplierName?: string;
  status: 'active' | 'low_stock' | 'out_of_stock' | 'discontinued';
  rating?: number;
  reviewsCount?: number;
}

export interface Category {
  id: string;
  name: string;
  teluguName?: string;
  iconName: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
}

export interface CartItem {
  productId: string;
  productName: string;
  teluguName?: string;
  variantId: string;
  weight: number;
  unit: WeightUnit;
  mrp: number;
  sellingPrice: number;
  gstRate: GSTPercentage;
  hsnCode: string;
  quantity: number;
  image: string;
  sku: string;
  barcode: string;
  maxStock: number;
}

export type OrderCustomerType = 'online' | 'walkin' | 'phone';
export type PaymentMethod = 'upi' | 'cash' | 'card' | 'store_credit';
export type PaymentStatus = 'paid' | 'pending' | 'partially_paid' | 'failed';
export type OrderStatus = 
  | 'placed' 
  | 'accepted' 
  | 'preparing' 
  | 'packed' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned' 
  | 'refunded';

export type EmployeeRole = 
  | 'super_admin' 
  | 'admin' 
  | 'manager' 
  | 'cashier' 
  | 'delivery_boy' 
  | 'staff';

export interface Employee {
  id: string;
  employeeId: string; // e.g. PK-EMP-101
  name: string;
  phone: string;
  email: string;
  role: EmployeeRole;
  joiningDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  permissions: string[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: EmployeeRole;
  employeeId?: string;
}

export interface CustomerAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash?: string;
  profilePic?: string;
  gender?: 'Male' | 'Female' | 'Other';
  dob?: string;
  loyaltyPoints: number;
  walletBalance: number;
  isEmailVerified: boolean;
  createdAt: string;
  addresses: SavedAddress[];
  defaultAddressId?: string;
}

export interface SavedAddress {
  id: string;
  title: string; // e.g. Home, Office
  fullName: string;
  phone: string;
  addressLine: string;
  landmark?: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'order' | 'inventory' | 'khata' | 'offer' | 'system';
  targetRole?: EmployeeRole | 'customer';
  read: boolean;
  linkTab?: string;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  quantityChange: number; // positive = added, negative = deducted
  reason: 'new_stock' | 'damage' | 'expired' | 'internal_audit' | 'return';
  notes?: string;
  date: string;
  adjustedBy: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  invoiceNumber: string;
  orderDate: string;
  customerType: OrderCustomerType;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerGstin?: string;
  deliveryAddress?: string;
  pincode?: string;
  items: CartItem[];
  subtotal: number;
  gstTotal: number;
  cgstTotal: number;
  sgstTotal: number;
  deliveryFee: number;
  discountAmount: number;
  couponCode?: string;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  notes?: string;
  createdBy: 'customer' | 'pos_cashier' | 'admin';
}

export interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  orderId: string;
  storeName: string;
  storeAddress: string;
  storeGstin: string;
  storePhone: string;
  customerName: string;
  customerPhone: string;
  customerGstin?: string;
  customerAddress?: string;
  items: CartItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalGst: number;
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
  paymentMode: PaymentMethod;
}

export interface Supplier {
  id: string;
  name: string;
  companyName: string;
  phone: string;
  email: string;
  gstin: string;
  address: string;
  city: string;
  totalPurchases: number;
  pendingBalance: number;
  rating: number;
}

export interface PurchaseOrderItem {
  productId: string;
  productName: string;
  variantId: string;
  weight: number;
  unit: WeightUnit;
  quantity: number;
  costPrice: number;
  totalAmount: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  orderDate: string;
  expectedDelivery: string;
  items: PurchaseOrderItem[];
  totalAmount: number;
  status: 'draft' | 'ordered' | 'received' | 'cancelled';
  paymentStatus: 'unpaid' | 'partially_paid' | 'paid';
  receivedDate?: string;
}

export type ExpenseCategory = 
  | 'Rent' 
  | 'Electricity' 
  | 'Staff Salary' 
  | 'Transportation' 
  | 'Packaging' 
  | 'Shop Maintenance' 
  | 'Municipal Tax' 
  | 'Miscellaneous';

export interface Expense {
  id: string;
  date: string;
  category: ExpenseCategory;
  title: string;
  amount: number;
  paymentMode: 'cash' | 'upi' | 'bank_transfer';
  notes?: string;
  receiptNumber?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  gstin?: string;
  totalOrders: number;
  totalSpent: number;
  storeCreditBalance: number; // Khata balance (positive = customer owes store)
  loyaltyPoints: number;
  lastOrderDate?: string;
}

export interface KhataTransaction {
  id: string;
  customerId: string;
  date: string;
  type: 'debit' | 'credit'; // debit = purchased on credit (+owe), credit = paid back (-owe)
  amount: number;
  description: string;
  orderId?: string;
  paymentMode?: PaymentMethod;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount?: number;
  validTill: string;
  isActive: boolean;
  timesUsed: number;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StoreStats {
  totalSalesToday: number;
  yesterdaySales: number;
  weeklySales: number;
  monthlyRevenue: number;
  yearlySales: number;
  posSalesToday: number;
  onlineSalesToday: number;
  ordersTodayCount: number;
  lowStockItemsCount: number;
  expiringItemsCount: number;
  monthlyExpenses: number;
  cogs: number;
  grossProfit: number;
  netProfitMonthly: number;
  profitPercentage: number;
  inventoryValue: number;
  gstCollected: number;
  gstPaid: number;
  totalCustomers: number;
  customersTodayCount: number;
  pendingKhataAmount: number;
  orderStatusCounts: {
    placed: number;
    accepted: number;
    preparing: number;
    packed: number;
    out_for_delivery: number;
    delivered: number;
    cancelled: number;
    returned: number;
    refunded: number;
  };
  topSellingProducts: { id: string; name: string; qty: number; revenue: number }[];
  leastSellingProducts: { id: string; name: string; stock: number }[];
  topCategories: { category: string; revenue: number; percentage: number }[];
  mostProfitableProducts: { id: string; name: string; marginPercent: number; profitAmount: number }[];
}
