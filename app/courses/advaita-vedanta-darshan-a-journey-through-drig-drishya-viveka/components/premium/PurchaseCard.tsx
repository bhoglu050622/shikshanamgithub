'use client';

import { Award, Calendar, BookOpen, MessageCircle, Phone, Mail } from 'lucide-react';
import { advaitaVedantaCourseData, advaitaVedantaSupport } from '../../courseData';

export default function PurchaseCard() {
  const { metadata, enrollment } = advaitaVedantaCourseData;
  const support = advaitaVedantaSupport;

  const features = [
    { icon: <Calendar className="w-5 h-5" />, text: '1 Year Access' },
    { icon: <Award className="w-5 h-5" />, text: 'Certificate' },
    { icon: <BookOpen className="w-5 h-5" />, text: '46 Shlokas' },
    { icon: <MessageCircle className="w-5 h-5" />, text: 'WhatsApp Group' }
  ];

  return (
    <div className="advaita-purchase-card">
      {/* Price Section */}
      <div className="advaita-price-section">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="advaita-price-current">{metadata.price}</span>
          {metadata.originalPrice && (
            <span className="advaita-price-original">{metadata.originalPrice}</span>
          )}
        </div>
        {metadata.savings && (
          <div className="inline-block px-4 py-1 bg-[#D97B2A] text-white text-sm font-semibold rounded-full">
            Save {metadata.savings} — Limited Time
          </div>
        )}
      </div>

      {/* CTA Button */}
      <a
        href={enrollment.checkoutLink}
        className="block w-full py-4 bg-black text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-center mb-6 hover:bg-gray-900"
      >
        Enroll Now
      </a>

      {/* Features Checklist */}
      <ul className="advaita-features-checklist">
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
          Receive an official certificate upon completing all modules and quizzes. Demonstrate your mastery of Drig Drishya Viveka.
        </p>
      </div>

      {/* Support Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-3">Need help?</p>
        <div className="space-y-2">
          <a
            href={`mailto:${support.email}`}
            className="flex items-center justify-center gap-2 text-sm font-medium text-[#0D3B4A] hover:text-[#D97B2A] transition-colors"
          >
            <Mail className="w-4 h-4" />
            {support.email}
          </a>
          <a
            href={`tel:${support.phone}`}
            className="flex items-center justify-center gap-2 text-sm font-medium text-[#0D3B4A] hover:text-[#D97B2A] transition-colors"
          >
            <Phone className="w-4 h-4" />
            {support.phone}
          </a>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔒 Secure checkout
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {support.refundPolicy}
        </p>
      </div>
    </div>
  );
}


