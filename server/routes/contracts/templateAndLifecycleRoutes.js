import express from 'express';
import ContractService from '../../services/ContractService.js';
import TemplateEngine from '../../services/TemplateEngine.js';

const router = express.Router();

// POST /api/contracts/from-template
// Create a contract from a template
router.post('/from-template', async (req, res) => {
  try {
    const { templateId, templateData, partyData } = req.body;

    if (!templateId || !templateData || !partyData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: templateId, templateData, partyData',
      });
    }

    const contract = await ContractService.createFromTemplate(templateId, templateData, partyData);

    res.status(201).json({
      success: true,
      contractId: contract._id,
      contractNumber: contract.contractNumber,
      status: contract.status,
      message: 'Contract created from template',
    });
  } catch (error) {
    console.error('Error creating contract from template:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create contract',
    });
  }
});

// POST /api/contracts/:id/generate-pdf
// Generate PDF for a contract
router.post('/:id/generate-pdf', async (req, res) => {
  try {
    const { id } = req.params;

    const pdfBytes = await ContractService.generatePDF(id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="contract-${id}.pdf"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate PDF',
    });
  }
});

// POST /api/contracts/:id/archive
// Archive/finalize a contract
router.post('/:id/archive', async (req, res) => {
  try {
    const { id } = req.params;

    const contract = await ContractService.archiveContract(id);

    res.json({
      success: true,
      contractId: contract._id,
      status: contract.status,
      executionDate: contract.executionDate,
      message: 'Contract archived and finalized',
    });
  } catch (error) {
    console.error('Error archiving contract:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to archive contract',
    });
  }
});

// GET /api/contracts/:id/details
// Get contract with all details
router.get('/:id/details', async (req, res) => {
  try {
    const { id } = req.params;

    const details = await ContractService.getContractDetails(id);

    res.json({
      success: true,
      data: details,
    });
  } catch (error) {
    console.error('Error getting contract details:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get contract details',
    });
  }
});

// GET /api/contracts/:id/versions
// Get contract version history
router.get('/:id/versions', async (req, res) => {
  try {
    const { id } = req.params;

    const versions = await ContractService.getContractVersions(id);

    res.json({
      success: true,
      data: versions,
      count: versions.length,
    });
  } catch (error) {
    console.error('Error getting contract versions:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get versions',
    });
  }
});

// POST /api/contracts/from-template/validate
// Validate template data before creating contract
router.post('/from-template/validate', async (req, res) => {
  try {
    const { templateId, data } = req.body;

    if (!templateId || !data) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: templateId, data',
      });
    }

    const result = await TemplateEngine.createWithValidation(templateId, data);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error validating template:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Template validation failed',
    });
  }
});

// GET /api/contract-templates
// List available templates
router.get('/', async (req, res) => {
  try {
    const templates = await TemplateEngine.getAvailableTemplates();

    res.json({
      success: true,
      data: templates,
      count: templates.length,
    });
  } catch (error) {
    console.error('Error getting templates:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get templates',
    });
  }
});

export default router;
