/**
 * Praveen Kiranam - ERP Admin Management Dashboard
 */
import React, { useState } from 'react';
import { useStore, AdminTab } from '../context/StoreContext';
import { formatINR, formatDate, generateSKU, generateBarcode } from '../utils/formatters';
import { getValidProductImage, handleImageError, CATEGORY_FALLBACK_IMAGES } from '../utils/imageUtils';
import { Product, WeightVariant, Supplier, Expense, Customer, Order, GSTPercentage } from '../types/store';
import { 
  LayoutDashboard, Package, FileSpreadsheet, ShoppingBag, 
  Truck, Banknote, BookOpen, FileText, Plus, Edit3, Trash2, 
  Search, Download, Upload, AlertTriangle, CheckCircle2, DollarSign, 
  TrendingUp, Users, ArrowUpRight, ArrowDownRight, ShieldCheck, Barcode, Printer, X,
  QrCode, MessageCircle, Clock, Check, XCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';

export const AdminERPView: React.FC = () => {
  const { 
    adminTab, setAdminTab, 
    stats, products, categories, suppliers, customers, orders, expenses,
    addProduct, updateProduct, deleteProduct, duplicateProduct,
    addExpense, addSupplier, addCustomer, updateOrderStatus,
    approvePayment, rejectPayment,
    setActiveInvoice,
    quickEditPrice, paymentVerificationTime, updatePaymentVerificationTime
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [productPage, setProductPage] = useState(1);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedPriceHistoryProduct, setSelectedPriceHistoryProduct] = useState<Product | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending_verification' | 'verified' | 'rejected'>('all');

  // Bulk Excel Import States
  const [parsedExcelRows, setParsedExcelRows] = useState<any[]>([]);
  const [importStatus, setImportStatus] = useState<string>('');

  // Add Expense State
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<Expense['category']>('Miscellaneous');

  // Khata Payment State
  const [selectedKhataCust, setSelectedKhataCust] = useState<Customer | null>(null);
  const [khataPaymentAmount, setKhataPaymentAmount] = useState('');

  // Product Form State
  const [formData, setFormData] = useState({
    name: '',
    teluguName: '',
    category: 'Atta, Rice & Grains',
    brand: 'Aashirvaad',
    description: '',
    hsnCode: '1101',
    gstRate: 5 as GSTPercentage,
    mrp: 100,
    sellingPrice: 90,
    weight: 1,
    unit: 'kg' as WeightVariant['unit'],
    stock: 50,
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'] as string[],
    newImageUrlInput: ''
  });

  // Handle Excel File Upload for Bulk Product Catalog
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        setParsedExcelRows(data);
        setImportStatus(`Successfully parsed ${data.length} records from ${file.name}`);
      } catch (err) {
        setImportStatus('Error reading Excel spreadsheet file.');
      }
    };
    reader.readAsBinaryString(file);
  };

  // Commit Parsed Excel to Database
  const commitBulkImport = () => {
    if (parsedExcelRows.length === 0) return;

    parsedExcelRows.forEach((row, idx) => {
      const weight = Number(row.Weight || 1);
      const unit = (row.Unit || 'kg') as WeightVariant['unit'];
      const mrp = Number(row.MRP || 100);
      const sellingPrice = Number(row.SellingPrice || 90);
      const stock = Number(row.Stock || 50);

      const sku = generateSKU(row.Category || 'GROCERY', row.Brand || 'GEN', `${weight}${unit}`);
      const barcode = generateBarcode();

      const newProduct: Product = {
        id: `prod_bulk_${Date.now()}_${idx}`,
        name: row.ProductName || 'Imported Product',
        teluguName: row.TeluguName || '',
        category: row.Category || 'Atta, Rice & Grains',
        brand: row.Brand || 'Generic',
        description: row.Description || 'Imported via Excel catalog',
        hsnCode: String(row.HSNCode || '1006'),
        gstRate: Number(row.GSTRate || 5) as GSTPercentage,
        selectedVariantId: `var_bulk_${idx}`,
        weightVariants: [
          {
            variantId: `var_bulk_${idx}`,
            weight,
            unit,
            mrp,
            sellingPrice,
            stock,
            sku,
            barcode
          }
        ],
        images: [row.ImageUrl || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'],
        status: 'active'
      };

      addProduct(newProduct);
    });

    setImportStatus(`Bulk imported ${parsedExcelRows.length} products successfully!`);
    setParsedExcelRows([]);
  };

  // Download Sample Excel Template
  const downloadSampleTemplate = () => {
    const templateData = [
      {
        ProductName: "Aashirvaad Whole Wheat Atta",
        TeluguName: "గోధుమ పిండి",
        Category: "Atta, Rice & Grains",
        Brand: "Aashirvaad",
        Weight: 5,
        Unit: "kg",
        MRP: 290,
        SellingPrice: 255,
        Stock: 40,
        GSTRate: 5,
        HSNCode: "1101",
        Description: "100% pure whole wheat flour",
        ImageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
      },
      {
        ProductName: "Freedom Sunflower Oil",
        TeluguName: "సన్‌ఫ్లవర్ ఆయిల్",
        Category: "Edible Oils & Ghee",
        Brand: "Freedom",
        Weight: 1,
        Unit: "L",
        MRP: 155,
        SellingPrice: 138,
        Stock: 60,
        GSTRate: 5,
        HSNCode: "1512",
        Description: "Fortified refined sunflower oil",
        ImageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "KiranamCatalog");
    XLSX.writeFile(wb, "praveen_kiranam_import_template.xlsx");
  };

  // Handle Form Submit for Single Product Add/Edit
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sku = generateSKU(formData.category, formData.brand, `${formData.weight}${formData.unit}`);
    const barcode = generateBarcode();

    const validImages = formData.images.filter(img => img && img.trim().length > 5);
    const finalImages = validImages.length > 0 
      ? validImages 
      : [getValidProductImage(null, formData.category)];

    const newProd: Product = {
      id: editingProduct ? editingProduct.id : `prod_${Date.now()}`,
      name: formData.name,
      teluguName: formData.teluguName,
      category: formData.category,
      brand: formData.brand,
      description: formData.description,
      hsnCode: formData.hsnCode,
      gstRate: formData.gstRate,
      selectedVariantId: 'var_1',
      weightVariants: [
        {
          variantId: 'var_1',
          weight: formData.weight,
          unit: formData.unit,
          mrp: formData.mrp,
          sellingPrice: formData.sellingPrice,
          stock: formData.stock,
          sku,
          barcode
        }
      ],
      images: finalImages,
      status: formData.stock > 0 ? 'active' : 'out_of_stock'
    };

    if (editingProduct) {
      updateProduct(newProd);
    } else {
      addProduct(newProd);
    }

    setIsAddProductModalOpen(false);
    setEditingProduct(null);
  };

  // Handle Record Expense
  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle || !expenseAmount) return;

    addExpense({
      id: `exp_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      category: expenseCategory,
      title: expenseTitle,
      amount: Number(expenseAmount),
      paymentMode: 'cash'
    });

    setExpenseTitle('');
    setExpenseAmount('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top ERP Header & Tab Navigation */}
      <div className="bg-[#0f172a] text-white p-4 rounded-xl shadow-lg space-y-3 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-base shadow-sm border border-emerald-500">
              ERP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight">Enterprise ERP & Inventory Suite</h2>
                <span className="bg-amber-400/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/30 uppercase tracking-widest">
                  High Density Mode
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Praveen Kiranam & General Stores - Central Operational Control Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsAddProductModalOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Single Product
            </button>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-800/80 scrollbar-none text-xs font-bold">
          {[
            { id: 'dashboard', label: 'Dashboard & P&L', icon: LayoutDashboard },
            { id: 'products', label: 'Product Catalog', icon: Package },
            { id: 'inventory', label: 'Inventory Control', icon: AlertTriangle },
            { id: 'categories', label: 'Categories', icon: BookOpen },
            { id: 'brands', label: 'Brands Catalog', icon: ShieldCheck },
            { id: 'orders', label: 'Order Management', icon: ShoppingBag },
            { id: 'payments', label: 'Payments Management', icon: QrCode },
            { id: 'customers', label: 'Customers CRM', icon: Users },
            { id: 'khata', label: 'Khata Book', icon: BookOpen },
            { id: 'suppliers', label: 'Suppliers Directory', icon: Truck },
            { id: 'purchase_orders', label: 'Purchase Orders', icon: FileText },
            { id: 'expenses', label: 'Expense Logger', icon: Banknote },
            { id: 'employees', label: 'Employees & Roles', icon: Users },
            { id: 'reports', label: 'Master Reports', icon: Download },
            { id: 'gst_reports', label: 'GST Tax Summary', icon: FileText },
            { id: 'settings', label: 'Store Settings', icon: Edit3 },
            { id: 'analytics', label: 'Analytics & Charts', icon: TrendingUp },
            { id: 'bulk_import', label: 'Bulk Excel Import', icon: FileSpreadsheet },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as AdminTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md shrink-0 transition ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                    : 'bg-slate-800/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: DASHBOARD & PROFIT/LOSS STATEMENT & ANALYTICS */}
      {adminTab === 'dashboard' && (
        <div className="space-y-5">
          {/* Sales & Financial Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 border-l-4 border-l-amber-400 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Today's Sales</div>
              <div className="text-base font-black text-slate-900 mt-1 font-mono">{formatINR(stats.totalSalesToday)}</div>
              <div className="text-[10px] text-slate-500 font-mono mt-1">POS: {formatINR(stats.posSalesToday)} | Online: {formatINR(stats.onlineSalesToday)}</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 border-l-4 border-l-blue-400 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Yesterday Sales</div>
              <div className="text-base font-black text-slate-900 mt-1 font-mono">{formatINR(stats.yesterdaySales)}</div>
              <div className="text-[10px] text-slate-500 mt-1">Previous Day Performance</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 border-l-4 border-l-purple-400 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Weekly Sales</div>
              <div className="text-base font-black text-slate-900 mt-1 font-mono">{formatINR(stats.weeklySales)}</div>
              <div className="text-[10px] text-slate-500 mt-1">Last 7 Days Rolling</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 border-l-4 border-l-emerald-500 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Monthly Sales</div>
              <div className="text-base font-black text-emerald-900 mt-1 font-mono">{formatINR(stats.monthlyRevenue)}</div>
              <div className="text-[10px] text-slate-500 mt-1">MTD Invoiced Revenue</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 border-l-4 border-l-indigo-500 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Yearly Sales</div>
              <div className="text-base font-black text-indigo-900 mt-1 font-mono">{formatINR(stats.yearlySales)}</div>
              <div className="text-[10px] text-slate-500 mt-1">Cumulated Total</div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 border-l-4 border-l-teal-500 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inventory Value</div>
              <div className="text-base font-black text-teal-900 mt-1 font-mono">{formatINR(stats.inventoryValue)}</div>
              <div className="text-[10px] text-slate-500 mt-1">Stock Selling Valuation</div>
            </div>
          </div>

          {/* Profit & Loss Statement & Order Status Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* P&L Financial Card */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-700" />
                  Profit & Loss (P&L) Financial Statement
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full font-mono">
                  Profit Margin: {stats.profitPercentage}%
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 font-medium">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span>Gross Revenue (Sales Invoices):</span>
                  <span className="font-bold font-mono text-slate-900">{formatINR(stats.monthlyRevenue)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 text-rose-700">
                  <span>Purchase Cost of Goods Sold (COGS):</span>
                  <span className="font-bold font-mono">-{formatINR(stats.cogs)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 font-bold text-slate-900">
                  <span>Gross Profit Margin:</span>
                  <span className="font-mono text-emerald-800">{formatINR(stats.grossProfit)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 text-rose-700">
                  <span>Store Operating Expenses (Rent, Salary, Power):</span>
                  <span className="font-bold font-mono">-{formatINR(stats.monthlyExpenses)}</span>
                </div>
                <div className="flex justify-between py-2.5 text-base font-black text-slate-900 pt-2 border-t-2 border-slate-900">
                  <span>NET CALCULATED PROFIT:</span>
                  <span className="text-emerald-700 font-mono text-lg">{formatINR(stats.netProfitMonthly)}</span>
                </div>
              </div>
            </div>

            {/* Order Lifecycle Counts */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                Live Order Status Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div className="p-2.5 bg-amber-50 text-amber-900 rounded-xl border border-amber-200 flex justify-between">
                  <span>Pending Placed</span>
                  <span className="font-mono">{stats.orderStatusCounts.placed}</span>
                </div>
                <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl border border-blue-200 flex justify-between">
                  <span>Accepted</span>
                  <span className="font-mono">{stats.orderStatusCounts.accepted}</span>
                </div>
                <div className="p-2.5 bg-purple-50 text-purple-900 rounded-xl border border-purple-200 flex justify-between">
                  <span>Preparing</span>
                  <span className="font-mono">{stats.orderStatusCounts.preparing}</span>
                </div>
                <div className="p-2.5 bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-200 flex justify-between">
                  <span>Packed</span>
                  <span className="font-mono">{stats.orderStatusCounts.packed}</span>
                </div>
                <div className="p-2.5 bg-sky-50 text-sky-900 rounded-xl border border-sky-200 flex justify-between">
                  <span>Out for Delivery</span>
                  <span className="font-mono">{stats.orderStatusCounts.out_for_delivery}</span>
                </div>
                <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 flex justify-between">
                  <span>Delivered</span>
                  <span className="font-mono">{stats.orderStatusCounts.delivered}</span>
                </div>
                <div className="p-2.5 bg-rose-50 text-rose-900 rounded-xl border border-rose-200 flex justify-between">
                  <span>Cancelled</span>
                  <span className="font-mono">{stats.orderStatusCounts.cancelled}</span>
                </div>
                <div className="p-2.5 bg-orange-50 text-orange-900 rounded-xl border border-orange-200 flex justify-between">
                  <span>Returned / Refunded</span>
                  <span className="font-mono">{stats.orderStatusCounts.returned + stats.orderStatusCounts.refunded}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products & Top Categories Ranking Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Top Selling Products */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Top Selling Kiranam Products
              </h3>
              <div className="space-y-2 text-xs">
                {stats.topSellingProducts.map((p, i) => (
                  <div key={p.id} className="p-2.5 bg-slate-50 rounded-xl flex justify-between items-center font-bold">
                    <span className="text-slate-800 font-semibold">{i + 1}. {p.name}</span>
                    <div className="text-right">
                      <span className="font-mono text-emerald-800">{formatINR(p.revenue)}</span>
                      <span className="text-[10px] text-slate-500 block font-normal">Qty Sold: {p.qty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Categories Breakdown */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-indigo-600" />
                Top Revenue Categories
              </h3>
              <div className="space-y-2 text-xs">
                {stats.topCategories.map((c, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-xl space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-800">{c.category}</span>
                      <span className="font-mono text-indigo-800">{formatINR(c.revenue)} ({c.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${Math.min(100, c.percentage)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT CATALOG CRUD */}
      {adminTab === 'products' && (() => {
        const filteredProds = products.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.weightVariants.some(v => v.sku.toLowerCase().includes(searchQuery.toLowerCase()) || v.barcode.includes(searchQuery))
        );
        const pageSize = 15;
        const totalPages = Math.ceil(filteredProds.length / pageSize) || 1;
        const pagedProducts = filteredProds.slice((productPage - 1) * pageSize, productPage * pageSize);

        const handleExportCatalog = () => {
          const exportData = products.map(p => {
            const v = p.weightVariants[0];
            return {
              ProductID: p.id,
              ProductName: p.name,
              TeluguName: p.teluguName || '',
              Category: p.category,
              Brand: p.brand,
              Weight: v?.weight || 0,
              Unit: v?.unit || 'kg',
              MRP: v?.mrp || 0,
              SellingPrice: v?.sellingPrice || 0,
              Stock: v?.stock || 0,
              SKU: v?.sku || '',
              Barcode: v?.barcode || '',
              GSTRate: p.gstRate,
              HSNCode: p.hsnCode
            };
          });
          const ws = XLSX.utils.json_to_sheet(exportData);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "MasterCatalog");
          XLSX.writeFile(wb, "praveen_kiranam_master_catalog.xlsx");
        };

        return (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Store Master Product Catalog ({products.length} Items)</h3>
                <p className="text-xs text-slate-500">Manage pricing, variants, barcodes, and inventory levels.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportCatalog}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" /> Export Catalog (.xlsx)
                </button>

                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search name, SKU, barcode..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setProductPage(1); }}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 pl-8 pr-3 py-1.5 text-xs rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-100 border-y border-slate-300 text-slate-700 uppercase font-bold text-[10px]">
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Brand</th>
                    <th className="py-2.5 px-3">Weight</th>
                    <th className="py-2.5 px-3">SKU / Barcode</th>
                    <th className="py-2.5 px-3">MRP (₹)</th>
                    <th className="py-2.5 px-3">Selling Price (₹) [Quick Edit]</th>
                    <th className="py-2.5 px-3">Stock</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {pagedProducts.map(p => {
                    const v = p.weightVariants[0];
                    return (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <img 
                              src={getValidProductImage(p.images[0], p.category)} 
                              alt={p.name} 
                              onError={(e) => handleImageError(e, p.category)}
                              className="w-9 h-9 object-contain rounded-lg bg-slate-50 border border-slate-200 p-0.5 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900">{p.name}</div>
                              <div className="text-[10px] text-emerald-800 font-bold">{p.teluguName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">{p.category}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-700">{p.brand}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{v?.weight}{v?.unit}</td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">
                          <div>{v?.sku}</div>
                          <div className="text-[9px] text-slate-400">{v?.barcode}</div>
                        </td>
                        <td className="py-2.5 px-3 font-mono">
                          <div className="flex items-center gap-0.5">
                            <span className="text-[10px] text-slate-400">₹</span>
                            <input
                              type="number"
                              key={`mrp_${p.id}_${v?.mrp}`}
                              defaultValue={v?.mrp || 0}
                              onBlur={(e) => {
                                const val = Number(e.target.value);
                                if (val >= 0 && val !== v?.mrp) {
                                  quickEditPrice(p.id, v?.variantId || '', v?.sellingPrice || 0, val);
                                }
                              }}
                              className="w-16 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs font-mono text-slate-500 line-through focus:border-emerald-500 focus:outline-none"
                              title="Click to quick-edit MRP"
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-black text-emerald-900">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-emerald-800 font-bold">₹</span>
                            <input
                              type="number"
                              key={`sp_${p.id}_${v?.sellingPrice}`}
                              defaultValue={v?.sellingPrice || 0}
                              onBlur={(e) => {
                                const val = Number(e.target.value);
                                if (val > 0 && val !== v?.sellingPrice) {
                                  quickEditPrice(p.id, v?.variantId || '', val, v?.mrp);
                                }
                              }}
                              className="w-20 bg-emerald-50/80 border border-emerald-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 rounded-md px-2 py-1 text-xs font-mono font-black text-emerald-900 focus:outline-none transition shadow-2xs"
                              title="Instant live price update"
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-bold">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            (v?.stock || 0) <= 5 ? 'bg-rose-100 text-rose-800 font-black' : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {v?.stock || 0} left
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right space-x-1">
                          <button
                            onClick={() => setSelectedPriceHistoryProduct(p)}
                            title="View Price History"
                            className="p-1 text-sky-700 hover:bg-sky-50 rounded inline-flex items-center gap-0.5"
                          >
                            <Clock className="w-4 h-4" />
                            {p.priceHistory && p.priceHistory.length > 0 && (
                              <span className="text-[9px] font-bold bg-sky-100 text-sky-800 px-1 rounded-full">
                                {p.priceHistory.length}
                              </span>
                            )}
                          </button>
                          <button
                            onClick={() => duplicateProduct(p.id)}
                            title="Duplicate Product"
                            className="p-1 text-slate-600 hover:bg-slate-200 rounded"
                          >
                            📋
                          </button>
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setFormData({
                                name: p.name,
                                teluguName: p.teluguName || '',
                                category: p.category,
                                brand: p.brand,
                                description: p.description,
                                hsnCode: p.hsnCode,
                                gstRate: p.gstRate,
                                mrp: v.mrp,
                                sellingPrice: v.sellingPrice,
                                weight: v.weight,
                                unit: v.unit,
                                stock: v.stock,
                                images: p.images && p.images.length > 0 ? [...p.images] : [getValidProductImage(null, p.category)],
                                newImageUrlInput: ''
                              });
                              setIsAddProductModalOpen(true);
                            }}
                            title="Edit Product"
                            className="p-1 text-emerald-700 hover:bg-emerald-50 rounded"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            title="Delete Product"
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs text-slate-600 font-semibold">
              <div>
                Showing Page {productPage} of {totalPages} ({filteredProds.length} total filtered)
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={productPage <= 1}
                  onClick={() => setProductPage(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 rounded-lg border border-slate-300 transition font-bold"
                >
                  Previous
                </button>
                <button
                  disabled={productPage >= totalPages}
                  onClick={() => setProductPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-50 rounded-lg transition font-bold"
                >
                  Next Page
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* TAB 3: BULK EXCEL IMPORT */}
      {adminTab === 'bulk_import' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-slate-900">Bulk Product Catalog Excel & CSV Import</h3>
              <p className="text-xs text-slate-500">Upload thousands of Kiranam items at once with custom weight variants, prices, and GST rates.</p>
            </div>

            <button
              onClick={downloadSampleTemplate}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition"
            >
              <Download className="w-4 h-4 text-amber-400" /> Download Sample Excel Template
            </button>
          </div>

          <div className="p-8 border-2 border-dashed border-slate-300 rounded-2xl text-center bg-slate-50 space-y-3">
            <Upload className="w-10 h-10 text-emerald-700 mx-auto" />
            <p className="text-xs font-bold text-slate-800">Select .xlsx or .csv catalog spreadsheet</p>
            <input
              type="file"
              accept=".xlsx, .xls, .csv"
              onChange={handleFileUpload}
              className="text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-800 file:text-white hover:file:bg-emerald-900 cursor-pointer"
            />
            {importStatus && <p className="text-xs font-bold text-emerald-800">{importStatus}</p>}
          </div>

          {parsedExcelRows.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Preview Parsed Items ({parsedExcelRows.length} rows):</span>
                <button
                  onClick={commitBulkImport}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-lg transition"
                >
                  Commit All Items to Store Catalog
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2">Name</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Weight</th>
                      <th className="p-2">MRP</th>
                      <th className="p-2">Selling</th>
                      <th className="p-2">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedExcelRows.map((row, idx) => (
                      <tr key={idx} className="border-t border-slate-200">
                        <td className="p-2 font-bold">{row.ProductName}</td>
                        <td className="p-2">{row.Category}</td>
                        <td className="p-2">{row.Weight}{row.Unit}</td>
                        <td className="p-2 font-mono">{formatINR(row.MRP)}</td>
                        <td className="p-2 font-mono font-bold">{formatINR(row.SellingPrice)}</td>
                        <td className="p-2 font-bold">{row.Stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ORDER MANAGEMENT */}
      {adminTab === 'orders' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-900">Customer Orders & Delivery Status Control</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-100 border-y border-slate-300 text-slate-700 uppercase font-bold text-[10px]">
                  <th className="p-2.5">Order #</th>
                  <th className="p-2.5">Date</th>
                  <th className="p-2.5">Customer</th>
                  <th className="p-2.5">Type</th>
                  <th className="p-2.5">Total</th>
                  <th className="p-2.5">Payment</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {orders.map(o => (
                  <tr key={o.id}>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                    <td className="p-2.5 font-mono">{formatDate(o.orderDate)}</td>
                    <td className="p-2.5">
                      <div className="font-bold">{o.customerName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{o.customerPhone}</div>
                    </td>
                    <td className="p-2.5 uppercase font-bold text-emerald-800">{o.customerType}</td>
                    <td className="p-2.5 font-black text-slate-900 font-mono">{formatINR(o.grandTotal)}</td>
                    <td className="p-2.5 uppercase font-bold text-xs">{o.paymentMethod}</td>
                    <td className="p-2.5">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                        className="bg-slate-100 border border-slate-300 rounded px-2 py-1 text-xs font-bold"
                      >
                        <option value="placed">Placed</option>
                        <option value="packed">Packed</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-2.5 text-right">
                      <button
                        onClick={() => {
                          const inv = {
                            invoiceNumber: o.invoiceNumber,
                            invoiceDate: o.orderDate,
                            orderId: o.id,
                            storeName: "PRAVEEN KIRANAM AND GENERAL STORES",
                            storeAddress: "H.No 4-12/1, Main Road, Pragathi Nagar, Hyderabad",
                            storeGstin: "36ABCDE1234F1Z5",
                            storePhone: "+91 98490 12345",
                            customerName: o.customerName,
                            customerPhone: o.customerPhone,
                            customerAddress: o.deliveryAddress,
                            items: o.items,
                            subtotal: o.subtotal,
                            cgst: o.cgstTotal,
                            sgst: o.sgstTotal,
                            igst: 0,
                            totalGst: o.gstTotal,
                            deliveryCharge: o.deliveryFee,
                            discount: o.discountAmount,
                            grandTotal: o.grandTotal,
                            paymentMode: o.paymentMethod
                          };
                          setActiveInvoice(inv);
                        }}
                        className="bg-slate-900 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg"
                      >
                        Tax Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SUPPLIERS & PO */}
      {adminTab === 'payments' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-700" />
                Smart UPI & Order Payments Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Verify customer UPI payment submissions, approve orders, and auto-sync ERP invoices.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-3 py-2 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                <div className="text-[10px] text-amber-800 font-bold uppercase">Pending Verification</div>
                <div className="text-sm font-black text-amber-900">
                  {orders.filter(o => o.paymentStatus === 'pending_verification').length} Orders
                </div>
              </div>

              <div className="px-3 py-2 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <div className="text-[10px] text-emerald-800 font-bold uppercase">Verified UPI Revenue</div>
                <div className="text-sm font-black text-emerald-950 font-mono">
                  {formatINR(orders.filter(o => o.paymentStatus === 'verified' || (o.paymentMethod === 'upi' && o.paymentStatus === 'paid')).reduce((s, o) => s + o.grandTotal, 0))}
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setPaymentFilter('all')}
              className={`px-4 py-2 rounded-xl transition ${
                paymentFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Payments ({orders.length})
            </button>

            <button
              onClick={() => setPaymentFilter('pending_verification')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                paymentFilter === 'pending_verification'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Pending Verification ({orders.filter(o => o.paymentStatus === 'pending_verification').length})
            </button>

            <button
              onClick={() => setPaymentFilter('verified')}
              className={`px-4 py-2 rounded-xl transition ${
                paymentFilter === 'verified'
                  ? 'bg-emerald-800 text-white shadow-md'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              Verified ({orders.filter(o => o.paymentStatus === 'verified' || o.paymentStatus === 'paid').length})
            </button>

            <button
              onClick={() => setPaymentFilter('rejected')}
              className={`px-4 py-2 rounded-xl transition ${
                paymentFilter === 'rejected'
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              Rejected ({orders.filter(o => o.paymentStatus === 'rejected' || o.orderStatus === 'payment_rejected').length})
            </button>
          </div>

          {/* Payments Table / Cards */}
          {(() => {
            const filteredOrders = orders.filter(o => {
              if (paymentFilter === 'pending_verification') return o.paymentStatus === 'pending_verification';
              if (paymentFilter === 'verified') return o.paymentStatus === 'verified' || o.paymentStatus === 'paid';
              if (paymentFilter === 'rejected') return o.paymentStatus === 'rejected' || o.orderStatus === 'payment_rejected';
              return true;
            });

            if (filteredOrders.length === 0) {
              return (
                <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <QrCode className="w-10 h-10 text-slate-400 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">No payment records found for this filter.</p>
                  <p className="text-xs text-slate-500">Orders placed by customers will automatically appear here for verification.</p>
                </div>
              );
            }

            return (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 text-white font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Order Ref & Date</th>
                      <th className="p-3">Customer Details</th>
                      <th className="p-3">Method</th>
                      <th className="p-3 text-right">Amount</th>
                      <th className="p-3">Payment Status</th>
                      <th className="p-3 text-center">ERP Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredOrders.map((ord) => {
                      const isPendingVer = ord.paymentStatus === 'pending_verification';
                      const isVerified = ord.paymentStatus === 'verified' || ord.paymentStatus === 'paid';
                      const isRejected = ord.paymentStatus === 'rejected' || ord.orderStatus === 'payment_rejected';

                      return (
                        <tr key={ord.id} className={`hover:bg-slate-50/80 transition ${isPendingVer ? 'bg-amber-50/40' : ''}`}>
                          
                          {/* Order Ref & Date */}
                          <td className="p-3">
                            <div className="font-bold text-slate-900 font-mono text-sm">#{ord.orderNumber}</div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {formatDate(ord.orderDate)}
                            </div>
                          </td>

                          {/* Customer Details */}
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{ord.customerName}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-slate-600 font-mono text-[11px]">{ord.customerPhone}</span>
                              <a
                                href={`https://wa.me/91${ord.customerPhone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-md transition"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3" />
                              </a>
                            </div>
                          </td>

                          {/* Method */}
                          <td className="p-3">
                            {ord.paymentMethod === 'upi' ? (
                              <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-900 border border-purple-200 text-[11px] font-bold px-2.5 py-1 rounded-xl">
                                <QrCode className="w-3.5 h-3.5 text-purple-700" />
                                UPI Instant
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-xl">
                                Cash On Delivery
                              </span>
                            )}
                          </td>

                          {/* Amount */}
                          <td className="p-3 text-right">
                            <div className="font-black text-sm text-slate-900 font-mono">
                              {formatINR(ord.grandTotal)}
                            </div>
                            <div className="text-[10px] text-slate-500">{ord.items.length} items</div>
                          </td>

                          {/* Payment Status Badge */}
                          <td className="p-3">
                            {isPendingVer && (
                              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                Pending Verification
                              </span>
                            )}

                            {isVerified && (
                              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                Verified & Approved
                              </span>
                            )}

                            {isRejected && (
                              <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-900 border border-rose-300 text-[11px] font-bold px-3 py-1 rounded-full">
                                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                Payment Rejected
                              </span>
                            )}

                            {!isPendingVer && !isVerified && !isRejected && (
                              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full">
                                Pending COD
                              </span>
                            )}
                          </td>

                          {/* ERP Actions */}
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              
                              {/* Approve Button */}
                              {isPendingVer && (
                                <button
                                  onClick={() => approvePayment(ord.id)}
                                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm transition active:scale-95"
                                  title="Approve Payment & Start Preparing"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Approve</span>
                                </button>
                              )}

                              {/* Reject Button */}
                              {isPendingVer && (
                                <button
                                  onClick={() => rejectPayment(ord.id)}
                                  className="bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-bold text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1 transition active:scale-95"
                                  title="Reject Payment"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>
                              )}

                              {/* Print Invoice */}
                              <button
                                onClick={() => {
                                  const inv = {
                                    invoiceNumber: ord.invoiceNumber || `INV-${ord.orderNumber}`,
                                    orderId: ord.id,
                                    orderNumber: ord.orderNumber,
                                    orderDate: ord.orderDate,
                                    customerName: ord.customerName,
                                    customerPhone: ord.customerPhone,
                                    customerAddress: ord.customerAddress,
                                    items: ord.items,
                                    subtotal: ord.subtotal,
                                    cgstTotal: ord.cgstTotal,
                                    sgstTotal: ord.sgstTotal,
                                    deliveryFee: ord.deliveryFee,
                                    discountAmount: ord.discountAmount,
                                    grandTotal: ord.grandTotal,
                                    paymentMethod: ord.paymentMethod,
                                    paymentStatus: ord.paymentStatus
                                  };
                                  setActiveInvoice(inv);
                                }}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition border border-slate-300"
                                title="Print / Download Official GST Invoice"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })()}

        </div>
      )}

      {/* TAB 5: SUPPLIERS & PO */}
      {adminTab === 'suppliers' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-900">Wholesale Grain & FMCG Supplier Directory</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suppliers.map(s => (
              <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between font-bold text-slate-900 text-sm">
                  <span>{s.companyName}</span>
                  <span className="text-emerald-800">Rating: {s.rating} ★</span>
                </div>
                <div className="text-xs text-slate-600 font-medium">Contact Person: {s.name} ({s.phone})</div>
                <div className="text-xs font-mono text-slate-500">GSTIN: {s.gstin}</div>
                <div className="text-xs font-mono font-bold text-slate-800">Total Purchases: {formatINR(s.totalPurchases)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: EXPENSE LOGGER */}
      {adminTab === 'expenses' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <h3 className="text-base font-black text-slate-900">Store Monthly Expense Logger</h3>

          <form onSubmit={handleAddExpenseSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expense Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Shop Power Bill"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 text-xs rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                placeholder="e.g. 5000"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 text-xs rounded-xl font-mono font-bold focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value as any)}
                className="w-full bg-white text-gray-900 border border-gray-300 p-2 text-xs rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none cursor-pointer"
              >
                <option value="Rent">Rent</option>
                <option value="Electricity">Electricity</option>
                <option value="Staff Salary">Staff Salary</option>
                <option value="Transportation">Transportation</option>
                <option value="Shop Maintenance">Shop Maintenance</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl hover:bg-emerald-900 transition"
              >
                Record Expense
              </button>
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-100 uppercase font-bold text-[10px] text-slate-700">
                  <th className="p-2">Date</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Title</th>
                  <th className="p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(e => (
                  <tr key={e.id} className="border-t border-slate-200 font-medium">
                    <td className="p-2 font-mono">{e.date}</td>
                    <td className="p-2 font-bold text-slate-800">{e.category}</td>
                    <td className="p-2">{e.title}</td>
                    <td className="p-2 text-right font-mono font-black text-rose-700">{formatINR(e.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: CUSTOMER KHATA BOOK */}
      {adminTab === 'khata' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-900">Regular Customer Khata (Udhaar Credit Ledger)</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {customers.map(c => (
              <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-slate-900">{c.name}</div>
                <div className="text-xs font-mono text-slate-600">{c.phone}</div>
                <div className="text-xs font-bold text-amber-700">
                  Khata Credit Owed: <span className="text-sm font-black">{formatINR(c.storeCreditBalance)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: GST TAX REPORT */}
      {adminTab === 'gst_reports' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-900">Monthly Telangana GST Tax Filing Summary</h3>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-2.5 font-mono">
            <div className="flex justify-between">
              <span>Telangana State GSTIN:</span>
              <span className="font-bold">36ABCDE1234F1Z5</span>
            </div>
            <div className="flex justify-between">
              <span>Total Taxable Sales Revenue:</span>
              <span className="font-bold">{formatINR(stats.monthlyRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span>Output CGST Collected (2.5% Avg):</span>
              <span className="font-bold text-emerald-800">{formatINR(stats.gstCollected / 2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Output SGST Collected (2.5% Avg):</span>
              <span className="font-bold text-emerald-800">{formatINR(stats.gstCollected / 2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-emerald-300">
              <span>Input Tax Credit (ITC Paid on POs):</span>
              <span className="font-bold text-amber-800">-{formatINR(stats.gstPaid)}</span>
            </div>
            <div className="flex justify-between text-sm font-black pt-2 border-t border-emerald-400 text-slate-900">
              <span>NET GST TAX PAYABLE:</span>
              <span className="text-emerald-900">{formatINR(Math.max(0, stats.gstCollected - stats.gstPaid))}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: EMPLOYEES & ROLE PERMISSIONS */}
      {adminTab === 'employees' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-slate-900">Store Employees, Roles & Permission Hierarchy</h3>
              <p className="text-xs text-slate-500">Manage store cashiers, stock managers, delivery partners, and admin access.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-100 uppercase font-bold text-[10px] text-slate-700">
                  <th className="p-2.5">EMP ID</th>
                  <th className="p-2.5">Name</th>
                  <th className="p-2.5">Phone & Email</th>
                  <th className="p-2.5">Role</th>
                  <th className="p-2.5">Salary</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {[
                  { id: 'PK-EMP-101', name: 'Praveen Vangala', phone: '+91 98490 12345', email: 'praveen@praveenkiranam.com', role: 'Super Admin', salary: 75000, status: 'Active' },
                  { id: 'PK-EMP-102', name: 'Srinivas Rao', phone: '+91 98490 11223', email: 'srinivas@praveenkiranam.com', role: 'Store Manager', salary: 45000, status: 'Active' },
                  { id: 'PK-EMP-103', name: 'Ramesh Kumar', phone: '+91 98490 33445', email: 'ramesh@praveenkiranam.com', role: 'POS Cashier', salary: 22000, status: 'Active' },
                  { id: 'PK-EMP-104', name: 'Mahesh Goud', phone: '+91 98490 55667', email: 'mahesh@praveenkiranam.com', role: 'Delivery Boy', salary: 18000, status: 'Active' }
                ].map((e, idx) => (
                  <tr key={idx}>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{e.id}</td>
                    <td className="p-2.5 font-bold">{e.name}</td>
                    <td className="p-2.5 font-mono text-[11px]">{e.phone}<br/>{e.email}</td>
                    <td className="p-2.5 font-black uppercase text-indigo-800">{e.role}</td>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{formatINR(e.salary)}</td>
                    <td className="p-2.5 font-bold text-emerald-700">{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 10: CUSTOMER CRM */}
      {adminTab === 'customers' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-900">Customer Accounts CRM & Lifetime Value (LTV)</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-100 uppercase font-bold text-[10px] text-slate-700">
                  <th className="p-2.5">Customer Name</th>
                  <th className="p-2.5">Phone</th>
                  <th className="p-2.5">Total Orders</th>
                  <th className="p-2.5">Total Spent (LTV)</th>
                  <th className="p-2.5">Khata Balance</th>
                  <th className="p-2.5">Loyalty Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {customers.map(c => (
                  <tr key={c.id}>
                    <td className="p-2.5 font-bold text-slate-900">{c.name}</td>
                    <td className="p-2.5 font-mono">{c.phone}</td>
                    <td className="p-2.5 font-mono font-bold">{c.totalOrders}</td>
                    <td className="p-2.5 font-mono font-black text-emerald-800">{formatINR(c.totalSpent)}</td>
                    <td className="p-2.5 font-mono font-bold text-amber-700">{formatINR(c.storeCreditBalance)}</td>
                    <td className="p-2.5 font-mono font-bold text-indigo-700">{c.loyaltyPoints} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 12: INVENTORY CONTROL & LOW STOCK TRACKING */}
      {adminTab === 'inventory' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-slate-900">Real-time Stock Control & Low Stock Reorder Thresholds</h3>
              <p className="text-xs text-slate-500">Monitor current physical quantities, SKU barcodes, and inventory valuation.</p>
            </div>
            <div className="bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-300">
              Low Stock Items Count: {products.filter(p => p.weightVariants.some(v => v.stock <= 10)).length}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-100 uppercase font-bold text-[10px] text-slate-700">
                  <th className="p-2.5">Product & Variant</th>
                  <th className="p-2.5">SKU / Barcode</th>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Current Stock</th>
                  <th className="p-2.5">Stock Value (MRP)</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right">Quick Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {products.flatMap(p => p.weightVariants.map(v => {
                  const stockVal = v.stock * v.mrp;
                  const isLow = v.stock <= 10;
                  return (
                    <tr key={`${p.id}_${v.variantId}`}>
                      <td className="p-2.5 font-bold text-slate-900">
                        {p.name} <span className="text-slate-500 font-normal">({v.weight}{v.unit})</span>
                      </td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-600">{v.sku} / {v.barcode}</td>
                      <td className="p-2.5 text-slate-700">{p.category}</td>
                      <td className="p-2.5 font-mono font-black text-slate-900 text-sm">{v.stock}</td>
                      <td className="p-2.5 font-mono font-bold text-emerald-800">{formatINR(stockVal)}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.stock === 0 ? 'bg-rose-100 text-rose-800' : isLow ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {v.stock === 0 ? 'Out of Stock' : isLow ? 'Low Stock Alert' : 'In Stock'}
                        </span>
                      </td>
                      <td className="p-2.5 text-right space-x-1">
                        <button
                          onClick={() => {
                            const updated = { ...p, weightVariants: p.weightVariants.map(variant => variant.variantId === v.variantId ? { ...variant, stock: variant.stock + 10 } : variant) };
                            updateProduct(updated);
                          }}
                          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-[10px] px-2 py-1 rounded-lg"
                        >
                          +10 Stock
                        </button>
                      </td>
                    </tr>
                  );
                }))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 13: CATEGORIES MANAGEMENT */}
      {adminTab === 'categories' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-slate-900">Product Categories Master Directory</h3>
              <p className="text-xs text-slate-500">Organize Kiranam department categories and regional grocery lines.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(cat => {
              const count = products.filter(p => p.category === cat.name).length;
              return (
                <div key={cat.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-xl object-cover border border-slate-300" />
                  <div>
                    <h4 className="font-black text-slate-900 text-xs">{cat.name}</h4>
                    <p className="text-[11px] font-mono text-emerald-700 font-bold">{count} Products</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 14: BRANDS CATALOG */}
      {adminTab === 'brands' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-900">FMCG Brand Directory & Origin Country</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from(new Set(products.map(p => p.brand))).map((brandName, idx) => {
              const brandProds = products.filter(p => p.brand === brandName).length;
              return (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                  <div className="font-black text-slate-900 text-sm">{brandName}</div>
                  <div className="text-xs font-mono text-emerald-800 font-bold">{brandProds} Items</div>
                  <div className="text-[10px] text-slate-500 font-mono">Verified FMCG Brand</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 15: PURCHASE ORDERS */}
      {adminTab === 'purchase_orders' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="text-base font-black text-slate-900">Inward Wholesale Purchase Orders (POs)</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-100 uppercase font-bold text-[10px] text-slate-700">
                  <th className="p-2.5">PO Number</th>
                  <th className="p-2.5">Supplier</th>
                  <th className="p-2.5">Order Date</th>
                  <th className="p-2.5">Total Amount</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {[
                  { poNo: 'PO-2025-089', supplier: 'Sri Laxmi Wholesale Grains Depot', date: '2025-02-10', total: 45000, status: 'Received' },
                  { poNo: 'PO-2025-090', supplier: 'Vijaya Dairy & Edible Oils Ltd', date: '2025-02-12', total: 28000, status: 'Received' },
                  { poNo: 'PO-2025-091', supplier: 'Heritage Foods Telangana Distributor', date: '2025-02-14', total: 18500, status: 'Pending Inward' }
                ].map((po, idx) => (
                  <tr key={idx}>
                    <td className="p-2.5 font-mono font-bold text-slate-900">{po.poNo}</td>
                    <td className="p-2.5 font-bold">{po.supplier}</td>
                    <td className="p-2.5 font-mono">{po.date}</td>
                    <td className="p-2.5 font-mono font-black text-emerald-800">{formatINR(po.total)}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${po.status === 'Received' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 16: STORE SETTINGS */}
      {adminTab === 'settings' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6 max-w-2xl">
          <h3 className="text-base font-black text-slate-900">Store Profile & Operational Configuration</h3>

          <div className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Store Name</label>
              <input type="text" defaultValue="PRAVEEN KIRANAM AND GENERAL STORES" className="w-full bg-slate-50 text-slate-900 border border-slate-300 p-2.5 rounded-xl font-bold" />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Store Address</label>
              <input type="text" defaultValue="H.No 4-12/1, Main Road, Pragathi Nagar, Hyderabad, Telangana - 500090" className="w-full bg-slate-50 text-slate-900 border border-slate-300 p-2.5 rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Telangana GSTIN</label>
                <input type="text" defaultValue="36ABCDE1234F1Z5" className="w-full bg-slate-50 text-slate-900 border border-slate-300 p-2.5 rounded-xl font-mono font-bold" />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">FSSAI License No</label>
                <input type="text" defaultValue="13621011000456" className="w-full bg-slate-50 text-slate-900 border border-slate-300 p-2.5 rounded-xl font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Contact Phone</label>
                <input type="text" defaultValue="+91 98490 12345" className="w-full bg-slate-50 text-slate-900 border border-slate-300 p-2.5 rounded-xl font-mono font-bold" />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Store UPI VPA</label>
                <input type="text" defaultValue="praveenkiranam@upi" className="w-full bg-slate-50 text-slate-900 border border-slate-300 p-2.5 rounded-xl font-mono text-emerald-800 font-bold" />
              </div>
            </div>

            <button className="bg-emerald-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs">
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* TAB 17: DYNAMIC ANALYTICS & VISUAL CHARTS */}
      {adminTab === 'analytics' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div>
            <h3 className="text-base font-black text-slate-900">Dynamic Business Analytics & Sales Trends</h3>
            <p className="text-xs text-slate-500">Live graphical data generated directly from store transactions and database history.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Revenue & Profit Breakdown Visualizer */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Revenue & Profit Breakdown</h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Monthly Sales Revenue</span>
                    <span className="font-mono text-emerald-800">{formatINR(stats.monthlyRevenue)}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Gross Margin Profit</span>
                    <span className="font-mono text-emerald-900">{formatINR(stats.profit)}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-800 h-full rounded-full" style={{ width: `${Math.min(100, (stats.profit / (stats.monthlyRevenue || 1)) * 100)}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Operating Expenses</span>
                    <span className="font-mono text-rose-700">{formatINR(stats.monthlyExpenses)}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${Math.min(100, (stats.monthlyExpenses / (stats.monthlyRevenue || 1)) * 100)}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>GST Tax Collected</span>
                    <span className="font-mono text-amber-700">{formatINR(stats.gstCollected)}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, (stats.gstCollected / (stats.monthlyRevenue || 1)) * 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Valuation & Category Share */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Top Category Sales Distribution</h4>
              <div className="space-y-3 text-xs">
                {categories.map((c, idx) => {
                  const catProds = products.filter(p => p.category === c.name);
                  const pct = Math.min(100, Math.max(15, (catProds.length / (products.length || 1)) * 100));
                  return (
                    <div key={idx}>
                      <div className="flex justify-between font-bold mb-1">
                        <span>{c.name}</span>
                        <span className="font-mono text-slate-700">{catProds.length} SKUs</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {adminTab === 'reports' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div>
            <h3 className="text-base font-black text-slate-900">Master Enterprise Reports & Export Engine</h3>
            <p className="text-xs text-slate-500">Download formatted accounting spreadsheets compatible with TallyPrime, Marg ERP, and Zoho Inventory.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Sales Register Report', desc: 'Complete itemized sales invoices with GST tax breakup.', filename: 'Sales_Register.xlsx' },
              { title: 'Purchase Register Report', desc: 'Inward PO stock bills and supplier payments ledger.', filename: 'Purchase_Register.xlsx' },
              { title: 'Inventory Valuation Report', desc: 'Current stock count, MRP, selling price, and SKU barcodes.', filename: 'Inventory_Valuation.xlsx' },
              { title: 'GST Return Summary (GSTR-1 & 3B)', desc: 'Monthly tax collected, HSN summary, and ITC claims.', filename: 'GST_Return_Summary.xlsx' },
              { title: 'Expense Analysis Report', desc: 'Category-wise shop operating overhead expenses.', filename: 'Expense_Analysis.xlsx' },
              { title: 'Customer Khata Udhaar Report', desc: 'Outstanding neighbourhood credit balance breakdown.', filename: 'Khata_Udhaar_Ledger.xlsx' }
            ].map((rep, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-900">{rep.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{rep.desc}</p>
                </div>
                <button
                  onClick={() => {
                    const ws = XLSX.utils.json_to_sheet([
                      { Metric: rep.title, Date: new Date().toISOString().split('T')[0], TotalValue: formatINR(stats.monthlyRevenue) }
                    ]);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "Report");
                    XLSX.writeFile(wb, rep.filename);
                  }}
                  className="w-full mt-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-amber-300" /> Export Excel (.xlsx)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: STORE SETTINGS & PAYMENT CONFIGURATION */}
      {adminTab === 'settings' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900">Store Settings & Payment Controls</h3>
              <p className="text-xs text-slate-500">Configure business identity, location, UPI payment options, and payment verification SLA.</p>
            </div>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
              🟢 Live Store Config
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Payment Verification Settings */}
            <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl border border-slate-700 shadow-lg space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">Payment Verification Time (SLA)</h4>
                  <p className="text-[11px] text-slate-400">Time shown to customer on the Waiting for Verification screen</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Select Estimated Verification SLA *</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['30 Seconds', '1 Minute', '2 Minutes', '5 Minutes'] as const).map(timeOpt => (
                    <button
                      key={timeOpt}
                      type="button"
                      onClick={() => updatePaymentVerificationTime(timeOpt)}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition ${
                        paymentVerificationTime === timeOpt
                          ? 'bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-400'
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <span>{timeOpt}</span>
                      {paymentVerificationTime === timeOpt && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-[11px] text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Currently active SLA: <strong className="text-amber-300">{paymentVerificationTime}</strong></span>
              </div>
            </div>

            {/* 2. Smart UPI Payment System Configuration */}
            <div className="p-5 bg-emerald-950 text-white rounded-2xl border border-emerald-800 shadow-lg space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-amber-300">Smart UPI Receiver Configuration</h4>
                  <p className="text-[11px] text-emerald-200">Dynamic QR Generator Details</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800 flex justify-between items-center">
                  <span className="text-emerald-200 font-bold">UPI VPA ID:</span>
                  <span className="font-mono font-black text-amber-300 text-sm">8520981574@ybl</span>
                </div>

                <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800 flex justify-between items-center">
                  <span className="text-emerald-200 font-bold">Merchant Name:</span>
                  <span className="font-bold text-white text-xs">PRAVEEN KIRANAM & GENERAL STORES</span>
                </div>

                <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800 flex justify-between items-center">
                  <span className="text-emerald-200 font-bold">Store Heritage Badge:</span>
                  <span className="font-bold text-emerald-300 text-xs">🟢 Serving Manakondur Since 2001</span>
                </div>
              </div>
            </div>

            {/* 3. Business Location & Identity */}
            <div className="md:col-span-2 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Business Details & Store Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Business Name</div>
                  <div className="font-black text-slate-900 mt-0.5">PRAVEEN KIRANAM & GENERAL STORES</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Store Address</div>
                  <div className="font-bold text-slate-800 mt-0.5">Manakondur, Karimnagar, Telangana - 505469</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">GSTIN / FSSAI</div>
                  <div className="font-mono font-bold text-slate-800 mt-0.5">36ABCDE1234F1Z5 / 13621011000123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRICE HISTORY MODAL */}
      {selectedPriceHistoryProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100 my-8 space-y-4">
            <button
              onClick={() => setSelectedPriceHistoryProduct(null)}
              className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-black shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">{selectedPriceHistoryProduct.name}</h3>
                <p className="text-[11px] text-slate-500">Price Change History & Audit Logs</p>
              </div>
            </div>

            {(!selectedPriceHistoryProduct.priceHistory || selectedPriceHistoryProduct.priceHistory.length === 0) ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                No price updates recorded for this product yet.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {selectedPriceHistoryProduct.priceHistory.map((rec, idx) => (
                  <div key={rec.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-rose-600 line-through">₹{rec.previousPrice}</span>
                      <span className="text-slate-400">➔</span>
                      <span className="text-emerald-800 font-mono font-black text-sm">₹{rec.newPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>Updated By: <strong>{rec.updatedBy}</strong></span>
                      <span className="font-mono">{formatDate(rec.updatedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setSelectedPriceHistoryProduct(null)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition"
            >
              Close History
            </button>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative border border-slate-100 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddProductModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-4">
              {editingProduct ? 'Edit Product Details' : 'Add New Kiranam Product'}
            </h3>

            <form onSubmit={handleProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-gray-800">Product Title (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aashirvaad Atta"
                  className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-gray-800">Telugu Title (తెలుగు పేరు)</label>
                <input
                  type="text"
                  value={formData.teluguName}
                  onChange={(e) => setFormData({ ...formData, teluguName: e.target.value })}
                  placeholder="e.g. గోధుమ పిండి"
                  className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1 text-gray-800">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white text-gray-900 border border-gray-300 p-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none cursor-pointer"
                  >
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-gray-800">Brand Name</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold mb-1 text-gray-800">Weight</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 rounded-xl font-bold focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-gray-800">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value as any })}
                    className="w-full bg-white text-gray-900 border border-gray-300 p-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none cursor-pointer"
                  >
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="L">L</option>
                    <option value="pc">pc</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1 text-gray-800">Stock Qty</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 rounded-xl font-bold focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1 text-gray-800">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 rounded-xl font-bold focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-gray-800">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: Number(e.target.value) })}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 rounded-xl font-bold text-emerald-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              {/* Product Image Management */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-800 text-xs flex items-center gap-1.5">
                    <span>Product Imagery ({formData.images.length} Images)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const categoryFallback = CATEGORY_FALLBACK_IMAGES[formData.category] || getValidProductImage(null, formData.category);
                      setFormData(prev => ({
                        ...prev,
                        images: [...prev.images, categoryFallback]
                      }));
                    }}
                    className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold underline"
                  >
                    + Add Category Default
                  </button>
                </div>

                {/* Previews Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {formData.images.map((imgUrl, index) => (
                    <div key={index} className="relative bg-white rounded-xl border border-slate-200 p-1.5 group shadow-2xs flex flex-col justify-between">
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                        <img
                          src={getValidProductImage(imgUrl, formData.category)}
                          alt={`Preview ${index + 1}`}
                          onError={(e) => handleImageError(e, formData.category)}
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute top-1 left-1 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {index === 0 ? 'Main / Thumbnail' : `Gallery #${index + 1}`}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-1 mt-1.5 pt-1 border-t border-slate-100 text-[10px]">
                        <label className="cursor-pointer text-emerald-700 font-bold hover:underline">
                          Replace
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (evt) => {
                                  const result = evt.target?.result as string;
                                  if (result) {
                                    setFormData(prev => {
                                      const updated = [...prev.images];
                                      updated[index] = result;
                                      return { ...prev, images: updated };
                                    });
                                  }
                                };
                                reader.readAsDataURL(file as Blob);
                              }
                            }}
                          />
                        </label>

                        {formData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-rose-600 font-bold hover:underline"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* File Upload / Image URL Input Controls */}
                <div className="space-y-2 pt-1">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste Image URL (https://...)"
                      value={formData.newImageUrlInput}
                      onChange={(e) => setFormData({ ...formData, newImageUrlInput: e.target.value })}
                      className="flex-1 bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 p-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.newImageUrlInput.trim()) {
                          setFormData(prev => ({
                            ...prev,
                            images: [...prev.images, prev.newImageUrlInput.trim()],
                            newImageUrlInput: ''
                          }));
                        }
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-2 rounded-xl text-xs transition shrink-0"
                    >
                      Add URL
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold py-2 px-3 rounded-xl cursor-pointer text-center transition flex items-center justify-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Local Image File(s)</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            Array.from(files).forEach(file => {
                              const reader = new FileReader();
                              reader.onload = (evt) => {
                                const result = evt.target?.result as string;
                                if (result) {
                                  setFormData(prev => ({
                                    ...prev,
                                    images: [...prev.images, result]
                                  }));
                                }
                              };
                              reader.readAsDataURL(file as Blob);
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl mt-3 shadow-lg transition"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
