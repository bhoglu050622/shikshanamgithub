import { useState, useEffect } from 'react'
import { UserPackage, PurchaseRequest } from '@/lib/types/packages'
import packagesData from '@/data/packages.json'

// Load packages from centralized data file
const mockPackages = packagesData.packages

export interface Package {
  id: string
  sku: string
  name: string
  shortDescription: string
  longDescription: string
  description: string
  price: number
  priceInr: number
  currency: string
  features: string[]
  image: string
  thumbnailUrl?: string
  category: string
  level: string
  duration: string
  instructor: string
  livePassCount?: number
  mentorHours?: number
  certificateIncluded: boolean
  includedCourses: Array<{
    id: string
    title: string
    duration: string
    thumbnailUrl?: string
    link: string
  }>
}

export function usePackages(page = 1, limit = 12) {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchPackages = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        setPackages(mockPackages)
        setError(null)
      } catch (err) {
        setError('Failed to fetch packages')
        console.error('Error fetching packages:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [page, limit])

  const getPackageBySku = (sku: string): Package | undefined => {
    return packages.find(pkg => pkg.sku === sku)
  }

  const getPackagesByCategory = (category: string): Package[] => {
    return packages.filter(pkg => pkg.category === category)
  }

  return {
    packages,
    loading,
    error,
    total: mockPackages.length,
    getPackageBySku,
    getPackagesByCategory
  }
}

// Additional hooks for compatibility
export function useUserPackages(userId?: string) {
  const { packages, loading, error } = usePackages()
  
  // Convert Package objects to UserPackage objects
  const userPackages: UserPackage[] = packages.map(pkg => ({
    sku: pkg.sku,
    name: pkg.name,
    accessExpiresAt: undefined, // Lifetime access
    status: 'active' as const,
    progress: Math.floor(Math.random() * 100), // Mock progress
    availableMentorHours: pkg.category === 'sanskrit' ? 5 : 3,
    certificateStatus: 'issued' as const,
    includedCourses: [
      {
        id: '1',
        title: 'Introduction Course',
        duration: '2 hours',
        link: `/courses/${pkg.sku}-intro`
      }
    ]
  }))
  
  return {
    packages: userPackages,
    loading,
    error
  }
}

export function usePackage(sku: string) {
  const { getPackageBySku, loading, error } = usePackages()
  const packageData = getPackageBySku(sku)
  
  return {
    package: packageData,
    loading,
    error
  }
}

interface LiveSession {
  id: string;
  date: string;
  seatRemaining: number;
  maxSeats: number;
  title: string;
  description: string;
}

export function useLiveSessions(sku?: string) {
  const [sessions, setSessions] = useState<LiveSession[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const fetchSessions = async () => {
    setLoading(true)
    try {
      // Mock sessions data
      await new Promise(resolve => setTimeout(resolve, 500))
      setSessions([
        {
          id: '1',
          date: '2024-02-15T10:00:00Z',
          seatRemaining: 5,
          maxSeats: 20,
          title: 'Live Sanskrit Session',
          description: 'Interactive Sanskrit learning session'
        }
      ])
      setError(null)
    } catch (err) {
      setError('Failed to fetch sessions')
    } finally {
      setLoading(false)
    }
  }
  
  return {
    sessions,
    loading,
    error,
    fetchSessions
  }
}

export function usePurchase() {
  const [loading, setLoading] = useState(false)
  
  const purchasePackage = async (request: PurchaseRequest) => {
    setLoading(true)
    try {
      // Mock purchase process
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Package purchased:', request.sku)
    } catch (error) {
      console.error('Purchase failed:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return {
    purchasePackage,
    loading
  }
}
