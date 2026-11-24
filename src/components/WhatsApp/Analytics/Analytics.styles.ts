import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

export const DatePickerGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const DateInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #25d366;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props =>
    props.variant === 'primary'
      ? `
    background: #25d366;
    color: white;

    &:hover {
      background: #20ba5a;
    }
  `
      : `
    background: #f0f0f0;
    color: #333;

    &:hover {
      background: #e0e0e0;
    }
  `}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #999;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CardValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #25d366;
  margin-bottom: 8px;
`;

export const CardSubtext = styled.div`
  font-size: 12px;
  color: #999;
`;

export const Trend = styled.span<{ $positive?: boolean }>`
  color: ${props => (props.$positive ? '#25d366' : '#f44336')};
  font-weight: 600;
`;

export const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

export const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
`;

export const SimpleChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 200px;
  padding: 12px 0;
`;

export const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 8px;
`;

export const Bar = styled.div<{ height: number; color?: string }>`
  width: 100%;
  height: ${props => props.height}%;
  background: ${props => props.color || '#25d366'};
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const BarLabel = styled.div`
  font-size: 12px;
  color: #999;
  text-align: center;
`;

export const TopConversations = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ConversationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const ConversationName = styled.div`
  font-weight: 500;
  color: #1a1a1a;
  font-size: 14px;
`;

export const ConversationCount = styled.div`
  color: #25d366;
  font-weight: 600;
  font-size: 14px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #999;
`;

export const LoadingSpinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #25d366;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

