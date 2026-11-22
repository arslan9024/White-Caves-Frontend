import React, { FC } from 'react';
import { Building, Trash2, Save, FileText, Copy, Check } from 'lucide-react';
import { BottomActionBar, ActionBtn } from './TitleDeedScanner.styles';

interface TitleDeedActionBarProps {
  canUseActions: boolean;
  copiedJson: boolean;
  onDiscard: () => void;
  onAutoFillTenancy: () => void;
  onCreateCrmListing: () => void;
  onCopyJson: () => void;
  onSaveToVault: () => void;
}

export const TitleDeedActionBar: FC<TitleDeedActionBarProps> = ({
  canUseActions,
  copiedJson,
  onDiscard,
  onAutoFillTenancy,
  onCreateCrmListing,
  onCopyJson,
  onSaveToVault,
}) => {
  return (
    <BottomActionBar>
      <div>
        <ActionBtn $variant="danger" onClick={onDiscard}>
          <Trash2 size={13} /> Discard & Clear
        </ActionBtn>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <ActionBtn $variant="secondary" onClick={onAutoFillTenancy} disabled={!canUseActions}>
          <FileText size={13} color="#10B981" /> Auto-Fill Tenancy Lease
        </ActionBtn>
        <ActionBtn $variant="secondary" onClick={onCreateCrmListing} disabled={!canUseActions}>
          <Building size={13} color="#38BDF8" /> Create CRM Listing
        </ActionBtn>
        <ActionBtn $variant="secondary" onClick={onCopyJson} disabled={!canUseActions}>
          {copiedJson ? <Check size={13} color="#10B981" /> : <Copy size={13} />} Copy Variables
          JSON
        </ActionBtn>
        <ActionBtn $variant="primary" onClick={onSaveToVault} disabled={!canUseActions}>
          <Save size={13} /> Save to Property Vault
        </ActionBtn>
      </div>
    </BottomActionBar>
  );
};
