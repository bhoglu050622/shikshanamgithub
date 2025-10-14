'use client';

import { motion } from 'framer-motion';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import Image from 'next/image';
import Link from 'next/link';

interface PackageCardProps {
  price: string;
  originalPrice: string;
  savings: string;
  bonuses: string[];
  packageImageUrl: string;
  buyCtaUrl: string;
  packageUrl?: string;
  features: string[];
}

export default function PackageCard({
  price,
  originalPrice,
  savings,
  bonuses,
  packageImageUrl,
  buyCtaUrl,
  packageUrl,
  features
}: PackageCardProps) {
  return (
    <>
      {/* Desktop Sticky Card */}
      <div className="package-card-sticky">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-sanskrit-premium p-6 max-w-sm ml-auto"
        >
          {/* Package Image */}
          {packageImageUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6 group">
              <Image
                src={packageImageUrl}
                alt="Sanskrit Package Bonuses"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Pricing */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-[var(--accent-sanskrit)]">{price}</span>
              <span className="text-xl text-[var(--text-muted-sanskrit)] line-through">{originalPrice}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-green-700">Save {savings}</span>
            </div>
          </div>

          {/* Bonuses List */}
          <div className="mb-6 space-y-3">
            <h4 className="font-semibold text-[var(--text-primary-sanskrit)]">What's Included:</h4>
            {bonuses.map((bonus, index) => (
              <div key={index} className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[var(--gold-sanskrit)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-[var(--text-secondary-sanskrit)]">{bonus}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-6 pb-6 border-b border-[var(--gold-sanskrit)]/20 space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold-sanskrit)]" />
                <span className="text-sm text-[var(--text-secondary-sanskrit)]">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <ProtectedExternalLink
              href={buyCtaUrl}
              className="btn-package-primary focus-sanskrit group"
            >
              <span className="flex items-center justify-center gap-2">
                Enroll Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </ProtectedExternalLink>

            {packageUrl && (
              <Link
                href={packageUrl}
                className="btn-package-secondary focus-sanskrit"
              >
                View Complete Package
              </Link>
            )}
          </div>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-[var(--gold-sanskrit)]/20 flex items-center justify-center gap-4 text-xs text-[var(--text-muted-sanskrit)]">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure Payment
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Instant Access
            </div>
          </div>
        </motion.div>
      </div>

    </>
  );
}

