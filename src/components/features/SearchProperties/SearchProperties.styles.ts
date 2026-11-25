/**
 * SearchProperties.styles.ts — Styled primitives for SearchProperties
 * Single-purpose module (< 350 lines, AEG-042).
 */

import styled from 'styled-components';

type ThemeShape = {
  colors?: {
    backgroundAlt?: string;
    textPrimary?: string;
    textSecondary?: string;
    border?: string;
    cardBg?: string;
    primary?: string;
  };
  fonts?: { family?: string };
};

export const Container = styled.div`
  padding: 24px;
  background: ${({ theme }) => String((theme as ThemeShape)?.colors?.backgroundAlt ?? '#f9fafb')};
  color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textPrimary ?? '#1f2937')};
  overflow-y: auto;
  height: 100%;
`;

export const Header = styled.div`
  margin-bottom: 32px;

  h1 {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textPrimary ?? '#1f2937')};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  p {
    margin: 0;
    color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textSecondary ?? '#6b7280')};
    font-size: 14px;
  }
`;

export const SearchForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  margin-bottom: 24px;
`;

export const SearchInput = styled.input`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => String((theme as ThemeShape)?.colors?.border ?? '#e5e7eb')};
  border-radius: 6px;
  background: ${({ theme }) => String((theme as ThemeShape)?.colors?.cardBg ?? '#ffffff')};
  color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textPrimary ?? '#1f2937')};
  font-family: ${props => (props.theme as ThemeShape)?.fonts?.family ?? 'inherit'};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${props => (props.theme as ThemeShape)?.colors?.primary || '#EF4444'};
    box-shadow: 0 0 0 3px ${props => (props.theme as ThemeShape)?.colors?.primary || '#EF4444'}20;
  }

  &::placeholder {
    color: ${props => (props.theme as ThemeShape)?.colors?.textSecondary || '#6b7280'};
  }
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  background: ${props => (props.theme as ThemeShape)?.colors?.primary || '#EF4444'};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

export const FilterSection = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => String((theme as ThemeShape)?.colors?.border ?? '#e5e7eb')};

  h3 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${props => (props.theme as ThemeShape)?.colors?.textSecondary || '#6b7280'};
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`;

export const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textPrimary ?? '#1f2937')};
  font-size: 14px;

  input {
    cursor: pointer;
  }

  &:hover {
    color: ${props => (props.theme as ThemeShape)?.colors?.primary || '#EF4444'};
  }
`;

export const ResultsSection = styled.div`
  margin-top: 24px;
`;

export const ResultsHeader = styled.h2`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textPrimary ?? '#1f2937')};
`;

export const ResultsList = styled.div`
  display: grid;
  gap: 12px;
`;

export const ResultCard = styled.div`
  background: ${({ theme }) => String((theme as ThemeShape)?.colors?.cardBg ?? '#ffffff')};
  border: 1px solid ${({ theme }) => String((theme as ThemeShape)?.colors?.border ?? '#e5e7eb')};
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => (props.theme as ThemeShape)?.colors?.primary || '#EF4444'};
    box-shadow: 0 2px 8px ${props => (props.theme as ThemeShape)?.colors?.primary || '#EF4444'}20;
  }

  .property-name {
    font-weight: 600;
    color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textPrimary ?? '#1f2937')};
    margin-bottom: 4px;
  }

  .property-location {
    font-size: 13px;
    color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textSecondary ?? '#6b7280')};
    margin-bottom: 8px;
  }

  .property-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding-top: 12px;
    border-top: 1px solid ${props => (props.theme as ThemeShape)?.colors?.border || '#e5e7eb'};
  }

  .detail {
    font-size: 13px;

    .label {
      color: ${props => (props.theme as ThemeShape)?.colors?.textSecondary || '#6b7280'};
      display: block;
      margin-bottom: 2px;
    }

    .value {
      color: ${props => (props.theme as ThemeShape)?.colors?.primary || '#EF4444'};
      font-weight: 600;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textSecondary ?? '#6b7280')};

  .icon {
    display: inline-flex;
    justify-content: center;
    margin-bottom: 12px;
    color: #ef4444;
  }

  h3 {
    margin: 0 0 8px 0;
    color: ${({ theme }) => String((theme as ThemeShape)?.colors?.textPrimary ?? '#1f2937')};
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;
