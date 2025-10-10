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

// Preload critical images - only include images that actually exist
export const preloadCriticalImages = async () => {
  const criticalImages = [
    'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
    // Note: Removed non-existent images from 2024/07 and 2025/07 directories
    // Add other existing images here when available
  ]

  try {
    await ImagePreloader.preloadImages(criticalImages)
    console.log('Critical images preloaded successfully')
  } catch (error) {
    console.warn('Failed to preload some critical images:', error)
  }
}
