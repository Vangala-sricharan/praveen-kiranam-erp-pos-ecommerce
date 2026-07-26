/**
 * Praveen Kiranam - Image Utility & Fallback Handler
 */
import React from 'react';

export const DEFAULT_GROCERY_PLACEHOLDER = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "Atta, Rice & Grains": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
  "Pulses, Dals & Spices": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
  "Edible Oils & Ghee": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
  "Dairy, Milk & Fresh": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
  "Beverages, Tea & Coffee": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
  "Snacks, Biscuits & Sweets": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80",
  "Soaps & Personal Care": "https://images.unsplash.com/photo-1608248597262-8133e0789242?auto=format&fit=crop&w=600&q=80",
  "Household & Cleaning": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
  "Fresh Fruits & Vegetables": "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
  "Baby & Pet Care": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80"
};

// Inline SVG Data URL for 100% offline / failsafe guarantee
export const SVG_GROCERY_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300" fill="%23f8fafc"><rect width="300" height="300" rx="16" fill="%23f1f5f9"/><path d="M110 100h80l15 80H95l15-80z" fill="none" stroke="%23059669" stroke-width="8" stroke-linejoin="round"/><path d="M125 100a25 25 0 0 1 50 0" fill="none" stroke="%23059669" stroke-width="8"/><text x="150" y="220" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23334155" text-anchor="middle">Kiranam Grocery Item</text></svg>`;

export const getValidProductImage = (src?: string | null, category?: string): string => {
  if (src && typeof src === 'string' && src.trim().length > 5 && src.startsWith('http')) {
    return src;
  }
  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    return CATEGORY_FALLBACK_IMAGES[category];
  }
  return DEFAULT_GROCERY_PLACEHOLDER;
};

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, category?: string) => {
  const target = e.currentTarget;
  if (target.dataset.fallbackCount) {
    const count = parseInt(target.dataset.fallbackCount, 10);
    if (count >= 2) {
      target.src = SVG_GROCERY_PLACEHOLDER;
      return;
    }
    target.dataset.fallbackCount = String(count + 1);
  } else {
    target.dataset.fallbackCount = "1";
  }

  if (category && CATEGORY_FALLBACK_IMAGES[category]) {
    target.src = CATEGORY_FALLBACK_IMAGES[category];
  } else {
    target.src = DEFAULT_GROCERY_PLACEHOLDER;
  }
};
