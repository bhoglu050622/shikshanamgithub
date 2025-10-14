'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PackageCardProps } from '@/lib/types/packages';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useAuth } from '@/lib/auth/AuthContext';
import { SSOLoginModal } from '@/components/auth/SSOLoginModal';

export function PackageCard({ package: pkg, onViewDetails, onBuy }: PackageCardProps) {
  const savings = pkg.originalPriceInr ? pkg.originalPriceInr - pkg.priceInr : 0;
  const savingsPercent = pkg.originalPriceInr ? Math.round((savings / pkg.originalPriceInr) * 100) : 0;
  
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBuyClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    onBuy(pkg.sku);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    onBuy(pkg.sku);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-saffron-400 bg-white h-full flex flex-col">
      <CardHeader className="p-0">
        {pkg.thumbnailUrl && (
          <div className="relative w-full h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-saffron-50 to-amber-50">
            <Image
              src={pkg.thumbnailUrl}
              alt={pkg.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {savings > 0 && (
              <Badge 
                className="absolute top-3 right-3 bg-emerald-600 text-white font-semibold text-xs whitespace-nowrap max-w-[calc(100%-24px)] overflow-hidden text-ellipsis"
                variant="default"
              >
                Save ₹{savings.toLocaleString()}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
        <CardTitle className="text-lg sm:text-xl font-bold text-slate-800 mb-2 line-clamp-2 overflow-wrap-anywhere">
          {pkg.name}
        </CardTitle>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 overflow-wrap-anywhere flex-1">
          {pkg.shortDescription}
        </p>
        
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <span className="text-xl sm:text-2xl font-bold text-saffron-600 whitespace-nowrap">
            ₹{pkg.priceInr.toLocaleString()}
          </span>
          {pkg.originalPriceInr && pkg.originalPriceInr > pkg.priceInr && (
            <span className="text-base sm:text-lg text-slate-400 line-through whitespace-nowrap">
              ₹{pkg.originalPriceInr.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* Package features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pkg.livePassCount && pkg.livePassCount > 0 && (
            <Badge variant="outline" className="text-xs whitespace-nowrap">
              {pkg.livePassCount} Live Sessions
            </Badge>
          )}
          {pkg.mentorHours && pkg.mentorHours > 0 && (
            <Badge variant="outline" className="text-xs whitespace-nowrap">
              {pkg.mentorHours}h Mentoring
            </Badge>
          )}
          {pkg.certificateIncluded && (
            <Badge variant="outline" className="text-xs whitespace-nowrap">
              Certificate
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 sm:p-6 pt-0 flex flex-col sm:flex-row gap-3 mt-auto">
        <Button
          variant="outline"
          className="w-full sm:flex-1 border-saffron-400 text-saffron-600 hover:bg-saffron-50 min-h-[44px]"
          onClick={() => onViewDetails(pkg.sku)}
          aria-label={`View details for ${pkg.name}`}
        >
          View details
        </Button>
        <Button
          className="w-full sm:flex-1 bg-saffron-600 hover:bg-saffron-700 text-white min-h-[44px]"
          onClick={handleBuyClick}
          aria-label={`Buy ${pkg.name} for ₹${pkg.priceInr.toLocaleString()}`}
        >
          Buy
        </Button>
      </CardFooter>

      <SSOLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </Card>
  );
}

// Skeleton loader for PackageCard
export function PackageCardSkeleton() {
  return (
    <Card className="border-2 bg-white">
      <CardHeader className="p-0">
        <div className="w-full h-48 bg-slate-200 animate-pulse rounded-t-xl" />
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="h-6 bg-slate-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-slate-200 rounded animate-pulse mb-1" />
        <div className="h-4 bg-slate-200 rounded animate-pulse mb-1 w-3/4" />
        <div className="h-4 bg-slate-200 rounded animate-pulse mb-4 w-1/2" />
        
        <div className="h-8 bg-slate-200 rounded animate-pulse mb-4 w-1/3" />
        
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-slate-200 rounded animate-pulse w-20" />
          <div className="h-6 bg-slate-200 rounded animate-pulse w-16" />
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-3">
        <div className="flex-1 h-10 bg-slate-200 rounded animate-pulse" />
        <div className="flex-1 h-10 bg-slate-200 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}
