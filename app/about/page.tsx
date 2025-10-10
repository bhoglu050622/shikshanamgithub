import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'About Us - Shikshanam',
  description: 'Welcome to Shikshanam – your doorway to the ancient wisdom of Indian philosophies. Meet our team, learn about our mission, and discover how we make profound knowledge accessible to everyone.',
  keywords: 'Shikshanam, about us, Indian philosophy, Sanskrit, Yoga, Vedanta, ancient wisdom, Vishal Chaurasia, team, mission, vision',
  openGraph: {
    title: 'About Us - Shikshanam',
    description: 'Welcome to Shikshanam – your doorway to the ancient wisdom of Indian philosophies. Meet our team, learn about our mission, and discover how we make profound knowledge accessible to everyone.',
    type: 'website',
  },
};

async function getAboutContent() {
  const contentPath = path.join(process.cwd(), 'data', 'about-content.json');

  try {
    if (fs.existsSync(contentPath)) {
      const fileContent = fs.readFileSync(contentPath, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error reading about content:', error);
  }
  return null;
}

export default async function AboutPage() {
  const content = await getAboutContent();

  if (!content) {
    return (
      <main className="main-container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Content Not Found</h1>
          <p className="text-xl text-gray-600">The content for the about page could not be loaded.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="main-container py-16 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl text-saffron-100 opacity-20 transform rotate-12">
            {content.indianAesthetic?.decorativeElements?.om || "🕉️"}
          </div>
          <div className="absolute top-40 right-20 text-4xl text-peacock-green-100 opacity-20 transform -rotate-12">
            {content.indianAesthetic?.decorativeElements?.lotus || "🪷"}
          </div>
          <div className="absolute bottom-40 left-20 text-5xl text-saffron-100 opacity-20 transform rotate-45">
            {content.indianAesthetic?.decorativeElements?.chakra || "☸️"}
          </div>
          <div className="absolute bottom-20 right-10 text-4xl text-peacock-green-100 opacity-20 transform -rotate-45">
            {content.indianAesthetic?.decorativeElements?.swastika || "卐"}
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Hero Section with Indian Aesthetic */}
          <div className="text-center mb-20">
            {/* Sanskrit Title */}
            <div className="mb-6">
              <h1 className="text-6xl md:text-7xl font-bold text-saffron-600 mb-4 font-serif">
                {content.indianAesthetic?.sanskritTitle || "शिक्षणम्"}
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-saffron-500 to-peacock-green-500 mx-auto rounded-full"></div>
            </div>
            
            {/* English Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {content.hero?.title || "About Us"}
            </h2>
            
            {/* Sanskrit Subtitle */}
            <h3 className="text-2xl md:text-3xl font-semibold text-peacock-green-600 mb-6 font-serif">
              {content.indianAesthetic?.sanskritSubtitle || "प्राचीन भारतीय ज्ञान की ओर एक यात्रा"}
            </h3>
            
            {/* Description */}
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              {content.indianAesthetic?.sanskritDescription || content.hero?.description || "Welcome to Shikshanam – your doorway to the ancient wisdom of Indian philosophies, guided by a team fueled by curiosity and passion."}
            </p>

            {/* Decorative Border */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-0.5 bg-saffron-400"></div>
              <div className="mx-4 text-2xl text-saffron-500">🕉️</div>
              <div className="w-16 h-0.5 bg-saffron-400"></div>
            </div>
          </div>

          {/* Founder Invitation Section with Indian Design */}
          {content.founder && (
            <div className="bg-gradient-to-br from-saffron-50 via-white to-peacock-green-50 rounded-3xl p-8 mb-20 border-2 border-saffron-200 shadow-2xl relative overflow-hidden">
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-saffron-100 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-peacock-green-100 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
              
              <div className="text-center mb-8 relative z-10">
                <div className="inline-flex items-center bg-saffron-100 text-saffron-800 text-sm font-medium px-4 py-2 rounded-full mb-4 border border-saffron-200">
                  <span className="text-lg mr-2">👨‍🏫</span>
                  Founder's Invitation
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.founder.title}</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                  {content.founder.subtitle}
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow me on:</h3>
                  <div className="flex gap-8 justify-center">
                    <a 
                      href={content.founder.socialLinks?.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center group"
                    >
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-200 transition-all duration-300 group-hover:scale-110 shadow-lg">
                        <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{content.founder.socialStats?.youtube}</span>
                    </a>
                    <a 
                      href={content.founder.socialLinks?.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center group"
                    >
                      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-pink-200 transition-all duration-300 group-hover:scale-110 shadow-lg">
                        <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.721v8.562h8.558V7.707z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{content.founder.socialStats?.instagram}</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <a 
                  href="/contact" 
                  className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl inline-block text-lg"
                >
                  {content.founder.ctaText}
                </a>
              </div>
            </div>
          )}

          {/* Mission Section with Indian Design */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-saffron-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-peacock-green-200 rounded-full opacity-50"></div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">
                {content.mission?.title || "Our Mission"}
              </h2>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {content.mission?.paragraph1 || "Shikshanam was born from a deep reverence for India's ancient knowledge systems."}
              </p>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                {content.mission?.paragraph2 || "Our mission is to make this profound knowledge accessible to everyone."}
              </p>
              <div className="bg-gradient-to-br from-saffron-50 to-peacock-green-50 rounded-2xl p-6 border-2 border-saffron-200 shadow-lg relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-20">🕉️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">{content.mission?.visionTitle || "Our Vision"}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {content.mission?.visionText || "To create a global community of learners who embrace ancient wisdom for modern living."}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-3xl opacity-10">📚</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">{content.offerings?.title || "What We Offer"}</h2>
              <div className="space-y-6">
                {content.offerings?.items?.map((item: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-saffron-400 to-peacock-green-400 rounded-full flex items-center justify-center mt-1 flex-shrink-0 shadow-md">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Section with Indian Aesthetic */}
          {content.team && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-peacock-green-100 text-peacock-green-800 text-sm font-medium px-4 py-2 rounded-full mb-4 border border-peacock-green-200">
                  <span className="text-lg mr-2">👥</span>
                  Our Team
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{content.team.title}</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  {content.team.description}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {content.team.members?.map((member: any, index: number) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-2xl opacity-10">
                      {index === 0 ? "👨‍🏫" : index === 1 ? "🎓" : "💻"}
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-saffron-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Values Section with Indian Aesthetic */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-peacock-green-100 text-peacock-green-800 text-sm font-medium px-4 py-2 rounded-full mb-4 border border-peacock-green-200">
                <span className="text-lg mr-2">💎</span>
                Our Values
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{content.values?.title || "Our Values"}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.values?.items?.map((item: any, index: number) => (
                <div key={index} className="text-center relative">
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-saffron-200 rounded-full opacity-50"></div>
                  <div className="w-20 h-20 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section with Indian Design */}
          {content.contact && (
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 mb-20 border-2 border-gray-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 text-4xl opacity-10">📞</div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center bg-saffron-100 text-saffron-800 text-sm font-medium px-4 py-2 rounded-full mb-4 border border-saffron-200">
                  <span className="text-lg mr-2">📍</span>
                  Contact Information
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">{content.contact.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron-400 to-peacock-green-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Headquarters</h3>
                  <p className="text-gray-600">{content.contact.headquarters}</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron-400 to-peacock-green-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a href={`tel:${content.contact.phone}`} className="text-saffron-600 hover:text-saffron-700 font-medium">
                    {content.contact.phone}
                  </a>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron-400 to-peacock-green-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href={`mailto:${content.contact.email}`} className="text-saffron-600 hover:text-saffron-700 font-medium">
                    {content.contact.email}
                  </a>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron-400 to-peacock-green-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                  <p className="text-gray-600">{content.contact.hours}</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <a 
                  href={`tel:${content.contact.phone}`}
                  className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl inline-block text-lg"
                >
                  {content.contact.ctaText}
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

    </>
  );
}
