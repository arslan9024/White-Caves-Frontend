import React, { memo } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';

interface Props {
  contactsCount: number;
  onExport: (format: 'csv' | 'json') => void;
}

export const LindaContactExportDrawer: React.FC<Props> = memo(({ contactsCount, onExport }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          color: '#aaa',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <FileSpreadsheet size={14} color="#25D366" />
        <span>{contactsCount} Verified Real Estate Contacts</span>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        <button
          onClick={() => onExport('csv')}
          style={{
            background: 'rgba(37,211,102,0.1)',
            border: '1px solid #25D366',
            color: '#25D366',
            borderRadius: '6px',
            padding: '2px 8px',
            fontSize: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Download size={10} /> CSV
        </button>
        <button
          onClick={() => onExport('json')}
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#aaa',
            borderRadius: '6px',
            padding: '2px 8px',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          JSON
        </button>
      </div>
    </div>
  );
});

export default LindaContactExportDrawer;
