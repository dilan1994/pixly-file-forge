import { useState, useEffect, useCallback, useRef } from 'react';

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface GestureState {
  isActive: boolean;
  gestureType: 'none' | 'swipe' | 'pinch' | 'drag' | 'tap' | 'longpress';
  direction: 'up' | 'down' | 'left' | 'right' | null;
  distance: number;
  scale: number;
  velocity: number;
  deltaX: number;
  deltaY: number;
  startPoint: TouchPoint | null;
  currentPoint: TouchPoint | null;
}

interface GestureCallbacks {
  onSwipe?: (direction: 'up' | 'down' | 'left' | 'right', distance: number, velocity: number) => void;
  onPinch?: (scale: number, center: { x: number; y: number }) => void;
  onDrag?: (deltaX: number, deltaY: number, startPoint: TouchPoint, currentPoint: TouchPoint) => void;
  onTap?: (point: TouchPoint) => void;
  onLongPress?: (point: TouchPoint) => void;
  onGestureStart?: (gestureType: string) => void;
  onGestureEnd?: (gestureType: string) => void;
}

interface GestureOptions {
  swipeThreshold?: number;
  pinchThreshold?: number;
  longPressDelay?: number;
  tapMaxDistance?: number;
  velocityThreshold?: number;
  preventDefault?: boolean;
}

const defaultOptions: Required<GestureOptions> = {
  swipeThreshold: 50,
  pinchThreshold: 0.1,
  longPressDelay: 500,
  tapMaxDistance: 10,
  velocityThreshold: 0.3,
  preventDefault: true
};

export const useGestures = (
  elementRef: React.RefObject<HTMLElement>,
  callbacks: GestureCallbacks = {},
  options: GestureOptions = {}
) => {
  const opts = { ...defaultOptions, ...options };
  
  const [gestureState, setGestureState] = useState<GestureState>({
    isActive: false,
    gestureType: 'none',
    direction: null,
    distance: 0,
    scale: 1,
    velocity: 0,
    deltaX: 0,
    deltaY: 0,
    startPoint: null,
    currentPoint: null
  });

  const touchStartRef = useRef<TouchPoint[]>([]);
  const touchCurrentRef = useRef<TouchPoint[]>([]);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initialDistanceRef = useRef<number>(0);
  const lastScaleRef = useRef<number>(1);

  // Helper function to get touch point
  const getTouchPoint = useCallback((touch: Touch): TouchPoint => ({
    x: touch.clientX,
    y: touch.clientY,
    timestamp: Date.now()
  }), []);

  // Calculate distance between two points
  const getDistance = useCallback((point1: TouchPoint, point2: TouchPoint): number => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Calculate velocity
  const getVelocity = useCallback((start: TouchPoint, end: TouchPoint): number => {
    const distance = getDistance(start, end);
    const time = (end.timestamp - start.timestamp) / 1000; // Convert to seconds
    return time > 0 ? distance / time : 0;
  }, [getDistance]);

  // Get swipe direction
  const getSwipeDirection = useCallback((start: TouchPoint, end: TouchPoint): 'up' | 'down' | 'left' | 'right' => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? 'right' : 'left';
    } else {
      return dy > 0 ? 'down' : 'up';
    }
  }, []);

  // Calculate pinch scale
  const getPinchScale = useCallback((touches: TouchPoint[]): number => {
    if (touches.length < 2) return 1;
    
    const currentDistance = getDistance(touches[0], touches[1]);
    
    if (initialDistanceRef.current === 0) {
      initialDistanceRef.current = currentDistance;
      return 1;
    }
    
    return currentDistance / initialDistanceRef.current;
  }, [getDistance]);

  // Get center point of pinch gesture
  const getPinchCenter = useCallback((touches: TouchPoint[]): { x: number; y: number } => {
    if (touches.length < 2) return { x: 0, y: 0 };
    
    return {
      x: (touches[0].x + touches[1].x) / 2,
      y: (touches[0].y + touches[1].y) / 2
    };
  }, []);

  // Clear long press timer
  const clearLongPressTimer = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  // Handle touch start
  const handleTouchStart = useCallback((event: TouchEvent) => {
    if (opts.preventDefault) {
      event.preventDefault();
    }

    const touches = Array.from(event.touches).map(getTouchPoint);
    touchStartRef.current = touches;
    touchCurrentRef.current = touches;
    
    clearLongPressTimer();
    
    if (touches.length === 1) {
      // Single touch - potential tap, long press, or swipe
      const point = touches[0];
      
      setGestureState(prev => ({
        ...prev,
        isActive: true,
        gestureType: 'none',
        startPoint: point,
        currentPoint: point,
        deltaX: 0,
        deltaY: 0
      }));

      // Start long press timer
      longPressTimerRef.current = setTimeout(() => {
        setGestureState(prev => ({
          ...prev,
          gestureType: 'longpress'
        }));
        callbacks.onLongPress?.(point);
        callbacks.onGestureStart?.('longpress');
      }, opts.longPressDelay);
      
    } else if (touches.length === 2) {
      // Two touches - pinch gesture
      initialDistanceRef.current = getDistance(touches[0], touches[1]);
      lastScaleRef.current = 1;
      
      setGestureState(prev => ({
        ...prev,
        isActive: true,
        gestureType: 'pinch',
        scale: 1
      }));
      
      callbacks.onGestureStart?.('pinch');
    }
  }, [opts.preventDefault, opts.longPressDelay, getTouchPoint, clearLongPressTimer, getDistance, callbacks]);

  // Handle touch move
  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (opts.preventDefault) {
      event.preventDefault();
    }

    const touches = Array.from(event.touches).map(getTouchPoint);
    touchCurrentRef.current = touches;
    
    if (!gestureState.isActive || touchStartRef.current.length === 0) return;

    if (touches.length === 1 && touchStartRef.current.length === 1) {
      // Single touch movement
      const startPoint = touchStartRef.current[0];
      const currentPoint = touches[0];
      const distance = getDistance(startPoint, currentPoint);
      const deltaX = currentPoint.x - startPoint.x;
      const deltaY = currentPoint.y - startPoint.y;
      
      clearLongPressTimer();
      
      if (distance > opts.tapMaxDistance) {
        // Movement detected - this is a drag
        setGestureState(prev => ({
          ...prev,
          gestureType: 'drag',
          currentPoint,
          distance,
          deltaX,
          deltaY
        }));
        
        callbacks.onDrag?.(deltaX, deltaY, startPoint, currentPoint);
        
        if (gestureState.gestureType !== 'drag') {
          callbacks.onGestureStart?.('drag');
        }
      }
      
    } else if (touches.length === 2 && touchStartRef.current.length === 2) {
      // Two touch movement - pinch
      const scale = getPinchScale(touches);
      const center = getPinchCenter(touches);
      
      setGestureState(prev => ({
        ...prev,
        scale
      }));
      
      callbacks.onPinch?.(scale, center);
    }
  }, [
    opts.preventDefault,
    opts.tapMaxDistance,
    gestureState.isActive,
    gestureState.gestureType,
    getTouchPoint,
    getDistance,
    clearLongPressTimer,
    getPinchScale,
    getPinchCenter,
    callbacks
  ]);

  // Handle touch end
  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (opts.preventDefault) {
      event.preventDefault();
    }

    clearLongPressTimer();
    
    if (!gestureState.isActive || touchStartRef.current.length === 0) return;

    const endTouches = Array.from(event.changedTouches).map(getTouchPoint);
    
    if (touchStartRef.current.length === 1 && endTouches.length === 1) {
      const startPoint = touchStartRef.current[0];
      const endPoint = endTouches[0];
      const distance = getDistance(startPoint, endPoint);
      const velocity = getVelocity(startPoint, endPoint);
      
      if (gestureState.gestureType === 'none' && distance <= opts.tapMaxDistance) {
        // Tap gesture
        callbacks.onTap?.(endPoint);
        callbacks.onGestureStart?.('tap');
        callbacks.onGestureEnd?.('tap');
        
      } else if (distance >= opts.swipeThreshold && velocity >= opts.velocityThreshold) {
        // Swipe gesture
        const direction = getSwipeDirection(startPoint, endPoint);
        
        setGestureState(prev => ({
          ...prev,
          gestureType: 'swipe',
          direction,
          distance,
          velocity
        }));
        
        callbacks.onSwipe?.(direction, distance, velocity);
        callbacks.onGestureStart?.('swipe');
        callbacks.onGestureEnd?.('swipe');
      }
    }
    
    // End gesture
    if (gestureState.gestureType !== 'none') {
      callbacks.onGestureEnd?.(gestureState.gestureType);
    }
    
    // Reset state
    setGestureState({
      isActive: false,
      gestureType: 'none',
      direction: null,
      distance: 0,
      scale: 1,
      velocity: 0,
      deltaX: 0,
      deltaY: 0,
      startPoint: null,
      currentPoint: null
    });
    
    touchStartRef.current = [];
    touchCurrentRef.current = [];
    initialDistanceRef.current = 0;
    lastScaleRef.current = 1;
  }, [
    opts.preventDefault,
    opts.tapMaxDistance,
    opts.swipeThreshold,
    opts.velocityThreshold,
    gestureState.isActive,
    gestureState.gestureType,
    getTouchPoint,
    getDistance,
    getVelocity,
    getSwipeDirection,
    clearLongPressTimer,
    callbacks
  ]);

  // Setup event listeners
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Add touch event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });
    element.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
      clearLongPressTimer();
    };
  }, [elementRef, handleTouchStart, handleTouchMove, handleTouchEnd, clearLongPressTimer]);

  return {
    gestureState,
    isGestureActive: gestureState.isActive,
    currentGesture: gestureState.gestureType,
    
    // Utility functions
    resetGesture: () => {
      clearLongPressTimer();
      setGestureState({
        isActive: false,
        gestureType: 'none',
        direction: null,
        distance: 0,
        scale: 1,
        velocity: 0,
        deltaX: 0,
        deltaY: 0,
        startPoint: null,
        currentPoint: null
      });
    }
  };
}; 