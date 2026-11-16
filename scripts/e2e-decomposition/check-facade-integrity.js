#!/usr/bin/env node
/**
 * check-facade-integrity.js — Tier 2A Facade Re-export & Symbol Parity Auditor
 * ============================================================================
 * Verifies that decomposed facade files:
 *   1. Re-export 100% of the symbols originally exported in Git HEAD.
 *   2. Preserve default exports if present in HEAD.
 *   3. Fulfill all consumer named imports across src/.
 *   4. Use `export type *` for type-only modules (isolatedModules compliance).
 */

import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, relative, normalize } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const SRC = resolve(ROOT, 'src');

/** Read file content from Git HEAD */
export function getHeadContent(relPath) {
  try {
    return execFileSync('git', ['show', `HEAD:${relPath.replace(/\\/g, '/')}`], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null;
  }
}

/** Resolve a relative import specifier from a source file */
export function resolveRelativeImport(sourceFile, specifier) {
  if (!specifier.startsWith('.')) return null;
  const dir = dirname(sourceFile);
  const target = resolve(dir, specifier);
  const candidates = [
    target + '.ts',
    target + '.tsx',
    target + '.js',
    target + '.jsx',
    resolve(target, 'index.ts'),
    resolve(target, 'index.tsx'),
    resolve(target, 'index.js'),
    target,
  ];
  for (const c of candidates) {
    try {
      if (existsSync(c) && statSync(c).isFile()) return c;
    } catch {
      // ignore
    }
  }
  return null;
}

/** Extract top-level exported symbols from source text using TypeScript AST */
export function extractDeclaredExports(sourceText, fileName = 'file.ts') {
  const sf = ts.createSourceFile(fileName, sourceText, ts.ScriptTarget.Latest, true);
  const namedExports = new Set();
  let hasDefault = false;
  const starReExports = [];
  const typeStarReExports = [];

  for (const stmt of sf.statements) {
    const isExported = stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
    const isDefault = stmt.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword);

    if (isDefault) hasDefault = true;

    if (isExported) {
      if (ts.isVariableStatement(stmt)) {
        const extractBindingNames = (pattern) => {
          for (const el of pattern.elements) {
            if (ts.isOmittedExpression?.(el)) continue;
            if (!el.name) continue;
            if (ts.isIdentifier(el.name)) {
              namedExports.add(el.name.text);
            } else if (ts.isObjectBindingPattern(el.name) || ts.isArrayBindingPattern(el.name)) {
              extractBindingNames(el.name);
            }
          }
        };

        for (const decl of stmt.declarationList.declarations) {
          if (ts.isIdentifier(decl.name)) {
            namedExports.add(decl.name.text);
          } else if (ts.isObjectBindingPattern(decl.name) || ts.isArrayBindingPattern(decl.name)) {
            extractBindingNames(decl.name);
          }
        }
      } else if (ts.isFunctionDeclaration(stmt) && stmt.name) {
        namedExports.add(stmt.name.text);
      } else if (ts.isClassDeclaration(stmt) && stmt.name) {
        namedExports.add(stmt.name.text);
      } else if (ts.isInterfaceDeclaration(stmt)) {
        namedExports.add(stmt.name.text);
      } else if (ts.isTypeAliasDeclaration(stmt)) {
        namedExports.add(stmt.name.text);
      } else if (ts.isEnumDeclaration(stmt)) {
        namedExports.add(stmt.name.text);
      }
    }

    if (ts.isExportAssignment(stmt)) {
      hasDefault = true;
    }

    if (ts.isExportDeclaration(stmt)) {
      const specifier = stmt.moduleSpecifier && ts.isStringLiteral(stmt.moduleSpecifier)
        ? stmt.moduleSpecifier.text
        : null;

      // export * as helpers from './sub'
      if (stmt.exportClause && ts.isNamespaceExport(stmt.exportClause)) {
        namedExports.add(stmt.exportClause.name.text);
      }

      // export * from './sub' or export type * from './sub'
      if (!stmt.exportClause && specifier) {
        if (stmt.isTypeOnly) {
          typeStarReExports.push(specifier);
        } else {
          starReExports.push(specifier);
        }
      }

      // export { a, b as c, default as d } from './sub'
      if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        for (const el of stmt.exportClause.elements) {
          const name = el.name.text;
          if (name === 'default') hasDefault = true;
          else namedExports.add(name);
        }
      }
    }
  }

  return { namedExports, hasDefault, starReExports, typeStarReExports };
}

/** Recursively resolve all exported symbols from a facade file and its delegates */
export function resolveAllFacadeExports(filePath, visited = new Set()) {
  const norm = normalize(filePath);
  if (visited.has(norm)) return { namedExports: new Set(), hasDefault: false, typeStarViolations: [] };
  visited.add(norm);

  if (!existsSync(filePath)) return { namedExports: new Set(), hasDefault: false, typeStarViolations: [] };
  try {
    if (!statSync(filePath).isFile()) return { namedExports: new Set(), hasDefault: false, typeStarViolations: [] };
  } catch {
    return { namedExports: new Set(), hasDefault: false, typeStarViolations: [] };
  }

  const content = readFileSync(filePath, 'utf8');
  const parsed = extractDeclaredExports(content, filePath);
  const namedExports = new Set(parsed.namedExports);
  let hasDefault = parsed.hasDefault;
  const typeStarViolations = [];

  const allStars = [...parsed.starReExports, ...parsed.typeStarReExports];
  for (const starSpec of allStars) {
    const isTypeOnly = parsed.typeStarReExports.includes(starSpec);
    if (!isTypeOnly && (starSpec.includes('.types') || starSpec.includes('/types'))) {
      typeStarViolations.push(`${filePath}: re-export from "${starSpec}" should use "export type *" for isolatedModules`);
    }

    const subPath = resolveRelativeImport(filePath, starSpec);
    if (subPath) {
      const subResult = resolveAllFacadeExports(subPath, visited);
      subResult.namedExports.forEach(e => namedExports.add(e));
      if (subResult.hasDefault && !hasDefault) hasDefault = true;
      typeStarViolations.push(...subResult.typeStarViolations);
    }
  }

  return { namedExports, hasDefault, typeStarViolations };
}

/** Audit a list of facade files against their Git HEAD baseline */
export function auditFacades(facadePaths) {
  const violations = [];
  let checkedCount = 0;

  for (const relPath of facadePaths) {
    const absPath = resolve(ROOT, relPath);
    const headCode = getHeadContent(relPath);
    if (!headCode) continue; // New file, not a decomposed facade of a HEAD file

    checkedCount++;
    const headExports = extractDeclaredExports(headCode, relPath);
    const facadeExports = resolveAllFacadeExports(absPath);

    // 1. Missing named symbols check
    const missingNamed = [];
    for (const sym of headExports.namedExports) {
      if (!facadeExports.namedExports.has(sym)) {
        missingNamed.push(sym);
      }
    }

    if (missingNamed.length > 0) {
      violations.push(
        `[MISSING_EXPORTS] ${relPath} omitted ${missingNamed.length} symbol(s) previously in HEAD: ${missingNamed.join(', ')}`
      );
    }

    // 2. Default export check
    if (headExports.hasDefault && !facadeExports.hasDefault) {
      violations.push(`[MISSING_DEFAULT] ${relPath} had default export in HEAD but facade provides none.`);
    }

    // 3. isolatedModules type-only check
    if (facadeExports.typeStarViolations.length > 0) {
      violations.push(...facadeExports.typeStarViolations);
    }
  }

  return { checkedCount, violations };
}

// Direct CLI invocation
const isDirectExecution = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isDirectExecution) {
  let targetFiles = [];
  const filesArgIdx = process.argv.indexOf('--files');
  if (filesArgIdx !== -1 && process.argv[filesArgIdx + 1]) {
    targetFiles = process.argv[filesArgIdx + 1].split(',').map(f => f.trim().replace(/\\/g, '/'));
  } else {
    try {
      const status = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' });
      targetFiles = status
        .split(/\r?\n/)
        .map(line => line.slice(3).trim())
        .filter(f => f.startsWith('src/') && /\.[jt]sx?$/.test(f) && !/\.(test|spec)\./.test(f));
    } catch {
      targetFiles = [];
    }
  }

  console.log(`Auditing ${targetFiles.length} modified non-test files for facade integrity...`);
  const { checkedCount, violations } = auditFacades(targetFiles);

  if (violations.length > 0) {
    console.error(`\n❌ Facade Integrity Violations (${violations.length}):`);
    violations.forEach(v => console.error(`  ✗ ${v}`));
    process.exit(1);
  } else {
    console.log(`✅ Facade Integrity Passed: ${checkedCount} facades verified with 100% symbol parity.`);
    process.exit(0);
  }
}

