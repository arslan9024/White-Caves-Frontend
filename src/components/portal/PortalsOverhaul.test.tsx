import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LandlordDirectMdBanner } from './landlord/LandlordDirectMdBanner';
import { TenantStatutoryReceiptBar } from './tenant/TenantStatutoryReceiptBar';
import { INITIAL_SUPERVISOR_TASK_ASSIGNMENTS } from '../../portals/md/aicc/supervisorTaskRegistry.data';

describe('White Caves Role-Based Portals & Supervisor Authority Chain', () => {
  it('renders LandlordDirectMdBanner with 1-click WhatsApp to +971505760056 and Deal Cockpit trigger', () => {
    const onSelectTab = vi.fn();
    render(<LandlordDirectMdBanner landlordName="Khalid Al-Rashid" onSelectTab={onSelectTab} />);

    const whatsappLink = screen.getByTestId('landlord-md-whatsapp-cta');
    expect(whatsappLink).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/971505760056')
    );

    fireEvent.click(screen.getByTestId('landlord-open-deal-cockpit-btn'));
    expect(onSelectTab).toHaveBeenCalledWith('cockpit');
  });

  it('renders TenantStatutoryReceiptBar with Ejari badge, 5% UAE VAT & sequential receipt PDF links', () => {
    const onNavigateTab = vi.fn();
    render(
      <TenantStatutoryReceiptBar
        dealId="DEAL-DH2-001"
        ejariNumber="EJARI-2026-9901"
        tenantName="Fatima"
        onNavigateTab={onNavigateTab}
      />
    );

    expect(screen.getByTestId('tenant-ejari-status-badge')).toHaveTextContent(/Ejari:/i);
    expect(screen.getByTestId('tenant-download-sequential-receipt')).toHaveAttribute(
      'href',
      '/api/leasing-formula/tenancy-deals/DEAL-DH2-001/receipt-pdf'
    );
    expect(screen.getByTestId('tenant-download-vat-invoice')).toHaveAttribute(
      'href',
      '/api/leasing-formula/tenancy-deals/DEAL-DH2-001/receipt-pdf?type=vat'
    );

    fireEvent.click(screen.getByTestId('tenant-movein-maintenance-cta'));
    expect(onNavigateTab).toHaveBeenCalledWith('maintenance');
  });

  it('registers Track A (SUP-05-2-01-1) and Track B (SUP-12-1-01-1) with DMS/TMS lockstep', () => {
    const trackA = INITIAL_SUPERVISOR_TASK_ASSIGNMENTS.find(t => t.taskCode === 'TSK-PORTAL-01');
    const trackB = INITIAL_SUPERVISOR_TASK_ASSIGNMENTS.find(t => t.taskCode === 'TSK-ARCH-W2');

    expect(trackA?.supervisorId).toBe('SUP-05-2-01-1');
    expect(trackA?.authorityChain.executivePartner).toBe('AI Zoe (COO)');
    expect(trackA?.authorityChain.dmsSynced).toBe(true);
    expect(trackA?.authorityChain.tmsSynced).toBe(true);

    expect(trackB?.supervisorId).toBe('SUP-12-1-01-1');
    expect(trackB?.authorityChain.departmentCode).toBe('DEPT-12');
    expect(trackB?.authorityChain.dmsSynced).toBe(true);
    expect(trackB?.authorityChain.tmsSynced).toBe(true);
  });
});
