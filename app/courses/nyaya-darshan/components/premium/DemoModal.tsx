'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalOverlayVariants, modalContentVariants } from '../../motion.config';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export default function DemoModal({ isOpen, onClose, videoUrl, title = 'Introduction Demo' }: DemoModalProps) {
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 id="demo-modal-title" className="text-xl font-semibold text-[#0D3B4A]">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              {videoUrl ? (
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={videoUrl}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#0D3B4A]">
                  <div className="text-center text-white p-8">
                    <p className="text-xl mb-4">Video demo will be available soon</p>
                    <p className="text-sm text-gray-300">TODO: Add actual demo video URL</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with transcript link */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Note:</span> This is a free preview of the course. 
                Full course includes 40+ sessions with quizzes and downloadable notes.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

