'use client';

import { BookOpen, Brain, Users, Flame, HelpCircle, MessageCircle, Star } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem, MotionInView } from '@/components/motion/MotionWrapper';

export default function WhyCourseSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              <span className="text-muted-saffron-600">Questions you may have</span>
            </h2>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <MotionInView
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card-premium p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold text-high-contrast mb-3">
                कर्म, ज्ञान और भक्ति में कौन सर्वोत्तम?
              </h3>
            </MotionInView>
            <MotionInView
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="card-premium p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold text-high-contrast mb-3">
                सगुण भक्ति करें या निर्गुण?
              </h3>
            </MotionInView>
            <MotionInView
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-premium p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold text-high-contrast mb-3">
                आत्मा कैसी है और कहाँ रहती है?
              </h3>
            </MotionInView>
            <MotionInView
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="card-premium p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-2xl font-semibold text-high-contrast mb-3">
                मृत्यु के उपरांत क्या होगा?
              </h3>
            </MotionInView>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-12 bg-gradient-to-r from-gold-50 to-teal-50 p-8 rounded-3xl text-center border border-gold-200/30 shadow-sm">
            <h3 className="text-3xl font-display text-high-contrast mb-4">
              तो आज ही जुड़ें ईशावास्य उपनिषद् से!
            </h3>
            <p className="text-xl text-wisdom-600">
              Transform your life through the wisdom of all 18 Shlokas
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-12 bg-gradient-to-r from-gold-100 to-teal-100 p-8 rounded-3xl border border-gold-200/30 shadow-md">
            <div className="text-center">
              <h3 className="text-2xl font-display text-high-contrast mb-6">
                हज़ारों छात्रों, गृहणियों, जिज्ञासुओं ने अपनाया शिक्षणम् को!
              </h3>
              <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl font-bold text-gold-600 mb-2">50+</div>
                  <div className="text-high-contrast font-semibold">Students</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-4xl font-bold text-gold-600">4.9</div>
                    <Star className="w-6 h-6 fill-current text-yellow-400 ml-2" />
                  </div>
                  <div className="text-high-contrast font-semibold">Rating</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-4xl font-bold text-gold-600 mb-2">45+</div>
                  <div className="text-high-contrast font-semibold">Positive Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
