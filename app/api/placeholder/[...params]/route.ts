import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  const { params: pathParams } = params
  const path = pathParams.join('/')
  
  // Handle different placeholder types
  if (path.includes('video')) {
    // Return a video placeholder
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Video Placeholder</title>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              background: linear-gradient(135deg, #f59e0b, #d97706);
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              font-family: Arial, sans-serif;
            }
            .video-placeholder {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: white;
              text-align: center;
            }
            .play-icon {
              width: 80px;
              height: 80px;
              border: 4px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
              font-size: 30px;
            }
          </style>
        </head>
        <body>
          <div class="video-placeholder">
            <div class="play-icon">▶</div>
            <h2>Video Placeholder</h2>
            <p>${path}</p>
          </div>
        </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  }
  
  // Handle image placeholders
  const dimensions = path.split('/')
  let width = 400
  let height = 300
  
  if (dimensions.length >= 2) {
    const widthStr = dimensions[0]
    const heightStr = dimensions[1]
    
    if (!isNaN(Number(widthStr))) width = Number(widthStr)
    if (!isNaN(Number(heightStr))) height = Number(heightStr)
  }
  
  // Generate SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle" dy=".3em">
        ${width} × ${height}
      </text>
      <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" dy=".3em">
        Placeholder Image
      </text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
