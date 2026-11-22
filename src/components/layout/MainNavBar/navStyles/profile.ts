import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import { spacing } from '../../../../styles/theme/spacing';

/* ===============================================
   PROFILE TRIGGER & DROPDOWN
   =============================================== */

export const ProfileTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 6px 12px 6px 6px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.background.tertiary};

    @media (prefers-color-scheme: dark) {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  @media (max-width: 768px) {
    padding: 6px;
  }
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SuperUserBadge = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: #ffd700;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  line-height: 1.2;
`;

export const UserRole = styled.span<{ $isSuperUser?: boolean }>`
  font-size: 11px;
  color: ${props => (props.$isSuperUser ? theme.colors.primary : theme.colors.text.secondary)};
  font-weight: 500;
`;

export const ChevronIcon = styled.div<{ $open?: boolean }>`
  color: ${theme.colors.text.secondary};
  transition: transform 0.2s ease;
  ${props => props.$open && 'transform: rotate(180deg);'}
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ===============================================
   DROPDOWN ITEMS & STRUCTURE
   =============================================== */

export const DropdownDivider = styled.div`
  height: 1px;
  background: ${theme.colors.border};
  margin: ${spacing.xs} 0;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const DropdownItem = styled.button<{ $isLogout?: boolean; $isAdmin?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  font-size: 13px;
  color: ${props => (props.$isLogout ? '#D32F2F' : theme.colors.text.primary)};
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: left;

  svg {
    color: ${props => (props.$isLogout ? '#D32F2F' : theme.colors.text.secondary)};
    flex-shrink: 0;
  }

  &:hover {
    background: ${theme.colors.background.tertiary};

    @media (prefers-color-scheme: dark) {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  ${props => props.$isAdmin && `color: ${theme.colors.primary};`}
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.tertiary};

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const ProfileAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const ProfileEmail = styled.span`
  font-size: 12px;
  color: ${theme.colors.text.secondary};
`;

export const DropdownFooter = styled.div`
  padding: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
  text-align: center;

  button {
    background: none;
    border: none;
    font-size: 13px;
    color: ${theme.colors.primary};
    cursor: pointer;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
