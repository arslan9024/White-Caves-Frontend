/**
 * KYC & AML Dashboard — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing screening runs, tab switching, and telemetry stats
 */

import { useState, useEffect } from 'react';
import type {
  KycStats,
  KycProfileItem,
  KycAlertItem,
  KycAuditLogItem,
} from './KYCAMLDashboard.types';
import {
  DEFAULT_KYC_STATS,
  MOCK_PENDING_PROFILES,
  MOCK_ALERTS,
  MOCK_AUDIT_LOGS,
} from './KYCAMLDashboard.data';

export function useKycAmlLogic(showTabs: string[] = ['queue']) {
  const [activeTab, setActiveTab] = useState<string>(showTabs[0] || 'queue');
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<KycStats | null>(null);
  const [pendingProfiles, setPendingProfiles] = useState<KycProfileItem[]>([]);
  const [alerts, setAlerts] = useState<KycAlertItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<KycAuditLogItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Simulate initial telemetry fetch
    const timer = setTimeout(() => {
      setStats(DEFAULT_KYC_STATS);
      setPendingProfiles(MOCK_PENDING_PROFILES);
      setAlerts(MOCK_ALERTS);
      setAuditLogs(MOCK_AUDIT_LOGS);
      setLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const handleApprove = (id: string) => {
    setPendingProfiles(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'approved', riskRating: 'LOW' } : p))
    );
  };

  const handleReject = (id: string) => {
    setPendingProfiles(prev =>
      prev.map(p => (p.id === id ? { ...p, status: 'rejected', riskRating: 'HIGH' } : p))
    );
  };

  return {
    activeTab,
    setActiveTab,
    loading,
    stats,
    pendingProfiles,
    alerts,
    auditLogs,
    searchTerm,
    setSearchTerm,
    handleApprove,
    handleReject,
  };
}
