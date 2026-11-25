/**
 * SnapshotListItem.tsx — Single orchestration snapshot item with action pills
 * Single-purpose companion to PersistenceSnapshotsCard (< 350 lines, AEG-042).
 */

import React, { type FC } from 'react';
import type { OrchestrationSnapshotSummary } from '../../../../services/subagentOrchestrationService';
import { mutedTextStyle } from './styles';

interface SnapshotListItemProps {
  snapshot: OrchestrationSnapshotSummary;
  isSelected: boolean;
  isBusy: boolean;
  onSelect: (fileName: string) => Promise<void>;
  onRestore: (fileName: string) => Promise<void>;
  onDelete: (fileName: string) => Promise<void>;
  onPreview: (fileName: string) => Promise<void>;
  onCompare: (fileName: string) => Promise<void>;
  onRecommend: (fileName: string) => Promise<void>;
}

const pillBtn = (
  border: string,
  background: string,
  color: string,
  disabled: boolean
): React.CSSProperties => ({
  border,
  background,
  color,
  borderRadius: 999,
  padding: '3px 8px',
  fontSize: 11,
  cursor: disabled ? 'not-allowed' : 'pointer',
});

export const SnapshotListItem: FC<SnapshotListItemProps> = ({
  snapshot,
  isSelected,
  isBusy,
  onSelect,
  onRestore,
  onDelete,
  onPreview,
  onCompare,
  onRecommend,
}) => (
  <li style={{ marginBottom: 6 }}>
    <strong>
      {snapshot.fileName}
      {isSelected ? ' · selected' : ''}
    </strong>
    <br />
    <span style={mutedTextStyle}>
      Tasks: {snapshot.taskCount}
      {snapshot.label ? ` · Label: ${snapshot.label}` : ''} · Created: {snapshot.createdAt}
    </span>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
      <button
        type="button"
        onClick={() => void onSelect(snapshot.fileName)}
        disabled={isBusy}
        style={pillBtn(
          '1px solid rgba(148,163,184,0.38)',
          'rgba(15,23,42,0.45)',
          '#CBD5E1',
          isBusy
        )}
        aria-label={`Inspect snapshot ${snapshot.fileName}`}
      >
        Inspect
      </button>
      <button
        type="button"
        onClick={() => void onRestore(snapshot.fileName)}
        disabled={isBusy}
        style={pillBtn(
          '1px solid rgba(96,165,250,0.38)',
          'rgba(30,64,175,0.22)',
          '#BFDBFE',
          isBusy
        )}
        aria-label={`Restore snapshot ${snapshot.fileName}`}
      >
        Restore
      </button>
      <button
        type="button"
        onClick={() => void onDelete(snapshot.fileName)}
        disabled={isBusy}
        style={pillBtn(
          '1px solid rgba(248,113,113,0.38)',
          'rgba(127,29,29,0.25)',
          '#FCA5A5',
          isBusy
        )}
        aria-label={`Delete snapshot ${snapshot.fileName}`}
      >
        Delete
      </button>
      <button
        type="button"
        onClick={() => void onPreview(snapshot.fileName)}
        disabled={isBusy}
        style={pillBtn(
          '1px solid rgba(251,191,36,0.38)',
          'rgba(146,64,14,0.22)',
          '#FDE68A',
          isBusy
        )}
        aria-label={`Preview restore impact for snapshot ${snapshot.fileName}`}
      >
        Preview
      </button>
      <button
        type="button"
        onClick={() => void onCompare(snapshot.fileName)}
        disabled={isBusy}
        style={pillBtn(
          '1px solid rgba(56,189,248,0.38)',
          'rgba(12,74,110,0.22)',
          '#BAE6FD',
          isBusy
        )}
        aria-label={`Compare snapshot ${snapshot.fileName} with current state`}
      >
        Compare
      </button>
      <button
        type="button"
        onClick={() => void onRecommend(snapshot.fileName)}
        disabled={isBusy}
        style={pillBtn('1px solid rgba(16,185,129,0.38)', 'rgba(6,78,59,0.22)', '#A7F3D0', isBusy)}
        aria-label={`Recommend restore plan for snapshot ${snapshot.fileName}`}
      >
        Recommend
      </button>
    </div>
  </li>
);

export default SnapshotListItem;
