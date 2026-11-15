import React, { memo, useState, useCallback, useEffect } from 'react';
import InternalModuleMount from './shared/InternalModuleMount';
import { useTheme } from '../../context/ThemeContext';
import { LindaExecutiveHeader } from './LindaWhatsAppCRM/LindaExecutiveHeader';
import { LindaTelemetryGrid } from './LindaWhatsAppCRM/LindaTelemetryGrid';
import { LindaTreeDrawer } from './LindaWhatsAppCRM/LindaTreeDrawer';
import { LindaBreadcrumbBar } from './LindaWhatsAppCRM/LindaBreadcrumbBar';
import { LindaMdAccessPanel } from './LindaWhatsAppCRM/LindaMdAccessPanel';
import {
  LINDA_TREE_NODES,
  type LindaTreeNodeId,
  type LindaBreadcrumbState,
} from './LindaWhatsAppCRM/lindaTreeNavigation';
import {
  LindaQuickActionsAndTerminal,
  LindaSessionsPanel,
} from './LindaWhatsAppCRM/LindaOperationsCenterPanels';
import {
  LindaCampaignsAndOutreachPanel,
  LindaConversationsAndPillarsPanel,
} from './LindaWhatsAppCRM/LindaCampaignsAndOutreachPanels';
import { LindaLiveWhatsAppWeb } from './LindaWhatsAppCRM/LindaLiveWhatsAppWeb';
import { type LindaViewTab } from './LindaWhatsAppCRM/LindaWhatsAppCRM.types';
import {
  INITIAL_OUTREACH_OWNERS,
  LINDA_10_PILLARS,
} from './LindaWhatsAppCRM/LindaWhatsAppCRM.data';
import { useLindaOperationsCenter } from './LindaWhatsAppCRM/useLindaOperationsCenter';

/**
 * LindaWhatsAppCRM — Upgraded Visual Operations Center (v2.0.0-enterprise)
 * Modularized under AEGIS APOCALYPSE-AEG-042 (< 350 lines).
 */
const LindaWhatsAppCRM = memo(() => {
  const { isDark } = useTheme();
  const [activeViewTab, setActiveViewTab] = useState<LindaViewTab>('all');
  const [activeNodeId, setActiveNodeId] = useState<LindaTreeNodeId>('inbox');
  const [leafLabel, setLeafLabel] = useState<string | null>(null);
  const [mdApproved, setMdApproved] = useState<boolean>(true);

  const {
    isConnected,
    lindaStatus,
    loadingAction,
    controlError,
    soundEnabled,
    setSoundEnabled,
    currentTimeGST,
    heartbeatLatency,
    confirmEmergencyStop,
    setConfirmEmergencyStop,
    qrCodeDataUrl,
    setQrCodeDataUrl,
    isQrLoading,
    toastNotification,
    setToastNotification,
    metrics,
    sessions,
    campaigns,
    conversations,
    features,
    playbooks,
    activeModalOutput,
    setActiveModalOutput,
    terminalLines,
    setTerminalLines,
    liveLogs,
    refreshLindaStatus,
    handleToggleLindaRuntime,
    handleExecuteCommand,
    handlePingSession,
    handlePairDeviceCode,
    handleScanDeviceQr,
    handleToggleCampaignStatus,
    handleQueueOutreachBatch,
    handleSendQuickReply,
  } = useLindaOperationsCenter();

  const handleSelectTreeNode = useCallback(
    (nodeId: LindaTreeNodeId) => {
      const node = LINDA_TREE_NODES.find(n => n.id === nodeId);
      if (!node) return;
      if (node.requiresMdApproval && !mdApproved) {
        setToastNotification('MD Approval required to access governance controls.');
        return;
      }
      setActiveNodeId(nodeId);
      setActiveViewTab(node.viewTab);
      setLeafLabel(null);
    },
    [mdApproved, setToastNotification]
  );

  const handleReturnToParent = useCallback(() => {
    setLeafLabel(null);
    setToastNotification('Returned to parent workspace.');
  }, [setToastNotification]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }
      if (e.key === 'Escape' && leafLabel) {
        handleReturnToParent();
        return;
      }
      const matched = LINDA_TREE_NODES.find(n => n.shortcut === e.key);
      if (matched) {
        handleSelectTreeNode(matched.id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [leafLabel, handleReturnToParent, handleSelectTreeNode]);

  const breadcrumbState: LindaBreadcrumbState = { nodeId: activeNodeId, leafLabel };
  const hotLeadCount = conversations.filter(c => c.intent === 'BUY' || c.intent === 'VIP').length;

  const fallbackContent = (
    <section
      aria-label="Linda WhatsApp CRM"
      data-testid="linda-operations-center"
      style={{ display: 'grid', gap: 16, paddingBottom: 28 }}
    >
      <LindaExecutiveHeader
        isDark={isDark}
        isConnected={isConnected}
        lindaStatus={lindaStatus}
        loadingAction={loadingAction}
        controlError={controlError}
        activeViewTab={activeViewTab}
        setActiveViewTab={setActiveViewTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        currentTimeGST={currentTimeGST}
        heartbeatLatency={heartbeatLatency}
        confirmEmergencyStop={confirmEmergencyStop}
        setConfirmEmergencyStop={setConfirmEmergencyStop}
        toastNotification={toastNotification}
        setToastNotification={setToastNotification}
        onRefreshStatus={() => void refreshLindaStatus()}
        onToggleRuntime={() => void handleToggleLindaRuntime()}
      />

      <LindaTelemetryGrid isDark={isDark} metrics={metrics} />

      <LindaBreadcrumbBar
        isDark={isDark}
        breadcrumb={breadcrumbState}
        mdApproved={mdApproved}
        onReturnToParent={handleReturnToParent}
        onToggleMdApproval={() => {
          setMdApproved(prev => !prev);
          setToastNotification(!mdApproved ? 'MD Access Approved' : 'MD Access Locked');
        }}
      />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <LindaTreeDrawer
          isDark={isDark}
          activeNodeId={activeNodeId}
          hotLeadCount={hotLeadCount}
          mdApproved={mdApproved}
          onSelectNode={handleSelectTreeNode}
        />

        <div style={{ flex: 1, minWidth: 0, display: 'grid', gap: 16 }}>
          {activeNodeId === 'access_control' && (
            <LindaMdAccessPanel
              isDark={isDark}
              mdApproved={mdApproved}
              onActionComplete={msg => {
                setToastNotification(msg);
                setLeafLabel(null);
              }}
            />
          )}

          {(activeViewTab === 'all' || activeViewTab === 'whatsapp_web') && (
            <LindaLiveWhatsAppWeb
              conversations={conversations}
              onSendMessage={(convId, text) => {
                const match = conversations.find(c => c.id === convId);
                if (match) {
                  handleSendQuickReply({ ...match, lastMessage: text });
                }
              }}
              onAutoReplyWithAI={handleSendQuickReply}
            />
          )}

          {(activeViewTab === 'all' || activeViewTab === 'terminal') && (
            <LindaQuickActionsAndTerminal
              features={features}
              playbooks={playbooks}
              terminalLines={terminalLines}
              onExecuteCommand={(cmd, label) => void handleExecuteCommand(cmd, label)}
              onClearTerminal={() =>
                setTerminalLines(['$ Terminal cleared. Ready for next command.'])
              }
              activeModalOutput={activeModalOutput}
              onCloseModal={() => {
                setActiveModalOutput(null);
                setQrCodeDataUrl(null);
              }}
              qrCodeDataUrl={qrCodeDataUrl}
              isQrLoading={isQrLoading}
            />
          )}

          {(activeViewTab === 'all' || activeViewTab === 'sessions') && (
            <LindaSessionsPanel
              sessions={sessions}
              onPingSession={handlePingSession}
              onPairDeviceCode={handlePairDeviceCode}
              onScanDeviceQr={handleScanDeviceQr}
            />
          )}

          {(activeViewTab === 'all' || activeViewTab === 'outreach') && (
            <LindaCampaignsAndOutreachPanel
              campaigns={campaigns}
              onToggleCampaignStatus={handleToggleCampaignStatus}
              outreachOwners={INITIAL_OUTREACH_OWNERS}
              onQueueOutreachBatch={handleQueueOutreachBatch}
            />
          )}

          {(activeViewTab === 'all' || activeViewTab === 'conversations') && (
            <LindaConversationsAndPillarsPanel
              conversations={conversations}
              pillars={LINDA_10_PILLARS}
              liveLogs={liveLogs}
              onSendQuickReply={handleSendQuickReply}
            />
          )}
        </div>
      </div>
    </section>
  );

  return <InternalModuleMount assistantId="linda" fallback={fallbackContent} />;
});

LindaWhatsAppCRM.displayName = 'LindaWhatsAppCRM';

export default LindaWhatsAppCRM;
