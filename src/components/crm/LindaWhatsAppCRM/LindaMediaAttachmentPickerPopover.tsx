import React, { memo } from 'react';
import { Image, FileText, MapPin } from 'lucide-react';

export const LindaMediaAttachmentPickerPopover: React.FC<{
  isOpen?: boolean;
  onSelect?: (t: string) => void;
}> = memo(({ isOpen = true, onSelect }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        padding: '8px',
        background: '#202C33',
        borderRadius: '8px',
        border: '1px solid #334155',
      }}
    >
      <button
        onClick={() => onSelect?.('PHOTOS')}
        style={{ background: 'none', border: 'none', color: '#00B0FF', cursor: 'pointer' }}
      >
        <Image size={16} />
      </button>
      <button
        onClick={() => onSelect?.('DOC')}
        style={{ background: 'none', border: 'none', color: '#E040FB', cursor: 'pointer' }}
      >
        <FileText size={16} />
      </button>
      <button
        onClick={() => onSelect?.('LOCATION')}
        style={{ background: 'none', border: 'none', color: '#25D366', cursor: 'pointer' }}
      >
        <MapPin size={16} />
      </button>
    </div>
  );
});
export default LindaMediaAttachmentPickerPopover;
