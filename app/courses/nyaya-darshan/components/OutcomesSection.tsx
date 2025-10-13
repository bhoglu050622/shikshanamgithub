'use client';
import { motion } from 'framer-motion';
import { Brain, Scale, Lightbulb, Target } from 'lucide-react';

export default function OutcomesSection() {
  const outcomes = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Master Logical Reasoning",
      description: "Develop powerful critical thinking and analytical skills through the systematic study of Nyaya logic and the five-membered syllogism."
    },
    {
      icon: <Scale className="w-12 h-12" />,
      title: "Debate & Argumentation",
      description: "Learn classical Indian debate techniques and how to construct valid arguments while identifying logical fallacies in reasoning."
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Valid Knowledge (Pramanas)",
      description: "Understand the four means of acquiring valid knowledge: perception, inference, comparison, and testimony through systematic epistemology."
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
        What You'll Gain
      </h2>
      <p className="nyaya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Transform your logical reasoning abilities and develop critical thinking skills that you can apply 
        to enhance your analytical capabilities and argumentation prowess.
      </p>

      <div className="nyaya-grid nyaya-grid-3">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="nyaya-card text-center group hover:nyaya-glow"
          >
            <div className="nyaya-icon mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              {outcome.icon}
            </div>
            <h3 className="nyaya-heading text-2xl mb-4 font-bold">{outcome.title}</h3>
            <p className="nyaya-subheading text-gray-600 leading-relaxed">{outcome.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 p-10 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl text-white shadow-2xl"
      >
        <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-90 animate-pulse" />
        <h3 className="nyaya-heading text-3xl mb-4 text-white font-bold">
          Master the Art of Logic
        </h3>
        <p className="nyaya-subheading text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
          Nyaya philosophy isn't just theoretical knowledge—it's a practical framework for developing 
          sharp logical reasoning and debate skills. By the end of this course, you'll have the tools to approach 
          arguments with precision, clarity, and systematic thinking.
        </p>
      </motion.div>
    </motion.div>
  );
}
