import crypto from 'crypto';
import ContractSignature from '../../models/ContractSignature.js';
import { createAuditLog } from './signatureAudit.js';

/**
 * Validate signing request hasn't expired
 * @param {String} signatureId - Signature ID
 * @returns {Promise<boolean>} Whether request is still valid
 */
export async function isSigningRequestValid(signatureId) {
  try {
    const signature = await ContractSignature.findById(signatureId);
    if (!signature) return false;
    if (signature.status !== 'pending') return false;
    if (new Date() > signature.expiresAt) {
      signature.status = 'expired';
      await signature.save();
      return false;
    }
    return true;
  } catch (error) {
    console.error('Signing request validation error:', error);
    return false;
  }
}

/**
 * Create new signature request
 * @param {Object} signatureData - Signature request data
 * @returns {Promise<Object>} Created signature request
 */
export async function createSignatureRequest(signatureData) {
  try {
    const {
      contractId,
      signerEmail,
      signerRole,
      signerName,
      signerPhone,
      signatureType = 'digital',
    } = signatureData;

    const existingSignature = await ContractSignature.findOne({
      contractId,
      'signedBy.email': signerEmail,
    });

    if (existingSignature && existingSignature.status === 'signed') {
      throw new Error('This contract has already been signed by this user');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const signature = new ContractSignature({
      contractId,
      signedBy: {
        email: signerEmail,
        name: signerName,
        phone: signerPhone,
        role: signerRole,
      },
      token,
      expiresAt,
      signatureType,
      status: 'pending',
    });

    await signature.save();

    await createAuditLog(contractId, signerEmail, 'request_created', {
      signatureId: signature._id,
      expiresAt,
    });

    return {
      signatureId: signature._id,
      token,
      signingLink: `/contracts/sign/${contractId}/${token}`,
      expiresAt,
    };
  } catch (error) {
    throw new Error(`Failed to create signature request: ${error.message}`);
  }
}

/**
 * Verify signature token is valid
 * @param {String} contractId - Contract ID
 * @param {String} token - Signature token
 * @returns {Promise<Object>} Token data if valid
 */
export async function verifySignatureToken(contractId, token) {
  try {
    const signature = await ContractSignature.findOne({
      contractId,
      token,
    });

    if (!signature) {
      throw new Error('Invalid signature token');
    }

    if (signature.status === 'expired') {
      throw new Error('Signature request has expired');
    }

    if (signature.status === 'signed') {
      throw new Error('Contract has already been signed by this party');
    }

    if (new Date() > signature.expiresAt) {
      signature.status = 'expired';
      await signature.save();
      throw new Error('Signature request has expired');
    }

    // Check rate limiting (max 10 signature page views per hour)
    const recentViews = signature.pageViews || [];
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = recentViews.filter(view => new Date(view) > oneHourAgo).length;

    if (recentCount > 10) {
      throw new Error('Too many signature requests. Please try again later.');
    }

    signature.pageViews = [...recentViews, new Date()];
    await signature.save();

    return {
      signatureId: signature._id,
      contractId,
      signerEmail: signature.signedBy.email,
      signerName: signature.signedBy.name,
      signerRole: signature.signedBy.role,
      expiresAt: signature.expiresAt,
    };
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
}

/**
 * Resend signing request
 * @param {String} signatureId - Signature ID
 * @returns {Promise<Object>} Updated signature request
 */
export async function resendSigningRequest(signatureId) {
  try {
    const signature = await ContractSignature.findById(signatureId);
    if (!signature) {
      throw new Error('Signature not found');
    }

    const newToken = crypto.randomBytes(32).toString('hex');
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    signature.token = newToken;
    signature.expiresAt = newExpiresAt;
    signature.pageViews = [];
    await signature.save();

    await createAuditLog(signature.contractId, 'system', 'request_resent', {
      signatureId,
      expiresAt: newExpiresAt,
    });

    return {
      signatureId: signature._id,
      token: newToken,
      signingLink: `/contracts/sign/${signature.contractId}/${newToken}`,
      expiresAt: newExpiresAt,
    };
  } catch (error) {
    throw new Error(`Failed to resend signing request: ${error.message}`);
  }
}

/**
 * Cancel signature request
 * @param {String} signatureId - Signature ID
 * @returns {Promise<Object>} Cancelled signature
 */
export async function cancelSignatureRequest(signatureId) {
  try {
    const signature = await ContractSignature.findByIdAndUpdate(
      signatureId,
      { status: 'cancelled', cancelledAt: new Date() },
      { new: true }
    );

    if (!signature) {
      throw new Error('Signature not found');
    }

    await createAuditLog(signature.contractId, 'system', 'request_cancelled', {
      signatureId,
    });

    return signature;
  } catch (error) {
    throw new Error(`Failed to cancel signature request: ${error.message}`);
  }
}

/**
 * Batch create signature requests
 * @param {String} contractId - Contract ID
 * @param {Array} signerList - List of signers
 * @returns {Promise<Array>} Created signature requests
 */
export async function createBatchSignatureRequests(contractId, signerList) {
  try {
    const requests = [];

    for (const signer of signerList) {
      const request = await createSignatureRequest({
        contractId,
        signerEmail: signer.email,
        signerRole: signer.role,
        signerName: signer.name,
        signerPhone: signer.phone,
      });
      requests.push(request);
    }

    await createAuditLog(contractId, 'system', 'batch_requests_created', {
      count: requests.length,
    });

    return requests;
  } catch (error) {
    throw new Error(`Failed to create batch signature requests: ${error.message}`);
  }
}
