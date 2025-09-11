/**
 * Optimized Database Queries
 * Pre-built queries with proper indexing and performance optimization
 */

import { prisma } from './connection';
import { Prisma } from '@prisma/client';

// ============================================================================
// USER QUERIES
// ============================================================================

export const userQueries = {
  // Get user by email with optimized query
  findByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        avatar: true,
        role: true,
        status: true,
        isActive: true,
        emailVerified: true,
        lastLogin: true,
        createdAt: true,
      },
    });
  },

  // Get user by username with optimized query
  findByUsername: async (username: string) => {
    return await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        displayName: true,
        avatar: true,
        role: true,
        status: true,
        isActive: true,
        emailVerified: true,
        lastLogin: true,
        createdAt: true,
      },
    });
  },

  // Get active users with pagination
  findActiveUsers: async (page: number = 1, limit: number = 20) => {
    const skip = (page - 1) * limit;
    
    return await prisma.user.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        avatar: true,
        role: true,
        lastLogin: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  },

  // Get user statistics
  getUserStats: async (userId: string) => {
    const [enrollments, progress, submissions] = await Promise.all([
      prisma.enrollment.count({
        where: { userId, status: 'ACTIVE' },
      }),
      prisma.progress.count({
        where: { userId, completed: true },
      }),
      prisma.submission.count({
        where: { userId },
      }),
    ]);

    return {
      activeEnrollments: enrollments,
      completedLessons: progress,
      totalSubmissions: submissions,
    };
  },

  // Update user last activity
  updateLastActivity: async (userId: string) => {
    return await prisma.user.update({
      where: { id: userId },
      data: { lastActiveAt: new Date() },
    });
  },
};

// ============================================================================
// COURSE QUERIES
// ============================================================================

export const courseQueries = {
  // Get published courses with pagination
  findPublishedCourses: async (page: number = 1, limit: number = 20, category?: string) => {
    const skip = (page - 1) * limit;
    
    return await prisma.course.findMany({
      where: {
        isPublished: true,
        status: 'PUBLISHED',
        deletedAt: null,
        ...(category && { category }),
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        shortDescription: true,
        thumbnail: true,
        category: true,
        tags: true,
        difficulty: true,
        duration: true,
        price: true,
        currency: true,
        featured: true,
        publishedAt: true,
        createdAt: true,
        _count: {
          select: {
            enrollments: true,
            lessons: true,
          },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
      ],
      skip,
      take: limit,
    });
  },

  // Get course by slug with full details
  findBySlug: async (slug: string) => {
    return await prisma.course.findUnique({
      where: { slug },
      include: {
        lessons: {
          where: { isPublished: true, deletedAt: null },
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            duration: true,
            order: true,
            contentType: true,
          },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: {
            enrollments: true,
            lessons: true,
            reviews: true,
          },
        },
      },
    });
  },

  // Get featured courses
  findFeaturedCourses: async (limit: number = 6) => {
    return await prisma.course.findMany({
      where: {
        featured: true,
        isPublished: true,
        status: 'PUBLISHED',
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        thumbnail: true,
        category: true,
        difficulty: true,
        duration: true,
        price: true,
        currency: true,
        publishedAt: true,
        _count: {
          select: {
            enrollments: true,
            reviews: true,
          },
        },
      },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
  },

  // Search courses
  searchCourses: async (query: string, page: number = 1, limit: number = 20) => {
    const skip = (page - 1) * limit;
    
    return await prisma.course.findMany({
      where: {
        isPublished: true,
        status: 'PUBLISHED',
        deletedAt: null,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { has: query } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        thumbnail: true,
        category: true,
        tags: true,
        difficulty: true,
        duration: true,
        price: true,
        currency: true,
        publishedAt: true,
        _count: {
          select: {
            enrollments: true,
            reviews: true,
          },
        },
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limit,
    });
  },
};

// ============================================================================
// ENROLLMENT QUERIES
// ============================================================================

export const enrollmentQueries = {
  // Get user enrollments
  getUserEnrollments: async (userId: string, status?: string) => {
    return await prisma.enrollment.findMany({
      where: {
        userId,
        ...(status && { status: status as any }),
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            duration: true,
            _count: {
              select: {
                lessons: true,
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  },

  // Get course enrollment stats
  getCourseEnrollmentStats: async (courseId: string) => {
    const [total, active, completed] = await Promise.all([
      prisma.enrollment.count({
        where: { courseId },
      }),
      prisma.enrollment.count({
        where: { courseId, status: 'ACTIVE' },
      }),
      prisma.enrollment.count({
        where: { courseId, status: 'COMPLETED' },
      }),
    ]);

    return { total, active, completed };
  },

  // Check if user is enrolled
  isUserEnrolled: async (userId: string, courseId: string) => {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return !!enrollment;
  },
};

// ============================================================================
// PROGRESS QUERIES
// ============================================================================

export const progressQueries = {
  // Get user progress for a course
  getUserCourseProgress: async (userId: string, courseId: string) => {
    const [enrollment, progress] = await Promise.all([
      prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      }),
      prisma.progress.findMany({
        where: {
          userId,
          courseId,
        },
        include: {
          lesson: {
            select: {
              id: true,
              title: true,
              slug: true,
              order: true,
            },
          },
        },
        orderBy: {
          lesson: {
            order: 'asc',
          },
        },
      }),
    ]);

    return { enrollment, progress };
  },

  // Update lesson progress
  updateLessonProgress: async (
    userId: string,
    lessonId: string,
    completed: boolean,
    timeSpent: number = 0
  ) => {
    return await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
        timeSpent: {
          increment: timeSpent,
        },
      },
      create: {
        userId,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null,
        timeSpent,
      },
    });
  },

  // Get user learning statistics
  getUserLearningStats: async (userId: string) => {
    const [totalLessons, completedLessons, totalTimeSpent] = await Promise.all([
      prisma.progress.count({
        where: { userId },
      }),
      prisma.progress.count({
        where: { userId, completed: true },
      }),
      prisma.progress.aggregate({
        where: { userId },
        _sum: {
          timeSpent: true,
        },
      }),
    ]);

    return {
      totalLessons,
      completedLessons,
      completionRate: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0,
      totalTimeSpent: totalTimeSpent._sum.timeSpent || 0,
    };
  },
};

// ============================================================================
// ANALYTICS QUERIES
// ============================================================================

export const analyticsQueries = {
  // Get platform statistics
  getPlatformStats: async () => {
    const [
      totalUsers,
      activeUsers,
      totalCourses,
      publishedCourses,
      totalEnrollments,
      completedEnrollments,
    ] = await Promise.all([
      prisma.user.count({
        where: { deletedAt: null },
      }),
      prisma.user.count({
        where: { isActive: true, deletedAt: null },
      }),
      prisma.course.count({
        where: { deletedAt: null },
      }),
      prisma.course.count({
        where: { isPublished: true, status: 'PUBLISHED', deletedAt: null },
      }),
      prisma.enrollment.count(),
      prisma.enrollment.count({
        where: { status: 'COMPLETED' },
      }),
    ]);

    return {
      totalUsers,
      activeUsers,
      totalCourses,
      publishedCourses,
      totalEnrollments,
      completedEnrollments,
      completionRate: totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0,
    };
  },

  // Get user activity analytics
  getUserActivity: async (days: number = 30) => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return await prisma.auditLog.groupBy({
      by: ['action'],
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      _count: {
        action: true,
      },
      orderBy: {
        _count: {
          action: 'desc',
        },
      },
    });
  },

  // Get course popularity analytics
  getCoursePopularity: async (limit: number = 10) => {
    return await prisma.course.findMany({
      where: {
        isPublished: true,
        status: 'PUBLISHED',
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        _count: {
          select: {
            enrollments: true,
            progress: true,
            reviews: true,
          },
        },
      },
      orderBy: {
        enrollments: {
          _count: 'desc',
        },
      },
      take: limit,
    });
  },
};

// ============================================================================
// AUDIT QUERIES
// ============================================================================

export const auditQueries = {
  // Log user action
  logAction: async (
    userId: string | null,
    action: string,
    resource: string,
    resourceId?: string,
    metadata?: any,
    ipAddress?: string,
    userAgent?: string
  ) => {
    return await prisma.auditLog.create({
      data: {
        userId,
        action: action as any,
        resource,
        resourceId,
        metadata,
        ipAddress,
        userAgent,
      },
    });
  },

  // Get user audit trail
  getUserAuditTrail: async (userId: string, page: number = 1, limit: number = 50) => {
    const skip = (page - 1) * limit;

    return await prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
  },

  // Get system audit trail
  getSystemAuditTrail: async (page: number = 1, limit: number = 100) => {
    const skip = (page - 1) * limit;

    return await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  },
};
