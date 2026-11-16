#!/usr/bin/env node
/**
 * scripts/e2e-decomposition/check-typescript-regression.js
 * =============================================================================
 * Tier 3: TypeScript Non-Regression Verification Harness for Codebase Decomposition.
 * 
 * Rules Enforced:
 *   1. Zero new compiler errors on any newly extracted / created files (Strict Zero).
 *   2. No increase in compiler errors on modified files (<= baseline count).
 *   3. No new TS error codes introduced on previously modified files.
 *   4. Total project errors must not exceed baseline (1,541 legacy errors).
 *   5. Targeted verification (--files <paths>) for instant subagent verification.
 *   6. Ratchet downward (--update-baseline) to permanently lock in improvements.
 * =============================================================================
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '../..');
const BASELINE_PATH = join(__dirname, 'tsc-baseline.json');

const ERROR_REGEX = /^([^(]+)\((\d+),(\d+)\):\s+error\s+(TS\d+):\s+(.*)$/;

function parseArguments() {
  const args = process.argv.slice(2);
  const options = {
    updateBaseline: args.includes('--update-baseline'),
    json: args.includes('--json'),
    files: [],
  };

  const filesIdx = args.indexOf('--files');
  if (filesIdx !== -1 && args[filesIdx + 1]) {
    options.files = args[filesIdx + 1].split(',').map(f => normalizePath(f.trim()));
  }

  return options;
}

function normalizePath(p) {
  const rel = relative(ROOT, resolve(ROOT, p));
  return rel.replace(/\\/g, '/');
}

export function runTypecheck() {
  let output = '';
  try {
    output = execSync('npx tsc --noEmit --skipLibCheck', {
      cwd: ROOT,
      maxBuffer: 32 * 1024 * 1024,
      encoding: 'utf8',
      env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=8192' },
    });
  } catch (error) {
    output = (error.stdout || '') + '\n' + (error.stderr || '');
  }

  const errors = [];
  const errorsByFile = {};

  for (const line of output.split(/\r?\n/)) {
    const match = line.match(ERROR_REGEX);
    if (match) {
      const file = normalizePath(match[1]);
      const entry = {
        file,
        line: parseInt(match[2], 10),
        col: parseInt(match[3], 10),
        code: match[4],
        message: match[5].trim(),
      };
      errors.push(entry);
      if (!errorsByFile[file]) {
        errorsByFile[file] = [];
      }
      errorsByFile[file].push(entry);
    }
  }

  return { total: errors.length, errors, errorsByFile };
}

function generateBaseline(current) {
  const fileCounts = {};
  for (const [file, errs] of Object.entries(current.errorsByFile)) {
    fileCounts[file] = {
      count: errs.length,
      codes: [...new Set(errs.map(e => e.code))].sort(),
    };
  }

  const baselineData = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    totalErrors: current.total,
    uniqueFiles: Object.keys(current.errorsByFile).length,
    fileCounts,
  };

  writeFileSync(BASELINE_PATH, JSON.stringify(baselineData, null, 2), 'utf8');
  console.log(`✅ Baseline successfully updated at ${BASELINE_PATH}: ${current.total} errors across ${Object.keys(current.errorsByFile).length} files.`);
}

export function compareWithBaseline(current, baseline, filterFiles = []) {
  const violations = [];
  const targetFiles = filterFiles.length > 0 ? filterFiles : Object.keys(current.errorsByFile);

  for (const file of targetFiles) {
    const currentErrs = current.errorsByFile[file] || [];
    const baseInfo = baseline.fileCounts[file];

    if (!baseInfo) {
      // Newly created or previously zero-error file
      if (currentErrs.length > 0) {
        for (const err of currentErrs) {
          violations.push({
            type: 'NEW_FILE_ERROR',
            file,
            line: err.line,
            col: err.col,
            code: err.code,
            message: err.message,
            detail: `File has ${currentErrs.length} errors (0 allowed for new/clean files).`,
          });
        }
      }
    } else {
      // Existing grandfathered file
      if (currentErrs.length > baseInfo.count) {
        const excess = currentErrs.length - baseInfo.count;
        violations.push({
          type: 'ERROR_COUNT_REGRESSION',
          file,
          detail: `File error count increased from ${baseInfo.count} to ${currentErrs.length} (+${excess} new errors).`,
          errors: currentErrs,
        });
      }

      // Check for new error codes
      const currentCodes = new Set(currentErrs.map(e => e.code));
      for (const code of currentCodes) {
        if (!baseInfo.codes.includes(code)) {
          violations.push({
            type: 'NEW_ERROR_CODE',
            file,
            code,
            detail: `New error code ${code} introduced that did not exist in baseline.`,
          });
        }
      }
    }
  }

  // Global ceiling check (if full scan)
  if (filterFiles.length === 0 && current.total > baseline.totalErrors) {
    violations.push({
      type: 'GLOBAL_CEILING_EXCEEDED',
      detail: `Total project errors (${current.total}) exceeded baseline limit (${baseline.totalErrors}).`,
    });
  }

  return violations;
}

function main() {
  const options = parseArguments();

  console.log('🔍 Executing TypeScript non-regression compiler check (tsc --noEmit --skipLibCheck)...');
  const startTime = Date.now();
  const current = runTypecheck();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`⏱️  Compilation completed in ${duration}s. Found ${current.total} total errors across ${Object.keys(current.errorsByFile).length} files.`);

  if (options.updateBaseline) {
    generateBaseline(current);
    process.exit(0);
  }

  if (!existsSync(BASELINE_PATH)) {
    console.error(`⚠️  Baseline file not found at ${BASELINE_PATH}. Initializing baseline now...`);
    generateBaseline(current);
    process.exit(0);
  }

  const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
  const violations = compareWithBaseline(current, baseline, options.files);

  if (options.json) {
    console.log(JSON.stringify({ passed: violations.length === 0, violations, currentTotal: current.total, baselineTotal: baseline.totalErrors }, null, 2));
    process.exit(violations.length === 0 ? 0 : 1);
  }

  if (violations.length === 0) {
    console.log(`\n========================================================================`);
    console.log(`  ✅ TIER 3: ZERO TYPESCRIPT REGRESSIONS DETECTED`);
    console.log(`  • Baseline ceiling: ${baseline.totalErrors} errors`);
    console.log(`  • Current total:    ${current.total} errors (${current.total <= baseline.totalErrors ? current.total - baseline.totalErrors : '+' + (current.total - baseline.totalErrors)})`);
    if (options.files.length > 0) {
      console.log(`  • Targeted files:   ${options.files.length} verified clean`);
    }
    console.log(`========================================================================\n`);
    process.exit(0);
  } else {
    console.error(`\n========================================================================`);
    console.error(`  ❌ TIER 3: TYPESCRIPT COMPILATION REGRESSIONS DETECTED (${violations.length} violations)`);
    console.error(`========================================================================`);
    for (const v of violations) {
      console.error(`  ❌ [${v.type}] ${v.file || ''}`);
      if (v.line) console.error(`     Line ${v.line}:${v.col} [${v.code}] ${v.message}`);
      if (v.detail) console.error(`     ${v.detail}`);
    }
    console.error(`\nResolve compiler errors before proceeding.\n`);
    process.exit(1);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main();
}

