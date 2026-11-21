import React, { type FC } from 'react';
import { Bot, Link2 } from 'lucide-react';
import type {
  AssistantExecutionProfile,
  CollaborationEdge,
  ModelTier,
} from '../../../../config/subagentOrchestration';
import type {
  OrchestrationTask,
  TaskState,
  TaskType,
} from '../../../../services/subagentOrchestrationService';
import { cardStyle, mutedTextStyle } from './styles';
import { getNextStates } from './useSubagentCollaboration';

interface RoutingAndTaskCardsProps {
  assistantId?: string;
  profile: AssistantExecutionProfile | null;
  collaborations: CollaborationEdge[];
  allowedTaskTypes: TaskType[];
  taskType: TaskType;
  setTaskType: (value: TaskType) => void;
  taskTitle: string;
  setTaskTitle: (value: string) => void;
  requestedTier: ModelTier;
  setRequestedTier: (value: ModelTier) => void;
  contextGateApproved: boolean;
  setContextGateApproved: (value: boolean) => void;
  tierPolicyResult: { allowed: boolean; reason?: string };
  isSubmittingTask: boolean;
  assistantTasks: OrchestrationTask[];
  updatingTaskId: string | null;
  onAssignTask: () => Promise<void>;
  onTaskStateUpdate: (task: OrchestrationTask, nextState: TaskState) => Promise<void>;
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  marginTop: 4,
  marginBottom: 8,
  background: 'rgba(15,23,42,0.5)',
  color: '#E2E8F0',
  border: '1px solid rgba(148,163,184,0.35)',
  borderRadius: 8,
  padding: '8px 10px',
};

export const RoutingAndTaskCards: FC<RoutingAndTaskCardsProps> = ({
  assistantId,
  profile,
  collaborations,
  allowedTaskTypes,
  taskType,
  setTaskType,
  taskTitle,
  setTaskTitle,
  requestedTier,
  setRequestedTier,
  contextGateApproved,
  setContextGateApproved,
  tierPolicyResult,
  isSubmittingTask,
  assistantTasks,
  updatingTaskId,
  onAssignTask,
  onTaskStateUpdate,
}) => (
  <>
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Link2 size={16} color="#60A5FA" />
        <strong style={{ color: 'var(--color-e2e8f0, #E2E8F0)', fontSize: 13 }}>
          Routing Chain
        </strong>
      </div>

      {collaborations.length === 0 ? (
        <p style={mutedTextStyle}>No chain available for the selected assistant.</p>
      ) : (
        <ul
          style={{
            margin: 0,
            paddingLeft: 16,
            color: 'var(--color-cbd5e1, #CBD5E1)',
            fontSize: 12,
          }}
        >
          {collaborations.map(edge => (
            <li key={`${edge.from}-${edge.to}`} style={{ marginBottom: 6 }}>
              <strong>{edge.from}</strong> → <strong>{edge.to}</strong>
              <br />
              <span style={mutedTextStyle}>{edge.reason}</span>
            </li>
          ))}
        </ul>
      )}
    </div>

    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Bot size={16} color="#22D3EE" />
        <strong style={{ color: 'var(--color-e2e8f0, #E2E8F0)', fontSize: 13 }}>
          Task Assignment
        </strong>
      </div>

      {assistantId ? (
        <>
          <label style={mutedTextStyle}>Task type</label>
          <select
            value={taskType}
            onChange={event => setTaskType(event.target.value as TaskType)}
            style={fieldStyle}
          >
            {allowedTaskTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label style={mutedTextStyle}>Task title</label>
          <input
            value={taskTitle}
            onChange={event => setTaskTitle(event.target.value)}
            placeholder="e.g. Draft AI handoff rules for leasing pipeline"
            style={fieldStyle}
          />

          <label style={mutedTextStyle}>Requested model tier</label>
          <select
            value={requestedTier}
            onChange={event => setRequestedTier(event.target.value as ModelTier)}
            style={fieldStyle}
            aria-label="Requested model tier"
          >
            <option value="free">free</option>
            <option value="standard">standard</option>
            <option value="premium">premium</option>
          </select>

          {profile?.modelPolicy.requiresContextGate ? (
            <label
              style={{
                ...mutedTextStyle,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
              }}
            >
              <input
                type="checkbox"
                checked={contextGateApproved}
                onChange={event => setContextGateApproved(event.target.checked)}
              />
              Context gate approved for premium requests
            </label>
          ) : null}

          {!tierPolicyResult.allowed && tierPolicyResult.reason ? (
            <p style={{ color: 'var(--color-fca5a5, #FCA5A5)', fontSize: 12, margin: '0 0 8px 0' }}>
              {tierPolicyResult.reason}
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => void onAssignTask()}
            disabled={isSubmittingTask || !taskTitle.trim() || !tierPolicyResult.allowed}
            style={{
              width: '100%',
              border: '1px solid rgba(56,189,248,0.45)',
              background: 'rgba(14,165,233,0.16)',
              color: '#BAE6FD',
              borderRadius: 8,
              padding: '8px 10px',
              cursor: isSubmittingTask ? 'not-allowed' : 'pointer',
              opacity: isSubmittingTask ? 0.7 : 1,
            }}
          >
            {isSubmittingTask ? 'Assigning…' : 'Assign Task'}
          </button>

          {assistantTasks.length > 0 ? (
            <ul
              style={{
                margin: '10px 0 0 0',
                paddingLeft: 16,
                color: 'var(--color-cbd5e1, #CBD5E1)',
                fontSize: 12,
              }}
            >
              {assistantTasks.map(task => (
                <li key={task.id} style={{ marginBottom: 6 }}>
                  <strong>{task.taskType}</strong> — {task.title}
                  <br />
                  <span style={mutedTextStyle}>
                    State: {task.state}
                    {task.blockedReason ? ` · ${task.blockedReason}` : ''}
                  </span>
                  {getNextStates(task.state).length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                      {getNextStates(task.state).map(nextState => (
                        <button
                          key={`${task.id}-${nextState}`}
                          type="button"
                          onClick={() => void onTaskStateUpdate(task, nextState)}
                          disabled={updatingTaskId === task.id}
                          style={{
                            border: '1px solid rgba(148,163,184,0.38)',
                            background: 'rgba(15,23,42,0.45)',
                            color: '#CBD5E1',
                            borderRadius: 999,
                            padding: '3px 8px',
                            fontSize: 11,
                            cursor: updatingTaskId === task.id ? 'not-allowed' : 'pointer',
                            opacity: updatingTaskId === task.id ? 0.6 : 1,
                          }}
                          aria-label={`Set task ${task.title} to ${nextState}`}
                        >
                          {nextState}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ ...mutedTextStyle, marginTop: 10 }}>
              No assigned tasks yet for this assistant.
            </p>
          )}
        </>
      ) : (
        <p style={mutedTextStyle}>Select an assistant to assign orchestration tasks.</p>
      )}
    </div>
  </>
);
