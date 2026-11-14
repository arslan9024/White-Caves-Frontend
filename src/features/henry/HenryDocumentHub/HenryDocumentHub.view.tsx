/**
 * Henry Document Hub — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component composing Sidebar, Editor, Compliance & Archive
 */

import React from 'react';
import type { HenryDocumentHubProps } from './HenryDocumentHub.types';
import { DOCUMENT_TEMPLATES } from './HenryDocumentHub.data';
import { useHenryDocumentHubLogic } from './HenryDocumentHub.logic';
import { DocumentEditor } from './HenryDocumentHub.editor';
import { CompliancePanel, ArchivePanel, HenryEmptyState } from './HenryDocumentHub.fallback';
import {
  hubContainerStyle,
  sidebarStyle,
  sidebarHeaderStyle,
  mainContentStyle,
  errorAlertStyle,
  successAlertStyle,
} from './HenryDocumentHub.styles';

export const HenryDocumentHubView: React.FC<HenryDocumentHubProps> = () => {
  const {
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
    handleDeleteRecord,
    handleMarkSigned,
  } = useHenryDocumentHubLogic();

  return (
    <div className="henry-document-hub" style={hubContainerStyle}>
      {/* ── Left: Template List ── */}
      <aside style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>📄 HENRY — DOCUMENT HUB</div>
        {DOCUMENT_TEMPLATES.map(t => (
          <button
            key={t.key}
            onClick={() => handleTemplateSelect(t)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '10px 16px',
              background: activeTemplate?.key === t.key ? '#1e1e1e' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: activeTemplate?.key === t.key ? '#C9A84C' : '#ccc',
              borderLeft:
                activeTemplate?.key === t.key ? '3px solid #C9A84C' : '3px solid transparent',
              fontSize: 13,
            }}
          >
            <span style={{ marginRight: 8 }}>{t.icon}</span>
            {t.label}
          </button>
        ))}
        <hr style={{ borderColor: 'var(--color-2a2a2a, #2a2a2a)', margin: '12px 16px' }} />
        <button
          onClick={() => setActivePanel('archive')}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '10px 16px',
            background: activePanel === 'archive' && !activeTemplate ? '#1e1e1e' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#aaa',
            fontSize: 13,
          }}
        >
          📁 Archive ({records.length})
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main style={mainContentStyle}>
        {/* Header */}
        {activeTemplate && (
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ color: 'var(--white, #fff)', margin: '0 0 6px', fontSize: 20 }}>
              {activeTemplate.icon} {activeTemplate.label}
            </h2>
            <p style={{ color: 'var(--color-888, #888)', margin: 0, fontSize: 13 }}>
              {activeTemplate.description}
            </p>

            {/* Tab bar */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {(['editor', 'compliance'] as const).map(panel => (
                <button
                  key={panel}
                  onClick={() => setActivePanel(panel)}
                  style={{
                    padding: '6px 16px',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    background: activePanel === panel ? '#C9A84C' : '#222',
                    color: activePanel === panel ? '#000' : '#aaa',
                    fontWeight: activePanel === panel ? 700 : 400,
                    fontSize: 13,
                  }}
                >
                  {panel === 'editor' ? '✏️ Editor' : '⚖️ Compliance'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Alert messages */}
        {error && <div style={errorAlertStyle}>❌ {error}</div>}
        {successMessage && <div style={successAlertStyle}>✅ {successMessage}</div>}

        {/* Editor Panel */}
        {activeTemplate && activePanel === 'editor' && (
          <DocumentEditor
            template={activeTemplate}
            formData={formData}
            onFieldChange={handleFieldChange}
            onCheckCompliance={handleCheckCompliance}
            onSaveRecord={handleSaveRecord}
            onExtractFields={handleExtractFields}
            selectedDepartmentTag={selectedDepartmentTag}
            onDepartmentTagChange={setSelectedDepartmentTag}
            selectedOwnerEmail={selectedOwnerEmail}
            onOwnerEmailChange={setSelectedOwnerEmail}
            isChecking={isChecking}
            isSaving={isSaving}
            isExtracting={isExtracting}
          />
        )}

        {/* Compliance Panel */}
        {activePanel === 'compliance' && complianceReport && (
          <CompliancePanel report={complianceReport} />
        )}
        {activePanel === 'compliance' && !complianceReport && activeTemplate && (
          <div style={{ color: 'var(--color-888, #888)', padding: 24, textAlign: 'center' }}>
            Fill in the document fields then click &quot;Check Compliance&quot; to run RERA/DLD
            validation.
          </div>
        )}

        {/* Archive Panel */}
        {activePanel === 'archive' && (
          <ArchivePanel
            records={records}
            isLoading={isLoading}
            onDelete={handleDeleteRecord}
            onRefresh={loadRecords}
            onMarkSigned={handleMarkSigned}
          />
        )}

        {/* No template selected */}
        {!activeTemplate && activePanel === 'editor' && <HenryEmptyState />}
      </main>
    </div>
  );
};

export default HenryDocumentHubView;
