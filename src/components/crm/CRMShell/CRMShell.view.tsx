/**
 * CRM Shell — View Layer (Mary Allen Wilkes Architecture)
 * Unified shell orchestrator linking TopBar, Sidebar, Main Content Area, and AI Panel
 * Strictly < 350 lines
 */

import React from 'react';
import type { CRMShellProps } from './CRMShell.types';
import { useCRMShellLogic } from './CRMShell.logic';
import { CRMTopBar, CRMSidebarNav, CRMAiPanel } from './CRMShell.panels';
import '../../../styles/crm-layout.css';

export const CRMShell: React.FC<CRMShellProps> = ({ children, onTabChange }) => {
  const {
    dispatch,
    navigate,
    user,
    sidebarOpen,
    aiPanelOpen,
    activeCategory,
    activeSubItem,
    aiAssistants,
    breadcrumbs,
    selectedAssistantForChat,
    navTree,
    expandedGroups,
    theme,
    searchQuery,
    setSearchQuery,
    showUserMenu,
    setShowUserMenu,
    toggleTheme,
    handleGroupToggle,
    handleSubItemClick,
    handleBreadcrumbClick,
    handleAssistantClick,
    handleLogout,
    groupedAssistants,
  } = useCRMShellLogic(onTabChange);

  const shellClasses = [
    'crm-shell',
    sidebarOpen ? 'sidebar-open' : '',
    aiPanelOpen ? 'ai-panel-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={shellClasses}>
      <CRMTopBar
        sidebarOpen={sidebarOpen}
        aiPanelOpen={aiPanelOpen}
        breadcrumbs={breadcrumbs}
        searchQuery={searchQuery}
        theme={theme}
        user={user}
        showUserMenu={showUserMenu}
        setSearchQuery={setSearchQuery}
        setShowUserMenu={setShowUserMenu}
        toggleTheme={toggleTheme}
        handleBreadcrumbClick={handleBreadcrumbClick}
        handleLogout={handleLogout}
        dispatch={dispatch}
        navigate={navigate}
      />

      <CRMSidebarNav
        navTree={navTree}
        expandedGroups={expandedGroups}
        activeCategory={activeCategory}
        activeSubItem={activeSubItem}
        handleGroupToggle={handleGroupToggle}
        handleSubItemClick={handleSubItemClick}
      />

      <main className="crm-main">
        <div className="crm-main-content">{children}</div>
      </main>

      <CRMAiPanel
        aiAssistants={aiAssistants}
        groupedAssistants={groupedAssistants}
        selectedAssistantForChat={selectedAssistantForChat}
        handleAssistantClick={handleAssistantClick}
        dispatch={dispatch}
      />

      {showUserMenu && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100 }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default CRMShell;

