/**
 * Praveen Kiranam and General Stores - Formatting Utilities
 */

/**
 * Formats a number as Indian Rupees (₹) following the Indian numbering system (e.g. ₹1,499, ₹12,999, ₹1,50,000)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  
  const roundedAmount = Math.round(amount);
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(roundedAmount);

  return `₹${formattedNumber}`;
}

export const formatCurrency = formatINR;

/**
 * Formats date string to Indian format (DD/MM/YYYY or DD MMM YYYY)
 */
export function formatDate(dateString: string, includeTime: boolean = false): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...(includeTime ? { hour: '2-digit', minute: '2-digit', hour12: true } : {})
  };

  return new Intl.DateTimeFormat('en-IN', options).format(date);
}

/**
 * Generates SKU for product item
 */
export function generateSKU(category: string, brand: string, variantWeight: string): string {
  const catCode = category.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'KIR');
  const brandCode = brand.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'GEN');
  const rand = Math.floor(100 + Math.random() * 900);
  return `PK-${catCode}-${brandCode}-${variantWeight.replace(/\s+/g, '')}-${rand}`;
}

/**
 * Generates 13-digit EAN Barcode
 */
export function generateBarcode(): string {
  const prefix = '890'; // India GS1 prefix
  const middle = Math.floor(100000000 + Math.random() * 900000000).toString();
  return `${prefix}${middle}`;
}

/**
 * Calculates GST components (CGST & SGST for intra-state Telangana sales)
 */
export function calculateGST(sellingPriceWithGst: number, gstRatePercent: number) {
  // Price = BasePrice * (1 + GstRate / 100)
  const basePrice = sellingPriceWithGst / (1 + gstRatePercent / 100);
  const totalGst = sellingPriceWithGst - basePrice;
  const cgst = totalGst / 2;
  const sgst = totalGst / 2;

  return {
    basePrice,
    totalGst,
    cgst,
    sgst,
    gstRatePercent
  };
}
