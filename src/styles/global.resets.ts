/**
 * Global Styles - Resets and Base Typography
 */

import { css } from 'styled-components';
import { theme } from './theme';

const fontBody =
  (theme.typography as { fontFamily?: { primary?: string } }).fontFamily?.primary ??
  'Inter, system-ui, -apple-system, sans-serif';

const bodyStyle = (theme.typography as { body?: { size?: string; lineHeight?: string | number } })
  .body;
const h1Style = (theme.typography as { h1?: { size?: string; lineHeight?: string | number } }).h1;
const h2Style = (theme.typography as { h2?: { size?: string; lineHeight?: string | number } }).h2;
const h3Style = (theme.typography as { h3?: { size?: string; lineHeight?: string | number } }).h3;
const h4Style = (theme.typography as { h4?: { size?: string; lineHeight?: string | number } }).h4;
const h5Style = (theme.typography as { h5?: { size?: string; lineHeight?: string | number } }).h5;

const transitionBackground = theme.transitions.standard;
const transitionColor = theme.transitions.standard;

const a11yColors = (
  theme.colors as {
    a11y?: {
      focusRing?: string;
    };
  }
).a11y;

const a11yFocusRing = a11yColors?.focusRing ?? theme.colors.focus ?? theme.colors.info;

export const resetStyles = css`
  /* CSS Reset & Base Styles */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* ── Global focus ring (WCAG 2.1 AA — Emerald Green 2px) ─────── */
  :focus-visible {
    outline: 2px solid #10B981;
    outline-offset: 2px;
  }
  :focus:not(:focus-visible) {
    outline: none;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: ${fontBody};
    font-size: ${bodyStyle?.size ?? '14px'};
    line-height: ${bodyStyle?.lineHeight ?? 1.6};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.primary};
    transition: ${transitionBackground};
  }

  /* Typography Reset */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    font-weight: 600;
    line-height: 1.2;
    color: ${theme.colors.text.primary};
  }

  h1 {
    font-size: ${h1Style?.size ?? '2rem'};
    line-height: ${h1Style?.lineHeight ?? 1.2};
  }

  h2 {
    font-size: ${h2Style?.size ?? '1.75rem'};
    line-height: ${h2Style?.lineHeight ?? 1.3};
  }

  h3 {
    font-size: ${h3Style?.size ?? '1.5rem'};
    line-height: ${h3Style?.lineHeight ?? 1.35};
  }

  h4 {
    font-size: ${h4Style?.size ?? '1.25rem'};
    line-height: ${h4Style?.lineHeight ?? 1.4};
  }

  h5 {
    font-size: ${h5Style?.size ?? '1.1rem'};
    line-height: ${h5Style?.lineHeight ?? 1.45};
  }

  h6 {
    font-size: ${bodyStyle?.size ?? '1rem'};
    line-height: ${bodyStyle?.lineHeight ?? 1.5};
  }

  p {
    margin: 0;
    overflow-wrap: break-word;
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${transitionColor};

    &:hover {
      color: ${theme.colors.primaryDark};
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 3px solid ${a11yFocusRing};
      outline-offset: 2px;
      border-radius: 2px;
    }

    /* Remove outline for mouse-only focus (keyboard users still see it) */
    &:focus:not(:focus-visible) {
      outline: none;
    }
  }
`;

