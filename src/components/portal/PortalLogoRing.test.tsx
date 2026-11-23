import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { PortalLogoRing } from './PortalLogoRing';

describe('PortalLogoRing Component', () => {
  it('renders correctly for Landlord portal with title and metrics', () => {
    render(
      <PortalLogoRing
        role="landlord"
        badgeLabel="Landlord Command Center"
        title="DAMAC Hills 2 Asset Portfolio"
        subtitle="Live telemetry across all 38 cluster properties"
        metricPrimary={{ label: 'Occupancy', value: '100% Leased' }}
        metricSecondary={{ label: 'Active Leases', value: 4 }}
      />
    );

    expect(screen.getByTestId('portal-logo-ring-container')).toBeInTheDocument();
    expect(screen.getByText('DAMAC Hills 2 Asset Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Landlord Command Center')).toBeInTheDocument();
    expect(screen.getByText('100% Leased')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders correctly for Tenant portal', () => {
    render(
      <PortalLogoRing
        role="tenant"
        badgeLabel="Tenant Residence Suite"
        title="Active Residential Tenancy"
        subtitle="Unit 402, Akoya Oxygen"
        metricPrimary={{ label: 'Lease Status', value: 'Active' }}
      />
    );

    expect(screen.getByText('Active Residential Tenancy')).toBeInTheDocument();
    expect(screen.getByText('Tenant Residence Suite')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
