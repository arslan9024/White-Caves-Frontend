import React, { type FC } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import {
  PageTabBtn,
  PreviewScaler,
  PreviewScrollArea,
  PreviewToolbar,
  RightPreviewCol,
} from './TenancyJourney.styles';

interface DldContractPreviewPaneProps {
  previewPage: number | 'all';
  setPreviewPage: (page: number | 'all') => void;
  zoomLevel: number;
  onZoomOut: () => void;
  onZoomIn: () => void;
  compiledPdfHtml: string;
}

export const DldContractPreviewPane: FC<DldContractPreviewPaneProps> = ({
  previewPage,
  setPreviewPage,
  zoomLevel,
  onZoomOut,
  onZoomIn,
  compiledPdfHtml,
}) => (
  <RightPreviewCol>
    <PreviewToolbar>
      <div className="page-tabs">
        <PageTabBtn $active={previewPage === 1} onClick={() => setPreviewPage(1)}>
          Page 1
        </PageTabBtn>
        <PageTabBtn $active={previewPage === 2} onClick={() => setPreviewPage(2)}>
          Page 2 (14 Terms)
        </PageTabBtn>
        <PageTabBtn $active={previewPage === 3} onClick={() => setPreviewPage(3)}>
          Page 3 (Rights)
        </PageTabBtn>
        <PageTabBtn $active={previewPage === 'all'} onClick={() => setPreviewPage('all')}>
          All 3 Pages
        </PageTabBtn>
      </div>

      <div className="zoom-box">
        <button
          onClick={onZoomOut}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--white, #FFFFFF)',
            cursor: 'pointer',
          }}
        >
          <ZoomOut size={13} />
        </button>
        <span style={{ fontSize: '11px', minWidth: '35px', textAlign: 'center' }}>
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={onZoomIn}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--white, #FFFFFF)',
            cursor: 'pointer',
          }}
        >
          <ZoomIn size={13} />
        </button>
      </div>
    </PreviewToolbar>

    <PreviewScrollArea>
      <PreviewScaler $zoom={zoomLevel}>
        <div
          dangerouslySetInnerHTML={{ __html: compiledPdfHtml }}
          style={{
            background: 'var(--white, #FFFFFF)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
            borderRadius: '4px',
          }}
        />
      </PreviewScaler>
    </PreviewScrollArea>
  </RightPreviewCol>
);
