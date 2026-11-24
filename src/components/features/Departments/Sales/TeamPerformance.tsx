import React from 'react';
import { formatCurrency } from '../../../../utils';
import { TeamMemberData } from './types';
import {
  SectionCard,
  SectionTitle,
  TeamGrid,
  TeamMember,
  TeamMemberName,
  TeamMemberRole,
  TeamMemberStats,
} from './styled';

interface TeamPerformanceProps {
  teamData: TeamMemberData[];
}

export const TeamPerformance: React.FC<TeamPerformanceProps> = ({ teamData }) => {
  return (
    <SectionCard>
      <SectionTitle>👥 Team Performance</SectionTitle>
      <TeamGrid>
        {teamData.map((member, idx) => (
          <TeamMember key={idx}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <div>
                <TeamMemberName>{member.name}</TeamMemberName>
                <TeamMemberRole>{member.role}</TeamMemberRole>
              </div>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#3B82F6',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 700,
                }}
              >
                {member.name.charAt(0)}
              </div>
            </div>
            <TeamMemberStats>
              <div>
                <span style={{ color: 'var(--text-secondary, #6B7280)', fontSize: '12px' }}>
                  Deals
                </span>
                <div style={{ fontWeight: 600, fontSize: '18px' }}>{member.deals}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary, #6B7280)', fontSize: '12px' }}>
                  Revenue
                </span>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>
                  {formatCurrency(member.revenue)}
                </div>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary, #6B7280)', fontSize: '12px' }}>
                  Conv Rate
                </span>
                <div style={{ fontWeight: 600, fontSize: '18px' }}>{member.conversion}%</div>
              </div>
            </TeamMemberStats>
          </TeamMember>
        ))}
      </TeamGrid>
    </SectionCard>
  );
};
