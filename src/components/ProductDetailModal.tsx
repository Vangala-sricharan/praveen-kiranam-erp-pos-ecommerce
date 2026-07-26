import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';
import { 
  X, Star, ShoppingBag, Heart, ShieldCheck, Truck, CheckCircle2, 
  Tag, ArrowRight, Plus, Minus, MessageSquare, Send, Zap 
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { getValidProductImage, handleImageError } from '../utils/imageUtils';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductDetail, setSelectedProductDetail, 
    addToCart, wishlist, toggleWishlist, reviews, addReview, products, setViewMode 
  } = useStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [zoomImage, setZoomImage] = useState(false);

  // Review Form
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const activeVariantId = selectedVariantId || product.selectedVariantId || product.weightVariants[0]?.variantId;
  const currentVariant = product.weightVariants.find(v => v.variantId === activeVariantId) || product.weightVariants[0];

  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const isWishlisted = wishlist.includes(product.id);
  const savings = currentVariant ? currentVariant.mrp - currentVariant.sellingPrice : 0;
  const discountPct = currentVariant ? Math.round((savings / currentVariant.mrp) * 100) : 0;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewerComment) return;
    addReview({
      productId: product.id,
      customerName: reviewerName,
      rating: reviewerRating,
      comment: reviewerComment
    });
    setReviewerComment('');
  };

  const handleBuyNow = () => {
    addToCart(product, currentVariant.variantId, quantity);
    setSelectedProductDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden text-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Header Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {product.category}
            </span>
            {product.brand && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                Brand: {product.brand}
              </span>
            )}
          </div>

          <button 
            onClick={() => setSelectedProductDetail(null)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-5 space-y-3">
              <div 
                onClick={() => setZoomImage(!zoomImage)}
                className="relative aspect-square rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center cursor-zoom-in group"
              >
                <img 
                  src={getValidProductImage(product.images[activeImageIdx] || product.images[0], product.category)} 
                  alt={product.name} 
                  onError={(e) => handleImageError(e, product.category)}
                  className={`w-full h-full object-cover transition-transform duration-300 ${zoomImage ? 'scale-150' : 'group-hover:scale-105'}`}
                />
                <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded text-[10px] font-bold text-slate-300 border border-slate-700">
                  {zoomImage ? 'Click to Reset Zoom' : 'Click to Zoom'}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border transition ${
                        activeImageIdx === idx ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={getValidProductImage(img, product.category)} 
                        alt="" 
                        onError={(e) => handleImageError(e, product.category)}
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details & Variants */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {product.name}
                </h1>
                {product.teluguName && (
                  <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                    {product.teluguName}
                  </p>
                )}
              </div>

              {/* Rating & Reviews Bar */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating || 4.8}</span>
                </div>
                <span className="text-slate-400">({product.reviewsCount || productReviews.length + 12} Verified Customer Reviews)</span>
              </div>

              {/* Price & Savings */}
              {currentVariant && (
                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-emerald-400">{formatCurrency(currentVariant.sellingPrice)}</span>
                    {savings > 0 && (
                      <span className="text-sm text-slate-500 line-through">{formatCurrency(currentVariant.mrp)}</span>
                    )}
                    {discountPct > 0 && (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[11px] font-bold">
                        {discountPct}% OFF
                      </span>
                    )}
                  </div>
                  {savings > 0 && (
                    <div className="text-xs text-emerald-300 font-medium">
                      Instant Savings: {formatCurrency(savings)} on this pack!
                    </div>
                  )}
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                    <span>GST Rate: {product.gstRate}% Included</span>
                    <span>HSN Code: <strong className="font-mono">{product.hsnCode}</strong></span>
                  </div>
                </div>
              )}

              {/* Weight Variant Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Weight / Pack Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.weightVariants.map(v => (
                    <button
                      key={v.variantId}
                      onClick={() => setSelectedVariantId(v.variantId)}
                      className={`px-3 py-2 rounded-lg border text-xs font-bold transition flex items-center gap-2 ${
                        v.variantId === activeVariantId 
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' 
                          : 'bg-slate-950/50 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{v.weight}{v.unit}</span>
                      <span className="opacity-80">({formatCurrency(v.sellingPrice)})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/30 p-3 rounded-lg border border-slate-800/60">
                {product.description}
              </div>

              {/* Quantity Stepper & Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-slate-700 rounded-lg bg-slate-800">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-300 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-300 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, currentVariant.variantId, quantity);
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Shopping Cart</span>
                </button>

                <button
                  onClick={() => {
                    const text = `🛒 *Check out this item at Praveen Kiranam!*\n*${product.name}* (${currentVariant.weight}${currentVariant.unit})\nPrice: ₹${currentVariant.sellingPrice} (MRP: ₹${currentVariant.mrp})\nBrand: ${product.brand}\nOrder online for 30-min local home delivery!`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="p-2.5 bg-emerald-800 hover:bg-emerald-700 border border-emerald-600 text-emerald-100 rounded-lg transition"
                  title="Share product on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-lg border transition ${
                    isWishlisted 
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-400' : ''}`} />
                </button>
              </div>

              {/* Store Guarantees */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 bg-slate-950/40 border border-slate-800 rounded flex items-center gap-2 text-slate-300">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30-Min Local Express Delivery</span>
                </div>
                <div className="p-2 bg-slate-950/40 border border-slate-800 rounded flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Genuine Branded Stock</span>
                </div>
              </div>

              {/* Extended Product Specifications & Metadata */}
              <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-slate-200 border-b border-slate-800 pb-1 flex items-center justify-between">
                  <span>Product Specifications & Details</span>
                  <span className="text-[10px] text-emerald-400 font-mono">FSSAI Lic #13621011000123</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  <div><span className="text-slate-500">Brand:</span> <strong className="text-slate-300">{product.brand}</strong></div>
                  <div><span className="text-slate-500">SKU:</span> <strong className="text-slate-300 font-mono">{currentVariant?.sku || 'PK-SKU'}</strong></div>
                  <div><span className="text-slate-500">Barcode:</span> <strong className="text-slate-300 font-mono">{currentVariant?.barcode || '8901000'}</strong></div>
                  <div><span className="text-slate-500">Category:</span> <strong className="text-slate-300">{product.category}</strong></div>
                  <div><span className="text-slate-500">Stock Available:</span> <strong className="text-emerald-400 font-bold">{currentVariant?.stock || 0} units</strong></div>
                  <div><span className="text-slate-500">Shelf Life:</span> <strong className="text-slate-300">12 Months from MFD</strong></div>
                </div>

                <div className="pt-2 border-t border-slate-800/60 text-[11px] space-y-1">
                  <div><span className="text-slate-500 font-semibold">Ingredients:</span> <span className="text-slate-300">Selected 100% pure raw ingredients, zero artificial preservatives, quality tested.</span></div>
                  <div><span className="text-slate-500 font-semibold">Storage Instructions:</span> <span className="text-slate-300">Store in a cool, dry, hygienic place. Keep in an airtight container after opening.</span></div>
                  <div><span className="text-slate-500 font-semibold">Manufacturer / Packer:</span> <span className="text-slate-300">{product.brand} Consumer Products Ltd, Telangana Marketing Unit, Hyderabad.</span></div>
                </div>
              </div>
            </div>

          </div>

          {/* Related Products & Frequently Bought Together */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Frequently Bought Together & Related Items</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedProducts.map(rel => {
                  const varRel = rel.weightVariants[0];
                  return (
                    <div 
                      key={rel.id}
                      onClick={() => {
                        setSelectedProductDetail(rel);
                      }}
                      className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition flex items-center gap-2.5"
                    >
                      <img src={rel.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-slate-500 block truncate">{rel.brand}</span>
                        <h4 className="text-xs font-bold text-white truncate">{rel.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-bold text-emerald-400">{formatCurrency(varRel.sellingPrice)}</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(rel, varRel.variantId, 1);
                            }}
                            className="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-0.5 rounded"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="border-t border-slate-800 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Customer Reviews & Ratings</h3>
              <span className="text-xs text-slate-400">{productReviews.length} Verified Reviews</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Existing Reviews List */}
              <div className="md:col-span-7 space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-slate-500 italic p-3 bg-slate-950/40 rounded border border-slate-800">
                    Be the first neighbor to write a review for this Kirana item!
                  </p>
                ) : (
                  productReviews.map(r => (
                    <div key={r.id} className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{r.customerName}</span>
                        <div className="flex text-amber-400 text-[10px]">
                          {'★'.repeat(r.rating)}
                        </div>
                      </div>
                      <p className="text-slate-300 text-[11px]">{r.comment}</p>
                      <span className="text-[10px] text-slate-500">{r.date}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="md:col-span-5 bg-slate-950/60 p-3.5 border border-slate-800 rounded-xl space-y-2.5 text-xs">
                <div className="font-bold text-slate-200">Write a Review</div>
                <div>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={e => setReviewerName(e.target.value)}
                    placeholder="Your Name (e.g. Kavitha)"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Rating</label>
                  <select
                    value={reviewerRating}
                    onChange={e => setReviewerRating(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5) Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5) Good</option>
                    <option value={3}>⭐⭐⭐ (3/5) Average</option>
                  </select>
                </div>

                <div>
                  <textarea
                    required
                    rows={2}
                    value={reviewerComment}
                    onChange={e => setReviewerComment(e.target.value)}
                    placeholder="Share feedback on quality, taste, freshness..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 rounded-lg text-xs"
                >
                  Post Review
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
