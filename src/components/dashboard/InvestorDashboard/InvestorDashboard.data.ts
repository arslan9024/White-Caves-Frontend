/**
 * Investor Dashboard — Data Layer (Mary Allen Wilkes Architecture)
 * Portfolio asset breakdowns and initial metrics
 */

import type { InvestorMetrics, PortfolioAssetItem } from './InvestorDashboard.types';

export const INVESTOR_METRICS: InvestorMetrics = {
  totalInvested: 'AED 45,800,000',
  portfolioValue: 'AED 52,340,000',
  totalGain: 'AED 6,540,000',
  gainPercentage: '+14.3%',
  yearlyROI: '18.2%',
  diversificationScore: '8.5/10',
  riskLevel: 'Moderate',
};

export const PORTFOLIO_ASSETS: PortfolioAssetItem[] = [
  {
    id: 1,
    name: 'Real Estate Portfolio',
    type: 'property',
    invested: 'AED 25,000,000',
    currentValue: 'AED 28,500,000',
    gain: 'AED 3,500,000',
    gainPercent: 14,
    allocation: 54.4,
    roi: 14,
    units: 12,
    image: '🏢',
  },
  {
    id: 2,
    name: 'Equities & Stocks',
    type: 'stock',
    invested: 'AED 12,000,000',
    currentValue: 'AED 15,200,000',
    gain: 'AED 3,200,000',
    gainPercent: 26.7,
    allocation: 29.0,
    roi: 26.7,
    shares: 450,
    image: '📈',
  },
  {
    id: 3,
    name: 'Fixed Income Securities',
    type: 'bonds',
    invested: 'AED 6,500,000',
    currentValue: 'AED 7,100,000',
    gain: 'AED 600,000',
    gainPercent: 9.2,
    allocation: 13.6,
    roi: 9.2,
    amount: 'AED 7.1M',
    image: '📊',
  },
];
