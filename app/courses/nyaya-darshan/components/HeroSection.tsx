'use client';
import { motion } from 'framer-motion';
import { BookOpen, Play, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="nyaya-hero min-h-screen flex items-center justify-center relative">
      <div className="nyaya-hero-content container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title nyaya-heading">
            न्याय दर्शन — Master the Art of Logical Reasoning
          </h1>
          <p className="hero-subtitle nyaya-subheading max-w-3xl mx-auto">
            Discover the sophisticated logical systems of Nyaya philosophy. Learn Indian logic, 
            epistemology, and the atomic theory of matter through structured, accessible teachings.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <div className="nyaya-price">
              ₹1,999
              <span className="nyaya-price-original">₹2,999</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Lifetime Access</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a href="#enroll" className="nyaya-btn-primary">
              <BookOpen className="w-5 h-5 mr-2 inline" />
              Enroll Now · ₹1,999
            </a>
            <a href="#preview" className="nyaya-btn-secondary">
              <Play className="w-5 h-5 mr-2 inline" />
              Watch Preview
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-nyaya-primary">8-10</div>
              <div className="text-sm text-gray-600">Hours Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-nyaya-primary">Hindi</div>
              <div className="text-sm text-gray-600">Language</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-nyaya-primary">∞</div>
              <div className="text-sm text-gray-600">Lifetime Access</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
