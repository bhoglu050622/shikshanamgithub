'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import ErrorBoundary from '../ErrorBoundary'

// Temporarily disabled dynamic import to troubleshoot
// const Lotus3D = dynamic(() => import('./Lotus3D'), {
//   ssr: false,
//   loading: () => (
//     <div className="w-32 h-32 flex items-center justify-center">
//       <div className="w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
//     </div>
//   )
// })

// Simple fallback component
const Lotus3D = ({ className = '' }: { className?: string }) => (
  <div className={`w-32 h-32 flex items-center justify-center ${className}`}>
    <div className="w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
  </div>
)

export default function DynamicLotus3D({ className = '' }: { className?: string }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="w-32 h-32 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-saffron-200 border-t-saffron-600 rounded-full animate-spin"></div>
        </div>
      }>
        <Lotus3D className={className} />
      </Suspense>
    </ErrorBoundary>
  )
}
