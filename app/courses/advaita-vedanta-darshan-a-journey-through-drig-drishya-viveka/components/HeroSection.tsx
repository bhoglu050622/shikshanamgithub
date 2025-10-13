'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Play, Star, Eye } from 'lucide-react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function HeroSection() {
  return (
    <section className="advaita-hero min-h-screen flex items-center justify-center relative">
      <div className="absolute inset-0 opacity-5">
        <Image 
          src="/assets/comics/vedanta.svg"
          alt="Advaita Vedanta Darshan"
          fill
          className="object-contain"
        />
      </div>
      <div className="advaita-hero-content container-custom text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title advaita-heading">
            Advaita Vedanta Darshan: A Journey Through Drig Drishya Viveka
          </h1>
          <p className="hero-subtitle advaita-subheading max-w-3xl mx-auto">
            Explore the Unity of the Seer and Seen via verse-by-verse study of Drig Drishya Viveka
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <div className="text-lg font-medium text-gray-700">
              <span className="text-sm">Skill Level:</span> <span className="font-bold">Beginner</span>
              <span className="mx-3">|</span>
              <span className="text-sm">Language:</span> <span className="font-bold">हिन्दी</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <div className="flex items-center gap-3">
              <div className="advaita-price">
                ₹1,999
              </div>
              <div className="text-xl text-gray-400 line-through">
                ₹2,499
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                20% OFF
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>0 Rating • 0K+ Students • 0K+ Reviews</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/6732e50755381c626392a6b6?pid=p1" className="advaita-btn-primary">
              <BookOpen className="w-5 h-5 mr-2 inline" />
              Enroll Now
            </ProtectedExternalLink>
            <a href="#preview" className="advaita-btn-secondary">
              <Play className="w-5 h-5 mr-2 inline" />
              Watch Free Preview
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-advaita-primary">46</div>
              <div className="text-sm text-gray-600">Shlokas Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-advaita-primary">7+ Hrs</div>
              <div className="text-sm text-gray-600">of Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-advaita-primary">1 Yr</div>
              <div className="text-sm text-gray-600">Access</div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="advaita-unity">
              <div className="advaita-center"></div>
              <div className="advaita-ring"></div>
              <div className="advaita-ring"></div>
              <div className="advaita-ring"></div>
              <div className="advaita-ring"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
