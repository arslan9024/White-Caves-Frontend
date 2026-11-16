import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage — Clean Auth Gateway with Property Teaser', () => {
  it('renders the welcome hero with auth gateway cards (no full property search)', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('crm-command-center')).toBeTruthy();
    expect(screen.getByText('White Caves Real Estate')).toBeTruthy();
    expect(screen.getByText('Welcome to White Caves')).toBeTruthy();
    expect(screen.getByText('Operator & Client Access')).toBeTruthy();
    expect(screen.getByText('New Registration')).toBeTruthy();

    // Property teaser section (not full search grid)
    expect(screen.getByTestId('wc-property-teaser-section')).toBeTruthy();
    expect(screen.getByTestId('wc-teaser-cards')).toBeTruthy();
    expect(screen.getByText('Explore Dubai Prime Residences')).toBeTruthy();

    // Full search grid should NOT be present
    expect(screen.queryByTestId('wc-fast-search-container')).toBeNull();
    expect(screen.queryByTestId('wc-fast-search-input')).toBeNull();

    // Departments should NOT be present
    expect(screen.queryByText('Floor 1')).toBeNull();
    expect(screen.queryByText('Department Floors (1–12)')).toBeNull();
  });

  it('shows 3 teaser property cards linking to whitecaves.ae', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const teaserCards = screen.getAllByTestId('wc-teaser-card');
    expect(teaserCards.length).toBe(3);

    // Verify teaser data
    expect(screen.getByText('Signature Palm Villa')).toBeTruthy();
    expect(screen.getByText('Downtown Sky Penthouse')).toBeTruthy();
    expect(screen.getByText('Elysian Mansions Estate')).toBeTruthy();

    // All cards link to whitecaves.ae
    teaserCards.forEach(card => {
      expect((card as HTMLAnchorElement).href).toContain('whitecaves.ae/properties');
      expect((card as HTMLAnchorElement).target).toBe('_blank');
    });
  });

  it('has a "Browse All" CTA linking to whitecaves.ae', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const browseBtn = screen.getByTestId('wc-browse-all-btn');
    expect(browseBtn).toBeTruthy();
    expect((browseBtn as HTMLAnchorElement).href).toContain('whitecaves.ae/properties');
    expect(browseBtn.textContent).toContain('Browse All Properties');
  });

  it('opens and closes the auth modal when clicking Sign In / Sign Up', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const headerSignIn = screen.getByTestId('header-signin-btn');
    fireEvent.click(headerSignIn);

    expect(screen.getByTestId('wc-landing-auth-modal')).toBeTruthy();
    expect(screen.getByText('Sign In to White Caves')).toBeTruthy();

    const closeBtn = screen.getByLabelText('Close dialog');
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('wc-landing-auth-modal')).toBeNull();
  });
});
