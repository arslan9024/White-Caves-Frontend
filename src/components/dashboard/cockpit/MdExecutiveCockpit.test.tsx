import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MdExecutiveCockpit } from './MdExecutiveCockpit';

vi.mock('../../portal/PortalLogoRing', () => ({
  PortalLogoRing: ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div data-testid="portal-logo-ring">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
}));

vi.mock('../organogram/AIOrganogramTree', () => ({
  AIOrganogramTree: () => <div data-testid="ai-organogram-tree">Mock AIOrganogramTree</div>,
}));

describe('MdExecutiveCockpit Component', () => {
  it('renders the central illuminated PortalLogoRing for Managing Director', () => {
    render(<MdExecutiveCockpit />);
    expect(screen.getByTestId('portal-logo-ring')).toBeInTheDocument();
    expect(screen.getByText('WHITE CAVES REAL ESTATE LLC')).toBeInTheDocument();
  });

  it('renders the live Bhakti AIOrganogramTree', () => {
    render(<MdExecutiveCockpit />);
    expect(screen.getByTestId('ai-organogram-tree')).toBeInTheDocument();
  });

  it('renders the executive telemetry deck', () => {
    render(<MdExecutiveCockpit />);
    expect(screen.getByText('Corporate Entities')).toBeInTheDocument();
    expect(screen.getByText('DLD Escrow Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Corporate Floors')).toBeInTheDocument();
    expect(screen.getByText('Active Mandates')).toBeInTheDocument();
  });

  it('renders 1-click launch dock for all 5 Operational AI Supervisors and DH2 leasing controls', () => {
    const onNavigate = vi.fn();
    render(<MdExecutiveCockpit onNavigate={onNavigate} />);

    expect(screen.getByTestId('md-operational-supervisors-dock')).toBeInTheDocument();
    expect(screen.getByTestId('md-supervisor-launch-mary')).toBeInTheDocument();
    expect(screen.getByTestId('md-supervisor-launch-linda')).toBeInTheDocument();
    expect(screen.getByTestId('md-supervisor-launch-diana')).toBeInTheDocument();
    expect(screen.getByTestId('md-supervisor-launch-daisy')).toBeInTheDocument();
    expect(screen.getByTestId('md-supervisor-launch-henry')).toBeInTheDocument();

    screen.getByTestId('md-supervisor-launch-diana').click();
    expect(onNavigate).toHaveBeenCalledWith('/dashboard/diana');

    screen.getByTestId('md-supervisor-launch-daisy').click();
    expect(onNavigate).toHaveBeenCalledWith('/dashboard/leasing');

    screen.getByTestId('md-supervisor-launch-mary').click();
    expect(onNavigate).toHaveBeenCalledWith('/dashboard/inventory');

    screen.getByTestId('md-supervisor-launch-linda').click();
    expect(onNavigate).toHaveBeenCalledWith('/dashboard/linda');

    screen.getByTestId('md-supervisor-launch-henry').click();
    expect(onNavigate).toHaveBeenCalledWith('/dashboard/henry');

    screen.getByTestId('md-dock-open-aicc-sanctum').click();
    expect(onNavigate).toHaveBeenCalledWith('/aicc-sanctum');

    screen.getByTestId('md-dock-open-leasing-cockpit').click();
    expect(onNavigate).toHaveBeenCalledWith('/dashboard/leasing-cockpit');
  });
});
