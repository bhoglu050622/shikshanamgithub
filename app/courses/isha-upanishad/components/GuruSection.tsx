'use client';

export default function GuruSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron-800 mb-4">
            Meet Your Guru — विशाल चौरसिया
          </h2>
          <p className="text-lg text-saffron-700 max-w-2xl mx-auto">
            Learn from a passionate educator dedicated to making ancient wisdom accessible
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Guru Image and Basic Info */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block mb-6">
              <div className="w-64 h-64 mx-auto lg:mx-0 bg-gradient-to-br from-saffron-200 to-saffron-300 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-60 h-60 bg-saffron-100 rounded-full flex items-center justify-center">
                  <svg className="w-24 h-24 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-saffron-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-saffron-800 mb-2">
              विशाल चौरसिया
            </h3>
            <p className="text-lg text-saffron-600 mb-4">
              Founder, Shikshanam & Hyper Quest
            </p>
            <p className="text-saffron-700 mb-6">
              Graduate, IIT Patna
            </p>
          </div>

          {/* Guru Details */}
          <div className="space-y-6">
            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-saffron-50 to-saffron-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-saffron-800 mb-3">
                Mission & Vision
              </h4>
              <p className="text-saffron-700 leading-relaxed">
                "My vision is to blend ancient wisdom with modern relevance, making the profound teachings 
                of our scriptures accessible to everyone. Through Shikshanam, I aim to bridge the gap 
                between traditional knowledge and contemporary understanding."
              </p>
            </div>

            {/* Credentials */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-saffron-200 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.482 0l5.58-2.39c.307.132.624.256.93.37l-7 3a3 3 0 01-2.482 0z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-saffron-800">IIT Patna Graduate</span>
                </div>
                <p className="text-sm text-saffron-600">
                  Engineering background with deep spiritual understanding
                </p>
              </div>

              <div className="bg-white border border-saffron-200 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-saffron-800">Spiritual Educator</span>
                </div>
                <p className="text-sm text-saffron-600">
                  Years of experience in teaching ancient scriptures
                </p>
              </div>

              <div className="bg-white border border-saffron-200 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-saffron-800">Community Leader</span>
                </div>
                <p className="text-sm text-saffron-600">
                  Building a community of spiritual seekers
                </p>
              </div>

              <div className="bg-white border border-saffron-200 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-saffron-800">Content Creator</span>
                </div>
                <p className="text-sm text-saffron-600">
                  Creating accessible spiritual content for modern learners
                </p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-saffron-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-saffron-800 mb-4">
                Trusted by Thousands
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-saffron-600">10K+</div>
                  <div className="text-sm text-saffron-700">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-saffron-600">50+</div>
                  <div className="text-sm text-saffron-700">Courses</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-saffron-600">4.9★</div>
                  <div className="text-sm text-saffron-700">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
