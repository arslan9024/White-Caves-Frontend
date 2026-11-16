import type { BusinessDocItem } from '../types';
import { telemetryAndGovernanceDocs } from './corporateCompliance/telemetryAndGovernance.data';
import { reraAndOperationsDocs } from './corporateCompliance/reraAndOperations.data';

export const corporateComplianceDocs: BusinessDocItem[] = [
  ...telemetryAndGovernanceDocs,
  ...reraAndOperationsDocs,
];

