import React from 'react';
import type { InventoryProperty } from './types';

interface PropertyMatrixProps {
  filteredProperties: InventoryProperty[];
  selectedPropertyId: string | null;
  onSelectProperty: (id: string) => void;
}

export const PropertyMatrix: React.FC<PropertyMatrixProps> = ({
  filteredProperties,
  selectedPropertyId,
  onSelectProperty,
}) => (
  <div
    style={{
      background: '#FFFFFF',
      border: '1px solid rgba(239, 68, 68, 0.2)',
      borderRadius: '14px',
      padding: '1.25rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      maxHeight: '680px',
      overflowY: 'auto',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        borderBottom: '1px solid var(--color-f1f5f9, #F1F5F9)',
        paddingBottom: '0.75rem',
      }}
    >
      <div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--accent-red, #EF4444)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Stage 2: Itemized Property Matrix
        </span>
        <h4
          style={{
            margin: '2px 0 0',
            fontSize: '1.05rem',
            fontWeight: 800,
            color: 'var(--color-1e293b, #1E293B)',
          }}
        >
          Showing {filteredProperties.slice(0, 50).length} of {filteredProperties.length} Properties
        </h4>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {filteredProperties.slice(0, 50).map(prop => {
        const isSelected = selectedPropertyId === prop.id;
        return (
          <div
            key={prop.id}
            onClick={() => onSelectProperty(prop.id)}
            style={{
              background: isSelected ? 'rgba(239, 68, 68, 0.08)' : '#F8FAFC',
              border: isSelected ? '2px solid #EF4444' : '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isSelected ? '0 4px 12px rgba(239, 68, 68, 0.15)' : 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.4rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    color: 'var(--color-1e293b, #1E293B)',
                  }}
                >
                  {prop.id}
                </span>
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary, #64748B)',
                    fontWeight: 700,
                  }}
                >
                  (P-No: {prop.pNumber})
                </span>
                <span
                  style={{
                    background: 'var(--text-secondary, #E2E8F0)',
                    color: 'var(--color-334155, #334155)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '4px',
                  }}
                >
                  {prop.type}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: prop.objective.includes('Sale')
                    ? 'rgba(239, 68, 68, 0.12)'
                    : 'rgba(16, 185, 129, 0.12)',
                  color: prop.objective.includes('Sale') ? '#EF4444' : '#10B981',
                }}
              >
                {prop.objective}
              </span>
            </div>

            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-475569, #475569)',
                marginBottom: '0.4rem',
              }}
            >
              Cluster:{' '}
              <strong style={{ color: 'var(--accent-red, #EF4444)' }}>{prop.sector}</strong> · Plot:{' '}
              <strong>{prop.plotNumber}</strong> · Config: <strong>{prop.config}</strong>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid var(--text-secondary, #E2E8F0)',
                paddingTop: '0.4rem',
              }}
            >
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  color: 'var(--accent-green, #10B981)',
                }}
              >
                {prop.askingPrice}
              </span>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: 'var(--accent-red, #EF4444)',
                }}
              >
                {isSelected ? '✓ Profile Active' : 'View Profile Drawer ➔'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
