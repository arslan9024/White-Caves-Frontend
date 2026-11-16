// @ts-nocheck
/**
 * Animation Presets Library
 * Centralized animation definitions for consistent motion across app
 * Uses CSS keyframes compatible with Tailwind, CSS-in-JS, and Framer Motion
 * All animations follow WCAG AAA guidelines (respect prefers-reduced-motion)
 * 
 * @version 1.0
 * @lastUpdated January 16, 2026
 */

import { TRANSITION_PRESETS } from './animations.transitions';
import { EFFECT_PRESETS } from './animations.effects';

export const ANIMATION_PRESETS = {
  ...TRANSITION_PRESETS,
  ...EFFECT_PRESETS,
};

export {
  applyAnimation,
  removeAnimation,
  getAnimationCSS,
  getTailwindAnimationClass,
} from './animations.helpers';

export default ANIMATION_PRESETS;
export type * from './animations.types';
export * from './animations.transitions';
export * from './animations.effects';
export * from './animations.helpers';

