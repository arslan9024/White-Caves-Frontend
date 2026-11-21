import type { DepartmentNode } from '../types';

export const SANCTUM_DEPT_10: DepartmentNode = {
  "deptCode": "DEPT-10",
  "name": "Accounting, Finance & Tax",
  "color": "#EAB308",
  "director": {
    "id": "theodora",
    "code": "DIR-10",
    "name": "AI Theodora",
    "gender": "Female",
    "tier": "DIRECTOR",
    "roleTitle": "Director of Accounting, Finance, Escrow & Corporate Tax",
    "departmentCode": "DEPT-10",
    "reportingTo": "zoe",
    "allowedTools": [
      "ledger_audit",
      "vat_calculator",
      "corporate_tax_calc"
    ],
    "capabilities": [
      "UAE 9% Corporate Tax",
      "FTA VAT Audits",
      "Escrow Ledger"
    ],
    "slaResponseMinutes": 10,
    "status": "ACTIVE",
    "kpis": {
      "tasksCompleted": 1680,
      "accuracyPercent": 99.9,
      "latencyMs": 230
    }
  },
  "managers": [
    {
      "id": "theodora-ledger",
      "code": "MGR-10-1",
      "name": "AI Theodora Ledger",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "General Ledger & Chart of Accounts Manager",
      "slot": 1,
      "departmentCode": "DEPT-10",
      "allowedTools": [
        "gl_reconcile"
      ],
      "capabilities": [
        "General Ledger"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 480,
        "accuracyPercent": 100,
        "latencyMs": 210
      }
    },
    {
      "id": "lina-escrow",
      "code": "MGR-10-2",
      "name": "AI Lina Escrow",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Trustee Escrow & Client Funds Manager",
      "slot": 2,
      "departmentCode": "DEPT-10",
      "allowedTools": [
        "escrow_audit"
      ],
      "capabilities": [
        "Client Funds Escrow"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 310,
        "accuracyPercent": 100,
        "latencyMs": 220
      }
    },
    {
      "id": "nadia-vat",
      "code": "MGR-10-3",
      "name": "AI Nadia VAT",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "UAE VAT 5% Compliance & FTA Return Manager",
      "slot": 3,
      "departmentCode": "DEPT-10",
      "allowedTools": [
        "vat_return"
      ],
      "capabilities": [
        "FTA VAT 201 Returns"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 195,
        "accuracyPercent": 100,
        "latencyMs": 240
      }
    },
    {
      "id": "mona-corporatetax",
      "code": "MGR-10-4",
      "name": "AI Mona CorporateTax",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "UAE Corporate Tax (9%) Structuring Manager",
      "slot": 4,
      "departmentCode": "DEPT-10",
      "allowedTools": [
        "tax_provision"
      ],
      "capabilities": [
        "UAE Corporate Tax (9%)"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 140,
        "accuracyPercent": 100,
        "latencyMs": 250
      }
    },
    {
      "id": "samia-invoicing",
      "code": "MGR-10-5",
      "name": "AI Samia Invoicing",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Broker Commission & Client Tax Invoicing Manager",
      "slot": 5,
      "departmentCode": "DEPT-10",
      "allowedTools": [
        "invoice_gen"
      ],
      "capabilities": [
        "Electronic Tax Invoices"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 420,
        "accuracyPercent": 99.8,
        "latencyMs": 230
      }
    },
    {
      "id": "hiba-payouts",
      "code": "MGR-10-6",
      "name": "AI Hiba Disburse",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Broker Commission Payout & Disbursal Manager",
      "slot": 6,
      "departmentCode": "DEPT-10",
      "allowedTools": [
        "disbursal_queue"
      ],
      "capabilities": [
        "Payout Gate Verification"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 260,
        "accuracyPercent": 99.9,
        "latencyMs": 260
      }
    },
    {
      "id": "reem-cashflow",
      "code": "MGR-10-7",
      "name": "AI Reem Cashflow",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Cashflow Forecasting & Working Capital Manager",
      "slot": 7,
      "departmentCode": "DEPT-10",
      "allowedTools": [
        "cashflow_model"
      ],
      "capabilities": [
        "90-Day Runway Forecasting"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 180,
        "accuracyPercent": 99.5,
        "latencyMs": 270
      }
    },
    {
      "id": "dina-expenses",
      "code": "MGR-10-8",
      "name": "AI Dina Expenses",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Corporate Card & Operational Expense Auditor",
      "slot": 8,
      "departmentCode": "DEPT-10",
      "allowedTools": [
        "receipt_scanner"
      ],
      "capabilities": [
        "Expense Auditing"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 290,
        "accuracyPercent": 99.4,
        "latencyMs": 290
      }
    },
    {
      "id": "salwa-audit",
      "code": "MGR-10-9",
      "name": "AI Salwa ExternalAudit",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Statutory Annual Audit Readiness Manager",
      "slot": 9,
      "departmentCode": "DEPT-10",
      "allowedTools": [
        "audit_pack"
      ],
      "capabilities": [
        "Statutory Audit Packs"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 95,
        "accuracyPercent": 99.7,
        "latencyMs": 310
      }
    }
  ]
};
