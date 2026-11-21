import React, { type FC } from 'react';
import { Calendar, CheckCircle2, FileCheck2, ScanLine, ShieldCheck, X } from 'lucide-react';
import { LEASING_PIPELINE_STAGES, type LeasingLeadStatus } from './Data.data';
import { useEmployeeLeasingPipeline } from './Logic.logic';
import { pipelineStyles } from './Style.style';

export const EmployeeLeasingPipelineView: FC = () => {
  const {
    leads,
    contracts,
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
    handleTransitionLead,
    handleOneClickScheduleViewing,
    handleKycFileUpload,
    openCloseDealModal,
    submitCloseDeal,
  } = useEmployeeLeasingPipeline();

  return (
    <div style={pipelineStyles.container} data-testid="employee-leasing-pipeline">
      <header style={pipelineStyles.header}>
        <div>
          <h1 style={pipelineStyles.title}>
            Employee Leasing Pipeline &amp; Zero-RAM Browser KYC Desk
          </h1>
          <p style={pipelineStyles.subtitle}>
            Live White-Caves-Web &amp; Linda WhatsApp Leads • 1-Click Viewing Scheduler • Browser Tesseract.js OCR (`/tessdata/eng.traineddata`)
          </p>
        </div>

        {/* Browser OCR KYC Uploader */}
        <label
          style={{
            ...pipelineStyles.secondaryBtn,
            border: '1px solid #EF4444',
            padding: '8px 14px',
          }}
        >
          <ScanLine size={14} color="#EF4444" />
          <span>
            {ocr.isProcessing
              ? `Browser OCR Running (${ocr.progress}%)...`
              : 'Scan Tenant Emirates ID / Passport (Browser OCR)'}
          </span>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) void handleKycFileUpload(file);
            }}
          />
        </label>
      </header>

      {bannerMsg && (
        <div
          role="status"
          style={{
            padding: '10px 16px',
            borderRadius: 10,
            backgroundColor: bannerMsg.type === 'success' ? '#065F46' : '#7F1D1D',
            color: '#FFFFFF',
            fontSize: 13,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{bannerMsg.text}</span>
          <button
            type="button"
            onClick={() => setBannerMsg(null)}
            style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {lastOcrFields && (
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            backgroundColor: '#1E293B',
            border: '1px solid #10B981',
            fontSize: 12,
          }}
        >
          <strong style={{ color: '#10B981' }}>
            Parsed Browser KYC Fields (Zero Server RAM):
          </strong>{' '}
          {JSON.stringify(lastOcrFields)}
        </div>
      )}

      {/* Live Kanban Board */}
      <div style={pipelineStyles.kanbanRow}>
        {LEASING_PIPELINE_STAGES.map(stage => {
          const stageLeads = leads.filter(l => l.status === stage.status);
          return (
            <div key={stage.status} style={pipelineStyles.column}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: `2px solid ${stage.accent}`,
                  paddingBottom: 8,
                }}
              >
                <strong style={{ fontSize: 13 }}>{stage.label}</strong>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 999,
                    backgroundColor: `${stage.accent}25`,
                    color: stage.accent,
                  }}
                >
                  {stageLeads.length}
                </span>
              </div>

              {stageLeads.map(lead => (
                <div key={lead.id} style={pipelineStyles.leadCard}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: 13 }}>{lead.tenantName}</strong>
                    <span style={{ fontSize: 10, color: '#94A3B8' }}>{lead.source}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#CBD5E1' }}>{lead.tenantPhone}</div>
                  <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 600 }}>
                    {lead.propertyTitle || lead.community || 'DAMAC Hills 2'}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                    {lead.status === 'NEW' && (
                      <button
                        type="button"
                        style={pipelineStyles.secondaryBtn}
                        onClick={() => void handleTransitionLead(lead.id, 'CONTACTED')}
                      >
                        Mark Contacted
                      </button>
                    )}

                    {(lead.status === 'NEW' || lead.status === 'CONTACTED') && (
                      <button
                        type="button"
                        style={pipelineStyles.secondaryBtn}
                        onClick={() => void handleOneClickScheduleViewing(lead)}
                      >
                        <Calendar size={12} /> 1-Click Viewing
                      </button>
                    )}

                    {lead.status === 'VIEWING_SCHEDULED' && (
                      <button
                        type="button"
                        style={pipelineStyles.secondaryBtn}
                        onClick={() => void handleTransitionLead(lead.id, 'VIEWING_COMPLETED')}
                      >
                        <CheckCircle2 size={12} /> Complete Viewing
                      </button>
                    )}

                    {lead.status === 'VIEWING_COMPLETED' && (
                      <button
                        type="button"
                        style={pipelineStyles.secondaryBtn}
                        onClick={() => void handleTransitionLead(lead.id, 'OFFER_MADE')}
                      >
                        Log Offer
                      </button>
                    )}

                    {lead.status !== 'CLOSED_WON' && (
                      <button
                        type="button"
                        data-testid={`close-leasing-deal-btn-${lead.id}`}
                        style={pipelineStyles.primaryBtn}
                        onClick={() => openCloseDealModal(lead)}
                      >
                        <FileCheck2 size={12} /> Close Leasing Deal
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Active Closed Tenancy Contracts Section */}
      {contracts.length > 0 && (
        <section
          style={{
            backgroundColor: '#1E293B',
            borderRadius: 12,
            padding: 18,
            border: '1px solid #10B981',
          }}
        >
          <h3 style={{ margin: '0 0 12px', fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={18} color="#10B981" />
            <span>Closed DLD / Ejari Tenancy Contracts ({contracts.length})</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {contracts.map(c => (
              <div
                key={c.id}
                style={{
                  backgroundColor: '#0F172A',
                  padding: 14,
                  borderRadius: 10,
                  border: '1px solid #334155',
                  fontSize: 12,
                }}
              >
                <div style={{ fontWeight: 700, color: '#10B981' }}>
                  {c.contractNumber} • Ejari #{c.ejariNumber}
                </div>
                <div style={{ marginTop: 4 }}>
                  <strong>{c.propertyTitle}</strong> ({c.community})
                </div>
                <div style={{ color: '#94A3B8', marginTop: 2 }}>
                  Tenant: {c.tenantName} • AED {c.annualRentAed.toLocaleString()}/yr ({c.chequesCount} Cheques)
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Close Leasing Deal Modal -> POST /api/leasing/contracts/close */}
      {closingLead && (
        <div style={pipelineStyles.modalOverlay} data-testid="close-leasing-deal-modal">
          <div style={pipelineStyles.modalBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 17 }}>
                Close Leasing Deal &amp; Generate Ejari Cheque Schedule
              </h3>
              <button
                type="button"
                onClick={() => setClosingLead(null)}
                style={{ background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ fontSize: 12, color: '#94A3B8' }}>
              Tenant: <strong style={{ color: '#FFF' }}>{closingLead.tenantName}</strong> • Property:{' '}
              <strong style={{ color: '#FFF' }}>
                {closingLead.propertyTitle || closingLead.community}
              </strong>
            </div>

            <div>
              <label style={{ fontSize: 11, color: '#94A3B8', display: 'block', marginBottom: 4 }}>
                Agreed Annual Rent (AED)
              </label>
              <input
                type="number"
                style={pipelineStyles.input}
                value={closeRentAed}
                onChange={e => setCloseRentAed(Number(e.target.value))}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, color: '#94A3B8', display: 'block', marginBottom: 4 }}>
                Number of Rent Cheques
              </label>
              <select
                style={pipelineStyles.input}
                value={closeCheques}
                onChange={e => setCloseCheques(Number(e.target.value))}
              >
                <option value={1}>1 Cheque</option>
                <option value={2}>2 Cheques</option>
                <option value={4}>4 Cheques</option>
                <option value={6}>6 Cheques</option>
                <option value={12}>12 Cheques</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: 11, color: '#94A3B8', display: 'block', marginBottom: 4 }}>
                Verified Tenant Emirates ID (Browser OCR)
              </label>
              <input
                type="text"
                style={pipelineStyles.input}
                value={closeEmiratesId}
                onChange={e => setCloseEmiratesId(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 }}>
              <button
                type="button"
                style={pipelineStyles.secondaryBtn}
                onClick={() => setClosingLead(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                data-testid="confirm-close-deal-btn"
                style={pipelineStyles.primaryBtn}
                onClick={() => void submitCloseDeal()}
              >
                Confirm Close Deal &amp; Flip Property to LEASED
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeasingPipelineView;
