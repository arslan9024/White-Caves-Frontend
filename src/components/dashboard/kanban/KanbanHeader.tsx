/**
 * KanbanHeader.tsx
 *
 * Header component displaying the title, description, and action button.
 */

import React, { FC } from 'react';
import { kanbanStyles } from './styles';

export interface KanbanHeaderProps {
  onOpenCreateModal: () => void;
}

export const KanbanHeader: FC<KanbanHeaderProps> = ({ onOpenCreateModal }) => {
  return (
    <div style={kanbanStyles.headerWrapper}>
      <div>
        <h3 style={kanbanStyles.title}>📋 Department Task Pipeline & Collaborative Kanban</h3>
        <p style={kanbanStyles.subtitle}>
          Live task routing across 12 departments with 15-minute SLA enforcement.
        </p>
      </div>

      <button type="button" onClick={onOpenCreateModal} style={kanbanStyles.createButton}>
        + Create Executive Directive
      </button>
    </div>
  );
};

export default KanbanHeader;
