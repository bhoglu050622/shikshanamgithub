'use client';

import { motion } from 'framer-motion';
import { Check, Shield, Calendar, Award, Users, X } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import { useState, useEffect } from 'react';

interface PurchaseCardProps {
  price: string;
  originalPrice?: string;
  enrollLink: string;
  features?: string[];
}

export default function PurchaseCard({
  price,
  originalPrice,
  enrollLink,
  features = ['1 Year Access', 'Certification', 'Community Forum'],
}: PurchaseCardProps) {
  const [isMobileBottomSheet, setIsMobileBottomSheet] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile bottom sheet after scrolling past hero
      if (window.scrollY > 600) {
        setIsMobileBottomSheet(true);
      } else {
        setIsMobileBottomSheet(false);
        setIsCollapsed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bonuses = [
    { icon: Calendar, text: '1 Year Full Access' },
    { icon: Award, text: 'Certificate of Completion' },
    { icon: Users, text: 'Community Forum Access' },
    { icon: Shield, text: '7-Day Money-Back Guarantee' },
  ];

  return (
    <>
      {/* Desktop: Sticky Card */}
      <div className="hidden lg:block sticky top-24 self-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl border-2 border-[var(--yoga-primary)]/20 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-[var(--yoga-primary)] to-[var(--yoga-primary-light)] p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">Enroll Today</h3>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-4xl font-bold">{price}</span>
              {originalPrice && (
                <span className="text-lg line-through opacity-70">{originalPrice}</span>
              )}
            </div>
            <p className="text-sm opacity-90">One-time payment</p>
          </div>

          <div className="p-6">
            <h4 className="font-semibold text-[var(--yoga-text-primary)] mb-4">
              What's Included:
            </h4>
            <ul className="space-y-3 mb-6">
              {bonuses.map((bonus, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--yoga-primary)]/10 flex items-center justify-center">
                    <bonus.icon className="w-4 h-4 text-[var(--yoga-primary)]" />
                  </div>
                  <span className="text-sm text-[var(--yoga-text-secondary)]">{bonus.text}</span>
                </li>
              ))}
            </ul>

            <ProtectedExternalLink
              href={enrollLink}
              className="block w-full py-4 bg-gradient-to-r from-[var(--yoga-primary)] to-[var(--yoga-primary-light)] text-white font-bold text-center rounded-xl hover:shadow-xl transition-all duration-300"
            >
              Enroll Now →
            </ProtectedExternalLink>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--yoga-muted)]">
              <Shield className="w-4 h-4" />
              <span>Secure checkout • 7-day refund policy</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile: Bottom Sheet */}
      {isMobileBottomSheet && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[var(--yoga-primary)]/20 shadow-2xl"
        >
          {/* Collapsed View */}
          {isCollapsed ? (
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-[var(--yoga-primary)]">{price}</span>
                    {originalPrice && (
                      <span className="text-sm line-through text-[var(--yoga-muted)]">
                        {originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--yoga-text-tertiary)]">1 Year Access</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCollapsed(false)}
                    className="px-4 py-2 text-sm text-[var(--yoga-primary)] font-semibold"
                  >
                    Details
                  </button>
                  <ProtectedExternalLink
                    href={enrollLink}
                    className="px-6 py-3 bg-gradient-to-r from-[var(--yoga-primary)] to-[var(--yoga-primary-light)] text-white font-bold rounded-lg"
                  >
                    Enroll Now
                  </ProtectedExternalLink>
                </div>
              </div>
            </div>
          ) : (
            /* Expanded View */
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[var(--yoga-primary)]">Course Enrollment</h3>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Collapse"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-[var(--yoga-primary)]">{price}</span>
                  {originalPrice && (
                    <span className="text-lg line-through text-[var(--yoga-muted)]">
                      {originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--yoga-text-tertiary)]">One-time payment</p>
              </div>

              <h4 className="font-semibold text-[var(--yoga-text-primary)] mb-3">
                What's Included:
              </h4>
              <ul className="space-y-3 mb-6">
                {bonuses.map((bonus, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--yoga-primary)]/10 flex items-center justify-center">
                      <bonus.icon className="w-4 h-4 text-[var(--yoga-primary)]" />
                    </div>
                    <span className="text-sm text-[var(--yoga-text-secondary)]">{bonus.text}</span>
                  </li>
                ))}
              </ul>

              <ProtectedExternalLink
                href={enrollLink}
                className="block w-full py-4 bg-gradient-to-r from-[var(--yoga-primary)] to-[var(--yoga-primary-light)] text-white font-bold text-center rounded-xl hover:shadow-xl transition-all duration-300 mb-3"
              >
                Enroll Now →
              </ProtectedExternalLink>

              <div className="flex items-center justify-center gap-2 text-xs text-[var(--yoga-muted)]">
                <Shield className="w-4 h-4" />
                <span>Secure checkout • 7-day refund policy</span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}

