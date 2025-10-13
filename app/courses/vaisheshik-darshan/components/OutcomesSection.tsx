'use client';
import { motion } from 'framer-motion';
import { Brain, Eye, Scale, Lightbulb } from 'lucide-react';

export default function OutcomesSection() {
  const outcomes = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "सही ज्ञान होगा Padartha का",
      description: "Complete understanding of Dravya, Guna, Karma, Samanya, Vishesha and other fundamental categories (padartha) of existence."
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: "अंतर बोध - Deep Differentiation",
      description: "Gain the ability to distinguish how substance (padarth), quality (guna), and action (karma) are different yet interconnected."
    },
    {
      icon: <Scale className="w-12 h-12" />,
      title: "विवेकी दृष्टि — Discerning Vision",
      description: "Develop a discerning perspective to understand what is real (vastu) and what is illusory (mithya)."
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "तर्क और दर्शन की क्षमता",
      description: "Cultivate the ability to integrate logic and philosophy into your daily life and decision-making."
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
      <h2 className="vaisheshik-heading text-4xl mb-4">
        What You Will Become Capable Of
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        Transform your understanding of reality through the systematic study of Vaisheshik philosophy. 
        Develop deep insights into the fundamental nature of existence and cultivate discerning wisdom.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="vaisheshik-card text-center group hover:vaisheshik-glow"
          >
            <div className="vaisheshik-icon mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              {outcome.icon}
            </div>
            <h3 className="vaisheshik-heading text-xl mb-4">{outcome.title}</h3>
            <p className="vaisheshik-subheading text-gray-600 leading-relaxed">{outcome.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-gradient-to-r from-vaisheshik-primary to-vaisheshik-accent rounded-2xl text-white"
      >
        <h3 className="vaisheshik-heading text-3xl mb-4 text-white">
          Why This Course Context?
        </h3>
        <p className="vaisheshik-subheading text-lg text-white/90 max-w-3xl mx-auto">
          न्याय दर्शन के बाद वैशेषिक दर्शन क्यों? — After understanding the logic and reasoning of Nyaya Darshan, 
          Vaisheshik Darshan takes you deeper into the atomic structure of reality and the fundamental categories 
          that govern all existence. Together, they provide a complete framework for understanding truth.
        </p>
      </motion.div>
    </motion.div>
  );
}
