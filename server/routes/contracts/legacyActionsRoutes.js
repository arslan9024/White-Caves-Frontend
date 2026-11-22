import express from 'express';
import { Readable } from 'stream';
import { uploadToDrive } from '../../lib/googleDrive.js';
import { Contract, SignatureToken } from '../../lib/database.js';
import { generateToken } from './helpers.js';
import { generateContractHtml } from './contractHtml.js';

const router = express.Router();

router.post('/:id/generate-signature-link', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['lessor', 'tenant'].includes(role)) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid role. Must be lessor or tenant.' });
    }

    const useDatabase = req.app.locals.useDatabase;
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000);
    const baseUrl = process.env.REPLIT_DEV_DOMAIN
      ? `https://${process.env.REPLIT_DEV_DOMAIN}`
      : 'http://localhost:5000';
    const signatureLink = `${baseUrl}/sign/${token}`;

    if (useDatabase) {
      const contract = await Contract.findById(req.params.id);
      if (!contract) {
        return res.status(404).json({ success: false, error: 'Contract not found' });
      }

      const signatureToken = new SignatureToken({
        token,
        contractId: contract._id,
        role,
        expiresAt,
      });
      await signatureToken.save();

      contract.signatureLinks[role] = {
        token,
        link: signatureLink,
        expiresAt,
        createdAt: new Date(),
      };
      await contract.save();

      return res.json({ success: true, signatureLink, expiresAt, role });
    }

    const contracts = req.app.locals.loadContracts();
    const contract = contracts.find(c => c.id === req.params.id);
    if (!contract) {
      return res.status(404).json({ success: false, error: 'Contract not found' });
    }

    const tokens = req.app.locals.loadTokens();
    tokens[token] = {
      contractId: contract.id,
      role,
      expiresAt: expiresAt.toISOString(),
      used: false,
      createdAt: new Date().toISOString(),
    };
    req.app.locals.saveTokens(tokens);

    const contractIndex = contracts.findIndex(c => c.id === req.params.id);
    contracts[contractIndex].signatureLinks[role] = {
      token,
      link: signatureLink,
      expiresAt: expiresAt.toISOString(),
      createdAt: new Date().toISOString(),
    };
    req.app.locals.saveContracts(contracts);

    res.json({ success: true, signatureLink, expiresAt, role });
  } catch (error) {
    console.error('Error generating signature link:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/:id/broker-sign', async (req, res) => {
  try {
    const { signature, signerName } = req.body;
    if (!signature) {
      return res.status(400).json({ success: false, error: 'Signature is required' });
    }

    const useDatabase = req.app.locals.useDatabase;
    if (useDatabase) {
      const contract = await Contract.findById(req.params.id);
      if (!contract) {
        return res.status(404).json({ success: false, error: 'Contract not found' });
      }
      contract.signatures.broker = { signature, signerName, signedAt: new Date() };
      await contract.save();
      return res.json({ success: true, message: 'Broker signature added successfully' });
    }

    const contracts = req.app.locals.loadContracts();
    const contractIndex = contracts.findIndex(c => c.id === req.params.id);
    if (contractIndex === -1) {
      return res.status(404).json({ success: false, error: 'Contract not found' });
    }
    contracts[contractIndex].signatures.broker = {
      signature,
      signerName,
      signedAt: new Date().toISOString(),
    };
    contracts[contractIndex].updatedAt = new Date().toISOString();
    req.app.locals.saveContracts(contracts);
    res.json({ success: true, message: 'Broker signature added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/:id/upload-to-drive', async (req, res) => {
  try {
    const contractData = req.body;
    const contractHtml = generateContractHtml(contractData);
    const fileName = `TenancyContract_${contractData.contractNumber}_${Date.now()}.html`;
    const htmlStream = Readable.from([contractHtml]);
    const result = await uploadToDrive(fileName, htmlStream, 'text/html');

    const useDatabase = req.app.locals.useDatabase;
    if (useDatabase && contractData._id) {
      await Contract.findByIdAndUpdate(contractData._id, {
        driveFileId: result.id,
        driveWebViewLink: result.webViewLink,
      });
    }

    res.json({
      success: true,
      fileId: result.id,
      fileName: result.name,
      webViewLink: result.webViewLink,
    });
  } catch (error) {
    console.error('Error uploading to Drive:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to upload contract to Google Drive',
    });
  }
});

export default router;
