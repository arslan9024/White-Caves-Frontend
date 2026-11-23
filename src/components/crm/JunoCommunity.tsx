import * as React from 'react';
import './AssistantDashboard.css';
import { JunoCommunityHeader } from './JunoCommunity/JunoCommunityHeader';
import { FacilityBookingDesk } from './JunoCommunity/FacilityBookingDesk';
import { MaintenanceTicketDesk } from './JunoCommunity/MaintenanceTicketDesk';
import { CommunityNoticeBoard } from './JunoCommunity/CommunityNoticeBoard';
import { TenantServiceTracker } from './JunoCommunity/TenantServiceTracker';
import { useJunoCommunity } from './JunoCommunity/useJunoCommunity';
import { TABS_CONFIG } from './JunoCommunity/data';
import { junoCommunityStyles, getTabButtonStyle } from './JunoCommunity/styles';
import type { JunoCommunityProps } from './JunoCommunity/types';

export * from './JunoCommunity/types';
export * from './JunoCommunity/data';
export * from './JunoCommunity/styles';
export * from './JunoCommunity/useJunoCommunity';
export * from './JunoCommunity/JunoCommunityHeader';
export * from './JunoCommunity/FacilityBookingDesk';
export * from './JunoCommunity/MaintenanceTicketDesk';
export * from './JunoCommunity/CommunityNoticeBoard';
export * from './JunoCommunity/TenantServiceTracker';

export const JunoCommunity: React.FC<JunoCommunityProps> = ({ moduleId }) => {
  const { activeTab, setActiveTab, bookings, tickets, notices } = useJunoCommunity(moduleId);

  return (
    <div className="crm-container" style={junoCommunityStyles.container}>
      {/* Header */}
      <JunoCommunityHeader />

      {/* Tabs */}
      <div style={junoCommunityStyles.tabsContainer}>
        {TABS_CONFIG.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={getTabButtonStyle(activeTab === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Bookings */}
      {activeTab === 'booking' && <FacilityBookingDesk bookings={bookings} />}

      {/* Tab 2: Maintenance SLA */}
      {activeTab === 'maintenance' && <MaintenanceTicketDesk tickets={tickets} />}

      {/* Tab 3: Service */}
      {activeTab === 'service' && <TenantServiceTracker />}

      {/* Tab 4: Notice Board */}
      {activeTab === 'notices' && <CommunityNoticeBoard notices={notices} />}
    </div>
  );
};

export default JunoCommunity;
