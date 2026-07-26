/**
 * Praveen Kiranam - Official GST Tax Invoice Print Modal
 */
import React, { useState } from 'react';
import { Invoice } from '../types/store';
import { formatINR, formatDate } from '../utils/formatters';
import { STORE_DETAILS } from '../data/initialData';
import { useStore } from '../context/StoreContext';
import { X, Printer, Download, CheckCircle2, Share2, QrCode, ShoppingBag, ArrowLeft, RefreshCw, Check } from 'lucide-react';

interface InvoicePrintModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

type ReceiptFormat = 'standard' | 'thermal_80mm' | 'thermal_58mm';

export const InvoicePrintModal: React.FC<InvoicePrintModalProps> = ({ invoice, onClose }) => {
  const { clearCart, clearPosCart, setViewMode, showToast } = useStore();
  const [format, setFormat] = useState<ReceiptFormat>('standard');

  if (!invoice) return null;

  const handleFinishAndReturn = () => {
    clearCart();
    clearPosCart();
    setViewMode('online_store');
    onClose();
    showToast('Returned to Storefront', 'info');
  };

  const handleStartNewOrder = () => {
    clearCart();
    clearPosCart();
    onClose();
    showToast('Ready for new order!', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const phone = invoice.customerPhone.replace(/[^0-9]/g, '');
    const itemsList = invoice.items.map(i => `• ${i.productName} (${i.weight}${i.unit}) x${i.quantity} = ₹${i.sellingPrice * i.quantity}`).join('\n');
    const message = `🧾 *PRAVEEN KIRANAM & GENERAL STORES*\n*Tax Invoice:* ${invoice.invoiceNumber}\n*Date:* ${formatDate(invoice.invoiceDate, true)}\n\n*Customer:* ${invoice.customerName}\n\n*Items Purchased:*\n${itemsList}\n\n------------------------------\n*Subtotal:* ₹${invoice.subtotal}\n*GST Total:* ₹${invoice.totalGst}\n*Grand Total:* ₹${invoice.grandTotal}\n*Payment Mode:* ${invoice.paymentMode.toUpperCase()}\n------------------------------\nThank you for shopping with us! 🙏\nPh: ${STORE_DETAILS.phone}`;
    
    const url = phone.length >= 10 
      ? `https://wa.me/91${phone.slice(-10)}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=8520981574@ybl&pn=${encodeURIComponent('PRAVEEN KIRANAM & GENERAL STORES')}&am=${invoice.grandTotal}&cu=INR`)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className={`bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-8 print:m-0 print:shadow-none print:border-none print:rounded-none transition-all ${
        format === 'thermal_58mm' ? 'max-w-[340px] w-full' : format === 'thermal_80mm' ? 'max-w-[440px] w-full' : 'max-w-2xl w-full'
      }`}>
        {/* Header Control Actions */}
        <div className="bg-slate-900 text-white p-4 space-y-3 print:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-bold text-sm block">Tax Invoice #{invoice.invoiceNumber}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">✓ Sale Recorded & Saved in Database</span>
              </div>
            </div>
            <button
              onClick={handleFinishAndReturn}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
            {/* Format Selector */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setFormat('standard')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${format === 'standard' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Standard A4
              </button>
              <button
                onClick={() => setFormat('thermal_80mm')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${format === 'thermal_80mm' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                80mm Thermal
              </button>
              <button
                onClick={() => setFormat('thermal_58mm')}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${format === 'thermal_58mm' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                58mm Thermal
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleWhatsAppShare}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition"
              >
                <Share2 className="w-3.5 h-3.5" /> WhatsApp
              </button>
              <button
                onClick={handlePrint}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Document Body - STANDARD FORMAT */}
        {format === 'standard' && (
          <div id="printable-invoice" className="p-8 text-slate-900 font-sans space-y-6 bg-white">
            <div className="border-b border-slate-300 pb-4 flex justify-between items-start">
              <div>
                <h1 className="text-xl font-black text-emerald-950 uppercase tracking-tight">
                  {STORE_DETAILS.name}
                </h1>
                <p className="text-xs text-slate-600 font-medium max-w-sm mt-0.5">
                  {STORE_DETAILS.address}
                </p>
                <div className="flex items-center gap-3 text-xs font-mono font-semibold text-slate-700 mt-2">
                  <span>GSTIN: <strong>{STORE_DETAILS.gstin}</strong></span>
                  <span>FSSAI: {STORE_DETAILS.fssaiNo}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">Ph: {STORE_DETAILS.phone}</p>
              </div>

              <div className="text-right">
                <span className="inline-block bg-slate-100 text-slate-800 text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider border border-slate-300">
                  TAX INVOICE
                </span>
                <div className="mt-2 text-xs font-mono space-y-1">
                  <div>Invoice #: <strong>{invoice.invoiceNumber}</strong></div>
                  <div>Date: {formatDate(invoice.invoiceDate, true)}</div>
                  <div className="text-emerald-800 font-bold uppercase">Mode: {invoice.paymentMode}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billed To:</div>
                <div className="font-black text-slate-900 text-sm mt-0.5">{invoice.customerName}</div>
                <div className="font-mono text-slate-600">{invoice.customerPhone}</div>
                {invoice.customerAddress && <div className="text-slate-600 text-[11px] mt-0.5">{invoice.customerAddress}</div>}
              </div>
              <div className="flex flex-col items-end justify-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Scan & Pay via UPI:</div>
                <img src={upiQrUrl} alt="UPI QR" className="w-16 h-16 border border-slate-300 rounded" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-100 border-y border-slate-300 text-slate-700 font-bold uppercase text-[10px]">
                    <th className="py-2 px-2">#</th>
                    <th className="py-2 px-2">Item Description</th>
                    <th className="py-2 px-2 text-center">HSN</th>
                    <th className="py-2 px-2 text-center">GST %</th>
                    <th className="py-2 px-2 text-center">Qty</th>
                    <th className="py-2 px-2 text-right">Rate</th>
                    <th className="py-2 px-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-2 font-mono text-slate-400">{index + 1}</td>
                      <td className="py-2 px-2">
                        <div className="font-bold text-slate-900">{item.productName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{item.weight}{item.unit} | {item.sku}</div>
                      </td>
                      <td className="py-2 px-2 text-center font-mono text-slate-600">{item.hsnCode}</td>
                      <td className="py-2 px-2 text-center font-mono text-slate-600">{item.gstRate}%</td>
                      <td className="py-2 px-2 text-center font-bold text-slate-900">{item.quantity}</td>
                      <td className="py-2 px-2 text-right font-mono">{formatINR(item.sellingPrice)}</td>
                      <td className="py-2 px-2 text-right font-black text-slate-900">{formatINR(item.sellingPrice * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-300 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] space-y-1 font-mono text-slate-600">
                <div className="font-bold text-slate-800 text-xs mb-1">GST Tax Breakdown:</div>
                <div className="flex justify-between">
                  <span>CGST (Central):</span>
                  <span className="font-bold text-slate-900">{formatINR(invoice.cgst)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (Telangana):</span>
                  <span className="font-bold text-slate-900">{formatINR(invoice.sgst)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
                  <span>Total Tax:</span>
                  <span>{formatINR(invoice.totalGst)}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Items Subtotal:</span>
                  <span className="font-bold text-slate-900">{formatINR(invoice.subtotal)}</span>
                </div>
                {invoice.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount:</span>
                    <span>-{formatINR(invoice.discount)}</span>
                  </div>
                )}
                {invoice.deliveryCharge > 0 && (
                  <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span className="font-bold text-slate-900">{formatINR(invoice.deliveryCharge)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-slate-950 pt-2 border-t-2 border-slate-900">
                  <span>GRAND TOTAL:</span>
                  <span className="text-xl text-emerald-950">{formatINR(invoice.grandTotal)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
              <div>
                <p className="font-bold text-slate-700">Terms & Conditions:</p>
                <p>1. Goods exchanged within 48 hours with original bill.</p>
                <p>2. Thank you for shopping at Praveen Kiranam!</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 text-xs">For PRAVEEN KIRANAM</p>
                <div className="h-8"></div>
                <p className="border-t border-slate-400 pt-1">Authorized Signatory</p>
              </div>
            </div>
          </div>
        )}

        {/* THERMAL 80MM / 58MM FORMAT */}
        {(format === 'thermal_80mm' || format === 'thermal_58mm') && (
          <div id="printable-invoice" className="p-4 text-slate-900 font-mono text-xs space-y-3 bg-white leading-tight">
            <div className="text-center border-b border-dashed border-slate-400 pb-2 space-y-1">
              <h2 className="font-black text-sm uppercase">{STORE_DETAILS.name}</h2>
              <p className="text-[10px]">{STORE_DETAILS.address}</p>
              <p className="text-[10px]">Ph: {STORE_DETAILS.phone}</p>
              <p className="text-[10px]">GSTIN: {STORE_DETAILS.gstin}</p>
            </div>

            <div className="border-b border-dashed border-slate-400 pb-2 space-y-0.5 text-[10px]">
              <div>Inv #: <strong>{invoice.invoiceNumber}</strong></div>
              <div>Date: {formatDate(invoice.invoiceDate, true)}</div>
              <div>Cust: {invoice.customerName} ({invoice.customerPhone})</div>
              <div>Pay Mode: {invoice.paymentMode.toUpperCase()}</div>
            </div>

            <div className="space-y-1 border-b border-dashed border-slate-400 pb-2 text-[11px]">
              <div className="flex justify-between font-bold border-b border-slate-300 pb-1">
                <span>ITEM</span>
                <span>QTY x RATE</span>
                <span>AMT</span>
              </div>
              {invoice.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div className="max-w-[150px] truncate">
                    {item.productName} ({item.weight}{item.unit})
                  </div>
                  <div>{item.quantity}x₹{item.sellingPrice}</div>
                  <div className="font-bold">₹{item.sellingPrice * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-right text-xs">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{invoice.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax:</span>
                <span>₹{invoice.totalGst}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Discount:</span>
                  <span>-₹{invoice.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-sm pt-1 border-t border-black">
                <span>TOTAL:</span>
                <span>₹{invoice.grandTotal}</span>
              </div>
            </div>

            <div className="text-center pt-2 border-t border-dashed border-slate-400 space-y-2">
              <img src={upiQrUrl} alt="UPI QR" className="w-24 h-24 mx-auto border border-slate-300 p-1" />
              <p className="text-[9px] uppercase font-bold">*** THANK YOU! VISIT AGAIN ***</p>
            </div>
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 print:hidden space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              onClick={handleFinishAndReturn}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Done</span>
            </button>

            <button
              onClick={handleFinishAndReturn}
              className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span>Back to Store</span>
            </button>

            <button
              onClick={handleStartNewOrder}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition col-span-2 sm:col-span-1"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>New Order</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-2.5 rounded-xl text-xs flex items-center justify-center gap-1 transition col-span-2 sm:col-span-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

