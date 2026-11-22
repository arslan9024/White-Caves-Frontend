import React, { FC } from 'react';
import { DocTemplate, GeneratedDoc } from './types';
import { RED, SLATE, TEXT_MUTED, GREEN } from './constants';
import {
  containerStyle,
  headerTitleStyle,
  headerSubtitleStyle,
  tabSwitcherStyle,
  getTabButtonStyle,
} from './styles';
import { DOCUMENT_TEMPLATES } from './data';
import { useDocumentGeneration } from './useDocumentGeneration';
import { DocumentTemplateGrid } from './DocumentTemplateGrid';
import { DocumentFormPanel } from './DocumentFormPanel';
import { DocumentLibraryTab } from './DocumentLibraryTab';
import { DocumentPreviewModal } from './DocumentPreviewModal';
import { DocumentToastList } from './DocumentToastList';

export interface DocumentGenerationContainerProps {
  initialTemplates?: DocTemplate[];
  initialDocs?: GeneratedDoc[];
}

export const DocumentGenerationContainer: FC<DocumentGenerationContainerProps> = ({
  initialTemplates = DOCUMENT_TEMPLATES,
}) => {
  const {
    selectedTemplate,
    formValues,
    setFormValues,
    genStatus,
    previewDoc,
    setPreviewDoc,
    generatedDocs,
    filterType,
    setFilterType,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    toasts,
    showToast,
    openTemplate,
    handleGenerate,
    filteredDocs,
  } = useDocumentGeneration();

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={headerTitleStyle}>📄 Document Generation Centre</h2>
          <p style={headerSubtitleStyle}>
            RERA-compliant templates for contracts, NOCs, commission statements, and PDC schedules
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span
            style={{
              background: 'var(--color-def7ec, #DEF7EC)',
              color: GREEN,
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '4px 10px',
              borderRadius: '20px',
            }}
          >
            ● {generatedDocs.length} Documents Ready
          </span>
          <span
            style={{
              background: '#FEF2F2',
              color: RED,
              fontWeight: 700,
              fontSize: '0.75rem',
              padding: '4px 10px',
              borderRadius: '20px',
            }}
          >
            VAT 5% Auto-Calculated
          </span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={tabSwitcherStyle}>
        {(['generate', 'library'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={getTabButtonStyle(activeTab === tab)}
          >
            {tab === 'generate' ? '✨ Generate New' : '📚 Document Library'}
          </button>
        ))}
      </div>

      {/* GENERATE TAB */}
      {activeTab === 'generate' && (
        <div style={{ display: 'grid', gridTemplateColumns: selectedTemplate ? '1fr 1.2fr' : '1fr', gap: '24px' }}>
          <DocumentTemplateGrid
            templates={initialTemplates}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={openTemplate}
          />

          {selectedTemplate && (
            <DocumentFormPanel
              template={selectedTemplate}
              formValues={formValues}
              genStatus={genStatus}
              onChangeFieldValue={(key, value) => setFormValues(prev => ({ ...prev, [key]: value }))}
              onQuickFill={values => setFormValues(prev => ({ ...prev, ...values }))}
              onGenerate={handleGenerate}
              onOpenLibrary={() => setActiveTab('library')}
            />
          )}
        </div>
      )}

      {/* LIBRARY TAB */}
      {activeTab === 'library' && (
        <DocumentLibraryTab
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterType={filterType}
          onFilterChange={setFilterType}
          generatedDocs={generatedDocs}
          filteredDocs={filteredDocs}
          onPreview={doc => setPreviewDoc(doc)}
          onActionToast={showToast}
        />
      )}

      {/* RERA Live PDF Contract Previewer Modal */}
      <DocumentPreviewModal
        previewDoc={previewDoc}
        onClose={() => setPreviewDoc(null)}
        onPrintToast={msg => showToast(msg, RED)}
      />

      {/* Action Toasts */}
      <DocumentToastList toasts={toasts} />
    </div>
  );
};
