import React from 'react';

export default function Card({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
