import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

export const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f9f9f9;
`;

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const ParticipantCount = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: #666;
`;

export const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const MessageGroup = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isCurrentUser ? 'flex-end' : 'flex-start')};
  gap: 4px;
`;

export const SenderName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #666;
  padding: 0 12px;
`;

export const MessageBubble = styled.div<{ isCurrentUser: boolean }>`
  max-width: 60%;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${props => (props.isCurrentUser ? '#4CAF50' : '#e0e0e0')};
  color: ${props => (props.isCurrentUser ? '#fff' : '#333')};
  word-break: break-word;
  font-size: 14px;
  line-height: 1.4;

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

export const Timestamp = styled.span`
  font-size: 11px;
  color: #999;
  padding: 0 12px;
`;

export const InputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MessageInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const TextInput = styled.textarea`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  max-height: 120px;
  min-height: 40px;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AttachmentToggle = styled.button`
  padding: 10px;
  background-color: transparent;
  color: #4caf50;
  border: 1px solid #4caf50;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;

  &:hover {
    background-color: rgba(76, 175, 80, 0.1);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  gap: 12px;

  svg {
    width: 48px;
    height: 48px;
    opacity: 0.5;
  }
`;

export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  margin-top: 12px;
`;

export const MediaThumbnail = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;
