/**
 * HenryPassportScannerView.tsx
 *
 * 3.19.4 Scan Passport — Upgraded Split-Screen View.
 * Left Side:
 *   - Shared Document Upload Component (dropzone + file selector)
 *   - Form-Style Variables Extraction (Full Name, Passport Number, Country, Nationality, DOB, Expiry, MRZ TD3)
 * Right Side:
 *   - Uploaded Document Live Preview Pane (supports PDF, PNG, JPG, and Digital Passport View)
 * Bottom:
 *   - Persistent Action Controls (Discard, Copy JSON, Save to KYC Vault)
 */

import React, { FC } from 'react';
import HenrySharedDocumentUploader from './HenrySharedDocumentUploader';
import HenryCaseLinks from './HenryCaseLinks';
import type { DriveImport } from '../../../services/henryDrive';
import { ViewContainer, SplitGrid, LeftCol } from './passportScanner/styles';
import { usePassportScanner } from './passportScanner/usePassportScanner';
import { PassportVariablesForm } from './passportScanner/PassportVariablesForm';
import { PassportPreviewPane } from './passportScanner/PassportPreviewPane';
import { PassportActionBar } from './passportScanner/PassportActionBar';

export const HenryPassportScannerView: FC<{ importedSource?: DriveImport }> = ({
  importedSource,
}) => {
  const {
    extractedData,
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
    handleUpdateField,
    handleToggleExpiryAck,
    handleToggleReviewConfirmed,
    handleSaveToVault,
    handleAutoFillAsTenant,
    handleAutoFillAsLandlord,
    handleDiscard,
    handleCopyJson,
  } = usePassportScanner(importedSource);

  return (
    <ViewContainer>
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
            docType="passport"
            title="3.19.4 Scan International Passport (جواز السفر)"
            subtitle="Upload client passport bio-data image or PDF to extract passport number, country code, full legal name, and 2-line ICAO TD3 MRZ"
            onFileUpload={handleFileUpload}
            onSampleLoad={handleLoadDemo}
            isProcessing={isScanning}
            accentColor="#3B82F6"
          />

          {extractedData && (
            <PassportVariablesForm
              extractedData={extractedData}
              onUpdateField={handleUpdateField}
              onToggleExpiryAck={handleToggleExpiryAck}
              onToggleReviewConfirmed={handleToggleReviewConfirmed}
            />
          )}
        </LeftCol>

        <PassportPreviewPane
          uploadedFile={uploadedFile}
          filePreviewUrl={filePreviewUrl}
          extractedData={extractedData}
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
        />
      </SplitGrid>

      <PassportActionBar
        extractedData={extractedData}
        uploadedFile={uploadedFile}
        copiedJson={copiedJson}
        isSaving={isSaving}
        onDiscard={handleDiscard}
        onAutoFillAsTenant={handleAutoFillAsTenant}
        onAutoFillAsLandlord={handleAutoFillAsLandlord}
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

export default HenryPassportScannerView;
