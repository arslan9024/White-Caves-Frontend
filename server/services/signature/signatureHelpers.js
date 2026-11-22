import crypto from 'crypto';

/**
 * Validate signature authenticity
 * @param {Object} signatureData - Signature data to validate
 * @returns {boolean} Whether signature is valid
 */
export function validateSignature(signatureData) {
  try {
    if (!signatureData.imageData || !signatureData.hash) {
      return false;
    }

    const calculatedHash = crypto
      .createHash('sha256')
      .update(signatureData.imageData)
      .digest('hex');

    return calculatedHash === signatureData.hash;
  } catch (error) {
    console.error('Signature validation error:', error);
    return false;
  }
}

/**
 * Generate signing token
 * @param {String} contractId - Contract ID
 * @param {Object} signer - Signer information
 * @returns {Object} Token and signing data
 */
export function generateSignatureToken(contractId, signer) {
  try {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const signingLink = `/sign/${contractId}/${token}`;

    return {
      token,
      signingLink,
      expiresAt,
      contractId,
      signer,
    };
  } catch (error) {
    throw new Error(`Failed to generate signature token: ${error.message}`);
  }
}

/**
 * Detect platform from user agent
 * @param {String} userAgent - User agent string
 * @returns {String} Platform name
 */
export function detectPlatform(userAgent) {
  if (!userAgent) return 'Unknown';
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('Linux')) return 'Linux';
  return 'Unknown';
}

/**
 * Detect browser from user agent
 * @param {String} userAgent - User agent string
 * @returns {String} Browser name
 */
export function detectBrowser(userAgent) {
  if (!userAgent) return 'Unknown';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
}

/**
 * Calculate average time to sign
 * @param {Array} signatures - Signature records
 * @returns {String} Human-readable average signing time
 */
export function calculateAverageSigningTime(signatures) {
  const signedSignatures = signatures.filter(s => s.status === 'signed');
  if (signedSignatures.length === 0) return 'N/A';

  const totalTime = signedSignatures.reduce((sum, sig) => {
    const created = new Date(sig.createdAt);
    const signed = new Date(sig.signedAt);
    return sum + (signed - created);
  }, 0);

  const avgMs = totalTime / signedSignatures.length;
  const hours = Math.floor(avgMs / (1000 * 60 * 60));
  const minutes = Math.floor((avgMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
