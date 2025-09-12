/**
 * Touch Gesture Recognition
 * Comprehensive touch gesture handling for mobile interactions
 */

import { TouchPoint, TouchGesture, GestureConfig, GestureHandler } from './types';

// ============================================================================
// TOUCH GESTURE RECOGNITION
// ============================================================================

export class TouchGestureRecognizer {
  private config: GestureConfig;
  private handlers: GestureHandler;
  private touchPoints: Map<number, TouchPoint> = new Map();
  private gestureStartTime: number = 0;
  private gestureStartPoint: TouchPoint | null = null;
  private longPressTimer: NodeJS.Timeout | null = null;
  private doubleTapTimer: NodeJS.Timeout | null = null;
  private lastTapTime: number = 0;

  constructor(config: Partial<GestureConfig> = {}, handlers: GestureHandler = {}) {
    this.config = {
      enableSwipe: true,
      enablePinch: true,
      enablePan: true,
      enableTap: true,
      enableLongPress: true,
      swipeThreshold: 50,
      pinchThreshold: 0.1,
      panThreshold: 10,
      longPressDelay: 500,
      doubleTapDelay: 300,
      ...config,
    };
    this.handlers = handlers;
  }

  public handleTouchStart = (event: TouchEvent): void => {
    event.preventDefault();
    
    const now = Date.now();
    this.gestureStartTime = now;
    
    // Store initial touch points
    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches[i];
      const point: TouchPoint = {
        x: touch.clientX,
        y: touch.clientY,
        identifier: touch.identifier,
        timestamp: now,
      };
      this.touchPoints.set(touch.identifier, point);
    }

    // Set initial gesture point
    if (event.touches.length === 1) {
      this.gestureStartPoint = this.touchPoints.get(event.touches[0].identifier) || null;
    }

    // Start long press timer
    if (this.config.enableLongPress && event.touches.length === 1) {
      this.longPressTimer = setTimeout(() => {
        if (this.gestureStartPoint) {
          this.handlers.onLongPress?.();
        }
      }, this.config.longPressDelay);
    }
  };

  public handleTouchMove = (event: TouchEvent): void => {
    event.preventDefault();
    
    // Clear long press timer on movement
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    // Update touch points
    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches[i];
      const point: TouchPoint = {
        x: touch.clientX,
        y: touch.clientY,
        identifier: touch.identifier,
        timestamp: Date.now(),
      };
      this.touchPoints.set(touch.identifier, point);
    }

    // Handle different gesture types
    if (event.touches.length === 1) {
      this.handleSingleTouchMove(event);
    } else if (event.touches.length === 2) {
      this.handleTwoTouchMove(event);
    }
  };

  public handleTouchEnd = (event: TouchEvent): void => {
    event.preventDefault();
    
    const now = Date.now();
    const duration = now - this.gestureStartTime;

    // Clear timers
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    // Handle gesture completion
    if (event.touches.length === 0 && this.gestureStartPoint) {
      this.handleGestureEnd(duration);
    }

    // Remove ended touch points
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      this.touchPoints.delete(touch.identifier);
    }
  };

  private handleSingleTouchMove = (event: TouchEvent): void => {
    if (!this.gestureStartPoint || event.touches.length !== 1) return;

    const currentTouch = event.touches[0];
    const currentPoint: TouchPoint = {
      x: currentTouch.clientX,
      y: currentTouch.clientY,
      identifier: currentTouch.identifier,
      timestamp: Date.now(),
    };

    const deltaX = currentPoint.x - this.gestureStartPoint.x;
    const deltaY = currentPoint.y - this.gestureStartPoint.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Handle pan gesture
    if (this.config.enablePan && distance > this.config.panThreshold) {
      this.handlers.onPan?.(deltaX, deltaY);
    }
  };

  private handleTwoTouchMove = (event: TouchEvent): void => {
    if (event.touches.length !== 2) return;

    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    // Calculate distance between touches
    const distance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );

    // Get initial distance if available
    const initialPoints = Array.from(this.touchPoints.values());
    if (initialPoints.length >= 2) {
      const initialDistance = Math.sqrt(
        Math.pow(initialPoints[1].x - initialPoints[0].x, 2) +
        Math.pow(initialPoints[1].y - initialPoints[0].y, 2)
      );

      const scale = distance / initialDistance;
      
      // Handle pinch gesture
      if (this.config.enablePinch && Math.abs(scale - 1) > this.config.pinchThreshold) {
        this.handlers.onPinch?.(scale);
      }
    }
  };

  private handleGestureEnd = (duration: number): void => {
    if (!this.gestureStartPoint) return;

    const currentPoint = Array.from(this.touchPoints.values())[0];
    if (!currentPoint) return;

    const deltaX = currentPoint.x - this.gestureStartPoint.x;
    const deltaY = currentPoint.y - this.gestureStartPoint.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Determine gesture type based on movement and duration
    if (distance < this.config.swipeThreshold && duration < 300) {
      // Tap gesture
      this.handleTap();
    } else if (distance >= this.config.swipeThreshold && duration < 500) {
      // Swipe gesture
      this.handleSwipe(deltaX, deltaY);
    }
  };

  private handleTap = (): void => {
    const now = Date.now();
    
    if (this.config.enableTap) {
      if (now - this.lastTapTime < this.config.doubleTapDelay) {
        // Double tap
        this.handlers.onDoubleTap?.();
        this.lastTapTime = 0; // Reset to prevent triple tap
      } else {
        // Single tap
        this.handlers.onTap?.();
        this.lastTapTime = now;
      }
    }
  };

  private handleSwipe = (deltaX: number, deltaY: number): void => {
    if (!this.config.enableSwipe) return;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    let direction: 'up' | 'down' | 'left' | 'right';

    if (absX > absY) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    this.handlers.onSwipe?.(direction);
  };

  public destroy(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }
    if (this.doubleTapTimer) {
      clearTimeout(this.doubleTapTimer);
    }
    this.touchPoints.clear();
  }
}

// ============================================================================
// TOUCH FEEDBACK UTILITIES
// ============================================================================

export function vibrate(pattern: number | number[]): void {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) return;
  
  try {
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('Vibration not supported:', error);
  }
}

export function hapticFeedback(type: 'light' | 'medium' | 'heavy' = 'medium'): void {
  if (typeof window === 'undefined') return;

  const patterns = {
    light: [10],
    medium: [20],
    heavy: [30],
  };

  vibrate(patterns[type]);
}

export function visualFeedback(element: HTMLElement, type: 'tap' | 'long-press' = 'tap'): void {
  if (!element) return;

  const classes = {
    tap: 'touch-feedback-tap',
    'long-press': 'touch-feedback-long-press',
  };

  element.classList.add(classes[type]);
  
  setTimeout(() => {
    element.classList.remove(classes[type]);
  }, 150);
}

// ============================================================================
// TOUCH TARGET UTILITIES
// ============================================================================

export function ensureTouchTarget(element: HTMLElement, minSize: number = 44): void {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const currentSize = Math.min(rect.width, rect.height);

  if (currentSize < minSize) {
    const padding = (minSize - currentSize) / 2;
    element.style.padding = `${padding}px`;
  }
}

export function isTouchTarget(element: HTMLElement, minSize: number = 44): boolean {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const size = Math.min(rect.width, rect.height);
  
  return size >= minSize;
}

// ============================================================================
// GESTURE HOOKS
// ============================================================================

export function useTouchGestures(
  element: HTMLElement | null,
  handlers: GestureHandler,
  config: Partial<GestureConfig> = {}
): (() => void) | void {
  if (typeof window === 'undefined' || !element) return;

  const recognizer = new TouchGestureRecognizer(config, handlers);

  element.addEventListener('touchstart', recognizer.handleTouchStart, { passive: false });
  element.addEventListener('touchmove', recognizer.handleTouchMove, { passive: false });
  element.addEventListener('touchend', recognizer.handleTouchEnd, { passive: false });

  return () => {
    element.removeEventListener('touchstart', recognizer.handleTouchStart);
    element.removeEventListener('touchmove', recognizer.handleTouchMove);
    element.removeEventListener('touchend', recognizer.handleTouchEnd);
    recognizer.destroy();
  };
}

// ============================================================================
// SWIPE DETECTION UTILITIES
// ============================================================================

export function detectSwipeDirection(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  threshold: number = 50
): 'up' | 'down' | 'left' | 'right' | null {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  if (absX < threshold && absY < threshold) {
    return null;
  }

  if (absX > absY) {
    return deltaX > 0 ? 'right' : 'left';
  } else {
    return deltaY > 0 ? 'down' : 'up';
  }
}

export function calculateSwipeVelocity(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  duration: number
): number {
  const distance = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  );
  
  return distance / duration;
}

// ============================================================================
// PINCH DETECTION UTILITIES
// ============================================================================

export function calculatePinchScale(
  startDistance: number,
  currentDistance: number
): number {
  return currentDistance / startDistance;
}

export function calculatePinchCenter(
  touch1: Touch,
  touch2: Touch
): { x: number; y: number } {
  return {
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2,
  };
}
