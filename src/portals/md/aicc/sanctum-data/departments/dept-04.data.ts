import type { DepartmentNode } from '../types';

export const SANCTUM_DEPT_04: DepartmentNode = {
  "deptCode": "DEPT-04",
  "name": "Technology, Systems & Digital Infrastructure",
  "color": "#0EA5E9",
  "director": {
    "id": "aurora",
    "code": "DIR-04",
    "name": "AI Aurora",
    "gender": "Female",
    "tier": "DIRECTOR",
    "roleTitle": "Chief Technology & Digital Infrastructure Director",
    "departmentCode": "DEPT-04",
    "reportingTo": "zoe",
    "allowedTools": [
      "system_health",
      "code_verifier",
      "db_telemetry"
    ],
    "capabilities": [
      "Full-Stack Core Architecture",
      "WebSocket Feeds",
      "0 Type Errors"
    ],
    "slaResponseMinutes": 5,
    "status": "ACTIVE",
    "kpis": {
      "tasksCompleted": 3450,
      "accuracyPercent": 99.9,
      "latencyMs": 180
    }
  },
  "managers": [
    {
      "id": "aurora-core",
      "code": "MGR-04-1",
      "name": "AI Aurora Core",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Core Full-Stack Engine & Architecture Manager",
      "slot": 1,
      "departmentCode": "DEPT-04",
      "allowedTools": [
        "architecture_audit"
      ],
      "capabilities": [
        "Atomic Law Enforcement"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 980,
        "accuracyPercent": 99.9,
        "latencyMs": 190
      }
    },
    {
      "id": "nova-websocket",
      "code": "MGR-04-2",
      "name": "AI Nova Socket",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Real-time WebSocket & Live Feed Manager",
      "slot": 2,
      "departmentCode": "DEPT-04",
      "allowedTools": [
        "socket_monitor"
      ],
      "capabilities": [
        "Socket.io Live Feeds"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 1450,
        "accuracyPercent": 99.8,
        "latencyMs": 140
      }
    },
    {
      "id": "stella-database",
      "code": "MGR-04-3",
      "name": "AI Stella Database",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Prisma Schema & MongoDB Performance Manager",
      "slot": 3,
      "departmentCode": "DEPT-04",
      "allowedTools": [
        "db_index_check"
      ],
      "capabilities": [
        "Prisma Schema Guard"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 620,
        "accuracyPercent": 99.9,
        "latencyMs": 210
      }
    },
    {
      "id": "lyra-security",
      "code": "MGR-04-4",
      "name": "AI Lyra Security",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Auth Guard & Role-Based Access Manager",
      "slot": 4,
      "departmentCode": "DEPT-04",
      "allowedTools": [
        "auth_audit"
      ],
      "capabilities": [
        "MD Access Verification"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 430,
        "accuracyPercent": 100,
        "latencyMs": 150
      }
    },
    {
      "id": "cleo-api",
      "code": "MGR-04-5",
      "name": "AI Cleo Gateway",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "REST API & Third-Party Integration Manager",
      "slot": 5,
      "departmentCode": "DEPT-04",
      "allowedTools": [
        "api_rate_limiter"
      ],
      "capabilities": [
        "API Gateway"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 580,
        "accuracyPercent": 99.7,
        "latencyMs": 200
      }
    },
    {
      "id": "iris-testing",
      "code": "MGR-04-6",
      "name": "AI Iris QA",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Automated Testing & Vitest Parity Manager",
      "slot": 6,
      "departmentCode": "DEPT-04",
      "allowedTools": [
        "run_vitest"
      ],
      "capabilities": [
        "Vitest Parity Check"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 390,
        "accuracyPercent": 99.8,
        "latencyMs": 250
      }
    },
    {
      "id": "tara-cloud",
      "code": "MGR-04-7",
      "name": "AI Tara DevOps",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Cloud Infrastructure & Server Watchdog Manager",
      "slot": 7,
      "departmentCode": "DEPT-04",
      "allowedTools": [
        "server_watchdog"
      ],
      "capabilities": [
        "Process Health Watchdog"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 470,
        "accuracyPercent": 99.6,
        "latencyMs": 220
      }
    },
    {
      "id": "selina-cache",
      "code": "MGR-04-8",
      "name": "AI Selina Cache",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Redis Cache & State Sync Manager",
      "slot": 8,
      "departmentCode": "DEPT-04",
      "allowedTools": [
        "redis_telemetry"
      ],
      "capabilities": [
        "Redis State Buffering"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 710,
        "accuracyPercent": 99.9,
        "latencyMs": 120
      }
    },
    {
      "id": "fiona-docs",
      "code": "MGR-04-9",
      "name": "AI Fiona Docs",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "System Technical Documentation Manager",
      "slot": 9,
      "departmentCode": "DEPT-04",
      "allowedTools": [
        "doc_generator"
      ],
      "capabilities": [
        "API Docs & Specifications"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 230,
        "accuracyPercent": 99.5,
        "latencyMs": 260
      }
    }
  ]
};
