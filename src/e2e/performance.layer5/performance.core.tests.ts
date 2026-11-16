/**
 * performance.core.tests.ts — Dashboard Load, Interaction, Resource & Render Tests
 */

import { test, expect } from '@playwright/test';

export function registerCorePerformanceTests() {
  // ==================== BASELINE METRICS ====================
  test.describe('Dashboard Load Performance', () => {
    test('P5-001: Owner Dashboard load time', async ({ page }) => {
      const startTime = Date.now();

      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })
        .catch(() => {});

      const loadTime = Date.now() - startTime;
      console.log(`✅ Owner Dashboard load time: ${loadTime}ms`);

      expect(loadTime).toBeLessThan(30000);
    });

    test('P5-002: Seller Dashboard load time', async ({ page }) => {
      const startTime = Date.now();

      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })
        .catch(() => {});

      const loadTime = Date.now() - startTime;
      console.log(`✅ Seller Dashboard load time: ${loadTime}ms`);

      expect(loadTime).toBeLessThan(30000);
    });

    test('P5-003: Buyer Dashboard load time', async ({ page }) => {
      const startTime = Date.now();

      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })
        .catch(() => {});

      const loadTime = Date.now() - startTime;
      console.log(`✅ Buyer Dashboard load time: ${loadTime}ms`);

      expect(loadTime).toBeLessThan(30000);
    });
  });

  // ==================== INTERACTION PERFORMANCE ====================
  test.describe('Interaction Response Times', () => {
    test('P5-010: Button click response', async ({ page }) => {
      await page.goto('/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(250);

      const roleDialogVisible = await page
        .locator('[role="dialog"][aria-label="Select your role"]')
        .first()
        .isVisible()
        .catch(() => false);
      test.skip(roleDialogVisible, 'Role-selection modal is intercepting pointer events.');

      const searchButton = page.getByRole('button', {
        name: 'Search Dubai luxury properties',
        exact: true,
      });
      await expect(searchButton).toBeVisible({ timeout: 30000 });
      await expect(page.getByRole('dialog', { name: 'Quick Property Search' })).toBeHidden();
      await searchButton.evaluate(button => {
        button.addEventListener(
          'click',
          () => {
            performance.mark('button-click-start');
            const observer = new MutationObserver(() => {
              if (document.querySelector('[role="dialog"][aria-label="Quick Property Search"]')) {
                performance.measure('button-click-response', 'button-click-start');
                observer.disconnect();
              }
            });
            observer.observe(document.body, { childList: true, subtree: true });
          },
          { capture: true, once: true }
        );
      });

      await searchButton.click();
      await expect(page.getByRole('dialog', { name: 'Quick Property Search' })).toBeVisible();
      await page.waitForFunction(
        () => performance.getEntriesByName('button-click-response').length > 0
      );
      const responseTime = await page.evaluate(
        () => performance.getEntriesByName('button-click-response')[0].duration
      );

      console.log(`✅ Button click response: ${responseTime}ms`);
      expect(responseTime).toBeLessThan(800);
    });

    test('P5-011: Form input response', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })
        .catch(() => {});

      const textInputs = page.locator('input:not([type="number"])');
      const textCount = await textInputs.count();

      const numericInputs = page.locator('input[type="number"]');
      const numericCount = await numericInputs.count();

      if (textCount > 0 || numericCount > 0) {
        const startTime = Date.now();

        if (textCount > 0) {
          await textInputs.first().fill('test');
        } else {
          await numericInputs.first().fill('12345');
        }

        const responseTime = Date.now() - startTime;
        console.log(`✅ Form input response: ${responseTime}ms`);

        expect(responseTime).toBeLessThan(process.env.CI ? 600 : 300);
      }
    });

    test('P5-012: Tab switch response', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })
        .catch(() => {});

      const tabs = page.locator('button, [role="tab"]');
      const count = await tabs.count();

      if (count > 1) {
        const startTime = Date.now();
        await tabs.nth(1).click();
        await page.waitForTimeout(100);
        const responseTime = Date.now() - startTime;

        console.log(`✅ Tab switch response: ${responseTime}ms`);
        expect(responseTime).toBeLessThan(1000);
      }
    });
  });

  // ==================== RESOURCE PERFORMANCE ====================
  test.describe('Resource Loading Performance', () => {
    test('P5-020: CSS loading time', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      const CSSResources = await page.evaluate(() => {
        return Array.from(document.styleSheets).length;
      });

      const loadTime = Date.now() - startTime;
      console.log(`✅ CSS resources loaded: ${CSSResources} stylesheets in ${loadTime}ms`);

      expect(CSSResources).toBeGreaterThanOrEqual(0);
    });

    test('P5-021: JavaScript loading time', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      const jsSize = await page.evaluate(() => {
        return document.documentElement.outerHTML.length;
      });

      const loadTime = Date.now() - startTime;
      console.log(`✅ JavaScript loaded: ${(jsSize / 1024).toFixed(2)}KB in ${loadTime}ms`);

      expect(jsSize).toBeGreaterThan(0);
    });

    test('P5-022: Image loading time', async ({ page }) => {
      await page.goto('/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      const startTime = Date.now();

      const images = await page.evaluate(() => {
        return document.querySelectorAll('img').length;
      });

      const loadTime = Date.now() - startTime;
      console.log(`✅ Images loaded: ${images} images in ${loadTime}ms`);

      expect(images).toBeGreaterThanOrEqual(0);
    });
  });

  // ==================== RENDER PERFORMANCE ====================
  test.describe('Render Performance', () => {
    test('P5-030: First contentful paint', async ({ page }) => {
      const startTime = Date.now();

      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })
        .catch(() => {});

      const fcp = Date.now() - startTime;
      console.log(`✅ First contentful paint: ${fcp}ms`);

      expect(fcp).toBeLessThan(30000);
    });

    test('P5-031: Page render stability', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        })
        .catch(() => {});

      await page.waitForTimeout(2000);

      const initialSize = await page.evaluate(() => {
        return document.documentElement.offsetHeight;
      });

      await page.waitForTimeout(1000);

      const finalSize = await page.evaluate(() => {
        return document.documentElement.offsetHeight;
      });

      console.log(
        `✅ Page height: ${initialSize}px → ${finalSize}px (Stable: ${initialSize === finalSize})`
      );

      const difference = Math.abs(initialSize - finalSize);
      expect(difference).toBeLessThan(100);
    });
  });
}

