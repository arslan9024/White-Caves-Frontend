/**
 * DivisionManagersGrid.tsx
 *
 * Level 2: 9 Division Managers of Selected Department (108 Total Company-Wide).
 */

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { SupervisorDef } from '../../../data/assistants108Registry.data';
import { DepartmentRegistryItem } from './types';

interface DivisionManagersGridProps {
  activeDept: DepartmentRegistryItem;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectSupervisor: (supervisor: SupervisorDef) => void;
}

export const DivisionManagersGrid: FC<DivisionManagersGridProps> = ({
  activeDept,
  searchQuery,
  onSearchChange,
  onSelectSupervisor,
}) => {
  const filteredSupervisors = activeDept.supervisors.filter(
    (s: SupervisorDef) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.specialty?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        background: '#F8FAFC',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        padding: '1.25rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div>
          <span
            style={{
              background: '#EF4444',
              color: '#FFFFFF',
              fontSize: '0.68rem',
              fontWeight: 900,
              padding: '2px 6px',
              borderRadius: '4px',
              textTransform: 'uppercase',
            }}
          >
            Level 2 Division Managers (108 Total)
          </span>
          <h4 style={{ margin: '4px 0 0 0', fontSize: '1.05rem', fontWeight: 800 }}>
            {activeDept.icon} {activeDept.name} — 9 Division Managers (12 Supervisors Capacity Each)
          </h4>
        </div>

        <input
          type="text"
          placeholder="Search supervisors by role..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid #CBD5E1',
            fontSize: '0.8rem',
            width: '220px',
            outline: 'none',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '10px',
        }}
      >
        {filteredSupervisors.map((sup: SupervisorDef) => (
          <motion.div
            key={sup.id}
            whileHover={{ y: -2 }}
            onClick={() => onSelectSupervisor(sup)}
            style={{
              background: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '12px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '6px',
              }}
            >
              <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>{sup.name}</strong>
              <span
                style={{
                  background: sup.status === 'active' ? '#DCFCE7' : '#DBEAFE',
                  color: sup.status === 'active' ? '#166534' : '#1E40AF',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '2px 5px',
                  borderRadius: '4px',
                }}
              >
                {sup.status}
              </span>
            </div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#EF4444',
                marginBottom: '4px',
              }}
            >
              {sup.title}
            </div>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748B', lineHeight: '1.3' }}>
              {sup.specialty}
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid #F1F5F9',
                paddingTop: '6px',
                marginTop: '6px',
                fontSize: '0.68rem',
                color: '#94A3B8',
              }}
            >
              <span>SLA: &lt;15m</span>
              <span style={{ color: '#059669', fontWeight: 700 }}>Dispatch Task ➔</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
