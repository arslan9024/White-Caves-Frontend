/**
 * phase33-leasing-continuity.helpers.ts — Event Capture & API Mocks for Leasing Continuity Tests
 */

import type { Page } from '@playwright/test';

export const SESSION_EVENTS_KEY = '__wc_homepage_events__';

export async function enableHomepageEventCapture(page: Page): Promise<void> {
  await page.addInitScript(
    ({ storageKey }: { storageKey: string }) => {
      sessionStorage.setItem(storageKey, JSON.stringify([]));
      window.addEventListener('wc-homepage-event', evt => {
        const event = evt as CustomEvent<{ event?: string }>;
        const previous = JSON.parse(sessionStorage.getItem(storageKey) || '[]') as string[];
        const eventName = event?.detail?.event;
        if (typeof eventName === 'string') {
          previous.push(eventName);
          sessionStorage.setItem(storageKey, JSON.stringify(previous));
        }
      });
    },
    { storageKey: SESSION_EVENTS_KEY }
  );
}

export async function getCapturedEvents(page: Page): Promise<string[]> {
  return page.evaluate(
    ({ storageKey }: { storageKey: string }) => {
      try {
        return JSON.parse(sessionStorage.getItem(storageKey) || '[]') as string[];
      } catch {
        return [];
      }
    },
    { storageKey: SESSION_EVENTS_KEY }
  );
}

/**
 * Mock all backend API calls so tests run reliably without a live Express server.
 * Each endpoint returns the minimum shape the frontend expects.
 */
export async function mockBackendAPIs(page: Page): Promise<void> {
  // Homepage data feed
  await page.route('**/api/homepage/data', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ properties: [], stats: {}, featuredProperties: [] }),
    })
  );
  // Contact form
  await page.route('**/api/contact', route =>
    route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: { id: 'phase33_contact_001' } }),
    })
  );
  // Search / lead capture
  await page.route('**/api/leads**', route =>
    route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, data: { id: 'lead-phase33' } }),
    })
  );
  // Properties
  await page.route('**/api/properties**', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [], total: 0, page: 1 }),
    })
  );
  // Viewings
  await page.route('**/api/viewings**', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    })
  );
  // Leases
  await page.route('**/api/leases**', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    })
  );
  // Maintenance
  await page.route('**/api/maintenance**', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    })
  );
  // Compliance / Ejari export (auth-gated — 401 is correct, 404 would be broken)
  await page.route('**/api/compliance/**', route =>
    route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Unauthorized' }),
    })
  );
  // Catch-all for any remaining API calls
  await page.route('**/api/**', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    })
  );
}

