'use client';

export default function WhyCourseSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-parchment-ivory to-saffron-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron-800 mb-6">
            Questions you may have
          </h2>
        </div>

        {/* Questions Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-saffron-100 hover:border-saffron-300">
            <h3 className="text-xl md:text-2xl font-bold text-saffron-900 mb-2">
              कर्म, ज्ञान और भक्ति में कौन सर्वोत्तम?
            </h3>
          </div>

          <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-saffron-100 hover:border-saffron-300">
            <h3 className="text-xl md:text-2xl font-bold text-saffron-900 mb-2">
              सगुण भक्ति करें या निर्गुण?
            </h3>
          </div>

          <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-saffron-100 hover:border-saffron-300">
            <h3 className="text-xl md:text-2xl font-bold text-saffron-900 mb-2">
              आत्मा कैसी है और कहाँ रहती है?
            </h3>
          </div>

          <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-2 border-saffron-100 hover:border-saffron-300">
            <h3 className="text-xl md:text-2xl font-bold text-saffron-900 mb-2">
              मृत्यु के उपरांत क्या होगा?
            </h3>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-saffron-100 to-saffron-200 rounded-lg p-8 mb-8 border-2 border-saffron-300">
          <h3 className="text-2xl md:text-3xl font-bold text-saffron-900 mb-4">
            तो आज ही जुड़ें ईशावास्य उपनिषद् से!
          </h3>
          <p className="text-lg text-saffron-800 font-semibold">
            Transform your life through the wisdom of all 18 Shlokas
          </p>
        </div>

        {/* Stats Section */}
        <div className="text-center bg-gradient-to-br from-saffron-50 to-saffron-100 rounded-lg p-8 shadow-md border-2 border-saffron-200">
          <h3 className="text-xl md:text-2xl font-bold text-saffron-900 mb-6">
            हज़ारों छात्रों, गृहणियों, जिज्ञासुओं ने अपनाया शिक्षणम् को!
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-4xl font-bold text-saffron-700 mb-2">1000+</div>
              <div className="text-saffron-900 font-semibold">Students</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-4xl font-bold text-saffron-700 mb-2">4.8</div>
              <div className="text-saffron-900 font-semibold">Rating</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-4xl font-bold text-saffron-700 mb-2">500+</div>
              <div className="text-saffron-900 font-semibold">Positive Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
