/**
 * Praveen Kiranam - Online Customer Checkout Modal
 */
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import { PaymentMethod } from '../types/store';
import { STORE_DETAILS } from '../data/initialData';
import { X, CheckCircle2, QrCode, CreditCard, Banknote, ShieldCheck, MapPin, Phone, User, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnlineCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnlineCheckoutModal: React.FC<OnlineCheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, cartSubtotal, cartGstTotal, cartGrandTotal, cartDeliveryFee, couponDiscount, placeOnlineOrder } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('500090');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Please fill in your Name, Phone Number, and Delivery Address');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOnlineOrder({
        name,
        phone,
        address,
        pincode,
        paymentMethod,
        notes
      });

      setIsSubmitting(false);

      if (order) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        onClose();
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-8">
        {/* Header */}
        <div className="bg-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center font-bold text-amber-300">
              PK
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">Checkout & Order Placement</h2>
              <p className="text-xs text-emerald-200">
                Direct Express Delivery from Praveen Kiranam & General Stores
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 hover:bg-emerald-900 rounded-lg text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Section 1: Customer & Delivery Details */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" />
              1. Delivery Address & Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srinivas Rao"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 pl-9 pr-3 py-2.5 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 pl-9 pr-3 py-2.5 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">House No., Street & Landmark *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. H.No 4-12, Green Meadows, Near Gram Panchayat, Pragathi Nagar"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Delivery Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Leave with security or call on arrival"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Mode */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-700" />
              2. Select Payment Mode
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <QrCode className="w-5 h-5 text-emerald-700 mb-2" />
                <div>
                  <div className="text-xs font-bold text-slate-900">UPI Instant</div>
                  <div className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  paymentMethod === 'cash'
                    ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-700 mb-2" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Cash on Delivery</div>
                  <div className="text-[10px] text-slate-500">Pay cash upon delivery</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-emerald-700 mb-2" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Card on Delivery</div>
                  <div className="text-[10px] text-slate-500">Swipe debit/credit card</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('store_credit')}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition ${
                  paymentMethod === 'store_credit'
                    ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-amber-600 mb-2" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Store Credit / Khata</div>
                  <div className="text-[10px] text-slate-500">For registered regulars</div>
                </div>
              </button>
            </div>

            {/* UPI QR Display Preview */}
            {paymentMethod === 'upi' && (
              <div className="mt-4 p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=praveenkiranam@upi&pn=PRAVEEN%20KIRANAM&am=0"
                    alt="Store UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs space-y-1 text-slate-300">
                  <p className="font-bold text-amber-300 text-sm">Scan UPI QR with any App</p>
                  <p>VPA: <span className="font-mono text-white font-bold">praveenkiranam@upi</span></p>
                  <p>Store Name: <span className="text-white font-bold">{STORE_DETAILS.name}</span></p>
                  <p className="text-[10px] text-slate-400">Scan using PhonePe, Google Pay, Paytm or BHIM UPI.</p>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Final Order Summary */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-slate-800 space-y-2">
            <div className="flex justify-between font-medium">
              <span>Items Subtotal:</span>
              <span className="font-bold">{formatINR(cartSubtotal)}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Coupon Saved:</span>
                <span>-{formatINR(couponDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium">
              <span>Delivery Charges:</span>
              <span className="font-bold">{cartDeliveryFee === 0 ? 'FREE' : formatINR(cartDeliveryFee)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-emerald-200">
              <span>Grand Total Payable:</span>
              <span className="text-emerald-950 font-black">{formatINR(cartGrandTotal)}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-black py-4 px-6 rounded-2xl shadow-xl transition active:scale-95 text-base flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>Confirm Order ({formatINR(cartGrandTotal)})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
