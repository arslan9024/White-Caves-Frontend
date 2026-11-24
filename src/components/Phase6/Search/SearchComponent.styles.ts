import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SearchBarContainer = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

export const SearchIcon = styled.svg`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: #999;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => (props.isActive ? '#4caf50' : '#ddd')};
  background-color: ${props => (props.isActive ? '#e8f5e9' : '#fff')};
  color: ${props => (props.isActive ? '#2e7d32' : '#666')};
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #4caf50;
  }
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 500px;
  overflow-y: auto;

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
`;

export const ResultItem = styled.div<{ isHovered: boolean }>`
  padding: 12px;
  background-color: ${props => (props.isHovered ? '#f5f5f5' : '#fff')};
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #4caf50;
  }
`;

export const ResultTitle = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 14px;
  margin-bottom: 4px;
`;

export const ResultPreview = styled.div`
  color: #666;
  font-size: 12px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ResultMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #999;
`;

export const Badge = styled.span<{ type: string }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
  background-color: ${props => {
    switch (props.type) {
      case 'message':
        return '#e3f2fd';
      case 'contact':
        return '#f3e5f5';
      case 'file':
        return '#fff3e0';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'message':
        return '#1976d2';
      case 'contact':
        return '#7b1fa2';
      case 'file':
        return '#f57c00';
      default:
        return '#666';
    }
  }};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #999;
  gap: 12px;

  svg {
    width: 48px;
    height: 48px;
    opacity: 0.5;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #999;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  svg {
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }
`;

export const StatisticsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

export const StatisticItem = styled.div`
  text-align: center;
  padding: 8px;

  .stat-number {
    font-size: 18px;
    font-weight: 700;
    color: #4caf50;
  }

  .stat-label {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }
`;
