/**
 * Global Styles
 * Base styles, resets, and utilities for the entire application
 *
 * Facade combining modular CSS style fragments.
 */

import { createGlobalStyle } from 'styled-components';
import { cssVariablesStyles } from './global.css-vars';
import { resetStyles } from './global.resets';
import { componentStyles } from './global.components';
import { animationStyles } from './global.animations';

export const GlobalStyles = createGlobalStyle`
  ${cssVariablesStyles}
  ${resetStyles}
  ${componentStyles}
  ${animationStyles}
`;

export { cssVariablesStyles, resetStyles, componentStyles, animationStyles };
export default GlobalStyles;

