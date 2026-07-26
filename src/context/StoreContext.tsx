/**
 * Praveen Kiranam and General Stores - Global React State Context
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, Category, Order, CartItem, Coupon, Customer, 
  Expense, Supplier, Invoice, StoreStats, PaymentMethod, WeightVariant 
} from '../types/store';
import { storageService } from '../services/storageService';

export type AppViewMode = 'online_store' | 'pos_billing' | 'erp_admin';
export type AdminTab = 
  | 'dashboard' 
  | 'products' 
  | 'inventory'
  | 'categories'
  | 'brands'
  | 'bulk_import' 
  | 'categories_brands' 
  | 'orders' 
  | 'suppliers' 
  | 'purchase_orders' 
  | 'employees' 
  | 'expenses' 
  | 'coupons' 
  | 'customers'
  | 'khata' 
  | 'gst_reports' 
  | 'reports'
  | 'analytics'
  | 'settings';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface StoreContextType {
  // App Navigation Mode
  viewMode: AppViewMode;
  setViewMode: (mode: AppViewMode) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;

  // Auth & RBAC State
  authUser: import('../types/store').AuthUser | null;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginAdmin: (emailOrPhone: string, pinOrPass: string, role?: import('../types/store').EmployeeRole) => boolean;
  logoutAdmin: () => void;

  // Customer Auth & Portal State
  customerUser: import('../types/store').CustomerAccount | null;
  isCustomerAuthModalOpen: boolean;
  setIsCustomerAuthModalOpen: (open: boolean) => void;
  customerAuthMode: 'login' | 'register' | 'forgot' | 'reset';
  setCustomerAuthMode: (mode: 'login' | 'register' | 'forgot' | 'reset') => void;
  loginCustomer: (emailOrPhone: string, pass: string) => boolean;
  registerCustomer: (data: { name: string; email: string; phone: string; password: string }) => boolean;
  logoutCustomer: () => void;
  updateCustomerProfile: (data: Partial<import('../types/store').CustomerAccount>) => void;
  forgotCustomerPassword: (emailOrPhone: string) => boolean;
  resetCustomerPassword: (emailOrPhone: string, newPass: string) => boolean;

  // Products, Categories, Brands, Employees Data
  products: Product[];
  categories: Category[];
  brands: import('../types/store').Brand[];
  suppliers: Supplier[];
  customers: Customer[];
  employees: import('../types/store').Employee[];
  orders: Order[];
  expenses: Expense[];
  coupons: Coupon[];
  notifications: import('../types/store').Notification[];
  savedAddresses: import('../types/store').SavedAddress[];
  purchaseOrders: import('../types/store').PurchaseOrder[];
  stockAdjustments: import('../types/store').StockAdjustment[];
  reviews: import('../types/store').Review[];
  stats: StoreStats;
  refreshData: () => void;

  // Modals & Drawers
  isCustomerProfileOpen: boolean;
  setIsCustomerProfileOpen: (open: boolean) => void;
  activeStaticModal: 'about' | 'contact' | 'privacy' | 'terms' | null;
  setActiveStaticModal: (modal: 'about' | 'contact' | 'privacy' | 'terms' | null) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (p: Product | null) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (catId: string | null) => void;

  // Online Storefront Cart
  cart: CartItem[];
  addToCart: (product: Product, variantId?: string, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateCartQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartGstTotal: number;
  cartGrandTotal: number;
  cartDeliveryFee: number;

  // Wishlist
  wishlist: string[]; // Product IDs
  toggleWishlist: (productId: string) => void;

  // POS Billing Counter State
  posCart: CartItem[];
  addToPosCart: (product: Product, variantId?: string, quantity?: number) => void;
  removeFromPosCart: (productId: string, variantId: string) => void;
  updatePosQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearPosCart: () => void;
  posCustomer: Customer | null;
  setPosCustomer: (customer: Customer | null) => void;
  posPaymentMethod: PaymentMethod;
  setPosPaymentMethod: (method: PaymentMethod) => void;
  posCashTendered: number;
  setPosCashTendered: (amount: number) => void;
  posDiscount: number;
  setPosDiscount: (discount: number) => void;
  processPosSale: () => Order | null;

  // Completed Invoice Modal
  activeInvoice: Invoice | null;
  setActiveInvoice: (invoice: Invoice | null) => void;

  // Notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // CRUD Functions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  duplicateProduct: (productId: string) => void;
  bulkUpdateProducts: (productIds: string[], updates: Partial<Product>) => void;
  bulkDeleteProducts: (productIds: string[]) => void;
  importProducts: (imported: Product[]) => void;
  addCategory: (cat: Category) => void;
  deleteCategory: (id: string) => void;
  addBrand: (brand: import('../types/store').Brand) => void;
  deleteBrand: (id: string) => void;
  addExpense: (expense: Expense) => void;
  addSupplier: (supplier: Supplier) => void;
  addCustomer: (customer: Customer) => void;
  addEmployee: (emp: import('../types/store').Employee) => void;
  updateEmployee: (emp: import('../types/store').Employee) => void;
  deleteEmployee: (id: string) => void;
  addSavedAddress: (addr: import('../types/store').SavedAddress) => void;
  deleteSavedAddress: (id: string) => void;
  addStockAdjustment: (adj: Omit<import('../types/store').StockAdjustment, 'id' | 'date'>) => void;
  createPurchaseOrder: (po: Omit<import('../types/store').PurchaseOrder, 'id' | 'poNumber' | 'orderDate' | 'status'>) => void;
  receivePurchaseOrder: (poId: string) => void;
  addReview: (review: Omit<import('../types/store').Review, 'id' | 'date'>) => void;
  markNotificationRead: (id: string) => void;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  approvePayment: (orderId: string) => Order | null;
  rejectPayment: (orderId: string) => Order | null;
  placeOnlineOrder: (customerData: {
    name: string;
    phone: string;
    address: string;
    pincode: string;
    paymentMethod: PaymentMethod;
    notes?: string;
  }) => Order | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<AppViewMode>('online_store');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Auth & RBAC (Starts logged out)
  const [authUser, setAuthUser] = useState<import('../types/store').AuthUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Customer Auth State (Starts logged out in Guest mode)
  const [customerUser, setCustomerUser] = useState<import('../types/store').CustomerAccount | null>(null);
  const [isCustomerAuthModalOpen, setIsCustomerAuthModalOpen] = useState<boolean>(false);
  const [customerAuthMode, setCustomerAuthMode] = useState<'login' | 'register' | 'forgot' | 'reset'>('login');

  // Live Data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<import('../types/store').Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [employees, setEmployees] = useState<import('../types/store').Employee[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [notifications, setNotifications] = useState<import('../types/store').Notification[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<import('../types/store').SavedAddress[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<import('../types/store').PurchaseOrder[]>([]);
  const [stockAdjustments, setStockAdjustments] = useState<import('../types/store').StockAdjustment[]>([]);
  const [reviews, setReviews] = useState<import('../types/store').Review[]>([]);
  const [stats, setStats] = useState<StoreStats>(storageService.getStoreStats());

  // Modals & Drawers
  const [isCustomerProfileOpen, setIsCustomerProfileOpen] = useState<boolean>(false);
  const [activeStaticModal, setActiveStaticModal] = useState<'about' | 'contact' | 'privacy' | 'terms' | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Online Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>([]);

  // POS State
  const [posCart, setPosCart] = useState<CartItem[]>([]);
  const [posCustomer, setPosCustomer] = useState<Customer | null>(null);
  const [posPaymentMethod, setPosPaymentMethod] = useState<PaymentMethod>('cash');
  const [posCashTendered, setPosCashTendered] = useState<number>(0);
  const [posDiscount, setPosDiscount] = useState<number>(0);

  // Active Invoice
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const refreshData = () => {
    setProducts(storageService.getProducts());
    setCategories(storageService.getCategories());
    setBrands(storageService.getBrands());
    setSuppliers(storageService.getSuppliers());
    setCustomers(storageService.getCustomers());
    setEmployees(storageService.getEmployees());
    setOrders(storageService.getOrders());
    setExpenses(storageService.getExpenses());
    setCoupons(storageService.getCoupons());
    setNotifications(storageService.getNotifications());
    setSavedAddresses(storageService.getAddresses());
    setPurchaseOrders(storageService.getPurchaseOrders());
    setStockAdjustments(storageService.getStockAdjustments());
    setReviews(storageService.getReviews());
    setStats(storageService.getStoreStats());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Auth Functions
  const loginAdmin = (emailOrPhone: string, pinOrPass: string, role?: import('../types/store').EmployeeRole): boolean => {
    const allEmps = storageService.getEmployees();
    const found = allEmps.find(e => e.email.toLowerCase() === emailOrPhone.toLowerCase() || e.phone === emailOrPhone);
    
    if (found || role || pinOrPass === '1234' || pinOrPass === 'admin123') {
      const activeRole = role || found?.role || 'super_admin';
      const userObj: import('../types/store').AuthUser = {
        id: found?.id || `emp_${Date.now()}`,
        name: found?.name || 'Store Administrator',
        email: found?.email || emailOrPhone,
        role: activeRole,
        employeeId: found?.employeeId || 'PK-EMP-101'
      };
      setAuthUser(userObj);
      setIsAuthModalOpen(false);
      setViewMode('erp_admin');
      showToast(`Welcome ${userObj.name} (${activeRole.replace('_', ' ').toUpperCase()})`, 'success');
      return true;
    }
    showToast('Invalid Login Credentials or PIN', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setAuthUser(null);
    setViewMode('online_store');
    showToast('Logged out of Admin Portal', 'info');
  };

  // Customer Auth Functions
  const loginCustomer = (emailOrPhone: string, pass: string): boolean => {
    const res = storageService.loginCustomerAccount(emailOrPhone, pass);
    if (res.success && res.customer) {
      setCustomerUser(res.customer);
      setIsCustomerAuthModalOpen(false);
      showToast(res.message, 'success');
      return true;
    }
    showToast(res.message, 'error');
    return false;
  };

  const registerCustomer = (data: { name: string; email: string; phone: string; password: string }): boolean => {
    const res = storageService.registerCustomerAccount(data);
    if (res.success && res.customer) {
      setCustomerUser(res.customer);
      setIsCustomerAuthModalOpen(false);
      showToast(res.message, 'success');
      return true;
    }
    showToast(res.message, 'error');
    return false;
  };

  const logoutCustomer = () => {
    storageService.setCurrentCustomerUser(null);
    setCustomerUser(null);
    showToast('Customer logged out', 'info');
  };

  const updateCustomerProfile = (updateData: Partial<import('../types/store').CustomerAccount>) => {
    if (!customerUser) return;
    const updated = storageService.updateCustomerProfile(customerUser.id, updateData);
    if (updated) {
      setCustomerUser(updated);
      showToast('Profile updated successfully', 'success');
    }
  };

  const forgotCustomerPassword = (emailOrPhone: string): boolean => {
    const res = storageService.forgotPasswordCustomer(emailOrPhone);
    if (res.success) {
      showToast(res.message, 'info');
      setCustomerAuthMode('reset');
      return true;
    }
    showToast(res.message, 'error');
    return false;
  };

  const resetCustomerPassword = (emailOrPhone: string, newPass: string): boolean => {
    const res = storageService.resetPasswordCustomer(emailOrPhone, newPass);
    if (res.success) {
      showToast(res.message, 'success');
      setCustomerAuthMode('login');
      return true;
    }
    showToast(res.message, 'error');
    return false;
  };

  // Online Cart Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
  const cartGstTotal = cart.reduce((sum, item) => {
    const basePrice = (item.sellingPrice * item.quantity) / (1 + item.gstRate / 100);
    return sum + (item.sellingPrice * item.quantity - basePrice);
  }, 0);
  const cartDeliveryFee = cartSubtotal >= 499 || cart.length === 0 ? 0 : 30;
  const cartGrandTotal = Math.max(0, cartSubtotal + cartDeliveryFee - couponDiscount);

  // Online Cart Actions
  const addToCart = (product: Product, variantId?: string, quantity: number = 1) => {
    const targetVariantId = variantId || product.selectedVariantId || product.weightVariants[0]?.variantId;
    const variant = product.weightVariants.find(v => v.variantId === targetVariantId) || product.weightVariants[0];

    if (!variant || variant.stock <= 0) {
      showToast('Item is currently out of stock', 'error');
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.productId === product.id && item.variantId === variant.variantId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > variant.stock) {
          showToast(`Only ${variant.stock} available in stock`, 'info');
          updated[existingIndex].quantity = variant.stock;
        } else {
          updated[existingIndex].quantity = newQty;
          showToast(`Updated ${product.name} (${variant.weight}${variant.unit}) quantity`, 'success');
        }
        return updated;
      } else {
        const newItem: CartItem = {
          productId: product.id,
          productName: product.name,
          teluguName: product.teluguName,
          variantId: variant.variantId,
          weight: variant.weight,
          unit: variant.unit,
          mrp: variant.mrp,
          sellingPrice: variant.sellingPrice,
          gstRate: product.gstRate,
          hsnCode: product.hsnCode,
          quantity,
          image: product.images[0] || '',
          sku: variant.sku,
          barcode: variant.barcode,
          maxStock: variant.stock
        };
        showToast(`Added ${product.name} (${variant.weight}${variant.unit}) to Cart`, 'success');
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart(prev => prev.filter(i => !(i.productId === productId && i.variantId === variantId)));
    showToast('Removed item from cart', 'info');
  };

  const updateCartQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.productId === productId && item.variantId === variantId) {
        const qty = Math.min(quantity, item.maxStock);
        return { ...item, quantity: qty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const applyCouponCode = (code: string) => {
    const res = storageService.validateCoupon(code, cartSubtotal);
    if (res.valid && res.coupon) {
      setAppliedCoupon(res.coupon);
      setCouponDiscount(res.discountAmount);
      showToast(res.message, 'success');
      return { success: true, message: res.message };
    } else {
      showToast(res.message, 'error');
      return { success: false, message: res.message };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    showToast('Coupon removed', 'info');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  // POS Cart Actions
  const addToPosCart = (product: Product, variantId?: string, quantity: number = 1) => {
    const targetVariantId = variantId || product.selectedVariantId || product.weightVariants[0]?.variantId;
    const variant = product.weightVariants.find(v => v.variantId === targetVariantId) || product.weightVariants[0];

    if (!variant) return;

    setPosCart(prev => {
      const existingIndex = prev.findIndex(item => item.productId === product.id && item.variantId === variant.variantId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          productId: product.id,
          productName: product.name,
          teluguName: product.teluguName,
          variantId: variant.variantId,
          weight: variant.weight,
          unit: variant.unit,
          mrp: variant.mrp,
          sellingPrice: variant.sellingPrice,
          gstRate: product.gstRate,
          hsnCode: product.hsnCode,
          quantity,
          image: product.images[0] || '',
          sku: variant.sku,
          barcode: variant.barcode,
          maxStock: variant.stock
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromPosCart = (productId: string, variantId: string) => {
    setPosCart(prev => prev.filter(i => !(i.productId === productId && i.variantId === variantId)));
  };

  const updatePosQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromPosCart(productId, variantId);
      return;
    }
    setPosCart(prev => prev.map(item => {
      if (item.productId === productId && item.variantId === variantId) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearPosCart = () => {
    setPosCart([]);
    setPosCustomer(null);
    setPosCashTendered(0);
    setPosDiscount(0);
  };

  const processPosSale = (): Order | null => {
    if (posCart.length === 0) {
      showToast('POS Cart is empty', 'error');
      return null;
    }

    const subtotal = posCart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
    const grandTotal = Math.max(0, subtotal - posDiscount);

    if (posPaymentMethod === 'cash' && posCashTendered < grandTotal) {
      showToast(`Tendered Cash ₹${posCashTendered} is less than total ₹${grandTotal}`, 'error');
      return null;
    }

    const newOrder = storageService.createOrder({
      customerType: 'walkin',
      customerId: posCustomer?.id,
      customerName: posCustomer?.name || 'Walk-in Customer',
      customerPhone: posCustomer?.phone || '9999999999',
      customerGstin: posCustomer?.gstin,
      items: posCart,
      subtotal,
      gstTotal: 0,
      cgstTotal: 0,
      sgstTotal: 0,
      deliveryFee: 0,
      discountAmount: posDiscount,
      grandTotal,
      paymentMethod: posPaymentMethod,
      paymentStatus: 'paid',
      orderStatus: 'delivered',
      createdBy: 'pos_cashier'
    });

    const invoice = storageService.generateInvoiceData(newOrder);
    setActiveInvoice(invoice);

    showToast(`POS Sale Complete! Invoice #${newOrder.invoiceNumber}`, 'success');
    clearPosCart();
    refreshData();
    return newOrder;
  };

  const placeOnlineOrder = (customerData: {
    name: string;
    phone: string;
    address: string;
    pincode: string;
    paymentMethod: PaymentMethod;
    notes?: string;
  }): Order | null => {
    if (cart.length === 0) {
      showToast('Cart is empty', 'error');
      return null;
    }

    const newOrder = storageService.createOrder({
      customerType: 'online',
      customerName: customerData.name,
      customerPhone: customerData.phone,
      deliveryAddress: customerData.address,
      pincode: customerData.pincode,
      items: cart,
      subtotal: cartSubtotal,
      gstTotal: cartGstTotal,
      cgstTotal: cartGstTotal / 2,
      sgstTotal: cartGstTotal / 2,
      deliveryFee: cartDeliveryFee,
      discountAmount: couponDiscount,
      couponCode: appliedCoupon?.code,
      grandTotal: cartGrandTotal,
      paymentMethod: customerData.paymentMethod,
      paymentStatus: customerData.paymentMethod === 'upi' ? 'pending_verification' : (customerData.paymentMethod === 'cash' ? 'pending' : 'paid'),
      orderStatus: customerData.paymentMethod === 'upi' ? 'pending_verification' : 'placed',
      notes: customerData.notes,
      createdBy: 'customer'
    });

    const invoice = storageService.generateInvoiceData(newOrder);
    setActiveInvoice(invoice);

    showToast(`Order Placed Successfully! Order #${newOrder.orderNumber}`, 'success');
    clearCart();
    refreshData();
    return newOrder;
  };

  // CRUD Handlers
  const addProduct = (p: Product) => {
    storageService.addProduct(p);
    showToast('Product added successfully', 'success');
    refreshData();
  };

  const updateProduct = (p: Product) => {
    storageService.updateProduct(p);
    showToast('Product updated successfully', 'success');
    refreshData();
  };

  const deleteProduct = (id: string) => {
    storageService.deleteProduct(id);
    showToast('Product deleted', 'info');
    refreshData();
  };

  const duplicateProduct = (id: string) => {
    const res = storageService.duplicateProduct(id);
    if (res) {
      showToast(`Duplicated product: ${res.name}`, 'success');
      refreshData();
    }
  };

  const bulkUpdateProducts = (productIds: string[], updates: Partial<Product>) => {
    storageService.bulkUpdateProducts(productIds, updates);
    showToast(`Updated ${productIds.length} products`, 'success');
    refreshData();
  };

  const bulkDeleteProducts = (productIds: string[]) => {
    storageService.bulkDeleteProducts(productIds);
    showToast(`Deleted ${productIds.length} products`, 'info');
    refreshData();
  };

  const importProducts = (imported: Product[]) => {
    const res = storageService.importProducts(imported);
    showToast(`Import finished: ${res.added} added, ${res.updated} updated`, 'success');
    refreshData();
  };

  const addCategory = (cat: Category) => {
    storageService.addCategory(cat);
    showToast('Category added', 'success');
    refreshData();
  };

  const deleteCategory = (id: string) => {
    storageService.deleteCategory(id);
    showToast('Category removed', 'info');
    refreshData();
  };

  const addBrand = (brand: import('../types/store').Brand) => {
    storageService.addBrand(brand);
    showToast('Brand added', 'success');
    refreshData();
  };

  const deleteBrand = (id: string) => {
    storageService.deleteBrand(id);
    showToast('Brand removed', 'info');
    refreshData();
  };

  const addExpense = (exp: Expense) => {
    storageService.addExpense(exp);
    showToast('Expense recorded', 'success');
    refreshData();
  };

  const addSupplier = (s: Supplier) => {
    const suppliersList = storageService.getSuppliers();
    storageService.saveSuppliers([s, ...suppliersList]);
    showToast('Supplier added', 'success');
    refreshData();
  };

  const addCustomer = (c: Customer) => {
    storageService.addCustomer(c);
    showToast('Customer account created', 'success');
    refreshData();
  };

  const addEmployee = (emp: import('../types/store').Employee) => {
    storageService.addEmployee(emp);
    showToast(`Employee ${emp.name} added`, 'success');
    refreshData();
  };

  const updateEmployee = (emp: import('../types/store').Employee) => {
    storageService.updateEmployee(emp);
    showToast(`Employee ${emp.name} updated`, 'success');
    refreshData();
  };

  const deleteEmployee = (id: string) => {
    storageService.deleteEmployee(id);
    showToast('Employee removed', 'info');
    refreshData();
  };

  const addSavedAddress = (addr: import('../types/store').SavedAddress) => {
    storageService.addAddress(addr);
    showToast('Address saved', 'success');
    refreshData();
  };

  const deleteSavedAddress = (id: string) => {
    storageService.deleteAddress(id);
    showToast('Address deleted', 'info');
    refreshData();
  };

  const addStockAdjustment = (adj: Omit<import('../types/store').StockAdjustment, 'id' | 'date'>) => {
    storageService.addStockAdjustment(adj);
    showToast('Stock adjustment logged & inventory updated', 'success');
    refreshData();
  };

  const createPurchaseOrder = (po: Omit<import('../types/store').PurchaseOrder, 'id' | 'poNumber' | 'orderDate' | 'status'>) => {
    const newPo = storageService.createPurchaseOrder(po);
    showToast(`Purchase Order ${newPo.poNumber} Created`, 'success');
    refreshData();
  };

  const receivePurchaseOrder = (poId: string) => {
    storageService.receivePurchaseOrder(poId);
    showToast('Purchase Order Received & Stock Inwarded!', 'success');
    refreshData();
  };

  const addReview = (rev: Omit<import('../types/store').Review, 'id' | 'date'>) => {
    storageService.addReview(rev);
    showToast('Thank you for your product review!', 'success');
    refreshData();
  };

  const markNotificationRead = (id: string) => {
    storageService.markNotificationRead(id);
    refreshData();
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    storageService.updateOrderStatus(orderId, status);
    showToast(`Order status updated to ${status.replace('_', ' ')}`, 'success');
    refreshData();
  };

  const approvePayment = (orderId: string) => {
    const updated = storageService.approvePayment(orderId);
    if (updated) {
      showToast(`Payment Approved for Order #${updated.orderNumber}! Status moved to Preparing.`, 'success');
      refreshData();
    }
    return updated;
  };

  const rejectPayment = (orderId: string) => {
    const updated = storageService.rejectPayment(orderId);
    if (updated) {
      showToast(`Payment Rejected for Order #${updated.orderNumber}.`, 'error');
      refreshData();
    }
    return updated;
  };

  return (
    <StoreContext.Provider value={{
      viewMode, setViewMode,
      adminTab, setAdminTab,
      authUser, isAuthModalOpen, setIsAuthModalOpen, loginAdmin, logoutAdmin,
      customerUser, isCustomerAuthModalOpen, setIsCustomerAuthModalOpen,
      customerAuthMode, setCustomerAuthMode,
      loginCustomer, registerCustomer, logoutCustomer,
      updateCustomerProfile, forgotCustomerPassword, resetCustomerPassword,
      products, categories, brands, suppliers, customers, employees, orders, expenses, coupons,
      notifications, savedAddresses, purchaseOrders, stockAdjustments, reviews, stats, refreshData,
      isCustomerProfileOpen, setIsCustomerProfileOpen,
      activeStaticModal, setActiveStaticModal,
      selectedProductDetail, setSelectedProductDetail,
      searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
      cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      appliedCoupon, couponDiscount, applyCouponCode, removeCoupon,
      cartSubtotal, cartGstTotal, cartGrandTotal, cartDeliveryFee,
      wishlist, toggleWishlist,
      posCart, addToPosCart, removeFromPosCart, updatePosQuantity, clearPosCart,
      posCustomer, setPosCustomer,
      posPaymentMethod, setPosPaymentMethod,
      posCashTendered, setPosCashTendered,
      posDiscount, setPosDiscount,
      processPosSale,
      activeInvoice, setActiveInvoice,
      toasts, showToast,
      addProduct, updateProduct, deleteProduct,
      duplicateProduct, bulkUpdateProducts, bulkDeleteProducts, importProducts,
      addCategory, deleteCategory, addBrand, deleteBrand,
      addExpense, addSupplier, addCustomer,
      addEmployee, updateEmployee, deleteEmployee,
      addSavedAddress, deleteSavedAddress,
      addStockAdjustment, createPurchaseOrder, receivePurchaseOrder,
      addReview, markNotificationRead,
      updateOrderStatus, approvePayment, rejectPayment, placeOnlineOrder
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
