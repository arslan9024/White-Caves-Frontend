import React, { FC } from 'react';
import { User, Trash2, Save, Copy, Check } from 'lucide-react';
import type { InternationalPassportExtractedData } from '../../../../services/HenryPassportScannerService';
import { canUseScan } from '../../../../services/henryScanReview';
import { BottomActionBar, ActionBtn } from './styles';

interface PassportActionBarProps {
  extractedData: InternationalPassportExtractedData | null;
  uploadedFile: File | null;
  copiedJson: boolean;
  isSaving: boolean;
  onDiscard: () => void;
  onAutoFillAsTenant: () => void;
  onAutoFillAsLandlord: () => void;
  onCopyJson: () => void;
  onSaveToVault: () => void;
}

export const PassportActionBar: FC<PassportActionBarProps> = ({
  extractedData,
  uploadedFile,
  copiedJson,
  isSaving,
  onDiscard,
  onAutoFillAsTenant,
  onAutoFillAsLandlord,
  onCopyJson,
  onSaveToVault,
}) => (
  <BottomActionBar>
    <div>
      <ActionBtn $variant="danger" onClick={onDiscard} disabled={!extractedData && !uploadedFile}>
        <Trash2 size={13} /> Discard & Clear
      </ActionBtn>
    </div>

    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <ActionBtn
        $variant="secondary"
        onClick={onAutoFillAsTenant}
        disabled={!canUseScan(extractedData)}
      >
        <User size={13} color="#10B981" /> Auto-Fill Tenancy (as Tenant)
      </ActionBtn>
      <ActionBtn
        $variant="secondary"
        onClick={onAutoFillAsLandlord}
        disabled={!canUseScan(extractedData)}
      >
        <User size={13} color="#38BDF8" /> Auto-Fill Tenancy (as Landlord)
      </ActionBtn>
      <ActionBtn $variant="secondary" onClick={onCopyJson} disabled={!extractedData}>
        {copiedJson ? <Check size={13} color="#10B981" /> : <Copy size={13} />} Copy Variables JSON
      </ActionBtn>
      <ActionBtn
        $variant="primary"
        onClick={onSaveToVault}
        disabled={!canUseScan(extractedData) || !uploadedFile || isSaving}
      >
        <Save size={13} /> Save to KYC Vault
      </ActionBtn>
    </div>
  </BottomActionBar>
);
