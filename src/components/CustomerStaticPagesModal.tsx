import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, MapPin, Phone, Mail, Clock, Send, ShieldCheck, FileText, Store } from 'lucide-react';
import { STORE_DETAILS } from '../data/initialData';

export const CustomerStaticPagesModal: React.FC = () => {
  const { activeStaticModal, setActiveStaticModal, showToast } = useStore();
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackPhone, setFeedbackPhone] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!activeStaticModal) return null;

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Your query has been submitted to Praveen Kumar.', 'success');
    setFeedbackMsg('');
    setActiveStaticModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveStaticModal(null)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ABOUT US */}
        {activeStaticModal === 'about' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <Store className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-lg font-bold text-white">About Praveen Kiranam & General Stores</h2>
                <p className="text-xs text-slate-400">Serving Pragathi Nagar & Hyderabad Families Since 1998</p>
              </div>
            </div>

            <div className="text-xs leading-relaxed text-slate-300 space-y-3">
              <p>
                Founded by <strong>Praveen Kumar Vangala</strong> in 1998, Praveen Kiranam and General Stores has grown from a humble neighborhood corner store into a full-fledged hybrid Supermarket & E-commerce destination in Telangana.
              </p>
              <p>
                We specialize in direct farm-procured <strong>Aged Sonamasuri Raw Rice</strong>, premium unpolished <strong>Desi Toor Dal</strong>, <strong>Aashirvaad Atta</strong>, <strong>Freedom Sunflower Oils</strong>, and fresh daily dairy.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                  <div className="font-bold text-emerald-400">⚡ 30-Min Delivery</div>
                  <div className="text-[11px] text-slate-400">Express home delivery in Pragathi Nagar & Kukatpally.</div>
                </div>
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
                  <div className="font-bold text-emerald-400">🧾 GST Tax Compliant</div>
                  <div className="text-[11px] text-slate-400">GSTIN: {STORE_DETAILS.gstin} • FSSAI: {STORE_DETAILS.fssaiNo}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT US */}
        {activeStaticModal === 'contact' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <Phone className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Contact & Store Location</h2>
                <p className="text-xs text-slate-400">Reach out to us for bulk orders or local delivery queries</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3 bg-slate-950/60 p-4 border border-slate-800 rounded-xl">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{STORE_DETAILS.name}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{STORE_DETAILS.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Phone / WhatsApp</div>
                    <div className="text-slate-400">{STORE_DETAILS.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white">Working Hours</div>
                    <div className="text-slate-400">{STORE_DETAILS.openingHours}</div>
                  </div>
                </div>
              </div>

              {/* Feedback Form */}
              <form onSubmit={handleSendFeedback} className="space-y-3 bg-slate-950/60 p-4 border border-slate-800 rounded-xl">
                <div className="font-bold text-slate-200">Send Direct Message to Store Owner</div>
                
                <div>
                  <input
                    type="text"
                    required
                    value={feedbackName}
                    onChange={e => setFeedbackName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={feedbackPhone}
                    onChange={e => setFeedbackPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={3}
                    value={feedbackMsg}
                    onChange={e => setFeedbackMsg(e.target.value)}
                    placeholder="Write your query or monthly grocery order list..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Message</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* PRIVACY POLICY & TERMS */}
        {(activeStaticModal === 'privacy' || activeStaticModal === 'terms') && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-lg font-bold text-white">
                  {activeStaticModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
                </h2>
                <p className="text-xs text-slate-400">Praveen Kiranam Legal & Customer Guarantees</p>
              </div>
            </div>

            <div className="text-xs leading-relaxed text-slate-300 space-y-3 max-h-80 overflow-y-auto pr-1">
              <p>
                <strong>1. Data Protection:</strong> We handle customer address, contact phone numbers, and transaction logs strictly for local grocery fulfillment in Hyderabad. Customer data is never shared with third parties.
              </p>
              <p>
                <strong>2. GST Tax Compliance:</strong> Every purchase, whether at the POS counter or online checkout, comes with an official GST Tax Invoice containing our registered GSTIN: {STORE_DETAILS.gstin}.
              </p>
              <p>
                <strong>3. Product Return Policy:</strong> Sealed branded goods can be returned at the store counter within 24 hours of delivery if damaged or defective.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
