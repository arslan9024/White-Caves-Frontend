// FILE: src/components/crm/AiAssistantManager/AiAssistantEditDrawer.tsx
/**
 * White Caves Real Estate LLC - AI Assistant Create / Edit Drawer
 * Standard: AEGIS Canonical 12-Way Architecture Standard (Sub-View)
 * Single Purpose File Law: < 350 lines
 */

import React, { useState, useEffect, useMemo } from 'react';
import { AI_DEPARTMENTS_OPTIONS } from './AiAssistantManager.data';
import type {
  AiAgentRecord,
  AiAgentFormPayload,
} from './AiAssistantManager.types';
import { useDirtyStateGuard } from '../../../hooks/useDirtyStateGuard';
import { UnsavedChangesModal, TaskActionBar } from '../../common/UnsavedChangesModal';
import { AiAssistantFormFields } from './AiAssistantFormFields';

export interface AiAssistantEditDrawerProps {
  isOpen: boolean;
  agent: AiAgentRecord | null;
  onClose: () => void;
  onSave: (payload: AiAgentFormPayload) => void;
}

export const AiAssistantEditDrawer: React.FC<AiAssistantEditDrawerProps> = ({
  isOpen,
  agent,
  onClose,
  onSave,
}) => {
  const [initialSnapshot, setInitialSnapshot] = useState<string>('');
  const [formData, setFormData] = useState<AiAgentFormPayload>({
    agentId: '',
    code: '',
    name: '',
    role: '',
    departmentId: 'luxury_sales',
    department: 'Luxury Sales & Brokerage',
    tier: 'SUPERVISOR',
    status: 'ACTIVE',
    model: 'gemini-1.5-flash',
    specialty: '',
    systemPrompt: '',
    capabilities: ['Autonomous Execution', '15-Min SLA'],
    activeWorkload: 0,
  });
  const [capabilitiesInput, setCapabilitiesInput] = useState('Autonomous Execution, 15-Min SLA');

  useEffect(() => {
    if (agent) {
      const snapData = {
        agentId: agent.agentId,
        code: agent.code,
        name: agent.name,
        role: agent.role,
        departmentId: agent.departmentId,
        department: agent.department,
        tier: agent.tier,
        status: agent.status,
        model: agent.model,
        specialty: agent.specialty,
        systemPrompt: agent.systemPrompt,
        capabilities: agent.capabilities,
        activeWorkload: agent.activeWorkload,
      };
      setFormData(snapData);
      const caps = (agent.capabilities || []).join(', ');
      setCapabilitiesInput(caps);
      setInitialSnapshot(JSON.stringify({ ...snapData, caps }));
    } else {
      const defaultData: AiAgentFormPayload = {
        agentId: '',
        code: '',
        name: '',
        role: '',
        departmentId: 'luxury_sales',
        department: 'Luxury Sales & Brokerage',
        tier: 'SUPERVISOR',
        status: 'ACTIVE',
        model: 'gemini-1.5-flash',
        specialty: '',
        systemPrompt: '',
        capabilities: ['Autonomous Execution', '15-Min SLA'],
        activeWorkload: 0,
      };
      setFormData(defaultData);
      setCapabilitiesInput('Autonomous Execution, 15-Min SLA');
      setInitialSnapshot(JSON.stringify({ ...defaultData, caps: 'Autonomous Execution, 15-Min SLA' }));
    }
  }, [agent, isOpen]);

  const isDirty = useMemo(() => {
    if (!isOpen) return false;
    const currentPayload = {
      ...formData,
      caps: capabilitiesInput,
    };
    return Boolean(initialSnapshot && JSON.stringify(currentPayload) !== initialSnapshot);
  }, [isOpen, formData, capabilitiesInput, initialSnapshot]);

  const { showPrompt, proceed, cancel, confirmExit } = useDirtyStateGuard({
    isDirty,
    onConfirmDiscard: onClose,
  });

  if (!isOpen) return null;

  const handleDeptChange = (deptId: string) => {
    const found = AI_DEPARTMENTS_OPTIONS.find(d => d.id === deptId);
    setFormData(prev => ({
      ...prev,
      departmentId: deptId,
      department: found ? found.name : prev.department,
    }));
  };

  const getCleanPayload = (): AiAgentFormPayload => {
    const caps = capabilitiesInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    return {
      ...formData,
      capabilities: caps.length > 0 ? caps : ['Autonomous Execution'],
    };
  };

  const handleSaveData = (shouldClose: boolean) => {
    onSave(getCleanPayload());
    if (shouldClose) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(getCleanPayload());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-fade-in"
      data-testid="aiams-edit-drawer-overlay"
    >
      <div
        className="w-full max-w-lg h-full bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
        data-testid="aiams-edit-drawer"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                {agent ? `Configure: ${agent.code || agent.agentId}` : 'New AI Mesh Node'}
              </span>
              <h2 className="text-lg font-bold text-white mt-1">
                {agent ? `Update ${agent.name}` : 'Register Autonomous AI Agent'}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              data-testid="aiams-drawer-close-btn"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-all text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form id="aiams-agent-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
            <AiAssistantFormFields
              formData={formData}
              setFormData={setFormData}
              capabilitiesInput={capabilitiesInput}
              setCapabilitiesInput={setCapabilitiesInput}
              isEditMode={Boolean(agent)}
              onDeptChange={handleDeptChange}
            />
          </form>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <TaskActionBar
            isDirty={isDirty}
            onSave={() => handleSaveData(false)}
            onSaveAndClose={() => handleSaveData(true)}
            onCancel={() => confirmExit(onClose)}
            saveLabel={agent ? 'Save Agent Changes' : 'Register AI Agent'}
            saveAndCloseLabel="Save & Close"
            saveTestId="aiams-submit-btn"
          />
        </div>
      </div>

      <UnsavedChangesModal
        isOpen={showPrompt}
        onProceed={proceed}
        onCancel={cancel}
      />
    </div>
  );
};

