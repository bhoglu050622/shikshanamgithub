'use client';
import { motion } from 'framer-motion';
import { Eye, Brain, Heart, Lightbulb } from 'lucide-react';

export default function OutcomesSection() {
  const outcomes = [
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Realization of Non-Duality",
      description: "Understand the fundamental unity of existence and see through the illusion of separation to recognize the non-dual essence of reality."
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Clarity of Seer-Seen Dynamics",
      description: "Master the distinction between consciousness and the world, developing clear understanding of the relationship between observer and observed."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Philosophical Depth with Daily Relevance",
      description: "Integrate profound philosophical insights into daily life, finding practical applications of non-dual wisdom in everyday situations."
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
      <h2 className="advaita-heading text-4xl mb-4">
        What You'll Gain
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        Transform your understanding of reality and develop profound insights that you can apply 
        to enhance your spiritual growth and daily awareness.
      </p>

      <div className="advaita-grid advaita-grid-3">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="advaita-card text-center group hover:advaita-glow"
          >
            <div className="advaita-icon mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              {outcome.icon}
            </div>
            <h3 className="advaita-heading text-2xl mb-4">{outcome.title}</h3>
            <p className="advaita-subheading text-gray-600 leading-relaxed">{outcome.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-gradient-to-r from-advaita-primary to-advaita-accent rounded-2xl text-white"
      >
        <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-80" />
        <h3 className="advaita-heading text-3xl mb-4 text-white">
          Confidence to Live in Awareness
        </h3>
        <p className="advaita-subheading text-lg text-white/90 max-w-3xl mx-auto">
          Drig-Drishya Viveka isn't just theoretical knowledge—it's a practical framework for living 
          in awareness and recognizing the unity behind all apparent diversity. By the end of this course, 
          you'll have the tools to approach life with greater wisdom, clarity, and understanding of your true nature.
        </p>
      </motion.div>
    </motion.div>
  );
}
