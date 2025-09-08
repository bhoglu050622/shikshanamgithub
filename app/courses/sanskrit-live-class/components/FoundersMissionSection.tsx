'use client';

export default function FoundersMissionSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 md:p-8">
        {/* Masonry Gallery */}
        <section>
          {/* Heading Section */}
          <div className="text-center py-8 mb-8 md:mb-12">
            {/* Pill/Tag with custom class */}
            <div className="inline-flex items-center wisdom-tag text-sm font-medium px-4 py-1 rounded-full mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Wisdom in Action
            </div>
            {/* Main Heading with Highlighted Text */}
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="text-gray-900 dark:text-white">Founder's</span> <span className="text-purple-500">Mission</span>
            </h2>
            {/* Subheading */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-3xl mx-auto">
              To Transform Modern lives with Eternal Wisdom
            </p>
          </div>
          
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-01-scaled.png" 
                alt="Gallery Image 1" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+1';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-02-scaled.png" 
                alt="Gallery Image 2" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+2';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-03-scaled.png" 
                alt="Gallery Image 3" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+3';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-04-scaled.png" 
                alt="Gallery Image 4" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+4';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-06-scaled.png" 
                alt="Gallery Image 5" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+5';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-05-5-scaled.png" 
                alt="Gallery Image 6" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+6';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-07-scaled.png" 
                alt="Gallery Image 7" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+7';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-16.png" 
                alt="Gallery Image 16" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+16';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-13.png" 
                alt="Gallery Image 13" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+13';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-12-scaled.png" 
                alt="Gallery Image 12" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+12';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-11-scaled.png" 
                alt="Gallery Image 11" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+11';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-15.png" 
                alt="Gallery Image 15" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+15';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-14-scaled.png" 
                alt="Gallery Image 14" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+14';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-08-scaled.png" 
                alt="Gallery Image 8" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+8';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-09-4-scaled.png" 
                alt="Gallery Image 9" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+9';
                }}
              />
            </div>
            <div className="masonry-item">
              <img 
                src="https://shikshanam.in/wp-content/uploads/2025/07/1-10-3-scaled.png" 
                alt="Gallery Image 10" 
                className="gallery-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://placehold.co/600x400/f5f3ff/8b5cf6?text=Image+10';
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
