import styled from 'styled-components';
import { colors, spacing, typography, borderRadius, media } from '@/design-tokens';

export const UsersContainer = styled.div`
  background: ${colors.background.default};
  border-radius: ${borderRadius.lg};
  padding: ${spacing[6]};
`;

export const UsersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};

  ${media.sm} {
    flex-direction: column;
  }
`;

export const UsersStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const UserStatCard = styled.div`
  background: ${colors.background.surface};
  padding: ${spacing[4]};
  border-radius: ${borderRadius.md};
  border: 1px solid ${colors.border.default};
`;

export const CategoryOverview = styled.div`
  margin-bottom: ${spacing[6]};
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${spacing[3]};
`;

export const CategoryCard = styled.div<{ $isActive?: boolean }>`
  background: ${colors.background.surface};
  border: 2px solid ${colors.border.default};
  border-radius: ${borderRadius.md};
  padding: ${spacing[3]};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.primary[500]};
  }

  ${props =>
    props.$isActive &&
    `
    border-color: ${colors.primary[600]};
    background: ${colors.primary[50]};
  `}
`;

export const CategoryName = styled.div`
  ${typography.presets.bodySmall};
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: ${spacing[1]};
`;

export const CategoryCount = styled.div`
  ${typography.presets.heading3};
  color: ${colors.primary[600]};
  font-weight: 700;
`;

export const UsersToolbar = styled.div`
  display: flex;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[4]};
  flex-wrap: wrap;

  ${media.sm} {
    flex-direction: column;
  }
`;

export const SearchBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[3]};
  border: 1px solid ${colors.border.default};
  border-radius: ${borderRadius.md};
  ${typography.presets.body};
  min-width: 200px;
  background: ${colors.background.default};

  & input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    ${typography.presets.body};
    color: inherit;
  }

  &:focus-within {
    border-color: ${colors.primary[600]};
    box-shadow: 0 0 0 3px ${colors.primary[100]};
  }
`;

export const ToolbarFilters = styled.div`
  display: flex;
  gap: ${spacing[2]};
  flex-wrap: wrap;
`;

export const UserCell = styled.td`
  padding: ${spacing[3]} ${spacing[4]};
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

export const UserName = styled.div`
  ${typography.presets.body};
  font-weight: 600;
  color: ${colors.text.primary};
`;

export const UserEmail = styled.div`
  ${typography.presets.bodySmall};
  color: ${colors.text.secondary};
`;

export const RoleBadge = styled.span<{ $role?: string }>`
  display: inline-flex;
  padding: ${spacing[1]} ${spacing[2]};
  border-radius: ${borderRadius.sm};
  ${typography.presets.bodySmall};
  font-weight: 500;

  ${props => {
    switch (props.$role) {
      case 'company_owner':
        return `background: ${colors.primary[100]}; color: ${colors.primary[700]};`;
      case 'sales_manager':
        return `background: ${colors.success[100]}; color: ${colors.success[700]};`;
      case 'agent':
        return `background: ${colors.warning[100]}; color: ${colors.warning[700]};`;
      default:
        return `background: ${colors.neutral[100]}; color: ${colors.neutral[700]};`;
    }
  }}
`;

export const DealsCell = styled.td`
  text-align: center;
  font-weight: 600;
  color: ${colors.primary[600]};
`;

export const ActionButton = styled.button`
  background: none;
  border: 1px solid ${colors.border.default};
  color: ${colors.text.secondary};
  cursor: pointer;
  padding: ${spacing[2]};
  border-radius: ${borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.primary[500]};
    color: ${colors.primary[600]};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing[4]};
  margin-bottom: ${spacing[6]};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const PaginationInfo = styled.div`
  ${typography.presets.bodySmall};
  color: ${colors.text.secondary};
  min-width: fit-content;
`;
