// FILE: src/components/crm/HenryDocumentStudio/logic/HenryDocumentStudio.logic.ts
/**
 * HenryDocumentStudio.logic.ts — Hook & State Management Layer
 * Standard: AEGIS Canonical 12-Way Architecture & Single Purpose File Law (< 350 lines, AEG-042).
 */

import { useState, useCallback, useEffect } from 'react';
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
import { canUseScan, ScanReview } from '../../../../services/henryScanReview';
import { useHenryDocumentScanners } from './useHenryDocumentScanners';
import logger from '../../../../utils/logger';

export function useHenryDocumentStudioLogic() {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<DocumentTemplateOption['id']>('passport_scanner');
  const [tenancyPayload, setTenancyPayload] =
    useState<TenancyContractPayload>(DEMO_TENANCY_PAYLOAD);
  const [ejariRecord] = useState<GovernmentEjariRecord>(DEMO_EJARI_RECORD);
  const [viewingPayload, setViewingPayload] = useState<ViewingFormPayload>(DEMO_VIEWING_PAYLOAD);
  const [tenantReceiptPayload] = useState<TaxReceiptPayload>(DEMO_TENANT_TAX_RECEIPT);
  const [landlordInvoicePayload] = useState<TaxReceiptPayload>(DEMO_LANDLORD_TAX_INVOICE);

  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [annotations] = useState<PdfAnnotation[]>([]);
  const [compiledHtml, setCompiledHtml] = useState<string>('');
  const [isTenancyModalOpen, setIsTenancyModalOpen] = useState<boolean>(false);

  const handleOpenTenancyModal = useCallback(() => setIsTenancyModalOpen(true), []);
  const handleCloseTenancyModal = useCallback(() => setIsTenancyModalOpen(false), []);

  const requireReview = useCallback((data: object): boolean => {
    if (canUseScan(data as ScanReview)) return true;
    setActionSuccessMessage(
      'Review required. Benchmark or unconfirmed data cannot autofill or create records.'
    );
    return false;
  }, []);

  const copyVariables = useCallback(async (json: string) => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(json);
      setActionSuccessMessage(
        'Current fields copied as JSON. Demo and missing values are not verified facts.'
      );
    } catch {
      logger.error('Henry variable clipboard export failed');
      setActionSuccessMessage('Clipboard export failed. No copy success is confirmed.');
    }
  }, []);

  const scanners = useHenryDocumentScanners({
    requireReview,
    setActionSuccessMessage,
    setSelectedTemplateId,
    setTenancyPayload,
    setViewingPayload,
    setIsTenancyModalOpen,
    copyVariables,
  });

  useEffect(() => {
    let active = true;
    setCompiledHtml('');
    const generateHtml = async () => {
      try {
        let result: string | Promise<string>;
        switch (selectedTemplateId) {
          case 'tenancy_contract_esign':
            result = henryPdfEngineService.generateTenancyContractHtml(tenancyPayload, annotations);
            break;
          case 'government_ejari_vault':
            result = henryPdfEngineService.generateGovernmentEjariArchiveHtml(ejariRecord);
            break;
          case 'viewing_form_autofill':
            result = henryPdfEngineService.generateViewingFormHtml(viewingPayload);
            break;
          case 'tenant_service_receipt':
            result = henryPdfEngineService.generateTaxReceiptHtml(tenantReceiptPayload);
            break;
          case 'landlord_mgmt_invoice':
            result = henryPdfEngineService.generateTaxReceiptHtml(landlordInvoicePayload);
            break;
          case 'emirates_id_scanner':
          case 'title_deed_scanner':
          case 'passport_scanner':
          case 'tenancy_contract_scanner':
            result = '';
            break;
          default:
            result = henryPdfEngineService.generateTenancyContractHtml(tenancyPayload, annotations);
        }
        const html = await result;
        if (active) setCompiledHtml(html);
      } catch {
        logger.error('Henry document preview generation failed', {
          templateId: selectedTemplateId,
        });
        if (active) {
          setActionSuccessMessage('Document preview failed. Retry before printing or exporting.');
        }
      }
    };
    void generateHtml();
    return () => {
      active = false;
    };
  }, [
    selectedTemplateId,
    tenancyPayload,
    ejariRecord,
    viewingPayload,
    tenantReceiptPayload,
    landlordInvoicePayload,
    annotations,
  ]);

  const handlePrint = useCallback(() => {
    if (compiledHtml) {
      henryPdfEngineService.triggerPrint(compiledHtml);
    }
  }, [compiledHtml]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 15, 175));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 15, 60));
  }, []);

  const handleCopyEsignLink = useCallback(() => {
    setActionSuccessMessage(
      'E-signature sharing is unavailable. No link was generated, copied or sent.'
    );
  }, []);

  const handleTriggerAiAutoFill = useCallback(() => {
    if (!requireReview(scanners.eidData)) return;
    setViewingPayload(prev => ({
      ...prev,
      clientName: scanners.eidData.fullNameEn,
      clientPassportOrEid: scanners.eidData.idNumber,
      viewingTime: '18:00 PM',
      feedbackNotes: 'Auto-filled from user-reviewed fields; authenticity not verified.',
    }));
  }, [scanners.eidData, requireReview]);

  return {
    templates: DOCUMENT_TEMPLATES,
    selectedTemplateId,
    setSelectedTemplateId,
    tenancyPayload,
    setTenancyPayload,
    ejariRecord,
    viewingPayload,
    tenantReceiptPayload,
    landlordInvoicePayload,
    actionSuccessMessage,
    compiledHtml,
    zoomLevel,
    isTenancyModalOpen,
    handleOpenTenancyModal,
    handleCloseTenancyModal,
    handlePrint,
    handleZoomIn,
    handleZoomOut,
    handleCopyEsignLink,
    handleTriggerAiAutoFill,
    ...scanners,
  };
}
