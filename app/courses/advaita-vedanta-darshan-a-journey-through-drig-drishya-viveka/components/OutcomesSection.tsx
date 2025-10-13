'use client';
import { motion } from 'framer-motion';
import { Eye, Brain, Heart, Lightbulb } from 'lucide-react';

export default function OutcomesSection() {
  const outcomes = [
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Clear understanding of all 46 shlokas",
      description: "Gain comprehensive knowledge of every verse in Drig Drishya Viveka with detailed explanations."
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Insight into the relation between Drig (Seer) and Drishya (Seen)",
      description: "Master the fundamental distinction between consciousness and the world of objects."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Knowledge that helps free the mind from worldly bonds",
      description: "Apply the wisdom of Advaita Vedanta to liberate yourself from mental attachments and suffering."
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Deep appreciation of the ancient Advaita philosophical tradition",
      description: "Develop a profound understanding and respect for the timeless wisdom of non-dual philosophy."
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
        What you'll gain / Outcomes
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        Transform your understanding of reality and develop profound insights that you can apply 
        to enhance your spiritual growth and daily awareness.
      </p>

      <div className="advaita-grid advaita-grid-2 max-w-6xl mx-auto">
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
            <h3 className="advaita-heading text-xl mb-4">{outcome.title}</h3>
            <p className="advaita-subheading text-gray-600 leading-relaxed">{outcome.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
