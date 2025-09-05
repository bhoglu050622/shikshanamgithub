'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import ErrorBoundary from '../ErrorBoundary'

// Dynamically import Yantra3D with no SSR
const Yantra3D = dynamic(() => import('./Yantra3D'), {
  ssr: false,
  loading: () => (
    <div className="w-32 h-32 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-turquoise-200 border-t-turquoise-600 rounded-full animate-spin"></div>
    </div>
  )
})

export default function DynamicYantra3D({ className = '' }: { className?: string }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="w-32 h-32 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-turquoise-200 border-t-turquoise-600 rounded-full animate-spin"></div>
        </div>
      }>
        <Yantra3D className={className} />
      </Suspense>
    </ErrorBoundary>
  )
}
