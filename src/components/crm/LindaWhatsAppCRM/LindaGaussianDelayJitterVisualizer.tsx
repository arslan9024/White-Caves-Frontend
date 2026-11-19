import React, { memo } from 'react';

export const LindaGaussianDelayJitterVisualizer: React.FC<{ meanMs?: number; stdDevMs?: number }> =
  memo(({ meanMs = 1428, stdDevMs = 180 }) => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(0,176,255,0.08)',
        border: '1px solid rgba(0,176,255,0.25)',
        padding: '3px 8px',
        borderRadius: '6px',
        fontSize: '10px',
        color: '#00B0FF',
      }}
    >
      <span>
        Gaussian Pacing: μ={meanMs}ms (σ={stdDevMs}ms)
      </span>
    </div>
  ));
export default LindaGaussianDelayJitterVisualizer;
