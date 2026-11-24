export interface EngineFeature {
  id: string;
  name: string;
  category: 'Session & Auth' | 'Media & Documents' | 'Messaging & Events' | 'AI & Lead Analytics';
  source: 'whatsapp-web.js Core' | 'Nina Native Engine' | 'Hybrid Collaborative';
  status: 'Ready' | 'Active' | 'Optimized';
  description: string;
}

export interface SimulationLogItem {
  time: string;
  clientText: string;
  detectedIntent: string;
  matchedVillasCount: number;
  assignedLeadScore: number;
  autoReply: string;
}

export interface SimulationResult {
  intent: string;
  matchedCount: number;
  score: number;
  reply: string;
}
