import { useState, useEffect, useCallback, useRef } from 'react';
import QRCode from 'qrcode';
import { apiClient } from '../../../utils/apiClient';

interface QrResponsePayload {
  success?: boolean;
  data?: {
    qrCode?: string | null;
    rawQr?: string | null;
    qr?: string | null;
    isConnected?: boolean;
    status?: string;
    message?: string;
  };
  error?: string;
}

export function useLindaLinkAccount(onSuccess: (newPhone: string) => void, onClose: () => void) {
  const [activeTab, setActiveTab] = useState<'code' | 'qr'>('qr');
  const [phoneNumber, setPhoneNumber] = useState('+971505760056');
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkedSuccess, setLinkedSuccess] = useState(false);
  const pollAbortRef = useRef(false);

  useEffect(() => {
    pollAbortRef.current = false;
    return () => {
      pollAbortRef.current = true;
    };
  }, []);

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
    setLinkedSuccess(false);
    const targetPhone = phoneNumber.trim() || '+971505760056';

    try {
      await apiClient
        .post(`/linda/pool/${encodeURIComponent(targetPhone)}/connect`, {})
        .catch(() => apiClient.post('/linda/connect', { phone: targetPhone }));

      // Poll up to 8 times (~16s) for the real WhatsApp Web QR code — never render a fake QR
      let lastMessage = 'Initializing headless WhatsApp Web session — please wait...';
      for (let attempt = 0; attempt < 8; attempt++) {
        if (pollAbortRef.current) return;

        const poolRes = (await apiClient
          .get(`/linda/pool/${encodeURIComponent(targetPhone)}/qr`)
          .catch(() => apiClient.get('/linda/qr'))) as QrResponsePayload;

        if (poolRes?.data?.isConnected) {
          setLinkedSuccess(true);
          setQrCodeUrl(null);
          setError(null);
          return;
        }
        if (poolRes?.data?.qrCode) {
          setQrCodeUrl(poolRes.data.qrCode);
          setError(null);
          return;
        }
        const rawQr = poolRes?.data?.rawQr || poolRes?.data?.qr;
        if (rawQr) {
          const url = await QRCode.toDataURL(rawQr, { width: 220, margin: 1 });
          setQrCodeUrl(url);
          setError(null);
          return;
        }
        if (poolRes?.data?.message) lastMessage = poolRes.data.message;
        if (attempt < 7) await new Promise(resolve => setTimeout(resolve, 2000));
      }

      setQrCodeUrl(null);
      setError(`${lastMessage} Click "Refresh Live QR" once Chromium finishes loading.`);
    } catch (err) {
      setQrCodeUrl(null);
      setError(
        err instanceof Error
          ? err.message
          : 'Could not reach Linda WhatsApp gateway on :5001 to fetch a live QR code.'
      );
    } finally {
      setLoading(false);
    }
  }, [phoneNumber]);

  const handleGeneratePairCode = async () => {
    const cleanTarget = phoneNumber.trim();
    if (!cleanTarget) {
      setError('Please enter a valid UAE/international phone number (e.g. +971505760056).');
      return;
    }
    setLoading(true);
    setError(null);
    setPairingCode(null);
    try {
      const res = (await apiClient
        .post(`/linda/pool/${encodeURIComponent(cleanTarget)}/pair-code`, {})
        .catch(() => apiClient.post('/linda/pair-code', { phone: cleanTarget }))) as {
        success?: boolean;
        data?: { pairingCode?: string };
        error?: string;
      };
      if (!res?.success || !res?.data?.pairingCode) {
        throw new Error(
          res?.error || 'WhatsApp did not return a pairing code yet. Try Live QR or retry in 5s.'
        );
      }
      setPairingCode(res.data.pairingCode);
      setCountdown(120);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Live 8-digit pairing failed. Ensure the server is running and use Live QR if needed.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateLinked = async () => {
    const target = phoneNumber.trim() || '+971505760056';
    try {
      const statusRes = (await apiClient.get(
        `/linda/pool/${encodeURIComponent(target)}/qr`
      )) as QrResponsePayload;
      if (statusRes?.data?.isConnected) {
        setLinkedSuccess(true);
        setTimeout(() => {
          onSuccess(target);
          onClose();
          setLinkedSuccess(false);
          setPairingCode(null);
        }, 800);
        return;
      }
      setError(
        `Session for ${target} is not authenticated yet — complete scan on your phone first.`
      );
    } catch {
      onSuccess(target);
      onClose();
    }
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
