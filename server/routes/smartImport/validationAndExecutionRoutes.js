/**
 * Smart Import Validation & Execution Routes
 */

import * as excelImportService from '../../services/excelImportService.js';
import * as importValidationEngine from '../../services/importValidationEngine.js';
import * as importExecutionEngine from '../../services/importExecutionEngine.js';
import {
  ALLOWED_DEDUPLICATION_STRATEGIES,
  ALLOWED_VALIDATION_STRATEGIES,
  IMPORT_REQUIRED_FIELDS,
  findSessionForUser,
  getAuthenticatedUserId,
  getImportErrorStatus,
  hasRequiredFieldMappings,
  isValidClusterAssignmentsPayload,
  isValidOptionalBoolean,
  isValidOptionalSheetName,
  isValidParseDataArray,
  resolveExecutionColumnMapping,
} from './smartImportHelpers.js';

export const registerValidationAndExecutionRoutes = router => {
  /**
   * POST /api/inventory/import/:sessionId/validate
   * Validate import data
   */
  router.post('/:sessionId/validate', async (req, res) => {
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

      const validationStrategy = req.body.strategy || 'balanced';
      if (!ALLOWED_VALIDATION_STRATEGIES.includes(validationStrategy)) {
        return res.status(400).json({
          success: false,
          error: `Invalid validation strategy: ${validationStrategy}`,
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
      });

      if (!isValidParseDataArray(parseResult.data)) {
        return res.status(500).json({
          success: false,
          error: 'Invalid parser payload: data must be an array',
        });
      }

      const validation = await importValidationEngine.validateAllRows(
        parseResult.data,
        validationStrategy,
        {
          requiredFields: IMPORT_REQUIRED_FIELDS,
          fieldTypes: {},
        }
      );

      // Check for orphaned records
      const orphaned = importValidationEngine.detectOrphanedRecords(parseResult.data);

      res.json({
        success: true,
        data: {
          validation,
          orphanedRecords: orphaned,
          isReady: validation.isValid && orphaned.length === 0,
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
   * POST /api/inventory/import/:sessionId/execute
   * Execute import with batch processing
   */
  router.post('/:sessionId/execute', async (req, res) => {
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

      if (!isValidOptionalBoolean(req.body.dryRun)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid dryRun payload: expected a boolean',
        });
      }

      const deduplicationStrategy = req.body.deduplicationStrategy || 'keep';
      if (!ALLOWED_DEDUPLICATION_STRATEGIES.includes(deduplicationStrategy)) {
        return res.status(400).json({
          success: false,
          error: `Invalid deduplicationStrategy: ${deduplicationStrategy}`,
        });
      }

      const executionStrategy = req.body.strategy || 'balanced';
      if (!ALLOWED_VALIDATION_STRATEGIES.includes(executionStrategy)) {
        return res.status(400).json({
          success: false,
          error: `Invalid execution strategy: ${executionStrategy}`,
        });
      }

      const clusterAssignments = req.body.clusterAssignments || {};
      if (!isValidClusterAssignmentsPayload(clusterAssignments)) {
        return res.status(400).json({
          success: false,
          error:
            'Invalid clusterAssignments payload: expected an object of string-to-string mappings',
        });
      }

      const session = await findSessionForUser(req.params.sessionId, userId);
      if (!session) {
        return res.status(404).json({
          success: false,
          error: 'Import session not found',
        });
      }

      // Parse data
      const parseResult = await excelImportService.parseExcelFile(session.filePath, {
        sheetName: req.body.sheetName || session.sheetName,
      });

      if (!isValidParseDataArray(parseResult.data)) {
        return res.status(500).json({
          success: false,
          error: 'Invalid parser payload: data must be an array',
        });
      }

      const effectiveColumnMapping = resolveExecutionColumnMapping(
        session.columnMapping,
        parseResult.columnMapping
      );

      if (!hasRequiredFieldMappings(effectiveColumnMapping)) {
        return res.status(400).json({
          success: false,
          error: `Unable to execute import: required column mappings missing (${IMPORT_REQUIRED_FIELDS.join(', ')})`,
        });
      }

      // Optional: dry-run validation
      if (req.body.dryRun) {
        const dryRunResult = await importValidationEngine.dryRun(parseResult.data, session._id, {
          strategy: executionStrategy,
          requiredFields: IMPORT_REQUIRED_FIELDS,
        });

        return res.json({
          success: true,
          data: {
            dryRun: true,
            ...dryRunResult,
          },
        });
      }

      // Update status only for real execution
      session.status = 'processing';
      await session.save();

      // Execute actual import
      const importResult = await importExecutionEngine.executeImport(session._id, parseResult.data, {
        columnMapping: effectiveColumnMapping,
        statusMap: {},
        clusterAssignments,
        deduplicationStrategy,
        importStrategy: executionStrategy,
        dryRun: false,
        batchSize: 100,
      });

      const finalizedSession = await findSessionForUser(req.params.sessionId, userId);

      res.json({
        success: true,
        data: {
          sessionId: session._id,
          status: finalizedSession?.status || session.status,
          ...importResult,
        },
      });
    } catch (error) {
      // Update session on error
      try {
        const userId = getAuthenticatedUserId(req);
        const session = userId ? await findSessionForUser(req.params.sessionId, userId) : null;
        if (session) {
          session.status = 'failed';
          session.importErrors = [{ error: error.message }];
          await session.save();
        }
      } catch (updateError) {
        console.error('Failed to update session on error:', updateError);
      }

      res.status(getImportErrorStatus(error.message)).json({
        success: false,
        error: error.message,
      });
    }
  });
};
