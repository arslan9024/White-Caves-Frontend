import styled from 'styled-components';

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled.div<{ $color: string }>`
  background: #0f0f0f;
  border: 1px solid #2c2c2c;
  border-radius: 12px;
  padding: 1.25rem;
  border-left: 4px solid ${props => props.$color};
`;

export const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.25rem;
`;

export const PropertyCardStyled = styled.div<{ $featured?: boolean }>`
  background: #0f0f0f;
  border: 1px solid ${props => (props.$featured ? '#C9A84C' : '#2c2c2c')};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;
  position: relative;

  ${props => props.$featured && `box-shadow: 0 0 0 1px #C9A84C;`}

  &:hover {
    box-shadow: 0 4px 20px rgba(201, 168, 76, 0.15);
    transform: translateY(-2px);
  }
`;

export const PropertyImage = styled.div<{ $type: string }>`
  height: 180px;
  background: ${props => {
    switch (props.$type) {
      case 'villa':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'apartment':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'penthouse':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      case 'commercial':
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      default:
        return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  position: relative;
`;

export const FeaturedBadge = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #f59e0b;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
`;

export const PropertyBody = styled.div`
  padding: 1.25rem;
`;

export const PropertyTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 0.25rem;
`;

export const PropertyLocation = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.75rem;
`;

export const PropertyPrice = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 0.75rem;
`;

export const PropertyMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.75rem;
`;

export const PropertyActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #2c2c2c;
`;

export const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #2c2c2c;
  border-radius: 8px;
  overflow: hidden;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  background: ${props => (props.$active ? '#C9A84C' : '#1a1a1a')};
  color: ${props => (props.$active ? '#0f0f0f' : 'rgba(255, 255, 255, 0.7)')};
  border: none;
  padding: 0.4rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  &:hover {
    background: ${props => (props.$active ? '#a8883a' : '#2c2c2c')};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
`;
