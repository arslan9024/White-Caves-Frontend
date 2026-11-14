import React from 'react';
import { PiggyBank, FileText, DollarSign, Percent, CheckCircle } from 'lucide-react';
import AssistantDocsTab from '../shared/AssistantDocsTab';
import AssistantLifecycleTab from '../shared/AssistantLifecycleTab';
import '../AssistantDashboard.css';
import { useSageCRM } from './SageCRM.logic';
import { APPLICATIONS, BANKS } from './SageCRM.data';
import { ApplicationsTabPanel, CalculatorTabPanel, BanksTabPanel } from './SageCRM.panels';

export const SageCRMView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    calcPrice,
    setCalcPrice,
    calcDown,
    setCalcDown,
    calcRate,
    setCalcRate,
    calcYears,
    setCalcYears,
    loanAmt,
    monthly,
    totalCost,
    tabs,
  } = useSageCRM();

  return (
    <div className="assistant-dashboard sage">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--color-0ea5e9, #0EA5E9) 0%, var(--color-0369a1, #0369A1) 100%)',
          }}
        >
          <PiggyBank size={28} />
        </div>
        <div className="assistant-info">
          <h2>Sage — Mortgage & Financing Advisor</h2>
          <p>UAE mortgage calculations, bank comparisons and application tracking</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Active
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(14,165,233,0.15)',
              color: 'var(--color-0ea5e9, #0EA5E9)',
            }}
          >
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{APPLICATIONS.length}</span>
            <span className="stat-label">Applications</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(34,197,94,0.15)',
              color: 'var(--accent-green, #22C55E)',
            }}
          >
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">
              {APPLICATIONS.filter(a => a.status === 'approved').length}
            </span>
            <span className="stat-label">Approved</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(227,30,36,0.15)',
              color: 'var(--color-e31e24, #E31E24)',
            }}
          >
            <DollarSign size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">AED 24.3M</span>
            <span className="stat-label">Total Financed</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(245,158,11,0.15)',
              color: 'var(--accent-gold, #F59E0B)',
            }}
          >
            <Percent size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">4.21%</span>
            <span className="stat-label">Avg Rate</span>
          </div>
        </div>
      </div>

      <div className="crm-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`crm-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'applications' && <ApplicationsTabPanel applications={APPLICATIONS} />}

      {activeTab === 'calculator' && (
        <CalculatorTabPanel
          calcPrice={calcPrice}
          setCalcPrice={setCalcPrice}
          calcDown={calcDown}
          setCalcDown={setCalcDown}
          calcRate={calcRate}
          setCalcRate={setCalcRate}
          calcYears={calcYears}
          setCalcYears={setCalcYears}
          loanAmt={loanAmt}
          monthly={monthly}
          totalCost={totalCost}
        />
      )}

      {activeTab === 'banks' && <BanksTabPanel banks={BANKS} />}

      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="sage" color="#0EA5E9" assistantName="Sage" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="sage" color="#0EA5E9" assistantName="Sage" />
      )}
    </div>
  );
};
