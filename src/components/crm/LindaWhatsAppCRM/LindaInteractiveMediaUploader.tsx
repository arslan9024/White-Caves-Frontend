import React, { memo, useState } from 'react';
import { Paperclip, Image, FileText, Check } from 'lucide-react';

interface Props {
  onAttach: (fileType: string) => void;
}

export const LindaInteractiveMediaUploader: React.FC<Props> = memo(({ onAttach }) => {
  const [attached, setAttached] = useState<string | null>(null);

  const selectType = (type: string) => {
    setAttached(type);
    onAttach(type);
    setTimeout(() => setAttached(null), 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      <button
        onClick={() => selectType('Brochure')}
        style={{
          background: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px',
          padding: '4px 8px',
          color: '#ccc',
          fontSize: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
        }}
      >
        <FileText size={12} color="#00B0FF" /> Brochure PDF
      </button>
      <button
        onClick={() => selectType('Floorplan')}
        style={{
          background: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '6px',
          padding: '4px 8px',
          color: '#ccc',
          fontSize: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
        }}
      >
        <Image size={12} color="#25D366" /> Floorplan
      </button>
      {attached && (
        <span
          style={{
            fontSize: '10px',
            color: '#25D366',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <Check size={10} /> Attached
        </span>
      )}
    </div>
  );
});

export default LindaInteractiveMediaUploader;
