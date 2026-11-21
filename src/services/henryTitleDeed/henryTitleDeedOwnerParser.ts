import { languageValue, normalizeDocumentText, readDocumentFields } from '../henryDocumentParsing';
import { DEED_LABELS, type DeedOwner } from './henryTitleDeed.types';

export function extractDeedOwners(
  text: string,
  diagnostics: any,
  normalizedNumber: (key: string, raw: string) => number | undefined,
  numericDisagreement: (key: string, rawValues: string[]) => boolean
): { owners: DeedOwner[]; ambiguousOwner: boolean } {
  const owners: DeedOwner[] = [];
    const ownerEvidence = new WeakMap<DeedOwner, Record<string, string[]>>();
    let ambiguousOwner = false;
    const normalizedName = (name: string) => normalizeDocumentText(name).trim().toLowerCase();
    const addOwner = (parsed: Record<string, string[]>) => {
      if (!parsed.ownerDldNumber?.[0] || !parsed.ownerName?.length) return;
      if (!/^\d+$/.test(parsed.ownerDldNumber[0])) return;
      const ambiguousKeys = ['ownerDldNumber', 'ownerSharePercent', 'ownedAreaSqM'].filter(key =>
        key === 'ownerDldNumber'
          ? (parsed[key]?.length || 0) > 1
          : numericDisagreement(key, parsed[key] || [])
      );
      if (
        ['en', 'ar'].some(
          language =>
            new Set(
              parsed
                .ownerName!.map(value =>
                  normalizedName(languageValue([value], language as 'en' | 'ar'))
                )
                .filter(Boolean)
            ).size > 1
        )
      )
        ambiguousKeys.push('ownerName');
      if (ambiguousKeys.length) {
        ambiguousOwner = true;
        for (const key of ambiguousKeys) diagnostics.fields[key]!.state = 'conflict';
        return;
      }
      const owner: DeedOwner = {
        dldNumber: parsed.ownerDldNumber[0],
        nameEn: languageValue(parsed.ownerName, 'en'),
        nameAr: languageValue(parsed.ownerName, 'ar'),
        sharePercent: normalizedNumber('ownerSharePercent', parsed.ownerSharePercent?.[0] || ''),
        ownedAreaSqM: normalizedNumber('ownedAreaSqM', parsed.ownedAreaSqM?.[0] || ''),
      };
      const sameName = (item: DeedOwner) =>
        (['nameEn', 'nameAr'] as const).every(
          key =>
            !item[key] || !owner[key] || normalizedName(item[key]) === normalizedName(owner[key])
        );
      const existing =
        owners.find(item => item.dldNumber === owner.dldNumber && sameName(item)) ||
        owners.find(item => item.dldNumber === owner.dldNumber);
      if (!existing) {
        owners.push(owner);
        ownerEvidence.set(owner, parsed);
        return;
      }
      const conflicting = [
        ...(['nameEn', 'nameAr'] as const)
          .filter(
            key =>
              existing[key] &&
              owner[key] &&
              normalizedName(existing[key]) !== normalizedName(owner[key])
          )
          .map(() => 'ownerName'),
        ...(['sharePercent', 'ownedAreaSqM'] as const)
          .filter(
            key =>
              existing[key] !== undefined &&
              owner[key] !== undefined &&
              numericDisagreement(key === 'sharePercent' ? 'ownerSharePercent' : key, [
                ...(ownerEvidence.get(existing)?.[
                  key === 'sharePercent' ? 'ownerSharePercent' : key
                ] || []),
                ...(parsed[key === 'sharePercent' ? 'ownerSharePercent' : key] || []),
              ])
          )
          .map(key => (key === 'sharePercent' ? 'ownerSharePercent' : key)),
      ];
      if (conflicting.length) {
        ambiguousOwner = true;
        for (const key of conflicting) {
          diagnostics.fields[key]!.state = 'conflict';
          const candidates =
            key === 'ownerName'
              ? [existing.nameEn, existing.nameAr, owner.nameEn, owner.nameAr]
              : key === 'ownerSharePercent'
                ? [existing.sharePercent, owner.sharePercent]
                : [existing.ownedAreaSqM, owner.ownedAreaSqM];
          diagnostics.fields[key]!.values = [
            ...new Set([
              ...diagnostics.fields[key]!.values,
              ...candidates.filter(value => value !== undefined && value !== '').map(String),
            ]),
          ];
        }
        if (!sameName(existing)) owners.push(owner);
        return;
      }
      existing.nameEn ||= owner.nameEn;
      existing.nameAr ||= owner.nameAr;
      existing.sharePercent ??= owner.sharePercent;
      existing.ownedAreaSqM ??= owner.ownedAreaSqM;
      const previous = ownerEvidence.get(existing) || {};
      ownerEvidence.set(
        existing,
        Object.fromEntries(
          Object.keys(parsed).map(key => [
            key,
            [...new Set([...(previous[key] || []), ...(parsed[key] || [])])],
          ])
        )
      );
    };
    // Table rows and labelled blocks use the same association checks.
    const ownerAliases = DEED_LABELS.ownerDldNumber!.map(label =>
      normalizeDocumentText(label)
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/ /g, '[ \\t]+')
    );
    const blocks = normalizeDocumentText(text).split(
      new RegExp(`(?=(?<![\\p{L}\\p{N}])(?:${ownerAliases.join('|')})(?![\\p{L}\\p{N}]))`, 'giu')
    );
    for (const block of blocks) addOwner(readDocumentFields(block, DEED_LABELS).values);
    const lines = normalizeDocumentText(text).split('\n');
    const ownerKeys = ['ownerDldNumber', 'ownerName', 'ownerSharePercent', 'ownedAreaSqM'];
    for (let i = 0; i < lines.length; i++) {
      const headers = lines[i]!.split(/\s*\|\s*/);
      const columns = headers.map(header =>
        ownerKeys.find(key =>
          DEED_LABELS[key]!.some(label => header.trim().toLowerCase() === label.toLowerCase())
        )
      );
      if (!columns.includes('ownerDldNumber') || !columns.includes('ownerName')) continue;
      for (let j = i + 1; j < lines.length; j++) {
        const cells = lines[j]!.split(/\s*\|\s*/);
        if (
          cells.length !== headers.length ||
          !/^\d+$/.test(cells[columns.indexOf('ownerDldNumber')] || '')
        )
          {
            if (cells.length === headers.length && cells.some(cell => cell.trim())) {
              ambiguousOwner = true;
              diagnostics.fields.ownerDldNumber!.state = 'conflict';
              diagnostics.warnings.push('Unassociated owner table row; compare identifiers and cell boundaries manually.');
            }
            break;
          }
        // Only attach continuation rows with empty identifiers and numeric cells.
        // Non-empty identifiers always begin a new owner, never an inferred association.
        while (j + 1 < lines.length) {
          const continuation = lines[j + 1]!.split(/\s*\|\s*/);
          if (continuation.length !== headers.length ||
            continuation.some((cell, index) => columns[index] !== 'ownerName' && cell.trim()) ||
            !continuation.some((cell, index) => columns[index] === 'ownerName' && cell.trim())) break;
          continuation.forEach((cell, index) => {
            if (columns[index] === 'ownerName' && cell.trim()) cells[index] += ` ${cell.trim()}`;
          });
          j++;
        }
        const parsed = Object.fromEntries(
          ownerKeys.map(key => [
            key,
            [
              ...new Set(
                cells
                  .filter((_, index) => columns[index] === key)
                  .map(value => value.trim())
                  .filter(Boolean)
              ),
            ],
          ])
        );
        addOwner(parsed);
      }
    }
    const shares = owners.map(owner => owner.sharePercent);
    if (shares.some(share => share !== undefined && (share < 0 || share > 100)) ||
      owners.length > 1 && shares.every(share => share !== undefined) &&
      Math.abs(shares.reduce<number>((sum, share) => sum + (share ?? 0), 0) - 100) > 0.01) {
      ambiguousOwner = true;
      diagnostics.fields.ownerSharePercent!.state = 'conflict';
      diagnostics.warnings.push('Owner share percentages are out of range or do not total 100%; verify the complete table without guessing.');
    }
    if (owners.length === 1 && !ambiguousOwner) {
      const ownerNameEn = owners[0]!.nameEn;
      const ownerNameAr = owners[0]!.nameAr;
      for (const [key, value] of Object.entries({
        ownerDldNumber: owners[0]!.dldNumber,
        ownerName: `${ownerNameEn} ${ownerNameAr}`.trim(),
        ownerSharePercent: owners[0]!.sharePercent,
        ownedAreaSqM: owners[0]!.ownedAreaSqM,
      })) {
        if (value !== undefined && value !== '')
          diagnostics.fields[key] = { state: 'extracted', source: 'text', values: [String(value)] };
      }
    }
    if (owners.length > 1 || ambiguousOwner) {
      diagnostics.fields.ownerName!.state = 'conflict';
      diagnostics.warnings.push(
        'Multiple owners detected. Select the authorized landlord during review; do not assume sole ownership.'
      );
    }
  return { owners, ambiguousOwner };
}

