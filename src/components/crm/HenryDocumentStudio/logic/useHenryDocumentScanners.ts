// FILE: src/components/crm/HenryDocumentStudio/logic/useHenryDocumentScanners.ts
/**
 * useHenryDocumentScanners.ts — OCR Scanner State, Review Gates & Safe Autofill Handlers
 * Standard: AEGIS Canonical 12-Way Architecture & Single Purpose File Law (< 350 lines, AEG-042).
 */

import { useState, useEffect, useCallback } from 'react';
import henryEmiratesIdScannerService, {
  EmiratesIdExtractedData,
} from '../../../../services/HenryEmiratesIdScannerService';
import henryTitleDeedScannerService, {
  DldTitleDeedExtractedData,
} from '../../../../services/HenryTitleDeedScannerService';
import henryPassportScannerService, {
  InternationalPassportExtractedData,
} from '../../../../services/HenryPassportScannerService';
import henryTenancyContractScannerService, {
  ScannedTenancyContractResult,
  SANIT_SINGH_CAMELIA_608_SAMPLE,
} from '../../../../services/HenryTenancyContractScannerService';
import henryTenancyContractTemplateService from '../../../../services/HenryTenancyContractTemplateService';
import {
  DEFAULT_EID_DATA,
  DEFAULT_TITLE_DEED_DATA,
  DEFAULT_PASSPORT_DATA,
  DocumentTemplateOption,
} from '../data/HenryDocumentStudio.data';
import type {
  TenancyContractPayload,
  ViewingFormPayload,
} from '../../../../services/HenryPdfEngineService';

export interface UseHenryDocumentScannersArgs {
  requireReview: (data: object) => boolean;
  setActionSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedTemplateId: React.Dispatch<React.SetStateAction<DocumentTemplateOption['id']>>;
  setTenancyPayload: React.Dispatch<React.SetStateAction<TenancyContractPayload>>;
  setViewingPayload: React.Dispatch<React.SetStateAction<ViewingFormPayload>>;
  setIsTenancyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  copyVariables: (json: string) => Promise<void>;
}

export function useHenryDocumentScanners({
  requireReview,
  setActionSuccessMessage,
  setSelectedTemplateId,
  setTenancyPayload,
  setViewingPayload,
  setIsTenancyModalOpen,
  copyVariables,
}: UseHenryDocumentScannersArgs) {
  const [eidData, setEidData] = useState<EmiratesIdExtractedData>(DEFAULT_EID_DATA);
  const [titleDeedData, setTitleDeedData] =
    useState<DldTitleDeedExtractedData>(DEFAULT_TITLE_DEED_DATA);
  const [passportData, setPassportData] =
    useState<InternationalPassportExtractedData>(DEFAULT_PASSPORT_DATA);
  const [scannedContractData, setScannedContractData] = useState<ScannedTenancyContractResult>(
    SANIT_SINGH_CAMELIA_608_SAMPLE
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);

  useEffect(() => {
    const eid = henryEmiratesIdScannerService.onEmiratesIdUpdated(data =>
      setEidData(data || DEFAULT_EID_DATA)
    );
    const deed = henryTitleDeedScannerService.onTitleDeedUpdated(data =>
      setTitleDeedData(data || DEFAULT_TITLE_DEED_DATA)
    );
    return () => {
      if (typeof eid === 'function') eid();
      if (typeof deed === 'function') deed();
      henryEmiratesIdScannerService.clearCachedEmiratesId();
      henryTitleDeedScannerService.clearCachedTitleDeed();
      henryPassportScannerService.clearCachedPassport();
      henryTenancyContractScannerService.clearCachedContract();
      henryTenancyContractTemplateService.clearSession();
    };
  }, []);

  const flashMessage = useCallback(
    (msg: string, ms = 4000) => {
      setActionSuccessMessage(msg);
      setTimeout(() => setActionSuccessMessage(null), ms);
    },
    [setActionSuccessMessage]
  );

  const handleScanEmiratesId = useCallback(
    async (file?: File) => {
      setIsScanning(true);
      setActionSuccessMessage(null);
      try {
        const result = await henryEmiratesIdScannerService.scanEmiratesId(file || 'sample');
        setEidData(result);
        flashMessage(
          file
            ? 'Emirates ID extraction candidates ready for source review; not identity verification.'
            : 'Emirates ID demo preview only; no uploaded document was scanned or verified.'
        );
      } finally {
        setIsScanning(false);
      }
    },
    [flashMessage, setActionSuccessMessage]
  );

  const handleScanTitleDeed = useCallback(
    async (file?: File) => {
      setIsScanning(true);
      setActionSuccessMessage(null);
      try {
        const result = await henryTitleDeedScannerService.scanTitleDeed(file || 'sample');
        setTitleDeedData(result);
        flashMessage(
          file
            ? 'Title deed extraction candidates ready for source review; not ownership verification.'
            : 'Title deed demo preview only; no uploaded document was scanned or verified.'
        );
      } finally {
        setIsScanning(false);
      }
    },
    [flashMessage, setActionSuccessMessage]
  );

  const handleScanPassport = useCallback(
    async (file?: File) => {
      setIsScanning(true);
      setActionSuccessMessage(null);
      try {
        const result = await henryPassportScannerService.scanPassport(file || 'sample');
        setPassportData(result);
        flashMessage(
          file
            ? 'Passport extraction candidates ready for source review; MRZ checks are not authenticity verification.'
            : 'Passport demo preview only; no uploaded document was scanned or verified.'
        );
      } finally {
        setIsScanning(false);
      }
    },
    [flashMessage, setActionSuccessMessage]
  );

  const handleScanTenancyContract = useCallback(
    async (preset: 'sample' | 'sample_sanit' | 'sample_svetlana' | 'blank' = 'sample') => {
      setIsScanning(true);
      try {
        const scanned = await henryTenancyContractScannerService.scanContract(preset);
        setScannedContractData(scanned);
        flashMessage(
          'Tenancy contract demo preview only. Field coverage does not verify execution or signatures; no model was trained.',
          4500
        );
      } catch {
        flashMessage('Error scanning Tenancy Contract.', 4500);
      } finally {
        setIsScanning(false);
      }
    },
    [flashMessage]
  );

  const handleAutoFillAsTenant = useCallback(() => {
    if (!requireReview(eidData)) return;
    setTenancyPayload(prev => ({
      ...prev,
      tenant: henryEmiratesIdScannerService.toContractParty(
        eidData,
        prev.tenant.phone,
        prev.tenant.email
      ),
    }));
    setSelectedTemplateId('tenancy_contract_esign');
    flashMessage(`Tenancy Lease auto-filled with ${eidData.fullNameEn} as Tenant!`);
  }, [eidData, requireReview, setTenancyPayload, setSelectedTemplateId, flashMessage]);

  const handleAutoFillAsLandlord = useCallback(() => {
    if (!requireReview(eidData)) return;
    setTenancyPayload(prev => ({
      ...prev,
      landlord: henryEmiratesIdScannerService.toContractParty(
        eidData,
        prev.landlord.phone,
        prev.landlord.email
      ),
    }));
    setSelectedTemplateId('tenancy_contract_esign');
    flashMessage(`Tenancy Lease auto-filled with ${eidData.fullNameEn} as Landlord!`);
  }, [eidData, requireReview, setTenancyPayload, setSelectedTemplateId, flashMessage]);

  const handleAutoFillTenancyFromTitleDeed = useCallback(() => {
    if (!requireReview(titleDeedData)) return;
    setTenancyPayload(prev =>
      henryTitleDeedScannerService.toTenancyContractPayload(titleDeedData, prev)
    );
    setSelectedTemplateId('tenancy_contract_esign');
    flashMessage(
      `Tenancy Lease updated with ${titleDeedData.buildingNameEn} Unit ${titleDeedData.propertyNumber} and Landlord ${titleDeedData.ownerNameEn}!`
    );
  }, [titleDeedData, requireReview, setTenancyPayload, setSelectedTemplateId, flashMessage]);

  const handleAutoFillTenancyAsPassportTenant = useCallback(() => {
    if (!requireReview(passportData)) return;
    setTenancyPayload(prev => ({
      ...prev,
      tenant: henryPassportScannerService.toContractParty(
        passportData,
        prev.tenant.phone,
        prev.tenant.email
      ),
    }));
    setSelectedTemplateId('tenancy_contract_esign');
    flashMessage(
      `Tenancy Lease auto-filled with ${passportData.fullName} (Passport ${passportData.passportNumber}) as Tenant!`
    );
  }, [passportData, requireReview, setTenancyPayload, setSelectedTemplateId, flashMessage]);

  const handleAutoFillTenancyAsPassportLandlord = useCallback(() => {
    if (!requireReview(passportData)) return;
    setTenancyPayload(prev => ({
      ...prev,
      landlord: henryPassportScannerService.toContractParty(
        passportData,
        prev.landlord.phone,
        prev.landlord.email
      ),
    }));
    setSelectedTemplateId('tenancy_contract_esign');
    flashMessage(
      `Tenancy Lease auto-filled with ${passportData.fullName} (Passport ${passportData.passportNumber}) as Landlord!`
    );
  }, [passportData, requireReview, setTenancyPayload, setSelectedTemplateId, flashMessage]);

  const handleAutoFillViewingFromPassport = useCallback(() => {
    if (!requireReview(passportData)) return;
    setViewingPayload(prev => ({
      ...prev,
      clientName: passportData.fullName,
      clientPassportOrEid: `Passport: ${passportData.passportNumber} (${passportData.issuingCountryCode})`,
    }));
    setSelectedTemplateId('viewing_form_autofill');
    flashMessage(`Form B Viewing Register auto-filled with ${passportData.fullName}!`);
  }, [passportData, requireReview, setViewingPayload, setSelectedTemplateId, flashMessage]);

  const handleAutoFillViewingForm = useCallback(() => {
    if (!requireReview(eidData)) return;
    setViewingPayload(prev => ({
      ...prev,
      clientName: eidData.fullNameEn,
      clientPassportOrEid: eidData.idNumber,
    }));
    setSelectedTemplateId('viewing_form_autofill');
    flashMessage(`Form B Viewing Register auto-filled with ${eidData.fullNameEn}!`);
  }, [eidData, requireReview, setViewingPayload, setSelectedTemplateId, flashMessage]);

  const handleCopyJsonVariables = useCallback(() => {
    void copyVariables(henryEmiratesIdScannerService.exportToJsonString(eidData));
  }, [eidData, copyVariables]);

  const handleCopyTitleDeedJsonVariables = useCallback(() => {
    void copyVariables(henryTitleDeedScannerService.exportToJsonString(titleDeedData));
  }, [titleDeedData, copyVariables]);

  const handleCopyPassportJsonVariables = useCallback(() => {
    void copyVariables(henryPassportScannerService.exportToJsonString(passportData));
  }, [passportData, copyVariables]);

  const handleCopyContractJsonVariables = useCallback(() => {
    void copyVariables(henryTenancyContractScannerService.exportToJsonString(scannedContractData));
  }, [scannedContractData, copyVariables]);

  const handleCreateCrmListing = useCallback(() => {
    if (!requireReview(titleDeedData)) return;
    flashMessage(
      'CRM creation is unavailable here. Link an existing approved property in the archive controls.'
    );
  }, [titleDeedData, requireReview, flashMessage]);

  const handleAutoFillFormA = useCallback(() => {
    if (!requireReview(titleDeedData)) return;
    flashMessage('Form A generation is not available in this scanner.');
  }, [titleDeedData, requireReview, flashMessage]);

  const handleCreateAmlKycRecord = useCallback(() => {
    if (!requireReview(passportData)) return;
    flashMessage('goAML record creation is not available in this scanner.');
  }, [passportData, requireReview, flashMessage]);

  const handleLoadContractIntoPreparationStudio = useCallback(() => {
    if (!requireReview(scannedContractData)) return;
    const dldData =
      henryTenancyContractScannerService.toDldTenancyContractData(scannedContractData);
    henryTenancyContractTemplateService.saveDraft(dldData as any);
    setIsTenancyModalOpen(true);
    flashMessage(
      `Loaded ${scannedContractData.property.buildingName} #${scannedContractData.property.propertyNumber} into Tenancy Preparation Studio!`
    );
  }, [scannedContractData, requireReview, setIsTenancyModalOpen, flashMessage]);

  const handleCreateCrmLandlordFromContract = useCallback(() => {
    if (!requireReview(scannedContractData)) return;
    flashMessage('CRM profile creation is not available in this scanner.');
  }, [scannedContractData, requireReview, flashMessage]);

  const handleCreateCrmTenantFromContract = useCallback(() => {
    if (!requireReview(scannedContractData)) return;
    flashMessage('CRM profile creation is not available in this scanner.');
  }, [scannedContractData, requireReview, flashMessage]);

  return {
    eidData,
    titleDeedData,
    passportData,
    scannedContractData,
    isScanning,
    handleScanEmiratesId,
    handleScanTitleDeed,
    handleScanPassport,
    handleScanTenancyContract,
    handleAutoFillAsTenant,
    handleAutoFillAsLandlord,
    handleAutoFillTenancyFromTitleDeed,
    handleAutoFillTenancyAsPassportTenant,
    handleAutoFillTenancyAsPassportLandlord,
    handleAutoFillViewingFromPassport,
    handleAutoFillViewingForm,
    handleCopyJsonVariables,
    handleCopyTitleDeedJsonVariables,
    handleCopyPassportJsonVariables,
    handleCopyContractJsonVariables,
    handleCreateCrmListing,
    handleAutoFillFormA,
    handleCreateAmlKycRecord,
    handleLoadContractIntoPreparationStudio,
    handleCreateCrmLandlordFromContract,
    handleCreateCrmTenantFromContract,
  };
}
