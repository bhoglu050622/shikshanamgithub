'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Award, MessageCircle, Clock, Shield } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import { chanakyaCodeCourseData } from '../courseData';

export default function PurchaseCard() {
  const [isVisible, setIsVisible] = useState(true);
  const courseData = chanakyaCodeCourseData;

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Hide mobile card when scrolling down, show when scrolling up
      if (currentScroll > lastScroll && currentScroll > 100) {
        setIsVisible(false);
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
            <div className="flex items-baseline justify-center gap-3 mb-3">
              <span className="chanakya-price-badge">{courseData.metadata.price}</span>
              <span className="text-lg text-gray-400 line-through">{courseData.metadata.originalPrice}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-2">
              <span>Save {courseData.metadata.savings}</span>
            </div>
            <p className="text-sm text-gray-600">1 Year Full Access</p>
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
            className="block w-full py-4 bg-black text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
          >
            Enroll Now
          </ProtectedExternalLink>

          <p className="text-xs text-center text-gray-500 mt-4">
            Limited time offer • No refunds
          </p>
        </div>
      </div>

      {/* Mobile Version - Fixed Bottom */}
      <div className="lg:hidden">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="chanakya-purchase-card-mobile"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-[#0B2B3A]">{courseData.metadata.price}</span>
                <span className="text-sm text-gray-400 line-through">{courseData.metadata.originalPrice}</span>
              </div>
              <p className="text-xs text-gray-600">Save {courseData.metadata.savings} • 1 Year Access</p>
            </div>
            <div className="flex items-center gap-2">
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="px-4 py-2.5 bg-black text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
              >
                Enroll Now
              </ProtectedExternalLink>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#D87A2B] flex-shrink-0" />
              <span className="text-gray-700">Learn at your own pace</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-3 h-3 text-[#D87A2B] flex-shrink-0" />
              <span className="text-gray-700">WhatsApp Community</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3 h-3 text-[#D87A2B] flex-shrink-0" />
              <span className="text-gray-700">Certificate of Completion</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-[#D87A2B] flex-shrink-0" />
              <span className="text-gray-700">Secure Payment</span>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="text-center mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-[#0B2B3A]">{courseData.stats?.students || '3.2K+'}</span> Enrolled
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

