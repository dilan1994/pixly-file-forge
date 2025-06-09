/**
 * Futuristic Button Effects Utility
 * Handles gradient flow animations, ripple effects, and interactive button states
 */

export interface ButtonEffectOptions {
  duration?: number;
  rippleColor?: string;
  gradientFlow?: boolean;
  rippleEffect?: boolean;
  pulseOnActive?: boolean;
}

export class ButtonEffectsManager {
  private static instance: ButtonEffectsManager;
  private activeButtons: Set<HTMLElement> = new Set();

  static getInstance(): ButtonEffectsManager {
    if (!ButtonEffectsManager.instance) {
      ButtonEffectsManager.instance = new ButtonEffectsManager();
    }
    return ButtonEffectsManager.instance;
  }

  /**
   * Initialize button effects for an element
   */
  initializeButton(
    element: HTMLElement, 
    options: ButtonEffectOptions = {}
  ): void {
    const {
      duration = 800,
      gradientFlow = true,
      rippleEffect = true,
      pulseOnActive = false
    } = options;

    // Add event listeners for gradient flow
    if (gradientFlow) {
      element.addEventListener('click', (e) => this.triggerGradientFlow(element, e));
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          this.triggerGradientFlow(element, e);
        }
      });
    }

    // Add event listeners for ripple effect
    if (rippleEffect) {
      element.addEventListener('click', (e) => this.createRipple(element, e));
    }

    // Add pulse effect for active states
    if (pulseOnActive) {
      this.observeActiveState(element);
    }

    // Store element reference
    this.activeButtons.add(element);
  }

  /**
   * Trigger gradient flow animation
   */
  private triggerGradientFlow(element: HTMLElement, event: Event): void {
    // Remove existing gradient-active class
    element.classList.remove('gradient-active');
    
    // Force reflow
    element.offsetHeight;
    
    // Add gradient-active class to trigger animation
    element.classList.add('gradient-active');
    
    // Remove class after animation completes
    setTimeout(() => {
      element.classList.remove('gradient-active');
    }, 800);
  }

  /**
   * Create ripple effect
   */
  private createRipple(element: HTMLElement, event: MouseEvent | KeyboardEvent): void {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const radius = size / 2;

    let x: number, y: number;

    if (event instanceof MouseEvent) {
      x = event.clientX - rect.left - radius;
      y = event.clientY - rect.top - radius;
    } else {
      // For keyboard events, center the ripple
      x = rect.width / 2 - radius;
      y = rect.height / 2 - radius;
    }

    const ripple = document.createElement('span');
    ripple.className = 'button-ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove existing ripples
    const existingRipples = element.querySelectorAll('.button-ripple');
    existingRipples.forEach(r => r.remove());

    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  /**
   * Observe active state changes for pulse effect
   */
  private observeActiveState(element: HTMLElement): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const hasActive = element.classList.contains('active');
          if (hasActive) {
            element.style.animation = 'pulseGlow 2s ease-in-out infinite';
          } else {
            element.style.animation = '';
          }
        }
      });
    });

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  /**
   * Initialize all buttons with default effects
   */
  initializeAllButtons(): void {
    const buttonSelectors = [
      '.nav-button',
      '.tools-button',
      '.conversion-tab-inline',
      '.theme-btn',
      '.clock-format-toggle',
      '.nav-language-selector',
      '.feature-action-enhanced',
      '.explore-button'
    ];

    console.log('🎨 Initializing button effects...');

    buttonSelectors.forEach(selector => {
      const buttons = document.querySelectorAll<HTMLElement>(selector);
      console.log(`Found ${buttons.length} buttons for selector: ${selector}`);
      
      buttons.forEach((button, index) => {
        if (!this.activeButtons.has(button)) {
          console.log(`Initializing button ${index + 1} for ${selector}`);
          this.initializeButton(button, {
            gradientFlow: true,
            rippleEffect: true,
            pulseOnActive: selector.includes('nav-button') || selector.includes('conversion-tab')
          });
        }
      });
    });

    // Special handling for clock format toggle
    this.initializeClockFormatToggle();
  }

  /**
   * Special initialization for clock format toggle
   */
  private initializeClockFormatToggle(): void {
    // Wait a bit for React to render the component
    setTimeout(() => {
      const clockToggle = document.querySelector<HTMLElement>('.clock-format-toggle');
      if (clockToggle && !this.activeButtons.has(clockToggle)) {
        console.log('🕐 Initializing clock format toggle with special handling');
        this.initializeButton(clockToggle, {
          gradientFlow: true,
          rippleEffect: true,
          pulseOnActive: false
        });
      }
    }, 500);
  }

  /**
   * Add shimmer effect to button
   */
  addShimmerEffect(element: HTMLElement, duration: number = 2000): void {
    element.classList.add('button-shimmer');
    setTimeout(() => {
      element.classList.remove('button-shimmer');
    }, duration);
  }

  /**
   * Set button loading state
   */
  setLoadingState(element: HTMLElement, loading: boolean): void {
    if (loading) {
      element.classList.add('button-loading');
      element.setAttribute('disabled', 'true');
    } else {
      element.classList.remove('button-loading');
      element.removeAttribute('disabled');
    }
  }

  /**
   * Trigger success animation
   */
  triggerSuccessAnimation(element: HTMLElement): void {
    const originalText = element.textContent;
    const originalHTML = element.innerHTML;
    
    // Add success class
    element.classList.add('button-success');
    
    // Change content temporarily
    element.innerHTML = '<span>✓</span>';
    
    setTimeout(() => {
      element.classList.remove('button-success');
      element.innerHTML = originalHTML;
    }, 1500);
  }

  /**
   * Manually trigger gradient flow on any element
   */
  manuallyTriggerGradientFlow(element: HTMLElement): void {
    if (!element) return;
    
    console.log('🌊 Manually triggering gradient flow on:', element.className);
    
    // Ensure the element has the necessary styles
    if (!this.activeButtons.has(element)) {
      this.initializeButton(element, {
        gradientFlow: true,
        rippleEffect: true,
        pulseOnActive: false
      });
    }
    
    // Add immediate click effect
    element.classList.add('click-active');
    setTimeout(() => {
      element.classList.remove('click-active');
    }, 300);
    
    // Trigger the gradient flow with enhanced visibility
    element.classList.remove('gradient-active');
    // Force reflow
    element.offsetHeight;
    element.classList.add('gradient-active');
    
    // Add a temporary glow effect
    const originalBoxShadow = element.style.boxShadow;
    element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(147, 51, 234, 0.6)';
    
    // Remove the class and glow after animation
    setTimeout(() => {
      element.classList.remove('gradient-active');
      element.style.boxShadow = originalBoxShadow;
    }, 1200);
    
    // Add ripple effect at click position
    this.createManualRipple(element);
  }

  /**
   * Create manual ripple effect for better visibility
   */
  private createManualRipple(element: HTMLElement): void {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const radius = size / 2;

    // Center the ripple
    const x = rect.width / 2 - radius;
    const y = rect.height / 2 - radius;

    const ripple = document.createElement('span');
    ripple.className = 'button-ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.6) 50%, transparent 70%)';

    // Remove existing ripples
    const existingRipples = element.querySelectorAll('.button-ripple');
    existingRipples.forEach(r => r.remove());

    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 800);
  }

  /**
   * Clean up all button effects
   */
  cleanup(): void {
    this.activeButtons.forEach(button => {
      const ripples = button.querySelectorAll('.button-ripple');
      ripples.forEach(ripple => ripple.remove());
      
      button.classList.remove('gradient-active', 'button-shimmer', 'button-loading', 'button-success');
      button.style.animation = '';
    });
    
    this.activeButtons.clear();
  }

  /**
   * Get theme-appropriate colors
   */
  getThemeColors(): { primary: string; secondary: string; accent: string } {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    
    switch (theme) {
      case 'dark':
        return {
          primary: '#60a5fa',
          secondary: '#a855f7',
          accent: '#34d399'
        };
      default: // light
        return {
          primary: '#3b82f6',
          secondary: '#9333ea',
          accent: '#10b981'
        };
    }
  }
}

// Export singleton instance
export const buttonEffects = ButtonEffectsManager.getInstance();

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      buttonEffects.initializeAllButtons();
    });
  } else {
    buttonEffects.initializeAllButtons();
  }
  
  // Re-initialize when theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        setTimeout(() => buttonEffects.initializeAllButtons(), 100);
      }
    });
  });
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
} 