import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TenancyDealCockpit, LEASING_STAGES } from './TenancyDealCockpit';

describe('TenancyDealCockpit', () => {
  it('renders deal facts, annual rent, 12 sequential stages, and 4 Google Drive folders', () => {
    render(<TenancyDealCockpit />);

    expect(screen.getByTestId('tenancy-deal-cockpit')).toBeInTheDocument();
    expect(screen.getByText(/DAMAC Hills 2 — Camellia/i)).toBeInTheDocument();
    expect(screen.getByText(/AED 95,000/i)).toBeInTheDocument();
    expect(screen.getByText(/Sequential Receipt & 5% VAT/i)).toBeInTheDocument();
    expect(screen.getByText(/5% VAT Invoice PDF/i)).toBeInTheDocument();
    expect(screen.getByText(/DAMAC Hills 2 Drive Folder/i)).toBeInTheDocument();
    expect(screen.getByText(/SUP-05-2-01-1/i)).toBeInTheDocument();

    expect(LEASING_STAGES.length).toBe(12);
    expect(screen.getByTestId('tenancy-stage-card-7')).toHaveTextContent(
      /Cheques & Agency Fees Collected/i
    );
    expect(screen.getByTestId('tenancy-stage-card-8')).toHaveTextContent(
      /Tenant Signs Contract First/i
    );
    expect(screen.getByTestId('tenancy-stage-card-9')).toHaveTextContent(
      /Payment Clearance Verified/i
    );

    expect(screen.getByTestId('drive-folder-link-house-pictures')).toBeInTheDocument();
    expect(screen.getByTestId('drive-folder-link-landlord-docs')).toBeInTheDocument();
    expect(screen.getByTestId('drive-folder-link-tenant-docs')).toBeInTheDocument();
    expect(screen.getByTestId('drive-folder-link-tenancy-contract')).toBeInTheDocument();
  });

  it('enforces strict sequential gates before advancing from Stage 8 to Stage 9', () => {
    const onAdvanceStage = vi.fn();
    render(<TenancyDealCockpit currentStageOrder={8} onAdvanceStage={onAdvanceStage} />);

    // Attempting to jump straight to Stage 10 is blocked
    fireEvent.click(screen.getByTestId('tenancy-stage-card-10'));
    expect(screen.getByTestId('tenancy-gate-error')).toHaveTextContent(/Sequential Lock/i);
    expect(onAdvanceStage).not.toHaveBeenCalled();

    // Advancing to Stage 9 without paymentCleared confirmed is blocked
    fireEvent.click(screen.getByTestId('advance-next-stage-btn'));
    expect(screen.getByTestId('tenancy-gate-error')).toHaveTextContent(
      /Confirm Bank Payment Clearance Verified/i
    );
    expect(onAdvanceStage).not.toHaveBeenCalled();

    // Confirm bank payment clearance gate, then advance succeeds
    fireEvent.click(screen.getByTestId('gate-toggle-paymentCleared'));
    fireEvent.click(screen.getByTestId('advance-next-stage-btn'));
    expect(onAdvanceStage).toHaveBeenCalledWith(9);
    expect(screen.getByTestId('tenancy-gate-success')).toHaveTextContent(/Stage 9 of 12/i);
  });
});
