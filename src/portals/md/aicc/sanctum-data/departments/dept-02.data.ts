import type { DepartmentNode } from '../types';

export const SANCTUM_DEPT_02: DepartmentNode = {
  "deptCode": "DEPT-02",
  "name": "Marketing, Branding & Digital Acquisition",
  "color": "#F59E0B",
  "director": {
    "id": "olivia",
    "code": "DIR-02",
    "name": "AI Olivia",
    "gender": "Female",
    "tier": "DIRECTOR",
    "roleTitle": "Director of Marketing, Branding & Digital Growth",
    "departmentCode": "DEPT-02",
    "reportingTo": "zoe",
    "allowedTools": [
      "campaign_manager",
      "ad_telemetry"
    ],
    "capabilities": [
      "Omnichannel Growth",
      "Lead Generation ROI"
    ],
    "slaResponseMinutes": 10,
    "status": "ACTIVE",
    "kpis": {
      "tasksCompleted": 1240,
      "accuracyPercent": 99.1,
      "latencyMs": 330
    }
  },
  "managers": [
    {
      "id": "olivia-growth",
      "code": "MGR-02-1",
      "name": "AI Olivia Growth",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Paid Digital Ads & PPC Acquisition Manager",
      "slot": 1,
      "departmentCode": "DEPT-02",
      "allowedTools": [
        "meta_ads"
      ],
      "capabilities": [
        "Meta & Google Ads"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 340,
        "accuracyPercent": 98.8,
        "latencyMs": 310
      }
    },
    {
      "id": "chloe-seo",
      "code": "MGR-02-2",
      "name": "AI Chloe SEO",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Organic Search, SEO & Content Authority Manager",
      "slot": 2,
      "departmentCode": "DEPT-02",
      "allowedTools": [
        "seo_indexer"
      ],
      "capabilities": [
        "Organic Search Authority"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 210,
        "accuracyPercent": 99.4,
        "latencyMs": 380
      }
    },
    {
      "id": "maya-social",
      "code": "MGR-02-3",
      "name": "AI Maya Social",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Social Media & Influencer Relations Manager",
      "slot": 3,
      "departmentCode": "DEPT-02",
      "allowedTools": [
        "social_scheduler"
      ],
      "capabilities": [
        "Instagram & LinkedIn Showcases"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 290,
        "accuracyPercent": 99,
        "latencyMs": 320
      }
    },
    {
      "id": "valeria-creative",
      "code": "MGR-02-4",
      "name": "AI Valeria Creative",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Brand Design & Visual Aesthetics Manager",
      "slot": 4,
      "departmentCode": "DEPT-02",
      "allowedTools": [
        "asset_render"
      ],
      "capabilities": [
        "White Caves Red & Slate Standards"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 175,
        "accuracyPercent": 99.6,
        "latencyMs": 295
      }
    },
    {
      "id": "leila-video",
      "code": "MGR-02-5",
      "name": "AI Leila Cinematic",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "CGI, 3D Tours & Video Production Manager",
      "slot": 5,
      "departmentCode": "DEPT-02",
      "allowedTools": [
        "matterport_sync"
      ],
      "capabilities": [
        "Matterport 3D Walkthroughs"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 85,
        "accuracyPercent": 99.2,
        "latencyMs": 440
      }
    },
    {
      "id": "diana-email",
      "code": "MGR-02-6",
      "name": "AI Diana Newsletter",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Investor Email Marketing & Newsletter Manager",
      "slot": 6,
      "departmentCode": "DEPT-02",
      "allowedTools": [
        "resend_campaign"
      ],
      "capabilities": [
        "Investor Email Drop"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 190,
        "accuracyPercent": 99.5,
        "latencyMs": 280
      }
    },
    {
      "id": "samira-campaigns",
      "code": "MGR-02-7",
      "name": "AI Samira Campaigns",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Damac Hills 2 Targeted Campaign Manager",
      "slot": 7,
      "departmentCode": "DEPT-02",
      "allowedTools": [
        "dh2_outreach"
      ],
      "capabilities": [
        "DAMAC Hills 2 Landlord Acquisition"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 512,
        "accuracyPercent": 99.7,
        "latencyMs": 270
      }
    },
    {
      "id": "ines-analytics",
      "code": "MGR-02-8",
      "name": "AI Ines Attribution",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Marketing Attribution & ROAS Telemetry Manager",
      "slot": 8,
      "departmentCode": "DEPT-02",
      "allowedTools": [
        "roas_calculator"
      ],
      "capabilities": [
        "CPL & ROAS Tracking"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 140,
        "accuracyPercent": 99.3,
        "latencyMs": 310
      }
    },
    {
      "id": "gabriella-pr",
      "code": "MGR-02-9",
      "name": "AI Gabriella Press",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Public Relations & Dubai Media Release Manager",
      "slot": 9,
      "departmentCode": "DEPT-02",
      "allowedTools": [
        "press_wire"
      ],
      "capabilities": [
        "UAE Press Syndication"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 78,
        "accuracyPercent": 99.1,
        "latencyMs": 330
      }
    }
  ]
};
