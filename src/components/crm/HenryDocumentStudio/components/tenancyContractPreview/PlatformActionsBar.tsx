import React, { FC, CSSProperties } from 'react';
import { Building, FileCheck, UserCheck } from 'lucide-react';
import { ActionButton } from '../../styles/HenryDocumentStudio.style';

export interface PlatformActionsBarProps {
  handleLoadContractIntoPreparationStudio: () => void;
  handleCreateCrmLandlordFromContract: () => void;
  handleCreateCrmTenantFromContract: () => void;
}

const barContainerStyle: CSSProperties = {
  background: '#F1F5F9',
  border: '1px solid #CBD5E1',
  borderRadius: '10px',
  padding: '14px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  alignItems: 'center',
};

const labelStyle: CSSProperties = {
  fontSize: '12px',
  fontWeight: 800,
  color: 'var(--color-334155, #334155)',
  marginRight: '6px',
};

export const PlatformActionsBar: FC<PlatformActionsBarProps> = ({
  handleLoadContractIntoPreparationStudio,
  handleCreateCrmLandlordFromContract,
  handleCreateCrmTenantFromContract,
}) => {
  return (
    <div style={barContainerStyle}>
      <span style={labelStyle}>1-Click Platform Actions:</span>
      <ActionButton $primary onClick={handleLoadContractIntoPreparationStudio}>
        <FileCheck size={14} /> Load into Preparation Studio as Reusable Draft
      </ActionButton>
      <ActionButton onClick={handleCreateCrmLandlordFromContract}>
        <Building size={14} color="#EF4444" /> Create CRM Landlord Profile
      </ActionButton>
      <ActionButton onClick={handleCreateCrmTenantFromContract}>
        <UserCheck size={14} color="#2563EB" /> Create CRM Tenant Profile
      </ActionButton>
    </div>
  );
};
