import type { EnterpriseReport } from '../../types';

export const currencyAuditReports: EnterpriseReport[] = [
  {
    id: '3.14.R56',
    key: 'realized-gain-or-loss',
    name: 'Realized Gain or Loss',
    categoryKey: 'currency',
    categoryName: 'Currency',
    createdBy: 'System Generated',
    lastVisited: '19 Aug 2026 12:40 PM',
    schedule: 'Monthly',
    description:
      'Actual foreign exchange profits or losses realized upon settlement of international client invoices in USD, EUR, or GBP.',
    uaeRelevance:
      'Applies fixed Central Bank peg (USD 1 = AED 3.6725) and floating market rates for EUR/GBP/INR/RUB.',
    columns: [
      'Tx Ref',
      'Settlement Date',
      'Foreign Currency',
      'FX Amount',
      'Book Rate (AED)',
      'Settled Rate (AED)',
      'Realized Gain/Loss (AED)',
    ],
    mockSummary: {
      'Net Realized FX Gain (YTD)': 'AED +42,800',
      'Primary Currency': 'USD (Fixed Peg)',
    },
    sampleRows: [
      {
        'Tx Ref': 'FX-REAL-101',
        'Settlement Date': '14 Jul 2026',
        'Foreign Currency': 'EUR',
        'FX Amount': '€120,000',
        'Book Rate (AED)': '3.98',
        'Settled Rate (AED)': '4.02',
        'Realized Gain/Loss (AED)': '+4,800.00 (Gain)',
      },
      {
        'Tx Ref': 'FX-REAL-102',
        'Settlement Date': '02 Aug 2026',
        'Foreign Currency': 'GBP',
        'FX Amount': '£85,000',
        'Book Rate (AED)': '4.68',
        'Settled Rate (AED)': '4.72',
        'Realized Gain/Loss (AED)': '+3,400.00 (Gain)',
      },
    ],
    tags: ['FX Realized', 'Currency', 'Peg'],
  },
  {
    id: '3.14.R57',
    key: 'unrealized-gain-or-loss',
    name: 'Unrealized Gain or Loss',
    categoryKey: 'currency',
    categoryName: 'Currency',
    createdBy: 'System Generated',
    lastVisited: '22 Aug 2026 06:10 PM',
    schedule: 'Month-End (Mark to Market)',
    description:
      'Mark-to-market revaluation of open foreign currency receivables and bank balances at month-end closing exchange rates.',
    uaeRelevance: 'Complies with IAS 21 (The Effects of Changes in Foreign Exchange Rates).',
    columns: [
      'Foreign Asset',
      'Currency Code',
      'Balance',
      'Historical Cost (AED)',
      'Closing Rate (AED)',
      'Current Fair Value (AED)',
      'Unrealized Gain/Loss (AED)',
    ],
    mockSummary: {
      'Total Revalued Portfolio': 'AED 2,840,000',
      'Net Unrealized Movement': 'AED +12,400',
    },
    sampleRows: [
      {
        'Foreign Asset': 'Wio USD Multi-Currency Balance',
        'Currency Code': 'USD',
        Balance: '$450,000',
        'Historical Cost (AED)': '1,652,625',
        'Closing Rate (AED)': '3.6725',
        'Current Fair Value (AED)': '1,652,625',
        'Unrealized Gain/Loss (AED)': '0.00 (Pegged)',
      },
      {
        'Foreign Asset': 'EUR Developer Receivable (Damac)',
        'Currency Code': 'EUR',
        Balance: '€200,000',
        'Historical Cost (AED)': '796,000',
        'Closing Rate (AED)': '4.01',
        'Current Fair Value (AED)': '802,000',
        'Unrealized Gain/Loss (AED)': '+6,000.00 (Gain)',
      },
    ],
    tags: ['FX Unrealized', 'Mark to Market', 'IAS 21'],
  },
];

