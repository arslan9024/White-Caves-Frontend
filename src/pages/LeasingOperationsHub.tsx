import React, { useState } from 'react';
import LindaWhatsAppCRM from '../components/crm/LindaWhatsAppCRM';
import { HenryTenancyContractModal } from '../components/crm/HenryDocumentStudio/HenryTenancyContractModal';
import {
  LeasingHubTab,
  useLeasingOperations,
  HubContainer,
  TopHeader,
  TitleBlock,
  Badge,
  TabNavigation,
  TabButton,
  NotificationBanner,
  PipelineTab,
  ContractMakerTab,
  SignaturePortalTab,
  InvoicingTab,
} from './leasing';

// Re-export all types, mock data, and components for full backwards compatibility
export * from './leasing';

export const LeasingOperationsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeasingHubTab>('pipeline');
  const {
    deals,
    isContractModalOpen,
    notificationMsg,
    triggerZoeNotification,
    handleOpenContractModal,
    handleSignContract,
    closeContractModal,
  } = useLeasingOperations();

  return (
    <HubContainer data-testid="leasing-operations-hub">
      <TopHeader>
        <TitleBlock>
          <h1>
            Solo-Operator Leasing Command Center
            <Badge>Phase 1 Active</Badge>
          </h1>
          <p>
            White Caves Real Estate • Managing Director & Solo Leasing Agent Operations Desk •
            Orchestrated by Zoe & Nadia
          </p>
        </TitleBlock>
      </TopHeader>

      {notificationMsg && (
        <NotificationBanner>
          🔔 <strong>Zoe Notification:</strong> {notificationMsg}
        </NotificationBanner>
      )}

      <TabNavigation>
        <TabButton $active={activeTab === 'pipeline'} onClick={() => setActiveTab('pipeline')}>
          📋 Active Deals Pipeline ({deals.length})
        </TabButton>
        <TabButton $active={activeTab === 'linda'} onClick={() => setActiveTab('linda')}>
          💬 Linda WhatsApp Landlord Broadcast
        </TabButton>
        <TabButton
          $active={activeTab === 'contract_maker'}
          onClick={() => setActiveTab('contract_maker')}
        >
          📄 DLD Tenancy Contract Maker
        </TabButton>
        <TabButton
          $active={activeTab === 'signature_portal'}
          onClick={() => setActiveTab('signature_portal')}
        >
          ✍️ UAE Pass & E-Signature
        </TabButton>
        <TabButton $active={activeTab === 'invoicing'} onClick={() => setActiveTab('invoicing')}>
          💰 5% VAT Tax Invoices & PDCs
        </TabButton>
      </TabNavigation>

      {/* Tab 1: Pipeline */}
      {activeTab === 'pipeline' && (
        <PipelineTab
          deals={deals}
          onOpenContract={handleOpenContractModal}
          onNavigateTab={setActiveTab}
        />
      )}

      {/* Tab 2: Linda WhatsApp */}
      {activeTab === 'linda' && (
        <div>
          <LindaWhatsAppCRM />
        </div>
      )}

      {/* Tab 3: Contract Maker */}
      {activeTab === 'contract_maker' && (
        <ContractMakerTab deals={deals} onOpenContract={handleOpenContractModal} />
      )}

      {/* Tab 4: Signature Portal & UAE Pass */}
      {activeTab === 'signature_portal' && (
        <SignaturePortalTab
          deals={deals}
          onSignContract={handleSignContract}
          onSendWhatsApp={deal =>
            triggerZoeNotification(
              'WhatsApp Link Sent',
              `Signing link dispatched to ${deal.tenantPhone}`
            )
          }
        />
      )}

      {/* Tab 5: Invoicing & Cheques */}
      {activeTab === 'invoicing' && <InvoicingTab deals={deals} />}

      {/* Tenancy Contract Modal */}
      <HenryTenancyContractModal isOpen={isContractModalOpen} onClose={closeContractModal} />
    </HubContainer>
  );
};

export default LeasingOperationsHub;
