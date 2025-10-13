'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Philosophy Student",
      content: "Vishal Sir's explanation of the Pramanas and logical reasoning was so clear that I finally understood the fundamental concepts that had confused me for years. The way he connects ancient logic with modern critical thinking is remarkable.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Software Engineer",
      content: "As someone from a technical background, I appreciated the systematic approach to Nyaya philosophy. The course structure and the way logical concepts are broken down made it accessible and engaging.",
      rating: 5
    },
    {
      name: "Meera Patel",
      role: "Debate Enthusiast",
      content: "This course transformed my debate skills. The explanation of the five-membered syllogism and logical fallacies has dramatically improved how I construct and analyze arguments.",
      rating: 5
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="nyaya-heading text-4xl mb-4 font-bold">
        What Students Say
      </h2>
      <p className="nyaya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Join hundreds of learners who have transformed their logical reasoning abilities 
        through this comprehensive exploration of Nyaya philosophy.
      </p>

      <div className="nyaya-grid nyaya-grid-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="nyaya-testimonial"
          >
            <div className="flex items-center justify-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="nyaya-subheading text-gray-700 mb-6 leading-relaxed text-base">
              "{testimonial.content}"
            </p>
            <div className="border-t-2 border-blue-100 pt-4">
              <h4 className="nyaya-heading text-lg font-bold">{testimonial.name}</h4>
              <p className="nyaya-subheading text-sm text-gray-600">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 p-10 bg-gradient-to-r from-blue-50 via-white to-amber-50 rounded-3xl border-2 border-blue-200 shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-10 h-10 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="text-center md:text-left">
            <div className="nyaya-heading text-5xl font-bold bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">4.9</div>
            <div className="nyaya-subheading text-gray-600 font-semibold">Average Rating</div>
          </div>
        </div>
        <p className="nyaya-subheading text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Trusted by learners for clear, logical instruction. Join a community of critical thinkers 
          who are transforming their reasoning abilities through Nyaya philosophy.
        </p>
      </motion.div>
    </motion.div>
  );
}
