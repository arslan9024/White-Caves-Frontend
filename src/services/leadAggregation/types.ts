export interface Lead {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  portalId?: string;
  portals?: string[];
  verified?: boolean;
  createdAt?: string | number | Date;
  lastContactDate?: string | number | Date;
  contactCount?: number;
  score?: number;
  rating?: string;
  assignedAgent?: Agent | null;
  assignmentReason?: string;
  assignedAt?: string | null;
  [key: string]: any;
}

export interface Agent {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export interface DeduplicationRule {
  name: string;
  fields: string[];
  priority?: number;
  action: 'merge' | 'ignore_new' | 'update_existing';
  merge?: (existingLead: Lead, newLead: Lead) => Lead;
}

export interface ScoringRule {
  name: string;
  condition: (lead: Lead) => boolean;
  points: number;
}

export interface AssignmentRule {
  name: string;
  condition: (lead: Lead) => boolean;
  assignTo: (lead: Lead) => string;
  priority?: (lead: Lead) => number;
}

export interface PortalCredentials {
  [portalName: string]: any;
}

export interface PortalAdapterInstance {
  portalName?: string;
  isConnected?: boolean;
  connect?: (credentials: any) => Promise<any>;
  getLeads?: (filters?: any) => Promise<any>;
  setupWebhook?: (url: string, events: string[]) => Promise<any>;
  handleWebhookPayload?: (payload: any) => Promise<any>;
  getSyncStatus?: () => any;
  [key: string]: any;
}

export interface PortalAdapterMap {
  bayut: PortalAdapterInstance;
  propertyfinder: PortalAdapterInstance;
  dubizzle: PortalAdapterInstance;
  skyloov: PortalAdapterInstance;
  [portalKey: string]: PortalAdapterInstance;
}

export interface AggregationResult {
  success: boolean;
  timestamp?: string;
  duration?: number;
  portalCounts?: Record<string, number>;
  totalFetched?: number;
  afterDeduplication?: number;
  currentLeads?: number;
  error?: string;
}

export interface AggregationStatus {
  isProcessing: boolean;
  lastSync: string | null;
  totalLeads: number;
  hotLeads: number;
  unassignedLeads: number;
  portalBreakdown: {
    bayut: number;
    propertyfinder: number;
    dubizzle: number;
    skyloov: number;
    [key: string]: number;
  };
  adapterHealth: Record<string, any>;
}

export interface ScoreDistribution {
  excellent: number;
  veryGood: number;
  good: number;
  fair: number;
  poor: number;
}

export interface AggregationStatistics {
  totalLeads: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  scoreDistribution: ScoreDistribution;
}
