import { SalesMetrics, Deal, TeamMemberData, PipelineStageItem } from './types';

export const fallbackMetrics: SalesMetrics = {
  totalRevenue: 0,
  activeDeals: 0,
  closedDeals: 0,
  conversionRate: 0,
  pipelineValue: 0,
  avgDealSize: 0,
};

export const fallbackDeals: Deal[] = [];

// Team data — representative display (no dedicated team-performance API endpoint)
export const initialTeamData: TeamMemberData[] = [
  { name: 'Nina', role: 'Lead Sales Agent', deals: 0, revenue: 0, conversion: 0 },
  { name: 'Linda', role: 'Sales Agent', deals: 0, revenue: 0, conversion: 0 },
  { name: 'Diana', role: 'Sales Agent', deals: 0, revenue: 0, conversion: 0 },
  { name: 'Clara', role: 'Junior Sales Agent', deals: 0, revenue: 0, conversion: 0 },
];

export const getStageColor = (stage: string): string => {
  switch (stage.toLowerCase()) {
    case 'lead':
      return '#3B82F6'; // Blue
    case 'negotiation':
      return '#F59E0B'; // Amber
    case 'offer':
      return '#8B5CF6'; // Purple
    case 'closing':
      return '#10B981'; // Green
    default:
      return '#6B7280';
  }
};

export const calculatePipelineStages = (metrics: SalesMetrics): PipelineStageItem[] => [
  {
    name: 'Lead',
    count: Math.round(metrics.activeDeals * 0.52),
    value: Math.round(metrics.pipelineValue * 0.37),
  },
  {
    name: 'Negotiation',
    count: Math.round(metrics.activeDeals * 0.3),
    value: Math.round(metrics.pipelineValue * 0.3),
  },
  {
    name: 'Offer',
    count: Math.round(metrics.activeDeals * 0.13),
    value: Math.round(metrics.pipelineValue * 0.24),
  },
  {
    name: 'Closing',
    count: Math.round(metrics.activeDeals * 0.05),
    value: Math.round(metrics.pipelineValue * 0.09),
  },
];
