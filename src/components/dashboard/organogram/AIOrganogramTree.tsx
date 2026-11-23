/**
 * AIOrganogramTree.tsx
 *
 * White Caves Real Estate LLC — 1-12-108 Bhakti Recursive Command Grid Organogram Tree.
 * Single Source of Truth Hierarchy:
 * Level 0: 1 Managing Director (Arslan Malik Bashir Ahmad) & Executive AI Zoe (COO)
 * Level 1: 12 Corporate Department Directors (dynamically bound to confirmed/locked DB names)
 * Level 2: 108 Division Managers (9 per Department × 12 = 108 Division Managers)
 * Level 3 Capacity: 1,296 Operational Supervisors (12 per Division Manager)
 *
 * Fully decomposed per AEGIS V5.1 AEG-042 (< 310 lines).
 */

import React, { FC, useState } from 'react';
import { SupervisorDef } from '../../../data/assistants108Registry.data';
import { DepartmentRegistryItem, AIOrganogramTreeProps } from './types';
import { useOrganogramRegistry } from './useOrganogramRegistry';
import { SovereignCommandNode } from './SovereignCommandNode';
import { DirectorsLevelGrid } from './DirectorsLevelGrid';
import { DivisionManagersGrid } from './DivisionManagersGrid';
import { SupervisorTaskModal } from './SupervisorTaskModal';

export * from './types';
export { useOrganogramRegistry } from './useOrganogramRegistry';
export { SovereignCommandNode } from './SovereignCommandNode';
export { DirectorsLevelGrid } from './DirectorsLevelGrid';
export { DivisionManagersGrid } from './DivisionManagersGrid';
export { SupervisorTaskModal } from './SupervisorTaskModal';

export const AIOrganogramTree: FC<AIOrganogramTreeProps> = ({ onSelectAssistant }) => {
  const departmentsRegistry = useOrganogramRegistry();
  const [selectedDeptId, setSelectedDeptId] = useState<string>('customer_experience');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedSupervisor, setInspectedSupervisor] = useState<SupervisorDef | null>(null);

  const activeDept: DepartmentRegistryItem =
    departmentsRegistry.find((d: DepartmentRegistryItem) => d.id === selectedDeptId) ||
    departmentsRegistry[0];

  const handleSelectSupervisor = (sup: SupervisorDef) => {
    setInspectedSupervisor(sup);
    onSelectAssistant?.(sup);
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '1.5rem',
        color: '#0F172A',
        fontFamily: 'inherit',
      }}
      data-testid="ai-organogram-tree"
    >
      {/* Level 0: Managing Director & AI Zoe Sovereign Node */}
      <SovereignCommandNode />

      {/* Level 1: 12 Corporate Department Directors */}
      <DirectorsLevelGrid
        departments={departmentsRegistry}
        selectedDeptId={selectedDeptId}
        onSelectDepartment={setSelectedDeptId}
      />

      {/* Level 2: 9 Division Managers of Selected Department (108 Total) */}
      {activeDept && (
        <DivisionManagersGrid
          activeDept={activeDept}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectSupervisor={handleSelectSupervisor}
        />
      )}

      {/* Supervisor Interactive Task Dispatch Modal */}
      <SupervisorTaskModal
        supervisor={inspectedSupervisor}
        onClose={() => setInspectedSupervisor(null)}
      />
    </div>
  );
};

export default AIOrganogramTree;
