import auth from '../../middleware/auth.ts';
import ImportSession from '../../models/ImportSession.js';
import {
  MAX_HISTORY_LIMIT,
  buildOwnershipQuery,
  buildSessionLookupQuery,
  getAuthenticatedUserId,
  parseStrictInteger,
} from './helpers.js';
import { buildJsonReportPayload, generateImportReportPdf } from './reportPdfBuilder.js';

export const registerImportHistoryRoutes = router => {
  /**
   * GET /api/inventory/import/history
   * Retrieve import history with filtering and sorting
   */
  router.get('/inventory/import/history', auth, async (req, res) => {
    try {
      const { status, sortBy = 'date', limit = 50, offset = 0 } = req.query;
      const userId = getAuthenticatedUserId(req);
      const parsedLimit = parseStrictInteger(limit);
      const parsedOffset = parseStrictInteger(offset);

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
      }

      if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid limit query param: expected a positive integer',
        });
      }

      if (parsedLimit > MAX_HISTORY_LIMIT) {
        return res.status(400).json({
          success: false,
          error: `Invalid limit query param: maximum allowed is ${MAX_HISTORY_LIMIT}`,
        });
      }

      if (!Number.isInteger(parsedOffset) || parsedOffset < 0) {
        return res.status(400).json({
          success: false,
          error: 'Invalid offset query param: expected a non-negative integer',
        });
      }

      // Build query
      const query = buildOwnershipQuery(userId);
      if (status && status !== '') {
        query.status = status;
      }

      // Build sort
      let sortObj = { createdAt: -1 };
      if (sortBy === 'date-asc') {
        sortObj = { createdAt: 1 };
      } else if (sortBy === 'size') {
        sortObj = { fileSize: -1 };
      } else if (sortBy === 'rows') {
        sortObj = { totalRows: -1 };
      }

      // Fetch imports
      const importsRaw = await ImportSession.find(query)
        .sort(sortObj)
        .limit(parsedLimit)
        .skip(parsedOffset)
        .lean();

      const imports = importsRaw.map(item => ({
        ...item,
        sessionId: item.sessionId || String(item._id),
      }));

      // Count total
      const total = await ImportSession.countDocuments(query);

      res.json({
        success: true,
        data: {
          imports,
          total,
          hasMore: parsedOffset + parsedLimit < total,
        },
      });
    } catch (error) {
      console.error('Error fetching import history:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch import history',
      });
    }
  });

  /**
   * GET /api/inventory/import/session/:sessionId
   * Get detailed session information
   */
  router.get('/inventory/import/session/:sessionId', auth, async (req, res) => {
    try {
      const userId = getAuthenticatedUserId(req);

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
      }

      const session = await ImportSession.findOne(
        buildSessionLookupQuery(req.params.sessionId, userId)
      ).lean();

      if (!session) {
        return res.status(404).json({
          success: false,
          error: 'Session not found',
        });
      }

      res.json({
        success: true,
        data: { session },
      });
    } catch (error) {
      console.error('Error fetching session:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch session',
      });
    }
  });

  /**
   * GET /api/inventory/import/session/:sessionId/errors
   * Get errors from a specific import session
   */
  router.get('/inventory/import/session/:sessionId/errors', auth, async (req, res) => {
    try {
      const userId = getAuthenticatedUserId(req);

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
      }

      const session = await ImportSession.findOne(
        buildSessionLookupQuery(req.params.sessionId, userId)
      ).lean();

      if (!session) {
        return res.status(404).json({
          success: false,
          error: 'Session not found',
        });
      }

      res.json({
        success: true,
        data: {
          errors: session.importErrors || session.errors || [],
          totalErrors:
            session.totalErrors ||
            (Array.isArray(session.importErrors)
              ? session.importErrors.length
              : Array.isArray(session.errors)
                ? session.errors.length
                : 0),
        },
      });
    } catch (error) {
      console.error('Error fetching errors:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch errors',
      });
    }
  });

  /**
   * GET /api/inventory/import/session/:sessionId/report
   * Download import report as PDF or JSON
   */
  router.get('/inventory/import/session/:sessionId/report', auth, async (req, res) => {
    try {
      const formatRaw = req.query.format ?? 'json';
      const format = String(formatRaw).toLowerCase();
      const userId = getAuthenticatedUserId(req);

      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
      }

      const session = await ImportSession.findOne(
        buildSessionLookupQuery(req.params.sessionId, userId)
      ).lean();

      if (!session) {
        return res.status(404).json({
          success: false,
          error: 'Session not found',
        });
      }

      if (!['json', 'pdf'].includes(format)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid format query param: expected json or pdf',
        });
      }

      const reportSessionId = session.sessionId || String(session._id || req.params.sessionId);

      if (format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="import-report-${reportSessionId}.json"`
        );
        return res.json(buildJsonReportPayload(session, reportSessionId));
      }

      const buffer = await generateImportReportPdf(session, reportSessionId);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Length', buffer.length);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="import-report-${reportSessionId}.pdf"`
      );
      return res.end(buffer);
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate report',
      });
    }
  });
};
