import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LindaCampaignsTable } from './LindaCampaignsTable';
import { LindaSessionsPanel } from './LindaSessionsPanel';
import { LindaPinnedTerminal } from './LindaPinnedTerminal';
import {
  INITIAL_LINDA_CAMPAIGNS,
  INITIAL_LINDA_SESSIONS,
  INITIAL_LINDA_FEATURES,
  INITIAL_LINDA_PLAYBOOKS,
} from './LindaWhatsAppCRM.data';

describe('Linda Operations 5x Upgrades Suite', () => {
  it('renders campaigns table with animated progress bar and spintax modal trigger', () => {
    const onToggle = vi.fn();
    render(
      <LindaCampaignsTable campaigns={INITIAL_LINDA_CAMPAIGNS} onToggleCampaignStatus={onToggle} />
    );

    expect(screen.getByText(/Outreach Campaigns & Drip Broadcasts/i)).toBeInTheDocument();
    const spintaxBtn = screen.getByTestId('spintax-btn-camp-dh2-vardon');
    expect(spintaxBtn).toBeInTheDocument();

    fireEvent.click(spintaxBtn);
    expect(screen.getByTestId('spintax-preview-modal')).toBeInTheDocument();
    expect(screen.getByText(/Spintax Jitter Variations/i)).toBeInTheDocument();

    // Close spintax modal
    const closeBtn = screen.getByText('Done');
    fireEvent.click(closeBtn);
    expect(screen.queryByTestId('spintax-preview-modal')).not.toBeInTheDocument();
  });

  it('renders sessions panel with live latency, memory, and telemetry bars', () => {
    const onPing = vi.fn();
    const onPair = vi.fn();
    const onScan = vi.fn();

    render(
      <LindaSessionsPanel
        sessions={INITIAL_LINDA_SESSIONS}
        onPingSession={onPing}
        onPairDeviceCode={onPair}
        onScanDeviceQr={onScan}
      />
    );

    expect(screen.getByTestId('linda-session-telemetry-bar')).toBeInTheDocument();
    expect(screen.getByText(/Chromium Resident Heap/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-Device Power\/Conn/i)).toBeInTheDocument();
  });

  it('renders pinned cyber-terminal with syntax highlighting and 1-click playbook runners', () => {
    const onExec = vi.fn();
    const onClear = vi.fn();
    const onCopy = vi.fn();
    const onSubmit = vi.fn();

    render(
      <LindaPinnedTerminal
        features={INITIAL_LINDA_FEATURES}
        playbooks={INITIAL_LINDA_PLAYBOOKS}
        terminalLines={['$ test-line', '✓ Connection established OK', '⚠️ Anti-ban delay active']}
        terminalFilter=""
        setTerminalFilter={vi.fn()}
        autoScroll={true}
        setAutoScroll={vi.fn()}
        copiedLog={false}
        onCopyLogs={onCopy}
        onClearTerminal={onClear}
        commandInput=""
        setCommandInput={vi.fn()}
        onSubmit={onSubmit}
        onExecuteCommand={onExec}
      />
    );

    expect(screen.getByTestId('linda-terminal-box')).toBeInTheDocument();
    expect(screen.getByTestId('linda-terminal-input')).toBeInTheDocument();
    expect(screen.getByText(/FEATURE CATALOG F1–F35/i)).toBeInTheDocument();
    expect(screen.getByText(/Morning System & Session Readiness/i)).toBeInTheDocument();
  });
});
