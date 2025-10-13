'use client';


import { BookOpen, Clock, Play, Lock } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem, MotionInView } from '@/components/motion/MotionWrapper';

const chapters = [
  {
    number: 1,
    title: "Why Isha Upanishad ?",
    hasDemo: true,
    duration: "00:05:39"
  },
  {
    number: 2,
    title: "सर्वत्र भगवद् दृष्टि",
    hasDemo: true,
    duration: "00:08:28"
  },
  {
    number: 3,
    title: "पथ-भ्रष्ट कौन? [What not to do?]",
    hasDemo: false,
    duration: "00:05:48"
  },
  {
    number: 4,
    title: "ईश्वर की हत्या न करें",
    hasDemo: false,
    duration: "00:07:58"
  },
  {
    number: 5,
    title: "आत्मतत्व कैसा है?",
    hasDemo: false,
    duration: "00:14:54"
  },
  {
    number: 6,
    title: "आत्मा कहाँ रहती है ?",
    hasDemo: false,
    duration: "00:07:30"
  },
  {
    number: 7,
    title: "सार्वात्म्यदर्शन",
    hasDemo: false,
    duration: "00:07:45"
  },
  {
    number: 8,
    title: "शोक-मोह का नाश",
    hasDemo: false,
    duration: "00:04:35"
  },
  {
    number: 9,
    title: "आत्मा के लक्षण",
    hasDemo: false,
    duration: "00:10:19"
  },
  {
    number: 10,
    title: "कर्म या ज्ञान ?",
    hasDemo: false,
    duration: "00:12:23"
  },
  {
    number: 11,
    title: "विद्या और अविद्या के फल",
    hasDemo: false,
    duration: "00:08:43"
  },
  {
    number: 12,
    title: "ज्ञानयुक्त कर्म",
    hasDemo: false,
    duration: "00:09:31"
  },
  {
    number: 13,
    title: "सगुण/निर्गुण उपासना के फल",
    hasDemo: false,
    duration: "00:11:13"
  },
  {
    number: 14,
    title: "व्यक्त/अव्यक्त उपासना फल में भेद",
    hasDemo: false,
    duration: "00:03:11"
  },
  {
    number: 15,
    title: "व्यक्त-अव्यक्त का एकत्व",
    hasDemo: false,
    duration: "00:07:56"
  },
  {
    number: 16,
    title: "अमृतत्व का मार्ग",
    hasDemo: false,
    duration: "00:08:30"
  },
  {
    number: 17,
    title: "परमात्मा में एकत्व",
    hasDemo: false,
    duration: "00:10:19"
  },
  {
    number: 18,
    title: "मैं पुरुष हूँ",
    hasDemo: false,
    duration: "00:12:11"
  },
  {
    number: 19,
    title: "मरणोन्मुख उपासना",
    hasDemo: false,
    duration: "00:15:59"
  }
];

export default function SyllabusSection() {
  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Syllabus
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Complete coverage of all 18 Shlokas through 19 comprehensive chapters
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <MotionInView
                  key={chapter.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="card-premium p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{chapter.number}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-high-contrast mb-1">
                          {chapter.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center space-x-2 text-wisdom-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{chapter.duration}</span>
                          </div>
                          {chapter.hasDemo && (
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                              Free Demo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {chapter.hasDemo ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <Play className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-wisdom-400">
                          <Lock className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </MotionInView>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 bg-gradient-to-r from-gold-50 to-teal-50 p-8 rounded-3xl text-center border border-gold-200/30 shadow-sm">
            <h3 className="text-2xl font-display text-high-contrast mb-4">
              Complete Learning Journey
            </h3>
            <p className="text-wisdom-600">
              <span className="font-semibold text-high-contrast">Total Duration:</span> 3+ Hours • 
              <span className="font-semibold text-high-contrast"> 19 Comprehensive Chapters</span> • 
              <span className="font-semibold text-high-contrast"> 1-Year Access</span>
            </p>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
