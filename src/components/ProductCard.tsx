/**
 * Praveen Kiranam - Product Card Component
 */
import React, { useState } from 'react';
import { Product, WeightVariant } from '../types/store';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import { getValidProductImage, handleImageError } from '../utils/imageUtils';
import { Plus, Minus, Heart, Eye, Check, ShoppingCart, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { cart, addToCart, updateCartQuantity, wishlist, toggleWishlist } = useStore();

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.selectedVariantId || product.weightVariants[0]?.variantId || ''
  );

  const selectedVariant: WeightVariant = 
    product.weightVariants.find(v => v.variantId === selectedVariantId) || 
    product.weightVariants[0];

  const isInWishlist = wishlist.includes(product.id);

  // Check if this variant is currently in cart
  const cartItem = cart.find(
    i => i.productId === product.id && i.variantId === selectedVariant?.variantId
  );
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;

  if (!selectedVariant) return null;

  const savings = Math.max(0, selectedVariant.mrp - selectedVariant.sellingPrice);
  const discountPercent = Math.round((savings / selectedVariant.mrp) * 100);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Card Image Container */}
      <div className="relative aspect-square bg-slate-50 p-3 flex items-center justify-center overflow-hidden">
        {/* Discount & Deal Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <span className="bg-emerald-800 text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded shadow-2xs uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
          {product.isTodayDeal && (
            <span className="bg-amber-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Deal
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-md backdrop-blur-md transition-all z-10 ${
            isInWishlist
              ? 'bg-rose-50 text-rose-600 shadow-2xs border border-rose-200'
              : 'bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white border border-slate-200/60'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={getValidProductImage(product.images[0], product.category)}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => handleImageError(e, product.category)}
          onClick={() => onOpenDetail(product)}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 cursor-pointer"
        />

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onOpenDetail(product)}
          className="absolute bottom-2 bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
        >
          <Eye className="w-3 h-3 text-amber-400" /> Quick View
        </button>
      </div>

      {/* Card Content Details */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Subcategory */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-0.5">
            {product.brand}
          </div>

          {/* Product Title in English */}
          <h3 
            onClick={() => onOpenDetail(product)}
            className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-emerald-700 transition cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Telugu Name */}
          {product.teluguName && (
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
              {product.teluguName}
            </p>
          )}

          {/* Weight Variant Selector Pills */}
          {product.weightVariants.length > 1 ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.weightVariants.map(v => (
                <button
                  key={v.variantId}
                  onClick={() => setSelectedVariantId(v.variantId)}
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition ${
                    v.variantId === selectedVariant.variantId
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {v.weight}{v.unit}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-1.5 text-[11px] font-semibold text-slate-600">
              Unit: {selectedVariant.weight} {selectedVariant.unit}
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Section */}
        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
          {/* Prices in Indian Rupees */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-black text-slate-900 font-mono">
                {formatINR(selectedVariant.sellingPrice)}
              </span>
              {selectedVariant.mrp > selectedVariant.sellingPrice && (
                <span className="text-[10px] text-slate-400 line-through font-mono">
                  {formatINR(selectedVariant.mrp)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <p className="text-[9px] font-bold text-emerald-700">
                Save {formatINR(savings)}
              </p>
            )}
          </div>

          {/* Cart Stepper or Add Button */}
          {selectedVariant.stock <= 0 ? (
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">
              Out of Stock
            </span>
          ) : currentCartQuantity > 0 ? (
            <div className="flex items-center bg-emerald-800 text-white rounded shadow-2xs overflow-hidden border border-emerald-900">
              <button
                onClick={() => updateCartQuantity(product.id, selectedVariant.variantId, currentCartQuantity - 1)}
                className="p-1 hover:bg-emerald-900 transition"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-black px-2">{currentCartQuantity}</span>
              <button
                onClick={() => updateCartQuantity(product.id, selectedVariant.variantId, currentCartQuantity + 1)}
                className="p-1 hover:bg-emerald-900 transition"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, selectedVariant.variantId, 1)}
              className="bg-emerald-50 hover:bg-emerald-800 text-emerald-800 hover:text-white border border-emerald-300 font-bold text-xs px-2.5 py-1 rounded transition-all duration-200 flex items-center gap-1 active:scale-95 shadow-2xs"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
