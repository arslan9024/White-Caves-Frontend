/**
 * FormField.styles.ts — Styled primitives & strength config for FormField
 * Extracted for AEGIS AEG-042 (< 350 lines single-purpose compliance).
 */

import styled, { css, keyframes } from 'styled-components';
import type { PasswordStrength } from '@/utils/validation';
import { spacing } from '../../../styles/theme/spacing';

interface FormFieldThemeTokens {
  typography?: {
    fontFamily?: { primary?: string };
    sizes?: { sm?: string; base?: string };
    weights?: { medium?: number };
  };
  colors?: {
    text?: { primary?: string; tertiary?: string; disabled?: string };
    background?: { primary?: string; secondary?: string };
    error?: string;
    success?: string;
    border?: string;
    primary?: string;
  };
  spacing?: { sm?: string; md?: string };
  radius?: { input?: string };
}

const getTheme = (theme: unknown): FormFieldThemeTokens =>
  (theme as FormFieldThemeTokens | undefined) ?? {};

export const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  width: 100%;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-family: ${p => getTheme(p.theme).typography?.fontFamily?.primary || '"Inter", sans-serif'};
  font-size: ${p => getTheme(p.theme).typography?.sizes?.sm || '14px'};
  font-weight: ${p => getTheme(p.theme).typography?.weights?.medium || 500};
  color: ${p => getTheme(p.theme).colors?.text?.primary || '#1a1a1a'};
  line-height: 1.4;
`;

export const RequiredStar = styled.span`
  color: ${p => getTheme(p.theme).colors?.error || '#B71C1C'};
  margin-left: 2px;
`;

export const CharCount = styled.span<{ $over: boolean }>`
  font-size: 12px;
  color: ${p =>
    p.$over
      ? getTheme(p.theme).colors?.error || '#B71C1C'
      : getTheme(p.theme).colors?.text?.tertiary || '#999'};
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const inputBaseStyles = css<{ $hasError: boolean; $isValid: boolean }>`
  width: 100%;
  padding: ${p => getTheme(p.theme).spacing?.sm || '8px'}
    ${p => getTheme(p.theme).spacing?.md || '16px'};
  font-family: ${p => getTheme(p.theme).typography?.fontFamily?.primary || '"Inter", sans-serif'};
  font-size: ${p => getTheme(p.theme).typography?.sizes?.base || '16px'};
  color: ${p => getTheme(p.theme).colors?.text?.primary || '#1a1a1a'};
  background: ${p => getTheme(p.theme).colors?.background?.primary || '#fff'};
  border: 1.5px solid
    ${p =>
      p.$hasError
        ? getTheme(p.theme).colors?.error || '#B71C1C'
        : p.$isValid
          ? getTheme(p.theme).colors?.success || '#2E7D32'
          : getTheme(p.theme).colors?.border || '#d0d0d0'};
  border-radius: ${p => getTheme(p.theme).radius?.input || '6px'};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  outline: none;

  &::placeholder {
    color: ${p => getTheme(p.theme).colors?.text?.disabled || '#bbb'};
  }

  &:focus {
    border-color: ${p =>
      p.$hasError
        ? getTheme(p.theme).colors?.error || '#EF4444'
        : getTheme(p.theme).colors?.primary || '#C9A84C'};
    box-shadow: 0 0 0 3px
      ${p => (p.$hasError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(201, 168, 76, 0.2)')};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    background: ${p => getTheme(p.theme).colors?.background?.secondary || '#f5f5f5'};
  }

  ${p =>
    p.$hasError &&
    css`
      animation: ${shake} 0.3s ease;
    `}
`;

export const StyledInput = styled.input<{ $hasError: boolean; $isValid: boolean }>`
  ${inputBaseStyles}
`;

export const StyledTextarea = styled.textarea<{ $hasError: boolean; $isValid: boolean }>`
  ${inputBaseStyles}
  min-height: 100px;
  resize: vertical;
`;

export const StyledSelect = styled.select<{ $hasError: boolean; $isValid: boolean }>`
  ${inputBaseStyles}
  cursor: pointer;
`;

export const TogglePasswordBtn = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${p => getTheme(p.theme).colors?.text?.tertiary || '#999'};
  padding: ${spacing.xs};
  display: flex;
  align-items: center;

  &:hover {
    color: ${p => getTheme(p.theme).colors?.text?.primary || '#1a1a1a'};
  }
`;

export const ErrorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  color: ${p => getTheme(p.theme).colors?.error || '#B71C1C'};
  font-size: 13px;
  min-height: 20px;
`;

export const HintText = styled.span`
  font-size: 12px;
  color: ${p => getTheme(p.theme).colors?.text?.tertiary || '#999'};
`;

export const ValidIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${p => getTheme(p.theme).colors?.success || '#2E7D32'};
  display: flex;
  align-items: center;
`;

export const StrengthBar = styled.div`
  display: flex;
  gap: ${spacing.xs};
  margin-top: 4px;
`;

export const StrengthSegment = styled.div<{ $active: boolean; $color: string }>`
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: ${p => (p.$active ? p.$color : getTheme(p.theme).colors?.border || '#e0e0e0')};
  transition: background 0.3s ease;
`;

export const StrengthLabel = styled.span<{ $color: string }>`
  font-size: 12px;
  font-weight: 500;
  color: ${p => p.$color};
  margin-top: 2px;
`;

export const STRENGTH_CONFIG: Record<
  PasswordStrength,
  { color: string; segments: number; label: string }
> = {
  weak: { color: '#B71C1C', segments: 1, label: 'Weak' },
  fair: { color: '#E65100', segments: 2, label: 'Fair' },
  good: { color: '#F9A825', segments: 3, label: 'Good' },
  strong: { color: '#2E7D32', segments: 4, label: 'Strong' },
};
