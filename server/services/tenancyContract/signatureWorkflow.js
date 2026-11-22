import crypto from 'crypto';
import TenancyContract from '../../models/TenancyContract.js';
import NotificationService from '../NotificationService.js';
import { addContractAuditEntry } from './validation.js';

/**
 * Get signature email template
 */
export function getSignatureEmailTemplate(party, contract, signUrl) {
  return `
      <h2>Tenancy Agreement Signature Request</h2>
      <p>Dear ${party},</p>
      <p>You have been requested to sign the tenancy agreement for the following property:</p>
      <ul>
        <li><strong>Property:</strong> ${contract.propertyInfo?.description}</li>
        <li><strong>Address:</strong> ${contract.propertyInfo?.address}</li>
        <li><strong>Lease Period:</strong> ${new Date(contract.tenancyTerms?.leaseStartDate).toLocaleDateString()} to ${new Date(contract.tenancyTerms?.leaseEndDate).toLocaleDateString()}</li>
        <li><strong>Monthly Rent:</strong> AED ${contract.tenancyTerms?.rentAmount}</li>
        <li><strong>Contract Reference:</strong> ${contract.referenceNumber}</li>
      </ul>
      <p>Please click the link below to review and sign the agreement:</p>
      <a href="${signUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Sign Agreement</a>
      <p>This link will expire in 7 days.</p>
      <p>Best regards,<br>White Caves</p>
    `;
}

/**
 * Notify both parties when contract is fully signed
 */
export async function notifyFullySignedContract(contract) {
  try {
    const message = `Tenancy agreement ${contract.referenceNumber} has been fully signed by both parties. The contract is now official.`;

    // Email to landlord
    if (contract.landlordInfo?.email) {
      await NotificationService.sendEmail(
        contract.landlordInfo?.email,
        'Tenancy Agreement Signed',
        `<p>Dear ${contract.landlordInfo?.name},</p><p>${message}</p><p>Contract Reference: ${contract.referenceNumber}</p>`
      );
    }

    // Email to tenant
    if (contract.tenantInfo?.email) {
      await NotificationService.sendEmail(
        contract.tenantInfo?.email,
        'Tenancy Agreement Signed',
        `<p>Dear ${contract.tenantInfo?.name},</p><p>${message}</p><p>Contract Reference: ${contract.referenceNumber}</p>`
      );
    }

    // WhatsApp notifications
    if (contract.landlordInfo?.mobileNumber) {
      await NotificationService.sendWhatsApp(contract.landlordInfo?.mobileNumber, `${message}`);
    }

    if (contract.tenantInfo?.mobileNumber) {
      await NotificationService.sendWhatsApp(contract.tenantInfo?.mobileNumber, `${message}`);
    }
  } catch (error) {
    console.error('Error notifying parties:', error);
  }
}

/**
 * Request signatures from landlord and tenant
 */
export async function requestContractSignatures(contractId, agentId, deps = {}) {
  const {
    buildEmailTemplate = getSignatureEmailTemplate,
    addAuditEntry = addContractAuditEntry
  } = deps;

  try {
    const contract = await TenancyContract.findById(contractId);
    if (!contract) throw new Error('Contract not found');

    if (!contract.pdfDocument?.pdfUrl) {
      throw new Error('PDF must be generated before requesting signatures');
    }

    // Generate unique tokens for each party
    const landlordToken = crypto.randomBytes(32).toString('hex');
    const tenantToken = crypto.randomBytes(32).toString('hex');

    // Store tokens in database
    contract.signatures.landlordSignature.signatureToken = landlordToken;
    contract.signatures.tenantSignature.signatureToken = tenantToken;
    contract.status = 'AwaitingSignatures';

    await contract.save();

    // Send signature request emails
    const signatureBaseUrl = process.env.BASE_URL || 'http://localhost:5173';
    const landlordSignUrl = `${signatureBaseUrl}/tenancy-sign/${landlordToken}`;
    const tenantSignUrl = `${signatureBaseUrl}/tenancy-sign/${tenantToken}`;

    // Notify landlord
    await NotificationService.sendEmail(
      contract.landlordInfo?.email,
      'Tenancy Agreement Signature Required',
      buildEmailTemplate('Landlord', contract, landlordSignUrl)
    );

    // Notify tenant
    await NotificationService.sendEmail(
      contract.tenantInfo?.email,
      'Tenancy Agreement Signature Required',
      buildEmailTemplate('Tenant', contract, tenantSignUrl)
    );

    // Also send via WhatsApp if phone available
    if (contract.landlordInfo?.mobileNumber) {
      await NotificationService.sendWhatsApp(
        contract.landlordInfo.mobileNumber,
        `Dear ${contract.landlordInfo?.name}, please sign your tenancy agreement here: ${landlordSignUrl}`
      );
    }

    if (contract.tenantInfo?.mobileNumber) {
      await NotificationService.sendWhatsApp(
        contract.tenantInfo.mobileNumber,
        `Dear ${contract.tenantInfo?.name}, please sign your tenancy agreement here: ${tenantSignUrl}`
      );
    }

    await addAuditEntry(contractId, 'Signature Requests Sent', agentId, 'Signature links sent to both parties', '');

    return {
      success: true,
      message: 'Signature requests sent successfully',
      landlordSignUrl,
      tenantSignUrl
    };
  } catch (error) {
    throw new Error(`Error requesting signatures: ${error.message}`);
  }
}

/**
 * Record signature from landlord or tenant
 */
export async function recordContractSignature(token, signatureData, ipAddress, userAgent, deps = {}) {
  const { notifyFullySigned = notifyFullySignedContract } = deps;

  try {
    const contract = await TenancyContract.findOne({
      $or: [
        { 'signatures.landlordSignature.signatureToken': token },
        { 'signatures.tenantSignature.signatureToken': token }
      ]
    });

    if (!contract) throw new Error('Invalid signature token');

    // Determine if this is landlord or tenant signature
    const isLandlord = contract.signatures.landlordSignature.signatureToken === token;

    if (isLandlord) {
      if (contract.signatures.landlordSignature.signed) {
        throw new Error('Landlord has already signed this contract');
      }
      contract.signatures.landlordSignature.signed = true;
      contract.signatures.landlordSignature.signedAt = new Date();
      contract.signatures.landlordSignature.signatureData = signatureData;
      contract.signatures.landlordSignature.ipAddress = ipAddress;
      contract.signatures.landlordSignature.userAgent = userAgent;
    } else {
      if (contract.signatures.tenantSignature.signed) {
        throw new Error('Tenant has already signed this contract');
      }
      contract.signatures.tenantSignature.signed = true;
      contract.signatures.tenantSignature.signedAt = new Date();
      contract.signatures.tenantSignature.signatureData = signatureData;
      contract.signatures.tenantSignature.ipAddress = ipAddress;
      contract.signatures.tenantSignature.userAgent = userAgent;
    }

    // Update contract status
    if (contract.isFullySigned()) {
      contract.status = 'FullySigned';
    } else {
      contract.status = 'PartiallySignedSignatures';
    }

    await contract.save();

    // Clear the token
    if (isLandlord) {
      contract.signatures.landlordSignature.signatureToken = null;
    } else {
      contract.signatures.tenantSignature.signatureToken = null;
    }
    await contract.save();

    // Send confirmation to both parties if both signed
    if (contract.isFullySigned()) {
      await notifyFullySigned(contract);
    }

    return {
      success: true,
      message: `${isLandlord ? 'Landlord' : 'Tenant'} signature recorded successfully`,
      fullySignedStatus: contract.isFullySigned()
    };
  } catch (error) {
    throw new Error(`Error recording signature: ${error.message}`);
  }
}

/**
 * Get contract for signing
 */
export async function getContractForSigningByToken(token) {
  try {
    const contract = await TenancyContract.findOne({
      $or: [
        { 'signatures.landlordSignature.signatureToken': token },
        { 'signatures.tenantSignature.signatureToken': token }
      ]
    });

    if (!contract) throw new Error('Invalid or expired signature link');

    // Determine party type
    const isLandlord = contract.signatures.landlordSignature.signatureToken === token;

    return {
      contractId: contract._id,
      referenceNumber: contract.referenceNumber,
      pdfUrl: contract.pdfDocument?.pdfUrl,
      propertyDescription: contract.propertyInfo?.description,
      partyType: isLandlord ? 'Landlord' : 'Tenant',
      partyName: isLandlord ? contract.landlordInfo?.name : contract.tenantInfo?.name,
      leaseStart: contract.tenancyTerms?.leaseStartDate,
      leaseEnd: contract.tenancyTerms?.leaseEndDate,
      rentAmount: contract.tenancyTerms?.rentAmount
    };
  } catch (error) {
    throw new Error(`Error retrieving contract: ${error.message}`);
  }
}
