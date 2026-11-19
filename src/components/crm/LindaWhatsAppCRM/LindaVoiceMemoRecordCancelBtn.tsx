import React, { memo } from 'react';
import { Trash2 } from 'lucide-react';

export const LindaVoiceMemoRecordCancelBtn: React.FC<{ onCancel?: () => void }> = memo(
  ({ onCancel }) => (
    <button
      onClick={onCancel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(255,82,82,0.1)',
        border: '1px solid rgba(255,82,82,0.3)',
        color: '#FF5252',
        padding: '3px 8px',
        borderRadius: '6px',
        fontSize: '10px',
        cursor: 'pointer',
      }}
    >
      <Trash2 size={11} /> Cancel
    </button>
  )
);
export default LindaVoiceMemoRecordCancelBtn;
