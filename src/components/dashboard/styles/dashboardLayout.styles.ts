// ─────────────────────────────────────────────────────────────
// DASHBOARD LAYOUT & TOPBAR STYLES
// ─────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { colors, spacing, typography, media, shadows, borderRadius } from '@/design-tokens';

// ── PAGE LAYOUT ──
export const PageContainer = styled.div`
  min-height: 100%;
  background: #0f1115;
  color: ${colors.text.primary};
  padding: ${spacing[5]};

  ${media.sm} {
    padding: ${spacing[3]};
  }
`;

// ── SIDEBAR BRAND ──
export const SideRailBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[1]} ${spacing[1]} ${spacing[2]};
`;

export const SideRailBrandLogo = styled.div`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: ${borderRadius.md};
  background: linear-gradient(135deg, #d4af37, #aa8529);
  color: ${colors.text.inverse};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  flex-shrink: 0;
`;

export const SideRailBrandName = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  color: ${colors.text.primary};
  letter-spacing: 0.02em;
`;

export const SideRailDivider = styled.hr`
  height: 1px;
  background: ${colors.border};
  margin: ${spacing[1]} 0;
  border: none;
`;

// ── SKIP LINK (ACCESSIBILITY) ──
export const SkipLink = styled.a`
  position: absolute;
  inset-inline-start: ${spacing[5]};
  inset-block-start: -48px;
  z-index: 20;
  background: ${colors.primary[500]};
  color: #fff;
  padding: ${spacing[2]} ${spacing[4]};
  border-radius: ${borderRadius.sm};
  text-decoration: none;
  transition: inset-block-start 0.2s ease;
  ${typography.presets.label};

  &:focus {
    inset-block-start: ${spacing[4]};
  }
`;

// ── TOPBAR ──
export const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 6;
  display: grid;
  grid-template-columns: auto minmax(280px, 1fr) auto;
  align-items: center;
  gap: ${spacing[4]};
  min-height: 64px;
  margin-bottom: ${spacing[5]};
  padding: ${spacing[3]} ${spacing[4]};
  background: rgba(15, 17, 21, 0.95);
  border: 1px solid ${colors.border};
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.md};
  backdrop-filter: blur(18px);

  ${media.md} {
    grid-template-columns: 1fr;
    gap: ${spacing[3]};
    min-height: auto;
  }
`;

export const TopBarBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;

export const TopBarLogo = styled.div`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: ${borderRadius.lg};
  background: linear-gradient(135deg, #d4af37, #aa8529);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

export const TopBarEyebrow = styled.div`
  margin: 0 0 ${spacing[1]} 0;
  color: ${colors.text.secondary};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const TopBarTitle = styled.strong`
  font-size: 0.98rem;
`;

export const TopBarSearch = styled.div`
  position: relative;
  min-width: 0;
`;

export const SearchInput = styled.input`
  width: 100%;
  min-height: 44px;
  padding: 0 ${spacing[4]} 0 ${spacing[5]};
  border: 1px solid ${colors.border};
  border-radius: 999px;
  background: rgba(248, 249, 250, 0.96);
  color: ${colors.text.primary};
  ${typography.presets.body};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(196, 30, 58, 0.35);
    box-shadow: 0 0 0 4px rgba(196, 30, 58, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${colors.text.secondary};
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  inset-inline-start: ${spacing[4]};
  inset-block-start: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${colors.text.secondary};
`;

// ── WORKSPACE SHELL ──
export const WorkspaceShell = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing[4]};
`;

// ── ERROR BANNER ──
export const ErrorBanner = styled.div`
  max-width: 100%;
  margin: 0 auto ${spacing[4]};
  padding: ${spacing[4]} ${spacing[5]};
  background: ${colors.error[50]};
  border: 1px solid ${colors.error[200]};
  border-radius: ${borderRadius.lg};
  color: ${colors.error[900]};
  ${typography.presets.body};
  display: flex;
  align-items: center;
  gap: ${spacing[3]};

  strong {
    font-weight: 600;
  }
`;

// ── TAB LOADING ──
export const TabLoadingFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: ${colors.text.secondary};
  ${typography.presets.body};
`;
