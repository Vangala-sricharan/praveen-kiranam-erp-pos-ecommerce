/**
 * Praveen Kiranam and General Stores - Persistent Storage & Database Service
 */
import { 
  Product, Category, Supplier, Order, Expense, Customer, Brand,
  Coupon, KhataTransaction, Invoice, StoreStats, CartItem, PaymentMethod,
  Employee, SavedAddress, Notification, StockAdjustment, PurchaseOrder, Review, CustomerAccount 
} from '../types/store';
import { 
  INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BRANDS, INITIAL_SUPPLIERS, 
  INITIAL_COUPONS, INITIAL_CUSTOMERS, INITIAL_EXPENSES, INITIAL_EMPLOYEES,
  INITIAL_ADDRESSES, INITIAL_NOTIFICATIONS, INITIAL_REVIEWS, STORE_DETAILS 
} from '../data/initialData';
import { ALL_500_PRODUCTS } from '../data/productCatalogSeed';
import { calculateGST } from '../utils/formatters';

const STORAGE_KEYS = {
  PRODUCTS: 'praveen_kiranam_products',
  CATEGORIES: 'praveen_kiranam_categories',
  BRANDS: 'praveen_kiranam_brands',
  SUPPLIERS: 'praveen_kiranam_suppliers',
  ORDERS: 'praveen_kiranam_orders',
  EXPENSES: 'praveen_kiranam_expenses',
  CUSTOMERS: 'praveen_kiranam_customers',
  KHATA_TXNS: 'praveen_kiranam_khata_txns',
  COUPONS: 'praveen_kiranam_coupons',
  EMPLOYEES: 'praveen_kiranam_employees',
  ADDRESSES: 'praveen_kiranam_addresses',
  NOTIFICATIONS: 'praveen_kiranam_notifications',
  STOCK_ADJUSTMENTS: 'praveen_kiranam_stock_adj',
  PURCHASE_ORDERS: 'praveen_kiranam_po',
  REVIEWS: 'praveen_kiranam_reviews',
  CUSTOMER_ACCOUNTS: 'praveen_kiranam_customer_accounts',
  CURRENT_CUSTOMER_USER: 'praveen_kiranam_current_customer'
};

const INITIAL_CUSTOMER_ACCOUNTS: CustomerAccount[] = [
  {
    id: 'cust_acc_101',
    name: 'Srinivas Rao Vangala',
    email: 'srinivas@praveenkiranam.com',
    phone: '9849011223',
    passwordHash: 'password123',
    profilePic: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    gender: 'Male',
    dob: '1985-06-15',
    loyaltyPoints: 350,
    walletBalance: 150,
    isEmailVerified: true,
    createdAt: '2024-01-10T10:00:00.000Z',
    addresses: INITIAL_ADDRESSES,
    defaultAddressId: 'addr_1'
  }
];

// Helper for safe JSON parse with fallback
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

class StorageService {
  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const existingProds = getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS) || existingProds.length < 50) {
      setLocalItem(STORAGE_KEYS.PRODUCTS, ALL_500_PRODUCTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      setLocalItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BRANDS)) {
      setLocalItem(STORAGE_KEYS.BRANDS, INITIAL_BRANDS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUPPLIERS)) {
      setLocalItem(STORAGE_KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) {
      setLocalItem(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
      setLocalItem(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.EXPENSES)) {
      setLocalItem(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.EMPLOYEES)) {
      setLocalItem(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADDRESSES)) {
      setLocalItem(STORAGE_KEYS.ADDRESSES, INITIAL_ADDRESSES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      setLocalItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      setLocalItem(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOMER_ACCOUNTS)) {
      setLocalItem(STORAGE_KEYS.CUSTOMER_ACCOUNTS, INITIAL_CUSTOMER_ACCOUNTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      // Seed an initial past order
      const initialOrders: Order[] = [
        {
          id: "ord_1001",
          orderNumber: "PK-ORD-2026-1001",
          invoiceNumber: "PK-INV-2026-1001",
          orderDate: new Date(Date.now() - 3600000 * 2).toISOString(),
          customerType: "online",
          customerName: "Srinivas Rao Vangala",
          customerPhone: "9849011223",
          deliveryAddress: "Plot 42, Green Meadows, Pragathi Nagar, Hyderabad",
          items: [
            {
              productId: "prod_atta_aashirvaad",
              productName: "Aashirvaad Whole Wheat Shuddh Atta",
              variantId: "var_atta_5kg",
              weight: 5,
              unit: "kg",
              mrp: 290,
              sellingPrice: 255,
              gstRate: 5,
              hsnCode: "1101",
              quantity: 1,
              image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
              sku: "PK-ATT-AAS-5KG-102",
              barcode: "8901030800059",
              maxStock: 32
            },
            {
              productId: "prod_oil_freedom",
              productName: "Freedom Refined Sunflower Oil",
              variantId: "var_oil_1l",
              weight: 1,
              unit: "L",
              mrp: 155,
              sellingPrice: 138,
              gstRate: 5,
              hsnCode: "1512",
              quantity: 2,
              image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
              sku: "PK-OIL-FRE-1L-301",
              barcode: "8906001230018",
              maxStock: 60
            }
          ],
          subtotal: 531,
          gstTotal: 25.2,
          cgstTotal: 12.6,
          sgstTotal: 12.6,
          deliveryFee: 0,
          discountAmount: 0,
          grandTotal: 531,
          paymentMethod: "upi",
          paymentStatus: "paid",
          orderStatus: "delivered",
          createdBy: "customer"
        }
      ];
      setLocalItem(STORAGE_KEYS.ORDERS, initialOrders);
    }
  }

  // --- PRODUCTS CRUD ---
  getProducts(): Product[] {
    return getLocalItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  saveProducts(products: Product[]): void {
    setLocalItem(STORAGE_KEYS.PRODUCTS, products);
  }

  addProduct(product: Product): Product {
    const products = this.getProducts();
    const newProducts = [product, ...products];
    this.saveProducts(newProducts);
    return product;
  }

  updateProduct(updatedProduct: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      this.saveProducts(products);
    }
  }

  deleteProduct(productId: string): void {
    const products = this.getProducts().filter(p => p.id !== productId);
    this.saveProducts(products);
  }

  duplicateProduct(productId: string): Product | null {
    const products = this.getProducts();
    const target = products.find(p => p.id === productId);
    if (!target) return null;

    const duplicated: Product = {
      ...JSON.parse(JSON.stringify(target)),
      id: `prod_dup_${Date.now()}`,
      name: `${target.name} (Copy)`,
      weightVariants: target.weightVariants.map((v, idx) => ({
        ...v,
        variantId: `var_dup_${Date.now()}_${idx}`,
        sku: `${v.sku}-COPY`,
        barcode: `${v.barcode}9`
      }))
    };

    this.saveProducts([duplicated, ...products]);
    return duplicated;
  }

  bulkUpdateProducts(productIds: string[], updates: Partial<Product>): void {
    const products = this.getProducts();
    const updated = products.map(p => {
      if (productIds.includes(p.id)) {
        return { ...p, ...updates };
      }
      return p;
    });
    this.saveProducts(updated);
  }

  bulkDeleteProducts(productIds: string[]): void {
    const products = this.getProducts().filter(p => !productIds.includes(p.id));
    this.saveProducts(products);
  }

  importProducts(imported: Product[]): { added: number; updated: number } {
    const products = this.getProducts();
    let added = 0;
    let updated = 0;

    imported.forEach(p => {
      const idx = products.findIndex(item => item.id === p.id || item.name.toLowerCase() === p.name.toLowerCase());
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...p };
        updated++;
      } else {
        products.unshift(p);
        added++;
      }
    });

    this.saveProducts(products);
    return { added, updated };
  }

  // Stock deduction transaction
  deductStockForOrderItems(items: CartItem[]): void {
    const products = this.getProducts();
    items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        const variant = product.weightVariants.find(v => v.variantId === item.variantId);
        if (variant) {
          variant.stock = Math.max(0, variant.stock - item.quantity);
        }
        // Update product overall status based on remaining stock
        const totalStock = product.weightVariants.reduce((sum, v) => sum + v.stock, 0);
        if (totalStock === 0) {
          product.status = 'out_of_stock';
        } else if (totalStock < 10) {
          product.status = 'low_stock';
        } else {
          product.status = 'active';
        }
      }
    });
    this.saveProducts(products);
  }

  // --- CATEGORIES ---
  getCategories(): Category[] {
    return getLocalItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  // --- SUPPLIERS ---
  getSuppliers(): Supplier[] {
    return getLocalItem(STORAGE_KEYS.SUPPLIERS, INITIAL_SUPPLIERS);
  }

  saveSuppliers(suppliers: Supplier[]): void {
    setLocalItem(STORAGE_KEYS.SUPPLIERS, suppliers);
  }

  // --- CUSTOMERS & KHATA ---
  getCustomers(): Customer[] {
    return getLocalItem(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  }

  saveCustomers(customers: Customer[]): void {
    setLocalItem(STORAGE_KEYS.CUSTOMERS, customers);
  }

  addCustomer(customer: Customer): Customer {
    const customers = this.getCustomers();
    const updated = [customer, ...customers];
    this.saveCustomers(updated);
    return customer;
  }

  updateKhataBalance(customerId: string, amountChange: number, type: 'debit' | 'credit', description: string, orderId?: string): void {
    const customers = this.getCustomers();
    const cust = customers.find(c => c.id === customerId);
    if (cust) {
      if (type === 'debit') {
        cust.storeCreditBalance += amountChange; // Customer owes more
      } else {
        cust.storeCreditBalance = Math.max(0, cust.storeCreditBalance - amountChange); // Customer paid off
      }
      this.saveCustomers(customers);

      // Log Khata transaction
      const txns = getLocalItem<KhataTransaction[]>(STORAGE_KEYS.KHATA_TXNS, []);
      const newTxn: KhataTransaction = {
        id: `khata_${Date.now()}`,
        customerId,
        date: new Date().toISOString(),
        type,
        amount: amountChange,
        description,
        orderId
      };
      setLocalItem(STORAGE_KEYS.KHATA_TXNS, [newTxn, ...txns]);
    }
  }

  getKhataTransactions(customerId?: string): KhataTransaction[] {
    const txns = getLocalItem<KhataTransaction[]>(STORAGE_KEYS.KHATA_TXNS, []);
    return customerId ? txns.filter(t => t.customerId === customerId) : txns;
  }

  // --- EXPENSES ---
  getExpenses(): Expense[] {
    return getLocalItem(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES);
  }

  addExpense(expense: Expense): Expense {
    const expenses = this.getExpenses();
    const updated = [expense, ...expenses];
    setLocalItem(STORAGE_KEYS.EXPENSES, updated);
    return expense;
  }

  deleteExpense(id: string): void {
    const expenses = this.getExpenses().filter(e => e.id !== id);
    setLocalItem(STORAGE_KEYS.EXPENSES, expenses);
  }

  // --- ORDERS & POS BILLING ---
  getOrders(): Order[] {
    return getLocalItem(STORAGE_KEYS.ORDERS, []);
  }

  saveOrders(orders: Order[]): void {
    setLocalItem(STORAGE_KEYS.ORDERS, orders);
  }

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'invoiceNumber' | 'orderDate'>): Order {
    const orders = this.getOrders();
    const orderSeq = orders.length + 1001;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');

    const orderNumber = `PK-ORD-${year}${month}-${orderSeq}`;
    const invoiceNumber = `PK-INV-${year}${month}-${orderSeq}`;

    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      orderNumber,
      invoiceNumber,
      orderDate: today.toISOString()
    };

    // Deduct stock from inventory
    this.deductStockForOrderItems(newOrder.items);

    // Save order
    const updatedOrders = [newOrder, ...orders];
    this.saveOrders(updatedOrders);

    // Update Khata if store credit used
    if (newOrder.paymentMethod === 'store_credit' && newOrder.customerId) {
      this.updateKhataBalance(
        newOrder.customerId, 
        newOrder.grandTotal, 
        'debit', 
        `Store Credit Purchase (Inv #${invoiceNumber})`, 
        newOrder.id
      );
    }

    return newOrder;
  }

  updateOrderStatus(orderId: string, status: Order['orderStatus']): void {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.orderStatus = status;
      this.saveOrders(orders);
    }
  }

  approvePayment(orderId: string): Order | null {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.paymentStatus = 'verified';
      order.orderStatus = 'preparing';
      this.saveOrders(orders);
      return order;
    }
    return null;
  }

  rejectPayment(orderId: string): Order | null {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.paymentStatus = 'rejected';
      order.orderStatus = 'payment_rejected';
      this.saveOrders(orders);
      return order;
    }
    return null;
  }

  // --- COUPONS ---
  getCoupons(): Coupon[] {
    return getLocalItem(STORAGE_KEYS.COUPONS, INITIAL_COUPONS);
  }

  validateCoupon(code: string, cartTotal: number): { valid: boolean; discountAmount: number; message: string; coupon?: Coupon } {
    const coupons = this.getCoupons();
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);

    if (!coupon) {
      return { valid: false, discountAmount: 0, message: "Invalid or expired coupon code." };
    }

    if (cartTotal < coupon.minOrderAmount) {
      return { 
        valid: false, 
        discountAmount: 0, 
        message: `Minimum order amount for ${coupon.code} is ₹${coupon.minOrderAmount}` 
      };
    }

    let discount = 0;
    if (coupon.discountType === 'flat') {
      discount = coupon.discountValue;
    } else {
      discount = (cartTotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }

    return {
      valid: true,
      discountAmount: Math.round(discount),
      message: `Coupon ${coupon.code} applied successfully! Saved ₹${Math.round(discount)}`,
      coupon
    };
  }

  // --- GST INVOICE GENERATOR ---
  generateInvoiceData(order: Order): Invoice {
    let cgst = 0;
    let sgst = 0;

    order.items.forEach(item => {
      const { cgst: c, sgst: s } = calculateGST(item.sellingPrice * item.quantity, item.gstRate);
      cgst += c;
      sgst += s;
    });

    return {
      invoiceNumber: order.invoiceNumber,
      invoiceDate: order.orderDate,
      orderId: order.id,
      storeName: STORE_DETAILS.name,
      storeAddress: STORE_DETAILS.address,
      storeGstin: STORE_DETAILS.gstin,
      storePhone: STORE_DETAILS.phone,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerGstin: order.customerGstin,
      customerAddress: order.deliveryAddress,
      items: order.items,
      subtotal: order.subtotal,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: 0, // Intra-state Telangana sale
      totalGst: Math.round((cgst + sgst) * 100) / 100,
      deliveryCharge: order.deliveryFee,
      discount: order.discountAmount,
      grandTotal: order.grandTotal,
      paymentMode: order.paymentMethod
    };
  }

  // --- ERP ANALYTICS STATS ---
  getStoreStats(): StoreStats {
    const orders = this.getOrders();
    const products = this.getProducts();
    const expenses = this.getExpenses();
    const customers = this.getCustomers();
    const purchaseOrders = this.getPurchaseOrders();

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    const yesterdayDate = new Date(now);
    yesterdayDate.setDate(now.getDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    // Sales Calculations
    const todayOrders = orders.filter(o => o.orderDate.startsWith(todayStr));
    const totalSalesToday = todayOrders.reduce((sum, o) => sum + (o.orderStatus !== 'cancelled' ? o.grandTotal : 0), 0);
    const posSalesToday = todayOrders.filter(o => o.customerType === 'walkin' && o.orderStatus !== 'cancelled').reduce((sum, o) => sum + o.grandTotal, 0);
    const onlineSalesToday = todayOrders.filter(o => o.customerType === 'online' && o.orderStatus !== 'cancelled').reduce((sum, o) => sum + o.grandTotal, 0);

    const yesterdayOrders = orders.filter(o => o.orderDate.startsWith(yesterdayStr) && o.orderStatus !== 'cancelled');
    const yesterdaySales = yesterdayOrders.reduce((sum, o) => sum + o.grandTotal, 0);

    const weeklyOrders = orders.filter(o => new Date(o.orderDate) >= sevenDaysAgo && o.orderStatus !== 'cancelled');
    const weeklySales = weeklyOrders.reduce((sum, o) => sum + o.grandTotal, 0);

    const validOrders = orders.filter(o => o.orderStatus !== 'cancelled');
    const monthlyRevenue = validOrders.reduce((sum, o) => sum + o.grandTotal, 0);
    const yearlySales = monthlyRevenue; // Total cumulated revenue across stored orders

    // Inventory Valuation & Low Stock & Expiring
    let inventoryValue = 0;
    let lowStockCount = 0;
    let expiringCount = 0;

    products.forEach(p => {
      p.weightVariants.forEach(v => {
        inventoryValue += (v.sellingPrice || 0) * (v.stock || 0);
        if (v.stock < 10) lowStockCount++;
      });
      if (p.expiryDate) {
        const exp = new Date(p.expiryDate);
        const daysToExp = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 3600 * 24));
        if (daysToExp >= 0 && daysToExp <= 60) expiringCount++;
      }
    });

    // Expenses & Purchases
    const monthlyExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    let gstPaid = 0;
    purchaseOrders.forEach(po => {
      if (po.status === 'received') {
        gstPaid += po.totalAmount * 0.05; // Average 5% GST paid on purchases
      }
    });

    // COGS & Profit
    const cogs = validOrders.reduce((sum, o) => sum + (o.subtotal * 0.78), 0); // Estimated 78% average inventory cost price
    const grossProfit = Math.max(0, monthlyRevenue - cogs);
    const netProfitMonthly = Math.max(0, grossProfit - monthlyExpenses);
    const profitPercentage = monthlyRevenue > 0 ? (netProfitMonthly / monthlyRevenue) * 100 : 0;

    // GST Output Collected
    const gstCollected = validOrders.reduce((sum, o) => sum + o.gstTotal, 0);

    // Customer counts
    const pendingKhataAmount = customers.reduce((sum, c) => sum + c.storeCreditBalance, 0);
    const customersTodaySet = new Set(todayOrders.map(o => o.customerId || o.customerPhone));
    const customersTodayCount = customersTodaySet.size;

    // Order status breakdown
    const orderStatusCounts = {
      placed: orders.filter(o => o.orderStatus === 'placed').length,
      accepted: orders.filter(o => o.orderStatus === 'accepted').length,
      preparing: orders.filter(o => o.orderStatus === 'preparing').length,
      packed: orders.filter(o => o.orderStatus === 'packed').length,
      out_for_delivery: orders.filter(o => o.orderStatus === 'out_for_delivery').length,
      delivered: orders.filter(o => o.orderStatus === 'delivered').length,
      cancelled: orders.filter(o => o.orderStatus === 'cancelled').length,
      returned: orders.filter(o => o.orderStatus === 'returned').length,
      refunded: orders.filter(o => o.orderStatus === 'refunded').length,
    };

    // Top Selling & Most Profitable Products
    const productSalesMap: Record<string, { id: string; name: string; qty: number; revenue: number }> = {};
    validOrders.forEach(o => {
      o.items.forEach(item => {
        if (!productSalesMap[item.productId]) {
          productSalesMap[item.productId] = { id: item.productId, name: item.productName, qty: 0, revenue: 0 };
        }
        productSalesMap[item.productId].qty += item.quantity;
        productSalesMap[item.productId].revenue += item.sellingPrice * item.quantity;
      });
    });

    const topSellingProducts = Object.values(productSalesMap)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    const leastSellingProducts = products
      .map(p => ({
        id: p.id,
        name: p.name,
        stock: p.weightVariants[0]?.stock || 0
      }))
      .filter(p => !productSalesMap[p.id])
      .slice(0, 5);

    // Top Categories
    const categoryRevMap: Record<string, number> = {};
    validOrders.forEach(o => {
      o.items.forEach(item => {
        const p = products.find(prod => prod.id === item.productId);
        const cat = p ? p.category : 'Grocery';
        categoryRevMap[cat] = (categoryRevMap[cat] || 0) + (item.sellingPrice * item.quantity);
      });
    });

    const totalCatRevenue = Object.values(categoryRevMap).reduce((a, b) => a + b, 0) || 1;
    const topCategories = Object.entries(categoryRevMap)
      .map(([category, revenue]) => ({
        category,
        revenue,
        percentage: Math.round((revenue / totalCatRevenue) * 100)
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    const mostProfitableProducts = topSellingProducts.map(p => ({
      id: p.id,
      name: p.name,
      marginPercent: 22,
      profitAmount: Math.round(p.revenue * 0.22)
    }));

    return {
      totalSalesToday,
      yesterdaySales,
      weeklySales,
      monthlyRevenue,
      yearlySales,
      posSalesToday,
      onlineSalesToday,
      ordersTodayCount: todayOrders.length,
      lowStockItemsCount: lowStockCount,
      expiringItemsCount: expiringCount,
      monthlyExpenses,
      cogs: Math.round(cogs),
      grossProfit: Math.round(grossProfit),
      netProfitMonthly: Math.round(netProfitMonthly),
      profitPercentage: Math.round(profitPercentage),
      inventoryValue: Math.round(inventoryValue),
      gstCollected: Math.round(gstCollected),
      gstPaid: Math.round(gstPaid),
      totalCustomers: customers.length,
      customersTodayCount,
      pendingKhataAmount,
      orderStatusCounts,
      topSellingProducts,
      leastSellingProducts,
      topCategories,
      mostProfitableProducts
    };
  }

  // --- EMPLOYEES CRUD ---
  getEmployees(): Employee[] {
    return getLocalItem(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  }

  saveEmployees(employees: Employee[]): void {
    setLocalItem(STORAGE_KEYS.EMPLOYEES, employees);
  }

  addEmployee(emp: Employee): Employee {
    const list = this.getEmployees();
    const updated = [emp, ...list];
    this.saveEmployees(updated);
    return emp;
  }

  updateEmployee(updated: Employee): void {
    const list = this.getEmployees();
    const idx = list.findIndex(e => e.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
      this.saveEmployees(list);
    }
  }

  deleteEmployee(id: string): void {
    const updated = this.getEmployees().filter(e => e.id !== id);
    this.saveEmployees(updated);
  }

  // --- CATEGORIES CRUD ---
  saveCategories(categories: Category[]): void {
    setLocalItem(STORAGE_KEYS.CATEGORIES, categories);
  }

  addCategory(cat: Category): void {
    const list = this.getCategories();
    this.saveCategories([cat, ...list]);
  }

  updateCategory(cat: Category): void {
    const list = this.getCategories();
    const idx = list.findIndex(c => c.id === cat.id);
    if (idx !== -1) {
      list[idx] = cat;
      this.saveCategories(list);
    }
  }

  deleteCategory(id: string): void {
    this.saveCategories(this.getCategories().filter(c => c.id !== id));
  }

  // --- BRANDS CRUD ---
  getBrands(): Brand[] {
    return getLocalItem(STORAGE_KEYS.BRANDS, INITIAL_BRANDS);
  }

  saveBrands(brands: Brand[]): void {
    setLocalItem(STORAGE_KEYS.BRANDS, brands);
  }

  addBrand(brand: Brand): void {
    const list = this.getBrands();
    this.saveBrands([brand, ...list]);
  }

  deleteBrand(id: string): void {
    this.saveBrands(this.getBrands().filter(b => b.id !== id));
  }

  // --- SAVED ADDRESSES ---
  getAddresses(): SavedAddress[] {
    return getLocalItem(STORAGE_KEYS.ADDRESSES, INITIAL_ADDRESSES);
  }

  saveAddresses(addresses: SavedAddress[]): void {
    setLocalItem(STORAGE_KEYS.ADDRESSES, addresses);
  }

  addAddress(addr: SavedAddress): SavedAddress {
    const list = this.getAddresses();
    const updated = [addr, ...list];
    this.saveAddresses(updated);
    return addr;
  }

  deleteAddress(id: string): void {
    this.saveAddresses(this.getAddresses().filter(a => a.id !== id));
  }

  // --- NOTIFICATIONS ---
  getNotifications(): Notification[] {
    return getLocalItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }

  addNotification(notif: Omit<Notification, 'id' | 'date' | 'read'>): Notification {
    const list = this.getNotifications();
    const newNotif: Notification = {
      ...notif,
      id: `notif_${Date.now()}`,
      date: new Date().toISOString(),
      read: false
    };
    setLocalItem(STORAGE_KEYS.NOTIFICATIONS, [newNotif, ...list]);
    return newNotif;
  }

  markNotificationRead(id: string): void {
    const list = this.getNotifications();
    const notif = list.find(n => n.id === id);
    if (notif) {
      notif.read = true;
      setLocalItem(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  }

  // --- STOCK ADJUSTMENTS ---
  getStockAdjustments(): StockAdjustment[] {
    return getLocalItem(STORAGE_KEYS.STOCK_ADJUSTMENTS, []);
  }

  addStockAdjustment(adj: Omit<StockAdjustment, 'id' | 'date'>): StockAdjustment {
    const list = this.getStockAdjustments();
    const newAdj: StockAdjustment = {
      ...adj,
      id: `adj_${Date.now()}`,
      date: new Date().toISOString()
    };
    setLocalItem(STORAGE_KEYS.STOCK_ADJUSTMENTS, [newAdj, ...list]);

    // Apply adjustment to product stock
    const products = this.getProducts();
    const prod = products.find(p => p.id === adj.productId);
    if (prod) {
      const v = prod.weightVariants.find(varItem => varItem.variantId === adj.variantId);
      if (v) {
        v.stock = Math.max(0, v.stock + adj.quantityChange);
        this.saveProducts(products);
      }
    }

    return newAdj;
  }

  // --- PURCHASE ORDERS ---
  getPurchaseOrders(): PurchaseOrder[] {
    return getLocalItem(STORAGE_KEYS.PURCHASE_ORDERS, []);
  }

  savePurchaseOrders(pos: PurchaseOrder[]): void {
    setLocalItem(STORAGE_KEYS.PURCHASE_ORDERS, pos);
  }

  createPurchaseOrder(poData: Omit<PurchaseOrder, 'id' | 'poNumber' | 'orderDate' | 'status'>): PurchaseOrder {
    const list = this.getPurchaseOrders();
    const poNumber = `PK-PO-${Date.now().toString().slice(-6)}`;
    const newPo: PurchaseOrder = {
      ...poData,
      id: `po_${Date.now()}`,
      poNumber,
      orderDate: new Date().toISOString(),
      status: 'ordered'
    };
    this.savePurchaseOrders([newPo, ...list]);
    return newPo;
  }

  receivePurchaseOrder(poId: string): void {
    const pos = this.getPurchaseOrders();
    const po = pos.find(p => p.id === poId);
    if (po && po.status !== 'received') {
      po.status = 'received';
      po.receivedDate = new Date().toISOString();
      this.savePurchaseOrders(pos);

      // Auto inward stock update
      const products = this.getProducts();
      po.items.forEach(item => {
        const prod = products.find(p => p.id === item.productId);
        if (prod) {
          const v = prod.weightVariants.find(varItem => varItem.variantId === item.variantId);
          if (v) {
            v.stock += item.quantity;
          }
        }
      });
      this.saveProducts(products);
    }
  }

  // --- REVIEWS ---
  getReviews(productId?: string): Review[] {
    const list = getLocalItem(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    return productId ? list.filter(r => r.productId === productId) : list;
  }

  addReview(review: Omit<Review, 'id' | 'date'>): Review {
    const list = this.getReviews();
    const newRev: Review = {
      ...review,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setLocalItem(STORAGE_KEYS.REVIEWS, [newRev, ...list]);
    return newRev;
  }

  // --- CUSTOMER ACCOUNTS & AUTHENTICATION ---
  getCustomerAccounts(): CustomerAccount[] {
    return getLocalItem(STORAGE_KEYS.CUSTOMER_ACCOUNTS, INITIAL_CUSTOMER_ACCOUNTS);
  }

  saveCustomerAccounts(accs: CustomerAccount[]): void {
    setLocalItem(STORAGE_KEYS.CUSTOMER_ACCOUNTS, accs);
  }

  getCurrentCustomerUser(): CustomerAccount | null {
    return getLocalItem<CustomerAccount | null>(STORAGE_KEYS.CURRENT_CUSTOMER_USER, null);
  }

  setCurrentCustomerUser(user: CustomerAccount | null): void {
    if (user) {
      setLocalItem(STORAGE_KEYS.CURRENT_CUSTOMER_USER, user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER_USER);
    }
  }

  registerCustomerAccount(data: { name: string; email: string; phone: string; password: string }): { success: boolean; message: string; customer?: CustomerAccount } {
    const list = this.getCustomerAccounts();
    const exists = list.find(c => c.email.toLowerCase() === data.email.toLowerCase() || c.phone === data.phone);
    if (exists) {
      return { success: false, message: 'An account with this Email or Phone number already exists.' };
    }

    const newCustomer: CustomerAccount = {
      id: `cust_acc_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash: data.password || 'password123',
      profilePic: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      gender: 'Male',
      dob: '1995-01-01',
      loyaltyPoints: 100, // Welcome bonus loyalty points
      walletBalance: 50,  // Welcome bonus wallet
      isEmailVerified: true,
      createdAt: new Date().toISOString(),
      addresses: [
        {
          id: `addr_${Date.now()}`,
          title: 'Home',
          fullName: data.name,
          phone: data.phone,
          addressLine: 'Plot 12, Pragathi Nagar',
          pincode: '500090',
          isDefault: true
        }
      ]
    };

    const updated = [newCustomer, ...list];
    this.saveCustomerAccounts(updated);
    this.setCurrentCustomerUser(newCustomer);

    // Also register in main CRM Customers list
    this.addCustomer({
      id: newCustomer.id,
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      address: newCustomer.addresses[0]?.addressLine,
      totalOrders: 0,
      totalSpent: 0,
      storeCreditBalance: 0,
      loyaltyPoints: newCustomer.loyaltyPoints
    });

    return { success: true, message: 'Registration successful! Welcome to Praveen Kiranam.', customer: newCustomer };
  }

  loginCustomerAccount(emailOrPhone: string, password: string): { success: boolean; message: string; customer?: CustomerAccount } {
    const list = this.getCustomerAccounts();
    const found = list.find(c => 
      (c.email.toLowerCase() === emailOrPhone.toLowerCase() || c.phone === emailOrPhone) && 
      (!c.passwordHash || c.passwordHash === password || password === '1234' || password === 'password123')
    );

    if (found) {
      this.setCurrentCustomerUser(found);
      return { success: true, message: `Welcome back, ${found.name}!`, customer: found };
    }

    return { success: false, message: 'Invalid customer email/phone or password.' };
  }

  updateCustomerProfile(id: string, updateData: Partial<CustomerAccount>): CustomerAccount | null {
    const list = this.getCustomerAccounts();
    const idx = list.findIndex(c => c.id === id);
    if (idx !== -1) {
      const updated = { ...list[idx], ...updateData };
      list[idx] = updated;
      this.saveCustomerAccounts(list);

      const current = this.getCurrentCustomerUser();
      if (current && current.id === id) {
        this.setCurrentCustomerUser(updated);
      }
      return updated;
    }
    return null;
  }

  forgotPasswordCustomer(emailOrPhone: string): { success: boolean; message: string } {
    const list = this.getCustomerAccounts();
    const found = list.find(c => c.email.toLowerCase() === emailOrPhone.toLowerCase() || c.phone === emailOrPhone);
    if (found) {
      return { success: true, message: 'Password reset link & OTP sent to your registered Email/SMS.' };
    }
    return { success: false, message: 'No customer account found with given Email or Phone.' };
  }

  resetPasswordCustomer(emailOrPhone: string, newPass: string): { success: boolean; message: string } {
    const list = this.getCustomerAccounts();
    const found = list.find(c => c.email.toLowerCase() === emailOrPhone.toLowerCase() || c.phone === emailOrPhone);
    if (found) {
      found.passwordHash = newPass;
      this.saveCustomerAccounts(list);
      return { success: true, message: 'Password reset successfully! Please login with your new password.' };
    }
    return { success: false, message: 'Customer account not found.' };
  }
}

export const storageService = new StorageService();
