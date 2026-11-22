import ContractSignature from '../../models/ContractSignature.js';
import SignatureAudit from '../../models/SignatureAudit.js';
import { calculateAverageSigningTime } from './signatureHelpers.js';

/**
 * Get signature status
 * @param {String} contractId - Contract ID
 * @returns {Promise<Object>} Signature status
 */
export async function getSignatureStatus(contractId) {
  try {
    const signatures = await ContractSignature.find({
      contractId,
    }).lean();

    const totalRequired = 2; // Default: tenant + landlord
    const signed = signatures.filter(s => s.status === 'signed').length;
    const pending = signatures.filter(s => s.status === 'pending').length;
    const expired = signatures.filter(s => s.status === 'expired').length;

    return {
      contractId,
      totalRequired,
      signed,
      pending,
      expired,
      complete: signed >= totalRequired,
      signatures: signatures.map(s => ({
        id: s._id,
        signer: s.signedBy?.email,
        role: s.signedBy?.role,
        status: s.status,
        signedAt: s.signedAt,
        expiresAt: s.expiresAt,
      })),
    };
  } catch (error) {
    throw new Error(`Failed to get signature status: ${error.message}`);
  }
}

/**
 * Get all pending signatures for a user
 * @param {String} userEmail - User email
 * @returns {Promise<Array>} Pending signatures
 */
export async function getPendingSignatures(userEmail) {
  try {
    const signatures = await ContractSignature.find({
      'signedBy.email': userEmail,
      status: 'pending',
    })
      .populate('contractId', 'contractNumber status')
      .sort({ expiresAt: 1 });

    return signatures;
  } catch (error) {
    throw new Error(`Failed to get pending signatures: ${error.message}`);
  }
}

/**
 * Bulk get signatures for multiple contracts
 * @param {Array<String>} contractIds - Contract IDs
 * @returns {Promise<Object>} Signature data keyed by contract ID
 */
export async function getBulkSignatureStatus(contractIds) {
  try {
    const signatures = await ContractSignature.find({
      contractId: { $in: contractIds },
    }).lean();

    const result = {};
    contractIds.forEach(id => {
      result[id] = {
        total: 0,
        signed: 0,
        pending: 0,
        signatures: [],
      };
    });

    signatures.forEach(sig => {
      const contractId = sig.contractId.toString();
      result[contractId].total++;
      if (sig.status === 'signed') {
        result[contractId].signed++;
      } else if (sig.status === 'pending') {
        result[contractId].pending++;
      }
      result[contractId].signatures.push({
        email: sig.signedBy.email,
        status: sig.status,
      });
    });

    return result;
  } catch (error) {
    throw new Error(`Failed to get bulk signature status: ${error.message}`);
  }
}

/**
 * Get signature statistics for a contract
 * @param {String} contractId - Contract ID
 * @returns {Promise<Object>} Signature statistics
 */
export async function getSignatureStats(contractId) {
  try {
    const signatures = await ContractSignature.find({ contractId });
    const auditLogs = await SignatureAudit.find({ contractId }).sort({
      timestamp: -1,
    });

    const stats = {
      contractId,
      totalSignatures: signatures.length,
      signed: signatures.filter(s => s.status === 'signed').length,
      pending: signatures.filter(s => s.status === 'pending').length,
      expired: signatures.filter(s => s.status === 'expired').length,
      cancelled: signatures.filter(s => s.status === 'cancelled').length,
      averageSigningTime: calculateAverageSigningTime(signatures),
      lastActivity: auditLogs[0]?.timestamp || null,
      auditLogCount: auditLogs.length,
    };

    return stats;
  } catch (error) {
    throw new Error(`Failed to get signature stats: ${error.message}`);
  }
}
