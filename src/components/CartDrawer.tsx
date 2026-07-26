/**
 * Praveen Kiranam - Slide-Over Cart Drawer
 */
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onProceedToCheckout }) => {
  const { 
    cart, updateCartQuantity, removeFromCart, clearCart,
    cartSubtotal, cartGstTotal, cartGrandTotal, cartDeliveryFee,
    appliedCoupon, applyCouponCode, removeCoupon, couponDiscount 
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  if (!isOpen) return null;

  const freeDeliveryThreshold = 499;
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const deliveryProgressPercent = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput) return;
    applyCouponCode(couponCodeInput);
    setCouponCodeInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          {/* Header */}
          <div className="p-4 bg-emerald-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-black tracking-tight">Your Grocery Basket</h2>
              <span className="bg-emerald-800 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.length} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-emerald-900 rounded-lg transition text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {cart.length > 0 && (
            <div className="bg-emerald-50 p-3 border-b border-emerald-100 text-xs">
              {amountForFreeDelivery > 0 ? (
                <p className="font-semibold text-emerald-900">
                  Add <span className="font-black text-emerald-700">{formatINR(amountForFreeDelivery)}</span> more for <span className="font-bold text-amber-600">FREE Express Delivery</span>!
                </p>
              ) : (
                <p className="font-bold text-emerald-800 flex items-center gap-1">
                  <Truck className="w-4 h-4 text-emerald-600" /> 🎉 You unlocked FREE Express Delivery!
                </p>
              )}
              <div className="w-full bg-emerald-200 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${deliveryProgressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-16 h-16 mb-3 text-slate-300 stroke-1" />
                <h3 className="text-base font-bold text-slate-700">Your basket is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Add fresh Atta, Rice, Sunflower Oil, Ghee and Kiranam groceries to get started.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div 
                  key={`${item.productId}_${item.variantId}`}
                  className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-contain rounded-lg bg-white p-1 border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.productName}
                    </h4>
                    <p className="text-[11px] font-semibold text-emerald-700">
                      {item.weight} {item.unit} ({item.sku})
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xs font-black text-slate-900">
                        {formatINR(item.sellingPrice * item.quantity)}
                      </span>
                      {item.mrp > item.sellingPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          {formatINR(item.mrp * item.quantity)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden shadow-2xs shrink-0">
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.variantId, item.quantity - 1)}
                      className="p-1 hover:bg-slate-100 transition text-slate-700"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.variantId, item.quantity + 1)}
                      className="p-1 hover:bg-slate-100 transition text-slate-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Trash */}
                  <button
                    onClick={() => removeFromCart(item.productId, item.variantId)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Bill Summary */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="bg-emerald-100 text-emerald-900 p-2.5 rounded-xl flex items-center justify-between text-xs font-semibold border border-emerald-300">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-emerald-700" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> Applied (-{formatINR(couponDiscount)})</span>
                  </div>
                  <button onClick={removeCoupon} className="text-rose-700 hover:underline text-xs">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code (e.g. WELCOME100)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-800 transition"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Bill Details */}
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatINR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST 5-18% Incl.)</span>
                  <span className="font-semibold text-slate-900">{formatINR(cartGstTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-slate-900">
                    {cartDeliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatINR(cartDeliveryFee)}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatINR(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-base text-emerald-900">{formatINR(cartGrandTotal)}</span>
                </div>
              </div>

              {/* Proceed & Share Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-black py-3 px-4 rounded-xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 text-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>

                <button
                  onClick={() => {
                    const itemsText = cart.map(i => `• ${i.productName} (${i.weight}${i.unit}) x${i.quantity} = ₹${i.sellingPrice * i.quantity}`).join('\n');
                    const message = `🛒 *MY PRAVEEN KIRANAM GROCERY BASKET*\n\n*Items:*\n${itemsText}\n\n*Total Estimate:* ₹${cartGrandTotal}\n\nPlease prepare my order for 30-min express home delivery!`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl border border-slate-300 transition text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Share Basket via WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
