/**
 * HenryDocumentStudio.logic.ts — Hook & State Management Layer
 */

import { useState, useMemo, useCallback } from 'react';
import {
  DOCUMENT_TEMPLATES,
  DEMO_TENANCY_PAYLOAD,
  DEMO_EJARI_RECORD,
  DEMO_VIEWING_PAYLOAD,
  DEMO_TENANT_TAX_RECEIPT,
  DEMO_LANDLORD_TAX_INVOICE,
  DocumentTemplateOption,
} from '../data/HenryDocumentStudio.data';
import henryPdfEngineService, {
  TenancyContractPayload,
  GovernmentEjariRecord,
  ViewingFormPayload,
  TaxReceiptPayload,
  PdfAnnotation,
} from '../../../../services/HenryPdfEngineService';
import henryEmiratesIdScannerService from '../../../../services/HenryEmiratesIdScannerService';
import henryTitleDeedScannerService from '../../../../services/HenryTitleDeedScannerService';
import henryPassportScannerService from '../../../../services/HenryPassportScannerService';
import henryTenancyContractScannerService from '../../../../services/HenryTenancyContractScannerService';
import henryTenancyContractTemplateService from '../../../../services/HenryTenancyContractTemplateService';
import { useHenryDocumentScanners } from './useHenryDocumentScanners';
import logger from '../../../../utils/logger';

export function useHenryDocumentStudioLogic() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<DocumentTemplateOption['id']>('passport_scanner');
  const [tenancyPayload, setTenancyPayload] = useState<TenancyContractPayload>(DEMO_TENANCY_PAYLOAD);
  const [ejariRecord, setEjariRecord] = useState<GovernmentEjariRecord>(DEMO_EJARI_RECORD);
  const [viewingPayload, setViewingPayload] = useState<ViewingFormPayload>(DEMO_VIEWING_PAYLOAD);
  const [tenantTaxReceipt, setTenantTaxReceipt] = useState<TaxReceiptPayload>(DEMO_TENANT_TAX_RECEIPT);
  const [landlordTaxInvoice, setLandlordTaxInvoice] = useState<TaxReceiptPayload>(DEMO_LANDLORD_TAX_INVOICE);

  const [activeStep, setActiveStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdfBlob, setGeneratedPdfBlob] = useState<Blob | null>(null);
  const [pdfAnnotations, setPdfAnnotations] = useState<PdfAnnotation[]>([]);
  const [isAuditPassed, setIsAuditPassed] = useState<boolean | null>(null);
  const [isSavingAudit, setIsSavingAudit] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyVariables = useCallback(async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedKey('ALL');
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      logger.error('Failed to copy to clipboard', err);
    }
  }, []);

  const scanners = useHenryDocumentScanners(setTenancyPayload, copyVariables);

  const activeTemplate = useMemo(() => {
    return DOCUMENT_TEMPLATES.find((t) => t.id === selectedTemplateId) || DOCUMENT_TEMPLATES[0];
  }, [selectedTemplateId]);

  const handleApplyEidToTenancy = useCallback((party: 'tenant' | 'landlord') => {
    setTenancyPayload((prev) => ({
      ...prev,
      [party]: henryEmiratesIdScannerService.toContractParty(scanners.eidData, prev[party]),
    }));
  }, [scanners.eidData]);

  const handleApplyTitleDeedToTenancy = useCallback(() => {
    setTenancyPayload((prev) => henryTitleDeedScannerService.toTenancyContractPayload(scanners.titleDeedData, prev));
  }, [scanners.titleDeedData]);

  const handleApplyPassportToTenancy = useCallback((party: 'tenant' | 'landlord') => {
    setTenancyPayload((prev) => ({
      ...prev,
      [party]: henryPassportScannerService.toContractParty(scanners.passportData, prev[party]),
    }));
  }, [scanners.passportData]);

  const handleGeneratePdf = useCallback(async () => {
    setIsGenerating(true);
    try {
      let blob: Blob;
      if (selectedTemplateId === 'unified_tenancy_contract' || selectedTemplateId === 'official_ejari') {
        blob = await henryPdfEngineService.generateEjariTenancyPdf(tenancyPayload, ejariRecord, pdfAnnotations);
      } else if (selectedTemplateId === 'client_viewing_form') {
        blob = await henryPdfEngineService.generateViewingFormPdf(viewingPayload, pdfAnnotations);
      } else {
        blob = await henryPdfEngineService.generateSequentialTaxReceiptPdf(tenantTaxReceipt, pdfAnnotations);
      }
      setGeneratedPdfBlob(blob);
    } catch (error) {
      logger.error('Failed to generate PDF document', error);
    } finally {
      setIsGenerating(false);
    }
  }, [selectedTemplateId, tenancyPayload, ejariRecord, viewingPayload, tenantTaxReceipt, pdfAnnotations]);

  const handleExportJson = useCallback(() => {
    if (selectedTemplateId === 'emirates_id_scanner') {
      void copyVariables(henryEmiratesIdScannerService.exportToJsonString(scanners.eidData));
    } else if (selectedTemplateId === 'title_deed_scanner') {
      void copyVariables(henryTitleDeedScannerService.exportToJsonString(scanners.titleDeedData));
    } else if (selectedTemplateId === 'passport_scanner') {
      void copyVariables(henryPassportScannerService.exportToJsonString(scanners.passportData));
    } else if (selectedTemplateId === 'tenancy_contract_scanner') {
      void copyVariables(henryTenancyContractScannerService.exportToJsonString(scanners.scannedTenancyContract));
    }
  }, [selectedTemplateId, scanners, copyVariables]);

  const handlePrint = useCallback(() => {
    if (!generatedPdfBlob) return;
    const url = URL.createObjectURL(generatedPdfBlob);
    const win = window.open(url, '_blank');
    if (win) win.focus();
  }, [generatedPdfBlob]);

  return {
    selectedTemplateId, setSelectedTemplateId,
    activeTemplate,
    tenancyPayload, setTenancyPayload,
    ejariRecord, setEjariRecord,
    viewingPayload, setViewingPayload,
    tenantTaxReceipt, setTenantTaxReceipt,
    landlordTaxInvoice, setLandlordTaxInvoice,
    activeStep, setActiveStep,
    isGenerating, generatedPdfBlob,
    pdfAnnotations, setPdfAnnotations,
    isAuditPassed, setIsAuditPassed,
    isSavingAudit, setIsSavingAudit,
    isSignModalOpen, setIsSignModalOpen,
    copiedKey,
    ...scanners,
    handleApplyEidToTenancy,
    handleApplyTitleDeedToTenancy,
    handleApplyPassportToTenancy,
    handleGeneratePdf,
    handleExportJson,
    handlePrint,
    copyVariables,
  };
}
