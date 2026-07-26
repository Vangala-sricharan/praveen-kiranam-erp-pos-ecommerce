/**
 * Praveen Kiranam and General Stores - Header Navigation
 */
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, ShoppingCart, Heart, Search, MapPin, User, Shield, Lock, LogOut,
  PhoneCall, Monitor, Calculator, LayoutDashboard, Clock, Menu, X, Tag, Info, Phone
} from 'lucide-react';
import { STORE_DETAILS } from '../data/initialData';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart, onOpenWishlist, onOpenOrders }) => {
  const { 
    viewMode, setViewMode, 
    cart, wishlist, orders, products, setSelectedProductDetail,
    searchQuery, setSearchQuery, 
    categories, selectedCategory, setSelectedCategory,
    authUser, setIsAuthModalOpen, logoutAdmin,
    customerUser, setIsCustomerAuthModalOpen, setCustomerAuthMode,
    setIsCustomerProfileOpen, setActiveStaticModal
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#0f172a] text-white border-b border-slate-800 shadow-md">
      {/* Top Banner Bar */}
      <div className="bg-emerald-950/90 text-emerald-100 text-[11px] py-1.5 px-4 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
              🟢 Serving Manakondur Since 2001
            </span>
            <span className="flex items-center gap-1.5 font-medium text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              🚚 Express 15-Min Delivery Across Manakondur & Karimnagar
            </span>
          </div>

          <div className="flex items-center gap-3 text-emerald-200">
            <span className="hidden sm:inline font-mono text-[11px] text-slate-300">GSTIN: {STORE_DETAILS.gstin}</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            
            {/* Customer Navigation Links */}
            <button onClick={() => setActiveStaticModal('about')} className="hover:text-white transition hidden sm:inline">About Us</button>
            <button onClick={() => setActiveStaticModal('contact')} className="hover:text-white transition hidden sm:inline">Contact Store</button>

            <span className="text-slate-700 hidden sm:inline">|</span>

            {/* Profile / Customer Auth Button */}
            {customerUser ? (
              <button 
                onClick={() => setIsCustomerProfileOpen(true)} 
                className="hover:text-amber-400 transition font-bold flex items-center gap-1.5 bg-emerald-900/60 hover:bg-emerald-800 px-2.5 py-0.5 rounded text-[11px] border border-emerald-700/50"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Hi, {customerUser.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button 
                onClick={() => { setCustomerAuthMode('login'); setIsCustomerAuthModalOpen(true); }} 
                className="hover:text-amber-400 transition font-bold flex items-center gap-1.5 bg-emerald-900/60 hover:bg-emerald-800 px-2.5 py-0.5 rounded text-[11px] border border-emerald-700/50"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Sign In / Register</span>
              </button>
            )}

            {/* Staff / Admin Login Indicator */}
            {authUser ? (
              <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700 text-slate-200 text-[11px]">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">{authUser.name.split(' ')[0]}</span>
                <span className="text-[10px] px-1 bg-emerald-500/20 text-emerald-300 rounded uppercase font-bold">{authUser.role.replace('_', ' ')}</span>
                <button onClick={logoutAdmin} className="text-slate-400 hover:text-rose-400 ml-1" title="Logout">
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)} 
                className="hover:text-amber-400 transition font-bold flex items-center gap-1 text-slate-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded text-[11px] border border-slate-700"
              >
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Store Logo & Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div 
            onClick={() => setViewMode('online_store')} 
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm border border-emerald-500 group-hover:scale-105 transition-transform">
              PK
            </div>
            <div>
              <h1 className="text-base md:text-lg font-black text-white tracking-tight leading-none group-hover:text-amber-400 transition">
                PRAVEEN KIRANAM
              </h1>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                <span>& GENERAL STORES</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-amber-400 font-semibold text-[10px] lowercase capitalize">Manakondur</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar with Autocomplete Dropdown */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
          <div className="relative w-full flex items-center">
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="bg-white text-gray-900 text-xs font-semibold px-3 py-2 rounded-l-lg border-y border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search 500+ items by Name, Brand, Category, Barcode, SKU..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 text-xs pl-3 pr-9 py-2 rounded-r-lg border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 font-medium"
            />
            <Search className="w-4 h-4 text-slate-500 absolute right-3 pointer-events-none" />
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 p-3 space-y-3 max-h-80 overflow-y-auto">
              {searchQuery.trim().length > 0 ? (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between">
                    <span>Matching Products</span>
                    <span>500+ Item Database</span>
                  </div>
                  {products
                    .filter(p => {
                      const q = searchQuery.toLowerCase();
                      const v = p.weightVariants[0];
                      return p.name.toLowerCase().includes(q) ||
                        p.brand.toLowerCase().includes(q) ||
                        p.category.toLowerCase().includes(q) ||
                        (v && v.sku.toLowerCase().includes(q)) ||
                        (v && v.barcode.includes(q));
                    })
                    .slice(0, 5)
                    .map(p => {
                      const v = p.weightVariants[0];
                      return (
                        <div
                          key={p.id}
                          onClick={() => {
                            setSelectedProductDetail(p);
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition"
                        >
                          <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-white truncate">{p.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{p.brand} • {p.category} • SKU: {v?.sku}</div>
                          </div>
                          <div className="text-xs font-bold text-emerald-400 shrink-0">
                            ₹{v?.sellingPrice}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    🔥 Popular Grocery Searches
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Aashirvaad Atta', 'Freedom Sunflower Oil', 'Sonamasuri Rice', 'Amul Butter', 'Parle-G', 'Surf Excel', 'Maggi', 'Dairy Milk', 'Colgate'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSearchQuery(tag);
                          setIsSearchFocused(false);
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-700 transition"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mode Switchers & Action Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* View Mode Selector - Only visible to authenticated Staff/Admin or via explicit Staff button */}
          {authUser ? (
            <div className="hidden sm:flex bg-slate-800/80 p-1 rounded-lg border border-slate-700/80">
              <button
                onClick={() => setViewMode('online_store')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition ${
                  viewMode === 'online_store'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </button>

              <button
                onClick={() => setViewMode('pos_billing')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition ${
                  viewMode === 'pos_billing'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>POS Terminal</span>
              </button>

              <button
                onClick={() => setViewMode('erp_admin')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition ${
                  viewMode === 'erp_admin'
                    ? 'bg-emerald-700 text-white shadow-sm border-l-2 border-amber-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                <span>ERP Admin</span>
              </button>
            </div>
          ) : (
            /* Discrete Staff Access Button for non-admin view */
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 px-2.5 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold transition"
              title="Staff & Admin Portal Access"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Staff Portal</span>
            </button>
          )}

          {/* Customer Navigation Icons */}
          {/* Orders Button */}
          <button
            onClick={() => {
              if (customerUser) {
                setIsCustomerProfileOpen(true);
              } else {
                setCustomerAuthMode('login');
                setIsCustomerAuthModalOpen(true);
              }
            }}
            className="hidden sm:flex items-center gap-1 p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-xs font-bold transition"
            title="My Orders History"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Orders</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg relative transition"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 text-rose-400" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Customer Cart Button - Restored & Always Visible */}
          <button
            onClick={onOpenCart}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl flex items-center gap-2 font-black text-xs shadow-md transition active:scale-95 border border-emerald-500/50 cursor-pointer"
            title="Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-amber-300" />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs border border-amber-500">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="inline font-extrabold">Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full flex items-center">
          <input
            type="text"
            placeholder="Search Kiranam products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 text-sm px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white p-4 border-t border-slate-800 flex flex-col gap-3 animate-fade-in">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Switch View Mode</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { setViewMode('online_store'); setMobileMenuOpen(false); }}
              className={`p-2 rounded-lg text-xs font-bold text-center ${viewMode === 'online_store' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              Storefront
            </button>
            <button
              onClick={() => { setViewMode('pos_billing'); setMobileMenuOpen(false); }}
              className={`p-2 rounded-lg text-xs font-bold text-center ${viewMode === 'pos_billing' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              POS Billing
            </button>
            <button
              onClick={() => { setViewMode('erp_admin'); setMobileMenuOpen(false); }}
              className={`p-2 rounded-lg text-xs font-bold text-center ${viewMode === 'erp_admin' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              ERP Admin
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-300">
            <span>Customer Helpline: {STORE_DETAILS.phone}</span>
            <span>Telangana GSTIN</span>
          </div>
        </div>
      )}
    </header>
  );
};
