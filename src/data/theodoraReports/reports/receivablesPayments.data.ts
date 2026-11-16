import type { EnterpriseReport } from '../types';
import { receivablesAgingReports } from './receivablesPayments/receivablesAging.data';
import { receivablesDetailsReports } from './receivablesPayments/receivablesDetails.data';
import { paymentsReceivedReports } from './receivablesPayments/paymentsReceived.data';

export const receivablesPaymentsReports: EnterpriseReport[] = [
  ...receivablesAgingReports,
  ...receivablesDetailsReports,
  ...paymentsReceivedReports,
];

