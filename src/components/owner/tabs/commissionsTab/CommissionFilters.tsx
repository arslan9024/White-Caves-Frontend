import React from 'react';
import { FilterRow, FilterSelect } from './styles';

interface CommissionFiltersProps {
  statusFilter: string;
  agentFilter: string;
  agentNames: string[];
  recordCount: number;
  onStatusChange: (status: string) => void;
  onAgentChange: (agent: string) => void;
}

export const CommissionFilters: React.FC<CommissionFiltersProps> = ({
  statusFilter,
  agentFilter,
  agentNames,
  recordCount,
  onStatusChange,
  onAgentChange,
}) => (
  <FilterRow>
    <FilterSelect
      value={statusFilter}
      onChange={e => onStatusChange(e.target.value)}
      aria-label="Filter by status"
    >
      <option value="all">All Statuses</option>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="paid">Paid</option>
      <option value="disputed">Disputed</option>
      <option value="cancelled">Cancelled</option>
    </FilterSelect>

    <FilterSelect
      value={agentFilter}
      onChange={e => onAgentChange(e.target.value)}
      aria-label="Filter by agent"
    >
      <option value="all">All Agents</option>
      {agentNames.map(name => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </FilterSelect>

    <span style={{ fontSize: '0.8rem', color: 'rgba(250,250,250,0.4)', marginLeft: 'auto' }}>
      {recordCount} record{recordCount !== 1 ? 's' : ''}
    </span>
  </FilterRow>
);
