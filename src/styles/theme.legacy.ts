// src/styles/theme.legacy.ts
// Legacy design tokens and aliases for backwards compatibility

import { lightTheme, MEDIA_QUERIES } from './theme.base';

const legacyColors = {
  ...lightTheme.colors,
  dark: {
    bg: '#111827',
  },
  primaryDark: '#B91C1C',
  primaryLight: 'rgba(239, 68, 68, 0.12)',
  primaryVeryLight: 'rgba(239, 68, 68, 0.05)',
  secondaryDark: '#0F172A',
  luxury: {
    redShimmer: 'linear-gradient(135deg, #EF4444 0%, #F87171 50%, #EF4444 100%)',
    redToSlate: 'linear-gradient(135deg, #EF4444 0%, #1E293B 100%)',
    slateDeep: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
    redDark: 'linear-gradient(180deg, #EF4444, #B91C1C)',
    warmWhite: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
    premiumLight: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
  },
  border: lightTheme.colors.border.medium,
  borderDark: lightTheme.colors.border.dark,
  background: {
    ...lightTheme.colors.background,
    dark: '#1E293B',
  },
  a11y: {
    goldText: '#8A6A1D',
    goldLargeText: '#A07822',
    goldUI: '#B8922F',
    focusRing: '#2563EB',
    errorText: '#B91C1C',
    warningText: '#B45309',
  },
};

const legacyTypography = {
  ...lightTheme.typography,
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
  fontFamily: {
    primary: 'Inter, system-ui, -apple-system, sans-serif',
    heading: 'Inter, system-ui, -apple-system, sans-serif',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    base: '1rem',
    lg: '1.125rem',
    xl: lightTheme.typography.h5.size,
    xxl: lightTheme.typography.h3.size,
    xxxl: lightTheme.typography.h2.size,
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  styles: {
    h1: lightTheme.typography.h1,
    h2: lightTheme.typography.h2,
    h3: lightTheme.typography.h3,
    h4: lightTheme.typography.h4,
    h5: lightTheme.typography.h5,
    h6: lightTheme.typography.body,
    body: lightTheme.typography.body,
  },
};

const legacyTransitions = {
  ...lightTheme.transitions,
  all: lightTheme.transitions.standard,
  active: lightTheme.transitions.standard,
  hover: lightTheme.transitions.fast,
  color: lightTheme.transitions.standard,
  background: lightTheme.transitions.standard,
  create: (property: string, duration: string) =>
    `${property} ${duration} ${lightTheme.easing.inOut}`,
  durations: {
    shortest: '120ms',
    shorter: '150ms',
    short: '200ms',
    standard: '250ms',
    long: '300ms',
    complex: '300ms',
  },
  easing: {
    ...lightTheme.easing,
    easeOut: lightTheme.easing.out,
    easeInOut: lightTheme.easing.inOut,
  },
};

const legacyRadius = {
  ...lightTheme.borderRadius,
  xxl: lightTheme.borderRadius.xl,
};

const legacySpacing = {
  ...lightTheme.spacing,
  xs: lightTheme.spacing[1],
  sm: lightTheme.spacing[2],
  md: lightTheme.spacing[4],
  lg: lightTheme.spacing[6],
  xl: lightTheme.spacing[8],
  xxl: lightTheme.spacing[12],
  xxxl: lightTheme.spacing[16],
};

const legacyShadows = {
  ...lightTheme.shadows,
  focus: `0 0 0 3px ${legacyColors.a11y.focusRing}33`,
};

// Extract individual color/spacing objects for backward compatibility
export const COLORS = legacyColors;
export const SPACING = legacySpacing;

// Backwards-compatible alias
export const theme = {
  ...lightTheme,
  colors: legacyColors,
  typography: legacyTypography,
  transitions: legacyTransitions,
  radius: legacyRadius,
  spacing: legacySpacing,
  shadows: legacyShadows,
  mediaQueries: MEDIA_QUERIES,
};

// Backwards-compatible named exports for individual tokens
export const colors = legacyColors;
export const typography = legacyTypography;
export const transitions = legacyTransitions;
export const radius = legacyRadius;
export const spacing = legacySpacing;
export const shadows = legacyShadows;

export default theme;

