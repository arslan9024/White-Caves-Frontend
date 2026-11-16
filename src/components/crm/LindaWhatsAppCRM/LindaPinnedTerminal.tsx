import React, { memo } from 'react';
import type { LindaFeatureBadge, LindaPlaybookBadge } from './LindaWhatsAppCRM.data';
import { LindaPlaybooksCatalog } from './LindaPlaybooksCatalog';
import { LindaTerminalHeader } from './LindaTerminalHeader';
import { LindaTerminalOutput } from './LindaTerminalOutput';

export interface LindaPinnedTerminalProps {
  features: LindaFeatureBadge[];
  playbooks: LindaPlaybookBadge[];
  terminalLines: string[];
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
  onExecuteCommand: (cmd: string, label?: string) => void;
}

/**
 * LindaPinnedTerminal — Pinned 4-Panel Cyber-Terminal with Syntax Highlighting
 * Strictly compliant with Turing Law (< 250 lines).
 */
export const LindaPinnedTerminal: React.FC<LindaPinnedTerminalProps> = memo(
  ({
    features,
    playbooks,
    terminalLines,
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
    onExecuteCommand,
  }) => {
    const filteredTerminalLines = terminalFilter
      ? terminalLines.filter(l => l.toLowerCase().includes(terminalFilter.toLowerCase()))
      : terminalLines;

    return (
      <div
        style={{
          background: '#090D16',
          border: '1px solid rgba(148, 163, 184, 0.28)',
          borderRadius: 12,
          padding: 14,
          display: 'grid',
          gap: 10,
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}
      >
        {/* PANEL 1: Pinned Header */}
        <LindaTerminalHeader />

        {/* PANELS 2 & 3: Features & Playbooks Catalog */}
        <LindaPlaybooksCatalog
          features={features}
          playbooks={playbooks}
          onExecuteCommand={onExecuteCommand}
        />

        {/* PANEL 4: Output & Cyber Command Prompt */}
        <LindaTerminalOutput
          filteredTerminalLines={filteredTerminalLines}
          terminalFilter={terminalFilter}
          setTerminalFilter={setTerminalFilter}
          autoScroll={autoScroll}
          setAutoScroll={setAutoScroll}
          copiedLog={copiedLog}
          onCopyLogs={onCopyLogs}
          onClearTerminal={onClearTerminal}
          commandInput={commandInput}
          setCommandInput={setCommandInput}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
);
