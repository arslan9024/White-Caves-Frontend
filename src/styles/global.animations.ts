/**
 * Global Styles - Animations, Media Queries and Accessibility
 */

import { css } from 'styled-components';
import { theme } from './theme';

const a11yColors = (
  theme.colors as {
    a11y?: {
      focusRing?: string;
    };
  }
).a11y;

const a11yFocusRing = a11yColors?.focusRing ?? theme.colors.focus ?? theme.colors.info;

export const animationStyles = css`
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-12px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(12px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideOutDown {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(12px); }
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* Animation Utility Classes */
  .theme-transition {
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  .slide-down {
    animation: slideDown 0.3s ease-out;
  }

  .slide-up {
    animation: slideUp 0.3s ease-out;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  .pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* Responsive Font Sizing */
  @media (max-width: ${theme.breakpoints.tablet}) {
    html {
      font-size: 15px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    html {
      font-size: 14px;
    }
  }

  /* Accessibility: Reduced Motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Print Styles */
  @media print {
    body {
      background-color: white;
      color: black;
    }
    a {
      text-decoration: underline;
    }
  }

  /* Accessibility: skip-to-content link */
  .skip-to-content {
    position: absolute;
    top: -100px;
    left: 16px;
    background: #EF4444;
    color: #FFFFFF;
    padding: 8px 16px;
    z-index: var(--z-max, 9999);
    border-radius: 0 0 8px 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: top 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  .skip-to-content:focus,
  .skip-to-content:focus-visible {
    top: 0;
    outline: 3px solid ${a11yFocusRing};
    outline-offset: 2px;
  }
`;

