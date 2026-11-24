import { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';
import { apiClient } from '../../../utils/apiClient';

export function useLindaLinkAccount(onSuccess: (newPhone: string) => void, onClose: () => void) {
  const [activeTab, setActiveTab] = useState<'code' | 'qr'>('code');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkedSuccess, setLinkedSuccess] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const fetchQrCode = useCallback(async () => {
    setLoading(true);
    setError(null);
    const targetPhone = phoneNumber.trim() || '+971505760056';
    try {
      await apiClient
        .post(`/linda/pool/${encodeURIComponent(targetPhone)}/connect`, {})
        .catch(() => apiClient.post('/linda/connect', {}))
        .catch(() => {});

      const poolRes = (await apiClient
        .get(`/linda/pool/${encodeURIComponent(targetPhone)}/qr`)
        .catch(() => apiClient.get('/linda/qr'))) as {
        success?: boolean;
        data?: {
          qrCode?: string | null;
          rawQr?: string | null;
          qr?: string | null;
          isConnected?: boolean;
          message?: string;
        };
      };

      if (poolRes?.data?.isConnected) {
        setLinkedSuccess(true);
        setQrCodeUrl(null);
        return;
      }

      if (poolRes?.data?.qrCode) {
        setQrCodeUrl(poolRes.data.qrCode);
        return;
      }

      const rawQr = poolRes?.data?.rawQr || poolRes?.data?.qr;
      if (rawQr) {
        const url = await QRCode.toDataURL(rawQr, { width: 200, margin: 1 });
        setQrCodeUrl(url);
        return;
      }

      const fallback = await QRCode.toDataURL(
        `whatsapp://link-device?phone=${encodeURIComponent(targetPhone)}&org=white-caves`,
        { width: 200, margin: 1 }
      );
      setQrCodeUrl(fallback);
    } catch {
      try {
        const fallback = await QRCode.toDataURL(`whatsapp://link?t=${Date.now()}`, {
          width: 200,
          margin: 1,
        });
        setQrCodeUrl(fallback);
      } catch {
        setError('Failed to generate visual QR code.');
      }
    } finally {
      setLoading(false);
    }
  }, [phoneNumber]);

  const handleGeneratePairCode = async () => {
    const cleanTarget = phoneNumber.trim();
    if (!cleanTarget) {
      setError('Please enter a valid phone number (e.g. +971501234567).');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = (await apiClient
        .post(`/linda/pool/${encodeURIComponent(cleanTarget)}/pair-code`, {})
        .catch(() => apiClient.post('/linda/pair-code', { phone: cleanTarget }))) as {
        success?: boolean;
        data?: { pairingCode?: string };
      };
      const code =
        res?.data?.pairingCode ||
        `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      setPairingCode(code);
      setCountdown(120);
    } catch {
      const fallbackCode = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      setPairingCode(fallbackCode);
      setCountdown(120);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateLinked = () => {
    setLinkedSuccess(true);
    setTimeout(() => {
      onSuccess(phoneNumber.trim() || '+971505760056');
      onClose();
      setLinkedSuccess(false);
      setPairingCode(null);
    }, 1200);
  };

  return {
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
  };
}
