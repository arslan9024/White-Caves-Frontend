/**
 * UnifiedWorkspaceSidebar.tsx — Unified Left Navigation Sidebar
 */

import React from 'react';
import { PanelLeftClose, PanelLeft, Search } from 'lucide-react';
import { UnifiedWorkspaceMdHub } from './UnifiedWorkspaceMdHub';
import { UnifiedWorkspaceNavTiles } from './UnifiedWorkspaceNavTiles';
import { UnifiedWorkspaceUserFooter } from './UnifiedWorkspaceUserFooter';

interface UserProfileLike {
  name: string;
  role: string;
  accessLevel: number;
  isFounder?: boolean;
}

interface UnifiedWorkspaceSidebarProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isLevel5: boolean;
  userProfile: UserProfileLike;
  isMdHubOpen: boolean;
  setIsMdHubOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertBadge: React.ReactNode;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  filteredViews: Array<{
    id: string;
    code: string;
    title: string;
    group?: string;
    category?: string;
  }>;
  activeViewCode: string;
  setActiveViewCode: (code: string) => void;
  activeSubItemId: string | null;
  setActiveSubItemId: (id: string | null) => void;
  onNavigate: (route: string) => void;
}

export const UnifiedWorkspaceSidebar: React.FC<UnifiedWorkspaceSidebarProps> = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isLevel5,
  userProfile,
  isMdHubOpen,
  setIsMdHubOpen,
  alertBadge,
  searchTerm,
  setSearchTerm,
  categories,
  activeCategory,
  setActiveCategory,
  filteredViews,
  activeViewCode,
  setActiveViewCode,
  activeSubItemId,
  setActiveSubItemId,
  onNavigate,
}) => {
  return (
    <aside
      style={{
        width: isSidebarCollapsed ? '76px' : '340px',
        backgroundColor: 'var(--bg-dark, #0F172A)',
        color: 'var(--white, #FFFFFF)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '2px solid var(--primary-red, #EF4444)',
        flexShrink: 0,
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflowX: 'hidden',
      }}
    >
      {/* Sidebar Brand Header & Collapse Toggle */}
      <div
        style={{
          padding: isSidebarCollapsed ? '16px 8px' : '16px 18px',
          backgroundColor: 'var(--bg-darker, #0B0F19)',
          borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
          gap: '10px',
        }}
      >
        {!isSidebarCollapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background:
                  'linear-gradient(135deg, var(--primary-red, #EF4444) 0%, var(--primary-red-hover, #DC2626) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '15px',
                color: 'var(--white, #FFFFFF)',
                boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
                flexShrink: 0,
              }}
            >
              WC
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: '14px',
                  fontWeight: 800,
                  color: 'var(--white, #FFFFFF)',
                  letterSpacing: '0.5px',
                }}
              >
                WHITE CAVES
              </h1>
              <span
                style={{
                  fontSize: '10px',
                  color: 'var(--text-muted, #94A3B8)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 700,
                }}
              >
                Sovereign ERP · L{userProfile.accessLevel}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsSidebarCollapsed(prev => !prev)}
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: 'var(--primary-red, #EF4444)',
            borderRadius: '8px',
            padding: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
        >
          {isSidebarCollapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* 👑 MANAGING DIRECTOR HUB (LEVEL 5 EXCLUSIVE) */}
      {isLevel5 && !isSidebarCollapsed && (
        <UnifiedWorkspaceMdHub
          isMdHubOpen={isMdHubOpen}
          setIsMdHubOpen={setIsMdHubOpen}
          alertBadge={alertBadge}
          onSelectView={(code, route) => {
            setActiveViewCode(code);
            onNavigate(route);
          }}
        />
      )}

      {/* Search & Category Filter */}
      {!isSidebarCollapsed && (
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--card-dark, #1E293B)' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search views & sub-items..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Search workspace views"
              style={{
                width: '100%',
                padding: '9px 12px 9px 34px',
                borderRadius: '8px',
                border: '1px solid var(--border-color, #334155)',
                backgroundColor: 'var(--card-dark, #1E293B)',
                color: 'var(--white, #FFFFFF)',
                fontSize: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '11px',
                color: 'var(--text-muted, #94A3B8)',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              marginTop: '10px',
              paddingBottom: '4px',
            }}
          >
            {categories.slice(0, 6).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor:
                    activeCategory === cat
                      ? 'var(--primary-red, #EF4444)'
                      : 'var(--card-dark, #1E293B)',
                  color: 'var(--white, #FFFFFF)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor:
                    activeCategory === cat
                      ? 'var(--primary-red, #EF4444)'
                      : 'var(--border-color, #334155)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Large Card-Tile View Navigation */}
      <UnifiedWorkspaceNavTiles
        isSidebarCollapsed={isSidebarCollapsed}
        filteredViews={filteredViews}
        activeViewCode={activeViewCode}
        setActiveViewCode={setActiveViewCode}
        activeSubItemId={activeSubItemId}
        setActiveSubItemId={setActiveSubItemId}
        onNavigate={onNavigate}
      />

      {/* User Footer with Role Badge */}
      <UnifiedWorkspaceUserFooter
        isSidebarCollapsed={isSidebarCollapsed}
        isLevel5={isLevel5}
        userProfile={userProfile}
      />
    </aside>
  );
};

export default UnifiedWorkspaceSidebar;
