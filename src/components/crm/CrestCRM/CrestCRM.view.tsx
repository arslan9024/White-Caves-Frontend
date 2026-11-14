import React from 'react';
import { Home, TrendingUp, BarChart2, CheckCircle } from 'lucide-react';
import AssistantDocsTab from '../shared/AssistantDocsTab';
import AssistantLifecycleTab from '../shared/AssistantLifecycleTab';
import '../AssistantDashboard.css';
import { useCrestCRM } from './CrestCRM.logic';
import { VALUATIONS, COMPS } from './CrestCRM.data';
import { ValuationsTabPanel, ComparablesTabPanel, CalculatorTabPanel } from './CrestCRM.panels';

export const CrestCRMView: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    calcSqft,
    setCalcSqft,
    calcBeds,
    setCalcBeds,
    calcArea,
    setCalcArea,
    estVal,
    tabs,
  } = useCrestCRM();

  return (
    <div className="assistant-dashboard crest">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-red, #E31E24) 0%, var(--accent-red, #9B1C1C) 100%)',
          }}
        >
          <Home size={28} />
        </div>
        <div className="assistant-info">
          <h2>Crest — Property Valuation Engine</h2>
          <p>AI-powered AVM valuations using live DLD data and comparable sales</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Valuing
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(227,30,36,0.15)',
              color: 'var(--color-e31e24, #E31E24)',
            }}
          >
            <Home size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{VALUATIONS.length}</span>
            <span className="stat-label">Valuations</span>
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
            <span className="stat-value">87%</span>
            <span className="stat-label">Avg Confidence</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(59,130,246,0.15)',
              color: 'var(--accent-blue, #3B82F6)',
            }}
          >
            <BarChart2 size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">25</span>
            <span className="stat-label">Comparables Used</span>
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
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">±3.2%</span>
            <span className="stat-label">Margin of Error</span>
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

      {activeTab === 'valuations' && <ValuationsTabPanel valuations={VALUATIONS} />}

      {activeTab === 'comparables' && <ComparablesTabPanel comps={COMPS} />}

      {activeTab === 'calculator' && (
        <CalculatorTabPanel
          calcArea={calcArea}
          setCalcArea={setCalcArea}
          calcSqft={calcSqft}
          setCalcSqft={setCalcSqft}
          calcBeds={calcBeds}
          setCalcBeds={setCalcBeds}
          estVal={estVal}
        />
      )}

      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="crest" color="#E31E24" assistantName="Crest" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="crest" color="#E31E24" assistantName="Crest" />
      )}
    </div>
  );
};
