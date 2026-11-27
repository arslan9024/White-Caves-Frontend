import React from 'react';
import type { Lead } from '../types';
import {
  TableContainer,
  Table,
  LeadCell,
  ContactCell,
  SourceBadge,
  PriorityBadge,
  StatusBadge,
  StatusSelect,
  UnassignedBadge,
  ActionButtons,
  IconButton,
} from '../TabStylesComponents';
import { getSourceIcon, getStatusColor } from './leadHelpers';
import { MobileLeadCard } from '../MobileLeadCard';

interface LeadsTableProps {
  leads: Lead[];
  onOpenEdit: (lead: Lead) => void;
  onOpenDelete: (lead: Lead) => void;
  onStatusChange: (id: number, status: string) => void;
  onSnooze?: (id: number) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  onOpenEdit,
  onOpenDelete,
  onStatusChange,
  onSnooze,
}) => {
  return (
    <>
      <div className="desktop-only-table">
        <TableContainer>
          <Table aria-label="Leads data">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Contact</th>
                <th>Source</th>
                <th>Interest</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Agent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id}>
                  <td>
                    <LeadCell>
                      <strong>{lead.name}</strong>
                      <small>
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                      </small>
                    </LeadCell>
                  </td>
                  <td>
                    <ContactCell>
                      <span>{lead.phone}</span>
                      <small>{lead.email}</small>
                    </ContactCell>
                  </td>
                  <td>
                    <SourceBadge className="source-badge">
                      {getSourceIcon(lead.source)} {lead.source}
                    </SourceBadge>
                  </td>
                  <td>{lead.interest || 'N/A'}</td>
                  <td>
                    <PriorityBadge className="priority-badge" $priority={lead.priority}>
                      {lead.priority}
                    </PriorityBadge>
                  </td>
                  <td>
                    <StatusBadge className="status-badge" $status={lead.status}>
                      {lead.status}
                    </StatusBadge>
                    <StatusSelect
                      value={lead.status}
                      onChange={e => onStatusChange(lead.id, e.target.value)}
                      style={{ color: getStatusColor(lead.status) }}
                      aria-label="Change lead status"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="lost">Lost</option>
                    </StatusSelect>
                  </td>
                  <td>{lead.agent || <UnassignedBadge>Unassigned</UnassignedBadge>}</td>
                  <td>
                    <ActionButtons>
                      <IconButton
                        title="Edit"
                        aria-label="Edit lead"
                        onClick={() => onOpenEdit(lead)}
                      >
                        ✏️
                      </IconButton>
                      <IconButton
                        danger
                        title="Delete"
                        aria-label="Delete lead"
                        onClick={() => onOpenDelete(lead)}
                      >
                        🗑️
                      </IconButton>
                    </ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
      <div className="mobile-only-cards">
        {leads.map(lead => (
          <MobileLeadCard key={lead.id} lead={lead} onSnooze={onSnooze || (() => {})} />
        ))}
      </div>
    </>
  );
};
