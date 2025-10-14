import { Metadata } from 'next';
import FoundersMission from '@/components/sections/FoundersMission';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'About Us - Shikshanam',
  description: 'Learn about Shikshanam\'s mission to preserve and share ancient Indian knowledge through modern technology.',
};

async function getAboutContent() {
  const isProduction = process.env.NODE_ENV === 'production';
  const draftPath = path.join(process.cwd(), 'data', 'about-content.json');
  const publishedPath = path.join(process.cwd(), 'data', 'about-content.published.json');
  
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
      <main className="main-container py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-6 text-center mx-auto">
              {content.hero.title}
            </h1>
            <p className="font-sans text-xl text-gray-600 max-w-3xl mx-auto text-center">
              {content.hero.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6 text-center">{content.mission.title}</h2>
              <p className="font-sans text-gray-600 mb-6 text-justify">
                {content.mission.paragraph1}
              </p>
              <p className="font-sans text-gray-600 mb-6 text-justify">
                {content.mission.paragraph2}
              </p>
              <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-6">
                <h3 className="font-sans text-lg font-bold text-gray-900 mb-3 text-center">{content.mission.visionTitle}</h3>
                <p className="font-sans text-gray-600 text-justify">
                  {content.mission.visionText}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6 text-center">{content.offerings.title}</h2>
              <div className="space-y-4">
                {content.offerings.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-saffron-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-saffron-600 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-gray-900">{item.title}</h3>
                      <p className="font-sans text-gray-600 text-sm text-justify">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-12 mx-auto">{content.values.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {content.values.items.map((item: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    {/* Icon can be made dynamic if needed */}
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-sans text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="font-sans text-gray-600 text-justify">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4 text-center mx-auto">{content.cta.title}</h2>
            <p className="font-sans text-gray-600 mb-6 max-w-2xl mx-auto text-center">
              {content.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {content.cta.buttons.map((button: any, index: number) => (
                <a
                  key={index}
                  href={button.link}
                  className={index === 0 
                    ? "bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    : "border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300"
                  }
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <FoundersMission />
    </>
  );
}
