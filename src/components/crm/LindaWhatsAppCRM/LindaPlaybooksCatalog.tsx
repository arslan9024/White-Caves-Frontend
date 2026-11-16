import React, { FC } from 'react';
import type { LindaFeatureBadge, LindaPlaybookBadge } from './LindaWhatsAppCRM.data';

export interface LindaPlaybooksCatalogProps {
  features: LindaFeatureBadge[];
  playbooks: LindaPlaybookBadge[];
  onExecuteCommand: (cmd: string, label?: string) => void;
}

export const LindaPlaybooksCatalog: FC<LindaPlaybooksCatalogProps> = ({
  features,
  playbooks,
  onExecuteCommand,
}) => {
  return (
    <>
      {/* PANEL 2: Features Bar F1-F35 (Green Border) */}
      <div
        style={{
          border: '1px solid rgba(34, 197, 94, 0.55)',
          background: 'rgba(34, 197, 94, 0.06)',
          borderRadius: 8,
          padding: '8px 12px',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: '#86EFAC',
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          [PANEL 2 · FEATURE CATALOG F1–F35] Click any feature badge to run & increment usage
          counter:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {features.map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => onExecuteCommand(f.id.toLowerCase(), `${f.id} (${f.code}) ${f.title}`)}
              title={f.summary}
              style={{
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(34, 197, 94, 0.45)',
                borderRadius: 6,
                padding: '4px 8px',
                color: '#DCFCE7',
                fontSize: 11,
                fontFamily: 'monospace',
                cursor: 'pointer',
              }}
            >
              <strong style={{ color: '#4ADE80' }}>{f.id}</strong> ({f.code}) {f.title}{' '}
              <span style={{ color: '#FBBF24' }}>×{f.uses}</span>
            </button>
          ))}
        </div>
      </div>

      {/* PANEL 3: Playbooks & Dotted Number Menu (Yellow Border) */}
      <div
        style={{
          border: '1px solid rgba(234, 179, 8, 0.55)',
          background: 'rgba(234, 179, 8, 0.06)',
          borderRadius: 8,
          padding: '8px 12px',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            color: '#FDE047',
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          [PANEL 3 · MULTI-STEP PLAYBOOKS P1–P10 & DOTTED MENU] Automated workflow chains:
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 6,
          }}
        >
          {playbooks.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => onExecuteCommand(p.id.toLowerCase(), `${p.id}: ${p.title}`)}
              style={{
                textAlign: 'left',
                background: 'rgba(15, 23, 42, 0.88)',
                border: '1px solid rgba(234, 179, 8, 0.4)',
                borderRadius: 6,
                padding: '6px 10px',
                color: '#FEF9C3',
                fontSize: 11,
                fontFamily: 'monospace',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                <strong style={{ color: '#FACC15' }}>{p.id}</strong> {p.title}{' '}
                <span style={{ color: '#94A3B8' }}>[{p.steps.join('→')}]</span>
              </span>
              <span style={{ color: '#4ADE80', fontWeight: 700 }}>×{p.uses}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
