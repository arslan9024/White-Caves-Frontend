import styled, { css } from 'styled-components';
import { colors } from '../../../styles/theme/colors';
import { typography } from '../../../styles/theme/typography';
import { spacing } from '../../../styles/theme/spacing';

/* ── Container ─────────────────────────────────────────────── */

export const TopBarContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  z-index: var(--z-navbar, 500);
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;

  @media (prefers-color-scheme: dark) {
    background: rgba(30, 41, 59, 0.96);
    border-bottom-color: #334155;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
  }
`;

/* ── Logo section ──────────────────────────────────────────── */

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
`;

export const LogoMark = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark});
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: ${typography.weights.extrabold};
  font-size: 14px;
  font-family: ${typography.fontFamily.heading};
  letter-spacing: 0.5px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(227, 30, 36, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const LogoName = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  font-family: ${typography.fontFamily.heading};

  @media (max-width: 768px) {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    color: #f8fafc;
  }
`;

/* ── Divider ───────────────────────────────────────────────── */

export const VerticalDivider = styled.div`
  width: 1px;
  height: 28px;
  background: #e5e7eb;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    background: #334155;
  }
`;

/* ── Breadcrumbs ───────────────────────────────────────────── */

export const BreadcrumbsSection = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
  flex: 1;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
  }
`;

export const BreadcrumbItem = styled.button<{ $isLast?: boolean }>`
  background: none;
  border: none;
  padding: 4px 6px;
  border-radius: 6px;
  cursor: ${p => (p.$isLast ? 'default' : 'pointer')};
  font-size: 13px;
  font-weight: ${p => (p.$isLast ? '600' : '400')};
  color: ${p => (p.$isLast ? '#111827' : '#6B7280')};
  white-space: nowrap;
  transition: all 0.15s ease;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;

  ${p =>
    !p.$isLast &&
    css`
      &:hover {
        background: #f3f4f6;
        color: ${colors.primary};
      }
    `}

  @media (prefers-color-scheme: dark) {
    color: ${p => (p.$isLast ? '#F8FAFC' : '#94A3B8')};

    ${p =>
      !p.$isLast &&
      css`
        &:hover {
          background: #334155;
        }
      `}
  }
`;

export const BreadcrumbSeparator = styled.span`
  color: #d1d5db;
  font-size: 12px;
  flex-shrink: 0;

  @media (prefers-color-scheme: dark) {
    color: #475569;
  }
`;
