# CMS Integration Guide

This guide explains how to integrate the centralized CMS system into your Shikshanam application. The CMS serves as the single source of truth for all content and data operations.

## Overview

The CMS system provides:
- **Centralized Services**: All data operations flow through typed CMS services
- **Real-time Updates**: PostgreSQL LISTEN/NOTIFY + WebSocket integration
- **Caching**: Intelligent caching with automatic invalidation
- **Validation**: Comprehensive input validation and error handling
- **Role-based Access**: Granular permissions for different user roles
- **Audit Logging**: Complete audit trail for all operations

## Architecture

```
Frontend Components
       ↓
   CMS Hooks
       ↓
   CMS Services
       ↓
   PostgreSQL (via Prisma)
       ↓
   Real-time Events
       ↓
   Connected Components
```

## Core Components

### 1. CMS Services (`/cms/lib/core/services.ts`)

The centralized service layer that handles all data operations:

```typescript
import { cms } from '@/cms/lib/core/services'

// Get all courses
const courses = await cms.courses.getAll(options, user)

// Create a new course
const course = await cms.courses.create(courseData, user)

// Update a course
const updatedCourse = await cms.courses.update({ id, ...data }, user)

// Delete a course
await cms.courses.delete(id, user)
```

### 2. React Hooks (`/cms/lib/core/hooks.ts`)

Pre-built React hooks for easy integration:

```typescript
import { useCourses, useCourse, useBlogPosts } from '@/cms/lib/core/hooks'

function CourseList() {
  const { courses, isLoading, createCourse, updateCourse } = useCourses({}, user)
  
  // Component automatically updates when data changes
  return (
    <div>
      {courses?.data.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
```

### 3. Real-time System (`/cms/lib/core/realtime.ts`)

Real-time updates using PostgreSQL LISTEN/NOTIFY:

```typescript
import { useCMSRealtime, useEntityRealtime } from '@/cms/lib/core/realtime'

function CourseEditor({ courseId }) {
  const { isConnected, lastEvent } = useCMSRealtime()
  
  // Real-time updates for specific course
  const { data: course, isUpdating } = useEntityRealtime('course', courseId)
  
  return (
    <div>
      {isUpdating && <div>Updating...</div>}
      <CourseForm course={course} />
    </div>
  )
}
```

## Integration Steps

### Step 1: Update API Routes

Replace direct Prisma calls with CMS services:

**Before:**
```typescript
// app/api/courses/route.ts
export async function GET() {
  const courses = await prisma.course.findMany()
  return NextResponse.json(courses)
}
```

**After:**
```typescript
// app/api/cms/courses/route.ts
import { cms } from '@/cms/lib/core/services'
import { CacheManager } from '@/cms/lib/core/cache'

export async function GET(request: NextRequest) {
  const user = await requireAuth(UserRole.VIEWER)(request)
  
  // Check cache first
  const cached = CacheManager.getCourses(user, options)
  if (cached) return NextResponse.json(cached)
  
  // Fetch from CMS service
  const result = await cms.courses.getAll(options, user)
  
  // Cache the result
  CacheManager.setCourses(user, options, result)
  
  return NextResponse.json(result)
}
```

### Step 2: Update Frontend Components

Replace direct API calls with CMS hooks:

**Before:**
```typescript
function CourseList() {
  const [courses, setCourses] = useState([])
  
  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(setCourses)
  }, [])
  
  return <div>{/* render courses */}</div>
}
```

**After:**
```typescript
import { useCourses } from '@/cms/lib/core/hooks'

function CourseList() {
  const { courses, isLoading, createCourse } = useCourses({}, user)
  
  return (
    <div>
      {isLoading ? <Loading /> : courses?.data.map(course => 
        <CourseCard key={course.id} course={course} />
      )}
    </div>
  )
}
```

### Step 3: Add Real-time Updates

Enable real-time updates for dynamic content:

```typescript
import { useCMSRealtime } from '@/cms/lib/core/realtime'

function Dashboard() {
  const { isConnected, lastEvent } = useCMSRealtime()
  
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span>Real-time {isConnected ? 'connected' : 'disconnected'}</span>
      </div>
      
      {/* Your dashboard content */}
    </div>
  )
}
```

## Available Services

### Course Service
- `cms.courses.getAll(options, user)` - List courses with filtering
- `cms.courses.getById(id, user)` - Get single course
- `cms.courses.getBySlug(slug, user)` - Get course by slug
- `cms.courses.create(data, user)` - Create new course
- `cms.courses.update(data, user)` - Update course
- `cms.courses.delete(id, user)` - Delete course
- `cms.courses.publish(id, user)` - Publish course
- `cms.courses.unpublish(id, user)` - Unpublish course

### Blog Service
- `cms.blogs.getAll(options, user)` - List blog posts
- `cms.blogs.getById(id, user)` - Get single blog post
- `cms.blogs.getBySlug(slug, user)` - Get blog post by slug
- `cms.blogs.create(data, user)` - Create new blog post
- `cms.blogs.update(data, user)` - Update blog post
- `cms.blogs.delete(id, user)` - Delete blog post
- `cms.blogs.publish(id, user)` - Publish blog post

### Package Service
- `cms.packages.getAll(options, user)` - List packages
- `cms.packages.getById(id, user)` - Get single package
- `cms.packages.getBySlug(slug, user)` - Get package by slug
- `cms.packages.create(data, user)` - Create new package
- `cms.packages.update(data, user)` - Update package
- `cms.packages.delete(id, user)` - Delete package
- `cms.packages.addCourse(packageId, courseId, user)` - Add course to package
- `cms.packages.removeCourse(packageId, courseId, user)` - Remove course from package

### Media Service
- `cms.media.getAll(options, user)` - List media files
- `cms.media.getById(id, user)` - Get single media file
- `cms.media.delete(id, user)` - Delete media file

### Analytics Service
- `cms.getSystemAnalytics(user)` - Get system-wide analytics
- `cms.search(query, user, options)` - Search across all content

## Available Hooks

### Data Hooks
- `useCourses(options, user)` - Course management
- `useCourse(id, user)` - Single course
- `useCourseBySlug(slug, user)` - Course by slug
- `useLessons(courseId, user)` - Course lessons
- `useBlogPosts(options, user)` - Blog post management
- `useBlogPost(id, user)` - Single blog post
- `useBlogPostBySlug(slug, user)` - Blog post by slug
- `usePackages(options, user)` - Package management
- `usePackage(id, user)` - Single package
- `usePackageBySlug(slug, user)` - Package by slug
- `useMedia(options, user)` - Media management
- `useSystemAnalytics(user)` - System analytics
- `useCMSSearch(user)` - Search functionality

### Real-time Hooks
- `useCMSRealtime()` - Real-time connection status
- `useEntityRealtime(entityType, entityId, initialData)` - Entity-specific updates
- `useRealtimeAnalytics()` - Real-time analytics
- `useRealtimeNotifications()` - Real-time notifications

### Workflow Hooks
- `useRevisionHistory(contentType, contentId, user)` - Revision history
- `useRevision(id, user)` - Single revision
- `useWorkflowActions(user)` - Workflow operations (approve, reject, publish, etc.)

## Caching

The CMS includes intelligent caching with automatic invalidation:

```typescript
import { CacheManager } from '@/cms/lib/core/cache'

// Cache is automatically managed by the services
// Manual cache operations (if needed):

// Invalidate specific course
CacheManager.invalidateCourse(user, courseId)

// Invalidate all courses for user
CacheManager.clearUserCache(user)

// Get cache statistics
const stats = CacheManager.getCacheStats()
```

## Validation

All input is validated using the validation utilities:

```typescript
import { validateCreateCourse, validateUpdateCourse } from '@/cms/lib/core/validation'

// Validation is automatic in services, but you can also validate manually:
try {
  validateCreateCourse(courseData)
  // Proceed with creation
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation errors
    console.error('Validation failed:', error.details)
  }
}
```

## Error Handling

The CMS provides comprehensive error handling:

```typescript
import { CMSError, ValidationError, NotFoundError } from '@/cms/lib/core/types'

try {
  const course = await cms.courses.getById(id, user)
} catch (error) {
  if (error instanceof NotFoundError) {
    // Handle not found
  } else if (error instanceof ValidationError) {
    // Handle validation errors
  } else if (error instanceof CMSError) {
    // Handle other CMS errors
  }
}
```

## Real-time Events

The system automatically triggers real-time events for all operations:

```typescript
// Events are automatically triggered, but you can also trigger manually:
import { triggerCMSEvent } from '@/cms/lib/core/realtime'

await triggerCMSEvent({
  type: 'update',
  entity: 'course',
  entityId: courseId,
  data: updatedCourse,
  timestamp: new Date(),
  userId: user.id
})
```

## Example Components

### Course Manager Component
See `/components/cms/CourseManager.tsx` for a complete example of:
- Real-time course management
- CRUD operations
- Real-time updates
- Error handling
- Loading states

### Real-time Analytics Component
See `/components/cms/RealtimeAnalytics.tsx` for a complete example of:
- Real-time analytics dashboard
- Live notifications
- System health monitoring
- Real-time data updates

## Migration Checklist

- [ ] Update all API routes to use CMS services
- [ ] Replace direct Prisma calls with CMS service calls
- [ ] Update frontend components to use CMS hooks
- [ ] Add real-time updates to dynamic components
- [ ] Implement proper error handling
- [ ] Add loading states and user feedback
- [ ] Test real-time functionality
- [ ] Verify caching behavior
- [ ] Test role-based permissions
- [ ] Validate all input data

## Best Practices

1. **Always use CMS services** - Never call Prisma directly from components
2. **Use React hooks** - Leverage the provided hooks for state management
3. **Handle loading states** - Always show loading indicators
4. **Implement error boundaries** - Catch and handle errors gracefully
5. **Use real-time updates** - Enable real-time for dynamic content
6. **Validate input** - Let the CMS handle validation
7. **Cache appropriately** - Trust the automatic caching system
8. **Follow role-based access** - Respect user permissions
9. **Log operations** - All operations are automatically logged
10. **Test thoroughly** - Test all CRUD operations and real-time updates

## Troubleshooting

### Real-time not working
- Check if the real-time API endpoint is accessible
- Verify WebSocket connection in browser dev tools
- Check PostgreSQL LISTEN/NOTIFY setup

### Cache issues
- Clear cache manually if needed: `CacheManager.clearAllCaches()`
- Check cache statistics: `CacheManager.getCacheStats()`

### Permission errors
- Verify user roles and permissions
- Check if user is properly authenticated
- Ensure required role for operation

### Validation errors
- Check input data format
- Verify required fields are provided
- Check field length limits and constraints

This CMS system provides a robust, scalable foundation for your Shikshanam application with real-time updates, intelligent caching, and comprehensive data management.
