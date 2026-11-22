/**
 * Document Auto-Fill Service — Phase 4B
 *
 * Automatically populates document template variables from database records.
 * Maps Prisma model fields → Handlebars template variables per document type.
 *
 * Smart clause selection: applies conditional context (sale vs rental,
 * cash vs mortgage, furnished vs unfurnished) to generate contextually
 * appropriate documents.
 *
 * Usage:
 *   import { autoFillVariables, getAutoFillableEntities } from './documentAutoFill.js';
 *   const vars = await autoFillVariables('mou', { leadId, propertyId, transactionId });
 */

import logger from '../../utils/logger.js';
import {
  DOCUMENT_ENTITY_MAP,
  type AutoFillContext,
  type AutoFillResult,
  type AutoFillableEntity,
} from './autoFill/types.js';
import { autoFillFormF, autoFillMoU, autoFillNOC } from './autoFill/contractFillers.js';
import {
  autoFillCommissionInvoice,
  autoFillOfferLetter,
  autoFillViewingReport,
} from './autoFill/dealFillers.js';

export { DOCUMENT_ENTITY_MAP };
export type { AutoFillContext, AutoFillResult, AutoFillableEntity };

// ─── Dispatcher ─────────────────────────────────────────────────────────

const AUTO_FILL_MAP: Record<string, (ctx: AutoFillContext) => Promise<AutoFillResult>> = {
  mou: autoFillMoU,
  form_f: autoFillFormF,
  noc: autoFillNOC,
  commission_invoice: autoFillCommissionInvoice,
  viewing_report: autoFillViewingReport,
  offer_letter: autoFillOfferLetter,
};

/**
 * Auto-fill template variables from database records.
 *
 * @param type - Document type (mou, form_f, noc, etc.)
 * @param context - Entity IDs to query from
 * @param overrides - Manual overrides that take precedence over DB values
 */
export async function autoFillVariables(
  type: string,
  context: AutoFillContext,
  overrides?: Record<string, string>,
): Promise<AutoFillResult> {
  const filler = AUTO_FILL_MAP[type];
  if (!filler) {
    throw new Error(`No auto-fill mapping for document type: ${type}. Valid: ${Object.keys(AUTO_FILL_MAP).join(', ')}`);
  }

  logger.info(`[DocumentAutoFill] Auto-filling ${type} from: ${JSON.stringify(context)}`);

  const result = await filler(context);

  // Apply overrides (manual values take precedence)
  if (overrides) {
    for (const [key, value] of Object.entries(overrides)) {
      if (value && value.trim()) {
        result.variables[key] = value;
        // Remove from missing if override provided
        const idx = result.context.missingFields.indexOf(key);
        if (idx >= 0) result.context.missingFields.splice(idx, 1);
      }
    }
  }

  logger.info(
    `[DocumentAutoFill] Filled ${Object.keys(result.variables).length} vars, ` +
    `${result.context.entitiesUsed.length} entities, ` +
    `${result.context.missingFields.length} missing, ` +
    `${Object.keys(result.context.clauseSelections).length} clauses`,
  );

  return result;
}

/**
 * Get the entity requirements for a document type.
 */
export function getAutoFillableEntities(): AutoFillableEntity[] {
  return Object.values(DOCUMENT_ENTITY_MAP);
}

/**
 * Get entity requirements for a specific document type.
 */
export function getEntityRequirements(type: string): AutoFillableEntity | null {
  return DOCUMENT_ENTITY_MAP[type] || null;
}

export default {
  autoFillVariables,
  getAutoFillableEntities,
  getEntityRequirements,
  DOCUMENT_ENTITY_MAP,
};
