'use client';

import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Play, Clock, FileText } from 'lucide-react';
import { advaitaVedantaDemoVideos } from '../../courseData';
import { demoModalVariants, safeVariants } from '../../motion.config';
import { useState } from 'react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const demoVideos = advaitaVedantaDemoVideos || [];
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const selectedVideo = demoVideos[selectedVideoIndex];

  if (!selectedVideo) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <AnimatePresence>
          {isOpen && (
            <Dialog.Content asChild>
              <motion.div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
                variants={safeVariants(demoModalVariants)}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <Dialog.Title className="text-2xl font-bold text-[#0D3B4A]">
                    Course Demo Videos
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Close dialog"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                  {/* Main Video Player */}
                  <div className="p-6">
                    <div className="aspect-video bg-[#0D3B4A] rounded-2xl overflow-hidden mb-4">
                      <iframe
                        src={selectedVideo.url}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={selectedVideo.title}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0D3B4A] mb-2">
                      {selectedVideo.title}
                    </h3>
                    {selectedVideo.description && (
                      <p className="text-gray-600 mb-3">{selectedVideo.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedVideo.duration}</span>
                      </div>
                      <a
                        href="#"
                        className="flex items-center gap-1 text-[#D97B2A] hover:underline"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Transcript available</span>
                      </a>
                    </div>
                  </div>

                  {/* Other Demo Videos */}
                  {demoVideos.length > 1 && (
                    <div className="px-6 pb-6">
                      <h4 className="text-lg font-semibold text-[#0D3B4A] mb-4">
                        Other Demo Videos
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {demoVideos
                          .filter((_, index) => index !== selectedVideoIndex)
                          .map((video, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedVideoIndex(demoVideos.indexOf(video))}
                              className="advaita-demo-card text-left"
                            >
                              <div className="advaita-demo-thumbnail">
                                <img 
                                  src={video.url?.replace('/embed/', '/vi/').split('?')[0] + '/maxresdefault.jpg'} 
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/480x270/0D3B4A/FFFFFF?text=Video';
                                  }}
                                />
                                <div className="advaita-demo-play-button">
                                  <Play className="w-6 h-6" />
                                </div>
                              </div>
                              <div className="advaita-demo-info">
                                <h5 className="font-semibold text-[#0D3B4A]">{video.title}</h5>
                                {video.description && (
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {video.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-1 mt-2 text-sm text-[#D97B2A]">
                                  <Clock className="w-4 h-4" />
                                  <span>{video.duration}</span>
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


