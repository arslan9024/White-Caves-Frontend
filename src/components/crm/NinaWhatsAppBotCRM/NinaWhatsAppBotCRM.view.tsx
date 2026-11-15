/**
 * NinaWhatsAppBotCRM — View Presentation Layer
 * Standard: Mary Allen Wilkes Protocol (.view.tsx)
 * Single Purpose File Law: < 350 lines
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNinaWhatsAppBotLogic } from './NinaWhatsAppBotCRM.logic';
import { NinaFallbackView } from './NinaWhatsAppBotCRM.fallback';
import { ninaStyles } from './NinaWhatsAppBotCRM.styles';
import type { FeatureTabKey } from './NinaWhatsAppBotCRM.types';

// Subcomponents
import { NinaTopHeader } from './NinaTopHeader';
import { NinaStage1PairingCard } from './NinaStage1PairingCard';
import { ConversationsTab } from './tabs/ConversationsTab';
import { AutoReplyPlannerTab } from './tabs/AutoReplyPlannerTab';
import { NativeEngineTab } from './tabs/NativeEngineTab';
import { SessionsTab } from './tabs/SessionsTab';
import { BotsTab } from './tabs/BotsTab';
import { CodeModulesTab } from './tabs/CodeModulesTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { NinaSettingsTab } from './tabs/SettingsTab';
import { NinaFeaturesTab } from './tabs/FeaturesTab';
import AssistantLifecycleTab from '../shared/AssistantLifecycleTab';

export const NinaWhatsAppBotCRMView: React.FC = () => {
  const logic = useNinaWhatsAppBotLogic();

  if (!logic.isMDAuthorized) {
    return <NinaFallbackView reason="ACCESS_DENIED" />;
  }

  const renderStage2FeatureView = () => {
    switch (logic.selectedFeatureTab) {
      case 'autoreply':
        return <AutoReplyPlannerTab />;
      case 'engine':
        return <NativeEngineTab />;
      case 'sessions':
        return <SessionsTab data={logic.data} />;
      case 'bots':
        return <BotsTab data={logic.data} />;
      case 'code':
        return <CodeModulesTab data={logic.data} />;
      case 'analytics':
        return <AnalyticsTab data={logic.data} />;
      case 'settings':
        return <NinaSettingsTab data={logic.data} />;
      case 'features':
        return <NinaFeaturesTab data={logic.data} />;
      case 'lifecycle':
        return <AssistantLifecycleTab assistantId="nina" color="#06B6D4" assistantName="Nina" />;
      default:
        return <AutoReplyPlannerTab />;
    }
  };

  return (
    <div style={ninaStyles.container} data-testid="nina-whatsapp-bot-crm">
      <div style={{ flex: 1, padding: '1.5rem', maxWidth: '1440px', margin: '0 auto' }}>
        <NinaTopHeader
          characterSprite={logic.characterSprite}
          gatewayStatus={logic.gatewayStatus}
          batteryLevel={logic.batteryLevel}
          isAudioMuted={logic.isAudioMuted}
          toggleAudioMute={logic.toggleAudioMute}
          subtitleText={logic.subtitleText}
          currentStage={logic.currentStage}
          setCurrentStage={logic.setCurrentStage}
          isConnected={logic.isConnected}
        />

        <main>
          <AnimatePresence mode="wait">
            {logic.currentStage === 1 && (
              <NinaStage1PairingCard
                phoneNumber={logic.phoneNumber}
                pairingCode={logic.pairingCode}
                copiedCode={logic.copiedCode}
                isGenerating={logic.isGenerating}
                handleCopyPairingCode={logic.handleCopyPairingCode}
                handleRegeneratePairingCode={logic.handleRegeneratePairingCode}
                initiateDeviceLinkSequence={logic.initiateDeviceLinkSequence}
              />
            )}

            {logic.currentStage === 2 && (
              <motion.div
                key="stage-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '1.5rem',
                    overflowX: 'auto',
                    paddingBottom: '4px',
                  }}
                >
                  {(
                    [
                      'autoreply',
                      'engine',
                      'sessions',
                      'bots',
                      'code',
                      'analytics',
                      'settings',
                      'features',
                      'lifecycle',
                    ] as FeatureTabKey[]
                  ).map(tab => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => logic.setSelectedFeatureTab(tab)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        border: 'none',
                        background: logic.selectedFeatureTab === tab ? '#06B6D4' : '#1C2541',
                        color: logic.selectedFeatureTab === tab ? '#FFFFFF' : '#94A3B8',
                        textTransform: 'capitalize',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {renderStage2FeatureView()}
              </motion.div>
            )}

            {logic.currentStage === 3 && (
              <motion.div
                key="stage-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ConversationsTab />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default NinaWhatsAppBotCRMView;
