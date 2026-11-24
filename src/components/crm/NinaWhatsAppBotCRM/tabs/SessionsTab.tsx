import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../../../../utils/apiClient';
import { SessionsTabProps } from './sessions/types';
import { EngineTelemetryBanner } from './sessions/EngineTelemetryBanner';
import { PairingPortal } from './sessions/PairingPortal';
import { RegisteredBotsList } from './sessions/RegisteredBotsList';

export const SessionsTab: React.FC<SessionsTabProps> = ({ data }) => {
  const { bots } = data;
  const [selectedBotId, setSelectedBotId] = useState<string>('bot-primary');
  const [pairingMethod, setPairingMethod] = useState<'qr' | 'pairingCode'>('pairingCode');
  const [copiedCode, setCopiedCode] = useState(false);
  const [inputPhoneNumber, setInputPhoneNumber] = useState('+971 50 576 0056');
  const [generatedPairingCode, setGeneratedPairingCode] = useState('READY-TO-PAIR');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());
  const [networkPing, setNetworkPing] = useState<number>(24);
  const [batteryLevel] = useState<number>(98);

  const fetchLiveQr = useCallback(async () => {
    try {
      const start = Date.now();
      const res = (await apiClient.get('/whatsapp-engine/nina/qr')) as {
        success?: boolean;
        data?: { qrCode?: string };
      };
      setNetworkPing(Math.max(12, Date.now() - start));
      setLastSyncTime(new Date().toLocaleTimeString());
      if (res?.success && res.data?.qrCode) {
        setQrCodeUrl(res.data.qrCode);
      }
    } catch {
      // keep existing state when offline
    }
  }, []);

  useEffect(() => {
    void fetchLiveQr();
    const interval = setInterval(() => {
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 10000);
    return () => clearInterval(interval);
  }, [fetchLiveQr]);

  const handleCopyPairingCode = () => {
    void navigator.clipboard?.writeText(generatedPairingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleRegeneratePairingCode = async () => {
    setIsGenerating(true);
    try {
      const res = (await apiClient.post('/whatsapp-engine/nina/pair-code', {
        phoneNumber: inputPhoneNumber.replace(/\s+/g, ''),
      })) as { success?: boolean; data?: { pairingCode?: string } };
      if (res?.success && res.data?.pairingCode) {
        setGeneratedPairingCode(res.data.pairingCode);
      } else {
        setGeneratedPairingCode('CONNECT-ENGINE');
      }
    } catch {
      setGeneratedPairingCode('ENGINE-OFFLINE');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="sessions-tab"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <EngineTelemetryBanner
        lastSyncTime={lastSyncTime}
        networkPing={networkPing}
        batteryLevel={batteryLevel}
      />

      <PairingPortal
        pairingMethod={pairingMethod}
        onPairingMethodChange={setPairingMethod}
        inputPhoneNumber={inputPhoneNumber}
        onPhoneNumberChange={setInputPhoneNumber}
        generatedPairingCode={generatedPairingCode}
        isGenerating={isGenerating}
        copiedCode={copiedCode}
        onRegenerateCode={() => void handleRegeneratePairingCode()}
        onCopyCode={handleCopyPairingCode}
        qrCodeUrl={qrCodeUrl}
      />

      <RegisteredBotsList
        bots={bots}
        selectedBotId={selectedBotId}
        onSelectBot={setSelectedBotId}
      />
    </div>
  );
};
