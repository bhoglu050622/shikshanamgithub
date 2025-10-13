'use client';

export default function GuruSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron-800 mb-4">
            Meet Your Guru
          </h2>
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
              विशाल चौरसिया (Vishal Chaurasia)
            </h3>
            <p className="text-lg text-saffron-600 mb-2">
              Founder of Shikshanam / Hyper Quest
            </p>
            <p className="text-saffron-700 mb-6">
              Graduate, IIT Patna
            </p>
          </div>

          {/* Guru Details */}
          <div className="space-y-6">
            {/* Bio */}
            <div className="bg-gradient-to-r from-saffron-50 to-saffron-100 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-saffron-800 mb-3">
                Bio
              </h4>
              <p className="text-saffron-700 leading-relaxed mb-3">
                Worked in a PSU 2016–2023, but had affinity for ancient wisdom.
              </p>
              <p className="text-saffron-700 leading-relaxed mb-3">
                Founded Hyper Quest YouTube / educational initiative to bring dharmic, philosophical content to wide audience.
              </p>
              <p className="text-saffron-700 leading-relaxed">
                Aims to make philosophy + spirituality accessible and modern.
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

            {/* Images Section */}
            <div className="bg-white border border-saffron-200 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-saffron-800 mb-4 text-center">
                Images
              </h4>
              <div className="space-y-3 text-center text-saffron-700">
                <p>• Portrait of Vishal Chaurasia</p>
                <p>• Vishal with Shri Shri Ravi Shankar Gurudev</p>
              </div>
            </div>

            {/* Featured In */}
            <div className="bg-white border-2 border-saffron-300 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-saffron-900 mb-4 text-center">
                Featured in
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-saffron-50 to-saffron-100 p-4 rounded-lg flex items-center justify-center border border-saffron-200">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-saffron-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-xs font-semibold text-saffron-800">YouTube</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-saffron-50 to-saffron-100 p-4 rounded-lg flex items-center justify-center border border-saffron-200">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-saffron-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                    </svg>
                    <p className="text-xs font-semibold text-saffron-800">Media</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-saffron-50 to-saffron-100 p-4 rounded-lg flex items-center justify-center border border-saffron-200">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-saffron-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-xs font-semibold text-saffron-800">Recognition</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-saffron-50 to-saffron-100 p-4 rounded-lg flex items-center justify-center border border-saffron-200">
                  <div className="text-center">
                    <svg className="w-8 h-8 text-saffron-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <p className="text-xs font-semibold text-saffron-800">Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
