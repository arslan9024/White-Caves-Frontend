// FILE: src/pages/dashboard/SupervisorWorkbenchRouter.tsx
/**
 * White Caves Real Estate LLC — Operational AI Supervisor Workbench Router
 * Routes MD directly to Zoe (COO) + all 5 Canonical Operational AI Supervisors:
 *   Diana (SUP-02-6-01-1), Daisy (SUP-05-2-01-1), Mary (SUP-06-1-01-1),
 *   Linda (SUP-08-1-01-1), Henry (SUP-11-1-01-1) + MD Daily Leasing Cockpit.
 * Standard: AEGIS Single Purpose File Law (< 350 lines, AEG-042).
 */

import React, { FC } from 'react';
import LindaWhatsAppCRM from '../../components/crm/LindaWhatsAppCRM';
import DianaEmailCampaignCenter from '../../components/crm/DianaEmailCRM/DianaEmailCampaignCenter';
import MaryInventoryCRM from '../../components/crm/MaryInventoryCRM_NEW';
import DaisyLeasingCRM from '../../components/crm/DaisyLeasingCRM_NEW';
import HenryRecordsCRM from '../../components/crm/HenryRecordsCRM';
import MdDailyLeasingCockpit from '../../components/crm/MdDailyLeasingCockpit';
import ZoeExecutiveCRM from '../../components/crm/ZoeConsole';
import { DashboardLiveTicker } from '../../components/dashboard/header/DashboardLiveTicker';
import type { ActivityTab } from '../../components/dashboard/ExecutiveVSCodeSidebar/ExecutiveVSCodeSidebar.logic';

export interface SupervisorWorkbenchParams {
  activeTab: ActivityTab;
  activeItemId: string | null;
  activeAgent?: { id: string; name: string } | null;
}

export function renderSupervisorWorkbench({
  activeTab,
  activeItemId,
  activeAgent,
}: SupervisorWorkbenchParams): React.ReactElement | null {
  const agentId = activeAgent?.id;

  // COO AI Zoe Sovereign Console
  if (
    activeTab === 'zoe' ||
    agentId === 'zoe' ||
    (activeTab === 'ai-command' && activeItemId === 'zoe')
  ) {
    return (
      <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }} data-testid="workbench-zoe">
        <DashboardLiveTicker />
        <ZoeExecutiveCRM />
      </div>
    );
  }

  // SUP-08-1-01-1: AI Linda — WhatsApp 10-SIM Operations Center
  if (
    activeTab === 'linda' ||
    agentId === 'linda' ||
    (activeTab === 'ai-command' && activeItemId === 'linda')
  ) {
    return (
      <div style={{ padding: '20px', flex: 1 }} data-testid="workbench-linda">
        <LindaWhatsAppCRM />
      </div>
    );
  }

  // SUP-02-6-01-1: AI Diana — Property Owner Email Campaigns
  if (
    activeTab === 'diana' ||
    agentId === 'diana-email' ||
    agentId === 'diana' ||
    (activeTab === 'ai-command' && (activeItemId === 'diana' || activeItemId === 'diana-email'))
  ) {
    return (
      <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }} data-testid="workbench-diana">
        <DianaEmailCampaignCenter />
      </div>
    );
  }

  // SUP-05-2-01-1: AI Daisy — Residential Leasing CRM & DAMAC Hills 2 Pipeline
  if (
    activeTab === 'daisy' ||
    activeTab === 'leasing' ||
    agentId === 'daisy-leasing' ||
    agentId === 'daisy' ||
    (activeTab === 'ai-command' && (activeItemId === 'daisy' || activeItemId === 'daisy-leasing'))
  ) {
    return (
      <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }} data-testid="workbench-daisy">
        <DaisyLeasingCRM />
      </div>
    );
  }

  // SUP-06-1-01-1: AI Mary — DAMAC Hills 2 Master Inventory & Cluster Control
  if (
    activeTab === 'mary' ||
    activeTab === 'inventory' ||
    agentId === 'mary-inventory' ||
    agentId === 'mary' ||
    (activeTab === 'ai-command' && (activeItemId === 'mary' || activeItemId === 'mary-inventory'))
  ) {
    return (
      <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }} data-testid="workbench-mary">
        <MaryInventoryCRM />
      </div>
    );
  }

  // SUP-11-1-01-1: AI Henry (Sole Male AI Officer) — Records, Drive Vault & Document Studio
  if (
    activeTab === 'henry' ||
    agentId === 'henry' ||
    (activeTab === 'ai-command' && activeItemId === 'henry')
  ) {
    return (
      <div
        style={{ padding: '20px', flex: 1, overflowY: 'auto', display: 'grid', gap: '20px' }}
        data-testid="workbench-henry"
      >
        <HenryRecordsCRM />
      </div>
    );
  }

  // MD Daily Residential Leasing Cockpit (Mission 2 Queue + 12-Stage Tenancy Deals + RERA Alerts)
  if (activeTab === 'leasing-cockpit') {
    return (
      <div
        style={{ padding: '20px', flex: 1, overflowY: 'auto' }}
        data-testid="workbench-leasing-cockpit"
      >
        <MdDailyLeasingCockpit />
      </div>
    );
  }

  return null;
}

export const SupervisorWorkbenchRouter: FC<SupervisorWorkbenchParams> = props =>
  renderSupervisorWorkbench(props);

export default SupervisorWorkbenchRouter;
