import React from 'react';

export default function Button({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
