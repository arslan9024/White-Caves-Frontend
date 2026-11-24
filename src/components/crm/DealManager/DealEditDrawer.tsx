/**
 * White Caves Real Estate LLC - Deal Edit/Create Drawer Component
 * Standard: AEGIS Canonical 7-Category Architecture Standard (Drawer)
 * Single Purpose File Law: < 350 lines
 */

import React, { FC, useState, useEffect, useMemo } from 'react';
import { X, Handshake, Save } from 'lucide-react';
import { DealItem, DealType, DealStatus } from './DealManager.types';
import { useDirtyStateGuard } from '../../../hooks/useDirtyStateGuard';
import { UnsavedChangesModal, TaskActionBar } from '../../common/UnsavedChangesModal';

interface DealEditDrawerProps {
  isOpen: boolean;
  deal: DealItem | null;
import { DealEditFormFields } from './DealEditFormFields';
  onClose: () => void;
  onSave: (dealData: Partial<DealItem>) => void;
}

export const DealEditDrawer: FC<DealEditDrawerProps> = ({ isOpen, deal, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [dealType, setDealType] = useState<DealType>('LEASING');
  const [status, setStatus] = useState<DealStatus>('INQUIRY');
  const [valueAED, setValueAED] = useState(180000);
  const [propertyId, setPropertyId] = useState('REP-001');
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState<'tenant' | 'buyer'>('tenant');
  const [agentName, setAgentName] = useState('Arslan Malik');
  const [initialSnapshot, setInitialSnapshot] = useState<string>('');

  useEffect(() => {
    if (deal) {
      setTitle(deal.title);
      setDealType(deal.dealType);
      setStatus(deal.status);
      setValueAED(deal.valueAED);
      setPropertyId(deal.propertyId);
      setClientName(deal.clientName);
      setClientRole(deal.clientRole as any);
      setAgentName(deal.agentName);
      setInitialSnapshot(
        JSON.stringify({
          title: deal.title,
          dealType: deal.dealType,
          status: deal.status,
          valueAED: deal.valueAED,
          propertyId: deal.propertyId,
          clientName: deal.clientName,
          clientRole: deal.clientRole,
          agentName: deal.agentName,
        })
      );
    } else {
      setTitle('');
      setDealType('LEASING');
      setStatus('INQUIRY');
      setValueAED(180000);
      setPropertyId('REP-001');
      setClientName('');
      setClientRole('tenant');
      setAgentName('Arslan Malik');
      setInitialSnapshot(
        JSON.stringify({
          title: '',
          dealType: 'LEASING',
          status: 'INQUIRY',
          valueAED: 180000,
          propertyId: 'REP-001',
          clientName: '',
          clientRole: 'tenant',
          agentName: 'Arslan Malik',
        })
      );
    }
  }, [deal, isOpen]);

  const isDirty = useMemo(() => {
    if (!isOpen) return false;
    const current = JSON.stringify({
      title,
      dealType,
      status,
      valueAED: Number(valueAED),
      propertyId,
      clientName,
      clientRole,
      agentName,
    });
    return Boolean(initialSnapshot && current !== initialSnapshot);
  }, [isOpen, title, dealType, status, valueAED, propertyId, clientName, clientRole, agentName, initialSnapshot]);

  const { showPrompt, proceed, cancel, confirmExit } = useDirtyStateGuard({
    isDirty,
    onConfirmDiscard: onClose,
  });

  if (!isOpen) return null;

  const handleSaveData = (shouldClose: boolean) => {
    onSave({
      id: deal?.id,
      _id: deal?._id,
      title,
      dealType,
      status,
      valueAED: Number(valueAED),
      propertyId,
      clientName,
      clientRole,
      agentName,
    });
    if (shouldClose) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveData(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      data-testid="deal-edit-drawer"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#070D18',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Handshake size={18} color="#C084FC" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
              {deal ? 'Edit Deal Pipeline Record' : 'Register New Real Estate Deal'}
            </h3>
          </div>
          <button
            onClick={onClose}
            data-testid="close-drawer-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            overflowY: 'auto',
          <DealEditFormFields
            title={title}
            setTitle={setTitle}
            dealType={dealType}
            setDealType={setDealType}
            setClientRole={setClientRole}
            status={status}
            setStatus={setStatus}
            valueAED={valueAED}
            setValueAED={setValueAED}
            propertyId={propertyId}
            setPropertyId={setPropertyId}
            clientRole={clientRole}
            clientName={clientName}
            setClientName={setClientName}
            agentName={agentName}
            setAgentName={setAgentName}
          />
              Lead Agent / Executive
            </label>
            <input
              type="text"
              value={agentName}
              onChange={e => setAgentName(e.target.value)}
              placeholder="Arslan Malik"
              data-testid="deal-agent-input"
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                background: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                color: '#FFFFFF',
                fontSize: '0.85rem',
              }}
            />
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <TaskActionBar
              isDirty={isDirty}
              onSave={() => handleSaveData(true)}
              onSaveAndClose={() => handleSaveData(true)}
              onCancel={() => confirmExit(onClose)}
              saveLabel="Save Deal"
              saveAndCloseLabel="Save & Close"
              saveTestId="save-deal-btn"
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

