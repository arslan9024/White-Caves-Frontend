import TenancyContract from '../../models/TenancyContract.js';

/**
 * Validate all required fields before PDF generation
 */
export function validateContractFormData(contract) {
  const errors = [];

  // Property validation
  if (!contract.propertyInfo?.description) errors.push('Property description is required');
  if (!contract.propertyInfo?.address) errors.push('Property address is required');
  if (!contract.propertyInfo?.unitArea) errors.push('Unit area is required');

  // Landlord validation
  if (!contract.landlordInfo?.name) errors.push('Landlord name is required');
  if (!contract.landlordInfo?.emiratesId && !contract.landlordInfo?.passportNumber) {
    errors.push('Landlord Emirates ID or Passport is required');
  }
  if (!contract.landlordInfo?.email) errors.push('Landlord email is required');

  // Tenant validation
  if (!contract.tenantInfo?.name) errors.push('Tenant name is required');
  if (!contract.tenantInfo?.emiratesId && !contract.tenantInfo?.passportNumber) {
    errors.push('Tenant Emirates ID or Passport is required');
  }
  if (!contract.tenantInfo?.email) errors.push('Tenant email is required');

  // Tenancy terms validation
  if (!contract.tenancyTerms?.leaseStartDate) errors.push('Lease start date is required');
  if (!contract.tenancyTerms?.leaseEndDate) errors.push('Lease end date is required');
  if (!contract.tenancyTerms?.rentAmount) errors.push('Rent amount is required');

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Add audit trail entry
 */
export async function addContractAuditEntry(contractId, action, performedBy, details, ipAddress) {
  try {
    const contract = await TenancyContract.findById(contractId);
    if (contract) {
      contract.addAuditEntry(action, performedBy, details, ipAddress);
      await contract.save();
    }
  } catch (error) {
    console.error('Error adding audit entry:', error);
  }
}
