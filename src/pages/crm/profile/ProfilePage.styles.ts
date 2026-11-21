import styled from 'styled-components';
import { spacing, borderRadius } from '../../../design-tokens';

export type ProfileTabId =
  'profile' | 'preferences' | 'rera' | 'goals' | 'security' | 'sessions' | 'shortcuts';

export const ProfileWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${spacing[8]} ${spacing[4]};
`;

export const WorkspaceLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${spacing[6]};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const SidebarContainer = styled.aside`
  background: var(--bg-card, #111827);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-color, rgba(239, 68, 68, 0.25));
  border-radius: ${borderRadius.xl};
  padding: ${spacing[5]};
  box-shadow: var(--shadow-card, 0 12px 32px rgba(0, 0, 0, 0.3));
  height: fit-content;
  position: sticky;
  top: 100px;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  padding-bottom: ${spacing[4]};
  margin-bottom: ${spacing[4]};
  border-bottom: 1px solid var(--border-color, rgba(239, 68, 68, 0.2));

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 2px solid #ef4444;
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
    object-fit: cover;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  img:hover {
    opacity: 0.8;
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.6);
    transform: scale(1.05);
  }
`;

export const SidebarUserInfo = styled.div`
  overflow: hidden;

  h3 {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--text-primary, #f8fafc);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    margin: 3px 0 0;
    font-size: 0.78rem;
    color: var(--text-muted, #94a3b8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const RoleBadgeTag = styled.span<{ $level: number }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  background: ${p => (p.$level === 5 ? '#ef4444' : p.$level >= 3 ? '#1e293b' : 'rgba(239, 68, 68, 0.15)')};
  color: ${p => (p.$level >= 3 ? '#ffffff' : '#ef4444')};
  border: 1px solid ${p => (p.$level === 5 ? '#ef4444' : 'rgba(239, 68, 68, 0.3)')};
`;

export const RoleSelectInput = styled.select`
  width: 100%;
  padding: 12px 16px;
  border-radius: ${borderRadius.lg};
  border: 1px solid var(--border-input, rgba(255, 255, 255, 0.15));
  background: var(--bg-input, rgba(15, 23, 42, 0.8));
  color: var(--text-primary, #f8fafc);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

export const SidebarItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  width: 100%;
  padding: 14px 18px;
  border: none;
  border-radius: ${borderRadius.lg};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%)'
      : 'transparent'};
  color: ${({ $active }) => ($active ? '#EF4444' : 'var(--text-secondary, #94a3b8)')};
  border-left: 4px solid ${({ $active }) => ($active ? '#EF4444' : 'transparent')};

  &:hover {
    background: rgba(239, 68, 68, 0.12);
    color: var(--text-primary, #f8fafc);
    transform: translateX(3px);
  }
`;

export const MainContentArea = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

export const Card = styled.div`
  background: var(--bg-card, #111827);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  border-radius: ${borderRadius.xl};
  padding: ${spacing[7]};
  box-shadow: var(--shadow-card, 0 16px 40px rgba(0, 0, 0, 0.35));
  color: var(--text-primary, #f8fafc);

  h2 {
    margin-top: 0;
    margin-bottom: ${spacing[5]};
    font-size: 1.4rem;
    color: var(--text-primary, #f8fafc);
    display: flex;
    align-items: center;
    gap: ${spacing[3]};
    border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
    padding-bottom: ${spacing[3]};

    span {
      font-size: 1.5rem;
    }
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${spacing[5]};

  label {
    display: block;
    margin-bottom: ${spacing[2]};
    font-weight: 700;
    color: var(--text-secondary, #e2e8f0);
    font-size: 0.875rem;
    letter-spacing: 0.02em;
  }

  input,
  select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--border-input, rgba(255, 255, 255, 0.15));
    border-radius: ${borderRadius.lg};
    background: var(--bg-input, rgba(15, 23, 42, 0.8));
    color: var(--text-primary, #f8fafc);
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
    }

    &:disabled {
      background: rgba(15, 23, 42, 0.4);
      color: rgba(248, 250, 252, 0.6);
      cursor: not-allowed;
      border-color: rgba(255, 255, 255, 0.05);
    }
  }
`;

export const PreferencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${spacing[4]};
  margin-top: ${spacing[3]};
`;

export const PreferenceBox = styled.div`
  background: var(--bg-secondary, rgba(30, 41, 59, 0.5));
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  border-radius: ${borderRadius.lg};
  padding: ${spacing[4]};
`;

export const OptionButtonGroup = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

export const OptionBtn = styled.button<{ $selected: boolean }>`
  flex: 1;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.5px solid
    ${p => (p.$selected ? '#EF4444' : 'var(--border-color, rgba(255, 255, 255, 0.15))')};
  background: ${p => (p.$selected ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-input, transparent)')};
  color: ${p => (p.$selected ? '#EF4444' : 'var(--text-secondary, #94A3B8)')};
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ef4444;
    color: var(--text-primary, #ffffff);
  }
`;

export const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
  cursor: pointer;

  span {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-secondary, #e2e8f0);
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    accent-color: #ef4444;
    cursor: pointer;
  }
`;

export const SaveButton = styled.button`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #ffffff;
  border: none;
  border-radius: ${borderRadius.lg};
  padding: ${spacing[3]} ${spacing[8]};
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.35);
  transition: all 0.25s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(239, 68, 68, 0.45);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
    box-shadow: none;
  }
`;
