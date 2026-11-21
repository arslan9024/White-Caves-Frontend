import React, { type FC } from 'react';
import type {
  OrchestrationSnapshotComparePayload,
  OrchestrationSnapshotDetail,
  OrchestrationSnapshotRestorePreviewPayload,
  OrchestrationSnapshotRestoreRecommendationPayload,
} from '../../../../services/subagentOrchestrationService';
import { mutedTextStyle } from './styles';

interface SnapshotInspectionPanelsProps {
  selectedSnapshotDetail: OrchestrationSnapshotDetail | null;
  selectedSnapshotPreview: OrchestrationSnapshotRestorePreviewPayload | null;
  selectedSnapshotCompare: OrchestrationSnapshotComparePayload | null;
  selectedSnapshotRecommendation: OrchestrationSnapshotRestoreRecommendationPayload | null;
}

const detailDividerStyle: React.CSSProperties = {
  marginTop: 10,
  borderTop: '1px solid rgba(255,255,255,0.08)',
  paddingTop: 10,
};

export const SnapshotInspectionPanels: FC<SnapshotInspectionPanelsProps> = ({
  selectedSnapshotDetail,
  selectedSnapshotPreview,
  selectedSnapshotCompare,
  selectedSnapshotRecommendation,
}) => (
  <>
    {selectedSnapshotDetail ? (
      <div style={detailDividerStyle}>
        <p style={{ color: 'var(--color-e2e8f0, #E2E8F0)', margin: '0 0 4px 0', fontSize: 12 }}>
          <strong>Snapshot detail:</strong> {selectedSnapshotDetail.fileName}
        </p>
        {selectedSnapshotDetail.label ? (
          <p style={mutedTextStyle}>Label: {selectedSnapshotDetail.label}</p>
        ) : null}
        <p style={mutedTextStyle}>
          Tasks: <strong>{selectedSnapshotDetail.taskCount}</strong> · Running:{' '}
          <strong>{selectedSnapshotDetail.metrics.runningTasks}</strong> · Done:{' '}
          <strong>{selectedSnapshotDetail.metrics.doneTasks}</strong>
        </p>
        <p style={{ ...mutedTextStyle, marginBottom: 0 }}>
          Premium consumed: <strong>{selectedSnapshotDetail.quota.premiumConsumedToday}</strong> ·
          Weekly remaining: <strong>{selectedSnapshotDetail.quota.weeklyPremiumRemaining}</strong>
        </p>
      </div>
    ) : null}

    {selectedSnapshotPreview ? (
      <div style={detailDividerStyle}>
        <p style={{ color: 'var(--color-e2e8f0, #E2E8F0)', margin: '0 0 4px 0', fontSize: 12 }}>
          <strong>Restore preview:</strong> {selectedSnapshotPreview.snapshot.fileName}
        </p>
        <p style={mutedTextStyle}>
          Δ Total tasks: <strong>{selectedSnapshotPreview.delta.totalTasks}</strong> · Δ Running:{' '}
          <strong>{selectedSnapshotPreview.delta.runningTasks}</strong> · Δ Done:{' '}
          <strong>{selectedSnapshotPreview.delta.doneTasks}</strong>
        </p>
        <p style={{ ...mutedTextStyle, marginBottom: 0 }}>
          Δ Premium consumed today:{' '}
          <strong>{selectedSnapshotPreview.delta.premiumConsumedToday}</strong>
        </p>
      </div>
    ) : null}

    {selectedSnapshotCompare ? (
      <div style={detailDividerStyle}>
        <p style={{ color: 'var(--color-e2e8f0, #E2E8F0)', margin: '0 0 4px 0', fontSize: 12 }}>
          <strong>Snapshot compare:</strong> {selectedSnapshotCompare.source.snapshot.fileName} →{' '}
          {selectedSnapshotCompare.target.kind === 'current'
            ? 'current state'
            : selectedSnapshotCompare.target.snapshot?.fileName}
        </p>
        <p style={mutedTextStyle}>
          Δ Total tasks: <strong>{selectedSnapshotCompare.delta.totalTasks}</strong> · Δ Running:{' '}
          <strong>{selectedSnapshotCompare.delta.runningTasks}</strong> · Δ Premium tasks:{' '}
          <strong>{selectedSnapshotCompare.delta.premiumTasks}</strong>
        </p>
        <p style={{ ...mutedTextStyle, marginBottom: 0 }}>
          Δ Weekly premium remaining:{' '}
          <strong>{selectedSnapshotCompare.delta.weeklyPremiumRemaining}</strong>
        </p>
      </div>
    ) : null}

    {selectedSnapshotRecommendation ? (
      <div style={detailDividerStyle}>
        <p style={{ color: 'var(--color-e2e8f0, #E2E8F0)', margin: '0 0 4px 0', fontSize: 12 }}>
          <strong>Restore recommendation:</strong> {selectedSnapshotRecommendation.source.fileName}{' '}
          → {selectedSnapshotRecommendation.target}
        </p>
        <p style={mutedTextStyle}>
          Decision: <strong>{selectedSnapshotRecommendation.recommendation.decision}</strong> ·
          Score: <strong>{selectedSnapshotRecommendation.recommendation.score}</strong>
        </p>
        <p style={{ ...mutedTextStyle, marginBottom: 0 }}>
          {selectedSnapshotRecommendation.recommendation.reasons.slice(0, 2).join(' · ')}
        </p>
      </div>
    ) : null}
  </>
);
