import type { DepartmentNode } from '../types';

export const SANCTUM_DEPT_07: DepartmentNode = {
  "deptCode": "DEPT-07",
  "name": "Partnerships, Alliances & Capital Growth",
  "color": "#6366F1",
  "director": {
    "id": "amira",
    "code": "DIR-07",
    "name": "AI Amira",
    "gender": "Female",
    "tier": "DIRECTOR",
    "roleTitle": "Director of Partnerships, Strategic Alliances & Capital Growth",
    "departmentCode": "DEPT-07",
    "reportingTo": "zoe",
    "allowedTools": [
      "developer_relations",
      "syndicate_capital"
    ],
    "capabilities": [
      "Developer Master Contracts",
      "Institutional Alliances"
    ],
    "slaResponseMinutes": 10,
    "status": "ACTIVE",
    "kpis": {
      "tasksCompleted": 640,
      "accuracyPercent": 99.4,
      "latencyMs": 310
    }
  },
  "managers": [
    {
      "id": "amira-developers",
      "code": "MGR-07-1",
      "name": "AI Amira Tier1",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Tier-1 Master Developer Relations Manager",
      "slot": 1,
      "departmentCode": "DEPT-07",
      "allowedTools": [
        "tier1_relations"
      ],
      "capabilities": [
        "DAMAC & Emaar Liaison"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 180,
        "accuracyPercent": 99.5,
        "latencyMs": 290
      }
    },
    {
      "id": "salma-familyoffice",
      "code": "MGR-07-2",
      "name": "AI Salma PrivateWealth",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Family Office & Institutional Fund Manager",
      "slot": 2,
      "departmentCode": "DEPT-07",
      "allowedTools": [
        "fund_prospectus"
      ],
      "capabilities": [
        "Bulk Floor Purchases"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 95,
        "accuracyPercent": 99.2,
        "latencyMs": 340
      }
    },
    {
      "id": "rania-fintech",
      "code": "MGR-07-3",
      "name": "AI Rania PropTech",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "PropTech & Crypto Real Estate Partner Manager",
      "slot": 3,
      "departmentCode": "DEPT-07",
      "allowedTools": [
        "crypto_escrow"
      ],
      "capabilities": [
        "Crypto Real Estate Settlement"
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
      "id": "mira-international",
      "code": "MGR-07-4",
      "name": "AI Mira GlobalDesk",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "International Sub-Agency Network Manager",
      "slot": 4,
      "departmentCode": "DEPT-07",
      "allowedTools": [
        "subagency_network"
      ],
      "capabilities": [
        "Global Affiliate Networks"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 130,
        "accuracyPercent": 99.3,
        "latencyMs": 300
      }
    },
    {
      "id": "latifa-hospitality",
      "code": "MGR-07-5",
      "name": "AI Latifa HotelResidences",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Branded Luxury Residences Partner Manager",
      "slot": 5,
      "departmentCode": "DEPT-07",
      "allowedTools": [
        "branded_residences"
      ],
      "capabilities": [
        "Branded Luxury Residences"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 65,
        "accuracyPercent": 99.6,
        "latencyMs": 280
      }
    },
    {
      "id": "nadira-banks",
      "code": "MGR-07-6",
      "name": "AI Nadira Banking",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "UAE Banking & Private Escrow Relations Manager",
      "slot": 6,
      "departmentCode": "DEPT-07",
      "allowedTools": [
        "escrow_liaison"
      ],
      "capabilities": [
        "Bank Escrow Agreements"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 85,
        "accuracyPercent": 99.8,
        "latencyMs": 270
      }
    },
    {
      "id": "kholoud-relocation",
      "code": "MGR-07-7",
      "name": "AI Kholoud GoldenVisa",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Golden Visa & Immigration Service Partner Manager",
      "slot": 7,
      "departmentCode": "DEPT-07",
      "allowedTools": [
        "golden_visa"
      ],
      "capabilities": [
        "Golden Visa Portals"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 140,
        "accuracyPercent": 99.7,
        "latencyMs": 260
      }
    },
    {
      "id": "samia-interiors",
      "code": "MGR-07-8",
      "name": "AI Samia DesignAlliances",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Turnkey Interior Architecture Partner Manager",
      "slot": 8,
      "departmentCode": "DEPT-07",
      "allowedTools": [
        "turnkey_partner"
      ],
      "capabilities": [
        "Luxury Fit-out Deals"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 55,
        "accuracyPercent": 98.9,
        "latencyMs": 350
      }
    },
    {
      "id": "lubna-investments",
      "code": "MGR-07-9",
      "name": "AI Lubna Syndication",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Fractional Investment & Real Estate Syndicate Manager",
      "slot": 9,
      "departmentCode": "DEPT-07",
      "allowedTools": [
        "syndicate_calc"
      ],
      "capabilities": [
        "Fractional Yield Pooling"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 70,
        "accuracyPercent": 99.1,
        "latencyMs": 320
      }
    }
  ]
};
