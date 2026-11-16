import React, { FC, useState } from 'react';

export interface LindaRichMediaMessageProps {
  mediaType?: string | null;
  mediaUrl?: string;
  text: string;
}

/**
 * Renders inline voice-note (ptt), image lightbox, or PDF/brochure preview
 * inside LindaChatThreadPane without exceeding the 350-line file limit.
 */
export const LindaRichMediaMessage: FC<LindaRichMediaMessageProps> = ({
  mediaType,
  mediaUrl,
  text,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!mediaType) return null;
  const type = mediaType.toLowerCase();

  if (type === 'ptt' || type === 'audio') {
    return (
      <div style={{ marginTop: '0.4rem' }} data-testid="wa-media-ptt">
        <audio controls src={mediaUrl || undefined} style={{ height: '32px', maxWidth: '240px' }} />
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div style={{ marginTop: '0.4rem' }} data-testid="wa-media-image">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: '0.4rem',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            background: 'rgba(239, 68, 68, 0.12)',
            color: '#F8FAFC',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          View Image Preview
        </button>
        {lightboxOpen && (
          <div
            role="dialog"
            aria-label="Image Lightbox"
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
            }}
          >
            <div
              style={{
                background: '#0F172A',
                padding: '1rem',
                borderRadius: '0.75rem',
                color: '#FFF',
              }}
            >
              {mediaUrl ? (
                <img src={mediaUrl} alt={text} style={{ maxWidth: '80vw', maxHeight: '75vh' }} />
              ) : (
                text
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'pdf' || type === 'document') {
    return (
      <div
        data-testid="wa-media-pdf"
        style={{
          marginTop: '0.4rem',
          padding: '0.45rem 0.65rem',
          borderRadius: '0.45rem',
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(148, 163, 184, 0.25)',
          fontSize: '0.75rem',
        }}
      >
        PDF / Brochure: {text || 'WhiteCaves-Brochure.pdf'}
      </div>
    );
  }

  return null;
};

