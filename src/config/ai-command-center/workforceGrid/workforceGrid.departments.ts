import { DepartmentGridNode } from './workforceGrid.types';
import { DEPT_GROUP_1 } from './deptGroup1.data';
import { DEPT_GROUP_2 } from './deptGroup2.data';
import { DEPT_GROUP_3 } from './deptGroup3.data';
import { DEPT_GROUP_4 } from './deptGroup4.data';
import { DEPT_GROUP_5 } from './deptGroup5.data';
import { DEPT_GROUP_6 } from './deptGroup6.data';

export const ALL_DEPARTMENTS: DepartmentGridNode[] = [
  ...DEPT_GROUP_1,
  ...DEPT_GROUP_2,
  ...DEPT_GROUP_3,
  ...DEPT_GROUP_4,
  ...DEPT_GROUP_5,
  ...DEPT_GROUP_6,
];

