import { GovernmentEjariRecord } from './types';

/**
 * 2. Displays a synthetic Ejari layout, never a government certificate.
 */
export function generateGovernmentEjariArchiveHtml(record: GovernmentEjariRecord): string {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Ejari Layout Demo — Not a Certificate</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 24px; color: #0F172A; background: #FFFFFF; }
          .cert-border { border: 4px double #1E293B; padding: 24px; border-radius: 8px; background: #FFFCF9; }
          .header { text-align: center; border-bottom: 2px solid #B45309; padding-bottom: 12px; margin-bottom: 20px; }
          .qr-box { width: 90px; height: 90px; border: 1px solid #CBD5E1; display: inline-flex; align-items: center; justify-content: center; font-family: monospace; font-size: 10px; background: #FFFFFF; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 12px; line-height: 1.8; }
          .vault-badge { background: #16A34A; color: white; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 800; }
        </style>
      </head>
      <body>
        <div class="cert-border">
          <div class="header">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="vault-badge">DEMO ONLY — NOT A GOVERNMENT RECORD</span>
              <span style="font-size: 11px; color: #64748B;">Not archived</span>
            </div>
            <h2 style="margin: 12px 0 2px; color: #1E293B; font-size: 18px;">HENRY — SYNTHETIC LAYOUT PREVIEW</h2>
            <h3 style="margin: 0; color: #B45309; font-size: 15px;">NOT AN EJARI CERTIFICATE OF REGISTRATION</h3>
            <div style="font-size: 13px; font-weight: 800; color: #1E293B; margin-top: 6px;">EJARI NUMBER: ${record.ejariNumber}</div>
          </div>

          <div class="grid">
            <div style="background: white; border: 1px solid #E2E8F0; padding: 12px; border-radius: 6px;">
              <strong>Contract Reference:</strong> ${record.contractReference}<br>
              <strong>Property Address:</strong> ${record.propertyAddress}<br>
              <strong>Registered Annual Rent:</strong> AED ${record.registeredRentAed.toLocaleString()}<br>
              <strong>Issue Date:</strong> ${record.issueDate}<br>
              <strong>Expiry Date:</strong> <span style="color: #DC2626; font-weight: bold;">${record.expiryDate}</span>
            </div>

            <div style="background: white; border: 1px solid #E2E8F0; padding: 12px; border-radius: 6px;">
              <strong>Landlord (Lessor):</strong> ${record.landlordName}<br>
              <strong>Tenant (Lessee):</strong> ${record.tenantName}<br>
              <strong>Registered Broker:</strong> ${record.brokerName} (BRN: ${record.brokerBrn})<br>
              <strong>DLD Barcode Hash:</strong> <code style="font-size: 10px;">${record.dldBarcodeHash}</code>
            </div>
          </div>

          <div style="margin-top: 24px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 16px;">
            <div class="qr-box">NO QR VALIDATION</div>
            <div style="font-size: 11px; color: #64748B; margin-top: 8px;">
              Synthetic demonstration only. No DLD registration, certificate verification or vault archival has occurred. Obtain the original certificate through the authorized government process.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
}
