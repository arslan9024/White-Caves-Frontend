import crypto from 'crypto';
import ContractSignature from '../../models/ContractSignature.js';
import Contract from '../../models/Contract.js';
import { detectPlatform, detectBrowser } from './signatureHelpers.js';
import { createAuditLog } from './signatureAudit.js';

/**
 * Record signature
 * @param {String} contractId - Contract ID
 * @param {String} signatureId - Signature ID
 * @param {Object} signatureData - Signature image and metadata
 * @returns {Promise<Object>} Recorded signature
 */
export async function recordSignature(contractId, signatureId, signatureData) {
  try {
    const signature = await ContractSignature.findById(signatureId);
    if (!signature) {
      throw new Error('Signature record not found');
    }

    if (new Date() > signature.expiresAt) {
      signature.status = 'expired';
      await signature.save();
      throw new Error('Signature request expired');
    }

    const hash = crypto.createHash('sha256').update(signatureData.imageData).digest('hex');

    const userAgent = signatureData.deviceInfo?.userAgent || 'Unknown';
    const platform = detectPlatform(userAgent);
    const browser = detectBrowser(userAgent);

    signature.signatureData = {
      imageData: signatureData.imageData,
      mimeType: signatureData.mimeType || 'image/png',
      hash,
    };
    signature.deviceInfo = {
      ipAddress: signatureData.deviceInfo?.ipAddress,
      userAgent,
      platform,
      browser,
    };
    signature.method = signatureData.method || 'canvas';
    signature.status = 'signed';
    signature.signedAt = new Date();

    await signature.save();

    return signature;
  } catch (error) {
    throw new Error(`Failed to record signature: ${error.message}`);
  }
}

/**
 * Check if all required signatures are collected
 * @param {String} contractId - Contract ID
 * @returns {Promise<boolean>} True if all signatures collected
 */
export async function checkContractSignatureCompletion(contractId) {
  try {
    const contract = await Contract.findById(contractId);
    if (!contract) throw new Error('Contract not found');

    const signatures = await ContractSignature.find({
      contractId,
      status: 'signed',
    });

    const requiredRoles = contract.requiredSignatures || ['tenant', 'landlord'];
    const signedRoles = signatures.map(s => s.signedBy.role);

    const allSigned = requiredRoles.every(role => signedRoles.includes(role));

    if (allSigned) {
      contract.signatureStatus = 'complete';
      contract.fullySignedAt = new Date();
      contract.status = 'executed';
      await contract.save();

      await createAuditLog(contractId, 'system', 'all_signatures_complete', {
        signedAt: new Date(),
      });

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking signature completion:', error);
    return false;
  }
}

/**
 * Save signature data
 * @param {String} signatureId - Signature ID
 * @param {Object} signatureData - Signature image and metadata
 * @returns {Promise<Object>} Saved signature
 */
export async function saveSignature(signatureId, signatureData) {
  try {
    const signature = await ContractSignature.findById(signatureId);
    if (!signature) {
      throw new Error('Signature request not found');
    }

    if (signature.status !== 'pending') {
      throw new Error(`Cannot sign: status is ${signature.status}`);
    }

    if (new Date() > signature.expiresAt) {
      signature.status = 'expired';
      await signature.save();
      throw new Error('Signature request has expired');
    }

    const hash = crypto.createHash('sha256').update(signatureData.imageData).digest('hex');

    const userAgent = signatureData.deviceInfo?.userAgent || 'Unknown';
    const platform = detectPlatform(userAgent);
    const browser = detectBrowser(userAgent);

    signature.signatureData = {
      imageData: signatureData.imageData,
      mimeType: signatureData.mimeType || 'image/png',
      hash,
      coordinates: signatureData.coordinates || null,
    };
    signature.deviceInfo = {
      ipAddress: signatureData.deviceInfo?.ipAddress,
      userAgent,
      platform,
      browser,
      timestamp: new Date(),
    };
    signature.method = signatureData.method || 'canvas';
    signature.status = 'signed';
    signature.signedAt = new Date();

    await signature.save();

    await createAuditLog(signature.contractId, signature.signedBy.email, 'signed', {
      signatureId,
      method: signature.method,
      platform,
      browser,
    });

    await checkContractSignatureCompletion(signature.contractId);

    return signature;
  } catch (error) {
    throw new Error(`Failed to save signature: ${error.message}`);
  }
}
