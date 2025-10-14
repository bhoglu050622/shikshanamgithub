'use client';

import { MotionDiv } from '@/components/motion/MotionWrapper';
import { Check, Award, MessageCircle, Phone, Mail } from 'lucide-react';
import { prashnaUpanishadCourseData, prashnaSupport } from '../../courseData';
import { purchaseCardVariants, bottomSheetVariants, safeVariants } from '../../motion.config';

interface PurchaseCardProps {
  variant?: 'sticky' | 'bottom-sheet';
}

export default function PurchaseCard({ variant = 'sticky' }: PurchaseCardProps) {
  const { metadata, enrollment } = prashnaUpanishadCourseData;

  const features = [
    'Lifetime Access to Course',
    '7+ Hours of Content',
    'All 6 Prashnas Covered',
    'Certificate of Completion',
    'Downloadable Resources',
    'WhatsApp Community',
    'Live Q&A Sessions',
    'Free Future Updates'
  ];

  const CardContent = () => (
    <>
      {/* Price */}
      <div className="prashna-purchase-price">
        <span className="prashna-price-current">{metadata.price}</span>
        <div className="flex items-center gap-3">
          <span className="prashna-price-original">{metadata.originalPrice}</span>
          <span className="prashna-savings-badge">Save {metadata.savings}!</span>
        </div>
      </div>

      {/* Primary CTA */}
      <a
        href={enrollment.checkoutLink}
        className="prashna-btn-primary w-full justify-center mb-4"
      >
        <span>Enroll Now — {metadata.price}</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </a>

      {/* Features List */}
      <ul className="prashna-purchase-features">
        {features.map((feature, index) => (
          <li key={index}>
            <Check className="w-5 h-5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Certificate Preview */}
      <div className="my-6 p-4 bg-gradient-to-br from-[#FFF9F2] to-[#FAF7F2] rounded-lg border-2 border-[#D97B2A]/20">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-6 h-6 text-[#D97B2A]" />
          <span className="font-semibold text-[#0D3B4A]">Certificate Included</span>
        </div>
        <p className="text-sm text-gray-600">
          Earn a verified certificate upon course completion to showcase your knowledge
        </p>
      </div>

      {/* WhatsApp Group */}
      <a
        href={`https://wa.me/${prashnaSupport.whatsapp?.replace(/[^0-9]/g, '') || ''}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-[#10B981] text-[#10B981] rounded-lg hover:bg-[#10B981] hover:text-white transition-colors mb-4"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-semibold">Join WhatsApp Group</span>
      </a>

      {/* Support Info */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-[#0D3B4A] mb-3">Need Help?</p>
        <div className="space-y-2 text-sm text-gray-600">
          <a href={`tel:${prashnaSupport.phone}`} className="flex items-center gap-2 hover:text-[#D97B2A]">
            <Phone className="w-4 h-4" />
            <span>{prashnaSupport.phone}</span>
          </a>
          <a href={`mailto:${prashnaSupport.email}`} className="flex items-center gap-2 hover:text-[#D97B2A]">
            <Mail className="w-4 h-4" />
            <span>{prashnaSupport.email}</span>
          </a>
        </div>
      </div>

      {/* Money Back Guarantee (if applicable) */}
      <div className="mt-4 p-3 bg-[#10B981]/10 rounded-lg">
        <p className="text-xs text-center text-[#10B981] font-semibold">
          🛡️ Secure Checkout • Trusted by 1,800+ Students
        </p>
      </div>
    </>
  );

  if (variant === 'bottom-sheet') {
    return (
      <MotionDiv
        className="prashna-bottom-sheet prashna-hide-desktop"
        variants={safeVariants(bottomSheetVariants)}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#0D3B4A]">{metadata.price}</span>
            <span className="text-lg text-gray-400 line-through">{metadata.originalPrice}</span>
            <span className="bg-[#10B981] text-white px-2 py-1 rounded text-sm font-semibold">Save {metadata.savings}!</span>
          </div>
          <a
            href={enrollment.checkoutLink}
            className="prashna-btn-primary py-3 px-6"
          >
            <span>Enroll Now</span>
          </a>
        </div>
      </MotionDiv>
    );
  }

  // Sticky desktop variant
  return (
    <MotionDiv
      className="prashna-purchase-card prashna-hide-mobile"
      variants={safeVariants(purchaseCardVariants)}
      initial="hidden"
      animate="visible"
    >
      <CardContent />
    </MotionDiv>
  );
}

