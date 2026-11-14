/**
 * NinaWhatsAppBotCRM — View Presentation Layer
 * Standard: Mary Allen Wilkes Protocol (.view.tsx)
 * Single Purpose File Law: < 350 lines
 */

import React from 'react';
import {
  RefreshCw,
  Volume2,
  VolumeX,
  Battery,
  Radio,
  Zap,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Copy,
  Terminal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNinaWhatsAppBotLogic } from './NinaWhatsAppBotCRM.logic';
import { NinaFallbackView } from './NinaWhatsAppBotCRM.fallback';
import { ninaStyles } from './NinaWhatsAppBotCRM.styles';
import type { FeatureTabKey } from './NinaWhatsAppBotCRM.types';

// Tab subcomponents
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
        {/* Top Header Card */}
        <header style={ninaStyles.headerCard}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src={logic.characterSprite}
                alt="Nina AI"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #06B6D4',
                }}
              />
              <div>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                  Nina AI Assistant{' '}
                  <span style={{ color: '#06B6D4', fontSize: '0.85rem' }}>Desk 3.2</span>
                </h1>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8' }}>
                  RUP 3-Stage Gated Architecture & DLD Property Engine (+971 50 576 0056)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={ninaStyles.statusBadge(logic.gatewayStatus)}>
                <Radio size={12} />
                <span>{logic.gatewayStatus.replace(/_/g, ' ')}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  color: '#94A3B8',
                }}
              >
                <Battery size={14} color="#10B981" />
                <span>{logic.batteryLevel}%</span>
              </div>
              <button
                type="button"
                onClick={logic.toggleAudioMute}
                style={{
                  background: '#0B132B',
                  border: '1px solid #3A506B',
                  borderRadius: '8px',
                  padding: '6px',
                  color: '#CBD5E1',
                  cursor: 'pointer',
                }}
                title={logic.isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {logic.isAudioMuted ? <VolumeX size={16} /> : <Volume2 size={16} color="#06B6D4" />}
              </button>
            </div>
          </div>

          {/* Subtitle Bar */}
          {logic.subtitleText && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '1rem',
                padding: '8px 12px',
                background: '#0B132B',
                borderRadius: '8px',
                borderLeft: '3px solid #06B6D4',
                fontSize: '0.8rem',
                color: '#E2E8F0',
                fontStyle: 'italic',
              }}
            >
              🎙️ Nina: "{logic.subtitleText}"
            </motion.div>
          )}

          {/* Stage Progression Pills */}
          <nav
            aria-label="RUP Stages"
            style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}
          >
            <button
              type="button"
              style={ninaStyles.stagePill(logic.currentStage === 1, true)}
              onClick={() => logic.setCurrentStage(1)}
            >
              <Zap size={14} /> Stage 1: Inception (Auth)
            </button>
            <button
              type="button"
              style={ninaStyles.stagePill(logic.currentStage === 2, logic.isConnected)}
              onClick={() => logic.isConnected && logic.setCurrentStage(2)}
            >
              <Terminal size={14} /> Stage 2: Elaboration (Features)
            </button>
            <button
              type="button"
              style={ninaStyles.stagePill(logic.currentStage === 3, logic.isConnected)}
              onClick={() => logic.isConnected && logic.setCurrentStage(3)}
            >
              <CheckCircle size={14} /> Stage 3: Construction (Live Inbox)
            </button>
          </nav>
        </header>

        {/* Content by Stage */}
        <main>
          <AnimatePresence mode="wait">
            {logic.currentStage === 1 && (
              <motion.div
                key="stage-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={ninaStyles.pairingCard}
              >
                <h2
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '0.5rem',
                    color: '#FFFFFF',
                  }}
                >
                  Hardware Link Pairing
                </h2>
                <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
                  Verify link for WhatsApp line:{' '}
                  <strong style={{ color: '#06B6D4' }}>{logic.phoneNumber}</strong>
                </p>

                <div style={ninaStyles.codeDisplay}>{logic.pairingCode}</div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginBottom: '2rem',
                  }}
                >
                  <button
                    type="button"
                    onClick={logic.handleCopyPairingCode}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      background: '#06B6D4',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <Copy size={14} /> {logic.copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                  <button
                    type="button"
                    onClick={logic.handleRegeneratePairingCode}
                    disabled={logic.isGenerating}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      background: '#0B132B',
                      color: '#CBD5E1',
                      borderRadius: '8px',
                      border: '1px solid #3A506B',
                      cursor: 'pointer',
                    }}
                  >
                    <RefreshCw size={14} /> Regenerate
                  </button>
                </div>

                <button
                  type="button"
                  onClick={logic.initiateDeviceLinkSequence}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#10B981',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  Confirm Connection & Advance to Stage 2 <ArrowRight size={16} />
                </button>
              </motion.div>
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
                <ConversationsTab data={logic.data} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default NinaWhatsAppBotCRMView;
