import PDFDocument from 'pdfkit';
import * as pdfLib from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import admin from 'firebase-admin';
import TenancyContract from '../../models/TenancyContract.js';
import { addContractAuditEntry, validateContractFormData } from './validation.js';

/**
 * Create PDF from scratch (when no template available)
 */
export async function createPDFFromScratch(contract) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header
      doc.fontSize(20).text('TENANCY AGREEMENT', { align: 'center' });
      doc.fontSize(12).text(`Reference: ${contract.referenceNumber}`, { align: 'center' });
      doc.moveDown();

      // Property Section
      doc.fontSize(14).text('PROPERTY INFORMATION', { underline: true });
      doc.fontSize(10);
      doc.text(`Description: ${contract.propertyInfo?.description || 'N/A'}`);
      doc.text(`Address: ${contract.propertyInfo?.address || 'N/A'}`);
      doc.text(`City: ${contract.propertyInfo?.city || 'N/A'}`);
      doc.text(`Area: ${contract.propertyInfo?.unitArea || 'N/A'} sq.ft.`);
      doc.text(`Type: ${contract.propertyInfo?.propertyType || 'N/A'}`);
      doc.moveDown();

      // Landlord Section
      doc.fontSize(14).text('LANDLORD INFORMATION', { underline: true });
      doc.fontSize(10);
      doc.text(`Name: ${contract.landlordInfo?.name || 'N/A'}`);
      doc.text(`ID: ${contract.landlordInfo?.emiratesId || contract.landlordInfo?.passportNumber || 'N/A'}`);
      doc.text(`Email: ${contract.landlordInfo?.email || 'N/A'}`);
      doc.text(`Phone: ${contract.landlordInfo?.phone || 'N/A'}`);
      doc.moveDown();

      // Tenant Section
      doc.fontSize(14).text('TENANT INFORMATION', { underline: true });
      doc.fontSize(10);
      doc.text(`Name: ${contract.tenantInfo?.name || 'N/A'}`);
      doc.text(`ID: ${contract.tenantInfo?.emiratesId || contract.tenantInfo?.passportNumber || 'N/A'}`);
      doc.text(`Email: ${contract.tenantInfo?.email || 'N/A'}`);
      doc.text(`Phone: ${contract.tenantInfo?.phone || 'N/A'}`);
      doc.moveDown();

      // Tenancy Terms
      doc.fontSize(14).text('TENANCY TERMS', { underline: true });
      doc.fontSize(10);
      const startDate = contract.tenancyTerms?.leaseStartDate
        ? new Date(contract.tenancyTerms.leaseStartDate).toLocaleDateString()
        : 'N/A';
      const endDate = contract.tenancyTerms?.leaseEndDate
        ? new Date(contract.tenancyTerms.leaseEndDate).toLocaleDateString()
        : 'N/A';
      doc.text(`Lease Period: ${startDate} to ${endDate}`);
      doc.text(`Duration: ${contract.tenancyTerms?.leasePeriodMonths || 'N/A'} months`);
      doc.text(`Monthly Rent: AED ${contract.tenancyTerms?.rentAmount || 'N/A'}`);
      doc.text(`Security Deposit: AED ${contract.tenancyTerms?.securityDeposit || 'N/A'}`);
      doc.text(`Payment Method: ${contract.tenancyTerms?.paymentMethod || 'N/A'}`);
      doc.moveDown();

      // Signature section
      doc.fontSize(14).text('SIGNATURES', { underline: true });
      doc.fontSize(10).moveDown();
      doc.text('Landlord Signature: ___________________     Date: ___________');
      doc.moveDown();
      doc.text('Tenant Signature: ___________________     Date: ___________');

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Fill EJARI template with form data
 */
export async function fillEJARITemplate(templatePath, contract, fallbackGenerator = createPDFFromScratch) {
  try {
    const existingPdfBytes = fs.readFileSync(templatePath);
    const pdfDoc = await pdfLib.PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // Map contract data to PDF fields
    // These field names should match your EJARI template
    const fieldMappings = {
      // Property fields
      property_description: contract.propertyInfo?.description,
      property_address: contract.propertyInfo?.address,
      property_city: contract.propertyInfo?.city,
      property_area: contract.propertyInfo?.unitArea?.toString(),
      property_type: contract.propertyInfo?.propertyType,

      // Landlord fields
      landlord_name: contract.landlordInfo?.name,
      landlord_id: contract.landlordInfo?.emiratesId || contract.landlordInfo?.passportNumber,
      landlord_email: contract.landlordInfo?.email,
      landlord_phone: contract.landlordInfo?.phone,

      // Tenant fields
      tenant_name: contract.tenantInfo?.name,
      tenant_id: contract.tenantInfo?.emiratesId || contract.tenantInfo?.passportNumber,
      tenant_email: contract.tenantInfo?.email,
      tenant_phone: contract.tenantInfo?.phone,

      // Terms fields
      lease_start_date: contract.tenancyTerms?.leaseStartDate?.toLocaleDateString(),
      lease_end_date: contract.tenancyTerms?.leaseEndDate?.toLocaleDateString(),
      rent_amount: contract.tenancyTerms?.rentAmount?.toString(),
      security_deposit: contract.tenancyTerms?.securityDeposit?.toString()
    };

    // Fill form fields
    Object.entries(fieldMappings).forEach(([fieldName, value]) => {
      try {
        const field = form.getField(fieldName);
        if (field && value) {
          field.setText(String(value));
        }
      } catch {
        // Field might not exist in template, skip
      }
    });

    // Flatten form (make it non-editable)
    form.flatten();

    // Save to buffer
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('Error filling EJARI template:', error);
    // Fall back to creating from scratch
    return fallbackGenerator(contract);
  }
}

/**
 * Upload PDF to Firebase Storage
 */
export async function uploadPdfToFirebase(pdfBuffer, fileName) {
  try {
    const bucket = admin.storage().bucket();
    const file = bucket.file(fileName);

    await file.save(pdfBuffer, {
      metadata: {
        contentType: 'application/pdf'
      }
    });

    // Get public URL
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000 // 1 year
    });

    return url;
  } catch (error) {
    throw new Error(`Error uploading to Firebase: ${error.message}`);
  }
}

/**
 * Generate PDF from EJARI template
 */
export async function generateContractPDF(contractId, agentId, deps = {}) {
  const {
    validateFormData = validateContractFormData,
    createFromScratch = createPDFFromScratch,
    fillTemplate = fillEJARITemplate,
    uploadPdf = uploadPdfToFirebase,
    addAuditEntry = addContractAuditEntry,
    templatePath = path.join(__dirname, '../../templates/ejari-template.pdf')
  } = deps;

  try {
    const contract = await TenancyContract.findById(contractId);
    if (!contract) throw new Error('Contract not found');

    // Validate all required fields
    const validation = validateFormData(contract);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    // If template doesn't exist, create a new PDF from scratch
    let pdfBuffer;
    if (!fs.existsSync(templatePath)) {
      pdfBuffer = await createFromScratch(contract);
    } else {
      pdfBuffer = await fillTemplate(templatePath, contract);
    }

    // Upload to Firebase Storage
    const fileName = `tenancy-contracts/${contract.referenceNumber}-${Date.now()}.pdf`;
    const pdfUrl = await uploadPdf(pdfBuffer, fileName);

    // Calculate document hash for verification
    const documentHash = crypto.createHash('sha256').update(pdfBuffer).digest('hex');

    // Update contract with PDF information
    contract.pdfDocument = {
      generatedAt: new Date(),
      pdfUrl,
      fileName,
      fileSize: pdfBuffer.length,
      documentHash
    };
    contract.status = 'Generated';
    await contract.save();

    await addAuditEntry(contractId, 'PDF Generated', agentId, 'Contract PDF generated successfully', '');

    return {
      success: true,
      pdfUrl,
      fileName,
      contractId: contract._id,
      referenceNumber: contract.referenceNumber
    };
  } catch (error) {
    throw new Error(`Error generating PDF: ${error.message}`);
  }
}
