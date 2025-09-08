import { useState, useEffect, useCallback } from 'react';
import { 
  Package, 
  PackagesResponse, 
  PackageResponse, 
  UserPackage, 
  UserPackagesResponse,
  Session,
  SessionsResponse,
  PurchaseRequest,
  PurchaseResponse,
  UpgradeSuggestionResponse,
  CartItem
} from '@/lib/types/packages';

// Base API URL - adjust based on your backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

// Custom hook for fetching packages list
export function usePackages(page = 1, limit = 12) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/packages?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch packages: ${response.statusText}`);
      }
      
      const data: PackagesResponse = await response.json();
      setPackages(data.packages);
      setTotal(data.total);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch packages';
      setError(errorMessage);
      console.error('Error fetching packages:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return {
    packages,
    loading,
    error,
    total,
    refetch: fetchPackages
  };
}

// Custom hook for fetching a single package
export function usePackage(sku: string) {
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackage = useCallback(async () => {
    if (!sku) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/packages/${sku}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch package: ${response.statusText}`);
      }
      
      const data: PackageResponse = await response.json();
      setPackageData(data.package);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch package';
      setError(errorMessage);
      console.error('Error fetching package:', err);
    } finally {
      setLoading(false);
    }
  }, [sku]);

  useEffect(() => {
    fetchPackage();
  }, [fetchPackage]);

  return {
    package: packageData,
    loading,
    error,
    refetch: fetchPackage
  };
}

// Custom hook for fetching user's packages
export function useUserPackages(userId?: string) {
  const [packages, setPackages] = useState<UserPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserPackages = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/user/${userId}/packages`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user packages: ${response.statusText}`);
      }
      
      const data: UserPackagesResponse = await response.json();
      setPackages(data.packages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user packages';
      setError(errorMessage);
      console.error('Error fetching user packages:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserPackages();
  }, [fetchUserPackages]);

  return {
    packages,
    loading,
    error,
    refetch: fetchUserPackages
  };
}

// Custom hook for fetching live sessions
export function useLiveSessions(packageSku: string) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    if (!packageSku) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/packages/${packageSku}/sessions`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch sessions: ${response.statusText}`);
      }
      
      const data: SessionsResponse = await response.json();
      setSessions(data.sessions);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sessions';
      setError(errorMessage);
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  }, [packageSku]);

  return {
    sessions,
    loading,
    error,
    fetchSessions
  };
}

// Custom hook for purchase operations
export function usePurchase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchasePackage = useCallback(async (request: PurchaseRequest): Promise<PurchaseResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/packages/${request.sku}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      
      const data: PurchaseResponse = await response.json();
      
      if (!response.ok) {
        if (response.status === 422) {
          // Validation errors
          return data;
        }
        throw new Error(data.error || `Purchase failed: ${response.statusText}`);
      }
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Purchase failed';
      setError(errorMessage);
      console.error('Error purchasing package:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const claimLiveSeat = useCallback(async (packageSku: string, sessionId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/packages/${packageSku}/claim-live`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      
      if (response.status === 409) {
        // Seats exhausted
        return false;
      }
      
      if (!response.ok) {
        throw new Error(`Failed to claim seat: ${response.statusText}`);
      }
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to claim seat';
      setError(errorMessage);
      console.error('Error claiming seat:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    purchasePackage,
    claimLiveSeat,
    loading,
    error
  };
}

// Custom hook for upgrade suggestions
export function useUpgradeSuggestion(cartItems: CartItem[]) {
  const [upgradeOffer, setUpgradeOffer] = useState<UpgradeSuggestionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUpgradeSuggestion = useCallback(async () => {
    if (!cartItems.length) return;
    
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/cart/upgrade-suggestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });
      
      if (response.ok) {
        const data: UpgradeSuggestionResponse = await response.json();
        setUpgradeOffer(data);
      }
    } catch (err) {
      console.error('Error fetching upgrade suggestion:', err);
    } finally {
      setLoading(false);
    }
  }, [cartItems]);

  useEffect(() => {
    fetchUpgradeSuggestion();
  }, [fetchUpgradeSuggestion]);

  return {
    upgradeOffer,
    loading,
    refetch: fetchUpgradeSuggestion
  };
}
