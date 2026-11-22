import React, { FC } from 'react';
import { Building } from 'lucide-react';
import type { DldTitleDeedExtractedData } from '../../../../services/HenryTitleDeedScannerService';
import {
  RightPreviewCol,
  PreviewHeader,
  PreviewBody,
  DeedSummaryCard,
} from './TitleDeedScanner.styles';

interface TitleDeedPreviewPaneProps {
  uploadedFile: File | null;
  filePreviewUrl: string | null;
  extractedData: DldTitleDeedExtractedData | null;
  zoomLevel: number;
  onZoomOut: () => void;
  onZoomIn: () => void;
}

const zoomButtonStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.15)',
  color: 'var(--white, #FFF)',
  border: 'none',
  borderRadius: '4px',
  padding: '2px 6px',
  fontSize: '0.7rem',
  cursor: 'pointer',
};

export const TitleDeedPreviewPane: FC<TitleDeedPreviewPaneProps> = ({
  uploadedFile,
  filePreviewUrl,
  extractedData,
  zoomLevel,
  onZoomOut,
  onZoomIn,
}) => {
  return (
    <RightPreviewCol>
      <PreviewHeader>
        <div className="title">
          <Building size={15} color="#EF4444" />
          <span>Title Deed Document Preview</span>
        </div>
        <div className="controls" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button type="button" onClick={onZoomOut} style={zoomButtonStyle}>
            -
          </button>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-94a3b8, #94A3B8)' }}>
            {zoomLevel}%
          </span>
          <button type="button" onClick={onZoomIn} style={zoomButtonStyle}>
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
                alt="Uploaded Title Deed"
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
                title="Title Deed Preview"
                style={{ width: '100%', height: '500px', border: 'none', borderRadius: '8px' }}
              />
            )}
          </div>
        ) : extractedData ? (
          <DeedSummaryCard>
            <div className="header">
              <span>GOVERNMENT OF DUBAI · LAND DEPARTMENT</span>
              <span>NOT AUTHENTICATED</span>
            </div>
            <div className="property-title">
              {extractedData.buildingNameEn} — Unit {extractedData.propertyNumber}
            </div>
            <div className="owner-title">Owner: {extractedData.ownerNameEn}</div>
            <div className="specs-row">
              <div>
                <strong>Plot:</strong> {extractedData.plotNumber}
              </div>
              <div>
                <strong>Area:</strong> {extractedData.totalAreaSqM} Sq.M (
                {extractedData.totalAreaSqFt} Sq.Ft)
              </div>
              <div>
                <strong>Certificate:</strong> {extractedData.certificateNumber}
              </div>
              <div>
                <strong>Location:</strong> {extractedData.communityEn}
              </div>
            </div>
          </DeedSummaryCard>
        ) : (
          <div
            style={{
              textAlign: 'center',
              color: 'var(--color-94a3b8, #94A3B8)',
              padding: '3rem 1rem',
            }}
          >
            <Building
              size={48}
              color="var(--text-secondary, #94A3B8)"
              style={{ margin: '0 auto 12px auto' }}
            />
            <div
              style={{
                fontWeight: 800,
                fontSize: '0.95rem',
                color: 'var(--color-334155, #334155)',
              }}
            >
              No Title Deed Uploaded Yet
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
              Drag & drop Title Deed document on the left to preview and extract variables.
            </div>
          </div>
        )}
      </PreviewBody>
    </RightPreviewCol>
  );
};
