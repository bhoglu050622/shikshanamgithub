'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Award, MessageCircle, Clock, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import { chanakyaCodeCourseData } from '../courseData';

export default function PurchaseCard() {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const courseData = chanakyaCodeCourseData;

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Hide mobile card when scrolling down, show when scrolling up
      if (currentScroll > lastScroll && currentScroll > 100) {
        setIsVisible(false);
        setIsMobileExpanded(false);
      } else {
        setIsVisible(true);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Version - Sticky */}
      <div className="hidden lg:block">
        <div className="chanakya-purchase-card">
          {/* Price Section */}
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="chanakya-price-badge">{courseData.metadata.price}</span>
              <span className="text-lg text-gray-400 line-through">{courseData.metadata.originalPrice}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              <span>Save {courseData.metadata.savings}</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#D87A2B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-[#D87A2B]" />
              </div>
              <div>
                <p className="font-semibold text-[#0B2B3A]">1 Year Full Access</p>
                <p className="text-sm text-gray-600">Learn at your own pace</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#D87A2B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageCircle className="w-3 h-3 text-[#D87A2B]" />
              </div>
              <div>
                <p className="font-semibold text-[#0B2B3A]">WhatsApp Community</p>
                <p className="text-sm text-gray-600">Connect with learners</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#D87A2B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Award className="w-3 h-3 text-[#D87A2B]" />
              </div>
              <div>
                <p className="font-semibold text-[#0B2B3A]">Certificate of Completion</p>
                <p className="text-sm text-gray-600">Boost your profile</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#D87A2B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-3 h-3 text-[#D87A2B]" />
              </div>
              <div>
                <p className="font-semibold text-[#0B2B3A]">{courseData.stats?.lessons || 20} Video Lessons</p>
                <p className="text-sm text-gray-600">{courseData.stats?.hours || '6+'} hours content</p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Secure Payment</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-[#0B2B3A]">{courseData.stats?.students || '3.2K+'}</span> Enrolled
            </div>
          </div>

          {/* CTA Button */}
          <ProtectedExternalLink
            href={courseData.enrollment.checkoutLink}
            className="block w-full py-4 bg-gradient-to-r from-[#0B2B3A] to-[#1a3a4a] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
          >
            Enroll Now
          </ProtectedExternalLink>

          <p className="text-xs text-center text-gray-500 mt-4">
            Limited time offer • No refunds
          </p>
        </div>
      </div>

      {/* Mobile Version - Sticky Bottom */}
      <div className={`lg:hidden chanakya-purchase-card-mobile ${!isVisible ? 'hidden' : ''}`}>
        {/* Collapsed State */}
        {!isMobileExpanded && (
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#0B2B3A]">{courseData.metadata.price}</span>
                <span className="text-sm text-gray-400 line-through">{courseData.metadata.originalPrice}</span>
              </div>
              <p className="text-xs text-gray-600">Save {courseData.metadata.savings} • 1 Year Access</p>
            </div>
            <div className="flex items-center gap-2">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="px-6 py-3 bg-gradient-to-r from-[#0B2B3A] to-[#1a3a4a] text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Enroll
              </ProtectedExternalLink>
              <button
                onClick={() => setIsMobileExpanded(true)}
                className="p-3 bg-gray-100 rounded-lg"
                aria-label="Expand details"
              >
                <ChevronUp className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {/* Expanded State */}
        {isMobileExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[#0B2B3A]">{courseData.metadata.price}</span>
                  <span className="text-sm text-gray-400 line-through">{courseData.metadata.originalPrice}</span>
                </div>
                <p className="text-sm text-green-600 font-semibold">Save {courseData.metadata.savings}</p>
              </div>
              <button
                onClick={() => setIsMobileExpanded(false)}
                className="p-2 bg-gray-100 rounded-lg"
                aria-label="Collapse details"
              >
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D87A2B]" />
                <span>1 Year Access</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#D87A2B]" />
                <span>WhatsApp Group</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D87A2B]" />
                <span>Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#D87A2B]" />
                <span>Secure Payment</span>
              </div>
            </div>

            <ProtectedExternalLink
              href={courseData.enrollment.checkoutLink}
              className="block w-full py-3 bg-gradient-to-r from-[#0B2B3A] to-[#1a3a4a] text-white font-bold text-center rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Enroll Now
            </ProtectedExternalLink>
          </motion.div>
        )}
      </div>
    </>
  );
}

