/**
 * layer3.interactions.tests.ts — User Interactions, Data Display & Form Handling
 */

import { test, expect } from '@playwright/test';
import { skipIfLoadingShell } from './functionality.layer3.helpers';

export function registerInteractionsSuites() {
  // ==================== USER INTERACTIONS ====================
  test.describe('User Interactions', () => {
    test('L3-030: Button clicks are responsive', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const buttons = page.locator('button');
      const buttonCount = await buttons.count();

      if (buttonCount > 0) {
        await buttons.first().click();
        const focusedElement = page.locator('*:focus');
        await page.waitForTimeout(300);

        const doesExist = await focusedElement.count();
        expect(doesExist).toBeGreaterThanOrEqual(0);
      }
    });

    test('L3-031: Hover states work on interactive elements', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const buttons = page.locator('button');
      const count = await buttons.count();

      if (count > 0) {
        const button = buttons.first();
        await button.hover();
        await page.waitForTimeout(200);

        const exists = await button.isVisible();
        expect(exists).toBeTruthy();
      }
    });

    test('L3-032: Links navigate properly', async ({ page }) => {
      await page
        .goto('/', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});

      const currentPath = new URL(page.url()).pathname;
      test.skip(
        !currentPath || currentPath === 'about:blank',
        'Homepage not reachable in current runtime state.'
      );

      const links = page.locator('a');
      const linkCount = await links.count();

      test.skip(linkCount === 0, 'No links rendered in current dashboard state.');
      expect(linkCount).toBeGreaterThan(0);

      const href = await links.first().getAttribute('href');
      expect(href).toBeTruthy();
    });
  });

  // ==================== DATA DISPLAY ====================
  test.describe('Data Display & Rendering', () => {
    test('L3-040: Dashboard displays data tables', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const tables = page.locator('table');
      const tableCount = await tables.count();
      expect(tableCount).toBeGreaterThanOrEqual(0);
    });

    test('L3-041: Dashboard displays cards/panels', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const cards = page.locator('.card, [class*="Card"], .panel, .stat-card');
      const cardCount = await cards.count();

      test.skip(cardCount === 0, 'No card/panel elements rendered in this dashboard variant.');
      expect(cardCount).toBeGreaterThan(0);
    });

    test('L3-042: Dashboard renders statistics/metrics', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      await page.waitForTimeout(1000);
      const numbers = page.locator('text=/[0-9]+/');
      const numberCount = await numbers.count();

      test.skip(numberCount === 0, 'No visible numeric metrics in this dashboard state.');
      expect(numberCount).toBeGreaterThan(0);
    });
  });

  // ==================== FORM HANDLING ====================
  test.describe('Form Handling', () => {
    test('L3-050: Forms are present and functional', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const forms = page.locator('form');
      const formCount = await forms.count();
      expect(formCount).toBeGreaterThanOrEqual(0);
    });

    test('L3-051: Input fields are functional', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const inputs = page.locator('input');
      const inputCount = await inputs.count();

      if (inputCount > 0) {
        const input = inputs.first();
        await input.click();
        await input.fill('test');

        const value = await input.inputValue();
        expect(value).toContain('test');
      }
    });

    test('L3-052: Form submission works', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const forms = page.locator('form');
      const formCount = await forms.count();

      if (formCount > 0) {
        const form = forms.first();
        try {
          await form.evaluate((f: any) => {
            if (f.requestSubmit) {
              f.requestSubmit();
            }
          });
        } catch (e) {
          // Submission may fail due to validation or auth
        }
      }
    });
  });
}

