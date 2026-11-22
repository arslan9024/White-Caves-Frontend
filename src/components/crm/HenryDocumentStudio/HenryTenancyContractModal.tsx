/**
 * HenryTenancyContractModal.tsx
 *
 * High-Fidelity Split-Pane Interactive Modal for preparing official Dubai Land Department (DLD)
 * Unified Tenancy Contracts with live 3-page bilingual preview and multi-OCR document ingestion.
 */

import React, { FC, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Save } from 'lucide-react';
import {
  useHenryTenancyContractModalLogic,
  UseHenryTenancyContractModalLogicProps,
} from './logic/HenryTenancyContractModal.logic';
import {
  ModalOverlay,
  ModalContainer,
  HeaderBtn,
  SplitPaneBody,
  RightFormPane,
  FormScrollArea,
  FormFooterActions,
} from './styles/HenryTenancyContractModal.style';
import type { TenancyDocType } from './tenancyModal/types';
import { TenancyModalHeader } from './tenancyModal/TenancyModalHeader';
import { TenancyPreviewPane } from './tenancyModal/TenancyPreviewPane';
import { TenancyStepperHeader } from './tenancyModal/TenancyStepperHeader';
import { Stage1PropertySpecs } from './tenancyModal/Stage1PropertySpecs';
import { Stage2LandlordKyc } from './tenancyModal/Stage2LandlordKyc';
import { Stage3TenantKyc } from './tenancyModal/Stage3TenantKyc';
import { Stage4Financials } from './tenancyModal/Stage4Financials';
import { Stage5SpecialTerms, Stage6ReviewExport } from './tenancyModal/Stage5And6ReviewExport';
import { ExitConfirmOverlay } from './tenancyModal/ExitConfirmOverlay';

export interface HenryTenancyContractModalProps extends UseHenryTenancyContractModalLogicProps {}

export const HenryTenancyContractModal: FC<HenryTenancyContractModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const {
    contractData,
    activeStep,
    setActiveStep,
    activePreviewPage,
    setActivePreviewPage,
    zoomLevel,
    isProcessingOcr,
    statusMessage,
    compiledPreviewHtml,
    handleFieldChange,
    handleUpdateAdditionalTerm,
    handleScanTitleDeed,
    handleScanTenantEmiratesId,
    handleScanTenantPassport,
    handleSetStandardOneYearDates,
    handleResetToBlank,
    handleLoadCameliaSample,
    handleLoadJanusiaSample,
    handleGenerateEsignLink,
    handleSaveAndArchive,
    handlePrint,
    handleZoomIn,
    handleZoomOut,
    handleFileUpload,
  } = useHenryTenancyContractModalLogic({ isOpen, onClose, initialData });

  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const masterFileInputRef = useRef<HTMLInputElement>(null);
  const deedFileInputRef = useRef<HTMLInputElement>(null);
  const landlordFileInputRef = useRef<HTMLInputElement>(null);
  const tenantEidFileInputRef = useRef<HTMLInputElement>(null);
  const tenantPassportFileInputRef = useRef<HTMLInputElement>(null);

  const onFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    docType: TenancyDocType = 'auto'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, docType);
      e.target.value = '';
    }
  };

  const handleConfirmClose = () => {
    setShowExitConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <input
          type="file"
          ref={masterFileInputRef}
          onChange={e => onFileSelect(e, 'contract')}
          accept=".pdf,image/*,.doc,.docx"
          style={{ display: 'none' }}
        />
        <input
          type="file"
          ref={deedFileInputRef}
          onChange={e => onFileSelect(e, 'title_deed')}
          accept=".pdf,image/*"
          style={{ display: 'none' }}
        />
        <input
          type="file"
          ref={landlordFileInputRef}
          onChange={e => onFileSelect(e, 'emirates_id_landlord')}
          accept=".pdf,image/*"
          style={{ display: 'none' }}
        />
        <input
          type="file"
          ref={tenantEidFileInputRef}
          onChange={e => onFileSelect(e, 'emirates_id_tenant')}
          accept=".pdf,image/*"
          style={{ display: 'none' }}
        />
        <input
          type="file"
          ref={tenantPassportFileInputRef}
          onChange={e => onFileSelect(e, 'passport_tenant')}
          accept=".pdf,image/*"
          style={{ display: 'none' }}
        />

        <ModalContainer
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          data-testid="henry-tenancy-modal"
        >
          <TenancyModalHeader
            statusMessage={statusMessage}
            onTriggerMasterUpload={() => masterFileInputRef.current?.click()}
            onResetToBlank={handleResetToBlank}
            onLoadCameliaSample={handleLoadCameliaSample}
            onLoadJanusiaSample={handleLoadJanusiaSample}
            onPrint={handlePrint}
            onAttemptClose={() => setShowExitConfirm(true)}
          />

          <SplitPaneBody>
            <TenancyPreviewPane
              activePreviewPage={activePreviewPage}
              onSelectPreviewPage={setActivePreviewPage}
              zoomLevel={zoomLevel}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              compiledPreviewHtml={compiledPreviewHtml}
            />

            <RightFormPane>
              <TenancyStepperHeader
                activeStep={activeStep}
                contractData={contractData}
                onSelectStep={setActiveStep}
              />

              <FormScrollArea>
                {activeStep === 1 && (
                  <Stage1PropertySpecs
                    contractData={contractData}
                    isProcessingOcr={isProcessingOcr}
                    onFieldChange={handleFieldChange}
                    onTriggerDeedUpload={() => deedFileInputRef.current?.click()}
                    onScanTitleDeed={handleScanTitleDeed}
                  />
                )}

                {activeStep === 2 && (
                  <Stage2LandlordKyc
                    contractData={contractData}
                    isProcessingOcr={isProcessingOcr}
                    onFieldChange={handleFieldChange}
                    onTriggerLandlordUpload={() => landlordFileInputRef.current?.click()}
                  />
                )}

                {activeStep === 3 && (
                  <Stage3TenantKyc
                    contractData={contractData}
                    isProcessingOcr={isProcessingOcr}
                    onFieldChange={handleFieldChange}
                    onTriggerTenantEidUpload={() => tenantEidFileInputRef.current?.click()}
                    onTriggerTenantPassportUpload={() =>
                      tenantPassportFileInputRef.current?.click()
                    }
                    onScanTenantEmiratesId={handleScanTenantEmiratesId}
                    onScanTenantPassport={handleScanTenantPassport}
                  />
                )}

                {activeStep === 4 && (
                  <Stage4Financials
                    contractData={contractData}
                    onFieldChange={handleFieldChange}
                    onSetStandardOneYearDates={handleSetStandardOneYearDates}
                  />
                )}

                {activeStep === 5 && (
                  <Stage5SpecialTerms
                    contractData={contractData}
                    onUpdateAdditionalTerm={handleUpdateAdditionalTerm}
                  />
                )}

                {activeStep === 6 && (
                  <Stage6ReviewExport
                    contractData={contractData}
                    onFieldChange={handleFieldChange}
                    onGenerateEsignLink={handleGenerateEsignLink}
                    onPrint={handlePrint}
                    onSaveAndArchive={handleSaveAndArchive}
                  />
                )}
              </FormScrollArea>

              <FormFooterActions>
                <div>
                  {activeStep > 1 && (
                    <HeaderBtn $variant="secondary" onClick={() => setActiveStep(prev => prev - 1)}>
                      ← Previous Stage
                    </HeaderBtn>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {activeStep < 6 ? (
                    <HeaderBtn $variant="primary" onClick={() => setActiveStep(prev => prev + 1)}>
                      Next Stage →
                    </HeaderBtn>
                  ) : (
                    <HeaderBtn $variant="primary" onClick={handleSaveAndArchive}>
                      <Save size={14} /> Complete & Save Contract
                    </HeaderBtn>
                  )}
                </div>
              </FormFooterActions>
            </RightFormPane>
          </SplitPaneBody>
        </ModalContainer>

        {showExitConfirm && (
          <ExitConfirmOverlay
            onContinueEditing={() => setShowExitConfirm(false)}
            onConfirmClose={handleConfirmClose}
          />
        )}
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default HenryTenancyContractModal;
