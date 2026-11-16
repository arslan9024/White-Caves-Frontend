import React from 'react';
import { HarvestConfig } from './WebDataHarvester.types';

interface HarvestConfigPanelProps {
  config: HarvestConfig;
  onChange: React.Dispatch<React.SetStateAction<HarvestConfig>>;
}

export const HarvestConfigPanel: React.FC<HarvestConfigPanelProps> = ({ config, onChange }) => {
  return (
    <div className="config-panel">
      <div className="config-row">
        <label>Delay between requests (ms)</label>
        <input
          type="number"
          value={config.delay}
          onChange={(e) => onChange(prev => ({ ...prev, delay: parseInt(e.target.value) || 1000 }))}
          min={500}
          max={5000}
        />
      </div>
      <div className="config-selectors">
        <h5>CSS Selectors</h5>
        <div className="selector-grid">
          {Object.entries(config.selectors).map(([key, value]) => (
            <div key={key} className="selector-input">
              <label>{key}</label>
              <input
                value={value}
                onChange={(e) => onChange(prev => ({
                  ...prev,
                  selectors: { ...prev.selectors, [key]: e.target.value }
                }))}
                placeholder={`.${key}-class`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

