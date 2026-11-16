/**
 * UnifiedWorkspaceLayout.tsx — View Layer (Master Facade & Root Container)
 *
 * Upgraded Sovereign Layout with Large Sidebar Tiles, Sub-Item Accordion Trees,
 * High-Density Telemetry Viewports, and Full Integration with Zoe AI & Aurora SWE Docs.
 * Palette: var(--primary-red, #EF4444) | var(--white, #FFFFFF) | var(--card-dark, #1E293B)
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar/TopNavbar';
import { useWorkspaceLayoutLogic } from './UnifiedWorkspaceLayout.logic';
import { WORKSPACE_VIEWS, WorkspaceViewItem } from './UnifiedWorkspaceLayout.data';
import { getLicenseStatuses, hasExpiringLicenses } from '../utils/licenseMonitors';
import { UnifiedWorkspaceSidebar } from './UnifiedWorkspaceSidebar';
import { UnifiedWorkspaceContentHeader } from './UnifiedWorkspaceContentHeader';
import { UnifiedWorkspaceDefaultContent } from './UnifiedWorkspaceDefaultContent';
import type { UnifiedWorkspaceLayoutProps } from './UnifiedWorkspaceLayout.types';

export const UnifiedWorkspaceLayout: React.FC<UnifiedWorkspaceLayoutProps> = ({
  currentUserEmail = 'arslanmalikgoraha@gmail.com',
  initialViewId = 'VIEW-01',
  defaultSidebarOpen = false,
  children,
}) => {
  const navigate = useNavigate();
  const [isMdHubOpen, setIsMdHubOpen] = useState(defaultSidebarOpen);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(!defaultSidebarOpen);
  const [activeSubItemId, setActiveSubItemId] = useState<string | null>(null);

  const {
    userProfile,
    activeViewCode,
    searchTerm,
    activeCategory,
    activeView,
    categories,
    filteredViews,
    isSidebarOpen,
    setActiveViewCode,
    setSearchTerm,
    setActiveCategory,
    setIsSidebarOpen,
  } = useWorkspaceLayoutLogic(currentUserEmail, initialViewId);

  const isLevel5 = userProfile.isFounder || userProfile.accessLevel >= 5;

  const statuses = React.useMemo(() => getLicenseStatuses(), []);
  const hasAlerts = hasExpiringLicenses(statuses);

  // Match active rich view data if available
  const richViewData: WorkspaceViewItem | undefined = React.useMemo(() => {
    return WORKSPACE_VIEWS.find(
      v => v.code === activeViewCode || v.id === activeViewCode || v.id === activeView.id
    );
  }, [activeViewCode, activeView]);

  const alertBadge = hasAlerts ? (
    <span
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: 'var(--primary-red, #EF4444)',
        borderRadius: '50%',
        display: 'inline-block',
        boxShadow: '0 0 8px var(--primary-red, #EF4444)',
        animation: 'pulse 2s infinite',
      }}
    />
  ) : null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: 'var(--white, #FFFFFF)',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      {/* ── FIXED TOP NAVBAR ────────────────────────────────────────────────── */}
      <TopNavbar
        isMDMode={isLevel5}
        onToggleSidebar={() => {
          setIsSidebarCollapsed(prev => !prev);
          setIsSidebarOpen(!isSidebarOpen);
        }}
      />

      {/* ── MAIN WORKSPACE BODY ─────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          paddingTop: '68px',
          height: 'calc(100vh - 68px)',
          overflow: 'hidden',
        }}
      >
        {/* ── UNIFIED RECURSIVE LEFT SIDEBAR ─────────────────────────────────── */}
        <UnifiedWorkspaceSidebar
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          isLevel5={isLevel5}
          userProfile={userProfile}
          isMdHubOpen={isMdHubOpen}
          setIsMdHubOpen={setIsMdHubOpen}
          alertBadge={alertBadge}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          filteredViews={filteredViews}
          activeViewCode={activeViewCode}
          setActiveViewCode={setActiveViewCode}
          activeSubItemId={activeSubItemId}
          setActiveSubItemId={setActiveSubItemId}
          onNavigate={navigate}
        />

        {/* ── MAIN CONTENT CANVAS ───────────────────────────────────────────── */}
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--white, #FFFFFF)',
            overflow: 'hidden',
          }}
        >
          {/* Content Header Banner */}
          <UnifiedWorkspaceContentHeader
            richViewData={richViewData}
            activeView={activeView}
            onNavigate={navigate}
          />

          {/* Content Body Viewport */}
          <div
            style={{
              flex: 1,
              padding: '28px',
              overflowY: 'auto',
              backgroundColor: 'var(--bg-light, #F8FAFC)',
            }}
          >
            {children ? (
              children
            ) : (
              <UnifiedWorkspaceDefaultContent
                activeView={activeView}
                richViewData={richViewData}
                activeSubItemId={activeSubItemId}
                setActiveSubItemId={setActiveSubItemId}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UnifiedWorkspaceLayout;
export type { UnifiedWorkspaceLayoutProps };

