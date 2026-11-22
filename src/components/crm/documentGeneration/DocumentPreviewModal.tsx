import React, { FC } from 'react';
import { GeneratedDoc } from './types';
import { RED, WHITE, SLATE, TEXT_MUTED, docTypeLabel, docTypeColor } from './constants';
import { modalOverlayStyle, modalBoxStyle } from './styles';

interface DocumentPreviewModalProps {
  previewDoc: GeneratedDoc | null;
  onClose: () => void;
  onPrintToast: (msg: string) => void;
}

export const DocumentPreviewModal: FC<DocumentPreviewModalProps> = ({
  previewDoc,
  onClose,
  onPrintToast,
}) => {
  if (!previewDoc) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalBoxStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid var(--text-secondary, #E2E8F0)',
            paddingBottom: '16px',
            marginBottom: '20px',
          }}
        >
          <div>
            <span
              style={{
                background: '#FEE2E2',
                color: RED,
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.7rem',
                fontWeight: 800,
              }}
            >
              RERA OFFICIAL PREVIEW
            </span>
            <h3 style={{ margin: '4px 0 0 0', color: SLATE, fontSize: '1.25rem' }}>{previewDoc.title}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: TEXT_MUTED,
              fontSize: '1.4rem',
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            background: 'var(--color-fafafa, #FAFAFA)',
            border: '1px solid var(--text-secondary, #CBD5E1)',
            padding: '24px',
            borderRadius: '8px',
            fontFamily: 'Georgia, serif',
            color: 'var(--color-334155, #334155)',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              borderBottom: '2px double var(--color-94a3b8, #94A3B8)',
              paddingBottom: '16px',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: SLATE,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              WHITE CAVES REAL ESTATE LLC
            </div>
            <div style={{ fontSize: '0.75rem', color: TEXT_MUTED }}>
              ORN: 29481 | RERA Licensed Brokerage | Dubai, UAE
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: RED, marginTop: '8px', textTransform: 'uppercase' }}>
              OFFICIAL CONTRACT DOCUMENT PREVIEW
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              fontSize: '0.85rem',
              marginBottom: '16px',
            }}
          >
            <div>
              <strong>Document Reference:</strong> {previewDoc.id}
            </div>
            <div>
              <strong>Generated Date:</strong> {previewDoc.timestamp}
            </div>
            <div>
              <strong>Document Type:</strong> {docTypeLabel[previewDoc.type] || previewDoc.type}
            </div>
            <div>
              <strong>Digital Signature:</strong> Verified (SHA-256)
            </div>
          </div>

          <div
            style={{
              background: WHITE,
              border: '1px solid #E2E8F0',
              padding: '16px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              lineHeight: '1.6',
            }}
          >
            <p>
              This document constitutes a binding agreement executed under Dubai Land Department (DLD) and Real
              Estate Regulatory Agency (RERA) regulations.
            </p>
            <p>
              All clauses contained herein comply with Dubai Law No. 26 of 2007 (as amended by Law No. 33 of 2008)
              governing relationships between Landlords and Tenants in the Emirate of Dubai.
            </p>
          </div>

          <div
            style={{
              marginTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingTop: '16px',
              borderTop: '1px dashed var(--text-secondary, #CBD5E1)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', color: TEXT_MUTED }}>STAMP & DIGITAL SEAL</div>
              <div
                style={{
                  display: 'inline-block',
                  border: `2px solid ${RED}`,
                  color: RED,
                  padding: '6px 12px',
                  borderRadius: '50%',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  transform: 'rotate(-5deg)',
                  marginTop: '4px',
                }}
              >
                WHITE CAVES
                <br />
                SEALED
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: TEXT_MUTED }}>QR CODE VERIFICATION</div>
              <div
                style={{
                  background: SLATE,
                  color: WHITE,
                  padding: '6px 10px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                }}
              >
                [QR: RERA-{previewDoc.id}]
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => onPrintToast(`🖨️ Printing official PDF for ${previewDoc.title}...`)}
            style={{
              background: RED,
              color: WHITE,
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            🖨️ Print / Download PDF
          </button>
          <button
            onClick={onClose}
            style={{
              background: SLATE,
              color: WHITE,
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
