export interface SalesDashboardProps {
  featureId?: string;
  context?: Record<string, unknown>;
}

export interface Deal {
  id: string;
  client: string;
  property: string;
  value: number;
  stage: 'lead' | 'negotiation' | 'offer' | 'closing';
  probability: number;
  agent: string;
  createdAt: string;
}

export interface SalesMetrics {
  totalRevenue: number;
  activeDeals: number;
  closedDeals: number;
  conversionRate: number;
  pipelineValue: number;
  avgDealSize: number;
}

export interface PipelineStageItem {
  name: string;
  count: number;
  value: number;
}

export interface TeamMemberData {
  name: string;
  role: string;
  deals: number;
  revenue: number;
  conversion: number;
}

export interface LeadApiItem {
  id: string;
  name: string;
  status: string;
  budget?: number | null;
  score?: number | null;
  createdAt: string;
  assignedTo?: { name: string } | null;
  property?: { title: string; location: string } | null;
}

export interface SalesDeptData {
  activeDeals: number;
  conversionRate: number;
  monthlyRevenue: number;
  totalLeads: number;
}
