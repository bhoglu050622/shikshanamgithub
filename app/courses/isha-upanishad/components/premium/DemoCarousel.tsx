'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, X } from 'lucide-react';
import { ishaUpanishadDemoVideos } from '../../courseData';
import { fadeInUpVariants, modalOverlayVariants, modalContentVariants, safeVariants } from '../../motion.config';
import { useInView } from 'react-intersection-observer';
import * as Dialog from '@radix-ui/react-dialog';

interface DemoVideo {
  title: string;
  description: string;
  url: string;
  duration: string;
  isFree?: boolean;
}

export default function DemoCarousel() {
  const demoVideos = ishaUpanishadDemoVideos;
  const [selectedVideo, setSelectedVideo] = useState<DemoVideo | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  if (!demoVideos || demoVideos.length === 0) return null;

  return (
    <section className="isha-demo-section">
      <div className="isha-demo-container">
        {/* Section Header */}
        <motion.div 
          className="isha-section-header"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="isha-section-subtitle">Free Preview</p>
          <h2 className="isha-section-title">Experience the Course</h2>
          <p className="isha-section-description">
            Watch our demo videos to understand the teaching style and course content before enrolling
          </p>
        </motion.div>

        {/* Demo Cards */}
        <motion.div
          ref={ref}
          className="isha-demo-carousel"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {demoVideos.map((video, index) => (
            <div
              key={index}
              className="isha-demo-card"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="isha-demo-thumbnail">
                <img 
                  src={video.url?.replace('/embed/', '/vi/').split('?')[0] + '/maxresdefault.jpg'} 
                  alt={video.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/480x270/0D3B4A/FFFFFF?text=Video';
                  }}
                />
                <div className="isha-demo-play-button">
                  <Play className="w-6 h-6" />
                </div>
              </div>
              <div className="isha-demo-info">
                <h3>{video.title}</h3>
                {video.description && <p>{video.description}</p>}
                {video.duration && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-[#D97B2A]">
                    <Clock className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Video Modal */}
        <Dialog.Root open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/80 z-50"
                variants={modalOverlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl p-6 z-50 max-h-[90vh] overflow-y-auto"
                variants={modalContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {selectedVideo && (
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Dialog.Title className="text-2xl font-bold text-[#0D3B4A]">
                          {selectedVideo.title}
                        </Dialog.Title>
                        {selectedVideo.description && (
                          <Dialog.Description className="text-gray-600 mt-2">
                            {selectedVideo.description}
                          </Dialog.Description>
                        )}
                      </div>
                      <Dialog.Close asChild>
                        <button
                          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          aria-label="Close"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </Dialog.Close>
                    </div>
                    
                    {/* Video Player */}
                    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                      <iframe
                        src={selectedVideo.url}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={selectedVideo.title}
                      />
                    </div>

                    {/* Transcript Link */}
                    <div className="text-sm text-gray-600">
                      <p>
                        <a 
                          href="#" 
                          className="text-[#D97B2A] hover:underline font-medium"
                          onClick={(e) => e.preventDefault()}
                        >
                          View Transcript
                        </a>
                        {' • '}
                        <span>Captions available in Hindi and English</span>
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
}

