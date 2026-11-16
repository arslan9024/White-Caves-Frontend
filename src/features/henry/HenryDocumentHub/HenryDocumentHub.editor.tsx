/**
 * Henry Document Hub — Document Editor Layer (Mary Allen Wilkes Architecture)
 * Document form fields, AI extraction trigger, and department assignment
 */

import React, { useState } from 'react';
import type {
  DocumentTemplate,
  HenryDepartmentTag,
  HenryOcrDocCategory,
} from './HenryDocumentHub.types';
import { formInputStyle, formTextareaStyle } from './HenryDocumentHub.styles';

export interface DocumentEditorProps {
  template: DocumentTemplate;
  formData: Record<string, unknown>;
  onFieldChange: (name: string, value: unknown) => void;
  onCheckCompliance: () => void;
  onSaveRecord: () => void;
  onExtractFields: (text: string) => void;
  onOcrDocumentScan?: (docCategory: HenryOcrDocCategory, imageBase64?: string) => void;
  selectedDepartmentTag: HenryDepartmentTag;
  onDepartmentTagChange: (tag: HenryDepartmentTag) => void;
  selectedOwnerEmail: string;
  onOwnerEmailChange: (value: string) => void;
  isChecking: boolean;
  isSaving: boolean;
  isExtracting: boolean;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  template,
  formData,
  onFieldChange,
  onCheckCompliance,
  onSaveRecord,
  onExtractFields,
  onOcrDocumentScan,
  selectedDepartmentTag,
  onDepartmentTagChange,
  selectedOwnerEmail,
  onOwnerEmailChange,
  isChecking,
  isSaving,
  isExtracting,
}) => {
  const [pasteText, setPasteText] = useState('');
  const [showPaste, setShowPaste] = useState(false);

  return (
    <div>
      {/* Statutory OCR & +500 XP Merit Gate Panel */}
      <div
        data-testid="henry-ocr-statutory-bar"
        style={{
          background: '#162018',
          border: '1px solid rgba(34, 197, 94, 0.35)',
          borderRadius: 8,
          padding: 14,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 10,
          }}
        >
          <span style={{ color: '#4ade80', fontWeight: 700, fontSize: 13 }}>
            🛡️ End-to-End Statutory OCR Extraction (+500 XP Merit Ledger Gate)
          </span>
          <span style={{ color: '#9ca3af', fontSize: 11 }}>
            AEG-034 Web Worker OCR · AEG-037 +500 XP Statutory Reward
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              { key: 'EMIRATES_ID', label: '🪪 Emirates ID OCR' },
              { key: 'PASSPORT', label: '🛂 Passport MRZ OCR' },
              { key: 'TITLE_DEED', label: '📜 DLD Title Deed OCR' },
              { key: 'EJARI', label: '🏛️ Ejari Certificate OCR' },
            ] as const
          ).map(btn => (
            <button
              key={btn.key}
              type="button"
              data-testid={`henry-ocr-btn-${btn.key}`}
              disabled={isExtracting}
              onClick={() => onOcrDocumentScan?.(btn.key)}
              style={{
                padding: '6px 12px',
                background: '#1f2937',
                border: '1px solid #374151',
                borderRadius: 6,
                color: '#e5e7eb',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Extraction Panel */}
      <div
        style={{
          background: '#1a1a2e',
          border: '1px solid #2a2a4a',
          borderRadius: 8,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: showPaste ? 12 : 0,
          }}
        >
          <span style={{ color: 'var(--color-9b8ff5, #9b8ff5)', fontWeight: 600, fontSize: 13 }}>
            🤖 AI Field Extraction
          </span>
          <button
            onClick={() => setShowPaste(p => !p)}
            style={{
              padding: '4px 12px',
              background: '#2a2a4a',
              border: '1px solid #4a4a8a',
              borderRadius: 4,
              color: '#9b8ff5',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            {showPaste ? '▲ Hide' : '▼ Paste document text to auto-fill fields'}
          </button>
        </div>
        {showPaste && (
          <div>
            <textarea
              value={pasteText}
              onChange={e => setPasteText(e.target.value)}
              rows={4}
              placeholder="Paste document text here to auto-extract fields using AI..."
              style={formTextareaStyle}
            />
            <button
              onClick={() => {
                onExtractFields(pasteText);
                setShowPaste(false);
              }}
              disabled={!pasteText.trim() || isExtracting}
              style={{
                marginTop: 8,
                padding: '6px 16px',
                background: '#7C3AED',
                border: 'none',
                borderRadius: 4,
                color: '#fff',
                cursor: 'pointer',
                fontSize: 13,
                opacity: !pasteText.trim() || isExtracting ? 0.5 : 1,
              }}
            >
              {isExtracting ? '⏳ Extracting...' : '✨ Extract Fields'}
            </button>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {template.fields.map(field => (
          <div key={field.name}>
            <label
              style={{
                display: 'block',
                color: 'var(--color-aaa, #aaa)',
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              {field.label}
              {field.required && <span style={{ color: 'var(--color-e31e24, #E31E24)' }}> *</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={String(formData[field.name] ?? '')}
                onChange={e => onFieldChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                style={formTextareaStyle}
              />
            ) : field.type === 'select' ? (
              <select
                value={String(formData[field.name] ?? '')}
                onChange={e => onFieldChange(field.name, e.target.value)}
                style={formInputStyle}
              >
                <option value="">Select...</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === 'boolean' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <input
                  type="checkbox"
                  id={field.name}
                  checked={Boolean(formData[field.name])}
                  onChange={e => onFieldChange(field.name, e.target.checked)}
                  style={{ width: 16, height: 16, cursor: 'pointer' }}
                />
                <label
                  htmlFor={field.name}
                  style={{ color: 'var(--color-ccc, #ccc)', fontSize: 13, cursor: 'pointer' }}
                >
                  Yes
                </label>
              </div>
            ) : (
              <input
                type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                value={String(formData[field.name] ?? '')}
                onChange={e =>
                  onFieldChange(
                    field.name,
                    field.type === 'number'
                      ? e.target.value === ''
                        ? ''
                        : isNaN(parseFloat(e.target.value))
                          ? ''
                          : parseFloat(e.target.value)
                      : e.target.value
                  )
                }
                placeholder={field.placeholder}
                style={formInputStyle}
              />
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
        <div>
          <label
            style={{
              display: 'block',
              color: 'var(--color-aaa, #aaa)',
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            Department Tag
          </label>
          <select
            value={selectedDepartmentTag}
            onChange={e => onDepartmentTagChange(e.target.value as HenryDepartmentTag)}
            style={formInputStyle}
          >
            <option value="sales">Sales</option>
            <option value="leasing">Leasing</option>
            <option value="finance">Finance</option>
            <option value="compliance">Compliance</option>
            <option value="legal">Legal</option>
            <option value="operations">Operations</option>
          </select>
        </div>
        <div>
          <label
            style={{
              display: 'block',
              color: 'var(--color-aaa, #aaa)',
              fontSize: 12,
              marginBottom: 4,
            }}
          >
            Owner User Email (optional)
          </label>
          <input
            type="email"
            value={selectedOwnerEmail}
            onChange={e => onOwnerEmailChange(e.target.value)}
            placeholder="owner@whitecaves.ae"
            style={formInputStyle}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button
          onClick={onCheckCompliance}
          disabled={isChecking}
          style={{
            padding: '10px 20px',
            background: '#1a3a1a',
            border: '1px solid #2e7d32',
            borderRadius: 6,
            color: '#8f8',
            cursor: 'pointer',
            fontSize: 14,
            opacity: isChecking ? 0.6 : 1,
          }}
        >
          {isChecking ? '⏳ Checking...' : '⚖️ Check RERA/DLD Compliance'}
        </button>
        <button
          onClick={onSaveRecord}
          disabled={isSaving}
          style={{
            padding: '10px 20px',
            background: '#C9A84C',
            border: 'none',
            borderRadius: 6,
            color: '#000',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            opacity: isSaving ? 0.6 : 1,
          }}
        >
          {isSaving ? '⏳ Saving...' : '📁 Save to Archive'}
        </button>
      </div>
    </div>
  );
};

