import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

export const metadata: Metadata = {
  title: 'Contact Us - Shikshanam',
  description: 'Get in touch with the Shikshanam team. We\'re here to help with your Sanskrit learning journey.',
}

async function getContactContent() {
  const isProduction = process.env.NODE_ENV === 'production';
  const draftPath = path.join(process.cwd(), 'data', 'contact-content.json');
  const publishedPath = path.join(process.cwd(), 'data', 'contact-content.published.json');
  
  let contentPath = isProduction ? publishedPath : draftPath;

  // Fallback to draft if published doesn't exist in production
  if (isProduction && !fs.existsSync(publishedPath)) {
    contentPath = draftPath;
  }

  try {
    if (fs.existsSync(contentPath)) {
      const fileContent = fs.readFileSync(contentPath, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error reading contact content:', error);
  }
  return null;
}

export default async function ContactPage() {
  const content = await getContactContent();
  
  return (
    <>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Floating Mandala Elements */}
        <div className="absolute top-20 left-10 opacity-5 animate-pulse">
          <div className="w-32 h-32 border-2 border-saffron-400/30 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 border border-saffron-400/40 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 border border-saffron-400/50 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-40 right-20 opacity-5 animate-pulse delay-1000">
          <div className="w-24 h-24 border-2 border-peacock-green-400/30 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 border border-peacock-green-400/40 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-peacock-green-400/50 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-40 left-1/4 opacity-5 animate-pulse delay-2000">
          <div className="w-28 h-28 border-2 border-saffron-400/30 rounded-full flex items-center justify-center">
            <div className="w-18 h-18 border border-saffron-400/40 rounded-full"></div>
          </div>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-r from-saffron-200/10 to-peacock-green-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-peacock-green-200/10 to-saffron-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <main className="main-container py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-3xl mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-saffron-600 to-gray-900 bg-clip-text text-transparent mb-6 animate-fade-in">
              {content?.content?.pageInfo?.title || content?.title || 'Get in Touch!'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {content?.content?.pageInfo?.content || content?.content?.pageInfo?.description || 'Have a question or want to share your thoughts? Fill out the form, and we\'ll get back to you as soon as possible!'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Enhanced Form Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-saffron-50/50 to-peacock-green-50/50 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  Have Questions/Feedback?
                </h2>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-saffron-600 transition-colors">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                        required
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-saffron-600 transition-colors">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-saffron-600 transition-colors">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                      required
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-saffron-600 transition-colors">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="course">Course Related</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-saffron-600 transition-colors">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-saffron-500/20 focus:border-saffron-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-saffron-600 via-saffron-500 to-saffron-600 hover:from-saffron-700 hover:via-saffron-600 hover:to-saffron-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-saffron-500/25 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>

            {/* Enhanced Contact Information Section */}
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-peacock-green-50/50 to-saffron-50/50 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-peacock-green-500 to-peacock-green-600 rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    Contact Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 group">
                      <div className="w-14 h-14 bg-gradient-to-br from-saffron-100 to-saffron-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <svg className="w-7 h-7 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                        <p className="text-gray-600 text-lg">{content?.contactInfo?.email || 'support@shikshanam.in'}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="w-14 h-14 bg-gradient-to-br from-peacock-green-100 to-peacock-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <svg className="w-7 h-7 text-peacock-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Phone</h3>
                        <p className="text-gray-600 text-lg">{content?.contactInfo?.phone || '+91-9910032165'}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="w-14 h-14 bg-gradient-to-br from-saffron-100 to-saffron-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <svg className="w-7 h-7 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Location</h3>
                        <p className="text-gray-600 text-lg">{content?.contactInfo?.address || 'Delhi'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Help Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-saffron-100/50 to-peacock-green-100/50 rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-saffron-50/80 to-peacock-green-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-2xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Quick Help</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    For immediate assistance, check our Help Center for common questions and solutions.
                  </p>
                  <a
                    href="/help"
                    className="inline-flex items-center bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Visit Help Center
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
