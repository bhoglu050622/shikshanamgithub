/**
 * Recommendations Component
 * Displays personalized course recommendations
 */

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  User, 
  Star, 
  ArrowRight,
  TrendingUp,
  Target,
  Play
} from 'lucide-react';
import type { Recommendation } from '@/lib/dashboard/recommendation-engine';

interface RecommendationsProps {
  recommendations: Recommendation[];
  onRecommendationClick: (productId: string) => void;
}

export function Recommendations({ recommendations, onRecommendationClick }: RecommendationsProps) {
  const getRecommendationIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'resume':
        return <Play className="h-4 w-4" />;
      case 'next_lesson':
        return <ArrowRight className="h-4 w-4" />;
      case 'category_match':
        return <Target className="h-4 w-4" />;
      case 'popular':
        return <TrendingUp className="h-4 w-4" />;
      case 'similar':
        return <Star className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getRecommendationColor = (type: Recommendation['type']): string => {
    switch (type) {
      case 'resume':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'next_lesson':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'category_match':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      case 'popular':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
      case 'similar':
        return 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/30';
    }
  };

  const getRecommendationBadgeText = (type: Recommendation['type']): string => {
    switch (type) {
      case 'resume':
        return 'Resume';
      case 'next_lesson':
        return 'Continue';
      case 'category_match':
        return 'For You';
      case 'popular':
        return 'Popular';
      case 'similar':
        return 'Similar';
      default:
        return 'Recommended';
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

  const getScoreColor = (score: number): string => {
    if (score >= 0.8) return 'text-green-600 dark:text-green-400';
    if (score >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 0.4) return 'text-blue-600 dark:text-blue-400';
    return 'text-slate-600 dark:text-slate-400';
  };

  if (recommendations.length === 0) {
    return (
      <Card className="p-6 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <Star className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No recommendations yet
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Complete some courses to get personalized recommendations.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations
        .filter((recommendation) => {
          // Filter out invalid recommendations
          if (!recommendation || !recommendation.product) {
            console.warn('Invalid recommendation data:', recommendation);
            return false;
          }
          return true;
        })
        .map((recommendation) => {
        const { product, score, reason, type } = recommendation;
        
        return (
          <Card 
            key={product.id}
            className="p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => onRecommendationClick(product.id)}
          >
            <div className="flex items-start space-x-3">
              {/* Course Thumbnail */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg overflow-hidden">
                {product.thumbnail ? (
                  <Image 
                    src={product.thumbnail} 
                    alt={product.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="h-6 w-6 text-slate-400" />
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
                    {product.title}
                  </h4>
                  <div className="flex items-center space-x-2 ml-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getRecommendationColor(type)}`}
                    >
                      {getRecommendationIcon(type)}
                      <span className="ml-1">{getRecommendationBadgeText(type)}</span>
                    </Badge>
                    <div className={`text-xs font-medium ${getScoreColor(score)}`}>
                      {Math.round(score * 100)}%
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                  {product.description}
                </p>

                {/* Course Meta */}
                <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-500 mb-2">
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

                {/* Recommendation Reason */}
                <p className="text-xs text-slate-500 dark:text-slate-500 italic">
                  {reason}
                </p>

                {/* Action Button */}
                <div className="mt-3">
                  <Button 
                    size="sm" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRecommendationClick(product.id);
                    }}
                  >
                    {type === 'resume' ? 'Resume Course' : 
                     type === 'next_lesson' ? 'Continue Learning' :
                     'View Course'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      {/* View All Recommendations */}
      {recommendations.length >= 5 && (
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => onRecommendationClick('all')}
          >
            View All Recommendations
          </Button>
        </div>
      )}
    </div>
  );
}
