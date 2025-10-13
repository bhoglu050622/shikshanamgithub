'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BuyModalProps, PurchaseRequest } from '@/lib/types/packages';
import { cn } from '@/lib/utils';
import { X, Check, AlertCircle, Loader2 } from 'lucide-react';

export function BuyModal({ 
  isOpen, 
  onClose, 
  package: pkg, 
  upgradeOffer, 
  onPurchase, 
  onAcceptUpgrade 
}: BuyModalProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseError, setPurchaseError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});
  const [preferredSessionId, setPreferredSessionId] = useState<string>('');
  
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusableElement = dialogRef.current.querySelector('button, input, [tabindex]:not([tabindex="-1"])') as HTMLElement;
      focusableElement?.focus();
    }
  }, [isOpen]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setPromoCode('');
      setPromoCodeError('');
      setAppliedPromo(null);
      setPurchaseError('');
      setValidationErrors({});
      setPreferredSessionId('');
    }
  }, [isOpen]);

  const handlePromoCodeApply = async () => {
    if (!promoCode.trim()) return;
    
    setIsApplyingPromo(true);
    setPromoCodeError('');
    
    try {
      // Simulate promo code validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock promo code logic - replace with actual API call
      const validPromoCodes: Record<string, number> = {
        'WELCOME10': 0.1,
        'SAVE20': 0.2,
        'STUDENT15': 0.15
      };
      
      const discount = validPromoCodes[promoCode.toUpperCase()];
      if (discount) {
        setAppliedPromo({ code: promoCode.toUpperCase(), discount });
        setPromoCodeError('');
      } else {
        setPromoCodeError('Invalid promo code');
      }
    } catch (error) {
      setPromoCodeError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handlePurchase = async (paymentType: 'immediate' | 'invoice') => {
    setIsPurchasing(true);
    setPurchaseError('');
    setValidationErrors({});
    
    try {
      const request: PurchaseRequest = {
        sku: pkg.sku,
        promoCode: appliedPromo?.code,
        preferredSessionId: preferredSessionId || undefined
      };
      
      await onPurchase(request);
    } catch (error: any) {
      if (error.validationErrors) {
        setValidationErrors(error.validationErrors);
      } else {
        setPurchaseError(error.message || 'Purchase failed');
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const calculateTotal = () => {
    let total = pkg.priceInr;
    if (appliedPromo) {
      total = total * (1 - appliedPromo.discount);
    }
    return Math.round(total);
  };

  const calculateSavings = () => {
    const originalSavings = pkg.originalPriceInr ? pkg.originalPriceInr - pkg.priceInr : 0;
    const promoDiscount = appliedPromo ? pkg.priceInr * appliedPromo.discount : 0;
    return originalSavings + promoDiscount;
  };

  const totalSavings = calculateSavings();
  const finalTotal = calculateTotal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        ref={dialogRef}
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Complete Your Purchase
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Review your package details and complete your enrollment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Package Summary */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-2">{pkg.name}</h3>
            <p className="text-sm text-slate-600 mb-3">{pkg.shortDescription}</p>
            
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-saffron-600">
                ₹{pkg.priceInr.toLocaleString()}
              </span>
              {pkg.originalPriceInr && pkg.originalPriceInr > pkg.priceInr && (
                <span className="text-sm text-slate-400 line-through">
                  ₹{pkg.originalPriceInr.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Upgrade Offer */}
          {upgradeOffer && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-emerald-800 mb-1">
                    Upgrade to {upgradeOffer.packageName}
                  </h4>
                  <p className="text-sm text-emerald-700 mb-2">
                    Get this package for ₹{upgradeOffer.packagePriceInr.toLocaleString()} and save {upgradeOffer.savingsPercent}%
                  </p>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => onAcceptUpgrade?.(upgradeOffer.packageSku)}
                  >
                    Switch to bundle
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {/* dismiss upgrade offer */}}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Included Courses */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-3">Included Courses</h4>
            <div className="space-y-2">
              {pkg.includedCourses.map((course, index) => (
                <div key={course.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-saffron-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{course.title}</p>
                      <p className="text-sm text-slate-500">{course.duration}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-saffron-600 hover:text-saffron-700"
                    onClick={() => window.open(course.link, '_blank')}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <div>
            <Label htmlFor="promo-code" className="text-sm font-medium text-slate-700">
              Promo Code (Optional)
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="promo-code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1"
                disabled={isApplyingPromo || !!appliedPromo}
              />
              {!appliedPromo ? (
                <Button
                  variant="outline"
                  onClick={handlePromoCodeApply}
                  disabled={!promoCode.trim() || isApplyingPromo}
                >
                  {isApplyingPromo ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Apply'
                  )}
                </Button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-md">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">{appliedPromo.code}</span>
                </div>
              )}
            </div>
            {promoCodeError && (
              <p className="text-sm text-red-600 mt-1">{promoCodeError}</p>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Package Price</span>
                <span>₹{pkg.priceInr.toLocaleString()}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promo Discount ({appliedPromo.code})</span>
                  <span>-₹{Math.round(pkg.priceInr * appliedPromo.discount).toLocaleString()}</span>
                </div>
              )}
              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Total Savings</span>
                  <span>₹{totalSavings.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Validation Errors */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-800 mb-2">Purchase Requirements</h4>
                  {Object.entries(validationErrors).map(([field, errors]) => (
                    <div key={field} className="mb-2">
                      {errors.map((error, index) => (
                        <p key={index} className="text-sm text-red-700 mb-1">
                          {error}
                        </p>
                      ))}
                    </div>
                  ))}
                  <div className="mt-3 space-x-2">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                      See Prerequisites
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Purchase Error */}
          {purchaseError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">Purchase Failed</h4>
                  <p className="text-sm text-red-700">{purchaseError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isPurchasing}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-saffron-600 hover:bg-saffron-700 text-white"
              onClick={() => handlePurchase('immediate')}
              disabled={isPurchasing}
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                `Buy Now - ₹${finalTotal.toLocaleString()}`
              )}
            </Button>
          </div>

          {/* Pay Later Option */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-700"
              onClick={() => handlePurchase('invoice')}
              disabled={isPurchasing}
            >
              Pay Later / Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
