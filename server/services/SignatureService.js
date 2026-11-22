import {
  validateSignature,
  generateSignatureToken,
  detectPlatform,
  detectBrowser,
  calculateAverageSigningTime,
} from './signature/signatureHelpers.js';
import { createAuditLog, getAuditTrail } from './signature/signatureAudit.js';
import {
  isSigningRequestValid,
  createSignatureRequest,
  verifySignatureToken,
  resendSigningRequest,
  cancelSignatureRequest,
  createBatchSignatureRequests,
} from './signature/signatureRequests.js';
import {
  recordSignature,
  saveSignature,
  checkContractSignatureCompletion,
} from './signature/signatureRecording.js';
import {
  getSignatureStatus,
  getPendingSignatures,
  getBulkSignatureStatus,
  getSignatureStats,
} from './signature/signatureQueries.js';
import {
  sendSignatureReminder,
  sendSigningNotification,
} from './signature/signatureNotifications.js';

class SignatureService {
  validateSignature(signatureData) {
    return validateSignature(signatureData);
  }

  generateSignatureToken(contractId, signer) {
    return generateSignatureToken(contractId, signer);
  }

  recordSignature(contractId, signatureId, signatureData) {
    return recordSignature(contractId, signatureId, signatureData);
  }

  getSignatureStatus(contractId) {
    return getSignatureStatus(contractId);
  }

  detectPlatform(userAgent) {
    return detectPlatform(userAgent);
  }

  detectBrowser(userAgent) {
    return detectBrowser(userAgent);
  }

  isSigningRequestValid(signatureId) {
    return isSigningRequestValid(signatureId);
  }

  getPendingSignatures(userEmail) {
    return getPendingSignatures(userEmail);
  }

  sendSignatureReminder(signatureId) {
    return sendSignatureReminder(signatureId);
  }

  getBulkSignatureStatus(contractIds) {
    return getBulkSignatureStatus(contractIds);
  }

  createSignatureRequest(signatureData) {
    return createSignatureRequest(signatureData);
  }

  verifySignatureToken(contractId, token) {
    return verifySignatureToken(contractId, token);
  }

  saveSignature(signatureId, signatureData) {
    return saveSignature(signatureId, signatureData);
  }

  checkContractSignatureCompletion(contractId) {
    return checkContractSignatureCompletion(contractId);
  }

  createAuditLog(contractId, actor, action, details = {}) {
    return createAuditLog(contractId, actor, action, details);
  }

  getAuditTrail(contractId) {
    return getAuditTrail(contractId);
  }

  sendSigningNotification(signatureId, signingLink) {
    return sendSigningNotification(signatureId, signingLink);
  }

  resendSigningRequest(signatureId) {
    return resendSigningRequest(signatureId);
  }

  cancelSignatureRequest(signatureId) {
    return cancelSignatureRequest(signatureId);
  }

  getSignatureStats(contractId) {
    return getSignatureStats(contractId);
  }

  calculateAverageSigningTime(signatures) {
    return calculateAverageSigningTime(signatures);
  }

  createBatchSignatureRequests(contractId, signerList) {
    return createBatchSignatureRequests(contractId, signerList);
  }
}

export default new SignatureService();
