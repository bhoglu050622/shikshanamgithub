'use client'

import { useAuth } from '@/cms/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NotificationCenter } from '@/cms/components/dashboard/NotificationCenter'
import {
  BookOpen,
  FileText,
  Package,
  Users,
  Settings,
  Image,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Activity,
  Server,
  Globe,
} from 'lucide-react'

interface CMSLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/cms', icon: BarChart3 },
  { name: 'Content', href: '/cms/content', icon: FileText },
  { name: 'Editor', href: '/cms/editor', icon: BookOpen },
  { name: 'Media', href: '/cms/media', icon: Image },
  { name: 'Revisions', href: '/cms/revisions', icon: Activity },
  { name: 'Preview & Staging', href: '/cms/preview', icon: Globe },
  { name: 'Publishing', href: '/cms/publishing', icon: Server },
  { name: 'Integrations', href: '/cms/integrations', icon: Package },
  { name: 'Users & Permissions', href: '/cms/users', icon: Users },
  { name: 'Settings', href: '/cms/settings', icon: Settings },
]

export function CMSLayout({ children }: CMSLayoutProps) {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/cms/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800'
      case 'PUBLISHER': return 'bg-purple-100 text-purple-800'
      case 'REVIEWER': return 'bg-blue-100 text-blue-800'
      case 'EDITOR': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Shikshanam CMS</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </a>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{user.username}</span>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    {user.email && (
                      <p className="text-sm text-gray-500">{user.email}</p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
