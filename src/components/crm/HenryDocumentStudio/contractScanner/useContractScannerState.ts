import { useState, useEffect, useRef } from 'react';
import henryTenancyContractScannerService, {
  DldScannedContractResult,
} from '../../../../services/HenryTenancyContractScannerService';
import henryTenancyContractTemplateService, {
  DldTenancyContractData,
} from '../../../../services/HenryTenancyContractTemplateService';
import {
  assessScanReadiness,
  canUseScan,
  type VaultSaveOptions,
} from '../../../../services/henryScanReview';
import type { DriveImport } from '../../../../services/henryDrive';
import { useDriveScannerIntake } from '../logic/useDriveScannerIntake';
import { markFieldReviewed } from '../../../../services/henryDocumentParsing';

export interface UseContractScannerStateResult {
  scannedResult: DldScannedContractResult | null;
  setScannedResult: React.Dispatch<React.SetStateAction<DldScannedContractResult | null>>;
  contractData: DldTenancyContractData | null;
  uploadedFile: File | null;
  filePreviewUrl: string | null;
  isScanning: boolean;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  statusMsg: string | null;
  copiedJson: boolean;
  isSaving: boolean;
  vaultOptions: VaultSaveOptions;
  setVaultOptions: React.Dispatch<React.SetStateAction<VaultSaveOptions>>;
  handleFileUpload: (file: File) => Promise<void>;
  handleLoadDemo: () => Promise<void>;
  handleScanCorrection: (path: string, value: string | number) => void;
  handleUpdateDldField: (field: keyof DldTenancyContractData, val: string | number) => void;
  handleLoadToJourney: () => void;
  handleSaveToVault: () => Promise<void>;
  handleDiscard: () => void;
  handleCopyJson: () => void;
}

export function useContractScannerState(
  importedSource?: DriveImport
): UseContractScannerStateResult {
  const [scannedResult, setScannedResult] = useState<DldScannedContractResult | null>(() => {
    return henryTenancyContractScannerService.getCachedContract();
  });
  const [contractData, setContractData] = useState<DldTenancyContractData | null>(() => {
    const cached = henryTenancyContractScannerService.getCachedContract();
    return cached
      ? henryTenancyContractScannerService.toDldTenancyContractData(cached, true)
      : null;
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const generation = useRef(0);
  const saving = useRef(false);
  const [isSaving, setIsSaving] = useState(false);
  const [vaultOptions, setVaultOptions] = useState<VaultSaveOptions>({});

  useEffect(() => {
    setVaultOptions({});
  }, [uploadedFile]);

  useEffect(() => {
    return () => {
      generation.current++;
    };
  }, []);

  useEffect(() => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      setFilePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setFilePreviewUrl(null);
    }
  }, [uploadedFile]);

  const handleFileUpload = async (file: File) => {
    const request = ++generation.current;
    setIsSaving(false);
    henryTenancyContractScannerService.clearCachedContract();
    setScannedResult(null);
    setContractData(null);
    setIsScanning(true);
    setUploadedFile(file);
    setStatusMsg(`Reading Tenancy Agreement "${file.name}"...`);

    try {
      const result = await henryTenancyContractScannerService.scanContract(file);
      if (request !== generation.current) return;
      setScannedResult(result);
      const dld = henryTenancyContractScannerService.toDldTenancyContractData(result, true);
      setContractData(dld);
      setStatusMsg(
        `✓ Extracted agreement: ${result.property.buildingName} #${result.property.propertyNumber} (Rent AED ${result.financials.annualRentAed.toLocaleString()})`
      );
    } catch {
      if (request !== generation.current) return;
      setStatusMsg('Error processing Tenancy Contract.');
    } finally {
      if (request === generation.current) setIsScanning(false);
    }
  };

  useDriveScannerIntake(importedSource, handleFileUpload);

  const handleLoadDemo = async () => {
    generation.current++;
    henryTenancyContractScannerService.clearCachedContract();
    setIsScanning(true);
    setUploadedFile(null);
    try {
      const demo = henryTenancyContractScannerService.getDemoExtractedData();
      const dld = henryTenancyContractScannerService.toDldTenancyContractData(demo, true);
      setContractData(dld);
      setScannedResult(demo);
      setStatusMsg('✓ Loaded demo Tenancy Contract (Camelia 608).');
    } finally {
      setIsScanning(false);
    }
  };

  const handleScanCorrection = (path: string, value: string | number) => {
    if (!scannedResult) return;
    const updated = {
      ...scannedResult,
      reviewConfirmed: false,
      missingFields: [],
      diagnostics: markFieldReviewed(scannedResult.diagnostics, path, value),
    };
    const [group, key] = path.split('.');
    const numeric = [
      'financials.annualRentAed',
      'financials.contractValueAed',
      'financials.securityDepositAed',
      'property.areaSqM',
      'property.areaSqFt',
    ].includes(path);
    const corrected = numeric ? (value === '' ? undefined : Number(value)) : value;
    if (
      key &&
      (group === 'landlord' || group === 'tenant' || group === 'property' || group === 'financials')
    ) {
      Object.assign(updated, { [group]: { ...updated[group], [key]: corrected } });
    } else if (path === 'contractReference' || path === 'contractDate') {
      Object.assign(updated, { [path]: value });
    } else if (path === 'additionalTerms') {
      updated.additionalTerms = [String(value)];
    } else if (path === 'cheques') {
      updated.financials = {
        ...updated.financials,
        modeOfPayment: value ? `${value} CHEQUES` : '',
      };
    }
    updated.isFilled = assessScanReadiness(updated).status !== 'needs_rescan';
    updated.fillScorePercent = Math.round((updated.diagnostics?.coverage || 0) * 100);
    updated.filledFieldsCount = Object.values(updated.diagnostics?.fields || {}).filter(
      field => field.state === 'extracted'
    ).length;
    setScannedResult(updated);
    setContractData(henryTenancyContractScannerService.toDldTenancyContractData(updated, true));
    henryTenancyContractScannerService.clearCachedContract();
  };

  const handleUpdateDldField = (field: keyof DldTenancyContractData, val: string | number) => {
    const paths: Partial<Record<keyof DldTenancyContractData, string>> = {
      buildingName: 'property.buildingName',
      propertyNo: 'property.propertyNumber',
      plotNo: 'property.plotNumber',
      ownerName: 'landlord.name',
      tenantName: 'tenant.name',
      annualRent: 'financials.annualRentAed',
      contractPeriodFrom: 'financials.periodFrom',
      contractPeriodTo: 'financials.periodTo',
    };
    const path = paths[field];
    if (path) handleScanCorrection(path, val);
  };

  const handleLoadToJourney = () => {
    if (!scannedResult || !canUseScan(scannedResult)) return;
    henryTenancyContractScannerService.setCachedContract(scannedResult);
    henryTenancyContractTemplateService.saveDraft(
      henryTenancyContractScannerService.toDldTenancyContractData(scannedResult)
    );
    setStatusMsg('Reviewed agreement applied to Preparation Studio.');
  };

  const handleSaveToVault = async () => {
    if (!scannedResult || !canUseScan(scannedResult) || !uploadedFile || saving.current) return;
    saving.current = true;
    setIsSaving(true);
    const request = generation.current;
    const result = await henryTenancyContractScannerService.saveToDatabase(scannedResult, {
      ...vaultOptions,
      ...(uploadedFile === importedSource?.file ? { driveOrigin: importedSource.driveOrigin } : {}),
      sources: [uploadedFile],
    });
    saving.current = false;
    if (request === generation.current) {
      setIsSaving(false);
      setStatusMsg(
        result.success
          ? 'Reviewed agreement and original saved to encrypted vault.'
          : result.error || 'Nothing was saved.'
      );
    }
  };

  const handleDiscard = () => {
    generation.current++;
    setIsScanning(false);
    setIsSaving(false);
    setScannedResult(null);
    setContractData(null);
    setUploadedFile(null);
    henryTenancyContractScannerService.clearCachedContract();
    setStatusMsg('Discarded Tenancy Contract data and cleared session cache.');
  };

  const handleCopyJson = () => {
    if (!contractData) return;
    navigator.clipboard.writeText(JSON.stringify(contractData, null, 2));
    setCopiedJson(true);
    setStatusMsg('Extracted contract variables JSON copied to clipboard!');
    setTimeout(() => {
      setCopiedJson(false);
      setStatusMsg(null);
    }, 3000);
  };

  return {
    scannedResult,
    setScannedResult,
    contractData,
    uploadedFile,
    filePreviewUrl,
    isScanning,
    zoomLevel,
    setZoomLevel,
    statusMsg,
    copiedJson,
    isSaving,
    vaultOptions,
    setVaultOptions,
    handleFileUpload,
    handleLoadDemo,
    handleScanCorrection,
    handleUpdateDldField,
    handleLoadToJourney,
    handleSaveToVault,
    handleDiscard,
    handleCopyJson,
  };
}
