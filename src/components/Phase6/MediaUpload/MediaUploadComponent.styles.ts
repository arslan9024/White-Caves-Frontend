import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DropZone = styled.div<{ isDragActive: boolean }>`
  border: 2px dashed ${(props) => (props.isDragActive ? '#4CAF50' : '#ccc')};
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  background-color: ${(props) =>
    props.isDragActive ? 'rgba(76, 175, 80, 0.1)' : '#f9f9f9'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #4caf50;
    background-color: rgba(76, 175, 80, 0.05);
  }

  &:active {
    background-color: rgba(76, 175, 80, 0.1);
  }
`;

export const DropZoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  svg {
    width: 48px;
    height: 48px;
    color: #4caf50;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 14px;

    strong {
      color: #333;
      display: block;
      font-size: 16px;
      margin-bottom: 4px;
    }
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background-color: #4CAF50;
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

export const FileList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
`;

export const ErrorMessage = styled.div`
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  padding: 12px;
  border-radius: 4px;
  color: #c62828;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

export const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  border-left: 4px solid #4caf50;
  padding: 12px;
  border-radius: 4px;
  color: #2e7d32;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;

