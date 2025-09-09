import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { UserRole } from '@/cms/lib/generated/prisma'

// GET /api/cms/realtime/stream - Server-Sent Events for real-time data
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await requireAuth(UserRole.VIEWER)(request)

    // Create readable stream for Server-Sent Events
    const encoder = new TextEncoder()
    
    const stream = new ReadableStream({
      start(controller) {
        // Send initial connection message
        const initialData = {
          type: 'connection',
          data: {
            message: 'Real-time stream connected',
            user: user.username,
            timestamp: new Date().toISOString()
          }
        }
        
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`)
        )

        // Generate real-time metrics
        const metricsInterval = setInterval(() => {
          try {
            const metricsData = {
              type: 'metrics',
              data: {
                timestamp: new Date().toISOString(),
                activeUsers: Math.floor(Math.random() * 200) + 50,
                pageViews: Math.floor(Math.random() * 1000) + 500,
                systemHealth: {
                  cpu: Math.random() * 100,
                  memory: Math.random() * 100,
                  storage: Math.random() * 100
                },
                revenue: Math.floor(Math.random() * 10000) + 50000
              }
            }

            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(metricsData)}\n\n`)
            )
          } catch (error) {
            console.error('Error generating metrics:', error)
          }
        }, 5000)

        // Generate activity events
        const activityInterval = setInterval(() => {
          try {
            if (Math.random() > 0.7) {
              const activities = ['created', 'updated', 'published', 'deleted', 'reviewed']
              const resources = ['course', 'lesson', 'blog post', 'package']
              const users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson']

              const activityData = {
                type: 'activity',
                data: {
                  id: `activity-${Date.now()}`,
                  user: users[Math.floor(Math.random() * users.length)],
                  action: activities[Math.floor(Math.random() * activities.length)],
                  resource: resources[Math.floor(Math.random() * resources.length)],
                  timestamp: new Date().toISOString()
                }
              }

              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(activityData)}\n\n`)
              )
            }
          } catch (error) {
            console.error('Error generating activity:', error)
          }
        }, 10000)

        // Cleanup function
        const cleanup = () => {
          clearInterval(metricsInterval)
          clearInterval(activityInterval)
        }

        // Handle client disconnect
        request.signal.addEventListener('abort', cleanup)
        
        return cleanup
      },
      
      cancel() {
        console.log('Real-time stream cancelled')
      }
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
      },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Real-time stream error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
