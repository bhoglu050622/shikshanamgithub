'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Clock, TrendingUp, Calendar } from 'lucide-react'
import { UsageAnalytics } from '@/lib/types/graphy'

interface UsageChartProps {
  analytics: UsageAnalytics
  isLoading?: boolean
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

export default function UsageChart({ analytics, isLoading = false }: UsageChartProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded mb-6"></div>
        <div className="h-64 bg-muted rounded"></div>
      </div>
    )
  }

  const totalHours = analytics.dailyUsage.reduce((sum, day) => sum + day.hours, 0)
  const avgDailyHours = analytics.dailyUsage.length > 0 ? totalHours / analytics.dailyUsage.length : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Learning Analytics</h2>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{totalHours.toFixed(1)}h total</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4" />
            <span>{avgDailyHours.toFixed(1)}h avg/day</span>
          </div>
        </div>
      </div>

      {analytics.dailyUsage.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No usage data yet</h3>
          <p className="text-muted-foreground">
            Start learning to see your progress and analytics here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Daily Usage Chart */}
          {analytics.dailyUsage.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Daily Learning Hours</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.dailyUsage}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${value}h`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(1)} hours`, 'Learning Time']}
                      labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Bar 
                      dataKey="hours" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Course Usage Distribution */}
          {analytics.courseUsage.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Time by Course</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.courseUsage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(Number(percent) * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="hours"
                    >
                      {analytics.courseUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value.toFixed(1)} hours`, 'Learning Time']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Weekly Pattern */}
          {analytics.weeklyPattern.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Learning Pattern</h3>
              <div className="grid grid-cols-7 gap-2">
                {analytics.weeklyPattern.map((day, index) => (
                  <div key={day.day} className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                    <div className="bg-muted rounded-lg p-2">
                      <div 
                        className="bg-primary rounded transition-all duration-300"
                        style={{ 
                          height: `${Math.max(4, (day.hours / Math.max(...analytics.weeklyPattern.map(d => d.hours))) * 40)}px` 
                        }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {day.hours.toFixed(1)}h
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
