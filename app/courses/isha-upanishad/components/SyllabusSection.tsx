'use client';

import { useState } from 'react';

export default function SyllabusSection() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

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

  const toggleChapter = (chapterNumber: number) => {
    setExpandedChapter(expandedChapter === chapterNumber ? null : chapterNumber);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-saffron-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron-800 mb-4">
            Syllabus
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-saffron-300"></div>

          {/* Chapters */}
          <div className="space-y-6">
            {chapters.map((chapter, index) => (
              <div key={chapter.number} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-saffron-500 rounded-full border-4 border-white shadow-lg"></div>

                {/* Chapter content */}
                <div className="ml-16 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <button
                    onClick={() => toggleChapter(chapter.number)}
                    className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:ring-opacity-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-semibold text-saffron-600 bg-saffron-100 px-3 py-1 rounded-full">
                            Chapter {chapter.number}
                          </span>
                          {chapter.hasDemo && (
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                              Free Demo
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-saffron-800 mb-2">
                          {chapter.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-saffron-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                            </svg>
                            {chapter.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 text-center bg-saffron-100 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-saffron-800 mb-2">
            Complete Learning Journey
          </h3>
          <p className="text-saffron-700">
            Total Duration: 3+ Hours • 19 Comprehensive Chapters • 1-Year Access
          </p>
        </div>
      </div>
    </section>
  );
}