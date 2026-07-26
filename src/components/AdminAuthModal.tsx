import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { EmployeeRole } from '../types/store';
import { Shield, Lock, User, Key, CheckCircle, X, Sparkles } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginAdmin, authUser } = useStore();
  const [emailOrPhone, setEmailOrPhone] = useState('admin@praveenkiranam.com');
  const [pin, setPin] = useState('1234');
  const [selectedRole, setSelectedRole] = useState<EmployeeRole>('super_admin');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(emailOrPhone, pin, selectedRole);
  };

  const handleQuickRoleLogin = (role: EmployeeRole, name: string, email: string) => {
    setSelectedRole(role);
    setEmailOrPhone(email);
    setPin('1234');
    loginAdmin(email, '1234', role);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/60 rounded-xl max-w-lg w-full p-6 shadow-2xl relative text-white animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Staff & Admin Access Portal</h2>
            <p className="text-xs text-slate-400">Praveen Kiranam ERP & POS Management System</p>
          </div>
        </div>

        {/* Quick Role Selector */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Select Employee Role / Demo Quick Login
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickRoleLogin('super_admin', 'Praveen Kumar', 'admin@praveenkiranam.com')}
              className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 text-xs transition ${
                selectedRole === 'super_admin' 
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 font-semibold' 
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <div>
                <div className="font-medium">Super Admin</div>
                <div className="text-[10px] opacity-70">Full Access</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRoleLogin('manager', 'Ramesh Chandra', 'ramesh.manager@praveenkiranam.com')}
              className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 text-xs transition ${
                selectedRole === 'manager' 
                  ? 'bg-blue-500/10 border-blue-500 text-blue-300 font-semibold' 
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <div>
                <div className="font-medium">Store Manager</div>
                <div className="text-[10px] opacity-70">Stock & Orders</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRoleLogin('cashier', 'Suresh Babu', 'suresh.pos@praveenkiranam.com')}
              className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 text-xs transition ${
                selectedRole === 'cashier' 
                  ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-semibold' 
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              <div>
                <div className="font-medium">POS Cashier</div>
                <div className="text-[10px] opacity-70">Counter Sales</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickRoleLogin('delivery_boy', 'Mahesh Kumar', 'mahesh.delivery@praveenkiranam.com')}
              className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 text-xs transition ${
                selectedRole === 'delivery_boy' 
                  ? 'bg-purple-500/10 border-purple-500 text-purple-300 font-semibold' 
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <div>
                <div className="font-medium">Delivery Partner</div>
                <div className="text-[10px] opacity-70">Live Order Dispatch</div>
              </div>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              User Email / Phone Number
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={emailOrPhone}
                onChange={e => setEmailOrPhone(e.target.value)}
                required
                className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="admin@praveenkiranam.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password or Quick PIN
            </label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="password"
                value={pin}
                onChange={e => setPin(e.target.value)}
                required
                className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="1234 or admin123"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-[11px] text-emerald-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>PIN: <strong>1234</strong> or Password: <strong>admin123</strong> works for all roles!</span>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(false)}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-lg text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
            >
              <Lock className="w-4 h-4" />
              <span>Login to Portal</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
