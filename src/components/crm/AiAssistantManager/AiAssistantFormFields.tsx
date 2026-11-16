import React from 'react';
import { AI_DEPARTMENTS_OPTIONS, AI_MODELS_LIST } from './AiAssistantManager.data';
import type { AiAgentFormPayload, AiAgentTier, AiAgentStatus } from './AiAssistantManager.types';

interface AiAssistantFormFieldsProps {
  formData: AiAgentFormPayload;
  setFormData: React.Dispatch<React.SetStateAction<AiAgentFormPayload>>;
  capabilitiesInput: string;
  setCapabilitiesInput: (val: string) => void;
  isEditMode: boolean;
  onDeptChange: (deptId: string) => void;
}

export const AiAssistantFormFields: React.FC<AiAssistantFormFieldsProps> = ({
  formData,
  setFormData,
  capabilitiesInput,
  setCapabilitiesInput,
  isEditMode,
  onDeptChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Agent Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. AI Aria"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            data-testid="aiams-input-name"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Agent ID / Key
          </label>
          <input
            type="text"
            placeholder="e.g. sup_luxury_sales_10"
            value={formData.agentId || ''}
            onChange={e => setFormData(prev => ({ ...prev, agentId: e.target.value }))}
            disabled={isEditMode}
            data-testid="aiams-input-id"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-red-500 disabled:opacity-60"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Role & Designation *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Escrow & DLD Title Supervisor"
            value={formData.role}
            onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
            data-testid="aiams-input-role"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Agent Code
          </label>
          <input
            type="text"
            placeholder="e.g. AI-SUP-109"
            value={formData.code || ''}
            onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
            data-testid="aiams-input-code"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Corporate Department
          </label>
          <select
            value={formData.departmentId || 'luxury_sales'}
            onChange={e => onDeptChange(e.target.value)}
            data-testid="aiams-select-department"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-red-500"
          >
            {AI_DEPARTMENTS_OPTIONS.filter(d => d.id !== 'all').map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Hierarchy Tier
          </label>
          <select
            value={formData.tier}
            onChange={e =>
              setFormData(prev => ({ ...prev, tier: e.target.value as AiAgentTier }))
            }
            data-testid="aiams-select-tier"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="EXECUTIVE">Executive Command (L0)</option>
            <option value="MANAGER">Department Director AI (L1)</option>
            <option value="SUPERVISOR">Operational Supervisor AI (L2)</option>
            <option value="SPECIALIST">Autonomous Specialist AI</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Foundation LLM Model
          </label>
          <select
            value={formData.model}
            onChange={e => setFormData(prev => ({ ...prev, model: e.target.value }))}
            data-testid="aiams-select-model"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-mono focus:outline-none focus:border-red-500"
          >
            {AI_MODELS_LIST.map(m => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1">
            Operational Status
          </label>
          <select
            value={formData.status}
            onChange={e =>
              setFormData(prev => ({ ...prev, status: e.target.value as AiAgentStatus }))
            }
            data-testid="aiams-select-status"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-red-500"
          >
            <option value="OPTIMAL">OPTIMAL (99.8% SLA)</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="BUSY">BUSY (High Load)</option>
            <option value="STANDBY">STANDBY</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
          Specialty & Domain Mandate
        </label>
        <input
          type="text"
          placeholder="e.g. Automated Ejari Contract Verification & DLD Escrow Audit"
          value={formData.specialty || ''}
          onChange={e => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
          data-testid="aiams-input-specialty"
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-red-500"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
          System Prompt / Autonomous Instructions
        </label>
        <textarea
          rows={3}
          placeholder="System instructions and statutory guardrails for this AI agent..."
          value={formData.systemPrompt || ''}
          onChange={e => setFormData(prev => ({ ...prev, systemPrompt: e.target.value }))}
          data-testid="aiams-input-prompt"
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-red-500"
        />
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
          Capabilities (Comma-Separated)
        </label>
        <input
          type="text"
          value={capabilitiesInput}
          onChange={e => setCapabilitiesInput(e.target.value)}
          data-testid="aiams-input-capabilities"
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-red-500"
        />
      </div>
    </>
  );
};

