'use client';
import { motion } from 'framer-motion';
import { Brain, Eye, Scale, Lightbulb } from 'lucide-react';

export default function OutcomesSection() {
  const outcomes = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Analytical Insight",
      description: "Understand atomic metaphysics and develop a systematic approach to analyzing the structure of reality through logical reasoning."
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Clarity of Reality",
      description: "See the unseen workings of the physical world through the lens of atomic theory and the six fundamental categories."
    },
    {
      icon: <Scale className="w-12 h-12" />,
      title: "Philosophical Tools",
      description: "Equip yourself with reasoning skills and conceptual rigor that can be applied to any field of study or life situation."
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
        What You'll Gain
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        Transform your understanding of reality and develop analytical thinking skills that you can apply 
        to enhance your logical reasoning and philosophical insight.
      </p>

      <div className="vaisheshik-grid vaisheshik-grid-3">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="vaisheshik-card text-center group hover:vaisheshik-glow"
          >
            <div className="vaisheshik-icon mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              {outcome.icon}
            </div>
            <h3 className="vaisheshik-heading text-2xl mb-4">{outcome.title}</h3>
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
        <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-80" />
        <h3 className="vaisheshik-heading text-3xl mb-4 text-white">
          Develop Logical Thinking
        </h3>
        <p className="vaisheshik-subheading text-lg text-white/90 max-w-3xl mx-auto">
          Vaisheshika philosophy isn't just theoretical knowledge—it's a practical framework for developing 
          analytical thinking and logical reasoning. By the end of this course, you'll have the tools to 
          approach any problem with systematic analysis and clear reasoning.
        </p>
      </motion.div>
    </motion.div>
  );
}
