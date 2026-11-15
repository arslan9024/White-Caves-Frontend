import React, { useState, useRef, useEffect } from 'react';
import type { GroupMessage, GroupConversation, MediaFile } from '../../../types/phase6.types';
import { MediaUploadComponent } from '../MediaUpload/MediaUploadComponent';
import {
  Container,
  Header,
  HeaderTitle,
  ParticipantCount,
  MessageContainer,
  MessageGroup,
  SenderName,
  MessageBubble,
  Timestamp,
  InputContainer,
  MessageInputWrapper,
  TextInput,
  SendButton,
  AttachmentToggle,
  EmptyState,
  MediaGrid,
  MediaThumbnail,
} from './GroupMessagingComponent.styles';

export * from './GroupMessagingComponent.styles';

interface GroupMessagingComponentProps {
  conversation: GroupConversation;
  messages: GroupMessage[];
  currentUserId: string;
  onSendMessage: (content: string, attachments?: MediaFile[]) => Promise<void>;
  onMention?: (userId: string) => void;
  isLoading?: boolean;
}

export const GroupMessagingComponent: React.FC<GroupMessagingComponentProps> = ({
  conversation,
  messages = [],
  currentUserId,
  onSendMessage,
  onMention: _onMention,
  isLoading = false,
}) => {
  const [messageText, setMessageText] = useState('');
  const [attachments, setAttachments] = useState<MediaFile[]>([]);
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageText.trim() && attachments.length === 0) {
      return;
    }

    setIsSending(true);
    try {
      await onSendMessage(messageText, attachments.length > 0 ? attachments : undefined);
      setMessageText('');
      setAttachments([]);
      setShowMediaUpload(false);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSendMessage();
    }
  };

  const handleMediaUploadComplete = (file: MediaFile) => {
    setAttachments([...attachments, file]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>{conversation?.name || 'Group Conversation'}</HeaderTitle>
        <ParticipantCount>
          {conversation?.participants?.length || 0} participant
          {conversation?.participants?.length !== 1 ? 's' : ''}
        </ParticipantCount>
      </Header>

      <MessageContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p>No messages yet. Start the conversation!</p>
          </EmptyState>
        ) : (
          messages.map(msg => (
            <MessageGroup key={msg.id} isCurrentUser={msg.senderId === currentUserId}>
              {msg.senderId !== currentUserId && <SenderName>{msg.senderName}</SenderName>}
              <MessageBubble isCurrentUser={msg.senderId === currentUserId}>
                {msg.content}
                {msg.mediaAttachments && msg.mediaAttachments.length > 0 && (
                  <MediaGrid>
                    {msg.mediaAttachments.map(media =>
                      media.type === 'image' ? (
                        <MediaThumbnail
                          key={media.id}
                          src={media.thumbnailUrl || media.url}
                          alt={media.name}
                        />
                      ) : null
                    )}
                  </MediaGrid>
                )}
              </MessageBubble>
              <Timestamp>{new Date(msg.timestamp).toLocaleTimeString()}</Timestamp>
            </MessageGroup>
          ))
        )}
        <div ref={messageEndRef} />
      </MessageContainer>

      <InputContainer>
        {showMediaUpload && (
          <div>
            <MediaUploadComponent
              onUploadComplete={handleMediaUploadComplete}
              conversationId={conversation?.id || ''}
              maxSize={52428800}
              multiple={true}
            />
          </div>
        )}

        {attachments.length > 0 && (
          <MediaGrid>
            {attachments.map((file, index) => (
              <div key={file.id} style={{ position: 'relative' }}>
                {file.type === 'image' && <MediaThumbnail src={file.url} alt={file.name} />}
                <button
                  onClick={() => removeAttachment(index)}
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </MediaGrid>
        )}

        <MessageInputWrapper>
          <TextInput
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Ctrl+Enter to send)"
            disabled={isLoading || isSending}
          />
          <AttachmentToggle
            onClick={() => setShowMediaUpload(!showMediaUpload)}
            disabled={isSending}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </AttachmentToggle>
          <SendButton
            onClick={handleSendMessage}
            disabled={isLoading || isSending || (!messageText.trim() && attachments.length === 0)}
          >
            {isSending ? 'Sending...' : 'Send'}
          </SendButton>
        </MessageInputWrapper>
      </InputContainer>
    </Container>
  );
};

export default GroupMessagingComponent;
