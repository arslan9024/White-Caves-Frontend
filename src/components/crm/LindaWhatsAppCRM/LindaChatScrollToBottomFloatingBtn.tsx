import React, { memo } from 'react';
import { ChevronDown } from 'lucide-react';

export const LindaChatScrollToBottomFloatingBtn: React.FC<{
  onClick?: () => void;
  unreadCount?: number;
}> = memo(({ onClick, unreadCount = 0 }) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      right: '16px',
      bottom: '70px',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: '#202C33',
      border: '1px solid #334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#E9EDEF',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    }}
  >
    <ChevronDown size={16} />
    {unreadCount > 0 && (
      <span
        style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          background: '#25D366',
          color: '#000',
          borderRadius: '50%',
          width: '14px',
          height: '14px',
          fontSize: '9px',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {unreadCount}
      </span>
    )}
  </button>
));
export default LindaChatScrollToBottomFloatingBtn;
