import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

export const TextArea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const RecipientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RecipientChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #e8f5e9;
  border: 1px solid #4caf50;
  border-radius: 20px;
  font-size: 13px;
  color: #2e7d32;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #2e7d32;
  cursor: pointer;
  padding: 0 4px;
  font-weight: bold;

  &:hover {
    opacity: 0.7;
  }
`;

export const PreviewContainer = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 16px;
  margin-top: 12px;
`;

export const PreviewTitle = styled.h4`
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const PreviewContent = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
  color: #666;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const ScheduleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: #666;
  padding: 12px;
  background-color: #e8f5e9;
  border-radius: 4px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props =>
    props.variant === 'primary'
      ? `
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  `
      : `
    background-color: #f0f0f0;
    color: #333;
    &:hover {
      background-color: #e0e0e0;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const TimeZoneInfo = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

export const WarningBox = styled.div`
  background-color: #fff3e0;
  border-left: 4px solid #ff9800;
  padding: 12px;
  border-radius: 4px;
  font-size: 13px;
  color: #e65100;
`;

export const StatusBanner = styled.div<{ $type: 'success' | 'error' }>`
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  ${({ $type }) =>
    $type === 'success'
      ? 'background-color: #e8f5e9; border-left: 4px solid #4caf50; color: #2e7d32;'
      : 'background-color: #fdecea; border-left: 4px solid #f44336; color: #b71c1c;'}
`;
