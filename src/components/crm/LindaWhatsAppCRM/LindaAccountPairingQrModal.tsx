import React, { memo, useCallback, useEffect, useState } from 'react';
import { QrCode, RefreshCw, Smartphone, X } from 'lucide-react';
import { apiClient } from '../../../utils/apiClient';

interface PairingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  phone?: string;
}

export const LindaAccountPairingQrModal = memo<PairingModalProps>(
  ({ isOpen, onClose, phone = '+971505760056' }) => {
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
    const [pairCode, setPairCode] = useState<string | null>(null);
    const [statusMsg, setStatusMsg] = useState<string>('Ready to initialize WhatsApp session');
    const [isConnected, setIsConnected] = useState(false);
    const [busy, setBusy] = useState(false);

    const encodedPhone = encodeURIComponent(phone);

    const fetchQr = useCallback(async () => {
      try {
        const res = (await apiClient.get(`/linda/pool/${encodedPhone}/qr`)) as {
          data?: {
            qrCode?: string | null;
            isConnected?: boolean;
            message?: string;
            status?: string;
          };
        };
        const d = res?.data;
        if (d?.isConnected) {
          setIsConnected(true);
          setQrDataUrl(null);
          setStatusMsg('Connected & hardware-linked!');
        } else if (d?.qrCode) {
          setIsConnected(false);
          setQrDataUrl(d.qrCode);
          setStatusMsg('Scan QR in WhatsApp → Linked Devices');
        } else {
          setStatusMsg(d?.message || 'Click Connect Line to generate QR');
        }
      } catch {
        setStatusMsg('Unable to query QR — verify server :5001');
      }
    }, [encodedPhone]);

    const handleConnect = useCallback(async () => {
      setBusy(true);
      setStatusMsg('Starting LocalAuth browser session...');
      try {
        await apiClient.post(`/linda/pool/${encodedPhone}/connect`, {});
        setTimeout(() => void fetchQr(), 2500);
      } catch {
        setStatusMsg('Failed to start pairing session');
      } finally {
        setBusy(false);
      }
    }, [encodedPhone, fetchQr]);

    const handlePairCode = useCallback(async () => {
      setBusy(true);
      setStatusMsg('Requesting 8-digit phone pairing code...');
      try {
        const res = (await apiClient.post(`/linda/pool/${encodedPhone}/pair-code`, {})) as {
          data?: { pairingCode?: string; instructions?: string };
        };
        if (res?.data?.pairingCode) {
          setPairCode(res.data.pairingCode);
          setStatusMsg(res.data.instructions || 'Enter code in WhatsApp → Linked Devices');
        }
      } catch {
        setStatusMsg('Pairing code unavailable — connect first or use QR');
      } finally {
        setBusy(false);
      }
    }, [encodedPhone]);

    useEffect(() => {
      if (!isOpen) return;
      setPairCode(null);
      void fetchQr();
      const poll = setInterval(() => void fetchQr(), 4000);
      return () => clearInterval(poll);
    }, [isOpen, fetchQr]);

    if (!isOpen) return null;

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.82)',
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: '#0F172A',
            padding: '22px',
            borderRadius: '14px',
            border: '1px solid #334155',
            textAlign: 'center',
            color: '#fff',
            width: '340px',
            maxWidth: '92vw',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 700 }}>Pair SIM {phone}</span>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
          <div
            style={{
              background: '#fff',
              padding: '14px',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '188px',
              minHeight: '188px',
              marginBottom: '12px',
            }}
          >
            {isConnected ? (
              <span style={{ color: '#16A34A', fontWeight: 700, fontSize: '14px' }}>
                ✓ Linked & Online
              </span>
            ) : qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`WhatsApp QR for ${phone}`}
                style={{ width: 180, height: 180 }}
              />
            ) : (
              <QrCode size={150} color="#0F172A" />
            )}
          </div>
          {pairCode && (
            <div
              style={{
                background: '#1E293B',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '10px',
                letterSpacing: '3px',
                fontWeight: 800,
                fontSize: '18px',
                color: '#25D366',
              }}
            >
              {pairCode}
            </div>
          )}
          <p style={{ margin: '0 0 12px', fontSize: '11px', color: '#94A3B8' }}>{statusMsg}</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button
              disabled={busy}
              onClick={() => void handleConnect()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#25D366',
                color: '#052E16',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 12px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <RefreshCw size={12} /> Connect / Refresh QR
            </button>
            <button
              disabled={busy}
              onClick={() => void handlePairCode()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#1E293B',
                color: '#E2E8F0',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '7px 10px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Smartphone size={12} /> 8-Digit Code
            </button>
          </div>
        </div>
      </div>
    );
  }
);

LindaAccountPairingQrModal.displayName = 'LindaAccountPairingQrModal';
export default LindaAccountPairingQrModal;
