// Image preloader utility to help with connection issues
export class ImagePreloader {
  private static cache = new Map<string, Promise<boolean>>()
  private static maxRetries = 3
  private static timeout = 10000 // 10 seconds

  static async preloadImage(src: string, retries = 0): Promise<boolean> {
    // Check if already cached
    if (this.cache.has(src)) {
      return this.cache.get(src)!
    }

    const promise = this.loadImage(src, retries)
    this.cache.set(src, promise)
    return promise
  }

  private static async loadImage(src: string, retries: number): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image()
      const timeoutId = setTimeout(() => {
        img.src = ''
        resolve(false)
      }, this.timeout)

      img.onload = () => {
        clearTimeout(timeoutId)
        resolve(true)
      }

      img.onerror = () => {
        clearTimeout(timeoutId)
        if (retries < this.maxRetries) {
          // Retry with exponential backoff
          const delay = Math.pow(2, retries) * 1000
          setTimeout(() => {
            this.loadImage(src, retries + 1).then(resolve)
          }, delay)
        } else {
          resolve(false)
        }
      }

      // Add cache busting parameter
      const separator = src.includes('?') ? '&' : '?'
      img.src = `${src}${separator}t=${Date.now()}`
    })
  }

  static async preloadImages(urls: string[]): Promise<{ [url: string]: boolean }> {
    const results: { [url: string]: boolean } = {}
    
    await Promise.allSettled(
      urls.map(async (url) => {
        results[url] = await this.preloadImage(url)
      })
    )

    return results
  }

  static clearCache(): void {
    this.cache.clear()
  }

  static getCacheSize(): number {
    return this.cache.size
  }
}

// Preload critical images
export const preloadCriticalImages = async () => {
  const criticalImages = [
    'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    'https://shikshanam.in/wp-content/uploads/2024/07/1-01-scaled.png',
    'https://d502jbuhuh9wk.cloudfront.net/courses/678b5ab8789de93b7ee832bd/678b5ab8789de93b7ee832bd_scaled_cover.jpg?v=2',
    'https://d502jbuhuh9wk.cloudfront.net/courses/687b56fc55ab5b6dc3bb51de/687b56fc55ab5b6dc3bb51de_scaled_cover.jpg?v=1',
    'https://d502jbuhuh9wk.cloudfront.net/courses/6868be22998a012a18cc0360/6868be22998a012a18cc0360_scaled_cover.jpg?v=4',
    'https://d502jbuhuh9wk.cloudfront.net/courses/6489826fe4b046d958772a4a/6489826fe4b046d958772a4a_scaled_cover.jpg?v=5',
    'https://d502jbuhuh9wk.cloudfront.net/courses/6620c94d738059528460072e/6620c94d738059528460072e_scaled_cover.jpg?v=2',
    'https://d502jbuhuh9wk.cloudfront.net/courses/64bfab06e4b06ed046925620/64bfab06e4b06ed046925620_scaled_cover.jpg?v=4',
    'https://d502jbuhuh9wk.cloudfront.net/courses/650a824be4b03b5745557827/650a824be4b03b5745557827_scaled_cover.jpg?v=4',
    'https://d502jbuhuh9wk.cloudfront.net/courses/678e46e9ec4fa55804909de1/678e46e9ec4fa55804909de1_scaled_cover.jpg?v=2',
    'https://d502jbuhuh9wk.cloudfront.net/courses/678e3649f4f9ad20d3001578/678e3649f4f9ad20d3001578_scaled_cover.jpg?v=2',
    'https://d502jbuhuh9wk.cloudfront.net/courses/66142b3d16c5b80f956291ea/66142b3d16c5b80f956291ea_scaled_cover.jpg?v=3',
    'https://d502jbuhuh9wk.cloudfront.net/courses/66141e980049fe208aba2125/66141e980049fe208aba2125_scaled_cover.jpg?v=5'
  ]

  try {
    await ImagePreloader.preloadImages(criticalImages)
    console.log('Critical images preloaded successfully')
  } catch (error) {
    console.warn('Failed to preload some critical images:', error)
  }
}
