import React, { FC } from 'react';
import {
  ChatHeader as StyledChatHeader,
  ChatHeaderInfo,
  ChatAvatar,
  ChatHeaderTitle,
  OnlineStatus,
  CloseChat,
} from '../ClickToChat.styles';

interface ChatHeaderPanelProps {
  baseUrl: string;
  isOnline: boolean;
  onClose: () => void;
}

export const ChatHeaderPanel: FC<ChatHeaderPanelProps> = ({ baseUrl, isOnline, onClose }) => {
  return (
    <StyledChatHeader>
      <ChatHeaderInfo>
        <ChatAvatar src={`${baseUrl}company-logo.jpg`.replace('//', '/')} alt="White Caves" />
        <div>
          <ChatHeaderTitle>White Caves Support</ChatHeaderTitle>
          <OnlineStatus $isOnline={isOnline}>
            {isOnline ? 'Online now' : 'Away - Leave a message'}
          </OnlineStatus>
        </div>
      </ChatHeaderInfo>
      <CloseChat onClick={onClose} aria-label="Close chat">
        ×
      </CloseChat>
    </StyledChatHeader>
  );
};
