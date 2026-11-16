// @ts-nocheck
import { EXECUTIVES, DIRECTORS } from './leadership.data';
import { DEPARTMENTS_CONFIG } from './departments.data';

export const getExecutiveById = (id) => EXECUTIVES.find(e => e.id === id);
export const getDirectorById = (id) => DIRECTORS.find(d => d.id === id);
export const getDepartmentConfig = (deptId) => DEPARTMENTS_CONFIG[deptId];
export const getDirectorByDepartment = (deptId) => {
  const config = DEPARTMENTS_CONFIG[deptId];
  return config?.director ? getDirectorById(config.director) : null;
};

export default {
  EXECUTIVES,
  DIRECTORS,
  DEPARTMENTS_CONFIG,
  getExecutiveById,
  getDirectorById,
  getDepartmentConfig,
  getDirectorByDepartment
};

