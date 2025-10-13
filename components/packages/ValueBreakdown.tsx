'use client';

import React from 'react';
import { CheckCircle, TrendingUp, DollarSign, Gift, Clock, Users, Award, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ValueItem {
  name: string;
  individualPrice: number;
  included: boolean;
}

interface ValueBreakdownProps {
  items: ValueItem[];
  bundlePrice: number;
  currency?: string;
  features?: string[];
}

export function ValueBreakdown({ 
  items, 
  bundlePrice, 
  currency = '₹',
  features = []
}: ValueBreakdownProps) {
  const totalIndividualPrice = items.reduce((sum, item) => sum + item.individualPrice, 0);
  const savings = totalIndividualPrice - bundlePrice;
  const savingsPercent = Math.round((savings / totalIndividualPrice) * 100);

  return (
    <div className="space-y-8">
      {/* Value Comparison Table */}
      <Card className="overflow-hidden border-2 border-saffron-200 shadow-2xl">
        <div className="bg-gradient-to-r from-saffron-500 to-amber-600 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">Package Value Breakdown</h3>
          <p className="text-saffron-50">See how much you save with this comprehensive bundle</p>
        </div>
        
        <CardContent className="p-0">
          <div className="divide-y divide-slate-200">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-6 hover:bg-saffron-50/30 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-100 to-amber-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-saffron-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.name}</h4>
                    {item.included && (
                      <Badge className="mt-1 bg-emerald-100 text-emerald-700 border-0">
                        Included
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-700">
                    {currency}{item.individualPrice.toLocaleString()}
                  </span>
                  <p className="text-xs text-slate-500">Individual Price</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Savings Visualization */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Individual Price */}
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-slate-500" />
            <div className="text-sm text-slate-600 mb-2">Total Individual Price</div>
            <div className="text-3xl font-bold text-slate-800">
              {currency}{totalIndividualPrice.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Bundle Price */}
        <Card className="bg-gradient-to-br from-saffron-50 to-amber-50 border-2 border-saffron-300 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
            SAVE {savingsPercent}%
          </div>
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-4 text-saffron-600" />
            <div className="text-sm text-saffron-700 mb-2 font-semibold">Bundle Price</div>
            <div className="text-4xl font-bold text-saffron-600">
              {currency}{bundlePrice.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* You Save */}
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 shadow-lg">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
            <div className="text-sm text-emerald-700 mb-2 font-semibold">You Save</div>
            <div className="text-3xl font-bold text-emerald-600">
              {currency}{savings.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features */}
      {features.length > 0 && (
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardContent className="p-8">
            <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <Gift className="w-6 h-6 mr-3 text-saffron-600" />
              What's Included in This Package
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-saffron-50/50 transition-colors">
                  <CheckCircle className="w-5 h-5 text-saffron-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

