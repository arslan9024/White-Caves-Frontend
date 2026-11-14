import { useState, useMemo, useCallback, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import {
  MOCK_LEADS,
  MOCK_LEADERBOARD_SALES,
  MOCK_LEADERBOARD_LEASING,
  getTierInfo,
  calculateRunway,
} from './DashboardView.data';
import { LeaderboardTab } from './DashboardView.types';

export const useDashboardView = () => {
  const { user } = useAuthContext();
  const [lbTab, setLbTab] = useState<LeaderboardTab>('sales');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [leads, setLeads] = useState(MOCK_LEADS);

  const perf = user?.performance;
  const tierInfo = useMemo(() => getTierInfo(perf?.tier), [perf?.tier]);
  const runway = useMemo(() => calculateRunway(user?.onboarding_date), [user?.onboarding_date]);

  const gwcPercent = useMemo(() => {
    return perf ? Math.min(100, (perf.current_gwc / perf.target_gwc) * 100) : 0;
  }, [perf]);

  const circumference = 2 * Math.PI * 46;
  const strokeDashoffset = circumference - (gwcPercent / 100) * circumference;

  const leaderboardData = useMemo(() => {
    return lbTab === 'sales' ? MOCK_LEADERBOARD_SALES : MOCK_LEADERBOARD_LEASING;
  }, [lbTab]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLeads(prev =>
        prev.map(lead => ({
          ...lead,
          sla_mins: Math.max(0, lead.sla_mins - 1),
        }))
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleAiExecute = useCallback(() => {
    if (aiPrompt.trim()) {
      setAiPrompt('');
      setAiModalOpen(false);
    }
  }, [aiPrompt]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && aiModalOpen) {
        setAiModalOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [aiModalOpen]);

  return {
    user,
    perf,
    tierInfo,
    runway,
    gwcPercent,
    circumference,
    strokeDashoffset,
    lbTab,
    setLbTab,
    leaderboardData,
    leads,
    aiModalOpen,
    setAiModalOpen,
    aiPrompt,
    setAiPrompt,
    handleAiExecute,
  };
};
