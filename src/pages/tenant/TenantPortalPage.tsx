/**
 * TenantPortalPage — Tenant Self-Service Portal
 *
 * Provides tenants with access to:
 * - Active Tenancy Contract & Verified Ejari Status Badge
 * - 1-click download of sequential Payment Receipts & 5% UAE VAT invoices
 * - Scheduled PDC Cheques & Payment History
 * - Move-In & Maintenance Requests
 *
 * @component
 */

import React, { FC, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Home, FileCheck, CreditCard, Wrench, FileText, User } from 'lucide-react';
import type { RootState } from '../../store/store';
import '../RolePages.css';
import PortalLayout from '../../components/portal/PortalLayout';
import TenantPortalHome from '../../components/portal/tenant/TenantPortalHome';
import TenantLeaseTab from '../../components/portal/tenant/TenantLeaseTab';
import TenantPaymentHistoryTab from '../../components/portal/tenant/TenantPaymentHistoryTab';
import TenantMaintenanceTab from '../../components/portal/tenant/TenantMaintenanceTab';
import TenantDocumentsTab from '../../components/portal/tenant/TenantDocumentsTab';
import TenantStatutoryReceiptBar from '../../components/portal/tenant/TenantStatutoryReceiptBar';
import PortalProfileTab from '../../components/portal/PortalProfileTab';
import PortalSidebarContainer, {
  type TabConfig,
} from '../../components/portal/containers/PortalSidebarContainer';
import PortalLogoRing from '../../components/portal/PortalLogoRing';
import { useTranslation, Text } from '../../context/TranslationContext';

type TabKey = 'home' | 'lease' | 'payments' | 'maintenance' | 'documents' | 'profile';

const TenantPortalPage: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { t } = useTranslation();

  const tabs: TabConfig<TabKey>[] = useMemo(
    () => [
      { key: 'home', label: t('tenant.portal.tabs.home'), icon: <Home size={15} /> },
      { key: 'lease', label: t('tenant.portal.tabs.lease'), icon: <FileCheck size={15} /> },
      { key: 'payments', label: t('tenant.portal.tabs.payments'), icon: <CreditCard size={15} /> },
      {
        key: 'maintenance',
        label: t('tenant.portal.tabs.maintenance'),
        icon: <Wrench size={15} />,
      },
      { key: 'documents', label: t('tenant.portal.tabs.documents'), icon: <FileText size={15} /> },
      { key: 'profile', label: t('tenant.portal.tabs.profile'), icon: <User size={15} /> },
    ],
    [t]
  );

  if (!currentUser) {
    return (
      <div className="role-page no-sidebar">
        <div className="role-page-content full-width">
          <div className="error-message">
            <p>
              <Text tid="tenant.portal.unauthorized" />
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <TenantPortalHome onNavigate={key => setActiveTab(key as TabKey)} />;
      case 'lease':
        return <TenantLeaseTab />;
      case 'payments':
        return <TenantPaymentHistoryTab />;
      case 'maintenance':
        return <TenantMaintenanceTab />;
      case 'documents':
        return <TenantDocumentsTab />;
      case 'profile':
        return <PortalProfileTab />;
      default:
        return <TenantPortalHome onNavigate={key => setActiveTab(key as TabKey)} />;
    }
  };

  return (
    <PortalLayout portalType="tenant">
      <div className="role-page no-sidebar">
        <div className="role-page-content full-width">
          <div className="page-header">
            <h1>
              <Text tid="tenant.portal.title" />
            </h1>
            <p>{t('tenant.portal.welcome').replace('{name}', currentUser.name ?? 'User')}</p>
          </div>

          {/* White Caves Center Logo Ring & Live Tenancy Telemetry */}
          <PortalLogoRing
            role="tenant"
            badgeLabel="Resident Suite"
            title="White Caves Luxury Tenancy"
            subtitle="Verified Ejari contract, DEWA premises status, and sequential 5% VAT payment receipts."
            metricPrimary={{ label: 'Lease Status', value: 'Active & Verified' }}
            metricSecondary={{ label: 'Statutory Shield', value: 'Ejari + DEWA' }}
          />

          {/* Ejari Badge + 1-Click Sequential Receipt & 5% UAE VAT PDF Bar */}
          <TenantStatutoryReceiptBar
            tenantName={currentUser.name}
            onNavigateTab={tab => setActiveTab(tab)}
          />

          {/* Tab Navigation */}
          <PortalSidebarContainer<TabKey>
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            ariaLabel={t('tenant.portal.title')}
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

export default TenantPortalPage;
