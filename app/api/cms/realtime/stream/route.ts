import { NextRequest } from 'next/server'
import { WebSocketRealtime } from '@/cms/lib/core/realtime'

// Server-Sent Events endpoint for real-time updates
export async function GET(request: NextRequest) {
  // Check if this is a Server-Sent Events request
  const acceptHeader = request.headers.get('accept')
  if (!acceptHeader?.includes('text/event-stream')) {
    return new Response('Expected text/event-stream', { status: 400 })
  }

  // Create a readable stream for Server-Sent Events
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      
      // Send initial connection event
      const initialEvent = `data: ${JSON.stringify({
        type: 'connection',
        message: 'Connected to CMS real-time updates',
        timestamp: new Date().toISOString()
      })}\n\n`
      
      controller.enqueue(encoder.encode(initialEvent))

      // Set up real-time event listener
      const postgresRealtime = require('@/cms/lib/core/realtime').PostgreSQLRealtime.getInstance()
      
      const unsubscribe = postgresRealtime.subscribe('cms_event', (event: any) => {
        const eventData = `data: ${JSON.stringify({
          type: 'cms_event',
          data: event,
          timestamp: new Date().toISOString()
        })}\n\n`
        
        try {
          controller.enqueue(encoder.encode(eventData))
        } catch (error) {
          console.error('Error sending SSE event:', error)
          unsubscribe()
          controller.close()
        }
      })

      // Send periodic heartbeat to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          const heartbeatEvent = `data: ${JSON.stringify({
            type: 'heartbeat',
            timestamp: new Date().toISOString()
          })}\n\n`
          
          controller.enqueue(encoder.encode(heartbeatEvent))
        } catch (error) {
          console.error('Error sending heartbeat:', error)
          clearInterval(heartbeat)
          unsubscribe()
          controller.close()
        }
      }, 30000) // Send heartbeat every 30 seconds

      // Cleanup on connection close
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat)
        unsubscribe()
        controller.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  })
}