import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LindaDh2CampaignOperationsCenter } from './LindaDh2CampaignOperationsCenter';

describe('LindaDh2CampaignOperationsCenter', () => {
  it('renders the 10-SIM fleet status bar, 38 cluster selector, and live message preview', () => {
    render(<LindaDh2CampaignOperationsCenter />);

    expect(screen.getByTestId('linda-campaign-ops-center')).toBeInTheDocument();
    expect(screen.getByText(/PRIMARY MASTER CLOSER: \+971 50 576 0056/i)).toBeInTheDocument();
    expect(screen.getByText(/Friday Prayer Guard:/i)).toBeInTheDocument();
    expect(screen.getByText(/Select DAMAC Hills 2 Cluster/i)).toBeInTheDocument();
    expect(screen.getByText(/LIVE WHATSAPP MESSAGE PREVIEW/i)).toBeInTheDocument();
  });

  it('updates live message preview when selecting a different cluster', () => {
    render(<LindaDh2CampaignOperationsCenter />);

    const select = screen.getByDisplayValue(/All 38 Clusters/i);
    fireEvent.change(select, { target: { value: 'Pacifica' } });

    expect(screen.getByText(/Target: Pacifica Villa/i)).toBeInTheDocument();
  });
});
