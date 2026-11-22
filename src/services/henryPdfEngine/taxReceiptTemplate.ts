import QRCode from 'qrcode';
import { TaxReceiptPayload } from './types';

/**
 * 4. Generates Payment Receipts & Tax Invoices with TRN & FTA 5% VAT for Tenants & Landlords
 */
export async function generateTaxReceiptHtml(payload: TaxReceiptPayload): Promise<string> {
  const isTenant = payload.billedPartyType === 'tenant' || payload.receiptType === 'tenant_service_charges';
  const isLandlord =
    payload.billedPartyType === 'landlord' ||
    payload.receiptType === 'landlord_service_charges' ||
    payload.receiptType === 'landlord_property_management';

  const formattedType = (payload.receiptType || 'agency_commission').replace(/_/g, ' ').toUpperCase();
  const partyBadge = isTenant
    ? 'TENANT SERVICE CHARGE & INVOICE'
    : isLandlord
    ? 'LANDLORD PROPERTY MANAGEMENT & SERVICE INVOICE'
    : 'OFFICIAL TAX INVOICE & RECEIPT';
  const partyColor = isTenant ? '#2563EB' : isLandlord ? '#16A34A' : '#EF4444';

  const getTlvBuffer = (tag: number, value: string) => {
    const valueBuffer = Buffer.from(value, 'utf-8');
    const tagBuffer = Buffer.from([tag]);
    const lengthBuffer = Buffer.from([valueBuffer.length]);
    return Buffer.concat([tagBuffer, lengthBuffer, valueBuffer]);
  };

  const sellerName = 'WHITE CAVES REAL ESTATE L.L.C';
  const vatNumber = payload.whiteCavesTrn || '100488291000003';
  const dateTime = payload.date + 'T12:00:00Z';
  const totalAmount = payload.totalWithVatAed.toFixed(2);
  const vatAmount = payload.vatAmountAed.toFixed(2);

  const tlvBuffer = Buffer.concat([
    getTlvBuffer(1, sellerName),
    getTlvBuffer(2, vatNumber),
    getTlvBuffer(3, dateTime),
    getTlvBuffer(4, totalAmount),
    getTlvBuffer(5, vatAmount),
  ]);
  const ftaQrCodeBase64 = tlvBuffer.toString('base64');
  const qrCodeDataUrl = await QRCode.toDataURL(ftaQrCodeBase64, { width: 120, margin: 1 });

  const qrCodeHtml = `<div style="text-align: center; border: 1px solid #E2E8F0; padding: 8px; border-radius: 6px; display: inline-block; background: #fff;">
      <img src="${qrCodeDataUrl}" alt="FTA QR Code" style="width: 100px; height: 100px;" />
      <div style="font-size: 9px; color: #64748B; margin-top: 4px;">FTA Compliant</div>
    </div>`;

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Tax Invoice / Receipt — ${payload.receiptNumber}</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 24px; color: #0F172A; font-size: 12px; }
          .header { border-bottom: 2px solid #EF4444; padding-bottom: 12px; margin-bottom: 16px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          .table th, .table td { padding: 10px 12px; border: 1px solid #CBD5E1; }
          .table th { background: #1E293B; color: white; text-align: left; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; color: white; font-weight: 800; font-size: 11px; margin-bottom: 6px; }
          .bank-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 12px; margin-top: 16px; font-size: 11px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <span class="badge" style="background: ${partyColor};">${partyBadge}</span>
              <h2 style="margin: 4px 0 0; color: #1E293B; font-size: 18px;">WHITE CAVES REAL ESTATE L.L.C</h2>
              <div style="font-size: 11px; color: #64748B;">Tax Registration Number (TRN): <strong>${payload.whiteCavesTrn || '100488291000003'}</strong></div>
              <div style="font-size: 11px; color: #64748B;">DET License: <strong>1388443</strong> | RERA ORN: <strong>44483</strong></div>
              <div style="font-size: 11px; color: #64748B;">Office D-72, Port Saeed, Dubai, UAE • Phone: +971 4 335 0592</div>
            </div>
            <div style="text-align: right;">
              ${qrCodeHtml}
              <h3 style="margin: 12px 0 0; color: #EF4444; font-size: 16px;">TAX INVOICE / VOUCHER</h3>
              <div style="font-weight: bold; font-size: 13px; margin-top: 4px;">Ref: ${payload.receiptNumber}</div>
              <div style="font-size: 11px; color: #64748B; margin-top: 2px;">Issue Date: ${payload.date}</div>
              <div style="font-size: 11px; font-weight: bold; margin-top: 4px;">PREVIEW ONLY — PAYMENT NOT VERIFIED</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
          <div style="border: 1px solid #E2E8F0; padding: 12px; border-radius: 6px; background: #F8FAFC;">
            <strong style="color: #1E293B; font-size: 12px;">BILLED TO (${isTenant ? 'TENANT' : isLandlord ? 'LANDLORD / PROPERTY OWNER' : 'CLIENT'}):</strong><br>
            <div style="font-size: 13px; font-weight: bold; color: #1E293B; margin-top: 4px;">${payload.paidBy}</div>
            ${payload.clientTrnOrEid ? `<div style="font-size: 11px; color: #64748B; margin-top: 2px;">Emirates ID / TRN: ${payload.clientTrnOrEid}</div>` : ''}
            ${payload.propertyAddress ? `<div style="font-size: 11px; color: #64748B; margin-top: 2px;">Property: ${payload.propertyAddress} ${payload.unitNumber ? `(${payload.unitNumber})` : ''}</div>` : ''}
          </div>

          <div style="border: 1px solid #E2E8F0; padding: 12px; border-radius: 6px; background: #F8FAFC;">
            <strong style="color: #1E293B; font-size: 12px;">PAYMENT SETTLEMENT DETAILS:</strong><br>
            <div style="font-size: 12px; margin-top: 4px;"><strong>Payment Mode:</strong> ${payload.paymentMethod.toUpperCase()}</div>
            <div style="font-size: 12px; margin-top: 2px;"><strong>Transaction Ref:</strong> ${payload.paymentReference}</div>
            <div style="font-size: 12px; margin-top: 2px;"><strong>Service Scope:</strong> ${payload.serviceDescription || formattedType}</div>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th style="width: 45%;">Service Item Description</th>
              <th style="text-align: right;">Net Amount (AED)</th>
              <th style="text-align: right;">VAT Rate</th>
              <th style="text-align: right;">VAT Amount (AED)</th>
              <th style="text-align: right;">Gross Total (AED)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong style="color: #1E293B;">${formattedType}</strong>
                <div style="font-size: 11px; color: #64748B; margin-top: 2px;">${payload.serviceDescription || 'Professional Dubai Real Estate Brokerage & Property Management Service Fee'}</div>
              </td>
              <td style="text-align: right; font-family: monospace; font-size: 12px;">AED ${Number(payload.amountAed || 0).toLocaleString()}</td>
              <td style="text-align: right; font-weight: bold;">${payload.vatRatePercent || 5}%</td>
              <td style="text-align: right; font-family: monospace; font-size: 12px;">AED ${Number(payload.vatAmountAed || 0).toLocaleString()}</td>
              <td style="text-align: right; font-weight: bold; color: #EF4444; font-family: monospace; font-size: 13px;">AED ${Number(payload.totalWithVatAed || 0).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <div class="bank-box">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="color: #1E293B;">Official Corporate Settlement Bank Account:</strong><br>
              Bank Name: <strong>Mashreq Bank</strong> | Account Title: <strong>WHITE CAVES REAL ESTATE L.L.C</strong><br>
              IBAN: <code style="background: white; padding: 2px 6px; border: 1px solid #CBD5E1; border-radius: 4px; font-weight: bold;">AE960330000019101501006</code> | SWIFT: <strong>BOMLAEAD</strong>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 10px; color: #64748B;">Supervised by Henry AI Record Keeper</div>
              <div style="font-weight: bold; font-size: 11px;">[TAX COMPLIANCE NOT VERIFIED]</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
}
