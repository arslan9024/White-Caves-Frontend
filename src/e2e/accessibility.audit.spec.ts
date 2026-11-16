/**
 * ACCESSIBILITY AUDIT TEST SUITE
 * Layer 2: A11y Testing for White Caves Platform (Facade Entry Point)
 *
 * Tests:
 * ✅ WCAG 2.1 Level AA compliance
 * ✅ Keyboard navigation
 * ✅ ARIA labels and roles
 * ✅ Semantic HTML structure
 * ✅ Color contrast
 * ✅ Focus management
 * ✅ Screen reader support
 *
 * Using: Playwright + axe-core
 */

import { test } from '@playwright/test';
import { registerWcagTests } from './accessibility.audit/accessibility.wcag.tests';
import { registerPagesTests } from './accessibility.audit/accessibility.pages.tests';

export * from './accessibility.audit/accessibility.audit.helpers';

test.setTimeout(60000);

registerWcagTests();
registerPagesTests();

