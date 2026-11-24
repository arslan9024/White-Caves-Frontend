import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatIcon = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color}20;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatTrend = styled.div<{ isPositive: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.isPositive ? '#4caf50' : '#f44336')};
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

export const RefreshButton = styled.button`
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const MetricsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MetricCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const MetricTitle = styled.h4`
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 13px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

export const MetricLabel = styled.span`
  color: #666;
`;

export const MetricValue = styled.span`
  color: #333;
  font-weight: 600;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 4px;
`;

export const ProgressFill = styled.div<{ percentage: number; color: string }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) => props.color};
  transition: width 0.3s ease;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #999;
  gap: 12px;

  svg {
    width: 48px;
    height: 48px;
    opacity: 0.5;
  }
`;

export const Chart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ChartTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const ChartBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ChartLabel = styled.div`
  width: 100px;
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChartBarContainer = styled.div`
  flex: 1;
  height: 24px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
`;

export const ChartBarFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transition: width 0.3s ease;
`;

export const ChartValue = styled.div`
  width: 50px;
  text-align: right;
  font-size: 12px;
  color: #333;
  font-weight: 600;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  svg {
    width: 32px;
    height: 32px;
    animation: spin 1s linear infinite;
    color: #4caf50;
  }
`;

