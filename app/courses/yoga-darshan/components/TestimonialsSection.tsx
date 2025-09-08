'use client';

import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    comment: 'This course transformed my understanding of Yoga philosophy. Vishal sir\'s explanations in Hindi made complex concepts so clear. I can now apply these principles in my daily life.',
    verified: true,
    course: 'Yoga Darshan'
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi, India',
    rating: 5,
    comment: 'बहुत ही बेहतरीन कोर्स है। सभी 195 सूत्रों की सरल व्याख्या के साथ practical applications भी बताई गई हैं। Highly recommended!',
    verified: true,
    course: 'Yoga Darshan'
  },
  {
    name: 'Anita Patel',
    location: 'Ahmedabad, India',
    rating: 5,
    comment: 'The instructor\'s teaching style is exceptional. He makes ancient wisdom accessible to modern learners. The course structure is perfect for beginners.',
    verified: true,
    course: 'Yoga Darshan'
  },
  {
    name: 'Suresh Mehta',
    location: 'Bangalore, India',
    rating: 5,
    comment: 'I\'ve studied Yoga philosophy before, but this course gave me a completely new perspective. The practical applications are life-changing.',
    verified: true,
    course: 'Yoga Darshan'
  },
  {
    name: 'Meera Singh',
    location: 'Pune, India',
    rating: 5,
    comment: 'Excellent course! The way complex sutras are explained with real-life examples is amazing. I feel more balanced and centered now.',
    verified: true,
    course: 'Yoga Darshan'
  },
  {
    name: 'Vikram Joshi',
    location: 'Kolkata, India',
    rating: 5,
    comment: 'This course is a gem! The instructor\'s knowledge and teaching methodology are outstanding. Worth every penny spent.',
    verified: true,
    course: 'Yoga Darshan'
  }
];

const stats = [
  { number: '150+', label: 'Students Enrolled' },
  { number: '4.8/5', label: 'Average Rating' },
  { number: '95%', label: 'Completion Rate' },
  { number: '100%', label: 'Satisfaction Rate' }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              What Students Say
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of satisfied students who have transformed their understanding of Yoga philosophy through this comprehensive course.
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-6 hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                
                <div className="relative mb-4">
                  <Quote className="w-8 h-8 text-saffron-300 absolute -top-2 -left-2" />
                  <p className="text-wisdom-600 leading-relaxed pl-6">
                    "{testimonial.comment}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-high-contrast">{testimonial.name}</h4>
                    <p className="text-sm text-wisdom-500">{testimonial.location}</p>
                  </div>
                  {testimonial.verified && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="bg-gradient-to-r from-saffron-50 to-teal-50 p-8 rounded-3xl mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display text-high-contrast mb-4">
                Course Statistics
              </h3>
              <p className="text-wisdom-600">
                Real results from real students who have completed the course
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-saffron-600 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-wisdom-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-display text-high-contrast mb-6">
                Join the Community of Spiritual Seekers
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🌟</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">High Quality</h4>
                  <p className="text-wisdom-600 text-sm">Comprehensive coverage of all 195 Yoga Sutras with practical applications</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Community Support</h4>
                  <p className="text-wisdom-600 text-sm">Join a supportive community of like-minded spiritual seekers</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Proven Results</h4>
                  <p className="text-wisdom-600 text-sm">95% completion rate with 4.8/5 average rating from students</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
