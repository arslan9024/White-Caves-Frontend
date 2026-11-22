import React from 'react';
import {
  ContractStatsRow,
  ContractStat,
  StatNumber,
  StatLabelText,
  FilterRow,
  FilterSelect,
} from '../TabStylesComponents';
import type { ContractStats } from './contractsData';

interface ContractsStatsAndFiltersProps {
  stats: ContractStats;
  typeFilter: string;
  statusFilter: string;
  onTypeFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

const ContractsStatsAndFilters: React.FC<ContractsStatsAndFiltersProps> = ({
  stats,
  typeFilter,
  statusFilter,
  onTypeFilterChange,
  onStatusFilterChange,
}) => (
  <>
    <ContractStatsRow>
      <ContractStat>
        <StatNumber>{stats.total}</StatNumber>
        <StatLabelText>Total Contracts</StatLabelText>
      </ContractStat>
      <ContractStat variant="active">
        <StatNumber>{stats.active}</StatNumber>
        <StatLabelText>Active</StatLabelText>
      </ContractStat>
      <ContractStat variant="pending">
        <StatNumber>{stats.pending}</StatNumber>
        <StatLabelText>Pending</StatLabelText>
      </ContractStat>
      <ContractStat variant="ejari">
        <StatNumber>{stats.ejariRegistered}</StatNumber>
        <StatLabelText>Ejari Registered</StatLabelText>
      </ContractStat>
    </ContractStatsRow>

    <FilterRow>
      <FilterSelect value={typeFilter} onChange={e => onTypeFilterChange(e.target.value)}>
        <option value="all">All Types</option>
        <option value="tenancy">Tenancy</option>
        <option value="sale">Sale</option>
      </FilterSelect>
      <FilterSelect value={statusFilter} onChange={e => onStatusFilterChange(e.target.value)}>
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="expired">Expired</option>
      </FilterSelect>
    </FilterRow>
  </>
);

export default ContractsStatsAndFilters;
