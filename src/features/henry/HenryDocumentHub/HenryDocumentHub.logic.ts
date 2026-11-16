/**
 * Henry Document Hub — Logic Layer (Mary Allen Wilkes Architecture)
 * Custom React hook managing document states, wizard transitions, and async operations
 */

import { useState, useEffect, useCallback } from 'react';
import {
  buildStatutoryGateXPReward,
  calculateDynamicCommissionSplitPct,
  type StatutoryClearanceMutationResult,
} from '../../../../../Aegis-Sterling/.agents/aegis/protocols/leaderboardXpHooks';
import type {
  DocumentTemplate,
  ComplianceReport,
  HenryRecord,
  HenryDepartmentTag,
  HenryHubActivePanel,
  HenryOcrDocCategory,
} from './HenryDocumentHub.types';
import {
  fetchHenryRecords,
  executeComplianceCheck,
  saveDocumentRecord,
  extractDocumentFields,
  runStatutoryDocumentOcr,
  removeHenryRecord,
  markHenryRecordSigned,
} from './HenryDocumentHub.workflow';

export function useHenryDocumentHubLogic() {
  const [activeTemplate, setActiveTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [complianceReport, setComplianceReport] = useState<ComplianceReport | null>(null);
  const [records, setRecords] = useState<HenryRecord[]>([]);
  const [activePanel, setActivePanel] = useState<HenryHubActivePanel>('editor');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedDepartmentTag, setSelectedDepartmentTag] = useState<HenryDepartmentTag>('legal');
  const [selectedOwnerEmail, setSelectedOwnerEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [staffXP, setStaffXP] = useState(1500);
  const [gatesCleared, setGatesCleared] = useState(3);
  const [latestXpMutation, setLatestXpMutation] = useState<StatutoryClearanceMutationResult | null>(
    null
  );

  const loadRecords = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchHenryRecords();
    if (result.success) {
      setRecords(result.records);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const handleTemplateSelect = (template: DocumentTemplate) => {
    setActiveTemplate(template);
    setFormData({});
    setComplianceReport(null);
    setError(null);
    setSuccessMessage(null);
    setActivePanel('editor');
  };

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleCheckCompliance = async () => {
    if (!activeTemplate) return;
    setIsChecking(true);
    setError(null);
    const result = await executeComplianceCheck(activeTemplate.key, formData);
    if (result.success && result.data) {
      setComplianceReport(result.data);
      setActivePanel('compliance');
      if (result.data.isCompliant) {
        const xpAward = buildStatutoryGateXPReward({
          staffProfileId: 'staff-lion-001',
          taskRecordId: `HENRY-COMPLIANCE-${activeTemplate.key}-${Date.now()}`,
          citationReference: `RERA/DLD Statutory Gate (${activeTemplate.label})`,
          currentXP: staffXP,
          currentGatesCleared: gatesCleared,
        });
        setStaffXP(xpAward.newTotalXP);
        setGatesCleared(xpAward.newStatutoryGatesCleared);
        setLatestXpMutation(xpAward);
        setSuccessMessage(
          `Statutory Gate Cleared! +${xpAward.xpDelta} XP credited (${xpAward.newTotalXP} XP · ${xpAward.resultingSplitPct}% Commission Split)`
        );
      }
    } else {
      setError(result.error ?? 'Compliance check failed');
    }
    setIsChecking(false);
  };

  const handleSaveRecord = async () => {
    if (!activeTemplate) return;
    setIsSaving(true);
    setError(null);
    const result = await saveDocumentRecord({
      template: activeTemplate,
      formData,
      departmentTag: selectedDepartmentTag,
      ownerUserEmail: selectedOwnerEmail,
    });
    if (result.success) {
      setSuccessMessage('Document saved to archive successfully');
      await loadRecords();
      setActivePanel('archive');
    } else {
      setError(result.error ?? 'Save failed');
    }
    setIsSaving(false);
  };

  const handleExtractFields = async (text: string) => {
    if (!activeTemplate) return;
    setIsExtracting(true);
    setError(null);
    const result = await extractDocumentFields(activeTemplate.key, text);
    if (result.success && result.fields) {
      setFormData(prev => ({ ...prev, ...result.fields }));
      setSuccessMessage(
        `AI extracted fields with ${Math.round((result.confidence ?? 0) * 100)}% confidence`
      );
    } else {
      setError(result.error ?? 'Extraction failed');
    }
    setIsExtracting(false);
  };

  const handleOcrDocumentScan = async (docCategory: HenryOcrDocCategory, imageBase64?: string) => {
    setIsExtracting(true);
    setError(null);
    const ocrResult = await runStatutoryDocumentOcr(docCategory, imageBase64);
    if (ocrResult.success) {
      setFormData(prev => ({ ...prev, ...ocrResult.fields }));
      const xpAward = buildStatutoryGateXPReward({
        staffProfileId: 'staff-lion-001',
        taskRecordId: `HENRY-OCR-${docCategory}-${Date.now()}`,
        citationReference: ocrResult.citation,
        currentXP: staffXP,
        currentGatesCleared: gatesCleared,
      });
      setStaffXP(xpAward.newTotalXP);
      setGatesCleared(xpAward.newStatutoryGatesCleared);
      setLatestXpMutation(xpAward);
      setSuccessMessage(
        `${ocrResult.label} verified (${(ocrResult.confidence * 100).toFixed(1)}%) — +${xpAward.xpDelta} XP Merit Ledger Credited (${xpAward.newTotalXP} XP · ${xpAward.resultingSplitPct}% Split)`
      );
    }
    setIsExtracting(false);
  };

  const handleDeleteRecord = async (id: string) => {
    const result = await removeHenryRecord(id);
    if (result.success) {
      setRecords(prev => prev.filter(r => r.id !== id));
    } else {
      setError(result.error ?? 'Delete failed');
    }
  };

  const handleMarkSigned = async (id: string) => {
    setError(null);
    const result = await markHenryRecordSigned(id);
    if (result.success) {
      setSuccessMessage('Record marked as signed');
      await loadRecords();
    } else {
      setError(result.error ?? 'Unable to mark record as signed');
    }
  };

  return {
    activeTemplate,
    formData,
    complianceReport,
    records,
    activePanel,
    isLoading,
    isSaving,
    isChecking,
    isExtracting,
    selectedDepartmentTag,
    selectedOwnerEmail,
    error,
    successMessage,
    setActivePanel,
    setSelectedDepartmentTag,
    setSelectedOwnerEmail,
    loadRecords,
    handleTemplateSelect,
    handleFieldChange,
    handleCheckCompliance,
    handleSaveRecord,
    handleExtractFields,
    handleOcrDocumentScan,
    handleDeleteRecord,
    handleMarkSigned,
    staffXP,
    gatesCleared,
    commissionSplitPct: calculateDynamicCommissionSplitPct(staffXP),
    latestXpMutation,
  };
}
