/**
 * Package Management Utilities
 * 
 * Centralized utilities for working with packages across the application.
 */

import packagesData from '@/data/packages.json';
import { Package } from '@/lib/types/packages';

/**
 * Get all packages
 */
export function getAllPackages(): Package[] {
  return packagesData.packages as Package[];
}

/**
 * Get package by SKU
 */
export function getPackageBySku(sku: string): Package | undefined {
  return packagesData.packages.find((pkg: any) => pkg.sku === sku) as Package | undefined;
}

/**
 * Get packages by category
 */
export function getPackagesByCategory(category: string): Package[] {
  return packagesData.packages.filter((pkg: any) => pkg.category === category) as Package[];
}

/**
 * Get packages by level
 */
export function getPackagesByLevel(level: string): Package[] {
  return packagesData.packages.filter((pkg: any) => pkg.level.includes(level)) as Package[];
}

/**
 * Get packages by price range
 */
export function getPackagesByPriceRange(minPrice: number, maxPrice: number): Package[] {
  return packagesData.packages.filter(
    (pkg: any) => pkg.priceInr >= minPrice && pkg.priceInr <= maxPrice
  ) as Package[];
}

/**
 * Get featured packages (those with static pages)
 */
export function getFeaturedPackages(): Package[] {
  return packagesData.packages.filter((pkg: any) => pkg.hasStaticPage) as Package[];
}

/**
 * Get package categories
 */
export function getCategories() {
  return packagesData.categories;
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string) {
  return packagesData.categories.find((cat: any) => cat.id === id);
}

/**
 * Search packages by query
 */
export function searchPackages(query: string): Package[] {
  const lowerQuery = query.toLowerCase();
  return packagesData.packages.filter((pkg: any) => 
    pkg.name.toLowerCase().includes(lowerQuery) ||
    pkg.shortDescription.toLowerCase().includes(lowerQuery) ||
    pkg.longDescription.toLowerCase().includes(lowerQuery) ||
    pkg.features.some((f: string) => f.toLowerCase().includes(lowerQuery))
  ) as Package[];
}

/**
 * Get related packages (same category, excluding current)
 */
export function getRelatedPackages(sku: string, limit: number = 3): Package[] {
  const currentPackage = getPackageBySku(sku);
  if (!currentPackage) return [];
  
  return packagesData.packages
    .filter((pkg: any) => pkg.category === currentPackage.category && pkg.sku !== sku)
    .slice(0, limit) as Package[];
}

/**
 * Get popular packages (sorted by price - higher priced assumed more comprehensive)
 */
export function getPopularPackages(limit: number = 6): Package[] {
  return [...packagesData.packages]
    .sort((a: any, b: any) => b.priceInr - a.priceInr)
    .slice(0, limit) as Package[];
}

/**
 * Get packages with discounts
 */
export function getDiscountedPackages(): Package[] {
  return packagesData.packages.filter(
    (pkg: any) => pkg.originalPriceInr && pkg.originalPriceInr > pkg.priceInr
  ) as Package[];
}

/**
 * Calculate discount percentage
 */
export function calculateDiscountPercentage(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Get package savings
 */
export function getPackageSavings(sku: string): number {
  const pkg = getPackageBySku(sku);
  if (!pkg || !pkg.originalPriceInr) return 0;
  return pkg.originalPriceInr - pkg.priceInr;
}

/**
 * Format price in INR
 */
export function formatPriceINR(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Check if package has custom page
 */
export function hasCustomPage(sku: string): boolean {
  const pkg = getPackageBySku(sku);
  return pkg?.hasStaticPage || false;
}

/**
 * Get package route
 */
export function getPackageRoute(sku: string): string {
  return `/packages/${sku}`;
}

/**
 * Get package statistics
 */
export function getPackageStatistics() {
  const packages = getAllPackages();
  const totalValue = packages.reduce((sum, pkg) => sum + (pkg.originalPriceInr || pkg.priceInr), 0);
  const totalSavings = packages.reduce((sum, pkg) => sum + getPackageSavings(pkg.sku), 0);
  
  return {
    totalPackages: packages.length,
    totalValue,
    totalSavings,
    averagePrice: Math.round(packages.reduce((sum, pkg) => sum + pkg.priceInr, 0) / packages.length),
    categoryCounts: packagesData.categories.map(cat => ({
      category: cat.name,
      count: getPackagesByCategory(cat.id).length
    }))
  };
}

/**
 * Validate package SKU
 */
export function isValidSku(sku: string): boolean {
  return !!getPackageBySku(sku);
}

/**
 * Get package breadcrumbs
 */
export function getPackageBreadcrumbs(sku: string) {
  const pkg = getPackageBySku(sku);
  if (!pkg) return [];
  
  const category = getCategoryById(pkg.category);
  
  return [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages' },
    { label: category?.name || 'Category', href: `/packages?category=${pkg.category}` },
    { label: pkg.name, href: getPackageRoute(sku) }
  ];
}

/**
 * Sort packages by criteria
 */
export function sortPackages(
  packages: Package[], 
  criteria: 'price-low' | 'price-high' | 'name' | 'duration' | 'popular'
): Package[] {
  const sorted = [...packages];
  
  switch (criteria) {
    case 'price-low':
      return sorted.sort((a, b) => a.priceInr - b.priceInr);
    case 'price-high':
      return sorted.sort((a, b) => b.priceInr - a.priceInr);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'duration':
      return sorted.sort((a, b) => a.duration.localeCompare(b.duration));
    case 'popular':
      return sorted.sort((a, b) => b.priceInr - a.priceInr);
    default:
      return sorted;
  }
}

/**
 * Filter packages by multiple criteria
 */
export function filterPackages(filters: {
  category?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Package[] {
  let filtered = getAllPackages();
  
  if (filters.category) {
    filtered = filtered.filter(pkg => pkg.category === filters.category);
  }
  
  if (filters.level) {
    filtered = filtered.filter(pkg => pkg.level.includes(filters.level));
  }
  
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(pkg => pkg.priceInr >= filters.minPrice!);
  }
  
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(pkg => pkg.priceInr <= filters.maxPrice!);
  }
  
  if (filters.search) {
    filtered = searchPackages(filters.search).filter(pkg => 
      filtered.some(f => f.sku === pkg.sku)
    );
  }
  
  return filtered;
}

/**
 * Get package recommendations based on user interest
 */
export function getRecommendations(
  userInterests: string[], 
  currentSku?: string,
  limit: number = 3
): Package[] {
  let packages = getAllPackages();
  
  // Exclude current package
  if (currentSku) {
    packages = packages.filter(pkg => pkg.sku !== currentSku);
  }
  
  // Score packages based on interest match
  const scored = packages.map(pkg => {
    let score = 0;
    userInterests.forEach(interest => {
      const lowerInterest = interest.toLowerCase();
      if (pkg.category.toLowerCase().includes(lowerInterest)) score += 3;
      if (pkg.name.toLowerCase().includes(lowerInterest)) score += 2;
      if (pkg.features.some(f => f.toLowerCase().includes(lowerInterest))) score += 1;
    });
    return { pkg, score };
  });
  
  // Sort by score and return top matches
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.pkg);
}

