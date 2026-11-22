import { theme } from '../../../styles/theme/index';

export const { colors, spacing, radius, shadows, transitions, mediaQueries, typography } = theme;

export const typeSizes = typography?.sizes || {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  xxl: '1.5rem',
  xxxl: '2rem',
  display: '2.25rem',
};

export const typeWeights = typography?.weights || {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const reducedMotion = `@media (prefers-reduced-motion: reduce)`;
