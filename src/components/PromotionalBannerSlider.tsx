import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Zap, Truck, ShieldCheck, Tag, ChevronLeft, ChevronRight, Gift, ArrowRight } from 'lucide-react';

export const PromotionalBannerSlider: React.FC = () => {
  const { setViewMode, setSelectedCategory } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      badge: "⚡ 30-MIN EXPRESS LOCAL DELIVERY",
      title: "Praveen Kiranam & General Stores",
      subtitle: "Fresh Groceries, Aged Sonamasuri Rice & Wholesale Oils Delivered To Your Doorstep in Hyderabad",
      offer: "Free Delivery On Orders Above ₹499",
      bgGradient: "from-emerald-950 via-slate-900 to-emerald-900",
      accentColor: "text-emerald-400",
      btnText: "Shop Daily Groceries",
      btnAction: () => setSelectedCategory(null),
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      badge: "🌾 MONTHLY FAMILY SAVER KIT",
      title: "25kg Full Ration Grocery Box",
      subtitle: "10kg HMT Rice + 5kg Aashirvaad Atta + 1L Freedom Oil + Dals & Spices Combo",
      offer: "Flat ₹500 OFF with code: FESTIVE500",
      bgGradient: "from-amber-950 via-slate-900 to-slate-950",
      accentColor: "text-amber-400",
      btnText: "View Festival Kits",
      btnAction: () => setSelectedCategory("cat_festival"),
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      badge: "🧾 LOCAL KHATA & GST BILLING",
      title: "Trusted Neighborhood Kirana Since 1998",
      subtitle: "Walk-in POS Counter, Khata Credit Ledger for Regular Neighbors & Genuine Branded Products",
      offer: "100% Genuine Brands • GST Tax Invoice Included",
      bgGradient: "from-blue-950 via-slate-900 to-indigo-950",
      accentColor: "text-blue-400",
      btnText: "Explore Todays Deals",
      btnAction: () => setSelectedCategory("cat_oils_ghee"),
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl mb-6">
      {/* Banner Slide Container */}
      <div className="relative min-h-[220px] sm:min-h-[260px] flex items-center transition-all duration-700">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-center px-6 sm:px-12 py-8 bg-gradient-to-r ${banner.bgGradient} ${
              index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 mix-blend-overlay hidden md:block">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            </div>

            <div className="max-w-xl z-20 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] font-bold text-slate-200 tracking-wide">
                <span className={banner.accentColor}>{banner.badge}</span>
              </div>

              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {banner.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-normal line-clamp-2">
                {banner.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={banner.btnAction}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-bold text-xs shadow-lg shadow-emerald-900/40 transition flex items-center gap-2 group cursor-pointer"
                >
                  <span>{banner.btnText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-2 rounded-lg">
                  {banner.offer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={() => setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentSlide(prev => (prev + 1) % banners.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-6 bg-emerald-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
