import React from 'react';
import {
  Clock,
  FileText,
  Bot,
  Users,
  CheckCircle,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Zap,
} from 'lucide-react';
import FlowchartViewer from './FlowchartViewer';

interface ServiceMainPanelProps {
  selectedService: any;
  currentStageIndex: number;
  currentStage: any;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNextStage: () => void;
  onReset: () => void;
  onStageClick: (stage: any, index: number) => void;
}

export const ServiceMainPanel: React.FC<ServiceMainPanelProps> = ({
  selectedService,
  currentStageIndex,
  currentStage,
  isPlaying,
  onPlayPause,
  onNextStage,
  onReset,
  onStageClick,
}) => {
  if (!selectedService) {
    return (
      <div className="demo-placeholder">
        <div className="placeholder-icon">
          <Zap size={64} strokeWidth={1} />
        </div>
        <h3>Select a Service to Begin</h3>
        <p>
          Choose a service from the sidebar to view its complete workflow and run an interactive
          demonstration.
        </p>
        <div className="service-quick-stats">
          <div className="quick-stat">
            <span className="stat-value">35</span>
            <span className="stat-label">Services</span>
          </div>
          <div className="quick-stat">
            <span className="stat-value">7</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="quick-stat">
            <span className="stat-value">150+</span>
            <span className="stat-label">Workflow Stages</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="service-header">
        <div className="service-identity">
          <span className="service-icon-large">{selectedService.icon}</span>
          <div>
            <h3>{selectedService.name}</h3>
            <p>{selectedService.description}</p>
          </div>
        </div>
        <div className="service-stats">
          <div className="stat">
            <Clock size={16} />
            <span>{selectedService.avgDuration}</span>
          </div>
          <div className="stat">
            <FileText size={16} />
            <span>{selectedService.stages?.length || 0} stages</span>
          </div>
          <div className="stat">
            <Bot size={16} />
            <span>{selectedService.assistants?.length || 0} AI assistants</span>
          </div>
        </div>
      </div>

      <div className="demo-controls">
        <button
          className={`control-btn play ${isPlaying ? 'playing' : ''}`}
          onClick={onPlayPause}
          disabled={currentStageIndex >= (selectedService.stages?.length || 0) - 1 && !isPlaying}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          {isPlaying ? 'Pause' : currentStageIndex === -1 ? 'Start Demo' : 'Resume'}
        </button>
        <button
          className="control-btn"
          onClick={onNextStage}
          disabled={currentStageIndex >= (selectedService.stages?.length || 0) - 1}
        >
          <SkipForward size={18} />
          Next Stage
        </button>
        <button className="control-btn" onClick={onReset}>
          <RotateCcw size={18} />
          Reset
        </button>

        <div className="progress-indicator">
          <span>
            Progress: {currentStageIndex + 1 > 0 ? currentStageIndex + 1 : 0} /{' '}
            {selectedService.stages?.length || 0}
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentStageIndex + 1) / (selectedService.stages?.length || 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="workflow-visualization">
        <h4>Workflow Stages</h4>
        <FlowchartViewer
          stages={selectedService.stages || []}
          currentStage={currentStage?.id}
          onStageClick={onStageClick}
          interactive={true}
          showActions={true}
          orientation="horizontal"
        />
      </div>

      {currentStage && (
        <div className="current-stage-detail">
          <h4>
            <span className="stage-icon">{currentStage.icon}</span>
            Current Stage: {currentStage.name}
          </h4>
          <div className="stage-details-grid">
            <div className="detail-card">
              <label>Duration</label>
              <span>{currentStage.duration}</span>
            </div>
            <div className="detail-card actions">
              <label>Actions</label>
              <ul>
                {currentStage.actions?.map((action: string, idx: number) => (
                  <li key={idx}>
                    <CheckCircle size={14} />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="assigned-assistants">
        <h4>
          <Users size={16} /> Assigned AI Assistants
        </h4>
        <div className="assistant-chips">
          {selectedService.assistants?.map((assistant: string) => (
            <span key={assistant} className="assistant-chip">
              <Bot size={14} />
              {assistant.charAt(0).toUpperCase() + assistant.slice(1)}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};
