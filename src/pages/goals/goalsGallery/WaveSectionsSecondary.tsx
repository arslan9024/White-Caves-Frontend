import React, { FC, Suspense } from 'react';
import { ComponentGrid, Skeleton, WaveSection, WaveTitle } from './goalsGalleryStyles';
import {
  AccessCardApprovalWorkflow,
  AmenityBookingCalendar,
  BroadcastCampaignSegmenter,
  BulkUnitReservationLock,
  ChatSentimentAnalyzer,
  CommissionAcceleratorEngine,
  ConstructionProgressStream,
  DeveloperDamPortal,
  EmergencyHotlineRouter,
  EoiDepositGateway,
  FitOutCostEstimator,
  HvacInspectionCalendar,
  InstitutionalTeaserDeckBuilder,
  JvEquityIrrDistributionModel,
  LandFeasibilityStudyGenerator,
  LeadQualificationTagger,
  MasterplanInteractiveMap,
  OffPlanAssignmentCalculator,
  OffPlanSalesLeaderboard,
  PaymentPlanTimelineVisualizer,
  PropertyConditionReportGenerator,
  RbacPermissionMatrixEditor,
  ReraCommercialRentIndexCalculator,
  SnaggingChecklistAnnotator,
  SystemHealthDashboard,
  TenancyStackPlanVisualizer,
  TenantCreditRiskRating,
  UtilityTransferWizard,
  VendorRatingMatrix,
  WarehousePowerLoadChecker,
  WhatsAppTelemetrySocket,
} from './waveLazySecondary';

interface WaveSectionsSecondaryProps {
  showWave: (wave: string) => boolean;
}

const SuspenseFallback: FC = () => <Skeleton />;

export const WaveSectionsSecondary: FC<WaveSectionsSecondaryProps> = ({ showWave }) => (
  <>
    {showWave('Wave 51 — CRM & Comms') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 51 — WhatsApp Automation & AI Communications</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <BroadcastCampaignSegmenter />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <ChatSentimentAnalyzer />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <LeadQualificationTagger />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <WhatsAppTelemetrySocket />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}

    {showWave('Wave 52 — Facilities IoT') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 52 — Smart Building IoT & Asset Management</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <HvacInspectionCalendar />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <SnaggingChecklistAnnotator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <UtilityTransferWizard />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <AccessCardApprovalWorkflow />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <AmenityBookingCalendar />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <EmergencyHotlineRouter />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <PropertyConditionReportGenerator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <VendorRatingMatrix />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}

    {showWave('Wave 53 — Off-Plan Engine') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 53 — Developer Off-Plan Launch & Sales Engine</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <PaymentPlanTimelineVisualizer />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <CommissionAcceleratorEngine />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <BulkUnitReservationLock />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <OffPlanAssignmentCalculator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <MasterplanInteractiveMap />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <EoiDepositGateway />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <OffPlanSalesLeaderboard />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <ConstructionProgressStream />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <DeveloperDamPortal />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}

    {showWave('Wave 54 — Commercial Suite') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 54 — Commercial Real Estate & Advisory Suite</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <FitOutCostEstimator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <TenantCreditRiskRating />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <WarehousePowerLoadChecker />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <TenancyStackPlanVisualizer />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <ReraCommercialRentIndexCalculator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <LandFeasibilityStudyGenerator />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <JvEquityIrrDistributionModel />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <InstitutionalTeaserDeckBuilder />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}

    {showWave('Wave 55 — Enterprise Security') && (
      <WaveSection>
        <WaveTitle>🌊 Wave 55 — Enterprise Security & System Telemetry</WaveTitle>
        <ComponentGrid>
          <Suspense fallback={<SuspenseFallback />}>
            <RbacPermissionMatrixEditor />
          </Suspense>
          <Suspense fallback={<SuspenseFallback />}>
            <SystemHealthDashboard />
          </Suspense>
        </ComponentGrid>
      </WaveSection>
    )}
  </>
);
