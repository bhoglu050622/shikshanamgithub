/**
 * Dashboard Summary Component
 * Displays key metrics and statistics for the learner
 */

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Trophy, Clock, Target, Award, Calendar } from 'lucide-react';
import type { DashboardSummary as DashboardSummaryType } from '@/lib/dashboard/dashboard-service';

interface DashboardSummaryProps {
  summary: DashboardSummaryType;
}

export function DashboardSummary({ summary }: DashboardSummaryProps) {
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCompletionRateColor = (rate: number): string => {
    if (rate >= 80) return 'text-green-600 dark:text-green-400';
    if (rate >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStreakColor = (days: number): string => {
    if (days >= 7) return 'text-orange-600 dark:text-orange-400';
    if (days >= 3) return 'text-blue-600 dark:text-blue-400';
    return 'text-slate-600 dark:text-slate-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Courses */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Courses
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {summary.totalCourses}
            </p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {summary.completedCourses} completed
          </Badge>
          <Badge variant="outline" className="text-xs">
            {summary.inProgressCourses} in progress
          </Badge>
        </div>
      </Card>

      {/* Learning Time */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Learning Time
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {formatTime(summary.totalLearningTime)}
            </p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Total time spent learning
          </p>
        </div>
      </Card>

      {/* Completion Rate */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Completion Rate
            </p>
            <p className={`text-3xl font-bold ${getCompletionRateColor(summary.averageCompletionRate)}`}>
              {Math.round(summary.averageCompletionRate)}%
            </p>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${summary.averageCompletionRate}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Learning Streak */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Learning Streak
            </p>
            <p className={`text-3xl font-bold ${getStreakColor(summary.streakDays)}`}>
              {summary.streakDays}
            </p>
          </div>
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {summary.streakDays === 0 ? 'Start your streak today!' : 
             summary.streakDays === 1 ? 'Great start!' :
             `${summary.streakDays} days in a row`}
          </p>
        </div>
      </Card>

      {/* Certificates */}
      {summary.totalCertificates > 0 && (
        <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 md:col-span-2 lg:col-span-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                <Award className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Certificates Earned
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {summary.totalCertificates}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-500">
                Last active: {formatDate(summary.lastActiveDate)}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
