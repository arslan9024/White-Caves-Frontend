/**
 * HenryTenancyContractTemplateService.ts
 *
 * Official Dubai Land Department (DLD) Unified Tenancy Contract Core Engine.
 * Manages the blank reusable template in session memory, multi-source OCR field mapping,
 * and high-fidelity 3-page bilingual (English & Arabic) contract generation.
 *
 * Standards:
 * - Dubai Law No. (26) of 2007 & Law No. (33) of 2008
 * - Law No. (43) of 2013 on Rental Caps
 * - DLD Official Form (عقد إيجار)
 */

import type { DldTitleDeedExtractedData } from './HenryTitleDeedScannerService';
import type { EmiratesIdExtractedData } from './HenryEmiratesIdScannerService';
import type { InternationalPassportExtractedData } from './HenryPassportScannerService';
import type { DldTenancyContractData } from './henryTenancyTemplate/types';
import {
  BLANK_DLD_TENANCY_CONTRACT,
  DEMO_PREFILLED_TENANCY_CONTRACT,
} from './henryTenancyTemplate/presets';
import {
  populateContractFromTitleDeed,
  populateContractFromEmiratesId,
  populateContractFromPassport,
} from './henryTenancyTemplate/ocrMappers';
import { generateDldTenancyContractHtml } from './henryTenancyTemplate/renderPage2And3';

export type { DldTenancyContractData };
export { BLANK_DLD_TENANCY_CONTRACT, DEMO_PREFILLED_TENANCY_CONTRACT };

class HenryTenancyContractTemplateService {
  private activeDraftMemory: DldTenancyContractData | null = null;
  private savedContractsMemory: DldTenancyContractData[] = [];

  /**
   * Returns a fresh, blank copy of the official DLD Tenancy Contract Template
   */
  getBlankTemplate(): DldTenancyContractData {
    return {
      ...BLANK_DLD_TENANCY_CONTRACT,
      contractId: `TC-DLD-${Date.now().toString().slice(-6)}`,
      contractDate: new Date().toLocaleDateString('en-GB'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Returns demo prefilled contract with scanned Title Deed & Emirates ID data
   */
  getDemoPreset(): DldTenancyContractData {
    return {
      ...DEMO_PREFILLED_TENANCY_CONTRACT,
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Save active draft in session memory; leave legacy storage untouched
   */
  saveDraft(data: DldTenancyContractData): void {
    const updated = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    this.activeDraftMemory = updated;
  }

  /**
   * Updates the active draft in session memory
   */
  updateActiveDraft(data: DldTenancyContractData): void {
    this.saveDraft(data);
  }

  /**
   * Load only the session draft, otherwise fall back to a blank template
   */
  loadActiveDraft(): DldTenancyContractData {
    const draft = this.activeDraftMemory;
    if (draft) {
      return draft;
    }
    return this.getBlankTemplate();
  }

  /**
   * Reset active session draft to a fresh blank template
   */
  resetDraft(): DldTenancyContractData {
    const blank = this.getBlankTemplate();
    this.saveDraft(blank);
    return blank;
  }

  /**
   * Keep a finalized contract in the session registry, not the encrypted vault
   */
  saveContract(data: DldTenancyContractData): void {
    const saved = this.savedContractsMemory;
    const filtered = saved.filter(c => c.contractId !== data.contractId);
    filtered.unshift({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    this.savedContractsMemory = filtered.slice(0, 20);
  }

  /**
   * Retrieve only contracts saved during this session
   */
  getSavedContracts(): DldTenancyContractData[] {
    return this.savedContractsMemory;
  }

  clearSession(): void {
    this.activeDraftMemory = null;
    this.savedContractsMemory = [];
  }

  /**
   * Auto-fill contract data from scanned Title Deed
   */
  populateFromTitleDeed(
    current: DldTenancyContractData,
    deed: DldTitleDeedExtractedData
  ): DldTenancyContractData {
    return populateContractFromTitleDeed(current, deed);
  }

  /**
   * Auto-fill contract data from scanned Emirates ID (as Tenant or Landlord)
   */
  populateFromEmiratesId(
    current: DldTenancyContractData,
    eid: EmiratesIdExtractedData,
    role: 'tenant' | 'landlord' = 'tenant'
  ): DldTenancyContractData {
    return populateContractFromEmiratesId(current, eid, role);
  }

  /**
   * Auto-fill contract data from scanned International Passport (as Tenant or Landlord)
   */
  populateFromPassport(
    current: DldTenancyContractData,
    passport: InternationalPassportExtractedData,
    role: 'tenant' | 'landlord' = 'tenant'
  ): DldTenancyContractData {
    return populateContractFromPassport(current, passport, role);
  }

  /**
   * Compiles the official 3-page bilingual DLD Tenancy Contract HTML matching the official Land Department layout exactly
   */
  generateDldTenancyContractHtml(
    data: DldTenancyContractData,
    page: number | 'all' = 'all'
  ): string {
    return generateDldTenancyContractHtml(data, page);
  }
}

export const henryTenancyContractTemplateService = new HenryTenancyContractTemplateService();
export default henryTenancyContractTemplateService;
