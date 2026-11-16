// @ts-nocheck
import type { AnimationPreset } from './animations.types';

export const TRANSITION_PRESETS: Record<string, AnimationPreset> = {
  // ============ PAGE TRANSITIONS ============

  pageTransitionSlide: {
    name: 'slideInUp',
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  },

  pageTransitionFade: {
    name: 'fadeIn',
    duration: 250,
    easing: 'ease-in-out',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  },

  pageTransitionScale: {
    name: 'scaleIn',
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
  },

  // ============ MODAL ANIMATIONS ============

  modalAppear: {
    name: 'modalIn',
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes modalIn {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
    `,
  },

  backdropFade: {
    name: 'backdropIn',
    duration: 300,
    easing: 'ease-in-out',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes backdropIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  },

  // ============ SLIDE ANIMATIONS ============

  slideDown: {
    name: 'slideDown',
    duration: 250,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  },

  slideUp: {
    name: 'slideUp',
    duration: 250,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  },

  slideLeft: {
    name: 'slideLeft',
    duration: 250,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes slideLeft {
        from {
          opacity: 0;
          transform: translateX(10px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
  },

  slideRight: {
    name: 'slideRight',
    duration: 250,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes slideRight {
        from {
          opacity: 0;
          transform: translateX(-10px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `,
  },

  // ============ FADE ANIMATIONS ============

  fadeOut: {
    name: 'fadeOut',
    duration: 200,
    easing: 'ease-in',
    delay: 0,
    fillMode: 'forwards',
    keyframes: `
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `,
  },

  fadeInScale: {
    name: 'fadeInScale',
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    delay: 0,
    fillMode: 'both',
    keyframes: `
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
  },
};

