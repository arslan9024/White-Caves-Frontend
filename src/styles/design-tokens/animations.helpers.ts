// @ts-nocheck
import type { AnimationPreset } from './animations.types';

/**
 * Helper function: Apply animation to element
 * @param {HTMLElement} element - Target element
 * @param {Object} animationPreset - Animation preset from ANIMATION_PRESETS
 */
export const applyAnimation = (element: HTMLElement | null, animationPreset: AnimationPreset) => {
  if (!element) return;

  const {
    name,
    duration = 300,
    easing = 'ease-in-out',
    delay = 0,
    fillMode = 'both',
    iterationCount = '1',
  } = animationPreset;

  // Inject keyframes if not already present
  if (animationPreset.keyframes && !document.getElementById(`animation-${name}`)) {
    const styleElement = document.createElement('style');
    styleElement.id = `animation-${name}`;
    styleElement.textContent = animationPreset.keyframes;
    document.head.appendChild(styleElement);
  }

  // Apply animation
  element.style.animation = `${name} ${duration}ms ${easing} ${delay}ms ${iterationCount} ${fillMode}`;
};

/**
 * Helper function: Remove animation from element
 * @param {HTMLElement} element - Target element
 */
export const removeAnimation = (element: HTMLElement | null) => {
  if (!element) return;
  element.style.animation = 'none';
};

/**
 * Helper function: Get CSS string for animations
 * @param {Object} preset - Animation preset
 * @returns {string} CSS animation string
 */
export const getAnimationCSS = (preset: AnimationPreset) => {
  const {
    name,
    duration = 300,
    easing = 'ease-in-out',
    delay = 0,
    fillMode = 'both',
    iterationCount = '1',
  } = preset;

  return `animation: ${name} ${duration}ms ${easing} ${delay}ms ${iterationCount} ${fillMode};`;
};

/**
 * Helper function: Get Tailwind animation class
 * @param {string} animationName - Name of animation
 * @returns {string} Tailwind animation utility class
 */
export const getTailwindAnimationClass = (animationName: string) => {
  const tailwindMap: Record<string, string> = {
    spin: 'animate-spin',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    slideDown: 'animate-slide-down',
  };

  return tailwindMap[animationName] || '';
};

