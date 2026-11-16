import { authFetch } from '../../../utils/authFetch';
import type { AnalyticsData } from './types';

interface MarketOverviewResponse {
  success?: boolean;
  data?: {
    avgRentalYield?: number;
    avgDaysOnMarket?: number;
    totalTransactionValue30d?: number;
    topAreas?: Array<{ area: string; count: number; avgPrice: number }>;
  };
}

interface ExecutiveResponse {
  success?: boolean;
  data?: {
    leads?: { byStatus?: Record<string, number> };
    properties?: { byType?: Record<string, number> };
  };
}

interface CommissionsResponse {
  success?: boolean;
  data?: Array<{ agentName?: string; commissionAmount?: number }>;
}

export async function fetchAnalyticsDashboardData(): Promise<AnalyticsData> {
  const [overviewResult, executiveResult, commissionsResult] = await Promise.allSettled([
    authFetch('/api/analytics/overview').then(
      (r: Response) => r.json() as Promise<MarketOverviewResponse>
    ),
    authFetch('/api/dashboard/executive').then(
      (r: Response) => r.json() as Promise<ExecutiveResponse>
    ),
    authFetch('/api/commissions?pageSize=100').then(
      (r: Response) => r.json() as Promise<CommissionsResponse>
    ),
  ]);

  const overview =
    overviewResult.status === 'fulfilled' ? overviewResult.value.data : undefined;
  const executive =
    executiveResult.status === 'fulfilled' ? executiveResult.value.data : undefined;
  const commissions =
    commissionsResult.status === 'fulfilled' ? (commissionsResult.value.data ?? []) : [];

  const totalLeads = Object.values(executive?.leads?.byStatus ?? {}).reduce(
    (sum, count) => sum + count,
    0
  );
  const wonLeads =
    (executive?.leads?.byStatus?.won ?? 0) + (executive?.leads?.byStatus?.closed ?? 0);
  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0.0';
  const totalCommissionValue = commissions.reduce(
    (sum, c) => sum + (c.commissionAmount ?? 0),
    0
  );
  const averageDealSize =
    commissions.length > 0 ? totalCommissionValue / commissions.length : 0;

  const metrics: NonNullable<AnalyticsData['metrics']> = [
    {
      label: 'Conversion Rate',
      value: `${conversionRate}%`,
      change: `${wonLeads} won / ${totalLeads} leads`,
      trend: 'up',
    },
    {
      label: 'Average Deal Size',
      value: `AED ${(averageDealSize / 1000000).toFixed(1)}M`,
      change: `${commissions.length} deals`,
      trend: 'up',
    },
    {
      label: 'Avg Days on Market',
      value: `${overview?.avgDaysOnMarket ?? 0} days`,
      change: 'Last 30 days',
      trend: 'up',
    },
    {
      label: 'Average Rental Yield',
      value: `${(overview?.avgRentalYield ?? 0).toFixed(1)}%`,
      change: 'Market overview',
      trend: 'up',
    },
    {
      label: '30d Market Volume',
      value: `AED ${((overview?.totalTransactionValue30d ?? 0) / 1000000000).toFixed(1)}B`,
      change: 'Recent transactions',
      trend: 'up',
    },
  ];

  const areas = overview?.topAreas ?? [];
  const totalAreaRevenue = areas.reduce((sum, area) => sum + area.avgPrice * area.count, 0);
  const revenueByEmirate: NonNullable<AnalyticsData['revenueByEmirate']> = areas
    .slice(0, 5)
    .map(area => {
      const revenue = area.avgPrice * area.count;
      const percentage =
        totalAreaRevenue > 0 ? Math.round((revenue / totalAreaRevenue) * 100) : 0;
      return {
        emirate: area.area,
        revenue,
        percentage,
      };
    });

  const byType = executive?.properties?.byType ?? {};
  const totalPropertyCount = Object.values(byType).reduce((sum, count) => sum + count, 0);
  const propertyPerformance: NonNullable<AnalyticsData['propertyPerformance']> =
    Object.entries(byType)
      .map(([type, count]) => {
        const inquiries =
          totalPropertyCount > 0
            ? Math.max(1, Math.round((totalLeads * count) / totalPropertyCount))
            : count;
        const deals = Math.min(
          inquiries,
          Math.round((parseFloat(conversionRate) / 100) * inquiries)
        );
        return {
          type: type.charAt(0).toUpperCase() + type.slice(1),
          views: count,
          inquiries,
          deals,
        };
      })
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

  const agentMap = new Map<string, { deals: number; revenue: number }>();
  commissions.forEach(c => {
    const name = (c.agentName ?? 'Unknown').trim() || 'Unknown';
    const current = agentMap.get(name) ?? { deals: 0, revenue: 0 };
    current.deals += 1;
    current.revenue += c.commissionAmount ?? 0;
    agentMap.set(name, current);
  });

  const topAgents: NonNullable<AnalyticsData['topAgents']> = Array.from(agentMap.entries())
    .map(([name, stats]) => ({ name, deals: stats.deals, revenue: stats.revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return {
    metrics,
    revenueByEmirate,
    propertyPerformance,
    topAgents,
  };
}

