import React, { FC, useMemo } from 'react';
import { FileText } from 'lucide-react';
import { RightPreviewCol, PreviewHeader, PreviewBody } from './ContractScanner.styles';
import { DldTenancyContractData } from '../../../../services/HenryTenancyContractTemplateService';
import henryTenancyContractTemplateService from '../../../../services/HenryTenancyContractTemplateService';

export interface ContractPreviewPaneProps {
  uploadedFile: File | null;
  filePreviewUrl: string | null;
  contractData: DldTenancyContractData | null;
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const ContractPreviewPane: FC<ContractPreviewPaneProps> = ({
  uploadedFile,
  filePreviewUrl,
  contractData,
  zoomLevel,
  onZoomIn,
  onZoomOut,
}) => {
  const compiledDldHtml = useMemo(() => {
    if (!contractData) return '';
    return henryTenancyContractTemplateService.generateDldTenancyContractHtml(contractData, 'all');
  }, [contractData]);

  return (
    <RightPreviewCol>
      <PreviewHeader>
        <div className="title">
          <FileText size={15} color="#DC2626" />
          <span>Contract Document Preview</span>
        </div>
        <div className="controls" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={onZoomOut}
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
            onClick={onZoomIn}
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
                alt="Uploaded Contract"
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
                title="Contract Preview"
                style={{ width: '100%', height: '500px', border: 'none', borderRadius: '8px' }}
              />
            )}
          </div>
        ) : contractData ? (
          <div
            dangerouslySetInnerHTML={{ __html: compiledDldHtml }}
            style={{
              background: 'var(--white, #FFFFFF)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              borderRadius: '4px',
              maxWidth: '100%',
            }}
          />
        ) : (
          <div
            style={{
              textAlign: 'center',
              color: 'var(--color-94a3b8, #94A3B8)',
              padding: '3rem 1rem',
            }}
          >
            <FileText
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
              No Contract Uploaded Yet
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
              Drag & drop tenancy agreement on the left to preview and extract variables.
            </div>
          </div>
        )}
      </PreviewBody>
    </RightPreviewCol>
  );
};
