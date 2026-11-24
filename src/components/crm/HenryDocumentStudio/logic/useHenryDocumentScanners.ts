import { useState, useEffect, useCallback } from 'react';
import henryEmiratesIdScannerService, { EmiratesIdExtractedData } from '../../../../services/HenryEmiratesIdScannerService';
import henryTitleDeedScannerService, { DldTitleDeedExtractedData } from '../../../../services/HenryTitleDeedScannerService';
import henryPassportScannerService, { InternationalPassportExtractedData } from '../../../../services/HenryPassportScannerService';
import henryTenancyContractScannerService, { ScannedTenancyContractResult, SANIT_SINGH_CAMELIA_608_SAMPLE } from '../../../../services/HenryTenancyContractScannerService';
import henryTenancyContractTemplateService from '../../../../services/HenryTenancyContractTemplateService';
import { canUseScan, ScanReview } from '../../../../services/henryScanReview';
import { DEFAULT_EID_DATA, DEFAULT_TITLE_DEED_DATA, DEFAULT_PASSPORT_DATA } from '../data/HenryDocumentStudio.data';
import { TenancyContractPayload } from '../../../../services/HenryPdfEngineService';
import logger from '../../../../utils/logger';

export function useHenryDocumentScanners(
  setTenancyPayload: React.Dispatch<React.SetStateAction<TenancyContractPayload>>,
  copyVariables: (text: string) => Promise<void>
) {
  const [eidData, setEidData] = useState<EmiratesIdExtractedData>(DEFAULT_EID_DATA);
  const [isScanningEid, setIsScanningEid] = useState(false);
  const [titleDeedData, setTitleDeedData] = useState<DldTitleDeedExtractedData>(DEFAULT_TITLE_DEED_DATA);
  const [isScanningDeed, setIsScanningDeed] = useState(false);
  const [passportData, setPassportData] = useState<InternationalPassportExtractedData>(DEFAULT_PASSPORT_DATA);
  const [isScanningPassport, setIsScanningPassport] = useState(false);
  const [scannedTenancyContract, setScannedTenancyContract] = useState<ScannedTenancyContractResult>(SANIT_SINGH_CAMELIA_608_SAMPLE);
  const [isScanningTenancy, setIsScanningTenancy] = useState(false);
  const [scanReview, setScanReview] = useState<ScanReview | null>(null);

  useEffect(() => {
    const eid = henryEmiratesIdScannerService.onEmiratesIdUpdated(data => setEidData(data));
    const deed = henryTitleDeedScannerService.onTitleDeedUpdated(data => setTitleDeedData(data));
    const passport = henryPassportScannerService.onPassportUpdated(data => setPassportData(data));
    const tenancy = henryTenancyContractScannerService.onContractUpdated(data => setScannedTenancyContract(data));
    return () => {
      eid.unsubscribe(); deed.unsubscribe(); passport.unsubscribe(); tenancy.unsubscribe();
      henryEmiratesIdScannerService.clearCachedEmiratesId();
      henryTitleDeedScannerService.clearCachedTitleDeed();
      henryPassportScannerService.clearCachedPassport();
      henryTenancyContractScannerService.clearCachedContract();
    };
  }, []);

  const handleScanEmiratesId = useCallback(async (file?: File) => {
    setIsScanningEid(true);
    try {
      const result = await henryEmiratesIdScannerService.scanEmiratesId(file || new File(['sample'], 'eid_sample.png', { type: 'image/png' }));
      setEidData(result);
    } finally { setIsScanningEid(false); }
  }, []);

  const handleScanTitleDeed = useCallback(async (file?: File) => {
    setIsScanningDeed(true);
    try {
      const result = await henryTitleDeedScannerService.scanTitleDeed(file || new File(['sample'], 'deed_sample.png', { type: 'image/png' }));
      setTitleDeedData(result);
    } finally { setIsScanningDeed(false); }
  }, []);

  const handleScanPassport = useCallback(async (file?: File) => {
    setIsScanningPassport(true);
    try {
      const result = await henryPassportScannerService.scanPassport(file || new File(['sample'], 'passport_sample.png', { type: 'image/png' }));
      setPassportData(result);
    } finally { setIsScanningPassport(false); }
  }, []);

  const handleScanTenancyContract = useCallback(async (preset: 'sample' | 'custom', file?: File) => {
    setIsScanningTenancy(true);
    try {
      const scanned = await henryTenancyContractScannerService.scanContract(preset === 'custom' && file ? file : undefined);
      setScannedTenancyContract(scanned);
      setScanReview(scanned.review);
      if (canUseScan(scanned.review)) {
        const dldData = henryTenancyContractScannerService.toDldTenancyContract(scanned);
        const unifiedPayload = henryTenancyContractTemplateService.dldToTenancyContractPayload(dldData);
        setTenancyPayload(unifiedPayload);
        logger.info('Unified DLD Tenancy Contract payload updated from scan');
      }
    } finally { setIsScanningTenancy(false); }
  }, [setTenancyPayload]);

  return {
    eidData, setEidData, isScanningEid, handleScanEmiratesId,
    titleDeedData, setTitleDeedData, isScanningDeed, handleScanTitleDeed,
    passportData, setPassportData, isScanningPassport, handleScanPassport,
    scannedTenancyContract, setScannedTenancyContract, isScanningTenancy, handleScanTenancyContract,
    scanReview, setScanReview,
  };
}
