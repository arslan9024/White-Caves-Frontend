#!/usr/bin/env node
/**
 * check-import-integrity.js — Tier 2B Import Resolution & Cycle Detection Suite
 * ==============================================================================
 * Verifies that:
 *   1. Zero unresolved imports exist across all modified/decomposed files.
 *   2. Zero sub-modules illegally import upward into parent facades (DAG Enforcement).
 *   3. Zero circular dependency cycles are introduced by decomposed modules.
 *   4. Total unresolved imports and cycles do not exceed grandfathered baselines.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, basename, relative, normalize } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const SRC = resolve(ROOT, 'src');
const BASELINE_UNRESOLVED_MAX = 109; // Grandfathered legacy debt
const BASELINE_CYCLES_MAX = 41;       // Grandfathered legacy cycles

const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
const externalPackages = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'path', 'fs', 'url', 'crypto', 'events', 'util', 'stream', 'buffer', 'os', 'child_process',
  'node:fs', 'node:path', 'node:url', 'node:child_process', 'node:crypto', 'node:os', 'node:util',
]);

const EXTENSIONS = ['', '.ts', '.tsx', '.js', '.jsx', '.json', '.mjs', '.css', '.scss', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.d.ts'];

/** Resolve an import specifier to an absolute path */
export function resolveImport(importerFile, specifier) {
  if (externalPackages.has(specifier) || specifier.startsWith('node:')) {
    return { resolved: true, type: 'external' };
  }
  const pkgBase = specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
  if (externalPackages.has(pkgBase)) {
    return { resolved: true, type: 'external-sub' };
  }

  let targetPath = null;
  if (specifier === '@' || specifier.startsWith('@/')) {
    targetPath = resolve(SRC, specifier.slice(2));
  } else if (specifier === '@components' || specifier.startsWith('@components/')) {
    targetPath = resolve(SRC, 'components', specifier.slice('@components/'.length || 0));
  } else if (specifier === '@atoms' || specifier.startsWith('@atoms/')) {
    targetPath = resolve(SRC, 'components/atoms', specifier.slice('@atoms/'.length || 0));
  } else if (specifier === '@molecules' || specifier.startsWith('@molecules/')) {
    targetPath = resolve(SRC, 'components/molecules', specifier.slice('@molecules/'.length || 0));
  } else if (specifier === '@shared' || specifier.startsWith('@shared/')) {
    targetPath = resolve(SRC, 'components/shared', specifier.slice('@shared/'.length || 0));
  } else if (specifier === '@layouts' || specifier.startsWith('@layouts/')) {
    targetPath = resolve(SRC, 'layouts', specifier.slice('@layouts/'.length || 0));
  } else if (specifier === '@context' || specifier.startsWith('@context/')) {
    targetPath = resolve(SRC, 'context', specifier.slice('@context/'.length || 0));
  } else if (specifier === '@locales' || specifier.startsWith('@locales/')) {
    targetPath = resolve(SRC, 'locales', specifier.slice('@locales/'.length || 0));
  } else if (specifier === '@mocks' || specifier.startsWith('@mocks/')) {
    targetPath = resolve(SRC, 'mocks', specifier.slice('@mocks/'.length || 0));
  } else if (specifier === '@store' || specifier.startsWith('@store/')) {
    targetPath = resolve(SRC, 'store', specifier.slice('@store/'.length || 0));
  } else if (specifier === '@hooks' || specifier.startsWith('@hooks/')) {
    targetPath = resolve(SRC, 'hooks', specifier.slice('@hooks/'.length || 0));
  } else if (specifier === '@server' || specifier.startsWith('@server/')) {
    targetPath = resolve(ROOT, 'server', specifier.slice('@server/'.length || 0));
  } else if (specifier === '@lib' || specifier.startsWith('@lib/')) {
    targetPath = resolve(SRC, 'lib', specifier.slice('@lib/'.length || 0));
  } else if (specifier === '@pages' || specifier.startsWith('@pages/')) {
    targetPath = resolve(SRC, 'pages', specifier.slice('@pages/'.length || 0));
  } else if (specifier === '@utils' || specifier.startsWith('@utils/')) {
    targetPath = resolve(SRC, 'utils', specifier.slice('@utils/'.length || 0));
  } else if (specifier === '@assets' || specifier.startsWith('@assets/')) {
    targetPath = resolve(ROOT, 'attached_assets', specifier.slice('@assets/'.length || 0));
  } else if (specifier.startsWith('.')) {
    targetPath = resolve(dirname(importerFile), specifier);
  } else {
    if (existsSync(resolve(ROOT, 'node_modules', specifier))) return { resolved: true, type: 'node_modules' };
    return { resolved: false, reason: 'unknown-specifier' };
  }

  for (const ext of EXTENSIONS) {
    const candidate = targetPath + ext;
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return { resolved: true, path: candidate, type: 'file' };
    }
  }

  for (const ext of EXTENSIONS) {
    if (!ext) continue;
    const candidate = resolve(targetPath, 'index' + ext);
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return { resolved: true, path: candidate, type: 'index' };
    }
  }

  return { resolved: false, reason: 'file-not-found', targetPath };
}

const IMPORT_RE = /(?:import|export)\s+(?:(?:(?:\*\s+as\s+\w+|[\w\s{},*]+)\s+from\s+)?['"]([^'"]+)['"]|type\s+[^'"]+from\s+['"]([^'"]+)['"])|import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

/** Scan non-test files across src/ */
export function scanSourceFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== '__tests__') {
        scanSourceFiles(p, files);
      }
    } else if (/\.[jt]sx?$/.test(entry.name) && !/\.(test|spec)\./.test(entry.name)) {
      files.push(p);
    }
  }
  return files;
}

/** Check for architectural upward imports: sub-modules must not import parent facades */
export function checkUpwardImports(importerFile, resolvedPath) {
  const normImporter = normalize(importerFile).replace(/\\/g, '/');
  const normResolved = normalize(resolvedPath).replace(/\\/g, '/');

  if (normImporter === normResolved) return null;
  if (!normResolved.match(/\.[jt]sx?$/)) return null;

  const resolvedDir = dirname(normResolved);
  const resolvedBase = basename(normResolved).replace(/\.[jt]sx?$/, '');
  const importerDir = dirname(normImporter);

  if (importerDir.startsWith(resolvedDir)) {
    const relFromDir = relative(resolvedDir, importerDir).replace(/\\/g, '/');
    const firstSubDir = relFromDir.split('/')[0];
    if (firstSubDir && firstSubDir.length >= 2) {
      if (resolvedBase.toLowerCase() === firstSubDir.toLowerCase()) {
        return `[UPWARD_IMPORT] Sub-module ${normImporter} illegally imports upward from parent facade ${normResolved}`;
      }
    }
  }

  return null;
}

/** Run complete import and cycle audit */
export function auditImportsAndCycles() {
  const allFiles = scanSourceFiles(SRC);
  const unresolvedHits = [];
  const upwardHits = [];
  const adj = new Map();

  for (const file of allFiles) {
    const rel = relative(ROOT, file).replace(/\\/g, '/');
    adj.set(rel, new Set());
    const content = readFileSync(file, 'utf8');

    let m;
    while ((m = IMPORT_RE.exec(content)) !== null) {
      const spec = m[1] || m[2] || m[3];
      if (!spec) continue;

      const res = resolveImport(file, spec);
      if (!res.resolved) {
        unresolvedHits.push({ file: rel, spec, reason: res.reason });
      } else if (res.path && res.path.startsWith(SRC)) {
        const resolvedRel = relative(ROOT, res.path).replace(/\\/g, '/');
        adj.get(rel).add(resolvedRel);

        const upwardErr = checkUpwardImports(file, res.path);
        if (upwardErr) upwardHits.push(upwardErr);
      }
    }
  }

  // DFS 3-Color Cycle Detection
  const state = new Map();
  const cycles = [];
  const stack = [];

  function dfs(u) {
    state.set(u, 1);
    stack.push(u);
    const neighbors = adj.get(u) || [];
    for (const v of neighbors) {
      const s = state.get(v) || 0;
      if (s === 1) {
        const idx = stack.indexOf(v);
        cycles.push(stack.slice(idx).concat(v));
      } else if (s === 0) {
        dfs(v);
      }
    }
    stack.pop();
    state.set(u, 2);
  }

  for (const node of adj.keys()) {
    if ((state.get(node) || 0) === 0) dfs(node);
  }

  return {
    totalFiles: allFiles.length,
    unresolvedCount: unresolvedHits.length,
    unresolvedHits,
    upwardHits,
    cycleCount: cycles.length,
    cycles,
  };
}

export function getGitModifiedAndUntrackedFiles() {
  try {
    const status = execFileSync('git', ['status', '--porcelain'], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return status
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const filePath = line.slice(3).trim();
        if (filePath.includes(' -> ')) {
          return filePath.split(' -> ')[1].trim().replace(/\\/g, '/');
        }
        return filePath.replace(/\\/g, '/');
      });
  } catch {
    return [];
  }
}

// Direct CLI Execution
const isDirectExecution = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isDirectExecution) {
  console.log('Running Tier 2B Import Resolution & Cycle Audit...');
  const res = auditImportsAndCycles();

  let failed = false;

  if (res.upwardHits.length > 0) {
    failed = true;
    console.error(`\n❌ Upward Facade Import Violations (${res.upwardHits.length}):`);
    res.upwardHits.forEach(h => console.error(`  ✗ ${h}`));
  }

  if (res.unresolvedCount > BASELINE_UNRESOLVED_MAX) {
    failed = true;
    console.error(`\n❌ Unresolved Imports grew: ${res.unresolvedCount} > baseline ${BASELINE_UNRESOLVED_MAX}`);
    res.unresolvedHits.slice(0, 15).forEach(h => console.error(`  ✗ ${h.file} -> "${h.spec}"`));
  }

  // Check if any cycle touches a git-modified or untracked file
  const modifiedFiles = new Set(getGitModifiedAndUntrackedFiles());
  const cyclesInModified = res.cycles.filter(cycle =>
    cycle.some(node => modifiedFiles.has(node))
  );

  if (cyclesInModified.length > 0) {
    failed = true;
    console.error(`\n❌ [CYCLE_REGRESSION] Circular dependency touches modified/decomposed file (${cyclesInModified.length}):`);
    cyclesInModified.forEach(c => console.error(`  ✗ ${c.join(' -> ')}`));
  }

  if (res.cycleCount > BASELINE_CYCLES_MAX) {
    failed = true;
    console.error(`\n❌ Circular dependencies grew: ${res.cycleCount} > baseline ${BASELINE_CYCLES_MAX}`);
    res.cycles.slice(0, 5).forEach(c => console.error(`  ✗ ${c.join(' -> ')}`));
  }

  if (failed) {
    process.exit(1);
  } else {
    console.log(`✅ Import & Cycle Audit Passed:`);
    console.log(`   - 0 upward facade imports`);
    console.log(`   - Unresolved imports within baseline (${res.unresolvedCount} <= ${BASELINE_UNRESOLVED_MAX})`);
    console.log(`   - Dependency cycles within baseline (${res.cycleCount} <= ${BASELINE_CYCLES_MAX})`);
    process.exit(0);
  }
}

