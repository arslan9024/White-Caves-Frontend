import { TenancyContractPayload, PdfAnnotation } from './types';

/**
 * 1. Compiles the Unified Tenancy Contract ready for e-Signature link sharing
 */
export function generateTenancyContractHtml(
  payload: TenancyContractPayload,
  _annotations: PdfAnnotation[] = []
): string {
  const pdcRows = payload.pdcSchedule
    .map(
      (pdc, idx) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #CBD5E1; text-align: center;">${idx + 1}</td>
          <td style="padding: 8px; border: 1px solid #CBD5E1; font-family: monospace;">${pdc.chequeNumber}</td>
          <td style="padding: 8px; border: 1px solid #CBD5E1;">${pdc.dueDate}</td>
          <td style="padding: 8px; border: 1px solid #CBD5E1; font-weight: bold; text-align: right;">AED ${pdc.amountAed.toLocaleString()}</td>
          <td style="padding: 8px; border: 1px solid #CBD5E1;">${pdc.bankName}</td>
          <td style="padding: 8px; border: 1px solid #CBD5E1; text-align: center; text-transform: uppercase; font-size: 11px; font-weight: bold; color: ${
            pdc.status === 'cleared' ? '#16A34A' : pdc.status === 'bounced' ? '#DC2626' : '#2563EB'
          }">${pdc.status}</td>
        </tr>
      `
    )
    .join('');

  const clausesList = (payload.specialClauses || [
    'The tenant shall not sublease or assign the property without the written consent of the landlord.',
    'The landlord agrees to maintain all major structural repairs exceeding AED 500.',
    'Notice of non-renewal must be served 90 days prior to contract expiry via registered notary email/courier.',
  ])
    .map((clause, idx) => `<li style="margin-bottom: 6px; font-size: 12px; line-height: 1.5;">${idx + 1}. ${clause}</li>`)
    .join('');

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Tenancy Contract — ${payload.contractNumber}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print { display: none !important; } }
          body { font-family: 'Inter', sans-serif; color: #0F172A; background: #FFFFFF; padding: 24px; box-sizing: border-box; }
          .header-table { width: 100%; border-bottom: 3px solid #EF4444; padding-bottom: 12px; margin-bottom: 20px; }
          .badge { background: #EF4444; color: #FFFFFF; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 800; }
          .section-heading { background: #1E293B; color: #FFFFFF; padding: 6px 12px; font-size: 13px; font-weight: bold; border-left: 4px solid #EF4444; margin-top: 18px; margin-bottom: 10px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 12px; }
          .box { border: 1px solid #E2E8F0; border-radius: 6px; padding: 12px; background: #F8FAFC; font-size: 12px; line-height: 1.6; }
          .esign-banner { background: #FEF2F2; border: 1.5px solid #FECACA; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
          .stamp-box { border: 2px dashed #EF4444; border-radius: 8px; padding: 16px; text-align: center; color: #EF4444; background: rgba(239, 68, 68, 0.03); margin-top: 20px; }
          .watermark-text { position: fixed; top: 40%; left: 15%; transform: rotate(-30deg); font-size: 5rem; font-weight: 900; color: rgba(239, 68, 68, 0.06); pointer-events: none; text-transform: uppercase; z-index: 999; }
        </style>
      </head>
      <body>
        <div class="watermark-text">PREPARATION PREVIEW</div>

        <div class="esign-banner no-print">
          <div>
            <strong style="color: #991B1B; font-size: 13px;">PREPARATION PREVIEW — NOT SIGNED</strong>
            <div style="font-size: 11px; color: #7F1D1D; margin-top: 2px;">No signing provider is connected. No link is generated or sent.</div>
          </div>
          <span class="badge">DRAFT ONLY</span>
        </div>

        <table class="header-table">
          <tr>
            <td style="vertical-align: middle;">
              <h1 style="margin: 0; font-size: 20px; color: #1E293B; letter-spacing: 0.5px;">GOVERNMENT OF DUBAI — LAND DEPARTMENT</h1>
              <h2 style="margin: 4px 0 0; font-size: 14px; color: #EF4444; font-weight: 800;">TENANCY CONTRACT PREPARATION DRAFT</h2>
              <span style="font-size: 11px; color: #64748B;">Regulated by Law No. (26) of 2007 & Law No. (33) of 2008</span>
            </td>
            <td style="text-align: right; vertical-align: middle;">
              <div style="font-size: 12px; font-weight: bold; margin-bottom: 4px;">Contract Ref: ${payload.contractNumber}</div>
              <span class="badge">RERA ORN: ${payload.broker.agencyOrn}</span>
              <div style="font-size: 10px; color: #64748B; margin-top: 4px;">DET License: ${payload.broker.detLicense}</div>
            </td>
          </tr>
        </table>

        <div class="section-heading">1. PROPERTY DETAILS & LEASE PERIOD</div>
        <div class="info-grid">
          <div class="box">
            <strong>Property:</strong> ${payload.propertyTitle}<br>
            <strong>Unit Number:</strong> ${payload.unitNumber}<br>
            <strong>Community / Area:</strong> ${payload.community}<br>
            <strong>Premises Usage:</strong> Residential Leased
          </div>
          <div class="box">
            <strong>Annual Rent:</strong> AED ${payload.annualRentAed.toLocaleString()}<br>
            <strong>Security Deposit:</strong> AED ${payload.securityDepositAed.toLocaleString()} (Refundable)<br>
            <strong>Lease Period:</strong> ${payload.leaseStartDate} to ${payload.leaseEndDate}<br>
            <strong>Payment Terms:</strong> ${payload.pdcSchedule.length} Post-Dated Cheques
          </div>
        </div>

        <div class="section-heading">2. CONTRACT PARTIES (LESSOR & LESSEE)</div>
        <div class="info-grid">
          <div class="box">
            <strong style="color: #EF4444;">LANDLORD / LESSOR:</strong><br>
            <strong>Name:</strong> ${payload.landlord.name}<br>
            <strong>Emirates ID / Passport:</strong> ${payload.landlord.emiratesIdOrPassport}<br>
            <strong>Email:</strong> ${payload.landlord.email}<br>
            <strong>Phone:</strong> ${payload.landlord.phone}
          </div>
          <div class="box">
            <strong style="color: #2563EB;">TENANT / LESSEE:</strong><br>
            <strong>Name:</strong> ${payload.tenant.name}<br>
            <strong>Emirates ID / Passport:</strong> ${payload.tenant.emiratesIdOrPassport}<br>
            <strong>Email:</strong> ${payload.tenant.email}<br>
            <strong>Phone:</strong> ${payload.tenant.phone}
          </div>
        </div>

        <div class="section-heading">3. POST-DATED CHEQUES (PDC) REPAYMENT SCHEDULE</div>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 12px;">
          <thead>
            <tr style="background: #F1F5F9; color: #1E293B; font-weight: bold;">
              <th style="padding: 8px; border: 1px solid #CBD5E1;">#</th>
              <th style="padding: 8px; border: 1px solid #CBD5E1;">Cheque No.</th>
              <th style="padding: 8px; border: 1px solid #CBD5E1;">Due Date</th>
              <th style="padding: 8px; border: 1px solid #CBD5E1; text-align: right;">Amount</th>
              <th style="padding: 8px; border: 1px solid #CBD5E1;">Drawee Bank</th>
              <th style="padding: 8px; border: 1px solid #CBD5E1;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${pdcRows}
          </tbody>
        </table>

        <div class="section-heading">4. SPECIAL CONDITIONS & TENANCY CLAUSES</div>
        <ul style="padding-left: 20px; margin: 8px 0;">
          ${clausesList}
        </ul>

        <div class="stamp-box">
          <div style="font-weight: 800; font-size: 13px;">PREPARATION ONLY — SIGNATURES NOT VERIFIED</div>
          <div style="font-size: 11px; margin-top: 4px; color: #64748B;">
            Supervised by Henry AI • White Caves Real Estate LLC • RERA ORN: ${payload.broker.agencyOrn}
          </div>
          <div style="margin-top: 12px; display: flex; justify-content: space-around; font-size: 11px; font-weight: bold; color: #1E293B;">
            <div>Lessor signature: [NOT VERIFIED]</div>
            <div>Lessee signature: [NOT VERIFIED]</div>
            <div>Broker witness: [NOT VERIFIED]</div>
          </div>
        </div>
      </body>
      </html>
    `;
}
