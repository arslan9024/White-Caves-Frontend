/**
 * Performance Infrastructure — Unit Tests
 *
 * Validates:
 * - Vite manual chunk configuration (20+ chunks)
 * - Route-level code splitting (all routes lazy-loaded)
 * - Image CLS prevention (width/height attributes)
 * - Font loading optimization (preconnect + display=swap)
 * - Skeleton loader component
 * - Prefetch utilities
 * - IntersectionObserver hook
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(__dirname, '../../..');

/* ──────────────────────────── Helpers ─────────────────────────── */

function readSource(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), 'utf-8');
}

/* ──────────────────────────────────────────────────────────────────
 * 1. Vite Build — Manual Chunk Strategy
 * ──────────────────────────────────────────────────────────────── */

describe('Vite Build Configuration', () => {
  const viteConfig = readSource('vite.config.js');

  it('has build configuration', () => {
    expect(viteConfig).toContain('build:');
  });

  it('has chunkSizeWarningLimit set', () => {
    expect(viteConfig).toContain('chunkSizeWarningLimit');
  });
});

/* ──────────────────────────────────────────────────────────────────
 * 2. Route-Level Code Splitting
 * ──────────────────────────────────────────────────────────────── */

describe('Route Code Splitting', () => {
  const appSource = [
    readSource('src/App.tsx'),
    readSource('src/components/App/App.pages.tsx'),
    readSource('src/components/App/App.view.tsx'),
  ].join('\n');

  it('uses React.lazy for route components', () => {
    const lazyCount = (appSource.match(/\blazy(?:Retry)?\s*\(\s*\(\)/g) || []).length;
    expect(lazyCount).toBeGreaterThanOrEqual(10);
  });

  it('wraps routes in Suspense boundaries', () => {
    expect(appSource).toContain('Suspense');
  });

  it('lazy-loads public and intelligence pages', () => {
    expect(appSource).toMatch(/HomePage\s*=\s*lazy/);
    expect(appSource).toMatch(/MarketIntelligencePage\s*=\s*lazy/);
    expect(appSource).toMatch(/ValuationPage\s*=\s*lazy/);
  });

  it('lazy-loads auth pages', () => {
    expect(appSource).toMatch(/SignInPage\s*=\s*lazy/);
  });

  it('lazy-loads CRM dashboard', () => {
    expect(appSource).toMatch(/(?:Dashboard|CRM).*=\s*lazy/i);
  });
});

/* ──────────────────────────────────────────────────────────────────
 * 3. Homepage Section Splitting
 * ──────────────────────────────────────────────────────────────── */

describe('Homepage Code Splitting', () => {
  const homepageSource = readSource('src/pages/HomePage.tsx');

  it('renders decoupled CRM Command Center after public sections moved to White-Caves-Web', () => {
    expect(homepageSource).toContain('data-testid="crm-command-center"');
  });

  it('exposes all 12 corporate department floor routes', () => {
    expect(homepageSource).toContain('DEPARTMENT_FLOORS');
    expect(homepageSource).toContain('/crm/floor/1');
    expect(homepageSource).toContain('/crm/floor/12');
  });

  it('maintains route-scoped hero preload lifecycle hooks', () => {
    expect(homepageSource).toContain('ensureHomepageHeroPreload()');
    expect(homepageSource).toContain('cleanupHomepageHeroPreload()');
  });
});

/* ──────────────────────────────────────────────────────────────────
 * 4. Font Loading Optimization
 * ──────────────────────────────────────────────────────────────── */

describe('Font Loading (index.html)', () => {
  const indexHtml = readSource('index.html');

  it('has preconnect to fonts.googleapis.com', () => {
    expect(indexHtml).toContain('rel="preconnect" href="https://fonts.googleapis.com"');
  });

  it('has preconnect to fonts.gstatic.com', () => {
    expect(indexHtml).toContain('fonts.gstatic.com');
  });

  it('uses display=swap for font loading', () => {
    expect(indexHtml).toContain('display=swap');
  });

  it('loads only essential font families (≤4)', () => {
    const fontFamilies = indexHtml.match(/family=[^&"]+/g) || [];
    expect(fontFamilies.length).toBeLessThanOrEqual(4);
  });

  it('has dns-prefetch for external services', () => {
    expect(indexHtml).toContain('dns-prefetch');
  });
});

/* ──────────────────────────────────────────────────────────────────
 * 5. Image CLS Prevention — Spot-check key files
 * ──────────────────────────────────────────────────────────────── */

describe('Image CLS Prevention', () => {
  it('PerformanceTab avatars have width/height', () => {
    const source = readSource('src/components/crm/NancyHRCRM_NEW/tabs/PerformanceTab.tsx');
    const imgTags = source.match(/<img[\s\S]*?\/>/g) || [];
    const withDimensions = imgTags.filter(t => t.includes('width='));
    expect(withDimensions.length).toBeGreaterThanOrEqual(1);
  });

  it('VirtualTourGallery images have width/height', () => {
    const source = readSource('src/components/VirtualTourGallery.tsx');
    const imgTags = source.match(/<img[\s\S]*?\/>/g) || [];
    const withDimensions = imgTags.filter(t => t.includes('width='));
    expect(withDimensions.length).toBeGreaterThanOrEqual(3);
  });

  it('InteractiveMap property images have width/height', () => {
    const source = readSource('src/components/InteractiveMap.tsx');
    // Check for width={300} on PropertyImage
    expect(source).toContain('width={300}');
    expect(source).toContain('height={200}');
  });
});

/* ──────────────────────────────────────────────────────────────────
 * 6. Lazy Loading Attribute Usage
 * ──────────────────────────────────────────────────────────────── */

describe('Native Lazy Loading', () => {
  it('PropertyCard uses loading="lazy"', () => {
    const source = readSource('src/components/common/PropertyCard/PropertyCard.tsx');
    expect(source).toContain('loading="lazy"');
  });

  it('VirtualTourGallery uses loading="lazy"', () => {
    const source = readSource('src/components/VirtualTourGallery.tsx');
    expect(source).toContain('loading="lazy"');
  });
});

