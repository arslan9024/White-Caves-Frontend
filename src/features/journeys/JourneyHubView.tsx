import React, { useState, useMemo, useEffect } from 'react';
import {
  Building2,
  ClipboardList,
  CreditCard,
  Crown,
  Handshake,
  Home,
  Map,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
} from 'lucide-react';
import { getAllJourneys, getJourneyById } from './registry/journeyRegistry';
import type { JourneyDefinition } from '../../types/journey';
import { JourneyEngineService } from '../../services/journeys/journeyEngineService';
import { JourneyShell } from './components/JourneyShell';
import { JourneyCatalogCard } from './components/JourneyCatalogCard';
import { JourneyAuditHistoryPanel } from './components/JourneyAuditHistoryPanel';

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

interface JourneyHubViewProps {
  moduleId?: string;
  role?: string;
  user?: AuthUser;
}

const JOURNEY_CATEGORIES: Array<{ id: string; label: string; icon: React.ReactNode }> = [
  { id: 'all', label: 'All 20 Journeys', icon: <Sparkles size={13} /> },
  { id: 'leasing', label: 'Leasing', icon: <ClipboardList size={13} /> },
  { id: 'sales', label: 'Sales', icon: <Handshake size={13} /> },
  { id: 'finance', label: 'Finance', icon: <CreditCard size={13} /> },
  { id: 'wealth', label: 'VIP Wealth', icon: <Crown size={13} /> },
  { id: 'compliance', label: 'Compliance', icon: <ShieldCheck size={13} /> },
  { id: 'property', label: 'Property', icon: <Home size={13} /> },
  { id: 'projects', label: 'Off-Plan', icon: <Building2 size={13} /> },
  { id: 'marketing', label: 'Marketing', icon: <Target size={13} /> },
  { id: 'community', label: 'Community', icon: <Users size={13} /> },
  { id: 'property-management', label: 'Management', icon: <Wrench size={13} /> },
];

export const JourneyHubView: React.FC<JourneyHubViewProps> = ({ moduleId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeJourney, setActiveJourney] = useState<JourneyDefinition | null>(null);
  const [viewTab, setViewTab] = useState<'catalog' | 'history'>('catalog');

  const allJourneys = useMemo(() => getAllJourneys(), []);
  const lifecycleHistory = JourneyEngineService.getLifecycleHistory();

  useEffect(() => {
    if (moduleId && moduleId !== 'journeys') {
      const found = getJourneyById(moduleId);
      if (found) setActiveJourney(found);
    }
  }, [moduleId]);

  const filteredJourneys = useMemo(
    () =>
      allJourneys.filter(j => {
        const matchCat = selectedCategory === 'all' || j.category === selectedCategory;
        const q = searchQuery.toLowerCase();
        const matchQuery =
          j.title.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.family.toLowerCase().includes(q);
        return matchCat && matchQuery;
      }),
    [allJourneys, selectedCategory, searchQuery]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Top Banner & Stats */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Map size={22} color="#EF4444" />
            <h2
              style={{
                margin: 0,
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--white, #FFFFFF)',
                letterSpacing: '-0.02em',
              }}
            >
              White Caves Flagship Life Cycle Journeys
            </h2>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#EF4444',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '2px 8px',
                borderRadius: '999px',
              }}
            >
              20 Core Missions Active
            </span>
          </div>
          <p
            style={{
              margin: '6px 0 0 0',
              fontSize: '0.85rem',
              color: 'var(--color-94a3b8, #94A3B8)',
            }}
          >
            Guided real estate operating engine enforcing RERA compliance, DLD workflows, and
            zero-mistake execution.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setViewTab('catalog')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: viewTab === 'catalog' ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <ClipboardList size={14} />
            <span>Missions Catalog (20)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewTab('history')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: viewTab === 'history' ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <ScrollText size={14} />
            <span>Audit History ({lifecycleHistory.length})</span>
          </button>
        </div>
      </div>

      {viewTab === 'catalog' ? (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              background: '#FFFFFF',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
            }}
          >
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
              {JOURNEY_CATEGORIES.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: selectedCategory === c.id ? '#EF4444' : '#E2E8F0',
                    background:
                      selectedCategory === c.id
                        ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                        : '#F8FAFC',
                    color: selectedCategory === c.id ? '#FFFFFF' : '#475569',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {c.icon}
                  <span>{c.label}</span>
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', minWidth: '240px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search missions, DLD, Ejari..."
                style={{
                  width: '100%',
                  padding: '7px 12px 7px 32px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-94a3b8, #94A3B8)',
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredJourneys.map(journey => (
              <JourneyCatalogCard key={journey.id} journey={journey} onLaunch={setActiveJourney} />
            ))}
          </div>
        </>
      ) : (
        <JourneyAuditHistoryPanel lifecycleHistory={lifecycleHistory} />
      )}

      {activeJourney && (
        <JourneyShell
          definition={activeJourney}
          isOpen={!!activeJourney}
          onClose={() => setActiveJourney(null)}
          onLaunchJourney={id => {
            const found = getJourneyById(id);
            if (found) setActiveJourney(found);
          }}
        />
      )}
    </div>
  );
};

export default JourneyHubView;
