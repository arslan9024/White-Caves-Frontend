/**
 * PlanManager — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component composing Stats, Controls, Plan Grid, and Create Modal
 */

import React from 'react';
import { usePlanManagerLogic } from './PlanManager.logic';
import { PlanStatsHeader, PlanControlsBar, PlanGridList } from './PlanManager.panels';
import { CreatePlanModal } from './PlanManager.modal';
import '../PlanManager.css';

export const PlanManagerView: React.FC = () => {
  const {
    plans,
    loading,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    selectedPlans,
    showCreateModal,
    setShowCreateModal,
    showMergeModal,
    setShowMergeModal,
    editingPlan,
    setEditingPlan,
    stats,
    statusMessage,
    loadPlans,
    toggleSelectPlan,
    deletePlan,
  } = usePlanManagerLogic();

  return (
    <div className="plan-manager-container" style={{ padding: '1rem', maxWidth: '100%' }}>
      {/* Status banner */}
      {statusMessage && (
        <div
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            marginBottom: '1rem',
            background: statusMessage.type === 'error' ? '#FEE2E2' : '#DCFCE7',
            color: statusMessage.type === 'error' ? '#991B1B' : '#166534',
            fontSize: '0.85rem',
            fontWeight: 700,
          }}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Top stats */}
      <PlanStatsHeader stats={stats} />

      {/* Action and search controls */}
      <PlanControlsBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        onRefresh={loadPlans}
        onCreateNew={() => setShowCreateModal(true)}
        onOpenMerge={() => setShowMergeModal(true)}
      />

      {/* Plans list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
          Loading plans...
        </div>
      ) : (
        <PlanGridList
          plans={plans}
          selectedPlans={selectedPlans}
          onToggleSelect={toggleSelectPlan}
          onEdit={setEditingPlan}
          onDelete={deletePlan}
        />
      )}

      {/* Create Modal */}
      <CreatePlanModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={loadPlans}
      />
    </div>
  );
};

export default PlanManagerView;
