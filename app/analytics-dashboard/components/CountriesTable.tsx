/**
 * Countries Table Component
 * Displays visitor breakdown by country
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Globe, MapPin } from 'lucide-react'

interface CountryData {
  country: string
  count: number
}

interface CountriesTableProps {
  dateRange: { start: string; end: string }
}

export default function CountriesTable({ dateRange }: CountriesTableProps) {
  const [countries, setCountries] = useState<CountryData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/analytics/agg/countries?start=${dateRange.start}&end=${dateRange.end}&limit=10`
        )
        
        if (response.ok) {
          const countriesData = await response.json()
          setCountries(countriesData)
        }
      } catch (error) {
        console.error('Failed to fetch countries data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [dateRange])

  // Country flag emoji mapping (simplified)
  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'United States': '🇺🇸',
      'India': '🇮🇳',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
      'Brazil': '🇧🇷',
      'Russia': '🇷🇺',
      'South Korea': '🇰🇷',
      'Italy': '🇮🇹',
      'Spain': '🇪🇸',
      'Netherlands': '🇳🇱',
      'Mexico': '🇲🇽',
      'Singapore': '🇸🇬',
      'Switzerland': '🇨🇭',
      'Sweden': '🇸🇪',
      'Norway': '🇳🇴'
    }
    return flags[country] || '🌍'
  }

  const maxCount = countries.length > 0 ? countries[0].count : 1
  const totalVisitors = countries.reduce((sum, country) => sum + country.count, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          <div>
            <CardTitle className="text-lg">Countries</CardTitle>
            <CardDescription>Visitors by location</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          ))
        ) : countries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No location data available</p>
            <p className="text-sm">Location tracking not enabled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {countries.map((country, index) => {
              const percentage = totalVisitors > 0 ? (country.count / totalVisitors) * 100 : 0
              const barPercentage = (country.count / maxCount) * 100
              
              return (
                <div key={`${country.country}-${index}`} className="group">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getCountryFlag(country.country)}</span>
                      <div>
                        <h4 className="font-medium text-sm">{country.country}</h4>
                        <p className="text-xs text-muted-foreground">
                          {percentage.toFixed(1)}% of total
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium text-sm">
                        {country.count.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        visitors
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-muted rounded-full h-1">
                    <div
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${barPercentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
            
            {/* Summary */}
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total countries</span>
                <span className="font-medium">{countries.length}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
