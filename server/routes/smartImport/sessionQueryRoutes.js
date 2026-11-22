/**
 * Smart Import Session Query & Error Report Routes
 */

import { findSessionForUser, getAuthenticatedUserId } from './smartImportHelpers.js';

export const registerSessionQueryRoutes = router => {
  /**
   * GET /api/inventory/import/:sessionId
   * Get import session details and progress
   */
  router.get('/:sessionId', async (req, res) => {
    try {
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }

      const session = await findSessionForUser(req.params.sessionId, userId);
      if (!session) {
        return res.status(404).json({
          success: false,
          error: 'Import session not found',
        });
      }

      res.json({
        success: true,
        data: {
          session,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });

  /**
   * GET /api/inventory/import/:sessionId/errors
   * Get detailed error and duplicate reports
   */
  router.get('/:sessionId/errors', async (req, res) => {
    try {
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }

      const session = await findSessionForUser(req.params.sessionId, userId);
      if (!session) {
        return res.status(404).json({
          success: false,
          error: 'Import session not found',
        });
      }

      res.json({
        success: true,
        data: {
          errors: session.importErrors || [],
          duplicates: session.duplicates || [],
          totalErrors: (session.importErrors || []).length,
          totalDuplicates: (session.duplicates || []).length,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  });
};
