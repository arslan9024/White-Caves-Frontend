/**
 * Page 1 HTML renderer for the official DLD Unified Tenancy Contract.
 * Covers Header, Owner/Lessor, Tenant, Property, Contract Info, and Signatures.
 */

import type { DldTenancyContractData } from './types';
import { renderDottedField, renderSignatureBlock } from './htmlHelpers';

export function renderTenancyPage1(data: DldTenancyContractData): string {
  return `
      <div class="dld-page" style="page-break-after: always; min-height: 1080px; padding: 25px 32px; font-family: 'Segoe UI', Arial, sans-serif; color: #1E293B; background: #FFFFFF; box-sizing: border-box; position: relative;">
        <!-- Official Full-Color Header Logos & Title -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; margin-bottom: 4px; border-bottom: 2px solid #E2E8F0;">
          <!-- Left: Official Government of Dubai Full-Color Crest -->
          <div style="text-align: left; display: flex; align-items: center; gap: 10px;">
            <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#DC2626" stroke-width="2.5"/>
              <path d="M50 14 C34 14 22 26 22 42 C22 58 36 78 50 86 C64 78 78 58 78 42 C78 26 66 14 50 14 Z" fill="#DC2626"/>
              <circle cx="50" cy="42" r="16" fill="#F59E0B"/>
              <path d="M50 30 L54 38 L62 39 L56 45 L58 53 L50 49 L42 53 L44 45 L38 39 L46 38 Z" fill="#FFFFFF"/>
              <path d="M30 68 Q50 78 70 68" stroke="#FFFFFF" stroke-width="3" fill="none"/>
            </svg>
            <div>
              <div style="font-weight: 900; font-size: 15px; color: #0F172A; line-height: 1.1; letter-spacing: 0.5px;">حكومة دبـــــــــــي</div>
              <div style="font-size: 8.5px; color: #DC2626; font-weight: 900; letter-spacing: 1px;">GOVERNMENT OF DUBAI</div>
            </div>
          </div>

          <!-- Right: Official Dubai Land Department Logo -->
          <div style="text-align: right; display: flex; align-items: center; gap: 10px; justify-content: flex-end;">
            <div>
              <div style="font-weight: 900; font-size: 15px; color: #0F172A; line-height: 1.1; letter-spacing: 0.5px;">دائــــرة الأراضــــي والأمـــــلاك</div>
              <div style="font-size: 9px; color: #059669; font-weight: 900; letter-spacing: 0.5px;">Land Department</div>
            </div>
            <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#F8FAFC" stroke="#059669" stroke-width="2.5"/>
              <path d="M50 18 L50 82 M50 26 Q32 36 30 54 M50 26 Q68 36 70 54 M50 40 Q28 50 26 66 M50 40 Q72 50 74 66" stroke="#059669" stroke-width="3.5" stroke-linecap="round" fill="none"/>
              <circle cx="50" cy="22" r="5" fill="#F59E0B"/>
            </svg>
          </div>
        </div>

        <!-- Center Official Form Title -->
        <div style="text-align: center; margin: 6px 0 12px 0;">
          <div style="font-size: 22px; font-weight: 900; color: #0F172A; letter-spacing: 4px; line-height: 1.2;">عــــقـــــد إيــــجــــــار</div>
          <div style="font-size: 12px; font-weight: 900; color: #DC2626; letter-spacing: 3px; margin-top: 1px;">TENANCY CONTRACT</div>
        </div>

        <!-- Date Line -->
        <div style="display: flex; justify-content: flex-start; align-items: baseline; font-size: 10px; margin-bottom: 8px; color: #1E293B;">
          <span style="font-weight: 700;">Date</span>
          <span style="display: inline-block; width: 140px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800; margin: 0 8px;">
            ${data.contractDate || '&nbsp;'}
          </span>
          <span style="font-weight: 700;">التاريخ</span>
        </div>

        <!-- 1. Owner / Lessor Information -->
        <div style="margin-bottom: 8px; border: 1px solid #1E293B; border-radius: 2px; overflow: hidden;">
          <div style="background: #1E293B; color: #FFFFFF; display: flex; justify-content: space-between; padding: 3px 10px; font-weight: 800; font-size: 11px;">
            <span>Owner / Lessor Information</span>
            <span style="direction: rtl;">معلومات المالك / المؤجر</span>
          </div>
          <div style="padding: 3px 4px; background: #FFFFFF;">
            ${renderDottedField("Owner's Name", data.ownerName, 'اسم المالك')}
            ${renderDottedField("Lessor's Name", data.lessorName, 'اسم المؤجر')}
            ${renderDottedField("Lessor's Emirates ID", data.lessorEmiratesId, 'الهوية الإماراتية للمؤجر')}

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 2px 6px; font-size: 9.5px;">
              <div style="display: flex; align-items: baseline; justify-content: space-between;">
                <span style="font-weight: 700; color: #1E293B;">License No. <span style="font-size: 7.5px; color: #64748B;">Incase of a Company</span></span>
                <span style="flex-grow: 1; margin: 0 6px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800;">${data.lessorLicenseNo || '&nbsp;'}</span>
                <span style="font-weight: 700; direction: rtl;">رقم الرخصة <span style="font-size: 7.5px; color: #64748B;">في حال كانت شركة</span></span>
              </div>
              <div style="display: flex; align-items: baseline; justify-content: space-between;">
                <span style="font-weight: 700; color: #1E293B;">Licensing Authority <span style="font-size: 7.5px; color: #64748B;">Incase of a Company</span></span>
                <span style="flex-grow: 1; margin: 0 6px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800;">${data.lessorLicensingAuthority || '&nbsp;'}</span>
                <span style="font-weight: 700; direction: rtl;">سلطة الترخيص <span style="font-size: 7.5px; color: #64748B;">في حال كانت شركة</span></span>
              </div>
            </div>

            ${renderDottedField("Lessor's Email", data.lessorEmail, 'البريد الإلكتروني للمؤجر')}
            ${renderDottedField("Lessor's Phone", data.lessorPhone, 'رقم هاتف المؤجر')}
          </div>
        </div>

        <!-- 2. Tenant Information -->
        <div style="margin-bottom: 8px; border: 1px solid #1E293B; border-radius: 2px; overflow: hidden;">
          <div style="background: #1E293B; color: #FFFFFF; display: flex; justify-content: space-between; padding: 3px 10px; font-weight: 800; font-size: 11px;">
            <span>Tenant Information</span>
            <span style="direction: rtl;">معلومات المستأجر</span>
          </div>
          <div style="padding: 3px 4px; background: #FFFFFF;">
            ${renderDottedField("Tenant's Name", data.tenantName, 'اسم المستأجر')}
            ${renderDottedField("Tenant's Emirates ID", data.tenantEmiratesId, 'الهوية الإماراتية للمستأجر')}

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 2px 6px; font-size: 9.5px;">
              <div style="display: flex; align-items: baseline; justify-content: space-between;">
                <span style="font-weight: 700; color: #1E293B;">License No. <span style="font-size: 7.5px; color: #64748B;">Incase of a Company</span></span>
                <span style="flex-grow: 1; margin: 0 6px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800;">${data.tenantLicenseNo || '&nbsp;'}</span>
                <span style="font-weight: 700; direction: rtl;">رقم الرخصة <span style="font-size: 7.5px; color: #64748B;">في حال كانت شركة</span></span>
              </div>
              <div style="display: flex; align-items: baseline; justify-content: space-between;">
                <span style="font-weight: 700; color: #1E293B;">Licensing Authority <span style="font-size: 7.5px; color: #64748B;">Incase of a Company</span></span>
                <span style="flex-grow: 1; margin: 0 6px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800;">${data.tenantLicensingAuthority || '&nbsp;'}</span>
                <span style="font-weight: 700; direction: rtl;">سلطة الترخيص <span style="font-size: 7.5px; color: #64748B;">في حال كانت شركة</span></span>
              </div>
            </div>

            ${renderDottedField("Tenant's Email", data.tenantEmail, 'البريد الإلكتروني للمستأجر')}
            ${renderDottedField("Tenant's Phone", data.tenantPhone, 'رقم هاتف المستأجر')}
          </div>
        </div>

        <!-- 3. Property Information -->
        <div style="margin-bottom: 8px; border: 1px solid #1E293B; border-radius: 2px; overflow: hidden;">
          <div style="background: #1E293B; color: #FFFFFF; display: flex; justify-content: space-between; padding: 3px 10px; font-weight: 800; font-size: 11px;">
            <span>Property Information</span>
            <span style="direction: rtl;">معلومات العقار</span>
          </div>
          <div style="padding: 3px 4px; background: #FFFFFF;">
            <!-- Usage Radio Bar -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 6px; font-size: 10px;">
              <span style="font-weight: 700; color: #1E293B;">Property Usage</span>
              <div style="display: flex; gap: 24px; font-weight: 700;">
                <span><span style="font-size: 13px;">${data.propertyUsage === 'industrial' ? '🔘' : '⚪'}</span> Industrial صناعي</span>
                <span><span style="font-size: 13px;">${data.propertyUsage === 'commercial' ? '🔘' : '⚪'}</span> Commercial تجاري</span>
                <span><span style="font-size: 13px;">${data.propertyUsage === 'residential' ? '🔘' : '⚪'}</span> Residential سكني</span>
              </div>
              <span style="font-weight: 700; color: #1E293B; direction: rtl;">استخدام العقار</span>
            </div>

            <!-- 2-Column Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div>
                ${renderDottedField('Plot No.', data.plotNo, 'رقم الأرض')}
                ${renderDottedField('Building Name', data.buildingName, 'اسم المبنى')}
                ${renderDottedField('Property Type', data.propertyType, 'نوع الوحدة')}
                ${renderDottedField('Location', data.location, 'الموقع')}
              </div>
              <div>
                ${renderDottedField('Makani No.', data.makaniNo, 'رقم مكاني')}
                ${renderDottedField('Property No.', data.propertyNo, 'رقم العقار')}
                ${renderDottedField('Property Area (s.m)', data.propertyAreaSqM ? `${data.propertyAreaSqM}` : '', 'مساحة العقار (متر.مربع)')}
                ${renderDottedField('Premises No. (DEWA)', data.premisesNoDewa, 'رقم المبنى (ديوا)')}
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Contract Information -->
        <div style="margin-bottom: 8px; border: 1px solid #1E293B; border-radius: 2px; overflow: hidden;">
          <div style="background: #1E293B; color: #FFFFFF; display: flex; justify-content: space-between; padding: 3px 10px; font-weight: 800; font-size: 11px;">
            <span>Contract Information</span>
            <span style="direction: rtl;">معلومات العقد</span>
          </div>
          <div style="padding: 3px 4px; background: #FFFFFF;">
            <!-- Contract Period & Value -->
            <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 10px; padding: 2px 6px; font-size: 10px;">
              <div style="display: flex; align-items: baseline; justify-content: space-between;">
                <span style="font-weight: 700; color: #1E293B;">Contract Period</span>
                <span style="font-weight: 600; font-size: 9.5px; margin-left: 4px;">From من</span>
                <span style="flex-grow: 1; margin: 0 4px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800;">${data.contractPeriodFrom || '&nbsp;'}</span>
                <span style="font-weight: 600; font-size: 9.5px;">To إلى</span>
                <span style="flex-grow: 1; margin: 0 4px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800;">${data.contractPeriodTo || '&nbsp;'}</span>
                <span style="font-weight: 700; direction: rtl;">فترة العقد</span>
              </div>
              <div style="display: flex; align-items: baseline; justify-content: space-between;">
                <span style="font-weight: 700; color: #1E293B;">Contract Value</span>
                <span style="flex-grow: 1; margin: 0 8px; border-bottom: 1px dotted #94A3B8; text-align: center; font-weight: 800;">${data.contractValue ? `AED ${data.contractValue.toLocaleString()}` : '&nbsp;'}</span>
                <span style="font-weight: 700; direction: rtl;">قيمة العقد</span>
              </div>
            </div>

            <!-- Annual Rent & Security Deposit -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              ${renderDottedField('Annual Rent', data.annualRent ? `AED ${data.annualRent.toLocaleString()}` : '', 'الايجار السنوي')}
              ${renderDottedField('Security Deposit Amount', data.securityDepositAmount ? `AED ${data.securityDepositAmount.toLocaleString()}` : '', 'مبلغ التأمين')}
            </div>

            ${renderDottedField('Mode of Payment', data.modeOfPayment, 'طريقة الدفع')}
          </div>
        </div>

        <!-- 5. Signatures -->
        ${renderSignatureBlock(data, '4px', '12px 14px')}
      </div>
    `;
}
