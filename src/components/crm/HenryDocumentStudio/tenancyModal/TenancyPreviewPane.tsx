import React, { FC } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import {
  LeftPreviewPane,
  PreviewToolbar,
  PageSwitchBtn,
  PreviewScrollArea,
  PreviewCanvasWrapper,
} from '../styles/HenryTenancyContractModal.style';
import type { TenancyPreviewPage } from './types';

export interface TenancyPreviewPaneProps {
  activePreviewPage: TenancyPreviewPage;
  onSelectPreviewPage: (page: TenancyPreviewPage) => void;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  compiledPreviewHtml: string;
}

export const TenancyPreviewPane: FC<TenancyPreviewPaneProps> = ({
  activePreviewPage,
  onSelectPreviewPage,
  zoomLevel,
  onZoomIn,
  onZoomOut,
  compiledPreviewHtml,
}) => (
  <LeftPreviewPane>
    <PreviewToolbar>
      <div className="page-switcher">
        <PageSwitchBtn $active={activePreviewPage === 1} onClick={() => onSelectPreviewPage(1)}>
          Page 1 (Contract & Parties)
        </PageSwitchBtn>
        <PageSwitchBtn $active={activePreviewPage === 2} onClick={() => onSelectPreviewPage(2)}>
          Page 2 (14 Legal Terms)
        </PageSwitchBtn>
        <PageSwitchBtn $active={activePreviewPage === 3} onClick={() => onSelectPreviewPage(3)}>
          Page 3 (Addendum & Rights)
        </PageSwitchBtn>
        <PageSwitchBtn
          $active={activePreviewPage === 'all'}
          onClick={() => onSelectPreviewPage('all')}
        >
          All 3 Pages
        </PageSwitchBtn>
      </div>

      <div className="zoom-controls">
        <button onClick={onZoomOut}>
          <ZoomOut size={12} />
        </button>
        <span
          style={{
            fontSize: '11px',
            color: 'var(--color-94a3b8, #94A3B8)',
            minWidth: '35px',
            textAlign: 'center',
          }}
        >
          {Math.round(zoomLevel * 100)}%
        </span>
        <button onClick={onZoomIn}>
          <ZoomIn size={12} />
        </button>
      </div>
    </PreviewToolbar>

    <PreviewScrollArea>
      <PreviewCanvasWrapper $zoom={zoomLevel}>
        <div
          dangerouslySetInnerHTML={{ __html: compiledPreviewHtml }}
          style={{
            background: 'var(--white, #FFFFFF)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            borderRadius: '4px',
          }}
        />
      </PreviewCanvasWrapper>
    </PreviewScrollArea>
  </LeftPreviewPane>
);
