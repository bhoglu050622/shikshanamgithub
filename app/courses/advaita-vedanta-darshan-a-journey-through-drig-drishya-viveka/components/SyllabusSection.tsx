'use client';
import { motion } from 'framer-motion';
import { Circle, ArrowRight, PlayCircle } from 'lucide-react';

export default function SyllabusSection() {
  const modules = [
    {
      title: "Course Introduction",
      lectures: [
        { title: "दर्शन क्या है?", duration: "00:24:36" },
        { title: "दर्शन की प्रकृति", duration: "00:23:22" },
        { title: "वेदान्त परिचय", duration: "00:18:48" },
        { title: "द्वैत अद्वैत द्वैताद्वैत का अंतर", duration: "00:15:26" },
        { title: "संक्षिप्त परिचय", duration: "00:18:28" }
      ]
    },
    {
      title: "Shlokas 1-10",
      lectures: [
        { title: "श्लोक 1: दृग् और दृश्य", duration: "00:16:22" },
        { title: "श्लोक 2: दृष्टा की प्रकृति", duration: "00:08:48" },
        { title: "श्लोक 3: इन्द्रियाँ और मन", duration: "00:12:60" },
        { title: "श्लोक 4: आत्मा और मन", duration: "00:20:11" },
        { title: "श्लोक 5: आत्मा के लक्षण", duration: "00:18:11" },
        { title: "श्लोक 6: चित् छाया और बुद्धि", duration: "00:19:56" },
        { title: "श्लोक 7: आत्मा और अहंकार", duration: "00:15:30" },
        { title: "श्लोक 8: आत्मा की अप्रमेयता", duration: "00:08:22" },
        { title: "श्लोक 9: दृश्य की परिभाषा", duration: "00:13:47" },
        { title: "श्लोक 10: दृश्य की त्रिविधता", duration: "00:11:35" }
      ]
    },
    {
      title: "Shlokas 11-20",
      lectures: [
        { title: "श्लोक 11: दृश्य का विवेक", duration: "00:10:24" },
        { title: "श्लोक 12: जीव की स्थितियाँ", duration: "00:14:17" },
        { title: "श्लोक 13: जाग्रत अवस्था", duration: "00:12:55" },
        { title: "श्लोक 14: स्वप्न अवस्था", duration: "00:15:42" },
        { title: "श्लोक 15: सुषुप्ति अवस्था", duration: "00:13:28" },
        { title: "श्लोक 16: तीनों अवस्थाओं का विवेक", duration: "00:16:33" },
        { title: "श्लोक 17: साक्षी चेतना", duration: "00:18:19" },
        { title: "श्लोक 18: ब्रह्म की प्रकृति", duration: "00:14:56" },
        { title: "श्लोक 19: माया और ब्रह्म", duration: "00:17:41" },
        { title: "श्लोक 20: जीव ब्रह्म ऐक्य", duration: "00:15:22" }
      ]
    },
    {
      title: "Shlokas 21-30",
      lectures: [
        { title: "श्लोक 21: अविद्या का स्वरूप", duration: "00:12:48" },
        { title: "श्लोक 22: अविद्या का निवारण", duration: "00:14:35" },
        { title: "श्लोक 23: ज्ञान की प्रक्रिया", duration: "00:16:12" },
        { title: "श्लोक 24: आत्मज्ञान", duration: "00:13:57" },
        { title: "श्लोक 25: साधना की आवश्यकता", duration: "00:11:44" },
        { title: "श्लोक 26: विवेक", duration: "00:15:28" },
        { title: "श्लोक 27: वैराग्य", duration: "00:14:16" },
        { title: "श्लोक 28: षट्सम्पत्ति", duration: "00:17:53" },
        { title: "श्लोक 29: मुमुक्षुत्व", duration: "00:12:39" },
        { title: "श्लोक 30: साधन चतुष्टय", duration: "00:15:47" }
      ]
    },
    {
      title: "Shlokas 31-40",
      lectures: [
        { title: "श्लोक 31: श्रवण", duration: "00:13:25" },
        { title: "श्लोक 32: मनन", duration: "00:14:58" },
        { title: "श्लोक 33: निदिध्यासन", duration: "00:16:41" },
        { title: "श्लोक 34: समाधि", duration: "00:15:33" },
        { title: "श्लोक 35: ब्रह्माकार वृत्ति", duration: "00:12:27" },
        { title: "श्लोक 36: वृत्ति का विलय", duration: "00:14:19" },
        { title: "श्लोक 37: अखण्ड अनुभव", duration: "00:13:52" },
        { title: "श्लोक 38: मुक्ति का स्वरूप", duration: "00:15:46" },
        { title: "श्लोक 39: जीवन्मुक्ति", duration: "00:14:31" },
        { title: "श्लोक 40: विदेहमुक्ति", duration: "00:12:15" }
      ]
    },
    {
      title: "Shlokas 41-46",
      lectures: [
        { title: "श्लोक 41: परमार्थ सत्य", duration: "00:13:38" },
        { title: "श्लोक 42: जगत की स्थिति", duration: "00:14:52" },
        { title: "श्लोक 43: एकत्व का अनुभव", duration: "00:15:27" },
        { title: "श्लोक 44: ज्ञानी का जीवन", duration: "00:12:44" },
        { title: "श्लोक 45: अंतिम उपदेश", duration: "00:13:59" },
        { title: "श्लोक 46: आवृति का नाश", duration: "00:04:30" }
      ]
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
        Syllabus (Verse-by-verse / Modules)
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        A systematic exploration of all 46 shlokas of Drig-Drishya Viveka. 
        Each lecture is carefully structured to build your understanding progressively.
      </p>

      <div className="max-w-5xl mx-auto space-y-6">
        {modules.map((module, moduleIndex) => (
          <motion.div
            key={moduleIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: moduleIndex * 0.1 }}
            viewport={{ once: true }}
            className="advaita-card text-left"
          >
            <h3 className="advaita-heading text-2xl mb-4 pb-3 border-b border-advaita-secondary/20">
              {module.title}
            </h3>
            <div className="space-y-2">
              {module.lectures.map((lecture, lectureIndex) => (
                <div
                  key={lectureIndex}
                  className="flex items-center justify-between py-3 px-4 hover:bg-advaita-light/30 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-advaita-primary flex-shrink-0" />
                    <span className="advaita-subheading text-gray-700">{lecture.title}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">{lecture.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
