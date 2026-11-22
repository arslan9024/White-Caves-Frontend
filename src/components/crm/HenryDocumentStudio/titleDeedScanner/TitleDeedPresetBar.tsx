import React, { FC } from 'react';
import type { TitleDeedPresetKey } from './useTitleDeedScannerState';

interface TitleDeedPresetBarProps {
  onSelectPreset: (preset: TitleDeedPresetKey) => void;
}

const presetButtonStyle: React.CSSProperties = {
  background: 'var(--color-f1f5f9, #F1F5F9)',
  border: '1px solid var(--text-secondary, #CBD5E1)',
  borderRadius: '4px',
  padding: '2px 8px',
  fontSize: '0.7rem',
  fontWeight: 700,
  cursor: 'pointer',
};

export const TitleDeedPresetBar: FC<TitleDeedPresetBarProps> = ({ onSelectPreset }) => {
  return (
    <div
      style={{
        marginTop: '-0.5rem',
        marginBottom: '0.75rem',
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          fontSize: '0.72rem',
          color: 'var(--text-secondary, #64748B)',
          fontWeight: 700,
        }}
      >
        Property Presets:
      </span>
      <button type="button" onClick={() => onSelectPreset('buko')} style={presetButtonStyle}>
        BUKO COMMODITY DMCC (Madinat Hind 4 Plot 7354)
      </button>
      <button type="button" onClick={() => onSelectPreset('demo')} style={presetButtonStyle}>
        Viridis A Unit 504 (Akram Dib Nehme)
      </button>
    </div>
  );
};
