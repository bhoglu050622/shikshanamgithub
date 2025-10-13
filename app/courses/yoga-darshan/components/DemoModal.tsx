'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalOverlay, modalContent } from '../motion.config';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
  description?: string;
  transcriptLink?: string;
  enrollLink: string;
}

export default function DemoModal({
  isOpen,
  onClose,
  videoSrc,
  title,
  description,
  transcriptLink,
  enrollLink,
}: DemoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[var(--yoga-bg)] border-[var(--yoga-primary)]">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors yoga-focus-visible"
            aria-label="Close demo video"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            <video
              controls
              className="w-full h-full"
              src={videoSrc}
              controlsList="nodownload"
              poster="/assets/courses/yoga-darshan-hero.png"
            >
              <track kind="captions" label="English captions" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 md:p-8"
          >
            <DialogTitle className="yoga-heading-3 text-[var(--yoga-primary)] mb-3">
              {title}
            </DialogTitle>
            
            {description && (
              <p className="yoga-body text-[var(--yoga-text-secondary)] mb-6">
                {description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4">
                {transcriptLink && (
                  <a
                    href={transcriptLink}
                    className="inline-flex items-center gap-2 text-sm text-[var(--yoga-accent)] hover:underline yoga-focus-visible"
                    download
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Download Transcript</span>
                  </a>
                )}
              </div>

              <ProtectedExternalLink
                href={enrollLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--yoga-primary)] to-[var(--yoga-primary-light)] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 yoga-focus-visible"
              >
                <span>Enroll Now - ₹1,999</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </ProtectedExternalLink>
            </div>

            {/* Accessibility Note */}
            <p className="mt-4 text-xs text-[var(--yoga-muted)]">
              Keyboard shortcuts: Space to play/pause, Arrow keys to seek, Esc to close
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

