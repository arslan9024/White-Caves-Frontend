/**
 * ZoeBusinessHub.style.ts
 * UI Style Layer & Styled-Components for Zoe Business Documentation Hub
 * Brand Palette: White Caves Red (#EF4444) | Brilliant White (#FFFFFF) | Deep Slate Gray (#1E293B)
 */

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 1.5rem;
  background: var(--bg-primary, #0f172a);
  color: var(--white, #ffffff);
  min-height: 100%;
  font-family: 'Inter', sans-serif;
`;

export const HeaderBanner = styled.div`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(30, 41, 59, 0.5) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 16px;
  padding: 1.75rem;
  margin-bottom: 1.75rem;
`;

export const Badge = styled.div`
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.2);
  color: var(--accent-red, #ef4444);
  border: 1px solid rgba(239, 68, 68, 0.4);
  margin-bottom: 0.75rem;
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
  color: var(--white, #ffffff);
`;

export const Subtitle = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary, #94a3b8);
  margin: 0;
  max-width: 800px;
`;

export const ControlsRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 280px;
  padding: 0.75rem 1rem;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  color: var(--white, #ffffff);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--accent-red, #ef4444);
  }
`;

export const CategoryPills = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

export const CategoryPill = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid ${(p) => (p.$active ? 'var(--accent-red, #ef4444)' : 'rgba(255, 255, 255, 0.1)')};
  background: ${(p) => (p.$active ? 'var(--accent-red, #ef4444)' : 'rgba(30, 41, 59, 0.6)')};
  color: var(--white, #ffffff);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(p) => (p.$active ? '#dc2626' : 'rgba(239, 68, 68, 0.15)')};
  }
`;

export const DocsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.25rem;
`;

export const DocCard = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 1.25rem;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(239, 68, 68, 0.5);
    box-shadow: 0 10px 25px rgba(239, 68, 68, 0.15);
  }
`;

export const DocCodeBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(239, 68, 68, 0.15);
  color: var(--accent-red, #ef4444);
  margin-bottom: 0.5rem;
  display: inline-block;
`;

export const DocCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  color: var(--white, #ffffff);
`;

export const DocCardSummary = styled.p`
  font-size: 0.85rem;
  color: var(--text-secondary, #94a3b8);
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

export const DocSubItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0.75rem 0 1rem 0;
`;

export const DocSubItemChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  color: var(--text-secondary, #cbd5e1);

  span.dot {
    color: var(--accent-red, #ef4444);
    font-weight: 900;
  }
`;

export const ViewerSubItemsNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
`;

export const ViewerSubItemPill = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #0f172a;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #ef4444;
    color: #ffffff;
    border-color: #ef4444;
  }
`;

export * from './ZoeBusinessHubCards.style';
