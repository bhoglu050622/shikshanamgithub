'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

interface PremiumFeaturesProps {
  features: Feature[];
  title?: string;
  subtitle?: string;
  layout?: 'grid' | 'staggered';
}

export function PremiumFeatures({
  features,
  title = "What You'll Master",
  subtitle = "Comprehensive learning experience designed for your success",
  layout = 'staggered'
}: PremiumFeaturesProps) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          {title}
        </h2>
        <p className="text-xl text-slate-600">{subtitle}</p>
      </div>

      {/* Features Grid */}
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${layout === 'staggered' ? 'lg:gap-y-12' : ''}`}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const gradientClass = feature.gradient || 'from-saffron-500 to-amber-600';
          
          return (
            <Card
              key={index}
              className={`group border-2 border-slate-200 hover:border-saffron-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 transform overflow-hidden ${
                layout === 'staggered' && index % 2 === 1 ? 'lg:mt-8' : ''
              }`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-saffron-50/0 to-amber-50/0 group-hover:from-saffron-50/50 group-hover:to-amber-50/50 transition-all duration-300" />
              
              <CardContent className="relative p-8 space-y-4">
                {/* Icon */}
                <div className="relative inline-block">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-20 blur-xl rounded-full`} />
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-saffron-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className={`h-1 w-12 bg-gradient-to-r ${gradientClass} rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300`} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

