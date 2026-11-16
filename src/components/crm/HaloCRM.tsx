import React, { useState } from 'react';
import { Heart, Star, TrendingUp, Users, AlertCircle } from 'lucide-react';
import AssistantDocsTab from './shared/AssistantDocsTab';
import AssistantLifecycleTab from './shared/AssistantLifecycleTab';
import { REVIEWS, totalNpsResponses, npsScore } from './HaloCRM.data';
import { HaloNpsTab, HaloReviewsTab, HaloAlertsTab } from './HaloCRMViews';
import './AssistantDashboard.css';

const HaloCRM = () => {
  const [activeTab, setActiveTab] = useState('nps');

  const tabs = [
    { id: 'nps', label: '📊 NPS Overview' },
    { id: 'reviews', label: '⭐ Reviews' },
    { id: 'alerts', label: '🔔 Alerts' },
    { id: 'docs', label: '📚 Docs' },
    { id: 'lifecycle', label: '🔄 Lifecycle' },
  ];

  const detractorCount = REVIEWS.filter(r => r.sentiment === 'negative').length;

  return (
    <div className="assistant-dashboard halo">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--color-ec4899, #EC4899) 0%, var(--color-9d174d, #9D174D) 100%)',
          }}
        >
          <Heart size={28} />
        </div>
        <div className="assistant-info">
          <h2>Halo — Client Satisfaction & NPS Tracker</h2>
          <p>Net Promoter Score tracking, sentiment analysis, and satisfaction alerts</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Listening
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(34,197,94,0.15)', color: 'var(--accent-green, #22C55E)' }}
          >
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <span
              className="stat-value"
              style={{
                color:
                  npsScore >= 50 ? 'var(--accent-green, #22C55E)' : 'var(--accent-gold, #F59E0B)',
              }}
            >
              {npsScore}
            </span>
            <span className="stat-label">NPS Score</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(236,72,153,0.15)', color: 'var(--color-ec4899, #EC4899)' }}
          >
            <Star size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">9.1</span>
            <span className="stat-label">Avg Rating</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(227,30,36,0.15)', color: 'var(--color-e31e24, #E31E24)' }}
          >
            <AlertCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{detractorCount}</span>
            <span className="stat-label">Detractor Alerts</span>
          </div>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(59,130,246,0.15)', color: 'var(--accent-blue, #3B82F6)' }}
          >
            <Users size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{totalNpsResponses}</span>
            <span className="stat-label">Responses</span>
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

      {activeTab === 'nps' && <HaloNpsTab />}
      {activeTab === 'reviews' && <HaloReviewsTab />}
      {activeTab === 'alerts' && <HaloAlertsTab />}
      {activeTab === 'docs' && (
        <AssistantDocsTab assistantId="halo" color="#EC4899" assistantName="Halo" />
      )}
      {activeTab === 'lifecycle' && (
        <AssistantLifecycleTab assistantId="halo" color="#EC4899" assistantName="Halo" />
      )}
    </div>
  );
};

export default HaloCRM;

