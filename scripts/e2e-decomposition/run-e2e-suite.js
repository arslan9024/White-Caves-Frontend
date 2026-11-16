#!/usr/bin/env node
/**
 * run-e2e-suite.js — Master E2E Decomposition Test Suite Coordinator
 * ==================================================================
 * Coordinates all 4 verification tiers for the Codebase Decomposition Project:
 *   Tier 1: Line Limit Auditor (< 350L per non-test file)
 *   Tier 2: Facade & Import Integrity (Symbol parity, zero broken imports, zero upward imports, cycle check)
 *   Tier 3: TypeScript Non-Regression Ratchet (<= 1541 baseline errors, 0 new compiler errors)
 *   Tier 4: Targeted Vitest Regression Suite (< 10s fast execution)
 *
 * Usage:
 *   node scripts/e2e-decomposition/run-e2e-suite.js [--tier=1|2|3|4] [--bail] [--json] [--verbose]
 */

import { fork } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

const args = process.argv.slice(2);
let selectedTier = null;
const tierArg = args.find(a => a.startsWith('--tier=') || a === '--tier');
if (tierArg) {
  let rawVal = null;
  if (tierArg.startsWith('--tier=')) {
    rawVal = tierArg.slice('--tier='.length);
  } else {
    const idx = args.indexOf('--tier');
    if (idx !== -1 && args[idx + 1]) {
      rawVal = args[idx + 1];
    }
  }

  const parsed = Number(rawVal);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 4) {
    console.error(`❌ Invalid tier specified: "${rawVal ?? ''}". Valid options are --tier=1, 2, 3, 4.`);
    process.exit(2);
  }
  selectedTier = parsed;
}

const isBail = args.includes('--bail');
const isJson = args.includes('--json');
const isVerbose = args.includes('--verbose');

// Forward flags to child scripts where applicable
const childArgs = args.filter(a => !a.startsWith('--tier'));

const TIERS = [
  {
    tier: 1,
    name: 'Tier 1: Line Limit Auditor (< 350L)',
    script: resolve(__dirname, 'line-limit-auditor.js'),
    description: 'Enforces < 350 physical lines on all non-test .ts/.tsx files',
  },
  {
    tier: 2,
    name: 'Tier 2: Facade & Import Integrity',
    script: resolve(__dirname, 'check-import-integrity.js'),
    companionScript: resolve(__dirname, 'check-facade-integrity.js'),
    description: 'Validates 100% symbol re-exports, 0 broken imports, 0 upward imports, and cycle limits',
  },
  {
    tier: 3,
    name: 'Tier 3: TypeScript Non-Regression',
    script: resolve(__dirname, 'check-typescript-regression.js'),
    description: 'Guarantees zero new tsc compiler errors on modified files',
  },
  {
    tier: 4,
    name: 'Tier 4: Targeted Vitest Tests',
    script: resolve(__dirname, 'run-targeted-tests.js'),
    description: 'Executes fast targeted Vitest test suites for decomposed domains',
  },
];

async function runChildScript(scriptPath, extraArgs = []) {
  const t0 = Date.now();
  return new Promise(resPromise => {
    const cp = fork(scriptPath, extraArgs, {
      cwd: ROOT,
      stdio: isJson ? ['ignore', 'pipe', 'pipe', 'ipc'] : 'inherit',
    });

    let stdout = '';
    let stderr = '';
    if (isJson) {
      cp.stdout?.on('data', d => (stdout += d.toString()));
      cp.stderr?.on('data', d => (stderr += d.toString()));
    }

    cp.on('close', code => {
      resPromise({
        code: code === null ? 1 : code,
        durationMs: Date.now() - t0,
        stdout,
        stderr,
      });
    });
  });
}

async function runMasterSuite() {
  const startTime = Date.now();
  const scorecard = [];
  let overallPass = true;

  if (!isJson) {
    console.log('\n' + '='.repeat(80));
    console.log('         WHITE CAVES REAL ESTATE — E2E DECOMPOSITION TEST SUITE');
    console.log('='.repeat(80));
  }

  for (const tierConfig of TIERS) {
    if (selectedTier && tierConfig.tier !== selectedTier) continue;

    if (!isJson) {
      console.log(`\n▶ Starting [${tierConfig.name}]...`);
    }

    const res = await runChildScript(tierConfig.script, childArgs);
    let passed = res.code === 0;

    // Run companion script if defined (e.g. Tier 2 facade integrity check)
    if (passed && tierConfig.companionScript) {
      const compRes = await runChildScript(tierConfig.companionScript, childArgs);
      passed = compRes.code === 0;
      res.durationMs += compRes.durationMs;
      if (!passed) res.code = compRes.code;
    }

    scorecard.push({
      tier: tierConfig.tier,
      name: tierConfig.name,
      passed,
      durationMs: res.durationMs,
      exitCode: res.code,
    });

    if (!passed) {
      overallPass = false;
      if (isBail) {
        if (!isJson) console.error(`\n⛔ [BAIL] Terminating early on ${tierConfig.name} failure.`);
        break;
      }
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

  if (isJson) {
    console.log(JSON.stringify({ overallPass, totalDurationSec: totalTime, scorecard }, null, 2));
  } else {
    console.log('\n' + '='.repeat(80));
    console.log('                             SUMMARY SCORECARD');
    console.log('='.repeat(80));
    for (const item of scorecard) {
      const statusStr = item.passed ? 'PASS' : 'FAIL';
      const col = item.passed ? '\x1b[32m' : '\x1b[31m';
      console.log(`  [TIER ${item.tier}] ${item.name.padEnd(42)} ${col}${statusStr.padStart(6)}\x1b[0m   (${item.durationMs}ms)`);
    }
    console.log('='.repeat(80));
    const finalCol = overallPass ? '\x1b[32m' : '\x1b[31m';
    console.log(`  OVERALL STATUS: ${finalCol}${overallPass ? 'PASS' : 'FAIL'}\x1b[0m (${totalTime}s)`);
    console.log('='.repeat(80) + '\n');
  }

  process.exit(overallPass ? 0 : 1);
}

runMasterSuite();

