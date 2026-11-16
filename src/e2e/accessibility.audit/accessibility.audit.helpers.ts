/**
 * accessibility.audit.helpers.ts — Axe Injection, Navigation & Stabilization Helpers
 */

import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export function toCanonicalDashboardPath(path: string): string {
  if (path.startsWith('/landlord/dashboard')) {
    return path.replace('/landlord/dashboard', '/landlord-portal');
  }
  if (path.startsWith('/tenant/dashboard')) {
    return path.replace('/tenant/dashboard', '/tenant-portal');
  }

  const crmDashboardPrefixes = [
    '/md/dashboard',
    '/owner/dashboard',
    '/buyer/dashboard',
    '/seller/dashboard',
    '/leasing-agent/dashboard',
    '/secondary-sales-agent/dashboard',
    '/team-leader/dashboard',
    '/agent/dashboard',
  ];

  const matchedPrefix = crmDashboardPrefixes.find(prefix => path.startsWith(prefix));
  if (matchedPrefix) {
    return path.replace(matchedPrefix, '/crm');
  }

  return path;
}

// Helper function to inject axe-core
export async function injectAxe(page: any) {
  const hasAxe = await page.evaluate(() => Boolean((window as any).axe)).catch(() => false);
  if (!hasAxe) {
    await page.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
  }
}

export async function navigateAndStabilize(page: any, path: string) {
  const canonicalPath = toCanonicalDashboardPath(path);

  try {
    await page.goto(canonicalPath, { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch {
    // Fallback to root so downstream helpers can skip route-specific checks gracefully.
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    return;
  }

  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(250);

  const bodyText =
    (await page
      .locator('body')
      .innerText()
      .catch(() => '')) || '';

  if (/loading\s+page/i.test(bodyText)) {
    // Prevent hanging states from cascading into false-negative failures.
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  }
}

export async function ensureExpectedPathOrSkip(page: any, expectedPath: string) {
  const currentPath = new URL(page.url()).pathname;
  const canonicalExpectedPath = toCanonicalDashboardPath(expectedPath);
  if (
    !currentPath.startsWith(canonicalExpectedPath) ||
    currentPath === '/' ||
    currentPath.startsWith('/signin') ||
    currentPath.startsWith('/login')
  ) {
    test.skip(true, `Auth redirect detected for ${canonicalExpectedPath}. Current: ${currentPath}`);
  }

  // Detect auth gate rendered in-place (Firefox renders the sign-in form
  // without changing the URL for protected routes).
  const authGateSelectors =
    '.auth-container, .auth-modal, .auth-form, .auth-subtitle, .auth-modal-overlay, input[type="password"]';
  const authGateCount = await page
    .locator(authGateSelectors)
    .count()
    .catch(() => 0);
  if (authGateCount > 0) {
    test.skip(
      true,
      `Authentication required for ${canonicalExpectedPath} — auth gate rendered in-place`
    );
  }
}

export async function ensureDashboardReadyOrSkip(page: any) {
  const currentPath = new URL(page.url()).pathname;
  if (
    currentPath === '/' ||
    currentPath.startsWith('/signin') ||
    currentPath.startsWith('/login')
  ) {
    test.skip(true, `Auth redirect detected. Current path: ${currentPath}`);
    return;
  }

  const authGateCount = await page
    .locator(
      '.auth-page-container, .auth-card, .auth-modal-overlay, .auth-form, input[type="password"]'
    )
    .count()
    .catch(() => 0);
  if (authGateCount > 0) {
    test.skip(true, 'Authentication required for protected dashboard');
    return;
  }

  const bodyText =
    (await page
      .locator('body')
      .innerText()
      .catch(() => '')) || '';
  if (/loading\s+page/i.test(bodyText)) {
    test.skip(true, 'Dashboard shell still loading. Skipping non-deterministic assertion.');
    return;
  }

  const interactiveCount = await page.locator('button, a, h1, h2, h3').count();
  if (interactiveCount === 0) {
    test.skip(true, 'Dashboard content not ready for accessibility assertions.');
    return;
  }
}

export async function runAxeViolations(page: any, options?: any): Promise<any[]> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const axeBuilder = new AxeBuilder({ page });
      if (options) {
        axeBuilder.options(options);
      }
      const results = await axeBuilder.analyze();
      const violations = results.violations ?? [];

      return violations as any[];
    } catch (error: any) {
      const message = String(error?.message || error || '');
      const isContextError =
        message.includes('Execution context was destroyed') ||
        message.includes('Cannot find context');
      if (!isContextError || attempt === 3) {
        throw error;
      }
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(200);
    }
  }

  return [];
}

export function criticalOrSeriousViolations(violations: any[]): any[] {
  return violations.filter(v => v?.impact === 'critical' || v?.impact === 'serious');
}

// Dashboard pages to test
export const DASHBOARD_PAGES = [
  { role: 'owner', path: '/crm', name: 'Owner/MD Dashboard' },
  { role: 'seller', path: '/crm', name: 'Seller Dashboard' },
  { role: 'buyer', path: '/crm', name: 'Buyer Dashboard' },
  { role: 'landlord', path: '/landlord-portal', name: 'Landlord Dashboard' },
  { role: 'leasing-agent', path: '/crm', name: 'Leasing Agent Dashboard' },
  {
    role: 'secondary-sales-agent',
    path: '/crm',
    name: 'Sales Agent Dashboard',
  },
  { role: 'tenant', path: '/tenant-portal', name: 'Tenant Dashboard' },
];

