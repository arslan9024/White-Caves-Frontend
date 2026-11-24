import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

export const SelectAccountSection = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #25d366;
    box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.1);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #25d366;
          color: white;
          
          &:hover {
            background: #20ba5a;
          }
          
          &:disabled {
            background: #ccc;
            cursor: not-allowed;
          }
        `;
      case 'secondary':
        return `
          background: #f0f0f0;
          color: #333;
          
          &:hover {
            background: #e0e0e0;
          }
          
          &:disabled {
            background: #f5f5f5;
            cursor: not-allowed;
          }
        `;
      case 'danger':
        return `
          background: #f8d7da;
          color: #721c24;
          
          &:hover {
            background: #f5c6cb;
          }
          
          &:disabled {
            background: #f5f5f5;
            cursor: not-allowed;
          }
        `;
      default:
        return '';
    }
  }}
`;

export const QRCodeSection = styled.div`
  text-align: center;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 24px;
`;

export const QRCodeImage = styled.img`
  max-width: 300px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const QRCodeText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 12px 0;
`;

export const PhoneVerificationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #25d366;
    box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.1);
  }
`;

export const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #25d366;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StepIndicator = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const StepBadge = styled.div<{ active?: boolean; completed?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;

  ${props => {
    if (props.completed) {
      return `
        background: #25d366;
        color: white;
      `;
    }
    if (props.active) {
      return `
        background: #25d366;
        color: white;
      `;
    }
    return `
      background: #f0f0f0;
      color: #999;
    `;
  }}
`;

