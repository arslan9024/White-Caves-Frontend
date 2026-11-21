import React, { memo } from 'react';
import { useSubagentCollaboration } from './subagentCollaboration/useSubagentCollaboration';
import { OverviewTelemetryCards } from './subagentCollaboration/OverviewTelemetryCards';
import { PersistenceSnapshotsCard } from './subagentCollaboration/PersistenceSnapshotsCard';
import { RoutingAndTaskCards } from './subagentCollaboration/RoutingAndTaskCards';

interface SubagentCollaborationPanelProps {
  assistantId?: string;
  weeklyPremiumRemaining?: number;
  businessDaysRemaining?: number;
}

const SubagentCollaborationPanel = memo(
  ({
    assistantId,
    weeklyPremiumRemaining = 48,
    businessDaysRemaining = 5,
  }: SubagentCollaborationPanelProps) => {
    const state = useSubagentCollaboration({
      assistantId,
      weeklyPremiumRemaining,
      businessDaysRemaining,
    });

    return (
      <section aria-label="Subagent collaboration panel">
        <OverviewTelemetryCards
          profile={state.profile}
          isLoading={state.isLoading}
          statusError={state.statusError}
          statusData={state.statusData}
          weeklyPremiumRemaining={weeklyPremiumRemaining}
          businessDaysRemaining={businessDaysRemaining}
          dailyPremiumCap={state.dailyPremiumCap}
          premiumConsumedToday={state.premiumConsumedToday}
          premiumRemainingToday={state.premiumRemainingToday}
          runtimeMetrics={state.runtimeMetrics}
        />

        <PersistenceSnapshotsCard
          snapshots={state.snapshots}
          snapshotSearch={state.snapshotSearch}
          setSnapshotSearch={state.setSnapshotSearch}
          snapshotOrder={state.snapshotOrder}
          setSnapshotOrder={state.setSnapshotOrder}
          snapshotLabelFilter={state.snapshotLabelFilter}
          setSnapshotLabelFilter={state.setSnapshotLabelFilter}
          snapshotCompareTarget={state.snapshotCompareTarget}
          setSnapshotCompareTarget={state.setSnapshotCompareTarget}
          snapshotHasMore={state.snapshotHasMore}
          snapshotTotal={state.snapshotTotal}
          snapshotFacets={state.snapshotFacets}
          snapshotAction={state.snapshotAction}
          selectedSnapshotFileName={state.selectedSnapshotFileName}
          setSelectedSnapshotFileName={state.setSelectedSnapshotFileName}
          selectedSnapshotDetail={state.selectedSnapshotDetail}
          selectedSnapshotPreview={state.selectedSnapshotPreview}
          selectedSnapshotCompare={state.selectedSnapshotCompare}
          selectedSnapshotRecommendation={state.selectedSnapshotRecommendation}
          onExportSnapshot={state.handleExportSnapshot}
          onRestoreLatestSnapshot={state.handleRestoreLatestSnapshot}
          onSelectSnapshot={state.handleSelectSnapshot}
          onDeleteSnapshot={state.handleDeleteSnapshot}
          onPreviewSnapshotRestore={state.handlePreviewSnapshotRestore}
          onCompareSnapshot={state.handleCompareSnapshot}
          onRecommendSnapshotRestore={state.handleRecommendSnapshotRestore}
          onLoadMoreSnapshots={state.handleLoadMoreSnapshots}
        />

        <RoutingAndTaskCards
          assistantId={assistantId}
          profile={state.profile}
          collaborations={state.collaborations}
          allowedTaskTypes={state.allowedTaskTypes}
          taskType={state.taskType}
          setTaskType={state.setTaskType}
          taskTitle={state.taskTitle}
          setTaskTitle={state.setTaskTitle}
          requestedTier={state.requestedTier}
          setRequestedTier={state.setRequestedTier}
          contextGateApproved={state.contextGateApproved}
          setContextGateApproved={state.setContextGateApproved}
          tierPolicyResult={state.tierPolicyResult}
          isSubmittingTask={state.isSubmittingTask}
          assistantTasks={state.assistantTasks}
          updatingTaskId={state.updatingTaskId}
          onAssignTask={state.handleAssignTask}
          onTaskStateUpdate={state.handleTaskStateUpdate}
        />
      </section>
    );
  }
);

SubagentCollaborationPanel.displayName = 'SubagentCollaborationPanel';

export default SubagentCollaborationPanel;
