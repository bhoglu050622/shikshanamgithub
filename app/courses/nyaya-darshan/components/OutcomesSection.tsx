'use client';
import { motion } from 'framer-motion';
import { Eye, Brain, Heart, Lightbulb } from 'lucide-react';

export default function OutcomesSection() {
  const outcomes = [
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Deep Insight into Reality",
      description: "Understand the fundamental structure of existence through Purusha and Prakriti, gaining clarity on the nature of consciousness and matter."
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Balanced Perspective",
      description: "Develop a balanced approach to life by understanding the Three Gunas and their influence on thoughts, emotions, and actions."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Mindful Causality",
      description: "Learn to approach cause and effect with wisdom, making better decisions based on understanding Satkaryavada principles."
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
        What You'll Gain
      </h2>
      <p className="samkhya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Transform your understanding of reality and develop practical wisdom that you can apply 
        to enhance your daily life and spiritual growth.
      </p>

      <div className="samkhya-grid samkhya-grid-3">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="samkhya-card text-center group hover:samkhya-glow"
          >
            <div className="samkhya-icon mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              {outcome.icon}
            </div>
            <h3 className="samkhya-heading text-2xl mb-4">{outcome.title}</h3>
            <p className="samkhya-subheading text-gray-600 leading-relaxed">{outcome.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-gradient-to-r from-samkhya-primary to-samkhya-accent rounded-2xl text-white"
      >
        <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-80" />
        <h3 className="samkhya-heading text-3xl mb-4 text-white">
          Transform Your Understanding
        </h3>
        <p className="samkhya-subheading text-lg text-white/90 max-w-3xl mx-auto">
          Samkhya philosophy isn't just theoretical knowledge—it's a practical framework for understanding 
          yourself and the world around you. By the end of this course, you'll have the tools to approach 
          life with greater wisdom, clarity, and balance.
        </p>
      </motion.div>
    </motion.div>
  );
}
