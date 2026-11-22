import { theme } from '../../../../styles/theme';

export const { spacing, radius, shadows, transitions, colors, mediaQueries } = theme;

/* ═══ Motion a11y ══════════════════════════════════
   Reduce all transforms / animations for users who
   prefer reduced motion (OS-level setting).          */
export const reducedMotion = `@media (prefers-reduced-motion: reduce)`;
