import type { DepartmentNode } from '../types';

export const SANCTUM_DEPT_09: DepartmentNode = {
  "deptCode": "DEPT-09",
  "name": "Research, Analytics & Market Intelligence",
  "color": "#0D9488",
  "director": {
    "id": "elena",
    "code": "DIR-09",
    "name": "AI Elena",
    "gender": "Female",
    "tier": "DIRECTOR",
    "roleTitle": "Director of Research, Analytics & Market Intelligence",
    "departmentCode": "DEPT-09",
    "reportingTo": "zoe",
    "allowedTools": [
      "market_predict",
      "dld_data_ingest"
    ],
    "capabilities": [
      "Predictive Price Modeling",
      "DLD Open Data Mining"
    ],
    "slaResponseMinutes": 10,
    "status": "ACTIVE",
    "kpis": {
      "tasksCompleted": 1420,
      "accuracyPercent": 99.6,
      "latencyMs": 280
    }
  },
  "managers": [
    {
      "id": "elena-dld",
      "code": "MGR-09-1",
      "name": "AI Elena DLDIndex",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "DLD Official Transaction Data Miner",
      "slot": 1,
      "departmentCode": "DEPT-09",
      "allowedTools": [
        "dld_transactions"
      ],
      "capabilities": [
        "DLD Live Transactions"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 450,
        "accuracyPercent": 99.8,
        "latencyMs": 250
      }
    },
    {
      "id": "mona-dh2trends",
      "code": "MGR-09-2",
      "name": "AI Mona DH2Stats",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "DAMAC Hills 2 Micro-Market Analytics Manager",
      "slot": 2,
      "departmentCode": "DEPT-09",
      "allowedTools": [
        "dh2_analytics"
      ],
      "capabilities": [
        "DH2 Cluster Comps"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 520,
        "accuracyPercent": 99.7,
        "latencyMs": 240
      }
    },
    {
      "id": "tara-macro",
      "code": "MGR-09-3",
      "name": "AI Tara Macro",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Macroeconomic & UAE Real Estate Trends Manager",
      "slot": 3,
      "departmentCode": "DEPT-09",
      "allowedTools": [
        "macro_indicators"
      ],
      "capabilities": [
        "Macro Trends"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 190,
        "accuracyPercent": 99.2,
        "latencyMs": 310
      }
    },
    {
      "id": "layla-competitor",
      "code": "MGR-09-4",
      "name": "AI Layla Benchmark",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Competitor Brokerage Benchmarking Manager",
      "slot": 4,
      "departmentCode": "DEPT-09",
      "allowedTools": [
        "competitor_radar"
      ],
      "capabilities": [
        "Brokerage Benchmarks"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 210,
        "accuracyPercent": 99,
        "latencyMs": 320
      }
    },
    {
      "id": "rim-yields",
      "code": "MGR-09-5",
      "name": "AI Rim Yields",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Gross & Net Rental Yield Calculation Manager",
      "slot": 5,
      "departmentCode": "DEPT-09",
      "allowedTools": [
        "yield_calculator"
      ],
      "capabilities": [
        "Rental Yield Modeling"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 340,
        "accuracyPercent": 99.6,
        "latencyMs": 260
      }
    },
    {
      "id": "zahra-supply",
      "code": "MGR-09-6",
      "name": "AI Zahra Pipeline",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Future Supply & Handover Pipeline Manager",
      "slot": 6,
      "departmentCode": "DEPT-09",
      "allowedTools": [
        "handover_tracker"
      ],
      "capabilities": [
        "Completion Audits"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 150,
        "accuracyPercent": 99.3,
        "latencyMs": 300
      }
    },
    {
      "id": "maya-population",
      "code": "MGR-09-7",
      "name": "AI Maya Demographics",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Dubai Demographics & Tenant Migration Manager",
      "slot": 7,
      "departmentCode": "DEPT-09",
      "allowedTools": [
        "tenant_migration"
      ],
      "capabilities": [
        "Tenant Migration Trends"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 165,
        "accuracyPercent": 99.1,
        "latencyMs": 295
      }
    },
    {
      "id": "faten-reports",
      "code": "MGR-09-8",
      "name": "AI Faten Reports",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Quarterly Market Report Publisher",
      "slot": 8,
      "departmentCode": "DEPT-09",
      "allowedTools": [
        "report_compiler"
      ],
      "capabilities": [
        "Branded Research Reports"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 85,
        "accuracyPercent": 99.5,
        "latencyMs": 340
      }
    },
    {
      "id": "asma-predictive",
      "code": "MGR-09-9",
      "name": "AI Asma Forecast",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Predictive Price Horizon & Valuation Manager",
      "slot": 9,
      "departmentCode": "DEPT-09",
      "allowedTools": [
        "ml_forecast"
      ],
      "capabilities": [
        "ML Price Forecasting"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 220,
        "accuracyPercent": 99.4,
        "latencyMs": 270
      }
    }
  ]
};
