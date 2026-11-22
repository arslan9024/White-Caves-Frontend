import styled from 'styled-components';
import {
  colors,
  mediaQueries,
  radius,
  reducedMotion,
  spacing,
  transitions,
  typeSizes,
  typeWeights,
} from './tokens';

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  background: ${colors.background.primary};
  padding-top: 64px;
`;

export const AdminHeader = styled.div`
  position: sticky;
  top: 64px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.xl} ${spacing.lg};
  background: ${colors.background.secondary};
  border-bottom: 1px solid ${colors.border};
  backdrop-filter: blur(10px);

  ${mediaQueries.tablet} {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

export const AdminTitle = styled.div`
  h1 {
    margin: 0 0 ${spacing.xs} 0;
    font-size: ${typeSizes.xxxl};
    font-weight: ${typeWeights.bold};
    color: ${colors.text.primary};
  }

  p {
    margin: 0;
    font-size: ${typeSizes.base};
    color: ${colors.text.secondary};
  }
`;

export const AdminUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${spacing.xs};

  ${mediaQueries.tablet} {
    align-items: flex-start;
  }
`;

export const HeaderMeta = styled.span`
  font-size: ${typeSizes.xs};
  color: ${colors.text.tertiary};
  text-align: right;

  ${mediaQueries.tablet} {
    text-align: left;
  }
`;

export const UserName = styled.span`
  font-size: ${typeSizes.base};
  font-weight: ${typeWeights.semibold};
  color: ${colors.text.primary};
`;

export const UserRole = styled.span`
  font-size: ${typeSizes.xs};
  color: ${colors.primary};
  font-weight: ${typeWeights.medium};
`;

export const AdminTabs = styled.div`
  display: flex;
  gap: 0;
  padding: 0 ${spacing.lg};
  background: ${colors.background.secondary};
  border-bottom: 1px solid ${colors.border};
  overflow-x: auto;
  position: sticky;
  top: calc(64px + 96px);
  z-index: 2;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.border};
    border-radius: 999px;
  }

  ${mediaQueries.mobile} {
    padding: 0 ${spacing.md};
    top: calc(64px + 88px);
  }
`;

export const Tab = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: ${spacing.md} ${spacing.lg};
  background: none;
  border: none;
  border-bottom: 3px solid ${props => (props.$active ? colors.primary : 'transparent')};
  color: ${props => (props.$active ? colors.primary : colors.text.secondary)};
  font-size: ${typeSizes.base};
  font-weight: ${typeWeights.medium};
  cursor: pointer;
  transition: ${transitions.hover};
  white-space: nowrap;

  &:hover {
    color: ${colors.text.primary};
    border-bottom-color: ${props => (props.$active ? colors.primary : colors.border)};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: -2px;
    border-radius: ${radius.sm} ${radius.sm} 0 0;
  }

  ${reducedMotion} {
    transition: none;
  }

  ${mediaQueries.mobile} {
    padding: ${spacing.sm} ${spacing.md};
    font-size: ${typeSizes.sm};
  }
`;

export const AdminContent = styled.div`
  flex: 1;
  padding: ${spacing.xl} ${spacing.lg};
  overflow-y: auto;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;

  ${mediaQueries.mobile} {
    padding: ${spacing.lg} ${spacing.md};
  }
`;

export const AdminOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${radius.xl};
  margin-bottom: ${spacing.md};

  h3 {
    margin: 0;
    font-size: ${typeSizes.lg};
    font-weight: ${typeWeights.semibold};
    color: ${colors.text.primary};
  }

  svg {
    color: ${colors.primary};
  }

  button {
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    color: ${colors.text.secondary};
    transition: color ${transitions.durations.shorter} ${transitions.easing.easeOut};

    &:hover {
      color: ${colors.text.primary};
    }
  }

  ${mediaQueries.mobile} {
    align-items: flex-start;
    flex-direction: column;
    gap: ${spacing.sm};
  }
`;
