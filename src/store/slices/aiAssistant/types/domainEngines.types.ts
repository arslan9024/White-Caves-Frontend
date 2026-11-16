import type { Activity } from './taskLifecycle.types';

export interface MonitoredSite {
  name: string;
  status: 'healthy' | 'degraded' | 'offline';
  lastCheck: string | null;
  dataPoints?: unknown;
}

export interface OliviaInsights {
  priceIndex: number;
  priceChange: number;
  avgRentalYield: number;
  supplyDemandRatio: number;
  hotspots: string[];
  lastUpdated: string;
}

export interface OliviaCoordination {
  maryConnected: boolean;
  inventoryAccess: boolean;
  lastInventoryFetch: string | null;
}

export interface OliviaAutomationState {
  syncSchedule: string;
  lastPropertySync: string | null;
  lastMarketResearch: string | null;
  activeMonitoring: boolean;
  insightsData: OliviaInsights;
  coordination: OliviaCoordination;
  monitoredSites: MonitoredSite[];
  activityLog: Activity[];
}

export interface VaultDocument {
  id: string;
  name: string;
  category: string;
  accessLevel: string;
  createdAt: string;
  accessLog: Array<Record<string, unknown>>;
  meta: Record<string, unknown>;
}

export interface VaultAccessRequest {
  id: string;
  documentId: string;
  requesterId: string;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  requestedAt: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  denyReason?: string;
}

export interface VaultStats {
  totalDocuments: number;
  pendingRequests: number;
  recentAccesses: number;
}

export interface ConfidentialVaultState {
  documents: VaultDocument[];
  accessRequests: VaultAccessRequest[];
  permissions: Record<string, string[]>;
  vaultStats: VaultStats;
}

export interface Lead {
  id: string;
  receivedAt: string;
  initialIntent?: unknown;
  [key: string]: unknown;
}

export interface ProcessedLead {
  status: 'qualified' | 'routed';
  assignedIntent: unknown;
  qualificationScore: number;
  structuredData: unknown;
  qualifiedAt: string;
  routedTo: string | null;
  routedAt: string | null;
  currentStage?: string;
}

export interface SpecialistPipeline {
  leadIds: string[];
  pipelineStages: string[];
}

export interface FunnelMetrics {
  totalIncoming: number;
  rentVsSaleRatio: string;
  avgQualificationTime: string;
  conversionRate: number;
}

export interface LeadScoringRules {
  [key: string]: number;
}

export interface LeadManagementHubState {
  incomingLeads: Lead[];
  processedLeads: Record<string, ProcessedLead>;
  specialistPipelines: Record<string, SpecialistPipeline>;
  funnelMetrics: FunnelMetrics;
  leadScoringRules: LeadScoringRules;
}

export interface AMLMonitor {
  flaggedTransactions: Array<Record<string, unknown>>;
  watchlistMatches: Array<Record<string, unknown>>;
  investigationQueue: string[];
}

export interface ComplianceMetrics {
  totalProfiles: number;
  pendingReview: number;
  approvedThisMonth: number;
  riskScore: number;
}

export interface ComplianceEngineState {
  kycProfiles: Record<string, unknown>;
  amlMonitor: AMLMonitor;
  auditLog: Array<Record<string, unknown>>;
  complianceMetrics: ComplianceMetrics;
}

