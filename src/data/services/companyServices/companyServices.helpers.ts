// @ts-nocheck
import { salesServices } from './salesServices.data';
import { leasingServices } from './leasingServices.data';
import { operationsServices, financeServices } from './operationsAndFinanceServices.data';
import { complianceServices, marketingServices } from './complianceAndMarketingServices.data';

export const COMPANY_SERVICES = {
  sales: salesServices,
  leasing: leasingServices,
  operations: operationsServices,
  finance: financeServices,
  compliance: complianceServices,
  marketing: marketingServices,
};

export const getAllServices = () => {
  return Object.values(COMPANY_SERVICES).flat();
};

export const getServicesByCategory = (category) => {
  return COMPANY_SERVICES[category] || [];
};

export const getServiceById = (id) => {
  return getAllServices().find(s => s.id === id);
};

export const getServiceStats = () => {
  const all = getAllServices();
  return {
    total: all.length,
    byCategory: {
      sales: COMPANY_SERVICES.sales.length,
      leasing: COMPANY_SERVICES.leasing.length,
      operations: COMPANY_SERVICES.operations.length,
      finance: COMPANY_SERVICES.finance.length,
      compliance: COMPANY_SERVICES.compliance.length,
      marketing: COMPANY_SERVICES.marketing.length
    },
    totalMonthlyVolume: all.reduce((sum, s) => sum + s.monthlyVolume, 0)
  };
};

export default {
  COMPANY_SERVICES,
  getAllServices,
  getServicesByCategory,
  getServiceById,
  getServiceStats
};

