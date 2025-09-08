'use client';
import { motion } from 'framer-motion';
import { Brain, Scale, Lightbulb, Target } from 'lucide-react';

export default function WhyCourseSection() {
  const reasons = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Master Indian Logic Systems",
      description: "Learn the sophisticated Nyaya logical framework including the five-membered syllogism and debate techniques."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Understand Epistemology (Pramanas)",
      description: "Explore the four means of valid knowledge: perception, inference, comparison, and testimony."
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Study Vaisheshika Atomic Theory",
      description: "Discover the ancient Indian atomic theory of matter and the six categories of reality."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Develop Critical Thinking",
      description: "Enhance your logical reasoning skills and apply ancient wisdom to modern problem-solving."
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
      <h2 className="nyaya-heading text-4xl mb-4">
        क्यों पढ़ें न्याय दर्शन?
      </h2>
      <p className="nyaya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Nyaya philosophy offers the most sophisticated logical systems in Indian thought. 
        Master the art of reasoning, debate, and critical thinking that has shaped intellectual discourse for centuries.
      </p>

      <div className="nyaya-grid nyaya-grid-2">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="nyaya-card text-center"
          >
            <div className="nyaya-icon mx-auto">
              {reason.icon}
            </div>
            <h3 className="nyaya-heading text-xl mb-3">{reason.title}</h3>
            <p className="nyaya-subheading text-gray-600">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
