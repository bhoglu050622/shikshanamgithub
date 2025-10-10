/**
 * Currency Utilities
 * Handles currency conversion and formatting for the dashboard
 */

// Current exchange rates (update these regularly in production)
const EXCHANGE_RATES = {
  USD_TO_INR: 83.5,
  INR_TO_USD: 1 / 83.5,
  // Add more currencies as needed
};

export interface CurrencyConfig {
  defaultCurrency: 'INR' | 'USD';
  userLocation?: string;
}

/**
 * Convert amount from USD to target currency
 */
export function convertCurrency(amountUSD: number, targetCurrency: 'INR' | 'USD' = 'INR'): number {
  if (targetCurrency === 'USD') {
    return amountUSD;
  }
  
  if (targetCurrency === 'INR') {
    return Math.round(amountUSD * EXCHANGE_RATES.USD_TO_INR);
  }
  
  return amountUSD;
}

/**
 * Format currency amount with proper symbol and locale formatting
 */
export function formatCurrency(amount: number, currency: 'INR' | 'USD' = 'INR'): string {
  if (amount === 0) return 'Free';
  
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US')}`;
  }
  
  return `${amount.toLocaleString()} ${currency}`;
}

/**
 * Get user's preferred currency based on location
 */
export function getUserCurrency(userLocation?: string): 'INR' | 'USD' {
  // Default to INR for Indian users, USD for others
  if (userLocation === 'IN' || userLocation === 'India') {
    return 'INR';
  }
  
  return 'USD';
}

/**
 * Convert and format price for display
 */
export function formatPrice(priceUSD: number, userCurrency: 'INR' | 'USD' = 'INR'): string {
  const convertedAmount = convertCurrency(priceUSD, userCurrency);
  return formatCurrency(convertedAmount, userCurrency);
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: 'INR' | 'USD'): string {
  switch (currency) {
    case 'INR':
      return '₹';
    case 'USD':
      return '$';
    default:
      return currency;
  }
}

/**
 * Calculate total investment in user's preferred currency
 */
export function calculateTotalInvestment(
  transactions: Array<{ amount: number; currency: string }>,
  userCurrency: 'INR' | 'USD' = 'INR'
): number {
  return transactions.reduce((total, transaction) => {
    if (transaction.currency === userCurrency) {
      return total + transaction.amount;
    }
    
    // Convert to user's currency if different
    if (transaction.currency === 'USD' && userCurrency === 'INR') {
      return total + convertCurrency(transaction.amount, 'INR');
    }
    
    if (transaction.currency === 'INR' && userCurrency === 'USD') {
      return total + Math.round(transaction.amount * EXCHANGE_RATES.INR_TO_USD);
    }
    
    return total;
  }, 0);
}
