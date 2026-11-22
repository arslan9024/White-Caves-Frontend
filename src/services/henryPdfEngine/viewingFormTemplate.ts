import { ViewingFormPayload } from './types';

/**
 * 3. Generates Form B Viewing Register with 1-Click AI Auto-Fill
 */
export function generateViewingFormHtml(payload: ViewingFormPayload): string {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Form B Viewing Register — ${payload.formId}</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 24px; color: #0F172A; line-height: 1.6; font-size: 12px; }
          .header { border-bottom: 2px solid #EF4444; padding-bottom: 12px; margin-bottom: 16px; }
          .tag { background: #2563EB; color: white; padding: 3px 8px; border-radius: 4px; font-weight: 800; font-size: 10px; }
          .box { border: 1px solid #CBD5E1; padding: 12px; border-radius: 6px; background: #F8FAFC; margin-bottom: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <span class="tag">1-CLICK AI AUTO-FILLED</span>
          <h2 style="margin: 6px 0 2px; color: #1E293B;">FORM B — BUYER / TENANT PROPERTY VIEWING REGISTER</h2>
          <span style="color: #64748B; font-size: 11px;">White Caves Real Estate LLC • RERA ORN: 44483 • Form Ref: ${payload.formId}</span>
        </div>

        <div class="box">
          <strong>Client Name:</strong> ${payload.clientName}<br>
          <strong>Phone:</strong> ${payload.clientPhone}<br>
          <strong>Emirates ID / Passport:</strong> ${payload.clientPassportOrEid}
        </div>

        <div class="box">
          <strong>Property Inspected:</strong> ${payload.propertyTitle}<br>
          <strong>Location:</strong> ${payload.propertyAddress}<br>
          <strong>Viewing Date & Time:</strong> ${payload.viewingDate} at ${payload.viewingTime}<br>
          <strong>Conducting Broker:</strong> ${payload.agentName} (BRN: ${payload.agentBrn})
        </div>

        <div class="box">
          <strong>Client Inspection Feedback & Notes:</strong><br>
          ${payload.feedbackNotes || 'Property in immaculate condition. Client interested in submitting formal offer.'}
        </div>

        <div style="margin-top: 30px; display: flex; justify-content: space-between;">
          <div>Client Signature: ______________________</div>
          <div>Agent Signature: ______________________</div>
        </div>
      </body>
      </html>
    `;
}
