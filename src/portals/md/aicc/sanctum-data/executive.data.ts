import type { AgentCard } from './types';

export const SANCTUM_EXECUTIVE_COO: AgentCard = {
  "id": "zoe",
  "code": "WC-COO-01",
  "name": "AI Zoe",
  "gender": "Female",
  "tier": "COO",
  "roleTitle": "Chief Operating Officer & Sanctum Commander",
  "allowedTools": [
    "delegate_task",
    "broadcast_command",
    "override_escalation"
  ],
  "capabilities": [
    "Cross-Department Coordination",
    "Managing Director Sovereign Command",
    "SLA Watchdog"
  ],
  "slaResponseMinutes": 5,
  "status": "ACTIVE",
  "kpis": {
    "tasksCompleted": 4820,
    "accuracyPercent": 99.8,
    "latencyMs": 240
  }
};
