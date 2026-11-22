import SignatureAudit from '../../models/SignatureAudit.js';

/**
 * Create audit log entry
 * @param {String} contractId - Contract ID
 * @param {String} actor - Who performed the action
 * @param {String} action - Action performed
 * @param {Object} details - Additional details
 * @returns {Promise<Object>} Created audit log
 */
export async function createAuditLog(contractId, actor, action, details = {}) {
  try {
    const auditLog = new SignatureAudit({
      contractId,
      actor,
      action,
      details,
      timestamp: new Date(),
    });

    await auditLog.save();
    return auditLog;
  } catch (error) {
    console.error('Error creating audit log:', error);
    // Don't throw to prevent blocking the main operation
  }
}

/**
 * Get contract audit trail
 * @param {String} contractId - Contract ID
 * @returns {Promise<Array>} Audit log entries
 */
export async function getAuditTrail(contractId) {
  try {
    const auditLogs = await SignatureAudit.find({ contractId }).sort({ timestamp: -1 }).lean();

    return auditLogs;
  } catch (error) {
    throw new Error(`Failed to get audit trail: ${error.message}`);
  }
}
