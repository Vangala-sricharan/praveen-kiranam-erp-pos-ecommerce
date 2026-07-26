import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, User, Mail, Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2, KeyRound, Sparkles } from 'lucide-react';

export const CustomerAuthModal: React.FC = () => {
  const { 
    isCustomerAuthModalOpen, setIsCustomerAuthModalOpen, 
    customerAuthMode, setCustomerAuthMode,
    loginCustomer, registerCustomer,
    forgotCustomerPassword, resetCustomerPassword 
  } = useStore();

  // Login Form
  const [loginIdentifier, setLoginIdentifier] = useState('srinivas@praveenkiranam.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Forgot / Reset Form
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isCustomerAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) return;
    loginCustomer(loginIdentifier, loginPassword);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      alert('Passwords do not match');
      return;
    }
    registerCustomer({
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword
    });
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotIdentifier) return;
    forgotCustomerPassword(forgotIdentifier);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    resetCustomerPassword(forgotIdentifier || loginIdentifier, newPassword);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden text-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
              PK
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {customerAuthMode === 'login' && 'Customer Portal Login'}
                {customerAuthMode === 'register' && 'Create Customer Account'}
                {customerAuthMode === 'forgot' && 'Forgot Password'}
                {customerAuthMode === 'reset' && 'Reset Your Password'}
              </h3>
              <p className="text-[11px] text-slate-400">Praveen Kiranam & General Stores</p>
            </div>
          </div>

          <button
            onClick={() => setIsCustomerAuthModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">

          {/* LOGIN MODE */}
          {customerAuthMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Email or Mobile Number</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={e => setLoginIdentifier(e.target.value)}
                    placeholder="srinivas@praveenkiranam.com or 9849011223"
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 pl-9 pr-3 py-2.5 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-300 font-medium">Password</label>
                  <button
                    type="button"
                    onClick={() => setCustomerAuthMode('forgot')}
                    className="text-emerald-400 hover:underline text-[11px]"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 pl-9 pr-3 py-2.5 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-0"
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transition active:scale-98 text-xs flex items-center justify-center gap-2"
              >
                <span>Sign In to My Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-3 border-t border-slate-800 text-center text-[11px] text-slate-400">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setCustomerAuthMode('register')}
                  className="text-emerald-400 font-bold hover:underline"
                >
                  Create Account
                </button>
              </div>
            </form>
          )}

          {/* REGISTER MODE */}
          {customerAuthMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="e.g. Kavitha Reddy"
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 pl-9 pr-3 py-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="kavitha@example.com"
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 pl-9 pr-3 py-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">10-Digit Mobile Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 pl-9 pr-3 py-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Confirm *</label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={e => setRegConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Get ₹50 Welcome Cash Credit + 100 Kiranam Loyalty Points instantly upon signup!</span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-lg transition active:scale-98 text-xs"
              >
                Create Account & Join
              </button>

              <div className="pt-2 border-t border-slate-800 text-center text-[11px] text-slate-400">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => setCustomerAuthMode('login')}
                  className="text-emerald-400 font-bold hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* FORGOT MODE */}
          {customerAuthMode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
              <p className="text-slate-400 text-[11px]">
                Enter your registered Email address or Phone number to receive a 6-digit password reset OTP link.
              </p>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Email or Mobile Number</label>
                <input
                  type="text"
                  required
                  value={forgotIdentifier}
                  onChange={e => setForgotIdentifier(e.target.value)}
                  placeholder="e.g. srinivas@praveenkiranam.com"
                  className="w-full bg-slate-950 border border-slate-800 px-3 py-2.5 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-lg transition text-xs"
              >
                Send Reset Verification
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setCustomerAuthMode('login')}
                  className="text-slate-400 hover:text-white text-[11px]"
                >
                  ← Back to Login
                </button>
              </div>
            </form>
          )}

          {/* RESET MODE */}
          {customerAuthMode === 'reset' && (
            <form onSubmit={handleResetSubmit} className="space-y-3 text-xs">
              <p className="text-emerald-400 font-medium text-[11px]">
                Verification code sent! Enter OTP and set your new password below.
              </p>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Verification OTP Code</label>
                <input
                  type="text"
                  required
                  placeholder="123456"
                  value={resetOtp}
                  onChange={e => setResetOtp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white text-center font-mono tracking-widest text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl shadow-lg transition text-xs"
              >
                Update Password & Login
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
