'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Shield, Sparkles, Gift } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { SSOLoginModal } from '@/components/auth/SSOLoginModal';

interface PremiumCTAProps {
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  primaryCTA: {
    text: string;
    action: () => void;
  };
  secondaryCTA?: {
    text: string;
    action: () => void;
  };
  trustBadges?: string[];
  urgency?: {
    type: 'seats' | 'time' | 'discount';
    message: string;
  };
}

export function PremiumCTA({
  title,
  subtitle,
  price,
  originalPrice,
  savings,
  primaryCTA,
  secondaryCTA,
  trustBadges = [
    'Lifetime Access',
    'Expert Support'
  ],
  urgency
}: PremiumCTAProps) {
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handlePrimaryCTAClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    primaryCTA.action();
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    primaryCTA.action();
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron-50 via-amber-50 to-orange-50" />
      <div className="absolute inset-0 bg-[url('/assets/patterns/mandala.svg')] opacity-5" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-md">
              <Sparkles className="w-5 h-5 text-saffron-600" />
              <span className="text-sm font-semibold text-saffron-700">Premium Package</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {subtitle}
            </p>

            {/* Trust Badges */}
            <div className="space-y-3">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Pricing Card */}
          <div>
            <Card className="border-4 border-saffron-200 shadow-2xl relative overflow-hidden">
              {/* Glass morphism effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-saffron-50/95 backdrop-blur-xl" />
              
              {savings && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-sm font-bold rounded-bl-2xl shadow-lg flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  {savings}
                </div>
              )}
              
              <CardContent className="relative p-8 space-y-6">
                {/* Pricing */}
                <div className="text-center py-6">
                  {originalPrice && (
                    <div className="text-lg text-slate-500 line-through mb-2">
                      {originalPrice}
                    </div>
                  )}
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-saffron-600 to-amber-600 bg-clip-text text-transparent">
                    {price}
                  </div>
                  <div className="text-sm text-slate-600 mt-2">One-time payment</div>
                </div>

                {/* Urgency Banner */}
                {urgency && (
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm font-semibold text-red-700">
                        {urgency.message}
                      </p>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full h-14 text-lg bg-gradient-to-r from-saffron-500 to-amber-600 hover:from-saffron-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    onClick={handlePrimaryCTAClick}
                  >
                    {primaryCTA.text}
                  </Button>
                  
                  {secondaryCTA && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full h-14 text-lg border-2 border-saffron-300 text-saffron-700 hover:bg-saffron-50"
                      onClick={secondaryCTA.action}
                    >
                      {secondaryCTA.text}
                    </Button>
                  )}
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600 pt-4 border-t border-slate-200">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Secure Checkout • SSL Encrypted</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <SSOLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

