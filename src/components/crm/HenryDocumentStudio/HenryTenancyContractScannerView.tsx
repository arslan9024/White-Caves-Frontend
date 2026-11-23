/**
 * HenryTenancyContractScannerView.tsx
 *
 * 3.19.5 Scan Tenancy Contract — Upgraded Split-Screen View.
 * Left Side:
 *   - Shared Document Upload Component (dropzone + file selector)
 *   - Form-Style Variables Extraction (Building, Unit, Landlord Name/Phone, Tenant Name/EID, Annual Rent, Mode of Payment, Dates)
 * Right Side:
 *   - Uploaded Document Live Preview Pane (supports PDF, PNG, JPG, or Live DLD Template Overlay)
 * Bottom:
 *   - Persistent Action Controls (Discard, Copy JSON, Save to Henry Vault)
 *
 * Decomposed under AEG-042 (< 300 lines). Sub-modules located in ./contractScanner/
 */

import React, { FC } from 'react';
import HenrySharedDocumentUploader from './HenrySharedDocumentUploader';
import HenryCaseLinks from './HenryCaseLinks';
import type { DriveImport } from '../../../services/henryDrive';
import {
  ViewContainer,
  SplitGrid,
  LeftCol,
  useContractScannerState,
  ContractExtractedForm,
  ContractPreviewPane,
  ContractActionBar,
} from './contractScanner';

// Re-export subcomponents, hooks, and styles for backwards compatibility
export * from './contractScanner';

export const HenryTenancyContractScannerView: FC<{ importedSource?: DriveImport }> = ({
  importedSource,
}) => {
  const {
    scannedResult,
    setScannedResult,
    contractData,
    uploadedFile,
    filePreviewUrl,
    isScanning,
    zoomLevel,
    setZoomLevel,
    statusMsg,
    copiedJson,
    isSaving,
    vaultOptions,
    setVaultOptions,
    handleFileUpload,
    handleLoadDemo,
    handleScanCorrection,
    handleUpdateDldField,
    handleLoadToJourney,
    handleSaveToVault,
    handleDiscard,
    handleCopyJson,
  } = useContractScannerState(importedSource);

  return (
    <ViewContainer>
      {/* Status Feedback Banner */}
      {statusMsg && (
        <div
          style={{
            background: 'var(--color-0f172a, #0F172A)',
            color: 'var(--color-38bdf8, #38BDF8)',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 700,
          }}
        >
          ⚡ {statusMsg}
        </div>
      )}

      <SplitGrid>
        {/* ══════════ LEFT COLUMN: UPLOADER & FORM-STYLE EXTRACTION ══════════ */}
        <LeftCol>
          <HenrySharedDocumentUploader
            docType="contract"
            title="3.19.5 Scan & Extract Tenancy Agreement (عقد إيجار)"
            subtitle="Upload full Tenancy Agreement PDF or scanned document to extract all 4 DLD contract domains"
            onFileUpload={handleFileUpload}
            onSampleLoad={handleLoadDemo}
            isProcessing={isScanning}
            accentColor="#DC2626"
          />

          {contractData && (
            <ContractExtractedForm
              contractData={contractData}
              scannedResult={scannedResult}
              onUpdateField={handleUpdateDldField}
              onCorrection={handleScanCorrection}
              onScannedResultChange={setScannedResult}
            />
          )}
        </LeftCol>

        {/* ══════════ RIGHT COLUMN: DOCUMENT PREVIEW PANE ══════════ */}
        <ContractPreviewPane
          uploadedFile={uploadedFile}
          filePreviewUrl={filePreviewUrl}
          contractData={contractData}
          zoomLevel={zoomLevel}
          onZoomIn={() => setZoomLevel(prev => Math.min(180, prev + 15))}
          onZoomOut={() => setZoomLevel(prev => Math.max(70, prev - 15))}
        />
      </SplitGrid>

      {/* ══════════ BOTTOM PERSISTENT ACTION CONTROLS ══════════ */}
      <ContractActionBar
        contractData={contractData}
        scannedResult={scannedResult}
        uploadedFile={uploadedFile}
        copiedJson={copiedJson}
        isSaving={isSaving}
        onDiscard={handleDiscard}
        onLoadToJourney={handleLoadToJourney}
        onCopyJson={handleCopyJson}
        onSaveToVault={handleSaveToVault}
      />

      <HenryCaseLinks
        key={filePreviewUrl || 'empty'}
        options={vaultOptions}
        onOptions={setVaultOptions}
      />
    </ViewContainer>
  );
};

export default HenryTenancyContractScannerView;
