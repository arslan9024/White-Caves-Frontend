/**
 * UnifiedWorkspaceNavTiles.tsx — Operations Card-Tile Navigation & Sub-Items Accordion
 */

import React from 'react';
import { WORKSPACE_VIEWS } from './UnifiedWorkspaceLayout.data';

interface UnifiedWorkspaceNavTilesProps {
  isSidebarCollapsed: boolean;
  filteredViews: Array<{ id: string; code: string; title: string; group?: string; category?: string }>;
  activeViewCode: string;
  setActiveViewCode: (code: string) => void;
  activeSubItemId: string | null;
  setActiveSubItemId: (id: string | null) => void;
  onNavigate?: (route: string) => void;
}

export const UnifiedWorkspaceNavTiles: React.FC<UnifiedWorkspaceNavTilesProps> = ({
  isSidebarCollapsed,
  filteredViews,
  activeViewCode,
  setActiveViewCode,
  activeSubItemId,
  setActiveSubItemId,
  onNavigate,
}) => {
  return (
    <nav
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: isSidebarCollapsed ? '12px 6px' : '14px 12px',
      }}
      aria-label="Workspace views navigation"
    >
      {!isSidebarCollapsed && (
        <div
          style={{
            fontSize: '10px',
            fontWeight: 800,
            color: 'var(--text-muted, #94A3B8)',
            padding: '4px 8px',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Operations Tiles</span>
          <span>{filteredViews.length} Views</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredViews.map(view => {
          const isActive = view.code === activeViewCode || view.id === activeViewCode;
          const viewRich = WORKSPACE_VIEWS.find(v => v.code === view.code || v.id === view.id);

          return (
            <div
              key={view.id}
              style={{
                backgroundColor: isActive
                  ? 'rgba(239, 68, 68, 0.12)'
                  : 'var(--card-dark, #1E293B)',
                border: isActive
                  ? '1.5px solid var(--primary-red, #EF4444)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: isSidebarCollapsed ? '10px 4px' : '12px 14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 14px rgba(239, 68, 68, 0.25)' : 'none',
              }}
              onClick={() => {
                setActiveViewCode(view.code);
                setActiveSubItemId(null);
                if (onNavigate && viewRich?.path) {
                  onNavigate(viewRich.path);
                }
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isSidebarCollapsed ? 'center' : 'space-between',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      padding: '3px 6px',
                      borderRadius: '4px',
                      backgroundColor: isActive
                        ? 'var(--primary-red, #EF4444)'
                        : 'var(--border-color, #334155)',
                      color: 'var(--white, #FFFFFF)',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                    }}
                  >
                    {view.code}
                  </span>

                  {!isSidebarCollapsed && (
                    <div style={{ overflow: 'hidden' }}>
                      <div
                        style={{
                          color: 'var(--white, #FFFFFF)',
                          fontWeight: isActive ? 800 : 700,
                          fontSize: '13px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {view.title}
                      </div>
                      <div
                        style={{
                          fontSize: '10px',
                          color: isActive
                            ? 'var(--red-light, #FCA5A5)'
                            : 'var(--text-muted, #94A3B8)',
                          marginTop: '2px',
                        }}
                      >
                        {viewRich?.departmentFloor || view.group}
                      </div>
                    </div>
                  )}
                </div>

                {!isSidebarCollapsed && viewRich?.badge && (
                  <span
                    style={{
                      fontSize: '9px',
                      padding: '2px 6px',
                      borderRadius: '9999px',
                      backgroundColor: isActive
                        ? 'rgba(239, 68, 68, 0.25)'
                        : 'rgba(255, 255, 255, 0.06)',
                      color: isActive
                        ? 'var(--primary-red, #EF4444)'
                        : 'var(--text-secondary, #CBD5E1)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {viewRich.badge}
                  </span>
                )}
              </div>

              {/* Sub-Items Tree when Expanded & Active */}
              {!isSidebarCollapsed &&
                isActive &&
                viewRich?.subItems &&
                viewRich.subItems.length > 0 && (
                  <div
                    style={{
                      marginTop: '10px',
                      paddingTop: '8px',
                      borderTop: '1px solid rgba(239, 68, 68, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        color: 'var(--red-light, #FCA5A5)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Nested Sub-Items & Modules
                    </div>
                    {viewRich.subItems.map(sub => {
                      const isSubActive = activeSubItemId === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={e => {
                            e.stopPropagation();
                            setActiveSubItemId(sub.id);
                            if (onNavigate) {
                              const targetSubRoute = viewRich?.path
                                ? `${viewRich.path}?subItem=${encodeURIComponent(sub.id)}`
                                : `/dashboard?subItem=${encodeURIComponent(sub.id)}`;
                              onNavigate(targetSubRoute);
                            }
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            backgroundColor: isSubActive
                              ? 'var(--primary-red, #EF4444)'
                              : 'rgba(15, 23, 42, 0.6)',
                            border: isSubActive
                              ? '1px solid var(--primary-red, #EF4444)'
                              : '1px solid rgba(255, 255, 255, 0.05)',
                            color: isSubActive
                              ? 'var(--white, #FFFFFF)'
                              : 'var(--border-color, #E2E8F0)',
                            fontSize: '11px',
                            fontWeight: isSubActive ? 700 : 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span
                              style={{
                                opacity: 0.7,
                                fontFamily: 'monospace',
                                fontSize: '9px',
                              }}
                            >
                              {sub.code}
                            </span>
                            <span>{sub.label}</span>
                          </div>
                          <span
                            style={{
                              fontSize: '10px',
                              color: isSubActive
                                ? 'var(--white, #FFFFFF)'
                                : 'var(--accent-green, #10B981)',
                            }}
                          >
                            ●
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default UnifiedWorkspaceNavTiles;

