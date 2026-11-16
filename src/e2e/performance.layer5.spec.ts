/**
 * LAYER 5: PERFORMANCE TESTING SUITE
 * White Caves Platform - Load Times & Response Metrics (Facade Entry Point)
 *
 * Metrics Captured:
 * ✅ Dashboard load times
 * ✅ Tab switching speed
 * ✅ CRM module load times
 * ✅ Form response times
 * ✅ Navigation latency
 * ✅ Component render performance
 */

import { test } from '@playwright/test';
import { registerCorePerformanceTests } from './performance.layer5/performance.core.tests';
import { registerStressPerformanceTests } from './performance.layer5/performance.stress.tests';

// Set longer timeout for performance tests
test.setTimeout(90000);

test.describe('LAYER 5: PERFORMANCE TESTING', () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
      localStorage.setItem('wc_cookie_consent', 'accepted');
      localStorage.setItem('cookieConsent', 'accepted');
      localStorage.setItem('whitecaves_cookie_consent', 'accepted');
    });
  });

  registerCorePerformanceTests();
  registerStressPerformanceTests();
});

