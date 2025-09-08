/**
 * Activity Feed Component
 * Displays a timeline of learner activities
 */

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  CheckCircle, 
  BookOpen, 
  Video, 
  UserPlus, 
  Award,
  Clock
} from 'lucide-react';
import type { ActivityItem } from '@/lib/dashboard/dashboard-service';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'discussion':
        return <MessageCircle className="h-4 w-4" />;
      case 'quiz_completion':
        return <CheckCircle className="h-4 w-4" />;
      case 'lesson_completion':
        return <BookOpen className="h-4 w-4" />;
      case 'liveclass_attendance':
        return <Video className="h-4 w-4" />;
      case 'enrollment':
        return <UserPlus className="h-4 w-4" />;
      case 'certificate_earned':
        return <Award className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: ActivityItem['type']): string => {
    switch (type) {
      case 'discussion':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'quiz_completion':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'lesson_completion':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      case 'liveclass_attendance':
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
      case 'enrollment':
        return 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30';
      case 'certificate_earned':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/30';
    }
  };

  const getActivityTitle = (type: ActivityItem['type']): string => {
    switch (type) {
      case 'discussion':
        return 'Posted in discussion';
      case 'quiz_completion':
        return 'Completed quiz';
      case 'lesson_completion':
        return 'Completed lesson';
      case 'liveclass_attendance':
        return 'Attended live class';
      case 'enrollment':
        return 'Enrolled in course';
      case 'certificate_earned':
        return 'Earned certificate';
      default:
        return 'Activity';
    }
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - activityTime.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return activityTime.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  };

  if (activities.length === 0) {
    return (
      <Card className="p-8 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          No recent activity
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Start learning to see your activity here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <div className="p-6">
        <div className="space-y-4">
          {activities.slice(0, 10).map((activity, index) => (
            <div key={activity.id} className="flex items-start space-x-4">
              {/* Activity Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-500">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {activity.description}
                </p>

                {activity.productTitle && (
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {activity.productTitle}
                    </Badge>
                  </div>
                )}

                {/* Additional metadata for specific activity types */}
                {activity.type === 'quiz_completion' && activity.metadata?.score !== undefined && (
                  <div className="mt-2">
                    <Badge 
                      variant={activity.metadata.score >= 80 ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      Score: {activity.metadata.score}%
                    </Badge>
                  </div>
                )}

                {activity.type === 'lesson_completion' && activity.metadata?.progressPercentage !== undefined && (
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {activity.metadata.progressPercentage}% complete
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {activities.length > 10 && (
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View all {activities.length} activities
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
