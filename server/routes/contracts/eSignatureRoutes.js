import express from 'express';
import ContractService from '../../services/ContractService.js';

const router = express.Router();

// POST /api/contracts/:id/request-signature
// Request signature from a party
router.post('/:id/request-signature', async (req, res) => {
  try {
    const { id } = req.params;
    const { signerEmail, signerName, signerRole, method } = req.body;

    if (!signerEmail || !signerName || !signerRole) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: signerEmail, signerName, signerRole',
      });
    }

    const result = await ContractService.requestSignature(id, {
      email: signerEmail,
      name: signerName,
      role: signerRole,
      method: method || 'canvas',
    });

    try {
      const { sendEmailTracked, wrapInBrandedTemplate } =
        await import('../../services/emailService.js');
      const html = wrapInBrandedTemplate(
        `
          <h2>Signature Request Ready</h2>
          <p>Hello ${signerName}, your signature is requested for contract <strong>${id}</strong>.</p>
          <p>Please open the secure signing link below to review and sign the document.</p>
          <p><a class="cta" href="${result.signingLink}">Review & Sign Contract</a></p>
          <p>If the button does not work, copy and paste this URL into your browser:</p>
          <p><a href="${result.signingLink}">${result.signingLink}</a></p>
        `,
        { preheader: `Signature request for contract ${id}` }
      );

      await sendEmailTracked({
        to: signerEmail,
        subject: `Signature Request: Contract ${id}`,
        html,
        text: `Hello ${signerName}, your signature is requested for contract ${id}. Review and sign: ${result.signingLink}`,
        tags: [
          { name: 'type', value: 'contract_signature_request' },
          { name: 'contractId', value: String(id) },
          { name: 'signerRole', value: signerRole },
        ],
      });
    } catch (emailError) {
      console.error('Failed to send signature request email:', emailError);
    }

    res.json({
      success: true,
      signatureId: result.signatureId,
      signingLink: result.signingLink,
      expiresAt: result.expiresAt,
      message: 'Signature request created',
    });
  } catch (error) {
    console.error('Error requesting signature:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to request signature',
    });
  }
});

// POST /api/contracts/:id/sign
// Record a signature
router.post('/:id/sign', async (req, res) => {
  try {
    const { id } = req.params;
    const { signatureId, signatureData } = req.body;

    if (!signatureId || !signatureData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: signatureId, signatureData',
      });
    }

    const contract = await ContractService.recordSignature(id, signatureId, signatureData);

    res.json({
      success: true,
      contractId: contract._id,
      status: contract.status,
      message: 'Signature recorded successfully',
    });
  } catch (error) {
    console.error('Error recording signature:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to record signature',
    });
  }
});

// GET /api/contracts/:id/signature-status
// Get signature status
router.get('/:id/signature-status', async (req, res) => {
  try {
    const { id } = req.params;

    const status = await ContractService.getSignatureStatus(id);

    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    console.error('Error getting signature status:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get signature status',
    });
  }
});

export default router;
