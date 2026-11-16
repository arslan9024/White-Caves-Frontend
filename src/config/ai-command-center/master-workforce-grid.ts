import { MasterWorkforceGrid } from './workforceGrid/workforceGrid.types';
import { WORKFORCE_METADATA } from './workforceGrid/workforceGrid.metadata';
import { ALL_DEPARTMENTS } from './workforceGrid/workforceGrid.departments';

export type * from './workforceGrid/workforceGrid.types';

export const MASTER_WORKFORCE_GRID: MasterWorkforceGrid = {
  ...WORKFORCE_METADATA,
  departments: ALL_DEPARTMENTS,
} as const;

export {
  getDepartmentById,
  getDepartmentByCode,
  getAllSupervisors,
  getSupervisorById,
  getAllManagers,
} from './workforceGrid/workforceGrid.helpers';

export default MASTER_WORKFORCE_GRID;

