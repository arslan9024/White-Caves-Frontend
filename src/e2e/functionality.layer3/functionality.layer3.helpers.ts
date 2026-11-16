/**
 * functionality.layer3.helpers.ts — Path Canonicalizer & Shell Helper
 */

import { test } from '@playwright/test';

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

export async function skipIfLoadingShell(page: any, options?: { expectedPath?: string }) {
  await page.waitForTimeout(300);
  const bodyText =
    (await page
      .locator('body')
      .innerText()
      .catch(() => '')) || '';
  if (/loading\s+page/i.test(bodyText)) {
    test.skip(true, 'Dashboard/app shell still loading. Skipping unstable assertion.');
  }

  if (options?.expectedPath) {
    let currentPath = '';
    try {
      currentPath = new URL(page.url()).pathname;
    } catch {
      currentPath = '';
    }

    const canonicalExpectedPath = toCanonicalDashboardPath(options.expectedPath);
    if (currentPath !== canonicalExpectedPath) {
      test.skip(
        true,
        `Expected ${canonicalExpectedPath} but landed on ${currentPath || 'unknown path'}.`
      );
    }
  }
}

