import { useEffect, useMemo, useState } from 'react';
import { canUseScan } from '../../../../services/henryScanReview';
import henryTenancyContractTemplateService, {
  type DldTenancyContractData,
} from '../../../../services/HenryTenancyContractTemplateService';
import henryTitleDeedScannerService from '../../../../services/HenryTitleDeedScannerService';
import henryEmiratesIdScannerService from '../../../../services/HenryEmiratesIdScannerService';
import henryPassportScannerService from '../../../../services/HenryPassportScannerService';

export function useHenryTenancyJourney() {
  const [contractData, setContractData] = useState<DldTenancyContractData>(() =>
    henryTenancyContractTemplateService.loadActiveDraft()
  );
  const [cachedTitleDeed, setCachedTitleDeed] = useState(() =>
    henryTitleDeedScannerService.getCachedTitleDeed()
  );
  const [cachedTenantEid, setCachedTenantEid] = useState(() =>
    henryEmiratesIdScannerService.getCachedEmiratesId()
  );
  const [cachedPassport, setCachedPassport] = useState(() =>
    henryPassportScannerService.getCachedPassport()
  );

  const [activeStage, setActiveStage] = useState<number>(1);
  const [previewPage, setPreviewPage] = useState<number | 'all'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const flashStatus = (msg: string, ms = 3000) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), ms);
  };

  useEffect(() => {
    const unsubDeed = henryTitleDeedScannerService.onTitleDeedUpdated(setCachedTitleDeed);
    const unsubEid = henryEmiratesIdScannerService.onEmiratesIdUpdated(setCachedTenantEid);
    const unsubPass = henryPassportScannerService.onPassportUpdated(setCachedPassport);
    return () => {
      unsubDeed();
      unsubEid();
      unsubPass();
    };
  }, []);

  const applyDraft = (updater: (prev: DldTenancyContractData) => DldTenancyContractData) => {
    setContractData(prev => {
      const next = updater(prev);
      henryTenancyContractTemplateService.saveDraft(next);
      return next;
    });
  };

  const updateField = <K extends keyof DldTenancyContractData>(
    field: K,
    value: DldTenancyContractData[K]
  ) => applyDraft(prev => ({ ...prev, [field]: value }));

  const handleUpdateAdditionalTerm = (index: number, val: string) =>
    applyDraft(prev => {
      const terms = [...(prev.additionalTerms || [])];
      terms[index] = val;
      return { ...prev, additionalTerms: terms };
    });

  const runScan = async (pendingMsg: string, errorMsg: string, work: () => Promise<string>) => {
    setIsProcessing(true);
    setStatusMsg(pendingMsg);
    try {
      setStatusMsg(await work());
    } catch {
      setStatusMsg(errorMsg);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  const handleUploadTitleDeed = (file: File) =>
    runScan(`Scanning Title Deed "${file.name}"...`, 'Could not process Title Deed.', async () => {
      const deedData = await henryTitleDeedScannerService.scanTitleDeed(file);
      applyDraft(prev => henryTenancyContractTemplateService.populateFromTitleDeed(prev, deedData));
      return `✓ Title Deed extracted! Unit ${deedData.propertyNumber} in ${deedData.buildingNameEn || 'Property'} (${deedData.ownerNameEn || 'Owner'}).`;
    });

  const handleUploadLandlordPassport = (file: File) =>
    runScan(
      `Scanning Landlord Document "${file.name}"...`,
      'Could not process Landlord document.',
      async () => {
        const passportData = await henryPassportScannerService.scanPassport(file);
        if (!canUseScan(passportData)) {
          return 'Review the uploaded source in the Passport scanner, then apply it as landlord. No fields were applied.';
        }
        applyDraft(prev =>
          henryTenancyContractTemplateService.populateFromPassport(prev, passportData, 'landlord')
        );
        return `✓ Landlord document extracted: ${passportData.fullName || 'Owner'}.`;
      }
    );

  const handleUploadTenantEid = (file: File) =>
    runScan(
      `Scanning Tenant Emirates ID "${file.name}"...`,
      'Could not process Tenant Emirates ID.',
      async () => {
        const eidData = await henryEmiratesIdScannerService.scanEmiratesId(file);
        applyDraft(prev =>
          henryTenancyContractTemplateService.populateFromEmiratesId(prev, eidData, 'tenant')
        );
        return `✓ Tenant EID extracted: ${eidData.fullNameEn} (${eidData.idNumber}).`;
      }
    );

  const handleUploadTenantPassport = (file: File) =>
    runScan(
      `Scanning Tenant Passport "${file.name}"...`,
      'Could not process Tenant Passport.',
      async () => {
        const passportData = await henryPassportScannerService.scanPassport(file);
        if (!canUseScan(passportData)) {
          return 'Review the uploaded source in the Passport scanner, then apply it as tenant. No fields were applied.';
        }
        applyDraft(prev =>
          henryTenancyContractTemplateService.populateFromPassport(prev, passportData, 'tenant')
        );
        return `✓ Tenant Passport extracted: ${passportData.fullName} (${passportData.passportNumber}).`;
      }
    );

  const handleSaveForSession = () => {
    henryTenancyContractTemplateService.saveContract(contractData);
    flashStatus(
      `Contract ${contractData.contractId} kept for this session only. Not saved to the encrypted vault; it will be lost on reload.`,
      4000
    );
  };

  const handleDiscardDraft = () => {
    if (
      window.confirm(
        'Are you sure you want to discard this draft and reset to a fresh blank official DLD template?'
      )
    ) {
      setContractData(henryTenancyContractTemplateService.resetDraft());
      setActiveStage(1);
      flashStatus('Draft discarded. Reset to official blank DLD template.');
    }
  };

  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const compiledHtml = henryTenancyContractTemplateService.generateDldTenancyContractHtml(
      contractData,
      'all'
    );
    printWindow.document.write(
      `<!DOCTYPE html><html><head><title>Tenancy Contract — ${contractData.contractId || 'DLD'}</title><style>@page{size:A4 portrait;margin:0;}body{margin:0;padding:0;background:#FFFFFF;}.dld-page{page-break-after:always;}.dld-page:last-child{page-break-after:avoid;}</style></head><body>${compiledHtml}<script>window.onload=function(){window.print();};</script></body></html>`
    );
    printWindow.document.close();
  };

  const compiledPdfHtml = useMemo(
    () =>
      henryTenancyContractTemplateService.generateDldTenancyContractHtml(contractData, previewPage),
    [contractData, previewPage]
  );

  return {
    contractData,
    cachedTitleDeed,
    cachedTenantEid,
    cachedPassport,
    activeStage,
    setActiveStage,
    previewPage,
    setPreviewPage,
    zoomLevel,
    setZoomLevel,
    isProcessing,
    statusMsg,
    flashStatus,
    applyDraft,
    updateField,
    handleUpdateAdditionalTerm,
    handleUploadTitleDeed,
    handleUploadLandlordPassport,
    handleUploadTenantEid,
    handleUploadTenantPassport,
    handleSaveForSession,
    handleDiscardDraft,
    handlePrintPdf,
    compiledPdfHtml,
  };
}
