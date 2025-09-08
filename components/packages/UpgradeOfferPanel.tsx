'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UpgradeOfferPanelProps } from '@/lib/types/packages';
import { cn } from '@/lib/utils';
import { ArrowUp, X, Check, Sparkles } from 'lucide-react';

export function UpgradeOfferPanel({ offer, onAccept, onDismiss }: UpgradeOfferPanelProps) {
  return (
    <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <Badge className="bg-emerald-600 text-white font-semibold">
              Upgrade Offer
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-emerald-800 mb-2">
              Upgrade to {offer.packageName}
            </h3>
            <p className="text-sm text-emerald-700 mb-3">
              Get this comprehensive package and save {offer.savingsPercent}% on your total purchase!
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-emerald-200">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Current cart value:</span>
                <span className="font-medium">₹{offer.currentCartValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Package price:</span>
                <span className="font-medium">₹{offer.packagePriceInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold border-t border-slate-200 pt-2">
                <span>You save:</span>
                <span>₹{(offer.currentCartValue - offer.packagePriceInr).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <Check className="h-4 w-4" />
            <span>Includes all courses in your cart plus additional content</span>
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={onAccept}
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Accept Upgrade
            </Button>
            <Button
              variant="outline"
              className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
              onClick={onDismiss}
            >
              Keep Current
            </Button>
          </div>

          <p className="text-xs text-emerald-600 text-center">
            This offer is available for a limited time
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
