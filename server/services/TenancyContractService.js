import path from 'path';
import {
  createContractDraft,
  downloadContractById,
  getContractStatusById,
  listAgentContracts,
  updateContractDraft
} from './tenancyContract/draftAndQuery.js';
import {
  createPDFFromScratch,
  fillEJARITemplate,
  generateContractPDF,
  uploadPdfToFirebase
} from './tenancyContract/pdfGenerator.js';
import {
  getContractForSigningByToken,
  getSignatureEmailTemplate,
  notifyFullySignedContract,
  recordContractSignature,
  requestContractSignatures
} from './tenancyContract/signatureWorkflow.js';
import { addContractAuditEntry, validateContractFormData } from './tenancyContract/validation.js';

class TenancyContractService {
  async createDraft(agentId, formData) {
    return createContractDraft(agentId, formData, {
      addAuditEntry: this._addAuditEntry.bind(this)
    });
  }

  async updateDraft(contractId, updatedData) {
    return updateContractDraft(contractId, updatedData);
  }

  validateFormData(contract) {
    return validateContractFormData(contract);
  }

  async generatePDF(contractId, agentId) {
    return generateContractPDF(contractId, agentId, {
      validateFormData: this.validateFormData.bind(this),
      createFromScratch: this._createPDFFromScratch.bind(this),
      fillTemplate: this._fillEJARITemplate.bind(this),
      uploadPdf: this._uploadPdfToFirebase.bind(this),
      addAuditEntry: this._addAuditEntry.bind(this),
      templatePath: path.join(__dirname, '../templates/ejari-template.pdf')
    });
  }

  async _createPDFFromScratch(contract) {
    return createPDFFromScratch(contract);
  }

  async _fillEJARITemplate(templatePath, contract) {
    return fillEJARITemplate(templatePath, contract, this._createPDFFromScratch.bind(this));
  }

  async _uploadPdfToFirebase(pdfBuffer, fileName) {
    return uploadPdfToFirebase(pdfBuffer, fileName);
  }

  async requestSignatures(contractId, agentId) {
    return requestContractSignatures(contractId, agentId, {
      buildEmailTemplate: this._getSignatureEmailTemplate.bind(this),
      addAuditEntry: this._addAuditEntry.bind(this)
    });
  }

  _getSignatureEmailTemplate(party, contract, signUrl) {
    return getSignatureEmailTemplate(party, contract, signUrl);
  }

  async recordSignature(token, signatureData, ipAddress, userAgent) {
    return recordContractSignature(token, signatureData, ipAddress, userAgent, {
      notifyFullySigned: this._notifyFullySignedContract.bind(this)
    });
  }

  async getContractForSigning(token) {
    return getContractForSigningByToken(token);
  }

  async getContractStatus(contractId) {
    return getContractStatusById(contractId);
  }

  async _notifyFullySignedContract(contract) {
    return notifyFullySignedContract(contract);
  }

  async _addAuditEntry(contractId, action, performedBy, details, ipAddress) {
    return addContractAuditEntry(contractId, action, performedBy, details, ipAddress);
  }

  async downloadContract(contractId) {
    return downloadContractById(contractId);
  }

  async listContractsByAgent(agentId, filters = {}) {
    return listAgentContracts(agentId, filters);
  }
}

export default new TenancyContractService();
