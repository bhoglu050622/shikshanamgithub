'use client';

import { useEffect, useRef } from 'react';

interface Lesson {
  title: string;
  type: string;
  duration: string;
}

interface Module {
  moduleNumber: number;
  title: string;
  description: string;
  tag: string;
  lessons: Lesson[];
}

export default function CourseCurriculumSection() {
  const componentRef = useRef<HTMLDivElement>(null);

  // All curriculum data for the Sanskrit course
  const curriculumData: Module[] = [
    { moduleNumber: 1, title: 'Meet & Greet in Sanskrit', description: 'Say hello, wish good morning, and start conversations politely.', tag: 'Conversation', lessons: [ { title: 'Polite Expressions', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 2, title: 'Introduce Yourself!', description: 'Ask and tell names naturally, for him, her, and yourself.', tag: 'Conversation', lessons: [ { title: 'Pronouns: He, She, I', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 3, title: 'Here, There & Everywhere!', description: 'Use location words to point and talk about places.', tag: 'Vocabulary', lessons: [ { title: 'Pointing at Objects', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 4, title: 'Who Owns This?', description: 'Talk about possession: his, hers, whose.', tag: 'Grammar', lessons: [ { title: 'Forming Whose Questions', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 5, title: 'Say What You\'re Doing!', description: 'Describe actions like eating, going, writing, or reading.', tag: 'Verbs', lessons: [ { title: 'Simple Sentence Building', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 6, title: 'Count Like a Pro!', description: 'Numbers for shopping, games, and everyday talk.', tag: 'Vocabulary', lessons: [ { title: 'Counting Objects', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 7, title: 'Tell the Time!', description: 'Ask and answer about hours and minutes in Sanskrit.', tag: 'Conversation', lessons: [ { title: 'Telling Time (Hours)', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 8, title: 'Where Is It?', description: 'Talk about positions: on the desk, in your hand, inside the book.', tag: 'Vocabulary', lessons: [ { title: 'Describing Object Locations', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 9, title: 'Talking About Days!', description: 'Today, tomorrow, yesterday — and beyond.', tag: 'Vocabulary', lessons: [ { title: 'Using Today, Yesterday, Tomorrow', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 10, title: 'When We Do It Together!', description: 'Plural verb forms for we and they in action.', tag: 'Grammar', lessons: [ { title: 'Group Action Sentences', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 11, title: 'Left, Right & All Around!', description: 'Use spatial words and key question words.', tag: 'Vocabulary', lessons: [ { title: 'Asking for Directions', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 12, title: 'Narrate Past and Future Events!', description: 'Speak about Yesterday and tomorrows.', tag: 'Grammar', lessons: [ { title: 'Recounting Your Day', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 13, title: 'After Doing This…', description: 'Join sentences with after, if, although, and more.', tag: 'Grammar', lessons: [ { title: 'Combining Simple Sentences', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 14, title: 'Add Color to Your Words!', description: 'Colors, tastes, clothes, opposites, animals, body parts, health & food.', tag: 'Vocabulary', lessons: [ { title: 'Describing People and Things', type: 'Practice Exercise', duration: '✍️' } ] },
    { moduleNumber: 15, title: 'Sanskrit for Fun Chats!', description: 'Gender in numbers, phone calls, and playful roleplays.', tag: 'Conversation', lessons: [ { title: 'Understanding Gender in Nouns', type: 'Practice Exercise', duration: '✍️' } ] }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (componentRef.current) {
        const rect = componentRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          componentRef.current.classList.add('animate-fade-in');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Conversation':
        return 'bg-blue-100 text-blue-800';
      case 'Vocabulary':
        return 'bg-green-100 text-green-800';
      case 'Grammar':
        return 'bg-purple-100 text-purple-800';
      case 'Verbs':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section 
      ref={componentRef}
      className="py-16 bg-gradient-to-br from-saffron-50 via-white to-peacock-green-50"
      id="curriculum"
    >
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Course Curriculum
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master Sanskrit conversation through 15 comprehensive modules designed to take you from beginner to confident speaker.
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {curriculumData.map((module, index) => (
            <div
              key={module.moduleNumber}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-saffron-500"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-peacock-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {module.moduleNumber}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {module.title}
                    </h3>
                    <p className="text-gray-600">
                      {module.description}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(module.tag)}`}>
                  {module.tag}
                </span>
              </div>

              <div className="ml-16">
                <div className="space-y-3">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center">
                        <span className="text-saffron-600 font-medium text-sm">
                          {lessonIndex + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {lesson.type}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {lesson.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-saffron-50 to-peacock-green-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Sanskrit Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students who have transformed their Sanskrit skills with our comprehensive curriculum.
            </p>
            <button className="bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}