/**
 * Praveen Kiranam - Category Selection Bar
 */
import React from 'react';
import { useStore } from '../context/StoreContext';
import { LayoutGrid, Wheat, Flame, Droplet, Milk, Coffee, Cookie, Sparkles, Home, Gift } from 'lucide-react';

export const CategoryBar: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wheat': return <Wheat className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Droplet': return <Droplet className="w-4 h-4" />;
      case 'Milk': return <Milk className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'Cookie': return <Cookie className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Gift': return <Gift className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold shrink-0 transition ${
            selectedCategory === null
              ? 'bg-[#0f172a] text-white border border-slate-900 shadow-sm'
              : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5 text-amber-400" />
          <span>All Items</span>
        </button>

        {categories.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold shrink-0 transition ${
                isSelected
                  ? 'bg-emerald-700 text-white border border-emerald-800 shadow-sm'
                  : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <span className={isSelected ? 'text-amber-300' : 'text-emerald-700'}>
                {getCategoryIcon(cat.iconName)}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
