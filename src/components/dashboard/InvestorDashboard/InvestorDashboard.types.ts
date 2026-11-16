/**
 * Investor Dashboard — Types Layer (Mary Allen Wilkes Architecture)
 * Strict typing for investment portfolios, asset allocations, and risk scores
 */

export interface InvestorMetrics {
  totalInvested: string;
  portfolioValue: string;
  totalGain: string;
  gainPercentage: string;
  yearlyROI: string;
  diversificationScore: string;
  riskLevel: string;
}

export interface PortfolioAssetItem {
  id: number;
  name: string;
  type: string;
  invested: string;
  currentValue: string;
  gain: string;
  gainPercent: number;
  allocation: number;
  roi: number;
  units?: number;
  shares?: number;
  amount?: string;
  image: string;
}

export interface InvestorDashboardProps {
  user?: unknown;
}

