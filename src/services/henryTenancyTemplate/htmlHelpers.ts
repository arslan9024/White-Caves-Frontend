/**
 * Shared HTML escaping and bilingual layout primitives for DLD Tenancy Contract pages.
 */

import type { DldTenancyContractData } from './types';

export function escapeHtmlText(value: string): string {
  return value.replace(
    /[&<>"']/g,
    character =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]!
  );
}

/**
 * Every dynamic string crosses this boundary once; template markup stays trusted.
 */
export function escapeContractData(raw: DldTenancyContractData): DldTenancyContractData {
  const escaped: DldTenancyContractData = {
    ...raw,
    additionalTerms: raw.additionalTerms.map(escapeHtmlText),
  };
  for (const [key, value] of Object.entries(escaped)) {
    if (typeof value === 'string') {
      Object.assign(escaped, { [key]: escapeHtmlText(value) });
    }
  }
  return escaped;
}

export function renderDottedField(
  enLabel: string,
  value: string | number | undefined,
  arLabel: string,
  extraSub?: string
): string {
  return `
      <div style="display: flex; justify-content: space-between; align-items: baseline; padding: 4px 6px; font-size: 10px;">
        <span style="font-weight: 700; color: #1E293B; min-width: 140px; text-align: left;">
          ${enLabel} ${extraSub ? `<span style="font-size: 8px; color: #64748B; font-weight: normal;">${extraSub}</span>` : ''}
        </span>
        <span style="flex-grow: 1; margin: 0 10px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800; color: #0F172A; font-size: 10.5px; line-height: 1.2;">
          ${value !== undefined && value !== '' ? value : '&nbsp;'}
        </span>
        <span style="font-weight: 700; color: #1E293B; min-width: 140px; text-align: right; direction: rtl;">
          ${arLabel}
        </span>
      </div>
    `;
}

export function renderCompactDldHeader(): string {
  return `
        <!-- Official Full-Color Header Logos -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; margin-bottom: 4px; border-bottom: 2px solid #E2E8F0;">
          <div style="text-align: left; display: flex; align-items: center; gap: 10px;">
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#DC2626" stroke-width="2.5"/>
              <path d="M50 14 C34 14 22 26 22 42 C22 58 36 78 50 86 C64 78 78 58 78 42 C78 26 66 14 50 14 Z" fill="#DC2626"/>
              <circle cx="50" cy="42" r="16" fill="#F59E0B"/>
            </svg>
            <div>
              <div style="font-weight: 900; font-size: 14px; color: #0F172A; line-height: 1.1;">حكومة دبـــــــــــي</div>
              <div style="font-size: 8px; color: #DC2626; font-weight: 900; letter-spacing: 0.5px;">GOVERNMENT OF DUBAI</div>
            </div>
          </div>
          <div style="text-align: right; display: flex; align-items: center; gap: 10px; justify-content: flex-end;">
            <div>
              <div style="font-weight: 900; font-size: 14px; color: #0F172A; line-height: 1.1;">دائــــرة الأراضــــي والأمـــــلاك</div>
              <div style="font-size: 8.5px; color: #059669; font-weight: 900;">Land Department</div>
            </div>
            <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#059669" stroke-width="2.5"/>
              <path d="M50 18 L50 82 M50 26 Q32 36 30 54 M50 26 Q68 36 70 54 M50 40 Q28 50 26 66 M50 40 Q72 50 74 66" stroke="#059669" stroke-width="3.5" stroke-linecap="round" fill="none"/>
            </svg>
          </div>
        </div>
  `;
}

export function renderSignatureBlock(
  data: DldTenancyContractData,
  marginTop: string,
  padding: string
): string {
  return `
        <div style="border: 1px solid #1E293B; border-radius: 2px; overflow: hidden; margin-top: ${marginTop};">
          <div style="background: #1E293B; color: #FFFFFF; display: flex; justify-content: space-between; padding: 3px 10px; font-weight: 800; font-size: 11px;">
            <span>Signatures</span>
            <span style="direction: rtl;">التوقيعات</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; padding: ${padding}; gap: 24px; font-size: 10px; background: #FFFFFF;">
            <div style="display: flex; align-items: baseline; justify-content: space-between;">
              <span style="font-weight: 700;">Tenant Signature</span>
              <span style="font-weight: 700; direction: rtl;">توقيع المستأجر</span>
              <span style="display: inline-block; width: 80px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800; margin: 0 4px;">${data.tenantSignature || '&nbsp;'}</span>
              <span style="font-weight: 700;">Date</span>
              <span style="display: inline-block; width: 60px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800; margin: 0 4px;">${data.tenantSignatureDate || '&nbsp;'}</span>
              <span style="font-weight: 700; direction: rtl;">التاريخ</span>
            </div>
            <div style="display: flex; align-items: baseline; justify-content: space-between;">
              <span style="font-weight: 700;">Lessor's Signature</span>
              <span style="font-weight: 700; direction: rtl;">توقيع المؤجر</span>
              <span style="display: inline-block; width: 80px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800; margin: 0 4px;">${data.lessorSignature || '&nbsp;'}</span>
              <span style="font-weight: 700;">Date</span>
              <span style="display: inline-block; width: 60px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800; margin: 0 4px;">${data.lessorSignatureDate || '&nbsp;'}</span>
              <span style="font-weight: 700; direction: rtl;">التاريخ</span>
            </div>
          </div>
        </div>
  `;
}
