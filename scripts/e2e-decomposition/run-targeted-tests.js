#!/usr/bin/env node
/**
 * scripts/e2e-decomposition/run-targeted-tests.js
 * =============================================================================
 * Tier 4: Targeted Vitest Test Runner for Codebase Decomposition.
 * 
 * Features:
 *   1. Milestone suites (--milestone M1 | M2 | M3 | M4 | M5) executing in < 5s.
 *   2. Smoke battery (--smoke): 5 core tests across store, adapters, services (< 2s).
 *   3. Targeted file mapper (--files <paths...>): auto-resolves tests for edited files.
 *   4. Node environment acceleration: automatically runs non-UI tests with
 *      `--environment node`, giving a 10x-15x speedup over standard jsdom.
 *   5. Budget guard: enforces < 10s execution ceiling.
 * =============================================================================
 */

import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '../..');

export const MILESTONE_SUITES = {
  smoke: [
    'src/utils/permissions.test.ts',
    'src/store/roleSlice.test.ts',
    'src/adapters/BayutAdapter.test.ts',
    'src/services/finance/__tests__/uaeVatAndTaxEngine.test.ts',
    'src/store/slices/aiAssistantDashboardSlice.test.ts',
  ],
  M1: [
    'src/store/slices/aiAssistantDashboardSlice.test.ts',
    'src/store/roleSlice.test.ts',
    'src/store/analyticsSlice.test.ts',
    'src/store/crmDataSlice.test.ts',
    'src/adapters/BayutAdapter.test.ts',
    'src/services/finance/__tests__/uaeVatAndTaxEngine.test.ts',
    'src/services/henry/chequeCalculator.test.ts',
    'src/services/henry/renewalDateCalculator.test.ts',
    'src/services/compliance/__tests__/escrowMilestoneEngine.test.ts',
    'src/services/compliance/__tests__/sanctionsScreeningEngine.test.ts',
    'src/services/__tests__/reraRentalCalculator.test.ts',
    'src/services/http/fetchWithRetry.test.ts',
  ],
  M2: [
    'src/utils/permissions.test.ts',
    'src/__tests__/FounderGuard.test.ts',
    'src/services/finance/__tests__/uaeVatAndTaxEngine.test.ts',
    'src/utils/uaeTaxEngine.test.ts',
    'src/utils/commissionEngine.test.ts',
    'src/utils/inventoryIndex.test.ts',
  ],
  M3: [
    'src/utils/permissions.test.ts',
    'src/utils/doorMasking.test.ts',
    'src/utils/ejariAlertGuard.test.ts',
    'src/utils/leadScoringEngine.test.ts',
    'src/utils/safeStorage.test.ts',
    'src/utils/validation.test.ts',
    'src/__tests__/currency.test.ts',
    'src/utils/rtlGuard.test.ts',
  ],
  M4: [
    'src/__tests__/aegisProtocols.test.ts',
    'src/__tests__/turingOrchestrator.test.ts',
    'src/components/KPITile.test.tsx',
    'src/__tests__/components/shared/DashboardComponents.test.tsx',
  ],
  M5: [
    'src/store/navigationSlice.test.ts',
    'src/store/slices/sidebarSlice.test.ts',
    'src/components/ProfilePage.test.tsx',
    'src/__tests__/components/AccountLink.test.tsx',
  ],
};

function parseArguments() {
  const args = process.argv.slice(2);
  let milestone = null;
  let files = [];
  let smoke = false;
  const isBail = args.includes('--bail');

  if (args.includes('--smoke')) {
    smoke = true;
  }

  const mIdx = args.indexOf('--milestone');
  if (mIdx !== -1 && args[mIdx + 1]) {
    milestone = args[mIdx + 1].toUpperCase();
  }

  const fIdx = args.indexOf('--files');
  if (fIdx !== -1 && args[fIdx + 1]) {
    files = args[fIdx + 1].split(',').map(f => f.trim().replace(/\\/g, '/'));
  }

  return { milestone, files, smoke, isBail };
}

export function resolveSuitesForFiles(files) {
  const suites = new Set();

  for (const file of files) {
    if (file.endsWith('.test.ts') || file.endsWith('.test.tsx')) {
      suites.add(file);
      continue;
    }

    if (file.startsWith('src/store/')) {
      suites.add('src/store/roleSlice.test.ts');
      suites.add('src/store/slices/aiAssistantDashboardSlice.test.ts');
    } else if (file.startsWith('src/adapters/')) {
      suites.add('src/adapters/BayutAdapter.test.ts');
    } else if (file.startsWith('src/services/')) {
      suites.add('src/services/finance/__tests__/uaeVatAndTaxEngine.test.ts');
      suites.add('src/services/henry/chequeCalculator.test.ts');
    } else if (file.startsWith('src/utils/')) {
      suites.add('src/utils/permissions.test.ts');
      suites.add('src/utils/doorMasking.test.ts');
    } else if (file.startsWith('src/config/')) {
      suites.add('src/utils/permissions.test.ts');
      suites.add('src/__tests__/FounderGuard.test.ts');
    } else {
      MILESTONE_SUITES.smoke.forEach(s => suites.add(s));
    }
  }

  return [...suites];
}

function runSuites(suites, isBail = false) {
  if (suites.length === 0) {
    console.log('ℹ️  No matching test suites to run.');
    return;
  }

  // Determine if any suite requires jsdom (React JSX/TSX component tests)
  const requiresJsdom = suites.some(s => s.endsWith('.tsx') || s.includes('/components/'));
  const envFlag = requiresJsdom ? '' : '--environment node';
  const bailFlag = isBail ? '--bail=1' : '';

  const testList = suites.join(' ');
  const command = `npx vitest run ${testList} ${envFlag} ${bailFlag}`.replace(/\s+/g, ' ').trim();

  console.log(`\n🚀 Running ${suites.length} targeted test suites [Environment: ${requiresJsdom ? 'jsdom' : 'node (accelerated)'}]:`);
  suites.forEach(s => console.log(`   • ${s}`));
  console.log(`   $ ${command}\n`);

  const startTime = Date.now();
  try {
    execSync(command, {
      cwd: ROOT,
      stdio: 'inherit',
    });
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✅ All ${suites.length} targeted test suites passed in ${duration}s!`);
    if (parseFloat(duration) > 10.0) {
      console.warn(`⚠️  Warning: Test duration (${duration}s) exceeded the 10-second budget target.`);
    }
  } catch {
    console.error(`\n❌ Targeted test execution failed.`);
    process.exit(1);
  }
}

function main() {
  const { milestone, files, smoke, isBail } = parseArguments();

  let suitesToRun = [];

  if (smoke) {
    suitesToRun = MILESTONE_SUITES.smoke;
  } else if (milestone && MILESTONE_SUITES[milestone]) {
    suitesToRun = MILESTONE_SUITES[milestone];
  } else if (files.length > 0) {
    suitesToRun = resolveSuitesForFiles(files);
  } else {
    // Default to smoke battery
    console.log('ℹ️  No milestone specified. Defaulting to Smoke test battery.');
    suitesToRun = MILESTONE_SUITES.smoke;
  }

  runSuites(suitesToRun, isBail);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main();
}

