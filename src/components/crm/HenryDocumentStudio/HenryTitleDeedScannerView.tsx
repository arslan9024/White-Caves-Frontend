/**
 * HenryTitleDeedScannerView.tsx
 *
 * 3.19.3 Scan Title Deed — Upgraded Split-Screen View.
 * Left Side:
 *   - Shared Document Upload Component (dropzone + file selector)
 *   - Form-Style Variables Extraction (Building, Property No, Plot, Area, Makani, DEWA, Owner, Purchase Price)
 * Right Side:
 *   - Uploaded Document Live Preview Pane (supports PDF, PNG, JPG, and Unverified OCR Review)
 * Bottom:
 *   - Persistent Action Controls (Discard, Copy JSON, Save to Property Vault)
 */

import React, { FC } from 'react';
import { HenryExtractionEvidence } from './HenryExtractionEvidence';
import HenryVaultControls from './HenryVaultControls';
import HenrySharedDocumentUploader from './HenrySharedDocumentUploader';
import type { DriveImport } from '../../../services/henryDrive';
import { ViewContainer, SplitGrid, LeftCol } from './titleDeedScanner/TitleDeedScanner.styles';
import { useTitleDeedScannerState } from './titleDeedScanner/useTitleDeedScannerState';
import { TitleDeedPresetBar } from './titleDeedScanner/TitleDeedPresetBar';
import { TitleDeedExtractedForm } from './titleDeedScanner/TitleDeedExtractedForm';
import { TitleDeedPreviewPane } from './titleDeedScanner/TitleDeedPreviewPane';
import { TitleDeedActionBar } from './titleDeedScanner/TitleDeedActionBar';

export const HenryTitleDeedScannerView: FC<{ importedSource?: DriveImport }> = ({
  importedSource,
}) => {
  const {
    uploaderReset,
    archiveReset,
    scannerValues,
    extractedData,
    uploadedFile,
    filePreviewUrl,
    isScanning,
    zoomLevel,
    statusMsg,
    copiedJson,
    vaultOptions,
    readiness,
    canConfirmReview,
    canUseActions,
    setVaultOptions,
    handleFileUpload,
    handleLoadDemo,
    handleLoadPreset,
    handleUpdateField,
    handleVaultSuggestion,
    handleReviewConfirmChange,
    handleSaveToVault,
    handleAutoFillTenancy,
    handleCreateCrmListing,
    handleDiscard,
    handleCopyJson,
    zoomOut,
    zoomIn,
  } = useTitleDeedScannerState(importedSource);

  return (
    <ViewContainer>
      <p role="note">
        OCR is not proof of authenticity or ownership. Compare every field to the original before
        saving or autofill. Missing or uncertain values: rescan without glare, then correct below.
      </p>
      {extractedData?.demoOnly && <p role="alert">Demo only — saving and autofill disabled.</p>}
      {!!extractedData?.missingFields?.length && (
        <p role="alert">
          Missing: {extractedData.missingFields.join(', ')}. Correct these fields or rescan.
        </p>
      )}
      <HenryExtractionEvidence
        diagnostics={extractedData?.diagnostics}
        scannerValues={scannerValues}
      />
      <p role="status">
        Readiness: {readiness.status.replaceAll('_', ' ')}. {readiness.reasons.join(' ')}
      </p>
      <HenryVaultControls
        key={archiveReset}
        docType="title_deed"
        options={vaultOptions}
        onOptions={setVaultOptions}
        onSuggestion={handleVaultSuggestion}
      />
      <label>
        <input
          type="checkbox"
          aria-label="Confirm document review"
          checked={!!extractedData?.reviewConfirmed}
          disabled={!canConfirmReview}
          onChange={event => handleReviewConfirmChange(event.target.checked)}
        />
        I compared the fields to the original and confirm use for saving and autofill.
      </label>

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
        <LeftCol>
          <HenrySharedDocumentUploader
            resetSignal={uploaderReset}
            docType="title_deed"
            title="3.19.3 Scan Title Deed / Oqood (شهادة ملكية)"
            subtitle="Upload Title Deed PDF or image for source-reviewed field candidates, not DLD registration or ownership verification"
            onFileUpload={handleFileUpload}
            onSampleLoad={handleLoadDemo}
            isProcessing={isScanning}
            accentColor="#EF4444"
          />

          <TitleDeedPresetBar onSelectPreset={handleLoadPreset} />

          {extractedData && (
            <TitleDeedExtractedForm
              extractedData={extractedData}
              onUpdateField={handleUpdateField}
            />
          )}
        </LeftCol>

        <TitleDeedPreviewPane
          uploadedFile={uploadedFile}
          filePreviewUrl={filePreviewUrl}
          extractedData={extractedData}
          zoomLevel={zoomLevel}
          onZoomOut={zoomOut}
          onZoomIn={zoomIn}
        />
      </SplitGrid>

      <TitleDeedActionBar
        canUseActions={canUseActions}
        copiedJson={copiedJson}
        onDiscard={handleDiscard}
        onAutoFillTenancy={handleAutoFillTenancy}
        onCreateCrmListing={handleCreateCrmListing}
        onCopyJson={handleCopyJson}
        onSaveToVault={handleSaveToVault}
      />
    </ViewContainer>
  );
};

export default HenryTitleDeedScannerView;
