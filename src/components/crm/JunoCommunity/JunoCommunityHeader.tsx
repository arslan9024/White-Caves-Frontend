import * as React from 'react';
import { junoCommunityStyles } from './styles';

export const JunoCommunityHeader: React.FC = () => {
  return (
    <div style={junoCommunityStyles.header}>
      <div style={junoCommunityStyles.headerLeft}>
        <div style={junoCommunityStyles.iconBox}>
          <span role="img" aria-label="community">
            🏘️
          </span>
        </div>
        <div>
          <div style={junoCommunityStyles.titleRow}>
            <h2 style={junoCommunityStyles.title}>Juno AI — Community Operations & Facilities</h2>
            <span style={junoCommunityStyles.badge}>Residents Experience Hub</span>
          </div>
          <p style={junoCommunityStyles.subtitle}>
            Amenity reservations, rapid maintenance ticket SLA dispatch, tenant request logs &
            community broadcast bulletins.
          </p>
        </div>
      </div>
    </div>
  );
};
