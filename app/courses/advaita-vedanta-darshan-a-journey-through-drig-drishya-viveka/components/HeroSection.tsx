'use client';
import { motion } from 'framer-motion';
import { BookOpen, Play, Star, Eye } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="advaita-hero min-h-screen flex items-center justify-center relative">
      <div className="advaita-hero-content container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title advaita-heading">
            Advaita Vedanta Darshan: 'दृग–दृश्य विवेक' — The Essence of Non-Duality
          </h1>
          <p className="hero-subtitle advaita-subheading max-w-3xl mx-auto">
            Uncover the relationship between the Seer (Drig) and the Seen (Drishya), and the unity of Brahman behind all. 
            Hindi streaming, lifetime access with structured release on Mondays, Wednesdays & Fridays.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <div className="advaita-price">
              ₹1,999
              <span className="advaita-price-original">₹2,499</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.8 Rating (6 reviews)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a href="#enroll" className="advaita-btn-primary">
              <BookOpen className="w-5 h-5 mr-2 inline" />
              Enroll Now · ₹1,999
            </a>
            <a href="#preview" className="advaita-btn-secondary">
              <Play className="w-5 h-5 mr-2 inline" />
              Watch Free Preview
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-advaita-primary">46</div>
              <div className="text-sm text-gray-600">Verses Explained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-advaita-primary">Nov 15</div>
              <div className="text-sm text-gray-600">Launch Date</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-advaita-primary">∞</div>
              <div className="text-sm text-gray-600">Lifetime Access</div>
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
