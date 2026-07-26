/**
 * Praveen Kiranam - POS Counter Billing System
 */
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import { getValidProductImage, handleImageError } from '../utils/imageUtils';
import { Product, PaymentMethod, Customer } from '../types/store';
import { 
  Calculator, Scan, Search, Plus, Minus, Trash2, 
  User, Phone, Banknote, QrCode, CreditCard, ShieldCheck, 
  Printer, CheckCircle2, RotateCcw, Sparkles 
} from 'lucide-react';

export const POSBillingView: React.FC = () => {
  const { 
    products, categories, customers,
    posCart, addToPosCart, removeFromPosCart, updatePosQuantity, clearPosCart,
    posCustomer, setPosCustomer,
    posPaymentMethod, setPosPaymentMethod,
    posCashTendered, setPosCashTendered,
    posDiscount, setPosDiscount,
    processPosSale, setActiveInvoice
  } = useStore();

  const [barcodeQuery, setBarcodeQuery] = useState('');
  const [customerSearchPhone, setCustomerSearchPhone] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<import('../types/store').Order | null>(null);

  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const handleCompletePosSale = () => {
    const order = processPosSale();
    if (order) {
      setCompletedOrder(order);
    }
  };

  const handleStartNewSale = () => {
    setCompletedOrder(null);
    clearPosCart();
    setCustomerSearchPhone('');
    barcodeInputRef.current?.focus();
  };

  useEffect(() => {
    // Auto-focus barcode input for quick scanning
    barcodeInputRef.current?.focus();
  }, []);

  // Filter products for quick selection
  const filteredProducts = products.filter(p => {
    const matchesCat = !selectedCategoryFilter || p.category === selectedCategoryFilter;
    const matchesSearch = !barcodeQuery || 
      p.name.toLowerCase().includes(barcodeQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(barcodeQuery.toLowerCase()) ||
      p.weightVariants.some(v => v.sku.toLowerCase().includes(barcodeQuery.toLowerCase()) || v.barcode.includes(barcodeQuery));
    return matchesCat && matchesSearch;
  });

  // Handle Barcode or SKU Scanner Enter
  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeQuery.trim()) return;

    // Search product by barcode or SKU
    const foundProduct = products.find(p => 
      p.weightVariants.some(v => v.barcode === barcodeQuery.trim() || v.sku.toUpperCase() === barcodeQuery.trim().toUpperCase())
    );

    if (foundProduct) {
      const matchingVariant = foundProduct.weightVariants.find(
        v => v.barcode === barcodeQuery.trim() || v.sku.toUpperCase() === barcodeQuery.trim().toUpperCase()
      );
      addToPosCart(foundProduct, matchingVariant?.variantId, 1);
      setBarcodeQuery('');
    } else {
      // Fallback: match by title if only 1 match
      const titleMatches = products.filter(p => p.name.toLowerCase().includes(barcodeQuery.toLowerCase()));
      if (titleMatches.length === 1) {
        addToPosCart(titleMatches[0], undefined, 1);
        setBarcodeQuery('');
      }
    }
  };

  // Handle Customer Phone Lookup
  const handleCustomerPhoneSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomerSearchPhone(val);

    const foundCust = customers.find(c => c.phone.includes(val) || c.name.toLowerCase().includes(val.toLowerCase()));
    if (foundCust) {
      setPosCustomer(foundCust);
    } else {
      setPosCustomer(null);
    }
  };

  // Totals Calculation
  const subtotal = posCart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
  const totalMrp = posCart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const totalSavings = Math.max(0, totalMrp - subtotal + posDiscount);
  const grandTotal = Math.max(0, subtotal - posDiscount);
  const changeToReturn = Math.max(0, posCashTendered - grandTotal);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="bg-emerald-950 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-md border border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">Counter POS Billing Terminal</h2>
            <p className="text-xs text-emerald-200">
              Praveen Kiranam Walk-In Customer Invoicing & Barcode Scanner
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearPosCart}
            className="bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" /> Reset Counter
          </button>
        </div>
      </div>

      {/* Main Grid: Left Products Grid + Right Live Bill */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Barcode Reader & Quick Item Selector (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Barcode & Search Input */}
          <form onSubmit={handleBarcodeSubmit} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Scan className="w-4 h-4 text-emerald-700" />
              Scan Barcode / SKU / Enter Item Name:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  ref={barcodeInputRef}
                  type="text"
                  placeholder="Scan EAN Barcode (e.g. 8901030800059) or search Atta, Rice, Milk..."
                  value={barcodeQuery}
                  onChange={(e) => setBarcodeQuery(e.target.value)}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
              <button
                type="submit"
                className="bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-emerald-900 transition shrink-0"
              >
                Add Item
              </button>
            </div>
          </form>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategoryFilter(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                selectedCategoryFilter === null ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              All Items
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategoryFilter(c.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedCategoryFilter === c.name ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Products Grid for Fast Touch Entry */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredProducts.map(p => {
              const defaultVar = p.weightVariants[0];
              return (
                <div
                  key={p.id}
                  onClick={() => addToPosCart(p, defaultVar.variantId, 1)}
                  className="bg-white p-3 rounded-2xl border border-slate-200 hover:border-emerald-600 hover:shadow-md cursor-pointer transition flex flex-col justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={getValidProductImage(p.images[0], p.category)}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, p.category)}
                      className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold text-emerald-700 uppercase">{p.brand}</div>
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700">
                        {p.name}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">{defaultVar.weight}{defaultVar.unit}</span>
                    <span className="font-black text-slate-900">{formatINR(defaultVar.sellingPrice)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Bill, Customer Phone Lookup, Cash Payment (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between space-y-4">
          <div>
            {/* Customer Search / Khata Lookup Header */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                <span>Customer Mobile / Khata Account</span>
                <span className="text-emerald-700 font-bold">Walk-In</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Enter 10-digit mobile number..."
                  value={customerSearchPhone}
                  onChange={handleCustomerPhoneSearch}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 pl-8 pr-3 py-1.5 text-xs rounded-lg font-mono focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                />
              </div>

              {posCustomer && (
                <div className="mt-2 p-2 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-medium border border-emerald-300 flex justify-between items-center">
                  <div>
                    <span className="font-bold">{posCustomer.name}</span>
                    <span className="text-[10px] text-emerald-700 ml-2">Khata Balance: {formatINR(posCustomer.storeCreditBalance)}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-800 text-amber-300 px-2 py-0.5 rounded font-bold">Matched</span>
                </div>
              )}
            </div>

            {/* Live Cart Items Table */}
            <div className="mt-4 max-h-[220px] overflow-y-auto space-y-2 pr-1">
              {posCart.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs font-medium">
                  Scan barcode or click products to add to live counter bill
                </div>
              ) : (
                posCart.map(item => (
                  <div key={`${item.productId}_${item.variantId}`} className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2 text-xs">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 truncate">{item.productName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {item.weight}{item.unit} x {item.quantity} @ {formatINR(item.sellingPrice)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">{formatINR(item.sellingPrice * item.quantity)}</span>
                      <div className="flex items-center bg-white border border-slate-300 rounded-md overflow-hidden">
                        <button onClick={() => updatePosQuantity(item.productId, item.variantId, item.quantity - 1)} className="p-0.5 hover:bg-slate-100">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold px-1.5 text-[11px]">{item.quantity}</span>
                        <button onClick={() => updatePosQuantity(item.productId, item.variantId, item.quantity + 1)} className="p-0.5 hover:bg-slate-100">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => removeFromPosCart(item.productId, item.variantId)} className="text-slate-400 hover:text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment & Change Calculator Section */}
          <div className="pt-3 border-t border-slate-200 space-y-3">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-4 gap-1.5">
              <button
                onClick={() => setPosPaymentMethod('cash')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                  posPaymentMethod === 'cash' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Banknote className="w-4 h-4 text-amber-300" />
                Cash
              </button>
              <button
                onClick={() => setPosPaymentMethod('upi')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                  posPaymentMethod === 'upi' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <QrCode className="w-4 h-4 text-amber-300" />
                UPI QR
              </button>
              <button
                onClick={() => setPosPaymentMethod('card')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                  posPaymentMethod === 'card' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-300" />
                Card
              </button>
              <button
                onClick={() => setPosPaymentMethod('store_credit')}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                  posPaymentMethod === 'store_credit' ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Khata
              </button>
            </div>

            {/* Live POS Dynamic UPI QR Card */}
            {posPaymentMethod === 'upi' && (
              <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3 shadow-md animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300">
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>POS UPI Payment QR</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    Exact Amount ₹
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white p-1 rounded-xl shrink-0 border border-slate-200">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(`upi://pay?pa=8520981574@ybl&pn=${encodeURIComponent('PRAVEEN KIRANAM & GENERAL STORES')}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent('POS Bill Sale')}`)}`}
                      alt="POS UPI QR"
                      className="w-24 h-24 object-contain"
                    />
                  </div>

                  <div className="space-y-1 text-[11px] font-mono min-w-0 flex-1">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Merchant Name</span>
                      <span className="font-bold text-white text-[11px] truncate block">PRAVEEN KIRANAM & GENERAL STORES</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">UPI ID</span>
                      <span className="font-bold text-emerald-400 text-xs font-mono">8520981574@ybl</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Pay Amount</span>
                      <span className="font-black text-amber-300 text-sm font-mono">{formatINR(grandTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Cash Tendered Buttons if Cash */}
            {posPaymentMethod === 'cash' && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Cash Tendered:</span>
                  <input
                    type="number"
                    value={posCashTendered || ''}
                    onChange={(e) => setPosCashTendered(Number(e.target.value))}
                    placeholder="e.g. 500"
                    className="w-28 bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-2 py-1 text-right text-xs rounded font-mono font-bold focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>

                <div className="flex gap-1.5">
                  {[100, 200, 500, 2000].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setPosCashTendered(amt)}
                      className="flex-1 bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 font-bold text-[11px] py-1 rounded-lg transition"
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>

                {posCashTendered > 0 && (
                  <div className="flex justify-between items-center text-xs font-bold pt-1 border-t border-slate-200">
                    <span className="text-slate-600">Change to Return:</span>
                    <span className="text-emerald-700 font-mono text-sm">{formatINR(changeToReturn)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Bill Totals */}
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Total Items MRP:</span>
                <span className="line-through">{formatINR(totalMrp)}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-700">
                <span>Total Kiranam Savings:</span>
                <span>-{formatINR(totalSavings)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Grand Total:</span>
                <span className="text-xl text-emerald-950">{formatINR(grandTotal)}</span>
              </div>
            </div>

            {/* Complete Sale Button */}
            <button
              onClick={handleCompletePosSale}
              disabled={posCart.length === 0}
              className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-300 text-white font-black py-3.5 px-4 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Printer className="w-5 h-5 text-amber-300" />
              <span>Complete Sale & Print Tax Invoice</span>
            </button>
          </div>
        </div>
      </div>

      {/* POS Sale Completed Modal Banner */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">✓ Sale Completed Successfully</h3>
              <p className="text-xs text-slate-500 mt-1">
                Order #{completedOrder.orderNumber} • Tax Invoice #{completedOrder.invoiceNumber}
              </p>
              <div className="text-2xl font-black text-emerald-800 font-mono mt-2">
                {formatINR(completedOrder.grandTotal)}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-bold text-slate-900">{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="font-bold uppercase text-emerald-700">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-bold text-emerald-700">Inventory Updated & Invoice Saved</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={handleStartNewSale}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>New Sale</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs transition"
              >
                Download Invoice
              </button>

              <button
                onClick={() => setCompletedOrder(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-3 rounded-xl text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
