import express from 'express';
import signatureTokenRoutes from './contracts/signatureTokenRoutes.js';
import crudRoutes from './contracts/crudRoutes.js';
import legacyActionsRoutes from './contracts/legacyActionsRoutes.js';
import eSignatureRoutes from './contracts/eSignatureRoutes.js';
import templateAndLifecycleRoutes from './contracts/templateAndLifecycleRoutes.js';

const router = express.Router();

router.use(signatureTokenRoutes);
router.use(crudRoutes);
router.use(legacyActionsRoutes);
router.use(eSignatureRoutes);
router.use(templateAndLifecycleRoutes);

export default router;
