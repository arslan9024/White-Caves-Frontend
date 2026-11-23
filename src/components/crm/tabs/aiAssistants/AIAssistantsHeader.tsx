import React from 'react';
import { Bot, Zap, MessageSquare, Activity, Plus } from 'lucide-react';

interface AIAssistantsHeaderProps {
  onAddAssistant?: () => void;
}

export const AIAssistantsHeader: React.FC<AIAssistantsHeaderProps> = ({ onAddAssistant }) => {
  return (
    <>
      <div className="crm-main-header">
        <div>
          <h1 className="crm-main-title">AI Assistants</h1>
          <p className="crm-main-subtitle">32 AI assistants across 10 departments</p>
        </div>
        <button className="crm-btn crm-btn-primary" onClick={onAddAssistant}>
          <Plus size={18} /> Add Assistant
        </button>
      </div>

      <div className="crm-stats-grid">
        <div className="crm-stat-card">
          <div className="crm-stat-icon navy">
            <Bot size={24} />
          </div>
          <div className="crm-stat-content">
            <div className="crm-stat-value">32</div>
            <div className="crm-stat-label">Total Assistants</div>
          </div>
        </div>
        <div className="crm-stat-card">
          <div className="crm-stat-icon success">
            <Zap size={24} />
          </div>
          <div className="crm-stat-content">
            <div className="crm-stat-value">28</div>
            <div className="crm-stat-label">Active</div>
          </div>
        </div>
        <div className="crm-stat-card">
          <div className="crm-stat-icon gold">
            <MessageSquare size={24} />
          </div>
          <div className="crm-stat-content">
            <div className="crm-stat-value">5,678</div>
            <div className="crm-stat-label">Tasks Today</div>
          </div>
        </div>
        <div className="crm-stat-card">
          <div className="crm-stat-icon info">
            <Activity size={24} />
          </div>
          <div className="crm-stat-content">
            <div className="crm-stat-value">95.6%</div>
            <div className="crm-stat-label">Avg. Accuracy</div>
          </div>
        </div>
      </div>
    </>
  );
};
