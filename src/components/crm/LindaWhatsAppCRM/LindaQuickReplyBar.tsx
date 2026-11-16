import React, { FC } from 'react';

export interface LindaQuickReplyBarProps {
  onSelectTemplate: (text: string) => void;
}

const UAE_QUICK_REPLIES = [
  {
    id: 'viewing',
    label: 'Viewing Confirmation',
    text: 'Your private viewing with White Caves Real Estate is confirmed. Please share your preferred time slot.',
  },
  {
    id: 'ejari',
    label: 'Ejari Checklist',
    text: 'To complete your Ejari registration, please share your Emirates ID, Passport copy, and signed Tenancy Contract.',
  },
  {
    id: 'location',
    label: 'Location Pin',
    text: 'Here is the exact Google Maps pin for the property entrance and visitor parking.',
  },
  {
    id: 'payment',
    label: 'Payment Plan',
    text: 'I have attached the official developer payment plan and DLD fee breakdown for your review.',
  },
];

export const LindaQuickReplyBar: FC<LindaQuickReplyBarProps> = ({ onSelectTemplate }) => (
  <div
    data-testid="linda-quick-reply-bar"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.4rem',
      padding: '0.5rem 0.75rem',
      borderTop: '1px solid rgba(148, 163, 184, 0.2)',
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
    }}
  >
    {UAE_QUICK_REPLIES.map(tpl => (
      <button
        key={tpl.id}
        type="button"
        onClick={() => onSelectTemplate(tpl.text)}
        style={{
          padding: '0.3rem 0.65rem',
          borderRadius: '9999px',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          color: '#F8FAFC',
          fontSize: '0.75rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {tpl.label}
      </button>
    ))}
  </div>
);

