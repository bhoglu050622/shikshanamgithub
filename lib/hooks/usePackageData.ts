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
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/cms/package/${packageId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setPackageData(data.data);
        }
      } else {
        console.warn(`Failed to fetch package data for ${packageId}, using fallback data`);
      }
    } catch (err) {
      console.error(`Error fetching package data for ${packageId}:`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [packageId]);

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
