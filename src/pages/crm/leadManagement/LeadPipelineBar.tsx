import React, { FC } from 'react';
import { PipelineBar, PipelineStage } from './LeadManagementStyles';
import { STATUS_CONFIG } from '../hooks/useLeadManagement';

export interface LeadPipelineBarProps {
  statusFilter: string;
  statusCounts: Map<string, number>;
  onStatusFilterChange: (status: string) => void;
}

export const LeadPipelineBar: FC<LeadPipelineBarProps> = ({
  statusFilter,
  statusCounts,
  onStatusFilterChange,
}) => {
  return (
    <PipelineBar>
      <PipelineStage
        $active={statusFilter === 'all'}
        $color="#1a1a2e"
        onClick={() => onStatusFilterChange('all')}
      >
        All ({statusCounts.get('all') ?? 0})
      </PipelineStage>
      {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
        <PipelineStage
          key={key}
          $active={statusFilter === key}
          $color={cfg.color}
          onClick={() => onStatusFilterChange(key)}
        >
          {cfg.label} ({statusCounts.get(key) ?? 0})
        </PipelineStage>
      ))}
    </PipelineBar>
  );
};
