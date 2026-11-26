import React from 'react';
import * as LucideIcons from 'lucide-react';
import './Icon.css';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const Icon = React.memo(
  ({ name, size = 24, color, strokeWidth = 2, className = '', ...props }: IconProps) => {
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[
      name
    ];

    if (!IconComponent) {
      return null;
    }

    return (
      <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={`wc-icon ${className}`}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
