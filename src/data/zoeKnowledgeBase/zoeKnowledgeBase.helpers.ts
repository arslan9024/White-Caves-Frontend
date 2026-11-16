// @ts-nocheck
import { COMPANY_INFO, DEPARTMENTS } from './companyAndDepartments.data';
import { SERVICES, SERVICE_FLOWS } from './services.data';

export const getServicesByDepartment = (departmentId) => {
  return SERVICES.filter(s => s.responsibleDepartment === departmentId);
};

export const getServicesByCategory = (category) => {
  return SERVICES.filter(s => s.category === category);
};

export const getDepartmentByService = (serviceId) => {
  const service = SERVICES.find(s => s.id === serviceId);
  if (service) {
    return DEPARTMENTS[service.responsibleDepartment];
  }
  return null;
};

export const searchKnowledgeBase = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = {
    departments: [],
    services: [],
    flows: [],
    contacts: []
  };

  Object.values(DEPARTMENTS).forEach(dept => {
    const searchText = `${dept.name} ${dept.purpose} ${dept.headName} ${dept.head}`.toLowerCase();
    if (searchText.includes(lowerQuery)) {
      results.departments.push(dept);
    }
  });

  SERVICES.forEach(service => {
    const searchText = `${service.name} ${service.description} ${service.category}`.toLowerCase();
    if (searchText.includes(lowerQuery)) {
      results.services.push(service);
    }
  });

  Object.values(SERVICE_FLOWS).forEach(flow => {
    const searchText = `${flow.name} ${flow.steps.map(s => s.title).join(' ')}`.toLowerCase();
    if (searchText.includes(lowerQuery)) {
      results.flows.push(flow);
    }
  });

  return results;
};

export default {
  COMPANY_INFO,
  DEPARTMENTS,
  SERVICES,
  SERVICE_FLOWS,
  getServicesByDepartment,
  getServicesByCategory,
  getDepartmentByService,
  searchKnowledgeBase
};

