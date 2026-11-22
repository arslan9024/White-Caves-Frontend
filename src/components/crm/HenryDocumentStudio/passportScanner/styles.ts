import styled from 'styled-components';

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
    font-size: 0.72rem;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;

    .ar {
      color: #94a3b8;
      font-size: 0.7rem;
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
      border-color: #3b82f6;
      background: #ffffff;
    }
  }
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

export const PreviewHeader = styled.div`
  background: #0f172a;
  color: #ffffff;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 0.82rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .controls {
    display: flex;
    gap: 6px;
    align-items: center;
  }
`;

export const PreviewBody = styled.div`
  padding: 1.25rem;
  background: #e2e8f0;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 420px;
`;

export const PassportDigitalCard = styled.div`
  background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
  border: 2px solid #60a5fa;
  border-radius: 12px;
  padding: 1.25rem;
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(30, 58, 138, 0.3);
  width: 100%;
  max-width: 440px;
  box-sizing: border-box;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 8px;
    margin-bottom: 12px;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 1px;
    color: #93c5fd;
  }

  .passport-no {
    font-family: monospace;
    font-size: 1.3rem;
    font-weight: 900;
    letter-spacing: 2px;
    color: #f8fafc;
    margin: 6px 0;
  }

  .name {
    font-size: 1.05rem;
    font-weight: 800;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px dashed rgba(255, 255, 255, 0.15);
    font-size: 0.75rem;
    color: #93c5fd;
  }
`;

export const MrzBox = styled.div`
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 8px 10px;
  font-family: monospace;
  font-size: 0.78rem;
  color: #60a5fa;
  line-height: 1.35;
  white-space: pre-wrap;
  word-break: break-all;
  width: 100%;
  box-sizing: border-box;
`;

export const BottomActionBar = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
`;

export const ActionBtn = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.15s ease;

  ${props => {
    if (props.$variant === 'primary') {
      return `
        background: linear-gradient(135deg, #3B82F6, #2563EB);
        color: #FFFFFF;
        box-shadow: 0 2px 6px rgba(59, 130, 246, 0.25);
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
