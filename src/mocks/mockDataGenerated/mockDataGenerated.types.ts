/**
 * Generated Mock Data — Strongly-Typed
 * Auto-generated from mockDataGenerated.json
 */

export interface MockProperty {
  id: string;
  title: string;
  community: string;
  developer: string;
  priceAED: number;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  reraPermitNumber: string;
  [key: string]: any;
}

export interface MockLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  priority: string;
  assignedBroker: string;
  [key: string]: any;
}

export interface MockTransaction {
  id: string;
  tenantName: string;
  landlordName: string;
  agentAssigned: string;
  propertyId: string;
  viewingCompleted: boolean;
  leasingProcessStarted: boolean;
  status: string;
  [key: string]: any;
}

export interface MockDataGenerated {
  properties: MockProperty[];
  leads: MockLead[];
  transactions: MockTransaction[];
  [key: string]: any;
}

