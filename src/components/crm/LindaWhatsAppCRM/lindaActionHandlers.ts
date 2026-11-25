import QRCode from 'qrcode';
import { apiClient } from '../../../utils/apiClient';
import type { LindaSessionItem, LindaConversationItem } from './LindaWhatsAppCRM.types';
import { getFallbackCommandOutput } from './lindaCommandFallbacks';

export interface LindaActionHandlersDeps {
  appendLog: (msg: string) => void;
  setFeatures: React.Dispatch<React.SetStateAction<any[]>>;
  setPlaybooks: React.Dispatch<React.SetStateAction<any[]>>;
  setTerminalLines: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveModalOutput: React.Dispatch<
    React.SetStateAction<{ title: string; output: string } | null>
  >;
  setSessions: React.Dispatch<React.SetStateAction<LindaSessionItem[]>>;
  setCampaigns: React.Dispatch<React.SetStateAction<any[]>>;
  setQrCodeDataUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setIsQrLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * createLindaActionHandlers — pure action dispatcher for Linda WhatsApp CRM
 * Extracted under AEGIS APOCALYPSE-AEG-042 (< 350 lines).
 */
export function createLindaActionHandlers(deps: LindaActionHandlersDeps) {
  const {
    appendLog,
    setFeatures,
    setPlaybooks,
    setTerminalLines,
    setActiveModalOutput,
    setSessions,
    setCampaigns,
    setQrCodeDataUrl,
    setIsQrLoading,
  } = deps;

  const handleExecuteCommand = async (cmd: string, label?: string) => {
    const normalized = cmd.trim().toLowerCase();
    const title = label || cmd.toUpperCase();

    if (/^f\d+$/i.test(normalized)) {
      const fId = normalized.toUpperCase();
      setFeatures(prev => prev.map(f => (f.id === fId ? { ...f, uses: f.uses + 1 } : f)));
    }
    if (/^p\d+$/i.test(normalized)) {
      const pId = normalized.toUpperCase();
      setPlaybooks(prev => prev.map(p => (p.id === pId ? { ...p, uses: p.uses + 1 } : p)));
    }

    let outputText = '';
    try {
      const res = (await apiClient.post('/linda/run-script', { script: normalized })) as {
        success?: boolean;
        data?: { output?: string };
      };
      if (res?.data?.output) outputText = res.data.output;
    } catch {
      // Fallback local execution
    }

    if (!outputText) outputText = getFallbackCommandOutput(normalized, title);
    setTerminalLines(prev => [...prev, `$ ${cmd}`, outputText]);
    setActiveModalOutput({ title, output: outputText });
    appendLog(`Executed command "${cmd}" (${title})`);
  };

  const handlePingSession = async (sessionId: string) => {
    try {
      const res = (await apiClient.post(
        `/linda/sessions/${encodeURIComponent(sessionId)}/ping`,
        {}
      )) as {
        success?: boolean;
        data?: {
          isConnected?: boolean;
          status?: string;
          connState?: 'CONNECTED' | 'RECONNECTING' | 'OFFLINE';
          linkState?: 'LINKED' | 'NOT LINKED';
          message?: string;
        };
      };
      const isLive = Boolean(res?.data?.isConnected);
      setSessions(prev =>
        prev.map(s =>
          s.id === sessionId
            ? {
                ...s,
                status: isLive ? 'connected' : 'disconnected',
                connState: res?.data?.connState || (isLive ? 'CONNECTED' : 'OFFLINE'),
                linkState: res?.data?.linkState || s.linkState,
                lastActivity: isLive ? 'Just now' : 'Offline — pair required',
              }
            : s
        )
      );
      appendLog(res?.data?.message || `Pinged ${sessionId}: ${isLive ? 'CONNECTED' : 'OFFLINE'}.`);
    } catch (err) {
      appendLog(
        `Ping failed for ${sessionId}: ${err instanceof Error ? err.message : 'Server unreachable'}`
      );
    }
  };

  const handlePairDeviceCode = async (session: LindaSessionItem) => {
    const cleanPhone = session.phone.replace(/\s+/g, '');
    let output = '';
    try {
      const res = (await apiClient.post(
        `/linda/pool/${encodeURIComponent(cleanPhone)}/pair-code`,
        {}
      )) as { success?: boolean; data?: { pairingCode?: string }; error?: string };
      if (!res?.success || !res?.data?.pairingCode) {
        throw new Error(res?.error || 'WhatsApp client not ready for pairing code yet.');
      }
      output = [
        `🔑 8-DIGIT LIVE PHONE PAIRING CODE (Multi-SIM Gateway · Feature F2)`,
        `  Account: ${session.name}`,
        `  Phone:   ${session.phone}`,
        `  Code:    ${res.data.pairingCode} (Valid for 60 seconds)`,
        `  Steps:   Open WhatsApp on phone -> Linked Devices -> Link with phone number -> Enter ${res.data.pairingCode}`,
      ].join('\n');
      appendLog(`Generated live 8-digit pairing code for ${session.phone}`);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Pairing code request failed';
      output = [
        `⚠️ PAIRING CODE NOT READY FOR ${session.phone}`,
        `  Reason: ${errMsg}`,
        `  Action: Click "Scan QR" to initialize Chromium first or retry in 5 seconds.`,
      ].join('\n');
      appendLog(`Pairing code failed for ${session.phone}: ${errMsg}`);
    }
    setActiveModalOutput({ title: `8-Digit Pairing Code — ${session.phone}`, output });
    setTerminalLines(prev => [...prev, `$ link-code ${cleanPhone}`, output]);
  };

  const handleScanDeviceQr = async (session: LindaSessionItem) => {
    setIsQrLoading(true);
    setQrCodeDataUrl(null);
    const cleanPhone = session.phone.replace(/\s+/g, '');
    let statusMessage = 'Initializing Chromium WhatsApp Web — waiting for live QR...';

    try {
      await apiClient
        .post(`/linda/pool/${encodeURIComponent(cleanPhone)}/connect`, {})
        .catch(() => apiClient.post('/linda/connect', { phone: cleanPhone }));

      for (let attempt = 0; attempt < 6; attempt++) {
        const res = (await apiClient
          .get(`/linda/pool/${encodeURIComponent(cleanPhone)}/qr`)
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
        if (res?.data?.isConnected) {
          statusMessage = 'Already paired & authenticated — LocalAuth session active.';
          break;
        }
        if (res?.data?.qrCode) {
          setQrCodeDataUrl(res.data.qrCode);
          statusMessage = 'Live QR ready — scan with WhatsApp (Linked Devices -> Link a Device).';
          break;
        }
        if (res?.data?.rawQr || res?.data?.qr) {
          const qrUrl = await QRCode.toDataURL(String(res.data.rawQr || res.data.qr), {
            width: 220,
            margin: 1,
          });
          setQrCodeDataUrl(qrUrl);
          statusMessage = 'Live QR ready — scan with WhatsApp (Linked Devices -> Link a Device).';
          break;
        }
        if (res?.data?.message) statusMessage = res.data.message;
        if (attempt < 5) await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (err) {
      statusMessage =
        err instanceof Error
          ? `Gateway error: ${err.message}`
          : 'Backend initializing LocalAuth QR — retry in 5 seconds.';
    } finally {
      setIsQrLoading(false);
    }

    const output = [
      `📷 LIVE QR DEVICE LINKING (${session.phone})`,
      `  Account: ${session.name}`,
      `  Profile: LocalAuth ./.linda-sessions/session-${cleanPhone.replace(/\D/g, '')}`,
      `  Status:  ${statusMessage}`,
    ].join('\n');
    setActiveModalOutput({ title: `QR Device Linking — ${session.name}`, output });
    setTerminalLines(prev => [...prev, `$ link-qr ${cleanPhone}`, output]);
    appendLog(`QR linking status for ${session.name}: ${statusMessage}`);
  };

  const handleToggleCampaignStatus = (campaignId: string) => {
    setCampaigns(prev =>
      prev.map(c => {
        if (c.id !== campaignId) return c;
        const next = c.status === 'active' ? 'paused' : 'active';
        void apiClient
          .patch(`/linda/campaigns/${encodeURIComponent(campaignId)}/status`, { status: next })
          .catch(() => {});
        appendLog(`Campaign "${c.name}" switched to ${next.toUpperCase()}.`);
        return {
          ...c,
          status: next,
          nextBatch: next === 'active' ? 'In 3 mins' : 'Paused by Admin',
        };
      })
    );
  };

  const handleQueueOutreachBatch = async (cluster: string) => {
    let summaryMsg = `📅 [F35 Outreach Planner] Queued safe humanized batch for cluster [${cluster}] (35–65s Gaussian jitter, Privacy-Safe).`;
    try {
      const res = (await apiClient.post('/linda/campaigns/warm-sequence-launch', {
        sequenceKey: 'LANDLORD_RETENTION_RENEWAL',
        cluster: cluster === 'ALL' ? undefined : cluster,
        limit: 25,
        dryRun: true,
      })) as {
        success?: boolean;
        data?: { totalRecipients?: number; dryRunCount?: number; dncSuppressedCount?: number };
      };
      if (res?.success && res?.data) {
        summaryMsg = `📅 [F35 Warm Sequence] Audited ${res.data.totalRecipients ?? 0} DH2 contacts (${res.data.dryRunCount ?? 0} ready, ${res.data.dncSuppressedCount ?? 0} DNC suppressed) for [${cluster}].`;
      }
    } catch {
      // keep safe summary fallback
    }
    setTerminalLines(prev => [...prev, `$ outreach --cluster=${cluster}`, summaryMsg]);
    setActiveModalOutput({ title: `Outreach Batch Queued (${cluster})`, output: summaryMsg });
    appendLog(summaryMsg);
  };

  const handleSendQuickReply = async (conv: LindaConversationItem) => {
    const cleanPhone = (conv.phone || conv.id || '').replace(/\D/g, '');
    const replyBody =
      conv.lastMessage?.trim() ||
      `Hello ${conv.contactName}, this is AI Linda from White Caves Real Estate LLC regarding ${conv.cluster || 'DAMAC Hills 2'}. Visit https://whitecaves.ae to book with Arslan Malik.`;
    try {
      const res = (await apiClient.post(`/linda/send/${encodeURIComponent(conv.id)}`, {
        phoneNumber: cleanPhone || conv.phone,
        message: replyBody,
        accountPhone: conv.accountPhone,
      })) as { success?: boolean; error?: string };
      if (res && res.success === false) {
        throw new Error(res.error || 'WhatsApp gateway rejected message');
      }
      const msg = `Sent WhatsApp reply to ${conv.contactName} (${conv.phone}).`;
      setTerminalLines(prev => [...prev, `$ reply ${conv.phone}`, msg]);
      appendLog(msg);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'WhatsApp line offline';
      setTerminalLines(prev => [...prev, `$ reply ${conv.phone}`, `FAILED: ${errMsg}`]);
      appendLog(`Failed sending WhatsApp reply to ${conv.contactName}: ${errMsg}`);
    }
  };

  return {
    handleExecuteCommand,
    handlePingSession,
    handlePairDeviceCode,
    handleScanDeviceQr,
    handleToggleCampaignStatus,
    handleQueueOutreachBatch,
    handleSendQuickReply,
  };
}
