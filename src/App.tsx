/**
 * Praveen Kiranam and General Stores - Main App Entry
 */
import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { PromotionalBannerSlider } from './components/PromotionalBannerSlider';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OnlineCheckoutModal } from './components/OnlineCheckoutModal';
import { POSBillingView } from './components/POSBillingView';
import { InvoicePrintModal } from './components/InvoicePrintModal';
import { AdminERPView } from './components/AdminERPView';
import { AdminAuthModal } from './components/AdminAuthModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { CustomerStaticPagesModal } from './components/CustomerStaticPagesModal';
import { GoogleMapsAndFooter } from './components/GoogleMapsAndFooter';
import { ToastNotification } from './components/ToastNotification';
import { Product } from './types/store';
import { formatCurrency } from './utils/formatters';
import { ShoppingBag, Sparkles, Heart, Package, CheckCircle2, ArrowRight, Filter, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Shield, Lock } from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    viewMode, setViewMode,
    products, 
    brands,
    searchQuery, 
    selectedCategory, 
    categories,
    wishlist,
    activeInvoice, 
    setActiveInvoice,
    orders,
    setSelectedProductDetail,
    authUser, setIsAuthModalOpen
  } = useStore();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Storefront Filter & Sorting States
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(20);

  // Filter products by category, search, brand, price, rating
  let filteredProducts = products.filter(p => {
    const matchesCat = !selectedCategory || p.category === categories.find(c => c.id === selectedCategory)?.name || p.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.teluguName && p.teluguName.includes(searchQuery)) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.weightVariants.some(v => v.sku.toLowerCase().includes(searchQuery.toLowerCase()) || v.barcode.includes(searchQuery));
    
    const matchesBrand = !selectedBrand || p.brand === selectedBrand;

    const mainVariant = p.weightVariants[0];
    const price = mainVariant ? mainVariant.sellingPrice : 0;

    let matchesPrice = true;
    if (priceRange === 'under100') matchesPrice = price < 100;
    else if (priceRange === '100to300') matchesPrice = price >= 100 && price <= 300;
    else if (priceRange === '300to500') matchesPrice = price >= 300 && price <= 500;
    else if (priceRange === 'above500') matchesPrice = price > 500;

    const matchesRating = ratingFilter === 0 || (p.rating || 4.5) >= ratingFilter;

    return matchesCat && matchesSearch && matchesBrand && matchesPrice && matchesRating;
  });

  // Apply Sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    const varA = a.weightVariants[0]?.sellingPrice || 0;
    const varB = b.weightVariants[0]?.sellingPrice || 0;

    if (sortBy === 'price_asc') return varA - varB;
    if (sortBy === 'price_desc') return varB - varA;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    if (sortBy === 'discount') return (b.dealDiscountPercent || 0) - (a.dealDiscountPercent || 0);
    if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
    return 0;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const todayDeals = products.filter(p => p.isTodayDeal);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-emerald-800 selection:text-amber-300">
      <div>
        {/* Navigation Header */}
        <Header 
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => {}}
          onOpenOrders={() => {}}
        />

        {/* MODE 1: ONLINE STOREFRONT */}
        {viewMode === 'online_store' && (
          <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
            
            {/* Promotional Slider Banner */}
            {!searchQuery && !selectedCategory && <PromotionalBannerSlider />}

            {/* Category Navigation Bar */}
            <CategoryBar />

            {/* Product Catalog Header & Filter Bar */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base md:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-400" />
                  <span>
                    {selectedCategory 
                      ? `${categories.find(c => c.id === selectedCategory)?.name || 'Category'} Items` 
                      : searchQuery 
                      ? `Search Results for "${searchQuery}"` 
                      : 'Complete Kiranam & Supermarket Catalog'}
                  </span>
                </h2>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                    {filteredProducts.length} Products Found
                  </span>
                </div>
              </div>

              {/* Comprehensive Filter Controls Bar */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-wrap items-center gap-2 text-xs font-semibold">
                <div className="flex items-center gap-1 text-slate-400 pr-2 border-r border-slate-800 shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Filters:</span>
                </div>

                {/* Brand Filter */}
                <select
                  value={selectedBrand}
                  onChange={(e) => { setSelectedBrand(e.target.value); setVisibleCount(20); }}
                  className="bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="">All Brands ({brands.length})</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>

                {/* Price Range Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => { setPriceRange(e.target.value); setVisibleCount(20); }}
                  className="bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="all">All Prices</option>
                  <option value="under100">Under ₹100</option>
                  <option value="100to300">₹100 - ₹300</option>
                  <option value="300to500">₹300 - ₹500</option>
                  <option value="above500">Above ₹500</option>
                </select>

                {/* Rating Filter */}
                <select
                  value={ratingFilter}
                  onChange={(e) => { setRatingFilter(Number(e.target.value)); setVisibleCount(20); }}
                  className="bg-slate-800 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-lg focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value={0}>All Ratings</option>
                  <option value={4.5}>⭐⭐⭐⭐★ 4.5 & Above</option>
                  <option value={4.0}>⭐⭐⭐⭐ 4.0 & Above</option>
                </select>

                {/* Sorting Dropdown */}
                <div className="ml-auto flex items-center gap-1 text-slate-400 pl-2 border-l border-slate-800 shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-800 text-amber-300 font-bold border border-slate-700 px-2.5 py-1 rounded-lg focus:ring-1 focus:ring-amber-400 cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Highest Discount</option>
                    <option value="alphabetical">Name (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Reset Filters button if applied */}
              {(selectedBrand || priceRange !== 'all' || ratingFilter !== 0) && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Active filters applied:</span>
                  <button
                    onClick={() => {
                      setSelectedBrand('');
                      setPriceRange('all');
                      setRatingFilter(0);
                      setSortBy('featured');
                    }}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* Grid or Empty State */}
              {displayedProducts.length === 0 ? (
                <div className="bg-slate-900/60 p-12 rounded-2xl border border-slate-800 text-center space-y-3">
                  <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                  <h3 className="text-sm font-bold text-slate-300">No matching grocery items found</h3>
                  <p className="text-xs text-slate-500">Try adjusting your category, price range, or brand filters.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {displayedProducts.map(p => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onOpenDetail={(prod) => setSelectedProductDetail(prod)}
                      />
                    ))}
                  </div>

                  {/* Pagination / Load More */}
                  {visibleCount < filteredProducts.length && (
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 25)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-emerald-900/40 transition inline-flex items-center gap-2"
                      >
                        <span>Load More Grocery Items ({filteredProducts.length - visibleCount} Remaining)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Today's Deals Carousel Section */}
            {!searchQuery && !selectedCategory && todayDeals.length > 0 && (
              <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-2xl border border-emerald-800/80 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h2 className="text-base font-bold tracking-tight">Today's Kiranam Special Festival Deals</h2>
                  </div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Limited Period Offers</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {todayDeals.map(p => {
                    const varItem = p.weightVariants[0];
                    return (
                      <div 
                        key={p.id}
                        onClick={() => setSelectedProductDetail(p)}
                        className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 hover:border-amber-400/50 cursor-pointer transition flex items-center gap-3"
                      >
                        <img src={p.images[0]} alt="" className="w-14 h-14 object-cover rounded-lg shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded uppercase">{p.dealDiscountPercent}% OFF</span>
                          <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">{p.name}</h4>
                          <div className="text-xs font-bold text-amber-300 mt-0.5">{formatCurrency(varItem.sellingPrice)} <span className="text-[10px] text-slate-500 line-through font-normal">{formatCurrency(varItem.mrp)}</span></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer & Location Map */}
            <GoogleMapsAndFooter />
          </main>
        )}

        {/* MODE 2: POS COUNTER BILLING */}
        {viewMode === 'pos_billing' && (
          authUser ? (
            <POSBillingView />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4 text-white shadow-2xl">
              <Shield className="w-12 h-12 text-amber-400 mx-auto" />
              <h2 className="text-xl font-black">POS Terminal Authorization Required</h2>
              <p className="text-xs text-slate-400">The POS Counter Billing module is restricted to authorized store cashiers and management staff.</p>
              <div className="flex gap-2 justify-center pt-2">
                <button 
                  onClick={() => setIsAuthModalOpen(true)} 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Login as Cashier / Admin</span>
                </button>
                <button 
                  onClick={() => setViewMode('online_store')} 
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )
        )}

        {/* MODE 3: ERP ADMIN DASHBOARD */}
        {viewMode === 'erp_admin' && (
          authUser ? (
            <AdminERPView />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4 text-white shadow-2xl">
              <Shield className="w-12 h-12 text-amber-400 mx-auto" />
              <h2 className="text-xl font-black">ERP Management Portal Restricted</h2>
              <p className="text-xs text-slate-400">Access to complete store financials, GST, inventory, and supplier ERP tools requires admin authentication.</p>
              <div className="flex gap-2 justify-center pt-2">
                <button 
                  onClick={() => setIsAuthModalOpen(true)} 
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Login to ERP Admin</span>
                </button>
                <button 
                  onClick={() => setViewMode('online_store')} 
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* Global Drawers & Modals */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <OnlineCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <ProductDetailModal />
      <AdminAuthModal />
      <CustomerAuthModal />
      <CustomerProfileModal />
      <CustomerStaticPagesModal />

      <InvoicePrintModal
        invoice={activeInvoice}
        onClose={() => setActiveInvoice(null)}
      />

      {/* Toast Notifications */}
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

