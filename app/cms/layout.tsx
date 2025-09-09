'use client'

import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/cms/context/AuthContext'
import { CMSLayout } from '@/cms/components/CMSLayout'

export default function CMSRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // For login page, don't wrap with CMSLayout
  if (pathname === '/cms/login') {
    return children
  }

  return (
    <AuthProvider>
      <CMSLayout>
        {children}
      </CMSLayout>
    </AuthProvider>
  )
}
