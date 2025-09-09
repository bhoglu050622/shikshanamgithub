/**
 * Service Worker Registration and Management
 * Handles service worker lifecycle and communication
 */

export class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private isSupported = false;

  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'serviceWorker' in navigator;
  }

  /**
   * Register service worker
   */
  async register(): Promise<ServiceWorkerRegistration | null> {
    if (!this.isSupported) {
      console.log('Service Worker: Not supported in this browser');
      return null;
    }

    // Skip service worker registration in development to avoid conflicts with dev tools
    if (process.env.NODE_ENV === 'development') {
      console.log('Service Worker: Skipping registration in development mode');
      return null;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker: Registered successfully', this.registration);

      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        this.handleUpdate();
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        this.handleControllerChange();
      });

      return this.registration;
    } catch (error) {
      console.error('Service Worker: Registration failed', error);
      return null;
    }
  }

  /**
   * Handle service worker updates
   */
  private handleUpdate(): void {
    if (!this.registration) return;

    const newWorker = this.registration.installing;
    if (!newWorker) return;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New service worker is available
        this.showUpdateNotification();
      }
    });
  }

  /**
   * Handle controller change
   */
  private handleControllerChange(): void {
    console.log('Service Worker: New controller activated');
    // Reload the page to use the new service worker
    window.location.reload();
  }

  /**
   * Show update notification to user
   */
  private showUpdateNotification(): void {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
    notification.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-semibold">Update Available</h3>
          <p class="text-sm mt-1">A new version of the app is available.</p>
        </div>
        <button id="update-btn" class="ml-4 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
          Update
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Handle update button click
    const updateBtn = notification.querySelector('#update-btn');
    updateBtn?.addEventListener('click', () => {
      this.updateServiceWorker();
      notification.remove();
    });

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 10000);
  }

  /**
   * Update service worker
   */
  async updateServiceWorker(): Promise<void> {
    if (!this.registration) return;

    try {
      const newWorker = this.registration.waiting;
      if (newWorker) {
        // Tell the new service worker to skip waiting
        newWorker.postMessage({ type: 'SKIP_WAITING' });
      }
    } catch (error) {
      console.error('Service Worker: Update failed', error);
    }
  }

  /**
   * Check for updates
   */
  async checkForUpdates(): Promise<void> {
    if (!this.registration) return;

    try {
      await this.registration.update();
    } catch (error) {
      console.error('Service Worker: Check for updates failed', error);
    }
  }

  /**
   * Get service worker version
   */
  async getVersion(): Promise<string | null> {
    if (!this.registration) return null;

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.version || null);
      };

      if (this.registration?.active) {
        this.registration.active.postMessage(
          { type: 'GET_VERSION' },
          [messageChannel.port2]
        );
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Unregister service worker
   */
  async unregister(): Promise<boolean> {
    if (!this.registration) return false;

    try {
      const result = await this.registration.unregister();
      this.registration = null;
      console.log('Service Worker: Unregistered successfully');
      return result;
    } catch (error) {
      console.error('Service Worker: Unregistration failed', error);
      return false;
    }
  }

  /**
   * Check if service worker is supported
   */
  isServiceWorkerSupported(): boolean {
    return this.isSupported;
  }

  /**
   * Get registration status
   */
  getRegistration(): ServiceWorkerRegistration | null {
    return this.registration;
  }
}

// Create singleton instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Auto-register service worker in browser environment
if (typeof window !== 'undefined') {
  // In development, unregister any existing service workers to prevent conflicts
  if (process.env.NODE_ENV === 'development') {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  } else {
    // Register service worker when DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        serviceWorkerManager.register();
      });
    } else {
      serviceWorkerManager.register();
    }

    // Check for updates every hour
    setInterval(() => {
      serviceWorkerManager.checkForUpdates();
    }, 60 * 60 * 1000);
  }
}
