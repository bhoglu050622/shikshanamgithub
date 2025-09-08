/**
 * Course Cards Component
 * Displays course cards with progress indicators and action buttons
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  BookOpen, 
  Clock, 
  User, 
  Lock, 
  CheckCircle, 
  ArrowRight,
  Download
} from 'lucide-react';
import type { DashboardProduct } from '@/lib/dashboard/dashboard-service';

interface CourseCardsProps {
  products: DashboardProduct[];
  onCourseAction: (action: string, productId: string) => void;
}

export function CourseCards({ products, onCourseAction }: CourseCardsProps) {
  const [loadingActions, setLoadingActions] = useState<Set<string>>(new Set());

  const handleAction = async (action: string, productId: string) => {
    setLoadingActions(prev => new Set(prev).add(productId));
    
    try {
      await onCourseAction(action, productId);
    } finally {
      setLoadingActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 80) return 'text-green-600 dark:text-green-400';
    if (progress >= 60) return 'text-yellow-600 dark:text-yellow-400';
    if (progress >= 30) return 'text-blue-600 dark:text-blue-400';
    return 'text-slate-600 dark:text-slate-400';
  };

  const getProgressRingColor = (progress: number): string => {
    if (progress >= 80) return 'stroke-green-500';
    if (progress >= 60) return 'stroke-yellow-500';
    if (progress >= 30) return 'stroke-blue-500';
    return 'stroke-slate-400';
  };

  if (products.length === 0) {
    return (
      <Card className="p-8 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No courses yet
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Start your learning journey by enrolling in a course.
        </p>
        <Button 
          onClick={() => onCourseAction('browse', '')}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          Browse Courses
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((item) => {
        const { product, enrollment, progressReport, isEnrolled, canResume, nextLesson } = item;
        const progress = progressReport?.progressPercentage || 0;
        const isLoading = loadingActions.has(product.id);

        return (
          <Card 
            key={product.id} 
            className="overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200"
          >
            {/* Course Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
              {product.thumbnail ? (
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <BookOpen className="h-16 w-16 text-slate-400" />
                </div>
              )}
              
              {/* Progress Ring */}
              {isEnrolled && (
                <div className="absolute top-4 right-4">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="stroke-slate-200 dark:stroke-slate-600"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={getProgressRingColor(progress)}
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${progress}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                {!isEnrolled ? (
                  <Badge variant="secondary" className="bg-white/90 text-slate-700">
                    Not Enrolled
                  </Badge>
                ) : progress === 100 ? (
                  <Badge variant="default" className="bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                ) : (
                  <Badge variant="default" className="bg-blue-500 text-white">
                    In Progress
                  </Badge>
                )}
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              {/* Course Title and Category */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </div>

              {/* Course Description */}
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Course Meta */}
              <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-500 mb-4">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDuration(product.duration)}
                </div>
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {product.instructor.name}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {product.syllabus?.length || 0} lessons
                </div>
              </div>

              {/* Progress Info */}
              {isEnrolled && progressReport && (
                <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Progress</span>
                    <span className={`font-semibold ${getProgressColor(progress)}`}>
                      {progressReport.completedLessons}/{progressReport.totalLessons} lessons
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                {!isEnrolled ? (
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => handleAction('enroll', product.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Enrolling...' : 'Enroll Now'}
                  </Button>
                ) : canResume && nextLesson ? (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleAction('resume', product.id)}
                    disabled={isLoading}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isLoading ? 'Loading...' : `Resume: ${nextLesson.title}`}
                  </Button>
                ) : progress === 100 ? (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleAction('review', product.id)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleAction('certificate', product.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Certificate
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleAction('continue', product.id)}
                    disabled={isLoading}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {isLoading ? 'Loading...' : 'Continue Learning'}
                  </Button>
                )}
              </div>

              {/* Next Lesson Info */}
              {canResume && nextLesson && (
                <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <strong>Next:</strong> {nextLesson.title}
                  </p>
                  {nextLesson.duration && (
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      {formatDuration(nextLesson.duration)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
