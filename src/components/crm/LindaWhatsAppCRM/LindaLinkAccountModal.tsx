// FILE: src/components/crm/LindaWhatsAppCRM/LindaLinkAccountModal.tsx
/**
 * White Caves Real Estate LLC - 1-Click "Add / Pair WhatsApp Account" Modal
 * Standard: AEGIS Canonical 12-Way Architecture Standard (<250 lines)
 */

import React, { FC } from 'react';
import { X, Smartphone, QrCode, KeyRound } from 'lucide-react';
import {
  overlayStyle,
  modalBoxStyle,
  modalHeaderStyle,
  modalTabBarStyle,
} from './LindaLinkAccountModal.style';
import { LindaLinkCodeTab } from './LindaLinkCodeTab';
import { LindaLinkQrTab } from './LindaLinkQrTab';
import { useLindaLinkAccount } from './useLindaLinkAccount';

export interface LindaLinkAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newPhone: string) => void;
}

export const LindaLinkAccountModal: FC<LindaLinkAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const {
    activeTab,
    setActiveTab,
    phoneNumber,
    setPhoneNumber,
    pairingCode,
    countdown,
    qrCodeUrl,
    loading,
    error,
    linkedSuccess,
    fetchQrCode,
    handleGeneratePairCode,
    handleSimulateLinked,
  } = useLindaLinkAccount(onSuccess, onClose);

  if (!isOpen) return null;

  return (
    <div data-testid="linda-link-account-modal" style={overlayStyle}>
      <div style={modalBoxStyle}>
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
              }}
            >
              <Smartphone size={16} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Link WhatsApp Account</div>
              <div style={{ fontSize: 10, color: '#8696A0' }}>Multi-Session Device Gateway</div>
            </div>
          </div>
          <button
            type="button"
            data-testid="link-modal-close-btn"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8696A0',
              cursor: 'pointer',
              padding: 4,
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={modalTabBarStyle}>
          <button
            type="button"
            data-testid="link-tab-code"
            onClick={() => setActiveTab('code')}
            style={{
              flex: 1,
              padding: '10px 8px',
              background: activeTab === 'code' ? 'rgba(37, 211, 102, 0.12)' : 'transparent',
              color: activeTab === 'code' ? '#25D366' : '#8696A0',
              border: 'none',
              borderBottom: activeTab === 'code' ? '2px solid #25D366' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <KeyRound size={13} />
            <span>8-Digit Code</span>
          </button>
          <button
            type="button"
            data-testid="link-tab-qr"
            onClick={() => {
              setActiveTab('qr');
              if (!qrCodeUrl) void fetchQrCode();
            }}
            style={{
              flex: 1,
              padding: '10px 8px',
              background: activeTab === 'qr' ? 'rgba(37, 211, 102, 0.12)' : 'transparent',
              color: activeTab === 'qr' ? '#25D366' : '#8696A0',
              border: 'none',
              borderBottom: activeTab === 'qr' ? '2px solid #25D366' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 11,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <QrCode size={13} />
            <span>Live QR Code</span>
          </button>
        </div>

        <div style={{ padding: '16px' }}>
          {error && (
            <div
              style={{
                marginBottom: 10,
                padding: '6px 10px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #EF4444',
                color: '#FCA5A5',
                borderRadius: 6,
                fontSize: 11,
              }}
            >
              {error}
            </div>
          )}

          {activeTab === 'code' ? (
            <LindaLinkCodeTab
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              pairingCode={pairingCode}
              countdown={countdown}
              loading={loading}
              onGenerateCode={handleGeneratePairCode}
              onConfirmLinked={handleSimulateLinked}
            />
          ) : (
            <LindaLinkQrTab
              loading={loading}
              qrCodeUrl={qrCodeUrl}
              onRefreshQr={fetchQrCode}
              onConfirmLinked={handleSimulateLinked}
            />
          )}

          {linkedSuccess && (
            <div
              data-testid="link-success-banner"
              style={{
                marginTop: 10,
                padding: '8px 10px',
                background: 'rgba(37, 211, 102, 0.2)',
                border: '1px solid #25D366',
                borderRadius: 6,
                color: '#86EFAC',
                fontSize: 11,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Account paired successfully! Switching active line...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
