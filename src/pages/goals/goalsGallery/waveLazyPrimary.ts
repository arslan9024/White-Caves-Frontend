import { lazy } from 'react';

// Wave 46: VR & Media
export const PannellumVRViewer = lazy(
  () => import('../../../components/media/PannellumVRViewer/PannellumVRViewer')
);
export const VirtualStagingCanvas = lazy(
  () => import('../../../components/media/VirtualStagingCanvas/VirtualStagingCanvas')
);
export const WebXRHeadsetViewer = lazy(
  () => import('../../../components/media/WebXRHeadsetViewer/WebXRHeadsetViewer')
);
export const Floorplan3DModeler = lazy(
  () => import('../../../components/media/Floorplan3DModeler/Floorplan3DModeler')
);
export const SpatialAudioGuide = lazy(
  () => import('../../../components/media/SpatialAudioGuide/SpatialAudioGuide')
);
export const ProgressiveImageLoader = lazy(
  () => import('../../../components/media/ProgressiveImageLoader/ProgressiveImageLoader')
);
export const ArRoomMeasurer = lazy(
  () => import('../../../components/media/ArRoomMeasurer/ArRoomMeasurer')
);
export const VrThumbnailBar = lazy(
  () => import('../../../components/media/VrThumbnailBar/VrThumbnailBar')
);

// Wave 47: Analytics & Valuation
export const DldRegressionModeler = lazy(
  () => import('../../../components/analytics/DldRegressionModeler/DldRegressionModeler')
);
export const OffPlanRiskCalculator = lazy(
  () => import('../../../components/analytics/OffPlanRiskCalculator/OffPlanRiskCalculator')
);
export const RoiDualSliderAppraiser = lazy(
  () => import('../../../components/analytics/RoiDualSliderAppraiser/RoiDualSliderAppraiser')
);
export const PricePerSqftSparkline = lazy(
  () => import('../../../components/analytics/PricePerSqftSparkline/PricePerSqftSparkline')
);
export const LiquidityIndexBadge = lazy(
  () => import('../../../components/analytics/LiquidityIndexBadge/LiquidityIndexBadge')
);
export const ShortVsLongTermYieldComparator = lazy(
  () =>
    import('../../../components/analytics/ShortVsLongTermYieldComparator/ShortVsLongTermYieldComparator')
);
export const MetroProximityMultiplier = lazy(
  () => import('../../../components/analytics/MetroProximityMultiplier/MetroProximityMultiplier')
);
export const MortgageStressTestSimulator = lazy(
  () =>
    import('../../../components/analytics/MortgageStressTestSimulator/MortgageStressTestSimulator')
);

// Wave 48: Legal & Conveyancing
export const FormBSignatureStream = lazy(
  () => import('../../../components/compliance/FormBSignatureStream/FormBSignatureStream')
);
export const FormFClauseGenerator = lazy(
  () => import('../../../components/compliance/FormFClauseGenerator/FormFClauseGenerator')
);
export const TrakheesiQrScanner = lazy(
  () => import('../../../components/compliance/TrakheesiQrScanner/TrakheesiQrScanner')
);
export const Form12MailTracker = lazy(
  () => import('../../../components/compliance/Form12MailTracker/Form12MailTracker')
);
export const AmlPepScreeningFilter = lazy(
  () => import('../../../components/compliance/AmlPepScreeningFilter/AmlPepScreeningFilter')
);
export const TrusteeOfficeScheduler = lazy(
  () => import('../../../components/compliance/TrusteeOfficeScheduler/TrusteeOfficeScheduler')
);
export const DeveloperNocTracker = lazy(
  () => import('../../../components/compliance/DeveloperNocTracker/DeveloperNocTracker')
);
export const PoaValidationPortal = lazy(
  () => import('../../../components/compliance/PoaValidationPortal/PoaValidationPortal')
);

// Wave 49: VIP & UHNW Concierge
export const UhnwPrivateVault = lazy(
  () => import('../../../components/vip/UhnwPrivateVault/UhnwPrivateVault')
);
export const ChauffeurViewingCoordinator = lazy(
  () => import('../../../components/vip/ChauffeurViewingCoordinator/ChauffeurViewingCoordinator')
);
export const MultiCurrencyEscrowVault = lazy(
  () => import('../../../components/vip/MultiCurrencyEscrowVault/MultiCurrencyEscrowVault')
);
export const GoldenVisaEligibilityWidget = lazy(
  () => import('../../../components/vip/GoldenVisaEligibilityWidget/GoldenVisaEligibilityWidget')
);
export const FamilyOfficeAssetAllocationChart = lazy(
  () =>
    import('../../../components/vip/FamilyOfficeAssetAllocationChart/FamilyOfficeAssetAllocationChart')
);
export const CryptoPaymentSimulator = lazy(
  () => import('../../../components/vip/CryptoPaymentSimulator/CryptoPaymentSimulator')
);
export const NdaDigitalSigningModal = lazy(
  () => import('../../../components/vip/NdaDigitalSigningModal/NdaDigitalSigningModal')
);
export const PortfolioDeckGenerator = lazy(
  () => import('../../../components/vip/PortfolioDeckGenerator/PortfolioDeckGenerator')
);
export const VipResponseSlaTracker = lazy(
  () => import('../../../components/vip/VipResponseSlaTracker/VipResponseSlaTracker')
);
export const OffMarketLeadRouter = lazy(
  () => import('../../../components/vip/OffMarketLeadRouter/OffMarketLeadRouter')
);

// Wave 50: Finance & Leasing
export const PdcDepositReminderCalendar = lazy(
  () => import('../../../components/finance/PdcDepositReminderCalendar/PdcDepositReminderCalendar')
);
export const VatInvoiceGenerator = lazy(
  () => import('../../../components/finance/VatInvoiceGenerator/VatInvoiceGenerator')
);
export const BouncedChequeWorkflow = lazy(
  () => import('../../../components/finance/BouncedChequeWorkflow/BouncedChequeWorkflow')
);
export const UaeddsRentMandate = lazy(
  () => import('../../../components/finance/UaeddsRentMandate/UaeddsRentMandate')
);
export const SecurityDepositRefundLedger = lazy(
  () =>
    import('../../../components/finance/SecurityDepositRefundLedger/SecurityDepositRefundLedger')
);
export const LandlordPayoutBatchDispatch = lazy(
  () =>
    import('../../../components/finance/LandlordPayoutBatchDispatch/LandlordPayoutBatchDispatch')
);
export const FinancialPandLDashboard = lazy(
  () => import('../../../components/finance/FinancialPandLDashboard/FinancialPandLDashboard')
);
export const AuditTrailExporter = lazy(
  () => import('../../../components/finance/AuditTrailExporter/AuditTrailExporter')
);
