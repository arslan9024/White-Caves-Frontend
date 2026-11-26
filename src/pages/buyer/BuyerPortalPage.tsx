/**
 * BuyerPortalPage — Phase 2: Buyer Client Portal
 *
 * Self-service portal for buyers to manage overview, saved listings,
 * UAE mortgage/DLD calculators, and profile credentials.
 * Single-purpose file complying with AEGIS AEG-008 & AEG-042 (< 350 lines).
 */

import React, { FC, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Home, Heart, Calculator, User } from 'lucide-react';
import type { RootState } from '../../store/store';
import '../RolePages.css';
import PortalLayout from '../../components/portal/PortalLayout';
import PortalSidebarContainer, {
  type TabConfig,
} from '../../components/portal/containers/PortalSidebarContainer';
import PortalProfileTab from '../../components/portal/PortalProfileTab';
import { BuyerHomeOverviewTab } from './buyerPortal/BuyerHomeOverviewTab';
import { BuyerSavedTab, BuyerFinancialToolsTab } from './buyerPortal/BuyerSavedAndToolsTabs';

type TabKey = 'home' | 'saved' | 'tools' | 'profile';

const BuyerPortalPage: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const tabs: TabConfig<TabKey>[] = useMemo(
    () => [
      { key: 'home', label: 'Dashboard', icon: <Home size={16} /> },
      { key: 'saved', label: 'Saved Units', icon: <Heart size={16} /> },
      { key: 'tools', label: 'Mortgage & DLD', icon: <Calculator size={16} /> },
      { key: 'profile', label: 'Profile', icon: <User size={16} /> },
    ],
    []
  );

  if (!currentUser) {
    return (
      <div className="role-page no-sidebar">
        <div className="role-page-content full-width">
          <div className="error-message">
            <p>
              Please <Link to="/signin">sign in</Link> to access your Buyer Portal.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PortalLayout portalType="buyer">
      <div
        className="portal-container"
        style={{ padding: '1.5rem', maxWidth: '1280px', margin: '0 auto' }}
      >
        <PortalSidebarContainer<TabKey>
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          ariaLabel="Buyer Portal Navigation"
        />

        <div className="portal-tab-content" style={{ marginTop: '1.5rem' }}>
          {activeTab === 'home' && (
            <BuyerHomeOverviewTab buyerName={currentUser.name || 'Valued Buyer'} />
          )}
          {activeTab === 'saved' && <BuyerSavedTab />}
          {activeTab === 'tools' && <BuyerFinancialToolsTab />}
          {activeTab === 'profile' && <PortalProfileTab />}
        </div>
      </div>
    </PortalLayout>
  );
};

export default BuyerPortalPage;
