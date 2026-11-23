import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { TenancyDealCockpit, LEASING_STAGES } from './TenancyDealCockpit';

describe('TenancyDealCockpit', () => {
  it('renders deal facts, annual rent and 12 sequential stages', () => {
    render(<TenancyDealCockpit />);

    expect(screen.getByTestId('tenancy-deal-cockpit')).toBeInTheDocument();
    expect(screen.getByText(/DAMAC Hills 2 — Camellia/i)).toBeInTheDocument();
    expect(screen.getByText(/AED 95,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Sequential Receipt & 5% VAT/i)).toBeInTheDocument();
    expect(screen.getByText(/DAMAC Hills 2 Drive Folder/i)).toBeInTheDocument();

    expect(LEASING_STAGES.length).toBe(12);
    expect(screen.getByText(/Cheques & Agency Fees Collected/i)).toBeInTheDocument();
    expect(screen.getByText(/Tenant Signs Contract First/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Clearance Verified/i)).toBeInTheDocument();
  });
});
