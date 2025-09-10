import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { prisma } from '@/cms/lib/prisma'
import { UserRole } from '@/cms/lib/generated/prisma'

// GET /api/cms/analytics - Get CMS analytics
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(UserRole.VIEWER)(request)
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '7d'

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (range) {
      case '1d':
        startDate.setDate(now.getDate() - 1)
        break
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }

    // Get overview statistics
    const [
      totalUsers,
      activeUsers,
      totalCourses,
      publishedCourses,
      totalBlogPosts,
      publishedBlogPosts,
      totalPackages,
      publishedPackages,
      recentUsers,
      recentActivity
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.course.count(),
      prisma.course.count({ where: { status: 'PUBLISHED' } }),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
      prisma.package.count(),
      prisma.package.count({ where: { status: 'PUBLISHED' } }),
      prisma.user.count({ where: { createdAt: { gte: startDate } } }),
      prisma.auditLog.findMany({
        where: { createdAt: { gte: startDate } },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          user: {
            select: {
              username: true
            }
          }
        }
      })
    ])

    // Calculate user growth percentage
    const previousPeriodUsers = await prisma.user.count({
      where: {
        createdAt: {
          lt: startDate,
          gte: new Date(startDate.getTime() - (now.getTime() - startDate.getTime()))
        }
      }
    })
    
    const userGrowth = previousPeriodUsers > 0 
      ? ((recentUsers - previousPeriodUsers) / previousPeriodUsers) * 100 
      : 0

    // Get popular content (mock data for now)
    const popularContent = [
      {
        id: '1',
        title: 'Introduction to Sanskrit Grammar',
        type: 'course',
        views: 1250,
        engagement: 85
      },
      {
        id: '2',
        title: 'Vedanta Philosophy Basics',
        type: 'blog',
        views: 980,
        engagement: 72
      },
      {
        id: '3',
        title: 'Complete Sanskrit Learning Package',
        type: 'package',
        views: 750,
        engagement: 90
      },
      {
        id: '4',
        title: 'Meditation Techniques for Beginners',
        type: 'course',
        views: 650,
        engagement: 78
      },
      {
        id: '5',
        title: 'Understanding Dharma in Modern Life',
        type: 'blog',
        views: 520,
        engagement: 68
      }
    ]

    const analyticsData = {
      overview: {
        totalUsers,
        activeUsers,
        totalContent: totalCourses + totalBlogPosts + totalPackages,
        publishedContent: publishedCourses + publishedBlogPosts + publishedPackages,
        totalViews: 15420, // Mock data
        totalEngagement: 78 // Mock data
      },
      contentStats: {
        courses: totalCourses,
        publishedCourses,
        blogPosts: totalBlogPosts,
        publishedBlogPosts,
        packages: totalPackages,
        publishedPackages
      },
      userActivity: {
        newUsers: recentUsers,
        activeUsers,
        returningUsers: activeUsers - recentUsers,
        userGrowth
      },
      popularContent,
      recentActivity: recentActivity.map(activity => ({
        id: activity.id,
        action: activity.action,
        content: activity.resource,
        user: activity.user.username,
        timestamp: activity.createdAt.toISOString()
      }))
    }

    return NextResponse.json(analyticsData)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}