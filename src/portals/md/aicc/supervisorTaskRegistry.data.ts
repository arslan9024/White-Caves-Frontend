/**
 * supervisorTaskRegistry.data.ts — Canonical TMS Action & Task Assignment Map for Bhakti Supervisors
 * Maps TMS statutory/operational tasks directly to a single accountable AI Supervisor ID (SUP-{DD}-{M}-{AA}-{S})
 * with complete TURING-SUPERVISOR-CHAIN-019 authority hierarchy labels and DMS/TMS lockstep flags.
 * Standard: AEGIS Canonical Single Purpose File Law (< 350 lines, AEG-042)
 */

import {
  buildSupervisorAuthorityLabel,
  type SupervisorAuthorityChainLabel,
  type SupervisorTaskAssignment,
} from './supervisorTaskRegistry.types';

export type { SupervisorAuthorityChainLabel, SupervisorTaskAssignment };
export {
  buildSupervisorAuthorityLabel,
  reassignTaskToSupervisor,
} from './supervisorTaskRegistry.types';

export const INITIAL_SUPERVISOR_TASK_ASSIGNMENTS: SupervisorTaskAssignment[] = [
  // Track A — Auth Gateway, Role-Based Portals (MD/Landlord/Tenant) & 12-Stage Deal Cockpit
  {
    taskCode: 'TSK-PORTAL-01',
    title: 'Branded Auth Gateway, MD/Landlord/Tenant Portals & 12-Stage Deal Cockpit Sync',
    deptCode: 'DEPT-05',
    managerCode: 'MGR-05-2',
    assistantManagerId: 'AMGR-05-2-01',
    supervisorId: 'SUP-05-2-01-1',
    supervisorName: 'AI Daisy Supervisor (Residential Leasing & 12-Stage Deal Cockpit)',
    taskCollectionLabel: 'TMS-COL-TRACK-A-LEASING-PORTALS',
    authorityChain: buildSupervisorAuthorityLabel(
      5,
      2,
      1,
      1,
      'AI Daisy Supervisor',
      'TMS-COL-TRACK-A-LEASING-PORTALS'
    ),
    statutoryAuthority: 'DLD / Ejari / UAE 5% VAT',
    slaLabel: '2 Hours',
    xpReward: 500,
  },
  // DEPT-02: Marketing & Brand (MGR-02-6 AI Celine -> AMGR-02-6-01 AI Rania -> SUP-02-6-01-1 AI Diana)
  {
    taskCode: 'TSK-DIANA-01',
    title: 'DAMAC Hills 2 Property Owner Gmail Campaign & Segmentation Dispatch',
    deptCode: 'DEPT-02',
    managerCode: 'MGR-02-6',
    assistantManagerId: 'AMGR-02-6-01',
    supervisorId: 'SUP-02-6-01-1',
    supervisorName: 'AI Diana Supervisor (Property Owner Email Campaigns)',
    taskCollectionLabel: 'TMS-COL-DH2-OWNER-EMAIL',
    authorityChain: buildSupervisorAuthorityLabel(
      2,
      6,
      1,
      1,
      'AI Diana Supervisor',
      'TMS-COL-DH2-OWNER-EMAIL'
    ),
    statutoryAuthority: 'UAE PDPL / Email Consent',
    slaLabel: '15 Mins',
    xpReward: 500,
  },
  // DEPT-06: Asset Inventory (MGR-06-1 AI Yasmin -> AMGR-06-1-01 AI Farah -> SUP-06-1-01-1 AI Mary)
  {
    taskCode: 'TSK-MARY-01',
    title: 'DAMAC Hills 2 38-Cluster Master Inventory Verification & Sheets Sync',
    deptCode: 'DEPT-06',
    managerCode: 'MGR-06-1',
    assistantManagerId: 'AMGR-06-1-01',
    supervisorId: 'SUP-06-1-01-1',
    supervisorName: 'AI Mary Supervisor (DH2 Master Inventory Vault)',
    taskCollectionLabel: 'TMS-COL-DH2-INVENTORY-VAULT',
    authorityChain: buildSupervisorAuthorityLabel(
      6,
      1,
      1,
      1,
      'AI Mary Supervisor',
      'TMS-COL-DH2-INVENTORY-VAULT'
    ),
    statutoryAuthority: 'DLD Trakheesi / RERA',
    slaLabel: '15 Mins',
    xpReward: 500,
  },
  // DEPT-08: Communications & Media (MGR-08-1 AI Nadia -> AMGR-08-1-01 AI Samira -> SUP-08-1-01-1 AI Linda)
  {
    taskCode: 'TSK-LINDA-01',
    title: '10-SIM WhatsApp Landlord Discovery Outreach & Mission 2 MD Queue Routing',
    deptCode: 'DEPT-08',
    managerCode: 'MGR-08-1',
    assistantManagerId: 'AMGR-08-1-01',
    supervisorId: 'SUP-08-1-01-1',
    supervisorName: 'AI Linda Supervisor (10-SIM WhatsApp Fleet Automation)',
    taskCollectionLabel: 'TMS-COL-DH2-WHATSAPP-FLEET',
    authorityChain: buildSupervisorAuthorityLabel(
      8,
      1,
      1,
      1,
      'AI Linda Supervisor',
      'TMS-COL-DH2-WHATSAPP-FLEET'
    ),
    statutoryAuthority: 'Anti-Ban / Primary Master Guard',
    slaLabel: '1 Min',
    xpReward: 500,
  },
  // Track B — Frontend Wave 2 Atomic Decomposition (AEG-042 < 350 lines)
  {
    taskCode: 'TSK-ARCH-W2',
    title: 'Wave 2 Atomic Decomposition of Oversized Frontend Monoliths (< 350 Lines AEG-042)',
    deptCode: 'DEPT-12',
    managerCode: 'MGR-12-1',
    assistantManagerId: 'AMGR-12-1-01',
    supervisorId: 'SUP-12-1-01-1',
    supervisorName: 'AI Mary Wilkes (Frontend Wave 2 Architecture Decomposition Supervisor)',
    taskCollectionLabel: 'TMS-COL-TRACK-B-ARCH-DECOMPOSITION',
    authorityChain: buildSupervisorAuthorityLabel(
      12,
      1,
      1,
      1,
      'AI Mary Wilkes (Frontend Wave 2 Architecture Decomposition Supervisor)',
      'TMS-COL-TRACK-B-ARCH-DECOMPOSITION'
    ),
    statutoryAuthority: 'AEGIS V5.1 / AEG-042',
    slaLabel: '4 Hours',
    xpReward: 500,
  },
  // Track B Wave 3 — Remaining Frontend Monoliths Atomic Decomposition (AEG-042 < 350 lines)
  {
    taskCode: 'TSK-ARCH-W3',
    title: 'Wave 3 Atomic Decomposition of 19 Oversized Frontend Monoliths (< 350 Lines AEG-042)',
    deptCode: 'DEPT-12',
    managerCode: 'MGR-12-1',
    assistantManagerId: 'AMGR-12-1-01',
    supervisorId: 'SUP-12-1-01-1',
    supervisorName:
      'AI Mary Wilkes (Frontend Wave 2 & Wave 3 Architecture Decomposition Supervisor)',
    taskCollectionLabel: 'TMS-COL-TRACK-B-ARCH-DECOMPOSITION',
    authorityChain: buildSupervisorAuthorityLabel(
      12,
      1,
      1,
      1,
      'AI Mary Wilkes (Frontend Wave 2 & Wave 3 Architecture Decomposition Supervisor)',
      'TMS-COL-TRACK-B-ARCH-DECOMPOSITION'
    ),
    statutoryAuthority: 'AEGIS V5.1 / AEG-042',
    slaLabel: '4 Hours',
    xpReward: 500,
  },
  // Track B Wave 4 — White-Caves-Web Zero-Debt & White-Caves-Server Core Production Decomposition
  {
    taskCode: 'TSK-ARCH-W4',
    title:
      'Wave 4 Cross-Ecosystem Decomposition (Web Zero-Debt + Server Compliance/Inventory/Henry/Tenancy/Zoe < 350 Lines)',
    deptCode: 'DEPT-12',
    managerCode: 'MGR-12-1',
    assistantManagerId: 'AMGR-12-1-01',
    supervisorId: 'SUP-12-1-01-1',
    supervisorName: 'AI Mary Wilkes (Cross-Ecosystem Architecture Decomposition Supervisor)',
    taskCollectionLabel: 'TMS-COL-TRACK-B-ARCH-DECOMPOSITION',
    authorityChain: buildSupervisorAuthorityLabel(
      12,
      1,
      1,
      1,
      'AI Mary Wilkes (Cross-Ecosystem Architecture Decomposition Supervisor)',
      'TMS-COL-TRACK-B-ARCH-DECOMPOSITION'
    ),
    statutoryAuthority: 'AEGIS V5.1 / AEG-042',
    slaLabel: '4 Hours',
    xpReward: 500,
  },
  // DEPT-05: Sales, Services & Operations (MGR-05-2 AI Layla -> AMGR-05-2-01 AI Amina -> SUP-05-2-01-1 AI Daisy)
  {
    taskCode: 'TSK-002',
    title: 'DLD Form A (Listing Agreement) Verification & Filing',
    deptCode: 'DEPT-05',
    managerCode: 'MGR-05-2',
    assistantManagerId: 'AMGR-05-2-01',
    supervisorId: 'SUP-05-2-01-1',
    supervisorName: 'AI Daisy Supervisor (Residential Leasing & 12-Stage Deal Cockpit)',
    taskCollectionLabel: 'TMS-COL-DH2-STATUTORY-LEASING',
    authorityChain: buildSupervisorAuthorityLabel(
      5,
      2,
      1,
      1,
      'AI Daisy Supervisor',
      'TMS-COL-DH2-STATUTORY-LEASING'
    ),
    statutoryAuthority: 'DLD Trakheesi',
    slaLabel: '4 Hours',
    xpReward: 500,
  },
  {
    taskCode: 'TSK-006',
    title: 'Tenancy Ejari Online Registration & Barcode Issuance',
    deptCode: 'DEPT-05',
    managerCode: 'MGR-05-2',
    assistantManagerId: 'AMGR-05-2-01',
    supervisorId: 'SUP-05-2-01-2',
    supervisorName: 'AI Hana (Ejari & DEWA Statutory Registration Supervisor)',
    taskCollectionLabel: 'TMS-COL-DH2-EJARI-DEWA',
    authorityChain: buildSupervisorAuthorityLabel(5, 2, 1, 2, 'AI Hana', 'TMS-COL-DH2-EJARI-DEWA'),
    statutoryAuthority: 'Ejari Portal',
    slaLabel: '2 Hours',
    xpReward: 500,
  },
  // DEPT-11: Legal, Compliance & Audit (MGR-11-1 AI Mireille -> AMGR-11-1-01 AI Dalia -> SUP-11-1-01-1 AI Henry)
  {
    taskCode: 'TSK-008',
    title: 'AML / CFT Sanctions Screening via UAE FIU GoAML',
    deptCode: 'DEPT-11',
    managerCode: 'MGR-11-1',
    assistantManagerId: 'AMGR-11-1-01',
    supervisorId: 'SUP-11-1-01-1',
    supervisorName: 'AI Henry Supervisor (Chief Document Controller — Sole Male AI)',
    taskCollectionLabel: 'TMS-COL-LEGAL-AML-SCREENING',
    authorityChain: buildSupervisorAuthorityLabel(
      11,
      1,
      1,
      1,
      'AI Henry Supervisor',
      'TMS-COL-LEGAL-AML-SCREENING'
    ),
    statutoryAuthority: 'UAE FIU / AML',
    slaLabel: '1 Hour',
    xpReward: 500,
  },
  {
    taskCode: 'TSK-005',
    title: 'Title Deed Instant Blockchain Validation via DLD API',
    deptCode: 'DEPT-11',
    managerCode: 'MGR-11-1',
    assistantManagerId: 'AMGR-11-1-01',
    supervisorId: 'SUP-11-1-01-2',
    supervisorName: 'AI Henry Title Deed Verification Squad 2',
    taskCollectionLabel: 'TMS-COL-LEGAL-TITLE-DEED',
    authorityChain: buildSupervisorAuthorityLabel(
      11,
      1,
      1,
      2,
      'AI Henry Title Deed Verification Squad 2',
      'TMS-COL-LEGAL-TITLE-DEED'
    ),
    statutoryAuthority: 'DLD Blockchain',
    slaLabel: '15 Mins',
    xpReward: 500,
  },
  // DEPT-10: Accounting, Finance & Tax (MGR-10-1)
  {
    taskCode: 'TSK-014',
    title: 'DLD 4% Transfer Fee Payment & Receipt Reconciliation',
    deptCode: 'DEPT-10',
    managerCode: 'MGR-10-1',
    assistantManagerId: 'AMGR-10-1-01',
    supervisorId: 'SUP-10-1-01-1',
    supervisorName: 'AI Theodora Treasury & VAT Supervisor 1',
    taskCollectionLabel: 'TMS-COL-FINANCE-TREASURY-VAT',
    authorityChain: buildSupervisorAuthorityLabel(
      10,
      1,
      1,
      1,
      'AI Theodora Treasury & VAT Supervisor 1',
      'TMS-COL-FINANCE-TREASURY-VAT'
    ),
    statutoryAuthority: 'DLD Treasury',
    slaLabel: '2 Hours',
    xpReward: 500,
  },
];
