import styled from 'styled-components';

export const UploaderContainer = styled.div<{ $accentColor: string }>`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;

  .title-group {
    h4 {
      margin: 0 0 2px 0;
      font-size: 0.95rem;
      font-weight: 800;
      color: #0f172a;
    }
    p {
      margin: 0;
      font-size: 0.78rem;
      color: #64748b;
    }
  }
`;

export const DropzoneBox = styled.div<{ $isDragOver: boolean; $accentColor: string }>`
  border: 2px dashed ${props => (props.$isDragOver ? props.$accentColor : '#CBD5E1')};
  background: ${props => (props.$isDragOver ? 'rgba(239, 68, 68, 0.05)' : '#F8FAFC')};
  border-radius: 10px;
  padding: 1.5rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.$accentColor};
    background: #f1f5f9;
  }

  .dropzone-icon {
    margin-bottom: 0.5rem;
  }
  .dropzone-text {
    font-size: 0.85rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 2px;
  }
  .dropzone-sub {
    font-size: 0.75rem;
    color: #94a3b8;
  }
`;

export const ExtractedSummaryBox = styled.div<{ $accentColor: string }>`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;

  .summary-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 800;
    color: ${props => props.$accentColor};
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .fields-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.75rem;
  }

  .field-item {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 6px 10px;

    .field-label {
      font-size: 0.7rem;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
    }
    .field-value {
      font-size: 0.85rem;
      font-weight: 800;
      color: #0f172a;
      margin-top: 1px;
      word-break: break-word;
    }
  }
`;

export const ActionToolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f5f9;
`;

export const ActionBtn = styled.button<{
  $variant?: 'primary' | 'secondary' | 'danger';
  $accentColor?: string;
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  ${props => {
    if (props.$variant === 'primary') {
      return `
        background: ${props.$accentColor || '#EF4444'};
        color: #FFFFFF;
        border: none;
        box-shadow: 0 2px 6px rgba(239, 68, 68, 0.25);
        &:hover { opacity: 0.9; }
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
      color: #475569;
      border: 1px solid #CBD5E1;
      &:hover { background: #F8FAFC; border-color: #94A3B8; }
    `;
  }}
`;
