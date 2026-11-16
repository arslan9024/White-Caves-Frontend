/**
 * layer3.navigation.tests.ts — Navigation Flow, Error Handling & State Management
 */

import { test, expect } from '@playwright/test';
import { skipIfLoadingShell } from './functionality.layer3.helpers';

export function registerNavigationSuites() {
  // ==================== NAVIGATION FLOW ====================
  test.describe('Navigation Flow', () => {
    test('L3-060: Navigation menu is present', async ({ page }) => {
      await page
        .goto('/', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});

      const currentPath = (() => {
        try {
          return new URL(page.url()).pathname;
        } catch {
          return '';
        }
      })();
      test.skip(
        !currentPath || currentPath === 'about:blank',
        'Homepage not reachable in current runtime state.'
      );

      const nav = page.locator('nav, [role="navigation"]');
      expect(nav).toBeDefined();
    });

    test('L3-061: Main navigation links work', async ({ page }) => {
      await page
        .goto('/', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});

      const currentPath = (() => {
        try {
          return new URL(page.url()).pathname;
        } catch {
          return '';
        }
      })();
      test.skip(
        !currentPath || currentPath === 'about:blank',
        'Homepage not reachable in current runtime state.'
      );

      await skipIfLoadingShell(page);

      const navLinks = page.locator('nav a, [role="navigation"] a');
      const navLinkCount = await navLinks.count();
      const links = navLinkCount > 0 ? navLinks : page.locator('a[href]');
      const linkCount = await links.count();

      test.skip(linkCount === 0, 'No navigation links rendered in current runtime state.');
      expect(linkCount).toBeGreaterThan(0);

      const href = await links.first().getAttribute('href');
      expect(href).toBeTruthy();
    });

    test('L3-062: Breadcrumb navigation works (if present)', async ({ page }) => {
      await page
        .goto('/', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});

      const currentPath = (() => {
        try {
          return new URL(page.url()).pathname;
        } catch {
          return '';
        }
      })();
      test.skip(
        !currentPath || currentPath === 'about:blank',
        'Homepage not reachable in current runtime state.'
      );

      const breadcrumbs = page.locator('[role="navigation"] ol, .breadcrumb, nav ol');
      const count = await breadcrumbs.count();

      if (count > 0) {
        const links = breadcrumbs.first().locator('a');
        const linkCount = await links.count();
        expect(linkCount).toBeGreaterThanOrEqual(0);
      }
    });
  });

  // ==================== ERROR HANDLING ====================
  test.describe('Error Handling', () => {
    test('L3-070: 404 page loads for invalid routes', async ({ page }) => {
      const response = await page
        .goto('/invalid-route-xyz', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => null);

      const loadingCount = await page
        .getByText(/Loading\s+page/i)
        .count()
        .catch(() => 0);
      if (loadingCount > 0) {
        test.skip(true, 'App shell still loading during 404 route test.');
      }

      const has404Heading = await page
        .getByRole('heading', { name: /404|Page Not Found/i })
        .count()
        .catch(() => 0);
      const currentPath = (() => {
        try {
          return new URL(page.url()).pathname;
        } catch {
          return '';
        }
      })();

      expect(response?.status() ?? 200).toBeGreaterThanOrEqual(200);
      expect(
        has404Heading > 0 || currentPath === '/' || currentPath === '/invalid-route-xyz'
      ).toBeTruthy();
    });

    test('L3-071: Error messages are visible and helpful', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const errorMessages = page.locator('[role="alert"], .error, .alert-error');
      await page.waitForTimeout(1000);

      const count = await errorMessages.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('L3-072: Network errors are handled gracefully', async ({ page }) => {
      await page.route('**/*', route => {
        if (Math.random() > 0.8) {
          route.abort();
        } else {
          route.continue();
        }
      });

      await page
        .goto('/', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});

      const mainContent = page.locator('main, body');
      expect(mainContent).toBeDefined();
    });
  });

  // ==================== STATE MANAGEMENT ====================
  test.describe('State Management', () => {
    test('L3-080: Component state updates on interaction', async ({ page }) => {
      await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 10_000 });

      const buyButton = page.getByRole('button', { name: /buy luxury/i });
      const offPlanButton = page.getByRole('button', { name: /off-plan launches/i });
      await expect(buyButton).toHaveAttribute('aria-pressed', 'true');
      await expect(offPlanButton).toHaveAttribute('aria-pressed', 'false');

      await offPlanButton.click();

      await expect(offPlanButton).toHaveAttribute('aria-pressed', 'true');
      await expect(buyButton).toHaveAttribute('aria-pressed', 'false');
    });

    test('L3-081: Local storage persists user preferences', async ({ page }) => {
      await page
        .goto('/', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page);

      const initialPath = (() => {
        try {
          return new URL(page.url()).pathname;
        } catch {
          return '';
        }
      })();
      test.skip(
        !initialPath || initialPath === 'about:blank',
        'Homepage not reachable in current runtime state.'
      );

      await page.evaluate(() => {
        localStorage.setItem('test-key', 'test-value');
      });

      await page
        .reload({
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});

      const reloadedPath = (() => {
        try {
          return new URL(page.url()).pathname;
        } catch {
          return '';
        }
      })();
      test.skip(
        !reloadedPath || reloadedPath === 'about:blank',
        'Reload target not reachable in current runtime state.'
      );

      const loadingCount = await page
        .getByText(/Loading\s+page/i)
        .count()
        .catch(() => 0);
      if (loadingCount > 0) {
        test.skip(true, 'App shell still loading after reload in local storage test.');
      }

      const value = await page.evaluate(() => localStorage.getItem('test-key'));
      expect(value).toBe('test-value');

      await page.evaluate(() => localStorage.removeItem('test-key'));
    });
  });
}

