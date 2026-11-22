/**
 * Smart Import Upload, Preview & Column Mapping Routes
 */

import mongoose from 'mongoose';
import * as excelImportService from '../../services/excelImportService.js';
import ImportSession from '../../models/ImportSession.js';
import { uploadSingleImportFile } from './uploadMiddleware.js';
import {
  IMPORT_REQUIRED_FIELDS,
  buildSessionOwnershipQuery,
  calculateDataStats,
  extractDropdownOptions,
  findSessionForUser,
  getAuthenticatedUserId,
  getImportErrorStatus,
  hasRequiredFieldMappings,
  isValidMappingPayload,
  isValidOptionalSheetName,
  isValidParseDataArray,
  normalizeMappingPayload,
} from './smartImportHelpers.js';

export const registerUploadAndMappingRoutes = router => {
  /**
   * POST /api/inventory/import/upload
   * Upload Excel/CSV file and extract metadata
   */
  router.post('/upload', uploadSingleImportFile, async (req, res) => {
    try {
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file provided',
        });
      }

      // Parse Excel file
      const parseResult = await excelImportService.parseExcelFile(req.file.path, {
        previewLimit: 20,
      });

      // Create import session
      const session = new ImportSession({
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileHash: req.file.filename,
        sheetName: parseResult.sheets[0],
        totalRows: parseResult.totalRows,
        status: 'pending',
        columnMapping: parseResult.columnMapping,
        userId,
        importedBy: userId,
      });

      await session.save();

      // Extract dropdown options from preview
      const dropdownOptions = extractDropdownOptions(parseResult.preview);

      res.json({
        success: true,
        data: {
          sessionId: session._id,
          sheetNames: parseResult.sheets,
          headers: parseResult.headers,
          preview: parseResult.preview,
          totalRows: parseResult.totalRows,
          columnMapping: parseResult.columnMapping,
          dropdownOptions,
        },
      });
    } catch (error) {
      res.status(getImportErrorStatus(error.message)).json({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * POST /api/inventory/import/:sessionId/preview
   * Get updated preview with dropdown options
   */
  router.post('/:sessionId/preview', async (req, res) => {
    try {
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }

      if (!isValidOptionalSheetName(req.body.sheetName)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid sheetName payload: expected a string',
        });
      }

      const session = await findSessionForUser(req.params.sessionId, userId);
      if (!session) {
        return res.status(404).json({
          success: false,
          error: 'Import session not found',
        });
      }

      const parseResult = await excelImportService.parseExcelFile(session.filePath, {
        sheetName: req.body.sheetName || session.sheetName,
        previewLimit: 100,
      });

      if (!isValidParseDataArray(parseResult.preview)) {
        return res.status(500).json({
          success: false,
          error: 'Invalid parser payload: preview must be an array',
        });
      }

      const dropdownOptions = extractDropdownOptions(parseResult.preview);
      const stats = calculateDataStats(parseResult.preview);

      res.json({
        success: true,
        data: {
          preview: parseResult.preview,
          dropdownOptions,
          stats,
          totalRows: parseResult.totalRows,
        },
      });
    } catch (error) {
      res.status(getImportErrorStatus(error.message)).json({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * POST /api/inventory/import/:sessionId/mapping
   * Save custom column mapping
   */
  router.post('/:sessionId/mapping', async (req, res) => {
    try {
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }

      if (!mongoose.Types.ObjectId.isValid(req.params.sessionId)) {
        return res.status(404).json({
          success: false,
          error: 'Import session not found',
        });
      }

      if (!isValidMappingPayload(req.body.mapping)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid mapping payload: expected an object of string-to-string mappings',
        });
      }

      const normalizedMapping = normalizeMappingPayload(req.body.mapping);

      if (!hasRequiredFieldMappings(normalizedMapping)) {
        return res.status(400).json({
          success: false,
          error: `Mapping is missing required fields: ${IMPORT_REQUIRED_FIELDS.join(', ')}`,
        });
      }

      const session = await ImportSession.findOneAndUpdate(
        buildSessionOwnershipQuery(req.params.sessionId, userId),
        { columnMapping: normalizedMapping },
        { new: true }
      );

      if (!session) {
        return res.status(404).json({
          success: false,
          error: 'Import session not found',
        });
      }

      res.json({
        success: true,
        data: { session },
      });
    } catch (error) {
      res.status(getImportErrorStatus(error.message)).json({
        success: false,
        error: error.message,
      });
    }
  });
};
