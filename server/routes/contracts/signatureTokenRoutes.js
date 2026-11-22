import express from 'express';
import { Contract, SignatureToken } from '../../lib/database.js';

const router = express.Router();

// GET /api/contracts/signature/:token
// Resolve signature token to signable contract summary
router.get('/signature/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const tokenData = await SignatureToken.findOne({ token });
    if (!tokenData) {
      return res.status(404).json({ success: false, error: 'Invalid signature link' });
    }
    if (tokenData.used) {
      return res
        .status(400)
        .json({ success: false, error: 'This signature link has already been used' });
    }
    if (new Date(tokenData.expiresAt) < new Date()) {
      return res.status(400).json({ success: false, error: 'This signature link has expired' });
    }

    const contract = await Contract.findById(tokenData.contractId);
    if (!contract) {
      return res.status(404).json({ success: false, error: 'Contract not found' });
    }

    const safeContract = {
      id: contract._id?.toString(),
      contractNumber: contract.contractNumber,
      ownerName: contract.ownerName,
      lessorName: contract.lessorName,
      tenantName: contract.tenantName,
      propertyUsage: contract.propertyUsage,
      buildingName: contract.buildingName,
      propertyType: contract.propertyType,
      location: contract.location,
      contractPeriodFrom: contract.contractPeriodFrom,
      contractPeriodTo: contract.contractPeriodTo,
      annualRent: contract.annualRent,
      securityDeposit: contract.securityDeposit,
      modeOfPayment: contract.modeOfPayment,
    };

    return res.json({
      success: true,
      contract: safeContract,
      role: tokenData.role,
      signerName: tokenData.role === 'lessor' ? contract.lessorName : contract.tenantName,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error.message || 'Failed to resolve signature token' });
  }
});

// POST /api/contracts/signature/:token/sign
// Submit signature payload via tokenized signing link
router.post('/signature/:token/sign', async (req, res) => {
  try {
    const { token } = req.params;
    const { signature, signerName } = req.body || {};

    if (!signature || typeof signature !== 'string') {
      return res.status(400).json({ success: false, error: 'Signature is required' });
    }

    const tokenData = await SignatureToken.findOne({ token });
    if (!tokenData) {
      return res.status(404).json({ success: false, error: 'Invalid signature link' });
    }
    if (tokenData.used) {
      return res
        .status(400)
        .json({ success: false, error: 'This signature link has already been used' });
    }
    if (new Date(tokenData.expiresAt) < new Date()) {
      return res.status(400).json({ success: false, error: 'This signature link has expired' });
    }

    const contract = await Contract.findById(tokenData.contractId);
    if (!contract) {
      return res.status(404).json({ success: false, error: 'Contract not found' });
    }

    contract.signatures[tokenData.role] = {
      signature,
      signerName:
        signerName || (tokenData.role === 'lessor' ? contract.lessorName : contract.tenantName),
      signedAt: new Date(),
      ipAddress: req.ip,
    };

    const hasLessor = Boolean(contract.signatures?.lessor?.signature);
    const hasTenant = Boolean(contract.signatures?.tenant?.signature);
    contract.status = hasLessor && hasTenant ? 'fully_signed' : 'partially_signed';

    await contract.save();
    tokenData.used = true;
    tokenData.usedAt = new Date();
    await tokenData.save();

    return res.json({
      success: true,
      message: 'Contract signed successfully',
      status: contract.status,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error.message || 'Failed to sign contract' });
  }
});

export default router;
