import React from 'react';

export interface ProgressBarProps {
  percent: number;
  color: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent, color, height = 8 }) => (
  <div
    style={{
      width: '100%',
      background: '#F3F4F6',
      borderRadius: height / 2,
      height,
      overflow: 'hidden',
    }}
    role="progressbar"
    aria-valuenow={percent}
    aria-valuemin={0}
    aria-valuemax={100}
  >
    <div
      style={{
        width: `${percent}%`,
        height: '100%',
        background: color,
        borderRadius: height / 2,
        transition: 'width 0.4s ease',
      }}
    />
  </div>
);
