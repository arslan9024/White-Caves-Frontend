/**
 * ArgentinaGoalPage — Personal Immigration Tracker (Argentina Citizenship Roadmap)
 *
 * 100-step roadmap across 5 phases:
 *   Phase 1: Dubai Finalization & Spanish Translations (Steps 1-20)
 *   Phase 2: UNC Admission & Digital RENURE Tracking (Steps 21-40)
 *   Phase 3: Argentine Embassy Abu Dhabi Consular Protocol (Steps 41-60)
 *   Phase 4: Arrival in Córdoba & Residence Tracking (Steps 61-80)
 *   Phase 5: Córdoba Federal Court Naturalization & Passport (Steps 81-100)
 *
 * Features:
 * - Per-step completion toggling with localStorage persistence
 * - Phase-level select all / deselect all
 * - Overall progress bar + phase progress bars
 * - Reset with confirmation
 * - Fully accessible (ARIA roles, keyboard operable)
 */

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadProgress, saveProgress } from './argentinaGoal/storage';
import { PHASES, INITIAL_STEPS } from './argentinaGoal/roadmapData';
import type { PhaseStats, ProgressMap } from './argentinaGoal/types';
import { GoalHeroSection } from './argentinaGoal/GoalHeroSection';
import { PhaseOverviewGrid } from './argentinaGoal/PhaseOverviewGrid';
import { PhaseStepList } from './argentinaGoal/PhaseStepList';

const ArgentinaGoalPage: React.FC = () => {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState<number>(1);
  const [completed, setCompleted] = useState<ProgressMap>(() => loadProgress());

  // Persist changes to localStorage
  useEffect(() => {
    saveProgress(completed);
  }, [completed]);

  const handleToggleStep = useCallback((id: number) => {
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSelectPhaseAll = useCallback((phaseId: number, complete: boolean) => {
    setCompleted(prev => {
      const next = { ...prev };
      INITIAL_STEPS.filter(s => s.phase === phaseId).forEach(s => {
        next[s.id] = complete;
      });
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all your Argentina timeline progress?')) {
      setCompleted({});
    }
  }, []);

  const totalCompleted = useMemo(
    () => Object.values(completed).filter(Boolean).length,
    [completed]
  );
  const progressPercentage = Math.round((totalCompleted / INITIAL_STEPS.length) * 100);

  const phaseStats = useMemo(() => {
    return PHASES.reduce<Record<number, PhaseStats>>((acc, phase) => {
      const phaseSteps = INITIAL_STEPS.filter(s => s.phase === phase.id);
      const completedCount = phaseSteps.filter(s => completed[s.id]).length;
      acc[phase.id] = {
        total: phaseSteps.length,
        completed: completedCount,
        percent: Math.round((completedCount / phaseSteps.length) * 100) || 0,
      };
      return acc;
    }, {});
  }, [completed]);

  const activePhaseSteps = useMemo(
    () => INITIAL_STEPS.filter(s => s.phase === activePhase),
    [activePhase]
  );

  const currentPhase = PHASES.find(p => p.id === activePhase);
  const currentPhaseStats = phaseStats[activePhase] ?? { total: 20, completed: 0, percent: 0 };

  return (
    <div
      style={{ minHeight: '100vh', background: 'var(--color-f9fafb, #F9FAFB)', padding: '24px' }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <GoalHeroSection
          totalCompleted={totalCompleted}
          progressPercentage={progressPercentage}
          onBack={() => navigate('/crm')}
          onReset={handleReset}
        />

        <PhaseOverviewGrid
          activePhase={activePhase}
          phaseStats={phaseStats}
          onSelectPhase={setActivePhase}
        />

        {currentPhase && (
          <PhaseStepList
            phase={currentPhase}
            stats={currentPhaseStats}
            steps={activePhaseSteps}
            completed={completed}
            onToggleStep={handleToggleStep}
            onSelectPhaseAll={handleSelectPhaseAll}
          />
        )}

        {/* Completion celebration */}
        {totalCompleted === INITIAL_STEPS.length && (
          <div
            style={{
              marginTop: 24,
              background: 'linear-gradient(135deg, #065F46, #1B4332)',
              borderRadius: 12,
              padding: '24px 28px',
              textAlign: 'center',
              color: '#fff',
            }}
            role="status"
            aria-live="polite"
          >
            <div style={{ fontSize: 40, marginBottom: 8 }}>🏆🇦🇷🎉</div>
            <h2 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700 }}>
              All 100 milestones complete!
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--color-a7f3d0, #A7F3D0)' }}>
              Welcome to Argentina. Your blue passport awaits. 🌍
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArgentinaGoalPage;
