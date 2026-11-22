import type { Contract } from '../types';

export type ModalMode = 'none' | 'add' | 'edit' | 'delete';
export type ContractFormState = Omit<Contract, 'id'>;

export interface ContractStats {
  total: number;
  active: number;
  pending: number;
  ejariRegistered: number;
}

export const ITEMS_PER_PAGE = 5;

export const EMPTY_FORM: ContractFormState = {
  contractNumber: '',
  type: 'tenancy',
  tenant: '',
  landlord: '',
  buyer: '',
  seller: '',
  property: '',
  startDate: '',
  endDate: '',
  completionDate: '',
  amount: 0,
  status: 'pending',
  ejariStatus: 'pending',
};

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 1,
    contractNumber: 'WC-CNT-2024-001',
    type: 'tenancy',
    tenant: 'James Hartwell',
    landlord: 'Al Futtaim Properties',
    property: 'Marina Heights, Unit 12A',
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    amount: 120000,
    status: 'active',
    ejariStatus: 'registered',
    signatureStatus: 'signed',
  },
  {
    id: 2,
    contractNumber: 'WC-CNT-2024-002',
    type: 'sale',
    buyer: 'Chen Wei',
    seller: 'White Caves LLC',
    property: 'Downtown Dubai, Burj Vista 4B',
    completionDate: '2024-03-20',
    amount: 3500000,
    status: 'completed',
    ejariStatus: '',
    signatureStatus: 'signed',
  },
  {
    id: 3,
    contractNumber: 'WC-CNT-2024-003',
    type: 'tenancy',
    tenant: 'Priya Sharma',
    landlord: 'Emirates REIT',
    property: 'JBR, The Walk Tower 7, Unit 3C',
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    amount: 95000,
    status: 'active',
    ejariStatus: 'registered',
    signatureStatus: 'signed',
  },
  {
    id: 4,
    contractNumber: 'WC-CNT-2024-004',
    type: 'tenancy',
    tenant: 'Omar Al Rashidi',
    landlord: 'Emaar Properties',
    property: 'Arabian Ranches, Villa 22',
    startDate: '2024-05-01',
    endDate: '2025-04-30',
    amount: 180000,
    status: 'active',
    ejariStatus: 'pending',
    signatureStatus: 'sent',
  },
  {
    id: 5,
    contractNumber: 'WC-CNT-2024-005',
    type: 'sale',
    buyer: 'Sarah Johnson',
    seller: 'Damac Properties',
    property: 'Business Bay, Executive Tower',
    completionDate: '2024-06-15',
    amount: 2200000,
    status: 'pending',
    ejariStatus: '',
    signatureStatus: 'opened',
  },
  {
    id: 6,
    contractNumber: 'WC-CNT-2024-006',
    type: 'tenancy',
    tenant: 'Mohammed Al Hassan',
    landlord: 'Nakheel',
    property: 'Palm Jumeirah, Frond G Villa',
    startDate: '2023-07-01',
    endDate: '2024-06-30',
    amount: 350000,
    status: 'expired',
    ejariStatus: 'registered',
    signatureStatus: 'expired',
  },
  {
    id: 7,
    contractNumber: 'WC-CNT-2024-007',
    type: 'sale',
    buyer: 'Fatima Al Mansoori',
    seller: 'Meraas Holding',
    property: 'City Walk, Bldg 12, Unit 504',
    completionDate: '2024-08-01',
    amount: 1850000,
    status: 'active',
    ejariStatus: '',
    signatureStatus: 'rejected',
  },
  {
    id: 8,
    contractNumber: 'WC-CNT-2024-008',
    type: 'tenancy',
    tenant: 'Viktor Petrov',
    landlord: 'Select Group',
    property: 'Dubai Marina, 5242 Tower A',
    startDate: '2024-09-01',
    endDate: '2025-08-31',
    amount: 140000,
    status: 'active',
    ejariStatus: 'pending',
    signatureStatus: 'pending',
  },
];

export const createDefaultContractNumber = (existingCount: number): string =>
  `WC-CNT-${new Date().getFullYear()}-${String(existingCount + 1).padStart(3, '0')}`;

export const contractToFormState = (contract: Contract): ContractFormState => ({
  contractNumber: contract.contractNumber,
  type: contract.type,
  tenant: contract.tenant ?? '',
  landlord: contract.landlord ?? '',
  buyer: contract.buyer ?? '',
  seller: contract.seller ?? '',
  property: contract.property,
  startDate: contract.startDate ?? '',
  endDate: contract.endDate ?? '',
  completionDate: contract.completionDate ?? '',
  amount: contract.amount,
  status: contract.status,
  ejariStatus: contract.ejariStatus,
});

export const computeContractStats = (contracts: Contract[]): ContractStats => ({
  total: contracts.length,
  active: contracts.filter(c => c.status === 'active').length,
  pending: contracts.filter(c => c.status === 'pending').length,
  ejariRegistered: contracts.filter(c => c.ejariStatus === 'registered').length,
});
