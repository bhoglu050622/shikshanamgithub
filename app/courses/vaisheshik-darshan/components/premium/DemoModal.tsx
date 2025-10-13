'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { modalVariants, backdropVariants } from '../../motion.config';
import { useEffect } from 'react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    description: string;
    url: string;
    duration: string;
    isFree?: boolean;
  };
}

export default function DemoModal({ isOpen, onClose, video }: DemoModalProps) {
  // Handle escape key
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-200">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[var(--vaisheshik-primary-indigo)] mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-[var(--vaisheshik-muted-gray)]">
                    {video.description} • {video.duration}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-[var(--vaisheshik-muted-gray)]">
                    <p>📝 Captions available • Full transcript coming soon</p>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--vaisheshik-accent-saffron)] hover:underline"
                  >
                    <ExternalLink size={16} />
                    View Transcript
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

