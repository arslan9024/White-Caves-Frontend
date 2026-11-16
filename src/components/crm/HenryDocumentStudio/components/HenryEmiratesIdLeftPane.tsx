import React, { FC } from 'react';
import { CreditCard, ZoomIn, ZoomOut } from 'lucide-react';
import {
  LeftDocumentPane,
  PaneHeader,
  ZoomBtn,
  DocumentCanvasViewer,
} from '../styles/HenryEmiratesIdScannerView.style';
import { HenrySharedDocumentUploader } from '../HenrySharedDocumentUploader';
import { EmiratesIdExtractedData } from '../../../../services/HenryEmiratesIdScannerService';
import { EmiratesIdMockCard } from './EmiratesIdMockCard';

export interface HenryEmiratesIdLeftPaneProps {
  activeSideView: 'front' | 'back';
  setActiveSideView: (side: 'front' | 'back') => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  uploaderReset: number;
  isScanning: boolean;
  uploadedFile: File | null;
  filePreviewUrl: string | null;
  extractedData: EmiratesIdExtractedData;
  handleFileUpload: (file: File, original?: File) => Promise<void>;
  handleLoadDemo: () => void;
  onLoadMansoorDemo: () => void;
}

export const HenryEmiratesIdLeftPane: FC<HenryEmiratesIdLeftPaneProps> = ({
  activeSideView,
  setActiveSideView,
  zoomLevel,
  setZoomLevel,
  uploaderReset,
  isScanning,
  uploadedFile,
  filePreviewUrl,
  extractedData,
  handleFileUpload,
  handleLoadDemo,
  onLoadMansoorDemo,
}) => {
  return (
    <LeftDocumentPane>
      <PaneHeader>
        <div className="title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CreditCard size={16} color="#EF4444" />
          <span>Emirates ID Document Viewer</span>
          <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveSideView('front')}
              style={{
                background: activeSideView === 'front' ? '#EF4444' : 'rgba(255,255,255,0.12)',
                color: '#FFF',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Front Side
            </button>
            <button
              type="button"
              onClick={() => setActiveSideView('back')}
              style={{
                background: activeSideView === 'back' ? '#EF4444' : 'rgba(255,255,255,0.12)',
                color: '#FFF',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Back Side (MRZ)
            </button>
          </div>
        </div>
        <div className="controls">
          <ZoomBtn onClick={() => setZoomLevel(prev => Math.max(70, prev - 15))}>
            <ZoomOut size={13} />
          </ZoomBtn>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-94a3b8, #94A3B8)' }}>
            {zoomLevel}%
          </span>
          <ZoomBtn onClick={() => setZoomLevel(prev => Math.min(180, prev + 15))}>
            <ZoomIn size={13} />
          </ZoomBtn>
        </div>
      </PaneHeader>

      {/* Section 1: Upload File Component */}
      <div
        style={{
          padding: '1rem',
          background: 'var(--white, #FFFFFF)',
          borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
        }}
      >
        <HenrySharedDocumentUploader
          key={activeSideView}
          resetSignal={uploaderReset}
          docType="emirates_id"
          title="1. Upload Emirates ID (PDF, PNG, JPEG)"
          subtitle="Drop your Emirates ID file to extract live variables and compare on the right"
          onFileUpload={handleFileUpload}
          onSampleLoad={handleLoadDemo}
          isProcessing={isScanning}
          accentColor="#EF4444"
        />
        <div
          style={{
            marginTop: '8px',
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-secondary, #64748B)',
              fontWeight: 700,
            }}
          >
            Demo Presets:
          </span>
          <button
            type="button"
            onClick={handleLoadDemo}
            style={{
              background: 'var(--color-f1f5f9, #F1F5F9)',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Khalif Mohamednur (Kenya / Jayeeco)
          </button>
          <button
            type="button"
            onClick={onLoadMansoorDemo}
            style={{
              background: 'var(--color-f1f5f9, #F1F5F9)',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Mansoor Almarzooqi (UAE / Gov)
          </button>
        </div>
      </div>

      {/* Section 2: Visual Document Preview Viewer */}
      <DocumentCanvasViewer $zoom={zoomLevel}>
        {uploadedFile && filePreviewUrl ? (
          uploadedFile.type.startsWith('image/') ? (
            <img src={filePreviewUrl} alt="Uploaded Emirates ID" />
          ) : (
            <iframe src={filePreviewUrl} title="Emirates ID PDF Preview" />
          )
        ) : (
          <EmiratesIdMockCard
            activeSideView={activeSideView}
            extractedData={extractedData}
          />
        )}
      </DocumentCanvasViewer>
    </LeftDocumentPane>
  );
};

