import styled from 'styled-components';

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftJourneyCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const RightPreviewCol = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 1rem;
  max-height: calc(100vh - 8rem);
`;

export const PreviewToolbar = styled.div`
  background: #0f172a;
  color: #ffffff;
  padding: 8px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  .page-tabs {
    display: flex;
    gap: 4px;
  }
  .zoom-box {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const PageTabBtn = styled.button<{ $active: boolean }>`
  background: ${props => (props.$active ? '#EF4444' : 'rgba(255, 255, 255, 0.12)')};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${props => (props.$active ? '#DC2626' : 'rgba(255, 255, 255, 0.25)')};
  }
`;

export const PreviewScrollArea = styled.div`
  padding: 1.25rem;
  background: #cbd5e1;
  overflow-y: auto;
  flex: 1;
  display: flex;
  justify-content: center;
`;

export const PreviewScaler = styled.div<{ $zoom: number }>`
  transform: scale(${props => props.$zoom});
  transform-origin: top center;
  transition: transform 0.2s ease;
`;

export const StepperNav = styled.div`
  display: flex;
  gap: 6px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 6px;
  overflow-x: auto;
`;

export const StepBtn = styled.button<{ $active: boolean; $completed: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: ${props => {
    if (props.$active) return 'linear-gradient(135deg, #EF4444, #DC2626)';
    if (props.$completed) return 'rgba(16, 185, 129, 0.1)';
    return 'transparent';
  }};
  color: ${props => {
    if (props.$active) return '#FFFFFF';
    if (props.$completed) return '#059669';
    return '#64748B';
  }};
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover {
    background: ${props => (props.$active ? '#DC2626' : '#F1F5F9')};
  }
`;

export const FormCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGrid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols || 2}, 1fr);
  gap: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #475569;
    .ar {
      color: #94a3b8;
      font-size: 0.7rem;
      margin-left: 4px;
      direction: rtl;
    }
  }

  input,
  select,
  textarea {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #0f172a;
    outline: none;
    transition: border 0.15s ease;

    &:focus {
      border-color: #ef4444;
      background: #ffffff;
    }
  }
`;

export const BottomActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

export const PrimaryBtn = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  ${props => {
    if (props.$variant === 'primary') {
      return `
        background: linear-gradient(135deg, #EF4444, #DC2626);
        color: #FFFFFF;
        border: none;
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
        &:hover { opacity: 0.92; }
      `;
    }
    if (props.$variant === 'danger') {
      return `
        background: #FEE2E2;
        color: #DC2626;
        border: 1px solid #FCA5A5;
        &:hover { background: #FECACA; }
      `;
    }
    return `
      background: #FFFFFF;
      color: #334155;
      border: 1px solid #CBD5E1;
      &:hover { background: #F8FAFC; border-color: #94A3B8; }
    `;
  }}
`;
