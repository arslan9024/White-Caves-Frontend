import { RoleTabMapping } from './roleTabMapping.types';
import { rolesBatch1 } from './rolesBatch1.data';
import { rolesBatch2 } from './rolesBatch2.data';

export const ROLE_TAB_MAPPING: RoleTabMapping = {
  ...rolesBatch1,
  ...rolesBatch2,
} as RoleTabMapping;

