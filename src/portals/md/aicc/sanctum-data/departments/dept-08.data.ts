import type { DepartmentNode } from '../types';

export const SANCTUM_DEPT_08: DepartmentNode = {
  "deptCode": "DEPT-08",
  "name": "Media, Public Relations & Communications",
  "color": "#25D366",
  "director": {
    "id": "maya",
    "code": "DIR-08",
    "name": "AI Maya",
    "gender": "Female",
    "tier": "DIRECTOR",
    "roleTitle": "Director of Omnichannel Communications & Media Relations",
    "departmentCode": "DEPT-08",
    "reportingTo": "zoe",
    "allowedTools": [
      "whatsapp_broadcast",
      "omnichannel_stream"
    ],
    "capabilities": [
      "WhatsApp Multi-Number Infrastructure",
      "Media Releases"
    ],
    "slaResponseMinutes": 5,
    "status": "ACTIVE",
    "kpis": {
      "tasksCompleted": 3120,
      "accuracyPercent": 99.8,
      "latencyMs": 190
    }
  },
  "managers": [
    {
      "id": "linda",
      "code": "MGR-08-1",
      "name": "AI Linda WhatsApp",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Head of WhatsApp Real Estate Automation & Client Channel",
      "slot": 1,
      "departmentCode": "DEPT-08",
      "allowedTools": [
        "whatsapp_send",
        "analyze_chat"
      ],
      "capabilities": [
        "5-Number WhatsApp Ingestion",
        "Damac Hills 2 Campaigns"
      ],
      "slaResponseMinutes": 1,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 1820,
        "accuracyPercent": 99.9,
        "latencyMs": 120
      }
    },
    {
      "id": "linda-analyzer",
      "code": "MGR-08-2",
      "name": "AI Linda Analyzer",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "WhatsApp Inbound Conversation Classifier & Intent Analyzer",
      "slot": 2,
      "departmentCode": "DEPT-08",
      "allowedTools": [
        "classify_intent"
      ],
      "capabilities": [
        "Intent Classification",
        "Unit Extraction"
      ],
      "slaResponseMinutes": 5,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 1640,
        "accuracyPercent": 99.7,
        "latencyMs": 160
      }
    },
    {
      "id": "salma-campaigns",
      "code": "MGR-08-3",
      "name": "AI Salma Broadcast",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Landlord WhatsApp Follow-Up Campaign Manager",
      "slot": 3,
      "departmentCode": "DEPT-08",
      "allowedTools": [
        "broadcast_queue"
      ],
      "capabilities": [
        "Damac Hills 2 Landlord Drip Sequences"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 620,
        "accuracyPercent": 99.5,
        "latencyMs": 230
      }
    },
    {
      "id": "farah-telephony",
      "code": "MGR-08-4",
      "name": "AI Farah VoIP",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Cloud Telephony & Call Transcription Manager",
      "slot": 4,
      "departmentCode": "DEPT-08",
      "allowedTools": [
        "voice_transcriber"
      ],
      "capabilities": [
        "Speech-to-Text Call Summaries"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 340,
        "accuracyPercent": 99.1,
        "latencyMs": 280
      }
    },
    {
      "id": "rehab-crisis",
      "code": "MGR-08-5",
      "name": "AI Rehab Crisis",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Media Crisis & Brand Protection Manager",
      "slot": 5,
      "departmentCode": "DEPT-08",
      "allowedTools": [
        "crisis_override"
      ],
      "capabilities": [
        "PR Firewalls"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 45,
        "accuracyPercent": 100,
        "latencyMs": 190
      }
    },
    {
      "id": "nour-socialchat",
      "code": "MGR-08-6",
      "name": "AI Nour DirectMessage",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Instagram & LinkedIn Direct Inquiry Manager",
      "slot": 6,
      "departmentCode": "DEPT-08",
      "allowedTools": [
        "dm_inbox"
      ],
      "capabilities": [
        "Social DM Intake"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 410,
        "accuracyPercent": 99.3,
        "latencyMs": 250
      }
    },
    {
      "id": "hiba-podcast",
      "code": "MGR-08-7",
      "name": "AI Hiba Audio",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Dubai Real Estate Podcast & Broadcast Manager",
      "slot": 7,
      "departmentCode": "DEPT-08",
      "allowedTools": [
        "audio_editor"
      ],
      "capabilities": [
        "Podcast Production"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 60,
        "accuracyPercent": 98.8,
        "latencyMs": 360
      }
    },
    {
      "id": "ghada-editorial",
      "code": "MGR-08-8",
      "name": "AI Ghada Editorial",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Executive Speechwriting & Thought Leadership Manager",
      "slot": 8,
      "departmentCode": "DEPT-08",
      "allowedTools": [
        "editorial_engine"
      ],
      "capabilities": [
        "MD Thought Leadership"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 85,
        "accuracyPercent": 99.6,
        "latencyMs": 270
      }
    },
    {
      "id": "rawan-sms",
      "code": "MGR-08-9",
      "name": "AI Rawan SMS",
      "gender": "Female",
      "tier": "MANAGER",
      "roleTitle": "Direct SMS & Notification Dispatch Manager",
      "slot": 9,
      "departmentCode": "DEPT-08",
      "allowedTools": [
        "sms_gateway"
      ],
      "capabilities": [
        "Urgent SMS Alerts"
      ],
      "slaResponseMinutes": 15,
      "status": "ACTIVE",
      "kpis": {
        "tasksCompleted": 530,
        "accuracyPercent": 99.9,
        "latencyMs": 180
      }
    }
  ]
};
