import React from 'react';
import { Terminal, Send } from 'lucide-react';
import { SimulationLogItem } from './nativeEngine.types';
import {
  simulatorContainerStyle,
  simulatorHeadingStyle,
  simulatorInputStyle,
  simulatorSubmitButtonStyle,
} from './nativeEngine.styles';

interface SimulatorPanelProps {
  simulatedInput: string;
  onInputChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  logs: SimulationLogItem[];
}

export const NativeEngineSimulatorPanel: React.FC<SimulatorPanelProps> = ({
  simulatedInput,
  onInputChange,
  onSubmit,
  logs,
}) => {
  return (
    <div style={simulatorContainerStyle}>
      <h4 style={simulatorHeadingStyle}>
        <Terminal size={20} color="#06B6D4" /> Interactive Nina AI Engine Simulator (+971 50 576 0056)
      </h4>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          value={simulatedInput}
          onChange={e => onInputChange(e.target.value)}
          placeholder="Type simulated client message (e.g. 'Looking for villa in DAMAC Hills 2')..."
          style={simulatorInputStyle}
        />
        <button type="submit" style={simulatorSubmitButtonStyle}>
          <Send size={16} /> Test Engine
        </button>
      </form>

      {logs.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: 'var(--text-secondary, #64748B)',
            }}
          >
            Engine Simulation Log:
          </span>
          {logs.map((log, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--white, #FFFFFF)',
                border: '1px solid var(--text-secondary, #E2E8F0)',
                borderRadius: '10px',
                padding: '1rem',
                fontSize: '0.84rem',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
              >
                <strong style={{ color: 'var(--color-06b6d4, #06B6D4)' }}>
                  [{log.time}] Simulated Client Msg: "{log.clientText}"
                </strong>
                <span
                  style={{
                    background: 'var(--accent-gold, #F59E0B)',
                    color: 'var(--white, #FFFFFF)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                  }}
                >
                  Score: {log.assignedLeadScore}/100
                </span>
              </div>
              <div style={{ color: 'var(--color-475569, #475569)', marginBottom: '6px' }}>
                Detected Intent: <strong>{log.detectedIntent}</strong> · DLD Database Villa Matches:{' '}
                <strong>{log.matchedVillasCount}</strong>
              </div>
              <div
                style={{
                  background: 'var(--color-ecfdf5, #ECFDF5)',
                  borderLeft: '3px solid var(--accent-green, #10B981)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  color: 'var(--color-065f46, #065F46)',
                  fontStyle: 'italic',
                }}
              >
                Nina AI Auto-Reply: "{log.autoReply}"
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
