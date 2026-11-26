import styled from 'styled-components';

export const SubItemCard = styled.div<{
  $color?: string;
  $isDragging?: boolean;
  $isDragOver?: boolean;
  $isPool?: boolean;
}>`
  background: var(--bg-card, #070d18);
  border: 1px solid
    ${({ $isPool, $color }) =>
      $isPool ? 'rgba(255, 255, 255, 0.08)' : $color ? `${$color}44` : 'rgba(255, 255, 255, 0.08)'};
  border-left: 3px solid ${({ $isPool, $color }) => ($isPool ? '#64748B' : $color || '#EF4444')};
  border-radius: 8px;
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.15s ease;
  user-select: none;
  cursor: grab;

  ${({ $isDragging }) =>
    $isDragging && `opacity: 0.35; border-style: dashed; transform: scale(0.98);`}
  ${({ $isDragOver, $color }) =>
    $isDragOver &&
    `border: 2px dashed ${$color || '#EF4444'}; transform: scale(1.02); box-shadow: 0 4px 16px rgba(239, 68, 68, 0.2);`}

  [data-theme='light'] & {
    background: ${({ $isPool }) => ($isPool ? '#F1F5F9' : '#F8FAFC')};
    border-color: #e2e8f0;
    border-left-color: ${({ $isPool, $color }) => ($isPool ? '#94A3B8' : $color || '#EF4444')};
  }

  &:hover {
    border-color: ${({ $color }) => $color || '#EF4444'};
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  }

  .sub-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .top-left {
      display: flex;
      align-items: center;
      gap: 6px;

      .drag-handle {
        color: var(--text-muted, #64748b);
        display: flex;
        align-items: center;
        cursor: grab;
        &:hover {
          color: #ef4444;
        }
      }

      .index-pill {
        font-size: 0.65rem;
        font-weight: 800;
        color: ${({ $isPool }) => ($isPool ? '#94A3B8' : '#EF4444')};
        background: ${({ $isPool }) =>
          $isPool ? 'rgba(148, 163, 184, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
        padding: 1px 6px;
        border-radius: 4px;
      }
    }

    .top-actions {
      display: flex;
      align-items: center;
      gap: 6px;

      .status-pill {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.62rem;
        font-weight: 700;
        color: ${({ $isPool }) => ($isPool ? '#F59E0B' : '#10B981')};
        background: ${({ $isPool }) =>
          $isPool ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
        padding: 2px 6px;
        border-radius: 9999px;

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${({ $isPool }) => ($isPool ? '#F59E0B' : '#10B981')};
        }
      }

      .pool-btn {
        background: transparent;
        border: none;
        color: var(--text-muted, #64748b);
        cursor: pointer;
        padding: 2px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        &:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }
      }
    }
  }

  .sub-info {
    display: flex;
    flex-direction: column;

    .name {
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--text-primary, #ffffff);
      [data-theme='light'] & {
        color: #0f172a;
      }
    }

    .title {
      font-size: 0.72rem;
      font-weight: 600;
      color: ${({ $isPool, $color }) => ($isPool ? '#94A3B8' : $color || '#EF4444')};
      margin-top: 1px;
    }

    .specialty {
      font-size: 0.68rem;
      color: var(--text-muted, #94a3b8);
      margin-top: 2px;
      [data-theme='light'] & {
        color: #64748b;
      }
    }
  }

  .tasks-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    .task-tag {
      font-size: 0.62rem;
      color: var(--text-muted, #94a3b8);
      background: var(--bg-secondary, rgba(255, 255, 255, 0.05));
      border: 1px solid var(--border-color, rgba(255, 255, 255, 0.06));
      padding: 1px 5px;
      border-radius: 4px;
      [data-theme='light'] & {
        background: #ffffff;
        border: 1px solid #cbd5e1;
        color: #475569;
      }
    }
  }

  .sub-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 6px;
    border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
    font-size: 0.65rem;
    color: var(--text-muted, #64748b);
    [data-theme='light'] & {
      border-top: 1px solid #e2e8f0;
    }

    .sla {
      font-family: monospace;
    }
    .accuracy {
      font-weight: 700;
      color: #10b981;
    }
  }
`;
