'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Play, Volume2, VolumeX, X } from 'lucide-react'
import Image from 'next/image'

const reelsData = [
  {
    id: 1,
    title: 'संस्कृत व्याकरण का परिचय',
    subtitle: 'Introduction to Sanskrit Grammar',
    duration: '2:30',
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video1.mp4',
    description: 'संस्कृत व्याकरण की मूल बातें समझें'
  },
  {
    id: 2,
    title: 'देवनागरी लिपि सीखना',
    subtitle: 'Learning Devanagari Script',
    duration: '3:15',
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video2.mp4',
    description: 'देवनागरी अक्षरों को पहचानना और लिखना'
  },
  {
    id: 3,
    title: 'श्लोक उच्चारण',
    subtitle: 'Shloka Pronunciation',
    duration: '4:20',
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video3.mp4',
    description: 'प्रसिद्ध श्लोकों का सही उच्चारण'
  },
  {
    id: 4,
    title: 'संस्कृत शब्दावली',
    subtitle: 'Sanskrit Vocabulary',
    duration: '2:45',
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video4.mp4',
    description: 'रोजमर्रा के संस्कृत शब्द'
  },
  {
    id: 5,
    title: 'व्याकरण के नियम',
    subtitle: 'Grammar Rules',
    duration: '3:50',
    thumbnail: '/api/placeholder/300/400',
    videoUrl: '/api/placeholder/video5.mp4',
    description: 'संस्कृत व्याकरण के मूल नियम'
  }
]

export default function Reels() {
  const [selectedVideo, setSelectedVideo] = useState<typeof reelsData[0] | null>(null)
  const [isMuted, setIsMuted] = useState(true)

  const handleVideoClick = (video: typeof reelsData[0]) => {
    setSelectedVideo(video)
  }

  const closeModal = () => {
    setSelectedVideo(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display text-indigo-900 dark:text-wisdom-50 font-devanagari"
        >
          कोर्स की झलक
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-indigo-700 dark:text-wisdom-200 max-w-2xl mx-auto"
        >
          कोर्स की गुणवत्ता देखने के लिए ये वीडियो देखें
        </motion.p>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {reelsData.map((reel, index) => (
          <motion.div
            key={reel.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => handleVideoClick(reel)}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <CardContent className="p-0 relative">
                {/* Video Thumbnail */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50">
                  {/* Placeholder for video thumbnail */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-devanagari text-indigo-400 dark:text-indigo-600">
                        संस्कृत
                      </div>
                      <div className="text-xs text-indigo-500 dark:text-indigo-500">
                        {reel.duration}
                      </div>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="bg-white/90 dark:bg-wisdom-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <Play className="w-6 h-6 text-saffron-600 dark:text-saffron-400 ml-1" />
                    </div>
                  </motion.div>

                  {/* Duration Badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {reel.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-3 space-y-2">
                  <h3 className="font-semibold text-indigo-900 dark:text-wisdom-50 text-sm font-devanagari line-clamp-2">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-wisdom-400 line-clamp-1">
                    {reel.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-semibold text-indigo-900 dark:text-wisdom-50 font-devanagari">
              {selectedVideo?.title}
            </DialogTitle>
            <p className="text-sm text-indigo-600 dark:text-wisdom-400">
              {selectedVideo?.subtitle}
            </p>
          </DialogHeader>
          
          {selectedVideo && (
            <div className="relative">
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 flex items-center justify-center relative">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-devanagari text-indigo-400 dark:text-indigo-600">
                    {selectedVideo.title}
                  </div>
                  <div className="text-lg text-indigo-500 dark:text-indigo-500">
                    {selectedVideo.description}
                  </div>
                  <div className="text-sm text-indigo-600 dark:text-wisdom-400">
                    Duration: {selectedVideo.duration}
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-white/90 dark:bg-wisdom-800/90 backdrop-blur-sm"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={closeModal}
                    className="bg-white/90 dark:bg-wisdom-800/90 backdrop-blur-sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <Button 
          size="lg" 
          className="btn-primary"
          href="#pricing"
        >
          पूरा कोर्स देखने के लिए एनरोल करें
        </Button>
      </motion.div>
    </div>
  )
}
