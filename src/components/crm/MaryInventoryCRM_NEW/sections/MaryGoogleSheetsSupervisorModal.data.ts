import type { InventoryProperty } from './types';
import type { IngestPreviewItem } from './MarySheetsPreviewTable';

export const SHEET_TARGETS = [
  { id: '1NRqC1GywTZqKGfzeqM3ZrGb2nh9WOyOQr3xHMP4c1-o', label: 'Akoya-Oxygen-PMS (Live DB)' },
  { id: '16msSvbMZ9Quli-eL97lu6wMkXwJAeeQLje92gUf_tGk', label: 'Akoya-Oxygen-PMS1 (View)' },
  { id: '1gV4-hSAhDyWsivajBb2E2DSs25CMbqhc-6oufP1ZX04', label: 'Akoya-Oxygen-2023 (Raw)' },
];

export const OFFLINE_SAMPLE_PREVIEW: IngestPreviewItem[] = [
  {
    phone: '0501234567',
    e164: '+971501234567',
    ownerName: 'Ahmad Al Mansoori',
    cluster: 'VARDON',
    unitRef: 'VD-142',
    bedrooms: '3BR',
    propertyStatus: 'AVAILABLE',
    sourceTab: 'Vardon',
  },
  {
    phone: '0559876543',
    e164: '+971559876543',
    ownerName: 'Dmitry Ivanov',
    cluster: 'PACIFICA',
    unitRef: 'PC-209',
    bedrooms: '4BR',
    propertyStatus: 'AVAILABLE',
    sourceTab: 'Pacifica',
  },
  {
    phone: '0528765432',
    e164: '+971528765432',
    ownerName: 'Sanjay Patel',
    cluster: 'AMARGO',
    unitRef: 'AM-055',
    bedrooms: '3BR',
    propertyStatus: 'AVAILABLE',
    sourceTab: 'Amargo',
  },
  {
    phone: '0507654321',
    e164: '+971507654321',
    ownerName: 'Sarah Jenkins',
    cluster: 'ALBIZIA',
    unitRef: 'AB-311',
    bedrooms: '3BR',
    propertyStatus: 'AVAILABLE',
    sourceTab: 'Albizia',
  },
];

export function convertPreviewToInventory(previewList: IngestPreviewItem[]): InventoryProperty[] {
  return previewList.map((item, idx) => ({
    id: `sarita-${Date.now()}-${idx}`,
    pNumber: `P-DH2-${item.unitRef}`,
    plotNumber: item.unitRef,
    cluster: item.cluster.toUpperCase(),
    area: 'DAMAC Hills 2',
    propertyType: 'TH',
    subtype: item.bedrooms,
    sizeSqft: 2150,
    bedrooms: parseInt(item.bedrooms, 10) || 3,
    bathrooms: 4,
    status: 'AVAILABLE',
    rentPrice: 95000,
    salePrice: 1650000,
    titleDeedNo: `TD-SARITA-${item.unitRef}`,
    ownerId: `own-${item.e164}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })) as unknown as InventoryProperty[];
}
