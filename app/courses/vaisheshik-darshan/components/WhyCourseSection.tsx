'use client';
import { motion } from 'framer-motion';
import { Atom, Globe, BookOpen, Lightbulb, Sparkles } from 'lucide-react';

export default function WhyCourseSection() {
  const questions = [
    {
      icon: <Atom className="w-10 h-10" />,
      question: "भारत ने भौतिकी में क्या खोजें कीं?"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      question: "ब्रह्मांड के सूक्ष्मतम स्तर पर क्या है?"
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      question: "ईश्वर ने किस पदार्थ से ये सृष्टि रची है?"
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      question: "क्या वेदों को भी ईश्वर ने रचा है?"
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
        Why This Course?
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        Explore the profound questions that have intrigued seekers for millennia. 
        Discover ancient Indian insights into physics, cosmology, and the fundamental nature of reality.
      </p>

      <div className="vaisheshik-grid vaisheshik-grid-2 mb-12">
        {questions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="vaisheshik-card text-center group hover:vaisheshik-glow"
          >
            <div className="vaisheshik-icon mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-vaisheshik-primary">{item.question}</h3>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 p-8 bg-gradient-to-r from-vaisheshik-primary to-vaisheshik-accent rounded-2xl text-white max-w-4xl mx-auto"
      >
        <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-90" />
        <h3 className="text-3xl font-bold mb-4">
          तो आज ही जुड़ें महर्षि कणाद जी के वैशेषिक सूत्रों से!
        </h3>
        <p className="text-xl text-white/90">
          Join thousands of students, homemakers, and seekers who have embraced the wisdom of Vaisheshik Darshan
        </p>
      </motion.div>
    </motion.div>
  );
}
