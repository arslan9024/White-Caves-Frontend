import React, { FC, Suspense } from 'react';
import { ComponentGrid, Skeleton, WaveSection, WaveTitle } from './goalsGalleryStyles';
import {
  AmlPepScreeningFilter,
  ArRoomMeasurer,
  AuditTrailExporter,
  BouncedChequeWorkflow,
  ChauffeurViewingCoordinator,
  CryptoPaymentSimulator,
  DeveloperNocTracker,
  DldRegressionModeler,
  FamilyOfficeAssetAllocationChart,
  FinancialPandLDashboard,
  Floorplan3DModeler,
  Form12MailTracker,
  FormBSignatureStream,
  FormFClauseGenerator,
  GoldenVisaEligibilityWidget,
  LandlordPayoutBatchDispatch,
  LiquidityIndexBadge,
  MetroProximityMultiplier,
  MortgageStressTestSimulator,
  MultiCurrencyEscrowVault,
  NdaDigitalSigningModal,
  OffMarketLeadRouter,
  OffPlanRiskCalculator,
  PannellumVRViewer,
  PdcDepositReminderCalendar,
  PoaValidationPortal,
  PortfolioDeckGenerator,
  PricePerSqftSparkline,
  ProgressiveImageLoader,
  RoiDualSliderAppraiser,
  SecurityDepositRefundLedger,
  ShortVsLongTermYieldComparator,
  SpatialAudioGuide,
  TrakheesiQrScanner,
  TrusteeOfficeScheduler,
  UaeddsRentMandate,
  UhnwPrivateVault,
  VatInvoiceGenerator,
  VipResponseSlaTracker,
  VirtualStagingCanvas,
  VrThumbnailBar,
  WebXRHeadsetViewer,
} from './waveLazyPrimary';

interface WaveSectionsPrimaryProps {
  showWave: (wave: string) => boolean;
}

const SuspenseFallback: FC = () => <Skeleton />;

export const WaveSectionsPrimary: FC<WaveSectionsPrimaryProps> = ({ showWave }) => (
  <>
    {showWave('Wave 46 — VR/Media') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 46 — AI Virtual Staging & Pannellum 360° VR Tours</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <PannellumVRViewer />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <VirtualStagingCanvas />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <WebXRHeadsetViewer />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <Floorplan3DModeler />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <SpatialAudioGuide />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <ArRoomMeasurer />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <ProgressiveImageLoader />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <VrThumbnailBar />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}

    {showWave('Wave 47 — Analytics') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 47 — Predictive Real Estate ROI & AI Valuation Engine</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <DldRegressionModeler />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <OffPlanRiskCalculator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <RoiDualSliderAppraiser />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <PricePerSqftSparkline />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <LiquidityIndexBadge />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <ShortVsLongTermYieldComparator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <MetroProximityMultiplier />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <MortgageStressTestSimulator />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}

    {showWave('Wave 48 — Conveyancing') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 48 — RERA Legal Conveyancing & Form Contracts</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <FormBSignatureStream />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <FormFClauseGenerator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <TrakheesiQrScanner />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <Form12MailTracker />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <AmlPepScreeningFilter />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <TrusteeOfficeScheduler />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <DeveloperNocTracker />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <PoaValidationPortal />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}

    {showWave('Wave 49 — VIP Concierge') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 49 — VIP Ultra-High-Net-Worth Concierge Engine</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <UhnwPrivateVault />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <ChauffeurViewingCoordinator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <MultiCurrencyEscrowVault />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <GoldenVisaEligibilityWidget />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <CryptoPaymentSimulator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <NdaDigitalSigningModal />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <PortfolioDeckGenerator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <VipResponseSlaTracker />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <OffMarketLeadRouter />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <FamilyOfficeAssetAllocationChart />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}

    {showWave('Wave 50 — Finance & PDC') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 50 — Smart PDC Cheque Vault & Rental Ledger Engine</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <PdcDepositReminderCalendar />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <VatInvoiceGenerator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <BouncedChequeWorkflow />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <UaeddsRentMandate />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <SecurityDepositRefundLedger />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <LandlordPayoutBatchDispatch />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <FinancialPandLDashboard />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <AuditTrailExporter />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}
  </>
);
