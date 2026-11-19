import React, { memo } from 'react';
import { BellRing } from 'lucide-react';

export const LindaSmartFollowUpBadge: React.FC<{ dueDate?: string }> = memo(
  ({ dueDate = 'Today at 5:00 PM' }) => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(224,64,251,0.1)',
        border: '1px solid #E040FB40',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '9px',
        color: '#E040FB',
      }}
    >
      <BellRing size={10} />
      <span>Follow-up: {dueDate}</span>
    </div>
  )
);
export default LindaSmartFollowUpBadge;
