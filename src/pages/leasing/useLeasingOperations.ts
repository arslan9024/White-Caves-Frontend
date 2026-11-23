import { useState, useCallback } from 'react';
import henryTenancyContractTemplateService, {
  DldTenancyContractData,
} from '../../services/HenryTenancyContractTemplateService';
import { INITIAL_DEALS } from './mockData';
import { SoloLeasingDeal } from './types';

export const useLeasingOperations = () => {
  const [deals, setDeals] = useState<SoloLeasingDeal[]>(INITIAL_DEALS);
  const [selectedDeal, setSelectedDeal] = useState<SoloLeasingDeal | null>(deals[0]);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const triggerZoeNotification = useCallback((title: string, message: string) => {
    setNotificationMsg(`${title}: ${message}`);
    const timer = setTimeout(() => setNotificationMsg(null), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenContractModal = useCallback((deal: SoloLeasingDeal) => {
    setSelectedDeal(deal);
    const draft: DldTenancyContractData = {
      ...henryTenancyContractTemplateService.getBlankTemplate(),
      propertyUsage: 'residential',
      propertyType: 'villa',
      location: deal.propertyTitle,
      propertyNo: deal.unitNumber,
      lessorName: deal.landlordName,
      lessorPhone: deal.landlordPhone,
      tenantName: deal.tenantName || '',
      tenantPhone: deal.tenantPhone || '',
      annualRent: deal.annualRent,
      contractPeriodFrom: '2026-12-01',
      contractPeriodTo: '2027-11-30',
      securityDepositAmount: deal.securityDeposit,
      modeOfPayment: `${deal.chequeCount} Cheques`,
    };
    henryTenancyContractTemplateService.saveDraft(draft);
    setIsContractModalOpen(true);
  }, []);

  const handleSignContract = useCallback(
    (dealId: string, role: 'TENANT' | 'LANDLORD') => {
      setDeals(prev =>
        prev.map(d => {
          if (d.id !== dealId) return d;
          const nextStatus =
            role === 'TENANT'
              ? d.signatureStatus === 'LANDLORD_SIGNED'
                ? 'FULLY_SIGNED'
                : 'TENANT_SIGNED'
              : d.signatureStatus === 'TENANT_SIGNED'
                ? 'FULLY_SIGNED'
                : 'LANDLORD_SIGNED';
          return { ...d, signatureStatus: nextStatus };
        })
      );
      triggerZoeNotification('Signature Recorded', `${role} signed agreement for ${dealId}.`);
    },
    [triggerZoeNotification]
  );

  const closeContractModal = useCallback(() => {
    setIsContractModalOpen(false);
  }, []);

  return {
    deals,
    selectedDeal,
    isContractModalOpen,
    notificationMsg,
    triggerZoeNotification,
    handleOpenContractModal,
    handleSignContract,
    closeContractModal,
  };
};
