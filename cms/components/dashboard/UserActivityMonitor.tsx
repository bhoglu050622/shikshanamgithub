'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Users, 
  MapPin, 
  Globe, 
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Activity
} from 'lucide-react'

interface ActiveUser {
  id: string
  username: string
  avatar?: string
  role: string
  location: string
  device: 'desktop' | 'mobile' | 'tablet'
  currentPage: string
  timeOnPage: number
  totalSessions: number
  lastActivity: string
  isOnline: boolean
}

interface GeographicData {
  country: string
  users: number
  percentage: number
}

export function UserActivityMonitor() {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([])
  const [geographicData, setGeographicData] = useState<GeographicData[]>([])
  const [totalActiveUsers, setTotalActiveUsers] = useState(0)

  useEffect(() => {
    const generateActiveUsers = (): ActiveUser[] => {
      const users = [
        'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Alex Brown',
        'Emily Davis', 'Chris Lee', 'Anna Garcia', 'David Kim', 'Lisa Wang'
      ]
      
      const locations = [
        'New York, US', 'London, UK', 'Mumbai, IN', 'Toronto, CA', 'Sydney, AU',
        'Berlin, DE', 'Tokyo, JP', 'São Paulo, BR', 'Paris, FR', 'Singapore, SG'
      ]

      const pages = [
        '/cms/courses', '/cms/blog', '/cms/packages', '/cms/settings',
        '/cms/media', '/cms/authors', '/cms/analytics', '/cms/users'
      ]

      const devices: ('desktop' | 'mobile' | 'tablet')[] = ['desktop', 'mobile', 'tablet']
      const roles = ['ADMIN', 'EDITOR', 'REVIEWER', 'PUBLISHER', 'VIEWER']

      return Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => ({
        id: `user-${i}`,
        username: users[Math.floor(Math.random() * users.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        currentPage: pages[Math.floor(Math.random() * pages.length)],
        timeOnPage: Math.floor(Math.random() * 300) + 30, // 30 seconds to 5 minutes
        totalSessions: Math.floor(Math.random() * 100) + 1,
        lastActivity: new Date(Date.now() - Math.random() * 300000).toISOString(), // Within last 5 minutes
        isOnline: Math.random() > 0.2 // 80% online
      }))
    }

    const generateGeographicData = (): GeographicData[] => {
      const countries = [
        { country: 'United States', baseUsers: 45 },
        { country: 'India', baseUsers: 30 },
        { country: 'United Kingdom', baseUsers: 25 },
        { country: 'Canada', baseUsers: 20 },
        { country: 'Australia', baseUsers: 15 },
        { country: 'Germany', baseUsers: 12 },
        { country: 'Japan', baseUsers: 10 },
        { country: 'Brazil', baseUsers: 8 },
        { country: 'France', baseUsers: 7 },
        { country: 'Singapore', baseUsers: 5 }
      ]

      const total = countries.reduce((sum, country) => sum + country.baseUsers, 0)

      return countries.map(country => {
        const users = Math.floor(country.baseUsers + (Math.random() - 0.5) * 10)
        return {
          country: country.country,
          users: Math.max(1, users),
          percentage: (users / total) * 100
        }
      }).sort((a, b) => b.users - a.users)
    }

    const updateData = () => {
      const users = generateActiveUsers()
      setActiveUsers(users)
      setTotalActiveUsers(users.length + Math.floor(Math.random() * 50) + 20)
      setGeographicData(generateGeographicData())
    }

    updateData()

    // Update every 8 seconds
    const interval = setInterval(updateData, 8000)
    return () => clearInterval(interval)
  }, [])

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="w-3 h-3" />
      case 'mobile': return <Smartphone className="w-3 h-3" />
      case 'tablet': return <Tablet className="w-3 h-3" />
      default: return <Monitor className="w-3 h-3" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800'
      case 'PUBLISHER': return 'bg-purple-100 text-purple-800'
      case 'REVIEWER': return 'bg-blue-100 text-blue-800'
      case 'EDITOR': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimeOnPage = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Active Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Active Users
            <Badge className="ml-2 bg-green-100 text-green-800">
              {totalActiveUsers} online
            </Badge>
          </CardTitle>
          <CardDescription>
            Users currently active in the CMS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {activeUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xs">
                        {user.username.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      user.isOnline ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {user.username}
                      </span>
                      <Badge className={getRoleColor(user.role)} variant="outline">
                        {user.role}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{user.location}</span>
                      {getDeviceIcon(user.device)}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <span className="truncate">{user.currentPage}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeOnPage(user.timeOnPage)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Geographic Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Geographic Distribution
          </CardTitle>
          <CardDescription>
            User distribution by country
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {geographicData.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded text-xs font-bold text-blue-600">
                      {index + 1}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {country.country}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {country.users} users
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-10 text-right">
                      {country.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
