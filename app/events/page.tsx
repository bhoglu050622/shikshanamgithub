import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Events & Workshops - Shikshanam',
  description: 'Join our live sessions and interactive workshops to deepen your understanding of ancient Indian wisdom.',
};

async function getEventsContent() {
  const isProduction = process.env.NODE_ENV === 'production';
  const draftPath = path.join(process.cwd(), 'data', 'events-content.json');
  const publishedPath = path.join(process.cwd(), 'data', 'events-content.published.json');
  
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
    console.error('Error reading events content:', error);
  }
  return null;
}

export default async function EventsPage() {
  const content = await getEventsContent();

  if (!content) {
    return (
      <main className="main-container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Events Not Found</h1>
          <p className="text-xl text-gray-600">The events content could not be loaded.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main-container py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {content?.hero?.title || 'Events & Workshops'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content?.hero?.subtitle || 'Join our live sessions and interactive workshops to deepen your understanding of ancient Indian wisdom.'}
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {content?.events?.title || 'Upcoming Events'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content?.events?.eventList || []).map((event: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <span className="inline-block bg-saffron-100 text-saffron-800 text-sm font-medium px-3 py-1 rounded-full">
                    {event.type}
                  </span>
                  <span className="ml-2 inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    {event.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duration: {event.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Instructor: {event.instructor}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-saffron-600">
                    ${event.price}
                  </div>
                  <button className="bg-saffron-600 hover:bg-saffron-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regular Workshops */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {content?.workshops?.title || 'Workshops'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(content?.workshops?.workshopList || []).map((workshop: any, index: number) => (
              <div key={index} className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-6">
                <div className="mb-4">
                  <span className="inline-block bg-saffron-100 text-saffron-800 text-sm font-medium px-3 py-1 rounded-full">
                    {workshop.type}
                  </span>
                  <span className="ml-2 inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    {workshop.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{workshop.title}</h3>
                <p className="text-gray-600 mb-4">{workshop.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {workshop.schedule} at {workshop.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duration: {workshop.duration}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-saffron-600">
                    {workshop.price === 0 ? 'Free' : `$${workshop.price}`}
                  </div>
                  <button className="bg-saffron-600 hover:bg-saffron-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Process */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {content?.registration?.title || 'Registration Process'}
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            {content?.registration?.description || 'Learn how to register for our events and workshops.'}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Process</h3>
              <ol className="space-y-3">
                {(content?.registration?.process || []).map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-saffron-100 text-saffron-800 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-3">
                {(content?.registration?.requirements || []).map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-saffron-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
