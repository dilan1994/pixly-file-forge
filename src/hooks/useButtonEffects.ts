import { useEffect, useRef, useCallback } from 'react';
import { buttonEffects, ButtonEffectOptions } from '@/utils/buttonEffects';

/**
 * React hook for integrating futuristic button effects
 */
export const useButtonEffects = (options: ButtonEffectOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      buttonEffects.initializeButton(element, options);
    }
  }, [options]);

  const triggerGradientFlow = useCallback(() => {
    const element = elementRef.current;
    if (element) {
      element.classList.add('gradient-active');
      setTimeout(() => {
        element.classList.remove('gradient-active');
      }, 800);
    }
  }, []);

  const addShimmer = useCallback((duration?: number) => {
    const element = elementRef.current;
    if (element) {
      buttonEffects.addShimmerEffect(element, duration);
    }
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    const element = elementRef.current;
    if (element) {
      buttonEffects.setLoadingState(element, loading);
    }
  }, []);

  const triggerSuccess = useCallback(() => {
    const element = elementRef.current;
    if (element) {
      buttonEffects.triggerSuccessAnimation(element);
    }
  }, []);

  return {
    ref: elementRef,
    triggerGradientFlow,
    addShimmer,
    setLoading,
    triggerSuccess
  };
};

/**
 * Hook for conversion tab effects
 */
export const useConversionTabEffects = () => {
  return useButtonEffects({
    gradientFlow: true,
    rippleEffect: true,
    pulseOnActive: true
  });
};

/**
 * Hook for navigation button effects
 */
export const useNavButtonEffects = () => {
  return useButtonEffects({
    gradientFlow: true,
    rippleEffect: true,
    pulseOnActive: true
  });
};

/**
 * Hook for action button effects
 */
export const useActionButtonEffects = () => {
  return useButtonEffects({
    gradientFlow: true,
    rippleEffect: true,
    pulseOnActive: false
  });
}; 