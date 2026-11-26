import styled from 'styled-components';

export { SubItemCard } from './DepartmentSubItemCard.styles';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContainer = styled.div<{ $color?: string }>`
  width: 100%;
  max-width: 1060px;
  max-height: 88vh;
  background: var(--bg-card, #0b1120);
  border: 1.5px solid ${({ $color }) => ($color ? `${$color}66` : 'rgba(239, 68, 68, 0.3)')};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
  animation: scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  [data-theme='light'] & {
    background: #ffffff;
    border-color: ${({ $color }) => $color || '#EF4444'};
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.97) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

export const ModalHeader = styled.div<{ $color?: string }>`
  padding: 14px 20px;
  border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ $color }) => ($color ? `${$color}0D` : 'transparent')};

  [data-theme='light'] & {
    border-bottom: 1px solid #e2e8f0;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .icon-wrap {
      width: 38px;
      height: 38px;
      border-radius: 8px;
      background: ${({ $color }) => ($color ? `${$color}22` : 'rgba(239, 68, 68, 0.15)')};
      color: ${({ $color }) => $color || '#EF4444'};
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .title-group {
      display: flex;
      flex-direction: column;

      .badge-row {
        display: flex;
        align-items: center;
        gap: 6px;

        .dept-code {
          font-size: 0.65rem;
          font-family: monospace;
          font-weight: 800;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.12);
          padding: 1px 6px;
          border-radius: 4px;
        }

        .count-tag {
          font-size: 0.65rem;
          color: var(--text-muted, #94a3b8);
          font-weight: 700;
        }
      }

      h2 {
        margin: 2px 0 0 0;
        font-size: 1.1rem;
        font-weight: 900;
        color: var(--text-primary, #ffffff);
        [data-theme='light'] & {
          color: #0f172a;
        }
      }
    }
  }

  .close-btn {
    background: transparent;
    border: none;
    color: var(--text-muted, #64748b);
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.15s ease;
    &:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }
  }
`;

export const ModalScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(239, 68, 68, 0.25);
    border-radius: 4px;
  }
`;

export const SubItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 10px;
`;

export const UnassignedPoolSection = styled.div`
  margin-top: 8px;
  padding-top: 14px;
  border-top: 1.5px dashed var(--border-color, rgba(255, 255, 255, 0.12));
  display: flex;
  flex-direction: column;
  gap: 10px;

  [data-theme='light'] & {
    border-top: 1.5px dashed #cbd5e1;
  }

  .pool-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;

    .pool-heading {
      display: flex;
      align-items: center;
      gap: 8px;

      h3 {
        margin: 0;
        font-size: 0.92rem;
        font-weight: 800;
        color: var(--text-primary, #ffffff);
        [data-theme='light'] & {
          color: #0f172a;
        }
      }

      .pool-count-tag {
        font-size: 0.65rem;
        font-weight: 800;
        background: rgba(245, 158, 11, 0.15);
        color: #f59e0b;
        padding: 2px 7px;
        border-radius: 9999px;
      }
    }

    .pool-hint {
      font-size: 0.72rem;
      color: var(--text-muted, #94a3b8);
    }
  }
`;
