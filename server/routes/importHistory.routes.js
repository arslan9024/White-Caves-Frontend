/**
 * Import History & Admin API Routes
 * GET /api/inventory/import/history - Get import history
 * GET /api/inventory/import/session/:sessionId - Get session details
 * GET /api/inventory/import/session/:sessionId/errors - Get session errors
 * GET /api/inventory/import/session/:sessionId/report - Download report
 * GET /api/admin/dashboard - Admin dashboard data
 * GET /api/admin/system-health - System health status
 */

import express from 'express';
import { registerImportHistoryRoutes } from './importHistory/historyRoutes.js';
import { registerAdminRoutes } from './importHistory/adminRoutes.js';

const router = express.Router();

registerImportHistoryRoutes(router);
registerAdminRoutes(router);

export default router;
