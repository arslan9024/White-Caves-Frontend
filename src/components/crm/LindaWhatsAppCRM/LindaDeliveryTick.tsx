import React, { FC } from 'react';

export interface LindaDeliveryTickProps {
  status?: 'sent' | 'delivered' | 'read' | 'pending';
  size?: number;
}

/**
 * Authentic WhatsApp Web SVG Status Delivery Ticks
 * - Grey single tick for 'sent'
 * - Grey double tick for 'delivered'
 * - Blue double tick (#53BDEB) for 'read'
 */
export const LindaDeliveryTick: FC<LindaDeliveryTickProps> = ({ status = 'sent', size = 16 }) => {
  if (status === 'read') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="wa-tick-read"
        aria-label="Read"
      >
        <path
          d="M15.01 3.316l-7.79 7.79-3.23-3.23.95-.95 2.28 2.28 6.84-6.84.95.95zm-3.8 0l-7.79 7.79-3.23-3.23.95-.95 2.28 2.28 6.84-6.84.95.95z"
          fill="#53BDEB"
        />
      </svg>
    );
  }

  if (status === 'delivered') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="wa-tick-delivered"
        aria-label="Delivered"
      >
        <path
          d="M15.01 3.316l-7.79 7.79-3.23-3.23.95-.95 2.28 2.28 6.84-6.84.95.95zm-3.8 0l-7.79 7.79-3.23-3.23.95-.95 2.28 2.28 6.84-6.84.95.95z"
          fill="#8696A0"
        />
      </svg>
    );
  }

  // 'sent' or pending
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="wa-tick-sent"
      aria-label="Sent"
    >
      <path
        d="M10.91 3.316l-5.69 5.69-2.28-2.28-.95.95 3.23 3.23 6.64-6.64-.95-.95z"
        fill="#8696A0"
      />
    </svg>
  );
};
