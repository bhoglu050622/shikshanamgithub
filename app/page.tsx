import Hero from '@/components/sections/Hero'
import AlignYourself from '@/components/sections/AlignYourself'
import Schools from '@/components/sections/Schools'
import MeetGurus from '@/components/sections/MeetGurus'
import StudentStoriesSection from '@/components/sections/StudentStoriesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CommunityPostsSection from '@/components/sections/CommunityPostsSection'
import FoundersMission from '@/components/sections/FoundersMission'
import Contribute from '@/components/sections/Contribute'
import DownloadAppNew from '@/components/sections/DownloadAppNew'
import FAQ from '@/components/sections/FAQ'
import fs from 'fs';
import path from 'path';

async function getHomepageContent() {
  const isProduction = process.env.NODE_ENV === 'production';
  const draftPath = path.join(process.cwd(), 'data', 'homepage-content.json');
  const publishedPath = path.join(process.cwd(), 'data', 'homepage-content.published.json');
  
  let contentPath = isProduction ? publishedPath : draftPath;

  if (isProduction && !fs.existsSync(publishedPath)) {
    contentPath = draftPath;
  }

  try {
    if (fs.existsSync(contentPath)) {
      const fileContent = fs.readFileSync(contentPath, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error reading homepage content:', error);
  }
  return null;
}

export default async function Home() {
  const content = await getHomepageContent();

  if (!content) {
    return (
      <main className="main-container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Content Not Found</h1>
          <p className="text-xl text-gray-600">The content for the homepage could not be loaded.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Hero content={content.hero} />
      <AlignYourself content={content.alignYourself} />
      <Schools content={content.schools} />
      <MeetGurus content={content.meetGurus} />
      <StudentStoriesSection content={content.studentStories} />
      <TestimonialsSection content={content.testimonials} />
      <CommunityPostsSection content={content.communityPosts} />
      <FoundersMission content={content.foundersMission} />
      <Contribute content={content.contribute} />
      <DownloadAppNew content={content.downloadApp} />
      <FAQ content={content.faq} />
    </>
  )
}