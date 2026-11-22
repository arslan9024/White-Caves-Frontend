import TenancyContract from '../../models/TenancyContract.js';
import { addContractAuditEntry } from './validation.js';

/**
 * Create a draft tenancy contract
 */
export async function createContractDraft(agentId, formData, deps = {}) {
  const { addAuditEntry = addContractAuditEntry } = deps;

  try {
    const contract = new TenancyContract({
      agentId,
      status: 'Draft',
      propertyInfo: formData.propertyInfo,
      landlordInfo: formData.landlordInfo,
      tenantInfo: formData.tenantInfo,
      contactDetails: formData.contactDetails,
      tenancyTerms: formData.tenancyTerms,
      createdBy: agentId
    });

    await contract.save();
    await addAuditEntry(contract._id, 'Draft Created', agentId, 'Contract draft created via form', '');

    return {
      success: true,
      contractId: contract._id,
      referenceNumber: contract.referenceNumber,
      message: 'Draft contract created successfully'
    };
  } catch (error) {
    throw new Error(`Error creating draft: ${error.message}`);
  }
}

/**
 * Update draft contract
 */
export async function updateContractDraft(contractId, updatedData) {
  try {
    const contract = await TenancyContract.findById(contractId);
    if (!contract) throw new Error('Contract not found');

    // Update only draft contracts
    if (contract.status !== 'Draft') {
      throw new Error('Only draft contracts can be updated');
    }

    // Update each section
    if (updatedData.propertyInfo) contract.propertyInfo = updatedData.propertyInfo;
    if (updatedData.landlordInfo) contract.landlordInfo = updatedData.landlordInfo;
    if (updatedData.tenantInfo) contract.tenantInfo = updatedData.tenantInfo;
    if (updatedData.contactDetails) contract.contactDetails = updatedData.contactDetails;
    if (updatedData.tenancyTerms) contract.tenancyTerms = updatedData.tenancyTerms;

    await contract.save();
    return { success: true, message: 'Contract updated successfully' };
  } catch (error) {
    throw new Error(`Error updating draft: ${error.message}`);
  }
}

/**
 * Get contract status and signature information
 */
export async function getContractStatusById(contractId) {
  try {
    const contract = await TenancyContract.findById(contractId);
    if (!contract) throw new Error('Contract not found');

    return {
      contractId: contract._id,
      referenceNumber: contract.referenceNumber,
      status: contract.status,
      signatureStatus: contract.getSignatureStatus(),
      pdfUrl: contract.pdfDocument?.pdfUrl,
      createdAt: contract.createdAt,
      generatedAt: contract.pdfDocument?.generatedAt,
      auditTrail: contract.auditTrail
    };
  } catch (error) {
    throw new Error(`Error getting contract status: ${error.message}`);
  }
}

/**
 * Download contract PDF
 */
export async function downloadContractById(contractId) {
  try {
    const contract = await TenancyContract.findById(contractId);
    if (!contract) throw new Error('Contract not found');

    return {
      pdfUrl: contract.pdfDocument?.pdfUrl,
      fileName: contract.pdfDocument?.fileName,
      referenceNumber: contract.referenceNumber
    };
  } catch (error) {
    throw new Error(`Error downloading contract: ${error.message}`);
  }
}

/**
 * List contracts for agent
 */
export async function listAgentContracts(agentId, filters = {}) {
  try {
    const query = { agentId };

    if (filters.status) query.status = filters.status;
    if (filters.propertyId) query['propertyInfo.propertyId'] = filters.propertyId;

    const contracts = await TenancyContract.find(query)
      .select('referenceNumber status propertyInfo landlordInfo tenantInfo tenancyTerms createdAt updatedAt')
      .sort({ createdAt: -1 })
      .limit(filters.limit || 50)
      .skip(filters.skip || 0);

    const total = await TenancyContract.countDocuments(query);

    return {
      contracts,
      total,
      page: Math.floor((filters.skip || 0) / (filters.limit || 50)) + 1
    };
  } catch (error) {
    throw new Error(`Error listing contracts: ${error.message}`);
  }
}
