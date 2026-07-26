/**
 * Praveen Kiranam - Hero Banner & Promotional Cards
 */
import React from 'react';
import { STORE_DETAILS } from '../data/initialData';
import { Truck, ShieldCheck, Gift, Clock, Sparkles, ArrowRight, Zap, BadgePercent } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, setAdminTab, setViewMode } = useStore();

  return (
    <div className="space-y-6">
      {/* Main Hero Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white p-6 md:p-10 overflow-hidden shadow-xl border border-emerald-800">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>SUPER FAST 15-MINUTE KIRANAM DELIVERY</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Fresh Groceries & Monthly Ration <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-200">
                Delivered Right to Your Doorstep
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl font-normal leading-relaxed">
              Order fresh Aashirvaad Atta, Sonamasuri Rice, Freedom Sunflower Oil, Pure Amul Ghee, Fresh Dairy, and Household necessities directly from Manakondur's trusted neighborhood kiranam store.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSelectedCategory('cat_festival')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition active:scale-95 flex items-center gap-2"
              >
                <Gift className="w-4 h-4" />
                <span>Shop Monthly Ration Kits</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('pos_billing')}
                className="bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-700 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Store Counter POS</span>
              </button>
            </div>
          </div>

          {/* Right Promotional Feature Card */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-white shadow-2xl relative">
              <div className="absolute -top-3 right-4 bg-amber-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                Festive Special
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl">
                  25KG
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-300">Family Saver Pack</h4>
                  <p className="text-xs text-slate-300">10kg Rice + 5kg Atta + 1L Oil + Dals</p>
                </div>
              </div>

              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Special Kiranam Price</div>
                  <div className="text-xl font-black text-amber-400">₹2,499</div>
                </div>
                <div className="text-right">
                  <div className="text-emerald-400 font-bold text-[11px]">Save ₹500</div>
                  <div className="text-slate-400 line-through text-[10px]">MRP ₹2,999</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Quick Value Prop Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">15-Min Express Delivery</h4>
            <p className="text-[11px] text-slate-500">Manakondur & Karimnagar</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
            <BadgePercent className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Best Kiranam Wholesale Rates</h4>
            <p className="text-[11px] text-slate-500">Guaranteed lowest MRP discounts daily</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">FSSAI & GST Certified</h4>
            <p className="text-[11px] text-slate-500">Official GST Bill with HSN codes</p>
          </div>
        </div>
      </div>
    </div>
  );
};
