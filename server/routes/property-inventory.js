import express from 'express';
import inventoryRoutes from './propertyInventory/inventoryRoutes.js';
import dashboardRoutes from './propertyInventory/dashboardRoutes.js';
import analyticsRoutes from './propertyInventory/analyticsRoutes.js';

const router = express.Router();

router.use('/', inventoryRoutes);
router.use('/', dashboardRoutes);
router.use('/', analyticsRoutes);

export default router;
