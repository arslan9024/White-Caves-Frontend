import * as React from 'react';
import type { CommunityNotice } from './types';
import { junoCommunityStyles } from './styles';

export interface CommunityNoticeBoardProps {
  notices: CommunityNotice[];
}

export const CommunityNoticeBoard: React.FC<CommunityNoticeBoardProps> = ({ notices }) => {
  return (
    <div style={junoCommunityStyles.paddedCard}>
      <h4
        style={{
          margin: '0 0 1rem 0',
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--color-1e293b, #1E293B)',
        }}
      >
        Official Community Bulletins & Resident Notices
      </h4>
      <div style={junoCommunityStyles.noticeList}>
        {notices.map(n => (
          <div key={n.id} style={junoCommunityStyles.noticeCard}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  color: 'var(--color-1e293b, #1E293B)',
                  fontSize: '0.95rem',
                }}
              >
                {n.title}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary, #64748B)',
                }}
              >
                {n.date}
              </span>
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-475569, #475569)',
                marginTop: '6px',
              }}
            >
              Impact: {n.impact}
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--accent-purple, #7C3AED)',
                fontWeight: 800,
                marginTop: '4px',
              }}
            >
              Issued by {n.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
