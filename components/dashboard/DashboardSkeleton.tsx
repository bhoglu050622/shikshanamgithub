/**
 * Dashboard Skeleton Component
 * Loading skeleton for the dashboard page
 */

import { Card } from '@/components/ui/card';

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2 animate-pulse" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
        </div>

        {/* Summary Cards Skeleton */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
                  </div>
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
                </div>
                <div className="mt-4 flex space-x-2">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Cards Skeleton */}
            <div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-6 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <div className="h-48 bg-slate-200 dark:bg-slate-700 animate-pulse" />
                    <div className="p-6">
                      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2 animate-pulse" />
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-3 animate-pulse" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2 animate-pulse" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-4 animate-pulse" />
                      <div className="flex space-x-2 mb-4">
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-14 animate-pulse" />
                      </div>
                      <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Activity Feed Skeleton */}
            <div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-6 animate-pulse" />
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="p-6">
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 animate-pulse" />
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse" />
                          </div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-2 animate-pulse" />
                          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Recommendations Skeleton */}
            <div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-40 mb-6 animate-pulse" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2 animate-pulse" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-1 animate-pulse" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-3 animate-pulse" />
                        <div className="flex space-x-2 mb-3">
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12 animate-pulse" />
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse" />
                        </div>
                        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Transactions Skeleton */}
            <div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-40 mb-6 animate-pulse" />
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="p-6">
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
                          <div className="flex-1">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-1 animate-pulse" />
                            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 animate-pulse" />
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-1 animate-pulse" />
                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12 animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
