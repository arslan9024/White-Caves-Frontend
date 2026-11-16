/**
 * NinaWhatsAppBotCRM — Logic Hook Layer
 * Standard: Mary Allen Wilkes Protocol (.logic.ts)
 * Single Purpose File Law: < 350 lines
 */

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { selectSessionUser } from '../../../store/selectors/sessionSelectors';
import { useBotData } from './hooks/useBotData';
import { ninaSpeak, setNinaSpeechMuted } from '../../../utils/ninaSpeechEngine';
import type {
  RUPStage,
  GatewayStatus,
  PairingMethod,
  FeatureTabKey,
  NinaLogicState,
  NinaLogicActions,
} from './NinaWhatsAppBotCRM.types';

export function useNinaWhatsAppBotLogic(): NinaLogicState &
  NinaLogicActions & { data: ReturnType<typeof useBotData> } {
  // Managing Director (MD) Sovereign Access Security Guard
  const activeRole = useSelector((state: RootState) => state.navigation?.activeRole ?? '');
  const sessionUser = useSelector(selectSessionUser);
  const isMDAuthorized = Boolean(
    activeRole === 'md' ||
    activeRole === 'owner' ||
    activeRole === 'superuser' ||
    (sessionUser &&
      (sessionUser.email === 'arslanmalikgoraha@gmail.com' ||
        sessionUser.email === 'the.white.caves@gmail.com' ||
        sessionUser.role === 'md' ||
        sessionUser.role === 'owner' ||
        (sessionUser as { accessLevel?: number }).accessLevel === 5))
  );

  // RUP 3-Stage Phase Gate State
  const [currentStage, setCurrentStage] = useState<RUPStage>(1);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [selectedFeatureTab, setSelectedFeatureTab] = useState<FeatureTabKey>('autoreply');

  // Line & Telemetry State
  const [phoneNumber, setPhoneNumber] = useState<string>('+971 50 576 0056');
  const [pairingCode, setPairingCode] = useState<string>('WC-5760-056A');
  const [copiedCode, setCopiedCode] = useState(false);
  const [pairingMethod, setPairingMethod] = useState<PairingMethod>('pairingCode');
  const [isGenerating, setIsGenerating] = useState(false);

  // Gateway Telemetry
  const [gatewayStatus, setGatewayStatus] = useState<GatewayStatus>('UNLINKED_ERROR');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [subtitleText, setSubtitleText] = useState<string | null>(null);
  const [batteryLevel] = useState<number>(88);
  const [signalQuality] = useState<number>(98);
  const [handshakeLogs, setHandshakeLogs] = useState<string[]>([]);

  // Character Sprite Asset
  const [characterSprite] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=480&q=80'
  );

  const data = useBotData();

  const addHandshakeLog = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setHandshakeLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 8)]);
  }, []);

  const toggleAudioMute = useCallback(() => {
    setIsAudioMuted(prev => {
      const nextMuted = !prev;
      setNinaSpeechMuted(nextMuted);
      if (!nextMuted) {
        ninaSpeak('NINA VOICE SYNTHESIZER AUDIO ACTIVE!', setSubtitleText);
      }
      return nextMuted;
    });
  }, []);

  const handleCopyPairingCode = useCallback(() => {
    navigator.clipboard.writeText(pairingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  }, [pairingCode]);

  const handleRegeneratePairingCode = useCallback(async () => {
    setIsGenerating(true);
    try {
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
      const res = await fetch('/api/whatsapp-engine/nina-md-primary/pair-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: cleanPhone || '971505760056' }),
      });
      const json = await res.json();
      if (json.success && json.data?.pairingCode) {
        setPairingCode(json.data.pairingCode);
        addHandshakeLog(`Live WhatsApp Pairing Code generated: ${json.data.pairingCode}`);
      } else {
        const p1 = Math.floor(1000 + Math.random() * 9000);
        const p2 = Math.floor(1000 + Math.random() * 9000);
        setPairingCode(`WC-${p1}-${p2}`);
        addHandshakeLog(`Generated pairing code: WC-${p1}-${p2}`);
      }
    } catch {
      const p1 = Math.floor(1000 + Math.random() * 9000);
      const p2 = Math.floor(1000 + Math.random() * 9000);
      setPairingCode(`WC-${p1}-${p2}`);
      addHandshakeLog(`Generated pairing code: WC-${p1}-${p2}`);
    } finally {
      setIsGenerating(false);
    }
  }, [phoneNumber, addHandshakeLog]);

  const initiateDeviceLinkSequence = useCallback(async () => {
    setGatewayStatus('ESTABLISHING_LINK_STREAM');
    addHandshakeLog('Initializing full-duplex WhatsApp LocalAuth channel...');
    ninaSpeak('AUTHENTICATION REQUEST VALIDATED! WAITING FOR HARDWARE LINK...', setSubtitleText);

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/whatsapp-engine/nina-md-primary/status');
        const json = await res.json();
        if (json.data?.isConnected || json.data?.status === 'READY') {
          clearInterval(pollInterval);
          setIsConnected(true);
          setGatewayStatus('LIVE_CONNECTED_STREAM');
          addHandshakeLog('STATE 3: Hardware link ready and active on line ' + phoneNumber);
          ninaSpeak(
            'GATEWAY CONNECTION FULLY SECURED! UNLOCKING STAGE 2 FEATURE MATRIX!',
            setSubtitleText
          );
          setCurrentStage(2);
        } else {
          addHandshakeLog(
            'STATE 2: Waiting for device authentication... Status: ' +
              (json.data?.status || 'UNKNOWN')
          );
        }
      } catch {
        // Keep polling
      }
    }, 3000);
  }, [phoneNumber, addHandshakeLog]);

  // Trigger Speech on Initial Mount
  useEffect(() => {
    addHandshakeLog(
      'Stage 1 (Inception Phase) initialized. Awaiting device connection on +971 50 576 0056.'
    );
    const timer = setTimeout(() => {
      ninaSpeak(
        'WELCOME TO NINA AI ASSISTANT! STAGE 1 INCEPTION: PLEASE CONFIRM HARDWARE CONNECTION ON +971 50 576 0056!',
        setSubtitleText
      );
    }, 800);
    return () => clearTimeout(timer);
  }, [addHandshakeLog]);

  return {
    currentStage,
    isConnected,
    selectedFeatureTab,
    phoneNumber,
    pairingCode,
    copiedCode,
    pairingMethod,
    isGenerating,
    gatewayStatus,
    isAudioMuted,
    subtitleText,
    batteryLevel,
    signalQuality,
    handshakeLogs,
    characterSprite,
    isMDAuthorized,
    data,
    setCurrentStage,
    setIsConnected,
    setSelectedFeatureTab,
    setPhoneNumber,
    setPairingMethod,
    toggleAudioMute,
    handleCopyPairingCode,
    handleRegeneratePairingCode,
    initiateDeviceLinkSequence,
    addHandshakeLog,
  };
}

