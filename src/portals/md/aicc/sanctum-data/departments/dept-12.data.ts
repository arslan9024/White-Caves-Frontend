import type { DepartmentNode } from '../types';

export const SANCTUM_DEPT_12: DepartmentNode = {
  "deptCode": "DEPT-12",
  "name": "Executive, Governance & Strategy",
  "color": "#1E293B",
  "director": {
    "id": "victoria",
    "code": "DIR-12",
    "name": "AI Victoria",
    "gender": "Female",
    "tier": "DIRECTOR",
    "roleTitle": "Director of Strategic Governance, Enterprise Policy & Executive Affairs",
    "departmentCode": "DEPT-12",
    "reportingTo": "zoe",
    "allowedTools": [
      "md_briefing_gen",
      "sovereign_gate",
      "topology_swap"
    ],
    "capabilities": [
      "Executive Decision Audits",
      "Sovereign MD Signoff",
      "AICC Topology Rebalancing"
    ],
    "slaResponseMinutes": 5,
    "status": "ACTIVE",
    "kpis": {
      "tasksCompleted": 1590,
      "accuracyPercent": 99.9,
      "latencyMs": 200
    }
  },
  "managers": [
    {
      "id": "victoria-secretariat",
      "code": "MGR-12-1",
      "name": "AI Victoria Secretariat",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Board Secretariat & Sovereign Policy Manager",
      "slot": 1,
      "departmentCode": "DEPT-12",
      "allowedTools": [
        "board_resolution"
      ],
      "capabilities": [
        "Sovereign Decrees",
        "AMGR-12-1-01 AI Ada Architecture Governance",
        "SUP-12-1-01-1 AI Mary Wilkes Frontend Wave 2 Decomposition Supervisor"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 240,
        "accuracyPercent": 100,
        "latencyMs": 190
      }
    },
    {
      "id": "kallista-okrs",
      "code": "MGR-12-2",
      "name": "AI Kallista OKRs",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Enterprise Strategy & 5-Year Roadmap Manager",
      "slot": 2,
      "departmentCode": "DEPT-12",
      "allowedTools": [
        "okr_tracker"
      ],
      "capabilities": [
        "Quarterly OKRs"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 180,
        "accuracyPercent": 99.6,
        "latencyMs": 240
      }
    },
    {
      "id": "seraphina-risk",
      "code": "MGR-12-3",
      "name": "AI Seraphina Risk",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Enterprise Risk & Catastrophe Shield Manager",
      "slot": 3,
      "departmentCode": "DEPT-12",
      "allowedTools": [
        "risk_matrix"
      ],
      "capabilities": [
        "Risk Safeguards"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 130,
        "accuracyPercent": 99.8,
        "latencyMs": 210
      }
    },
    {
      "id": "charlotte-liaison",
      "code": "MGR-12-4",
      "name": "AI Charlotte Liaison",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Zoe COO Executive Liaison Manager",
      "slot": 4,
      "departmentCode": "DEPT-12",
      "allowedTools": [
        "executive_brief"
      ],
      "capabilities": [
        "Zoe COO Synchronization"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 610,
        "accuracyPercent": 99.9,
        "latencyMs": 170
      }
    },
    {
      "id": "adeline-merit",
      "code": "MGR-12-5",
      "name": "AI Adeline Merit",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Company-Wide Merit Leaderboard & Performance Master",
      "slot": 5,
      "departmentCode": "DEPT-12",
      "allowedTools": [
        "merit_calculator"
      ],
      "capabilities": [
        "Merit XP Scoring"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 340,
        "accuracyPercent": 99.4,
        "latencyMs": 260
      }
    },
    {
      "id": "beatrice-audit",
      "code": "MGR-12-6",
      "name": "AI Beatrice CrossAudit",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Cross-Department Policy & SLA Audit Manager",
      "slot": 6,
      "departmentCode": "DEPT-12",
      "allowedTools": [
        "sla_auditor"
      ],
      "capabilities": [
        "15-Minute SLA Watchdog"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 490,
        "accuracyPercent": 99.9,
        "latencyMs": 180
      }
    },
    {
      "id": "genevieve-capital",
      "code": "MGR-12-7",
      "name": "AI Genevieve Reserves",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Capital Re-Investment & Sovereign Reserves Manager",
      "slot": 7,
      "departmentCode": "DEPT-12",
      "allowedTools": [
        "reserve_allocation"
      ],
      "capabilities": [
        "Sovereign Reserves"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 95,
        "accuracyPercent": 100,
        "latencyMs": 220
      }
    },
    {
      "id": "helena-topology",
      "code": "MGR-12-8",
      "name": "AI Helena Topology",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "AICC 1-12-108 Topology & Swapping Manager",
      "slot": 8,
      "departmentCode": "DEPT-12",
      "allowedTools": [
        "reallocate_slot",
        "swap_agents"
      ],
      "capabilities": [
        "MD Drag-and-Drop Swaps"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 150,
        "accuracyPercent": 100,
        "latencyMs": 160
      }
    },
    {
      "id": "eleanor-seal",
      "code": "MGR-12-9",
      "name": "AI Eleanor SovereignSeal",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Managing Director Digital Seal & Authorization Gate",
      "slot": 9,
      "departmentCode": "DEPT-12",
      "allowedTools": [
        "seal_authorization"
      ],
      "capabilities": [
        "Sovereign Signature Gate"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 210,
        "accuracyPercent": 100,
        "latencyMs": 150
      }
    }
  ]
};
