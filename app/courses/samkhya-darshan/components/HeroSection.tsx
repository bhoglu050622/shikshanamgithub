'use client';
import { motion } from 'framer-motion';
import { BookOpen, Play, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="samkhya-hero min-h-screen flex items-center justify-center relative">
      <div className="samkhya-hero-content container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title samkhya-heading">
            सांख्य दर्शन — Decode the Foundations of Existence
          </h1>
          <p className="hero-subtitle samkhya-subheading max-w-3xl mx-auto">
            Translating Samkhya's timeless principles in clear Hindi. Understand Purusha, Prakriti, 
            and the Three Gunas through structured, accessible teachings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <div className="samkhya-price">
              ₹1,499
              <span className="samkhya-price-original">₹2,499</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Lifetime Access</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a href="#enroll" className="samkhya-btn-primary">
              <BookOpen className="w-5 h-5 mr-2 inline" />
              Enroll Now · ₹1,499
            </a>
            <a href="#preview" className="samkhya-btn-secondary">
              <Play className="w-5 h-5 mr-2 inline" />
              Watch Preview
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-samkhya-primary">6-8</div>
              <div className="text-sm text-gray-600">Hours Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-samkhya-primary">Hindi</div>
              <div className="text-sm text-gray-600">Language</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-samkhya-primary">∞</div>
              <div className="text-sm text-gray-600">Lifetime Access</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
