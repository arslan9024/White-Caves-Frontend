import React, { FC } from 'react';
import { Trash2, FileText, Copy, Check, Save } from 'lucide-react';
import { BottomActionBar, ActionBtn } from './ContractScanner.styles';
import { DldScannedContractResult } from '../../../../services/HenryTenancyContractScannerService';
import { DldTenancyContractData } from '../../../../services/HenryTenancyContractTemplateService';
import { canUseScan } from '../../../../services/henryScanReview';

export interface ContractActionBarProps {
  contractData: DldTenancyContractData | null;
  scannedResult: DldScannedContractResult | null;
  uploadedFile: File | null;
  copiedJson: boolean;
  isSaving: boolean;
  onDiscard: () => void;
  onLoadToJourney: () => void;
  onCopyJson: () => void;
  onSaveToVault: () => void;
}

export const ContractActionBar: FC<ContractActionBarProps> = ({
  contractData,
  scannedResult,
  uploadedFile,
  copiedJson,
  isSaving,
  onDiscard,
  onLoadToJourney,
  onCopyJson,
  onSaveToVault,
}) => {
  return (
    <BottomActionBar>
      <div>
        <ActionBtn $variant="danger" onClick={onDiscard} disabled={!contractData && !uploadedFile}>
          <Trash2 size={13} /> Discard & Clear
        </ActionBtn>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <ActionBtn
          $variant="secondary"
          onClick={onLoadToJourney}
          disabled={!canUseScan(scannedResult)}
        >
          <FileText size={13} color="#10B981" /> Load into 3.19.1 Preparation Studio
        </ActionBtn>
        <ActionBtn $variant="secondary" onClick={onCopyJson} disabled={!contractData}>
          {copiedJson ? <Check size={13} color="#10B981" /> : <Copy size={13} />} Copy Variables
          JSON
        </ActionBtn>
        <ActionBtn
          $variant="primary"
          onClick={onSaveToVault}
          disabled={
            !canUseScan(scannedResult) ||
            !scannedResult?.contractReference ||
            !uploadedFile ||
            isSaving
          }
        >
          <Save size={13} /> Save to encrypted vault
        </ActionBtn>
      </div>
    </BottomActionBar>
  );
};
