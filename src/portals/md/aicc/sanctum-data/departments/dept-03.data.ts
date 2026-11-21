import type { DepartmentNode } from '../types';

export const SANCTUM_DEPT_03: DepartmentNode = {
  "deptCode": "DEPT-03",
  "name": "Human Resources, Performance & Recruiting",
  "color": "#8B5CF6",
  "director": {
    "id": "selena",
    "code": "DIR-03",
    "name": "AI Selena",
    "gender": "Female",
    "tier": "DIRECTOR",
    "roleTitle": "Director of Human Resources & Broker Performance",
    "departmentCode": "DEPT-03",
    "reportingTo": "zoe",
    "allowedTools": [
      "hr_evaluator",
      "broker_quota_admin"
    ],
    "capabilities": [
      "Talent Sourcing",
      "RERA Compliance"
    ],
    "slaResponseMinutes": 10,
    "status": "ACTIVE",
    "kpis": {
      "tasksCompleted": 780,
      "accuracyPercent": 99.5,
      "latencyMs": 290
    }
  },
  "managers": [
    {
      "id": "selena-talent",
      "code": "MGR-03-1",
      "name": "AI Selena Talent",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Broker Recruitment & Talent Acquisition Manager",
      "slot": 1,
      "departmentCode": "DEPT-03",
      "allowedTools": [
        "headhunt_agent"
      ],
      "capabilities": [
        "Broker Scouting"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 220,
        "accuracyPercent": 99.2,
        "latencyMs": 310
      }
    },
    {
      "id": "farida-brokerlicensing",
      "code": "MGR-03-2",
      "name": "AI Farida Licensing",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "RERA Broker Card & DLD Accreditation Manager",
      "slot": 2,
      "departmentCode": "DEPT-03",
      "allowedTools": [
        "rera_verify"
      ],
      "capabilities": [
        "DLD Licensing"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 140,
        "accuracyPercent": 99.8,
        "latencyMs": 270
      }
    },
    {
      "id": "natalia-performancekpi",
      "code": "MGR-03-3",
      "name": "AI Natalia Quotas",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Agent Quota & Performance Scoring Manager",
      "slot": 3,
      "departmentCode": "DEPT-03",
      "allowedTools": [
        "score_agent"
      ],
      "capabilities": [
        "KPI Leaderboards"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 310,
        "accuracyPercent": 99.1,
        "latencyMs": 295
      }
    },
    {
      "id": "miriam-visa",
      "code": "MGR-03-4",
      "name": "AI Miriam Relocation",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Employment Visa & Emirates ID Coordinator",
      "slot": 4,
      "departmentCode": "DEPT-03",
      "allowedTools": [
        "icp_tracker"
      ],
      "capabilities": [
        "Visa Processing"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 115,
        "accuracyPercent": 99.4,
        "latencyMs": 320
      }
    },
    {
      "id": "talia-payroll",
      "code": "MGR-03-5",
      "name": "AI Talia MoHRE",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "WPS Salary & MoHRE Compliance Manager",
      "slot": 5,
      "departmentCode": "DEPT-03",
      "allowedTools": [
        "wps_generator"
      ],
      "capabilities": [
        "WPS Payroll & SIF"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 95,
        "accuracyPercent": 100,
        "latencyMs": 240
      }
    },
    {
      "id": "alyssa-academy",
      "code": "MGR-03-6",
      "name": "AI Alyssa Academy",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "White Caves Training Academy Manager",
      "slot": 6,
      "departmentCode": "DEPT-03",
      "allowedTools": [
        "curriculum_lms"
      ],
      "capabilities": [
        "Broker Academy"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 130,
        "accuracyPercent": 99,
        "latencyMs": 330
      }
    },
    {
      "id": "nadia-attendance",
      "code": "MGR-03-7",
      "name": "AI Nadia Roster",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Attendance, Leaves & Floor Duty Manager",
      "slot": 7,
      "departmentCode": "DEPT-03",
      "allowedTools": [
        "roster_scheduler"
      ],
      "capabilities": [
        "Duty Rosters"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 240,
        "accuracyPercent": 99.3,
        "latencyMs": 280
      }
    },
    {
      "id": "mariam-emiratisation",
      "code": "MGR-03-8",
      "name": "AI Mariam Nafis",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Nafis & UAE National Employment Manager",
      "slot": 8,
      "departmentCode": "DEPT-03",
      "allowedTools": [
        "nafis_portal"
      ],
      "capabilities": [
        "Nafis Compliance"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 88,
        "accuracyPercent": 99.6,
        "latencyMs": 300
      }
    },
    {
      "id": "karima-ethics",
      "code": "MGR-03-9",
      "name": "AI Karima Conduct",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Corporate Ethics & Disciplinary Conduct Manager",
      "slot": 9,
      "departmentCode": "DEPT-03",
      "allowedTools": [
        "ethics_log"
      ],
      "capabilities": [
        "Commission Arbitrations"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 62,
        "accuracyPercent": 99.1,
        "latencyMs": 310
      }
    }
  ]
};
