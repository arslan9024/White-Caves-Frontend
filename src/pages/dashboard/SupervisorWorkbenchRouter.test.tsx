// FILE: src/pages/dashboard/SupervisorWorkbenchRouter.test.tsx
/**
 * SupervisorWorkbenchRouter.test.tsx — Verifies canonical routing and workbench resolution
 * for AI Zoe (COO) + all 5 Operational AI Supervisors (Diana, Daisy, Mary, Linda, Henry)
 * and MD Daily Leasing Cockpit in the Managing Director Portal.
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { normalizeDashboardRoute, resolveSidebarItemRoute } from './ModernDashboardPage.logic';
import { SupervisorWorkbenchRouter } from './SupervisorWorkbenchRouter';

vi.mock('../../components/crm/LindaWhatsAppCRM', () => ({
  default: () => <div data-testid="mock-linda-crm">Linda</div>,
}));
vi.mock('../../components/crm/DianaEmailCRM/DianaEmailCampaignCenter', () => ({
  default: () => <div data-testid="mock-diana-crm">Diana</div>,
}));
vi.mock('../../components/crm/MaryInventoryCRM_NEW', () => ({
  default: () => <div data-testid="mock-mary-crm">Mary</div>,
}));
vi.mock('../../components/crm/DaisyLeasingCRM_NEW', () => ({
  default: () => <div data-testid="mock-daisy-crm">Daisy</div>,
}));
vi.mock('../../components/crm/HenryRecordsCRM', () => ({
  default: () => <div data-testid="mock-henry-crm">Henry</div>,
}));
vi.mock('../../components/crm/MdDailyLeasingCockpit', () => ({
  default: () => <div data-testid="mock-md-leasing-cockpit">LeasingCockpit</div>,
}));
vi.mock('../../components/crm/ZoeConsole', () => ({
  default: () => <div data-testid="mock-zoe-crm">Zoe</div>,
}));
vi.mock('../../components/dashboard/header/DashboardLiveTicker', () => ({
  DashboardLiveTicker: () => <div data-testid="mock-ticker" />,
}));

afterEach(() => {
  cleanup();
});

describe('MD Portal Canonical Supervisor Routing & Workbench Resolution', () => {
  it('resolves exact /dashboard root to overview without hijacking subsystem or supervisor tabs', () => {
    expect(normalizeDashboardRoute('/dashboard').activeTab).toBe('overview');
    expect(normalizeDashboardRoute('/dashboard/').activeTab).toBe('overview');
    expect(normalizeDashboardRoute('/dashboard/departments').activeTab).toBe('departments');
    expect(normalizeDashboardRoute('/dashboard/diana').activeTab).toBe('diana');
    expect(normalizeDashboardRoute('/dashboard/leasing').activeTab).toBe('leasing');
    expect(normalizeDashboardRoute('/dashboard/daisy').activeTab).toBe('daisy');
    expect(normalizeDashboardRoute('/dashboard/inventory').activeTab).toBe('inventory');
    expect(normalizeDashboardRoute('/dashboard/mary').activeTab).toBe('mary');
    expect(normalizeDashboardRoute('/dashboard/linda').activeTab).toBe('linda');
    expect(normalizeDashboardRoute('/dashboard/henry').activeTab).toBe('henry');
    expect(normalizeDashboardRoute('/dashboard/leasing-cockpit').activeTab).toBe('leasing-cockpit');
    expect(normalizeDashboardRoute('/dashboard/zoe').activeTab).toBe('zoe');
  });

  it('maps sidebar keys for all 5 supervisors + Zoe + Leasing Cockpit to canonical workspace routes', () => {
    expect(resolveSidebarItemRoute('diana', 'aiams')).toBe('/dashboard/diana');
    expect(resolveSidebarItemRoute('daisy', 'aiams')).toBe('/dashboard/leasing');
    expect(resolveSidebarItemRoute('mary', 'aiams')).toBe('/dashboard/inventory');
    expect(resolveSidebarItemRoute('linda', 'aiams')).toBe('/dashboard/linda');
    expect(resolveSidebarItemRoute('henry', 'aiams')).toBe('/dashboard/henry');
    expect(resolveSidebarItemRoute('leasing-cockpit', 'aiams')).toBe('/dashboard/leasing-cockpit');
    expect(resolveSidebarItemRoute('zoe', 'aiams')).toBe('/dashboard/zoe');
  });

  it('mounts Zoe + all 5 Operational AI Supervisor workbenches + MD Daily Leasing Cockpit', () => {
    const cases = [
      { tab: 'zoe' as const, wrapper: 'workbench-zoe', inner: 'mock-zoe-crm' },
      { tab: 'diana' as const, wrapper: 'workbench-diana', inner: 'mock-diana-crm' },
      { tab: 'leasing' as const, wrapper: 'workbench-daisy', inner: 'mock-daisy-crm' },
      { tab: 'daisy' as const, wrapper: 'workbench-daisy', inner: 'mock-daisy-crm' },
      { tab: 'inventory' as const, wrapper: 'workbench-mary', inner: 'mock-mary-crm' },
      { tab: 'mary' as const, wrapper: 'workbench-mary', inner: 'mock-mary-crm' },
      { tab: 'linda' as const, wrapper: 'workbench-linda', inner: 'mock-linda-crm' },
      { tab: 'henry' as const, wrapper: 'workbench-henry', inner: 'mock-henry-crm' },
      {
        tab: 'leasing-cockpit' as const,
        wrapper: 'workbench-leasing-cockpit',
        inner: 'mock-md-leasing-cockpit',
      },
    ];

    for (const c of cases) {
      render(<SupervisorWorkbenchRouter activeTab={c.tab} activeItemId={null} />);
      expect(screen.getByTestId(c.wrapper)).toBeInTheDocument();
      expect(screen.getByTestId(c.inner)).toBeInTheDocument();
      cleanup();
    }
  });
});
