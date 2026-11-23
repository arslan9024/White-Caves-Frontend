import type { ServiceCatalogItem } from './servicesCatalogTypes';
import { CORE_SERVICES_DATA } from './servicesCatalogCoreData';
import { EXTENDED_SERVICES_DATA } from './servicesCatalogExtendedData';

export type { ServiceTierKey, ServiceCategory, ServiceCatalogItem } from './servicesCatalogTypes';
export { SERVICE_CATEGORIES, TIER_CONFIG, formatServiceRevenue } from './servicesCatalogConfig';
export { CORE_SERVICES_DATA } from './servicesCatalogCoreData';
export { EXTENDED_SERVICES_DATA } from './servicesCatalogExtendedData';

export const SERVICES_DATA: ServiceCatalogItem[] = [
  ...CORE_SERVICES_DATA,
  ...EXTENDED_SERVICES_DATA,
];
