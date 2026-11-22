/**
 * HenryPdfEngineService.ts — Henry AI Document & PDF Engineering Core
 *
 * Provides comprehensive PDF compilation, print preview generation,
 * preparation previews and Dubai Real Estate contract formatting. No external dispatch.
 *
 * Core Document Streams:
 * 1. Tenancy Contract preparation (no connected signing provider)
 * 2. Ejari layout demo (not a certificate or archival operation)
 * 3. Leasing & Viewing Forms (Form B viewing sheets with 1-Click AI Auto-Fill)
 * 4. Receipts & Tax Invoices (Security deposit & commission tax invoices with TRN and 5% VAT)
 */

import {
  ContractParty,
  PdcScheduleItem,
  TenancyContractPayload,
  GovernmentEjariRecord,
  ViewingFormPayload,
  TaxReceiptPayload,
  PdfAnnotation,
} from './henryPdfEngine/types';
import { generateTenancyContractHtml } from './henryPdfEngine/tenancyContractTemplate';
import { generateGovernmentEjariArchiveHtml } from './henryPdfEngine/ejariTemplate';
import { generateViewingFormHtml } from './henryPdfEngine/viewingFormTemplate';
import { generateTaxReceiptHtml } from './henryPdfEngine/taxReceiptTemplate';
import { generateForm12LegalNoticeHtml, triggerPrint } from './henryPdfEngine/legalNoticeAndPrint';

export * from './henryPdfEngine/types';
export * from './henryPdfEngine/tenancyContractTemplate';
export * from './henryPdfEngine/ejariTemplate';
export * from './henryPdfEngine/viewingFormTemplate';
export * from './henryPdfEngine/taxReceiptTemplate';
export * from './henryPdfEngine/legalNoticeAndPrint';

export class HenryPdfEngineService {
  /**
   * 1. Compiles the Unified Tenancy Contract ready for e-Signature link sharing
   */
  generateTenancyContractHtml(payload: TenancyContractPayload, annotations: PdfAnnotation[] = []): string {
    return generateTenancyContractHtml(payload, annotations);
  }

  /**
   * 2. Displays a synthetic Ejari layout, never a government certificate.
   */
  generateGovernmentEjariArchiveHtml(record: GovernmentEjariRecord): string {
    return generateGovernmentEjariArchiveHtml(record);
  }

  /**
   * 3. Generates Form B Viewing Register with 1-Click AI Auto-Fill
   */
  generateViewingFormHtml(payload: ViewingFormPayload): string {
    return generateViewingFormHtml(payload);
  }

  /**
   * 4. Generates Payment Receipts & Tax Invoices with TRN & FTA 5% VAT for Tenants & Landlords
   */
  async generateTaxReceiptHtml(payload: TaxReceiptPayload): Promise<string> {
    return generateTaxReceiptHtml(payload);
  }

  /**
   * Generates DLD Form 12 Legal Notice for 12-Month Eviction Notice (Dubai Law 33 of 2008)
   */
  generateForm12LegalNoticeHtml(
    contractNumber: string,
    propertyAddress: string,
    landlordName: string,
    tenantName: string,
    evictionReason: 'sale' | 'personal_use' | 'demolition' | 'major_renovation',
    effectiveDate: string
  ): string {
    return generateForm12LegalNoticeHtml(
      contractNumber,
      propertyAddress,
      landlordName,
      tenantName,
      evictionReason,
      effectiveDate
    );
  }

  /**
   * Triggers native high-DPI laser print dialog in browser
   */
  triggerPrint(htmlContent: string): void {
    triggerPrint(htmlContent);
  }
}

export const henryPdfEngineService = new HenryPdfEngineService();
export default henryPdfEngineService;
