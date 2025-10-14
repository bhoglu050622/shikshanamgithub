'use client';


import { Star, Quote, CheckCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem, MotionInView } from '@/components/motion/MotionWrapper';

const testimonials = [
  {
    name: 'Ramesh Kumar',
    location: 'India',
    rating: 5,
    comment: 'The explanation of prana and consciousness is brilliant. This course deepened my meditation practice significantly.',
    verified: true,
    course: 'Prashna Upanishad'
  },
  {
    name: 'Anjali Sharma',
    location: 'India',
    rating: 5,
    comment: 'Perfect complement to my yoga practice. Understanding the five pranas has transformed my teaching.',
    verified: true,
    course: 'Prashna Upanishad'
  },
  {
    name: 'Vikram Reddy',
    location: 'India',
    rating: 5,
    comment: 'Clear, systematic, and profound. The six questions cover everything essential for spiritual growth.',
    verified: true,
    course: 'Prashna Upanishad'
  },
  {
    name: 'Priya Menon',
    location: 'India',
    rating: 5,
    comment: 'Helped me understand the deeper dimensions of meditation and consciousness. Highly recommended!',
    verified: true,
    course: 'Prashna Upanishad'
  },
  {
    name: 'Karthik Iyer',
    location: 'India',
    rating: 5,
    comment: 'Excellent course structure. The Om meditation teaching is particularly valuable.',
    verified: true,
    course: 'Prashna Upanishad'
  },
  {
    name: 'Lakshmi Devi',
    location: 'India',
    rating: 5,
    comment: 'Acharyaji\'s explanations make complex concepts easy to grasp. Life-changing course!',
    verified: true,
    course: 'Prashna Upanishad'
  }
];

const stats = [
  { number: '50+', label: 'Students Enrolled' },
  { number: '4.9', label: 'Average Rating', showStar: true },
  { number: '45+', label: 'Positive Reviews' }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Testimonials / Student feedback
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Here's what our students are saying about the course!
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <MotionInView
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
                  <Quote className="w-8 h-8 text-gold-300 absolute -top-2 -left-2" />
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
              </MotionInView>
            ))}
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="bg-gradient-to-r from-gold-50 to-teal-50 p-8 rounded-3xl mb-16 border border-gold-200/30 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display text-high-contrast mb-4">
                Course Statistics
              </h3>
              <p className="text-wisdom-600">
                Real results from students who have completed the course
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <MotionInView
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-3xl lg:text-4xl font-bold text-gold-600">
                      {stat.number}
                    </div>
                    {stat.showStar && (
                      <Star className="w-6 h-6 fill-current text-yellow-400 ml-2" />
                    )}
                  </div>
                  <p className="text-wisdom-600 font-medium">{stat.label}</p>
                </MotionInView>
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
                  <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">🤔</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Deep Inquiry</h4>
                  <p className="text-wisdom-600 text-sm">Explore the six fundamental questions that lead to spiritual awakening</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Community Support</h4>
                  <p className="text-wisdom-600 text-sm">Connect with like-minded seekers on the spiritual path</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h4 className="text-lg font-semibold text-high-contrast mb-2">Proven Results</h4>
                  <p className="text-wisdom-600 text-sm">4.9/5 rating with 100% completion rate from students</p>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
