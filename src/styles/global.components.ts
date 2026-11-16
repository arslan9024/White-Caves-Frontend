/**
 * Global Styles - Form Controls, Tables, Lists, and Scrollbars
 */

import { css } from 'styled-components';
import { theme } from './theme';

const themeColors = theme.colors as Record<string, unknown>;
const borderColor = String(themeColors.borderColor ?? themeColors.border ?? '#E5E7EB');
const borderDark = String(themeColors.borderDark ?? borderColor);

const a11yColors = (
  theme.colors as {
    a11y?: {
      goldUI?: string;
      focusRing?: string;
    };
  }
).a11y;

const a11yFocusRing = a11yColors?.focusRing ?? theme.colors.focus ?? theme.colors.info;
const a11yGoldUI = a11yColors?.goldUI ?? theme.colors.primary;

const spacingSm = theme.spacing[2];
const spacingMd = theme.spacing[4];
const spacingXs = theme.spacing[1];

const transitionAll = theme.transitions.standard;
const transitionColor = theme.transitions.standard;
const focusShadow = `0 0 0 3px ${a11yFocusRing}33`;
const primaryLight = (theme.colors as { primaryLight?: string }).primaryLight ?? '#FCE4E6';

export const componentStyles = css`
  /* Form Elements */
  input,
  textarea,
  select,
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  input,
  textarea,
  select {
    padding: ${spacingSm};
    border: 1px solid ${borderColor};
    border-radius: ${spacingXs};
    background-color: ${theme.colors.background.secondary};
    color: ${theme.colors.text.primary};
    transition: ${transitionColor};

    &:hover {
      border-color: ${borderDark};
    }

    &:focus-visible {
      outline: 3px solid ${a11yFocusRing};
      outline-offset: 2px;
      border-color: ${a11yGoldUI};
      box-shadow: none;
    }

    &:focus:not(:focus-visible) {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: ${focusShadow};
    }

    &:disabled {
      background-color: ${theme.colors.background.tertiary};
      color: ${theme.colors.disabled};
      cursor: not-allowed;
    }

    &::placeholder {
      color: ${theme.colors.text.tertiary};
    }
  }

  button {
    cursor: pointer;
    border: none;
    transition: ${transitionAll};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &:focus-visible {
      outline: 3px solid ${a11yFocusRing};
      outline-offset: 2px;
      border-radius: 2px;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  /* Lists */
  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
    padding: 0;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th, td {
    padding: ${spacingMd};
    text-align: left;
    border-bottom: 1px solid ${borderColor};
  }

  th {
    background-color: ${theme.colors.background.secondary};
    font-weight: 600;
    color: ${theme.colors.text.secondary};
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${borderColor};
    border-radius: 4px;

    &:hover {
      background: ${borderDark};
    }
  }

  /* Selection */
  ::selection {
    background-color: ${primaryLight};
    color: ${theme.colors.primary};
  }

  /* Main Layout */
  #root {
    width: 100%;
    min-height: 100vh;
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .no-scroll {
    overflow: hidden;
  }
`;

