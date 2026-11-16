import {
  languageValue,
  normalizeDocumentDate,
  normalizeDocumentText,
  parseDocumentNumber,
  readDocumentFields,
  refreshCoverage,
} from '../henryDocumentParsing';
import { validScanDate } from '../henryScanReview';
import { DEED_LABELS, type DldTitleDeedExtractedData, type DeedOwner } from './henryTitleDeed.types';
import { extractDeedOwners } from './henryTitleDeedOwnerParser';

export function parseTitleDeedDocumentText(text: string): DldTitleDeedExtractedData {
    const { values, diagnostics } = readDocumentFields(text, DEED_LABELS);
    const field = (key: string) => values[key]?.[0] || '';
    const en = (key: string) => languageValue(values[key] || [], 'en');
    const ar = (key: string) => languageValue(values[key] || [], 'ar');
    const squareFeet = (value: string) => /\bsq\.? ?ft\b|ft[²2]|قدم/i.test(value);
    const normalizedNumber = (key: string, raw: string): number | undefined => {
      const value = parseDocumentNumber(raw);
      if (value === undefined) return undefined;
      if (key.endsWith('SqM') && squareFeet(raw)) return value / 10.7639104167;
      if (key.endsWith('SqFt') && /\bsq\.? ?m\b|m[²2]|متر|م[²2]/i.test(raw))
        return value * 10.7639104167;
      return value;
    };
    const numericDisagreement = (key: string, rawValues: string[]) => {
      const candidates = rawValues
        .map(raw => ({
          value: normalizedNumber(key, raw),
          converted: key.endsWith('SqM')
            ? squareFeet(raw)
            : key.endsWith('SqFt') && /\bsq\.? ?m\b|m[²2]|متر|م[²2]/i.test(raw),
        }))
        .filter(
          (candidate): candidate is { value: number; converted: boolean } =>
            candidate.value !== undefined
        );
      // Conversion allows only the rounding of printed two-decimal areas, not a percentage discrepancy.
      return candidates.some((candidate, index) =>
        candidates
          .slice(index + 1)
          .some(
            other =>
              Math.abs(candidate.value - other.value) >
              (candidate.converted || other.converted
                ? key.endsWith('SqFt')
                  ? 0.12
                  : 0.011
                : 0.000001)
          )
      );
    };
    const numeric = (key: string) => {
      let value = normalizedNumber(key, field(key));
      if (value === undefined) diagnostics.fields[key]!.state = 'missing';
      else if (value !== parseDocumentNumber(field(key))) {
        value = Number(value.toFixed(2));
        diagnostics.fields[key] = { state: 'derived', source: 'conversion', values: [field(key)] };
      }
      return value ?? 0; // Legacy payload uses zero; evidence explicitly distinguishes absent from visible zero.
    };
    const certificateNumber = field('certificateNumber');
    let ownerNameEn = en('ownerName');
    let ownerNameAr = ar('ownerName');
    const propertyNumber = field('propertyNumber');
    const plotNumber = field('plotNumber');
    let totalAreaSqM = parseDocumentNumber(field('totalAreaSqM')) ?? 0;
    if (!field('totalAreaSqM') || parseDocumentNumber(field('totalAreaSqM')) === undefined)
      diagnostics.fields.totalAreaSqM!.state = 'missing';
    let totalAreaSqFt = numeric('totalAreaSqFt');
    if (/\b(?:sq\.? ?ft|ft2|ft²)\b|قدم/i.test(field('totalAreaSqM'))) {
      totalAreaSqFt = totalAreaSqM;
      diagnostics.fields.totalAreaSqFt = {
        ...diagnostics.fields.totalAreaSqM!,
        state: 'extracted',
      };
      diagnostics.fields.totalAreaSqM!.state = 'missing';
    }
    if (
      diagnostics.fields.totalAreaSqM!.state === 'missing' &&
      diagnostics.fields.totalAreaSqFt!.state === 'extracted'
    ) {
      totalAreaSqM = Number((totalAreaSqFt / 10.7639104167).toFixed(2));
      diagnostics.fields.totalAreaSqM = {
        state: 'derived',
        source: 'conversion',
        values: ['totalAreaSqFt / 10.7639104167'],
      };
    } else if (
      diagnostics.fields.totalAreaSqFt!.state === 'missing' &&
      diagnostics.fields.totalAreaSqM!.state === 'extracted'
    ) {
      totalAreaSqFt = Number((totalAreaSqM * 10.7639104167).toFixed(2));
      diagnostics.fields.totalAreaSqFt = {
        state: 'derived',
        source: 'conversion',
        values: ['totalAreaSqM * 10.7639104167'],
      };
    }
    const { owners, ambiguousOwner } = extractDeedOwners(text, diagnostics, normalizedNumber, numericDisagreement);
    const status = `${en('mortgageStatus')} ${ar('mortgageStatus')}`.trim();
    const mortgageState = /^(?:not mortgaged|unmortgaged|غير مرهون[ة]?)(?:\s|$)/i.test(status)
      ? 'not_mortgaged'
      : /^(?:mortgaged|مرهون[ة]?)(?:\s|$)/i.test(status)
        ? 'mortgaged'
        : 'unknown';
    for (const key of [
      'certificateNumber',
      'propertyNumber',
      'plotNumber',
      'registrationContractNumber',
    ]) {
      if ((values[key]?.length || 0) > 1) {
        diagnostics.fields[key]!.state = 'conflict';
        diagnostics.warnings.push(`Conflicting ${key}; compare source documents.`);
      }
    }
    for (const key of ['issueDate', 'registrationDate']) {
      if (!validScanDate(normalizeDocumentDate(field(key))))
        diagnostics.fields[key]!.state = 'missing';
    }
    const missingFields = [
      !certificateNumber && 'certificateNumber',
      !ownerNameEn && 'ownerNameEn',
      !(propertyNumber || plotNumber) && 'propertyNumber',
    ].filter((value): value is string => !!value);
    const result: DldTitleDeedExtractedData = {
      certificateNumber,
      ownerNameEn,
      ownerNameAr,
      propertyNumber,
      plotNumber,
      owners,
      mortgageState,
      issueDate: normalizeDocumentDate(field('issueDate')),
      issuingAuthorityEn: en('issuingAuthority'),
      issuingAuthorityAr: ar('issuingAuthority'),
      isBlockchainVerified: false,
      propertyTypeEn: en('propertyType'),
      propertyTypeAr: ar('propertyType'),
      communityEn: en('community'),
      communityAr: ar('community'),
      municipalityNumber: field('municipalityNumber'),
      buildingNumber: field('buildingNumber'),
      buildingNameEn: en('buildingName'),
      buildingNameAr: ar('buildingName'),
      floorNumber: field('floorNumber'),
      parkingNumber: field('parkingNumber'),
      mortgageStatusEn: en('mortgageStatus'),
      mortgageStatusAr: ar('mortgageStatus'),
      isMortgaged: mortgageState === 'mortgaged',
      suiteAreaSqM: numeric('suiteAreaSqM'),
      balconyAreaSqM: numeric('balconyAreaSqM'),
      totalAreaSqM,
      totalAreaSqFt,
      commonAreaSqM: numeric('commonAreaSqM'),
      ownerDldNumber:
        owners.length > 1 || ambiguousOwner ? '' : owners[0]?.dldNumber || field('ownerDldNumber'),
      ownerSharePercent:
        owners.length > 1 || ambiguousOwner
          ? 0
          : (owners[0]?.sharePercent ?? numeric('ownerSharePercent')),
      ownedAreaSqM:
        owners.length > 1 || ambiguousOwner
          ? 0
          : (owners[0]?.ownedAreaSqM ?? numeric('ownedAreaSqM')),
      purchasedFromEn: en('purchasedFrom'),
      purchasedFromAr: ar('purchasedFrom'),
      registrationContractNumber: field('registrationContractNumber'),
      registrationDate: normalizeDocumentDate(field('registrationDate')),
      purchasePriceAed: numeric('purchasePriceAed'),
      purchasePriceWordsEn: en('purchasePriceWordsEn'),
      confidenceScore: 0,
      scannedAt: new Date().toISOString(),
      reviewConfirmed: false,
      demoOnly: false,
      missingFields,
      diagnostics,
    };
    const flagConflict = (key: string) => {
      diagnostics.fields[key]!.state = 'conflict';
      diagnostics.warnings.push(`Conflicting ${key}; compare all source candidates.`);
    };
    for (const key of [
      'suiteAreaSqM',
      'balconyAreaSqM',
      'totalAreaSqM',
      'totalAreaSqFt',
      'commonAreaSqM',
      'purchasePriceAed',
    ]) {
      if (numericDisagreement(key, values[key] || [])) flagConflict(key);
    }
    // Compare every printed total, including aliases that contain square-foot units.
    const totals = [
      ...(values.totalAreaSqM || []).map(raw => ({
        raw,
        value: normalizedNumber('totalAreaSqM', raw),
        converted: squareFeet(raw),
      })),
      ...(values.totalAreaSqFt || [])
        .map(raw => ({ raw, value: normalizedNumber('totalAreaSqFt', raw), converted: true }))
        .map(candidate => ({
          ...candidate,
          value: candidate.value === undefined ? undefined : candidate.value / 10.7639104167,
        })),
    ].filter(
      (candidate): candidate is { raw: string; value: number; converted: boolean } =>
        candidate.value !== undefined
    );
    if (
      totals.some((candidate, index) =>
        totals
          .slice(index + 1)
          .some(
            other =>
              Math.abs(candidate.value - other.value) >
              (candidate.converted || other.converted ? 0.011 : 0.000001)
          )
      )
    ) {
      flagConflict('totalAreaSqM');
      flagConflict('totalAreaSqFt');
      diagnostics.fields.totalAreaSqM!.values = [
        ...new Set(totals.map(candidate => candidate.raw)),
      ];
      diagnostics.fields.totalAreaSqFt!.values = [...diagnostics.fields.totalAreaSqM!.values];
    }
    for (const key of ['issueDate', 'registrationDate']) {
      const dates = (values[key] || []).map(normalizeDocumentDate).filter(validScanDate);
      if (new Set(dates).size > 1) flagConflict(key);
    }
    const mortgageStates = (values.mortgageStatus || []).flatMap(value => {
      const tokens = [languageValue([value], 'en'), languageValue([value], 'ar')];
      return tokens
        .map(token =>
          /^(?:not mortgaged|unmortgaged|غير مرهون[ة]?)(?:\s|$)/i.test(token)
            ? 'not_mortgaged'
            : /^(?:mortgaged|مرهون[ة]?)(?:\s|$)/i.test(token)
              ? 'mortgaged'
              : ''
        )
        .filter(Boolean);
    });
    if (new Set(mortgageStates).size > 1) {
      flagConflict('mortgageStatus');
      result.mortgageState = 'unknown';
    }
    refreshCoverage(diagnostics);
    return result;
  }

