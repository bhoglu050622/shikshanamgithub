'use client';
import { motion } from 'framer-motion';
import { Eye, Brain, Scale, Lightbulb } from 'lucide-react';

export default function WhyCourseSection() {
  const reasons = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Understand Purusha vs Prakriti",
      description: "Dive deep into the fundamental duality that forms the basis of Samkhya philosophy and existence itself."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Learn Causality under Satkaryavada",
      description: "Master the theory of causation that explains how effects pre-exist in their causes."
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Discover the Three Gunas",
      description: "Understand Sattva, Rajas, and Tamas - the three fundamental qualities that govern all existence."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Apply to Modern Life",
      description: "Connect ancient Samkhya wisdom with contemporary thought and daily life applications."
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
      <h2 className="samkhya-heading text-4xl mb-4">
        क्यों पढ़ें सांख्य दर्शन?
      </h2>
      <p className="samkhya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Samkhya philosophy offers the most systematic approach to understanding reality. 
        Learn the foundational principles that have influenced Indian thought for millennia.
      </p>

      <div className="samkhya-grid samkhya-grid-2">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="samkhya-card text-center"
          >
            <div className="samkhya-icon mx-auto">
              {reason.icon}
            </div>
            <h3 className="samkhya-heading text-xl mb-3">{reason.title}</h3>
            <p className="samkhya-subheading text-gray-600">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
