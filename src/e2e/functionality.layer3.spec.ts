/**
 * LAYER 3: FUNCTIONALITY TESTING SUITE
 * White Caves Platform - Complete Feature Coverage (Facade Entry Point)
 */

import { test } from '@playwright/test';
import { registerDashboardSuites } from './functionality.layer3/layer3.dashboard.tests';
import { registerInteractionsSuites } from './functionality.layer3/layer3.interactions.tests';
import { registerNavigationSuites } from './functionality.layer3/layer3.navigation.tests';
import { registerSystemSuites } from './functionality.layer3/layer3.system.tests';

export * from './functionality.layer3/functionality.layer3.helpers';

test.describe('LAYER 3: FUNCTIONALITY TESTING', () => {
  registerDashboardSuites();
  registerInteractionsSuites();
  registerNavigationSuites();
  registerSystemSuites();
});

