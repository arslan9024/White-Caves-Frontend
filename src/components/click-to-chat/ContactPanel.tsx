import React, { FC } from 'react';
import { QuickMessage, ContactApp } from './types';
import {
  WelcomeMessage,
  ContactAppsContainer,
  QuickLabel,
  ChatAppBtn,
  QuickMessages,
  QuickMessageBtn,
  CustomMessageForm,
  MessageInput,
  SendBtn,
} from '../ClickToChat.styles';

interface ContactPanelProps {
  contactApps: ContactApp[];
  quickMessages: QuickMessage[];
  message: string;
  onMessageChange: (val: string) => void;
  onOpenApp: (url: string) => void;
  onSelectQuickMessage: (msg: string) => void;
  onCustomMessageSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ContactPanel: FC<ContactPanelProps> = ({
  contactApps,
  quickMessages,
  message,
  onMessageChange,
  onOpenApp,
  onSelectQuickMessage,
  onCustomMessageSubmit,
}) => {
  return (
    <>
      <WelcomeMessage>
        <p>Welcome to White Caves Real Estate! How can we assist you today?</p>
      </WelcomeMessage>

      <ContactAppsContainer>
        <QuickLabel>Contact us via:</QuickLabel>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
          }}
        >
          {contactApps.map(app => (
            <ChatAppBtn
              key={app.id}
              onClick={() => onOpenApp(app.url)}
              aria-label={`Contact us via ${app.name}`}
              title={app.name}
              $appColor={app.color}
            >
              {app.icon}
              <span>{app.name}</span>
            </ChatAppBtn>
          ))}
        </div>
      </ContactAppsContainer>

      <QuickMessages>
        <QuickLabel>Quick Messages:</QuickLabel>
        {quickMessages.map(item => (
          <QuickMessageBtn key={item.id} onClick={() => onSelectQuickMessage(item.message)}>
            {item.text}
          </QuickMessageBtn>
        ))}
      </QuickMessages>

      <CustomMessageForm onSubmit={onCustomMessageSubmit}>
        <MessageInput
          type="text"
          value={message}
          onChange={e => onMessageChange(e.target.value)}
          placeholder="Type your message..."
          aria-label="Type your message"
        />
        <SendBtn type="submit" disabled={!message.trim()} aria-label="Send message">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </SendBtn>
      </CustomMessageForm>
    </>
  );
};
