import { useState, useEffect, useRef } from 'react';
import henryTitleDeedScannerService, {
  DldTitleDeedExtractedData,
} from '../../../../services/HenryTitleDeedScannerService';
import {
  assessScanReadiness,
  canUseScan,
  VaultSaveOptions,
} from '../../../../services/henryScanReview';
import { markFieldReviewed } from '../../../../services/henryDocumentParsing';
import { snapshotBenchmarkValues, type BenchmarkValues } from '../../../../services/henryBenchmark';
import type { DriveImport } from '../../../../services/henryDrive';
import { useDriveScannerIntake } from '../logic/useDriveScannerIntake';

export type TitleDeedPresetKey = 'buko' | 'demo';

export function useTitleDeedScannerState(importedSource?: DriveImport) {
  const scanGeneration = useRef(0);
  const [uploaderReset, setUploaderReset] = useState(0);
  const [archiveReset, setArchiveReset] = useState(0);
  const [scannerValues, setScannerValues] = useState<Readonly<BenchmarkValues>>();
  const [extractedData, setExtractedData] = useState<DldTitleDeedExtractedData | null>(() => {
    return henryTitleDeedScannerService.getCachedTitleDeed();
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [vaultOptions, setVaultOptions] = useState<VaultSaveOptions>({});
  const readiness = assessScanReadiness(extractedData);

  useEffect(() => {
    if (!canUseScan(extractedData)) henryTitleDeedScannerService.clearCachedTitleDeed();
  }, [extractedData]);

  useEffect(() => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      setFilePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setFilePreviewUrl(null);
    }
  }, [uploadedFile]);

  const handleFileUpload = async (file: File, original: File = file) => {
    const generation = ++scanGeneration.current;
    setVaultOptions({});
    setArchiveReset(previous => previous + 1);
    setIsScanning(true);
    setScannerValues(undefined);
    setExtractedData(null);
    henryTitleDeedScannerService.clearCachedTitleDeed();
    setUploadedFile(original);
    setStatusMsg(`Scanning Title Deed "${file.name}"...`);

    try {
      const data = await henryTitleDeedScannerService.scanTitleDeed(file);
      if (generation !== scanGeneration.current) return;
      setScannerValues(snapshotBenchmarkValues(data));
      setExtractedData(data);
      setStatusMsg(
        `✓ Extracted Property: ${data.buildingNameEn} #${data.propertyNumber} (${data.ownerNameEn})`
      );
    } catch (error) {
      if (generation === scanGeneration.current)
        setStatusMsg(error instanceof Error ? error.message : 'Error processing Title Deed.');
    } finally {
      if (generation === scanGeneration.current) {
        setIsScanning(false);
        setTimeout(() => {
          if (generation === scanGeneration.current) setStatusMsg(null);
        }, 4000);
      }
    }
  };

  useDriveScannerIntake(importedSource, handleFileUpload);

  const handleLoadDemo = async () => {
    setVaultOptions({});
    setArchiveReset(previous => previous + 1);
    setUploaderReset(previous => previous + 1);
    setScannerValues(undefined);
    scanGeneration.current++;
    henryTitleDeedScannerService.clearCachedTitleDeed();
    setIsScanning(true);
    setUploadedFile(null);
    try {
      const demo = henryTitleDeedScannerService.getDemoExtractedData();
      setExtractedData(demo);
      setStatusMsg(`✓ Loaded demo Title Deed: ${demo.buildingNameEn} #${demo.propertyNumber}`);
    } finally {
      setIsScanning(false);
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleLoadPreset = (preset: TitleDeedPresetKey) => {
    scanGeneration.current++;
    setUploaderReset(previous => previous + 1);
    setIsScanning(false);
    setUploadedFile(null);
    const sample =
      preset === 'buko'
        ? henryTitleDeedScannerService.getBukoSample()
        : henryTitleDeedScannerService.getDemoExtractedData();
    setScannerValues(undefined);
    setExtractedData(sample);
    setStatusMsg(`✓ Ingested Property: ${sample.ownerNameEn} — ${sample.buildingNameEn}`);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleUpdateField = (
    field: keyof DldTitleDeedExtractedData,
    val: DldTitleDeedExtractedData[keyof DldTitleDeedExtractedData]
  ) => {
    henryTitleDeedScannerService.clearCachedTitleDeed();
    if (!extractedData) return;
    setExtractedData(prev => {
      if (!prev) return null;
      const updated = { ...prev, [field]: val, reviewConfirmed: false };
      updated.diagnostics = markFieldReviewed(prev.diagnostics, field, val);
      updated.missingFields = [
        !updated.certificateNumber && 'certificateNumber',
        !updated.ownerNameEn && 'ownerNameEn',
        !(updated.propertyNumber || updated.plotNumber) && 'propertyNumber',
      ].filter((value): value is string => !!value);

      return updated;
    });
  };

  const handleVaultSuggestion = (data: unknown) => {
    setArchiveReset(previous => previous + 1);
    setUploaderReset(previous => previous + 1);
    setScannerValues(undefined);
    scanGeneration.current++;
    setIsScanning(false);
    henryTitleDeedScannerService.clearCachedTitleDeed();
    setUploadedFile(null);
    setExtractedData(data as DldTitleDeedExtractedData);
  };

  const handleReviewConfirmChange = (checked: boolean) => {
    henryTitleDeedScannerService.clearCachedTitleDeed();
    setExtractedData(prev => (prev ? { ...prev, reviewConfirmed: checked } : prev));
  };

  const handleSaveToVault = async () => {
    if (!extractedData || !canUseScan(extractedData) || isScanning) return;
    const generation = scanGeneration.current;
    if (!uploadedFile) {
      setStatusMsg('Upload an original before archival. Suggestions alone cannot be archived.');
      return;
    }
    const result = await henryTitleDeedScannerService.saveToDatabase(extractedData, {
      ...vaultOptions,
      ...(uploadedFile === importedSource?.file ? { driveOrigin: importedSource.driveOrigin } : {}),
      sources: [uploadedFile],
    });
    if (generation !== scanGeneration.current) return;
    if (result.success) setVaultOptions(previous => ({ ...previous, replacesId: undefined }));
    setStatusMsg(
      result.success ? 'Reviewed record saved to encrypted vault.' : result.error || 'Save failed.'
    );
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleAutoFillTenancy = () => {
    if (!extractedData || !canUseScan(extractedData) || isScanning) return;
    henryTitleDeedScannerService.setCachedTitleDeed(extractedData);
    setStatusMsg(
      `Reviewed fields available to Tenancy Contract: ${extractedData.buildingNameEn} Unit ${extractedData.propertyNumber} & Landlord ${extractedData.ownerNameEn}!`
    );
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleCreateCrmListing = () => {
    if (!extractedData || !canUseScan(extractedData) || isScanning) return;
    henryTitleDeedScannerService.setCachedTitleDeed(extractedData);
    setStatusMsg(
      `Reviewed fields available for CRM draft: ${extractedData.buildingNameEn} Unit ${extractedData.propertyNumber} (${extractedData.totalAreaSqFt} Sq.Ft)!`
    );
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleDiscard = () => {
    setVaultOptions({});
    setArchiveReset(previous => previous + 1);
    setUploaderReset(previous => previous + 1);
    setScannerValues(undefined);
    scanGeneration.current++;
    setIsScanning(false);
    setExtractedData(null);
    setUploadedFile(null);
    henryTitleDeedScannerService.clearCachedTitleDeed();
    setStatusMsg('Discarded Title Deed data and cleared cache.');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleCopyJson = () => {
    if (!extractedData) return;
    navigator.clipboard.writeText(JSON.stringify(extractedData, null, 2));
    setCopiedJson(true);
    setStatusMsg('Extracted Title Deed JSON copied to clipboard!');
    setTimeout(() => {
      setCopiedJson(false);
      setStatusMsg(null);
    }, 3000);
  };

  return {
    uploaderReset,
    archiveReset,
    scannerValues,
    extractedData,
    uploadedFile,
    filePreviewUrl,
    isScanning,
    zoomLevel,
    statusMsg,
    copiedJson,
    vaultOptions,
    readiness,
    canConfirmReview:
      !!extractedData && canUseScan({ ...extractedData, reviewConfirmed: true }) && !isScanning,
    canUseActions: canUseScan(extractedData) && !isScanning,
    setVaultOptions,
    handleFileUpload,
    handleLoadDemo,
    handleLoadPreset,
    handleUpdateField,
    handleVaultSuggestion,
    handleReviewConfirmChange,
    handleSaveToVault,
    handleAutoFillTenancy,
    handleCreateCrmListing,
    handleDiscard,
    handleCopyJson,
    zoomOut: () => setZoomLevel(prev => Math.max(70, prev - 15)),
    zoomIn: () => setZoomLevel(prev => Math.min(180, prev + 15)),
  };
}
