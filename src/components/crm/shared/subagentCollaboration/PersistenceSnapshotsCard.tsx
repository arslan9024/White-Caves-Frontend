/**
 * PersistenceSnapshotsCard.tsx — Orchestration persistence snapshots card
 * Decomposed under AEGIS V5.1 AEG-042 (< 350 lines).
 */

import React, { type FC } from 'react';
import { Sparkles } from 'lucide-react';
import type {
  OrchestrationSnapshotComparePayload,
  OrchestrationSnapshotDetail,
  OrchestrationSnapshotRestorePreviewPayload,
  OrchestrationSnapshotRestoreRecommendationPayload,
  OrchestrationSnapshotSummary,
} from '../../../../services/subagentOrchestrationService';
import { cardStyle, chipStyle, mutedTextStyle } from './styles';
import { SnapshotInspectionPanels } from './SnapshotInspectionPanels';
import { SnapshotListItem } from './SnapshotListItem';

interface PersistenceSnapshotsCardProps {
  snapshots: OrchestrationSnapshotSummary[];
  snapshotSearch: string;
  setSnapshotSearch: (value: string) => void;
  snapshotOrder: 'asc' | 'desc';
  setSnapshotOrder: (value: 'asc' | 'desc') => void;
  snapshotLabelFilter: string | null;
  setSnapshotLabelFilter: (value: string | null) => void;
  snapshotCompareTarget: string;
  setSnapshotCompareTarget: (value: string) => void;
  snapshotHasMore: boolean;
  snapshotTotal: number;
  snapshotFacets: Array<{ label: string; count: number }>;
  snapshotAction: 'export' | 'restore' | 'delete' | 'detail' | null;
  selectedSnapshotFileName: string | null;
  setSelectedSnapshotFileName: (fileName: string | null) => void;
  selectedSnapshotDetail: OrchestrationSnapshotDetail | null;
  selectedSnapshotPreview: OrchestrationSnapshotRestorePreviewPayload | null;
  selectedSnapshotCompare: OrchestrationSnapshotComparePayload | null;
  selectedSnapshotRecommendation: OrchestrationSnapshotRestoreRecommendationPayload | null;
  onExportSnapshot: () => Promise<void>;
  onRestoreLatestSnapshot: (fileName?: string) => Promise<void>;
  onSelectSnapshot: (fileName: string) => Promise<void>;
  onDeleteSnapshot: (fileName: string) => Promise<void>;
  onPreviewSnapshotRestore: (fileName: string) => Promise<void>;
  onCompareSnapshot: (fileName: string) => Promise<void>;
  onRecommendSnapshotRestore: (fileName: string) => Promise<void>;
  onLoadMoreSnapshots: () => Promise<void>;
}

const selectStyle: React.CSSProperties = {
  background: 'rgba(15,23,42,0.5)',
  color: '#E2E8F0',
  border: '1px solid rgba(148,163,184,0.35)',
  borderRadius: 8,
  padding: '4px 8px',
  fontSize: 12,
};

export const PersistenceSnapshotsCard: FC<PersistenceSnapshotsCardProps> = ({
  snapshots,
  snapshotSearch,
  setSnapshotSearch,
  snapshotOrder,
  setSnapshotOrder,
  snapshotLabelFilter,
  setSnapshotLabelFilter,
  snapshotCompareTarget,
  setSnapshotCompareTarget,
  snapshotHasMore,
  snapshotTotal,
  snapshotFacets,
  snapshotAction,
  selectedSnapshotFileName,
  setSelectedSnapshotFileName,
  selectedSnapshotDetail,
  selectedSnapshotPreview,
  selectedSnapshotCompare,
  selectedSnapshotRecommendation,
  onExportSnapshot,
  onRestoreLatestSnapshot,
  onSelectSnapshot,
  onDeleteSnapshot,
  onPreviewSnapshotRestore,
  onCompareSnapshot,
  onRecommendSnapshotRestore,
  onLoadMoreSnapshots,
}) => {
  const isBusy = snapshotAction !== null;

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Sparkles size={16} color="#A78BFA" />
        <strong style={{ color: 'var(--color-e2e8f0, #E2E8F0)', fontSize: 13 }}>
          Persistence Snapshots
        </strong>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <button
          type="button"
          onClick={() => void onExportSnapshot()}
          disabled={isBusy}
          style={{
            border: '1px solid rgba(167,139,250,0.45)',
            background: 'rgba(124,58,237,0.16)',
            color: '#DDD6FE',
            borderRadius: 8,
            padding: '6px 10px',
            fontSize: 12,
            cursor: snapshotAction ? 'not-allowed' : 'pointer',
          }}
        >
          {snapshotAction === 'export' ? 'Exporting…' : 'Export Snapshot'}
        </button>
        <button
          type="button"
          onClick={() => void onRestoreLatestSnapshot()}
          disabled={isBusy || snapshots.length === 0}
          style={{
            border: '1px solid rgba(96,165,250,0.45)',
            background: 'rgba(37,99,235,0.16)',
            color: '#BFDBFE',
            borderRadius: 8,
            padding: '6px 10px',
            fontSize: 12,
            cursor: snapshotAction || snapshots.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          {snapshotAction === 'restore' ? 'Restoring…' : 'Restore Selected'}
        </button>
      </div>

      <input
        value={snapshotSearch}
        onChange={event => setSnapshotSearch(event.target.value)}
        placeholder="Search snapshots by label, filename, or timestamp"
        style={{
          width: '100%',
          marginBottom: 10,
          background: 'rgba(15,23,42,0.5)',
          color: '#E2E8F0',
          border: '1px solid rgba(148,163,184,0.35)',
          borderRadius: 8,
          padding: '8px 10px',
          fontSize: 12,
        }}
        aria-label="Search snapshots"
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <label style={{ ...mutedTextStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
          Order
          <select
            value={snapshotOrder}
            onChange={event => setSnapshotOrder(event.target.value as 'asc' | 'desc')}
            style={selectStyle}
            aria-label="Snapshot order"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
        <label style={{ ...mutedTextStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
          Compare target
          <select
            value={snapshotCompareTarget}
            onChange={event => setSnapshotCompareTarget(event.target.value)}
            style={selectStyle}
            aria-label="Snapshot compare target"
          >
            <option value="current">current state</option>
            {snapshots.slice(0, 20).map(snapshot => (
              <option key={snapshot.fileName} value={snapshot.fileName}>
                {snapshot.fileName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {snapshotFacets.length > 0 ? (
        <div style={{ marginBottom: 10 }}>
          <p style={{ ...mutedTextStyle, margin: '0 0 4px 0' }}>Labels</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <button
              type="button"
              onClick={() => setSnapshotLabelFilter(null)}
              style={{
                ...chipStyle,
                cursor: 'pointer',
                border:
                  snapshotLabelFilter === null
                    ? '1px solid rgba(250,204,21,0.55)'
                    : chipStyle.border,
                color: snapshotLabelFilter === null ? '#FDE68A' : chipStyle.color,
              }}
              aria-label="Filter snapshots by all labels"
            >
              all ({snapshotTotal})
            </button>
            {snapshotFacets.slice(0, 6).map(facet => (
              <button
                key={facet.label}
                type="button"
                onClick={() => setSnapshotLabelFilter(facet.label)}
                style={{
                  ...chipStyle,
                  cursor: 'pointer',
                  border:
                    snapshotLabelFilter === facet.label
                      ? '1px solid rgba(250,204,21,0.55)'
                      : chipStyle.border,
                  color: snapshotLabelFilter === facet.label ? '#FDE68A' : chipStyle.color,
                }}
                aria-label={`Filter snapshots by label ${facet.label}`}
              >
                {facet.label} ({facet.count})
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {snapshots.length > 0 ? (
        <ul
          style={{
            margin: 0,
            paddingLeft: 16,
            color: 'var(--color-cbd5e1, #CBD5E1)',
            fontSize: 12,
          }}
        >
          {snapshots.map(snapshot => (
            <SnapshotListItem
              key={snapshot.fileName}
              snapshot={snapshot}
              isSelected={selectedSnapshotFileName === snapshot.fileName}
              isBusy={isBusy}
              onSelect={onSelectSnapshot}
              onRestore={fileName => {
                setSelectedSnapshotFileName(fileName);
                return onRestoreLatestSnapshot(fileName);
              }}
              onDelete={onDeleteSnapshot}
              onPreview={onPreviewSnapshotRestore}
              onCompare={onCompareSnapshot}
              onRecommend={onRecommendSnapshotRestore}
            />
          ))}
        </ul>
      ) : (
        <p style={mutedTextStyle}>No orchestration snapshots available yet.</p>
      )}

      <p style={{ ...mutedTextStyle, marginTop: 8 }}>
        Showing {snapshots.length} of {snapshotTotal} snapshots
      </p>

      {snapshotHasMore ? (
        <button
          type="button"
          onClick={() => void onLoadMoreSnapshots()}
          disabled={isBusy}
          style={{
            marginTop: 8,
            border: '1px solid rgba(148,163,184,0.38)',
            background: 'rgba(15,23,42,0.45)',
            color: '#CBD5E1',
            borderRadius: 8,
            padding: '6px 10px',
            fontSize: 12,
            cursor: snapshotAction ? 'not-allowed' : 'pointer',
          }}
        >
          Load More Snapshots
        </button>
      ) : null}

      <SnapshotInspectionPanels
        selectedSnapshotDetail={selectedSnapshotDetail}
        selectedSnapshotPreview={selectedSnapshotPreview}
        selectedSnapshotCompare={selectedSnapshotCompare}
        selectedSnapshotRecommendation={selectedSnapshotRecommendation}
      />
    </div>
  );
};
