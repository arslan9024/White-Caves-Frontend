import React, { useEffect, useMemo, useState } from 'react';
import { formatPlainNumber } from './overviewConstants';

export interface AnimatedMetricProps {
  value: number;
  formatter?: (value: number) => string;
}

export const Sparkline: React.FC<{ values: number[]; color: string }> = ({ values, color }) => {
  const points = useMemo(() => {
    if (values.length <= 1) return '0,20 100,20';
    const highest = Math.max(...values);
    const lowest = Math.min(...values);
    const range = highest - lowest || 1;

    return values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100;
        const y = 24 - ((value - lowest) / range) * 20;
        return `${x},${y}`;
      })
      .join(' ');
  }, [values]);

  return (
    <svg
      className="kpi-tile__sparkline"
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" points={points} />
    </svg>
  );
};

export const AnimatedMetric: React.FC<AnimatedMetricProps> = ({
  value,
  formatter = formatPlainNumber,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let startTime = 0;
    const duration = 800;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    frame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return <>{formatter(displayValue)}</>;
};
