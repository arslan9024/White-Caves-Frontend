/**
 * HenryTenancyContractJourneyView.tsx
 *
 * 3.19.1 Prepare Tenancy Contract — Main Content Area Journey View.
 * Left: Multi-stage guided workflow (Title Deed & Landlord Passport -> Tenant KYC -> Contract Terms -> Save/Discard)
 * Right: Live Exact Full-Color Dubai Land Department (DLD) Official Contract PDF Preview.
 */

import React, { type FC } from 'react';
import { Building, CreditCard, FileText, UserCheck } from 'lucide-react';
import henryTenancyContractTemplateService from '../../../services/HenryTenancyContractTemplateService';
import henryTitleDeedScannerService from '../../../services/HenryTitleDeedScannerService';
import henryEmiratesIdScannerService from '../../../services/HenryEmiratesIdScannerService';
import henryPassportScannerService from '../../../services/HenryPassportScannerService';
import {
  LeftJourneyCol,
  SplitLayout,
  StepBtn,
  StepperNav,
  ViewContainer,
} from './tenancyJourney/TenancyJourney.styles';
import { useHenryTenancyJourney } from './tenancyJourney/useHenryTenancyJourney';
import { Stage1PropertyLandlord } from './tenancyJourney/Stage1PropertyLandlord';
import { Stage2TenantKyc } from './tenancyJourney/Stage2TenantKyc';
import { Stage3TermsForm, Stage4SignaturesForm } from './tenancyJourney/Stage3TermsAndStage4Sign';
import { DldContractPreviewPane } from './tenancyJourney/DldContractPreviewPane';

export const HenryTenancyContractJourneyView: FC = () => {
  const j = useHenryTenancyJourney();

  return (
    <ViewContainer>
      {j.statusMsg && (
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
          ⚡ {j.statusMsg}
        </div>
      )}

      <StepperNav>
        <StepBtn
          $active={j.activeStage === 1}
          $completed={Boolean(j.contractData.propertyNo && j.contractData.ownerName)}
          onClick={() => j.setActiveStage(1)}
        >
          <Building size={14} /> 1. Title Deed & Landlord KYC
        </StepBtn>
        <StepBtn
          $active={j.activeStage === 2}
          $completed={Boolean(j.contractData.tenantName)}
          onClick={() => j.setActiveStage(2)}
        >
          <UserCheck size={14} /> 2. Tenant KYC & Documents
        </StepBtn>
        <StepBtn
          $active={j.activeStage === 3}
          $completed={Boolean(j.contractData.annualRent > 0)}
          onClick={() => j.setActiveStage(3)}
        >
          <CreditCard size={14} /> 3. Contract Terms & Financials
        </StepBtn>
        <StepBtn
          $active={j.activeStage === 4}
          $completed={Boolean(j.contractData.tenantSignature)}
          onClick={() => j.setActiveStage(4)}
        >
          <FileText size={14} /> 4. Signatures & Final Actions
        </StepBtn>
      </StepperNav>

      <SplitLayout>
        <LeftJourneyCol>
          {j.activeStage === 1 && (
            <Stage1PropertyLandlord
              contractData={j.contractData}
              cachedTitleDeed={j.cachedTitleDeed}
              cachedPassport={j.cachedPassport}
              isProcessing={j.isProcessing}
              onIngestCachedTitleDeed={() => {
                if (!j.cachedTitleDeed) return;
                j.applyDraft(prev =>
                  henryTenancyContractTemplateService.populateFromTitleDeed(
                    prev,
                    j.cachedTitleDeed!
                  )
                );
                j.flashStatus('✓ Auto-filled Property & Owner from Active Title Deed cache!');
              }}
              onIngestCachedLandlordPassport={() => {
                if (!j.cachedPassport) return;
                j.applyDraft(prev =>
                  henryTenancyContractTemplateService.populateFromPassport(
                    prev,
                    j.cachedPassport!,
                    'landlord'
                  )
                );
                j.flashStatus('✓ Auto-filled Landlord from Active Passport cache!');
              }}
              onUploadTitleDeed={j.handleUploadTitleDeed}
              onUploadLandlordPassport={j.handleUploadLandlordPassport}
              onSampleTitleDeed={() => {
                const demo = henryTitleDeedScannerService.getDemoExtractedData();
                j.applyDraft(prev =>
                  henryTenancyContractTemplateService.populateFromTitleDeed(prev, demo)
                );
              }}
              onSampleLandlordPassport={() => {
                const demo = henryPassportScannerService.getDemoExtractedData();
                j.applyDraft(prev =>
                  henryTenancyContractTemplateService.populateFromPassport(prev, demo, 'landlord')
                );
              }}
              updateField={j.updateField}
              onDiscardDraft={j.handleDiscardDraft}
              onNextStage={() => j.setActiveStage(2)}
            />
          )}

          {j.activeStage === 2 && (
            <Stage2TenantKyc
              contractData={j.contractData}
              cachedTenantEid={j.cachedTenantEid}
              cachedPassport={j.cachedPassport}
              isProcessing={j.isProcessing}
              onIngestCachedTenantEid={() => {
                if (!j.cachedTenantEid) return;
                j.applyDraft(prev =>
                  henryTenancyContractTemplateService.populateFromEmiratesId(
                    prev,
                    j.cachedTenantEid!,
                    'tenant'
                  )
                );
                j.flashStatus('✓ Auto-filled Tenant from Active Emirates ID cache!');
              }}
              onIngestCachedTenantPassport={() => {
                if (!j.cachedPassport) return;
                j.applyDraft(prev =>
                  henryTenancyContractTemplateService.populateFromPassport(
                    prev,
                    j.cachedPassport!,
                    'tenant'
                  )
                );
                j.flashStatus('✓ Auto-filled Tenant from Active Passport cache!');
              }}
              onUploadTenantEid={j.handleUploadTenantEid}
              onUploadTenantPassport={j.handleUploadTenantPassport}
              onSampleTenantEid={() => {
                const demo = henryEmiratesIdScannerService.getDemoExtractedData();
                j.applyDraft(prev =>
                  henryTenancyContractTemplateService.populateFromEmiratesId(prev, demo, 'tenant')
                );
              }}
              onSampleTenantPassport={() => {
                const demo = henryPassportScannerService.getDemoExtractedData();
                j.applyDraft(prev =>
                  henryTenancyContractTemplateService.populateFromPassport(prev, demo, 'tenant')
                );
              }}
              updateField={j.updateField}
              onBack={() => j.setActiveStage(1)}
              onNext={() => j.setActiveStage(3)}
            />
          )}

          {j.activeStage === 3 && (
            <Stage3TermsForm
              contractData={j.contractData}
              updateField={j.updateField}
              onUpdateAdditionalTerm={j.handleUpdateAdditionalTerm}
              onStatusMessage={msg => j.flashStatus(msg)}
              onBack={() => j.setActiveStage(2)}
              onNext={() => j.setActiveStage(4)}
            />
          )}

          {j.activeStage === 4 && (
            <Stage4SignaturesForm
              contractData={j.contractData}
              updateField={j.updateField}
              onPrintPdf={j.handlePrintPdf}
              onSaveForSession={j.handleSaveForSession}
              onDiscardDraft={j.handleDiscardDraft}
              onBack={() => j.setActiveStage(3)}
            />
          )}
        </LeftJourneyCol>

        <DldContractPreviewPane
          previewPage={j.previewPage}
          setPreviewPage={j.setPreviewPage}
          zoomLevel={j.zoomLevel}
          onZoomOut={() => j.setZoomLevel(prev => Math.max(prev - 0.1, 0.5))}
          onZoomIn={() => j.setZoomLevel(prev => Math.min(prev + 0.1, 1.2))}
          compiledPdfHtml={j.compiledPdfHtml}
        />
      </SplitLayout>
    </ViewContainer>
  );
};

export default HenryTenancyContractJourneyView;
