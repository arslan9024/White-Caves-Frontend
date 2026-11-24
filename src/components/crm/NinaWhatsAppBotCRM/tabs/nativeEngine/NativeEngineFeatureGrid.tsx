import React from 'react';
import { EngineFeature } from './nativeEngine.types';
import { featureGridStyle, featureCardStyle, featureCardHeaderStyle } from './nativeEngine.styles';

interface FeatureMatrixGridProps {
  features: EngineFeature[];
}

export const NativeEngineFeatureGrid: React.FC<FeatureMatrixGridProps> = ({ features }) => {
  return (
    <div style={featureGridStyle}>
      {features.map(feat => (
        <div key={feat.id} style={featureCardStyle}>
          <div>
            <div style={featureCardHeaderStyle}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--color-06b6d4, #06B6D4)',
                  background: 'rgba(6, 182, 212, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {feat.source}
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--accent-green, #10B981)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                ✓ {feat.status}
              </span>
            </div>

            <h4
              style={{
                margin: '0 0 0.4rem 0',
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--color-1e293b, #1E293B)',
              }}
            >
              {feat.name}
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: '0.84rem',
                color: 'var(--color-475569, #475569)',
                lineHeight: 1.45,
              }}
            >
              {feat.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
