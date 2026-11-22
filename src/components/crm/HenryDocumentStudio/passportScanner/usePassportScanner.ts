import { useState, useEffect, useRef } from 'react';
import henryPassportScannerService, {
  InternationalPassportExtractedData,
} from '../../../../services/HenryPassportScannerService';
import { canUseScan, type VaultSaveOptions } from '../../../../services/henryScanReview';
import type { DriveImport } from '../../../../services/henryDrive';
import { useDriveScannerIntake } from '../logic/useDriveScannerIntake';
import { markFieldReviewed } from '../../../../services/henryDocumentParsing';
import henryTenancyContractTemplateService from '../../../../services/HenryTenancyContractTemplateService';

export function usePassportScanner(importedSource?: DriveImport) {
  const [extractedData, setExtractedData] = useState<InternationalPassportExtractedData | null>(
    () => {
      return henryPassportScannerService.getCachedPassport();
    }
  );
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
  useEffect(
    () => () => {
      generation.current++;
    },
    []
  );

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
    henryPassportScannerService.clearCachedPassport();
    setExtractedData(null);
    setIsScanning(true);
    setUploadedFile(file);
    setStatusMsg(`Scanning Passport "${file.name}"...`);

    try {
      const data = await henryPassportScannerService.scanPassport(file);
      if (request !== generation.current) return;
      setExtractedData(data);
      setStatusMsg(`✓ Extracted Passport: ${data.fullName} (${data.passportNumber})`);
    } catch {
      if (request !== generation.current) return;
      setStatusMsg('Error processing Passport file.');
    } finally {
      if (request === generation.current) setIsScanning(false);
    }
  };

  useDriveScannerIntake(importedSource, handleFileUpload);

  const handleLoadDemo = async () => {
    generation.current++;
    henryPassportScannerService.clearCachedPassport();
    setIsScanning(true);
    setUploadedFile(null);
    try {
      const demo = henryPassportScannerService.getDemoExtractedData();
      setExtractedData(demo);
      setStatusMsg(`✓ Loaded demo Passport: ${demo.fullName}`);
    } finally {
      setIsScanning(false);
    }
  };

  const handleUpdateField = (
    field: keyof InternationalPassportExtractedData,
    val: InternationalPassportExtractedData[keyof InternationalPassportExtractedData]
  ) => {
    if (!extractedData) return;
    setExtractedData(prev => {
      if (!prev) return null;
      const updated = henryPassportScannerService.refreshValidity({
        ...prev,
        [field]: val,
        missingFields: [],
        reviewConfirmed: false,
        expiryAcknowledgedFor: undefined,
        diagnostics: markFieldReviewed(prev.diagnostics, field, val),
      });
      henryPassportScannerService.clearCachedPassport();
      return updated;
    });
  };

  const handleToggleExpiryAck = (checked: boolean) => {
    if (!extractedData) return;
    henryPassportScannerService.clearCachedPassport();
    setExtractedData({
      ...extractedData,
      reviewConfirmed: false,
      expiryAcknowledgedFor: checked ? extractedData.dateOfExpiry : undefined,
    });
  };

  const handleToggleReviewConfirmed = (checked: boolean) => {
    if (!extractedData) return;
    const reviewed = { ...extractedData, reviewConfirmed: checked };
    setExtractedData(reviewed);
    henryPassportScannerService.clearCachedPassport();
    if (canUseScan(reviewed)) henryPassportScannerService.setCachedPassport(reviewed);
  };

  const handleSaveToVault = async () => {
    if (!extractedData || !canUseScan(extractedData) || !uploadedFile || saving.current) return;
    saving.current = true;
    setIsSaving(true);
    const request = generation.current;
    const result = await henryPassportScannerService.saveToDatabase(extractedData, {
      ...vaultOptions,
      ...(uploadedFile === importedSource?.file ? { driveOrigin: importedSource.driveOrigin } : {}),
      sources: [uploadedFile],
    });
    saving.current = false;
    if (request === generation.current) {
      setIsSaving(false);
      setStatusMsg(
        result.success
          ? 'Reviewed passport and original saved to encrypted vault.'
          : result.error || 'Nothing was saved.'
      );
    }
  };

  const handleAutoFillAsTenant = () => {
    if (!extractedData || !canUseScan(extractedData)) return;
    henryPassportScannerService.setCachedPassport(extractedData);
    const draft = henryTenancyContractTemplateService.loadActiveDraft();
    henryTenancyContractTemplateService.saveDraft(
      henryTenancyContractTemplateService.populateFromPassport(draft, extractedData, 'tenant')
    );
    setStatusMsg('Reviewed passport applied as tenant in Preparation Studio.');
  };

  const handleAutoFillAsLandlord = () => {
    if (!extractedData || !canUseScan(extractedData)) return;
    henryPassportScannerService.setCachedPassport(extractedData);
    const draft = henryTenancyContractTemplateService.loadActiveDraft();
    henryTenancyContractTemplateService.saveDraft(
      henryTenancyContractTemplateService.populateFromPassport(draft, extractedData, 'landlord')
    );
    setStatusMsg('Reviewed passport applied as landlord in Preparation Studio.');
  };

  const handleDiscard = () => {
    generation.current++;
    setIsScanning(false);
    setIsSaving(false);
    setExtractedData(null);
    setUploadedFile(null);
    henryPassportScannerService.clearCachedPassport();
    setStatusMsg('Discarded Passport data and cleared session cache.');
  };

  const handleCopyJson = () => {
    if (!extractedData) return;
    navigator.clipboard.writeText(JSON.stringify(extractedData, null, 2));
    setCopiedJson(true);
    setStatusMsg('Extracted Passport JSON copied to clipboard!');
    setTimeout(() => {
      setCopiedJson(false);
      setStatusMsg(null);
    }, 3000);
  };

  return {
    extractedData,
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
    handleUpdateField,
    handleToggleExpiryAck,
    handleToggleReviewConfirmed,
    handleSaveToVault,
    handleAutoFillAsTenant,
    handleAutoFillAsLandlord,
    handleDiscard,
    handleCopyJson,
  };
}
