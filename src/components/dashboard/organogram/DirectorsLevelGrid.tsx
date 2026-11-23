/**
 * DirectorsLevelGrid.tsx
 *
 * Level 1: 12 Corporate Department Directors Grid.
 */

import React, { FC } from 'react';
import { DepartmentRegistryItem } from './types';

interface DirectorsLevelGridProps {
  departments: DepartmentRegistryItem[];
  selectedDeptId: string;
  onSelectDepartment: (deptId: string) => void;
}

export const DirectorsLevelGrid: FC<DirectorsLevelGridProps> = ({
  departments,
  selectedDeptId,
  onSelectDepartment,
}) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: '0.9rem',
            fontWeight: 800,
            color: '#475569',
            textTransform: 'uppercase',
          }}
        >
          Level 1: 12 Corporate Department Directors ({departments.length} Locked Departments)
        </h4>
        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
          Click a department to view its 9 Division Managers (108 total company-wide)
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '8px',
        }}
      >
        {departments.map((dept: DepartmentRegistryItem) => {
          const isSelected = dept.id === selectedDeptId;
          return (
            <button
              key={dept.id}
              onClick={() => onSelectDepartment(dept.id)}
              style={{
                background: isSelected ? '#0F172A' : '#F8FAFC',
                color: isSelected ? '#FFFFFF' : '#334155',
                border: isSelected ? '2px solid #EF4444' : '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '10px 8px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}
              >
                <span style={{ fontSize: '1.1rem' }}>{dept.icon}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {dept.name}
                </span>
              </div>
              <div style={{ fontSize: '0.68rem', color: isSelected ? '#94A3B8' : '#64748B' }}>
                👔 {dept.manager}
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: isSelected ? '#FCA5A5' : '#EF4444',
                  fontWeight: 700,
                }}
              >
                🤖 {dept.aiLead}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
