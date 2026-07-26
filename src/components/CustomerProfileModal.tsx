import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { storageService } from '../services/storageService';
import { 
  User, MapPin, Package, Heart, Tag, Bell, X, Plus, Trash2, 
  CheckCircle2, Clock, Truck, ChevronRight, Phone, Mail, Home, Building,
  Wallet, Award, Edit, Lock, LogOut, ArrowRight, ShieldCheck, Sparkles, FileText,
  ShoppingBag, CheckCircle, RefreshCw
} from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export const CustomerProfileModal: React.FC = () => {
  const { 
    isCustomerProfileOpen, setIsCustomerProfileOpen, 
    customerUser, logoutCustomer, updateCustomerProfile,
    setIsCustomerAuthModalOpen, setCustomerAuthMode,
    savedAddresses, addSavedAddress, deleteSavedAddress,
    orders, wishlist, products, addToCart, toggleWishlist,
    coupons, notifications, markNotificationRead,
    setActiveInvoice
  } = useStore();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'addresses' | 'orders' | 'wishlist' | 'coupons' | 'notifications'>('dashboard');

  // Address Form State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newTitle, setNewTitle] = useState('Home');
  const [newName, setNewName] = useState(customerUser?.name || 'Srinivas Rao Vangala');
  const [newPhone, setNewPhone] = useState(customerUser?.phone || '9849011223');
  const [newAddressLine, setNewAddressLine] = useState('');
  const [newLandmark, setNewLandmark] = useState('');
  const [newPincode, setNewPincode] = useState('500090');

  // Profile Edit State
  const [editName, setEditName] = useState(customerUser?.name || '');
  const [editPhone, setEditPhone] = useState(customerUser?.phone || '');
  const [editEmail, setEditEmail] = useState(customerUser?.email || '');
  const [editGender, setEditGender] = useState<'Male' | 'Female' | 'Other'>(customerUser?.gender || 'Male');
  const [editDob, setEditDob] = useState(customerUser?.dob || '1990-01-01');
  const [editAvatar, setEditAvatar] = useState(customerUser?.profilePic || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');

  // Change Password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passMsg, setPassMsg] = useState('');

  // Selected Order for Tracking
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'active' | 'delivered' | 'cancelled'>('all');

  if (!isCustomerProfileOpen) return null;

  const myOrders = orders.filter(o => o.customerType === 'online');
  const filteredOrders = myOrders.filter(o => {
    if (orderStatusFilter === 'active') return ['placed', 'accepted', 'preparing', 'packed', 'out_for_delivery'].includes(o.orderStatus);
    if (orderStatusFilter === 'delivered') return o.orderStatus === 'delivered';
    if (orderStatusFilter === 'cancelled') return o.orderStatus === 'cancelled';
    return true;
  });

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || myOrders[0];

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressLine.trim()) return;
    addSavedAddress({
      id: `addr_${Date.now()}`,
      title: newTitle,
      fullName: newName || customerUser?.name || 'Valued Customer',
      phone: newPhone || customerUser?.phone || '9849011223',
      addressLine: newAddressLine,
      landmark: newLandmark,
      pincode: newPincode,
      isDefault: savedAddresses.length === 0
    });
    setIsAddingAddress(false);
    setNewAddressLine('');
    setNewLandmark('');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile({
      name: editName,
      phone: editPhone,
      email: editEmail,
      gender: editGender,
      dob: editDob,
      profilePic: editAvatar
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setPassMsg('Password must be at least 4 characters long');
      return;
    }
    updateCustomerProfile({ passwordHash: newPassword });
    setPassMsg('Password changed successfully!');
    setOldPassword('');
    setNewPassword('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Delivered</span>;
      case 'out_for_delivery':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">Out For Delivery</span>;
      case 'packed':
      case 'preparing':
      case 'accepted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Processing</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">Placed</span>;
    }
  };

  const renderOrderStatusTimeline = (status: string) => {
    const steps = [
      { key: 'placed', label: 'Placed' },
      { key: 'accepted', label: 'Accepted' },
      { key: 'preparing', label: 'Packing' },
      { key: 'out_for_delivery', label: 'On Way' },
      { key: 'delivered', label: 'Delivered' }
    ];

    const currentIdx = steps.findIndex(s => s.key === status);
    const effectiveIdx = currentIdx === -1 ? (status === 'packed' ? 2 : 0) : currentIdx;

    return (
      <div className="w-full py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${(effectiveIdx / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, idx) => {
            const isDone = idx <= effectiveIdx;
            return (
              <div key={step.key} className="relative z-10 flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors ${
                  isDone 
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/50' 
                    : 'bg-slate-900 border-slate-700 text-slate-500'
                }`}>
                  {isDone ? <CheckCircle className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <span className={`text-[10px] mt-1 font-medium ${isDone ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Top Portal Banner */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src={customerUser?.profilePic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border-2 border-emerald-500/50 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white leading-tight">
                  {customerUser ? customerUser.name : 'Guest Customer Portal'}
                </h2>
                <span className="bg-amber-400/10 text-amber-400 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" /> Gold Kiranam Member
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {customerUser?.phone || '9849011223'} • {customerUser?.email || 'customer@praveenkiranam.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!customerUser ? (
              <button 
                onClick={() => { setCustomerAuthMode('login'); setIsCustomerAuthModalOpen(true); }} 
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" /> Sign In / Register
              </button>
            ) : (
              <button 
                onClick={logoutCustomer}
                className="bg-slate-800 hover:bg-rose-950 text-slate-300 hover:text-rose-400 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            )}

            <button 
              onClick={() => setIsCustomerProfileOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-slate-950/60 px-5 border-b border-slate-800 flex items-center gap-1 overflow-x-auto text-xs shrink-0">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'dashboard' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Overview & Stats
          </button>

          <button 
            onClick={() => setActiveTab('orders')} 
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'orders' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" /> My Orders ({myOrders.length})
          </button>

          <button 
            onClick={() => setActiveTab('profile')} 
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'profile' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" /> Edit Profile
          </button>

          <button 
            onClick={() => setActiveTab('addresses')} 
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'addresses' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" /> Saved Addresses ({savedAddresses.length})
          </button>

          <button 
            onClick={() => setActiveTab('wishlist')} 
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'wishlist' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
          </button>

          <button 
            onClick={() => setActiveTab('coupons')} 
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'coupons' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tag className="w-4 h-4" /> Store Coupons
          </button>

          <button 
            onClick={() => setActiveTab('notifications')} 
            className={`py-3 px-3.5 border-b-2 font-bold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'notifications' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Loyalty Points</span>
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-extrabold text-amber-400">
                    {customerUser?.loyaltyPoints || 350} Pts
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Worth {formatCurrency((customerUser?.loyaltyPoints || 350) / 10)} discount</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Wallet Balance</span>
                    <Wallet className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl font-extrabold text-emerald-400">
                    {formatCurrency(customerUser?.walletBalance || 150)}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Instant checkout credit</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Total Orders</span>
                    <Package className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {myOrders.length} Orders
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Online deliveries</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Saved Addresses</span>
                    <MapPin className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {savedAddresses.length} Addresses
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Hyderabad locations</p>
                </div>
              </div>

              {/* Active Recent Order Tracking Widget */}
              {myOrders.length > 0 && (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Latest Order Tracker</span>
                      <h4 className="text-sm font-bold text-white">{myOrders[0].orderNumber}</h4>
                    </div>
                    {getStatusBadge(myOrders[0].orderStatus)}
                  </div>

                  {renderOrderStatusTimeline(myOrders[0].orderStatus)}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-slate-300 text-[11px]">
                    <div>
                      <span>Estimated Express Delivery: </span>
                      <strong className="text-white">15-25 Mins (Pragathi Nagar)</strong>
                    </div>
                    <button 
                      onClick={() => { setSelectedOrderId(myOrders[0].id); setActiveTab('orders'); }}
                      className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                    >
                      View Full Details <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Recommended Products Quick Section */}
              <div>
                <h4 className="text-sm font-bold text-white mb-3">Recommended Kiranam Essentials For You</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {products.slice(0, 4).map(p => (
                    <div key={p.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <img src={p.image} alt={p.name} className="w-full h-24 object-contain mb-2 rounded bg-slate-900" />
                      <div>
                        <p className="text-[10px] text-emerald-400 font-semibold">{p.categoryName}</p>
                        <h5 className="font-bold text-slate-200 line-clamp-1">{p.name}</h5>
                        <p className="text-emerald-400 font-bold text-xs mt-1">
                          {formatCurrency(p.weightVariants[0]?.sellingPrice || 100)}
                        </p>
                      </div>
                      <button 
                        onClick={() => addToCart(p, p.weightVariants[0], 1)}
                        className="mt-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg transition text-[11px]"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: EDIT PROFILE */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Profile Details Form */}
              <form onSubmit={handleUpdateProfile} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" /> Personal Details
                </h3>

                <div>
                  <label className="block text-slate-400 mb-1">Avatar Profile Photo URL</label>
                  <input
                    type="text"
                    value={editAvatar}
                    onChange={e => setEditAvatar(e.target.value)}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={editPhone}
                      onChange={e => setEditPhone(e.target.value)}
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Gender</label>
                    <select
                      value={editGender}
                      onChange={e => setEditGender(e.target.value as any)}
                      className="w-full bg-white text-gray-900 border border-gray-300 px-3 py-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl transition text-xs"
                >
                  Save Profile Changes
                </button>
              </form>

              {/* Password Change Form */}
              <form onSubmit={handleChangePassword} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" /> Security & Password
                </h3>

                {passMsg && (
                  <p className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs">
                    {passMsg}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Current Password</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-xl transition text-xs"
                >
                  Update Password
                </button>
              </form>

            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Your Saved Delivery Locations</h3>
                {!isAddingAddress && (
                  <button 
                    onClick={() => setIsAddingAddress(true)} 
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add New Address
                  </button>
                )}
              </div>

              {isAddingAddress && (
                <form onSubmit={handleSaveAddress} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-emerald-400">Add New Address</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-0.5">Label</label>
                      <select 
                        value={newTitle} 
                        onChange={e => setNewTitle(e.target.value)}
                        className="w-full bg-white text-gray-900 border border-gray-300 px-2.5 py-2 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none cursor-pointer"
                      >
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-0.5">Contact Name</label>
                      <input 
                        type="text" 
                        required 
                        value={newName} 
                        onChange={e => setNewName(e.target.value)}
                        className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-2.5 py-2 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-0.5">Phone</label>
                      <input 
                        type="tel" 
                        required 
                        value={newPhone} 
                        onChange={e => setNewPhone(e.target.value)}
                        className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-2.5 py-2 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-0.5">House No, Street, Colony Address Line *</label>
                    <input 
                      type="text" 
                      required 
                      value={newAddressLine} 
                      onChange={e => setNewAddressLine(e.target.value)}
                      placeholder="e.g. Plot 42, Green Meadows, Pragathi Nagar"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-2.5 py-2 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-0.5">Landmark (Optional)</label>
                      <input 
                        type="text" 
                        value={newLandmark} 
                        onChange={e => setNewLandmark(e.target.value)}
                        placeholder="Near More Supermarket"
                        className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-2.5 py-2 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-0.5">PIN Code</label>
                      <input 
                        type="text" 
                        value={newPincode} 
                        onChange={e => setNewPincode(e.target.value)}
                        className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-2.5 py-2 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-lg">
                      Save Location
                    </button>
                    <button type="button" onClick={() => setIsAddingAddress(false)} className="text-slate-400 hover:text-white px-3 py-1.5">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedAddresses.map(a => (
                  <div key={a.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2 py-0.5 rounded text-[10px]">
                          {a.title}
                        </span>
                        {a.isDefault && (
                          <span className="bg-amber-400/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-white text-xs">{a.fullName} • {a.phone}</p>
                      <p className="text-slate-300">{a.addressLine}</p>
                      {a.landmark && <p className="text-slate-500">Landmark: {a.landmark}</p>}
                      <p className="text-slate-400">PIN: {a.pincode}</p>
                    </div>

                    <button 
                      onClick={() => deleteSavedAddress(a.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition"
                      title="Delete Address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS & TRACKING */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Filter Orders:</span>
                  {(['all', 'active', 'delivered', 'cancelled'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setOrderStatusFilter(f)}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] capitalize transition ${
                        orderStatusFilter === f ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <span className="text-slate-400">{filteredOrders.length} orders found</span>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="font-bold">No orders found</p>
                  <p className="text-[11px]">Your completed & active online orders will show up here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map(order => (
                    <div key={order.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <div>
                          <span className="font-bold text-white text-xs">{order.orderNumber}</span>
                          <span className="text-slate-500 ml-2">{formatDate(order.orderDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(order.orderStatus)}
                          <span className="font-extrabold text-emerald-400 text-sm">
                            {formatCurrency(order.grandTotal)}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="flex items-center gap-2 overflow-x-auto py-1">
                        {order.items.map(item => (
                          <div key={item.productId + item.variantId} className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800 shrink-0">
                            <img src={item.image} alt={item.productName} className="w-8 h-8 rounded object-cover" />
                            <div className="text-[11px]">
                              <p className="font-bold text-slate-200 line-clamp-1">{item.productName}</p>
                              <p className="text-slate-400">{item.weight}{item.unit} x {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Timeline if selected */}
                      {renderOrderStatusTimeline(order.orderStatus)}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px]">
                        <span className="text-slate-400">Delivery Address: {order.deliveryAddress}</span>
                        <button
                          onClick={() => setActiveInvoice(order)}
                          className="bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 font-bold px-3 py-1 rounded-lg border border-emerald-700/50 flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> View Tax Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlist.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <Heart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="font-bold">Your Wishlist is Empty</p>
                  <p className="text-[11px]">Save products you buy frequently for quick 1-click re-ordering!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {wishlist.map(prodId => {
                    const prod = products.find(p => p.id === prodId);
                    if (!prod) return null;
                    return (
                      <div key={prod.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                        <div className="relative">
                          <img src={prod.image} alt={prod.name} className="w-full h-28 object-contain mb-2 rounded bg-slate-900" />
                          <button 
                            onClick={() => toggleWishlist(prod.id)}
                            className="absolute top-1 right-1 p-1 bg-slate-900/80 rounded-full text-rose-400 hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <p className="text-[10px] text-emerald-400 font-semibold">{prod.categoryName}</p>
                          <h5 className="font-bold text-slate-200 line-clamp-1">{prod.name}</h5>
                          <p className="text-emerald-400 font-bold text-xs mt-1">
                            {formatCurrency(prod.weightVariants[0]?.sellingPrice || 100)}
                          </p>
                        </div>

                        <button 
                          onClick={() => addToCart(prod, prod.weightVariants[0], 1)}
                          className="mt-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg transition text-[11px]"
                        >
                          Move to Cart
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: STORE COUPONS */}
          {activeTab === 'coupons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {coupons.map(c => (
                <div key={c.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-extrabold px-2.5 py-1 rounded-lg text-sm">
                      {c.code}
                    </span>
                    <h5 className="font-bold text-white mt-2">{c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}</h5>
                    <p className="text-slate-400 text-[11px]">Min Order: {formatCurrency(c.minOrderValue)}</p>
                  </div>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(c.code); alert(`Coupon code ${c.code} copied!`); }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-lg border border-slate-700"
                  >
                    Copy Code
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-2">
              {notifications.map(n => (
                <div 
                  key={n.id} 
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition cursor-pointer ${
                    n.read ? 'bg-slate-950/40 border-slate-800 text-slate-400' : 'bg-slate-950 border-emerald-500/30 text-slate-200'
                  }`}
                >
                  <Bell className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-bold text-white">{n.title}</h5>
                    <p className="mt-0.5">{n.message}</p>
                    <span className="text-[10px] text-slate-500 block mt-1">{formatDate(n.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
