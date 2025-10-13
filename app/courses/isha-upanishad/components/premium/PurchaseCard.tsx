'use client';

import { Check, Award, Calendar, BookOpen, MessageCircle } from 'lucide-react';
import { ishaUpanishadCourseData, ishaUpanishadSupport } from '../../courseData';

export default function PurchaseCard() {
  const { metadata, enrollment } = ishaUpanishadCourseData;
  const support = ishaUpanishadSupport;

  const features = [
    { icon: <Calendar className="w-5 h-5" />, text: '1 Year Access' },
    { icon: <Award className="w-5 h-5" />, text: 'Certificate' },
    { icon: <BookOpen className="w-5 h-5" />, text: '18 Shlokas' },
    { icon: <MessageCircle className="w-5 h-5" />, text: 'WhatsApp Group' }
  ];

  return (
    <div className="isha-purchase-card">
      {/* Price Section */}
      <div className="isha-price-section">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="isha-price-current">{metadata.price}</span>
          <span className="isha-price-original">{metadata.originalPrice}</span>
        </div>
        <div className="inline-block px-4 py-1 bg-[#D97B2A] text-white text-sm font-semibold rounded-full">
          Save {metadata.savings} — Limited Time
        </div>
      </div>

      {/* CTA Button */}
      <a
        href={enrollment.checkoutLink}
        className="block w-full py-4 bg-gradient-to-r from-[#0D3B4A] to-[#1A5568] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-center mb-6"
      >
        Enroll Now
      </a>

      {/* Features Checklist */}
      <ul className="isha-features-checklist">
        {features.map((feature, index) => (
          <li key={index}>
            {feature.icon}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* Certificate Preview */}
      <div className="mt-6 p-4 bg-gradient-to-br from-[#FFF9F2] to-[#FAF7F2] rounded-xl border-2 border-[#D97B2A]/20">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-6 h-6 text-[#D97B2A]" />
          <h4 className="font-semibold text-[#0D3B4A]">Certificate of Completion</h4>
        </div>
        <p className="text-sm text-gray-600">
          Receive an official certificate upon completing all modules and quizzes
        </p>
      </div>

      {/* Support Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-2">Need help?</p>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-[#0D3B4A]">
            {support.email}
          </p>
          <p className="text-sm font-medium text-[#0D3B4A]">
            {support.phone}
          </p>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔒 Secure checkout • No refunds (watch demo first)
        </p>
      </div>
    </div>
  );
}

