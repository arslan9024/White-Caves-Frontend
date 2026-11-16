/**
 * Global Styles - CSS Variables Bridge
 * Maps JS design tokens -> CSS custom properties
 */

import { css } from 'styled-components';
import { theme } from './theme';

const themeColors = theme.colors as Record<string, unknown>;
const borderColor = String(themeColors.borderColor ?? themeColors.border ?? '#E5E7EB');
const borderDark = String(themeColors.borderDark ?? borderColor);
const borderLight = String(themeColors.borderLight ?? borderColor);

const primaryDark = (theme.colors as { primaryDark?: string }).primaryDark ?? theme.colors.primary;
const primaryLight = (theme.colors as { primaryLight?: string }).primaryLight ?? '#FCE4E6';
const primaryVeryLight =
  (theme.colors as { primaryVeryLight?: string }).primaryVeryLight ?? '#FFF5F5';
const secondaryDark =
  (theme.colors as { secondaryDark?: string }).secondaryDark ?? theme.colors.secondary;

const a11yColors = (
  theme.colors as {
    a11y?: {
      goldText?: string;
      goldLargeText?: string;
      goldUI?: string;
      focusRing?: string;
      errorText?: string;
      warningText?: string;
    };
  }
).a11y;

const a11yFocusRing = a11yColors?.focusRing ?? theme.colors.focus ?? theme.colors.info;
const a11yGoldText = a11yColors?.goldText ?? '#8A6A1D';
const a11yGoldLargeText = a11yColors?.goldLargeText ?? '#A07822';
const a11yGoldUI = a11yColors?.goldUI ?? theme.colors.primary;
const a11yErrorText = a11yColors?.errorText ?? theme.colors.error;
const a11yWarningText = a11yColors?.warningText ?? theme.colors.warning;

const fontHeading =
  (theme.typography as { fontFamily?: { heading?: string } }).fontFamily?.heading ??
  'Inter, system-ui, -apple-system, sans-serif';
const fontBody =
  (theme.typography as { fontFamily?: { primary?: string } }).fontFamily?.primary ??
  'Inter, system-ui, -apple-system, sans-serif';

const radius = theme.borderRadius;

const transitionFast = theme.transitions.fast;
const transitionStandard = theme.transitions.standard;
const transitionSlow = theme.transitions.slow;

export const cssVariablesStyles = css`
  /* ═══ CSS Variables Bridge ═══════════════════════════════════
     Maps JS design tokens → CSS custom properties so .css files
     (homepage, auth, etc.) can consume the same palette.
     ─────────────────────────────────────────────────────────── */
  :root {
    /* Brand */
    --primary-color: ${theme.colors.primary};
    --primary-dark: ${primaryDark};
    --primary-light: ${primaryLight};
    --primary-very-light: ${primaryVeryLight};
    --accent-gold: ${theme.colors.primary};
    --secondary-color: ${theme.colors.secondary};
    --secondary-dark: ${secondaryDark};

    /* Backgrounds */
    --bg-primary: ${theme.colors.background.primary};
    --bg-secondary: ${theme.colors.background.secondary};
    --bg-tertiary: ${theme.colors.background.tertiary};

    /* Text */
    --text-primary: ${theme.colors.text.primary};
    --text-secondary: ${theme.colors.text.secondary};
    --text-muted: ${theme.colors.text.tertiary};

    /* Borders */
    --border-color: ${borderColor};
    --border-light: ${borderLight};

    /* Typography */
    --font-heading: ${fontHeading};
    --font-body: ${fontBody};

    /* Radius */
    --radius-xs: ${radius.xs};
    --radius-sm: ${radius.sm};
    --radius-md: ${radius.md};
    --radius-lg: ${radius.lg};
    --radius-xl: ${radius.xl};
    --radius-xxl: ${radius.xl};
    --radius-full: ${radius.full};

    /* Shadows */
    --shadow-sm: ${theme.shadows.sm};
    --shadow-md: ${theme.shadows.md};
    --shadow-lg: ${theme.shadows.lg};
    --shadow-xl: ${theme.shadows.xl};

    /* Transitions */
    --transition-fast: ${transitionFast};
    --transition-normal: ${transitionStandard};
    --transition-slow: ${transitionSlow};

    /* Semantic */
    --success-color: ${theme.colors.success};
    --error-color: ${theme.colors.error};
    --warning-color: ${theme.colors.warning};
    --info-color: ${theme.colors.info};

    /* WCAG AA Contrast-Safe Variants */
    --a11y-gold-text: ${a11yGoldText};
    --a11y-gold-large: ${a11yGoldLargeText};
    --a11y-gold-ui: ${a11yGoldUI};
    --a11y-focus-ring: ${a11yFocusRing};
    --a11y-error-text: ${a11yErrorText};
    --a11y-warning-text: ${a11yWarningText};

    /* Legacy alias (DepartmentContentPanel, Modal) */
    --primary-red: var(--primary-color);
  }
`;

