import styled from 'styled-components';
import { colors, mediaQueries, radius, shadows, spacing, transitions, typography } from './tokens';

export const AdminSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

export const StatusSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${spacing.md};

  ${mediaQueries.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const StatusItem = styled.div`
  background: ${colors.background.secondary};
  padding: ${spacing.md};
  border-radius: ${radius.lg};
  border: 1px solid ${colors.border};
`;

export const StatusLabel = styled.div`
  font-size: ${typography.sizes.xs};
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatusValue = styled.div`
  font-size: ${typography.sizes.xl};
  font-weight: ${typography.weights.bold};
  color: ${colors.text.primary};
`;

export const StatusValueSuccess = styled(StatusValue)`
  color: ${colors.success};
`;

export const SettingsGroups = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

export const SettingGroup = styled.div`
  background: ${colors.background.secondary};
  padding: ${spacing.lg};
  border-radius: ${radius.lg};
  box-shadow: ${shadows.sm};

  h4 {
    margin: 0 0 20px 0;
    font-size: ${typography.sizes.md};
    font-weight: ${typography.weights.semibold};
    color: ${colors.text.primary};
    border-bottom: 1px solid ${colors.border};
    padding-bottom: ${radius.xl};
  }
`;

export const SettingItem = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  label {
    display: block;
    font-size: ${typography.sizes.base};
    font-weight: ${typography.weights.medium};
    color: ${colors.text.primary};
    margin-bottom: ${spacing.sm};
  }

  input,
  select {
    width: 100%;
    padding: ${spacing.sm} ${radius.xl};
    border: 1px solid ${colors.border};
    border-radius: ${radius.sm};
    font-size: ${typography.sizes.base};
    transition: border-color ${transitions.durations?.short || '0.2s'};

    &:focus {
      outline: none;
      border-color: ${colors.primary};
    }
  }

  input[type='checkbox'] {
    width: auto;
    margin-right: ${spacing.sm};
  }
`;

export const BtnPrimary = styled.button`
  padding: ${radius.xl} ${spacing.lg};
  background: ${colors.primary};
  color: ${colors.background.secondary};
  border: none;
  border-radius: ${radius.sm};
  font-size: ${typography.sizes.base};
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: ${transitions.hover};

  &:hover {
    background: ${colors.primaryDark};
    box-shadow: ${shadows.luxuryGlow};
  }
`;

export const BtnSecondary = styled.button`
  padding: ${radius.xl} ${spacing.lg};
  background: ${colors.background.tertiary};
  color: ${colors.text.primary};
  border: none;
  border-radius: ${radius.sm};
  font-size: ${typography.sizes.base};
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  transition: ${transitions.hover};
  white-space: nowrap;

  &:hover {
    background: ${colors.border};
  }

  &:disabled {
    cursor: wait;
    opacity: 0.8;
  }

  ${mediaQueries.mobile} {
    width: 100%;
    justify-content: center;
  }
`;

export const SaveBtn = styled.button`
  padding: ${radius.xl} ${spacing.lg};
  background: ${colors.primary};
  color: ${colors.background.secondary};
  border: none;
  border-radius: ${radius.sm};
  font-size: ${typography.sizes.base};
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: ${transitions.hover};
  margin-top: ${radius.xl};

  &:hover {
    background: ${colors.primaryDark};
    box-shadow: ${shadows.luxuryGlow};
  }

  ${mediaQueries.mobile} {
    width: 100%;
    justify-content: center;
  }
`;
