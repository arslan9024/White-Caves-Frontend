import React, { FC } from 'react';
import { Flag, ShieldCheck } from 'lucide-react';
import type { InternationalPassportExtractedData } from '../../../../services/HenryPassportScannerService';
import { RightPreviewCol, PreviewHeader, PreviewBody, PassportDigitalCard } from './styles';

interface PassportPreviewPaneProps {
  uploadedFile: File | null;
  filePreviewUrl: string | null;
  extractedData: InternationalPassportExtractedData | null;
  zoomLevel: number;
  onZoomChange: React.Dispatch<React.SetStateAction<number>>;
}

export const PassportPreviewPane: FC<PassportPreviewPaneProps> = ({
  uploadedFile,
  filePreviewUrl,
  extractedData,
  zoomLevel,
  onZoomChange,
}) => (
  <RightPreviewCol>
    <PreviewHeader>
      <div className="title">
        <Flag size={15} color="#60A5FA" />
        <span>Passport Document Preview</span>
      </div>
      <div className="controls" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          type="button"
          onClick={() => onZoomChange(prev => Math.max(70, prev - 15))}
          style={{
            background: 'rgba(255,255,255,0.15)',
            color: 'var(--white, #FFF)',
            border: 'none',
            borderRadius: '4px',
            padding: '2px 6px',
            fontSize: '0.7rem',
            cursor: 'pointer',
          }}
        >
          -
        </button>
        <span style={{ fontSize: '0.72rem', color: 'var(--color-94a3b8, #94A3B8)' }}>
          {zoomLevel}%
        </span>
        <button
          type="button"
          onClick={() => onZoomChange(prev => Math.min(180, prev + 15))}
          style={{
            background: 'rgba(255,255,255,0.15)',
            color: 'var(--white, #FFF)',
            border: 'none',
            borderRadius: '4px',
            padding: '2px 6px',
            fontSize: '0.7rem',
            cursor: 'pointer',
          }}
        >
          +
        </button>
        {uploadedFile && (
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--color-94a3b8, #94A3B8)',
              marginLeft: '6px',
            }}
          >
            {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
          </span>
        )}
      </div>
    </PreviewHeader>

    <PreviewBody
      style={{
        transform: `scale(${zoomLevel / 100})`,
        transformOrigin: 'top center',
        transition: 'transform 0.15s ease-out',
      }}
    >
      {uploadedFile && filePreviewUrl ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {uploadedFile.type.startsWith('image/') ? (
            <img
              src={filePreviewUrl}
              alt="Uploaded Passport"
              style={{
                maxWidth: '100%',
                maxHeight: '480px',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
            />
          ) : (
            <iframe
              src={filePreviewUrl}
              title="Passport Preview"
              style={{ width: '100%', height: '500px', border: 'none', borderRadius: '8px' }}
            />
          )}
        </div>
      ) : extractedData ? (
        <PassportDigitalCard>
          <div className="header">
            <span>PASSPORT · {extractedData.issuingCountryCode || 'INTERNATIONAL'}</span>
            <ShieldCheck size={16} color="#60A5FA" />
          </div>

          <div className="passport-no">{extractedData.passportNumber}</div>
          <div className="name">{extractedData.fullName}</div>

          <div className="footer">
            <div>
              <strong>Nationality:</strong> {extractedData.nationality}
            </div>
            <div>
              <strong>Expiry:</strong> {extractedData.dateOfExpiry}
            </div>
          </div>
        </PassportDigitalCard>
      ) : (
        <div
          style={{
            textAlign: 'center',
            color: 'var(--color-94a3b8, #94A3B8)',
            padding: '3rem 1rem',
          }}
        >
          <Flag
            size={48}
            color="var(--text-secondary, #94A3B8)"
            style={{ margin: '0 auto 12px auto' }}
          />
          <div
            style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-334155, #334155)' }}
          >
            No Passport Uploaded Yet
          </div>
          <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
            Drag & drop passport image or PDF on the left to preview and extract variables.
          </div>
        </div>
      )}
    </PreviewBody>
  </RightPreviewCol>
);
