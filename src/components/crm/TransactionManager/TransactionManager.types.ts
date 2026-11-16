/**
 * TransactionManager — Type Definitions
 * Standard: Mary Allen Wilkes Protocol (.types.ts)
 * Single Purpose File Law: < 350 lines
 */

export interface DLDTransaction {
  _id: string;
  transactionNumber: string;
  instanceDate: string;
  group: string;
  procedure: string;
  isOffplan: string;
  isFreehold: string;
  usage: string;
  area: string;
  propType: string;
  propSubType: string;
  transValue: number;
  actualArea: number;
  rooms: string;
  parking: string;
  project?: string;
  meterSalePrice?: number;
  rentValue?: number;
  nearestMetro?: string;
  nearestMall?: string;
  nearestLandmark?: string;
}

export interface TransactionStats {
  totalTransactions?: number;
  totalValue?: number;
  avgPricePerSqFt?: number;
  offplanRatio?: number;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface FilterState {
  search: string;
  area: string;
  propSubType: string;
  rooms: string;
  minValue: string;
  maxValue: string;
  isOffplan: string;
}

export interface SortConfig {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface ToastItem {
  id: number;
  message: string;
  color: string;
}

export type ModalMode = 'view' | 'edit' | 'create';

