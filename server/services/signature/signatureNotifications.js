import ContractSignature from '../../models/ContractSignature.js';
import { createAuditLog } from './signatureAudit.js';

/**
 * Send signature reminder email
 * @param {String} signatureId - Signature ID
 * @returns {Promise<boolean>} True if sent successfully
 */
export async function sendSignatureReminder(signatureId) {
  try {
    const signature = await ContractSignature.findById(signatureId).populate('contractId');
    if (!signature) {
      throw new Error('Signature not found');
    }

    const { sendEmailTracked, wrapInBrandedTemplate } = await import('../emailService.js');
    const signingLink = `/sign/${signature.contractId._id}/${signature.token}`;
    const html = wrapInBrandedTemplate(
      `
        <h2>Signature Reminder</h2>
        <p>Dear ${signature.signedBy.name || 'Valued Client'}, your contract signature is still pending.</p>
        <p>Please sign contract <strong>${signature.contractId.contractNumber || signature.contractId._id}</strong> using the secure link below.</p>
        <p><a class="cta" href="${signingLink}">Review & Sign Contract</a></p>
        <p>This link expires on: ${signature.expiresAt.toLocaleString()}</p>
      `,
      { preheader: 'Your White Caves contract signature is still pending' }
    );

    await sendEmailTracked({
      to: signature.signedBy.email,
      subject: `Reminder: Contract signature pending (${signature.contractId.contractNumber || signature.contractId._id})`,
      html,
      text: `Dear ${signature.signedBy.name || 'Valued Client'}, your contract signature is still pending. Review and sign: ${signingLink}`,
      tags: [
        { name: 'type', value: 'contract_signature_reminder' },
        { name: 'contractId', value: String(signature.contractId._id) },
      ],
    });

    return true;
  } catch (error) {
    throw new Error(`Failed to send reminder: ${error.message}`);
  }
}

/**
 * Send signing notification
 * @param {String} signatureId - Signature ID
 * @param {String} signingLink - Link to signing page
 * @returns {Promise<boolean>} True if sent successfully
 */
export async function sendSigningNotification(signatureId, signingLink) {
  try {
    const signature = await ContractSignature.findById(signatureId).populate('contractId');
    if (!signature) {
      throw new Error('Signature not found');
    }

    const { sendEmailTracked, wrapInBrandedTemplate } = await import('../emailService.js');
    const contractLabel = signature.contractId.contractNumber || signature.contractId._id;
    const html = wrapInBrandedTemplate(
      `
        <h2>Signature Request Ready</h2>
        <p>Dear ${signature.signedBy.name || 'Valued Client'}, your signature is requested for contract <strong>${contractLabel}</strong>.</p>
        <p>Open the secure signing link below to review and sign the document.</p>
        <p><a class="cta" href="${signingLink}">Review & Sign Contract</a></p>
        <p>This link expires on: ${signature.expiresAt.toLocaleString()}</p>
      `,
      { preheader: 'Your White Caves contract signature request is ready' }
    );

    await sendEmailTracked({
      to: signature.signedBy.email,
      subject: `Signature Request: Contract ${contractLabel}`,
      html,
      text: `Dear ${signature.signedBy.name || 'Valued Client'}, please review and sign contract ${contractLabel}: ${signingLink}`,
      tags: [
        { name: 'type', value: 'contract_signature_request' },
        { name: 'contractId', value: String(signature.contractId._id) },
      ],
    });

    await createAuditLog(signature.contractId._id, 'system', 'notification_sent', {
      email: signature.signedBy.email,
    });

    return true;
  } catch (error) {
    console.error('Failed to send signing notification:', error);
    return false;
  }
}
