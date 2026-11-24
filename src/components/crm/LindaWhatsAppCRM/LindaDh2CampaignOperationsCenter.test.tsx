import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LindaDh2CampaignOperationsCenter } from './LindaDh2CampaignOperationsCenter';
import { apiClient } from '../../../utils/apiClient';

describe('LindaDh2CampaignOperationsCenter', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders 10-SIM fleet status bar, 38 cluster selector, privacy-safe preview with whitecaves.ae & warm contacts panel', () => {
    render(<LindaDh2CampaignOperationsCenter />);

    expect(screen.getByTestId('linda-campaign-ops-center')).toBeInTheDocument();
    expect(screen.getByText(/PRIMARY MASTER CLOSER: \+971 50 576 0056/i)).toBeInTheDocument();
    expect(screen.getByText(/Friday Prayer Guard:/i)).toBeInTheDocument();
    expect(screen.getByText(/Select DAMAC Hills 2 Cluster/i)).toBeInTheDocument();
    expect(screen.getByText(/LIVE WHATSAPP MESSAGE PREVIEW/i)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/whitecaves\.ae/i)).toBeInTheDocument();
    expect(screen.getByText(/Arslan Malik/i)).toBeInTheDocument();
    expect(screen.getByTestId('linda-warm-contacts-panel')).toBeInTheDocument();
  });

  it('updates live message preview when selecting a different cluster without leaking private unit numbers', () => {
    render(<LindaDh2CampaignOperationsCenter />);

    const select = screen.getByDisplayValue(/All 38 DH2 Clusters/i);
    fireEvent.change(select, { target: { value: 'Pacifica' } });

    expect(screen.getByText(/Target: Pacifica Villa/i)).toBeInTheDocument();
    expect(screen.queryByText(/Villa 412/i)).not.toBeInTheDocument();
  });

  it('runs E2E Test Dispatch & Triage verification and renders privacy audit report', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({
      success: true,
      data: {
        total: 2,
        landlordRetentionCount: 1,
        tenantFollowUpCount: 1,
        expiringWithin90DaysCount: 2,
        dncSuppressedCount: 0,
        contacts: [],
      },
    });
    vi.spyOn(apiClient, 'post').mockResolvedValue({
      success: true,
      data: {
        verified: true,
        outboundPayload: {
          to: '971509001122',
          assignedSim: '+971505760056',
          message: 'Privacy-safe whitecaves.ae check-in with Arslan Malik.',
          privacyAuditPassed: true,
          spamRiskScore: 0,
          status: 'dry_run',
        },
        inboundTriage: {
          simulatedMessage: 'Yes available in Pacifica',
          result: { syncedToMaryVault: true },
        },
      },
    });

    render(<LindaDh2CampaignOperationsCenter />);
    fireEvent.click(screen.getByTestId('linda-e2e-test-dispatch-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('linda-e2e-test-report')).toBeInTheDocument();
    });
    expect(screen.getByText(/Privacy Audit: PASS/i)).toBeInTheDocument();
    expect(screen.getByText(/Synced to Mary Vault/i)).toBeInTheDocument();
  });
});
