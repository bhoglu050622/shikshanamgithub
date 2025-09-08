'use client';

import { useState } from 'react';

export default function SyllabusSection() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

  const chapters = [
    {
      number: 1,
      title: "ईशावास्य उपनिषद् का परिचय",
      englishTitle: "Introduction to Isha Upanishad",
      duration: "15 min",
      hasDemo: true,
      description: "Understanding the essence and significance of Isha Upanishad in spiritual literature"
    },
    {
      number: 2,
      title: "पहला श्लोक - ईशावास्यमिदं सर्वं",
      englishTitle: "First Shloka - Everything is pervaded by the Lord",
      duration: "12 min",
      hasDemo: true,
      description: "Deep dive into the opening verse that sets the foundation of the entire Upanishad"
    },
    {
      number: 3,
      title: "दूसरा श्लोक - कुर्वन्नेवेह कर्माणि",
      englishTitle: "Second Shloka - Performing actions while renouncing attachment",
      duration: "14 min",
      hasDemo: false,
      description: "Understanding the path of Karma Yoga and detached action"
    },
    {
      number: 4,
      title: "तीसरा श्लोक - असुर्या नाम ते लोकाः",
      englishTitle: "Third Shloka - The worlds of the Asuras",
      duration: "11 min",
      hasDemo: false,
      description: "Exploring the consequences of ignorance and material attachment"
    },
    {
      number: 5,
      title: "चौथा श्लोक - अनेजदेकं मनसो जवीयः",
      englishTitle: "Fourth Shloka - The unmoving One, swifter than the mind",
      duration: "13 min",
      hasDemo: false,
      description: "Understanding the nature of the Supreme Reality"
    },
    {
      number: 6,
      title: "पांचवां श्लोक - तदेजति तन्नैजति",
      englishTitle: "Fifth Shloka - It moves and it moves not",
      duration: "12 min",
      hasDemo: false,
      description: "The paradox of the Absolute - both static and dynamic"
    },
    {
      number: 7,
      title: "छठा श्लोक - तद्दूरे तद्वन्तिके",
      englishTitle: "Sixth Shloka - It is far and it is near",
      duration: "10 min",
      hasDemo: false,
      description: "The omnipresence of the Divine Reality"
    },
    {
      number: 8,
      title: "सातवां श्लोक - तदन्तरस्य सर्वस्य",
      englishTitle: "Seventh Shloka - It is within all and outside all",
      duration: "11 min",
      hasDemo: false,
      description: "The immanent and transcendent nature of the Absolute"
    },
    {
      number: 9,
      title: "आठवां श्लोक - यस्तु सर्वाणि भूतानि",
      englishTitle: "Eighth Shloka - He who sees all beings in the Self",
      duration: "13 min",
      hasDemo: false,
      description: "The vision of unity in diversity"
    },
    {
      number: 10,
      title: "नौवां श्लोक - अंधं तमः प्रविशन्ति",
      englishTitle: "Ninth Shloka - Into blind darkness enter those",
      duration: "12 min",
      hasDemo: false,
      description: "The consequences of ignorance and false knowledge"
    },
    {
      number: 11,
      title: "दसवां श्लोक - अंधं तमः प्रविशन्ति",
      englishTitle: "Tenth Shloka - Into greater darkness enter those",
      duration: "11 min",
      hasDemo: false,
      description: "The deeper levels of ignorance and delusion"
    },
    {
      number: 12,
      title: "ग्यारहवां श्लोक - अंधं तमः प्रविशन्ति",
      englishTitle: "Eleventh Shloka - Into blind darkness enter those",
      duration: "10 min",
      hasDemo: false,
      description: "The cycle of ignorance and its consequences"
    },
    {
      number: 13,
      title: "बारहवां श्लोक - अंधं तमः प्रविशन्ति",
      englishTitle: "Twelfth Shloka - Into greater darkness enter those",
      duration: "12 min",
      hasDemo: false,
      description: "The deepening spiral of ignorance"
    },
    {
      number: 14,
      title: "तेरहवां श्लोक - अंधं तमः प्रविशन्ति",
      englishTitle: "Thirteenth Shloka - Into blind darkness enter those",
      duration: "11 min",
      hasDemo: false,
      description: "The persistence of ignorance in human consciousness"
    },
    {
      number: 15,
      title: "चौदहवां श्लोक - अंधं तमः प्रविशन्ति",
      englishTitle: "Fourteenth Shloka - Into greater darkness enter those",
      duration: "10 min",
      hasDemo: false,
      description: "The final stages of ignorance and delusion"
    },
    {
      number: 16,
      title: "पंद्रहवां श्लोक - हिरण्मयेन पात्रेण",
      englishTitle: "Fifteenth Shloka - With the golden vessel covered",
      duration: "13 min",
      hasDemo: false,
      description: "The metaphor of the golden vessel and the path to liberation"
    },
    {
      number: 17,
      title: "सोलहवां श्लोक - पूषन्नेकर्षे यम सूर्य",
      englishTitle: "Sixteenth Shloka - O Sun, sole traveler of the heavens",
      duration: "12 min",
      hasDemo: false,
      description: "The prayer to the Sun as the symbol of divine consciousness"
    },
    {
      number: 18,
      title: "अठारहवां श्लोक - अग्ने नय सुपथा राये",
      englishTitle: "Eighteenth Shloka - O Fire, lead us by the good path",
      duration: "15 min",
      hasDemo: false,
      description: "The final prayer for guidance and the conclusion of the Upanishad"
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
            Course Syllabus — Step-by-Step Journey
          </h2>
          <p className="text-lg text-saffron-700 max-w-2xl mx-auto">
            A comprehensive exploration of all 18 shlokas of the Isha Upanishad
          </p>
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
                        <h3 className="text-lg font-semibold text-saffron-800 mb-1">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-saffron-600 mb-2">
                          {chapter.englishTitle}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-saffron-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                            </svg>
                            {chapter.duration}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <svg 
                          className={`w-5 h-5 text-saffron-500 transition-transform duration-200 ${
                            expandedChapter === chapter.number ? 'rotate-180' : ''
                          }`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  {expandedChapter === chapter.number && (
                    <div className="px-6 pb-6 border-t border-saffron-100">
                      <p className="text-saffron-700 mt-4">
                        {chapter.description}
                      </p>
                    </div>
                  )}
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
            Total Duration: 3+ Hours • 18 Comprehensive Chapters • Lifetime Access
          </p>
        </div>
      </div>
    </section>
  );
}