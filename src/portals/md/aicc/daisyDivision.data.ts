/**
 * daisyDivision.data.ts — Daisy Residential Leasing Division (DEPT-05)
 *
 * Full 8-Tier Authority Chain for Leasing Operations:
 * L8 Managing Director (Arslan Malik — sole human employee today)
 *  -> L7 COO (AI Zoe WC-COO-01)
 *   -> L6 Director (AI Clara DIR-05 — DEPT-05 Sales, Services & Operations)
 *    -> L5 Manager (AI Daisy Leasing MGR-05-2)
 *     -> L4 Assistant Managers (12 AI Assistant Managers: AMGR-05-2-01 .. AMGR-05-2-12)
 *      -> L3 Supervisors (9 AI Supervisors per Assistant Manager = 108 AI Supervisors)
 *       -> L3 Team Leader (1 AI Team Leader: AI Layla DH2 Field Team Leader TL-05-2-01)
 *        -> L2 Leasing Agents (10 AI Leasing Agents paired with 10 WhatsApp SIMs)
 */

export interface DaisyAssistantManagerCard {
  id: string;
  slot: number;
  name: string;
  clusterFocus: string;
  reportsToId: string;
  supervisors: Array<{ id: string; slot: number; name: string; zone: string }>;
}

export interface DmsOpenPositionCard {
  positionCode: string;
  jobTitle: string;
  role: string;
  departmentCode: 'DEPT-05';
  reportsToTitle: string;
  openCount: number;
}

export interface TmsLeasingTaskGroupCard {
  collectionCode: string;
  title: string;
  aiccActorName: string;
  aiccActorCode: string;
  reportingChain: string;
  tasks: string[];
}

const AM_CONFIGS: Array<[string, string]> = [
  ['AI Amina Leasing', 'Pacifica, Clivia & Amargo'],
  ['AI Bushra Leasing', 'Camelia, Albizia & Basswood'],
  ['AI Dalia Leasing', 'Vardon, Mulberry & Pelham'],
  ['AI Farah Leasing', 'Zinnia, Just Cavalli & Avencia'],
  ['AI Huda Leasing', 'Victoria, Juniper & Primrose'],
  ['AI Jana Leasing', 'Acuna, Coursetia & Trixis'],
  ['AI Karima Leasing', 'Centaury, Janusia & Sycamore'],
  ['AI Lubna Leasing', 'Sanctnary, Aquilegia & Mimosa'],
  ['AI Maha Leasing', 'Odora, Lirio & Veronica'],
  ['AIoura Leasing', 'Viridis Towers A-D'],
  ['AI Rania Leasing', 'Navitas Hotel Residences'],
  ['AI Salma Leasing', 'Elo, Park Greens & Verona'],
];

const SUP_NAMES = ['Noor', 'Hana', 'Reem', 'Sara', 'Mona', 'Dina', 'Yara', 'Lama', 'Zeina'];

export const DAISY_12_ASSISTANT_MANAGERS: DaisyAssistantManagerCard[] = AM_CONFIGS.map(
  ([name, clusterFocus], idx) => {
    const slot = idx + 1;
    const amId = `AMGR-05-2-${String(slot).padStart(2, '0')}`;
    const supervisors = SUP_NAMES.map((sName, sIdx) => ({
      id: `SUP-05-2-${String(slot).padStart(2, '0')}-${sIdx + 1}`,
      slot: sIdx + 1,
      name: `AI ${sName} Sup-${slot}.${sIdx + 1}`,
      zone: `${clusterFocus.split(',')[0]} Zone ${sIdx + 1}`,
    }));
    return { id: amId, slot, name, clusterFocus, reportsToId: 'MGR-05-2', supervisors };
  }
);

export const DAISY_TEAM_LEADER = {
  id: 'TL-05-2-01',
  name: 'AI Layla DH2 Field Team Leader',
  reportsToId: 'SUP-05-2-01-1 (AI Noor Sup-1.1)',
  roleTitle: 'DAMAC Hills 2 WhatsApp Outreach & Viewing Squad Leader',
};

export const DAISY_10_LEASING_AGENTS = [
  {
    id: 'AGT-05-2-01',
    name: 'AI Agent 01 — Zahra (Primary Master Closer)',
    sim: '+971505760056',
    tier: 'PRIMARY_MASTER_CLOSER',
  },
  {
    id: 'AGT-05-2-02',
    name: 'AI Agent 02 — Mariam Hunter',
    sim: '+971503869886',
    tier: 'HUNTER_OUTREACH',
  },
  {
    id: 'AGT-05-2-03',
    name: 'AI Agent 03 — Fatima Hunter',
    sim: '+971505110636',
    tier: 'HUNTER_OUTREACH',
  },
  {
    id: 'AGT-05-2-04',
    name: 'AI Agent 04 — Aisha Hunter',
    sim: '+971589969886',
    tier: 'HUNTER_OUTREACH',
  },
  {
    id: 'AGT-05-2-05',
    name: 'AI Agent 05 — Khadija Hunter',
    sim: '+971553633595',
    tier: 'HUNTER_OUTREACH',
  },
  {
    id: 'AGT-05-2-06',
    name: 'AI Agent 06 — Salwa Hunter',
    sim: '+971559156636',
    tier: 'HUNTER_OUTREACH',
  },
  {
    id: 'AGT-05-2-07',
    name: 'AI Agent 07 — Najwa Hunter',
    sim: '+971505845825',
    tier: 'HUNTER_OUTREACH',
  },
  {
    id: 'AGT-05-2-08',
    name: 'AI Agent 08 — Samia Hunter',
    sim: '+971507160096',
    tier: 'HUNTER_OUTREACH',
  },
  {
    id: 'AGT-05-2-09',
    name: 'AI Agent 09 — Lamia Hunter',
    sim: '+971553498722',
    tier: 'HUNTER_OUTREACH',
  },
  {
    id: 'AGT-05-2-10',
    name: 'AI Agent 10 — Warda Hunter',
    sim: '+971567160096',
    tier: 'HUNTER_OUTREACH',
  },
];

export const DMS_OPEN_HUMAN_LEASING_POSITIONS: DmsOpenPositionCard[] = [
  {
    positionCode: 'OPEN-DEPT05-DIR-01',
    jobTitle: 'Human Director of Sales, Services & Operations',
    role: 'DIRECTOR',
    departmentCode: 'DEPT-05',
    reportsToTitle: 'Arslan Malik (MD) & AI Zoe (COO)',
    openCount: 1,
  },
  {
    positionCode: 'OPEN-DEPT05-MGR-LEASING-01',
    jobTitle: 'Human Residential Leasing Manager (Draggable in DMS)',
    role: 'MANAGER',
    departmentCode: 'DEPT-05',
    reportsToTitle: 'AI Clara (DIR-05)',
    openCount: 1,
  },
  {
    positionCode: 'OPEN-DEPT05-AMGR-LEASING-12',
    jobTitle: 'Human Assistant Leasing Manager — DH2 Clusters',
    role: 'ASSISTANT_MANAGER',
    departmentCode: 'DEPT-05',
    reportsToTitle: 'AI Daisy Leasing (MGR-05-2)',
    openCount: 12,
  },
  {
    positionCode: 'OPEN-DEPT05-SUP-LEASING-108',
    jobTitle: 'Human Field Supervisor — DAMAC Hills 2 Zones',
    role: 'SUPERVISOR',
    departmentCode: 'DEPT-05',
    reportsToTitle: 'Assistant Leasing Managers (AMGR-05-2-01..12)',
    openCount: 108,
  },
  {
    positionCode: 'OPEN-DEPT05-TL-LEASING-01',
    jobTitle: 'Human Leasing Team Leader — 10-Agent Squad',
    role: 'TEAM_LEADER',
    departmentCode: 'DEPT-05',
    reportsToTitle: 'AI Noor Sup-1.1 (SUP-05-2-01-1)',
    openCount: 1,
  },
  {
    positionCode: 'OPEN-DEPT05-AGT-LEASING-10',
    jobTitle: 'Human Residential Leasing Agent — WhatsApp & Viewing Squad',
    role: 'LEASING_AGENT',
    departmentCode: 'DEPT-05',
    reportsToTitle: 'AI Layla DH2 Field Team Leader (TL-05-2-01)',
    openCount: 10,
  },
];

export const TMS_LEASING_TASK_GROUPS: TmsLeasingTaskGroupCard[] = [
  {
    collectionCode: 'TMS-LEASE-01',
    title: 'Mission 1: 10-SIM WhatsApp Landlord Discovery Outreach',
    aiccActorName: 'AI Layla Team Leader + 10 AI Leasing Agents',
    aiccActorCode: 'TL-05-2-01 / AGT-05-2-01..10',
    reportingChain:
      'Agents -> TL Layla -> Sup Noor -> AM Amina -> Mgr Daisy -> Dir Clara -> COO Zoe -> MD Arslan Malik',
    tasks: [
      'Dispatch anti-ban WhatsApp outreach across 9 Hunter SIMs',
      'Verify villa availability & asking rent in DH2',
      'Hand off available unit to Primary Master +971505760056',
    ],
  },
  {
    collectionCode: 'TMS-LEASE-02',
    title: 'Inventory Vault & Google Drive Formula Sync',
    aiccActorName: 'AI Mary Inventory + AI Henry Record Keeper',
    aiccActorCode: 'MGR-06-1 / MGR-11-1',
    reportingChain: 'Mary/Henry -> Dir Eleanor/Victoria -> COO Zoe -> MD Arslan Malik',
    tasks: [
      'Update scoped Mary Inventory Vault (Agents own vs MD all)',
      'Enforce Drive formula: Area/Project/Unit/[5 Canonical Folders]',
    ],
  },
  {
    collectionCode: 'TMS-LEASE-03',
    title: 'Mission 2: Primary Master Follow-Up, Price Negotiation & MD Calendar',
    aiccActorName: 'Arslan Malik (MD) + AI Leona Viewings + AI Nadine Offers',
    aiccActorCode: 'MD-01 / MGR-05-5 / MGR-05-6',
    reportingChain: 'Leona/Nadine -> Dir Clara (DIR-05) -> COO Zoe -> MD Arslan Malik',
    tasks: [
      'Follow up exclusively via Primary Master +971505760056',
      'Schedule Google Meet / call on arslanmalikgoraha@gmail.com',
      'Coordinate tenant viewings & offer approval',
    ],
  },
  {
    collectionCode: 'TMS-LEASE-04',
    title: 'Sequential Cheques, Tenant-First Signing, Clearance & Landlord Counter-Sign',
    aiccActorName: 'AI Daisy Leasing + AI Henry Record Keeper',
    aiccActorCode: 'MGR-05-2 / MGR-11-1',
    reportingChain: 'Daisy -> Dir Clara (DIR-05) -> COO Zoe -> MD Arslan Malik',
    tasks: [
      'Collect cheques & fees FIRST',
      'Tenant signs FIRST -> verify payment clearance -> Landlord signs AFTER',
      'Archive in Tenancy Contract/<Year>_<NEW|RENEWAL>',
    ],
  },
  {
    collectionCode: 'TMS-LEASE-05',
    title: 'Ejari & DEWA Registration (New Deposit vs Renewal Bill + VIP MD Proxy)',
    aiccActorName: 'Arslan Malik (MD VIP Proxy) + AI Henry Record Keeper',
    aiccActorCode: 'MD-01 / MGR-11-1',
    reportingChain: 'Henry -> Dir Victoria (DIR-11) -> COO Zoe -> MD Arslan Malik',
    tasks: [
      'New Tenancy: upload Ejari + DEWA Security Deposit Receipt PDF',
      'Renewal Tenancy: upload Ejari + Latest Paid DEWA Bill PDF',
    ],
  },
  {
    collectionCode: 'TMS-LEASE-06',
    title: '90-Day RERA Renewal Radar & Landlord/Tenant Care WhatsApp',
    aiccActorName: 'AI Daisy Leasing + Primary Master Closer (+971505760056)',
    aiccActorCode: 'MGR-05-2',
    reportingChain: 'Daisy -> Dir Clara (DIR-05) -> COO Zoe -> MD Arslan Malik',
    tasks: [
      'Send care messages from +971505760056',
      'Schedule 90-day RERA notice & 30-day renewal check on MD Calendar',
    ],
  },
];
