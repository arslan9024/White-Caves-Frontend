// @ts-nocheck
import { departmentContentMap } from './departmentContentMap.data';

/**
 * Helper function to get all departments
 */
export const getAllDepartments = () => {
  return Object.entries(departmentContentMap).map(([key, dept]) => ({
    id: key,
    ...dept,
  }));
};

/**
 * Helper function to get department by ID
 */
export const getDepartmentById = (deptId) => {
  return departmentContentMap[deptId] || null;
};

/**
 * Helper function to get all services for a department
 */
export const getServicesByDepartment = (deptId) => {
  const dept = departmentContentMap[deptId];
  if (!dept) return [];
  return Object.entries(dept.services).map(([key, service]) => ({
    id: key,
    ...service,
  }));
};

/**
 * Helper function to get service by ID within department
 */
export const getServiceById = (deptId, serviceId) => {
  const dept = departmentContentMap[deptId];
  if (!dept || !dept.services[serviceId]) return null;
  return {
    id: serviceId,
    ...dept.services[serviceId],
  };
};

/**
 * Helper function to get subitems for a service
 */
export const getSubitemsByService = (deptId, serviceId) => {
  const service = getServiceById(deptId, serviceId);
  return service?.subitems || [];
};

/**
 * Helper function to get default department for user role
 * Maps user role to default department
 */
export const getDefaultDepartmentForRole = (userRole) => {
  const roleToDefaultDept = {
    'sales': 'SALES',
    'agent': 'SALES',
    'operations': 'OPERATIONS',
    'property-manager': 'PROPERTIES',
    'finance': 'FINANCE',
    'cfo': 'FINANCE',
    'compliance': 'COMPLIANCE',
    'legal': 'COMPLIANCE',
    'analytics': 'ANALYTICS',
    'bi': 'ANALYTICS',
    'marketing': 'MARKETING',
    'hr': 'HUMAN_RESOURCES',
    'tech': 'TECHNOLOGY',
    'cto': 'TECHNOLOGY',
    'md': 'EXECUTIVE',
    'executive': 'EXECUTIVE',
  };

  return roleToDefaultDept[userRole] || 'OPERATIONS';
};

/**
 * Helper function to filter departments by user permissions
 */
export const filterDepartmentsByPermissions = (permissions) => {
  return getAllDepartments().filter((dept) => {
    return dept.permissions.some((perm) => permissions.includes(perm));
  });
};

/**
 * Helper function to filter services by user permissions
 */
export const filterServicesByPermissions = (deptId, permissions) => {
  return getServicesByDepartment(deptId).filter((service) => {
    return service.permissions.some((perm) => permissions.includes(perm));
  });
};

/**
 * Helper function to filter subitems by user permissions
 */
export const filterSubitemsByPermissions = (deptId, serviceId, permissions) => {
  return getSubitemsByService(deptId, serviceId).filter((subitem) => {
    return subitem.permissions.some((perm) => permissions.includes(perm));
  });
};

