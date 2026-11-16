#!/usr/bin/env node
/**
 * White Caves Real Estate — AEGIS V5.0
 * Tier 1: Line Limit Auditor (Single Purpose File Law < 350 lines)
 * 
 * Rules:
 * - Scans all .ts / .tsx files in src/
 * - Excludes __tests__/**, *.test.ts, *.test.tsx, *.spec.ts, *.spec.tsx, *.d.ts
 * - Threshold: strictly < 350 lines (349 lines pass, >= 350 fail)
 * - Zero dependencies (Node.js standard library only)
 * - Exit code: 0 if 0 violating files; 1 if any file >= 350 lines
 * 
 * Usage:
 *   node scripts/e2e-decomposition/line-limit-auditor.js [options]
 * 
 * Options:
 *   --json            Output machine-readable JSON to stdout
 *   --summary         Output directory & size tier summary tables only
 *   --fix-check       Fast mode: prints single status line and exits
 *   --include-specs   Include *.spec.ts and *.spec.tsx files in audit
 *   --include-tests   Include all test files (*.test.*, __tests__/**)
 *   --include-dts     Include *.d.ts declaration files
 *   --threshold <N>   Set custom line limit (default: 350)
 *   --dir <path>      Set root directory to scan (default: src)
 *   --top <N>         Show only the top N largest violations in table
 *   --no-color        Disable ANSI color codes
 *   --help, -h        Show this help message
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

// --- CLI Arguments Parsing ---
const args = process.argv.slice(2);
const options = {
  json: args.includes('--json'),
  summary: args.includes('--summary'),
  fixCheck: args.includes('--fix-check') || args.includes('--check'),
  includeSpecs: args.includes('--include-specs'),
  includeTests: args.includes('--include-tests'),
  includeDts: args.includes('--include-dts'),
  noColor: args.includes('--no-color') || process.env.NO_COLOR !== undefined || !process.stdout.isTTY,
  help: args.includes('--help') || args.includes('-h'),
  threshold: 350,
  targetDir: 'src',
  top: Infinity,
};

for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--threshold' || args[i] === '--limit' || args[i] === '--max') && args[i + 1]) {
    options.threshold = parseInt(args[i + 1], 10) || 350;
    i++;
  } else if (args[i] === '--dir' && args[i + 1]) {
    options.targetDir = args[i + 1];
    i++;
  } else if (args[i] === '--top' && args[i + 1]) {
    options.top = parseInt(args[i + 1], 10) || Infinity;
    i++;
  }
}

if (options.help) {
  console.log(`
White Caves Real Estate — Line Limit Auditor (< 350 lines)

Usage:
  node scripts/e2e-decomposition/line-limit-auditor.js [options]

Options:
  --json            Output machine-readable JSON to stdout
  --summary         Output directory & size tier summary tables only
  --fix-check       Fast mode: prints single status line and exits
  --include-specs   Include *.spec.ts and *.spec.tsx files in audit
  --include-tests   Include all test files (*.test.*, __tests__/**)
  --include-dts     Include *.d.ts declaration files
  --threshold <N>   Set custom line limit (default: 350)
  --dir <path>      Set root directory to scan (default: src)
  --top <N>         Show only the top N largest violations
  --no-color        Disable ANSI color codes
  --help, -h        Show this help message

Exit Codes:
  0 = All files compliant (< threshold lines)
  1 = One or more files violate threshold (>= threshold lines)
  2 = Execution error or bad configuration
`);
  process.exit(0);
}

// --- Colors Helper ---
const c = options.noColor ? {
  reset: '', bold: '', red: '', green: '', yellow: '', cyan: '', dim: '', magenta: '',
} : {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  magenta: '\x1b[35m',
};

// --- Repository Root Resolution ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SCAN_DIR = path.resolve(REPO_ROOT, options.targetDir);

if (!fs.existsSync(SCAN_DIR)) {
  console.error(`${c.red}Error: Scan directory does not exist: ${SCAN_DIR}${c.reset}`);
  process.exit(2);
}

// --- File Scanner ---
function walkDirectory(dir, fileList = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`${c.red}Error reading directory ${dir}: ${err.message}${c.reset}`);
    return fileList;
  }

  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.') continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'build' || entry.name === '.git') {
        continue;
      }
      walkDirectory(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// --- Filter Logic ---
function isAuditableFile(normalizedPath) {
  if (!normalizedPath.endsWith('.ts') && !normalizedPath.endsWith('.tsx')) {
    return false;
  }
  if (!options.includeDts && normalizedPath.endsWith('.d.ts')) {
    return false;
  }
  if (!options.includeTests) {
    if (normalizedPath.includes('/__tests__/') || normalizedPath.startsWith('src/__tests__/')) {
      return false;
    }
    if (/\.test\.[jt]sx?$/.test(normalizedPath)) {
      return false;
    }
  }
  if (!options.includeSpecs && !options.includeTests) {
    if (/\.spec\.[jt]sx?$/.test(normalizedPath)) {
      return false;
    }
  }
  return true;
}

// --- Physical Line Counter ---
function countLines(content) {
  if (content.length === 0) return 0;
  return content.split(/\r?\n/).length;
}

// --- Main Execution ---
const startTime = Date.now();
const allFiles = walkDirectory(SCAN_DIR);
const auditableFiles = [];

for (const rawPath of allFiles) {
  const relPath = path.relative(REPO_ROOT, rawPath).split(path.sep).join('/');
  if (isAuditableFile(relPath)) {
    auditableFiles.push({ fullPath: rawPath, relPath });
  }
}

const violations = [];
let totalLinesScanned = 0;
let maxFile = { file: '', lines: 0 };

for (const item of auditableFiles) {
  const content = fs.readFileSync(item.fullPath, 'utf8');
  const lines = countLines(content);
  totalLinesScanned += lines;

  if (lines > maxFile.lines) {
    maxFile = { file: item.relPath, lines };
  }

  if (lines >= options.threshold) {
    const overshoot = lines - (options.threshold - 1);
    violations.push({
      file: item.relPath,
      lines,
      overshoot,
      threshold: options.threshold,
    });
  }
}

violations.sort((a, b) => b.lines - a.lines);
const elapsedMs = Date.now() - startTime;
const passedCount = auditableFiles.length - violations.length;

// --- JSON Output Mode ---
if (options.json) {
  const dirStats = {};
  for (const v of violations) {
    const topDir = v.file.split('/').slice(0, 2).join('/');
    dirStats[topDir] = (dirStats[topDir] || 0) + 1;
  }

  const jsonResult = {
    timestamp: new Date().toISOString(),
    threshold: options.threshold,
    targetDir: options.targetDir,
    metrics: {
      totalAudited: auditableFiles.length,
      passed: passedCount,
      violations: violations.length,
      complianceRate: `${((passedCount / auditableFiles.length) * 100).toFixed(2)}%`,
      totalLinesScanned,
      maxFile,
      elapsedMs,
    },
    byDirectory: dirStats,
    violations: violations.map(v => ({
      file: v.file,
      lines: v.lines,
      overshoot: v.overshoot,
    })),
  };
  console.log(JSON.stringify(jsonResult, null, 2));
  process.exit(violations.length === 0 ? 0 : 1);
}

// --- Fix-Check Fast Mode ---
if (options.fixCheck) {
  if (violations.length === 0) {
    console.log(`${c.green}✔ PASS: All ${auditableFiles.length} files in ${options.targetDir} are < ${options.threshold} lines (${elapsedMs}ms).${c.reset}`);
    process.exit(0);
  } else {
    console.error(`${c.red}✘ FAIL: ${violations.length} of ${auditableFiles.length} files exceed ${options.threshold - 1} lines (limit: < ${options.threshold}).${c.reset}`);
    process.exit(1);
  }
}

// --- Table Formatting Helper ---
function padRight(str, len) {
  const s = String(str);
  return s.length >= len ? s : s + ' '.repeat(len - s.length);
}
function padLeft(str, len) {
  const s = String(str);
  return s.length >= len ? s : ' '.repeat(len - s.length) + s;
}

// --- Header Banner ---
console.log(`\n${c.bold}================================================================================${c.reset}`);
console.log(`${c.bold}${c.cyan}  WHITE CAVES CRM — LINE LIMIT AUDITOR (AEGIS V5.0 SINGLE PURPOSE LAW)${c.reset}`);
console.log(`${c.dim}  Ceiling: < ${options.threshold} lines (Max allowed: ${options.threshold - 1} lines) | Target: ${options.targetDir}/${c.reset}`);
console.log(`${c.bold}================================================================================${c.reset}\n`);

// --- Detailed Violations Table ---
if (!options.summary && violations.length > 0) {
  const displayList = violations.slice(0, options.top);
  console.log(`${c.bold}VIOLATIONS CATALOG (${displayList.length}${displayList.length < violations.length ? ` of ${violations.length}` : ''}):${c.reset}`);
  console.log('─'.repeat(80));
  console.log(`${c.bold}${padRight('Rank', 5)} ${padRight('File Path', 52)} ${padLeft('Lines', 7)} ${padLeft('Overshoot', 11)}${c.reset}`);
  console.log('─'.repeat(80));

  displayList.forEach((v, idx) => {
    const rankStr = padRight(`#${idx + 1}`, 5);
    let pathStr = v.file;
    if (pathStr.length > 51) {
      pathStr = '...' + pathStr.slice(-48);
    }
    pathStr = padRight(pathStr, 52);

    const linesStr = padLeft(v.lines, 7);
    const overColor = v.lines >= 1000 ? c.red : v.lines >= 600 ? c.yellow : c.magenta;
    const overStr = padLeft(`+${v.overshoot}`, 11);

    console.log(`${c.dim}${rankStr}${c.reset} ${pathStr} ${c.bold}${linesStr}${c.reset} ${overColor}${overStr}${c.reset}`);
  });
  console.log('─'.repeat(80));
  if (violations.length > options.top) {
    console.log(`${c.dim}... and ${violations.length - options.top} more files. Use --top ${violations.length} to view all.${c.reset}`);
  }
  console.log('');
}

// --- Directory Breakdown Table ---
const dirStats = {};
for (const v of violations) {
  const topDir = v.file.split('/').slice(0, 2).join('/');
  if (!dirStats[topDir]) {
    dirStats[topDir] = { count: 0, maxLines: 0, totalLines: 0 };
  }
  dirStats[topDir].count++;
  dirStats[topDir].totalLines += v.lines;
  if (v.lines > dirStats[topDir].maxLines) {
    dirStats[topDir].maxLines = v.lines;
  }
}

console.log(`${c.bold}BREAKDOWN BY DIRECTORY:${c.reset}`);
console.log('─'.repeat(80));
console.log(`${c.bold}${padRight('Directory', 36)} ${padLeft('Violating', 10)} ${padLeft('Max Lines', 12)} ${padLeft('% Total', 12)}${c.reset}`);
console.log('─'.repeat(80));

Object.entries(dirStats)
  .sort((a, b) => b[1].count - a[1].count)
  .forEach(([dir, stat]) => {
    const pct = ((stat.count / violations.length) * 100).toFixed(1) + '%';
    console.log(`${padRight(dir, 36)} ${padLeft(stat.count, 10)} ${padLeft(stat.maxLines, 12)} ${padLeft(pct, 12)}`);
  });
console.log('─'.repeat(80));
console.log('');

// --- Size Tiers Breakdown ---
const tiers = [
  { label: 'Extreme (1,000+ lines)', min: 1000, max: Infinity },
  { label: 'Very Large (700–999 lines)', min: 700, max: 999 },
  { label: 'Large (500–699 lines)', min: 500, max: 699 },
  { label: 'Moderate (400–499 lines)', min: 400, max: 499 },
  { label: 'Borderline (350–399 lines)', min: 350, max: 399 },
];

console.log(`${c.bold}SIZE TIER DISTRIBUTION:${c.reset}`);
console.log('─'.repeat(80));
console.log(`${c.bold}${padRight('Tier Range', 36)} ${padLeft('File Count', 12)} ${padLeft('% of Violations', 16)}${c.reset}`);
console.log('─'.repeat(80));

tiers.forEach(t => {
  const count = violations.filter(v => v.lines >= t.min && v.lines <= t.max).length;
  const pct = violations.length > 0 ? ((count / violations.length) * 100).toFixed(1) + '%' : '0.0%';
  console.log(`${padRight(t.label, 36)} ${padLeft(count, 12)} ${padLeft(pct, 16)}`);
});
console.log('─'.repeat(80));
console.log('');

// --- Summary & Final Exit Status ---
console.log(`${c.bold}AUDIT SUMMARY:${c.reset}`);
console.log(`  • Total Files Audited:    ${c.bold}${auditableFiles.length}${c.reset}`);
console.log(`  • Compliant Files (< 350): ${c.green}${passedCount}${c.reset} (${((passedCount / auditableFiles.length) * 100).toFixed(2)}%)`);
console.log(`  • Violating Files (>= 350):${violations.length > 0 ? c.red : c.green} ${violations.length}${c.reset}`);
console.log(`  • Highest Line Count:      ${c.bold}${maxFile.lines}${c.reset} (${maxFile.file})`);
console.log(`  • Execution Time:          ${elapsedMs} ms\n`);

if (violations.length === 0) {
  console.log(`${c.bold}${c.green}✔ SUCCESS: 100% of non-test files comply with the < ${options.threshold} lines limit.${c.reset}\n`);
  process.exit(0);
} else {
  console.log(`${c.bold}${c.red}✘ FAILURE: ${violations.length} files exceed the ${options.threshold - 1} line ceiling. Decomposition required.${c.reset}\n`);
  process.exit(1);
}

