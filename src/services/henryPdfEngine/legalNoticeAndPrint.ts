/**
 * Generates DLD Form 12 Legal Notice for 12-Month Eviction Notice (Dubai Law 33 of 2008)
 */
export function generateForm12LegalNoticeHtml(
  contractNumber: string,
  propertyAddress: string,
  landlordName: string,
  tenantName: string,
  evictionReason: 'sale' | 'personal_use' | 'demolition' | 'major_renovation',
  effectiveDate: string
): string {
  const reasonsMap = {
    sale: 'The Landlord wishes to sell the leased property in accordance with Article 25(2)(c) of Law No. 33 of 2008.',
    personal_use: 'The Landlord wishes to recover the property for personal use or first-degree next of kin.',
    demolition: 'The property requires comprehensive reconstruction or demolition approved by Dubai Municipality.',
    major_renovation: 'The property requires major renovation that cannot be executed while the tenant is occupying.',
  };

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Form 12 Legal Notice — ${contractNumber}</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 32px; color: #0F172A; line-height: 1.7; font-size: 13px; }
          .header { border-bottom: 2px solid #EF4444; padding-bottom: 16px; margin-bottom: 24px; text-align: center; }
          .notary-badge { background: #DC2626; color: white; padding: 4px 12px; font-weight: 800; font-size: 12px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="header">
          <span class="notary-badge">FORM 12 — NOTARIZED 12-MONTH LEGAL NOTICE TO VACATE</span>
          <h2 style="margin: 12px 0 4px; color: #1E293B;">DUBAI LAND DEPARTMENT & NOTARY PUBLIC</h2>
          <p style="margin: 0; color: #64748B; font-size: 11px;">Pursuant to Law No. (26) of 2007, as amended by Law No. (33) of 2008</p>
        </div>

        <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
        <p><strong>To (Tenant):</strong> ${tenantName}<br>
        <strong>Property:</strong> ${propertyAddress}<br>
        <strong>Tenancy Contract Reference:</strong> ${contractNumber}</p>

        <p>Dear ${tenantName},</p>

        <p>Please accept this formal 12-month legal notice pursuant to Article (25), Clause (2) of Dubai Law No. 33 of 2008 regarding the relationship between Landlords and Tenants in the Emirate of Dubai.</p>

        <p><strong>Reason for Eviction:</strong><br>
        ${reasonsMap[evictionReason] || reasonsMap.sale}</p>

        <p>In accordance with Dubai Real Estate legislation, you are hereby given twelve (12) calendar months from the date of receipt of this notice to vacate the premises and deliver vacant possession on or before <strong>${effectiveDate}</strong>.</p>

        <div style="margin-top: 40px; display: flex; justify-content: space-between;">
          <div>
            <strong>Landlord Name:</strong> ${landlordName}<br>
            Signature: __________________________
          </div>
          <div>
            <strong>Legal Facilitator:</strong> White Caves Real Estate LLC<br>
            Henry AI Document & Compliance Seal [REGISTERED]
          </div>
        </div>
      </body>
      </html>
    `;
}

/**
 * Triggers native high-DPI laser print dialog in browser
 */
export function triggerPrint(htmlContent: string): void {
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 350);
  }
}
