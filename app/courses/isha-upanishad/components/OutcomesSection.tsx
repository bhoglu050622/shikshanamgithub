'use client';

export default function OutcomesSection() {
  const outcomes = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
      ),
      title: "Gain deep self-awareness of existence",
      hindiTitle: "अस्तित्व की गहरी आत्म-जागरूकता प्राप्त करें",
      description: "Understand your true nature and the essence of existence through the profound teachings of the Isha Upanishad"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
        </svg>
      ),
      title: "Experience inner peace, free of attachment",
      hindiTitle: "आसक्ति से मुक्त आंतरिक शांति का अनुभव करें",
      description: "Learn to live with detachment and find lasting peace through the wisdom of non-attachment"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: "Understand the relation between cosmos and individual",
      hindiTitle: "ब्रह्मांड और व्यक्ति के बीच के संबंध को समझें",
      description: "Discover the unity between the individual soul and the universal consciousness"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-saffron-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron-800 mb-4">
            आप किस योग्य होंगे
          </h2>
          <p className="text-lg text-saffron-700 max-w-2xl mx-auto">
            Transform your understanding of life and spirituality through this comprehensive course
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {outcomes.map((outcome, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-6 text-saffron-600">
                {outcome.icon}
              </div>
              <h3 className="text-xl font-semibold text-saffron-800 mb-3">
                {outcome.title}
              </h3>
              <p className="text-saffron-600 mb-4 font-medium">
                {outcome.hindiTitle}
              </p>
              <p className="text-saffron-700 leading-relaxed">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>

        {/* Why Study Upanishads Section */}
        <div className="bg-gradient-to-r from-saffron-100 to-saffron-200 rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-saffron-800 mb-4">
              Why Study the Upanishads?
            </h3>
            <p className="text-saffron-700 max-w-3xl mx-auto">
              The Upanishads are the crown jewels of Indian philosophy, offering profound insights into the nature of reality, consciousness, and the purpose of human existence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-saffron-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-1">Ancient Wisdom for Modern Life</h4>
                  <p className="text-saffron-700 text-sm">Apply timeless principles to contemporary challenges</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-saffron-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-1">Spiritual Growth</h4>
                  <p className="text-saffron-700 text-sm">Deepen your understanding of consciousness and existence</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-saffron-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-1">Inner Peace</h4>
                  <p className="text-saffron-700 text-sm">Find lasting tranquility through wisdom and understanding</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-saffron-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-1">Cultural Heritage</h4>
                  <p className="text-saffron-700 text-sm">Connect with the rich spiritual heritage of India</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-saffron-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-1">Practical Application</h4>
                  <p className="text-saffron-700 text-sm">Learn to apply spiritual principles in daily life</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-saffron-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-saffron-800 mb-1">Self-Realization</h4>
                  <p className="text-saffron-700 text-sm">Journey towards understanding your true self</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
