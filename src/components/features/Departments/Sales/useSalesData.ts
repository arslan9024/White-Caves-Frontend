import { useState, useEffect } from 'react';
import { authFetch } from '../../../../utils/authFetch';
import { SalesMetrics, Deal, SalesDeptData, LeadApiItem } from './types';
import { fallbackMetrics, fallbackDeals } from './constants';

export const useSalesData = () => {
  const [metrics, setMetrics] = useState<SalesMetrics>(fallbackMetrics);
  const [deals, setDeals] = useState<Deal[]>(fallbackDeals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchSalesData = async () => {
      try {
        const [deptRes, leadsRes] = await Promise.all([
          authFetch('/api/departments/SALES/data').then(r => r.json()),
          authFetch('/api/leads?pageSize=5&sortBy=createdAt&sortOrder=desc').then(r => r.json()),
        ]);

        if (!isMounted) return;

        const dept = deptRes as unknown as SalesDeptData;
        setMetrics({
          totalRevenue: dept.monthlyRevenue,
          activeDeals: dept.activeDeals,
          closedDeals:
            dept.totalLeads > 0 ? Math.round(dept.totalLeads * (dept.conversionRate / 100)) : 0,
          conversionRate: dept.conversionRate,
          pipelineValue: dept.activeDeals * 200000,
          avgDealSize: dept.activeDeals > 0 ? dept.monthlyRevenue / dept.activeDeals : 0,
        });

        const leadsData = leadsRes as unknown as { data: LeadApiItem[] };
        const mappedDeals: Deal[] = (leadsData.data || []).map(lead => {
          const stageMap: Record<string, Deal['stage']> = {
            hot: 'closing',
            qualified: 'offer',
            contacted: 'negotiation',
            new: 'lead',
            warm: 'lead',
            cold: 'lead',
          };
          return {
            id: lead.id,
            client: lead.name,
            property: lead.property?.title || lead.property?.location || 'Property TBD',
            value: lead.budget ?? 0,
            stage: stageMap[lead.status] ?? 'lead',
            probability: Math.min(100, Math.max(0, lead.score ?? 50)),
            agent: lead.assignedTo?.name || 'Unassigned',
            createdAt: new Date(lead.createdAt).toLocaleDateString('en-GB'),
          };
        });
        setDeals(mappedDeals);
      } catch {
        // Keep fallback values on error
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchSalesData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { metrics, deals, loading };
};
