// src/styles/theme.ts
// Complete Theme System with Light/Dark Modes & Design Tokens
// 100% backwards-compatible facade

export { lightTheme, darkTheme, MEDIA_QUERIES, TYPOGRAPHY } from './theme.base';
export type { Theme } from './theme.base';

export {
  COLORS,
  SPACING,
  theme,
  colors,
  typography,
  transitions,
  radius,
  spacing,
  shadows,
} from './theme.legacy';

import { theme } from './theme.legacy';
export default theme;

