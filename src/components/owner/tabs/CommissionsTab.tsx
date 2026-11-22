/**
 * CommissionsTab - Dubai Real Estate Commission Tracker
 * Connects to existing 9 backend endpoints in /api/commissions
 * Brand: White Caves (#C41E3A red / #0A0A0A black / #FAFAFA white)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { authFetch } from '../../../utils/authFetch';
import type {
  Commission,
  CommissionStatus,
  CommissionSummary,
  CommissionsTabProps,
} from './commissionsTab/types';
import { MOCK_COMMISSIONS, MOCK_SUMMARY } from './commissionsTab/data';
import { Container, Header, Title } from './commissionsTab/styles';
import { CommissionSummaryCards } from './commissionsTab/CommissionSummaryCards';
import { CommissionFilters } from './commissionsTab/CommissionFilters';
import { CommissionsTable } from './commissionsTab/CommissionsTable';

export const CommissionsTab: React.FC<CommissionsTabProps> = ({ onAction }) => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [summary, setSummary] = useState<CommissionSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [agentFilter, setAgentFilter] = useState<string>('all');

  const fetchData = useCallback(async (): Promise<void> => {
    setError(null);
    try {
      const [commissionsRes, summaryRes] = await Promise.all([
        authFetch('/api/commissions?pageSize=50').then(
          (r: Response) => r.json() as Promise<{ success: boolean; data: Commission[] }>
        ),
        authFetch('/api/commissions/summary').then(
          (r: Response) => r.json() as Promise<{ success: boolean; data: CommissionSummary }>
        ),
      ]);
      setCommissions(commissionsRes.data ?? []);
      setSummary(summaryRes.data ?? null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load commissions';
      setError(message);
      setCommissions(MOCK_COMMISSIONS);
      setSummary(MOCK_SUMMARY);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const handleAction = useCallback(
    (action: string, id: string): void => {
      if (action === 'approve') {
        setCommissions(prev =>
          prev.map(c => (c._id === id ? { ...c, status: 'approved' as CommissionStatus } : c))
        );
      } else if (action === 'pay') {
        setCommissions(prev =>
          prev.map(c =>
            c._id === id
              ? { ...c, status: 'paid' as CommissionStatus, paidAt: new Date().toISOString() }
              : c
          )
        );
      } else if (action === 'dispute') {
        setCommissions(prev =>
          prev.map(c => (c._id === id ? { ...c, status: 'disputed' as CommissionStatus } : c))
        );
      }
      onAction?.(action, id);
    },
    [onAction]
  );

  const agentNames = [...new Set(commissions.map(c => c.agentName))].sort();

  const filtered = commissions.filter(c => {
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchAgent = agentFilter === 'all' || c.agentName === agentFilter;
    return matchStatus && matchAgent;
  });

  return (
    <Container aria-label="Commissions management tab">
      <Header>
        <Title>{'\u{1F48E}'} Commission Tracker</Title>
        {error && (
          <span
            style={{
              fontSize: '0.8rem',
              color: '#f87171',
              background: 'rgba(239,68,68,0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: 6,
              border: '1px solid rgba(239,68,68,0.3)',
            }}
            role="alert"
          >
            {'\u26A0\uFE0F'} Using demo data {'\u2014'} API connection pending
          </span>
        )}
      </Header>

      <CommissionSummaryCards loading={loading} summary={summary} />

      <CommissionFilters
        statusFilter={statusFilter}
        agentFilter={agentFilter}
        agentNames={agentNames}
        recordCount={filtered.length}
        onStatusChange={setStatusFilter}
        onAgentChange={setAgentFilter}
      />

      <CommissionsTable loading={loading} commissions={filtered} onAction={handleAction} />
    </Container>
  );
};
