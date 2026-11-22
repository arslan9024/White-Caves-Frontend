const express = require('express');
const multer = require('multer');
const path = require('path');
const { verifyToken, requireRole } = require('../../../middleware/auth');
const KYCService = require('../../../services/compliance/KYCService');
const DocumentProcessingService = require('../../../services/compliance/DocumentProcessingService');
const DocumentValidationService = require('../../../services/compliance/DocumentValidationService');
const logger = require('../../../config/logger');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and GIF are supported.'));
    }
  },
});

function loadKycProfileModel() {
  return (
    require('../../../models/compliance/KYCProfile.js').default ||
    require('../../../models/compliance/KYCProfile.js')
  );
}

function loadKycService() {
  return (
    require('../../../services/compliance/KYCService.js').default ||
    require('../../../services/compliance/KYCService.js')
  );
}

router.post('/documents/verify', verifyToken, upload.single('document'), async (req, res) => {
  const { documentType, userId } = req.body;
  const documentPath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No document file provided' });
    }
    if (!documentType || !['emirates_id', 'passport', 'visa'].includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid document type. Must be emirates_id, passport, or visa',
      });
    }

    logger.info(`Processing document: ${documentType} for user ${userId}`);

    const processingResult = await DocumentProcessingService.processDocument(documentPath, documentType);
    const validationResult = await DocumentValidationService.validateDocument(
      processingResult,
      userId || req.user.id,
      documentType
    );
    const screeningResult = await DocumentValidationService.checkSanctionsAndWatchlists(processingResult);
    await DocumentProcessingService.verifyDocumentStatus(processingResult, documentType);
    const complianceReport = DocumentValidationService.generateComplianceReport(
      processingResult,
      validationResult,
      { isAuthentic: true, confidence: 0.95 },
      screeningResult
    );

    const kycUpdate = await KYCService.updateDocumentVerification(userId || req.user.id, {
      documentType,
      status: validationResult.isValid && screeningResult.isClear ? 'verified' : 'pending_review',
      ocrConfidence: Math.round(processingResult.confidence),
      extractedData: processingResult.parsedData.extractedFields,
      validationResult,
      complianceReport,
      uploadedAt: new Date(),
      uploadedBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: 'Document verified successfully',
      data: {
        documentId: kycUpdate._id,
        processingResult: {
          confidence: processingResult.confidence,
          extractedFields: processingResult.parsedData.extractedFields,
        },
        validation: validationResult,
        screening: screeningResult,
        compliance: complianceReport,
        status: kycUpdate.documents[kycUpdate.documents.length - 1].status,
      },
    });
  } catch (error) {
    logger.error(`Document verification error: ${error.message}`, error);
    res.status(500).json({ success: false, message: error.message || 'Failed to verify document' });
  }
});

router.get('/documents/:documentId/status', verifyToken, async (req, res) => {
  try {
    const { documentId } = req.params;
    const KYCProfile = loadKycProfileModel();
    const profile = await KYCProfile.findOne({ 'documents._id': documentId }).select('documents');

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    const document = profile.documents.find(d => d._id.toString() === documentId);
    res.json({
      success: true,
      data: {
        documentId,
        type: document.type,
        status: document.status,
        verifiedAt: document.verifiedAt,
        verifiedBy: document.verifiedBy,
        ocrConfidence: document.ocrConfidence,
        extractedData: document.extractedData,
        validation: document.validation,
        rejectionReason: document.rejectionReason,
      },
    });
  } catch (error) {
    logger.error(`Error fetching document status: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post(
  '/documents/:documentId/approve',
  verifyToken,
  requireRole(['admin', 'compliance_officer']),
  async (req, res) => {
    try {
      const { documentId } = req.params;
      const { comments } = req.body;
      const KYCProfile = loadKycProfileModel();

      const profile = await KYCProfile.findOneAndUpdate(
        { 'documents._id': documentId },
        {
          $set: {
            'documents.$.status': 'verified',
            'documents.$.verifiedAt': new Date(),
            'documents.$.verifiedBy': req.user.id,
            'documents.$.verificationComments': comments,
          },
        },
        { new: true }
      );

      if (!profile) {
        return res.status(404).json({ success: false, message: 'Document not found' });
      }
      res.json({ success: true, message: 'Document approved successfully', data: profile });
    } catch (error) {
      logger.error(`Error approving document: ${error.message}`);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.post(
  '/documents/:documentId/reject',
  verifyToken,
  requireRole(['admin', 'compliance_officer']),
  async (req, res) => {
    try {
      const { documentId } = req.params;
      const { reason } = req.body;
      const KYCProfile = loadKycProfileModel();

      const profile = await KYCProfile.findOneAndUpdate(
        { 'documents._id': documentId },
        {
          $set: {
            'documents.$.status': 'rejected',
            'documents.$.rejectedAt': new Date(),
            'documents.$.rejectedBy': req.user.id,
            'documents.$.rejectionReason': reason,
          },
        },
        { new: true }
      );

      if (!profile) {
        return res.status(404).json({ success: false, message: 'Document not found' });
      }
      res.json({ success: true, message: 'Document rejected', data: profile });
    } catch (error) {
      logger.error(`Error rejecting document: ${error.message}`);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.post('/documents/process', verifyToken, requireRole(['admin', 'compliance_officer']), async (req, res) => {
  try {
    const { customerId, documentType, filePath } = req.body;
    if (!customerId || !documentType || !filePath) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: customerId, documentType, filePath',
      });
    }
    const kycSvc = loadKycService();
    const result = await kycSvc.processDocumentWithOCR(customerId, documentType, filePath);
    logger.info(`Document processed successfully for ${customerId}: ${documentType}`);
    res.json({ success: true, message: 'Document processed successfully', data: result });
  } catch (error) {
    logger.error(`Error processing document: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/documents/validate', verifyToken, requireRole(['admin', 'compliance_officer']), async (req, res) => {
  try {
    const { documentType, extractedData } = req.body;
    if (!documentType || !extractedData) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: documentType, extractedData',
      });
    }
    const kycSvc = loadKycService();
    const validation = kycSvc.validateExtractedData(documentType, extractedData);
    res.json({ success: true, message: 'Validation completed', data: validation });
  } catch (error) {
    logger.error(`Error validating document data: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get(
  '/documents/customer/:customerId',
  verifyToken,
  requireRole(['admin', 'compliance_officer', 'sales']),
  async (req, res) => {
    try {
      const { customerId } = req.params;
      const KYCProfile = loadKycProfileModel();
      const profile = await KYCProfile.findOne({ customerId }).select('documents personalInfo');
      if (!profile) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
      res.json({
        success: true,
        data: { customerId, documents: profile.documents, personalInfo: profile.personalInfo },
      });
    } catch (error) {
      logger.error(`Error fetching customer documents: ${error.message}`);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
