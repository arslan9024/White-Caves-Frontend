import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './ZoeExecutiveDashboard.css';
import { DEFAULT_BUSINESS_METRICS, DEFAULT_REQUIREMENTS } from './ZoeExecutiveDashboard.types';
import {
  ZoeOverviewView,
  ZoeEscalationsView,
  ZoeApprovedChangesView,
} from './ZoeExecutiveDashboardViews';

const ZoeExecutiveDashboard: React.FC = () => {
  const wednesdayPlan = useSelector((state: any) => state.wednesday);
  const [activeTab, setActiveTab] = useState<'overview' | 'escalations' | 'changes'>('overview');
  const [actionMessage, setActionMessage] = useState<{ type: string; text: string } | null>(null);

  // Business Metrics from Redux
  const businessMetrics = wednesdayPlan?.business?.metrics || DEFAULT_BUSINESS_METRICS;

  // Zoe's Approved Requirements
  const requirements = wednesdayPlan?.business?.requirementsMatrix || DEFAULT_REQUIREMENTS;

  // Escalations for Zoe to approve/reject
  const escalations = wednesdayPlan?.escalations?.active || [];

  // Timeline progress
  const timeline = wednesdayPlan?.timeline || {
    morning: { complete: false, tasks: [] },
    afternoon: { complete: false, tasks: [] },
    evening: { complete: false, tasks: [] },
  };

  // Zoe's approved changes
  const approvedChanges = wednesdayPlan?.business?.approvedChanges || [];

  const handleEscalationAction = (action: 'approved' | 'halted', escalationId: string) => {
    setActionMessage({
      type: action === 'halted' ? 'error' : 'success',
      text: `${action === 'halted' ? 'Halted' : 'Approved'}: ${escalationId}`,
    });
  };

  return (
    <div className="zoe-executive-dashboard">
      <header className="zoe-header">
        <div className="zoe-title">
          <h1>👔 Zoe&apos;s Executive Dashboard</h1>
          <p>Wednesday, January 22, 2026 - Business Authority & Real-Time Control</p>
        </div>
        <div className="zoe-status">
          <span className="status-indicator">● LIVE MONITORING</span>
          <span className="time-display">{new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      <nav className="zoe-nav">
        <button
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`nav-btn ${activeTab === 'escalations' ? 'active' : ''}`}
          onClick={() => setActiveTab('escalations')}
        >
          🚨 Escalations ({escalations.length})
        </button>
        <button
          className={`nav-btn ${activeTab === 'changes' ? 'active' : ''}`}
          onClick={() => setActiveTab('changes')}
        >
          📝 Approved Changes
        </button>
      </nav>

      {actionMessage && (
        <div
          className={`status-message ${actionMessage.type === 'error' ? 'error-message' : 'success-message'}`}
          role={actionMessage.type === 'error' ? 'alert' : 'status'}
          data-testid="zoe-escalation-status-banner"
        >
          {actionMessage.text}
        </div>
      )}

      <main className="zoe-content">
        {activeTab === 'overview' && (
          <ZoeOverviewView
            businessMetrics={businessMetrics}
            requirements={requirements}
            timeline={timeline}
          />
        )}
        {activeTab === 'escalations' && (
          <ZoeEscalationsView escalations={escalations} onAction={handleEscalationAction} />
        )}
        {activeTab === 'changes' && <ZoeApprovedChangesView approvedChanges={approvedChanges} />}
      </main>

      <footer className="zoe-footer">
        <p>
          Zoe&apos;s Executive Authority: Approved requirements, escalation decisions, and business
          impact assessment
        </p>
      </footer>
    </div>
  );
};

export default ZoeExecutiveDashboard;

