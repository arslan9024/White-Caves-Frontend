  id: string;
  agentId: string;
  name: string;
  role: string;
  department: string;
  status: string;
  tier: string;
  model: string;
  activeWorkload: number;
}

const INITIAL_SEED: AiAssistantRecord[] = [
  {
    id: 'ai-linda-001',
    agentId: 'linda',
    name: 'AI Linda',
    role: 'Autonomous WhatsApp Broker & Lead Nurturer',
    department: 'Marketing & Strategic Growth',
    status: 'ACTIVE',
    tier: 'SPECIALIST',
    model: 'gemini-1.5-flash',
    activeWorkload: 14,
  },
  {
    id: 'ai-zoe-001',
    agentId: 'zoe',
    name: 'AI Zoe',
    role: 'Chief Operating Partner & Autonomous Workforce Orchestrator',
    department: 'Executive Governance & Sovereign Operations',
    status: 'ACTIVE',
    tier: 'EXECUTIVE',
    model: 'gemini-1.5-pro',
    activeWorkload: 28,
  },
  {
    id: 'ai-ada-001',
    agentId: 'ada',
    name: 'Ada Lovelace',
    role: 'Chief Architect Lead',
    department: 'Autonomous Agent Orchestration',
    status: 'ACTIVE',
    tier: 'SUPERVISOR',
    model: 'gemini-1.5-pro',
    activeWorkload: 8,
  },
];
