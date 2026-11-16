import { MortgageApplication, BankInfo } from './SageCRM.types';

export const APPLICATIONS: MortgageApplication[] = [
  {
    id: 1,
    client: 'Ahmad Al Rashidi',
    bank: 'Emirates NBD',
    amount: 'AED 6.8M',
    rate: '4.25%',
    ltv: '80%',
    status: 'approved',
    term: 25,
  },
  {
    id: 2,
    client: 'Priya Nair',
    bank: 'ADCB',
    amount: 'AED 1.4M',
    rate: '4.49%',
    ltv: '75%',
    status: 'processing',
    term: 20,
  },
  {
    id: 3,
    client: 'James Whitmore',
    bank: 'HSBC UAE',
    amount: 'AED 14.4M',
    rate: '3.99%',
    ltv: '80%',
    status: 'under_review',
    term: 15,
  },
  {
    id: 4,
    client: 'Fatima Al Suwaidi',
    bank: 'Dubai Islamic Bank',
    amount: 'AED 1.7M',
    rate: '4.10%',
    ltv: '80%',
    status: 'approved',
    term: 25,
  },
];

export const BANKS: BankInfo[] = [
  {
    name: 'Emirates NBD',
    expats: true,
    maxLTV: '80%',
    minRate: '3.99%',
    processingDays: 7,
    minSalary: 'AED 15K',
  },
  {
    name: 'ADCB',
    expats: true,
    maxLTV: '75%',
    minRate: '4.25%',
    processingDays: 10,
    minSalary: 'AED 12K',
  },
  {
    name: 'Dubai Islamic Bank',
    expats: true,
    maxLTV: '85%',
    minRate: '4.10%',
    processingDays: 8,
    minSalary: 'AED 10K',
    sharia: true,
  },
  {
    name: 'HSBC UAE',
    expats: true,
    maxLTV: '80%',
    minRate: '3.99%',
    processingDays: 14,
    minSalary: 'AED 20K',
  },
  {
    name: 'Mashreq Bank',
    expats: true,
    maxLTV: '75%',
    minRate: '4.35%',
    processingDays: 7,
    minSalary: 'AED 12K',
  },
];

export const statusColors: Record<string, string> = {
  approved: '#22C55E',
  processing: '#3B82F6',
  under_review: '#F59E0B',
  rejected: '#EF4444',
};

