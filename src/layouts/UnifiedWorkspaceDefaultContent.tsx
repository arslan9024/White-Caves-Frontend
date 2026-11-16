/**
 * UnifiedWorkspaceDefaultContent.tsx — Default Content Canvas (KPIs & Sub-items)
 */

import React from 'react';
import { Layers } from 'lucide-react';
import type { WorkspaceViewItem } from './UnifiedWorkspaceLayout.data';

interface UnifiedWorkspaceDefaultContentProps {
  activeView: {
    code: string;
    title: string;
  };
  richViewData?: WorkspaceViewItem;
  activeSubItemId: string | null;
  setActiveSubItemId: (id: string | null) => void;
}

export const UnifiedWorkspaceDefaultContent: React.FC<UnifiedWorkspaceDefaultContentProps> = ({
  activeView,
  richViewData,
  activeSubItemId,
  setActiveSubItemId,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Executive Tile Overview Card */}
      <div
        style={{
          backgroundColor: 'var(--white, #FFFFFF)',
          borderRadius: '16px',
          border: '1px solid var(--border-color, #E2E8F0)',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  backgroundColor: 'var(--primary-red, #EF4444)',
                  color: 'var(--white, #FFFFFF)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 800,
                  fontFamily: 'monospace',
                }}
              >
                {activeView.code}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--bg-dark, #0F172A)',
                }}
              >
                {activeView.title}
              </h3>
            </div>
            <p
              style={{
                margin: 0,
                color: 'var(--text-secondary, #64748B)',
                fontSize: '14px',
                maxWidth: '800px',
                lineHeight: 1.6,
              }}
            >
              {richViewData?.description ||
                `Active RUP Sovereign module operating under Dubai DET license 1388443 and RERA Brokerage ORN 44483.`}
            </p>
          </div>

          <span
            style={{
              padding: '6px 12px',
              borderRadius: '9999px',
              backgroundColor: 'var(--green-bg, #ECFDF5)',
              color: 'var(--accent-green, #10B981)',
              border: '1px solid var(--green-border, #A7F3D0)',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            ● Active Module · 100% Operational
          </span>
        </div>

        {/* KPI Stat Cards Grid */}
        {richViewData?.kpis && richViewData.kpis.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid var(--slate-100, #F1F5F9)',
            }}
          >
            {richViewData.kpis.map((kpi, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-light, #F8FAFC)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color, #E2E8F0)',
                  padding: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--text-secondary, #64748B)',
                    textTransform: 'uppercase',
                  }}
                >
                  {kpi.label}
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: 'var(--bg-dark, #0F172A)',
                    marginTop: '4px',
                  }}
                >
                  {kpi.value}
                </div>
                {kpi.trend && (
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--accent-green, #10B981)',
                      fontWeight: 700,
                      marginTop: '4px',
                    }}
                  >
                    ✓ {kpi.trend}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sub-Items Detailed Breakdown Panel */}
      {richViewData?.subItems && richViewData.subItems.length > 0 && (
        <div
          style={{
            backgroundColor: 'var(--white, #FFFFFF)',
            borderRadius: '16px',
            border: '1px solid var(--border-color, #E2E8F0)',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          }}
        >
          <h4
            style={{
              margin: '0 0 16px',
              fontSize: '16px',
              fontWeight: 800,
              color: 'var(--bg-dark, #0F172A)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Layers size={18} style={{ color: 'var(--primary-red, #EF4444)' }} />
            <span>
              Sub-Items & Operational Capabilities ({richViewData.subItems.length})
            </span>
          </h4>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '14px',
            }}
          >
            {richViewData.subItems.map(sub => {
              const isSelected = activeSubItemId === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => setActiveSubItemId(sub.id)}
                  style={{
                    backgroundColor: isSelected
                      ? 'rgba(239, 68, 68, 0.04)'
                      : 'var(--bg-light, #F8FAFC)',
                    border: isSelected
                      ? '1.5px solid var(--primary-red, #EF4444)'
                      : '1px solid var(--border-color, #E2E8F0)',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: 'var(--primary-red, #EF4444)',
                        fontFamily: 'monospace',
                        backgroundColor: 'rgba(239,68,68,0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {sub.code}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--accent-green, #10B981)',
                        fontWeight: 700,
                      }}
                    >
                      ✓ Ready
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: '14px',
                      color: 'var(--bg-dark, #0F172A)',
                      marginBottom: '4px',
                    }}
                  >
                    {sub.label}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary, #64748B)',
                      lineHeight: 1.4,
                    }}
                  >
                    Integrated sovereign subsystem ready for instant execution.
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedWorkspaceDefaultContent;

