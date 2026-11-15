/**
 * White Caves Real Estate LLC - Customer Registration Drawer Component
 * Standard: AEGIS Canonical 7-Category Architecture Standard (Drawer)
 * Single Purpose File Law: < 350 lines
 */

import React, { FC, useState, useEffect, useMemo } from 'react';
import { X, UserPlus } from 'lucide-react';
import { CustomerItem, CustomerType, LeadSource } from './CustomerManager.types';
import { useDirtyStateGuard } from '../../../hooks/useDirtyStateGuard';
import { UnsavedChangesModal, TaskActionBar } from '../../common/UnsavedChangesModal';
import {
  overlayStyle,
  drawerContainerStyle,
  drawerHeaderStyle,
  drawerFormStyle,
} from './CustomerRegistrationDrawer.styles';
import { CustomerRegistrationFields } from './CustomerRegistrationFields';

export interface CustomerRegistrationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customer: Partial<CustomerItem>) => void;
}

export const CustomerRegistrationDrawer: FC<CustomerRegistrationDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [initialSnapshot, setInitialSnapshot] = useState<string>('');
  const [fullName, setFullName] = useState('');
  const [customerCode, setCustomerCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [customerType, setCustomerType] = useState<CustomerType>('LEAD');
  const [preferredCommunity, setPreferredCommunity] = useState('DAMAC Hills 2');
  const [budgetAED, setBudgetAED] = useState<number>(150000);
  const [assignedAgentName, setAssignedAgentName] = useState('Arslan Malik');
  const [source, setSource] = useState<LeadSource>('PROPERTY_FINDER');

  useEffect(() => {
    if (isOpen) {
      setFullName('');
      setCustomerCode('');
      setEmail('');
      setPhone('');
      setCustomerType('LEAD');
      setPreferredCommunity('DAMAC Hills 2');
      setBudgetAED(150000);
      setAssignedAgentName('Arslan Malik');
      setSource('PROPERTY_FINDER');
      setInitialSnapshot(
        JSON.stringify({
          fullName: '',
          customerCode: '',
          email: '',
          phone: '',
          customerType: 'LEAD',
          preferredCommunity: 'DAMAC Hills 2',
          budgetAED: 150000,
          assignedAgentName: 'Arslan Malik',
          source: 'PROPERTY_FINDER',
        })
      );
    }
  }, [isOpen]);

  const isDirty = useMemo(() => {
    if (!isOpen) return false;
    const current = JSON.stringify({
      fullName,
      customerCode,
      email,
      phone,
      customerType,
      preferredCommunity,
      budgetAED,
      assignedAgentName,
      source,
    });
    return Boolean(initialSnapshot && current !== initialSnapshot);
  }, [
    isOpen,
    fullName,
    customerCode,
    email,
    phone,
    customerType,
    preferredCommunity,
    budgetAED,
    assignedAgentName,
    source,
    initialSnapshot,
  ]);

  const { showPrompt, proceed, cancel, confirmExit } = useDirtyStateGuard({
    isDirty,
    onConfirmDiscard: onClose,
  });

  if (!isOpen) return null;

  const handleSaveData = (shouldClose: boolean) => {
    if (!fullName.trim() || !email.trim()) return;
    onSubmit({
      customerCode: customerCode.trim() || `CUST-AUTO-${Math.floor(Math.random() * 900 + 100)}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || '+971 50 000 0000',
      customerType,
      currentStep: 1,
      stepName: 'LEAD_CAPTURE',
      assignedAgentId: 'EMP-001',
      assignedAgentName,
      preferredCommunity,
      budgetAED: Number(budgetAED) || 100000,
      kycVerified: false,
      source,
      status: 'ACTIVE',
      lastContactDate: new Date().toISOString().slice(0, 10),
    });
    setFullName('');
    setCustomerCode('');
    setEmail('');
    setPhone('');
    if (shouldClose) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveData(true);
  };

  return (
    <div style={overlayStyle} data-testid="customer-registration-drawer">
      <div style={drawerContainerStyle}>
        <div style={drawerHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserPlus size={18} color="#34D399" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Onboard Client / Lead
            </h3>
          </div>
          <button
            onClick={onClose}
            data-testid="close-customer-drawer"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              color: '#94A3B8',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={drawerFormStyle}>
          <CustomerRegistrationFields
            fullName={fullName}
            setFullName={setFullName}
            customerCode={customerCode}
            setCustomerCode={setCustomerCode}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            customerType={customerType}
            setCustomerType={setCustomerType}
            preferredCommunity={preferredCommunity}
            setPreferredCommunity={setPreferredCommunity}
            budgetAED={budgetAED}
            setBudgetAED={setBudgetAED}
            assignedAgentName={assignedAgentName}
            setAssignedAgentName={setAssignedAgentName}
            source={source}
            setSource={setSource}
          />

          <div
            style={{
              marginTop: 'auto',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <TaskActionBar
              isDirty={isDirty}
              onSave={() => handleSaveData(false)}
              onSaveAndClose={() => handleSaveData(true)}
              onCancel={() => confirmExit(onClose)}
              saveLabel="Confirm Client Onboarding"
              saveAndCloseLabel="Save & Close"
              saveTestId="submit-customer-btn"
            />
          </div>
        </form>
      </div>

      <UnsavedChangesModal
        isOpen={showPrompt}
        onProceed={proceed}
        onCancel={cancel}
      />
    </div>
  );
};
export default CustomerRegistrationDrawer;
