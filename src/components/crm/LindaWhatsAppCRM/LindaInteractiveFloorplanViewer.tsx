import React, { memo } from 'react';
import { Layers, ZoomIn } from 'lucide-react';

export const LindaInteractiveFloorplanViewer: React.FC<{ cluster?: string; unit?: string }> = memo(
  ({ cluster = 'Amazon', unit = 'Villa 12' }) => (
    <div
      style={{
        padding: '10px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#fff',
          marginBottom: '6px',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Layers size={12} color="#25D366" /> {cluster} — {unit}
        </span>
        <span
          style={{
            color: '#00B0FF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <ZoomIn size={12} /> Inspect 3D
        </span>
      </div>
      <div
        style={{
          height: '70px',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '10px',
        }}
      >
        [Damac Hills 2 Layout: 3BR + Maid • Plot: 1,881 sqft]
      </div>
    </div>
  )
);
export default LindaInteractiveFloorplanViewer;
