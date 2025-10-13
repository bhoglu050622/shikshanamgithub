'use client';

import { Award, Check, MessageCircle, Mail, Phone } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

interface PurchaseCardProps {
  price: string;
  features: string[];
  checkoutLink: string;
  contactEmail: string;
  contactPhone: string;
  isMobile?: boolean;
}

export default function PurchaseCard({
  price,
  features,
  checkoutLink,
  contactEmail,
  contactPhone,
  isMobile = false
}: PurchaseCardProps) {
  return (
    <div
      className={`vaisheshik-purchase-card ${
        isMobile ? 'vaisheshik-purchase-card-mobile' : 'vaisheshik-purchase-card-sticky'
      }`}
    >
      {/* Price Section */}
      <div className="text-center mb-6">
        <div className="vaisheshik-price mb-2">{price}</div>
        <p className="text-sm text-[var(--vaisheshik-muted-gray)]">
          One-time payment • Lifetime access
        </p>
      </div>

      {/* Features Checklist */}
      <ul className="vaisheshik-features-checklist">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      {/* Enroll CTA */}
      <ProtectedExternalLink
        href={checkoutLink}
        className="vaisheshik-cta-primary w-full justify-center mb-4"
      >
        Enroll Now — {price}
      </ProtectedExternalLink>

      {/* Certificate Preview */}
      <div className="bg-gradient-to-br from-[var(--vaisheshik-cream-light)] to-white rounded-xl p-4 mb-6 border border-[var(--vaisheshik-accent-saffron)]/20">
        <div className="flex items-center gap-3 mb-3">
          <Award size={24} className="text-[var(--vaisheshik-accent-saffron)]" />
          <h3 className="font-semibold text-[var(--vaisheshik-primary-indigo)]">
            Certificate of Completion
          </h3>
        </div>
        <p className="text-sm text-[var(--vaisheshik-muted-gray)]">
          Earn a verified certificate upon successfully completing all course modules and assessments.
        </p>
      </div>

      {/* WhatsApp Group */}
      <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle size={20} className="text-green-600" />
          <h4 className="font-semibold text-green-800">Join WhatsApp Group</h4>
        </div>
        <p className="text-sm text-green-700">
          Connect with fellow learners and get instant updates after enrollment.
        </p>
      </div>

      {/* Support Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-[var(--vaisheshik-primary-indigo)] mb-3">
          Need Help?
        </h4>
        <div className="space-y-2">
          <a
            href={`mailto:${contactEmail}`}
            className="flex items-center gap-2 text-sm text-[var(--vaisheshik-muted-gray)] hover:text-[var(--vaisheshik-accent-saffron)]"
          >
            <Mail size={16} />
            {contactEmail}
          </a>
          <a
            href={`tel:${contactPhone}`}
            className="flex items-center gap-2 text-sm text-[var(--vaisheshik-muted-gray)] hover:text-[var(--vaisheshik-accent-saffron)]"
          >
            <Phone size={16} />
            {contactPhone}
          </a>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-xs text-yellow-800 text-center">
          ⚠️ <strong>No refunds</strong> - Please watch the free demo before enrolling
        </p>
      </div>

      {/* Money back guarantee alternative text */}
      <div className="mt-4 text-center">
        <p className="text-xs text-[var(--vaisheshik-muted-gray)]">
          🔒 Secure payment • 🎓 Verified certificate • 📱 Mobile & desktop access
        </p>
      </div>
    </div>
  );
}

