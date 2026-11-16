import { JobRole } from './rbac.types';
import { ROLES_SALES_OPS_COMMS } from './rolesSalesOpsComms.data';
import { ROLES_FINANCE_MKTG_EXEC } from './rolesFinanceMktgExec.data';
import { ROLES_COMP_TECH_LEGAL } from './rolesCompTechLegal.data';
import { ROLES_INTEL_LEASE_MAINT_AI } from './rolesIntelLeaseMaintAi.data';

export const WHITE_CAVES_ROLES: JobRole[] = [
  ...ROLES_SALES_OPS_COMMS,
  ...ROLES_FINANCE_MKTG_EXEC,
  ...ROLES_COMP_TECH_LEGAL,
  ...ROLES_INTEL_LEASE_MAINT_AI,
];

