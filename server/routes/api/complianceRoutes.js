/**
 * complianceRoutes.js
 * API routes for compliance operations
 * Handles CDD, EDD, approval workflows, document verification, and goAML registration
 */

const express = require('express');
const policyAndGoamlRoutes = require('./compliance/policyAndGoamlRoutes');
const cddRoutes = require('./compliance/cddRoutes');
const documentRoutes = require('./compliance/documentRoutes');
const workflowRoutes = require('./compliance/workflowRoutes');

const router = express.Router();

router.use(policyAndGoamlRoutes);
router.use(cddRoutes);
router.use(documentRoutes);
router.use(workflowRoutes);

module.exports = router;
