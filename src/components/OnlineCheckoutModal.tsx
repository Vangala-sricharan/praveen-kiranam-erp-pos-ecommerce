/**
 * Praveen Kiranam & General Stores - Smart UPI Payment & Checkout Modal
 */
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/formatters';
import { PaymentMethod, Order } from '../types/store';
import { STORE_DETAILS } from '../data/initialData';
import { 
  X, CheckCircle2, QrCode, CreditCard, Banknote, ShieldCheck, MapPin, Phone, User, 
  Sparkles, Copy, Download, Send, Check, Clock, MessageCircle, AlertCircle, ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnlineCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnlineCheckoutModal: React.FC<OnlineCheckoutModalProps> = ({ isOpen, onClose }) => {
  const { 
    cartSubtotal, cartGstTotal, cartGrandTotal, cartDeliveryFee, couponDiscount, 
    placeOnlineOrder, setIsCustomerProfileOpen 
  } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('505469');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const upiId = "8520981574@ybl";
  const merchantName = "PRAVEEN KIRANAM & GENERAL STORES";
  const whatsappNumber = "8520981574";
  const tempOrderCode = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  // Construct official UPI URI
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${cartGrandTotal}&cu=INR&tn=Order-${tempOrderCode}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUri)}`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2500);
  };

  const handleDownloadQR = () => {
    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = `Praveen_Kiranam_UPI_QR_₹${cartGrandTotal}.png`;
    a.target = '_blank';
    a.click();
  };

  const whatsappMsg = `Hello Praveen Kiranam, I have completed the UPI payment of ₹${cartGrandTotal} for my order. Here is the payment screenshot.`;
  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

  // Submit Order via "I HAVE PAID" for UPI
  const handleIHavePaid = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your Full Name, Phone Number, and Delivery Address before confirming payment.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrd = placeOnlineOrder({
        name,
        phone,
        address,
        pincode,
        paymentMethod: 'upi',
        notes
      });

      setIsSubmitting(false);

      if (newOrd) {
        setSubmittedOrder(newOrd);
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }, 600);
  };

  // Submit Order for Cash on Delivery / Card
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'upi') {
      handleIHavePaid();
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in your Full Name, Phone Number, and Delivery Address');
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
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setSubmittedOrder(order);
      }
    }, 600);
  };

  const handleCloseModal = () => {
    setSubmittedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden relative my-6">
        
        {/* Header */}
        <div className="bg-emerald-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center font-bold text-amber-300 shadow-inner">
              PK
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">Checkout & Payment</h2>
              <p className="text-[11px] text-emerald-200">
                {STORE_DETAILS.name} • Manakondur
              </p>
            </div>
          </div>

          <button onClick={handleCloseModal} className="p-1.5 hover:bg-emerald-900 rounded-lg text-slate-300 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* VIEW A: Payment Submitted Success Screen */}
        {submittedOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center max-h-[80vh] overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Payment Submitted Successfully</h3>
              <p className="text-xs text-slate-500 mt-1">Your payment request has been submitted for store verification.</p>
            </div>

            {/* Order Details Card */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 text-left border border-slate-800 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium">Order Number:</span>
                <span className="text-sm font-bold font-mono text-amber-300">#{submittedOrder.orderNumber}</span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium">Order Amount:</span>
                <span className="text-base font-black text-emerald-400 font-mono">{formatINR(submittedOrder.grandTotal)}</span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 font-medium">Payment Status:</span>
                <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Waiting for Store Verification
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 font-medium">Estimated Verification Time:</span>
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> 2 Minutes
                </span>
              </div>
            </div>

            {/* WhatsApp Quick Link Instructions */}
            {submittedOrder.paymentMethod === 'upi' && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs">
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Send Payment Screenshot for Instant Verification</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Please send your payment screenshot to our WhatsApp Number <strong className="text-slate-900 font-mono">8520981574</strong> to start packing your order immediately.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4 text-amber-300" />
                  <span>Send Screenshot on WhatsApp (8520981574)</span>
                </a>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  handleCloseModal();
                  setIsCustomerProfileOpen(true);
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition"
              >
                Track Order in My Account
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-2xl text-xs transition border border-slate-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* VIEW B: Checkout Form & Smart UPI Card */
          <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-6 max-h-[82vh] overflow-y-auto">
            
            {/* 1. Customer & Delivery Address */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-700" />
                1. Delivery Address & Contact Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Srinivas Rao Vangala"
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
                    placeholder="e.g. H.No 2-45, Near Hanuman Temple, Main Road, Manakondur"
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
                    placeholder="e.g. Call before delivery"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-500 caret-green-600 border border-gray-300 px-3 py-2 rounded-xl text-xs focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Select Payment Method */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                  2. Select Payment Method
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* UPI Payment - RECOMMENDED */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left relative transition-all duration-200 ${
                    paymentMethod === 'upi'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600 shadow-md'
                      : 'border-emerald-200 bg-gradient-to-r from-emerald-50/40 to-white hover:border-emerald-400'
                  }`}
                >
                  <div className="absolute top-2.5 right-2.5 bg-emerald-700 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>RECOMMENDED</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 text-amber-300 flex items-center justify-center shrink-0">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">UPI Payment</div>
                      <div className="text-xs text-emerald-800 font-bold mt-0.5">Instant Approval via QR Scan</div>
                      <div className="text-[10px] text-slate-500 mt-1">Google Pay, PhonePe, Paytm, BHIM</div>
                    </div>
                  </div>
                </button>

                {/* Cash On Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                    paymentMethod === 'cash'
                      ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900">Cash On Delivery</div>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">Pay cash upon delivery</div>
                      <div className="text-[10px] text-slate-400 mt-1">Cash handed directly to delivery agent</div>
                    </div>
                  </div>
                </button>

              </div>
            </div>

            {/* SMART UPI PAYMENT CARD & INSTRUCTIONS */}
            {paymentMethod === 'upi' && (
              <div className="space-y-5 bg-slate-950 text-white p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-2xl animate-fade-in">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-sm font-black tracking-tight text-white">Smart Dynamic UPI QR</h4>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    INR (₹) Exact Amount Auto-Calculated
                  </span>
                </div>

                {/* Main Payment Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5">
                  
                  {/* QR Image Box */}
                  <div className="relative group shrink-0">
                    <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow-xl flex items-center justify-center border-2 border-emerald-500">
                      <img
                        src={qrCodeUrl}
                        alt="Dynamic UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center mt-1.5">
                      <span className="text-[10px] text-slate-400 font-mono">Scan using any UPI App</span>
                    </div>
                  </div>

                  {/* Payment Metadata */}
                  <div className="space-y-2.5 text-xs w-full">
                    
                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Merchant:</span>
                      <span className="font-bold text-white text-right font-mono">{merchantName}</span>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400 font-medium">UPI ID:</span>
                      <span className="font-bold font-mono text-emerald-400 text-sm">{upiId}</span>
                    </div>

                    <div className="p-2.5 bg-emerald-950/80 rounded-xl border border-emerald-700/60 flex justify-between items-center">
                      <span className="text-emerald-200 font-bold">Exact Amount:</span>
                      <span className="text-lg font-black font-mono text-amber-300">{formatINR(cartGrandTotal)}</span>
                    </div>

                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 font-medium">Order Reference:</span>
                      <span className="font-mono text-slate-300 font-bold">#{tempOrderCode}</span>
                    </div>

                    {/* Action Buttons: Copy UPI & Download QR */}
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleCopyUPI}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded-xl text-[11px] flex items-center justify-center gap-1.5 border border-slate-700 transition"
                      >
                        {copiedUPI ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                        <span>{copiedUPI ? 'Copied!' : 'Copy UPI ID'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadQR}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded-xl text-[11px] flex items-center justify-center gap-1.5 border border-slate-700 transition"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Download QR</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* SUPPORTED UPI APPS */}
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-bold text-slate-300 text-center">
                    "You can pay using any UPI application"
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <div className="bg-slate-900 border border-slate-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <span className="text-blue-400 font-black">G</span>Pay
                    </div>
                    <div className="bg-slate-900 border border-slate-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <span className="text-purple-400 font-black">PhonePe</span>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <span className="text-sky-400 font-black">Paytm</span>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <span className="text-amber-400 font-black">BHIM</span> UPI
                    </div>
                    <div className="bg-slate-900 border border-slate-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                      <span className="text-orange-400 font-black">Amazon</span> Pay
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 text-center">
                    * The logos are for guidance only. The QR code works with every UPI app in India.
                  </p>
                </div>

                {/* PAYMENT INSTRUCTIONS */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h5 className="text-xs font-black uppercase text-amber-300 tracking-wider">Payment Steps</h5>
                  <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside font-medium leading-relaxed">
                    <li>Scan the QR Code above using any UPI App on your mobile.</li>
                    <li>Verify the amount <strong className="text-emerald-400 font-mono">{formatINR(cartGrandTotal)}</strong> and merchant <strong className="text-white">{merchantName}</strong>.</li>
                    <li>Complete the payment inside your UPI app.</li>
                    <li>Take a screenshot of the successful payment confirmation screen.</li>
                    <li>Send the payment screenshot to our Mobile Number using WhatsApp.</li>
                  </ol>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <div className="text-[11px] text-slate-400">WhatsApp Store Mobile Number:</div>
                      <div className="text-sm font-mono font-black text-emerald-400">{whatsappNumber}</div>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md"
                    >
                      <MessageCircle className="w-4 h-4 text-amber-300" />
                      <span>Send Screenshot on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* PAYMENT STATUS TIMELINE */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h5 className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Verification Process
                  </h5>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px] font-bold">
                    <div className="p-2 bg-slate-950 rounded-xl border border-emerald-900/60 text-emerald-400">
                      <div className="text-xs">✔</div>
                      <div>Scan QR</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-emerald-900/60 text-emerald-400">
                      <div className="text-xs">✔</div>
                      <div>Complete Payment</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-emerald-900/60 text-emerald-400">
                      <div className="text-xs">✔</div>
                      <div>Send Screenshot</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-amber-800/60 text-amber-300">
                      <div className="text-xs">⏳</div>
                      <div>Store Verifies</div>
                    </div>
                    <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 col-span-2 sm:col-span-1">
                      <div className="text-xs">⏱</div>
                      <div>~2 Min SLA</div>
                    </div>
                  </div>
                </div>

                {/* I HAVE PAID BUTTON */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleIHavePaid}
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-6 rounded-2xl shadow-2xl transition active:scale-98 text-base flex items-center justify-center gap-2 border border-emerald-400"
                  >
                    {isSubmitting ? (
                      <span>Submitting Payment...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-amber-300" />
                        <span>I HAVE PAID ({formatINR(cartGrandTotal)})</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Click "I HAVE PAID" after completing payment to notify the store instantly.
                  </p>
                </div>

              </div>
            )}

            {/* Final Order Summary Box */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-slate-800 space-y-2">
              <div className="flex justify-between font-medium">
                <span>Items Subtotal:</span>
                <span className="font-bold font-mono">{formatINR(cartSubtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Coupon Discount:</span>
                  <span className="font-mono">-{formatINR(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium">
                <span>Delivery Fee:</span>
                <span className="font-bold">{cartDeliveryFee === 0 ? 'FREE Express Delivery' : formatINR(cartDeliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-emerald-200">
                <span>Total Amount Payable:</span>
                <span className="text-emerald-950 font-black font-mono">{formatINR(cartGrandTotal)}</span>
              </div>
            </div>

            {/* Confirm Order Button for Non-UPI methods */}
            {paymentMethod !== 'upi' && (
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
                    <span>Confirm Cash On Delivery Order ({formatINR(cartGrandTotal)})</span>
                  </>
                )}
              </button>
            )}

          </form>
        )}

      </div>
    </div>
  );
};
