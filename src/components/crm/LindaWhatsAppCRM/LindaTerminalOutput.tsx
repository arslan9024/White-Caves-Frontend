import React from 'react';
import { Play } from 'lucide-react';

export interface LindaTerminalOutputProps {
  filteredTerminalLines: string[];
  terminalFilter: string;
  setTerminalFilter: (filter: string) => void;
  autoScroll: boolean;
  setAutoScroll: (auto: boolean) => void;
  copiedLog: boolean;
  onCopyLogs: () => void;
  onClearTerminal: () => void;
  commandInput: string;
  setCommandInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LindaTerminalOutput: React.FC<LindaTerminalOutputProps> = ({
  filteredTerminalLines,
  terminalFilter,
  setTerminalFilter,
  autoScroll,
  setAutoScroll,
  copiedLog,
  onCopyLogs,
  onClearTerminal,
  commandInput,
  setCommandInput,
  onSubmit,
}) => {
  const renderHighlightedLine = (line: string, idx: number) => {
    let color = '#38BDF8';
    if (line.includes('[ERR]') || line.includes('Error') || line.includes('failed')) {
      color = '#F87171';
    } else if (line.includes('✓') || line.includes('OK') || line.includes('Linked')) {
      color = '#4ADE80';
    } else if (line.includes('⚠️') || line.includes('Warning') || line.includes('Anti-ban')) {
      color = '#FBBF24';
    } else if (line.startsWith('$')) {
      color = '#E2E8F0';
    }

    return (
      <div key={idx} style={{ color, whiteSpace: 'pre-wrap', marginBottom: 4 }}>
        {line}
      </div>
    );
  };

  return (
    <div
      style={{
        border: '1px solid rgba(6, 182, 212, 0.55)',
        background: '#020617',
        borderRadius: 8,
        padding: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#67E8F9', fontWeight: 700 }}>
          [PANEL 4 · LIVE TERMINAL OUTPUT & MESSAGE ANALYZER]
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input
            type="text"
            placeholder="Search terminal logs..."
            value={terminalFilter}
            onChange={e => setTerminalFilter(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              borderRadius: 4,
              padding: '3px 8px',
              fontSize: 11,
              color: '#E2E8F0',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={() => setAutoScroll(!autoScroll)}
            style={{
              background: autoScroll ? 'rgba(34, 197, 94, 0.2)' : 'rgba(148, 163, 184, 0.2)',
              border: autoScroll ? '1px solid #22C55E' : '1px solid #64748B',
              color: autoScroll ? '#86EFAC' : '#94A3B8',
              borderRadius: 4,
              padding: '3px 8px',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            Auto-Scroll: {autoScroll ? 'ON' : 'OFF'}
          </button>
          <button
            type="button"
            onClick={onCopyLogs}
            style={{
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.5)',
              color: '#93C5FD',
              borderRadius: 4,
              padding: '3px 8px',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            {copiedLog ? '✓ Copied' : 'Copy'}
          </button>
          <button
            type="button"
            onClick={onClearTerminal}
            style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              color: '#FCA5A5',
              borderRadius: 4,
              padding: '3px 8px',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div
        data-testid="linda-terminal-box"
        style={{
          background: '#030712',
          border: '1px solid rgba(15, 23, 42, 0.8)',
          borderRadius: 6,
          minHeight: 180,
          maxHeight: 280,
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: 11,
          padding: '6px 4px',
        }}
      >
        {filteredTerminalLines.map((line, idx) => renderHighlightedLine(line, idx))}
      </div>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              position: 'absolute',
              left: 10,
              color: '#22D3EE',
              fontFamily: 'monospace',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            $
          </span>
          <input
            type="text"
            data-testid="linda-terminal-input"
            value={commandInput}
            onChange={e => setCommandInput(e.target.value)}
            placeholder="Enter command: doctor, status, link 8digit, send, spintax..."
            style={{
              width: '100%',
              background: '#0A0F1D',
              border: '1px solid rgba(6, 182, 212, 0.5)',
              borderRadius: 6,
              padding: '8px 12px 8px 24px',
              color: '#67E8F9',
              fontFamily: 'monospace',
              fontSize: 12,
              outline: 'none',
            }}
          />
        </div>
        <button
          type="submit"
          data-testid="linda-terminal-submit-btn"
          style={{
            background: '#06B6D4',
            border: 'none',
            color: '#020617',
            borderRadius: 6,
            padding: '0 16px',
            fontWeight: 700,
            fontSize: 12,
            fontFamily: 'monospace',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Play size={12} /> Run
        </button>
      </form>
    </div>
  );
};
