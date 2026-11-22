export function generateContractHtml(data) {
  const formatDate = dateString => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-AE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  const formatCurrency = amount => {
    if (!amount) return '-';
    return `AED ${Number(amount).toLocaleString()}`;
  };

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ejari Unified Tenancy Contract - ${data.contractNumber}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 30px; color: #333; background: #fff; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #D4AF37; padding-bottom: 20px; margin-bottom: 25px; }
    .logo h2 { color: #1a1a2e; margin: 0; font-size: 24px; }
    .logo p { color: #666; margin: 5px 0 0; font-size: 13px; }
    .contract-meta { text-align: right; }
    .contract-number { color: #666; font-size: 13px; margin-bottom: 5px; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 15px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
    .status.fully_signed { background: #d4edda; color: #155724; }
    .status.partially_signed { background: #fff3cd; color: #856404; }
    .status.draft { background: #e9ecef; color: #495057; }
    h1 { text-align: center; margin: 20px 0 5px; font-size: 22px; color: #1a1a2e; }
    .subtitle { text-align: center; color: #666; margin-bottom: 25px; font-size: 14px; }
    .section { background: #fafafa; border: 1px solid #eee; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .section-title { display: flex; justify-content: space-between; color: #D4AF37; font-size: 14px; font-weight: 600; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .field { background: #fff; border: 1px solid #e0e0e0; border-radius: 6px; padding: 10px 12px; }
    .field-label { display: flex; justify-content: space-between; font-size: 10px; color: #888; text-transform: uppercase; margin-bottom: 4px; }
    .field-value { font-size: 14px; font-weight: 500; color: #333; min-height: 20px; }
    .signatures-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 15px; }
    .sig-box { background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; text-align: center; }
    .sig-box h4 { color: #666; margin: 0 0 15px; font-size: 13px; }
    .sig-content { min-height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .sig-box img { max-width: 180px; max-height: 70px; }
    .sig-name { font-weight: 600; margin-top: 10px; font-size: 14px; }
    .sig-date { font-size: 11px; color: #888; margin-top: 4px; }
    .pending { color: #999; font-style: italic; font-size: 13px; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; }
    .footer p { margin: 5px 0; color: #888; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo"><h2>White Caves Real Estate LLC</h2><p>Licensed Real Estate Brokerage - Dubai, UAE</p></div>
    <div class="contract-meta"><div class="contract-number">Contract #${data.contractNumber}</div><span class="status ${data.status}">${(data.status || 'draft').replace('_', ' ')}</span></div>
  </div>
  <h1>EJARI UNIFIED TENANCY CONTRACT</h1>
  <p class="subtitle">عقد الإيجار الموحد - إيجاري</p>
  <div class="section">
    <div class="section-title"><span>Owner / Lessor Information</span><span>معلومات المالك / المؤجر</span></div>
    <div class="grid">
      <div class="field"><div class="field-label"><span>Owner's Name</span></div><div class="field-value">${data.ownerName || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Lessor's Name</span></div><div class="field-value">${data.lessorName || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Emirates ID</span></div><div class="field-value">${data.lessorEmiratesId || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Email</span></div><div class="field-value">${data.lessorEmail || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Phone</span></div><div class="field-value">${data.lessorPhone || '-'}</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-title"><span>Tenant Information</span><span>معلومات المستأجر</span></div>
    <div class="grid">
      <div class="field"><div class="field-label"><span>Tenant's Name</span></div><div class="field-value">${data.tenantName || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Emirates ID</span></div><div class="field-value">${data.tenantEmiratesId || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Email</span></div><div class="field-value">${data.tenantEmail || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Phone</span></div><div class="field-value">${data.tenantPhone || '-'}</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-title"><span>Property Information</span><span>معلومات العقار</span></div>
    <div class="grid">
      <div class="field"><div class="field-label"><span>Property Usage</span></div><div class="field-value">${data.propertyUsage || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Building Name</span></div><div class="field-value">${data.buildingName || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Property Type</span></div><div class="field-value">${data.propertyType || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Location</span></div><div class="field-value">${data.location || '-'}</div></div>
      <div class="field"><div class="field-label"><span>Property Area</span></div><div class="field-value">${data.propertyArea ? data.propertyArea + ' sq.m' : '-'}</div></div>
      <div class="field"><div class="field-label"><span>DEWA Premises No.</span></div><div class="field-value">${data.premisesNo || '-'}</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-title"><span>Contract Information</span><span>معلومات العقد</span></div>
    <div class="grid">
      <div class="field"><div class="field-label"><span>Contract Period</span></div><div class="field-value">${formatDate(data.contractPeriodFrom)} - ${formatDate(data.contractPeriodTo)}</div></div>
      <div class="field"><div class="field-label"><span>Annual Rent</span></div><div class="field-value">${formatCurrency(data.annualRent)}</div></div>
      <div class="field"><div class="field-label"><span>Security Deposit</span></div><div class="field-value">${formatCurrency(data.securityDeposit)}</div></div>
      <div class="field"><div class="field-label"><span>Payment Mode</span></div><div class="field-value">${data.modeOfPayment || '-'}</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-title"><span>Signatures</span><span>التوقيعات</span></div>
    <div class="signatures-grid">
      <div class="sig-box"><h4>Tenant | المستأجر</h4><div class="sig-content">${data.signatures?.tenant ? `<img src="${data.signatures.tenant.signature}" alt="Signature" /><div class="sig-name">${data.signatures.tenant.signerName || data.tenantName}</div><div class="sig-date">${formatDate(data.signatures.tenant.signedAt)}</div>` : '<div class="pending">Pending</div>'}</div></div>
      <div class="sig-box"><h4>Lessor | المؤجر</h4><div class="sig-content">${data.signatures?.lessor ? `<img src="${data.signatures.lessor.signature}" alt="Signature" /><div class="sig-name">${data.signatures.lessor.signerName || data.lessorName}</div><div class="sig-date">${formatDate(data.signatures.lessor.signedAt)}</div>` : '<div class="pending">Pending</div>'}</div></div>
    </div>
    <div style="margin-top:15px;"><div class="sig-box"><h4>Broker | الوسيط</h4><div class="sig-content">${data.signatures?.broker ? `<img src="${data.signatures.broker.signature}" alt="Signature" /><div class="sig-name">${data.signatures.broker.signerName || data.brokerName}</div><div class="sig-date">${formatDate(data.signatures.broker.signedAt)}</div>` : '<div class="pending">Pending</div>'}</div></div></div>
  </div>
  <div class="footer"><p><strong>White Caves Real Estate LLC</strong></p><p>admin@whitecaves.com | Dubai, UAE</p><p>Generated on ${formatDate(new Date())}</p></div>
</body>
</html>`;
}
