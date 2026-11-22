/**
 * LoginSecurityPage
 * =================
 * Owner/admin-only forensic dashboard for the CRM login security stack.
 *
 * Surfaces the server endpoints:
 *   - GET  /api/auth/security/login-attempts  (audit log)
 *   - GET  /api/auth/security/stats           (aggregate metrics)
 *   - GET  /api/auth/security/active-lockouts (lockout states)
 *   - POST /api/auth/security/unlock          (clear account lockout)
 *   - POST /api/auth/security/unlock-ip       (clear IP lockout)
 *
 * Decomposed under AEGIS V5.1 rule AEG-042 into single-purpose companion modules.
 */
import React, { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import './LoginSecurityPage.css';

import {
  useLoginSecurity,
  SummaryCards,
  ActiveLockoutsSection,
  StatsSection,
  FiltersSection,
  AttemptsTable,
} from './loginSecurity';

export * from './loginSecurity';

const LoginSecurityPage: FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const {
    status,
    setStatus,
    sinceMinutes,
    setSinceMinutes,
    emailFilter,
    setEmailFilter,
    attempts,
    stats,
    activeLockouts,
    loading,
    error,
    unlockingId,
    unlockingIp,
    toast,
    fetchAttempts,
    handleUnlock,
    handleUnlockIp,
    handleUnlockAccount,
    handleExportCsv,
  } = useLoginSecurity();

  // RBAC guard — server enforces too, but keep buyers/agents out of the UI
  useEffect(() => {
    if (user && user.role !== 'owner' && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const failureCount = useMemo(
    () => attempts.filter((a) => a.action === 'login_failed').length,
    [attempts],
  );
  const successCount = useMemo(
    () => attempts.filter((a) => a.action === 'login').length,
    [attempts],
  );

  return (
    <div className="login-security-page">
      <header className="ls-header">
        <h1>Login Security</h1>
        <p>Monitor recent login activity, investigate suspicious attempts, and clear lockouts.</p>
      </header>

      <SummaryCards
        successCount={successCount}
        failureCount={failureCount}
        totalCount={attempts.length}
      />

      {activeLockouts && (
        <ActiveLockoutsSection
          activeLockouts={activeLockouts}
          unlockingId={unlockingId}
          unlockingIp={unlockingIp}
          onUnlockAccount={handleUnlockAccount}
          onUnlockIp={handleUnlockIp}
        />
      )}

      <StatsSection
        stats={stats}
        unlockingIp={unlockingIp}
        onUnlockIp={handleUnlockIp}
      />

      <FiltersSection
        status={status}
        sinceMinutes={sinceMinutes}
        emailFilter={emailFilter}
        loading={loading}
        attemptsCount={attempts.length}
        onStatusChange={setStatus}
        onSinceMinutesChange={setSinceMinutes}
        onEmailFilterChange={setEmailFilter}
        onRefresh={() => fetchAttempts()}
        onExportCsv={handleExportCsv}
      />

      {error && <div className="ls-error" role="alert">{error}</div>}
      {toast && <div className="ls-toast" role="status">{toast}</div>}

      <AttemptsTable
        loading={loading}
        attempts={attempts}
        unlockingId={unlockingId}
        onUnlock={handleUnlock}
      />
    </div>
  );
};

export default LoginSecurityPage;
