/**
 * Generated Mock Data — Strongly-Typed Facade
 */
import { MockDataGenerated, MockProperty, MockLead, MockTransaction } from './mockDataGenerated/mockDataGenerated.types';
import { MOCK_PROPERTIES } from './mockDataGenerated/mockProperties';
import { MOCK_LEADS } from './mockDataGenerated/mockLeads';
import { MOCK_TRANSACTIONS } from './mockDataGenerated/mockTransactions';

export type * from './mockDataGenerated/mockDataGenerated.types';

export const MOCK_DATA: MockDataGenerated = {
  properties: MOCK_PROPERTIES,
  leads: MOCK_LEADS,
  transactions: MOCK_TRANSACTIONS,
};

// --- Helpers ---
export const getPropertyById = (id: string): MockProperty | undefined =>
  MOCK_DATA.properties.find(p => p.id === id);

export const getLeadById = (id: string): MockLead | undefined =>
  MOCK_DATA.leads.find(l => l.id === id);

export const getTransactionById = (id: string): MockTransaction | undefined =>
  MOCK_DATA.transactions.find(t => t.id === id);

export const getAvailableProperties = (): MockProperty[] =>
  MOCK_DATA.properties.filter(p => p.status === 'Available');

export default MOCK_DATA;

