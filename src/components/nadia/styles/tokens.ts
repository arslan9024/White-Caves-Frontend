/**
 * NADIA Components - Design Tokens
 * Bridge from local API to centralized White Caves theme tokens
 */

import { theme } from '../../../styles/theme';

const { spacing, radius, shadows, transitions, colors, typography } = theme;

/**
 * Design tokens — bridge from local API to centralized theme.
 * Keeps all tokens.xxx references working while pulling from
 * the single source of truth in styles/theme.
 */
export const tokens = {
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    danger: colors.error,
    warning: colors.warning,
    success: colors.success,
    background: {
      primary: colors.background.primary,
      secondary: colors.background.tertiary,
    },
    surface: {
      primary: colors.background.secondary,
      secondary: colors.background.tertiary,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      tertiary: colors.text.tertiary,
    },
    border: {
      subtle: colors.border,
      light: colors.borderDark,
      dark: '#9CA3AF',
    },
  },
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
  },
  borderRadius: {
    sm: radius.sm,
    md: radius.lg, // nadia md (8px) = theme lg (8px)
    lg: radius.xl, // nadia lg (12px) = theme xl (12px)
    xl: radius.xxl, // nadia xl (16px) = theme xxl (16px)
  },
  shadows: {
    sm: shadows.sm,
    md: shadows.md,
    lg: shadows.lg,
  },
  transitions: {
    fast: `${transitions.durations.shorter} ${transitions.easing.easeInOut}`,
    base: `${transitions.durations.short} ${transitions.easing.easeInOut}`,
    slow: `${transitions.durations.long} ${transitions.easing.easeInOut}`,
  },
};

export { radius, typography };
