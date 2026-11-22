/**
 * Smart Import Helpers
 * Validation predicates, session ownership queries, and preview analytics
 */

import mongoose from 'mongoose';
import ImportSession from '../../models/ImportSession.js';

export const ALLOWED_DEDUPLICATION_STRATEGIES = ['keep', 'overwrite', 'version', 'manual'];
export const ALLOWED_VALIDATION_STRATEGIES = ['strict', 'lenient', 'balanced'];
export const IMPORT_REQUIRED_FIELDS = ['ownerName', 'area', 'pNumber'];

export const getAuthenticatedUserId = req => req.user?.id || req.user?._id || null;

export const buildSessionOwnershipQuery = (sessionId, userId) => ({
  _id: sessionId,
  $or: [{ userId }, { importedBy: userId }],
});

export const findSessionForUser = (sessionId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return null;
  }

  return ImportSession.findOne(buildSessionOwnershipQuery(sessionId, userId));
};

export const isPlainObject = value =>
  Boolean(value) &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  value.constructor === Object;

export const isValidMappingPayload = mapping =>
  isPlainObject(mapping) &&
  Object.entries(mapping).every(
    ([key, value]) =>
      typeof key === 'string' &&
      key.trim().length > 0 &&
      typeof value === 'string' &&
      value.trim().length > 0
  );

export const normalizeMappingToken = value =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

export const hasRequiredFieldMappings = (mapping, requiredFields = IMPORT_REQUIRED_FIELDS) => {
  if (!isValidMappingPayload(mapping)) {
    return false;
  }

  const normalizedKeys = new Set(Object.keys(mapping).map(normalizeMappingToken));
  const normalizedValues = new Set(Object.values(mapping).map(normalizeMappingToken));

  return requiredFields.every(field => {
    const normalized = normalizeMappingToken(field);
    return normalizedKeys.has(normalized) || normalizedValues.has(normalized);
  });
};

export const resolveExecutionColumnMapping = (sessionMapping, parseResultMapping) => {
  if (hasRequiredFieldMappings(sessionMapping)) {
    return sessionMapping;
  }

  if (hasRequiredFieldMappings(parseResultMapping)) {
    return parseResultMapping;
  }

  return sessionMapping || parseResultMapping || {};
};

export const isValidClusterAssignmentsPayload = clusterAssignments =>
  isPlainObject(clusterAssignments) &&
  Object.entries(clusterAssignments).every(
    ([key, value]) =>
      typeof key === 'string' &&
      key.trim().length > 0 &&
      typeof value === 'string' &&
      value.trim().length > 0
  );

export const isValidOptionalSheetName = sheetName =>
  sheetName === undefined || sheetName === null || typeof sheetName === 'string';

export const isValidOptionalBoolean = value => value === undefined || typeof value === 'boolean';

export const normalizeMappingPayload = mapping =>
  Object.fromEntries(
    Object.entries(mapping).map(([key, value]) => [String(key).trim(), String(value).trim()])
  );

export const isValidParseDataArray = value => Array.isArray(value);

export const getImportErrorStatus = errorMessage => {
  const message = String(errorMessage || '');
  const badRequestPatterns = [
    'Worksheet not found',
    'Import file not found',
    'Only .xlsx, .xls, and .csv files are supported',
    'File too large',
  ];

  return badRequestPatterns.some(pattern => message.includes(pattern)) ? 400 : 500;
};

/**
 * Helper: Extract dropdown options from preview data
 */
export function extractDropdownOptions(preview) {
  const options = {
    statuses: new Set(),
    areas: new Set(),
    clusters: new Set(),
    rooms: new Set(),
    layouts: new Set(),
  };

  for (const row of preview) {
    if (row.status) options.statuses.add(row.status);
    if (row.area) options.areas.add(row.area);
    if (row.cluster) options.clusters.add(row.cluster);
    if (row.rooms) options.rooms.add(row.rooms);
    if (row.layout) options.layouts.add(row.layout);
  }

  return {
    statuses: Array.from(options.statuses),
    areas: Array.from(options.areas),
    clusters: Array.from(options.clusters),
    rooms: Array.from(options.rooms),
    layouts: Array.from(options.layouts),
  };
}

/**
 * Helper: Calculate data statistics
 */
export function calculateDataStats(preview) {
  const totalRows = preview.length;
  let missingOwnerNames = 0;
  let missingAreas = 0;
  let priceMin = Infinity;
  let priceMax = 0;
  const uniqueAreas = new Set();

  for (const row of preview) {
    if (!row.ownerName || row.ownerName === '.') missingOwnerNames++;
    if (!row.area || row.area === '.') missingAreas++;
    if (row.askingPrice) {
      const price = parseInt(row.askingPrice);
      priceMin = Math.min(priceMin, price);
      priceMax = Math.max(priceMax, price);
    }
    if (row.area) uniqueAreas.add(row.area);
  }

  return {
    totalRows,
    missingOwnerNames,
    missingAreas,
    priceRange: { min: priceMin === Infinity ? 0 : priceMin, max: priceMax },
    uniqueAreas: uniqueAreas.size,
    completenessPercentage: Math.round(
      (100 * (totalRows - missingOwnerNames - missingAreas)) / (totalRows * 2)
    ),
  };
}
