'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import { scaleIn, fadeInUp } from '../motion.config';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface CertificatePreviewProps {
  preview: string;
  description?: string;
}

export default function CertificatePreview({
  preview,
  description = 'Upon successful completion, you\'ll receive a beautiful certificate recognizing your achievement in mastering the Yoga Sutras of Patanjali.',
}: CertificatePreviewProps) {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section ref={ref} className="yoga-section bg-white">
      <div className="yoga-container">
        <motion.div
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--yoga-accent)]/10 text-[var(--yoga-accent)] font-semibold rounded-full text-sm mb-4">
              <Award className="w-4 h-4" />
              <span>Certification</span>
            </span>
            <h2 className="yoga-heading-2 text-[var(--yoga-primary)] mb-4">
              Get Certified
            </h2>
            <p className="yoga-body-lg text-[var(--yoga-text-secondary)] max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Certificate Preview */}
          <motion.div
            variants={scaleIn}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-[var(--yoga-primary)]/10">
              <img
                src={preview}
                alt="Course Certificate Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a placeholder certificate design
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23FFF9F2" width="800" height="600"/%3E%3Crect fill="none" stroke="%230D3B4A" stroke-width="8" x="40" y="40" width="720" height="520" rx="8"/%3E%3Crect fill="none" stroke="%23D97B2A" stroke-width="4" x="60" y="60" width="680" height="480" rx="4"/%3E%3Ctext x="400" y="180" font-family="serif" font-size="48" fill="%230D3B4A" text-anchor="middle" font-weight="bold"%3ECertificate of Completion%3C/text%3E%3Ctext x="400" y="240" font-family="sans-serif" font-size="24" fill="%236C6C6C" text-anchor="middle"%3EYoga Philosophy through Patanjali Yoga Sutras%3C/text%3E%3Ctext x="400" y="320" font-family="sans-serif" font-size="18" fill="%234B5563" text-anchor="middle"%3EThis is to certify that%3C/text%3E%3Ctext x="400" y="370" font-family="serif" font-size="36" fill="%230D3B4A" text-anchor="middle" font-style="italic"%3E[Your Name]%3C/text%3E%3Ctext x="400" y="420" font-family="sans-serif" font-size="18" fill="%234B5563" text-anchor="middle"%3Ehas successfully completed the course%3C/text%3E%3C/svg%3E';
                }}
              />
              
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--yoga-primary)] to-[var(--yoga-accent)] opacity-10 blur-2xl" />
              <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-gradient-to-br from-[var(--yoga-accent)] to-[var(--yoga-primary)] opacity-10 blur-2xl" />
            </div>

            {/* Badge Overlay */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[var(--yoga-accent)] to-[var(--yoga-accent-dark)] rounded-full flex items-center justify-center shadow-xl"
            >
              <Award className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--yoga-bg)]">
              <CheckCircle className="w-6 h-6 text-[var(--yoga-accent)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[var(--yoga-text-primary)] mb-1">
                  Shareable
                </h4>
                <p className="text-sm text-[var(--yoga-text-secondary)]">
                  Share on LinkedIn, resume, or social media
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--yoga-bg)]">
              <CheckCircle className="w-6 h-6 text-[var(--yoga-accent)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[var(--yoga-text-primary)] mb-1">
                  Verified
                </h4>
                <p className="text-sm text-[var(--yoga-text-secondary)]">
                  Digitally verified certificate with unique ID
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--yoga-bg)]">
              <CheckCircle className="w-6 h-6 text-[var(--yoga-accent)] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-[var(--yoga-text-primary)] mb-1">
                  Printable
                </h4>
                <p className="text-sm text-[var(--yoga-text-secondary)]">
                  High-quality PDF for printing and framing
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

