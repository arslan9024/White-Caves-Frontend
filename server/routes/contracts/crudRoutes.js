import express from 'express';
import crypto from 'crypto';
import { Contract } from '../../lib/database.js';
import { generateContractNumber, normalizeContract } from './helpers.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const useDatabase = req.app.locals.useDatabase;
    if (useDatabase) {
      const contracts = await Contract.find().sort({ createdAt: -1 });
      return res.json({ success: true, contracts: contracts.map(normalizeContract) });
    }
    const contracts = req.app.locals.loadContracts();
    res.json({ success: true, contracts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const useDatabase = req.app.locals.useDatabase;
    if (useDatabase) {
      const contract = await Contract.findById(req.params.id);
      if (!contract) {
        return res.status(404).json({ success: false, error: 'Contract not found' });
      }
      return res.json({ success: true, contract: normalizeContract(contract) });
    }
    const contracts = req.app.locals.loadContracts();
    const contract = contracts.find(c => c.id === req.params.id);
    if (!contract) {
      return res.status(404).json({ success: false, error: 'Contract not found' });
    }
    res.json({ success: true, contract });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const useDatabase = req.app.locals.useDatabase;
    const contractData = req.body;
    const contractNumber = generateContractNumber();

    if (useDatabase) {
      const newContract = new Contract({
        ...contractData,
        contractNumber,
        status: 'draft',
        signatures: { lessor: null, tenant: null, broker: null },
        signatureLinks: { lessor: null, tenant: null },
      });
      await newContract.save();
      return res.json({ success: true, contract: normalizeContract(newContract) });
    }

    const contracts = req.app.locals.loadContracts();
    const newContract = {
      id: crypto.randomUUID(),
      contractNumber,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...contractData,
      signatures: { lessor: null, tenant: null, broker: null },
      signatureLinks: { lessor: null, tenant: null },
    };

    contracts.unshift(newContract);
    req.app.locals.saveContracts(contracts);
    res.json({ success: true, contract: newContract });
  } catch (error) {
    console.error('Error creating contract:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const useDatabase = req.app.locals.useDatabase;
    if (useDatabase) {
      const contract = await Contract.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );
      if (!contract) {
        return res.status(404).json({ success: false, error: 'Contract not found' });
      }
      return res.json({ success: true, contract: normalizeContract(contract) });
    }

    const contracts = req.app.locals.loadContracts();
    const index = contracts.findIndex(c => c.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Contract not found' });
    }
    contracts[index] = { ...contracts[index], ...req.body, updatedAt: new Date().toISOString() };
    req.app.locals.saveContracts(contracts);
    res.json({ success: true, contract: contracts[index] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
