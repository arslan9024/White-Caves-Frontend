import type { DepartmentNode } from '../types';

export const SANCTUM_DEPT_01: DepartmentNode = {
  "deptCode": "DEPT-01",
  "name": "Customer Experience, Concierge & Hospitality",
  "color": "#EC4899",
  "director": {
    "id": "corinne",
    "code": "DIR-01",
    "name": "AI Corinne",
    "gender": "Female",
    "tier": "DIRECTOR",
    "roleTitle": "Director of Customer Experience & Hospitality",
    "departmentCode": "DEPT-01",
    "reportingTo": "zoe",
    "allowedTools": [
      "assign_concierge",
      "guest_routing"
    ],
    "capabilities": [
      "VIP Hospitality",
      "Concierge Escalations"
    ],
    "slaResponseMinutes": 10,
    "status": "ACTIVE",
    "kpis": {
      "tasksCompleted": 890,
      "accuracyPercent": 99.4,
      "latencyMs": 310
    }
  },
  "managers": [
    {
      "id": "corinne-frontline",
      "code": "MGR-01-1",
      "name": "AI Corinne Frontline",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "VIP Welcome & Frontline Concierge Manager",
      "slot": 1,
      "departmentCode": "DEPT-01",
      "allowedTools": [
        "welcome_protocol"
      ],
      "capabilities": [
        "Meet & Greet"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 310,
        "accuracyPercent": 99.2,
        "latencyMs": 280
      }
    },
    {
      "id": "layla-mobility",
      "code": "MGR-01-2",
      "name": "AI Layla Logistics",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Luxury Mobility & Chauffeur Fleet Manager",
      "slot": 2,
      "departmentCode": "DEPT-01",
      "allowedTools": [
        "fleet_dispatch"
      ],
      "capabilities": [
        "Fleet Dispatch"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 145,
        "accuracyPercent": 98.9,
        "latencyMs": 340
      }
    },
    {
      "id": "soraya-reception",
      "code": "MGR-01-3",
      "name": "AI Soraya Reception",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Global Multilingual Reception Manager",
      "slot": 3,
      "departmentCode": "DEPT-01",
      "allowedTools": [
        "translate_inquiry"
      ],
      "capabilities": [
        "Multilingual Translation"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 420,
        "accuracyPercent": 99.6,
        "latencyMs": 290
      }
    },
    {
      "id": "amara-onboarding",
      "code": "MGR-01-4",
      "name": "AI Amara ClientCare",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Client Onboarding & VIP Intake Manager",
      "slot": 4,
      "departmentCode": "DEPT-01",
      "allowedTools": [
        "client_intake"
      ],
      "capabilities": [
        "Investor KYC Intake"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 260,
        "accuracyPercent": 99.1,
        "latencyMs": 305
      }
    },
    {
      "id": "yasmin-sentinel",
      "code": "MGR-01-5",
      "name": "AI Yasmin Feedback",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Client NPS & Experience Audit Manager",
      "slot": 5,
      "departmentCode": "DEPT-01",
      "allowedTools": [
        "nps_analytics"
      ],
      "capabilities": [
        "NPS Auditing"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 180,
        "accuracyPercent": 99.7,
        "latencyMs": 260
      }
    },
    {
      "id": "nadia-loyalty",
      "code": "MGR-01-6",
      "name": "AI Nadia Loyalty",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "HNW Client Loyalty & Privileges Manager",
      "slot": 6,
      "departmentCode": "DEPT-01",
      "allowedTools": [
        "loyalty_tier"
      ],
      "capabilities": [
        "HNW Privileges"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 195,
        "accuracyPercent": 99.3,
        "latencyMs": 315
      }
    },
    {
      "id": "kareena-events",
      "code": "MGR-01-7",
      "name": "AI Kareena Events",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Private Showcase & Open House Event Manager",
      "slot": 7,
      "departmentCode": "DEPT-01",
      "allowedTools": [
        "event_planner"
      ],
      "capabilities": [
        "Private Showcases"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 92,
        "accuracyPercent": 98.7,
        "latencyMs": 360
      }
    },
    {
      "id": "fatima-amenities",
      "code": "MGR-01-8",
      "name": "AI Fatima Facilities",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Office Facilities & Guest Experience Manager",
      "slot": 8,
      "departmentCode": "DEPT-01",
      "allowedTools": [
        "facility_audit"
      ],
      "capabilities": [
        "Lounge Operations"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 110,
        "accuracyPercent": 99,
        "latencyMs": 320
      }
    },
    {
      "id": "zainab-relations",
      "code": "MGR-01-9",
      "name": "AI Zainab Relations",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Client Dispute Resolution & Ombudsman Manager",
      "slot": 9,
      "departmentCode": "DEPT-01",
      "allowedTools": [
        "ombudsman_case"
      ],
      "capabilities": [
        "Dispute Resolution"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 64,
        "accuracyPercent": 99.5,
        "latencyMs": 250
      }
    }
  ]
};
