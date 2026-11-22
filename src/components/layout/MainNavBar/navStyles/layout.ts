import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import { typography } from '../../../../styles/theme/typography';

/* ===============================================
   NAVBAR CONTAINER
   =============================================== */

export const NavBarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: ${theme.colors.background.secondary};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.lg};
  z-index: ${theme.zIndex.fixed};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  gap: ${theme.spacing.lg};

  @media (prefers-color-scheme: dark) {
    background: #1a1a2e;
    border-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.md};
    gap: ${theme.spacing.md};
  }
`;

/* ===============================================
   LEFT SECTION (LOGO + SIDEBAR TOGGLE)
   =============================================== */

export const NavLeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

export const LogoButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.md};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    gap: ${theme.spacing.sm};
  }
`;

export const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const LogoLetter = styled.span`
  font-size: 20px;
  font-weight: ${typography.weights.bold};
  color: white;
  font-family: ${theme.typography.fontFamily.heading};
`;

export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  line-height: 1.2;
  font-family: ${theme.typography.fontFamily.heading};

  @media (prefers-color-scheme: dark) {
    color: #ffffff;
  }
`;

export const LogoSubtitle = styled.span`
  font-size: 11px;
  color: ${theme.colors.text.secondary};
  font-weight: 500;

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.6);
  }
`;

/* ===============================================
   CENTER & RIGHT SECTIONS
   =============================================== */

export const NavCenterSection = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};

  @media (max-width: 1024px) {
    max-width: 400px;
    margin: 0 ${theme.spacing.md};
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0;
    display: none;
  }
`;

export const NavRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;
