/**
 * Lazy Loading Utilities
 * Provides efficient lazy loading for images, components, and content
 */

export interface LazyLoadOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export interface LazyImageOptions extends LazyLoadOptions {
  placeholder?: string;
  errorImage?: string;
  fadeIn?: boolean;
  fadeInDuration?: number;
}

export class LazyLoader {
  private observer: IntersectionObserver | null = null;
  private options: LazyLoadOptions;

  constructor(options: LazyLoadOptions = {}) {
    this.options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      once: true,
      ...options
    };

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.options
      );
    }
  }

  /**
   * Observe an element for lazy loading
   */
  observe(element: Element): void {
    if (this.observer) {
      this.observer.observe(element);
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadElement(element);
    }
  }

  /**
   * Stop observing an element
   */
  unobserve(element: Element): void {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  /**
   * Disconnect the observer
   */
  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Handle intersection changes
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        
        if (this.options.once) {
          this.unobserve(entry.target);
        }
      }
    });
  }

  /**
   * Load an element (to be overridden by specific loaders)
   */
  protected loadElement(element: Element): void {
    // Override in subclasses
  }
}

/**
 * Lazy Image Loader
 */
export class LazyImageLoader extends LazyLoader {
  private imageOptions: LazyImageOptions;

  constructor(options: LazyImageOptions = {}) {
    super(options);
    this.imageOptions = {
      placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
      errorImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RXJyb3I8L3RleHQ+PC9zdmc+',
      fadeIn: true,
      fadeInDuration: 300,
      ...options
    };
  }

  /**
   * Load an image element
   */
  protected loadElement(element: Element): void {
    const img = element as HTMLImageElement;
    const src = img.dataset.src;
    
    if (!src) return;

    // Set placeholder
    if (this.imageOptions.placeholder && !img.src) {
      img.src = this.imageOptions.placeholder;
    }

    // Create new image to preload
    const newImg = new Image();
    
    newImg.onload = () => {
      img.src = src;
      img.removeAttribute('data-src');
      
      if (this.imageOptions.fadeIn) {
        this.fadeInImage(img);
      }
    };

    newImg.onerror = () => {
      if (this.imageOptions.errorImage) {
        img.src = this.imageOptions.errorImage;
      }
      img.removeAttribute('data-src');
    };

    newImg.src = src;
  }

  /**
   * Fade in image
   */
  private fadeInImage(img: HTMLImageElement): void {
    img.style.opacity = '0';
    img.style.transition = `opacity ${this.imageOptions.fadeInDuration}ms ease-in-out`;
    
    requestAnimationFrame(() => {
      img.style.opacity = '1';
    });
  }
}

/**
 * Lazy Component Loader
 */
export class LazyComponentLoader extends LazyLoader {
  private loadCallback: (element: Element) => void;

  constructor(loadCallback: (element: Element) => void, options: LazyLoadOptions = {}) {
    super(options);
    this.loadCallback = loadCallback;
  }

  /**
   * Load a component element
   */
  protected loadElement(element: Element): void {
    this.loadCallback(element);
  }
}

/**
 * Lazy Content Loader
 */
export class LazyContentLoader extends LazyLoader {
  private contentUrl: string;
  private loadingElement: HTMLElement | null = null;

  constructor(contentUrl: string, options: LazyLoadOptions = {}) {
    super(options);
    this.contentUrl = contentUrl;
  }

  /**
   * Load content into an element
   */
  protected loadElement(element: Element): void {
    const container = element as HTMLElement;
    
    if (container.dataset.loaded === 'true') return;

    // Show loading state
    this.showLoading(container);

    // Fetch content
    fetch(this.contentUrl)
      .then(response => response.text())
      .then(html => {
        container.innerHTML = html;
        container.dataset.loaded = 'true';
        this.hideLoading();
      })
      .catch(error => {
        console.error('Failed to load lazy content:', error);
        this.showError(container);
        this.hideLoading();
      });
  }

  /**
   * Show loading state
   */
  private showLoading(container: HTMLElement): void {
    this.loadingElement = document.createElement('div');
    this.loadingElement.className = 'lazy-loading';
    this.loadingElement.innerHTML = `
      <div class="flex items-center justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-2 text-gray-600">Loading...</span>
      </div>
    `;
    container.appendChild(this.loadingElement);
  }

  /**
   * Hide loading state
   */
  private hideLoading(): void {
    if (this.loadingElement) {
      this.loadingElement.remove();
      this.loadingElement = null;
    }
  }

  /**
   * Show error state
   */
  private showError(container: HTMLElement): void {
    container.innerHTML = `
      <div class="flex items-center justify-center p-8 text-red-600">
        <span>Failed to load content</span>
      </div>
    `;
  }
}

/**
 * Utility functions for lazy loading
 */
export const lazyLoadingUtils = {
  /**
   * Create lazy image loader
   */
  createImageLoader(options?: LazyImageOptions): LazyImageLoader {
    return new LazyImageLoader(options);
  },

  /**
   * Create lazy component loader
   */
  createComponentLoader(
    loadCallback: (element: Element) => void,
    options?: LazyLoadOptions
  ): LazyComponentLoader {
    return new LazyComponentLoader(loadCallback, options);
  },

  /**
   * Create lazy content loader
   */
  createContentLoader(
    contentUrl: string,
    options?: LazyLoadOptions
  ): LazyContentLoader {
    return new LazyContentLoader(contentUrl, options);
  },

  /**
   * Lazy load all images with data-src attribute
   */
  lazyLoadImages(options?: LazyImageOptions): void {
    const images = document.querySelectorAll('img[data-src]');
    const loader = new LazyImageLoader(options);
    
    images.forEach(img => loader.observe(img));
  },

  /**
   * Lazy load all elements with data-lazy attribute
   */
  lazyLoadElements(loadCallback: (element: Element) => void, options?: LazyLoadOptions): void {
    const elements = document.querySelectorAll('[data-lazy]');
    const loader = new LazyComponentLoader(loadCallback, options);
    
    elements.forEach(element => loader.observe(element));
  }
};

// Auto-initialize lazy loading for images
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    lazyLoadingUtils.lazyLoadImages();
  });
}
