import type { EnterpriseReport } from '../types';
import { businessOverviewReports } from './overviewSales/businessOverview.data';
import { salesReports } from './overviewSales/sales.data';
import { inventoryValuationReports } from './overviewSales/inventoryValuation.data';

export const overviewSalesReports: EnterpriseReport[] = [
  ...businessOverviewReports,
  ...salesReports,
  ...inventoryValuationReports,
];

