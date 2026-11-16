import type { EnterpriseReport } from '../types';
import { currencyAuditReports } from './auditAutomation/currencyAudit.data';
import { activityAuditReports } from './auditAutomation/activityAudit.data';
import { automationWorkflowsReports } from './auditAutomation/automationWorkflows.data';

export const auditAutomationReports: EnterpriseReport[] = [
  ...currencyAuditReports,
  ...activityAuditReports,
  ...automationWorkflowsReports,
];

