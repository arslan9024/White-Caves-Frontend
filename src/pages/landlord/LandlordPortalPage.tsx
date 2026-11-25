/**
 * LandlordPortalPage — Landlord Self-Service Portal
 *
 * Provides landlords with access to:
 * - Home Dashboard & Live Portfolio KPIs
 * - Listed DAMAC Hills 2 Properties
 * - Tenants, Tenancy Contract Copies & 12-Stage Deal Cockpit
 * - PDC Cheque Schedule & Sequential Receipts
 * - Maintenance Tickets & 1-click WhatsApp channel to MD (+971505760056)
 *
 * @component
 */

import React, { FC, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Home, Building2, Users, CreditCard, Wrench, FileText, Layers, User } from 'lucide-react';
import type { RootState } from '../../store/store';
import '../RolePages.css';
import PortalLayout from '../../components/portal/PortalLayout';
import LandlordPortalHome from '../../components/portal/landlord/LandlordPortalHome';
import LandlordPropertiesTab from '../../components/portal/landlord/LandlordPropertiesTab';
import LandlordTenantsTab from '../../components/portal/landlord/LandlordTenantsTab';
import LandlordPaymentsTab from '../../components/portal/landlord/LandlordPaymentsTab';
import LandlordMaintenanceTab from '../../components/portal/landlord/LandlordMaintenanceTab';
import LandlordDocumentsTab from '../../components/portal/landlord/LandlordDocumentsTab';
import LandlordDirectMdBanner from '../../components/portal/landlord/LandlordDirectMdBanner';
import PortalProfileTab from '../../components/portal/PortalProfileTab';
import PortalSidebarContainer, {
  type TabConfig,
} from '../../components/portal/containers/PortalSidebarContainer';
import PortalLogoRing from '../../components/portal/PortalLogoRing';
import { TenancyDealCockpit } from '../../components/crm/DealManager/TenancyDealCockpit';
import { useTranslation, Text } from '../../context/TranslationContext';

type TabKey =
  | 'home'
  | 'properties'
  | 'tenants'
  | 'payments'
  | 'maintenance'
  | 'documents'
  | 'cockpit'
  | 'profile';

const LandlordPortalPage: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { t } = useTranslation();

  const tabs: TabConfig<TabKey>[] = useMemo(
    () => [
      { key: 'home', label: t('landlord.portal.tabs.home'), icon: <Home size={15} /> },
      {
        key: 'properties',
        label: t('landlord.portal.tabs.properties'),
        icon: <Building2 size={15} />,
      },
      { key: 'tenants', label: t('landlord.portal.tabs.tenants'), icon: <Users size={15} /> },
      {
        key: 'payments',
        label: t('landlord.portal.tabs.payments'),
        icon: <CreditCard size={15} />,
      },
      {
        key: 'maintenance',
        label: t('landlord.portal.tabs.maintenance'),
        icon: <Wrench size={15} />,
      },
      {
        key: 'documents',
        label: t('landlord.portal.tabs.documents'),
        icon: <FileText size={15} />,
      },
      { key: 'cockpit', label: '12-Stage Deal Cockpit', icon: <Layers size={15} /> },
      { key: 'profile', label: t('landlord.portal.tabs.profile'), icon: <User size={15} /> },
    ],
    [t]
  );

  if (!currentUser) {
    return (
      <div className="role-page no-sidebar">
        <div className="role-page-content full-width">
          <div className="error-message">
            <p>
              <Text tid="landlord.portal.unauthorized" />
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <LandlordPortalHome onNavigate={key => setActiveTab(key as TabKey)} />;
      case 'properties':
        return <LandlordPropertiesTab />;
      case 'tenants':
        return <LandlordTenantsTab />;
      case 'payments':
        return <LandlordPaymentsTab />;
      case 'maintenance':
        return <LandlordMaintenanceTab />;
      case 'documents':
        return <LandlordDocumentsTab />;
      case 'cockpit':
        return (
          <TenancyDealCockpit
            landlordName={currentUser.name ?? 'White Caves Landlord'}
            area="DAMAC Hills 2"
            project="Camellia"
            unitNumber="TH-C-104"
          />
        );
      case 'profile':
        return <PortalProfileTab />;
      default:
        return <LandlordPortalHome onNavigate={key => setActiveTab(key as TabKey)} />;
    }
  };

  return (
    <PortalLayout portalType="landlord">
      <div className="role-page no-sidebar">
        <div className="role-page-content full-width">
          <div className="page-header">
            <h1>
              <Text tid="landlord.portal.title" />
            </h1>
            <p>{t('landlord.portal.welcome').replace('{name}', currentUser.name ?? 'User')}</p>
          </div>

          {/* White Caves Center Logo Ring & Live Portfolio Telemetry */}
          <PortalLogoRing
            role="landlord"
            badgeLabel="Landlord Command Deck"
            title="DAMAC Hills 2 Asset Portfolio"
            subtitle="Live rental operations, verified Ejari contracts, and scheduled PDC receivables."
            metricPrimary={{ label: 'Portfolio Status', value: '100% Leased' }}
            metricSecondary={{ label: 'Support Channel', value: 'MD WhatsApp VIP' }}
          />

          {/* 1-Click Direct MD WhatsApp Channel (+971505760056) & Quick Actions */}
          <LandlordDirectMdBanner
            landlordName={currentUser.name}
            onSelectTab={tab => setActiveTab(tab)}
          />

          {/* Tab Navigation */}
          <PortalSidebarContainer<TabKey>
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            ariaLabel={t('landlord.portal.title')}
          />

          {/* Tab Content */}
          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            className="portal-tab-content"
            data-testid={`tabpanel-${activeTab}`}
          >
            {renderTabContent()}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default LandlordPortalPage;
