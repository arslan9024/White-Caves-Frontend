import React from 'react';
import {
  TabHeader,
  TabTitle,
  HeaderActions,
  PrimaryButton,
  LeadStatsRow,
  LeadStat,
  StatNumber,
  StatLabelText,
  FilterRow,
  FilterSelect,
} from '../TabStylesComponents';
import type { LeadStats } from './leadHelpers';

interface LeadsHeaderAndFiltersProps {
  stats: LeadStats;
  sourceFilter: string;
  setSourceFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  priorityFilter: string;
  setPriorityFilter: (val: string) => void;
  onOpenAdd: () => void;
}

export const LeadsHeaderAndFilters: React.FC<LeadsHeaderAndFiltersProps> = ({
  stats,
  sourceFilter,
  setSourceFilter,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  onOpenAdd,
}) => {
  return (
    <>
      <TabHeader>
        <TabTitle>Lead Management</TabTitle>
        <HeaderActions>
          <PrimaryButton onClick={onOpenAdd}>
            <span>➕</span> Add Lead
          </PrimaryButton>
        </HeaderActions>
      </TabHeader>

      <LeadStatsRow>
        <LeadStat>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabelText>Total Leads</StatLabelText>
        </LeadStat>
        <LeadStat>
          <StatNumber>{stats.new}</StatNumber>
          <StatLabelText>New</StatLabelText>
        </LeadStat>
        <LeadStat>
          <StatNumber>{stats.qualified}</StatNumber>
          <StatLabelText>Qualified</StatLabelText>
        </LeadStat>
        <LeadStat>
          <StatNumber>{stats.highPriority}</StatNumber>
          <StatLabelText>High Priority</StatLabelText>
        </LeadStat>
      </LeadStatsRow>

      <FilterRow>
        <FilterSelect value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
          <option value="all">All Sources</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="website">Website</option>
          <option value="chatbot">Chatbot</option>
          <option value="referral">Referral</option>
        </FilterSelect>
        <FilterSelect value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
        </FilterSelect>
        <FilterSelect value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </FilterSelect>
      </FilterRow>
    </>
  );
};
