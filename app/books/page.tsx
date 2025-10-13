'use client'

import { motion } from 'framer-motion'
import { BookOpen, Download, Star, ExternalLink, Sparkles, Award, Globe, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

const books = [
  {
    id: 'dhairya-english',
    title: 'Patience in Life',
    titleHindi: 'धैर्य',
    subtitle: 'A Spiritual Guide to Inner Strength',
    author: 'Sādhaka Jāmvant',
    language: 'English',
    price: 99,
    originalPrice: 250,
    format: 'Digital PDF (Instant Download)',
    description: 'Do you ever feel so drained by work, relationships, or social media that you\'ve lost your inner peace? Dhairya is not just a book, it\'s a spiritual guide that helps you build inner strength and navigate life through the confluence of Karma, Bhakti, and Jnana.',
    features: [
      'Inspired by Bhagavad Gita, Yoga Darshan, and Upanishads',
      'Practical guide to managing emotions',
      'Path to inner peace and stability',
      'Deep understanding of Indian philosophy'
    ],
    ideal: [
      'Walking the path of self-growth',
      'Struggling with inner restlessness',
      'Seeking deep understanding of Yoga and spirituality'
    ],
    link: 'https://hyperquest.graphy.com/courses/dhairya-book-by-sadhak-jamwant-in-eng-68764278bbe03868776cb39c',
    thumbnail: '/assets/dhairya-book-english.png',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'dhairya-hindi',
    title: 'धैर्य',
    titleEnglish: 'Patience in Life',
    subtitle: 'आंतरिक शक्ति के लिए एक आध्यात्मिक मार्गदर्शिका',
    author: 'साधक जामवंत',
    language: 'Hindi',
    price: 99,
    originalPrice: 250,
    format: 'Digital PDF (तत्काल डाउनलोड)',
    description: 'क्या आप कभी काम, रिश्तों या सोशल मीडिया से इतने थक जाते हैं कि अपनी आंतरिक शांति खो देते हैं? धैर्य सिर्फ एक किताब नहीं है, यह एक आध्यात्मिक मार्गदर्शिका है जो आपको आंतरिक शक्ति बनाने और कर्म, भक्ति और ज्ञान के संगम के माध्यम से जीवन को नेविगेट करने में मदद करती है।',
    features: [
      'भगवद गीता, योग दर्शन और उपनिषदों से प्रेरित',
      'भावनाओं को प्रबंधित करने के लिए व्यावहारिक गाइड',
      'आंतरिक शांति और स्थिरता का मार्ग',
      'भारतीय दर्शन की गहरी समझ'
    ],
    ideal: [
      'आत्म-विकास के मार्ग पर चलने वाले',
      'आंतरिक बेचैनी से जूझ रहे',
      'योग और अध्यात्म की गहरी समझ चाहने वाले'
    ],
    link: 'https://hyperquest.graphy.com/courses/dhairya-book-by-sadhak-jamwant-6876338f54a4ad37404f8404',
    thumbnail: '/assets/dhairya-book-hindi.png',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'science-spirituality-english',
    title: 'Science & Spirituality',
    titleHindi: 'विज्ञान तथा अध्यात्म',
    subtitle: 'Two Faces of the Ultimate Truth',
    author: 'Sādhaka Jāmvant',
    language: 'English',
    price: 150,
    originalPrice: 300,
    format: 'Digital PDF (Instant Download)',
    description: 'Are science and spirituality opposed to each other — or are they two faces of the same ultimate truth? This rare and insightful work weaves together the precision of modern science with the depth of Indian spiritual wisdom.',
    features: [
      'From gravity to the Gita',
      'From cosmic laws to the mysteries of the soul',
      'Blend of logic, spiritual practice, and inner experience',
      'Answers to fundamental questions of existence'
    ],
    ideal: [
      'Seekers asking "Who am I?"',
      'Understanding the connection between science and spirituality',
      'Exploring cosmic laws and consciousness'
    ],
    link: 'https://courses.shikshanam.in/courses/Science-Spiritual-Sadhak-Jamwant-Eng-68808e9f51c8630ad6deffde',
    thumbnail: '/assets/vigyan-adhyatma-book-english.png',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'science-spirituality-hindi',
    title: 'विज्ञान तथा अध्यात्म',
    titleEnglish: 'Science & Spirituality',
    subtitle: 'परम सत्य के दो चेहरे',
    author: 'साधक जामवंत',
    language: 'Hindi',
    price: 150,
    originalPrice: 300,
    format: 'Digital PDF (तत्काल डाउनलोड)',
    description: 'क्या विज्ञान और अध्यात्म एक दूसरे के विरोधी हैं — या वे एक ही परम सत्य के दो चेहरे हैं? यह दुर्लभ और अंतर्दृष्टिपूर्ण कार्य आधुनिक विज्ञान की सटीकता को भारतीय आध्यात्मिक ज्ञान की गहराई के साथ जोड़ता है।',
    features: [
      'गुरुत्वाकर्षण से गीता तक',
      'ब्रह्मांडीय नियमों से आत्मा के रहस्यों तक',
      'तर्क, आध्यात्मिक अभ्यास और आंतरिक अनुभव का मिश्रण',
      'अस्तित्व के मौलिक प्रश्नों के उत्तर'
    ],
    ideal: [
      'साधक जो पूछते हैं "मैं कौन हूं?"',
      'विज्ञान और अध्यात्म के बीच संबंध समझना',
      'ब्रह्मांडीय नियमों और चेतना की खोज'
    ],
    link: '[PLACEHOLDER_HINDI_SCIENCE_SPIRITUALITY]',
    thumbnail: '/assets/vigyan-adhyatma-book-hindi.png',
    color: 'from-indigo-500 to-purple-500',
    comingSoon: true
  }
]

export default function BooksPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-deep-teal-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-deep-teal-200/20 via-indigo-200/15 to-saffron-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <StaggerContainer className="text-center">
            <StaggerItem>
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4 text-saffron-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <BookOpen className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-high-contrast mb-8 leading-tight">
                Books by{' '}
                <span className="bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 bg-clip-text text-transparent">
                  Acharya Jamwant Ji
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-lg sm:text-xl text-medium-contrast mb-8 max-w-4xl mx-auto leading-relaxed">
                Discover profound wisdom through the written works of Acharya Jamwant Ji. 
                Each book blends ancient spiritual teachings with modern understanding, 
                offering practical guidance for contemporary life.
              </p>
            </StaggerItem>

            {/* Stats */}
            <StaggerItem>
              <div className="flex justify-center">
                <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
                  <div className="flex items-center space-x-3 text-medium-contrast">
                    <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-high-contrast">4 Books</div>
                      <div className="text-sm text-wisdom-500">Available</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-medium-contrast">
                    <div className="w-10 h-10 bg-gradient-to-br from-deep-teal-500 to-deep-teal-600 rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-high-contrast">Instant</div>
                      <div className="text-sm text-wisdom-500">Download</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-medium-contrast">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-high-contrast">2 Languages</div>
                      <div className="text-sm text-wisdom-500">Hindi & English</div>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card-premium p-0 h-full relative overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
                  {/* Book Cover Image */}
                  {book.thumbnail && (
                    <div className="relative w-full h-80 overflow-hidden">
                      <img
                        src={book.thumbnail}
                        alt={book.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      {/* Language Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-white/90 backdrop-blur-sm text-wisdom-700 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          {book.language}
                        </span>
                      </div>

                      {/* Coming Soon Badge */}
                      {book.comingSoon && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium shadow-md">
                            Coming Soon
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Book Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    {/* Book Header */}
                    <div className="mb-6">
                      
                      <h3 className="text-2xl font-display text-indigo-700 mb-2">
                        {book.title}
                      </h3>
                      
                      {(book.titleHindi || book.titleEnglish) && (
                        <p className="text-lg text-saffron-600 mb-2">
                          {book.titleHindi || book.titleEnglish}
                        </p>
                      )}
                      
                      <p className="text-wisdom-600 mb-3">
                        {book.subtitle}
                      </p>
                      
                      <p className="text-sm text-wisdom-500">
                        by {book.author}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-wisdom-700 mb-6 leading-relaxed">
                      {book.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-indigo-700 mb-3">What's Inside:</h4>
                      <ul className="space-y-2">
                        {book.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-wisdom-600">
                            <Star className="w-4 h-4 text-saffron-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal For */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-indigo-700 mb-3">Ideal For:</h4>
                      <ul className="space-y-2">
                        {book.ideal.map((item, idx) => (
                          <li key={idx} className="flex items-start text-sm text-wisdom-600">
                            <Heart className="w-4 h-4 text-deep-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6 p-4 bg-gradient-to-br from-saffron-50 to-amber-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="text-2xl font-bold text-indigo-700">₹{book.price}</div>
                          <div className="text-sm text-wisdom-400 line-through">₹{book.originalPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">
                            Save ₹{book.originalPrice - book.price}
                          </div>
                          <div className="text-xs text-wisdom-500">{book.format}</div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Button
                        variant={book.comingSoon ? 'outline' : 'primary'}
                        fullWidth
                        size="lg"
                        href={book.comingSoon ? undefined : book.link}
                        external={!book.comingSoon}
                        disabled={book.comingSoon}
                        icon={!book.comingSoon && <ExternalLink className="w-5 h-5" />}
                        iconPosition="right"
                      >
                        {book.comingSoon ? 'Notify Me When Available' : 'Get This Book'}
                      </Button>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Read Section */}
      <section className="section-padding bg-gradient-to-br from-white/50 to-saffron-50/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="card-premium p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-saffron-500 to-deep-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-display text-indigo-700 mb-6">
                Why Read These Books?
              </h2>
              
              <p className="text-wisdom-600 mb-8 leading-relaxed">
                Acharya Jamwant Ji's books offer a unique blend of ancient wisdom and modern insight. 
                Whether you're seeking inner peace, understanding the connection between science and spirituality, 
                or looking for practical guidance in life, these books provide profound answers rooted in 
                timeless Indian philosophy.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-indigo-700 mb-2">Deep Wisdom</h3>
                  <p className="text-sm text-wisdom-600">Rooted in ancient texts and traditions</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-deep-teal-500 to-deep-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-indigo-700 mb-2">Practical Guidance</h3>
                  <p className="text-sm text-wisdom-600">Applied to modern life challenges</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-indigo-700 mb-2">Transformative</h3>
                  <p className="text-sm text-wisdom-600">Life-changing insights and practices</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

