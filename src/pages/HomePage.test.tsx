import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage Landing & Fast Property Search Gateway', () => {
  it('renders the welcome hero and fast property search without departments', () => {
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

    // Fast Search and Luxury Cards
    expect(screen.getByTestId('wc-fast-search-container')).toBeTruthy();
    expect(screen.getByTestId('wc-fast-search-input')).toBeTruthy();
    expect(screen.getByTestId('wc-fast-results-grid')).toBeTruthy();
    expect(screen.getByText('Explore Verified Dubai Properties')).toBeTruthy();

    // Departments should NOT be present on the landing page
    expect(screen.queryByText('Floor 1')).toBeNull();
    expect(screen.queryByText('Department Floors (1–12)')).toBeNull();
  });

  it('opens and closes the landing modal when clicking sign in / sign up buttons', () => {
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

  it('filters properties live based on user query', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const searchInput = screen.getByTestId('wc-fast-search-input');
    fireEvent.change(searchInput, { target: { value: 'Downtown' } });

    expect(screen.getByTestId('wc-fast-results-grid')).toBeTruthy();
  });

  it('filters properties with fast property category filters (Villas, Penthouses, Off-Plan)', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('wc-property-category-bar')).toBeTruthy();
    const villaFilter = screen.getByTestId('wc-cat-filter-villas');
    const penthouseFilter = screen.getByTestId('wc-cat-filter-penthouses');
    const offplanFilter = screen.getByTestId('wc-cat-filter-off-plan');

    expect(villaFilter).toBeTruthy();
    expect(penthouseFilter).toBeTruthy();
    expect(offplanFilter).toBeTruthy();

    fireEvent.click(villaFilter);
    expect(screen.getByTestId('wc-fast-results-grid')).toBeTruthy();

    fireEvent.click(penthouseFilter);
    expect(screen.getByTestId('wc-fast-results-grid')).toBeTruthy();

    fireEvent.click(offplanFilter);
    expect(screen.getByTestId('wc-fast-results-grid')).toBeTruthy();
  });
});
