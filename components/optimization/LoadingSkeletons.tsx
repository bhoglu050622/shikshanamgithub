/**
 * Loading Skeletons for Dynamic Imports
 * 
 * Provides visually pleasing loading states for dynamically imported components
 * to prevent layout shift and improve perceived performance.
 */

export function SectionSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="container mx-auto px-4 py-16">
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 mb-4"></div>
        <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AlignYourselfSkeleton() {
  return (
    <div className="h-96 bg-gradient-to-r from-orange-50 to-amber-50 animate-pulse">
      <SectionSkeleton />
    </div>
  )
}

export function SchoolsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 animate-pulse">
      <div className="container mx-auto px-4 py-16">
        <div className="h-12 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg w-2/3 mx-auto mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MeetGurusSkeleton() {
  return (
    <div className="h-96 bg-gradient-to-r from-purple-50 to-pink-50 animate-pulse">
      <SectionSkeleton />
    </div>
  )
}

export function CommunityPostsSkeleton() {
  return (
    <div className="h-96 bg-gradient-to-r from-green-50 to-teal-50 animate-pulse">
      <div className="container mx-auto px-4 py-16">
        <div className="h-10 bg-gradient-to-r from-green-200 to-teal-200 rounded-lg w-1/2 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-gradient-to-r from-green-200 to-teal-200 rounded-lg"></div>
              <div className="h-6 bg-gradient-to-r from-green-200 to-teal-200 rounded w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-green-200 to-teal-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FoundersMissionSkeleton() {
  return (
    <div className="h-96 bg-gradient-to-r from-yellow-50 to-orange-50 animate-pulse">
      <SectionSkeleton />
    </div>
  )
}

export function ContributeSkeleton() {
  return (
    <div className="h-96 bg-gradient-to-r from-red-50 to-pink-50 animate-pulse">
      <SectionSkeleton />
    </div>
  )
}

export function DownloadAppSkeleton() {
  return (
    <div className="h-96 bg-gradient-to-r from-indigo-50 to-purple-50 animate-pulse">
      <SectionSkeleton />
    </div>
  )
}

export function FAQSkeleton() {
  return (
    <div className="h-96 bg-gradient-to-r from-gray-50 to-slate-50 animate-pulse">
      <div className="container mx-auto px-4 py-16">
        <div className="h-10 bg-gradient-to-r from-gray-200 to-slate-200 rounded-lg w-1/3 mx-auto mb-12"></div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gradient-to-r from-gray-200 to-slate-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

