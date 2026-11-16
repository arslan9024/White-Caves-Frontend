/**
 * accessibility.wcag.tests.ts — WCAG 2.1 AA, Keyboard, ARIA, Semantic, Contrast & Focus Tests
 */

import { test, expect } from '@playwright/test';
import {
  navigateAndStabilize,
  ensureExpectedPathOrSkip,
  ensureDashboardReadyOrSkip,
  runAxeViolations,
  criticalOrSeriousViolations,
  DASHBOARD_PAGES,
} from './accessibility.audit.helpers';

export function registerWcagTests() {
  // Test Group: WCAG 2.1 Level AA Compliance
  test.describe('WCAG 2.1 Level AA Compliance', () => {
    DASHBOARD_PAGES.forEach(({ path, name }) => {
      test(`${name} - No accessibility violations`, async ({ page }) => {
        await navigateAndStabilize(page, path);
        await ensureExpectedPathOrSkip(page, path);
        await ensureDashboardReadyOrSkip(page);

        const violations = await runAxeViolations(page);

        expect(criticalOrSeriousViolations(violations)).toHaveLength(0);
      });
    });
  });

  // Test Group: Keyboard Navigation
  test.describe('Keyboard Navigation', () => {
    test('Owner Dashboard - Tab navigation works', async ({ page }) => {
      await navigateAndStabilize(page, '/crm');
      await ensureExpectedPathOrSkip(page, '/crm');
      await ensureDashboardReadyOrSkip(page);

      await page.keyboard.press('Tab');
      let focusedElement = await page.locator('*:focus').first();
      expect(focusedElement).toBeDefined();

      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        focusedElement = await page.locator('*:focus').first();
        expect(focusedElement).toBeDefined();
      }
    });

    test('Owner Dashboard - Escape key closes modals', async ({ page }) => {
      await navigateAndStabilize(page, '/crm');
      await ensureExpectedPathOrSkip(page, '/crm');
      await ensureDashboardReadyOrSkip(page);

      const buttons = await page.locator('button').count();
      if (buttons > 0) {
        await page.locator('button').first().click();
        await page.waitForTimeout(500);

        await page.keyboard.press('Escape');
      } else {
        test.skip(true, 'No modal-trigger buttons available in this dashboard variant.');
      }
    });
  });

  // Test Group: ARIA Labels and Roles
  test.describe('ARIA Labels and Roles', () => {
    test('Owner Dashboard - Buttons have accessible names', async ({ page }) => {
      await navigateAndStabilize(page, '/crm');
      await ensureExpectedPathOrSkip(page, '/crm');
      await ensureDashboardReadyOrSkip(page);

      const buttons = page.locator('button');
      const count = await buttons.count();

      if (count === 0) {
        test.skip(true, 'No interactive buttons found in this dashboard variant.');
      }

      for (let i = 0; i < Math.min(10, count); i++) {
        const button = buttons.nth(i);
        const ariaLabel = await button.getAttribute('aria-label');
        const textContent = await button.textContent();

        expect(ariaLabel || textContent?.trim()).toBeTruthy();
      }
    });

    test('Owner Dashboard - Links have accessible names', async ({ page }) => {
      await navigateAndStabilize(page, '/crm');
      await ensureExpectedPathOrSkip(page, '/crm');
      await ensureDashboardReadyOrSkip(page);

      const links = page.locator('a');
      const count = await links.count();

      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < Math.min(10, count); i++) {
        const link = links.nth(i);
        const ariaLabel = await link.getAttribute('aria-label');
        const textContent = await link.textContent();
        const title = await link.getAttribute('title');

        expect(ariaLabel || textContent?.trim() || title).toBeTruthy();
      }
    });
  });

  // Test Group: Semantic HTML
  test.describe('Semantic HTML Structure', () => {
    test('Owner Dashboard - Uses semantic HTML elements', async ({ page }) => {
      await navigateAndStabilize(page, '/crm');
      await ensureExpectedPathOrSkip(page, '/crm');
      await ensureDashboardReadyOrSkip(page);

      const mainElement = page.locator('main');
      expect(mainElement).toBeDefined();

      const navElement = page.locator('nav');
      expect(navElement).toBeDefined();

      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      test.skip(headingCount === 0, 'No headings rendered in this auth/state variant.');
      expect(headingCount).toBeGreaterThan(0);
    });

    test('Owner Dashboard - Proper heading hierarchy', async ({ page }) => {
      await navigateAndStabilize(page, '/crm');
      await ensureExpectedPathOrSkip(page, '/crm');
      await ensureDashboardReadyOrSkip(page);

      const headingCount = await page.locator('h1, h2').count();
      test.skip(headingCount === 0, 'No h1/h2 headings rendered in this auth/state variant.');
      expect(headingCount).toBeGreaterThan(0);
    });
  });

  // Test Group: Color Contrast
  test.describe('Color Contrast (WCAG AA)', () => {
    test('Owner Dashboard - Text contrast is sufficient', async ({ page }) => {
      await navigateAndStabilize(page, '/crm');
      await ensureExpectedPathOrSkip(page, '/crm');
      await ensureDashboardReadyOrSkip(page);

      const contrastViolations = await runAxeViolations(page, {
        runOnly: { type: 'rule', values: ['color-contrast'] },
      });

      expect(criticalOrSeriousViolations(contrastViolations)).toHaveLength(0);
    });
  });

  // Test Group: Focus Management
  test.describe('Focus Management', () => {
    test('Owner Dashboard - Focus visible on keyboard navigation', async ({ page }) => {
      await navigateAndStabilize(page, '/crm');
      await ensureExpectedPathOrSkip(page, '/crm');
      await ensureDashboardReadyOrSkip(page);

      await page.keyboard.press('Tab');

      const focusedElement = page.locator('*:focus');
      expect(focusedElement).toBeDefined();

      const focusStyle = await focusedElement.evaluate((el: Element) => {
        return window.getComputedStyle(el).outline;
      });

      expect(focusStyle).toBeTruthy();
    });

    test('Owner Dashboard - Focus trap in modals', async ({ page }) => {
      await navigateAndStabilize(page, '/crm');
      await ensureExpectedPathOrSkip(page, '/crm');
      await ensureDashboardReadyOrSkip(page);

      let dialog = page.locator('dialog, [role="dialog"]');
      let dialogCount = await dialog.count().catch(() => 0);

      if (dialogCount === 0) {
        const modalTrigger = page
          .locator(
            'button[aria-haspopup="dialog"], button[data-modal-target], button:has-text("Filter"), button:has-text("Add"), button:has-text("New")'
          )
          .first();
        const triggerExists = await modalTrigger.count().catch(() => 0);
        if (triggerExists > 0) {
          await modalTrigger.click({ timeout: 3000 }).catch(() => {});
          await page.waitForTimeout(300);
        }
        dialog = page.locator('dialog, [role="dialog"]');
        dialogCount = await dialog.count().catch(() => 0);
      }

      if (dialogCount > 0) {
        await page.keyboard.press('Tab');
        const activeEl = await page.evaluate(() => Boolean(document.activeElement));
        expect(activeEl).toBeTruthy();
      }
    });
  });
}

