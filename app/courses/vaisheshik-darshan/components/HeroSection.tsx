'use client';
import { motion } from 'framer-motion';
import { BookOpen, Play, Star, Atom } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="vaisheshik-hero min-h-screen flex items-center justify-center relative">
      <div className="vaisheshik-hero-content container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title vaisheshik-heading">
            वैशेषिक दर्शन – Logic & Realism Unveiled
          </h1>
          <p className="hero-subtitle vaisheshik-subheading max-w-3xl mx-auto">
            Dive deep into Kanada's atomic realism, explore six fundamental categories (padārthas), 
            and master the foundations of Indian philosophical realism through structured learning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <div className="vaisheshik-price">
              ₹999
              <span className="vaisheshik-price-original">₹1,799</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>5.0 Rating (11 reviews)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a href="#enroll" className="vaisheshik-btn-primary">
              <BookOpen className="w-5 h-5 mr-2 inline" />
              Enroll Now · ₹999
            </a>
            <a href="#preview" className="vaisheshik-btn-secondary">
              <Play className="w-5 h-5 mr-2 inline" />
              Watch Free Preview
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-vaisheshik-primary">6</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-vaisheshik-primary">2</div>
              <div className="text-sm text-gray-600">Pramanas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-vaisheshik-primary">∞</div>
              <div className="text-sm text-gray-600">Lifetime Access</div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="vaisheshik-atomic-structure">
              <div className="vaisheshik-atom" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
              <div className="vaisheshik-atom" style={{ top: '20%', left: '20%' }}></div>
              <div className="vaisheshik-atom" style={{ top: '20%', right: '20%' }}></div>
              <div className="vaisheshik-atom" style={{ bottom: '20%', left: '20%' }}></div>
              <div className="vaisheshik-atom" style={{ bottom: '20%', right: '20%' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
