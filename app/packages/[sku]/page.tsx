'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PackageDetail } from '@/components/packages/PackageDetail';
import { BuyModal } from '@/components/packages/BuyModal';
import { usePackage, useLiveSessions, usePurchase } from '@/lib/hooks/usePackages';
import { PurchaseRequest } from '@/lib/types/packages';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sku = params.sku as string;
  
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  
  const { package: pkg, loading: packageLoading, error: packageError } = usePackage(sku);
  const { sessions, loading: sessionsLoading, fetchSessions } = useLiveSessions(sku);
  const { purchasePackage } = usePurchase();

  // Fetch sessions when package loads
  React.useEffect(() => {
    if (pkg && pkg.livePassCount && pkg.livePassCount > 0) {
      fetchSessions();
    }
  }, [pkg, fetchSessions]);

  const handleBuy = (packageSku: string) => {
    setIsBuyModalOpen(true);
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

  const handleClaimSeat = async (sessionId: string) => {
    try {
      // This would be implemented with the actual API call
      console.log('Claiming seat for session:', sessionId);
      // Show success/error feedback
    } catch (error) {
      console.error('Failed to claim seat:', error);
    }
  };

  if (packageLoading) {
    return (
      <div className="min-h-screen bg-parchment-ivory flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-saffron-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (packageError || !pkg) {
    return (
      <div className="min-h-screen bg-parchment-ivory flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-600 mb-4">
            <p className="text-lg font-semibold">Package Not Found</p>
            <p className="text-sm">{packageError || 'The package you are looking for does not exist.'}</p>
          </div>
          <div className="space-y-3">
            <Link href="/packages">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Packages
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Back Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/packages">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Packages
            </Button>
          </Link>
        </div>
      </div>

      <PackageDetail
        package={pkg}
        sessions={sessions}
        onBuy={handleBuy}
        onClaimSeat={handleClaimSeat}
      />

      {/* Buy Modal */}
      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        package={pkg}
        onPurchase={handlePurchase}
      />
    </>
  );
}
