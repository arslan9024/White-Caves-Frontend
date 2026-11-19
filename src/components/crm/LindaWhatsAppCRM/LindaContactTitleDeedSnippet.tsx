import React, { memo } from 'react';
import { FileText } from 'lucide-react';

export const LindaContactTitleDeedSnippet: React.FC<{ titleDeedNo?: string }> = memo(
  ({ titleDeedNo = 'TD-2024-009182' }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '4px',
        fontSize: '10px',
        color: '#ccc',
      }}
    >
      <FileText size={12} color="#00B0FF" />
      <span>Title Deed: {titleDeedNo} (Verified Freehold)</span>
    </div>
  )
);
export default LindaContactTitleDeedSnippet;
