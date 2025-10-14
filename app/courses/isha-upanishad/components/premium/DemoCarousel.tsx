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
          className="isha-section-header text-center"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          suppressHydrationWarning
        >
          <p className="isha-section-subtitle text-center">Free Preview</p>
          <h2 className="isha-section-title text-center">Experience the Course</h2>
          <p className="isha-section-description text-center">
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
          suppressHydrationWarning
        >
          {demoVideos.map((video, index) => (
            <div
              key={index}
              className="isha-demo-card"
              onClick={() => video.isFree ? setSelectedVideo(video) : null}
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
                  {video.isFree ? (
                    <Play className="w-6 h-6" />
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">Locked</span>
                    </div>
                  )}
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
                {!video.isFree && (
                  <div className="mt-2 text-xs text-gray-500">
                    Contact us for access
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
                className="fixed inset-0 bg-black/50 z-50"
                variants={modalOverlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-4 sm:inset-8 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:inset-auto w-auto h-auto max-w-none md:max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] md:max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                variants={modalContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                suppressHydrationWarning
              >
                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 h-full overflow-y-auto">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-colors z-10 touch-manipulation"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </button>

                  {/* Content */}
                  {selectedVideo && (
                    <>
                      <div className="mb-6 pr-8 sm:pr-10">
                        <div className="text-center mb-4">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0D3B4A] leading-tight mb-2">
                            {selectedVideo.title}
                          </h3>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {selectedVideo.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Video Player */}
                      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4 w-full">
                        <iframe
                          src={selectedVideo.url}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          title={selectedVideo.title}
                          loading="lazy"
                          onError={(e) => {
                            console.log('Video failed to load, showing fallback');
                            const iframe = e.target as HTMLIFrameElement;
                            iframe.style.display = 'none';
                            const fallback = iframe.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        {/* Fallback content */}
                        <div 
                          className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-gray-800"
                          style={{ display: 'none' }}
                        >
                          <div className="text-center">
                            <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            <h3 className="text-lg font-semibold mb-2">Video Preview</h3>
                            <p className="text-gray-300 mb-4 text-sm">
                              This video is available on YouTube. Click below to watch the demo.
                            </p>
                            <a
                              href={selectedVideo.url.replace('/embed/', '/watch?v=').split('?')[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                              Watch on YouTube
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Transcript Link */}
                      <div className="text-xs md:text-sm text-gray-600 text-center">
                        <p className="break-words leading-relaxed">
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
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </section>
  );
}

