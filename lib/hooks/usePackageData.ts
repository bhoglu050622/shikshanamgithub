import { useState, useEffect, useCallback } from 'react';

// Type definition for package data
export interface PackageData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  originalPrice: string;
  discount?: string;
  duration: string;
  level: string;
  rating: number;
  reviewCount: number;
  type: string;
  status: string;
  checkoutLink: string;
  contactNumber: string;
  features?: any[];
  benefits?: string[];
  courses?: any[];
  lastModified?: string;
  views?: number;
  popularity?: number;
}

export interface UsePackageDataReturn {
  packageData: PackageData;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePackageData(packageId: string, fallbackData: PackageData): UsePackageDataReturn {
  const [packageData, setPackageData] = useState<PackageData>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackageData = useCallback(async () => {
    // CMS API removed - using static fallback data only
    setLoading(true);
    setError(null);
    
    // Simulate async behavior for consistency
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setPackageData(fallbackData);
    setLoading(false);
  }, [packageId, fallbackData]);

  useEffect(() => {
    fetchPackageData();
  }, [packageId, fetchPackageData]);

  return {
    packageData,
    loading,
    error,
    refetch: fetchPackageData
  };
}
