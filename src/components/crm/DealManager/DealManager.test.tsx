// FILE: src/components/crm/DealManager/DealManager.test.tsx
/**
 * White Caves Real Estate LLC - Deal Manager Unit Tests
 * Standard: AEGIS 12-Way Co-Location Architecture Standard (Tests - Tier 6)
 * Single Purpose File Law: < 350 lines
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { DealManagerView } from './DealManagerView';
import { CANONICAL_DEALS } from './DealManager.data';
import { executeValidateDealGates, calculateDealCommission } from './DealManager.workflow';
import { DealManagerFallback } from './DealManager.fallback';
import { DealTelemetry } from './DealManager.telemetry';
import { DEAL_TRANSLATIONS, getDealI18n } from './DealManager.i18n';
import {
  saveDealsCache,
  loadDealsCache,
  getDealByTuringId,
  indexDealsInMemory,
} from './DealManager.cache';
import { calculateDealFinancialsOffThread } from './DealManager.workers';

const renderWithRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('DealManager Suite (12-Way Co-Location Blueprint)', () => {
  beforeEach(() => {
    localStorage.clear();
    indexDealsInMemory(CANONICAL_DEALS);
    DealTelemetry.clear();
  });

  // --- Tier 1 & 2: Presentational & Logic Integration ---
  it('renders workspace title, metrics deck, and canonical deal cards', () => {
    renderWithRouter(<DealManagerView initialDeals={CANONICAL_DEALS} />);

    expect(screen.getByText(/Deal Tracking & Revenue Pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Deals Ledger/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Gross Commission/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed Sales Volume/i)).toBeInTheDocument();

    expect(screen.getByText('DAMAC Hills 2 Luxury Villa Annual Lease')).toBeInTheDocument();
    expect(screen.getByTestId('deal-card-DEAL-001')).toBeInTheDocument();
  });

  it('filters deals by type toggle (Leasing vs Sales)', () => {
    renderWithRouter(<DealManagerView initialDeals={CANONICAL_DEALS} />);

    const salesBtn = screen.getByTestId('toggle-type-sales');
    fireEvent.click(salesBtn);

    expect(
      screen.getByText('Palm Jumeirah Signature Beachfront Villa Acquisition')
    ).toBeInTheDocument();
    expect(screen.queryByText('DAMAC Hills 2 Luxury Villa Annual Lease')).not.toBeInTheDocument();
  });

  it('filters deals by search query', () => {
    renderWithRouter(<DealManagerView initialDeals={CANONICAL_DEALS} />);

    const searchInput = screen.getByTestId('deal-search-input');
    fireEvent.change(searchInput, { target: { value: 'Il Primo' } });

    expect(screen.getByText('Il Primo Full-Floor Sky Penthouse Sale')).toBeInTheDocument();
    expect(screen.queryByText('DAMAC Hills 2 Luxury Villa Annual Lease')).not.toBeInTheDocument();
  });

  it('opens deal inspection detail modal and renders 12-stage cockpit for leasing deals', () => {
    renderWithRouter(<DealManagerView initialDeals={CANONICAL_DEALS} />);

    const inspectBtn = screen.getByTestId('inspect-deal-DEAL-001');
    fireEvent.click(inspectBtn);

    expect(screen.getByTestId('deal-detail-modal')).toBeInTheDocument();
    expect(screen.getByTestId('tenancy-deal-cockpit')).toBeInTheDocument();
    expect(screen.getByText(/12-Stage Enforced Tenancy Lifecycle/i)).toBeInTheDocument();

    // Toggle to dossier overview
    const dossierBtn = screen.getByTestId('toggle-dossier-tab');
    fireEvent.click(dossierBtn);

    expect(screen.getAllByText(/CHQ-1001/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Hassan Al-Nuaimi/i).length).toBeGreaterThan(0);

    const closeBtn = screen.getByTestId('close-deal-modal');
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('deal-detail-modal')).not.toBeInTheDocument();
  });

  it('auto-opens detail modal when selectedDealId prop is provided (deep link)', () => {
    renderWithRouter(<DealManagerView selectedDealId="DEAL-003" initialDeals={CANONICAL_DEALS} />);

    expect(screen.getByTestId('deal-detail-modal')).toBeInTheDocument();
    expect(screen.getAllByText(/Sir Arthur Pendelton/i).length).toBeGreaterThan(0);
  });

  it('advances deal stage via modal status select', () => {
    renderWithRouter(<DealManagerView selectedDealId="DEAL-002" initialDeals={CANONICAL_DEALS} />);

    // Toggle to dossier overview to access status select
    const dossierBtn = screen.getByTestId('toggle-dossier-tab');
    fireEvent.click(dossierBtn);

    const statusSelect = screen.getByTestId('deal-status-select');
    fireEvent.change(statusSelect, { target: { value: 'COMPLETED' } });

    expect(screen.getAllByText(/Revenue Booked/i).length).toBeGreaterThan(0);
  });

  it('opens create drawer and registers a new deal', () => {
    renderWithRouter(<DealManagerView initialDeals={CANONICAL_DEALS} />);

    const createBtn = screen.getByTestId('create-deal-btn');
    fireEvent.click(createBtn);

    expect(screen.getByTestId('deal-edit-drawer')).toBeInTheDocument();

    const titleInput = screen.getByTestId('deal-title-input');
    fireEvent.change(titleInput, { target: { value: 'Downtown Sky Suite Lease' } });

    const submitBtn = screen.getByTestId('submit-deal-btn');
    fireEvent.click(submitBtn);

    expect(screen.getByText('Downtown Sky Suite Lease')).toBeInTheDocument();
  });

  // --- Tier 3: Workflow, Gatekeeper & Math Law ---
  it('strictly validates UAE regulatory compliance gates', () => {
    const validDeal = CANONICAL_DEALS[0];
    const invalidDeal = { ...validDeal, pdcSchedule: [] };

    expect(executeValidateDealGates(validDeal).success).toBe(true);
    expect(executeValidateDealGates(invalidDeal).success).toBe(false);
  });

  it('accurately calculates AED commission rates for leasing (5%) and sales (2%)', () => {
    expect(calculateDealCommission(100000, 'LEASING')).toBe(5000);
    expect(calculateDealCommission(5000000, 'SALES')).toBe(100000);
  });

  // --- Tier 4: Storage, Caching & Telemetry ---
  it('loads and stores deals through local caching layer', () => {
    saveDealsCache(CANONICAL_DEALS);
    const cached = loadDealsCache();
    expect(cached?.length).toBe(CANONICAL_DEALS.length);

    const match = getDealByTuringId('DEAL-001');
    expect(match?.dealNumber).toBe('WC-D-2026-001');
  });

  it('records audit events in telemetry stream', () => {
    DealTelemetry.track('CREATE', { dealId: 'DEAL-999', trigger: 'USER' });
    const events = DealTelemetry.getEvents();
    expect(events.length).toBeGreaterThan(0);
    expect(events.some(e => e.eventType === 'CREATE')).toBe(true);
  });

  // --- Tier 5: Localization & Web Worker Offloading ---
  it('retrieves localized English and Arabic deal translation strings', () => {
    const en = getDealI18n('en');
    const ar = getDealI18n('ar');

    expect(en.dealsPipeline).toBe('Deal Tracking & Revenue Pipeline');
    expect(ar.dealsPipeline).toBe('تتبع الصفقات وخط الإيرادات');
  });

  it('computes deal financials through asynchronous web worker pipeline', async () => {
    const res = await calculateDealFinancialsOffThread(CANONICAL_DEALS);
    expect(res.totalVolumeAED).toBeGreaterThan(0);
    expect(res.totalCommissionAED).toBeGreaterThan(0);
  });
});
