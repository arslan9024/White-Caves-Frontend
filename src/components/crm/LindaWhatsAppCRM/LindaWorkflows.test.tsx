import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LindaLeadContextPane } from './LindaLeadContextPane';
import { INITIAL_LINDA_CONVERSATIONS } from './LindaWhatsAppCRM.data';

vi.mock('../../../hooks/useClientOcr', () => ({
  useClientOcr: () => ({
    scanFile: vi.fn().mockResolvedValue({ text: 'RERA FORM A EJARI VERIFIED' }),
    isProcessing: false,
  }),
}));

describe('LindaLeadContextPane 4 Production Workflows', () => {
  const sampleConv = INITIAL_LINDA_CONVERSATIONS[0];

  beforeEach(() => {
    vi.restoreAllMocks();
    global.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/qualify')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            success: true,
            data: {
              score: 92,
              matchedUnits: [{ id: 'WC-BAYUT-101', title: 'Dubai Marina 2BR', source: 'Bayut' }],
            },
          }),
        });
      }
      if (url.includes('/schedule-viewing')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            success: true,
            data: { viewingId: 'VW-1001', calendarSynced: true },
          }),
        });
      }
      if (url.includes('/drip-campaign')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            success: true,
            data: { campaignId: 'DRIP-1001', gaussianPacing: { jitterMeanMs: 7500 } },
          }),
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({ success: true, data: {} }) });
    }) as unknown as typeof fetch;
  });

  it('executes Auto-Qualify & Match Units workflow', async () => {
    render(<LindaLeadContextPane conversation={sampleConv} />);
    fireEvent.click(screen.getByTestId('linda-workflow-qualify'));
    await waitFor(() => {
      expect(screen.getByTestId('linda-workflow-status').textContent).toContain('Qualified (92%)');
    });
  });

  it('executes 1-Click Viewing Scheduler + Calendar sync workflow', async () => {
    render(<LindaLeadContextPane conversation={sampleConv} />);
    fireEvent.click(screen.getByTestId('linda-workflow-viewing'));
    await waitFor(() => {
      expect(screen.getByTestId('linda-workflow-status').textContent).toContain('VW-1001');
    });
  });

  it('executes Drip Campaign with Gaussian pacing workflow', async () => {
    render(<LindaLeadContextPane conversation={sampleConv} />);
    fireEvent.click(screen.getByTestId('linda-workflow-drip'));
    await waitFor(() => {
      expect(screen.getByTestId('linda-workflow-status').textContent).toContain('DRIP-1001');
    });
  });
});
