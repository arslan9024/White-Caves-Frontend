import React, { FC } from 'react';
import { ChatTab } from './types';

interface ChatTabsProps {
  activeTab: ChatTab;
  onSelectTab: (tab: ChatTab) => void;
}

export const ChatTabs: FC<ChatTabsProps> = ({ activeTab, onSelectTab }) => {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '0.5rem',
      }}
    >
      <button
        onClick={() => onSelectTab('ai')}
        style={{
          flex: 1,
          padding: '0.6rem',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.85rem',
          background: 'none',
          borderBottom: activeTab === 'ai' ? '2px solid #E31E24' : '2px solid transparent',
          color: activeTab === 'ai' ? '#E31E24' : '#6b7280',
          transition: 'all 0.2s',
        }}
        aria-selected={activeTab === 'ai'}
      >
        🤖 AI Chat
      </button>
      <button
        onClick={() => onSelectTab('contact')}
        style={{
          flex: 1,
          padding: '0.6rem',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.85rem',
          background: 'none',
          borderBottom: activeTab === 'contact' ? '2px solid #25D366' : '2px solid transparent',
          color: activeTab === 'contact' ? '#25D366' : '#6b7280',
          transition: 'all 0.2s',
        }}
        aria-selected={activeTab === 'contact'}
      >
        💬 Contact Us
      </button>
    </div>
  );
};
