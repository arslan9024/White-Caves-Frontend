import { useState, useCallback } from 'react';
import {
  buildStatutoryGateXPReward,
  calculateDynamicCommissionSplitPct,
  STATUTORY_GATE_XP_REWARD,
  type StatutoryClearanceMutationResult,
} from '../../../../../Aegis-Sterling/.agents/aegis/protocols/leaderboardXpHooks';

export type StatutoryDocType = 'EMIRATES_ID' | 'PASSPORT' | 'TITLE_DEED' | 'EJARI';

export interface OcrDocumentMetadata {
  docType: StatutoryDocType;
  label: string;
  primaryName: string;
  idOrReferenceNumber: string;
  expiryOrIssueDate: string;
  nationalityOrCommunity: string;
  statutoryLawCitation: string;
  confidence: number;
}

export const STATUTORY_DOC_PRESETS: Record<StatutoryDocType, OcrDocumentMetadata> = {
  EMIRATES_ID: {
    docType: 'EMIRATES_ID',
    label: 'UAE Emirates ID (ICA)',
    primaryName: 'Arsalan Malik',
    idOrReferenceNumber: '784-1990-4829104-1',
    expiryOrIssueDate: '2029-11-14',
    nationalityOrCommunity: 'United Arab Emirates',
    statutoryLawCitation: 'UAE Federal Decree-Law No. 4/2021 (ICA KYC)',
    confidence: 0.996,
  },
  PASSPORT: {
    docType: 'PASSPORT',
    label: 'International Passport (MRZ)',
    primaryName: 'Arsalan Malik',
    idOrReferenceNumber: 'P94827104',
    expiryOrIssueDate: '2031-08-22',
    nationalityOrCommunity: 'Verified MRZ Biometric',
    statutoryLawCitation: 'UAE AML/CFT Federal Decree-Law No. 20/2018',
    confidence: 0.994,
  },
  TITLE_DEED: {
    docType: 'TITLE_DEED',
    label: 'DLD Title Deed (QR Verified)',
    primaryName: 'Arsalan Malik',
    idOrReferenceNumber: 'DLD-TD-2026-88412',
    expiryOrIssueDate: '2026-04-10',
    nationalityOrCommunity: 'DAMAC Hills 2 — Vardon',
    statutoryLawCitation: 'Dubai Real Estate Law No. 7/2006 (DLD Registry)',
    confidence: 0.992,
  },
  EJARI: {
    docType: 'EJARI',
    label: 'RERA Ejari Certificate',
    primaryName: 'Arsalan Malik',
    idOrReferenceNumber: 'EJ-012026094812',
    expiryOrIssueDate: '2027-10-31',
    nationalityOrCommunity: 'Palm Jumeirah Signature Villa',
    statutoryLawCitation: 'Dubai Tenancy Law No. 26/2007 & Law No. 33/2008',
    confidence: 0.995,
  },
};

export interface WizardStep {
  id: number;
  title: string;
  description: string;
}

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: 1,
    title: 'Upload Document',
    description: 'Upload Emirates ID, Passport, Title Deed, or Ejari PDF for AI OCR extraction',
  },
  {
    id: 2,
    title: 'OCR Metadata Processing',
    description:
      'Automated data extraction of buyer/seller names, Emirates ID, Passport, Title Deed, and Ejari numbers',
  },
  {
    id: 3,
    title: 'Form Selection',
    description: 'Select RERA Form A (Seller), Form B (Buyer), or Form I (Agent Split)',
  },
  {
    id: 4,
    title: 'Compliance & AML Verification',
    description:
      'Real-time Trakheesi permit validation, AML clearance, and +500 XP Merit Ledger award',
  },
  {
    id: 5,
    title: 'PDF Compilation & Signature',
    description: 'Generate final encrypted PDF document ready for digital e-signature',
  },
];

export function useHenryDocumentHubLogic() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<StatutoryDocType>('TITLE_DEED');
  const [selectedForm, setSelectedForm] = useState<'Form A' | 'Form B' | 'Form I'>('Form A');
  const [extractedName, setExtractedName] = useState('Arsalan Malik');
  const [extractedIdNumber, setExtractedIdNumber] = useState(
    STATUTORY_DOC_PRESETS.TITLE_DEED.idOrReferenceNumber
  );
  const [extractedCommunity, setExtractedCommunity] = useState(
    STATUTORY_DOC_PRESETS.TITLE_DEED.nationalityOrCommunity
  );
  const [isComplete, setIsComplete] = useState(false);
  const [accumulatedXP, setAccumulatedXP] = useState(1500);
  const [gatesCleared, setGatesCleared] = useState(3);
  const [xpRewardLedger, setXpRewardLedger] = useState<StatutoryClearanceMutationResult | null>(
    null
  );

  const selectDocumentType = useCallback((docType: StatutoryDocType) => {
    const preset = STATUTORY_DOC_PRESETS[docType];
    setSelectedDocType(docType);
    setExtractedName(preset.primaryName);
    setExtractedIdNumber(preset.idOrReferenceNumber);
    setExtractedCommunity(preset.nationalityOrCommunity);
  }, []);

  const awardStatutoryMeritXP = useCallback(() => {
    const preset = STATUTORY_DOC_PRESETS[selectedDocType];
    const mutation = buildStatutoryGateXPReward({
      staffProfileId: 'staff-lion-001',
      taskRecordId: `HENRY-${selectedDocType}-${Date.now()}`,
      citationReference: preset.statutoryLawCitation,
      currentXP: accumulatedXP,
      currentGatesCleared: gatesCleared,
    });
    setAccumulatedXP(mutation.newTotalXP);
    setGatesCleared(mutation.newStatutoryGatesCleared);
    setXpRewardLedger(mutation);
    return mutation;
  }, [selectedDocType, accumulatedXP, gatesCleared]);

  const nextStep = useCallback(() => {
    if (currentStep < 5) {
      setIsProcessing(true);
      setTimeout(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next === 4 && !xpRewardLedger) {
            const preset = STATUTORY_DOC_PRESETS[selectedDocType];
            const mutation = buildStatutoryGateXPReward({
              staffProfileId: 'staff-lion-001',
              taskRecordId: `HENRY-${selectedDocType}`,
              citationReference: preset.statutoryLawCitation,
              currentXP: accumulatedXP,
              currentGatesCleared: gatesCleared,
            });
            setAccumulatedXP(mutation.newTotalXP);
            setGatesCleared(mutation.newStatutoryGatesCleared);
            setXpRewardLedger(mutation);
          }
          if (next === 5) setIsComplete(true);
          return next;
        });
        setIsProcessing(false);
      }, 500);
    }
  }, [currentStep, selectedDocType, accumulatedXP, gatesCleared, xpRewardLedger]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setIsComplete(false);
    }
  }, [currentStep]);

  return {
    currentStep,
    isProcessing,
    selectedDocType,
    selectDocumentType,
    ocrMetadata: STATUTORY_DOC_PRESETS[selectedDocType],
    selectedForm,
    setSelectedForm,
    extractedName,
    setExtractedName,
    extractedIdNumber,
    setExtractedIdNumber,
    extractedCommunity,
    setExtractedCommunity,
    isComplete,
    accumulatedXP,
    gatesCleared,
    commissionSplitPct: calculateDynamicCommissionSplitPct(accumulatedXP),
    xpRewardDelta: STATUTORY_GATE_XP_REWARD,
    xpRewardLedger,
    awardStatutoryMeritXP,
    nextStep,
    prevStep,
    steps: WIZARD_STEPS,
  };
}

