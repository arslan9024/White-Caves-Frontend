import { useCallback, useEffect, useState } from 'react';
import { authFetch } from '../../../utils/authFetch';
import { useClientOcr } from '../../../hooks/useClientOcr';
import {
  type ClosedTenancyContract,
  type LeasingLeadStatus,
  type LeasingPipelineLead,
  type LeasingViewingRecord,
} from './Data.data';

export function useEmployeeLeasingPipeline() {
  const [leads, setLeads] = useState<LeasingPipelineLead[]>([]);
  const [viewings, setViewings] = useState<LeasingViewingRecord[]>([]);
  const [contracts, setContracts] = useState<ClosedTenancyContract[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [closingLead, setClosingLead] = useState<LeasingPipelineLead | null>(null);
  const [closeRentAed, setCloseRentAed] = useState<number>(90000);
  const [closeCheques, setCloseCheques] = useState<number>(4);
  const [closeEmiratesId, setCloseEmiratesId] = useState<string>('784-1992-4829102-1');
  const [bannerMsg, setBannerMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const ocr = useClientOcr();
  const [lastOcrFields, setLastOcrFields] = useState<Record<string, string> | null>(null);

  const fetchPipelineData = useCallback(async () => {
    setLoading(true);
    try {
      const [leadsRes, viewingsRes, contractsRes] = await Promise.all([
        authFetch('/api/leasing/leads').then(r => r.json()),
        authFetch('/api/leasing/viewings').then(r => r.json()),
        authFetch('/api/leasing/contracts').then(r => r.json()),
      ]);
      if (Array.isArray(leadsRes?.data)) setLeads(leadsRes.data);
      if (Array.isArray(viewingsRes?.data)) setViewings(viewingsRes.data);
      if (Array.isArray(contractsRes?.data)) setContracts(contractsRes.data);
    } catch {
      // resilient empty state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPipelineData();
  }, [fetchPipelineData]);

  const handleTransitionLead = useCallback(
    async (leadId: string, nextStatus: LeasingLeadStatus) => {
      try {
        const res = await authFetch(`/api/leasing/leads/${encodeURIComponent(leadId)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: nextStatus }),
        });
        if (res.ok) {
          setLeads(prev => prev.map(l => (l.id === leadId ? { ...l, status: nextStatus } : l)));
          setBannerMsg({ type: 'success', text: `Lead moved to ${nextStatus}` });
        }
      } catch {
        setBannerMsg({ type: 'error', text: 'Unable to transition lead stage' });
      }
    },
    []
  );

  const handleOneClickScheduleViewing = useCallback(async (lead: LeasingPipelineLead) => {
    try {
      const tomorrow4pm = new Date(Date.now() + 86400000);
      tomorrow4pm.setHours(16, 0, 0, 0);
      const res = await authFetch('/api/leasing/viewings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          propertyId: lead.propertyId,
          tenantName: lead.tenantName,
          tenantPhone: lead.tenantPhone,
          scheduledAt: tomorrow4pm.toISOString(),
          status: 'CONFIRMED',
        }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.data) setViewings(prev => [json.data, ...prev]);
        setLeads(prev =>
          prev.map(l => (l.id === lead.id ? { ...l, status: 'VIEWING_SCHEDULED' } : l))
        );
        setBannerMsg({
          type: 'success',
          text: `Viewing scheduled for ${lead.tenantName} (${lead.community || 'DAMAC Hills 2'})`,
        });
      }
    } catch {
      setBannerMsg({ type: 'error', text: 'Failed to schedule viewing' });
    }
  }, []);

  const handleKycFileUpload = useCallback(
    async (file: File, leadId?: string) => {
      // 1. Register PENDING_OCR document in Henry Vault
      await authFetch('/api/leasing/kyc/ingest-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType: 'EMIRATES_ID',
          fileName: file.name,
          leadId,
        }),
      }).catch(() => {});

      // 2. Run zero-server-RAM browser tesseract.js OCR using /tessdata/eng.traineddata
      const result = await ocr.runOcr(file);
      if (result) {
        setLastOcrFields(result.extractedFields);
        if (result.extractedFields.emiratesId) {
          setCloseEmiratesId(result.extractedFields.emiratesId);
        }
        setBannerMsg({
          type: 'success',
          text: `Browser OCR parsed KYC (${Math.round(result.confidence)}% confidence)`,
        });
      }
    },
    [ocr]
  );

  const openCloseDealModal = useCallback((lead: LeasingPipelineLead) => {
    setClosingLead(lead);
    setCloseRentAed(lead.annualRentAed || 90000);
    setCloseCheques(lead.chequesCount || 4);
  }, []);

  const submitCloseDeal = useCallback(async () => {
    if (!closingLead) return;
    try {
      const res = await authFetch('/api/leasing/contracts/close', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: closingLead.id,
          propertyId: closingLead.propertyId,
          propertyTitle: closingLead.propertyTitle,
          community: closingLead.community,
          tenantName: closingLead.tenantName,
          tenantPhone: closingLead.tenantPhone,
          tenantEmiratesId: closeEmiratesId,
          annualRentAed: closeRentAed,
          chequesCount: closeCheques,
        }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.data?.contract) {
          setContracts(prev => [json.data.contract, ...prev]);
        }
        setLeads(prev =>
          prev.map(l => (l.id === closingLead.id ? { ...l, status: 'CLOSED_WON' } : l))
        );
        setBannerMsg({
          type: 'success',
          text: `Deal Closed! TenancyContract active & Property status flipped to LEASED.`,
        });
        setClosingLead(null);
      }
    } catch {
      setBannerMsg({ type: 'error', text: 'Failed to close leasing contract' });
    }
  }, [closeCheques, closeEmiratesId, closeRentAed, closingLead]);

  return {
    leads,
    viewings,
    contracts,
    loading,
    bannerMsg,
    setBannerMsg,
    ocr,
    lastOcrFields,
    closingLead,
    setClosingLead,
    closeRentAed,
    setCloseRentAed,
    closeCheques,
    setCloseCheques,
    closeEmiratesId,
    setCloseEmiratesId,
    fetchPipelineData,
    handleTransitionLead,
    handleOneClickScheduleViewing,
    handleKycFileUpload,
    openCloseDealModal,
    submitCloseDeal,
  };
}
