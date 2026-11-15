import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  background: #f8fafc;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  padding: 20px;
  max-width: 600px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
`;

export const CommentThread = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(239, 68, 68, 0.05);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(239, 68, 68, 0.2);
    border-radius: 3px;

    &:hover {
      background: rgba(239, 68, 68, 0.4);
    }
  }
`;

export const CommentBubble = styled(motion.div)<{ $isOwn: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
  background: ${props => (props.$isOwn ? 'rgba(239, 68, 68, 0.08)' : 'rgba(15, 23, 42, 0.04)')};
  border-left: 3px solid ${props => (props.$isOwn ? '#ef4444' : 'rgba(15, 23, 42, 0.2)')};
  border-radius: 8px;
  align-self: ${props => (props.$isOwn ? 'flex-end' : 'flex-start')};
  max-width: 85%;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`;

export const Author = styled.span`
  font-weight: 600;
  color: #1e293b;
`;

export const Timestamp = styled.span`
  color: #64748b;
  font-size: 11px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;

export const CommentText = styled.p`
  color: #334155;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  word-wrap: break-word;
`;

export const InputContainer = styled.form`
  display: flex;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(239, 68, 68, 0.2);
`;

export const Input = styled.textarea`
  flex: 1;
  background: #ffffff;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 12px;
  color: #1e293b;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 40px;
  max-height: 120px;

  &:focus {
    outline: none;
    border-color: #ef4444;
    background: #ffffff;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SendButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ef4444;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: #64748b;
`;
