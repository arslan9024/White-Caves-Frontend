import React from 'react';
import { Radio, Battery, VolumeX, Volume2, Zap, Terminal, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ninaStyles } from './NinaWhatsAppBotCRM.styles';

export interface NinaTopHeaderProps {
  characterSprite: string;
  gatewayStatus: string;
  batteryLevel: number;
  isAudioMuted: boolean;
  toggleAudioMute: () => void;
  subtitleText?: string | null;
  currentStage: number;
  setCurrentStage: (stage: number) => void;
  isConnected: boolean;
}

export const NinaTopHeader: React.FC<NinaTopHeaderProps> = ({
  characterSprite,
  gatewayStatus,
  batteryLevel,
  isAudioMuted,
  toggleAudioMute,
  subtitleText,
  currentStage,
  setCurrentStage,
  isConnected,
}) => {
  return (
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
            src={characterSprite}
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
          <div style={ninaStyles.statusBadge(gatewayStatus)}>
            <Radio size={12} />
            <span>{gatewayStatus.replace(/_/g, ' ')}</span>
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
            <span>{batteryLevel}%</span>
          </div>
          <button
            type="button"
            onClick={toggleAudioMute}
            style={{
              background: '#0B132B',
              border: '1px solid #3A506B',
              borderRadius: '8px',
              padding: '6px',
              color: '#CBD5E1',
              cursor: 'pointer',
            }}
            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isAudioMuted ? <VolumeX size={16} /> : <Volume2 size={16} color="#06B6D4" />}
          </button>
        </div>
      </div>

      {subtitleText && (
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
          🎙️ Nina: "{subtitleText}"
        </motion.div>
      )}

      <nav
        aria-label="RUP Stages"
        style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}
      >
        <button
          type="button"
          style={ninaStyles.stagePill(currentStage === 1, true)}
          onClick={() => setCurrentStage(1)}
        >
          <Zap size={14} /> Stage 1: Inception (Auth)
        </button>
        <button
          type="button"
          style={ninaStyles.stagePill(currentStage === 2, isConnected)}
          onClick={() => isConnected && setCurrentStage(2)}
        >
          <Terminal size={14} /> Stage 2: Elaboration (Features)
        </button>
        <button
          type="button"
          style={ninaStyles.stagePill(currentStage === 3, isConnected)}
          onClick={() => isConnected && setCurrentStage(3)}
        >
          <CheckCircle size={14} /> Stage 3: Construction (Live Inbox)
        </button>
      </nav>
    </header>
  );
};

