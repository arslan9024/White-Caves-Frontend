/**
 * HenryTenancyContractScannerService.ts
 *
 * Official Dubai Land Department (DLD) Tenancy Contract Optical AI Parser & Learning Engine.
 *
 * Core Capabilities:
 * 1. Autonomous Fill Detection (evaluates whether contract is Filled vs Blank/Unfilled).
 * 2. Grouped Semantic Extraction (Landlord, Tenant, Property, Rent/PDC, Addenda, Signatures).
 * 3. Completeness Scoring (Calculates fill percentage & lists missing fields).
 * 4. Machine Learning & Reference Training (Stores parsed contracts to teach Henry AI auto-fill rules).
 * 5. 1-Click Inter-Module Mapping (Auto-fills Preparation Studio, CRM Landlord/Tenant Profiles, Ejari Vault).
 */

import {
  ScanReview,
  canUseScan,
  saveReviewedScan,
  validScanDate,
  VaultSaveOptions,
} from './henryScanReview';
import henryEmiratesIdScannerService from './HenryEmiratesIdScannerService';
import logger from '../utils/logger';
import type { DldTenancyContractData } from './HenryTenancyContractTemplateService';
import type { ScannedTenancyContractResult } from './henryTenancyScanner/types';
import {
  SANIT_SINGH_CAMELIA_608_SAMPLE,
  SVETLANA_JANUSIA_XH2858B_SAMPLE,
  BLANK_DLD_TEMPLATE_SAMPLE,
} from './henryTenancyScanner/samples';
import { parseTenancyContractText } from './henryTenancyScanner/parser';
import {
  toDldTenancyContractData as mapToDldTenancyContractData,
  toCrmLandlordProfile as mapToCrmLandlordProfile,
  toCrmTenantProfile as mapToCrmTenantProfile,
} from './henryTenancyScanner/mappers';

export type {
  ScannedTenancyParty,
  ScannedTenancyProperty,
  ScannedTenancyFinancials,
  ScannedTenancySignatures,
  DldScannedContractResult,
  ScannedTenancyContractResult,
} from './henryTenancyScanner/types';

export {
  SANIT_SINGH_CAMELIA_608_SAMPLE,
  SVETLANA_JANUSIA_XH2858B_SAMPLE,
  BLANK_DLD_TEMPLATE_SAMPLE,
} from './henryTenancyScanner/samples';

class HenryTenancyContractScannerService {
  private inMemoryCache: ScannedTenancyContractResult | null = null;
  private listeners: Set<(data: ScannedTenancyContractResult | null) => void> = new Set();
  private trainingMemory: ScannedTenancyContractResult[] = [];

  /**
   * Keeps extracted contract data in session memory only
   */
  setCachedContract(data: ScannedTenancyContractResult): void {
    if (!canUseScan(data)) return;
    this.inMemoryCache = structuredClone(data);
    this.notifyListeners(this.inMemoryCache);
  }

  /**
   * Retrieves active contract from temporary session cache
   */
  getCachedContract(): ScannedTenancyContractResult | null {
    if (this.inMemoryCache && canUseScan(this.inMemoryCache))
      return structuredClone(this.inMemoryCache);
    return null;
  }

  /**
   * Clears the active contract session cache
   */
  clearCachedContract(): void {
    this.inMemoryCache = null;
    this.notifyListeners(null);
  }

  /**
   * Registers a subscriber listener to receive active contract cache mutations
   */
  onContractUpdated(listener: (data: ScannedTenancyContractResult | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(data: ScannedTenancyContractResult | null): void {
    this.listeners.forEach(listener => {
      try {
        listener(data ? structuredClone(data) : null);
      } catch (err) {
        logger.error('Henry tenancy cache listener failed', {
          errorName: err instanceof Error ? err.name : 'UnknownError',
        });
      }
    });
  }

  /**
   * Returns benchmark reference sample 1 (Sanit Singh Nagpal & Keshivani Mayadevan - Camelia 608)
   */
  getDemoExtractedData(): ScannedTenancyContractResult {
    this.clearCachedContract();
    return {
      ...structuredClone(SANIT_SINGH_CAMELIA_608_SAMPLE),
      scannedAt: new Date().toISOString(),
      demoOnly: true,
      reviewConfirmed: false,
    };
  }

  /**
   * Returns benchmark reference sample 2 (Svetlana Levitskaya & William Michael Abernethy - Janusia XH2858B)
   */
  getSvetlanaJanusiaSample(): ScannedTenancyContractResult {
    this.clearCachedContract();
    return {
      ...structuredClone(SVETLANA_JANUSIA_XH2858B_SAMPLE),
      scannedAt: new Date().toISOString(),
      demoOnly: true,
      reviewConfirmed: false,
    };
  }

  /**
   * Returns blank template reference result
   */
  getBlankTemplateData(): ScannedTenancyContractResult {
    this.clearCachedContract();
    return { ...structuredClone(BLANK_DLD_TEMPLATE_SAMPLE), scannedAt: new Date().toISOString() };
  }

  /**
   * Scans an uploaded Tenancy Contract PDF / image or returns reference sample
   */
  async scanContract(
    fileOrPreset?: File | 'sample' | 'sample_sanit' | 'sample_svetlana' | 'blank'
  ): Promise<ScannedTenancyContractResult> {
    this.clearCachedContract();
    if (!(fileOrPreset instanceof File)) {
      let result: ScannedTenancyContractResult;
      if (fileOrPreset === 'blank') {
        result = this.getBlankTemplateData();
      } else if (fileOrPreset === 'sample_svetlana') {
        result = this.getSvetlanaJanusiaSample();
      } else {
        result = this.getDemoExtractedData();
      }
      return { ...structuredClone(result), demoOnly: true, reviewConfirmed: false };
    }
    if (
      !['application/pdf', 'image/png', 'image/jpeg'].includes(fileOrPreset.type) ||
      !fileOrPreset.size ||
      fileOrPreset.size > 10 * 1024 * 1024
    ) {
      throw new Error('Upload a non-empty PDF, JPEG or PNG up to 10 MB.');
    }
    const extraction = await henryEmiratesIdScannerService.extractDocumentText(
      fileOrPreset,
      undefined,
      text => {
        const parsed = this.parseContractText(text);
        return (
          [
            !!parsed.landlord.name,
            !!parsed.tenant.name,
            !!parsed.property.buildingName,
            !!parsed.property.propertyNumber,
            validScanDate(parsed.financials.periodFrom),
            validScanDate(parsed.financials.periodTo),
            parsed.financials.annualRentAed > 0,
          ].filter(Boolean).length / 7
        );
      }
    );
    const result = this.parseContractText(
      [extraction.ocrText, extraction.streamText].filter(Boolean).join('\n')
    );
    result.documentFormat = fileOrPreset.type;
    result.diagnostics!.ocrConfidence = extraction.ocrConfidence;
    result.diagnostics!.warnings.push(...(extraction.warnings || []));
    return result;
  }

  parseContractText(text: string): ScannedTenancyContractResult {
    return parseTenancyContractText(text);
  }

  /**
   * Alias for scanContract conforming to standard document ingestion interfaces
   */
  async scanDocument(
    fileOrPreset?: File | 'sample' | 'sample_sanit' | 'sample_svetlana' | 'blank'
  ): Promise<ScannedTenancyContractResult> {
    return this.scanContract(fileOrPreset);
  }

  /**
   * Teaches Henry AI by archiving parsed contract into reference training memory pool
   */
  teachFromScannedContract(contract: ScannedTenancyContractResult): void {
    if (!canUseScan(contract as ScanReview)) return;
    const filtered = this.trainingMemory.filter(
      c =>
        !(
          c.landlord.name === contract.landlord.name &&
          c.property.buildingName === contract.property.buildingName &&
          c.property.propertyNumber === contract.property.propertyNumber
        )
    );
    filtered.unshift({
      ...structuredClone(contract),
      scannedAt: new Date().toISOString(),
    });
    this.trainingMemory = filtered.slice(0, 20);
  }

  /**
   * Retrieves all reference contracts in Henry's training pool
   */
  getTrainingReferenceContracts(): ScannedTenancyContractResult[] {
    return structuredClone(this.trainingMemory);
  }

  /**
   * Converts Extracted Scanned Contract into DldTenancyContractData for 1-click loading into the Preparation Studio
   */
  toDldTenancyContractData(
    scanned: ScannedTenancyContractResult,
    previewOnly = false
  ): DldTenancyContractData {
    return mapToDldTenancyContractData(scanned, previewOnly);
  }

  /**
   * Converts Extracted Contract into CRM Landlord Profile object
   */
  toCrmLandlordProfile(scanned: ScannedTenancyContractResult) {
    return mapToCrmLandlordProfile(scanned);
  }

  /**
   * Converts Extracted Contract into CRM Tenant Profile object
   */
  toCrmTenantProfile(scanned: ScannedTenancyContractResult) {
    return mapToCrmTenantProfile(scanned);
  }

  /**
   * Exports extracted data as a structured JSON object
   */
  exportToJson(scanned?: ScannedTenancyContractResult): Record<string, any> {
    const data = scanned || this.getCachedContract() || SANIT_SINGH_CAMELIA_608_SAMPLE;
    return JSON.parse(JSON.stringify(data));
  }

  /**
   * Exports extracted data as a formatted JSON string for clipboard and APIs
   */
  exportToJsonString(scanned?: ScannedTenancyContractResult): string {
    return JSON.stringify(this.exportToJson(scanned), null, 2);
  }

  /**
   * Persists extracted Tenancy Contract record to backend database and session cache
   */
  async saveToDatabase(
    scanned?: ScannedTenancyContractResult,
    options: VaultSaveOptions = {}
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!scanned) return { success: false, error: 'Review required. Nothing was saved.' };
    if (!scanned.contractReference?.trim()) {
      return {
        success: false,
        error: 'Enter a source contract reference before saving. Nothing was saved.',
      };
    }
    return saveReviewedScan(
      'tenancy_contract',
      scanned,
      scanned.contractReference,
      scanned.tenant.name,
      options
    );
  }
}

export const henryTenancyContractScannerService = new HenryTenancyContractScannerService();
export default henryTenancyContractScannerService;
