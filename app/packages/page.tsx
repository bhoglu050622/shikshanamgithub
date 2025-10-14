'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PackageCard, PackageCardSkeleton } from '@/components/packages/PackageCard';
import { BuyModal } from '@/components/packages/BuyModal';
import { usePackages } from '@/lib/hooks/usePackages';
import { usePurchase } from '@/lib/hooks/usePackages';
import { Package, PurchaseRequest } from '@/lib/types/packages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

// Safe wrapper component to catch hydration errors
function SafePackagesPage() {
  try {
    return <PackagesPageContent />;
  } catch (error) {
    console.error('Packages page error:', error);
    return (
      <div className="min-h-screen bg-parchment-ivory flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Loading Error</h1>
          <p className="text-slate-600 mb-4">There was an issue loading the packages. Please refresh the page.</p>
          <Button onClick={() => typeof window !== 'undefined' && window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }
}

function PackagesPageContent() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  
  const { packages, loading, error, total } = usePackages(page, 12);
  const { purchasePackage } = usePurchase();

  // Runtime guard to catch any module loading errors
  if (error && (error.includes('Module not found') || error?.includes('factory'))) {
    console.error('Module loading error:', error);
    return (
      <div className="min-h-screen bg-parchment-ivory flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Loading Error</h1>
          <p className="text-slate-600 mb-4">There was an issue loading the packages. Please refresh the page.</p>
          <Button onClick={() => typeof window !== 'undefined' && window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  const handleViewDetails = (sku: string) => {
    router.push(`/packages/${sku}`);
  };

  const handleBuy = (sku: string) => {
    const pkg = Array.isArray(packages) ? packages.find(p => p.sku === sku) : null;
    if (pkg) {
      setSelectedPackage(pkg);
      setIsBuyModalOpen(true);
    }
  };

  const handlePurchase = async (request: PurchaseRequest) => {
    try {
      await purchasePackage(request);
      setIsBuyModalOpen(false);
      router.push('/me/packages');
      // Show success toast here
    } catch (error) {
      console.error('Purchase failed:', error);
      // Handle error - modal will show validation errors
    }
  };

  const filteredPackages = Array.isArray(packages) ? packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-saffron-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Learning Packages
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive bundles of courses, live sessions, and mentoring to accelerate your spiritual journey
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-slate-300 focus:border-saffron-400 focus:ring-saffron-400"
            />
          </div>
          <Button variant="outline" className="border-slate-300">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <PackageCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <p className="text-lg font-semibold">Failed to load packages</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.sku}
                  package={pkg}
                  onViewDetails={handleViewDetails}
                  onBuy={handleBuy}
                />
              ))}
            </div>

            {/* Pagination */}
            {total > 12 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-slate-600">
                    Page {page} of {Math.ceil(total / 12)}
                  </span>
                  <Button
                    variant="outline"
                    disabled={page >= Math.ceil(total / 12)}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-500">
              <p className="text-lg font-semibold mb-2">No packages found</p>
              <p className="text-sm">
                {searchQuery ? 'Try adjusting your search terms' : 'No packages available at the moment'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Buy Modal */}
      {selectedPackage && (
        <BuyModal
          isOpen={isBuyModalOpen}
          onClose={() => {
            setIsBuyModalOpen(false);
            setSelectedPackage(null);
          }}
          package={selectedPackage}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
}

export default SafePackagesPage;
