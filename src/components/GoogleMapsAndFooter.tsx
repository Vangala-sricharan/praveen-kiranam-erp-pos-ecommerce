/**
 * Praveen Kiranam - Google Maps Location & Store Footer
 */
import React from 'react';
import { STORE_DETAILS } from '../data/initialData';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, MessageCircle } from 'lucide-react';

export const GoogleMapsAndFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white mt-12 border-t border-slate-800">
      {/* Store Location & Google Maps Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl">
          {/* Left Store Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-700 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              <span>🟢 Serving Manakondur Since 2001</span>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
              {STORE_DETAILS.name}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              📍 Manakondur, Karimnagar, Telangana - 505469, India
            </p>

            <p className="text-xs text-emerald-300 font-medium">
              Serving the local community with quality groceries, household essentials and daily needs.
            </p>

            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{STORE_DETAILS.openingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Helpline: {STORE_DETAILS.phone} / {STORE_DETAILS.altPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{STORE_DETAILS.email}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=18.397500,79.187528"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" /> Open in Google Maps
              </a>

              <a
                href={`https://wa.me/919849012345?text=Hello%20Praveen%20Kiranam,%20I%20want%20to%20order%20groceries`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Kiranam Order
              </a>
            </div>
          </div>

          {/* Right Embedded Map */}
          <div className="lg:col-span-7 h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-700 shadow-inner bg-slate-800">
            <iframe
              title="Praveen Kiranam Location Map - Manakondur"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=18.397500,79.187528&z=16&output=embed"
            ></iframe>
          </div>
        </div>

        {/* Footer Badges & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>
            <div className="font-bold text-slate-200">{STORE_DETAILS.name}</div>
            <div className="text-[11px] text-slate-400">Serving Manakondur Since 2001</div>
            <div className="text-[11px] text-slate-500">📍 Manakondur, Karimnagar, Telangana - 505469 India</div>
          </div>

          <div className="flex items-center gap-4 text-emerald-400 font-mono text-[11px]">
            <span>Telangana GSTIN: {STORE_DETAILS.gstin}</span>
            <span>|</span>
            <span>FSSAI Lic: {STORE_DETAILS.fssaiNo}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Manakondur & Karimnagar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
