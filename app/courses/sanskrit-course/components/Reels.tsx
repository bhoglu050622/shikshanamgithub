'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'

const reelsData = [
  {
    id: 1,
    title: 'Student Testimonial 1',
    subtitle: 'संस्कृत कोर्स रिव्यू',
    thumbnail: 'https://img.youtube.com/vi/KY6jVDHuMiM/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/shorts/KY6jVDHuMiM?feature=share'
  },
  {
    id: 2,
    title: 'Student Testimonial 2',
    subtitle: 'संस्कृत सीखने का अनुभव',
    thumbnail: 'https://img.youtube.com/vi/1wRsegfOJoQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/shorts/1wRsegfOJoQ?feature=share'
  },
  {
    id: 3,
    title: 'Student Testimonial 3',
    subtitle: 'कोर्स फीडबैक',
    thumbnail: 'https://img.youtube.com/vi/5IOb3Iy5rnY/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/shorts/5IOb3Iy5rnY?feature=share'
  }
]

export default function Reels() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="reels-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
          Video Testimonials
        </h2>
        <p className="text-gray-600 dark:text-gray-400 font-devanagari">
          हजारों छात्रों, गृहणियों और जिज्ञासुओं ने बढ़ाए संस्कृत की ओर कदम!
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {reelsData.map((reel) => (
          <a
            key={reel.id}
            href={reel.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[9/16] bg-gray-100">
              <Image
                src={reel.thumbnail}
                alt={reel.title}
                fill
                className="object-cover"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="bg-white rounded-full p-4">
                  <Play className="w-8 h-8 text-saffron-600" />
                </div>
              </div>
              {/* Shorts Badge */}
              <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                Shorts
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {reel.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-devanagari">
                {reel.subtitle}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Playlist Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Watch more on{' '}
          <a 
            href="https://www.youtube.com/playlist?list=PLHQ01VIno4knuiKht1_59FUeSsroyNeC0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-saffron-600 hover:text-saffron-700 font-semibold underline"
          >
            YouTube Playlist →
          </a>
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <a 
          href="https://courses.shikshanam.in/single-checkout/655b340de4b0b31c6db6cb3c?pid=p2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-saffron-600 hover:bg-saffron-700 text-white font-semibold rounded-lg transition-colors"
        >
          Enroll Today & Join Thousands
        </a>
      </div>
    </div>
  )
}
