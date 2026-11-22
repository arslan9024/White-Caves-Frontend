import { lazy } from 'react';

// Wave 51: Communications & CRM
export const BroadcastCampaignSegmenter = lazy(
  () => import('../../../components/comms/BroadcastCampaignSegmenter/BroadcastCampaignSegmenter')
);
export const ChatSentimentAnalyzer = lazy(
  () => import('../../../components/comms/ChatSentimentAnalyzer/ChatSentimentAnalyzer')
);
export const LeadQualificationTagger = lazy(
  () => import('../../../components/comms/LeadQualificationTagger/LeadQualificationTagger')
);
export const WhatsAppTelemetrySocket = lazy(
  () => import('../../../components/comms/WhatsAppTelemetrySocket/WhatsAppTelemetrySocket')
);

// Wave 52: IoT Facilities & Asset Management
export const HvacInspectionCalendar = lazy(
  () => import('../../../components/iot/HvacInspectionCalendar/HvacInspectionCalendar')
);
export const SnaggingChecklistAnnotator = lazy(
  () => import('../../../components/iot/SnaggingChecklistAnnotator/SnaggingChecklistAnnotator')
);
export const UtilityTransferWizard = lazy(
  () => import('../../../components/iot/UtilityTransferWizard/UtilityTransferWizard')
);
export const AccessCardApprovalWorkflow = lazy(
  () => import('../../../components/iot/AccessCardApprovalWorkflow/AccessCardApprovalWorkflow')
);
export const AmenityBookingCalendar = lazy(
  () => import('../../../components/iot/AmenityBookingCalendar/AmenityBookingCalendar')
);
export const EmergencyHotlineRouter = lazy(
  () => import('../../../components/iot/EmergencyHotlineRouter/EmergencyHotlineRouter')
);
export const PropertyConditionReportGenerator = lazy(
  () =>
    import('../../../components/iot/PropertyConditionReportGenerator/PropertyConditionReportGenerator')
);
export const VendorRatingMatrix = lazy(
  () => import('../../../components/iot/VendorRatingMatrix/VendorRatingMatrix')
);

// Wave 53: Off-Plan Developer Engine
export const PaymentPlanTimelineVisualizer = lazy(
  () =>
    import('../../../components/offplan/PaymentPlanTimelineVisualizer/PaymentPlanTimelineVisualizer')
);
export const CommissionAcceleratorEngine = lazy(
  () =>
    import('../../../components/offplan/CommissionAcceleratorEngine/CommissionAcceleratorEngine')
);
export const BulkUnitReservationLock = lazy(
  () => import('../../../components/offplan/BulkUnitReservationLock/BulkUnitReservationLock')
);
export const OffPlanAssignmentCalculator = lazy(
  () =>
    import('../../../components/offplan/OffPlanAssignmentCalculator/OffPlanAssignmentCalculator')
);
export const MasterplanInteractiveMap = lazy(
  () => import('../../../components/offplan/MasterplanInteractiveMap/MasterplanInteractiveMap')
);
export const EoiDepositGateway = lazy(
  () => import('../../../components/offplan/EoiDepositGateway/EoiDepositGateway')
);
export const OffPlanSalesLeaderboard = lazy(
  () => import('../../../components/offplan/OffPlanSalesLeaderboard/OffPlanSalesLeaderboard')
);
export const ConstructionProgressStream = lazy(
  () => import('../../../components/offplan/ConstructionProgressStream/ConstructionProgressStream')
);
export const DeveloperDamPortal = lazy(
  () => import('../../../components/offplan/DeveloperDamPortal/DeveloperDamPortal')
);

// Wave 54: Commercial & Advisory
export const FitOutCostEstimator = lazy(
  () => import('../../../components/commercial/FitOutCostEstimator/FitOutCostEstimator')
);
export const TenantCreditRiskRating = lazy(
  () => import('../../../components/commercial/TenantCreditRiskRating/TenantCreditRiskRating')
);
export const WarehousePowerLoadChecker = lazy(
  () => import('../../../components/commercial/WarehousePowerLoadChecker/WarehousePowerLoadChecker')
);
export const TenancyStackPlanVisualizer = lazy(
  () =>
    import('../../../components/commercial/TenancyStackPlanVisualizer/TenancyStackPlanVisualizer')
);
export const ReraCommercialRentIndexCalculator = lazy(
  () =>
    import('../../../components/commercial/ReraCommercialRentIndexCalculator/ReraCommercialRentIndexCalculator')
);
export const LandFeasibilityStudyGenerator = lazy(
  () =>
    import('../../../components/commercial/LandFeasibilityStudyGenerator/LandFeasibilityStudyGenerator')
);
export const JvEquityIrrDistributionModel = lazy(
  () =>
    import('../../../components/commercial/JvEquityIrrDistributionModel/JvEquityIrrDistributionModel')
);
export const InstitutionalTeaserDeckBuilder = lazy(
  () =>
    import('../../../components/commercial/InstitutionalTeaserDeckBuilder/InstitutionalTeaserDeckBuilder')
);

// Wave 55: Enterprise Security & Governance
export const RbacPermissionMatrixEditor = lazy(
  () => import('../../../components/security/RbacPermissionMatrixEditor/RbacPermissionMatrixEditor')
);
export const SystemHealthDashboard = lazy(
  () => import('../../../components/security/SystemHealthDashboard/SystemHealthDashboard')
);
