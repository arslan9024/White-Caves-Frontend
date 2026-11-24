import React, { useState, useEffect } from 'react';
import {
  Target,
  Users,
  Send,
  MapPin,
  Sparkles,
  CheckCircle,
  MessageSquare,
  Filter,
  Search,
  Phone,
} from 'lucide-react';
import './AssistantDashboard.css';

import { INITIAL_PROSPECT_BUYERS, INITIAL_PITCH_TEMPLATES } from './hunterProspecting.data';
import { HunterPitchTab } from './HunterPitchTab';
const HunterProspectingCRM = ({ user, role, moduleId }) => {
  const [activeTab, setActiveTab] = useState('matching');

  useEffect(() => {
    if (!moduleId) return;
    if (moduleId.includes('offmarket') || moduleId.includes('matcher')) setActiveTab('matching');
    else if (moduleId.includes('hnw') || moduleId.includes('profiler')) setActiveTab('profiler');
    else if (moduleId.includes('geofence')) setActiveTab('geofence');
    else if (moduleId.includes('pitch')) setActiveTab('pitch');
  }, [moduleId]);

  // Feature 1: Off-Market Luxury Matcher
  const [buyers, setBuyers] = useState([
  const [buyers, setBuyers] = useState(INITIAL_PROSPECT_BUYERS);
  const [pitchTemplates, setPitchTemplates] = useState(INITIAL_PITCH_TEMPLATES);
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}
          >
            🎯
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
                Hunter AI — Outbound Prospecting & Lead Matcher
              </h2>
              <span
                style={{
                  fontSize: '0.7rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  color: 'var(--color-a7f3d0, #A7F3D0)',
                  fontWeight: 800,
                }}
              >
                Off-Market VIP Matching
              </span>
            </div>
            <p
              style={{
                margin: '0.2rem 0 0 0',
                fontSize: '0.82rem',
                color: 'var(--color-d1fae5, #D1FAE5)',
              }}
            >
              Algorithmic buyer-to-inventory matcher, HNW investor profiling, and personalized
              WhatsApp pitch automation.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          background: 'var(--white, #FFFFFF)',
          padding: '8px 12px',
          borderRadius: '12px',
          border: '1px solid var(--text-secondary, #E2E8F0)',
          marginBottom: '1.25rem',
        }}
      >
        <button
          onClick={() => setActiveTab('matching')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border:
              activeTab === 'matching'
                ? '1px solid var(--accent-green, #059669)'
                : '1px solid transparent',
            background:
              activeTab === 'matching'
                ? 'var(--accent-green, #059669)'
                : 'var(--color-f8fafc, #F8FAFC)',
            color: activeTab === 'matching' ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
            fontWeight: 800,
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          3.21.1 Off-Market Luxury Matcher
        </button>
        <button
          onClick={() => setActiveTab('profiler')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border:
              activeTab === 'profiler'
                ? '1px solid var(--accent-green, #059669)'
                : '1px solid transparent',
            background:
              activeTab === 'profiler'
                ? 'var(--accent-green, #059669)'
                : 'var(--color-f8fafc, #F8FAFC)',
            color: activeTab === 'profiler' ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
            fontWeight: 800,
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          3.21.2 HNW Lead Profiler
        </button>
        <button
          onClick={() => setActiveTab('geofence')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border:
              activeTab === 'geofence'
                ? '1px solid var(--accent-green, #059669)'
                : '1px solid transparent',
            background:
              activeTab === 'geofence'
                ? 'var(--accent-green, #059669)'
                : 'var(--color-f8fafc, #F8FAFC)',
            color: activeTab === 'geofence' ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
            fontWeight: 800,
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          3.21.3 Geo-Fenced Outreach
        </button>
        <button
          onClick={() => setActiveTab('pitch')}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border:
              activeTab === 'pitch'
                ? '1px solid var(--accent-green, #059669)'
                : '1px solid transparent',
            background:
              activeTab === 'pitch'
                ? 'var(--accent-green, #059669)'
                : 'var(--color-f8fafc, #F8FAFC)',
            color: activeTab === 'pitch' ? 'var(--white, #FFF)' : 'var(--color-334155, #334155)',
            fontWeight: 800,
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          3.21.4 Direct Pitch Dispatcher
        </button>
      </div>

      {/* Tab 1: Matcher */}
      {activeTab === 'matching' && (
        <div
          style={{
            background: 'var(--white, #FFFFFF)',
            borderRadius: '12px',
            border: '1px solid var(--text-secondary, #E2E8F0)',
            overflow: 'hidden',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.85rem',
            }}
          >
            <thead>
              <tr
                style={{
                  background: 'var(--color-f8fafc, #F8FAFC)',
                  borderBottom: '1px solid var(--text-secondary, #E2E8F0)',
                  color: 'var(--color-475569, #475569)',
                  fontWeight: 800,
                }}
              >
                <th style={{ padding: '10px 14px' }}>HNW Buyer</th>
                <th style={{ padding: '10px 14px' }}>Target Budget</th>
                <th style={{ padding: '10px 14px' }}>Requirements</th>
                <th style={{ padding: '10px 14px' }}>Matched Off-Market Property</th>
                <th style={{ padding: '10px 14px' }}>Match Score</th>
                <th style={{ padding: '10px 14px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)' }}>
                  <td
                    style={{
                      padding: '10px 14px',
                      fontWeight: 800,
                      color: 'var(--color-1e293b, #1E293B)',
                    }}
                  >
                    {b.name}
                  </td>
                  <td
                    style={{
                      padding: '10px 14px',
                      fontWeight: 700,
                      color: 'var(--accent-green, #059669)',
                    }}
                  >
                    {b.budget}
                  </td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-secondary, #64748B)' }}>
                    {b.pref}
                  </td>
                  <td
                    style={{
                      padding: '10px 14px',
                      fontWeight: 700,
                      color: 'var(--color-1e293b, #1E293B)',
                    }}
                  >
                    {b.matchedUnit}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        background: 'var(--color-ecfdf5, #ECFDF5)',
                        color: 'var(--color-047857, #047857)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontWeight: 800,
                      }}
                    >
                      {b.matchScore}% Match
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <button
                      onClick={() => {
                        setSelectedBuyer(b);
                        setActiveTab('pitch');
                      }}
                      style={{
                        background: 'var(--accent-green, #059669)',
                        color: 'var(--white, #FFF)',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Prepare Pitch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Pitch Dispatcher */}
        {activeTab === 'pitch' && (
          <HunterPitchTab
            selectedPitch={selectedPitch}
            setSelectedPitch={setSelectedPitch}
            pitchTemplates={pitchTemplates}
            handleGenerateCustomPitch={handleGenerateCustomPitch}
            isGeneratingPitch={isGeneratingPitch}
            copiedPitch={copiedPitch}
            handleCopyPitch={handleCopyPitch}
          />
        )}

      {/* Tab 2 & 3: Profiler & Geofence */}
      {(activeTab === 'profiler' || activeTab === 'geofence') && (
        <div
          style={{
            background: 'var(--white, #FFFFFF)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--text-secondary, #E2E8F0)',
          }}
        >
          <h4
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '1rem',
              fontWeight: 800,
              color: 'var(--color-1e293b, #1E293B)',
            }}
          >
            {activeTab === 'profiler' ? 'High-Net-Worth Lead Profiler' : 'Geo-Fenced Area Outreach'}
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #64748B)' }}>
            Targeting 140+ pre-screened investors across Palm Jumeirah, Emirates Hills, and Dubai
            Hills Estate.
          </p>
        </div>
      )}
    </div>
  );
};

export default HunterProspectingCRM;

