import React from 'react';
import type { CommissionSummary } from './types';
import { formatAED } from './data';
import { SummaryGrid, StatCard, StatLabel, StatValue, StatSub, LoadingRow } from './styles';

interface CommissionSummaryCardsProps {
  loading: boolean;
  summary: CommissionSummary | null;
}

export const CommissionSummaryCards: React.FC<CommissionSummaryCardsProps> = ({
  loading,
  summary,
}) => {
  if (loading) {
    return (
      <SummaryGrid>
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCard key={i} aria-hidden="true">
            <LoadingRow />
          </StatCard>
        ))}
      </SummaryGrid>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <SummaryGrid>
      <StatCard>
        <StatLabel>Total Commissions</StatLabel>
        <StatValue>{formatAED(summary.totalAmount)}</StatValue>
        <StatSub>{summary.totalCommissions} transactions</StatSub>
      </StatCard>
      <StatCard>
        <StatLabel>Pending</StatLabel>
        <StatValue
          style={{
            color: 'var(--color-fde047, #fde047)',
            textShadow: '0 0 18px rgba(253,224,71,0.3)',
          }}
        >
          {formatAED(summary.pendingAmount)}
        </StatValue>
        <StatSub>Awaiting approval</StatSub>
      </StatCard>
      <StatCard>
        <StatLabel>Paid Out</StatLabel>
        <StatValue
          style={{
            color: 'var(--color-4ade80, #4ade80)',
            textShadow: '0 0 18px rgba(74,222,128,0.3)',
          }}
        >
          {formatAED(summary.paidAmount)}
        </StatValue>
        <StatSub>Settled to agents</StatSub>
      </StatCard>
      <StatCard>
        <StatLabel>Avg Commission Rate</StatLabel>
        <StatValue>{summary.averageCommissionRate.toFixed(1)}%</StatValue>
        <StatSub>
          {summary.topAgent ? `Top: ${summary.topAgent.name}` : 'Dubai market avg 2%'}
        </StatSub>
      </StatCard>
    </SummaryGrid>
  );
};
