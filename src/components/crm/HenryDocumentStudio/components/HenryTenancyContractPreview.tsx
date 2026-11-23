import React, { FC } from 'react';
import { PreviewCanvasCard } from '../styles/HenryDocumentStudio.style';
import {
  HenryTenancyContractPreviewProps,
  ContractPreviewHeader,
  CompletenessAlert,
  ExtractionCardGrid,
  AdditionalTermsPanel,
  PlatformActionsBar,
} from './tenancyContractPreview';

export * from './tenancyContractPreview';

export const HenryTenancyContractPreview: FC<HenryTenancyContractPreviewProps> = ({
  scannedContractData,
  isScanning,
  handleScanTenancyContract,
  handleLoadContractIntoPreparationStudio,
  handleCreateCrmLandlordFromContract,
  handleCreateCrmTenantFromContract,
  handleCopyContractJsonVariables,
}) => {
  return (
    <PreviewCanvasCard style={{ padding: '24px', overflowY: 'auto' }}>
      {/* Header */}
      <ContractPreviewHeader
        scannedContractData={scannedContractData}
        isScanning={isScanning}
        handleScanTenancyContract={handleScanTenancyContract}
        handleCopyContractJsonVariables={handleCopyContractJsonVariables}
      />

      {/* Field Completeness & Missing Fields Alert */}
      <CompletenessAlert scannedContractData={scannedContractData} />

      {/* Grouped Extraction Cards Grid */}
      <ExtractionCardGrid scannedContractData={scannedContractData} />

      {/* Group 5: Additional Terms / Addenda */}
      <AdditionalTermsPanel additionalTerms={scannedContractData.additionalTerms} />

      {/* 1-Click Platform Ingestion Actions Bar */}
      <PlatformActionsBar
        handleLoadContractIntoPreparationStudio={handleLoadContractIntoPreparationStudio}
        handleCreateCrmLandlordFromContract={handleCreateCrmLandlordFromContract}
        handleCreateCrmTenantFromContract={handleCreateCrmTenantFromContract}
      />
    </PreviewCanvasCard>
  );
};
