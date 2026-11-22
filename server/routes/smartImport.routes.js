/**
 * Smart Mary Import Routes
 * Handles Excel/CSV file upload, validation, and import processing
 */

import express from 'express';
import { registerUploadAndMappingRoutes } from './smartImport/uploadAndMappingRoutes.js';
import { registerValidationAndExecutionRoutes } from './smartImport/validationAndExecutionRoutes.js';
import { registerSessionQueryRoutes } from './smartImport/sessionQueryRoutes.js';

const router = express.Router();

registerUploadAndMappingRoutes(router);
registerValidationAndExecutionRoutes(router);
registerSessionQueryRoutes(router);

export default router;
