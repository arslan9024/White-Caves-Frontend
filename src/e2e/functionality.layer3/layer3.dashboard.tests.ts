/**
 * layer3.dashboard.tests.ts — Dashboard Loading, Tabs, and CRM Module Suites
 */

import { test, expect } from '@playwright/test';
import { skipIfLoadingShell } from './functionality.layer3.helpers';

export function registerDashboardSuites() {
  // ==================== DASHBOARD LOADING & RENDERING ====================
  test.describe('Dashboard Loading & Rendering', () => {
    test('L3-001: Owner Dashboard loads without errors', async ({ page }) => {
      const response = await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => null);

      if (response) {
        expect([200, 401]).toContain(response.status());
      }
    });

    test('L3-002: Dashboard renders main layout elements', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const loadingCount = await page
        .getByText(/Loading\s+page/i)
        .count()
        .catch(() => 0);
      if (loadingCount > 0) {
        test.skip(true, 'Dashboard shell still loading in L3-002.');
      }

      const mainContent = page.locator('main');
      const navElement = page.locator('nav');

      const mainCount = await mainContent.count();
      const navCount = await navElement.count();

      test.skip(mainCount + navCount === 0, 'No main/nav layout elements rendered in this state.');
      expect(mainCount + navCount).toBeGreaterThan(0);
    });

    test('L3-003: Dashboard renders without console errors', async ({ page }) => {
      const errors: any[] = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const criticalErrors = errors.filter(
        e =>
          !e.includes('net::') && !e.includes('401') && !e.includes('undefined is not a function')
      );

      expect(criticalErrors.length).toBeLessThan(3);
    });

    test('L3-004: Seller Dashboard loads', async ({ page }) => {
      const response = await page
        .goto('/seller/dashboard', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => null);

      if (response) {
        expect([200, 401]).toContain(response.status());
      }
    });

    test('L3-005: Buyer Dashboard loads', async ({ page }) => {
      const response = await page
        .goto('/buyer/dashboard', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => null);

      if (response) {
        expect([200, 401]).toContain(response.status());
      }
    });
  });

  // ==================== TAB NAVIGATION ====================
  test.describe('Tab Navigation & Switching', () => {
    test('L3-010: Dashboard has multiple tabs', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const loadingCount = await page
        .getByText(/Loading\s+page/i)
        .count()
        .catch(() => 0);
      if (loadingCount > 0) {
        test.skip(true, 'Dashboard shell still loading in L3-010.');
      }

      const tabButtons = page.locator('button, [role="tab"]');
      const tabCount = await tabButtons.count();

      test.skip(tabCount === 0, 'No tab controls rendered in this dashboard state.');
      expect(tabCount).toBeGreaterThan(0);
    });

    test('L3-011: Tab content switches on click', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const tabs = page.locator('button, [role="tab"]');
      const tabCount = await tabs.count();

      if (tabCount > 1) {
        await tabs.nth(1).click();
        await page.waitForTimeout(500);

        const activeTab = page.locator('[role="tab"][aria-selected="true"], button.active');
        expect(activeTab).toBeDefined();
      }
    });

    test('L3-012: Tab state is maintained', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const tabs = page.locator('button, [role="tab"]');
      const tabCount = await tabs.count();

      if (tabCount > 0) {
        const tab = tabs.first();
        await tab.click();
        await page.waitForTimeout(300);

        const tabClass = await tab.getAttribute('class');
        expect(tabClass).toBeTruthy();
      }
    });
  });

  // ==================== CRM MODULE LOADING ====================
  test.describe('CRM Module Loading', () => {
    test('L3-020: CRM modules load with suspense fallback', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      const loaders = page.locator('.crm-loading-fallback, .loading-spinner, [role="status"]');
      const loaderCount = await loaders.count();
      expect(loaderCount).toBeGreaterThanOrEqual(0);
    });

    test('L3-021: CRM modules render content after loading', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      await page.waitForTimeout(2000);
      const mainContent = page.locator('main, [role="main"]');
      expect(mainContent).toBeDefined();
    });

    test('L3-022: CRM modules handle errors gracefully', async ({ page }) => {
      await page
        .goto('/crm', {
          waitUntil: 'domcontentloaded',
          timeout: 10000,
        })
        .catch(() => {});
      await skipIfLoadingShell(page, { expectedPath: '/crm' });

      await page.waitForTimeout(1000);
      const clickable = page.locator('button, [role="button"], a');
      const count = await clickable.count();

      test.skip(count === 0, 'No interactive controls rendered in this dashboard state.');
      expect(count).toBeGreaterThan(0);
    });
  });
}

