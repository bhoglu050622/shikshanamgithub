'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const syllabusData = [
  {
    id: 'module-1',
    title: 'संस्कृत वर्णमाला और शब्दों के प्रभेद',
    englishTitle: 'Sanskrit Alphabet and Word Classifications (Free Demo Video)',
    duration: '2 Hrs',
    lessons: 5,
    topics: [
      'आपको संस्कृत क्यों सीखनी चाहिए? (Why you should learn Sanskrit?)',
      'संस्कृत वर्णमाला और सही उच्चारण (Sanskrit alphabet and correct pronunciation)',
      'शब्दों के प्रकार (Types of words)',
      'शब्दों का लिंग निर्धारण (Gender determination of words)',
      'सर्वनाम और क्रियावाचक पद (Pronouns and verb forms)'
    ]
  },
  {
    id: 'module-2',
    title: 'विभक्ति, लिंग और वचन',
    englishTitle: 'Vibhakti, Gender and Number',
    duration: '2 Hrs',
    lessons: 4,
    topics: [
      'विभक्तियाँ और उनके अर्थ (Vibhaktis and their meanings)',
      'विभक्ति रूप - पुल्लिङ्ग (Vibhakti forms - Masculine)',
      'विभक्ति रूप - स्त्रीलिङ्ग (Vibhakti forms - Feminine)',
      'विभक्ति रूप - नपुंसकलिङ्ग (Vibhakti forms - Neuter)'
    ]
  },
  {
    id: 'module-3',
    title: 'क्रिया पद और लकार',
    englishTitle: 'Verb Forms and Lakaras',
    duration: '2 Hrs',
    lessons: 4,
    topics: [
      'लकार (Lakaras)',
      'आत्मनेपदि और परस्मैपदि धातु (Atmanepadi and Parasmaipadi Dhatus)',
      'दस लकारों का प्रयोग (Usage of ten Lakaras)',
      'धातु रूप अभ्यास (Dhatu form practice)'
    ]
  },
  {
    id: 'module-4',
    title: 'विशेषण, विशेष्य और अव्यय पद',
    englishTitle: 'Adjectives, Nouns and Indeclinables',
    duration: '2 Hrs',
    lessons: 3,
    topics: [
      'अव्यय के प्रकार (Types of indeclinables)',
      'विशेषणवाचक/विशेष्यवाचक पद (Adjectives and nouns)',
      'संयुक्त अव्यय (Compound indeclinables)'
    ]
  },
  {
    id: 'module-5',
    title: 'कृत प्रत्ययान्त पद/अव्यय',
    englishTitle: 'Krit Pratyaya Words and Indeclinables',
    duration: '2 Hrs',
    lessons: 2,
    topics: [
      'कृत प्रत्ययान्त अव्यय/शब्द (Krit pratyaya indeclinables/words)',
      'लङ् लकार और क्तवतु प्रत्ययान्त पद (Lang lakara and Ktavatu pratyaya words)'
    ]
  },
  {
    id: 'module-6',
    title: 'उपसर्ग और प्रश्नवाचक वाक्य',
    englishTitle: 'Prefixes and Interrogative Sentences',
    duration: '2 Hrs',
    lessons: 2,
    topics: [
      'उपसर्ग (Prefixes)',
      'णिजन्त धातु (Nijanta Dhatu)',
      'प्रश्नवाचक वाक्य (Interrogative sentences)'
    ]
  },
  {
    id: 'module-7',
    title: 'संधि और समास',
    englishTitle: 'Sandhi and Samasa',
    duration: '2 Hrs',
    lessons: 4,
    topics: [
      'अच् संधि (स्वर संधि) (Vowel sandhi)',
      'हल् संधि (Consonant sandhi)',
      'समास (भाग-1) (Samasa Part-1)',
      'समास (भाग-2) (Samasa Part-2)'
    ]
  },
  {
    id: 'module-8',
    title: 'संस्कृत संभाषण',
    englishTitle: 'Sanskrit Conversation',
    duration: '2 Hrs',
    lessons: 8,
    topics: [
      'संभाषण भाग 1 (Conversation Part 1)',
      'संभाषण भाग 2 (Conversation Part 2)',
      'संभाषण भाग 3 (Conversation Part 3)',
      'गद्य अभ्यास (Prose practice)',
      'श्लोक अभ्यास (Shloka practice)',
      'Doubt Clearing Session #1',
      'Doubt Clearing Session #2',
      'Doubt Clearing Session #3'
    ]
  }
]

export default function SyllabusAccordion() {
  const [openModule, setOpenModule] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 id="syllabus-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-devanagari">
          Syllabus
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          30 Sessions · 17+ Hours · 8 Modules
        </p>
      </div>

      {/* Modules */}
      <div className="max-w-4xl mx-auto space-y-4">
        {syllabusData.map((module, index) => (
          <div 
            key={module.id}
            className="bg-white dark:bg-wisdom-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => setOpenModule(openModule === module.id ? null : module.id)}
              className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-wisdom-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-saffron-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-devanagari">
                      {module.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">
                    {module.englishTitle}
                  </p>
                  <div className="flex items-center gap-4 mt-2 ml-11 text-xs text-gray-500">
                    <span>{module.lessons} Videos</span>
                    <span>•</span>
                    <span>{module.duration}</span>
                  </div>
                </div>
                {openModule === module.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </div>
            </button>

            {openModule === module.id && (
              <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Topics:
                </p>
                <ul className="space-y-2">
                  {module.topics.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-saffron-500 mt-1">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
