export interface MdDailySummaryLiveStripProps {
  onNavigate?: (route: string) => void;
}

export interface DailySummaryDealItem {
  id: string;
  contractNumber: string;
  status: string;
  annualRentAed: number;
  stage: string;
  project: string;
  unitNumber: string;
}

export interface DailySummaryPayload {
  generatedAt: string;
  primaryMasterPhone: string;
  simFleet: {
    poolSize: number;
    hunterPoolSize: number;
    connectedCount: number;
    connectedHunterCount: number;
  };
  verifiedActiveListingsCount: number;
  upcomingViewingsCount: number;
  activeDealsCount: number;
  activeDeals: DailySummaryDealItem[];
  chequeAndRenewalAlertsCount: number;
}

export function parseStageOrder(stage: string): number {
  const match = stage.match(/STAGE_(\d{2})/i);
  return match ? Math.min(12, Math.max(1, Number(match[1]))) : 7;
}
