/**
 * Pages 2 & 3 HTML renderers and top-level 3-page DLD Tenancy Contract compiler.
 */

import type { DldTenancyContractData } from './types';
import { STANDARD_BILINGUAL_LEGAL_TERMS } from './presets';
import { escapeContractData, renderCompactDldHeader, renderSignatureBlock } from './htmlHelpers';
import { renderTenancyPage1 } from './renderPage1';

export function renderTenancyPage2(data: DldTenancyContractData): string {
  return `
      <div class="dld-page" style="page-break-after: always; min-height: 1080px; padding: 25px 32px; font-family: 'Segoe UI', Arial, sans-serif; color: #1E293B; background: #FFFFFF; box-sizing: border-box;">
        ${renderCompactDldHeader()}

        <!-- Terms and Conditions Banner -->
        <div style="background: #1E293B; color: #FFFFFF; display: flex; justify-content: space-between; padding: 4px 12px; font-weight: 800; font-size: 11px; margin-bottom: 8px; border-radius: 2px;">
          <span>Terms and Conditions</span>
          <span style="direction: rtl;">الأحكام و الشروط</span>
        </div>

        <!-- 14 Bilingual Standard Legal Terms -->
        <table style="width: 100%; border-collapse: collapse; font-size: 8.5px; line-height: 1.4; color: #1E293B;">
          <tbody>
            ${STANDARD_BILINGUAL_LEGAL_TERMS.map(
              ([en, ar]) => `
              <tr style="border-bottom: 1px solid #E2E8F0; vertical-align: top;">
                <td style="width: 50%; padding: 4.5px 8px; text-align: left;">${en}</td>
                <td style="width: 50%; padding: 4.5px 8px; text-align: right; direction: rtl; font-weight: 600;">${ar}</td>
              </tr>
            `
            ).join('')}
          </tbody>
        </table>

        <!-- Page 2 Signatures -->
        ${renderSignatureBlock(data, '14px', '10px 14px')}
      </div>
    `;
}

export function renderTenancyPage3(data: DldTenancyContractData): string {
  return `
      <div class="dld-page" style="min-height: 1080px; padding: 25px 32px; font-family: 'Segoe UI', Arial, sans-serif; color: #1E293B; background: #FFFFFF; box-sizing: border-box; position: relative;">
        ${renderCompactDldHeader()}

        <!-- 1. Know Your Rights Banner -->
        <div style="margin-bottom: 8px; border: 1px solid #1E293B; border-radius: 2px; overflow: hidden;">
          <div style="background: #1E293B; color: #FFFFFF; display: flex; justify-content: space-between; padding: 3px 10px; font-weight: 800; font-size: 11px;">
            <span>Know your Rights</span>
            <span style="direction: rtl;">لمعرفة حقوق الأطراف</span>
          </div>
          <div style="padding: 6px 10px; font-size: 9px; line-height: 1.45; display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div>
              • You may visit Rental Dispute Center website through <a href="https://www.dubailand.gov.ae" style="color: #1E293B; text-decoration: underline;">www.dubailand.gov.ae</a> in case of any rental dispute between parties.<br/>
              • Law No 26 of 2007 regulating relationship between landlords and tenants.<br/>
              • Law No 33 of 2008 amending law 26 of year 2007.<br/>
              • Law No 43 of 2013 determining rent increases for properties
            </div>
            <div style="direction: rtl; text-align: right;">
              • يمكنكم زيارة موقع مركز فض المنازعات الإيجارية من خلال <span style="text-decoration: underline;">www.dubailand.gov.ae</span> في حال نشوء أي نزاع إيجاري بين الأطراف<br/>
              • الإطلاع على قانون رقم 26 لسنة 2007 بشأن تنظيم العلاقة بين المؤجرين والمستأجرين<br/>
              • الإطلاع على قانون رقم 33 لسنة 2008 الخاص بتعديل بعض أحكام قانون 26 لعام 2007<br/>
              • الإطلاع على قانون رقم 43 لسنة 2013 بشأن تحديد زيادة بدل الإيجار
            </div>
          </div>
        </div>

        <!-- 2. Attachments for Ejari Registration -->
        <div style="margin-bottom: 8px; border: 1px solid #1E293B; border-radius: 2px; overflow: hidden;">
          <div style="background: #1E293B; color: #FFFFFF; display: flex; justify-content: space-between; padding: 3px 10px; font-weight: 800; font-size: 11px;">
            <span>Attachments for Ejari Registration</span>
            <span style="direction: rtl;">مرفقات التسجيل في إيجاري</span>
          </div>
          <div style="padding: 6px 10px; font-size: 9px; line-height: 1.45; display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div>
              1. Original unified tenancy contract<br/>
              2. Original emirates ID of applicant
            </div>
            <div style="direction: rtl; text-align: right;">
              .١ نسخة أصلية عن عقد الايجار الموحد<br/>
              .٢ الهوية الإماراتية الأصلية لمقدم الطلب
            </div>
          </div>
        </div>

        <!-- 3. Additional Terms -->
        <div style="margin-bottom: 12px; border: 1px solid #1E293B; border-radius: 2px; overflow: hidden; position: relative;">
          <div style="background: #1E293B; color: #FFFFFF; display: flex; justify-content: space-between; padding: 3px 10px; font-weight: 800; font-size: 11px;">
            <span>Additional Terms</span>
            <span style="direction: rtl;">شروط إضافية</span>
          </div>

          <!-- Light Watermark EJARI -->
          <div style="position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); font-size: 60px; font-weight: 900; color: rgba(203, 213, 225, 0.25); letter-spacing: 12px; pointer-events: none; text-align: center; line-height: 1;">
            إيجــــــــاري<br/><span style="font-size: 40px; letter-spacing: 8px;">EJARI</span>
          </div>

          <div style="padding: 6px 10px; min-height: 180px; position: relative; z-index: 1;">
            ${Array.from(
              { length: Math.max(5, data.additionalTerms.length) },
              (_, index) => index + 1
            )
              .map(num => {
                const arabicNum = String(num).replace(/\d/g, digit => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]!);
                const termValue =
                  data.additionalTerms && data.additionalTerms[num - 1]
                    ? data.additionalTerms[num - 1].replace(/^[0-9]+\.\s*/, '')
                    : '';

                return `
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; font-size: 10px;">
                  <span style="font-weight: 700; color: #1E293B; min-width: 25px;">${num}.</span>
                  <span style="flex-grow: 1; margin: 0 10px; border-bottom: 1px dotted #94A3B8; font-weight: 700; color: #0F172A; font-size: 9.5px; white-space: pre-wrap;">${termValue || '&nbsp;'}</span>
                  <span style="font-weight: 700; color: #1E293B; min-width: 25px; text-align: right;">.${arabicNum}</span>
                </div>
              `;
              })
              .join('')}

            <div style="display: flex; justify-content: space-between; font-size: 8.5px; color: #475569; margin-top: 10px; border-top: 1px solid #F1F5F9; padding-top: 6px;">
              <span style="max-width: 48%;">Note : You may add addendum to this tenancy contract in case you have additional terms while it needs to be signed by all parties</span>
              <span style="max-width: 48%; direction: rtl; text-align: right;">ملاحظة: يمكن إضافة ملحق إلى هذا العقد في حال وجود أي شروط إضافية، على أن يوقع من أطراف التعاقد</span>
            </div>
          </div>
        </div>

        <!-- Page 3 Signatures -->
        ${renderSignatureBlock(data, '8px', '10px 14px')}

        <!-- Official DLD Footer -->
        <div style="border-top: 1px solid #CBD5E1; padding-top: 6px; margin-top: 8px; font-size: 8px; color: #475569; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>Tel:</strong> 8004488 &nbsp;|&nbsp; <strong>Fax:</strong> +971 4 222 2251 &nbsp;|&nbsp; <strong>P.O.Box</strong> 1166, Dubai, U.A.E.
          </div>
          <div>
            <strong>Website:</strong> www.dubailand.gov.ae &nbsp;|&nbsp; <strong>E-mail:</strong> support@dubailand.gov.ae
          </div>
        </div>
      </div>
    `;
}

export function generateDldTenancyContractHtml(
  rawData: DldTenancyContractData,
  page: number | 'all' = 'all'
): string {
  const data = escapeContractData(rawData);
  const page1Html = renderTenancyPage1(data);
  const page2Html = renderTenancyPage2(data);
  const page3Html = renderTenancyPage3(data);

  if (page === 1) return page1Html;
  if (page === 2) return page2Html;
  if (page === 3) return page3Html;

  return `
      <div class="dld-contract-document" style="background: #E2E8F0; padding: 10px; display: flex; flex-direction: column; gap: 20px;">
        ${page1Html}
        ${page2Html}
        ${page3Html}
      </div>
    `;
}
