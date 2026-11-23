import styled from 'styled-components';
import { colors } from '../../../styles/theme/colors';
import { spacing } from '../../../styles/theme/spacing';

/* ── Actions (right side) ──────────────────────────────────── */

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  flex-shrink: 0;
`;

export const ActionAnchor = styled.div`
  position: relative;
`;

/* ── Search trigger ────────────────────────────────────────── */

export const SearchTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: 7px 14px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  color: #9ca3af;
  font-size: 13px;
  transition: all 0.15s ease;
  white-space: nowrap;
  min-width: 180px;

  &:hover {
    background: #e5e7eb;
    border-color: #d1d5db;
    color: #6b7280;
  }

  &:focus-visible {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.15);
  }

  @media (max-width: 640px) {
    padding: 6px 8px;
    min-width: unset;
    span {
      display: none;
    }
  }

  @media (prefers-color-scheme: dark) {
    background: #334155;
    border-color: #475569;
    color: #64748b;

    &:hover {
      background: #475569;
      color: #94a3b8;
    }

    &:focus-visible {
      border-color: ${colors.primary};
      box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.2);
    }
  }
`;

export const SearchShortcut = styled.kbd`
  font-size: 11px;
  font-family: inherit;
  padding: 2px 5px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  color: #9ca3af;
  line-height: 1;

  @media (max-width: 768px) {
    display: none;
  }

  @media (prefers-color-scheme: dark) {
    background: #1e293b;
    border-color: #475569;
    color: #64748b;
  }
`;

export const QuickActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 10px;
  background: ${colors.primaryVeryLight};
  border: 1px solid rgba(227, 30, 36, 0.35);
  border-radius: 8px;
  color: ${colors.primaryDark};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #f8efcb;
    border-color: rgba(227, 30, 36, 0.55);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.25);
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
    width: 36px;
    padding: 0;
    justify-content: center;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(227, 30, 36, 0.15);
    border-color: rgba(227, 30, 36, 0.35);
    color: ${colors.primaryLight};

    &:hover {
      background: rgba(227, 30, 36, 0.22);
    }
  }
`;

/* ── Icon button (notifications, user, etc.) ───────────────── */

export const IconButton = styled.button<{ $hasNotif?: boolean }>`
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.15s ease;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(227, 30, 36, 0.3);
  }

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;
    &:hover {
      background: #334155;
      color: #f8fafc;
    }
  }
`;

export const NotifBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${colors.primary};
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
  line-height: 1;

  @media (prefers-color-scheme: dark) {
    border-color: #1e293b;
  }
`;

/* ── Hamburger button (mobile) ─────────────────────────────── */

export const HamburgerButton = styled.button`
  display: none; /* Hidden on desktop */
  width: 44px; /* WCAG 2.1 AA touch target */
  height: 44px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #374151;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover,
  &:active {
    background: #f3f4f6;
    color: ${colors.primary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.3);
  }

  @media (max-width: 768px) {
    display: flex;
  }

  @media (prefers-color-scheme: dark) {
    color: #e2e8f0;
    &:hover,
    &:active {
      background: #334155;
      color: ${colors.primary};
    }
  }
`;
